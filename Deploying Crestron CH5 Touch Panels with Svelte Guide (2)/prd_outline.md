# Product Requirements Document (PRD) Outline: Crestron CH5 Svelte Demo Panel

## 1. Introduction

1.1. **Purpose of the Document**
    - To define the requirements for a demonstration touch panel interface for controlling an audio-visual (AV) system.
1.2. **Project Goals**
    - Create a comprehensive demo panel showcasing a wide range of AV control components.
    - Build the GUI using Svelte and the `ch5-svelte` library.
    - Ensure bidirectional communication with Crestron control systems.
    - Provide an intuitive user experience for controlling a conference room AV setup.
1.3. **Target Audience (for the PRD)**
    - Project Manager
    - Development Team
    - QA Team
    - Stakeholders
1.4. **Target End-User (for the Demo Panel)**
    - Non-technical individuals needing to control AV equipment in a conference room.
1.5. **Scope**
    - **In Scope:** Design and development of the Svelte-based touch panel GUI, integration with Crestron signals (analog, digital, serial) via `ch5-svelte`, implementation of controls for various AV components as listed, adherence to the provided documentation for `ch5-svelte`.
    - **Out of Scope:** Crestron control system programming (SIMPL Windows/C#), hardware installation, network infrastructure setup beyond basic assumptions.
1.6. **Definitions, Acronyms, and Abbreviations**
    - PRD: Product Requirements Document
    - AV: Audio-Visual
    - GUI: Graphical User Interface
    - CH5: Crestron HTML5
    - CrComLib: Crestron Communication Library
    - IP ID: IP Identifier (for Crestron communication)
    - cse2j: Crestron SIMPL E-Control to JSON (contract file)
    - ch5z: Crestron HTML5 Zip archive (for deployment)

## 2. Overall Description

2.1. **Product Perspective**
    - The demo panel will serve as a user-friendly interface to a Crestron control system, demonstrating the capabilities of Svelte for CH5 development.
2.2. **Product Features (High-Level)**
    - Intuitive touch-based control of AV system components.
    - Real-time feedback from the Crestron system.
    - Comprehensive set of controls for typical conference room AV equipment.
    - Built with modern web technologies (Svelte, TypeScript).
2.3. **User Characteristics**
    - Non-technical, infrequent users.
    - Expect a simple, clear, and responsive interface.
    - Primary goal is to easily manage the AV environment for meetings.
2.4. **Operating Environment**
    - Crestron CH5 compatible touch panel.
    - Connected to a Crestron 3-Series/4-Series control system or VC-4 server.
    - Network connectivity between the panel and the control system.
2.5. **Design and Implementation Constraints**
    - Must use Svelte (preferably Svelte 5 with Runes as per `ch5-svelte` library).
    - Must use the `ch5-svelte` library for Crestron signal communication.
    - Must follow the setup and deployment guidelines from the `ch5-svelte` documentation.
    - UI must be designed for touch interaction.
2.6. **Assumptions and Dependencies**
    - A functional Crestron control system is available for testing and deployment.
    - Necessary Crestron signals (joins) are defined in the control system program and contract file.
    - Network infrastructure supports communication between the panel and the control system.
    - The `ch5-cli` tool is available for packaging.

## 3. System Features (Functional Requirements)

3.1. **GUI Framework & General UI**
    - 3.1.1. Svelte-based application structure.
    - 3.1.2. Responsive design suitable for Crestron touch panels.
    - 3.1.3. Intuitive navigation (e.g., main page, sub-pages for categories like Display, Audio, Lights).
    - 3.1.4. Clear visual feedback for user actions and system status.
    - 3.1.5. Use of TypeScript for development.

3.2. **Crestron Communication (via `ch5-svelte`)**
    - 3.2.1. Bidirectional communication for all control signals.
    - 3.2.2. **Analog Signals:**
        - Read and display analog values (e.g., volume level as a number or percentage).
        - Set analog values (e.g., adjusting volume with a slider).
        - Implement progress bars based on analog feedback.
        - Implement faders/sliders with two-way binding.
        - Implement numeric input fields for analog values.
    - 3.2.3. **Digital Signals:**
        - Send pulse commands (e.g., simple trigger buttons).
        - Implement toggle buttons with feedback (e.g., mute on/off with state indication).
        - Implement press-and-hold buttons (e.g., volume ramp up/down).
        - Use digital signals to conditionally show/hide UI elements.
        - Implement HTML checkbox elements with feedback.
    - 3.2.4. **Serial Signals:**
        - Display text feedback from serial signals (e.g., current source name, system messages).
        - Implement settable text fields for sending serial commands.
        - Implement settable text fields with explicit submit/cancel buttons.

3.3. **AV Control Components (Demo Panel Sections & Controls)**
    - 3.3.1. **System Power & Presets**
        - System On/Off button (master control).
        - "Start Meeting" preset (e.g., turns on display, sets default source, adjusts lights/shades).
        - "End Meeting" preset (e.g., turns off all AV equipment).
        - Status indication for system power state.
    - 3.3.2. **Display Control(s)**
        - Power On/Off for display(s).
        - Source Selection (e.g., buttons for HDMI 1, HDMI 2, Wireless Presenter, PC).
        - Active source indication.
        - Volume control (if display has integrated audio, otherwise in Audio section).
        - Mute/Unmute for display audio.
        - Picture Mute (Video Mute) On/Off.
        - (Optional) Aspect Ratio control.
    - 3.3.3. **Audio Control**
        - Main Volume Control (slider/fader with numeric display, up/down buttons).
        - Main Mute On/Off button with status.
        - Microphone Volume Control(s) (if applicable, similar to main volume).
        - Microphone Mute On/Off (individual and/or all mics) with status.
        - Audio Source Selection (if separate from video source).
    - 3.3.4. **Lighting Control**
        - Lighting Scene Selection (e.g., buttons for "Presentation", "Meeting", "Video Call", "Off").
        - Individual Zone Control (if applicable):
            - On/Off buttons for each zone.
            - Dimmer control (slider/fader or up/down buttons) for each zone.
            - Current brightness level display for each zone.
    - 3.3.5. **Shades/Blinds Control**
        - Shade Group Selection (if multiple groups).
        - Open/Close/Stop buttons for selected shades.
        - (Optional) Preset position buttons (e.g., Half Open).
    - 3.3.6. **Camera Control (for Video Conferencing)**
        - Camera Power On/Off.
        - Camera Privacy Mute On/Off with status.
        - PTZ Controls (Up, Down, Left, Right, Zoom In, Zoom Out) - press-and-hold for continuous movement.
        - Camera Preset Selection (buttons for saved camera positions).
    - 3.3.7. **Source Device Control (e.g., Blu-ray, Media Player)**
        - Transport Controls (Play, Pause, Stop, Rewind, Fast Forward, Skip Back, Skip Forward).
        - Menu Navigation (Up, Down, Left, Right, Enter, Menu, Exit/Back).
    - 3.3.8. **Status Display Area**
        - Prominent display of critical status information (e.g., System Power, Current Source, Mute States, Time).

## 4. External Interface Requirements

4.1. **User Interfaces**
    - Primary interface will be the Crestron CH5 touch panel GUI.
    - Design should be consistent with modern UI/UX principles for touch devices.
4.2. **Hardware Interfaces**
    - Crestron CH5 compatible touch panel.
    - Crestron control processor (3-Series, 4-Series, or VC-4).
    - Various AV devices (displays, audio systems, lights, shades, cameras) controlled via the Crestron processor.
4.3. **Software Interfaces**
    - `@crestron/ch5-crcomlib` (Crestron Communication Library).
    - `ch5-svelte` wrapper library.
    - (Optional) `@crestron/ch5-webxpanel` for browser-based testing/emulation.
4.4. **Communication Interfaces**
    - TCP/IP communication between the touch panel and the Crestron control processor.
    - Communication protocol as defined by Crestron CH5 standards.

## 5. Non-Functional Requirements

5.1. **Performance**
    - UI must be responsive to touch inputs with minimal latency (<200ms).
    - Real-time feedback from the control system should update on the UI promptly (<500ms for typical changes).
5.2. **Reliability**
    - Stable communication link with the Crestron processor.
    - Graceful handling of communication errors or disconnections (e.g., visual indication).
    - Panel should recover automatically upon reconnection if possible.
5.3. **Usability**
    - Interface must be highly intuitive and easy to learn for non-technical users.
    - Clear labeling and iconography.
    - Consistent layout and interaction patterns.
    - Minimal steps to achieve common tasks.
5.4. **Maintainability**
    - Svelte code should be well-structured, componentized, and commented.
    - Adherence to TypeScript best practices.
    - Easy to update or add new components/features.
5.5. **Security**
    - If Web XPanel is used with authentication, it should be secure.
    - No direct exposure of sensitive system information on the UI unless necessary and secured.
5.6. **Scalability**
    - The architecture should allow for the addition of more AV components or control pages in the future with reasonable effort.

## 6. Technical Implementation Details (from `ch5-svelte` README)

6.1. **Project Setup**
    - Initialize project using Vite with the `svelte-ts` template.
6.2. **Dependency Installation**
    - `ch5-svelte`
    - `@crestron/ch5-crcomlib`
    - `vite-plugin-static-copy` (as a dev dependency).
6.3. **Vite Configuration (`vite.config.ts`)**
    - Configure `viteStaticCopy` to copy `cr-com-lib.js` to the build directory.
6.4. **HTML Setup (`index.html` or `app.html` for SvelteKit)**
    - Include `<script src="./cr-com-lib.js"></script>` in the `<head>`.
6.5. **Contract File**
    - Place `contract.cse2j` in `[Project Root]/public/config/`.
6.6. **Web XPanel Setup (Optional, for development/testing)**
    - Install `@crestron/ch5-webxpanel`.
    - Configure in `src/main.ts` with control system IP, IP ID, Room ID.
6.7. **Deployment to Touch Panel**
    - Build the project (`npm run build`).
    - Create `project-config.json` specifying project type, name, sourcePath (`dist`), outputName, contract path.
    - Use `ch5-cli archive project` to create the `.ch5z` file.
6.8. **SvelteKit Considerations (If used, though plain Svelte is recommended)**
    - Disable SSR (`export const ssr = false; export const prerender = false;`).
    - Ensure WebXPanel initializes only in the browser environment.

## 7. Future Considerations / Potential Enhancements

7.1. Theming (Light/Dark mode based on panel settings or time of day).
7.2. User roles or PIN protection for advanced settings.
7.3. Dynamic UI generation based on room configuration.
7.4. Logging of user interactions or system events.

## 8. Glossary

_(To be populated with terms as they arise during development, e.g., specific signal names, Svelte concepts like Runes, $state, $derived, $effect)._

## 9. References

9.1. `ch5-svelte` Documentation: [https://m3-technology-group.github.io/ch5-svelte/](https://m3-technology-group.github.io/ch5-svelte/)
9.2. Crestron CH5 Developer Documentation (External Link from `ch5-svelte` README).
9.3. Svelte 5 Documentation.

