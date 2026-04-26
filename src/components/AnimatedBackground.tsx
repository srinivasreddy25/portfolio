import React, { useEffect, useRef } from 'react';

interface Orb {
  x: number; y: number;
  vx: number; vy: number;
  radius: number;
  color: string;
  alpha: number;
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = document.body.scrollHeight || window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const orbs: Orb[] = [];
    const ORB_COLORS = [
      'rgba(33,150,243,',
      'rgba(124,77,255,',
      'rgba(0,229,118,',
      'rgba(224,64,251,',
      'rgba(33,203,243,',
    ];

    for (let i = 0; i < 18; i++) {
      orbs.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 80 + Math.random() * 180,
        color: ORB_COLORS[Math.floor(Math.random() * ORB_COLORS.length)],
        alpha: 0.04 + Math.random() * 0.06,
      });
    }

    let raf: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // Dark base
      ctx.fillStyle = '#0d1117';
      ctx.fillRect(0, 0, W, H);

      // Subtle grid
      ctx.strokeStyle = 'rgba(33,150,243,0.04)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Orbs
      for (const o of orbs) {
        o.x += o.vx;
        o.y += o.vy;
        if (o.x < -o.radius) o.x = W + o.radius;
        if (o.x > W + o.radius) o.x = -o.radius;
        if (o.y < -o.radius) o.y = H + o.radius;
        if (o.y > H + o.radius) o.y = -o.radius;

        const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.radius);
        grad.addColorStop(0, `${o.color}${o.alpha})`);
        grad.addColorStop(1, `${o.color}0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pulsing ring at top center
      const cx = W / 2;
      const cy = 300;
      for (let r = 0; r < 3; r++) {
        const radius = 120 + r * 80 + Math.sin(t * 0.02 + r) * 20;
        const alpha = 0.06 - r * 0.015;
        ctx.strokeStyle = `rgba(33,150,243,${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Scanning line
      const scanY = (Math.sin(t * 0.008) * 0.5 + 0.5) * H;
      const scanGrad = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
      scanGrad.addColorStop(0, 'transparent');
      scanGrad.addColorStop(0.5, 'rgba(33,203,243,0.12)');
      scanGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 2, W, 4);

      t++;
      raf = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      W = window.innerWidth;
      H = document.body.scrollHeight || window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default AnimatedBackground;
