"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { HiMail } from "react-icons/hi";
import { IconType } from "react-icons";

interface SocialLink {
    name: string;
    url: string;
    Icon: IconType;
    color: string;
    hoverColor: string;
}

const socialLinks: SocialLink[] = [
    {
        name: "GitHub",
        url: "https://github.com/Diego-Carrasquilla",
        Icon: SiGithub,
        color: "#333333",
        hoverColor: "#6e5494"
    },
    {
        name: "LinkedIn",
        url: "https://linkedin.com/in/diego-carrasquilla-fullstackdeveloper",
        Icon: SiLinkedin,
        color: "#0A66C2",
        hoverColor: "#0077B5"
    },
    {
        name: "Email",
        url: "mailto:diegocarrasquilla54@gmail.com",
        Icon: HiMail,
        color: "#EA4335",
        hoverColor: "#FF6B6B"
    },
];

function MagneticButton({ children, link, ...props }: any) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const ref = useRef<HTMLAnchorElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
        setPosition({ x, y });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
    };

    return (
        <motion.a
            ref={ref}
            {...props}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            animate={{
                x: position.x,
                y: position.y,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
            className="relative block"
        >
            <motion.div
                animate={{
                    scale: isHovered ? 1.05 : 1,
                    y: isHovered ? -8 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative px-12 py-6 rounded-2xl backdrop-blur-xl border-2 overflow-hidden"
                style={{
                    background: isHovered
                        ? `linear-gradient(135deg, ${link.color}20, ${link.hoverColor}15, rgba(20,26,24,0.9))`
                        : 'linear-gradient(135deg, rgba(20,26,24,0.8), rgba(20,26,24,0.5))',
                    borderColor: isHovered ? link.color : '#1E2623',
                    boxShadow: isHovered
                        ? `0 25px 50px ${link.color}60, 0 0 40px ${link.color}30, inset 0 1px 0 rgba(255,255,255,0.1)`
                        : '0 4px 20px rgba(0,0,0,0.3)',
                }}
            >
                {/* Animated shine sweep */}
                {isHovered && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                        initial={{ x: '-100%' }}
                        animate={{ x: '200%' }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        style={{ opacity: 0.1 }}
                    />
                )}

                {/* Content */}
                <span className="flex items-center gap-4 text-lg relative z-10">
                    <motion.span
                        animate={{
                            scale: isHovered ? 1.2 : 1,
                            rotate: isHovered ? 15 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        style={{
                            color: isHovered ? link.hoverColor : link.color,
                            filter: isHovered ? `drop-shadow(0 0 12px ${link.color}80)` : 'none',
                        }}
                    >
                        <link.Icon size={32} />
                    </motion.span>
                    <motion.span
                        className="font-bold"
                        animate={{
                            color: isHovered ? link.hoverColor : '#E6ECE9',
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        {link.name}
                    </motion.span>
                </span>

                {/* Pulsing ring on hover */}
                {isHovered && (
                    <motion.div
                        className="absolute inset-0 rounded-2xl"
                        style={{ border: `2px solid ${link.color}` }}
                        initial={{ scale: 1, opacity: 0.8 }}
                        animate={{ scale: 1.05, opacity: 0 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "easeOut" }}
                    />
                )}
            </motion.div>

            {children}
        </motion.a>
    );
}

export default function Contact() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
            {/* Animated background orbs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[100px]"
                style={{ background: 'radial-gradient(circle, rgba(15,61,46,0.3), transparent 70%)' }}
            />

            <div className="max-w-5xl mx-auto text-center relative z-10">
                {/* Decorative top line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="h-1 w-24 bg-brand mx-auto mb-12 rounded-full"
                />

                <motion.h2
                    className="text-6xl md:text-8xl font-black mb-8 leading-tight"
                >
                    {t("contact.title").split(" ").map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                            transition={{
                                duration: 0.8,
                                delay: i * 0.1,
                                ease: [0.6, 0.05, 0.01, 0.9]
                            }}
                            className={i === 0 ? "text-primary" : "text-brand block"}
                        >
                            {word}{" "}
                        </motion.span>
                    ))}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="text-secondary text-xl md:text-2xl mb-16 max-w-2xl mx-auto font-light"
                >
                    {t("contact.subtitle")}
                </motion.p>

                {/* Social links with magnetic effect */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20"
                >
                    {socialLinks.map((link, index) => (
                        <motion.div
                            key={link.name}
                            initial={{ opacity: 0, scale: 0.5, y: 50 }}
                            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.7,
                                delay: 0.8 + index * 0.15,
                                type: "spring",
                                stiffness: 100,
                            }}
                        >
                            <MagneticButton
                                link={link}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer text with fade in */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="text-sm text-secondary/70 font-light tracking-wide"
                >
                    {t("contact.footer")}
                </motion.div>

                {/* Decorative corner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 0.05, scale: 1 } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="absolute bottom-20 right-20 w-32 h-32 border-r-2 border-b-2 border-brand"
                />
            </div>
        </section>
    );
}

