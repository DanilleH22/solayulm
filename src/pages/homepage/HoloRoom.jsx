import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Line, Circle, Text,  } from 'react-konva';
import { Row, Col, Button, Container } from "react-bootstrap";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/dist/css/rcp.css";
import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image'; 
import { Transformer } from "react-konva";
import { Link } from "react-router";
import colouring1 from "../../assets/images/colouring1.PNG"
import colouring2 from "../../assets/images/colouring2.PNG"
import colouring3 from "../../assets/images/colouring3.PNG"
import colouring4 from "../../assets/images/colouring4.PNG"
import colouring5 from "../../assets/images/colouring5.PNG"
import colouring6 from "../../assets/images/colouring6.PNG"


const constellations = {
  orion: {
    name: "Orion",
    dots: [
      { x: 100, y: 100 },
      { x: 200, y: 150 },
      { x: 180, y: 250 },
      { x: 120, y: 240 },
      { x: 150, y: 180 },
      { x: 170, y: 200 },
      { x: 190, y: 180 }
    ]
  },
  cassiopeia: {
    name: "Cassiopeia",
    dots: [
      { x: 100, y: 300 },
      { x: 180, y: 250 },
      { x: 250, y: 280 },
      { x: 320, y: 240 },
      { x: 400, y: 260 }
    ]
  },
  bigDipper: {
    name: "Big Dipper",
    dots: [
      { x: 100, y: 500 },
      { x: 150, y: 470 },
      { x: 200, y: 490 },
      { x: 260, y: 450 },
      { x: 320, y: 430 },
      { x: 380, y: 440 },
      { x: 450, y: 420 }
    ]
  },
  cygnus: {
    name: "Cygnus",
    dots: [
      { x: 600, y: 200 },
      { x: 600, y: 300 },
      { x: 600, y: 400 },
      { x: 550, y: 350 },
      { x: 650, y: 350 }
    ]
  },
  perseus: {
    name: "Perseus",
    dots: [
      { x: 700, y: 100 },
      { x: 740, y: 160 },
      { x: 720, y: 220 },
      { x: 760, y: 280 },
      { x: 800, y: 220 },
      { x: 840, y: 160 }
    ]
  },
  lyra: {
    name: "Lyra",
    dots: [
      { x: 500, y: 100 },
      { x: 540, y: 140 },
      { x: 580, y: 100 },
      { x: 540, y: 60 }
    ]
  },
  draco: {
    name: "Draco",
    dots: [
      { x: 900, y: 400 },
      { x: 850, y: 350 },
      { x: 800, y: 360 },
      { x: 750, y: 340 },
      { x: 700, y: 300 },
      { x: 650, y: 320 },
      { x: 600, y: 280 }
    ]
  }
};

const HoloRoom = () => {

  const [color, setColor] = useColor("hex", "#121212");
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const [undoneLines, setUndoneLines] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState('canvas');
  const [img] = useImage(colouring1);
  const [currentConstellation, setCurrentConstellation] = useState("orion");
  const [moodImages, setMoodImages] = useState([]);
    const { name, dots } = constellations[currentConstellation];
    const [moodNotes, setMoodNotes] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const stageRef = useRef();
  
    const [progress, setProgress] = useState(0); // how many lines drawn

    const transformerRef = React.useRef();

      
    
    
      
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
     const prompts = {
      'Self Reflection' :  [
       "What is one belief you’ve outgrown, and what replaced it?",
       "How do you show up when you’re most authentic?",
       "Write about a time you surprised yourself.",
       "What habits make you feel aligned with your best self?",
       "If your younger self could see you now, what would they think?"
      ],
      'Dreams Imagination' : [
          "Describe your dream world in vivid detail.",
        "If you could time travel anywhere, where would you go and why?",
        "What superpower would you want, and how would you use it?",
        "Write about the last dream you had and what it might mean.",
        "If money and time were unlimited, what life would you create?",
      ],
      'Gratitude Positivity' : [
          "List three tiny things that made you smile today.",
        "What moment from this week are you most thankful for?",
        "Write a thank you letter to someone (past or present).",
        "What do you love most about your current environment?",
        "Name one challenge you’re grateful for and why."
      ],
      'Challenges Resilience' : [
          "What fear do you want to face, and what would it take?",
        "Describe a setback that shaped your strength.",
        "How do you soothe yourself when life feels heavy?",
        "What is a recurring challenge, and how might you approach it differently?",
        "Write about the last time you didn’t give up.",
      ],
      'Relationships Connection' : [
          "Who in your life makes you feel most seen?",
        "What boundaries do you need right now?",
        "Write about a relationship that taught you an important lesson.",
        "How do you nurture your friendships?",
        "What qualities do you value most in others?"
      ],
      'Future Vision' : [
          "Describe your life five years from now as if it’s already real.",
        "What steps can you take this month toward your dream life?",
        "What does success look like to you personally?",
        "If you could design your perfect day, how would it unfold?",
        "What kind of legacy do you want to leave?"
      ],
    };
    
     const [currentJournalPrompt, setCurrentJournalPrompt] = useState(null);
    const playlist = prompts[currentJournalPrompt];
    
    const [currentPrompt, setCurrentPrompt] = useState("");
    
    
    const getRandomPrompt = (category) => {
      const categoryPrompts = prompts[category];
      return categoryPrompts[Math.floor(Math.random() * categoryPrompts.length)];
    };
        // In your component
        // const [currentPrompt, setCurrentPrompt] = useState(getRandomPrompt());
        
        const handleClick = () => {
          const newPrompt = getRandomPrompt();
          setCurrentPrompt(newPrompt);
        };
    
     const [currentChannel, setCurrentChannel] = useState("selfReflection");
     const [currentIndex, setCurrentIndex] = useState(0);
    const handleNext = () => {
  if (currentChannel) {
    const categoryPrompts = prompts[currentChannel];
    const randomIndex = Math.floor(Math.random() * categoryPrompts.length);
    setCurrentPrompt(categoryPrompts[randomIndex]);
  }
};

    

useEffect(() => {
  if (selectedId && transformerRef.current && stageRef.current) {
    const node = stageRef.current.findOne(`#${selectedId}`);
    if (node) {
      transformerRef.current.nodes([node]);
      transformerRef.current.getLayer().batchDraw();
    }
  }
}, [selectedId]);

  
    const handleStarClick = (index) => {
      if (index === progress) {
        setProgress(progress + 1);
      }
    };



const DraggableImage = ({ src, x, y }) => {
  const [image] = useImage(src);
  return (
    <KonvaImage
      image={image}
      x={x}
      y={y}
      draggable
      width={150}
      height={150}
      shadowBlur={10}
    />
  );
};



  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { tool, points: [pos.x, pos.y], color: color.hex }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const handleUndo = () => {
    if (lines.length === 0) return;
    const newLines = [...lines];
    const undone = newLines.pop();
    setLines(newLines);
    setUndoneLines([...undoneLines, undone]);
  };

  const handleRedo = () => {
    if (undoneLines.length === 0) return;
    const newUndone = [...undoneLines];
    const line = newUndone.pop();
    setUndoneLines(newUndone);
    setLines([...lines, line]);
  };

  const handleFeatureChange = (feature) => {
  setActiveFeature(feature);
  if (feature === 'canvas' || feature === 'colouring') {
    setLines([]);
    setUndoneLines([]);
  }
  setIsVisible(false);
};


  const renderActiveFeature = () => {
    switch (activeFeature) {
      case 'canvas':
        return (
          <div>
            <div className="d-flex justify-content-center gap-2 my-3">
              <Button onClick={() => { setTool("pen"); setIsVisible(!isVisible); }} variant='outline-info'>
                Pen
              </Button>
              <Button onClick={() => { setTool("eraser"); setIsVisible(false); }} variant='outline-info'>
                Eraser
              </Button>
              <Button onClick={handleUndo} variant='outline-info'>Undo</Button>
              <Button onClick={handleRedo} variant='outline-info'>Redo</Button>
            </div>

            {isVisible && tool === "pen" && (
              <ColorPicker
                width={100}
                height={120}
                color={color}
                onChange={setColor}
                hideHSV
                dark
              />
            )}
            

            <Stage
              width={1000}
              height={600}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
            >
              <Layer>
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={line.tool === "eraser" ? "white" : line.color}
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={
                      line.tool === "eraser" ? "destination-out" : "source-over"
                    }
                  />
                ))}
              </Layer>
            </Stage>
          </div>
        );
      case 'colouring':
        return (
          <div>
            <div className="d-flex justify-content-center gap-2 my-3">
              <Button onClick={() => { setTool("pen"); setIsVisible(!isVisible); }} variant='outline-info'>
                Pen
              </Button>
              <Button onClick={() => { setTool("eraser"); setIsVisible(false); }} variant='outline-info'>
                Eraser
              </Button>
              <Button onClick={handleUndo} variant='outline-info'>Undo</Button>
              <Button onClick={handleRedo} variant='outline-info'>Redo</Button>
            </div>

            {isVisible && tool === "pen" && (
              <ColorPicker
                width={100}
                height={120}
                color={color}
                onChange={setColor}
                hideHSV
                dark
              />
            )}

            <div>
                <Stage
  width={window.innerWidth}
  height={window.innerHeight}
  onMouseDown={handleMouseDown}
  onMouseMove={handleMouseMove}
  onMouseUp={handleMouseUp}
>
  <Layer>
    {/* Background colouring image */}
    {img && (
      <KonvaImage 
        image={img} 
        width={window.innerWidth / 2} 
        height={window.innerHeight / 2} 
      />
    )}

    {/* User drawings on top */}
    {lines.map((line, i) => (
      <Line
        key={i}
        points={line.points}
        stroke={line.tool === "eraser" ? "white" : line.color}
        strokeWidth={5}
        tension={0.5}
        lineCap="round"
        lineJoin="round"
        globalCompositeOperation={
          line.tool === "eraser" ? "destination-out" : "source-over"
        }
      />
    ))}
  </Layer>
</Stage>
             </div  >
          </div>
        );

        
        case 'connect the dots':
        return (
         <Container>
        {/* Buttons to switch constellation + reset */}
      <Row >
        <Col>
        
      <div style={{ textAlign: "center", marginTop: "20px" }} className="d-flex justify-content-center gap-2 my-3">
  {Object.keys(constellations).map((key) => (
    <Button
        variant='outline-info'
      key={key}
      onClick={() => {
        setCurrentConstellation(key);
        setProgress(0);
      }}
    >
      {constellations[key].name}
    </Button>
  ))}
  
</div>
</Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center gap-2 my-3">
        <div className="text-center w-25">
            <Button
        variant='outline-info' onClick={() => setProgress(0)}>Reset</Button>
            </div></Col>
      </Row>
        <Row>
            <Col>
            
      <h2 style={{ textAlign: "center", color: "white" }}>
        {name}
      </h2>
</Col>
        </Row>
      <Stage  width={1000}
  height={600}>
        <Layer>
          {/* Already connected lines */}
          {dots.slice(0, progress + 1).map((dot, i) => {
            if (i === 0) return null;
            return (
              <Line
                key={i}
                points={[
                  dots[i - 1].x,
                  dots[i - 1].y,
                  dots[i].x,
                  dots[i].y
                ]}
                stroke="white"
                strokeWidth={2}
                lineCap="round"
              />
            );
          })}

          {/* Stars */}
          {dots.map((dot, i) => (
            <React.Fragment key={i}>
              <Circle
                x={dot.x}
                y={dot.y}
                radius={8}
                fill={i < progress ? "#fbce5dff" : "white"} //fbce5dff
                stroke="blue"
                strokeWidth={1}
                onClick={() => handleStarClick(i)}
              />
              <Text
                x={dot.x + 10}
                y={dot.y - 10}
                text={`${i + 1}`}
                fontSize={14}
                fill="lightblue"
              />
            </React.Fragment>
          ))}
        </Layer>
      </Stage>

      
      
    </Container>
        );
        case "moodboard":
          return (
            <div>
              <div className="d-flex justify-content-center gap-2 my-3">
               
                <input
               variant='outline-info'
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setMoodImages([...moodImages, url]);
                    }
                  }}
                />
              
                 <Button
                  variant='outline-info'
  onClick={() => {
    const uri = stageRef.current.toDataURL();
    const link = document.createElement("a");
    link.download = "moodboard.png";
    link.href = uri;
    link.click();
  }}
>
  Save as Image
</Button>
                <Button
                 variant='outline-info'
  onClick={() =>
    setMoodNotes([
      ...moodNotes,
      { text: "New note", x: 100, y: 100, id: Date.now() },
    ])
  }
>
  + Add Note
</Button>
              </div>
        
              <Stage ref={stageRef}  width={800} height={600} style={{ border: "1px solid #ccc" }}>
                
                <Layer>
                  <Text text="Drag your images around ✨" x={10} y={10} fontSize={18} />
                  {moodImages.map((src, i) => (
                    <DraggableImage key={i} src={src} x={50 + i * 30} y={80 + i * 30} />
                  ))}
                  {moodNotes.map((note) => (
  <Text
    key={note.id}
    id={note.id.toString()} // important for Transformer lookup
    text={note.text}
    x={note.x}
    y={note.y}
    draggable
    fontSize={18}
    fill="white"
    onClick={() => setSelectedId(note.id)}
    onDblClick={() => {
      const newText = prompt("Edit note:", note.text);
      if (newText) {
        setMoodNotes(
          moodNotes.map((n) =>
            n.id === note.id ? { ...n, text: newText } : n
          )
        );
      }
    }}
  />
))}

{selectedId && (
  <Transformer
  ref={transformerRef}
  rotateEnabled={true}
  enabledAnchors={[
    "middle-left",
    "middle-right",
    "top-center",
    "bottom-center",
  ]}
/>
)}

                </Layer>
              </Stage>
             


            </div>
          );
      default:
        return null;
      
    }
  };



   
      



  return (
    <Container>
     <Row className="text-center mb-4">
                <Col>
                <h2>Holo Room (Creative Release)</h2>
                <p>Immersive holographic creative tools—painting, soundscapes, world-building, and 3D storytelling environments.</p>
                </Col>
            </Row>
    
            <Row >
                <Col>
                    <h2 className="text-center mb-4">How does it work?</h2>
                    <ol style={{listStylePosition: 'outside'}}>
                   
    <li><h5>Enter the Holo Room</h5></li>
    <p>Step into your space where you can freely create, connect, and explore.</p>
    <li><h5>Start with the Canvas</h5></li>
    <p>Use your mouse (or touch) to draw freeform stardust lines across the canvas.</p>
    <p>Choose Free Drawing Mode for loose, expressive sketches.</p>
    <p>Switch to Coloring Mode to fill shapes, blend hues, and play with textures.</p>
    <li><h5>Connect the Lines</h5></li>
    <p>Link your strokes together to build constellations, abstract patterns, or anything your imagination sparks.</p>
    <li><h5>Build Your Moodboard</h5></li>
    <p>Instead of pre-made stickers, you can:</p>
    <p>Draw your own symbols, shapes, or doodles.</p>
    <p>Drag images or textures (space photos, color swatches, quotes) directly onto the canvas to layer your board.</p>
    <p>Rearrange or resize them freely to shape your personal constellation of ideas.</p>
    <li><h5>Release & Explore</h5></li>
    <p>Your board can be messy or minimal — it’s about expressing your current vibe, inspiration, or emotion.</p>
    <li><h5>Save or Reset</h5></li>
    <p>Save your board if you want to revisit your creative galaxy later.</p>
    <p>Or clear the canvas to start fresh with new stardust.</p>
                    </ol>
                </Col>
            </Row>
    
    
          
    
            <Row>
                <Col >
                
                    <h3 className="text-center my-4">Journal Prompts</h3>
                    <p className="text-center mb-4">If you feel stuck and need something to think on, pick a journal prompt.</p>
                    <div className="d-flex justify-content-center gap-3" 
                    md={12}>
           {Object.keys(prompts).map(channel => (
  <Button
    key={channel}
    variant={channel === currentChannel ? "info" : "outline-info"}
    onClick={() => {
      setCurrentJournalPrompt(channel);
      setCurrentChannel(channel); // << add this
      const categoryPrompts = prompts[channel];
      const randomPrompt = categoryPrompts[Math.floor(Math.random() * categoryPrompts.length)];
      setCurrentPrompt(randomPrompt);
    }}
  >
    {channel}
  </Button>
))}

    
    {/* {currentPrompt && (
      <div className="mt-4 p-3 border rounded text-center">
        <h3>{currentPrompt}</h3>
      </div> 
    )}*/}
    
    </div>
                    <p className="text-center my-4">{currentPrompt}</p>
                    <div className="d-flex justify-content-center text-center ">
                    <Button onClick={handleNext}
                    variant='outline-info'
                    className='w-25'
                     >
                      Generate New
                     </Button>
                     </div>
                </Col>
            </Row>
    <Row>
      <Col>
        <h3 className="text-center my-4">Choose your creative release:</h3>
        <div className="d-flex justify-content-center gap-2" md={12}>
          <Button onClick={() => handleFeatureChange('canvas')} 
            style={{ backgroundColor: activeFeature === 'canvas' ? "#17a2b8" : "" }}> Canvas </Button>

<Button onClick={() => handleFeatureChange('colouring')}
  style={{ backgroundColor: activeFeature === 'colouring' ? "#17a2b8" : "" }}> Colouring </Button>

          <Button onClick={() => setActiveFeature('connect the dots')}
            style={{ backgroundColor: activeFeature === 'connect the dots' ? "#17a2b8" : "" }}>Connect the lines</Button>
          <Button onClick={() => setActiveFeature('moodboard')}
            style={{ backgroundColor: activeFeature === 'moodboard' ? "#17a2b8" : "" }}>Moodboard</Button>
        </div>

        {renderActiveFeature()}
      </Col>
    </Row>
     <Row>
                <Col md={12}>
                <div className="flex justify-content-center align-items-center" >
                <Link to="/Rooms" style={{ textDecoration: 'none'}}>
                  <Button variant="outline-info"  style={{display: 'flex', justifyContent: 'center', fontSize: '20px',
          color: 'white',
          cursor: 'pointer',
          width: '10%',
          justifySelf: 'center',
          
         
          marginTop: '60px'}}>Exit</Button>
                  </Link>
                </div>
                </Col>
            </Row>
    </Container>
  );
};

export default HoloRoom;
