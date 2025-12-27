"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Language = "es" | "en";

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const translations = {
    es: {
        // Hero
        "hero.name": "Diego Carrasquilla",
        "hero.title1": "Software",
        "hero.title2": "Engineer",
        "hero.subtitle": "Construyo sistemas digitales que automatizan, escalan y generan valor real.",

        // About
        "about.title": "Sobre Mí",
        "about.p1": "Ingeniero de software especializado en",
        "about.p1.highlight1": "arquitecturas escalables",
        "about.p1.and": "e",
        "about.p1.highlight2": "integraciones complejas",
        "about.p2": "Transformo procesos manuales en sistemas automatizados. Construyo aplicaciones móviles con Flutter, diseño agentes conversacionales inteligentes con N8N, e integro backends empresariales (Java, C#, Node.js). Mi enfoque: resolver problemas reales con código limpio y arquitecturas que escalan.",
        "about.p3": "No construyo features, construyo sistemas. Automatización sobre procesos manuales. Simplicidad sobre complejidad. Cada decisión técnica debe justificarse con valor de negocio real.",

        // Projects
        "projects.featured": "Proyectos",
        "projects.destacados": "Destacados",
        "projects.title": "Proyectos",
        "projects.1.title": "Xervix App",
        "projects.1.desc": "Aplicación profesional móvil construida con Flutter. Arquitectura limpia, UI reusable y experiencia de usuario fluida.",
        "projects.1.details": "Aplicación móvil empresarial desarrollada con Flutter que implementa arquitectura limpia en capas. Integración completa con múltiples APIs REST para consumo de datos en tiempo real. Incluye autenticación segura con tokens JWT, gestión de estado con Riverpod, caché local con SQLite, manejo de imágenes optimizado, y diseño Material 3. Sistema modular con widgets reutilizables que permiten escalabilidad y mantenimiento eficiente del código.",
        "projects.2.title": "Agentes Conversacionales N8N",
        "projects.2.desc": "Agentes de voz y texto con N8N. Sistemas de mensajes masivos para marketing, flujos automatizados y campañas inteligentes.",
        "projects.2.details": "Desarrollo de agentes conversacionales inteligentes usando N8N con integración a backends empresariales. Conectados principalmente con sistemas Java y C# Core a través de APIs REST y webhooks. Incluye sistemas de respuesta de voz mediante integración con APIs de AI, chatbots de texto con memoria contextual, envío masivo de mensajes para campañas de marketing, automatización de seguimiento de leads, sincronización bidireccional con bases de datos corporativas, y flujos de trabajo personalizados con triggers automáticos.",
        "projects.3.title": "Alisados Vanessa Baquero",
        "projects.3.desc": "Sistema completo de gestión y agendamiento. Web profesional con integración de servicios, automatización de citas y experiencia de cliente optimizada.",
        "projects.3.details": "Plataforma web completa construida con Astro para máximo rendimiento y SEO. Integra WhatsApp Bot con Google Calendar para agendamiento automatizado, sistema de notificaciones por WhatsApp con confirmaciones automáticas, catálogo de servicios con precios dinámicos, panel de administración para gestión de citas, landing page optimizada para conversión con componentes interactivos, y arquitectura estática con islands para carga ultra-rápida.",

        // Stack
        "stack.title": "Stack Tecnológico",
        "stack.subtitle": "Herramientas que uso para construir sistemas reales",
        "stack.tech": "Tech",
        "stack.stack": "Stack",

        // Hero
        "hero.scroll": "Scroll",

        // Contact
        "contact.title": "¿Tienes un sistema que necesita orden?",
        "contact.subtitle": "Trabajo con startups, negocios y equipos que necesitan automatizar procesos.",
        "contact.footer": "© 2025 Diego Carrasquilla · Software Engineer",
    },
    en: {
        // Hero
        "hero.name": "Diego Carrasquilla",
        "hero.title1": "Software",
        "hero.title2": "Engineer",
        "hero.subtitle": "Building digital systems that automate, scale and deliver real value.",

        // About
        "about.title": "About Me",
        "about.p1": "Software engineer specialized in",
        "about.p1.highlight1": "scalable architectures",
        "about.p1.and": "and",
        "about.p1.highlight2": "complex integrations",
        "about.p2": "I transform manual processes into automated systems. Building mobile apps with Flutter, designing intelligent conversational agents with N8N, and integrating enterprise backends (Java, C#, Node.js). My approach: solving real problems with clean code and architectures that scale.",
        "about.p3": "I don't build features, I build systems. Automation over manual processes. Simplicity over complexity. Every technical decision must be justified by real business value.",

        // Projects
        "projects.featured": "Featured",
        "projects.destacados": "Projects",
        "projects.title": "Projects",
        "projects.1.title": "Xervix App",
        "projects.1.desc": "Professional mobile application built with Flutter. Clean architecture, reusable UI and smooth user experience.",
        "projects.1.details": "Enterprise mobile application developed with Flutter implementing clean architecture in layers. Full integration with multiple REST APIs for real-time data consumption. Features secure authentication with JWT tokens, state management with Riverpod, local cache with SQLite, optimized image handling, and Material 3 design. Modular system with reusable widgets enabling code scalability and efficient maintenance.",
        "projects.2.title": "N8N Conversational Agents",
        "projects.2.desc": "Voice and text agents with N8N. Mass messaging systems for marketing, automated workflows and intelligent campaigns.",
        "projects.2.details": "Development of intelligent conversational agents using N8N with integration to enterprise backends. Connected primarily with Java and C# Core systems through REST APIs and webhooks. Includes voice response systems through AI API integration, text chatbots with contextual memory, mass messaging for marketing campaigns, lead follow-up automation, bidirectional synchronization with corporate databases, and custom workflows with automatic triggers.",
        "projects.3.title": "Alisados Vanessa Baquero",
        "projects.3.desc": "Complete management and scheduling system. Professional website with service integration, appointment automation and optimized customer experience.",
        "projects.3.details": "Complete web platform built with Astro for maximum performance and SEO. Integrates WhatsApp Bot with Google Calendar for automated scheduling, WhatsApp notification system with automatic confirmations, service catalog with dynamic pricing, admin panel for appointment management, landing page optimized for conversion with interactive components, and static architecture with islands for ultra-fast loading.",

        // Stack
        "stack.title": "Tech Stack",
        "stack.subtitle": "Tools I use to build real systems",
        "stack.tech": "Tech",
        "stack.stack": "Stack",

        // Hero
        "hero.scroll": "Scroll",

        // Contact
        "contact.title": "Have a system that needs order?",
        "contact.subtitle": "I work with startups, businesses and teams that need to automate processes.",
        "contact.footer": "© 2025 Diego Carrasquilla · Software Engineer",
    },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("es");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedLang = localStorage.getItem("language") as Language;
        if (savedLang) {
            setLanguage(savedLang);
        }
    }, []);

    const toggleLanguage = () => {
        const newLang = language === "es" ? "en" : "es";
        setLanguage(newLang);
        localStorage.setItem("language", newLang);
    };

    const t = (key: string): string => {
        return translations[language][key as keyof typeof translations.es] || key;
    };

    if (!mounted) return null;

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error("useLanguage must be used within LanguageProvider");
    return context;
}
