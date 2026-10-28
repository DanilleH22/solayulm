
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/LegalPage.module.css";




function Shop() {
  return (
    <main className={styles["shop-page"]}>
  <Container>
    <div className={styles["shop-toolkit__inner"]}>
      <div >

        <h2 className={styles["shop-toolkit__title"]}>
          Privacy Policy
        </h2>

   
      <div className="legal-container">
  

        <p className="legal-subtitle">
          Your privacy matters in every corner of the cosmos.
        </p>

        <p className="legal-updated">
          Last updated: 28 October 2026
        </p>

        <article className="legal-content">
          <h2>1. Who We Are</h2>

          <p>
            Solayulm is an independent wellbeing and creative platform
            operated by an individual in the United Kingdom.
          </p>

          <p>
            Contact email: heelo@solayulm.co.uk
            <br />
            Postal address: [PO Box address to be added]
          </p>

          <h2>2. Information We Collect</h2>

          <p>Depending on how you use Solayulm, we may collect:</p>

          <ul>
            <li>Email addresses provided when creating a Time Capsule or contacting us.</li>
            <li>Letters, messages and videos submitted through Time Capsules.</li>
            <li>Purchase references and payment confirmation information.</li>
            <li>Technical information about your device, browser and website usage.</li>
            <li>Information you provide when requesting support.</li>
          </ul>

          <h2>3. How We Use Your Information</h2>

          <p>We may use your information to:</p>

          <ul>
            <li>Provide and maintain our website and services.</li>
            <li>Create and manage Time Capsules.</li>
            <li>Send scheduled capsule notifications.</li>
            <li>Process purchases and verify payments.</li>
            <li>Respond to enquiries and resolve technical issues.</li>
            <li>Maintain website security and improve our services.</li>
            <li>Meet applicable legal obligations.</li>
          </ul>

          <h2>4. Time Capsules</h2>

          <p>
            Time Capsules allow you to submit written or video content
            intended to become available at a future date.
          </p>

          <p>
            Capsule content may be stored using Cloudflare R2. Resend is
            used to deliver Time Capsule notification emails.
          </p>

          <p>
            Content may remain in storage after its scheduled opening date.
            Automatic deletion after opening is not currently guaranteed.
            We intend to establish and implement a defined retention and
            deletion process.
          </p>

          <p>
            To enquire about your personal information or request deletion,
            contact heelo@solayulm.co.uk. Requests will be considered in
            accordance with applicable law.
          </p>

          <h2>5. Payments and External Services</h2>

          <p>
            Depending on the service, we may use Stripe, Gumroad and Lulu
            to process or fulfil purchases. We may also use Netlify for
            website hosting, Render for backend hosting and Google Analytics
            for website analytics.
          </p>

          <p>
            These providers may process information as necessary to provide
            their services. Please consult their respective privacy policies
            for further information.
          </p>

          <h2>6. Cookies and Analytics</h2>

          <p>
            Our website may use cookies and similar technologies for
            essential functionality, security and analytics. Where required,
            we will request consent before activating non-essential tracking.
          </p>

          <p>
            Please see our <a href="/cookies">Cookie Policy</a> for further
            information.
          </p>

          <h2>7. Legal Basis for Processing</h2>

          <p>
            Depending on the circumstances, we may process personal
            information to fulfil a contract, meet a legal obligation,
            pursue legitimate interests or obtain consent where required.
            Additional conditions may apply when processing sensitive
            personal information.
          </p>

          <h2>8. International Transfers</h2>

          <p>
            Some service providers may process information outside the
            United Kingdom. Where required, we will use appropriate
            safeguards for international transfers.
          </p>

          <h2>9. How Long We Keep Information</h2>

          <p>
            We retain personal information for as long as reasonably
            necessary for the purposes described in this policy, taking
            account of legal, operational and security requirements.
          </p>

          <p>
            Time Capsule content may remain stored after its opening date.
            We will establish and implement a documented retention and
            deletion schedule.
          </p>

          <h2>10. Your Rights</h2>

          <p>
            Depending on the circumstances, you may have rights to access,
            correct or request deletion of your personal information,
            restrict or object to certain processing, request data
            portability, or withdraw consent.
          </p>

          <p>
            To exercise your rights, email heelo@solayulm.co.uk.
            You may also complain to the UK Information Commissioner's
            Office (ICO).
          </p>

          <h2>11. Security</h2>

          <p>
            We take reasonable steps to protect personal information.
            However, no internet-based service can be guaranteed to be
            completely secure.
          </p>

          <h2>12. Children's Privacy</h2>

          <p>
            Solayulm is not specifically designed to collect personal
            information from children. If you have concerns about
            information submitted by a child, please contact us.
          </p>

          <h2>13. Changes to This Policy</h2>

          <p>
            We may update this policy as our services or legal obligations
            change. The latest version will be published on this page.
          </p>

          <h2>14. Contact</h2>

          <p>
            For questions about privacy or your personal information,
            contact heelo@solayulm.co.uk.
          </p>

          <p>Postal address: [PO Box address to be added]</p>
        </article>

        
      </div>
    


      </div>

      
    </div>
  </Container>

     
    </main>
  );
}

export default Shop;
