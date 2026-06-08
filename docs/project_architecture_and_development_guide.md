# Star Consulting Engineering: Project Architecture & Development Guide

This document serves as the comprehensive "Making Of" guide for the Star Consulting Engineering platform. It details the technology stack, architectural decisions, design philosophy, backend infrastructure, and problem-solving methodologies used during development. Use this document as the master reference for creating presentations, reports, or case studies.

---

## 1. Project Overview & Objectives

### The Concept
Star Consulting Engineering is a full-stack, mock consultancy platform tailored for the heavy-industry engineering sector (Oil & Gas, LNG, Power). It was built to demonstrate the integration of high-performance marketing pages with complex, interactive client-side engineering tools.

### Core Objectives
1. **Performance & SEO:** Achieve near-instant page load times to ensure a high-quality user experience and strong search engine visibility.
2. **Interactive Utility:** Provide working, zero-latency engineering calculators (e.g., Pipe Wall Thickness, Pressure Drop) that process complex code formulas directly in the browser.
3. **Secure Lead Generation:** Capture user inquiries and newsletter subscriptions securely, handling data validation and automated email routing entirely on the backend to protect API secrets.
4. **Premium "SaaS" Aesthetic:** Avoid the clunky, outdated look typical of industrial websites by employing a dark-mode-first, "Industrial Brutalist" design language.

---

## 2. Frontend Architecture: The "What, How, & Why"

### Next.js 16 (App Router)
*   **What it is:** A React framework that provides hybrid static & server rendering, file-system-based routing, and built-in API endpoints.
*   **Why it was used:** We needed a framework that could generate static pages for maximum speed (About, Home, Services) while simultaneously providing secure Node.js backend routes (for processing form submissions) within a single codebase.
*   **How it was used:** 
    *   Utilized the `app` directory structure.
    *   Used dynamic routes (`[slug]/page.tsx`) mapped to static TypeScript data files (`src/data/services.ts`) to programmatically generate dozens of pages without the overhead of a Headless CMS.

### TypeScript
*   **What it is:** A strongly typed superset of JavaScript.
*   **Why it was used:** Strict typing is critical when building mathematical engineering tools. It prevents runtime errors by catching type mismatches (e.g., passing a string instead of a number to a stress formula) during compilation.
*   **How it was used:** Defined strict interfaces for all data structures (Services, Industries) and function parameters inside the calculator logic.

### Tailwind CSS v4
*   **What it is:** A utility-first CSS framework.
*   **Why it was used:** It allows for rapid UI prototyping directly in the markup without context-switching to CSS files. It eliminates dead CSS code, keeping the final stylesheet incredibly small.
*   **How it was used:** Configured with custom design tokens in `globals.css` (defining the specific "Navy", "Steel", and "Amber" color palettes) and applied inline to React components.

---

## 3. Design Engineering (UI/UX)

The visual aesthetic is classified as **"Premium Industrial"** or **"Dark SaaS"**.

### Typography
*   **What was used:** The `Geist` and `Geist Mono` font families (provided by Vercel).
*   **Why:** Standard fonts (like Arial or Roboto) look generic. `Geist` gives the site a highly modern, polished software feel. `Geist Mono` was specifically applied to all statistics and calculator numbers to emulate a precise, technical dashboard.

### Advanced CSS Visual Effects
*   **Liquid Glass Cards:** Standard solid-color cards feel heavy. We used Tailwind's `bg-white/5`, `backdrop-blur-xl`, and `border-white/10` to make cards look like frosted glass floating above the dark background.
*   **Cinematic Lighting (Radial Glows):** Instead of using large, slow-loading background images, we used CSS radial gradients (e.g., `bg-[radial-gradient(ellipse_at_top_right,...)]`) to create soft, glowing amber and blue lights behind text, creating depth computationally with zero performance cost.

---

## 4. Backend Infrastructure & Data Flow

The backend handles the intake, validation, storage, and notification of user submissions.

### Supabase (PostgreSQL)
*   **What it is:** An open-source Firebase alternative backed by a standard PostgreSQL database.
*   **Why it was used:** Relational data (like inquiries with specific fields for name, email, industry, timeline) fits perfectly into SQL tables. Supabase provides a seamless API to interact with Postgres.
*   **How it was used:** 
    *   Created `inquiries` and `newsletter_subscribers` tables via a schema script.
    *   **Security:** Bypassed Row Level Security (RLS) entirely by executing database inserts from a secure Next.js Server Route using a `SUPABASE_SERVICE_ROLE_KEY`. This ensures the database is completely locked down from the public internet.

### Resend API
*   **What it is:** A modern email-sending API built for developers.
*   **Why it was used:** Much faster to configure and integrate with React/Next.js than legacy systems like SendGrid or AWS SES.
*   **How it was used:** Executed inside the server route. Upon a successful database insert, Resend triggers two emails: an internal alert to the site admin, and a branded auto-reply to the user.

---

## 5. Security & Data Validation

Never trust client input. The architecture ensures that malformed or malicious data never reaches the database or the email server.

### Zod (Schema Validation)
*   **What it is:** A TypeScript-first schema declaration and validation library.
*   **Why it was used:** To guarantee that the payload matches exact specifications (e.g., ensuring an email is actually an email, ensuring required fields aren't empty) before attempting a database insert.
*   **How it was used:** Defined an `inquirySchema`. The server route runs `inquirySchema.safeParse(body)` and immediately returns an HTTP 422 error if the data is invalid.

### Sanitization (Header Injection Prevention)
*   **The Threat:** Attackers can inject carriage returns (`\r\n`) into single-line form fields (like "Name" or "Company") to manipulate email headers when the server attempts to send an email.
*   **The Solution:** Implemented a custom Regex sanitizer `v.replace(/[\r\n]+/g, " ").trim()` on all text inputs within the server route to flatten any malicious line breaks before handing data to the Resend API.

### Environment Variable Protection
*   **The Threat:** Leaking database passwords or API keys to the public frontend or GitHub.
*   **The Solution:** Kept all secrets in a `.env.local` file which is explicitly ignored by Git (`.gitignore`). Only the Next.js server environment has access to these keys during execution.

---

## 6. Engineering The Calculators (Client-Side Logic)

The "Tools" section contains 5 complex engineering calculators (e.g., Pressure Drop, Thermal Expansion).

### Separation of Concerns
*   **The Architecture:** The mathematical formulas and lookup tables (e.g., ASME B31.3 coefficients) are completely decoupled from the UI components.
*   **How:** Math logic is stored in pure TypeScript functions inside `src/lib/calculators/`. The UI components in `src/app/tools/` simply import these functions. 
*   **Why:** This makes the math highly testable, reusable, and easy to maintain without touching React code.

### React State Management
*   **The Architecture:** Executing calculations strictly on the client side using React `useState`.
*   **Why:** Traditional forms send data to a server, calculate, and return the result (causing loading spinners and latency). By bundling the math logic to the client, the calculators react instantly to every keystroke with zero network latency, creating a much better user experience.

---

## 7. Technical Challenges & Problem Solving

### Challenge: The Build-Crashing Corrupted Image
*   **The Issue:** During the `npm run build` process, the Next.js Turbopack compiler crashed with a "Format error decoding Png: Unknown filter method 255" error. The provided `iconic_logo.png` had a corrupted or non-standard encoding header.
*   **The Solution:** Instead of finding a new image, we used the Node.js `sharp` image processing library directly via the command line to read the raw image buffer, strip the corrupted headers, and re-encode it as a standard, optimized PNG file. The build subsequently passed with 100% success.

### Challenge: Massive Search & Replace for Banned Characters
*   **The Issue:** The project required the complete eradication of the em-dash (`—`) character across the entire codebase (CSS, TypeScript, React components).
*   **The Solution:** Used automated grep searching and regex-based AST replacement scripts to surgically swap the character for a standard hyphen (`-`) across 14 different files simultaneously, without breaking React syntax or CSS variables.