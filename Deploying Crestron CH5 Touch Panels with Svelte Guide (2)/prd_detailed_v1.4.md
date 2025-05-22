# Product Requirements Document (PRD): Crestron CH5 Svelte Demo Panel

**Version:** 1.4

**Date:** May 18, 2025

## Context Prompt for Development

This project will be developed by a senior Svelte programmer who specializes in CH5-svelte coding and has a deep understanding of building UIs intended for touch-enabled devices for Crestron. The primary focus will be on creating interfaces optimized for the TS-770 and TS-1070 touchpanels, with careful attention to ensuring the application works seamlessly in both browser environments (WebXPanel) and on physical touchpanels.

The developer will:
- Ask at the beginning of the project who the client is and what their brand colors are
- Request information about which touchpanel should initially be targeted for resolution optimization
- Receive a contract file from the user (placed in the public/config folder) and use it to reference signal names for CrComLib
- Never edit the contract file directly, but request updates if additional signals are needed
- Fully implement best practices using CrComLib
- Request pictures or wireframes to better understand the desired design aesthetic

## 1. Introduction

This section outlines the purpose, goals, audience, scope, and definitions related to the Crestron CH5 Svelte Demo Panel project.

### 1.1. Purpose of the Document

This Product Requirements Document (PRD) defines the functional and non-functional requirements for a demonstration touch panel interface. The interface is designed for controlling a typical conference room audio-visual (AV) system and will be built using Svelte, leveraging the `ch5-svelte` library for communication with a Crestron control system. The purpose is to provide a clear understanding of the project's objectives, features, constraints, and deliverables for all stakeholders involved, including project managers, developers, and QA teams.

### 1.2. Project Goals

The primary goals of this project are as follows:

*   **Comprehensive Demonstration:** To create a feature-rich demo panel that showcases a wide array of commonly used AV control components and their interactions, presented with a polished and modern UI.
*   **Svelte Implementation:** To build the Graphical User Interface (GUI) using the Svelte framework (specifically Svelte 5 with Runes), taking advantage of its reactivity and component-based architecture as facilitated by the `ch5-svelte` library.
*   **Bidirectional Crestron Integration:** To ensure seamless and robust bidirectional communication with Crestron control systems, allowing for real-time control and feedback for analog, digital, and serial signals, strictly following the `ch5-svelte` integration patterns including contract file usage and Crestron Communication Library (`CrComLib`) / Web XPanel setup.
*   **Intuitive User Experience:** To design and develop a user interface that is highly intuitive and easy to use for non-technical end-users needing to control AV equipment within a conference room environment.
*   **Adherence to Best Practices:** To follow the guidelines and best practices outlined in the `ch5-svelte` documentation for project setup, development, and deployment.

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
    *   Design and development of the Svelte-based touch panel GUI, including all visual elements, navigation, and user interaction flows.
    *   Integration with Crestron control system signals (analog, digital, and serial) using the `ch5-svelte` library for bidirectional communication, with strict adherence to contract file (`.cse2j`) usage for signal mapping.
    *   Implementation of control interfaces for a comprehensive set of AV components typically found in a conference room.
    *   Strict adherence to the setup, coding (including `CrComLib` and Web XPanel integration), and deployment procedures detailed in the `ch5-svelte` and user-provided documentation.
    *   Creation of a demo panel that includes examples of all signal types and interaction patterns described in the `ch5-svelte` documentation.
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
*   **IDE:** Integrated Development Environment (In this context, referring to Manus as the AI agent assisting with development).
*   **TS-770:** Crestron 7" touchpanel (1280 x 800 resolution)
*   **TS-1070:** Crestron 10" touchpanel (1920 x 1200 resolution)

## 2. Overall Description

### 2.1. Product Perspective

The Crestron CH5 Svelte Demo Panel is a software application designed to run on Crestron CH5-compatible touch panels. It serves as a sophisticated, user-friendly front-end interface to a backend Crestron control system. The panel is not a standalone product but rather a component of a larger AV control solution. Its primary role is to translate user interactions on the touch screen into commands for the Crestron processor, which in turn controls various AV devices. Conversely, it also displays real-time status and feedback from these devices, as relayed by the control system. This project specifically aims to demonstrate the efficacy and advantages of using Svelte, particularly Svelte 5 with Runes and the `ch5-svelte` wrapper library, for developing modern, responsive, and maintainable CH5 user interfaces. It will showcase how Svelte's reactivity model simplifies the handling of Crestron signals and enhances the overall development experience for creating rich, interactive control surfaces.

### 2.2. Product Features (High-Level)

*   Intuitive Touch-Based Control with a Polished UI.
*   Real-Time System Feedback.
*   Comprehensive AV Component Control.
*   Modern Web Technology Stack (Svelte 5, TypeScript).
*   Strict Bidirectional Signal Handling via `ch5-svelte` (using contracts, `CrComLib`, XPanel).
*   Example-Driven Design.

### 2.3. User Characteristics

*   Non-Technical Users.
*   Infrequent Users.
*   Task-Oriented.
*   Expectation of Simplicity, Responsiveness, and Modern Aesthetics.

### 2.4. Operating Environment

*   Hardware: Crestron CH5 compatible touch panel (specifically TS-770 and TS-1070).
*   Control System: Crestron 3-Series/4-Series or VC-4 server.
*   Network: Stable TCP/IP network.
*   Software Dependencies: `@crestron/ch5-crcomlib`, `ch5-svelte`, Node.js, npm/yarn, Vite.

### 2.5. Design and Implementation Constraints

*   **Svelte 5 and `ch5-svelte` Core:** The GUI must be developed using Svelte 5 with Runes, and must utilize the `ch5-svelte` library for all Crestron signal interactions. This is a non-negotiable core technical requirement.
*   **Strict `ch5-svelte` Adherence:** All project setup, development practices (including contract file usage, `CrComLib` integration, and Web XPanel setup for testing), and deployment procedures must strictly follow the guidelines provided in the `ch5-svelte` and user-provided documentation.
*   **Touch Interaction Focus:** The UI design must be optimized for touch input, with appropriately sized interactive elements and intuitive gestures.
*   **TypeScript Usage:** TypeScript must be used for Svelte component development to ensure type safety and improve code maintainability, as recommended by the `ch5-svelte` documentation.
*   **Deployment via `ch5-cli`:** The final application must be packaged into a `.ch5z` archive using the Crestron `ch5-cli` tool for deployment to touch panels.
*   **Project Initialization:** It is strongly recommended that the project starts with a plain Svelte project through Vite, as opposed to SvelteKit, unless SvelteKit is explicitly deemed necessary (refer to SvelteKit considerations in Section 6).

### 2.6. Assumptions and Dependencies

*   Functional Crestron Control System with defined signals and contract file.
*   Network Infrastructure.
*   Availability of `ch5-cli`.
*   Developer Familiarity (Svelte, TypeScript, Crestron concepts).
*   Documentation Accuracy.

## 3. System Features (Functional Requirements)

### 3.1. GUI Framework & General UI

*   **3.1.1. Svelte-based Application Structure:** The entire front-end application will be developed using Svelte, with a clear component-based architecture. Components will be organized logically (e.g., by AV device or function) to promote reusability and maintainability.
    *   *Example:* The project will be initialized as a Svelte project using Vite: `npm create vite@latest my-ch5-ui -- --template svelte-ts`.
*   **3.1.2. Responsive Design:** The GUI must adapt gracefully to different Crestron touch panel sizes and resolutions. CSS media queries will be employed.
*   **3.1.3. Intuitive Navigation:** A clear and consistent navigation system will be implemented. This might involve a main home screen with access to sub-pages for different control categories (e.g., "Display Controls", "Audio Controls", "Lighting & Shades"). Visual cues will guide the user.
*   **3.1.4. Clear Visual Feedback:** All user interactions must provide immediate visual feedback (e.g., button press states). System status changes (e.g., a light turning on, volume level changing) must be reflected on the UI in real-time.
*   **3.1.5. Use of TypeScript:** All Svelte components and logic will be written in TypeScript to leverage static typing for improved code quality and developer experience, as recommended by the `ch5-svelte` documentation.

### 3.2. Crestron Communication (via `ch5-svelte`)

The core of the panel's functionality relies on robust communication with the Crestron control system using the `ch5-svelte` library.

*   **3.2.1. Bidirectional Communication (Strict Adherence to `ch5-svelte` and Contract Files):** The panel must support sending commands to the Crestron processor and receiving real-time feedback for all defined analog, digital, and serial signals.

*   **3.2.2. Analog Signals:** These are used for variable values like volume levels, brightness, or sensor readings.
    *   **Read and Display Analog Values:** The UI must display analog values received from the control system. This could be a numeric display or a visual representation like a gauge.
        *   *Example (from `ch5-svelte` docs / `analog_signal_examples_content.md`):*
            ```html
            <script lang="ts">
              import { useAnalog } from 'ch5-svelte';
              const analogValue = useAnalog("Analog-Signal-Name-1"); // Feedback only
            </script>
            <h1>Analog Value: {$analogValue.value}</h1>
            ```
            To display as a percentage (assuming 0-65535 range):
            ```html
            <script lang="ts">
              import { useAnalog } from 'ch5-svelte';
              const volumeLevel = useAnalog("Audio.MasterVolume.LevelF"); // Feedback join
              let volumePercentage = $derived(Math.round(volumeLevel.value / 655.35));
            </script>
            <p>Volume: {volumePercentage}%</p>
            ```
    *   **Set Analog Values:** Users must be able to change analog values, typically via sliders or numeric inputs.
        *   *Example (from `ch5-svelte` docs / `analog_signal_examples_content.md` - Fader/Slider with two-way binding):
            ```html
            <script lang="ts">
              import { useAnalog } from 'ch5-svelte';
              // First arg is feedback join, second is set join
              const fader = useAnalog("ramp.levelF", "ramp.level");
            </script>
            <input type="range" bind:value={fader.value} min="0" max="65535"/>
            ```
    *   **Implement Progress Bars:** Display analog feedback as a progress bar.
        *   *Example (from `ch5-svelte` docs / `analog_signal_examples_content.md`):
            ```html
            <script lang="ts">
              import { useAnalog } from 'ch5-svelte';
              const progress = useAnalog("ramp.levelF");
            </script>
            <progress value={progress.value} max="65535"></progress>
            ```
    *   **Implement Numeric Input Fields:** Allow direct numeric entry for analog values.
        *   *Example (from `ch5-svelte` docs / `analog_signal_examples_content.md`):
            ```html
            <script lang="ts">
              import { useAnalog } from 'ch5-svelte';
              const numericEntry = useAnalog("ramp.levelF", "ramp.level");
            </script>
            <input type="number" bind:value={numericEntry.value} min="0" max="100"/>
            ```
            (Note: The example uses max 100, typically Crestron analogs are 0-65535. The UI might scale this.)

*   **3.2.3. Digital Signals:** These are used for on/off states, triggers, or boolean conditions.
    *   **Send Pulse Commands:** Implement buttons that send a momentary pulse to a digital join.
        *   *Example (from `ch5-svelte` docs / `digital_signal_examples_content.md` - Simple Trigger):
            ```html
            <script lang="ts">
              import { pulseDigital } from 'ch5-svelte';
            </script>
            <button on:click={() => pulseDigital("System.Power.Toggle")}>Toggle Power</button>
            ```
    *   **Implement Toggle Buttons with Feedback:** Buttons that change state (e.g., on/off) and reflect the feedback from the control system.
        *   *Example (from `ch5-svelte` docs / `digital_signal_examples_content.md`):
            ```html
            <script lang="ts">
              import { useDigital } from 'ch5-svelte';
              // First arg is feedback join, second is event/set join
              const toggleButton = useDigital("Mute.Audio.IsMutedF", "Mute.Audio.Toggle");
            </script>
            <button style="background-color: {toggleButton.value ? 'red' : 'green'}" on:click={() => toggleButton.pulse()}>Mute</button>
            ```
    *   **Implement Press-and-Hold Buttons:** Buttons that send a continuous true signal while pressed and false on release (e.g., for volume ramping).
        *   *Example (from `ch5-svelte` docs / `digital_signal_examples_content.md` - Ramp Up/Down):
            ```html
            <script lang="ts">
              import { useDigital } from 'ch5-svelte';
              const up = useDigital("Volume.Up.Press"); // Assumes this join is for setting
              const down = useDigital("Volume.Down.Press");
            </script>
            <button 
              on:pointerdown={() => up.value = true} 
              on:pointerup={() => up.value = false} 
              on:pointerout={() => up.value = false} 
              on:contextmenu={(e) => e.preventDefault()}
            >Volume UP</button>
            <!-- Similar button for Volume Down -->
            ```
    *   **Use Digital Signals to Conditionally Show/Hide UI Elements:** Dynamically change the UI based on digital feedback.
        *   *Example (from `ch5-svelte` docs / `digital_signal_examples_content.md`):
            ```html
            <script lang="ts">
              import { useDigital } from 'ch5-svelte';
              const showAdvancedControls = useDigital("System.ShowAdvancedF");
            </script>
            {#if showAdv
(Content truncated due to size limit. Use line ranges to read in chunks)