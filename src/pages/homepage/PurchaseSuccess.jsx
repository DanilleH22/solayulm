
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";

function PurchaseSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState("loading");
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("invalid");
      return;
    }

    const verifyPayment = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/verify-checkout-session/?session_id=${encodeURIComponent(sessionId)}`
        );

        const data = await response.json();

        if (!response.ok || !data.paid) {
          setStatus("unconfirmed");
          return;
        }

        setOrder(data);
        setStatus("success");
      } catch (error) {
        console.error("Payment verification error:", error);
        setStatus("error");
      }
    };

    verifyPayment();
  }, [sessionId]);

  const pageStyle = {
    minHeight: "65vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    color: "#f4efff",
    textAlign: "center",
  };

  const panelStyle = {
    maxWidth: "620px",
    width: "100%",
    padding: "45px 25px",
    border: "1px solid rgba(190, 160, 255, 0.35)",
    borderRadius: "20px",
    background: "rgba(35, 20, 65, 0.55)",
    boxShadow: "0 0 35px rgba(120, 70, 200, 0.12)",
  };

  return (
    <section style={pageStyle}>
      <Container>
        <div style={panelStyle}>
          {status === "loading" && (
            <>
              <Spinner animation="border" variant="light" />
              <h1 style={{ marginTop: "24px" }}>
                Checking your order...
              </h1>
              <p>Please give us a moment to confirm your payment.</p>
            </>
          )}

          {status === "success" && (
            <>
              <div style={{ fontSize: "48px", marginBottom: "15px" }}>
                ✦
              </div>
              <h1>Your space is waiting.</h1>
              <p style={{ marginTop: "20px", lineHeight: 1.8 }}>
                Thank you for making space for yourself.
                Your journey with Coloring the Cosmo begins here.
              </p>

              <p>
                Edition:{" "}
                <strong>
                  {order.edition === "digital" ? "Digital" : "Physical"}
                </strong>
              </p>

              <p style={{ color: "#c8b8e8", fontSize: "14px" }}>
                {order.edition === "digital"
                  ? "Your payment is confirmed. Digital delivery will be arranged separately."
                  : "Your payment is confirmed. Your print order will need to be processed for fulfilment."}
              </p>

              <Link
                to="/Shop"
                style={{
                  display: "inline-block",
                  marginTop: "20px",
                  padding: "12px 25px",
                  borderRadius: "8px",
                  background: "#8b69c8",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Return to the shop
              </Link>
            </>
          )}

          {status === "unconfirmed" && (
            <>
              <h1>Payment not confirmed yet</h1>
              <p>
                We couldn't confirm a completed payment for this order.
                If you completed checkout, please allow a moment and try again.
              </p>
            </>
          )}

          {(status === "error" || status === "invalid") && (
            <>
              <h1>We couldn't verify your order</h1>
              <p>
                Your order hasn't been confirmed on this page.
                Please contact us if you completed payment and need help.
              </p>
              <Link to="/Shop" style={{ color: "#d7c4ff" }}>
                Return to the shop
              </Link>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}

export default PurchaseSuccess;
