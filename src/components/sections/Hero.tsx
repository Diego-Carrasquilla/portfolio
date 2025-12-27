"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
    const { t } = useLanguage();
    const ref = useRef<HTMLElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            setMousePosition({ x, y });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section
            ref={ref}
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated gradient orbs */}
            <motion.div
                style={{
                    x: mousePosition.x * 2,
                    y: mousePosition.y * 2,
                    background: 'radial-gradient(circle, rgba(15,61,46,0.4), transparent 70%)',
                }}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />


            <motion.div
                style={{
                    x: mousePosition.x * -1.5,
                    y: mousePosition.y * -1.5,
                    background: 'radial-gradient(circle, rgba(15,61,46,0.3), transparent 70%)',
                }}
                className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.3, 0.2, 0.3],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Dynamic grid background */}
            <motion.div
                style={{ scale }}
                className="absolute inset-0 bg-[size:80px_80px] opacity-20"
            >
                <div
                    className="w-full h-full [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(15,61,46,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(15,61,46,0.15) 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />
            </motion.div>

            {/* Floating particles */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-brand/30"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        ease: "easeInOut",
                    }}
                />
            ))}

            {/* Main content */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 px-4 text-center max-w-6xl mx-auto"
            >
                {/* Decorative line top */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="h-px w-32 mx-auto mb-8 bg-gradient-to-r from-transparent via-brand to-transparent"
                />

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9], delay: 0.2 }}
                    className="text-7xl md:text-8xl lg:text-[10rem] font-black mb-6 leading-[0.9] tracking-tight"
                >
                    <motion.span
                        className="block text-primary"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
                    >
                        {t("hero.title1")}
                    </motion.span>
                    <motion.span
                        className="block text-brand relative"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
                    >
                        {t("hero.title2")}
                        {/* Glow effect */}
                        <span className="absolute inset-0 blur-3xl opacity-30 text-brand">
                            {t("hero.title2")}
                        </span>
                    </motion.span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="relative"
                >
                    <p className="text-secondary text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light">
                        {t("hero.subtitle")}
                    </p>
                </motion.div>

                {/* CTA or scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-16 flex flex-col items-center gap-4"
                >
                    {/* Animated scroll indicator */}
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="w-6 h-10 border-2 border-brand/30 rounded-full flex items-start justify-center p-2"
                    >
                        <motion.div
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="w-1.5 h-1.5 bg-brand rounded-full"
                        />
                    </motion.div>

                    <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="text-xs text-secondary uppercase tracking-widest"
                    >
                        {t("hero.scroll")}
                    </motion.span>
                </motion.div>
            </motion.div>

            {/* Corner decorations */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-brand/20"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-brand/20"
            />

            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
                }}
            />
        </section>
    );
}
