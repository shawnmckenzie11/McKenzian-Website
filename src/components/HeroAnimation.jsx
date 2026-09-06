import React, { useRef, useEffect } from "react";

/**
 * Linearly interpolates between two numbers.
 * @param {number} a
 * @param {number} b
 * @param {number} t - 0..1
 * @returns {number}
 */
function mix(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Returns background and foreground RGBA strings for the current oscillation phase.
 * Background sweeps black → white; foreground is the inverse so nodes/lines stay visible.
 * @param {number} phase - 0 (black bg) .. 1 (white bg)
 * @returns {{ bg: string, node: string, line: string, mouseLine: string }}
 */
function paletteForPhase(phase) {
  const bgVal = Math.round(mix(0, 255, phase));
  const fgVal = 255 - bgVal;
  return {
    bg: `rgb(${bgVal}, ${bgVal}, ${bgVal})`,
    node: `rgba(${fgVal}, ${fgVal}, ${fgVal}, 0.62)`,
    line: `rgba(${fgVal}, ${fgVal}, ${fgVal}, 0.38)`,
    mouseLine: `rgba(${fgVal}, ${fgVal}, ${fgVal}, 0.5)`,
  };
}

/**
 * Full-viewport particle network: bg and foreground sweep black ↔ white in sync.
 * Connection lines use flat opacity (no distance falloff).
 */
export const HeroAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    const startTime = performance.now();

    const particles = [];
    const particleCount = 80;
    const connectionDistance = 100;

    /**
     * Resizes the canvas backing store to match layout pixels.
     */
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    let mouse = { x: null, y: null };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1.5,
      });
    }

    /**
     * One static frame for reduced-motion preference.
     */
    const drawStatic = () => {
      const { bg, node, line } = paletteForPhase(0.5);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = node;
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = line;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    if (mediaQuery.matches) {
      const onStaticResize = () => {
        handleResize();
        drawStatic();
      };
      drawStatic();
      window.addEventListener("resize", onStaticResize);
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("resize", onStaticResize);
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    /**
     * Animation loop: temporal bg/fg gradient, flat-opacity edges.
     */
    const animate = (now) => {
      const elapsed = (now - startTime) * 0.00012;
      const phase = (Math.sin(elapsed) + 1) / 2;
      const { bg, node, line, mouseLine } = paletteForPhase(phase);

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = node;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = line;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance + 50) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = mouseLine;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="hero-animation-container" aria-hidden="true">
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};
