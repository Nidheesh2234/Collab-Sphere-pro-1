import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BackgroundAnimations() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Animated Gradient Mesh */}
            <motion.div
                animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                }}
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, 
            rgba(0, 240, 181, 0.4) 0%, 
            rgba(0, 194, 240, 0.2) 25%, 
            transparent 50%)`,
                    backgroundSize: "150% 150%",
                }}
            />

            {/* Floating Particles */}
            {[...Array(20)].map((_, i) => (
                <Particle key={i} index={i} />
            ))}

            {/* Interactive Mouse Glow */}
            <motion.div
                className="absolute w-96 h-96 bg-primary/20 rounded-full blur-[100px]"
                animate={{
                    x: mousePosition.x - 192,
                    y: mousePosition.y - 192,
                }}
                transition={{
                    type: "spring",
                    damping: 30,
                    stiffness: 200,
                    mass: 0.5,
                }}
            />
        </div>
    );
}

function Particle({ index }: { index: number }) {
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const randomSize = Math.random() * 20 + 5;
    const randomDuration = Math.random() * 20 + 10;
    const randomDelay = Math.random() * 10;

    return (
        <motion.div
            className="absolute rounded-full bg-white/5"
            style={{
                width: randomSize,
                height: randomSize,
                left: `${randomX}%`,
                top: `${randomY}%`,
            }}
            animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0],
                opacity: [0, 0.5, 0],
                scale: [0, 1, 0],
            }}
            transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: randomDelay,
                ease: "easeInOut",
            }}
        />
    );
}
