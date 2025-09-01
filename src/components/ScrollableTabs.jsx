import React, { useRef } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "../styles/ScrollableTabs.module.css";

const ScrollableTabs = () => {
  const tabRef = useRef(null);

  const scroll = (direction) => {
    if (tabRef.current) {
      tabRef.current.scrollBy({
        left: direction === "left" ? -150 : 150,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Scroll left button */}
      <button className={styles.scrollBtn} onClick={() => scroll("left")}>
        <FaChevronLeft />
      </button>

      {/* Tab bar container */}
      <div className={styles.tabContainer} ref={tabRef}>
        <Tabs
          defaultActiveKey="Decompression Bay"
          id="scrollable-tabs"
          className={styles.tabs}
        >
          <Tab eventKey="Decompression Bay" title="Decompression Bay">
            Content for Decompression Bay
          </Tab>
          <Tab eventKey="Airlock Journal" title="Airlock Journal">
            Content for Airlock Journal
          </Tab>
          <Tab eventKey="Observation Deck" title="Observation Deck">
            Content for Observation Deck
          </Tab>
          <Tab eventKey="Comm Center(Audio Room)" title="Comm Center(Audio Room)">
            Content for Comm Center
          </Tab>
          <Tab eventKey="Void Chat" title="Void Chat">
            Content for Void Chat
          </Tab>
          <Tab eventKey="Holo Room" title="Holo Room">
            Content for Holo Room
          </Tab>
          <Tab eventKey="Cosmic Companion AI Bot" title="Cosmic Companion AI Bot">
            Content for AI Bot
          </Tab>
        </Tabs>
      </div>

      {/* Scroll right button */}
      <button className={styles.scrollBtn} onClick={() => scroll("right")}>
        <FaChevronRight />
      </button>
    </div>
  );
};

export default ScrollableTabs;
