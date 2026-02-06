"use client";

import { motion } from "framer-motion";

export default function PageBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Large ambient gradient blobs that slowly drift */}
            <motion.div
                className="absolute w-[800px] h-[800px] rounded-full blur-[200px]"
                style={{
                    top: "10%",
                    left: "-10%",
                    background:
                        "radial-gradient(circle, rgba(15,61,46,0.15), transparent 70%)",
                }}
                animate={{
                    x: [0, 80, 0],
                    y: [0, 40, -20, 0],
                    scale: [1, 1.1, 0.95, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full blur-[180px]"
                style={{
                    top: "50%",
                    right: "-5%",
                    background:
                        "radial-gradient(circle, rgba(15,61,46,0.12), transparent 70%)",
                }}
                animate={{
                    x: [0, -60, 20, 0],
                    y: [0, -50, 30, 0],
                    scale: [1, 0.9, 1.1, 1],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute w-[500px] h-[500px] rounded-full blur-[160px]"
                style={{
                    bottom: "5%",
                    left: "20%",
                    background:
                        "radial-gradient(circle, rgba(15,80,55,0.1), transparent 70%)",
                }}
                animate={{
                    x: [0, 50, -30, 0],
                    y: [0, -40, 20, 0],
                }}
                transition={{
                    duration: 22,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Subtle horizontal light streak */}
            <motion.div
                className="absolute w-full h-px top-[30%] opacity-[0.04]"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(15,61,46,0.6) 30%, rgba(15,61,46,0.8) 50%, rgba(15,61,46,0.6) 70%, transparent)",
                }}
                animate={{
                    opacity: [0.03, 0.06, 0.03],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="absolute w-full h-px top-[70%] opacity-[0.03]"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, rgba(15,61,46,0.5) 40%, rgba(15,61,46,0.6) 50%, rgba(15,61,46,0.5) 60%, transparent)",
                }}
                animate={{
                    opacity: [0.02, 0.05, 0.02],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 3,
                }}
            />

            {/* Global noise texture */}
            <div
                className="absolute inset-0 opacity-[0.018] mix-blend-overlay"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' /%3E%3C/svg%3E")',
                }}
            />

            {/* Subtle dot grid that recedes into depth */}
            <div
                className="absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage:
                        "radial-gradient(rgba(15,61,46,0.4) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    maskImage:
                        "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.3) 80%, transparent 100%)",
                    WebkitMaskImage:
                        "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.3) 80%, transparent 100%)",
                }}
            />
        </div>
    );
}
