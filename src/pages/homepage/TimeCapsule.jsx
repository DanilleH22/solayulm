
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import styles from "../../styles/TimeCapsules.module.css";
import IncomingTransmission from "../../components/IncomingTransmission.jsx";

const durations = [
  {
    value: "30days",
    label: "30 days",
    description: "A little message for the near future",
  },
  {
    value: "1year",
    label: "1 year",
    description: "See how much can change",
  },
  {
    value: "3years",
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

export default function TimeCapsules() {
     const [showTransmission, setShowTransmission] = useState(false);
     const navigate = useNavigate();
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
  const [error, setError] = useState("");

  const cameraPreviewRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const openingDate = getOpeningDate(duration);

  useEffect(() => {
    if (cameraPreviewRef.current && cameraStream) {
      cameraPreviewRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  useEffect(() => {
    if (!isRecording) return;

    const interval = window.setInterval(() => {
      setRecordingSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    return () => {
      const recorder = mediaRecorderRef.current;

      if (recorder && recorder.state !== "inactive") {
        recorder.onstop = null;
        recorder.stop();
      }

      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }

      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [cameraStream, videoUrl]);

  const formattedRecordingTime = `${Math.floor(recordingSeconds / 60)
    .toString()
    .padStart(2, "0")}:${(recordingSeconds % 60)
    .toString()
    .padStart(2, "0")}`;

  function stopCamera() {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  }

  async function startRecording() {
    setRecordingError("");
    setError("");

    if (
      !navigator.mediaDevices?.getUserMedia ||
      !window.MediaRecorder
    ) {
      setRecordingError(
        "Your browser does not support video recording here. Please try an up-to-date browser."
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      setCameraStream(stream);

      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
        setVideoUrl("");
      }

      setVideoBlob(null);
      setRecordingSeconds(0);
      chunksRef.current = [];

      const supportedTypes = [
        "video/webm;codecs=vp9,opus",
        "video/webm;codecs=vp8,opus",
        "video/webm",
        "video/mp4",
      ];

      const mimeType = supportedTypes.find((type) =>
        MediaRecorder.isTypeSupported(type)
      );

      const recorder = mimeType
        ? new MediaRecorder(stream, { mimeType })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onerror = () => {
        setRecordingError(
          "Something went wrong while recording. Please try again."
        );
        setIsRecording(false);
        stream.getTracks().forEach((track) => track.stop());
        setCameraStream(null);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "video/webm",
        });

        if (blob.size > 0) {
          const newVideoUrl = URL.createObjectURL(blob);
          setVideoBlob(blob);
          setVideoUrl(newVideoUrl);
        } else {
          setRecordingError(
            "No video was recorded. Please try again."
          );
        }

        stream.getTracks().forEach((track) => track.stop());
        setCameraStream(null);
        setIsRecording(false);
      };

      recorder.start();
      setIsRecording(true);
    } catch {
      setRecordingError(
        "Camera or microphone access was denied or unavailable. Please check your browser permissions and try again."
      );
    }
  }

  
function stopRecording() {
  const recorder = mediaRecorderRef.current;

  if (!recorder || recorder.state === "inactive") {
    setIsRecording(false);
    return;
  }

  try {
    if (recorder.state === "recording") {
      recorder.requestData();
      recorder.stop();
    }
  } catch (error) {
    console.error("Could not stop recording:", error);
    setRecordingError(
      "The recording could not be stopped. Please try again."
    );
  }
}


  function retakeVideo() {
    if (isRecording) {
      stopRecording();
    }

    stopCamera();

    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    setVideoBlob(null);
    setVideoUrl("");
    setRecordingSeconds(0);
    setRecordingError("");
  }

  function chooseType(type) {
    if (isRecording) {
      stopRecording();
    }

    stopCamera();

    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    setCapsuleType(type);
    setVideoBlob(null);
    setVideoUrl("");
    setRecordingSeconds(0);
    setRecordingError("");
    setError("");
    setShowConfirmation(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (isRecording) {
      setError("Please stop recording before continuing.");
      return;
    }

    if (
      !title.trim() ||
      !recipientEmail.trim() ||
      (capsuleType === "letter" && !message.trim())
    ) {
      setError(
        "Please complete your title, recipient email and letter."
      );
      return;
    }

    if (capsuleType === "video" && !videoBlob) {
      setError(
        "Please record and preview your video before continuing."
      );
      return;
    }

    setShowDurationPopup(true);
  }

  function handleConfirm() {
    setShowDurationPopup(false);

    if (capsuleType === "video") {
      setError(
        "Your video is ready for the next step, but payment and secure video storage are not connected yet. You have not been charged."
      );
      return;
    }

    setShowConfirmation(true);
  }

  function startAgain() {
    stopCamera();

    if (isRecording) {
      stopRecording();
    }

    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    setTitle("");
    setMessage("");
    setRecipientEmail("");
    setDuration("30days");
    setVideoBlob(null);
    setVideoUrl("");
    setRecordingSeconds(0);
    setRecordingError("");
    setError("");
    setShowConfirmation(false);
    setShowDurationPopup(false);
    setCapsuleType("letter");
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
                        className={styles.cameraPreview}
                        src={videoUrl}
                        controls
                        playsInline
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
                    Your recording stays in this browser preview. It is not
                    uploaded or permanently saved yet.
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

              <button className={styles.primaryButton} type="submit">
                {capsuleType === "letter"
                  ? "Seal my free letter"
                  : "Choose delivery date · £2.99"}
              </button>

              {capsuleType === "video" && (
                <p className={styles.paymentNote}>
                  One-off price: £2.99. Payment is not connected yet, and you
                  will not be charged in this preview.
                </p>
              )}
            </form>
          </>
        ) : (
          <section className={styles.confirmation}>
            <div className={styles.confirmationIcon} aria-hidden="true">
              ✧
            </div>
            <p className={styles.eyebrow}>CAPSULE PREVIEW</p>
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
              This is a preview only. Your letter has not been saved or
              scheduled for delivery. Secure storage and scheduled emails
              still need to be connected.
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
            if (event.target === event.currentTarget) {
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

            <button
              type="button"
              className={styles.primaryButton}
              onClick={handleConfirm}
            >
              {capsuleType === "letter"
                ? "Confirm free letter"
                : "Continue to payment · £2.99"}
            </button>

            {capsuleType === "video" && (
              <p className={styles.paymentNote}>
                Checkout is not connected yet. No payment will be taken.
              </p>
            )}
          </section>
        </div>
      )}
      
    </main>
  );
}
