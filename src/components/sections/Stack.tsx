"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
    SiFlutter,
    SiNodedotjs,
    SiPostgresql,
    SiMysql,
    SiRedis,
    SiDocker,
    SiGit,
    SiTypescript,
    SiN8N,
    SiFastapi,
    SiPython,
    SiDotnet,
    SiTwilio,
    SiReact,
    SiJavascript,
    SiStrapi,
    SiHtml5,
    SiCss3,
    SiTailwindcss,
} from "react-icons/si";
import { IconType } from "react-icons";

interface Tech {
    name: string;
    Icon: IconType;
    color: string;
    hoverColor: string;
    descEs: string;
    descEn: string;
}

type CategoryKey = "frontend" | "backend" | "tools";

interface TechCategory {
    key: CategoryKey;
    techs: Tech[];
}

const categories: TechCategory[] = [
    {
        key: "frontend",
        techs: [
            {
                name: "React",
                Icon: SiReact,
                color: "#61DAFB",
                hoverColor: "#80E5FF",
                descEs: "SPAs, dashboards y componentes reutilizables con hooks.",
                descEn: "SPAs, dashboards and reusable components with hooks.",
            },
            {
                name: "Flutter",
                Icon: SiFlutter,
                color: "#02569B",
                hoverColor: "#0468D7",
                descEs: "Apps multiplataforma con widgets custom y estado centralizado.",
                descEn: "Cross-platform apps with custom widgets and centralized state.",
            },
            {
                name: "JavaScript",
                Icon: SiJavascript,
                color: "#F7DF1E",
                hoverColor: "#FFE952",
                descEs: "Lógica de negocio, consumo de APIs y manipulación del DOM.",
                descEn: "Business logic, API consumption and DOM manipulation.",
            },
            {
                name: "TypeScript",
                Icon: SiTypescript,
                color: "#3178C6",
                hoverColor: "#5199E8",
                descEs: "Tipado estricto, interfaces y código estable al escalar.",
                descEn: "Strict typing, interfaces and code that stays stable at scale.",
            },
            {
                name: "HTML",
                Icon: SiHtml5,
                color: "#E34F26",
                hoverColor: "#FF6B47",
                descEs: "Markup semántico, accesible y optimizado para SEO.",
                descEn: "Semantic, accessible markup optimized for SEO.",
            },
            {
                name: "CSS",
                Icon: SiCss3,
                color: "#1572B6",
                hoverColor: "#2B9FD9",
                descEs: "Layouts responsivos, Grid, Flexbox y animaciones fluidas.",
                descEn: "Responsive layouts, Grid, Flexbox and fluid animations.",
            },
            {
                name: "Tailwind",
                Icon: SiTailwindcss,
                color: "#06B6D4",
                hoverColor: "#22D3EE",
                descEs: "Prototipado rápido, diseño consistente y temas custom.",
                descEn: "Rapid prototyping, consistent design and custom themes.",
            },
        ],
    },
    {
        key: "backend",
        techs: [
            {
                name: "Node.js",
                Icon: SiNodedotjs,
                color: "#339933",
                hoverColor: "#68BB59",
                descEs: "APIs REST, microservicios y webhooks con procesamiento en tiempo real.",
                descEn: "REST APIs, microservices and webhooks with real-time processing.",
            },
            {
                name: "Python",
                Icon: SiPython,
                color: "#3776AB",
                hoverColor: "#4B8BBF",
                descEs: "Scripts, endpoints de alto rendimiento y pipelines de datos.",
                descEn: "Scripts, high-performance endpoints and data pipelines.",
            },
            {
                name: ".NET",
                Icon: SiDotnet,
                color: "#512BD4",
                hoverColor: "#7C4DFF",
                descEs: "Backends enterprise en C# y APIs corporativas.",
                descEn: "Enterprise C# backends and corporate APIs.",
            },
            {
                name: "FastAPI",
                Icon: SiFastapi,
                color: "#009688",
                hoverColor: "#26A69A",
                descEs: "APIs rápidas con validación automática y docs OpenAPI.",
                descEn: "Fast APIs with auto validation and OpenAPI docs.",
            },
            {
                name: "Strapi",
                Icon: SiStrapi,
                color: "#4945FF",
                hoverColor: "#7B79FF",
                descEs: "CMS headless, paneles admin y contenido dinámico.",
                descEn: "Headless CMS, admin panels and dynamic content.",
            },
            {
                name: "PostgreSQL",
                Icon: SiPostgresql,
                color: "#336791",
                hoverColor: "#4A93C8",
                descEs: "Esquemas relacionales, queries complejas y tuning en producción.",
                descEn: "Relational schemas, complex queries and production tuning.",
            },
            {
                name: "MySQL",
                Icon: SiMysql,
                color: "#4479A1",
                hoverColor: "#5A9CD6",
                descEs: "Stored procedures, migraciones y gestión en producción.",
                descEn: "Stored procedures, migrations and production management.",
            },
            {
                name: "Redis",
                Icon: SiRedis,
                color: "#DC382D",
                hoverColor: "#FF4438",
                descEs: "Caché, sesiones, colas de mensajes y datos en tiempo real.",
                descEn: "Caching, sessions, message queues and real-time data.",
            },
        ],
    },
    {
        key: "tools",
        techs: [
            {
                name: "Git",
                Icon: SiGit,
                color: "#F05032",
                hoverColor: "#F77052",
                descEs: "Branching, code reviews, PRs y colaboración en equipo.",
                descEn: "Branching, code reviews, PRs and team collaboration.",
            },
            {
                name: "Docker",
                Icon: SiDocker,
                color: "#2496ED",
                hoverColor: "#4DB0FF",
                descEs: "Contenedores, docker-compose y entornos reproducibles.",
                descEn: "Containers, docker-compose and reproducible environments.",
            },
            {
                name: "N8N",
                Icon: SiN8N,
                color: "#EA4B71",
                hoverColor: "#FF6B8F",
                descEs: "Flujos automatizados, agentes IA e integraciones.",
                descEn: "Automated workflows, AI agents and integrations.",
            },
            {
                name: "Twilio",
                Icon: SiTwilio,
                color: "#F22F46",
                hoverColor: "#FF5C6F",
                descEs: "SMS, WhatsApp y llamadas en flujos automatizados.",
                descEn: "SMS, WhatsApp and calls in automated workflows.",
            },
        ],
    },
];

const categoryLabels: Record<CategoryKey, { es: string; en: string }> = {
    frontend: { es: "Frontend", en: "Frontend" },
    backend: { es: "Backend & Datos", en: "Backend & Data" },
    tools: { es: "Herramientas & Utils", en: "Tools & Utils" },
};

function TechItem({ tech, index }: { tech: Tech; index: number }) {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const flipBackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const { language } = useLanguage();

    const handleMouseEnter = useCallback(() => {
        if (flipBackTimer.current) {
            clearTimeout(flipBackTimer.current);
            flipBackTimer.current = null;
        }
        setIsHovered(true);
        setIsFlipped(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        flipBackTimer.current = setTimeout(() => {
            setIsFlipped(false);
            flipBackTimer.current = null;
        }, 800);
    }, []);

    useEffect(() => {
        return () => {
            if (flipBackTimer.current) clearTimeout(flipBackTimer.current);
        };
    }, []);

    const handleTap = useCallback(() => {
        setIsFlipped((prev) => !prev);
    }, []);

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
                scale: 1.08,
                y: -8,
                zIndex: 50,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTap}
            className="group relative z-0 cursor-pointer"
            style={{ perspective: "800px" }}
        >
            {/* Card wrapper that flips */}
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-[130px] h-[130px] sm:w-[150px] sm:h-[150px] md:w-[160px] md:h-[160px]"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* ===== FRONT FACE ===== */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl backdrop-blur-md overflow-hidden"
                    animate={{
                        background: isHovered && !isFlipped
                            ? `linear-gradient(135deg, ${tech.color}15, ${tech.hoverColor}10)`
                            : "linear-gradient(135deg, rgba(20,26,24,0.8), rgba(20,26,24,0.5))",
                        borderColor: isHovered && !isFlipped ? tech.color : "#1E2623",
                        boxShadow: isHovered && !isFlipped
                            ? `0 25px 60px ${tech.color}40, 0 0 0 2px ${tech.color}30, inset 0 1px 0 rgba(255,255,255,0.1)`
                            : "0 8px 20px rgba(0,0,0,0.3)",
                    }}
                    style={{
                        backfaceVisibility: "hidden",
                        border: "2px solid",
                    }}
                >
                    {/* Animated gradient background */}
                    <motion.div
                        className="absolute inset-0"
                        animate={{
                            opacity: isHovered && !isFlipped ? 0.15 : 0,
                            scale: isHovered && !isFlipped ? 1.5 : 0.5,
                        }}
                        transition={{ duration: 0.5 }}
                        style={{
                            background: `radial-gradient(circle at 50% 50%, ${tech.hoverColor}, transparent 70%)`,
                        }}
                    />

                    {/* Logo Icon */}
                    <motion.div
                        className="relative z-10 mb-2 sm:mb-3"
                        animate={{
                            scale: isHovered && !isFlipped ? 1.2 : 1,
                            color: isHovered && !isFlipped ? tech.hoverColor : tech.color,
                        }}
                        transition={{
                            duration: isHovered ? 0.6 : 0.3,
                            scale: { type: "spring", stiffness: 300 },
                        }}
                        style={{
                            filter: isHovered && !isFlipped ? `drop-shadow(0 0 20px ${tech.color}80)` : "none",
                        }}
                    >
                        <tech.Icon className="w-10 h-10 sm:w-12 sm:h-12 md:w-[52px] md:h-[52px]" />
                    </motion.div>

                    {/* Tech Name */}
                    <motion.span
                        className="relative z-10 text-sm sm:text-base font-bold tracking-wide"
                        animate={{
                            color: isHovered && !isFlipped ? tech.hoverColor : "#E6ECE9",
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                            textShadow: isHovered && !isFlipped ? `0 0 20px ${tech.color}60` : "none",
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
                            backgroundSize: "20px 20px",
                        }}
                    />

                    {/* Shine effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-transparent"
                        animate={{
                            x: isHovered && !isFlipped ? ["-200%", "200%"] : "-200%",
                            opacity: isHovered && !isFlipped ? [0, 0.2, 0] : 0,
                        }}
                        transition={{
                            duration: 1.2,
                            repeat: isHovered && !isFlipped ? Infinity : 0,
                            repeatDelay: 0.5,
                        }}
                    />
                </motion.div>

                {/* ===== BACK FACE ===== */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl backdrop-blur-md overflow-hidden px-3 py-2 sm:px-4 sm:py-3"
                    style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        border: `2px solid ${tech.color}`,
                        background: `linear-gradient(135deg, ${tech.color}18, rgba(20,26,24,0.95))`,
                        boxShadow: `0 15px 40px ${tech.color}30, inset 0 1px 0 rgba(255,255,255,0.08)`,
                    }}
                >
                    {/* Small icon on back */}
                    <div className="absolute top-2.5 sm:top-3" style={{ color: tech.hoverColor }}>
                        <tech.Icon size={16} />
                    </div>

                    {/* Description */}
                    <p
                        className="text-center text-[11px] sm:text-xs md:text-[13px] leading-snug sm:leading-relaxed font-medium"
                        style={{ color: "#D1D5DB" }}
                    >
                        {language === "es" ? tech.descEs : tech.descEn}
                    </p>

                    {/* Subtle grid */}
                    <div
                        className="absolute inset-0 opacity-5 pointer-events-none"
                        style={{
                            backgroundImage: `
                                linear-gradient(${tech.color}30 1px, transparent 1px),
                                linear-gradient(90deg, ${tech.color}30 1px, transparent 1px)
                            `,
                            backgroundSize: "16px 16px",
                        }}
                    />
                </motion.div>
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
                    background: `radial-gradient(circle, ${tech.color}60, ${tech.hoverColor}30, transparent)`,
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
                    background: `radial-gradient(circle, ${tech.hoverColor}40, transparent)`,
                }}
            />
        </motion.div>
    );
}

function CategorySection({
    category,
    globalIndex,
}: {
    category: TechCategory;
    globalIndex: number;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const { language } = useLanguage();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="mb-16 last:mb-0"
        >
            {/* Category label */}
            <div className="flex items-center gap-4 mb-8">
                <div
                    className="h-px flex-1 max-w-[60px]"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${category.key === "frontend"
                            ? "#06B6D4"
                            : category.key === "backend"
                                ? "#8B5CF6"
                                : "#F59E0B"
                            })`,
                    }}
                />
                <h3
                    className="text-lg sm:text-xl font-semibold tracking-wide uppercase"
                    style={{
                        color:
                            category.key === "frontend"
                                ? "#06B6D4"
                                : category.key === "backend"
                                    ? "#8B5CF6"
                                    : "#F59E0B",
                    }}
                >
                    {categoryLabels[category.key][language]}
                </h3>
                <div
                    className="h-px flex-1"
                    style={{
                        background: `linear-gradient(90deg, ${category.key === "frontend"
                            ? "#06B6D4"
                            : category.key === "backend"
                                ? "#8B5CF6"
                                : "#F59E0B"
                            }, transparent)`,
                    }}
                />
            </div>

            {/* Tech grid */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
                {category.techs.map((tech, i) => (
                    <TechItem
                        key={tech.name}
                        tech={tech}
                        index={globalIndex + i}
                    />
                ))}
            </div>
        </motion.div>
    );
}

export default function Stack() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    let globalIndex = 0;

    return (
        <section ref={ref} className="relative min-h-screen py-20 px-4 z-10">
            <div className="max-w-6xl mx-auto relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 text-center"
                >
                    <span className="text-primary">{t("stack.tech")} </span>
                    <span className="text-brand">{t("stack.stack")}</span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                        ease: [0.6, 0.05, 0.01, 0.9],
                    }}
                    className="text-secondary text-lg sm:text-xl text-center mb-12 md:mb-16 max-w-2xl mx-auto px-4"
                >
                    {t("stack.subtitle")}
                </motion.p>

                {categories.map((cat) => {
                    const startIndex = globalIndex;
                    globalIndex += cat.techs.length;
                    return (
                        <CategorySection
                            key={cat.key}
                            category={cat}
                            globalIndex={startIndex}
                        />
                    );
                })}
            </div>
        </section>
    );
}
