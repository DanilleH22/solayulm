
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/IncomingTransmission.module.css";

import colouringBookImage from "../assets/images/colouring-cosmos-cover.png";

// Replace these imports with your actual image filenames.
import journalImage from "../assets/images/inner-orbit-cover.png";
import workbookImage from "../assets/images/still-becoming-cover.png";

const products = [
  {
    name: "Colouring the Cosmos Colouring Book",
    description:
      "Take a pause, explore your creativity and give yourself a little space to breathe.",
    image: colouringBookImage,
    link: "/shop",
  },
  {
    name: "Inner Orbit Journal",
    description:
      "A gentle space to notice your thoughts, reflect on your experiences and reconnect with yourself.",
    image: journalImage,
    link: "/shop",
  },
  {
    name: "Still Becoming",
    description:
      "Explore what you're feeling, understand yourself a little more and find small ways forward.",
    image: workbookImage,
    link: "/shop",
  },
];

export default function IncomingTransmission({
  isOpen,
  onContinue,
  onClose,
}) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const randomIndex = Math.floor(
      Math.random() * products.length
    );

    setSelectedProduct(products[randomIndex]);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () =>
      document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <section
        className={styles.popup}
        role="dialog"
        aria-modal="true"
        aria-labelledby="transmission-title"
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close transmission"
        >
          ×
        </button>

        <div className={styles.signal}>
          <span className={styles.signalDot} />
          INCOMING TRANSMISSION
        </div>

        <div className={styles.intro}>
          <div
            className={styles.planet}
            aria-hidden="true"
          >
            ✦
          </div>

          <h2 id="transmission-title">
            Oh! An incoming transmission...
          </h2>

          <p>
            Before you leave this orbit, there's a message
            waiting for you.
          </p>
        </div>

        {selectedProduct && (
          <div className={styles.sponsored}>
            <span className={styles.sponsoredLabel}>
              A LITTLE SOMETHING FROM SOLAYULM
            </span>

            <div className={styles.adSpace}>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className={styles.productImage}
              />

              <h3>{selectedProduct.name}</h3>

              <p>{selectedProduct.description}</p>

              <Link
                to={selectedProduct.link}
                className={styles.continue}
              >
                Explore this product
                {/* <span aria-hidden="true"> →</span> */}
              </Link>
            </div>

            <p className={styles.disclosure}>
              Discover more from Solayulm
            </p>
          </div>
        )}

        <button
          type="button"
          className={styles.exitLink}
          onClick={onContinue}
        >
          Continue exiting room
        </button>

        <p className={styles.footer}>
          Your space will be here whenever you return.
        </p>
      </section>
    </div>
  );
}
