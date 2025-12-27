"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
            className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
        >
            <div className="max-w-7xl mx-auto flex justify-end">
                {/* Language Toggle */}
                <motion.button
                    onClick={toggleLanguage}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full backdrop-blur-md border border-accent/30 bg-surface transition-all duration-300 font-semibold text-sm text-primary"
                    style={{
                        boxShadow: "0 4px 20px rgba(15,61,46,0.2)",
                    }}
                >
                    {language === "es" ? "🇬🇧 EN" : "🇪🇸 ES"}
                </motion.button>
            </div>
        </motion.header>
    );
}
