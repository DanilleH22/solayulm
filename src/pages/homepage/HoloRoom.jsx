import React, { useState, useRef, useEffect } from 'react';
import {
  Stage,
  Layer,
  Line,
  Circle,
  Text,
  Image as KonvaImage,
  Transformer,
} from 'react-konva';
import { ColorPicker, useColor } from 'react-color-palette';
import 'react-color-palette/dist/css/rcp.css';
import useImage from 'use-image';
import { Link, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import styles from '../../styles/HoloRoom.module.css';
import colouring1 from '../../assets/images/colouring/colouring1.png';
import colouring2 from '../../assets/images/colouring/colouring2.png';
import colouring3 from '../../assets/images/colouring/colouring3.png';
import colouring4 from '../../assets/images/colouring/colouring4.png';
import colouring5 from '../../assets/images/colouring/colouring5.png';
import colouring6 from '../../assets/images/colouring/colouring6.png';
import colouring7 from '../../assets/images/colouring/colouring7.png';
import colouring8 from '../../assets/images/colouring/colouring8.png';
import colouring9 from '../../assets/images/colouring/colouring9.png';
import colouring10 from '../../assets/images/colouring/colouring10.png';
import colouring11 from '../../assets/images/colouring/colouring11.png';
import colouring12 from '../../assets/images/colouring/colouring12.png';
import colouring13 from '../../assets/images/colouring/colouring13.png';
import colouring14 from '../../assets/images/colouring/colouring14.png';
import colouring15 from '../../assets/images/colouring/colouring15.png';

import IncomingTransmission from "../../components/IncomingTransmission.jsx";

const STAGE_WIDTH = 900;
const STAGE_HEIGHT = 600;
const constellations = {
  orion: {
    name: 'Orion',
    dots: [
      { x: 70, y: 70 },
      { x: 240, y: 130 },
      { x: 220, y: 320 },
      { x: 90, y: 300 },
      { x: 150, y: 180 },
      { x: 180, y: 230 },
      { x: 230, y: 170 },
    ],
  },
  cassiopeia: {
    name: 'Cassiopeia',
    dots: [
      { x: 80, y: 320 },
      { x: 190, y: 250 },
      { x: 280, y: 290 },
      { x: 360, y: 230 },
      { x: 450, y: 260 },
    ],
  },
  bigDipper: {
    name: 'Big Dipper',
    dots: [
      { x: 80, y: 520 },
      { x: 140, y: 470 },
      { x: 210, y: 500 },
      { x: 290, y: 450 },
      { x: 360, y: 420 },
      { x: 430, y: 435 },
      { x: 510, y: 410 },
    ],
  },
  cygnus: {
    name: 'Cygnus',
    dots: [
      { x: 600, y: 170 },
      { x: 600, y: 300 },
      { x: 600, y: 430 },
      { x: 540, y: 350 },
      { x: 660, y: 350 },
    ],
  },
  perseus: {
    name: 'Perseus',
    dots: [
      { x: 680, y: 80 },
      { x: 740, y: 160 },
      { x: 710, y: 250 },
      { x: 770, y: 330 },
      { x: 830, y: 250 },
      { x: 880, y: 160 },
    ],
  },
  lyra: {
    name: 'Lyra',
    dots: [
      { x: 480, y: 100 },
      { x: 540, y: 160 },
      { x: 600, y: 100 },
      { x: 540, y: 40 },
    ],
  },
  draco: {
    name: 'Draco',
    dots: [
      { x: 920, y: 420 },
      { x: 860, y: 350 },
      { x: 790, y: 365 },
      { x: 720, y: 335 },
      { x: 650, y: 290 },
      { x: 580, y: 320 },
      { x: 500, y: 270 },
    ],
  },

    ursaMajor: {
    name: 'Ursa Major',
    dots: [
      { x: 120, y: 120 },
      { x: 200, y: 90 },
      { x: 270, y: 130 },
      { x: 340, y: 100 },
      { x: 410, y: 140 },
      { x: 470, y: 110 },
      { x: 520, y: 170 },
    ],
  },
  ursaMinor: {
    name: 'Ursa Minor',
    dots: [
      { x: 80, y: 200 },
      { x: 140, y: 180 },
      { x: 200, y: 210 },
      { x: 250, y: 190 },
      { x: 300, y: 230 },
      { x: 260, y: 280 },
      { x: 210, y: 320 },
    ],
  },
  scorpius: {
    name: 'Scorpius',
    dots: [
      { x: 750, y: 90 },
      { x: 800, y: 130 },
      { x: 830, y: 190 },
      { x: 810, y: 250 },
      { x: 770, y: 300 },
      { x: 730, y: 350 },
      { x: 680, y: 390 },
      { x: 640, y: 350 },
      { x: 620, y: 290 },
    ],
  },
  leo: {
    name: 'Leo',
    dots: [
      { x: 100, y: 400 },
      { x: 170, y: 370 },
      { x: 240, y: 390 },
      { x: 300, y: 350 },
      { x: 360, y: 380 },
      { x: 320, y: 450 },
      { x: 250, y: 480 },
    ],
  },
  taurus: {
    name: 'Taurus',
    dots: [
      { x: 400, y: 480 },
      { x: 460, y: 440 },
      { x: 530, y: 470 },
      { x: 600, y: 430 },
      { x: 560, y: 540 },
      { x: 490, y: 560 },
      { x: 430, y: 540 },
    ],
  },
  gemini: {
    name: 'Gemini',
    dots: [
      { x: 300, y: 200 },
      { x: 340, y: 260 },
      { x: 360, y: 330 },
      { x: 380, y: 400 },
      { x: 420, y: 180 },
      { x: 460, y: 240 },
      { x: 490, y: 310 },
      { x: 520, y: 380 },
      { x: 410, y: 300 },
    ],
  },
  aquila: {
    name: 'Aquila',
    dots: [
      { x: 700, y: 480 },
      { x: 740, y: 420 },
      { x: 780, y: 480 },
      { x: 820, y: 420 },
      { x: 860, y: 480 },
      { x: 780, y: 540 },
    ],
  },
  pegasus: {
    name: 'Pegasus',
    dots: [
      { x: 150, y: 60 },
      { x: 250, y: 60 },
      { x: 300, y: 150 },
      { x: 200, y: 150 },
      { x: 250, y: 60 },
    ],
  },
  sagittarius: {
    name: 'Sagittarius',
    dots: [
      { x: 550, y: 200 },
      { x: 620, y: 180 },
      { x: 680, y: 220 },
      { x: 700, y: 290 },
      { x: 660, y: 350 },
      { x: 590, y: 360 },
      { x: 540, y: 310 },
      { x: 530, y: 250 },
      { x: 610, y: 270 },
    ],
  },
  virgo: {
    name: 'Virgo',
    dots: [
      { x: 60, y: 450 },
      { x: 130, y: 480 },
      { x: 200, y: 460 },
      { x: 270, y: 490 },
      { x: 340, y: 470 },
      { x: 300, y: 410 },
      { x: 220, y: 400 },
      { x: 150, y: 410 },
    ],
  },  crux: {
    name: 'Crux',
    dots: [
      { x: 430, y: 80 },
      { x: 430, y: 220 },
      { x: 360, y: 150 },
      { x: 500, y: 150 },
      { x: 470, y: 190 },
    ],
  },
  canisMajor: {
    name: 'Canis Major',
    dots: [
      { x: 120, y: 160 },
      { x: 170, y: 220 },
      { x: 200, y: 290 },
      { x: 170, y: 360 },
      { x: 220, y: 420 },
      { x: 130, y: 320 },
      { x: 90, y: 250 },
    ],
  },
  canisMinor: {
    name: 'Canis Minor',
    dots: [
      { x: 320, y: 120 },
      { x: 380, y: 180 },
      { x: 330, y: 240 },
    ],
  },
  auriga: {
    name: 'Auriga',
    dots: [
      { x: 620, y: 60 },
      { x: 690, y: 100 },
      { x: 740, y: 170 },
      { x: 700, y: 240 },
      { x: 620, y: 230 },
      { x: 580, y: 160 },
    ],
  },
  bootes: {
    name: 'Boötes',
    dots: [
      { x: 820, y: 60 },
      { x: 860, y: 130 },
      { x: 880, y: 210 },
      { x: 850, y: 280 },
      { x: 790, y: 260 },
      { x: 760, y: 190 },
      { x: 780, y: 120 },
    ],
  },
  coronaBorealis: {
    name: 'Corona Borealis',
    dots: [
      { x: 60, y: 560 },
      { x: 110, y: 530 },
      { x: 160, y: 520 },
      { x: 210, y: 530 },
      { x: 260, y: 560 },
    ],
  },
  cancer: {
    name: 'Cancer',
    dots: [
      { x: 400, y: 520 },
      { x: 450, y: 500 },
      { x: 500, y: 520 },
      { x: 470, y: 560 },
      { x: 430, y: 570 },
    ],
  },
  aries: {
    name: 'Aries',
    dots: [
      { x: 700, y: 400 },
      { x: 760, y: 420 },
      { x: 820, y: 400 },
      { x: 800, y: 460 },
    ],
  },
  pisces: {
    name: 'Pisces',
    dots: [
      { x: 60, y: 80 },
      { x: 120, y: 60 },
      { x: 180, y: 80 },
      { x: 220, y: 130 },
      { x: 260, y: 180 },
      { x: 320, y: 220 },
      { x: 380, y: 260 },
      { x: 420, y: 320 },
      { x: 480, y: 360 },
    ],
  },
  capricornus: {
    name: 'Capricornus',
    dots: [
      { x: 800, y: 560 },
      { x: 860, y: 540 },
      { x: 890, y: 490 },
      { x: 850, y: 460 },
      { x: 800, y: 470 },
      { x: 770, y: 510 },
    ],
  },
  aquarius: {
    name: 'Aquarius',
    dots: [
      { x: 100, y: 380 },
      { x: 160, y: 360 },
      { x: 220, y: 380 },
      { x: 260, y: 330 },
      { x: 310, y: 300 },
      { x: 350, y: 260 },
    ],
  },
  corvus: {
    name: 'Corvus',
    dots: [
      { x: 480, y: 420 },
      { x: 540, y: 400 },
      { x: 580, y: 440 },
      { x: 540, y: 490 },
      { x: 480, y: 480 },
      { x: 450, y: 450 },
    ],
  },
  sagitta: {
    name: 'Sagitta',
    dots: [
      { x: 660, y: 560 },
      { x: 700, y: 540 },
      { x: 740, y: 560 },
      { x: 720, y: 590 },
    ],
  },
};
const prompts = {
  'Self Reflection': [
    'What is one belief you’ve outgrown, and what replaced it?',
    'How do you show up when you’re most authentic?',
    'Write about a time you surprised yourself.',
    'What habits make you feel aligned with your best self?',
    'If your younger self could see you now, what would they think?',
  ],
  'Dreams Imagination': [
    'Describe your dream world in vivid detail.',
    'If you could time travel anywhere, where would you go and why?',
    'What superpower would you want, and how would you use it?',
    'Write about the last dream you had and what it might mean.',
    'If money and time were unlimited, what life would you create?',
  ],
  'Gratitude Positivity': [
    'List three tiny things that made you smile today.',
    'What moment from this week are you most thankful for?',
    'Write a thank you letter to someone, past or present.',
    'What do you love most about your current environment?',
    'Name one challenge you are grateful for and why.',
  ],
  'Challenges Resilience': [
    'What fear do you want to face, and what would it take?',
    'Describe a setback that shaped your strength.',
    'How do you soothe yourself when life feels heavy?',
    'What is a recurring challenge, and how might you approach it differently?',
    'Write about the last time you didn’t give up.',
  ],
  Connection: [
    'Who in your life makes you feel most seen?',
    'What boundaries do you need right now?',
    'Write about a relationship that taught you an important lesson.',
    'How do you nurture your friendships?',
    'What qualities do you value most in others?',
  ],
  'Future Vision': [
    'Describe your life five years from now as if it is already real.',
    'What steps can you take this month toward your dream life?',
    'What does success look like to you personally?',
    'If you could design your perfect day, how would it unfold?',
    'What kind of legacy do you want to leave?',
  ],
};
const colouringPages = [
  { id: 'colouring1', src: colouring1 },
  { id: 'colouring2', src: colouring2 },
  { id: 'colouring3', src: colouring3 },
  { id: 'colouring4', src: colouring4 },
  { id: 'colouring5', src: colouring5 },
  { id: 'colouring6', src: colouring6 },
  { id: 'colouring7', src: colouring7 },
  { id: 'colouring8', src: colouring8 },
  { id: 'colouring9', src: colouring9 },
  { id: 'colouring10', src: colouring10 },
  { id: 'colouring11', src: colouring11 },
  { id: 'colouring12', src: colouring12 },
  { id: 'colouring13', src: colouring13 },
  { id: 'colouring14', src: colouring14 },
  { id: 'colouring15', src: colouring15 },
];
const toolTabs = [
  { id: 'canvas', label: 'Free Canvas' },
  { id: 'colouring', label: 'Colouring' },
  { id: 'connect the dots', label: 'Constellations' },
  { id: 'moodboard', label: 'Moodboard' },
];
function DraggableMoodImage({ src, x, y, onDragEnd }) {
  const [image] = useImage(src);
  if (!image) return null;
  const ratio = Math.min(150 / image.width, 150 / image.height, 1);
  return (
    <KonvaImage
      image={image}
      x={x}
      y={y}
      width={image.width * ratio}
      height={image.height * ratio}
      draggable
      onDragEnd={onDragEnd}
    />
  );
}
const HoloRoom = () => {
  const [color, setColor] = useColor('hex', '#ddb0ff');
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const [undoneLines, setUndoneLines] = useState([]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [activeFeature, setActiveFeature] = useState('canvas');
  const [currentConstellation, setCurrentConstellation] = useState('orion');
  const [progress, setProgress] = useState(0);
  const [moodImages, setMoodImages] = useState([]);
  const [moodNotes, setMoodNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [currentColouringImage, setCurrentColouringImage] = useState(
    colouringPages[0].src
  );
  const [currentChannel, setCurrentChannel] = useState('Self Reflection');
  const [currentPrompt, setCurrentPrompt] = useState(
    prompts['Self Reflection'][0]
  );
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 900
  );
  const isDrawing = useRef(false);
  const stageRef = useRef(null);
  const transformerRef = useRef(null);
  const drawingLayerRef = useRef(null);
  const moodImageUrls = useRef([]);
  const [colouringImage] = useImage(currentColouringImage);
  const {
    name: constellationName,
    dots,
  } = constellations[currentConstellation];
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (!selectedId || !transformerRef.current || !stageRef.current) {
      if (transformerRef.current) {
        transformerRef.current.nodes([]);
      }
      return;
    }
    const node = stageRef.current.findOne(`#${selectedId}`);
    if (node) {
      transformerRef.current.nodes([node]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedId, moodNotes]);
  useEffect(() => {
    return () => {
      moodImageUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);
  const getPointerPosition = (event) => {
    const stage = event.target.getStage();
    return stage?.getPointerPosition();
  };
  const handleDrawingStart = (event) => {
    if (event.evt) {
      event.evt.preventDefault();
    }
    const position = getPointerPosition(event);
    if (!position) return;
    isDrawing.current = true;
    setUndoneLines([]);
    setLines((previousLines) => [
      ...previousLines,
      {
        tool,
        points: [position.x, position.y],
        color: color.hex,
      },
    ]);
  };
  const handleDrawingMove = (event) => {
    if (!isDrawing.current) return;
    const position = getPointerPosition(event);
    if (!position) return;
    setLines((previousLines) => {
      if (previousLines.length === 0) return previousLines;
      const updatedLines = [...previousLines];
      const lastLine = updatedLines[updatedLines.length - 1];
      updatedLines[updatedLines.length - 1] = {
        ...lastLine,
        points: [...lastLine.points, position.x, position.y],
      };
      return updatedLines;
    });
  };
  const handleDrawingEnd = () => {
    isDrawing.current = false;
  };
  const handleUndo = () => {
    if (!lines.length) return;
    const lastLine = lines[lines.length - 1];
    setUndoneLines((previousUndone) => [...previousUndone, lastLine]);
    setLines((previousLines) => previousLines.slice(0, -1));
  };
  const handleRedo = () => {
    if (!undoneLines.length) return;
    const lastUndone = undoneLines[undoneLines.length - 1];
    setLines((previousLines) => [...previousLines, lastUndone]);
    setUndoneLines((previousUndone) => previousUndone.slice(0, -1));
  };
  const handleClear = () => {
    setLines([]);
    setUndoneLines([]);
    isDrawing.current = false;
  };
  const handleFeatureChange = (feature) => {
    setActiveFeature(feature);
    setShowColorPicker(false);
    setSelectedId(null);
    handleClear();
  };
  const handleNextColouring = () => {
    const otherPages = colouringPages.filter(
      (page) => page.src !== currentColouringImage
    );
    const randomPage =
      otherPages[Math.floor(Math.random() * otherPages.length)];
    if (randomPage) {
      setCurrentColouringImage(randomPage.src);
    }
    handleClear();
  };
  const saveStageAsImage = (fileName) => {
    const stage = stageRef.current;
    if (!stage) return;
    const uri = stage.toDataURL({ pixelRatio: 2 });
    const link = document.createElement('a');
    link.download = fileName;
    link.href = uri;
    link.click();
  };
  const handleSelectPromptCategory = (category) => {
    setCurrentChannel(category);
    const categoryPrompts = prompts[category];
    const randomPrompt =
      categoryPrompts[Math.floor(Math.random() * categoryPrompts.length)];
    setCurrentPrompt(randomPrompt);
  };
  const handleNextPrompt = () => {
    const categoryPrompts = prompts[currentChannel];
    if (!categoryPrompts) return;
    const otherPrompts = categoryPrompts.filter(
      (prompt) => prompt !== currentPrompt
    );
    const availablePrompts =
      otherPrompts.length > 0 ? otherPrompts : categoryPrompts;
    setCurrentPrompt(
      availablePrompts[Math.floor(Math.random() * availablePrompts.length)]
    );
  };
  const handleStarClick = (index) => {
    if (index === progress) {
      setProgress((previousProgress) => previousProgress + 1);
    }
  };
  const handleConstellationChange = (key) => {
    setCurrentConstellation(key);
    setProgress(0);
  };
  const handleMoodImageUpload = (event) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter((file) =>
      file.type.startsWith('image/')
    );
    const newImages = imageFiles.map((file, index) => {
      const src = URL.createObjectURL(file);
      moodImageUrls.current.push(src);
      return {
        id: `${Date.now()}-${index}-${Math.random()}`,
        src,
        x: 40 + ((moodImages.length + index) % 5) * 150,
        y: 70 + ((moodImages.length + index) % 3) * 150,
      };
    });
    setMoodImages((previousImages) => [...previousImages, ...newImages]);
    event.target.value = '';
  };
  const addMoodNote = () => {
    const id = Date.now();
    setMoodNotes((previousNotes) => [
      ...previousNotes,
      {
        id,
        text: 'Double-click to edit',
        x: 100 + (previousNotes.length % 5) * 25,
        y: 100 + (previousNotes.length % 5) * 25,
      },
    ]);
    setSelectedId(id);
  };
  const editMoodNote = (note) => {
    const updatedText = window.prompt('Edit your note:', note.text);
    if (updatedText === null || !updatedText.trim()) return;
    setMoodNotes((previousNotes) =>
      previousNotes.map((item) =>
        item.id === note.id
          ? { ...item, text: updatedText.trim() }
          : item
      )
    );
  };
  const updateMoodNotePosition = (noteId, event) => {
    const { x, y } = event.target.position();
    setMoodNotes((previousNotes) =>
      previousNotes.map((note) =>
        note.id === noteId ? { ...note, x, y } : note
      )
    );
  };
  const updateMoodImagePosition = (imageId, event) => {
    const { x, y } = event.target.position();
    setMoodImages((previousImages) =>
      previousImages.map((image) =>
        image.id === imageId ? { ...image, x, y } : image
      )
    );
  };

  const [showTransmission, setShowTransmission] = useState(false);
const navigate = useNavigate();

  const renderToolbar = () => (
    <>
      <div className={styles.toolbar}>
        <button
          type='button'
          className={`${styles.toolButton} ${
            tool === 'pen' ? styles.toolButtonActive : ''
          }`}
          onClick={() => {
            setTool('pen');
            setShowColorPicker((visible) => !visible);
          }}
        >
          ✦ Pen
        </button>
        <button
          type='button'
          className={`${styles.toolButton} ${
            tool === 'eraser' ? styles.toolButtonActive : ''
          }`}
          onClick={() => {
            setTool('eraser');
            setShowColorPicker(false);
          }}
        >
          Eraser
        </button>
        <button
          type='button'
          className={styles.toolButton}
          onClick={handleUndo}
          disabled={!lines.length}
        >
          ↶ Undo
        </button>
        <button
          type='button'
          className={styles.toolButton}
          onClick={handleRedo}
          disabled={!undoneLines.length}
        >
          ↷ Redo
        </button>
      </div>
      {showColorPicker && tool === 'pen' && (
        <div className={styles.colorPickerWrap}>
          <ColorPicker
            width={220}
            height={140}
            color={color}
            onChange={setColor}
            hideHSV
            dark
          />
        </div>
      )}
    </>
  );
  const renderDrawingLines = () =>
    lines.map((line, index) => (
      <Line
        key={index}
        points={line.points}
        stroke={line.color}
        strokeWidth={line.tool === 'eraser' ? 22 : 5}
        tension={0.35}
        lineCap='round'
        lineJoin='round'
        globalCompositeOperation={
          line.tool === 'eraser' ? 'destination-out' : 'source-over'
        }
      />
    ));
  const handleClearMoodboard = () => {
  setMoodImages([]);
  setMoodNotes([]);
  setSelectedId(null);
};

  const renderActiveFeature = () => {
    switch (activeFeature) {
      case 'canvas':
        return (
          <div className={styles.toolPanel}>
            <h3 className={styles.toolHeading}>Free Canvas</h3>
            <p className={styles.toolDescription}>
              Let your thoughts take shape through colour, lines and movement.
            </p>
            {renderToolbar()}
            <div className={styles.actionRow}>
              <button
                type='button'
                className={styles.actionButton}
                onClick={handleClear}
              >
                Clear canvas
              </button>
              <button
                type='button'
                className={styles.actionButton}
                onClick={() => saveStageAsImage('holo-canvas.png')}
              >
                Save image
              </button>
            </div>
            <div className={styles.canvasContainer}>
              <Stage
                ref={stageRef}
                width={STAGE_WIDTH}
                height={STAGE_HEIGHT}
                onMouseDown={handleDrawingStart}
                onMouseMove={handleDrawingMove}
                onMouseUp={handleDrawingEnd}
                onMouseLeave={handleDrawingEnd}
                onTouchStart={handleDrawingStart}
                onTouchMove={handleDrawingMove}
                onTouchEnd={handleDrawingEnd}
                onTouchCancel={handleDrawingEnd}
              >
                <Layer ref={drawingLayerRef}>
                  {renderDrawingLines()}
                </Layer>
              </Stage>
            </div>
          </div>
        );
      case 'colouring':
        return (
          <div className={styles.toolPanel}>
            <h3 className={styles.toolHeading}>Colouring Space</h3>
            <p className={styles.toolDescription}>
              Take your time. There is no right or wrong way to colour.
            </p>
            {renderToolbar()}
            <div className={styles.actionRow}>
              <button
                type='button'
                className={styles.actionButton}
                onClick={handleNextColouring}
              >
                New colouring page
              </button>
              <button
                type='button'
                className={styles.actionButton}
                onClick={handleClear}
              >
                Clear colouring
              </button>
              <button
                type='button'
                className={styles.actionButton}
                onClick={() => saveStageAsImage('holo-colouring.png')}
              >
                Save image
              </button>
            </div>
            <div className={styles.canvasContainer}>
              <Stage
                ref={stageRef}
                width={STAGE_WIDTH}
                height={STAGE_HEIGHT}
                onMouseDown={handleDrawingStart}
                onMouseMove={handleDrawingMove}
                onMouseUp={handleDrawingEnd}
                onMouseLeave={handleDrawingEnd}
                onTouchStart={handleDrawingStart}
                onTouchMove={handleDrawingMove}
                onTouchEnd={handleDrawingEnd}
                onTouchCancel={handleDrawingEnd}
              >
                <Layer>
                  {colouringImage && (
                    <KonvaImage
                      image={colouringImage}
                      x={0}
                      y={0}
                      width={STAGE_WIDTH}
                      height={STAGE_HEIGHT}
                      listening={false}
                    />
                  )}
                </Layer>
                <Layer ref={drawingLayerRef}>
                  {renderDrawingLines()}
                </Layer>
              </Stage>
            </div>
          </div>
        );
      case 'connect the dots': {
        const scaleX = STAGE_WIDTH / 1000;
        const scaleY = STAGE_HEIGHT / 600;
        return (
          <div className={styles.toolPanel}>
            <h3 className={styles.toolHeading}>
              Connect the Constellations
            </h3>
            <p className={styles.toolDescription}>
              Follow the stars one by one and watch a constellation appear.
            </p>
            <div className={styles.constellationChoices}>
              {Object.entries(constellations).map(([key, constellation]) => (
                <button
                  type='button'
                  key={key}
                  className={`${styles.toolButton} ${
                    currentConstellation === key
                      ? styles.toolButtonActive
                      : ''
                  }`}
                  onClick={() => handleConstellationChange(key)}
                >
                  {constellation.name}
                </button>
              ))}
            </div>
            <h4 className={styles.constellationTitle}>
              {constellationName}
            </h4>
            <p className={styles.constellationProgress}>
              {Math.min(progress, dots.length)} of {dots.length} stars connected
            </p>
            <div className={styles.actionRow}>
              <button
                type='button'
                className={styles.actionButton}
                onClick={() => setProgress(0)}
              >
                Start again
              </button>
            </div>
            <div className={styles.constellationStage}>
              <Stage width={STAGE_WIDTH} height={STAGE_HEIGHT}>
                <Layer>
                  {dots.slice(0, progress + 1).map((dot, index) => {
                    if (index === 0) return null;
                    const previousDot = dots[index - 1];
                    return (
                      <Line
                        key={`line-${index}`}
                        points={[
                          previousDot.x * scaleX,
                          previousDot.y * scaleY,
                          dot.x * scaleX,
                          dot.y * scaleY,
                        ]}
                        stroke='#ddb0ff'
                        strokeWidth={2}
                        lineCap='round'
                        shadowColor='#a77de5'
                        shadowBlur={5}
                      />
                    );
                  })}
                  {dots.map((dot, index) => (
                    <React.Fragment key={`star-${index}`}>
                      <Circle
                        x={dot.x * scaleX}
                        y={dot.y * scaleY}
                        radius={windowWidth < 600 ? 10 : 9}
                        fill={index < progress ? '#ddb0ff' : '#f5f0ff'}
                        stroke='#8d71c1'
                        strokeWidth={1.5}
                        shadowColor='#c7a2ff'
                        shadowBlur={index === progress ? 12 : 4}
                        onClick={() => handleStarClick(index)}
                        onTap={() => handleStarClick(index)}
                      />
                      <Text
                        x={dot.x * scaleX + 13}
                        y={dot.y * scaleY - 8}
                        text={`${index + 1}`}
                        fontSize={14}
                        fill='#cfc2e9'
                      />
                    </React.Fragment>
                  ))}
                </Layer>
              </Stage>
            </div>
            {progress >= dots.length && (
              <p className={styles.promptQuote}>
                Constellation complete. Take a moment to enjoy what you created.
              </p>
            )}
          </div>
        );
      }
      case 'moodboard':
        return (
          <div className={styles.toolPanel}>
            <h3 className={styles.toolHeading}>Your Moodboard</h3>
            <p className={styles.toolDescription}>
              Collect colours, images and thoughts that reflect your inner
              world. Drag your images and notes to arrange them.
            </p>
            <div className={styles.actionRow}>
              <input
                className={styles.fileInput}
                type='file'
                accept='image/*'
                multiple
                aria-label='Upload moodboard images'
                onChange={handleMoodImageUpload}
              />
              <button
  type='button'
  className={styles.actionButton}
  onClick={handleClearMoodboard}
>
  Clear moodboard
</button>
              <button
                type='button'
                className={styles.actionButton}
                onClick={addMoodNote}
              >
                + Add note
              </button>
              <button
                type='button'
                className={styles.actionButton}
                onClick={() => saveStageAsImage('holo-moodboard.png')}
              >
                Save moodboard
              </button>
            </div>
            <p className={styles.moodboardHint}>
              Double-click a note to edit it. Select a note to resize it.
            </p>
            <div className={styles.canvasContainer}>
              <Stage
                ref={stageRef}
                width={800}
                height={600}
                onMouseDown={(event) => {
                  if (event.target === event.target.getStage()) {
                    setSelectedId(null);
                  }
                }}
                onTouchStart={(event) => {
                  if (event.target === event.target.getStage()) {
                    setSelectedId(null);
                  }
                }}
              >
                <Layer>
                  <Text
                    text='Your space, your story ✦'
                    x={20}
                    y={18}
                    fontSize={18}
                    fill='#cdb5f2'
                  />
                  {moodImages.map((image) => (
                    <DraggableMoodImage
                      key={image.id}
                      src={image.src}
                      x={image.x}
                      y={image.y}
                      onDragEnd={(event) =>
                        updateMoodImagePosition(image.id, event)
                      }
                    />
                  ))}
                  {moodNotes.map((note) => (
                    <Text
                      key={note.id}
                      id={String(note.id)}
                      text={note.text}
                      x={note.x}
                      y={note.y}
                      width={190}
                      padding={10}
                      draggable
                      fontSize={17}
                      fill='#f5eaff'
                      align='center'
                      lineHeight={1.4}
                      shadowColor='#9e77d1'
                      shadowBlur={selectedId === note.id ? 8 : 0}
                      onClick={() => setSelectedId(note.id)}
                      onTap={() => setSelectedId(note.id)}
                      onDblClick={() => editMoodNote(note)}
                      onDblTap={() => editMoodNote(note)}
                      onDragEnd={(event) =>
                        updateMoodNotePosition(note.id, event)
                      }
                    />
                  ))}
                  <Transformer
                    ref={transformerRef}
                    rotateEnabled
                    enabledAnchors={[
                      'middle-left',
                      'middle-right',
                      'top-center',
                      'bottom-center',
                    ]}
                    borderStroke='#ddb0ff'
                    anchorStroke='#ddb0ff'
                    anchorFill='#302044'
                  />
                </Layer>
              </Stage>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <Helmet>
        <title>Holo Room – Create, Colour & Connect | Solayulm</title>
      </Helmet>
      <main className={styles.holoPage}>
        <div className={styles.holoContent}>
          <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Holo Room</h1>
            <p className={styles.pageSubtitle}>
              Your little corner of the galaxy to create without pressure.
              Draw what you feel, colour without a plan, connect the stars
              or collect pieces of your world.
            </p>
          </header>
          <section className={styles.panel}>
            <h2 className={styles.sectionTitle}>How it works</h2>
            <p className={styles.sectionDescription}>
              There is no finished picture you need to reach. Holo Room is
              about making space for whatever wants to come out.
            </p>
            <ol className={styles.instructionList}>
              <li className={styles.instructionItem}>
                <h3 className={styles.instructionTitle}>Enter your space</h3>
                <p className={styles.instructionText}>
                  Choose a creative tool that feels right for you today.
                </p>
              </li>
              <li className={styles.instructionItem}>
                <h3 className={styles.instructionTitle}>Let your hands lead</h3>
                <p className={styles.instructionText}>
                  Draw freely or spend a few quiet moments colouring.
                  You don't need to be artistic.
                </p>
              </li>
              <li className={styles.instructionItem}>
                <h3 className={styles.instructionTitle}>
                  Find your connections
                </h3>
                <p className={styles.instructionText}>
                  Link the stars, explore a constellation or build a moodboard
                  from images and thoughts.
                </p>
              </li>
              <li className={styles.instructionItem}>
                <h3 className={styles.instructionTitle}>
                  Keep or begin again
                </h3>
                <p className={styles.instructionText}>
                  Save your creation if you'd like, or clear your space and
                  start fresh. Both are okay.
                </p>
              </li>
            </ol>
          </section>
          <section className={styles.panel}>
            <h2 className={styles.sectionTitle}>A thought to explore</h2>
            <p className={styles.sectionDescription}>
              Choose a theme if you'd like a little direction.
            </p>
            <div className={styles.promptCategoryList}>
              {Object.keys(prompts).map((category) => (
                <button
                  type='button'
                  key={category}
                  className={`${styles.promptCategoryButton} ${
                    currentChannel === category
                      ? styles.promptCategoryButtonActive
                      : ''
                  }`}
                  onClick={() => handleSelectPromptCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            <blockquote className={styles.promptQuote}>
              {currentPrompt}
            </blockquote>
            <div className={styles.promptActions}>
              <button
                type='button'
                className={styles.actionButton}
                onClick={handleNextPrompt}
              >
                Generate another prompt
              </button>
            </div>
          </section>
          <section className={styles.toolSection}>
            <h2 className={styles.sectionTitle}>
              Choose your creative release
            </h2>
            <p className={styles.sectionDescription}>
              Follow your curiosity. You can move between spaces whenever
              you feel like trying something different.
            </p>
            <div className={styles.toolTabs}>
              {toolTabs.map((tab) => (
                <button
                  type='button'
                  key={tab.id}
                  className={`${styles.toolTab} ${
                    activeFeature === tab.id ? styles.toolTabActive : ''
                  }`}
                  aria-pressed={activeFeature === tab.id}
                  onClick={() => handleFeatureChange(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            {renderActiveFeature()}
          </section>
          
<div className={styles.exitSection}>
  <button
    type="button"
    className={styles.exitButton}
    onClick={() => setShowTransmission(true)}
  >
    Return to Rooms
  </button>
</div>

<IncomingTransmission
  isOpen={showTransmission}
  onClose={() => setShowTransmission(false)}
  onContinue={() => navigate("/Rooms")}
/>

        </div>
      </main>
    </>
  );
};
export default HoloRoom;