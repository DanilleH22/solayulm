
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import styles from "../../styles/TimeCapsules.module.css";
import IncomingTransmission from "../../components/IncomingTransmission.jsx";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

  

const durations = [
  {
    value: "30days",
    apiValue: "30_days",
    label: "30 days",
    description: "A little message for the near future",
  },
  {
    value: "1year",
    apiValue: "1_year",
    label: "1 year",
    description: "See how much can change",
  },
  {
    value: "3years",
    apiValue: "3_years",
    label: "3 years",
    description: "A message from another chapter of life",
  },
];

function getOpeningDate(duration) {
  const date = new Date();

  if (duration === "30days") {
    date.setDate(date.getDate() + 30);
  } else if (duration === "1year") {
    date.setFullYear(date.getFullYear() + 1);
  } else if (duration === "3years") {
    date.setFullYear(date.getFullYear() + 3);
  }

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function getVideoExtension(mimeType) {
  if (mimeType.includes("mp4")) return "mp4";
  if (mimeType.includes("quicktime")) return "mov";
  return "webm";
}

export default function TimeCapsules() {
  const navigate = useNavigate();

  const [showTransmission, setShowTransmission] = useState(false);
  const [capsuleType, setCapsuleType] = useState("letter");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [duration, setDuration] = useState("30days");

  const [cameraStream, setCameraStream] = useState(null);
  const [videoBlob, setVideoBlob] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordingError, setRecordingError] = useState("");

  const [showDurationPopup, setShowDurationPopup] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [savedCapsuleId, setSavedCapsuleId] = useState(null);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const cameraPreviewRef = useRef(null);
  const recordedVideoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const cameraStreamRef = useRef(null);
  const videoUrlRef = useRef("");
  const recordingActiveRef = useRef(false);

  const openingDate = getOpeningDate(duration);

  const formattedRecordingTime = `${Math.floor(recordingSeconds / 60)
    .toString()
    .padStart(2, "0")}:${(recordingSeconds % 60)
    .toString()
    .padStart(2, "0")}`;

  useEffect(() => {
    if (!cameraPreviewRef.current || !cameraStream || !isRecording) {
      return;
    }

    const preview = cameraPreviewRef.current;
    preview.srcObject = cameraStream;

    const playPreview = async () => {
      try {
        await preview.play();
      } catch (playError) {
        console.warn("The live camera preview could not autoplay:", playError);
      }
    };

    playPreview();
  }, [cameraStream, isRecording]);

  useEffect(() => {
    if (!isRecording) return undefined;

    const interval = window.setInterval(() => {
      setRecordingSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    return () => {
      const recorder = mediaRecorderRef.current;

      if (recorder && recorder.state !== "inactive") {
        recorder.ondataavailable = null;
        recorder.onstop = null;

        try {
          recorder.stop();
        } catch (stopError) {
          console.warn("Could not stop the recorder during cleanup:", stopError);
        }
      }

      const stream = cameraStreamRef.current;

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      if (videoUrlRef.current) {
        URL.revokeObjectURL(videoUrlRef.current);
      }
    };
  }, []);

  function stopCamera() {
    const stream = cameraStreamRef.current;

    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      cameraStreamRef.current = null;
      setCameraStream(null);
    }

    if (cameraPreviewRef.current) {
      cameraPreviewRef.current.srcObject = null;
    }
  }

  function clearRecordedVideo() {
    if (videoUrlRef.current) {
      URL.revokeObjectURL(videoUrlRef.current);
      videoUrlRef.current = "";
    }

    setVideoBlob(null);
    setVideoUrl("");

    if (recordedVideoRef.current) {
      recordedVideoRef.current.pause();
      recordedVideoRef.current.removeAttribute("src");
      recordedVideoRef.current.load();
    }
  }

  async function startRecording() {
    setRecordingError("");
    setError("");

    if (
      !navigator.mediaDevices?.getUserMedia ||
      typeof window.MediaRecorder === "undefined"
    ) {
      setRecordingError(
        "Your browser does not support video recording here. Please try an up-to-date browser."
      );
      return;
    }

    if (recordingActiveRef.current) {
      return;
    }

    try {
      clearRecordedVideo();

      setRecordingSeconds(0);
      chunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      cameraStreamRef.current = stream;
      setCameraStream(stream);

      const supportedTypes = [
        "video/webm;codecs=vp9,opus",
        "video/webm;codecs=vp8,opus",
        "video/webm",
        "video/mp4",
      ];

      const mimeType = supportedTypes.find((type) =>
        window.MediaRecorder.isTypeSupported(type)
      );

      const recorder = mimeType
        ? new window.MediaRecorder(stream, { mimeType })
        : new window.MediaRecorder(stream);

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onerror = (event) => {
        console.error("Video recording error:", event.error);

        recordingActiveRef.current = false;
        setIsRecording(false);
        setRecordingError(
          "Something went wrong while recording. Please try again."
        );

        stopCamera();
      };

      recorder.onstop = () => {
        const recordedChunks = [...chunksRef.current];

        const actualMimeType =
          recorder.mimeType ||
          recordedChunks.find((chunk) => chunk.type)?.type ||
          "video/webm";

        const recordedBlob = new Blob(recordedChunks, {
          type: actualMimeType,
        });

        console.log("Video recording completed:", {
          chunks: recordedChunks.length,
          size: recordedBlob.size,
          type: recordedBlob.type,
        });

        recordingActiveRef.current = false;
        setIsRecording(false);

        if (recordedBlob.size > 0) {
          const newVideoUrl = URL.createObjectURL(recordedBlob);

          videoUrlRef.current = newVideoUrl;
          setVideoBlob(recordedBlob);
          setVideoUrl(newVideoUrl);
          setRecordingError("");
        } else {
          clearRecordedVideo();

          setRecordingError(
            "No video data was captured. Please record again and speak or move for a few seconds before stopping."
          );
        }

        stopCamera();
      };

      recordingActiveRef.current = true;

      // Collect chunks throughout the recording, rather than waiting
      // until the Stop button is pressed.
      recorder.start(1000);

      setIsRecording(true);
    } catch (recordingError) {
      console.error("Could not start video recording:", recordingError);

      recordingActiveRef.current = false;
      setIsRecording(false);
      stopCamera();

      setRecordingError(
        "Camera or microphone access was denied or unavailable. Check your browser permissions and try again."
      );
    }
  }

  function stopRecording() {
    const recorder = mediaRecorderRef.current;

    if (!recorder || recorder.state === "inactive") {
      recordingActiveRef.current = false;
      setIsRecording(false);
      return;
    }

    try {
      if (recorder.state === "recording") {
        recorder.stop();
      }
    } catch (stopError) {
      console.error("Could not stop video recording:", stopError);

      setRecordingError(
        "The recording could not be stopped. Please try again."
      );
    }
  }

  function retakeVideo() {
    if (recordingActiveRef.current) {
      stopRecording();
    }

    stopCamera();
    clearRecordedVideo();

    chunksRef.current = [];
    setRecordingSeconds(0);
    setRecordingError("");
    setError("");
  }

  function chooseType(type) {
    if (recordingActiveRef.current) {
      stopRecording();
    }

    stopCamera();
    clearRecordedVideo();

    chunksRef.current = [];
    setCapsuleType(type);
    setRecordingSeconds(0);
    setRecordingError("");
    setError("");
    setShowConfirmation(false);
    setShowDurationPopup(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (recordingActiveRef.current) {
      setError("Please stop recording and wait for the video preview.");
      return;
    }

    if (!title.trim() || !recipientEmail.trim()) {
      setError("Please complete your capsule title and recipient email.");
      return;
    }

    if (capsuleType === "letter" && !message.trim()) {
      setError("Please write your letter before continuing.");
      return;
    }

    if (capsuleType === "video" && !videoBlob) {
      setError("Please record and preview your video before continuing.");
      return;
    }

    setShowDurationPopup(true);
  }

  async function handleConfirm() {
    setError("");
    setIsSaving(true);

    const selectedDuration = durations.find(
      (option) => option.value === duration
    );

    try {
      if (capsuleType === "video") {
        if (!videoBlob || videoBlob.size === 0) {
          setError("Your video is empty. Please record it again.");
          setShowDurationPopup(false);
          return;
        }

        const formData = new FormData();

        formData.append("title", title.trim());
        formData.append("message", message.trim());
        formData.append("recipient_email", recipientEmail.trim());
        formData.append(
          "duration",
          selectedDuration?.apiValue || "30_days"
        );

        const extension = getVideoExtension(videoBlob.type);

        formData.append(
          "video",
          videoBlob,
          `time-capsule-${Date.now()}.${extension}`
        );

        const response = await fetch(
  `${API_BASE_URL}/api/create-time-capsule/`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      message,
      recipient_email: recipientEmail,
      duration: selectedDuration?.apiValue || "30_days",
    }),
  }

);

const data = await response.json();

if (!response.ok || data.success !== true || !data.capsule_id) {
  throw new Error(
    data.error || "Your letter could not be saved. Please try again."
  );
}

setSavedCapsuleId(data.capsule_id);
setShowDurationPopup(false);
setShowConfirmation(true);


   

        if (!response.ok) {
          throw new Error(
            data.error ||
              data.message ||
              "The video could not be uploaded. Please try again."
          );
        }

        setShowDurationPopup(false);

        setError(
          `Your video capsule has been uploaded. Capsule reference: ${
            data.capsule_id ?? "created"
          }. Payment has not been taken, and the £2.99 checkout still needs to be connected.`
        );

        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/create-time-capsule/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.trim(),
            message: message.trim(),
            recipient_email: recipientEmail.trim(),
            duration: selectedDuration?.apiValue || "30_days",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Your letter could not be saved. Please try again."
        );
      }

      setShowDurationPopup(false);
      setShowConfirmation(true);
    } catch (saveError) {
      console.error("Could not save the time capsule:", saveError);

      setError(
        saveError.message ||
          "Something went wrong. Check that the Django backend is running and try again."
      );
    } finally {
      setIsSaving(false);
    }
  }

  function startAgain() {
    if (recordingActiveRef.current) {
      stopRecording();
      setSavedCapsuleId(null);
    }

    stopCamera();
    clearRecordedVideo();

    chunksRef.current = [];
    setTitle("");
    setMessage("");
    setRecipientEmail("");
    setDuration("30days");
    setRecordingSeconds(0);
    setRecordingError("");
    setError("");
    setShowConfirmation(false);
    setShowDurationPopup(false);
    setCapsuleType("letter");
    setIsSaving(false);
  }

  return (
    <main className={styles.page}>
      <div className={styles.stars} aria-hidden="true" />

      <section className={styles.container}>
        <p className={styles.eyebrow}>
          SOLAYULM · A MESSAGE THROUGH TIME
        </p>

        <h1 className={styles.heading}>Time Capsules</h1>

        <p className={styles.intro}>
          Some words are meant for another time.
          <br />
          Leave a message for the person you will be, or someone you love.
        </p>

        {!showConfirmation ? (
          <>
            <div className={styles.typeGrid}>
              <button
                type="button"
                className={`${styles.typeCard} ${
                  capsuleType === "letter" ? styles.selected : ""
                }`}
                onClick={() => chooseType("letter")}
                aria-pressed={capsuleType === "letter"}
              >
                <span className={styles.typeIcon} aria-hidden="true">
                  ✉
                </span>
                <span className={styles.typeName}>Letter Capsule</span>
                <span className={styles.typePrice}>FREE</span>
                <span className={styles.typeDescription}>
                  Write a message to be opened in the future.
                </span>
              </button>

              <button
                type="button"
                className={`${styles.typeCard} ${
                  capsuleType === "video" ? styles.selected : ""
                }`}
                onClick={() => chooseType("video")}
                aria-pressed={capsuleType === "video"}
              >
                <span className={styles.typeIcon} aria-hidden="true">
                  ▶
                </span>
                <span className={styles.typeName}>Video Capsule</span>
                <span className={styles.typePrice}>£2.99</span>
                <span className={styles.typeDescription}>
                  Record a personal video message for the future.
                </span>
              </button>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formIntro}>
                <h2>
                  {capsuleType === "letter"
                    ? "Write your letter"
                    : "Record your video capsule"}
                </h2>
                <p>
                  {capsuleType === "letter"
                    ? "Take your time. These words are yours."
                    : "Speak from the heart. You can preview and retake your video."}
                </p>
              </div>

              <label className={styles.label} htmlFor="capsule-title">
                Capsule title
              </label>

              <input
                id="capsule-title"
                className={styles.input}
                type="text"
                placeholder="A note to my future self..."
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                maxLength={100}
                required
              />

              <label className={styles.label} htmlFor="recipient-email">
                Recipient's email address
              </label>

              <input
                id="recipient-email"
                className={styles.input}
                type="email"
                placeholder="you@example.com"
                value={recipientEmail}
                onChange={(event) =>
                  setRecipientEmail(event.target.value)
                }
                required
              />

              <p className={styles.fieldHint}>
                This address is intended to receive a notification when the
                capsule is ready to open.
              </p>

              {capsuleType === "video" && (
                <div className={styles.videoSection}>
                  <p className={styles.label}>Your video message</p>

                  {!videoUrl && !isRecording && (
                    <>
                      <p className={styles.fieldHint}>
                        Your camera and microphone will only start after you
                        press the recording button and grant permission.
                      </p>

                      <button
                        type="button"
                        className={styles.primaryButton}
                        onClick={startRecording}
                      >
                        Start recording
                      </button>
                    </>
                  )}

                  {cameraStream && isRecording && (
                    <>
                      <video
                        ref={cameraPreviewRef}
                        autoPlay
                        muted
                        playsInline
                        className={styles.cameraPreview}
                      />

                      <p className={styles.recordingStatus}>
                        <span
                          className={styles.recordingDot}
                          aria-hidden="true"
                        />
                        Recording · {formattedRecordingTime}
                      </p>

                      <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={stopRecording}
                      >
                        Stop recording
                      </button>
                    </>
                  )}

                  {videoUrl && !isRecording && (
                    <>
                      <video
                        ref={recordedVideoRef}
                        className={styles.cameraPreview}
                        src={videoUrl}
                        controls
                        playsInline
                        preload="metadata"
                      />

                      <p className={styles.fieldHint}>
                        Watch your video back before continuing.
                      </p>

                      <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={retakeVideo}
                      >
                        Retake video
                      </button>
                    </>
                  )}

                  {recordingError && (
                    <p className={styles.error} role="alert">
                      {recordingError}
                    </p>
                  )}

                  <p className={styles.fieldHint}>
                    Your video is kept in this browser until you continue.
                    It is uploaded when you confirm the delivery duration.
                  </p>
                </div>
              )}

              <label className={styles.label} htmlFor="capsule-message">
                {capsuleType === "letter"
                  ? "Your letter"
                  : "Message to accompany your video (optional)"}
              </label>

              <textarea
                id="capsule-message"
                className={styles.textarea}
                placeholder={
                  capsuleType === "letter"
                    ? "What would you like your future self or loved one to know?"
                    : "Add a few words to go with your video..."
                }
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                rows={6}
                required={capsuleType === "letter"}
              />

              <div className={styles.datePreview}>
                <span className={styles.dateIcon} aria-hidden="true">
                  ✧
                </span>

                <div style={{ position: "relative", left: "-10%" }}>
                  <p className={styles.dateLabel}>Your capsule will open in</p>
                  <p className={styles.dateValue}>{openingDate}</p>
                </div>
              </div>

              {error && (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              )}

              <button
                className={styles.primaryButton}
                type="submit"
                disabled={isSaving || isRecording}
              >
                {capsuleType === "letter"
                  ? "Seal my free letter"
                  : "Choose delivery date · £2.99"}
              </button>

              {capsuleType === "video" && (
                <p className={styles.paymentNote}>
                  One-off price: £2.99. The video upload endpoint does not
                  charge you. Stripe checkout must be connected separately.
                </p>
              )}
            </form>
          </>
        ) : (
          <section className={styles.confirmation}>
            <div className={styles.confirmationIcon} aria-hidden="true">
              ✧
            </div>

            <p className={styles.eyebrow}>CAPSULE CONFIRMATION</p>

            <h2>Your letter is ready for its journey.</h2>

            <p>
              <strong>{title}</strong>
            </p>

            <p className={styles.confirmationDate}>
              Intended opening date: {openingDate}
            </p>

            <p className={styles.confirmationEmail}>
              Intended recipient: {recipientEmail}
            </p>

            <div className={styles.messagePreview}>{message}</div>

            <p className={styles.notice}>
  Your letter has been saved successfully.
  Reference: {savedCapsuleId}.
  Your recipient will receive it when scheduled email delivery is active.
</p>

            <button
              type="button"
              className={styles.primaryButton}
              onClick={startAgain}
            >
              Create another capsule
            </button>
          </section>
        )}

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
      </section>

      {showDurationPopup && (
        <div
          className={styles.overlay}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isSaving) {
              setShowDurationPopup(false);
            }
          }}
        >
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="duration-heading"
          >
            <button
              type="button"
              className={styles.closeButton}
              aria-label="Close"
              disabled={isSaving}
              onClick={() => setShowDurationPopup(false)}
            >
              ×
            </button>

            <p className={styles.eyebrow}>A MESSAGE THROUGH TIME</p>

            <h2 id="duration-heading">When should it open?</h2>

            <p className={styles.modalIntro}>
              Choose how long you would like your capsule to remain sealed.
            </p>

            <div className={styles.durationOptions}>
              {durations.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`${styles.durationOption} ${
                    duration === option.value
                      ? styles.durationSelected
                      : ""
                  }`}
                  onClick={() => setDuration(option.value)}
                  aria-pressed={duration === option.value}
                  disabled={isSaving}
                >
                  <span className={styles.durationLabel}>
                    {option.label}
                  </span>

                  <span className={styles.durationDescription}>
                    {option.description}
                  </span>
                </button>
              ))}
            </div>

            <div className={styles.openingDate}>
              <span>Intended opening date</span>
              <strong>{openingDate}</strong>
            </div>

            {error && (
              <p className={styles.error} role="alert">
                {error}
              </p>
            )}

            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleConfirm}
              disabled={isSaving}
            >
              {isSaving
                ? "Saving your capsule..."
                : capsuleType === "letter"
                  ? "Confirm free letter"
                  : "Continue to payment · £2.99"}
            </button>

            {capsuleType === "video" && (
              <p className={styles.paymentNote}>
                The video will be uploaded when you confirm. No payment is
                taken by this upload step.
              </p>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
