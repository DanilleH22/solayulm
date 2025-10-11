import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExpand, 
  faVolumeUp, 
  faVolumeMute, 
  faHeart,
  faWind,
  faWater,
  faFire,
  faLeaf
} from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router";

import GalaxyShader from '../../components/GalaxyShader.jsx';
import RedGalaxyShader from '../../components/RedGalaxyShader.jsx';
import PurpleNebula from '../../components/PurpleNebula.jsx';
import styles from "../../styles/ObservationDeck.module.css"

const ObservationDeck = () => {
  const [isSoundOn, setIsSoundOn] = useState(false);

  const [activeShader, setActiveShader] = useState('redGalaxy');

  const [activeFeature, setActiveFeature] = useState('gratitude');
  const [gratitudeEntry, setGratitudeEntry] = useState('');
  const [gratitudeList, setGratitudeList] = useState([]);
  const [visualizationType, setVisualizationType] = useState('forest');
  const [breathingPattern, setBreathingPattern] = useState('box');
   const [currentSound, setCurrentSound] = useState(0);
  const audioRef = useRef(null);

  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('in'); // 'in', 'hold', 'out', 'hold-out'
  const [breathProgress, setBreathProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const breathingTimerRef = useRef(null);

  const [text, setText] = useState("");
   const textRef = useRef();
   const buttonRef = useRef();
   const [sending, setSending] = useState(false);
    const timeoutRef = useRef(null);
   
     const resetSend = () => {
       if (timeoutRef.current) {
         clearTimeout(timeoutRef.current);
       }
       setText("");       
       setSending(false);  
       
       
     };
   
      const handleSend = () => {
        resetSend()
      }
const [show, setShow] = useState(false);

  // Breathing exercise logic
  useEffect(() => {
    if (isBreathingActive) {
      const pattern = breathingPatterns.find(p => p.id === breathingPattern);
      if (!pattern) return;

      const totalTime = pattern.pattern.reduce((sum, time) => sum + time, 0);
      const steps = [
        { phase: 'in', duration: pattern.pattern[0] },
        { phase: 'hold', duration: pattern.pattern[1] },
        { phase: 'out', duration: pattern.pattern[2] },
        { phase: 'hold-out', duration: pattern.pattern[3] }
      ].filter(step => step.duration > 0);

      const startTime = Date.now();
      
      const updateBreathing = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        const cycleTime = elapsed % totalTime;
        
        let accumulated = 0;
        let currentStepIndex = 0;
        let currentPhase = 'in';
        
        for (let i = 0; i < steps.length; i++) {
          accumulated += steps[i].duration;
          if (cycleTime <= accumulated) {
            currentStepIndex = i;
            currentPhase = steps[i].phase;
            break;
          }
        }
        
        const stepStart = accumulated - steps[currentStepIndex].duration;
        const stepProgress = (cycleTime - stepStart) / steps[currentStepIndex].duration;
        
        setBreathPhase(currentPhase);
        setBreathProgress(stepProgress * 100);
        setCurrentStep(currentStepIndex);
      };

      breathingTimerRef.current = setInterval(updateBreathing, 100);
      
      return () => {
        if (breathingTimerRef.current) {
          clearInterval(breathingTimerRef.current);
        }
      };
    } else {
      setBreathPhase('in');
      setBreathProgress(0);
      setCurrentStep(0);
    }
  }, [isBreathingActive, breathingPattern]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (breathingTimerRef.current) {
        clearInterval(breathingTimerRef.current);
      }
    };
  }, []);

  const startBreathingExercise = () => {
    setIsBreathingActive(true);
  };

  const stopBreathingExercise = () => {
    setIsBreathingActive(false);
  };

  const getBreathText = () => {
    switch(breathPhase) {
      case 'in': return 'Breathe In';
      case 'hold': return 'Hold';
      case 'out': return 'Breathe Out';
      case 'hold-out': return 'Hold';
      default: return 'Breathe In';
    }
  };

  const getCircleSize = () => {
    if (breathPhase === 'in') return 80 + (breathProgress / 100) * 60; // 80px to 140px
    if (breathPhase === 'out') return 140 - (breathProgress / 100) * 60; // 140px to 80px
    return breathPhase === 'hold' ? 140 : 80;
  };

  


  
  const ambientSounds = [
      { name: "Space Ambience", src: "music/SeasideSound.mp3"},
    { name: "Calming Waves", src: "music/WavesSound.mp3" },
    { name: "Gentle Rain", src: "music/gentleRain.mp3" },
    { name: "Forest Sounds", src: "music/SeasideSound.mp3" }
  ];


  const shaders = [
    { id: 'redGalaxy', name: 'Red Galaxy', component: <RedGalaxyShader /> },
    { id: 'purpleNebula', name: 'Purple Nebula', component: <PurpleNebula /> }
   
  ];

  const visualizationEnvironments = [
    { id: 'forest', name: 'Forest', icon: faLeaf, src: "/visualisations/ForestV.mp4"},
    { id: 'ocean', name: 'Ocean', icon: faWater, src: "/visualisations/beachWalk.mp4" },
    { id: 'mountain', name: 'Mountain', icon: faWind, src: "/visualisations/Hiking.mp4" },
    { id: 'fireplace', name: 'Fireplace', icon: faFire, src: "/visualisations/FireplaceWalk.mp4" }
  ];
  const selectedEnv = visualizationEnvironments.find(env => env.id === visualizationType);


  const breathingPatterns = [
    { id: 'box', name: 'Box Breathing', pattern: [4, 4, 4, 4] },
    { id: '478', name: '4-7-8 Method', pattern: [4, 7, 8, 0] },
    { id: 'coherent', name: 'Coherent Breathing', pattern: [5, 5, 5, 5] }
  ];

 

  const addGratitudeItem = () => {
    if (gratitudeEntry.trim()) {
      setGratitudeList([...gratitudeList, gratitudeEntry]);
      setGratitudeEntry('');
    }
  };


 
  // Initialize audio on component mount
  useEffect(() => {
    audioRef.current = new Audio(ambientSounds[currentSound].src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  // Handle sound toggle
  useEffect(() => {
    if (audioRef.current) {
      if (isSoundOn) {
        const playAudio = () => {
          audioRef.current.play().catch((error) => {
            console.log("Audio play failed:", error);
          });
        };

        // Try to play immediately if already interacted
        playAudio();

        // Also set up user gesture listeners
        const handleUserGesture = () => {
          playAudio();
          window.removeEventListener("click", handleUserGesture);
          window.removeEventListener("touchstart", handleUserGesture);
          window.removeEventListener("keydown", handleUserGesture);
        };

        window.addEventListener("click", handleUserGesture);
        window.addEventListener("touchstart", handleUserGesture);
        window.addEventListener("keydown", handleUserGesture);

        return () => {
          window.removeEventListener("click", handleUserGesture);
          window.removeEventListener("touchstart", handleUserGesture);
          window.removeEventListener("keydown", handleUserGesture);
        };
      } else {
        audioRef.current.pause();
      }
    }
  }, [isSoundOn]);

  // Handle sound change
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.pause();
      audioRef.current = new Audio(ambientSounds[currentSound].src);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      
      if (wasPlaying && isSoundOn) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentSound]);

  // Update the sound selection handler
  const handleSoundChange = (index) => {
    setCurrentSound(index);
  };

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderActiveFeature = () => {
    switch(activeFeature) {
      case 'gratitude':
        return (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">Gratitude Journal</h3>
            <p className="mb-4  text-center">Take a moment to reflect on things you're grateful for today.</p>
            
            <div className="flex mb-4 d-flex align-items-center justify-content-center text-center h-10">
              <input
                type="text"
                value={gratitudeEntry}
                onChange={(e) => setGratitudeEntry(e.target.value)}
                style={{marginLeft: window. innerMargingLeft < 768 ? '30': '15' }}
                placeholder="What are you grateful for today?"
                className="flex-grow bg-black bg-opacity-30 border border-white border-opacity-20 rounded-l-full px-4 py-2 text-white"
                onKeyPress={(e) => e.key === 'Enter' && addGratitudeItem()}
              />
              <button 
                onClick={addGratitudeItem}
                className="mx-3 my-2  transition-colors "
                style={{
                 
                  width: window.innerWidth < 768 ? '30%' : '10%',
                  height: '46px',
    backgroundColor: '#ddb0ffff', 
     padding: '0.5rem',
    fontSize: '1.15rem',   
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    color: 'white',
    fontWeight: '500'
    
  }}
  
  
                
              >
                Add
              </button>
            </div>
            
            {gratitudeList.length > 0 && (
              <div className="bg-black bg-opacity-20 rounded-xl p-4">
                <h4 className="font-medium mb-2">Your Gratitude List:</h4>
                <ul className="space-y-2">
                  {gratitudeList.map((item, index) => (
                    <li key={index} className="flex items-center" style={{listStyle: 'none',}}>
                      <FontAwesomeIcon icon={faHeart} className="text-pink-500 mr-2 text-sm" />
                      <span> {item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      
      case 'visualization':
        return (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">Guided Visualization</h3>
            <p className="mb-4  text-center">Select an environment to visualize for mental relaxation.</p>
            <p className="mb-4  text-center">Settle into your own internal space without external direction. </p>
            <p className="mb-4  text-center">Project their own meaning onto the walk. Maybe focus on the visual details, on the sounds, or on your breath.</p>
            <p className="mb-4  text-center">Mentally simulate the physical act of walking—focusing on the rhythm and sensation of steps—the ambience alone which is less intrusive.</p>
            
            
            <div className="grid grid-cols-2 gap-3 mb-4"
             style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'10px', gap: '10px' }}>
              {visualizationEnvironments.map(env => (
                <button
                  key={env.id}
                  onClick={() => setVisualizationType(env.id)}
                   style={{
    backgroundColor: visualizationType === env.id  ? '#ddb0ffff' : 'rgba(255, 255, 255, 0.1)',
    padding: '0.5rem',
   
    width: window.innerWidth < 768 ? '40%' : '15%',
    fontSize: '1rem',  
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    color: 'white',
    fontWeight: '500',
  }}
 
  
                  // className={`p-4 rounded-xl flex flex-col items-center transition-all ${
                  //   visualizationType === env.id 
                  //     ? 'bg-pink-600' 
                  //     : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                  // }`}
                >
                 
                  <FontAwesomeIcon icon={env.icon} className="text-2xl pr-5" />
                  <span >{env.name}</span>
                 
                </button>
              ))}
            </div>
            <div>
           
  
    <video
      src={selectedEnv.src}
     
      loop
      muted
      controls

      className="w-full rounded-xl shadow-lg"
    />
  
</div>
            
          </div>
        );
      
      case 'breathing':
        return (
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-center">Breathing Exercises</h3>
            <p className="mb-4 text-center">Select a breathing pattern to help regulate your nervous system.</p>
            
            <div className="mb-6 space-y-3"
             style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'10px', gap: '10px' }}>
              {breathingPatterns.map(pattern => (
                <button
                  key={pattern.id}
                  onClick={() => setBreathingPattern(pattern.id)}
                  disabled={isBreathingActive}
                  // className={`w-full p-3 rounded-xl text-left transition-all ${
                  //   breathingPattern === pattern.id 
                  //     ? 'bg-pink-600' 
                  //     : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                  // } ${isBreathingActive ? 'opacity-50' : ''}`}
                  
  style={{
    backgroundColor: breathingPattern === pattern.id ? '#ddb0ffff' : 'rgba(255, 255, 255, 0.1)',
    padding: '0.5rem',
    fontSize: '1rem',
    transition: 'all 0.2s ease-in-out',
    
    color: 'white',
    fontWeight: '500',
    width: '100%',
    textAlign: 'center',
    opacity: isBreathingActive ? 0.9 : 1,
  cursor: isBreathingActive ? 'not-allowed' : 'pointer',
  }}  >
                  <div className="font-medium">{pattern.name}</div>
                  <div className="text-sm opacity-100">
                    {pattern.pattern[0]}s in - {pattern.pattern[1]}s hold - {pattern.pattern[2]}s out
                    {pattern.pattern[3] > 0 ? ` - ${pattern.pattern[3]}s hold` : ''}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="d-flex justify-content-center align-center mt-6 bg-black text-center" >
              <div 
                className="rounded-full border-4 text-center border-white border-opacity-30 d-flex  transition-all duration-100"
                style={{
                  width: `${getCircleSize()}px`,
                  height: `${getCircleSize()}px`,
                  borderColor: breathPhase === 'in' ? 'rgba(79, 70, 229, 0.8)' : 
                             breathPhase === 'out' ? 'rgba(236, 72, 153, 0.8)' : 
                             'rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.1s ease'
                }}
              >
                <span 
                style={{transform: 'translate(0%, 30%)'}}
               >{getBreathText()}</span>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="w-full bg-gray-700 bg-opacity-50 rounded-full h-2 mb-4">
              <div 
                className="bg-pink-600 h-2 rounded-full transition-all duration-100"
                style={{ width: `${breathProgress}%`}}
              ></div>
            </div>

            <div className="d-flex justify-content-center align-center">
            {!isBreathingActive ? (
              <button 
                onClick={startBreathingExercise}
                className="py-3 mb-3 "
                style={{
                  // width: '18%',
                  width: window.innerWidth < 768 ? '65%' : '18%',
    backgroundColor: '#ddb0ffff', 
    fontSize: '1.15rem',   
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    color: 'white',
    fontWeight: '400',
 
}}
              >
                Start Breathing Exercise
              </button>
            ) : (
              <button 
                onClick={stopBreathingExercise}
                className="py-3  mb-3 "
                style={{
                  width: '18%',
    backgroundColor: '#ad7fd0ff', 
    fontSize: '1.15rem',   
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    color: 'white',
    fontWeight: '400'}}
              >
                Stop Exercise
              </button>
            )}
            </div>
          </div>
        );
      case 'senses':
        return (
          <div className="p-6 text-center">
            <h3 className="text-xl font-semibold mb-4">5-4-3-2-1 Grounding Technique</h3>
            <p className="mb-4 opacity-80">A simple exercise to help bring you into the present moment.</p>
            
            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl">
                <h4 className="font-medium mb-2 text-pink-400">5 Things You Can See</h4>
                <p className="text-sm opacity-80">Look around and notice five things you can see.</p>
              </div>
              
              <div className=" p-4 rounded-xl">
                <h4 className="font-medium mb-2 text-pink-400">4 Things You Can Feel</h4>
                <p className="text-sm opacity-80">Notice four things you can touch or feel.</p>
              </div>
              
              <div className="p-4 rounded-xl">
                <h4 className="font-medium mb-2 text-pink-400">3 Things You Can Hear</h4>
                <p className="text-sm opacity-80">Listen for three distinct sounds.</p>
              </div>
              
              <div className="p-4 rounded-xl">
                <h4 className="font-medium mb-2 text-pink-400">2 Things You Can Smell</h4>
                <p className="text-sm opacity-80">Notice two things you can smell.</p>
              </div>
              
              <div className="p-4 rounded-xl">
                <h4 className="font-medium mb-2 text-pink-400">1 Thing You Can Taste</h4>
                <p className="text-sm opacity-80">Notice one thing you can taste.</p>
              </div>
<Row className="justify-content-center ">
        <Col xs={12} md={11} sm={10} style={{
          marginLeft: window.innerWidth < 768 ? '25px': '0'
        }}>
              <textarea
                type="text"
                
                onChange={(e) => setText(e.target.value)}
                 placeholder="Type your thoughts here..."
            rows={10}
            value={text}
                className="flex-grow bg-black bg-opacity-30 border border-white border-opacity-20 rounded-l-full  text-white"
                onKeyPress={(e) => e.key === 'Enter' }
              />
              </Col>
            </Row>
            </div>
            

<Alert
  show={show}
  onClose={() => setShow(false)}   // ✅ use onClose not onClick
  dismissible
  className={styles.customAlert}
  style={{
    width: "40%",
    display: "flex",
    border: "none",
    marginTop: "10px",
    justifySelf: "center",
    backgroundColor: "rgba(255, 255, 255, 0)",
    fontSize: "1.15rem",
    transition: "all 0.2s ease-in-out",
    color: "white",
    fontWeight: "400",
  }}
>
  <p>Your response has been saved</p>
</Alert>

{!show && (
  <button
    ref={buttonRef}
    onClick={() => {
      setShow(true);
      handleSend();
    }}
    style={{
     
      width: window.innerWidth < 768 ? '30%' : '10%',
      backgroundColor: "#ad7fd0ff",
      fontSize: "1.5rem",
      transition: "all 0.2s ease-in-out",
      cursor: "pointer",
      color: "white",
      fontWeight: "400",
      margin: '10px'
    }}
  >
    Save
  </button>
)}


            

   
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div 
      className={'min-h-screen '}
      
    >
      {/* Header */}
      <div className="text-center py-8 px-4">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
         Observation Deck
        </h1>
        <p className="text-xl mb-4 max-w-2xl mx-auto">
          Your sanctuary for relaxation and mindfulness
        </p>
      </div>

      {/* Main Content Area */}
      <div className="relative max-w-6xl mx-auto">
        {/* Shader Display */}
        <div className="relative rounded-xl overflow-hidden shadow-2xl mb-8" style={{ height: "70vh" }}>
          {shaders.find(shader => shader.id === activeShader)?.component}

         
          
        </div> 

        {/* Control Panel */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Shader Selection */}
            <div>
              <h3 className="text-lg font-semibold my-3 flex text-center">
                <span className="w-2 h-2 bg-pink-500 rounded-full mr-2"></span>
                Visual Experiences
              </h3>
              <div className="flex flex-wrap gap-2 justify-content-center"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {shaders.map(shader => (
                  <button
                    key={shader.id}
                    onClick={() => setActiveShader(shader.id)}
                    
                    // className={`px-4 py-2 rounded-full text-sm transition-all ${
                    //   activeShader === shader.id 
                    //     ? 'bg-pink-600 text-white' 
                    //     : 'bg-white bg-opacity-10 hover:bg-opacity-20'
                    // }`}
                    style={{
    backgroundColor: activeShader === shader.id  ? '#ddb0ffff' : 'rgba(255, 255, 255, 0.1)',
    padding: '0.5rem',
  
  width: window.innerWidth < 768 ? '35%' : '25%',
    fontSize: '1rem',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    color: 'white',
    fontWeight: '500',
    
  }}
  
                  >
                    {shader.name}
                  </button>
                ))}
              </div>
            </div>

             {/* Sound Controls - Updated */}
      <div>
        <h3 className="text-lg font-semibold my-3 flex text-center">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 "></span>
          Soundscape
        </h3>
        <div className="flex items-center space-x-4 "
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button
            onClick={() => setIsSoundOn(!isSoundOn)}
            className="p-3 mr-3 "
            style={{ width: '5%', border: 'none', 
              backgroundColor: 'transparent',
              marginRight: window.innerWidth < 768 ? '10px' : '10px',
            }}
          >
            <FontAwesomeIcon icon={isSoundOn ? faVolumeUp : faVolumeMute} />
          </button>
          <select 
            value={currentSound}
            onChange={(e) => handleSoundChange(parseInt(e.target.value))}
            className="bg-black bg-opacity-30 border border-white border-opacity-20 rounded-full px-4 py-2 text-white"
            style={{ width: '50%'}}
          >
            {ambientSounds.map((sound, index) => (
              <option key={sound.name} value={index}>
                {sound.name}
              </option>
            ))}
          </select>
        </div>
      </div>

            {/* Feature Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex text-center ">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Relaxation Tools
              </h3>
              <div className="grid grid-cols-2 gap-1 ml-4"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button
  onClick={() => setActiveFeature('gratitude')}
  style={{
    backgroundColor: activeFeature === 'gratitude' ? '#ddb0ffff' : 'rgba(255, 255, 255, 0.1)',
    padding: '0.5rem',
  marginLeft: '10px' ,
 
    
    fontSize: window.innerWidth < 768 ? '0.8rem' : '1rem',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    color: 'white',
    fontWeight: '500',
    
  }}
  onMouseEnter={(e) => {
    if (activeFeature !== 'gratitude') {
      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    }
  }}
  onMouseLeave={(e) => {
    if (activeFeature !== 'gratitude') {
      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    }
  }}
>
  Gratitude
</button>

   <button
  onClick={() => setActiveFeature('visualization')}
  style={{
    backgroundColor: activeFeature === 'visualization' ? '#ddb0ffff' : 'rgba(255, 255, 255, 0.1)',
    padding: '0.5rem',
  
   
    fontSize: window.innerWidth < 768 ? '0.8rem' : '1rem',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    color: 'white',
    fontWeight: '500',
    
  }}
  onMouseEnter={(e) => {
    if (activeFeature !== 'visualization') {
      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    }
  }}
  onMouseLeave={(e) => {
    if (activeFeature !== 'visualization') {
      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    }
  }}
>
  Visualization
</button>
                <button
  onClick={() => setActiveFeature('breathing')}
  style={{
    backgroundColor: activeFeature === 'breathing' ? '#ddb0ffff' : 'rgba(255, 255, 255, 0.1)',
    padding: '0.5rem',
  
    
    fontSize: window.innerWidth < 768 ? '0.8rem' : '1rem',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    color: 'white',
    fontWeight: '500',
    
  }}
  onMouseEnter={(e) => {
    if (activeFeature !== 'breathing') {
      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    }
  }}
  onMouseLeave={(e) => {
    if (activeFeature !== 'breathing') {
      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    }
  }}
>
  Breathing
</button>
                <button
  onClick={() => setActiveFeature('senses')}
  style={{
    backgroundColor: activeFeature === 'senses' ? '#ddb0ffff' : 'rgba(255, 255, 255, 0.1)',
    padding: '0.5rem',
  marginRight: '10px',
   
    fontSize: window.innerWidth < 768 ? '0.8rem' : '1rem',
    transition: 'all 0.2s ease-in-out',
    cursor: 'pointer',
    color: 'white',
    fontWeight: '500',
    
  }}
  onMouseEnter={(e) => {
    if (activeFeature !== 'senses') {
      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    }
  }}
  onMouseLeave={(e) => {
    if (activeFeature !== 'senses') {
      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    }
  }}
>
  Senses
</button>
                
              </div>
            </div>
          </div>
        </div>

        {/* Active Feature Display */}
        <div className=" mt-4 rounded-xl backdrop-blur-sm overflow-hidden">
          {renderActiveFeature()}
        </div>
      </div>

      <Row>
          <Col md={12}>
          <div className="flex justify-content-center align-items-center" >
          <Link to="/Rooms" style={{ textDecoration: 'none'}}>
            <button  style={{display: 'flex', justifyContent: 'center', fontSize: '20px',
    color: 'white',
    cursor: 'pointer',
   
    justifySelf: 'center',
    backgroundColor: '#ffffff1a' ,
   width: window.innerWidth < 768 ? '30%' : '10%',
    margin: '8px'}}>Exit</button>
            </Link>
          </div>
          </Col>
      </Row>
      

     
    </div>
  );
};

export default ObservationDeck;