import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Message } from "../../backend.d";
import { useActor } from "../../hooks/useActor";
import { SlideNav } from "../SlideNav";
import { Stars } from "../Stars";
import { TopBar } from "../TopBar";

interface Props {
  onNext: () => void;
}

export function Slide7({ onNext }: Props) {
  const [message, setMessage] = useState("");
  const [submittedMsg, setSubmittedMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const { actor, isFetching } = useActor();

  const { data: messages = [], refetch } = useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMessages();
    },
    enabled: !!actor && !isFetching,
  });

  const handleSend = async () => {
    if (!message.trim() || !actor) return;
    setSending(true);
    try {
      await actor.addMessage("GOWTHAM", message.trim());
      setSubmittedMsg(message.trim());
      setMessage("");
      setSent(true);
      refetch();
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="slide slide-fade-in"
      style={{
        background:
          "radial-gradient(ellipse at center, #0d0015 0%, #050008 50%, #000000 100%)",
      }}
      data-ocid="slide7.panel"
    >
      <Stars count={35} />
      <TopBar current={6} total={8} />

      <div
        style={{
          zIndex: 10,
          width: "100%",
          maxWidth: "620px",
          padding: "80px 24px 130px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "14px",
          margin: "0 auto",
          overflowY: "auto",
          maxHeight: "100vh",
        }}
        className="msg-list"
      >
        <div className="anim-rise-up opacity-0-start delay-100">
          <p
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(10px,1.4vw,12px)",
              fontWeight: 700,
              letterSpacing: "0.35em",
              color: "rgba(214,164,74,0.8)",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            💌 Leave Your Wishes
          </p>
        </div>
        <div className="anim-rise-up opacity-0-start delay-200">
          <h2
            className="glow-red"
            style={{
              fontFamily: "Montserrat,sans-serif",
              fontSize: "clamp(17px,3.2vw,34px)",
              fontWeight: 900,
              color: "#f2f2f2",
              textTransform: "uppercase",
              letterSpacing: "0.03em",
              textAlign: "center",
            }}
          >
            Leave Your Wishes For{" "}
            <span style={{ color: "#ff2a2a" }}>KAMALI</span>
          </h2>
        </div>
        <div
          className="anim-rise-up opacity-0-start delay-300"
          style={{ width: "100%" }}
        >
          <p
            style={{
              fontFamily: "Poppins,sans-serif",
              fontSize: "clamp(11px,1.4vw,13px)",
              color: "rgba(242,242,242,0.45)",
              textAlign: "center",
            }}
          >
            Your message will appear below signed by GOWTHAM
          </p>
        </div>
        <div
          className="anim-rise-up opacity-0-start delay-400"
          style={{ width: "100%" }}
        >
          <textarea
            data-ocid="slide7.textarea"
            rows={3}
            placeholder="Write your birthday wishes for KAMALI here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ width: "100%", fontSize: "14px" }}
          />
        </div>
        <div className="anim-rise-up opacity-0-start delay-500">
          <button
            type="button"
            data-ocid="slide7.submit_button"
            className="nav-btn"
            onClick={handleSend}
            disabled={sending || !message.trim()}
            style={{
              opacity: sending || !message.trim() ? 0.6 : 1,
              cursor: sending || !message.trim() ? "not-allowed" : "pointer",
              fontSize: "0.85rem",
              padding: "12px 28px",
            }}
          >
            {sending ? "Sending... 💕" : "Send Love 💕"}
          </button>
        </div>

        {sent && submittedMsg && (
          <div
            data-ocid="slide7.success_state"
            className="message-card anim-pop-in"
            style={{ width: "100%" }}
          >
            <p style={{ fontSize: "22px", marginBottom: "8px" }}>❝</p>
            <p
              style={{
                fontFamily: "Poppins,sans-serif",
                fontSize: "clamp(13px,1.7vw,15px)",
                color: "rgba(242,242,242,0.9)",
                fontStyle: "italic",
                lineHeight: 1.7,
              }}
            >
              {submittedMsg}
            </p>
            <p
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: "clamp(11px,1.3vw,13px)",
                fontWeight: 700,
                color: "#d6a44a",
                marginTop: "10px",
                letterSpacing: "0.06em",
              }}
            >
              — GOWTHAM (Lucky) 💕
            </p>
          </div>
        )}

        {messages.length > 0 && (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            <p
              style={{
                fontFamily: "Montserrat,sans-serif",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "rgba(214,164,74,0.55)",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Previous Wishes
            </p>
            {messages.slice(0, 3).map((m, i) => (
              <div
                key={`msg-${m.author}-${i}`}
                className="message-card"
                data-ocid={`slide7.item.${i + 1}`}
              >
                <p
                  style={{
                    fontFamily: "Poppins,sans-serif",
                    fontSize: "12px",
                    color: "rgba(242,242,242,0.8)",
                    fontStyle: "italic",
                  }}
                >
                  {m.content}
                </p>
                <p
                  style={{
                    fontFamily: "Montserrat,sans-serif",
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#d6a44a",
                    marginTop: "5px",
                  }}
                >
                  — {m.author} 💕
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <SlideNav
        current={6}
        total={8}
        btnLabel="Grand Finale 🎆"
        onNext={onNext}
      />
    </div>
  );
}
