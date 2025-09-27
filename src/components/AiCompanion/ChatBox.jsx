
import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Circle, Image as KonvaImage } from "react-konva";
import { getAIResponseWithVoice } from "./api";




// Dummy AI response
const fakeAIResponse = async (msg) => {
  return "👽 " + msg.split("").reverse().join(""); // placeholder
};



const ChatBox = () => {
const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([]);
  const stageRef = useRef();
 const [isListening, setIsListening] = useState(false);
const recognitionRef = useRef(null);
const finalTranscriptRef = useRef('');



  
const handleSend = async (msg = transcript) => {
    if (typeof msg !== "string") return; // ✅ make sure it's a string
    if (!msg.trim()) return; // ✅ avoid .trim() on undefined

    // Add user message
    setMessages((prev) => [...prev, { from: "user", text: msg }]);

    try {
      // Get AI response
      const { reply, audioUrl } = await getAIResponseWithVoice(msg);

      setMessages((prev) => [...prev, { from: "ai", text: reply }]);

      // Play voice if available
      if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
      }
    } catch (err) {
      console.error("Error getting AI response:", err);
    }

    // Clear input
    setTranscript("");
  };


   // Initialize speech recognition
    useEffect(() => {
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        
        recognitionRef.current.onresult = (event) => {
          let interimTranscript = '';
          let finalTranscript = finalTranscriptRef.current;
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }
          
          finalTranscriptRef.current = finalTranscript;
          setTranscript(finalTranscript + interimTranscript);
        };
        
        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
        };
      } else {
        console.error('Speech Recognition API not supported in this browser');
      }
      
      return () => {
        if (recognitionRef.current) {
          recognitionRef.current.stop();
        }
      };
    }, []);
  
    const startListening = () => {
      if (recognitionRef.current) {
        finalTranscriptRef.current = '';
        setTranscript('');
        recognitionRef.current.start();
        setIsListening(true);
      }
    };
  
    const stopListening = () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    };
  
    const resetTranscript = () => {
      finalTranscriptRef.current = '';
      setTranscript('');
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        setIsListening(false);
      }
    };

  return (
  <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "sans-serif" }}>
    {/* Buttons */}
    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
      <button 
        onClick={startListening} 
        style={{
          padding: '10px 25px',
          backgroundColor: isListening ? '#4caf50' : '#6e6ef0',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '16px',
          flex: 1
        }}
        disabled={isListening}
      >
        🎙 {isListening ? 'Listening...' : 'Start'}
      </button>
      <button 
        onClick={stopListening} 
        style={{
          padding: '10px 15px',
          backgroundColor: '#6e6ef0',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          flex: 1
        }}
        disabled={!isListening}
      >
        ⏸ Stop
      </button>
      <button
        onClick={resetTranscript}
        style={{
          padding: '10px 15px',
          backgroundColor: '#6e6ef0',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          flex: 1
        }}
      >
        ♻ Reset
      </button>
      <button 
        onClick={() => handleSend()}
        style={{
          padding: '10px 25px',
          backgroundColor: '#6e6ef0',
          color: 'white',
          border: 'none',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '16px',
          flex: 1
        }}
      >
        ↪ Send
      </button>
    </div>

    {/* Textarea */}
    <textarea
      value={transcript}
      onChange={(e) => setTranscript(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      rows={3}
      placeholder="Speak or type into the void..."
      style={{
        width: '100%',
        padding: '15px',
        borderRadius: '10px',
        backgroundColor: 'rgba(30, 30, 60, 0.7)',
        color: 'white',
        border: '1px solid #44447a',
        marginBottom: '15px',
        resize: 'vertical',
        fontSize: '16px'
      }}
    />

    {/* Messages */}
    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
      {messages.map((m, i) => (
        <p key={i} style={{ color: m.from === "user" ? "blue" : "green", margin: '5px 0' }}>
          <b>{m.from}:</b> {m.text}
        </p>
      ))}
    </div>
  </div>
);

};

export default ChatBox;
