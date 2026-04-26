import React, { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  rotation: number;
  rotationSpeed: number;
  shape: 'rect' | 'circle' | 'star';
}

const COLORS = [
  '#2196f3', '#21CBF3', '#7c4dff', '#e040fb',
  '#00e676', '#ffea00', '#ff6d00', '#ff1744',
  '#00b0ff', '#69f0ae', '#ffd740', '#ff6e40',
];

const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const isRunningRef = useRef(false);

  const createParticles = useCallback((x: number, y: number, count = 120) => {
    const shapes: Particle['shape'][] = ['rect', 'circle', 'star'];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = 4 + Math.random() * 10;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 6,
        alpha: 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      });
    }
  }, []);

  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number) => {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
      const innerAngle = angle + Math.PI / 5;
      if (i === 0) ctx.moveTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
      else ctx.lineTo(x + r * Math.cos(angle), y + r * Math.sin(angle));
      ctx.lineTo(x + (r / 2) * Math.cos(innerAngle), y + (r / 2) * Math.sin(innerAngle));
    }
    ctx.closePath();
  };

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current = particlesRef.current.filter(p => p.alpha > 0.01);

    for (const p of particlesRef.current) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3; // gravity
      p.vx *= 0.99;
      p.alpha -= 0.012;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.fillStyle = p.color;
      ctx.strokeStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        drawStar(ctx, 0, 0, p.size / 2);
        ctx.fill();
      }
      ctx.restore();
    }

    if (particlesRef.current.length > 0) {
      animFrameRef.current = requestAnimationFrame(animate);
    } else {
      isRunningRef.current = false;
    }
  }, []);

  const burst = useCallback((x: number, y: number, count?: number) => {
    createParticles(x, y, count);
    if (!isRunningRef.current) {
      isRunningRef.current = true;
      animFrameRef.current = requestAnimationFrame(animate);
    }
  }, [createParticles, animate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initial burst on load
    const timer = setTimeout(() => {
      burst(window.innerWidth / 2, window.innerHeight / 3, 150);
    }, 800);

    // Click burst
    const handleClick = (e: MouseEvent) => {
      burst(e.clientX, e.clientY, 60);
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleClick);
      clearTimeout(timer);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [burst]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default Confetti;
