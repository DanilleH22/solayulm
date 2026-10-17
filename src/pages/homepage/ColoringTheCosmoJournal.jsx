
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
  
  
// Digital edition: open Gumroad in a new tab
if (selectedEdition === "digital") {
  window.open(
    "https://solayulm.gumroad.com/l/Colouring_the_Cosmos",
    "_blank",
    "noopener,noreferrer"
  );
  return;
}

// Physical edition: open Lulu in a new tab
if (selectedEdition === "physical") {
  window.open(
    "https://www.lulu.com/shop/solayulm/solayulm-colouring-the-cosmos/paperback/product-kv452dz.html?page=1&pageSize=4",
    "_blank",
    "noopener,noreferrer"
  );
  return;
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
                  £3.99
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
                  £9.99
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
