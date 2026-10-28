import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/LegalPage.module.css";

function WellbeingDisclaimer() {
  return (
    <main className={styles["shop-page"]}>
      <Container>
        <div className={styles["shop-toolkit__inner"]}>
          <div>
            <h2 className={styles["shop-toolkit__title"]}>
              Wellbeing Disclaimer
            </h2>

            <div className="legal-container">
              <p className="legal-subtitle">
                A gentle reminder to meet yourself where you are.
              </p>

              <p className="legal-updated">
                Last updated: 28 October 2026
              </p>

              <article className="legal-content">
                <h2>1. About Solayulm</h2>

                <p>
                  Solayulm offers reflective writing activities,
                  creative exercises, audio experiences and other
                  resources intended to support personal reflection
                  and general wellbeing.
                </p>

                <p>
                  Our aim is to provide space for you to pause,
                  express yourself and explore your feelings at
                  your own pace.
                </p>

                <h2>2. Not Medical or Psychological Advice</h2>

                <p>
                  Solayulm does not provide medical diagnosis,
                  mental health treatment, psychotherapy or
                  professional healthcare services.
                </p>

                <p>
                  Our website content, exercises, audio experiences
                  and products are not a substitute for advice or
                  support from a qualified healthcare or mental
                  health professional.
                </p>

                <h2>3. Individual Experiences May Differ</h2>

                <p>
                  Everyone's experiences, circumstances and needs
                  are different. An activity that feels helpful to
                  one person may not feel appropriate for another.
                </p>

                <p>
                  We do not guarantee that any exercise, reflection,
                  product or experience will produce a particular
                  emotional, psychological or therapeutic outcome.
                </p>

                <h2>4. Take Things at Your Own Pace</h2>

                <p>
                  You are free to pause or stop an activity if it
                  feels uncomfortable, upsetting or overwhelming.
                </p>

                <p>
                  You do not have to complete every exercise or
                  respond to every prompt. Choose what feels
                  appropriate for you.
                </p>

                <h2>5. Seeking Professional Support</h2>

                <p>
                  If you are struggling with your mental health,
                  experiencing persistent distress or finding it
                  difficult to manage daily life, consider speaking
                  with an appropriately qualified professional.
                </p>

                <p>
                  Solayulm is not an emergency or crisis support
                  service. If you are in immediate danger, contact
                  the appropriate emergency service.
                </p>

                <h2>6. Personal Responsibility</h2>

                <p>
                  You are responsible for deciding whether an
                  activity, resource or product is suitable for
                  your circumstances.
                </p>

                <p>
                  Nothing in this disclaimer excludes or limits
                  any liability or consumer right that cannot
                  legally be excluded or limited.
                </p>

                <h2>7. Contact</h2>

                <p>
                  If you have questions about Solayulm's wellbeing
                  resources, contact us at:
                </p>

                <p>
                  Email: heelo@solayulm.co.uk
                  <br />
                  Postal address: [PO Box address to be added]
                </p>

                <p>
                  For information about how we handle personal
                  information, please see our{" "}
                  <Link to="/privacy-policy">
                    Privacy Policy
                  </Link>.
                </p>
              </article>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

export default WellbeingDisclaimer;