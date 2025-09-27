



import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
// colouring1.PNG

import { Stage, Layer, Line } from 'react-konva';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/dist/css/rcp.css";

const HoloRoom = () => {

     const [color, setColor] = useColor("hex", "#121212");
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const [undoneLines, setUndoneLines] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState('canvas');

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

    setCurrentIndex(randomIndex);
    setCurrentPrompt(categoryPrompts[randomIndex]);
  }
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
              width={window.innerWidth}
              height={window.innerHeight}
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


        {/* <Row>
            <Col >
                <h3 className="text-center mb-4">Journal Prompts</h3>
                <div className="d-flex justify-content-center gap-2" md={12}>
                <Button>Self-Reflection & Growth</Button>
                <Button>Dreams & Imagination</Button>
                <Button>Gratitude & Positivity</Button>
                <Button>Challenges & Resilience</Button>
                <Button>Relationships & Connections</Button>
                <Button>Future Visioning</Button>
                </div>
                <p className="text-center my-4">{currentPrompt}</p>
                <Button onClick={handleClick} className="d-flex justify-content-center text-center gap-2">Generate</Button>
            </Col>
        </Row> */}

        <Row>
            <Col >
            
                <h3 className="text-center mb-4">Journal Prompts</h3>
                <div className="d-flex justify-content-center gap-3" 
                md={12}>
        {Object.keys(prompts).map(channel => (
  <Button
    key={channel}
    variant={channel === currentJournalPrompt ? "info" : "outline-info"}
    onClick={() => {
      setCurrentJournalPrompt(channel);

      // grab a random prompt when button clicked
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
                   <Button
                     onClick={() => setActiveFeature('canvas')}
                     style={{ backgroundColor: activeFeature === 'canvas' ? "#17a2b8" : "" }}
                   >
                     Canvas
                   </Button>
                   <Button>Connect the lines</Button>
                   <Button>Moodboard</Button>
                 </div>
         
                 {renderActiveFeature()}
               </Col>
             </Row>

    </Container>
  )
}

export default HoloRoom
