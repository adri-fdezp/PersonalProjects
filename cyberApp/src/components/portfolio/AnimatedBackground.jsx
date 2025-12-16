import { useEffect, useRef } from 'react';

// Animated Gradient Background
// Smoothly transitions between different colors to create a fluid, ambient background.
export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Define a set of colors for the gradient transition
    const colors = [
      [6, 182, 212],   // Cyan-500
      [59, 130, 246],  // Blue-500
      [139, 92, 246],  // Violet-500
      [236, 72, 153],  // Pink-500
      [249, 115, 22],  // Orange-500
    ];

    let colorIndex = 0;
    let transitionProgress = 0;
    const transitionSpeed = 0.005; // Speed of color transition (lower is slower)

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Helper function to interpolate between two colors (RGB values)
    const interpolateColor = (color1, color2, factor) => {
      const result = color1.slice();
      for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
      }
      return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
    };

    const animate = () => {
      const prevColor = colors[colorIndex];
      const nextColor = colors[(colorIndex + 1) % colors.length];

      const currentColor = interpolateColor(prevColor, nextColor, transitionProgress);
      const nextInterimColor = interpolateColor(nextColor, colors[(colorIndex + 2) % colors.length], transitionProgress);

      transitionProgress += transitionSpeed;
      if (transitionProgress >= 1) {
        transitionProgress = 0;
        colorIndex = (colorIndex + 1) % colors.length;
      }

      // Create a linear gradient across the canvas
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, currentColor);
      gradient.addColorStop(1, nextInterimColor); // Use nextInterimColor for a smoother, multi-stage gradient

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="animated-background"
    />
  );
}