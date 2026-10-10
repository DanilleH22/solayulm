
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/Shop.module.css";
import coloringCover from "../../assets/images/colouring-cosmos-cover.png";
import ioCover from "../../assets/images/inner-orbit-cover.png";

import sensingMyself from "../../assets/images/hr.png";

const books = [
  {
    id: "sensing-myself",
    title: "Inner Orbit",
    subtitle: "A Journal for Noticing What Makes You, You",
    description:
      "A guided space for self-discovery, reflection and reconnecting with yourself.",
    image: ioCover,
    imageAlt: "Inner Orbit journal cover",
    type: "Journal",
    link: "/Shop/InnerSenseJournal",
    buttonText: "Discover this book",
  },
  {
    id: "reset-kit",
    title: "Colouring The Cosmos",
    subtitle: "A Little Space to Begin Again",
    description:
      "A collection of downloadable reflection and self-care resources to help you pause and reset.",
    image: coloringCover,
    imageAlt: "Coloring the Cosmos journal cover",
    type: "Colouring Book",
    link: "/Shop/ColoringTheCosmoJournal",
    buttonText: "Discover this book",
  },
  {
    id: "emotional-first-aid",
    title: "Emotional First Aid",
    subtitle: "A Companion for the Harder Days",
    description:
      "Poetry, emotional education and guided exercises for navigating anxiety, sadness, burnout and life's difficult moments.",
    image: "/images/shop/emotional-first-aid.jpg",
    imageAlt: "Emotional First Aid book cover",
    type: "Wellbeing book",
    link: "/shop/emotional-first-aid",
    buttonText: "Discover this book",
  },
];

function Shop() {
  return (
    <main className={styles["shop-page"]}>
      {/* Hero section */}
      <section className={styles["shop-hero"]}>
        <Container>
          <p className={styles["shop-hero__eyebrow"]}>
            THE SOLAYULM COLLECTION
          </p>

          <h1 className={styles["shop-hero__title"]}>
            A little space for you.
          </h1>

          <p className={styles["shop-hero__description"]}>
            Thoughtfully created journals and wellbeing resources to help
            you understand yourself, navigate your emotions and find your
            own way back to calm.
          </p>

          <a
            href="#book-collection"
            className={styles["shop-hero__button"]}
          >
            Explore the collection <span aria-hidden="true">↓</span>
          </a>
        </Container>
      </section>


{/* Solayulm Toolkit */}
<section className={styles["shop-toolkit"]}>
  <Container>
    <div className={styles["shop-toolkit__inner"]}>
      <div className={styles["shop-toolkit__content"]}>
        <p className={styles["shop-toolkit__eyebrow"]}>
          YOUR PERSONAL TOOLKIT
        </p>

        <h2 className={styles["shop-toolkit__title"]}>
          Little things that make a difference.
        </h2>

        <p className={styles["shop-toolkit__description"]}>
          Explore a thoughtfully curated collection of tools, comforting
          finds and everyday essentials to support your moments of rest,
          reflection and self-care.
        </p>

        <Link
          to="/toolkit"
          className={styles["shop-toolkit__button"]}
        >
          Explore the toolkit
          <span aria-hidden="true"> →</span>
        </Link>

        <p className={styles["shop-toolkit__note"]}>
          Your space to discover something that feels right for you.
        </p>
      </div>

      <div className={styles["shop-toolkit__visual"]}>
        <div className={styles["shop-toolkit__orbit"]}>
          <span className={styles["shop-toolkit__star"]}>✦</span>
          <span className={styles["shop-toolkit__planet"]} />
          <span className={styles["shop-toolkit__sparkle"]}>✧</span>
          <span className={styles["shop-toolkit__small-star"]}>✦</span>
        </div>

        <p className={styles["shop-toolkit__visual-caption"]}>
          Curated for your inner orbit
        </p>
      </div>
    </div>
  </Container>
</section>


      {/* Book collection */}
      <section
        id="book-collection"
        className={styles["shop-collection"]}
      >
        <Container>
          <div className={styles["shop-collection__heading"]}>
            <p className={styles["shop-collection__eyebrow"]}>
              FIND YOUR SPACE
            </p>

            <h2 className={styles["shop-collection__title"]}>
              The collection
            </h2>

            <p className={styles["shop-collection__description"]}>
              Every journey is different. Find the resource that feels
              right for where you are today.
            </p>
          </div>

          <Row className="g-4">
            {books.map((book) => (
              <Col key={book.id} xs={12} md={6} lg={4}>
                <article className={styles["book-card"]}>
                  <Link
                    to={book.link}
                    className={styles["book-card__image-link"]}
                    aria-label={`View ${book.title}`}
                  >
                    <div className={styles["book-card__image-wrapper"]}>
                      <img
                        src={book.image}
                        alt={book.imageAlt}
                        className={styles["book-card__image"]}
                        loading="lazy"
                      />

                      <span className={styles["book-card__type"]}>
                        {book.type}
                      </span>
                    </div>
                  </Link>

                  <div className={styles["book-card__content"]}>
                    <p className={styles["book-card__subtitle"]}>
                      {book.subtitle}
                    </p>

                    <h3 className={styles["book-card__title"]}>
                      {book.title}
                    </h3>

                    <p className={styles["book-card__description"]}>
                      {book.description}
                    </p>

                    <Link
                      to={book.link}
                      className={styles["book-card__button"]}
                    >
                      {book.buttonText}
                      <span aria-hidden="true"> →</span>
                    </Link>
                  </div>
                </article>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Closing section */}
      <section className={styles["shop-note"]}>
        <Container>
          <p className={styles["shop-note__eyebrow"]}>
            A REMINDER FROM SOLAYULM
          </p>

          <h2 className={styles["shop-note__title"]}>
            You don't have to figure everything out today.
          </h2>

          <p className={styles["shop-note__description"]}>
            Start where you are. Take what you need. Leave room to grow.
          </p>
        </Container>

        
      </section>

      <Row>
            <Col md={12}>
            <div className="d-flex justify-content-center">
          <Link to="/Rooms" style={{ textDecoration: "none" }}>
            <Button className={styles["journal-exit-button"]}>Exit</Button>
          </Link>
        </div>
        
            </Col>
        </Row>
    </main>
  );
}

export default Shop;
