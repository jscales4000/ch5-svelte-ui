# Product Requirements Document (PRD): Crestron CH5 Svelte Demo Panel

**Version:** 1.2

**Date:** May 14, 2025

## 1. Introduction

This section outlines the purpose, goals, audience, scope, and definitions related to the Crestron CH5 Svelte Demo Panel project.

### 1.1. Purpose of the Document

This Product Requirements Document (PRD) defines the functional and non-functional requirements for a demonstration touch panel interface. The interface is designed for controlling a typical conference room audio-visual (AV) system and will be built using Svelte, leveraging the `ch5-svelte` library for communication with a Crestron control system, and incorporating UI components from libraries such as `shadcn/ui`. The purpose is to provide a clear understanding of the project's objectives, features, constraints, and deliverables for all stakeholders involved, including project managers, developers, and QA teams.

### 1.2. Project Goals

The primary goals of this project are as follows:

*   **Comprehensive Demonstration:** To create a feature-rich demo panel that showcases a wide array of commonly used AV control components and their interactions, presented with a polished and modern UI.
*   **Svelte Implementation with Modern UI Components:** To build the Graphical User Interface (GUI) using the Svelte framework (specifically Svelte 5 with Runes), incorporating components from `shadcn/ui` and potentially other suggested UI libraries to enhance visual appeal and development efficiency.
*   **Bidirectional Crestron Integration:** To ensure seamless and robust bidirectional communication with Crestron control systems, allowing for real-time control and feedback for analog, digital, and serial signals, strictly following the `ch5-svelte` integration patterns including contract file usage and Crestron Communication Library (`CrComLib`) / Web XPanel setup.
*   **Intuitive User Experience:** To design and develop a user interface that is highly intuitive and easy to use for non-technical end-users needing to control AV equipment within a conference room environment, supported by a well-defined style guide and theming.
*   **Adherence to Best Practices:** To follow the guidelines and best practices outlined in the `ch5-svelte` documentation for project setup, development, and deployment, and to establish a clear style guide and theming strategy early in the development process.

### 1.3. Target Audience (for the PRD)

This document is intended for the following audiences:

*   Project Manager
*   Development Team
*   QA Team
*   Stakeholders

### 1.4. Target End-User (for the Demo Panel)

The primary end-users of the Crestron CH5 Svelte Demo Panel are:

*   Non-technical individuals
*   Conference room occupants

### 1.5. Scope

This section defines the boundaries of the project.

*   **In Scope:**
    *   Design and development of the Svelte-based touch panel GUI, including all visual elements, navigation, and user interaction flows, utilizing `shadcn/ui` components as a primary UI library, with potential for incorporating other suitable component libraries as suggested by the development IDE (Manus).
    *   Integration with Crestron control system signals (analog, digital, and serial) using the `ch5-svelte` library for bidirectional communication, with strict adherence to contract file (`.cse2j`) usage for signal mapping.
    *   Implementation of control interfaces for a comprehensive set of AV components typically found in a conference room.
    *   Strict adherence to the setup, coding (including `CrComLib` and Web XPanel integration), and deployment procedures detailed in the `ch5-svelte` and user-provided documentation.
    *   Creation of a demo panel that includes examples of all signal types and interaction patterns described in the `ch5-svelte` documentation.
    *   Establishment and documentation of a style guide and theming approach for the UI, with the development IDE (Manus) prompting for decisions on these aspects.
*   **Out of Scope:**
    *   Crestron control system programming (e.g., SIMPL Windows, SIMPL# Pro, C# for VC-4).
    *   Physical hardware installation.
    *   Network infrastructure setup beyond basic assumptions.

### 1.6. Definitions, Acronyms, and Abbreviations

*   **PRD:** Product Requirements Document
*   **AV:** Audio-Visual
*   **GUI:** Graphical User Interface
*   **CH5:** Crestron HTML5
*   **CrComLib:** Crestron Communication Library
*   **IP ID:** IP Identifier
*   **cse2j:** Crestron SIMPL E-Control to JSON (Contract File)
*   **ch5z:** Crestron HTML5 Zip archive
*   **Svelte Runes:** Reactivity model in Svelte 5.
*   **Join:** Numerical identifier in Crestron programming.
*   **Vite:** Frontend build tool.
*   **shadcn/ui:** A collection of re-usable UI components.
*   **IDE:** Integrated Development Environment (In this context, referring to Manus as the AI agent assisting with development).

## 2. Overall Description

### 2.1. Product Perspective

The Crestron CH5 Svelte Demo Panel is a software application designed to run on Crestron CH5-compatible touch panels. It serves as a sophisticated, user-friendly front-end interface to a backend Crestron control system, demonstrating the capabilities of Svelte combined with modern UI component libraries like `shadcn/ui` for CH5 development. The project emphasizes strict adherence to the `ch5-svelte` framework for Crestron integration, including the correct use of contract files, `CrComLib`, and Web XPanel for testing.

### 2.2. Product Features (High-Level)

*   Intuitive Touch-Based Control with a Polished UI (leveraging `shadcn/ui`).
*   Real-Time System Feedback.
*   Comprehensive AV Component Control.
*   Modern Web Technology Stack (Svelte 5, TypeScript, `shadcn/ui`).
*   Strict Bidirectional Signal Handling via `ch5-svelte` (using contracts, `CrComLib`, XPanel).
*   Example-Driven Design.
*   Defined Style Guide and Theming.

### 2.3. User Characteristics

*   Non-Technical Users.
*   Infrequent Users.
*   Task-Oriented.
*   Expectation of Simplicity, Responsiveness, and Modern Aesthetics.

### 2.4. Operating Environment

*   Hardware: Crestron CH5 compatible touch panel.
*   Control System: Crestron 3-Series/4-Series or VC-4 server.
*   Network: Stable TCP/IP network.
*   Software Dependencies: `@crestron/ch5-crcomlib`, `ch5-svelte`, `shadcn/ui`, Node.js, npm/yarn, Vite.

### 2.5. Design and Implementation Constraints

*   **Svelte 5 and `ch5-svelte` Core:** The GUI must be developed using Svelte 5 with Runes, and must utilize the `ch5-svelte` library for all Crestron signal interactions. This is a non-negotiable core technical requirement.
*   **Strict `ch5-svelte` Adherence:** All project setup, development practices (including contract file usage, `CrComLib` integration, and Web XPanel setup for testing), and deployment procedures must strictly follow the guidelines provided in the `ch5-svelte` and user-provided documentation.
*   **Primary UI Component Library:** `shadcn/ui` will be the primary component library. The development IDE (Manus) may suggest other complementary libraries if deemed beneficial and compatible.
*   **Touch Interaction Focus.**
*   **TypeScript Usage.**
*   **Deployment via `ch5-cli`.**
*   **Style Guide and Theming Definition:** A clear style guide and theming strategy must be defined. The development IDE (Manus) will prompt for decisions regarding these aspects during the design and development phases.
*   **Project Initialization:** It is strongly recommended that the project starts with a plain Svelte project through Vite, as opposed to SvelteKit, unless SvelteKit is explicitly deemed necessary (refer to SvelteKit considerations in Section 6).

### 2.6. Assumptions and Dependencies

*   Functional Crestron Control System with defined signals and contract file.
*   Network Infrastructure.
*   Availability of `ch5-cli`.
*   Developer Familiarity (Svelte, TypeScript, Crestron concepts, `shadcn/ui`).
*   Documentation Accuracy.

## 3. System Features (Functional Requirements)

### 3.1. GUI Framework & General UI

*   **3.1.1. Svelte-based Application Structure.**
*   **3.1.2. UI Component Library Integration:** The UI will be built primarily using components from `shadcn/ui` to ensure a modern, consistent, and accessible user interface. The development IDE (Manus) may suggest additional compatible component libraries for specific needs.
*   **3.1.3. Responsive Design.**
*   **3.1.4. Intuitive Navigation.**
*   **3.1.5. Clear Visual Feedback.**
*   **3.1.6. Use of TypeScript.**
*   **3.1.7. Style Guide and Theming:** The application will adhere to a defined style guide and theming. The development IDE (Manus) will facilitate the definition of this by asking clarifying questions regarding visual style, branding, color palettes, typography, and theming preferences (e.g., light/dark modes).

### 3.2. Crestron Communication (via `ch5-svelte`)

(This section remains largely the same, emphasizing that all examples and implementations must be compatible with the `ch5-svelte` core structure, contract files, and `CrComLib`/XPanel integration. Examples provided previously are still valid within this stricter context.)

*   **3.2.1. Bidirectional Communication (Strict Adherence to `ch5-svelte` and Contract Files).**
*   **3.2.2. Analog Signals** (Examples as before, ensuring they fit the `ch5-svelte` pattern).
*   **3.2.3. Digital Signals** (Examples as before, ensuring they fit the `ch5-svelte` pattern).
*   **3.2.4. Serial Signals** (Examples as before, ensuring they fit the `ch5-svelte` pattern).

### 3.3. AV Control Components (Demo Panel Sections & Controls)

(This section remains largely the same in terms of the *types* of controls, but their visual implementation will now be guided by `shadcn/ui` and the defined style guide.)

*   3.3.1. System Power & Presets
*   3.3.2. Display Control(s)
*   3.3.3. Audio Control
*   3.3.4. Lighting Control
*   3.3.5. Shades/Blinds Control
*   3.3.6. Camera Control (for Video Conferencing)
*   3.3.7. Source Device Control (e.g., Blu-ray, Media Player)
*   3.3.8. Status Display Area

## 4. External Interface Requirements

### 4.1. User Interfaces

*   Primary GUI (built with Svelte and `shadcn/ui` components).
*   Design Principles (modern, clear, responsive, consistent with style guide).

### 4.2. Hardware Interfaces

(No changes from previous version)

### 4.3. Software Interfaces

*   `@crestron/ch5-crcomlib` (Crestron Communication Library).
*   `ch5-svelte` wrapper library.
*   `shadcn/ui` component library (and its dependencies like Tailwind CSS, Radix UI if applicable to its Svelte port/version).
*   (Optional) `@crestron/ch5-webxpanel`.
*   Vite Build Tool.
*   `ch5-cli` Tool.

### 4.4. Communication Interfaces

(No changes from previous version, but re-emphasize contract file importance)
*   TCP/IP Network Communication.
*   Crestron CH5 Protocol.
*   Signal Joins (strictly mapped via Contract File).
*   Contract File (`contract.cse2j`) is mandatory for signal definition and mapping.

## 5. Non-Functional Requirements

### 5.1. Performance

(No changes from previous version)

### 5.2. Reliability

(No changes from previous version, but strict adherence to `ch5-svelte` structure contributes to this)

### 5.3. Usability

*   Enhanced by the use of professional UI components from `shadcn/ui` and a consistent style guide.
*   Ease of Learning.
*   Efficiency of Use.
*   Clarity and Intuitiveness.
*   Consistency (enforced by component library and style guide).
*   Error Prevention.
*   User Satisfaction.

### 5.4. Maintainability

*   Improved by using well-structured Svelte components and potentially `shadcn/ui`'s composable nature.
*   Code Readability and Structure.
*   Modularity.
*   TypeScript Best Practices.
*   Ease of Updates.
*   Configuration Management (especially contract files).
*   Debugging Support.

### 5.5. Security

(No changes from previous version)

### 5.6. Scalability

(No changes from previous version)

## 6. Technical Implementation Details

This section details the specific technical setup, configuration, and key implementation steps for the project, drawing heavily from the `ch5-svelte` documentation and user-provided instructions.

**General Recommendation:** It is strongly recommended that this project starts with a plain Svelte project initialized through Vite (as opposed to SvelteKit). If SvelteKit is considered, refer to the SvelteKit-specific considerations at the end of this section.

### 6.1. Project Creation

It is strongly recommended that you start with a plain Svelte project through Vite. (as opposed to SvelteKit - see the section on SvelteKit below if you must use SvelteKit).

Create a new Svelte Project with Vite:

```bash
npm create vite@latest my-ch5-ui -- --template svelte-ts
cd my-ch5-ui
npm install
```

Replace `my-ch5-ui` with the actual name of your project.

At this point, you may wish to install other UI libraries or tools such as TailwindCSS (often a dependency for `shadcn/ui`), `shadcn/ui` itself (or its Svelte equivalents like `shadcn-svelte` or `bits-ui` with `radix-svelte`), and any chosen font libraries.

### 6.2. Core CH5 Library Installation and Configuration

Due to how the `CrComLib` binds itself to the window object, there is some manual setup required to use the library in a Svelte project. The `CrComLib` must also be statically copied to the project root on build, otherwise it will be omitted in build bundles.

1.  **Install `ch5-svelte` and `@crestron/ch5-crcomlib`:**

    ```bash
    npm install ch5-svelte @crestron/ch5-crcomlib
    ```

2.  **Install `vite-plugin-static-copy`:**

    This plugin is needed to copy `cr-com-lib.js` to the build directory.

    ```bash
    npm install -D vite-plugin-static-copy
    ```

3.  **Modify `vite.config.ts`:**

    Import the plugin and add it to the plugins array in `vite.config.ts` (located in the project root).

    ```typescript
    import { defineConfig } from 'vite';
    import { svelte } from '@sveltejs/vite-plugin-svelte';
    import { viteStaticCopy } from 'vite-plugin-static-copy';

    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [
        svelte(),
        // Add this to copy the cr-com-lib.js file to the build directory
        viteStaticCopy({
          targets: [
            {
              src: 'node_modules/@crestron/ch5-crcomlib/build_bundles/umd/cr-com-lib.js',
              dest: '' // Copies to the root of the build output directory
            }
          ]
        }),
      ],
    });
    ```

4.  **Update `index.html`:**

    The `CrComLib` must be manually imported via a `<script>` tag in the `<head>` of your `index.html` file (located in the project root). This is because `CrComLib` does not have a default export and binds itself to the `window` object.

    Add the following line to the `<head>` of `./index.html`:

    ```html
    <script src="./cr-com-lib.js"></script>
    ```

    An example of a complete `index.html`:

    ```html
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + Svelte + TS</title>

        <!-- Import CrComLib here -->
        <script src="./cr-com-lib.js"></script>

      </head>
      <body>
        <div id="app"></div>
        <script type="module" src="/src/main.ts"></script>
      </body>
    </html>
    ```

### 6.3. Contract Setup

For defining signal names, if an external Crestron Contract Editor is used (e.g., outputting to `root/output` as per user note), the generated `.cse2j` file must be placed in the `public/config` directory of the Svelte project. The file must be renamed to `contract.cse2j`. The `config` directory may need to be created within the `public` directory.

The final path to the contract file within the project should be: `[Project Root
(Content truncated due to size limit. Use line ranges to read in chunks)