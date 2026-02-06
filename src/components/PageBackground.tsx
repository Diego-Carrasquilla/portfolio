"use client";

export default function PageBackground() {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Large ambient gradient blobs — CSS animated */}
            <div
                className="bg-blob bg-blob-1 absolute w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full"
                style={{
                    top: "10%",
                    left: "-10%",
                    background:
                        "radial-gradient(circle, rgba(15,61,46,0.15), transparent 70%)",
                    filter: "blur(120px)",
                }}
            />

            <div
                className="bg-blob bg-blob-2 absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full"
                style={{
                    top: "50%",
                    right: "-5%",
                    background:
                        "radial-gradient(circle, rgba(15,61,46,0.12), transparent 70%)",
                    filter: "blur(100px)",
                }}
            />

            <div
                className="bg-blob bg-blob-3 absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full"
                style={{
                    bottom: "5%",
                    left: "20%",
                    background:
                        "radial-gradient(circle, rgba(15,80,55,0.1), transparent 70%)",
                    filter: "blur(100px)",
                }}
            />

            {/* Global noise texture — static */}
            <div
                className="absolute inset-0 opacity-[0.018] mix-blend-overlay"
                style={{
                    backgroundImage:
                        'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 512 512\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.7\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' /%3E%3C/svg%3E")',
                }}
            />

            {/* Subtle dot grid — static */}
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
