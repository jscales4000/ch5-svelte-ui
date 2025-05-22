# Product Requirements Document (PRD): Crestron CH5 Svelte Demo Panel

**Version:** 1.3

**Date:** May 18, 2025

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

*   Hardware: Crestron CH5 compatible touch panel.
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
            {#if showAdvancedControls.value}
              <div><!-- Advanced Controls Here --></div>
            {/if}
            ```
    *   **Implement HTML Checkbox Elements with Feedback:** Use standard HTML checkboxes linked to digital signals.
        *   *Example (from `ch5-svelte` docs / `digital_signal_examples_content.md`):
            ```html
            <script lang="ts">
              import { useDigital } from 'ch5-svelte';
              const lightsOn = useDigital("Lights.Zone1.IsOnF", "Lights.Zone1.Toggle");
            </script>
            <input type="checkbox" checked={lightsOn.value} on:click={() => lightsOn.pulse()} /> Lights On
            ```

*   **3.2.4. Serial Signals:** These are used for text-based information, like source names or status messages.
    *   **Display Text Feedback:** Show serial string data received from the control system.
        *   *Example (from `ch5-svelte` docs / `serial_signal_examples_content.md`):
            ```html
            <script lang="ts">
              import { useSerial } from 'ch5-svelte';
              const currentSourceName = useSerial("Source.Selected.NameF");
            </script>
            <p>Current Source: {currentSourceName.value}</p>
            ```
    *   **Implement Settable Text Fields:** Allow users to input text to be sent to a serial join.
        *   *Example (from `ch5-svelte` docs / `serial_signal_examples_content.md` - two-way binding):
            ```html
            <script lang="ts">
              import { useSerial } from 'ch5-svelte';
              const customMessage = useSerial("Display.Message.FeedbackF", "Display.Message.Set");
            </script>
            <input type="text" bind:value={customMessage.value} />
            ```
    *   **Implement Settable Text Fields with Explicit Submit/Cancel Buttons:** Provide more control over when serial data is sent.
        *   *Example (from `ch5-svelte` docs / `serial_signal_examples_content.md`):
            ```html
            <script lang="ts">
              import { useSerial } from 'ch5-svelte';
              const serialSignal = useSerial("Text.TextF", "Text.Text");
              let textBoxText = $state(serialSignal.value);
              $effect(() => {
                textBoxText = serialSignal.value; // Update local state from Crestron feedback
              });
            </script>
            <input type="text" bind:value={textBoxText}/>
            <button 
              disabled={textBoxText === serialSignal.value} 
              on:click={() => serialSignal.value = textBoxText}
            >Submit</button>
            <button 
              disabled={textBoxText === serialSignal.value} 
              on:click={() => textBoxText = serialSignal.value} 
            >Cancel</button>
            ```

### 3.3. AV Control Components (Demo Panel Sections & Controls)

This section outlines the specific AV components and their controls that will be included in the demo panel. Each will utilize the signal handling methods described above.

*   **3.3.1. System Power & Presets**
    *   **System On/Off Button:** A master digital toggle button (`useDigital` with pulse) with feedback indication for overall system power state.
    *   **"Start Meeting" Preset Button:** A digital pulse button (`pulseDigital`) to trigger a Crestron macro for a typical meeting setup (e.g., turns on display, selects default source, sets lights to a preset level).
    *   **"End Meeting" Preset Button:** A digital pulse button (`pulseDigital`) to trigger a Crestron macro to shut down the AV system.
    *   **Status Indication:** Clear visual feedback (e.g., text label, icon color) for the system power state (On/Off) using a digital feedback join.

*   **3.3.2. Display Control(s)** (e.g., for a projector or large format display)
    *   **Power On/Off Buttons:** Separate digital pulse buttons (`pulseDigital`) or a toggle button (`useDigital`) for display power, with feedback.
    *   **Source Selection Buttons:** A set of digital pulse buttons (`pulseDigital`) for selecting input sources (e.g., "HDMI 1", "Wireless", "PC").
    *   **Active Source Indication:** Visual feedback (e.g., highlighting the selected button, displaying source name via a serial join) to show the currently active source.
    *   **Volume Control:** If the display has its own audio, an analog fader/slider (`useAnalog`) and mute toggle (`useDigital`) as described in the Audio Control section.
    *   **Picture Mute (Video Mute) On/Off:** A digital toggle button (`useDigital`) with feedback to blank the display output without turning it off.
    *   **(Optional) Aspect Ratio Control:** Digital pulse buttons (`pulseDigital`) to cycle through aspect ratio presets if supported by the display and control system.

*   **3.3.3. Audio Control**
    *   **Main Volume Control:** An analog fader/slider (`useAnalog`) for adjusting the main program audio level. This should include a numeric display of the current level (0-100%) derived from the analog feedback join. Accompanying press-and-hold digital buttons (`useDigital`) for ramp up/down.
    *   **Main Mute On/Off Button:** A digital toggle button (`useDigital`) with clear status indication (e.g., icon change, color change) for muting/unmuting main audio.
    *   **Microphone Volume Control(s):** If applicable, individual or group microphone volume controls, similar to the main volume control (`useAnalog` faders/sliders, numeric display, ramp buttons).
    *   **Microphone Mute On/Off:** Individual and/or master microphone mute digital toggle buttons (`useDigital`) with clear status indication.
    *   **Audio Source Selection:** If audio sources can be selected independently of video sources, a set of digital pulse buttons (`pulseDigital`) with active source indication.

*   **3.3.4. Lighting Control**
    *   **Lighting Scene Selection:** A set of digital pulse buttons (`pulseDigital`) for common lighting scenes (e.g., "Presentation", "Meeting", "Video Call", "Off"). Feedback to indicate the active scene.
    *   **Individual Zone Control (if applicable):**
        *   **On/Off Buttons:** Digital toggle buttons (`useDigital`) for each lighting zone.
        *   **Dimmer Control:** Analog faders/sliders (`useAnalog`) or press-and-hold digital ramp buttons (`useDigital`) for adjusting brightness levels in each zone.
        *   **Current Brightness Level Display:** Numeric display (0-100%) of each zone's brightness, derived from an analog feedback join.

*   **3.3.5. Shades/Blinds Control**
    *   **Shade Group Selection:** If multiple shade groups exist, buttons to select the group to control.
    *   **Open/Close/Stop Buttons:** Digital pulse buttons (`pulseDigital`) for each action (Open, Close, Stop) for the selected shades/blinds.
    *   **(Optional) Preset Position Buttons:** Digital pulse buttons (`pulseDigital`) for preset positions (e.g., "Half Open", "Fully Closed").

*   **3.3.6. Camera Control (for Video Conferencing)**
    *   **Camera Power On/Off:** Digital toggle button (`useDigital`) with feedback.
    *   **Camera Privacy Mute On/Off:** Digital toggle button (`useDigital`) with status indication to enable/disable camera video transmission.
    *   **PTZ Controls:** Press-and-hold digital buttons (`useDigital`) for Pan (Left/Right), Tilt (Up/Down), and Zoom (In/Out).
    *   **Camera Preset Selection:** Digital pulse buttons (`pulseDigital`) to recall saved camera positions.

*   **3.3.7. Source Device Control (e.g., Blu-ray, Media Player)**
    *   **Transport Controls:** Digital pulse buttons (`pulseDigital`) for Play, Pause, Stop, Rewind, Fast Forward, Skip Back, Skip Forward.
    *   **Menu Navigation:** Digital pulse buttons (`pulseDigital`) for Up, Down, Left, Right, Enter, Menu, Exit/Back.

*   **3.3.8. Status Display Area**
    *   A dedicated area on the UI for displaying critical system status information at a glance. This could include:
        *   System Power State (Digital Feedback)
        *   Currently Selected Video Source (Serial Feedback)
        *   Main Audio Mute Status (Digital Feedback)
        *   Current Time (Potentially from a Crestron serial join or system time if accessible).

## 4. External Interface Requirements

### 4.1. User Interfaces

*   Primary GUI (built with Svelte).
*   Design Principles (modern, clear, responsive).

### 4.2. Hardware Interfaces

*   Crestron CH5 compatible touch panel.
*   Crestron control processor (3-Series, 4-Series, or VC-4).
*   Various AV devices (displays, audio systems, lights, shades, cameras) controlled via the Crestron processor.

### 4.3. Software Interfaces

*   `@crestron/ch5-crcomlib` (Crestron Communication Library).
*   `ch5-svelte` wrapper library.
*   (Optional) `@crestron/ch5-webxpanel`.
*   Vite Build Tool.
*   `ch5-cli` Tool.

### 4.4. Communication Interfaces

*   TCP/IP Network Communication.
*   Crestron CH5 Protocol.
*   Signal Joins (strictly mapped via Contract File).
*   Contract File (`contract.cse2j`) is mandatory for signal definition and mapping.

## 5. Non-Functional Requirements

### 5.1. Performance

*   UI must be responsive to touch inputs with minimal latency (<200ms).
*   Real-time feedback from the control system should update on the UI promptly (<500ms for typical changes).

### 5.2. Reliability

*   Stable communication link with the Crestron processor.
*   Graceful handling of communication errors or disconnections (e.g., visual indication).
*   Panel should recover automatically upon reconnection if possible.

### 5.3. Usability

*   Interface must be highly intuitive and easy to learn for non-technical users.
*   Clear labeling and iconography.
*   Consistent layout and interaction patterns.
*   Minimal steps to achieve common tasks.
*   Error Prevention.
*   User Satisfaction.

### 5.4. Maintainability

*   Code Readability and Structure.
*   Modularity.
*   TypeScript Best Practices.
*   Ease of Updates.
*   Configuration Management (especially contract files).
*   Debugging Support.

### 5.5. Security

*   If Web XPanel is used with authentication, it should be secure.
*   No direct exposure of sensitive system information on the UI unless necessary and secured.

### 5.6. Scalability

*   The architecture should allow for the addition of more AV components or control pages in the future with reasonable effort.

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

At this point, you may wish to install other UI libraries or tools such as font libraries.

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

The final path to the contract file within the project should be: `[Project Root]/public/config/contract.cse2j`.

**Note:** This setup makes the contract file available during development when using the Vite development server (`vite dev` or `npm run dev`). To use contracts with a Crestron touch screen, the contract file path must be correctly specified in the `project-config.json` file during the packaging process (see Section 6.5: Deployment to Touch Panel).

### 6.4. Web XPanel Setup

Web XPanel support allows testing the UI in a browser as if it were a touch panel. It needs to be installed and configured separately.

1.  **Install `@crestron/ch5-webxpanel`:**

    ```bash
    npm install @crestron/ch5-webxpanel
    ```

2.  **Configure Web XPanel in `src/main.ts`:**

    Add the following code to `src/main.ts`, below the last import statement. Adjust the `host`, `ipId`, `roomId`, and `authToken` values to match your specific Crestron control system configuration.

    ```typescript
    import { getWebXPanel, runsInContainerApp } from '@crestron/ch5-webxpanel';

    // ... (your Svelte app initialization, e.g., import App from './App.svelte'; new App(...);)

    const { isActive, WebXPanel, WebXPanelConfigParams } = getWebXPanel(!runsInContainerApp());
    const config: Partial<typeof WebXPanelConfigParams> = {
      host: "Control-system-IP", // Replace with your control system's IP address
      ipId: "0x03",               // Replace with your panel's IP ID (hexadecimal)
      roomId: "VC4ROOM",           // Optional: Replace with your VC-4 Room ID if applicable
      authToken: "eyJ....."       // Optional: Replace with your auth token if authentication is enabled
    };

    if (isActive) {
      WebXPanel.initialize(config);
    }
    ```

    **Web XPanel Connection Notes:**
    *   **Self-Signed Certificates:** You may need to accept the self-signed TLS certificate of the control system's WebSocket server in your browser. This can often be done by navigating directly to the control system's WebSocket server address (e.g., `https://<control-system-ip>:49200` for VC-4) and accepting the certificate warning.
    *   **Control System Admin Page:** For hardware control systems, accessing the admin page via HTTPS and accepting its certificate may be sufficient.
    *   **4-Series `webserver allowsharedsession`:** On Crestron 4-Series hardware, you might need to issue the command `webserver allowsharedsession` via a console connection (Toolbox, SSH) to allow origins other than the control system itself to connect to the WebSocket server. Refer to official Crestron documentation for details.

### 6.5. Deployment to Touch Panel

*   **Build Project:** Run the build command: `npm run build`.
*   **Create `project-config.json`:** Create this file in the project root to configure the `ch5-cli` packaging process.
    *   *Example `project-config.json`:*
        ```json
        {
          "projectType": "controlSystem",
          "name": "my-ch5-svelte-panel",
          "version": "1.3.0",
          "description": "Crestron CH5 Svelte Demo Panel",
          "outputName": "my-ch5-svelte-panel-v1.3.0",
          "sourcePath": "dist",
          "output": "package",
          "contract": "public/config/contract.cse2j",
          "assets": [
            {
              "sourcePath": "public/assets", // Example for other assets
              "outputPath": "assets"
            }
          ]
        }
        ```
        (Ensure `sourcePath` points to your Vite build output directory, typically `dist`. Adjust `outputName`, `version`, and `contract` path as needed.)
*   **Package Project:** Use the `ch5-cli` tool to create the `.ch5z` archive.
    *   *Command:* `ch5-cli archive project`
*   **Load to Panel:** The generated `.ch5z` file (found in the `package` directory) can then be uploaded to the Crestron touch panel via standard methods (e.g., Crestron Toolbox, web interface).

### 6.6. SvelteKit Considerations

While plain Svelte with Vite is recommended for this project, if SvelteKit is chosen for specific reasons:

*   **Disable SSR:** Server-Side Rendering must be disabled for routes using `ch5-svelte` as `CrComLib` is browser-only.
    *   In `+layout.ts` or `+page.ts`: `export const ssr = false; export const prerender = false;`
*   **`CrComLib` in `app.html`:** Import `cr-com-lib.js` in `src/app.html` (similar to `index.html` example).
*   **Browser-Only Initialization:** Ensure WebXPanel and any direct `CrComLib` interactions are initialized only within the browser environment (e.g., using `if (browser)` from `$app/environment`).

## 7. Future Considerations / Potential Enhancements

This section lists potential features or improvements that are out of scope for the initial version but could be considered for future development.

*   **Theming:** Implement dynamic theming capabilities (e.g., light/dark mode) that could be user-selectable or automatically adapt based on panel settings or ambient light (if such feedback is available).
*   **User Roles & PIN Protection:** Introduce basic user roles or PIN code protection for accessing advanced settings or administrative functions on the panel.
*   **Dynamic UI Generation:** Explore possibilities for dynamically generating parts of the UI based on room configuration data received from the Crestron processor, allowing for more flexible deployments across different room setups.
*   **Usage Logging/Analytics:** Implement logging of user interactions or critical system events for troubleshooting or understanding usage patterns (requires backend support on the control system or an external logging service).
*   **Multi-language Support:** Add capabilities for displaying UI text in multiple languages, selectable by the user.
*   **Enhanced Accessibility Features:** More in-depth implementation of accessibility features (e.g., ARIA attributes, keyboard navigation support if applicable to the panel hardware).
*   **Custom Component Library:** Develop a more extensive library of reusable Svelte components specifically styled and tailored for Crestron AV control interfaces.

## 8. Glossary

This section will be populated with key terms, signal names, and Svelte-specific concepts as they become central to the project. Examples include:

*   **`useAnalog(feedbackJoin: string, setJoin?: string)`:** `ch5-svelte` function to interact with an analog signal.
*   **`useDigital(feedbackJoin: string, setJoin?: string)`:** `ch5-svelte` function to interact with a digital signal. Its `.value` can be set, and it has a `.pulse()` method.
*   **`useSerial(feedbackJoin: string, setJoin?: string)`:** `ch5-svelte` function to interact with a serial signal.
*   **`pulseDigital(setJoin: string)`:** `ch5-svelte` function to send a momentary true/false pulse to a digital signal.
*   **`setAnalog(setJoin: string, value: number)`:** `ch5-svelte` function to set an analog signal value.
*   **`setDigital(setJoin: string, value: boolean)`:** `ch5-svelte` function to set a digital signal state.
*   **`setSerial(setJoin: string, value: string)`:** `ch5-svelte` function to send a string to a serial signal.
*   **`$state` (Svelte Rune):** Declares a reactive state variable. Used internally by `ch5-svelte` for signal values.
*   **`$derived` (Svelte Rune):** Creates a reactive value derived from other reactive states.
*   **`$effect` (Svelte Rune):** Runs a side effect that re-runs whenever its dependencies change.
*   **Join (Crestron):** A numerical identifier (e.g., analog join 1, digital join 10, serial join 5) that links a UI element to a specific signal in the Crestron control program.
*   **Signal Name (Contract):** A human-readable alias for a join, defined in the `contract.cse2j` file (e.g., "Audio.Master.VolumeF", "Lights.Scene.Meeting").

## 9. References

This section lists all key documentation and resources relevant to the project.

*   **`ch5-svelte` Main Documentation & Examples:**
    *   GitHub Repository & README: [https://github.com/m3-technology-group/ch5-svelte](https://github.com/m3-technology-group/ch5-svelte)
    *   Hosted Documentation (Modules, Examples): [https://m3-technology-group.github.io/ch5-svelte/modules.html](https://m3-technology-group.github.io/ch5-svelte/modules.html)
    *   Analog Signal Examples: [https://m3-technology-group.github.io/ch5-svelte/documents/Analog_Signal_Examples.html](https://m3-technology-group.github.io/ch5-svelte/documents/Analog_Signal_Examples.html)
    *   Digital Signal Examples: [https://m3-technology-group.github.io/ch5-svelte/documents/Digital_Signal_Examples.html](https://m3-technology-group.github.io/ch5-svelte/documents/Digital_Signal_Examples.html)
    *   Serial Signal Examples: [https://m3-technology-group.github.io/ch5-svelte/documents/Serial_Signal_Examples.html](https://m3-technology-group.github.io/ch5-svelte/documents/Serial_Signal_Examples.html)
*   **Crestron Official Documentation (General CH5 & Developer Resources):**
    *   Crestron Developer Portal: [https://developer.crestron.com/](https://developer.crestron.com/)
    *   CH5 Resource Page (Often linked from Crestron sites, search for "Crestron CH5 SDK" or similar for latest links).
    *   `ch5-cli` tool documentation (Typically found on the Crestron developer portal or SDK downloads).
    *   `@crestron/ch5-crcomlib` documentation (If available separately, often part of the CH5 SDK).
    *   `@crestron/ch5-webxpanel` documentation.
*   **Svelte Documentation:**
    *   Svelte Main Website: [https://svelte.dev/](https://svelte.dev/)
    *   Svelte 5 Runes Documentation: [https://svelte.dev/docs/runes](https://svelte.dev/docs/runes) (or latest Svelte 5 docs link)
    *   Svelte API Reference: [https://svelte.dev/docs/svelte](https://svelte.dev/docs/svelte)
*   **Vite Documentation:**
    *   Vite Main Website: [https://vitejs.dev/](https://vitejs.dev/)
*   **TypeScript Documentation:**
    *   TypeScript Main Website: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)

_(Note: Specific URLs for Crestron official documentation can change. The developer portal is the best starting point.)_
