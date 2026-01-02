"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface Project {
    id: number;
    titleKey: string;
    descKey: string;
    detailsKey: string;
    tags: string[];
    color: string;
    url?: string;
    image?: string;
}

const projects: Project[] = [
    {
        id: 1,
        titleKey: "projects.1.title",
        descKey: "projects.1.desc",
        detailsKey: "projects.1.details",
        tags: [".NET Framework", "REST APIs", "XAML", "Git"],
        color: "from-green-500/10 to-emerald-500/10",
    },
    {
        id: 2,
        titleKey: "projects.2.title",
        descKey: "projects.2.desc",
        detailsKey: "projects.2.details",
        tags: ["N8N", "Java Backend", "C# Core", "Voice AI"],
        color: "from-emerald-500/10 to-teal-500/10",
    },
    {
        id: 3,
        titleKey: "projects.3.title",
        descKey: "projects.3.desc",
        detailsKey: "projects.3.details",
        tags: ["Astro", "WhatsApp Bot", "Google Calendar"],
        color: "from-green-500/10 to-green-600/10",
        url: "https://www.alisadosvanessabaquero.com",
    },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const { t } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setMousePosition({ x, y });
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 100, rotateX: 45 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.6, 0.05, 0.01, 0.9]
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            onClick={() => project.url && window.open(project.url, "_blank")}
            className="relative group perspective-1000"
            style={{ zIndex: isHovered ? 50 : 1 }}
        >
            <motion.div
                animate={{
                    scale: isHovered ? 1.08 : 1,
                    rotateX: isHovered ? mousePosition.y * 0.005 : 0,
                    rotateY: isHovered ? mousePosition.x * 0.005 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
                className={`relative p-8 rounded-2xl backdrop-blur-sm overflow-hidden transition-all duration-300 bg-surface ${project.url ? 'cursor-pointer' : ''}`}
                style={{
                    border: `1px solid ${isHovered ? '#0F3D2E' : '#1E2623'}`,
                    boxShadow: isHovered
                        ? '0 40px 100px rgba(15,61,46,0.6), inset 0 1px 0 rgba(255,255,255,0.08)'
                        : '0 4px 20px rgba(0,0,0,0.2)',
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Spotlight effect following mouse */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(600px circle at ${mousePosition.x + 250}px ${mousePosition.y + 250}px, rgba(15,61,46,0.15), transparent 40%)`,
                    }}
                />

                {/* Animated border glow */}
                <motion.div
                    animate={{
                        opacity: isHovered ? 0.3 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 rounded-2xl blur-2xl"
                    style={{ background: 'linear-gradient(135deg, rgba(15,61,46,0.6), rgba(20,90,67,0.4))' }}
                />

                {/* Content */}
                <div className="relative z-10" style={{ transform: 'translateZ(50px)' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.15 + 0.3 }}
                    >
                        <h3 className="text-2xl md:text-3xl font-black mb-4 text-primary tracking-tight">
                            {t(project.titleKey)}
                        </h3>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: index * 0.15 + 0.4 }}
                        className="text-lg mb-4 text-secondary leading-relaxed"
                    >
                        {t(project.descKey)}
                    </motion.p>

                    {/* Expanded details - Netflix style */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: isHovered ? 'auto' : 0,
                            opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 pb-4 border-t border-brand/20 mt-4">
                            <p className="text-sm text-secondary/90 leading-relaxed mb-4">
                                {t(project.detailsKey)}
                            </p>

                            {/* Preview image for projects with URL */}
                            {project.url && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                    className="relative rounded-xl overflow-hidden border-2 border-brand/40 shadow-2xl"
                                >
                                    <div className="relative aspect-video bg-gradient-to-br from-brand/20 to-surface/90 backdrop-blur-sm flex items-center justify-center">
                                        <div className="text-center px-6">
                                            <div className="text-4xl mb-3">🌐</div>
                                            <p className="text-sm text-accent font-semibold mb-2">Vista en vivo disponible</p>
                                            <p className="text-xs text-secondary/70">{project.url}</p>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-surface/95 via-transparent to-transparent" />
                                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-brand/30 backdrop-blur-sm border border-brand/50">
                                            <span className="text-xs font-bold text-accent">Live</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex flex-wrap gap-2 mt-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: index * 0.15 + 0.5 }}
                    >
                        {project.tags.map((tag, i) => (
                            <motion.span
                                key={i}
                                whileHover={{ scale: 1.1, y: -2 }}
                                className="px-4 py-2 text-sm rounded-full font-semibold transition-all duration-300 bg-brand/10 border border-brand/30 text-accent backdrop-blur-sm"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>

                {/* Arrow indicator with smooth animation - only if has URL */}
                {project.url && (
                    <motion.div
                        animate={{
                            x: isHovered ? 8 : 0,
                            y: isHovered ? -8 : 0,
                            opacity: isHovered ? 1 : 0.3,
                            rotate: isHovered ? 45 : 0,
                        }}
                        transition={{ duration: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
                        className="absolute top-8 right-8 w-8 h-8 flex items-center justify-center"
                        style={{ color: isHovered ? '#0F3D2E' : '#BFC8C2' }}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M7 17L17 7M17 7H7M17 7V17"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.div>
                )}

                {/* Decorative corner accent */}
                <motion.div
                    className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-brand/20 rounded-bl-2xl"
                    animate={{
                        opacity: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                />
            </motion.div>
        </motion.div>
    );
}

export default function Projects() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="min-h-screen py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-12 md:mb-16 text-center"
                >
                    <span className="text-primary">{t("projects.featured")} </span>
                    <span className="text-brand">{t("projects.destacados")}</span>
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
