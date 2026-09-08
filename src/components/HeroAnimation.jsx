import React, { useEffect, useRef } from "react";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

/**
 * nodeWeb renders three related mathematical systems:
 * home = decision graph, research = evidence topology, delivery = route network.
 */
export const HeroAnimation = ({ activeNode = null, mode = "home", trainingRef = null }) => {
  const canvasRef = useRef(null);
  const activeNodeRef = useRef(activeNode);

  useEffect(() => {
    activeNodeRef.current = activeNode;
  }, [activeNode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nodes = [];
    const mouse = { x: null, y: null, tx: null, ty: null, dx: 0, dy: 0, speed: 0, movedAt: 0 };
    const cursorTrail = [];
    const snakeTrail = [];
    const snake = { active: false, x: 0, y: 0, vx: 0, vy: 0 };
    let width = 1;
    let height = 1;
    let dpr = 1;
    let frame;
    let lastTime = performance.now();
    let stage = "NOTICE";
    let followTime = 0;
    let followElapsed = 0;
    let playTime = 0;

    const seed = () => {
      nodes.length = 0;
      const count = mode === "home" ? 108 : 84;
      const columns = 12;
      const rows = Math.ceil(count / columns);
      for (let i = 0; i < count; i += 1) {
        const col = i % columns;
        const row = Math.floor(i / columns);
        let x = ((col + 0.2 + Math.random() * 0.6) / columns) * width;
        let y = ((row + 0.2 + Math.random() * 0.6) / rows) * height;
        if (mode === "research") {
          const cluster = i % 3;
          const angle = (i / count) * Math.PI * 12 + cluster * 0.7;
          const radius = (30 + (i % 14) * 10) * Math.min(1, width / 1100);
          const centers = [[width * 0.18, height * 0.28], [width * 0.8, height * 0.28], [width * 0.5, height * 0.76]];
          x = centers[cluster][0] + Math.cos(angle) * radius;
          y = centers[cluster][1] + Math.sin(angle) * radius * 0.72;
        }
        nodes.push({
          x, y, homeX: x, homeY: y,
          vx: (Math.random() - 0.5) * 0.14,
          vy: (Math.random() - 0.5) * 0.14,
          radius: 1.15 + Math.random() * 1.75,
          side: i % 2 === 0 ? "research" : "delivery",
          routeT: Math.floor(i / 2) / (count / 2 - 1),
          phase: Math.random() * Math.PI * 2,
          row, col,
          followRank: count,
          join: 0,
          history: [],
        });
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const move = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (mouse.tx !== null) {
        mouse.dx = x - mouse.tx;
        mouse.dy = y - mouse.ty;
        mouse.speed = Math.hypot(mouse.dx, mouse.dy);
      }
      mouse.tx = x;
      mouse.ty = y;
      if (mouse.x === null) {
        mouse.x = x;
        mouse.y = y;
      }
      mouse.movedAt = performance.now();
    };

    const leave = () => {
      mouse.x = null;
      mouse.y = null;
      mouse.tx = null;
      mouse.ty = null;
      mouse.speed = 0;
      mouse.dx = 0;
      mouse.dy = 0;
    };

    const weightAt = (node, radius = 285) => {
      if (mouse.x === null) return 0;
      return clamp(1 - Math.hypot(mouse.x - node.x, mouse.y - node.y) / radius, 0, 1);
    };

    const updateStage = (dt) => {
      const movingDeliberately = mouse.x !== null && mouse.speed > 0.8 && mouse.speed < 16;
      if (stage === "NOTICE") {
        followTime = movingDeliberately ? followTime + dt : Math.max(0, followTime - dt * 0.7);
        if (followTime > 2.2) {
          stage = "FOLLOW";
          followElapsed = 0;
          [...nodes]
            .sort((a, b) =>
              Math.hypot(a.x - mouse.x, a.y - mouse.y) -
              Math.hypot(b.x - mouse.x, b.y - mouse.y)
            )
            .forEach((node, rank) => {
              node.followRank = rank;
            });
        }
      } else if (stage === "FOLLOW") {
        followElapsed += dt;
        followTime += movingDeliberately ? dt : -dt * 0.25;
        if (followTime > 7.5) {
          stage = "PLAY";
          snake.active = true;
          snake.x = mouse.x ?? width / 2;
          snake.y = mouse.y ?? height / 2;
          snake.vx = mouse.dx;
          snake.vy = mouse.dy;
          snakeTrail.splice(0, snakeTrail.length, ...cursorTrail);
        }
        if (followTime < 0.8) {
          stage = "NOTICE";
          followElapsed = 0;
        }
      } else {
        playTime += dt;
      }
    };

    const cursorInstrument = (now, label) => {
      if (mouse.x === null) return;
      const still = clamp((now - mouse.movedAt - 100) / 460, 0, 1);
      const radius = 15 + still * 17;
      ctx.strokeStyle = `rgba(255,255,255,${0.48 + still * 0.4})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
      ctx.moveTo(mouse.x - radius - 10, mouse.y);
      ctx.lineTo(mouse.x - radius + 2, mouse.y);
      ctx.moveTo(mouse.x + radius - 2, mouse.y);
      ctx.lineTo(mouse.x + radius + 10, mouse.y);
      ctx.moveTo(mouse.x, mouse.y - radius - 10);
      ctx.lineTo(mouse.x, mouse.y - radius + 2);
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,.62)";
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillText(`${label} · ${stage}`, mouse.x + radius + 12, mouse.y - 7);
      ctx.fillText(`x ${Math.round(mouse.x)}  y ${Math.round(mouse.y)}`, mouse.x + radius + 12, mouse.y + 8);
    };

    const homeSystem = (now, dt) => {
      updateStage(dt);
      const active = activeNodeRef.current;
      const rendered = [];
      const recruitedCount =
        stage === "NOTICE"
          ? 0
          : stage === "FOLLOW"
            ? Math.min(56, 4 + Math.floor(followElapsed * 9))
            : Math.min(92, 56 + Math.floor(playTime * 5));

      if (stage === "PLAY" && snake.active) {
        const cursorEngaged = mouse.x !== null && (mouse.speed > 0.5 || Math.hypot(mouse.x - snake.x, mouse.y - snake.y) < 180);
        if (cursorEngaged) {
          snake.vx += (mouse.x - snake.x) * 0.008 + mouse.dx * 0.09;
          snake.vy += (mouse.y - snake.y) * 0.008 + mouse.dy * 0.09;
        } else {
          snake.vx += Math.cos(playTime * 1.17) * 0.045;
          snake.vy += Math.sin(playTime * 0.91) * 0.045;
        }
        snake.vx *= 0.965;
        snake.vy *= 0.965;
        snake.x += snake.vx;
        snake.y += snake.vy;
        snakeTrail.unshift([snake.x, snake.y]);
        if (snakeTrail.length > 220) snakeTrail.pop();
      }

      nodes.forEach((node, index) => {
        const recruited = node.followRank < recruitedCount;
        node.join = clamp(node.join + dt * (recruited ? 1.55 : -0.85), 0, 1);
        const joinEase = node.join * node.join * (3 - 2 * node.join);
        let targetX = node.homeX;
        let targetY = node.homeY;
        if (active && node.side === active) {
          const t = node.routeT;
          const u = active === "research" ? t : 1 - t;
          targetX = width * (0.04 + u * 0.92);
          targetY = height * (0.18 + t * 0.62 + Math.sin(t * Math.PI * 3 + now * 0.00055) * 0.085);
        }

        if (!reducedMotion.matches) {
          const restoring = active && node.side === active ? 0.00016 : 0.000035;
          node.vx += (targetX - node.x) * restoring;
          node.vy += (targetY - node.y) * restoring;
          node.x += node.vx;
          node.y += node.vy;
          node.vx *= 0.984;
          node.vy *= 0.984;
        }

        const weight = weightAt(node);
        let rx = node.x;
        let ry = node.y;
        if (weight > 0 && mouse.x !== null) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const distance = Math.max(1, Math.hypot(dx, dy));
          const attraction = stage === "NOTICE" ? 74 : 118;
          const orbit = Math.sin(node.phase + now * 0.002) * 13 * weight;
          rx += (dx / distance) * weight * weight * attraction + (-dy / distance) * orbit;
          ry += (dy / distance) * weight * weight * attraction + (dx / distance) * orbit;
        }

        if (node.join > 0.001) {
          const trail = stage === "PLAY" ? snakeTrail : cursorTrail;
          const trailPoint = trail[Math.min(trail.length - 1, node.followRank * 3)];
          if (trailPoint) {
            const wave = Math.sin(node.followRank * 0.34 - now * 0.0045) * (stage === "PLAY" ? 9 : 4);
            const tx = trailPoint[0];
            const ty = trailPoint[1] + wave;
            rx += (tx - rx) * joinEase;
            ry += (ty - ry) * joinEase;
          }
        }

        node.history.push([rx, ry, now]);
        if (node.history.length > 24) node.history.shift();
        rendered.push({ ...node, rx, ry, weight });
      });

      const nearest = mouse.x === null ? [] : [...rendered]
        .sort((a, b) => Math.hypot(a.rx - mouse.x, a.ry - mouse.y) - Math.hypot(b.rx - mouse.x, b.ry - mouse.y))
        .slice(0, stage === "NOTICE" ? 8 : 18);

      rendered.forEach((node) => {
        ctx.fillStyle = nearest.includes(node) ? "#fff" : active === node.side ? "rgba(255,255,255,.88)" : "rgba(255,255,255,.48)";
        ctx.beginPath();
        ctx.arc(node.rx, node.ry, node.radius + node.weight * 1.8, 0, Math.PI * 2);
        ctx.fill();
      });
      cursorInstrument(now, "nodeWeb");
      return rendered;
    };

    const researchSystem = (now) => {
      const rendered = nodes.map((node) => {
        const weight = weightAt(node, 310);
        const dx = mouse.x === null ? 0 : mouse.x - node.x;
        const dy = mouse.y === null ? 0 : mouse.y - node.y;
        const distance = Math.max(1, Math.hypot(dx, dy));
        return { ...node, weight, rx: node.x + (dx / distance) * weight * 64, ry: node.y + (dy / distance) * weight * 64 };
      });
      rendered.forEach((node) => {
        const pulse = node.weight * (0.5 + 0.5 * Math.sin(now * 0.006 - node.routeT * 14));
        ctx.fillStyle = `rgba(255,255,255,${0.4 + node.weight * 0.6})`;
        ctx.beginPath();
        ctx.arc(node.rx, node.ry, node.radius + pulse * 2.4, 0, Math.PI * 2);
        ctx.fill();
      });
      if (mouse.x !== null) {
        for (let ring = 0; ring < 3; ring += 1) {
          const radius = (now * 0.06 + ring * 78) % 234;
          ctx.strokeStyle = `rgba(255,255,255,${0.24 * (1 - radius / 234)})`;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      cursorInstrument(now, "EVIDENCE QUERY");
      return rendered;
    };

    const deliverySystem = (now) => {
      const rendered = nodes.map((node) => {
        const weight = weightAt(node, 245);
        return { ...node, weight, rx: node.x + (mouse.x === null ? 0 : (mouse.x - node.x) * weight * 0.42), ry: node.y + (mouse.y === null ? 0 : (mouse.y - node.y) * weight * 0.42) };
      });
      rendered.forEach((node) => {
        ctx.fillStyle = `rgba(255,255,255,${0.4 + node.weight * 0.6})`;
        ctx.fillRect(node.rx - 1.6, node.ry - 1.6, 3.2 + node.weight * 2, 3.2 + node.weight * 2);
      });
      for (let i = 0; i < 10; i += 1) {
        const rows = Math.ceil(nodes.length / 12);
        const row = (i * 3) % rows;
        const t = (now * (0.000075 + i * 0.000004) + i * 0.13) % 1;
        ctx.fillStyle = "rgba(255,255,255,.96)";
        ctx.beginPath();
        ctx.arc(width * (0.035 + t * 0.93), height * ((row + 0.5) / rows), 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
      cursorInstrument(now, "ROUTE OVERRIDE");
      return rendered;
    };

    const draw = (now = 0) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000 || 0);
      lastTime = now;
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, width, height);
      if (mouse.tx !== null && mouse.x !== null) {
        mouse.x += (mouse.tx - mouse.x) * 0.34;
        mouse.y += (mouse.ty - mouse.y) * 0.34;
        mouse.speed *= 0.9;
        cursorTrail.unshift([mouse.x, mouse.y]);
        if (cursorTrail.length > 180) cursorTrail.pop();
      }
      let rendered;
      if (mode === "research") rendered = researchSystem(now);
      else if (mode === "delivery") rendered = deliverySystem(now);
      else rendered = homeSystem(now, dt);

      if (trainingRef) {
        trainingRef.current = {
          stage,
          time: now,
          cursor: { x: mouse.x, y: mouse.y, speed: mouse.speed },
          bounds: { width, height },
          nodes: rendered.map((node) => ({
            x: node.rx,
            y: node.ry,
            vx: node.vx,
            vy: node.vy,
            membership: node.join,
            followRank: node.followRank,
          })),
        };
      }
      if (!reducedMotion.matches) frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [mode, trainingRef]);

  return (
    <div className={`hero-animation-container hero-animation-container--${mode}`} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};
