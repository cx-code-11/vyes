import React, { useRef, useState, useEffect, useImperativeHandle, forwardRef } from 'react';

export const SignatureCanvas = forwardRef(({ className, canvasProps, backgroundColor = '#ffffff', onBegin, onEnd }, ref) => {
  const canvasRef = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const isDrawingRef = useRef(false);
  const strokesRef = useRef([]); // Stores array of strokes (each stroke is an array of points {x, y})
  const currentStrokeRef = useRef([]); // Stores current stroke points

  // Helper to get local pointer coordinates relative to canvas bounding box in CSS pixels
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    if (clientX === undefined || clientY === undefined) return null;
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  // Redraw all strokes on the canvas
  const redraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear and draw background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Save context and apply devicePixelRatio scale
    ctx.save();
    const dpr = window.devicePixelRatio || 1;
    ctx.scale(dpr, dpr);

    // Line style configurations
    ctx.strokeStyle = '#0f172a'; // nice slate-900 color for signature line
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Draw completed strokes
    strokesRef.current.forEach(stroke => {
      if (stroke.length < 1) return;
      ctx.beginPath();
      ctx.moveTo(stroke[0].x, stroke[0].y);
      for (let i = 1; i < stroke.length; i++) {
        ctx.lineTo(stroke[i].x, stroke[i].y);
      }
      ctx.stroke();
    });

    // Draw active stroke
    if (isDrawingRef.current && currentStrokeRef.current.length > 0) {
      ctx.beginPath();
      ctx.moveTo(currentStrokeRef.current[0].x, currentStrokeRef.current[0].y);
      for (let i = 1; i < currentStrokeRef.current.length; i++) {
        ctx.lineTo(currentStrokeRef.current[i].x, currentStrokeRef.current[i].y);
      }
      ctx.stroke();
    }

    ctx.restore();
  };

  // Resize helper: matches canvas drawing buffer to bounding client size * devicePixelRatio
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Set internal drawing buffer size
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Redraw existing strokes
    redraw();
  };

  useEffect(() => {
    // Perform initial sizing
    handleResize();

    // Handle window resizes
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Expose API to parent ref
  useImperativeHandle(ref, () => ({
    clear: () => {
      strokesRef.current = [];
      currentStrokeRef.current = [];
      setIsEmpty(true);
      redraw();
    },
    isEmpty: () => isEmpty,
    getCanvas: () => canvasRef.current,
  }), [isEmpty, backgroundColor]);

  const startDrawing = (e) => {
    // Prevent scrolling and gestures on touch devices
    e.preventDefault();
    const coords = getCoordinates(e);
    if (!coords) return;

    isDrawingRef.current = true;
    currentStrokeRef.current = [coords];

    setIsEmpty(false);
    if (onBegin) onBegin();

    redraw();
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    
    const coords = getCoordinates(e);
    if (!coords) return;

    currentStrokeRef.current.push(coords);

    redraw();
  };

  const stopDrawing = (e) => {
    if (!isDrawingRef.current) return;
    e.preventDefault();
    isDrawingRef.current = false;
    if (currentStrokeRef.current.length > 0) {
      strokesRef.current.push(currentStrokeRef.current);
      currentStrokeRef.current = [];
    }
    if (onEnd) onEnd();
  };

  // Merge classes for compatibility with react-signature-canvas signature components
  const mergedClassName = className || (canvasProps && canvasProps.className);

  return (
    <canvas
      ref={canvasRef}
      className={mergedClassName}
      style={{ touchAction: 'none', display: 'block', width: '100%', height: '100%' }}
      onPointerDown={startDrawing}
      onPointerMove={draw}
      onPointerUp={stopDrawing}
      onPointerLeave={stopDrawing}
      onPointerCancel={stopDrawing}
    />
  );
});

export default SignatureCanvas;
