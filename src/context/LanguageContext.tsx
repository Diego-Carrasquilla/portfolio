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
        "hero.subtitle": "Diseño arquitecturas, automatizo procesos y conecto sistemas que escalan.",

        // About
        "about.title": "Sobre Mí",
        "about.p1": "Ingeniero de software especializado en",
        "about.p1.highlight1": "arquitecturas escalables",
        "about.p1.and": "e",
        "about.p1.highlight2": "integraciones complejas",
        "about.p2": "Convierto procesos manuales en sistemas autónomos. Desarrollo aplicaciones móviles con Flutter, diseño agentes inteligentes con N8N e integro backends enterprise en Java, C# y Node.js. Mi enfoque parte de entender el problema antes de escribir una sola línea de código.",
        "about.p3": "Pienso en sistemas, no en features aisladas. Priorizo automatización sobre trabajo manual, simplicidad sobre complejidad. Cada decisión técnica responde a una necesidad concreta del proyecto.",

        // Projects
        "projects.featured": "Proyectos",
        "projects.destacados": "Destacados",
        "projects.title": "Proyectos",
        "projects.1.title": "Xervix - Dos Aplicaciones Móviles",
        "projects.1.desc": "Maquetación de interfaces, integración con APIs REST, manejo de estado y autenticación en dos apps empresariales con .NET.",
        "projects.1.details": "Desarrollo de la capa de presentación de dos aplicaciones móviles empresariales con .NET Framework y XAML. El trabajo se centró en maquetación de interfaces responsivas siguiendo diseños de UI, implementación de componentes reutilizables, integración con múltiples APIs REST para consumo de datos, manejo de estado con patrones MVVM y databinding, flujos de autenticación, serialización de JSON y gestión de respuestas asíncronas. Control de versiones con Git, branching strategies y colaboración en equipo.",
        "projects.2.title": "Agentes Conversacionales N8N",
        "projects.2.desc": "Agentes de voz y texto con N8N. Sistemas de mensajes masivos para marketing, flujos automatizados y campañas inteligentes.",
        "projects.2.details": "Desarrollo de agentes conversacionales inteligentes usando N8N con integración a backends empresariales. Conectados principalmente con sistemas Java y C# Core a través de APIs REST y webhooks. Incluye sistemas de respuesta de voz mediante integración con APIs de AI, chatbots de texto con memoria contextual, envío masivo de mensajes para campañas de marketing, automatización de seguimiento de leads, sincronización bidireccional con bases de datos corporativas, y flujos de trabajo personalizados con triggers automáticos.",
        "projects.3.title": "Alisados Vanessa Baquero",
        "projects.3.desc": "Sistema completo de gestión y agendamiento. Web profesional con integración de servicios, automatización de citas y experiencia de cliente optimizada.",
        "projects.3.details": "Plataforma web completa construida con Astro para máximo rendimiento y SEO. Integra WhatsApp Bot con Google Calendar para agendamiento automatizado, sistema de notificaciones por WhatsApp con confirmaciones automáticas, catálogo de servicios con precios dinámicos, panel de administración para gestión de citas, landing page optimizada para conversión con componentes interactivos, y arquitectura estática con islands para carga ultra-rápida.",

        // Stack
        "stack.title": "Stack Tecnológico",
        "stack.subtitle": "Las herramientas con las que trabajo día a día",
        "stack.tech": "Tech",
        "stack.stack": "Stack",

        // Hero
        "hero.scroll": "Scroll",

        // Contact
        "contact.title": "¿Tienes un proyecto en mente?",
        "contact.subtitle": "Colaboro con startups, empresas y equipos técnicos que buscan automatizar y escalar sus procesos.",
        "contact.footer": "© 2025 Diego Carrasquilla · Software Engineer",
    },
    en: {
        // Hero
        "hero.name": "Diego Carrasquilla",
        "hero.title1": "Software",
        "hero.title2": "Engineer",
        "hero.subtitle": "I architect solutions, automate processes and build systems that scale.",

        // About
        "about.title": "About Me",
        "about.p1": "Software engineer specialized in",
        "about.p1.highlight1": "scalable architectures",
        "about.p1.and": "and",
        "about.p1.highlight2": "complex integrations",
        "about.p2": "I turn manual processes into autonomous systems. I develop mobile applications with Flutter, design intelligent agents with N8N, and integrate enterprise backends in Java, C# and Node.js. My approach starts with understanding the problem before writing a single line of code.",
        "about.p3": "I think in systems, not isolated features. I prioritize automation over manual work, simplicity over complexity. Every technical decision responds to a concrete project need.",

        // Projects
        "projects.featured": "Featured",
        "projects.destacados": "Projects",
        "projects.title": "Projects",
        "projects.1.title": "Xervix - Two Mobile Applications",
        "projects.1.desc": "Interface layout, REST API integration, state management and authentication across two enterprise apps built with .NET.",
        "projects.1.details": "Development of the presentation layer for two enterprise mobile applications using .NET Framework and XAML. Work focused on responsive interface layout following UI designs, reusable component implementation, integration with multiple REST APIs for data consumption, state management with MVVM patterns and databinding, authentication flows, JSON serialization and async response handling. Version control with Git, branching strategies and team collaboration.",
        "projects.2.title": "N8N Conversational Agents",
        "projects.2.desc": "Voice and text agents with N8N. Mass messaging systems for marketing, automated workflows and intelligent campaigns.",
        "projects.2.details": "Development of intelligent conversational agents using N8N with integration to enterprise backends. Connected primarily with Java and C# Core systems through REST APIs and webhooks. Includes voice response systems through AI API integration, text chatbots with contextual memory, mass messaging for marketing campaigns, lead follow-up automation, bidirectional synchronization with corporate databases, and custom workflows with automatic triggers.",
        "projects.3.title": "Alisados Vanessa Baquero",
        "projects.3.desc": "Complete management and scheduling system. Professional website with service integration, appointment automation and optimized customer experience.",
        "projects.3.details": "Complete web platform built with Astro for maximum performance and SEO. Integrates WhatsApp Bot with Google Calendar for automated scheduling, WhatsApp notification system with automatic confirmations, service catalog with dynamic pricing, admin panel for appointment management, landing page optimized for conversion with interactive components, and static architecture with islands for ultra-fast loading.",

        // Stack
        "stack.title": "Tech Stack",
        "stack.subtitle": "The tools I work with every day",
        "stack.tech": "Tech",
        "stack.stack": "Stack",

        // Hero
        "hero.scroll": "Scroll",

        // Contact
        "contact.title": "Have a project in mind?",
        "contact.subtitle": "I collaborate with startups, companies and technical teams looking to automate and scale their processes.",
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
