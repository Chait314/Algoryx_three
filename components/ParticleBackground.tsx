"use client"
import { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
    theme: "dark" | "light"
}

const ParticleBackground = ({theme}: ParticleBackgroundProps) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas) return;

        const ctx = canvas.getContext("2d");
        if(!ctx) return;

        const container = canvas.parentElement;
        if(!container) return;

        let animationFrameId: number;

        const particles: {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
        }[] = [];

        const mouse = {
            x: -1000,
            y: -1000,
            radius: 150,
        };

    let width = 0;
    let height = 0;

    const particleColor = theme==='dark'?  "rgba(255, 0, 0, 0.8)"
        : "rgb(144, 0, 255)";

    const resize = () => {
        const rect = container.getBoundingClientRect();

        width = rect.width;
        height = rect.height;

        const dpr = Math.min(window.devicePixelRatio, 2);

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    window.addEventListener("resize", resize);

    const particleCount = Math.min(
        300, Math.floor((width*height)/10000)
    );

    for(let i=0; i < particleCount; i++){
        particles.push({
            x: Math.random()*width,
            y: Math.random()*height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2.5 + 1,
        });
    }

    const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect()
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
    }

    const handleMouseLeave = () => {
        mouse.x = -1000;
        mouse.y = -1000;
    }

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);


    const animate = () => {
        ctx.clearRect(0,0, width, height);
        particles.forEach((particle) => {
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;

            const distance = Math.sqrt(dx*dx + dy*dy);
            
            if(distance < mouse.radius) {
                const angle = Math.atan2(dy, dx);

                const force = (mouse.radius - distance)/mouse.radius;

                particle.vx -= Math.cos(angle)*force*0.8;
                particle.vy -= Math.sin(angle)*force*0.8;
            }
            particle.x += particle.vx;
            particle.y += particle.vy;

            particle.vx *= 0.995;
            particle.vy *= 0.995;

            particle.vx += (Math.random() - 0.5) * 0.01;
            particle.vy += (Math.random() - 0.5) * 0.01;


            if(particle.x < 0) particle.x = width;
            if(particle.x > width) particle.x = 0;

            if(particle.y < 0) particle.y = height;
            if(particle.y > height) particle.y = 0;

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );

        ctx.fillStyle = particleColor;
        ctx.fill();
        })

        animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", resize);

        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    }

    }, [theme])

    return (
        <canvas
        ref={canvasRef}
        className="absolute top-95 sm:top-145 justify-center z-50 inset-0 w-full h-full pointer-events-none"
    />
    )
}

export default ParticleBackground
