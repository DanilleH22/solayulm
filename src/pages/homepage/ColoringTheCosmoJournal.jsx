
import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "../../styles/Shop.module.css";
import hrImage from "../../assets/images/hr.png";
import coloringCover from "../../assets/images/colouring-cosmos-cover.png";
import { Link, useNavigate } from "react-router-dom";

function ColoringTheCosmoJournal() {
  const [selectedEdition, setSelectedEdition] = useState("digital");
  const navigate = useNavigate();


const handleContinue = async () => {
  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/create-checkout-session/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          edition: selectedEdition,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Unable to start checkout."
      );
    }

    window.location.assign(data.url);
  } catch (error) {
    console.error("Checkout error:", error);
    alert(error.message || "Something went wrong.");
  }
};


  return (
    <section >
      <Container className={styles["journal-product"]}>
        <Row className="align-items-center g-5">
          {/* Journal image */}
          <Col xs={12} md={6}>
            <div className={styles["journal-product__image-wrapper"]}>
              <img
                src={coloringCover}
                alt="Solayulm journal cover"
                className={styles["journal-product__image"]}
              />
            </div>
          </Col>

          {/* Product information */}
          <Col xs={12} md={6}>
            <div className={styles["journal-product__intro"]}>
              <p className={styles["journal-product__eyebrow"]}>
                YOUR INNER CALM
              </p>

              <h1 className={styles["journal-product__title"]}>
                Coloring the Cosmo Journal
              </h1>

              <p className={styles["journal-product__subtitle"]}>
                A Space Mindfulness Colouring Book for Calm and Relaxation
              </p>

              <p className={styles["journal-product__description"]}>
                A space to slow down, explore your emotions and reconnect
                with the parts of yourself that can get lost in everyday
                life. Move at your own pace, with no pressure to have
                everything figured out.
              </p>

              <div className={styles["journal-product__divider"]} />

              <h2 className={styles["journal-product__section-title"]}>
                Choose your edition
              </h2>

              {/* Digital edition */}
              <label
                className={`${styles["journal-edition"]} ${
                  selectedEdition === "digital"
                    ? styles["journal-edition--selected"]
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="journal-edition"
                  value="digital"
                  checked={selectedEdition === "digital"}
                  onChange={() => setSelectedEdition("digital")}
                  className={styles["journal-edition__radio"]}
                />

                <span className={styles["journal-edition__content"]}>
                  <span className={styles["journal-edition__name"]}>
                    Digital edition
                  </span>

                  <span className={styles["journal-edition__description"]}>
                    Read and reflect on your device.
                  </span>
                </span>

                <span className={styles["journal-edition__price"]}>
                  Digital
                </span>
              </label>

              {/* Physical edition */}
              <label
                className={`${styles["journal-edition"]} ${
                  selectedEdition === "physical"
                    ? styles["journal-edition--selected"]
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="journal-edition"
                  value="physical"
                  checked={selectedEdition === "physical"}
                  onChange={() => setSelectedEdition("physical")}
                  className={styles["journal-edition__radio"]}
                />

                <span className={styles["journal-edition__content"]}>
                  <span className={styles["journal-edition__name"]}>
                    Physical edition
                  </span>

                  <span className={styles["journal-edition__description"]}>
                    A printed journal to keep close.
                  </span>
                </span>

                <span className={styles["journal-edition__price"]}>
                  Print
                </span>
              </label>

              <Button
                type="button"
                onClick={handleContinue}
                className={styles["journal-product__button"]}
              >
                Continue
                <span aria-hidden="true"> →</span>
              </Button>

              <p className={styles["journal-product__note"]}>
                A little space for you, exactly as you are.
              </p>
            </div>
          </Col>
        </Row>

        
        
      </Container>
   
        <Row>
            <Col md={12}>
            <div className="d-flex justify-content-center">
          <Link to="/shop" style={{ textDecoration: "none" }}>
            <Button className={styles["journal-exit-button"]}>Exit</Button>
          </Link>
        </div>
        
            </Col>
        </Row>
    </section>
  );
}

export default ColoringTheCosmoJournal;
