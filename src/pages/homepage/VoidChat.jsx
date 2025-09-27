import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Link } from "react-router";
import  ShootingStars  from "../../components/ShootingStars.jsx"
import  { Aurora } from "../../components/Aurora.jsx"



const VoidChat = () => {
  const [transcript, setTranscript] = useState('');
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef('');

  const spaceItems = ["🌌", "🪐", "☄️", "⭐", "🛰️", "🌙"];




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

  const handleSend = () => {
    const textToSend = transcript.trim();
    if (!textToSend) return;

    const randomItem = spaceItems[Math.floor(Math.random() * spaceItems.length)];
    const newMessage = {
      id: Date.now(),
      text: textToSend,
      icon: randomItem,
      x: Math.random() * 400 - 200, // Random horizontal position
      y: -200 - Math.random() * 100, // Vertical target position
    };

    setMessages((prev) => [...prev, newMessage]);
    setTranscript('');
    finalTranscriptRef.current = '';

    // Remove message after animation completes
    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id));
    }, 8000);
  };

const journalPromptsArray = [
  "What is something you're grateful for today, no matter how small?",
  "What would you do if you weren't afraid of failing?",
  "What does your ideal day look like from start to finish?",
  "What's a limiting belief you hold about yourself that might not be true?",
  "What makes you feel most alive and energized?",
  "If you could give your younger self one piece of advice, what would it be?",
  "What boundaries do you need to set to protect your energy?",
  "What does 'enough' look like for you right now?",
  "What's something you've been avoiding that you need to address?",
  "How do you show compassion to yourself on difficult days?",
  "What relationships in your life need more attention or boundaries?",
  "What does your inner critic sound like, and how can you quiet it?",
  "What small step can you take today toward a bigger goal?",
  "What does rest truly mean to you, and how can you incorporate more of it?",
  "What are you currently learning about yourself?",
  "How have you grown in the past year that you're proud of?",
  "What would you do if you trusted that everything would work out?",
  "What needs to be released or let go of in your life right now?",
  "What brings you a sense of peace and calm?",
  "How can you be more present in your daily activities?",
  "What does authenticity mean to you, and how do you practice it?",
  "What moments from this week made you feel truly happy?",
  "How do you want to be remembered by the people you love?",
  "What's something you need to forgive yourself for?",
  "What does your body need from you right now?",
  "How can you create more space for joy in your life?",
  "What assumptions are you making that might not be true?",
  "What does 'success' mean to you personally?",
  "How do you recharge when you're feeling drained?",
  "What's one thing you can do today to practice self-care?"
];

const getRandomJournalPrompt = () => {
  return journalPromptsArray[Math.floor(Math.random() * journalPromptsArray.length)];
};

// In your component
const [currentPrompt, setCurrentPrompt] = useState(getRandomJournalPrompt());

const handleClick = () => {
  const newPrompt = getRandomJournalPrompt();
  setCurrentPrompt(newPrompt);
};
  return (
    <div style={{ 
      maxWidth: '85%', 
      margin: '0 auto', 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#0a0a1a',
      color: '#fff',
      minHeight: '100vh',
      borderRadius: '30px',
     
    }}>
      {/* Snow background */}
            <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
          <ShootingStars/>
      </div>
      
    
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#6e6ef0', fontSize: '2.5rem' }}>Void Chat</h1>
        <p style={{ color: '#a0a0d0' }}>Anonymously speak into the void</p>
      </div>

      <div style={{ 
        backgroundColor: 'rgba(30, 30, 60, 0.7)', 
        borderRadius: '15px', 
        padding: '20px', 
        marginBottom: '30px',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{ color: '#6e6ef0' }}>How it works</h3>
        <p>Speak your thoughts for as long or as little as you like, then send it into the void.</p>
        <p>Once it's sent, allow yourself to feel like you've released the thought.</p>
        <p>No response, just release.</p>
        <p>Journal prompts will randomly show if you ever feel stuck on what to process.</p>
      </div>

      <div style={{backgroundColor: 'rgba(30, 38, 60, 0.7)', 
        borderRadius: '15px', 
        padding: '20px', 
        marginBottom: '30px',
        backdropFilter: 'blur(10px)'}}>
          <h3 style={{ color: '#6e6ef0' }}>Stuck for thought?</h3>
        <p >Choose from a selection of journal prompts if you are stuck:</p>
        <p style={{ textAlign: 'center' }}><strong><i>{currentPrompt}</i></strong></p>
        <div style={{ textAlign: 'center' }}>
         <button onClick={handleClick}
          style={{
                padding: '10px 25px',
                backgroundColor: '#6e6ef0',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '16px',
                margin: '10px',
                width: '125px',
                alignItems: 'center'
              }}
              >Generate</button>
              </div>
      </div>
      

      <div style={{ 
        position: 'relative', 
        minHeight: '600px', 
        border: '2px solid #33335a', 
        borderRadius: '15px',
        overflow: 'hidden',
        backgroundColor: 'rgba(10, 10, 30, 0.8)'
      }}>
        
        <Aurora
          />
        
        {/* Floating Messages with Animation */}
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                y: msg.y,
                x: msg.x,
                scale: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 6, ease: "easeOut" }}
              style={{
                position: 'absolute',
                
                left: '50%',
                padding: '10px 15px',
                backgroundColor: 'rgba(110, 110, 240, 0.9)',
                borderRadius: '20px',
                color: 'white',
                fontSize: '14px',
                maxWidth: '200px',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                zIndex: 1000,
              }}
            >
              <span style={{ fontSize: '20px', display: 'block', marginBottom: '5px' }}>{msg.icon}</span>
              <p style={{ margin: 0 }}>{msg.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Input Dock */}
        <div style={{ 
         
          padding: '20px', 
          backgroundColor: 'rgba(20, 20, 40, 0.9)',
          borderTop: '1px solid #33335a'
        }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <button 
              onClick={startListening} 
              style={{
                padding: '10px 15px',
                backgroundColor: isListening ? '#4caf50' : '#33335a',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
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
                backgroundColor: '#33335a',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
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
                backgroundColor: '#33335a',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                flex: 1
              }}
            >
              ♻ Reset
            </button>
          </div>

          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            rows={4}
            placeholder="Speak or type into the void..."
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '10px',
              backgroundColor: 'rgba(30, 30, 60, 0.7)',
              color: 'white',
              border: '1px solid #44447a',
              marginBottom: '10px',
              resize: 'vertical'
            }}
          />

          <div style={{ textAlign: 'right' }}>
            <button 
              onClick={handleSend}
              style={{
                padding: '10px 25px',
                backgroundColor: '#6e6ef0',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '16px',
                width: '200px'
              }}
            >
              Send to Void
            </button>
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        textAlign: 'center',
      }}>
         <Link to="/Rooms" style={{ textDecoration: 'none', }}>
                  <button  style={{padding: '10px 25px',
                backgroundColor: '#6e6ef0',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '16px',
                width: '120px'}}>Exit</button></Link>
      </div>
       {/* Multiple shooting star layers with different colors and speeds */}
      
     
      
    </div>
  );
};

export default VoidChat;