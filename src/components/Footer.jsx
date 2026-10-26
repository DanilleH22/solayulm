import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faInstagram,
  faPinterest,
  faTiktok,
} from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router';
import '@fortawesome/fontawesome-free/css/all.min.css';
import useSound from 'use-sound';
import styles from '../styles/Footer.module.css';

const MUSIC_URL =
  'https://pub-c0ab68ce633f4c6ca038f3d704dcb392.r2.dev/footer-music/Midnight_Bliss.mp3';

const usefulLinks = [
  { to: '/', label: 'Home' },
  { to: '/AboutPage', label: 'About' },
  { to: '/Rooms', label: 'Rooms' },
  { to: '/Shop', label: 'Shop' },
  { to: '/HelpPage', label: 'Help available' },
  { to: '/Toolkit', label: 'Toolkit' },
];

const socialLinks = [
  { href: 'https://twitter.com/yourprofile', icon: faTwitter, label: 'Twitter' },
  { href: 'https://instagram.com/yourprofile', icon: faInstagram, label: 'Instagram' },
  { href: 'https://pinterest.com/yourprofile', icon: faPinterest, label: 'Pinterest' },
  { href: 'https://www.tiktok.com/en/', icon: faTiktok, label: 'TikTok' },
];

function Footer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound(MUSIC_URL, { volume: 0.5 });

  useEffect(() => {
    return () => stop();
  }, [stop]);

  const handleMusicToggle = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
    setIsPlaying((prev) => !prev);
  };

  return (
    <footer className={styles.footer}>
      <Container fluid="lg">
        <Row className={styles.footerRow}>
          {/* Brand + links */}
          <Col xs={12} md={4} className={styles.brandCol}>
            <h3 className={styles.brandName}>SOLAYULM</h3>
            <p className={styles.brandTagline}>
              Your quiet corner of the galaxy.
            </p>
          </Col>

          <Col xs={6} md={3}>
            <h4 className={styles.colHeading}>Explore</h4>
            <ul className={styles.linkList}>
              {usefulLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Music */}
          <Col xs={6} md={2} className={styles.musicCol}>
            <h4 className={styles.colHeading}>Sound</h4>
            <Form.Check
              type="switch"
              id="music-switch"
              label={isPlaying ? 'On' : 'Off'}
              onChange={handleMusicToggle}
              checked={isPlaying}
              className={styles.musicSwitch}
            />
          </Col>

          {/* Social + donate */}
          <Col xs={12} md={3} className={styles.socialCol}>
            <h4 className={styles.colHeading}>Connect</h4>
            <div className={styles.socialIcons}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={styles.socialLink}
                >
                  <FontAwesomeIcon icon={social.icon} size="lg" />
                </a>
              ))}
            </div>
            <Link
              to="https://ko-fi.com/solayulm"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.donateLink}
            >
              <button type="button" className={styles.donateButton}>
                Support the project
              </button>
            </Link>
          </Col>
        </Row>

        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Solayulm. Made with care.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;