"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
    const { t } = useLanguage();
    const ref = useRef<HTMLElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(true);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    // Detect mobile once on mount
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Mouse parallax — desktop only, throttled via rAF
    useEffect(() => {
        if (isMobile) return;
        let rafId: number;
        const handleMouseMove = (e: MouseEvent) => {
            cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                const mx = (e.clientX / window.innerWidth - 0.5) * 20;
                const my = (e.clientY / window.innerHeight - 0.5) * 20;
                setMousePosition({ x: mx, y: my });
            });
        };
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, [isMobile]);

    // Pre-compute particles (fewer on mobile via CSS)
    const particles = useMemo(() => {
        return Array.from({ length: 10 }, (_, i) => ({
            id: i,
            size: i < 3 ? 2 : 1,
            left: `${5 + (i * 37) % 90}%`,
            top: `${5 + (i * 53) % 90}%`,
            color: i % 3 === 0 ? 'rgba(15,61,46,0.5)' : 'rgba(230,236,233,0.15)',
            duration: `${3 + (i % 4)}s`,
            delay: `${(i * 0.5) % 3}s`,
            travel: 20 + (i % 3) * 10,
        }));
    }, []);

    return (
        <section
            ref={ref}
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
            {/* === Background layers — CSS animations only, no JS per frame === */}

            {/* Aurora sweep — CSS keyframe */}
            <div className="hero-aurora absolute inset-0 opacity-25 pointer-events-none will-change-transform" />

            {/* Gradient orbs — smaller on mobile, reduced blur */}
            <div
                className="hero-orb-1 absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full opacity-30 pointer-events-none will-change-transform"
                style={{
                    background: 'radial-gradient(circle, rgba(15,61,46,0.5), transparent 70%)',
                    filter: isMobile ? 'blur(80px)' : 'blur(120px)',
                    transform: isMobile ? 'translateZ(0)' : `translate3d(${mousePosition.x * 2}px, ${mousePosition.y * 2}px, 0)`,
                }}
            />
            <div
                className="hero-orb-2 absolute bottom-1/4 right-1/4 w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full opacity-25 pointer-events-none will-change-transform"
                style={{
                    background: 'radial-gradient(circle, rgba(15,61,46,0.4), transparent 70%)',
                    filter: isMobile ? 'blur(80px)' : 'blur(120px)',
                    transform: isMobile ? 'translateZ(0)' : `translate3d(${mousePosition.x * -1.5}px, ${mousePosition.y * -1.5}px, 0)`,
                }}
            />

            {/* Grid background — pure CSS, static */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div
                    className="w-full h-full [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(15,61,46,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(15,61,46,0.15) 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />
            </div>

            {/* Horizon glow — CSS animated */}
            <div
                className="hero-horizon absolute bottom-0 left-0 right-0 h-[200px] md:h-[300px] pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, rgba(15,61,46,0.12) 0%, transparent 100%)',
                }}
            />

            {/* Concentric rings — CSS animated, 3rd ring hidden on mobile */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="hero-ring absolute rounded-full w-[250px] h-[250px] border border-[rgba(15,61,46,0.06)]" style={{ animationDuration: '18s' }} />
                <div className="hero-ring-reverse absolute rounded-full w-[430px] h-[430px] border border-[rgba(15,61,46,0.05)]" style={{ animationDuration: '22s' }} />
                <div className="hero-ring absolute rounded-full w-[610px] h-[610px] border border-[rgba(15,61,46,0.04)] hidden sm:block" style={{ animationDuration: '26s' }} />
            </div>

            {/* Particles — CSS animated, reduced count, last 4 hidden on mobile */}
            {particles.map((p) => (
                <div
                    key={p.id}
                    className={`hero-particle absolute rounded-full pointer-events-none${p.id >= 6 ? ' hidden sm:block' : ''}`}
                    style={{
                        width: p.size,
                        height: p.size,
                        left: p.left,
                        top: p.top,
                        backgroundColor: p.color,
                        animationDuration: p.duration,
                        animationDelay: p.delay,
                        '--travel': `-${p.travel}px`,
                    } as React.CSSProperties}
                />
            ))}

            {/* === Content — Framer Motion only for entrance animations === */}
            <motion.div
                style={{ y, opacity }}
                className="relative z-10 px-4 text-center max-w-6xl mx-auto"
            >
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
                        <span className="absolute inset-0 blur-3xl opacity-30 text-brand">
                            {t("hero.title2")}
                        </span>
                    </motion.span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                >
                    <p className="text-secondary text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-light px-4">
                        {t("hero.subtitle")}
                    </p>
                </motion.div>

                {/* Scroll indicator — CSS animated */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="mt-16 flex flex-col items-center gap-4"
                >
                    <div className="hero-scroll-indicator w-6 h-10 border-2 border-brand/30 rounded-full flex items-start justify-center p-2">
                        <div className="hero-scroll-dot w-1.5 h-1.5 bg-brand rounded-full" />
                    </div>
                    <span className="hero-scroll-text text-xs text-secondary uppercase tracking-widest">
                        {t("hero.scroll")}
                    </span>
                </motion.div>
            </motion.div>

            {/* Corner decorations — static */}
            <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-brand/20 opacity-15" />
            <div className="absolute bottom-8 right-8 w-24 h-24 border-r-2 border-b-2 border-brand/20 opacity-15" />

            {/* Vignette — static */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(11,15,14,0.7) 100%)',
                }}
            />

            {/* Noise — static */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
                }}
            />
        </section>
    );
}
