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
            {/* Aurora gradient sweep */}
            <motion.div
                className="absolute inset-0 opacity-25 pointer-events-none"
                animate={{
                    background: [
                        'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(15,61,46,0.6), transparent 60%)',
                        'radial-gradient(ellipse 80% 50% at 80% 60%, rgba(15,61,46,0.5), transparent 60%)',
                        'radial-gradient(ellipse 80% 50% at 50% 30%, rgba(15,80,55,0.6), transparent 60%)',
                        'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(15,61,46,0.6), transparent 60%)',
                    ],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Secondary aurora — offset timing for depth */}
            <motion.div
                className="absolute inset-0 opacity-15 pointer-events-none"
                animate={{
                    background: [
                        'radial-gradient(ellipse 60% 40% at 70% 60%, rgba(15,80,55,0.5), transparent 55%)',
                        'radial-gradient(ellipse 60% 40% at 30% 40%, rgba(15,61,46,0.4), transparent 55%)',
                        'radial-gradient(ellipse 60% 40% at 60% 70%, rgba(15,80,55,0.5), transparent 55%)',
                        'radial-gradient(ellipse 60% 40% at 70% 60%, rgba(15,80,55,0.5), transparent 55%)',
                    ],
                }}
                transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            />

            {/* Animated gradient orbs */}
            <motion.div
                style={{
                    x: mousePosition.x * 2,
                    y: mousePosition.y * 2,
                    background: 'radial-gradient(circle, rgba(15,61,46,0.5), transparent 70%)',
                }}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-35"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.45, 0.3],
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
                    background: 'radial-gradient(circle, rgba(15,61,46,0.4), transparent 70%)',
                }}
                className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full blur-[120px] opacity-30"
                animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.35, 0.2, 0.35],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Third orb - subtle accent */}
            <motion.div
                style={{
                    x: mousePosition.x * 1,
                    y: mousePosition.y * -1,
                    background: 'radial-gradient(circle, rgba(15,80,55,0.35), transparent 70%)',
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[150px] opacity-20"
                animate={{
                    scale: [1, 1.15, 0.95, 1],
                    rotate: [0, 90, 180, 270, 360],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            {/* Diagonal light beam */}
            <motion.div
                className="absolute inset-0 pointer-events-none overflow-hidden"
                style={{ opacity: 0.04 }}
            >
                <motion.div
                    className="absolute w-[200%] h-[1px]"
                    style={{
                        top: '40%',
                        left: '-50%',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(15,80,55,0.8) 30%, rgba(230,236,233,0.3) 50%, rgba(15,80,55,0.8) 70%, transparent 100%)',
                        transform: 'rotate(-15deg)',
                        transformOrigin: 'center',
                    }}
                    animate={{
                        opacity: [0.3, 1, 0.3],
                        x: ['-10%', '10%', '-10%'],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute w-[200%] h-[1px]"
                    style={{
                        top: '65%',
                        left: '-50%',
                        background: 'linear-gradient(90deg, transparent 0%, rgba(15,61,46,0.6) 35%, rgba(230,236,233,0.2) 50%, rgba(15,61,46,0.6) 65%, transparent 100%)',
                        transform: 'rotate(-15deg)',
                        transformOrigin: 'center',
                    }}
                    animate={{
                        opacity: [0.2, 0.8, 0.2],
                        x: ['5%', '-5%', '5%'],
                    }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
                />
            </motion.div>

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

            {/* Horizon glow */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[300px] pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, rgba(15,61,46,0.12) 0%, transparent 100%)',
                }}
                animate={{
                    opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Animated concentric rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={`ring-${i}`}
                        className="absolute rounded-full"
                        style={{
                            width: `${250 + i * 180}px`,
                            height: `${250 + i * 180}px`,
                            border: `1px solid rgba(15,61,46,${0.06 - i * 0.01})`,
                        }}
                        animate={{
                            scale: [1, 1.06, 1],
                            opacity: [0.1, 0.2, 0.1],
                            rotate: i % 2 === 0 ? [0, 360] : [360, 0],
                        }}
                        transition={{
                            duration: 18 + i * 4,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                ))}
            </div>

            {/* Floating geometric shapes */}
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={`geo-${i}`}
                    className="absolute pointer-events-none"
                    style={{
                        left: `${10 + (i * 43) % 80}%`,
                        top: `${15 + (i * 31) % 70}%`,
                        width: 6 + (i % 3) * 4,
                        height: 6 + (i % 3) * 4,
                        border: '1px solid rgba(15,61,46,0.15)',
                        borderRadius: i % 2 === 0 ? '2px' : '50%',
                        transform: `rotate(${i * 15}deg)`,
                    }}
                    animate={{
                        rotate: [i * 15, i * 15 + 360],
                        opacity: [0.1, 0.3, 0.1],
                        y: [0, -(10 + i * 3), 0],
                    }}
                    transition={{
                        rotate: { duration: 20 + i * 5, repeat: Infinity, ease: 'linear' },
                        opacity: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
                        y: { duration: 5 + i * 2, repeat: Infinity, ease: 'easeInOut' },
                    }}
                />
            ))}

            {/* Floating particles - mixed sizes */}
            {[...Array(25)].map((_, i) => {
                const size = i < 8 ? 2 : i < 18 ? 1 : 3;
                return (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: size,
                            height: size,
                            left: `${5 + (i * 37) % 90}%`,
                            top: `${5 + (i * 53) % 90}%`,
                            backgroundColor: i % 3 === 0 ? 'rgba(15,61,46,0.6)' : 'rgba(230,236,233,0.2)',
                        }}
                        animate={{
                            y: [0, -(20 + (i % 4) * 10), 0],
                            x: [0, (i % 2 === 0 ? 8 : -8), 0],
                            opacity: [0, 0.8, 0],
                        }}
                        transition={{
                            duration: 3 + (i % 5),
                            repeat: Infinity,
                            delay: (i * 0.4) % 4,
                            ease: "easeInOut",
                        }}
                    />
                );
            })}

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
                    className="text-5xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black mb-6 leading-[0.9] tracking-tight"
                >
                    {/* Name */}
                    <motion.span
                        className="block text-accent text-sm sm:text-base md:text-xl lg:text-2xl font-light tracking-[0.3em] uppercase mb-2 md:mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.6, 0.05, 0.01, 0.9] }}
                    >
                        {t("hero.name")}
                    </motion.span>

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
                    <p className="text-secondary text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-light px-4">
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
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-brand/20"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-brand/20"
            />

            {/* Vignette overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(11,15,14,0.7) 100%)',
                }}
            />

            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
                }}
            />
        </section>
    );
}
