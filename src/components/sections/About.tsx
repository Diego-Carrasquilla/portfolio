"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
    const { t } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Background animated gradient */}
            <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(15,61,46,0.15), transparent 40%)`,
                }}
            />

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1 }}
                >
                    {/* Decorative element */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={isInView ? { scaleX: 1 } : {}}
                        transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
                        className="h-1 w-20 bg-brand mb-8 rounded-full"
                    />

                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-12 md:mb-16 leading-tight">
                        {t("about.title").split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                                transition={{
                                    duration: 0.8,
                                    delay: i * 0.1,
                                    ease: [0.6, 0.05, 0.01, 0.9]
                                }}
                                className={i === 0 ? "text-brand block" : "text-primary"}
                            >
                                {word}{" "}
                            </motion.span>
                        ))}
                    </h2>

                    <div className="space-y-6 relative">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
                            className="relative p-8 rounded-2xl bg-surface/30 backdrop-blur-sm border border-border/50"
                        >
                            <p className="text-primary text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed font-light">
                                {t("about.p1")}{" "}
                                <motion.span
                                    className="text-brand font-bold relative inline-block"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {t("about.p1.highlight1")}
                                    <motion.span
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.span>{" "}
                                {t("about.p1.and")}{" "}
                                <motion.span
                                    className="text-brand font-bold relative inline-block"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {t("about.p1.highlight2")}
                                    <motion.span
                                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand"
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.span>.
                            </p>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, x: 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
                            className="text-secondary text-base sm:text-lg md:text-xl leading-relaxed pl-4 md:pl-8 border-l-2 border-brand/30"
                        >
                            {t("about.p2")}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
                            className="text-secondary text-base sm:text-lg md:text-xl leading-relaxed pl-4 md:pl-8 border-l-2 border-brand/30"
                        >
                            {t("about.p3")}
                        </motion.p>
                    </div>

                    {/* Floating stats or metrics */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
                        className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8"
                    >
                        {[
                            { value: "Flutter", label: "Mobile Apps" },
                            { value: "N8N", label: "Automation" },
                            { value: "Backend", label: "Integration" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="text-center p-6 rounded-xl bg-surface/20 backdrop-blur-sm border border-border/30"
                            >
                                <div className="text-3xl font-black text-brand mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-secondary uppercase tracking-wider">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative corner elements */}
            <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 0.05, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute top-20 right-20 w-32 h-32 border-r-2 border-t-2 border-brand"
            />
        </section>
    );
}
