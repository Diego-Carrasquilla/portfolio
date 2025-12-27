# Portfolio

Professional portfolio website built with modern web technologies.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations and transitions
- **GSAP** - Advanced scroll effects (ready to use)

## Design System

- **Theme**: Dark mode (black/charcoal)
- **Typography**: Inter font family
- **Colors**: 
  - Primary: White
  - Secondary: Gray
  - Accent: Cyan (#06B6D4)
- **Animation Style**: Slow, smooth easing, subtle movements

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and Tailwind config
│   ├── layout.tsx       # Root layout with Inter font
│   └── page.tsx         # Main page with all sections
└── components/
    └── sections/
        ├── Hero.tsx     # Hero with parallax effect
        ├── About.tsx    # About section with storytelling
        ├── Projects.tsx # Animated project cards
        ├── Stack.tsx    # Visual tech stack display
        └── Contact.tsx  # Minimal contact section
```

## Features

### Hero Section
- Large typography with gradient effects
- Smooth entrance animations
- Subtle parallax scroll effect
- Animated grid background

### About Section
- Storytelling approach
- Scroll-triggered animations
- Clean, readable layout

### Projects Section
- Animated project cards
- Hover effects with scale and glow
- Scroll reveal animations
- Tag system for technologies

### Stack Section
- Visual display with icons
- Interactive hover effects
- Staggered entrance animations

### Contact Section
- Minimal, direct design
- Social media links
- Smooth animations

## Customization

### Update Personal Information

1. **Hero Section** (`src/components/sections/Hero.tsx`):
   - Edit title and subtitle text

2. **About Section** (`src/components/sections/About.tsx`):
   - Update your story and description

3. **Projects** (`src/components/sections/Projects.tsx`):
   - Modify the `projects` array with your own work

4. **Stack** (`src/components/sections/Stack.tsx`):
   - Update the `technologies` array with your tech stack

5. **Contact** (`src/components/sections/Contact.tsx`):
   - Add your social media links and email

### Add GSAP Effects

GSAP is already installed. To add advanced scroll effects:

```typescript
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function YourComponent() {
  const ref = useRef(null);
  
  useEffect(() => {
    gsap.to(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
      y: 100,
      opacity: 0.5,
    });
  }, []);
  
  return <div ref={ref}>Your content</div>;
}
```

## Build for Production

```bash
npm run build
npm start
```

## Deploy on Vercel

Deploy easily on [Vercel](https://vercel.com):

```bash
npx vercel
```

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

