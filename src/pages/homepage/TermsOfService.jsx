import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "../../styles/LegalPage.module.css";

function TermsOfService() {
  return (
    <main className={styles["shop-page"]}>
      <Container>
        <div className={styles["shop-toolkit__inner"]}>
          <div>
            <h2 className={styles["shop-toolkit__title"]}>
              Terms of Service
            </h2>

            <div className="legal-container">
              <p className="legal-subtitle">
                A few things to understand before exploring.
              </p>

              <p className="legal-updated">
                Last updated: 28 October 2026
              </p>

              <article className="legal-content">
                <h2>1. About These Terms</h2>

                <p>
                  These Terms of Service govern your use of the Solayulm
                  website and its services. By accessing or using Solayulm,
                  you agree to these terms where applicable.
                </p>

                <p>
                  Solayulm is operated by an independent individual in the
                  United Kingdom.
                </p>

                <p>
                  Contact email: heelo@solayulm.co.uk
                  <br />
                  Postal address: [PO Box address to be added]
                </p>

                <h2>2. About Solayulm</h2>

                <p>
                  Solayulm is a creative wellbeing platform offering
                  reflective activities, creative exercises, audio
                  experiences, Time Capsules, digital resources and
                  related products.
                </p>

                <p>
                  We may introduce new features, update existing services
                  or discontinue features as the platform develops.
                </p>

                <h2>3. Wellbeing Disclaimer</h2>

                <p>
                  Solayulm provides general wellbeing, self-reflection and
                  creative resources. Our content is not medical advice,
                  psychological diagnosis, psychotherapy or a substitute
                  for professional healthcare.
                </p>

                <p>
                  We do not guarantee any particular emotional,
                  psychological or therapeutic outcome from using our
                  website, activities or products.
                </p>

                <p>
                  If you are experiencing significant emotional distress,
                  consider seeking support from an appropriately qualified
                  healthcare or mental health professional.
                </p>

                <p>
                  Solayulm is not an emergency or crisis support service.
                  If you are in immediate danger, contact the appropriate
                  emergency service.
                </p>

                <h2>4. Acceptable Use</h2>

                <p>
                  When using Solayulm, you agree not to:
                </p>

                <ul>
                  <li>Use the website for unlawful purposes.</li>
                  <li>
                    Attempt to gain unauthorised access to our systems,
                    services or other users' information.
                  </li>
                  <li>
                    Upload malicious software or interfere with the
                    website's operation.
                  </li>
                  <li>
                    Use our services to threaten, harass or unlawfully
                    harm another person.
                  </li>
                  <li>
                    Submit content that infringes another person's
                    intellectual property or other legal rights.
                  </li>
                  <li>
                    Attempt to bypass payment systems or security
                    measures.
                  </li>
                </ul>

                <p>
                  We may restrict access where reasonably necessary to
                  protect our website, users, services or legal interests.
                </p>

                <h2>5. Time Capsules</h2>

                <p>
                  Time Capsules allow you to submit written or video
                  content intended to become available at a future date.
                </p>

                <p>
                  You are responsible for ensuring that the content you
                  submit is lawful and that you have the necessary rights
                  and permissions to submit it.
                </p>

                <p>
                  We will make reasonable efforts to provide the service
                  as described. However, access and delivery may be
                  affected by technical problems, maintenance, provider
                  outages or circumstances outside our reasonable control.
                </p>

                <p>
                  Time Capsule content may remain in storage after its
                  scheduled opening date. Automatic deletion after opening
                  is not currently guaranteed.
                </p>

                <p>
                  Please keep any copies of content that you wish to
                  preserve. Nothing in these terms removes your rights
                  under applicable data protection or consumer law.
                </p>

                <h2>6. Intellectual Property</h2>

                <p>
                  Unless otherwise stated, Solayulm's original branding,
                  artwork, written content, designs, website materials and
                  products belong to Solayulm or are used with permission.
                </p>

                <p>
                  You may use our content for personal purposes in
                  accordance with any applicable product licence.
                  You must not reproduce, redistribute, sell or
                  commercially exploit our original content without
                  permission, except where permitted by law.
                </p>

                <p>
                  Content you submit remains yours to the extent that you
                  own the relevant rights. You grant us permission to
                  store and process that content as reasonably necessary
                  to provide the service, maintain security and meet
                  applicable legal obligations.
                </p>

                <h2>7. Products and Payments</h2>

                <p>
                  Certain products and services require payment. Prices,
                  product descriptions and payment arrangements will be
                  displayed through the relevant checkout or sales platform.
                </p>

                <p>
                  Depending on the product, payments or fulfilment may be
                  handled by third-party providers such as Stripe,
                  Gumroad or Lulu.
                </p>

                <p>
                  Purchases made through external platforms may also be
                  subject to those platforms' own terms and conditions.
                </p>

                <h2>8. Cancellations and Refunds</h2>

                <p>
                  Your statutory consumer rights remain unaffected by
                  these terms.
                </p>

                <p>
                  Cancellation and refund rights depend on the type of
                  product or service purchased and the circumstances of
                  the transaction.
                </p>

                <p>
                  Certain digital content supplied immediately may be
                  subject to an exception to the usual cancellation
                  period where the required legal conditions have been met.
                </p>

                
                <h2>9. Website Availability</h2>

                <p>
                  We aim to keep Solayulm available and functioning
                  reliably, but we cannot guarantee uninterrupted access.
                </p>

                <p>
                  Maintenance, technical problems, security issues or
                  third-party service interruptions may occasionally
                  affect availability.
                </p>

                <h2>10. Liability</h2>

                <p>
                  Nothing in these terms excludes or limits liability
                  where such exclusion or limitation would be unlawful.
                  This includes liability that cannot legally be excluded
                  for negligence, fraud or fraudulent misrepresentation.
                </p>

                <p>
                  Subject to applicable law, we are not responsible for
                  losses caused by events outside our reasonable control
                  or by your misuse of the website.
                </p>

                <p>
                  If you are a consumer, your statutory rights remain
                  unaffected.
                </p>

                <h2>11. Privacy</h2>

                <p>
                  Our{" "}
                  <Link to="/privacy-policy">
                    Privacy Policy
                  </Link>{" "}
                  explains how we collect, use and store personal
                  information.
                </p>

                <h2>12. Changes to These Terms</h2>

                <p>
                  We may update these terms as our services develop or
                  our legal obligations change. Updated terms will be
                  published on this page.
                </p>

                <h2>13. Governing Law</h2>

                <p>
                  These terms are governed by the laws of England and
                  Wales, subject to any mandatory consumer protections
                  that apply to you.
                </p>

                <h2>14. Contact</h2>

                <p>
                  If you have questions about these terms, contact us at:
                </p>

                <p>
                  Email: heelo@solayulm.co.uk
                  <br />
                  Postal address: [PO Box address to be added]
                </p>

                <p>
                  You can also visit our{" "}
                  <Link to="/privacy-policy">
                    Privacy Policy
                  </Link>{" "}
                  or{" "}
                  <Link to="/cookies">
                    Cookie Policy
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

export default TermsOfService;