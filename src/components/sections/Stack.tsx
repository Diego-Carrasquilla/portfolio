"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
    SiFlutter,
    SiNodedotjs,
    SiPostgresql,
    SiMysql,
    SiRedis,
    SiDocker,
    SiWhatsapp,
    SiGit,
    SiLinux,
    SiGooglecalendar,
    SiTypescript,
    SiN8N,
    SiFastapi,
} from "react-icons/si";
import { IconType } from "react-icons";

interface Tech {
    name: string;
    Icon: IconType;
    color: string;
    hoverColor: string;
}

const technologies: Tech[] = [
    {
        name: "Flutter",
        Icon: SiFlutter,
        color: "#02569B",
        hoverColor: "#0468D7"
    },
    {
        name: "Node.js",
        Icon: SiNodedotjs,
        color: "#339933",
        hoverColor: "#68BB59"
    },
    {
        name: "PostgreSQL",
        Icon: SiPostgresql,
        color: "#336791",
        hoverColor: "#4A93C8"
    },
    {
        name: "MySQL",
        Icon: SiMysql,
        color: "#4479A1",
        hoverColor: "#5A9CD6"
    },
    {
        name: "Redis",
        Icon: SiRedis,
        color: "#DC382D",
        hoverColor: "#FF4438"
    },
    {
        name: "Docker",
        Icon: SiDocker,
        color: "#2496ED",
        hoverColor: "#4DB0FF"
    },
    {
        name: "WhatsApp",
        Icon: SiWhatsapp,
        color: "#25D366",
        hoverColor: "#3FE87E"
    },
    {
        name: "Git",
        Icon: SiGit,
        color: "#F05032",
        hoverColor: "#F77052"
    },
    {
        name: "Linux",
        Icon: SiLinux,
        color: "#FCC624",
        hoverColor: "#FFD84D"
    },
    {
        name: "Calendar API",
        Icon: SiGooglecalendar,
        color: "#4285F4",
        hoverColor: "#6BA5FF"
    },
    {
        name: "TypeScript",
        Icon: SiTypescript,
        color: "#3178C6",
        hoverColor: "#5199E8"
    },
    {
        name: "N8N",
        Icon: SiN8N,
        color: "#EA4B71",
        hoverColor: "#FF6B8F"
    },
];

function TechItem({ tech, index }: { tech: Tech; index: number }) {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0, rotateY: -180 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{
                duration: 0.8,
                delay: index * 0.05,
                ease: [0.34, 1.56, 0.64, 1],
                type: "spring",
                stiffness: 100,
            }}
            whileHover={{
                scale: 1.1,
                y: -10,
                zIndex: 50,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative z-0"
            style={{ transformStyle: 'preserve-3d' }}
        >
            <motion.div
                className="relative flex flex-col items-center justify-center w-40 h-40 rounded-3xl transition-all duration-500 backdrop-blur-md overflow-hidden"
                animate={{
                    background: isHovered
                        ? `linear-gradient(135deg, ${tech.color}15, ${tech.hoverColor}10)`
                        : 'linear-gradient(135deg, rgba(20,26,24,0.8), rgba(20,26,24,0.5))',
                    borderColor: isHovered ? tech.color : '#1E2623',
                    boxShadow: isHovered
                        ? `0 25px 60px ${tech.color}40, 0 0 0 2px ${tech.color}30, inset 0 1px 0 rgba(255,255,255,0.1)`
                        : '0 8px 20px rgba(0,0,0,0.3)',
                }}
                style={{
                    transformStyle: 'preserve-3d',
                    border: '2px solid',
                }}
            >
                {/* Animated gradient background */}
                <motion.div
                    className="absolute inset-0"
                    animate={{
                        opacity: isHovered ? 0.15 : 0,
                        scale: isHovered ? 1.5 : 0.5,
                    }}
                    transition={{ duration: 0.5 }}
                    style={{
                        background: `radial-gradient(circle at 50% 50%, ${tech.hoverColor}, transparent 70%)`,
                    }}
                />

                {/* Rotating ring */}
                <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                        border: `2px solid ${tech.color}`,
                        opacity: 0,
                    }}
                    animate={{
                        scale: isHovered ? [1, 1.15, 1.3] : 1,
                        opacity: isHovered ? [0.8, 0.4, 0] : 0,
                        rotate: isHovered ? [0, 180, 360] : 0,
                    }}
                    transition={{
                        duration: 2,
                        repeat: isHovered ? Infinity : 0,
                        ease: "linear",
                    }}
                />

                {/* Logo Icon */}
                <motion.div
                    className="relative z-10 mb-3"
                    animate={{
                        scale: isHovered ? 1.2 : 1,
                        color: isHovered ? tech.hoverColor : tech.color,
                    }}
                    transition={{
                        duration: isHovered ? 0.6 : 0.3,
                        scale: { type: "spring", stiffness: 300 },
                    }}
                    style={{
                        transform: 'translateZ(40px)',
                        filter: isHovered ? `drop-shadow(0 0 20px ${tech.color}80)` : 'none',
                    }}
                >
                    <tech.Icon size={56} />
                </motion.div>

                {/* Tech Name */}
                <motion.span
                    className="relative z-10 text-base font-bold tracking-wide"
                    animate={{
                        color: isHovered ? tech.hoverColor : '#E6ECE9',
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                        transform: 'translateZ(30px)',
                        textShadow: isHovered ? `0 0 20px ${tech.color}60` : 'none',
                    }}
                >
                    {tech.name}
                </motion.span>

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `
                            linear-gradient(${tech.color}30 1px, transparent 1px),
                            linear-gradient(90deg, ${tech.color}30 1px, transparent 1px)
                        `,
                        backgroundSize: '20px 20px',
                    }}
                />

                {/* Shine effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent"
                    animate={{
                        x: isHovered ? ['-200%', '200%'] : '-200%',
                        opacity: isHovered ? [0, 0.2, 0] : 0,
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: isHovered ? Infinity : 0,
                        repeatDelay: 0.5,
                    }}
                />
            </motion.div>

            {/* Glow layers */}
            <motion.div
                animate={{
                    opacity: isHovered ? 0.8 : 0,
                    scale: isHovered ? 1.3 : 0.9,
                }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 rounded-3xl blur-2xl -z-10"
                style={{
                    background: `radial-gradient(circle, ${tech.color}60, ${tech.hoverColor}30, transparent)`
                }}
            />
            <motion.div
                animate={{
                    opacity: isHovered ? 0.6 : 0,
                    scale: isHovered ? 1.5 : 0.8,
                }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="absolute inset-0 rounded-3xl blur-3xl -z-20"
                style={{
                    background: `radial-gradient(circle, ${tech.hoverColor}40, transparent)`
                }}
            />
        </motion.div>
    );
}

export default function Stack() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative min-h-screen py-20 px-4 z-10">
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="text-5xl md:text-7xl font-bold mb-8 text-center"
                >
                    <span className="text-primary">{t("stack.tech")} </span>
                    <span className="text-brand">{t("stack.stack")}</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="text-secondary text-xl text-center mb-16 max-w-2xl mx-auto"
                >
                    {t("stack.subtitle")}
                </motion.p>

                <div className="relative flex flex-wrap justify-center gap-8 perspective-1000 z-10">
                    {technologies.map((tech, index) => (
                        <TechItem key={tech.name} tech={tech} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
