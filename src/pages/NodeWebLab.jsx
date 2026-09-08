import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HeroAnimation } from "../components/HeroAnimation";
import { useDocumentMetadata } from "../hooks/useDocumentMetadata";

const labels = [
  ["useful", "Good follow"],
  ["weak", "Too weak"],
  ["aggressive", "Too aggressive"],
  ["playful", "Good play"],
];

const sessionKey = "mckenzian_nodeweb_training_session";

export const NodeWebLab = () => {
  const liveState = useRef(null);
  const samples = useRef([]);
  const events = useRef([]);
  const [recording, setRecording] = useState(false);
  const [sampleCount, setSampleCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [lastFeedback, setLastFeedback] = useState(null);

  useDocumentMetadata("nodeWeb Lab", "Train nodeWeb with cursor demonstrations and human feedback.");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(sessionKey) || "null");
      if (!saved) return;
      samples.current = saved.samples || [];
      events.current = saved.feedback || [];
      setSampleCount(samples.current.length);
      setFeedbackCount(events.current.length);
      if (events.current.length) setLastFeedback(events.current.at(-1));
    } catch {
      localStorage.removeItem(sessionKey);
    }
  }, []);

  const persist = () => {
    try {
      localStorage.setItem(sessionKey, JSON.stringify({
        schema: "mckenzian.nodeweb.demonstration.v2",
        samples: samples.current,
        feedback: events.current,
      }));
    } catch {
      setLastFeedback({ label: "storage-full", text: "Session captured, but local storage is full. Export it now." });
    }
  };

  useEffect(() => {
    if (!recording) return undefined;
    const timer = window.setInterval(() => {
      if (!liveState.current) return;
      samples.current.push({
        ...liveState.current,
        recordedAt: Date.now(),
      });
      setSampleCount(samples.current.length);
    }, 100);
    return () => window.clearInterval(timer);
  }, [recording]);

  const labelMoment = (reward, label, text) => {
    if (!liveState.current) {
      setLastFeedback({ label: "initializing", text: "nodeWeb is initializing. Try once more." });
      return;
    }
    const recordedAt = Date.now();
    samples.current.push({
      ...liveState.current,
      recordedAt,
      directFeedback: true,
    });
    const feedback = {
      reward,
      label,
      text: `Accepted: ${text}`,
      recordedAt,
      state: liveState.current.stage,
      cursor: liveState.current.cursor,
      sampleIndex: samples.current.length - 1,
    };
    events.current.push(feedback);
    setSampleCount(samples.current.length);
    setFeedbackCount(events.current.length);
    setLastFeedback(feedback);
    window.setTimeout(persist, 0);
  };

  const toggleRecording = () => {
    if (recording) {
      persist();
      setLastFeedback({ label: "saved", text: "Demonstration stopped and saved on this device." });
    } else {
      setLastFeedback({ label: "recording", text: "Recording every node position, velocity, and cursor state." });
    }
    setRecording((value) => !value);
  };

  const reset = () => {
    setRecording(false);
    samples.current = [];
    events.current = [];
    setSampleCount(0);
    setFeedbackCount(0);
    setLastFeedback(null);
    localStorage.removeItem(sessionKey);
  };

  const download = () => {
    const payload = {
      schema: "mckenzian.nodeweb.demonstration.v2",
      coordinateSystem: "screen-space xy; origin top-left; time milliseconds",
      generatedAt: new Date().toISOString(),
      samples: samples.current,
      feedback: events.current,
    };
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `nodeweb-training-${Date.now()}.json`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main id="main-content" className="nodeweb-lab">
      <HeroAnimation mode="home" trainingRef={liveState} />
      <header className="nodeweb-lab-header">
        <Link to="/" className="nodeweb-lab-back">← McKenzian</Link>
        <div className="nodeweb-state-key"><span /> Notice <span /> Follow <span /> Play</div>
      </header>

      <section className="nodeweb-lab-panel" aria-labelledby="nodeweb-lab-title">
        <p className="systems-overline">Human-guided dynamics</p>
        <h1 id="nodeweb-lab-title">Teach nodeWeb how to play.</h1>
        <p>
          Move steadily to invite a tail. Slow down without stopping to sustain Follow.
          Once the system changes identity, provoke it with loops, feints, pauses, and edge runs.
        </p>

        <div className="nodeweb-controls">
          <button type="button" className={recording ? "is-recording" : ""} onClick={toggleRecording}>
            {recording ? "Stop demonstration" : "Record demonstration"}
          </button>
          <span>{sampleCount} states · {feedbackCount} labels</span>
        </div>

        <div className="nodeweb-feedback" aria-label="Label the current behavior">
          {labels.map(([label, text], index) => (
            <button
              key={label}
              type="button"
              className={lastFeedback?.label === label ? "is-accepted" : ""}
              aria-pressed={lastFeedback?.label === label}
              onClick={() => labelMoment(index === 0 || index === 3 ? 1 : -1, label, text)}
            >
              {text}
            </button>
          ))}
        </div>

        <p className="nodeweb-feedback-status" role="status" aria-live="polite">
          {lastFeedback?.text || "Choose a label whenever nodeWeb does something worth teaching."}
        </p>

        <div className="nodeweb-export">
          <button type="button" onClick={download} disabled={!sampleCount && !feedbackCount}>Export training session</button>
          <button type="button" onClick={reset} disabled={!sampleCount && !feedbackCount}>Reset</button>
        </div>
      </section>
    </main>
  );
};
