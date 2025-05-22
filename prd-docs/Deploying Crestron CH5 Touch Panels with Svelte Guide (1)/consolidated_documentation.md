# README | ch5-svelte

[]()

# Crestron CH5 Wrapper for Svelte

**Cybernetically enhanced Crestron UIs**

Extend the functionality of the @crestron/ch5-crcomlib library with the power of Svelte 5 Runes. This library provides a simple and easy to use interface for using crestron signals using the svelte 5 runes API.

This library does not expose any Crestron CH-5 Components directly. Instead, it provides a simple interface for using the signals from the Crestron CH-5 components in a Svelte application. There are numerous Svelte UI component libraries that provide feature rich components.

Note: This library is **not** sponsored, supported or endorsed by Crestron Electronics Inc. Crestron True Blue Support cannot provide support for this library, or any issues that may arise from its use.

[]()

## Features

*   📦 Easy to use - Built for A/V programmers.
*   💎 Svelte 5 Runes - Makes use of the Runes API in svelte 5.
*   📡 Realtime Updates - Automatically updates UI as control system feedback changes.
*   🤖 Automatic Subscription Management - Subscription and cleanup of signals handled automatically by Svelte.
*   ✨ Full TypeScript Support - Better code completion and error checking.
*   ✅ Open Source - Licensed under the Apache 2.0 License.

[]()

## Getting Started

[]()

### Prerequisites

*   Crestron 3/4-Series Control System or VC-4 Server.
*   Crestron ch5-cli tool installed globally - [Link to Crestron Docs - External]()

> Note: it is NOT recommended to install the CH5 VS Code extension, unless you will be using native CH5 components. The extension is not required for using this library.

[]()

### Project Creation

It is **strongly recommended** that you start with a plane Svelte project through Vite. (as opposed to SvelteKit - see the section on SvelteKit below if you must use SvelteKit).

Create a new Svelte Project with Vite:

    npm create vite@latest my-ch5-ui -- --template svelte-tscd my-ch5-uinpm install
    

Replace `my-ch5-ui` with the name of your project.

At this point, you may wish to install other UI libraries or tools such as TailwindCSS.

[]()

### Installation

Due to how the CrComLib binds itself to the window object, there is some manual setup required to use the library in a Svelte project. We must also statically copy the the CrComLib to the project root on build otherwise it will be omitted in build bundles.

First, install this wrapper, and the the CrComLib:

    npm install ch5-svelte @crestron/ch5-crcomlib
    

Next, install the vite-plugin-static-copy plugin as a dev dependency:

    npm install -d vite-plugin-static-copy
    

Next, we will need to modify the `vite.config.ts` file to copy the CrComLib to the project root on build. This is done by importing the plugin and adding it to the plugins array.

This is done in the `vite.config.ts` file in the root of your project.

    import { defineConfig } from 'vite'import { svelte } from '@sveltejs/vite-plugin-svelte'import { viteStaticCopy } from 'vite-plugin-static-copy';// https://vitejs.dev/config/export default defineConfig({  plugins: [    svelte(),    //Add this to copy the cr-com-lib.js file to the build directory    viteStaticCopy({      targets: [        {          src: 'node_modules/@crestron/ch5-crcomlib/build_bundles/umd/cr-com-lib.js',          dest: ''        }      ]}),  ],})
    

The CrComLib must be manually imported in a script tag in the `index.html` file. This is because the CrComLib does not have a default export, and instead binds itself to the window object.

Add the following line to the head of your index.html file. (`./index.html`)

    <script src="./cr-com-lib.js"></script>
    

Here is an example of a complete index.html file with the CrComLib imported:

index.html:

    <!doctype html><html lang="en">  <head>    <meta charset="UTF-8" />    <link rel="icon" type="image/svg+xml" href="/vite.svg" />    <meta name="viewport" content="width=device-width, initial-scale=1.0" />    <title>Vite + Svelte + TS</title>    <!-- Import CrComLib here -->	<script src="./cr-com-lib.js"></script>  </head>  <body>    <div id="app"></div>    <script type="module" src="/src/main.ts"></script>  </body></html>
    

[]()

### Contract Setup

If you are using the Contract Editor to define signal names, you will need to place the generated `cse2j` file in the `public/config` directory of your project. The `cse2j` file should be renamed `contract.cse2j`. You will need to create the `config` directory in the `public` directory.

The final path to the `contract.cse2j` file should be `[Project Root]/public/config/contract.cse2j`.

> Note: This only makes the contract available when using the development server (`vite dev`). To use contracts with a Crestron touch screen, you will need to follow the instructions to pack the project below in Packing for Crestron Touch Screens

[]()

### Web XPanel Setup

WebXpanel support will need to be installed separately.

Install the WebXPanel support package from npm:

    npm install @crestron/ch5-webxpanel
    

Next configure the XPanel. This can be done in the `src/main.ts` file. Add the following code to the `src/main.ts` file below the last import statement, changing the values to match your system.

    import {getWebXPanel, runsInContainerApp} from '@crestron/ch5-webxpanel'
    const { isActive, WebXPanel, WebXPanelConfigParams } = getWebXPanel(!runsInContainerApp());
    const config: Partial<typeof WebXPanelConfigParams> = {
      host: "Control-system-IP",
      ipId: "0x03",
      roomId: "VC4ROOM",
      // authToken: "some-long-token-from-the-control-system-authentication-settings"
    };
    if (isActive) {
      WebXPanel.initialize(config);
    }

[]()

## Usage

This library exposes a set of functions that can be used to interact with the Crestron control system. These functions are designed to be used in Svelte components, and will automatically update the UI when the control system feedback changes.

For a full list of available functions, see the API documentation.

Here is an example of how to use the `useCrestronAnalog` function to display the value of an analog signal:

    <script lang="ts">
      import { useCrestronAnalog } from 'ch5-svelte';
      const analogValue = useCrestronAnalog('Analog-Signal-Name-1');
    </script>

    <h1>Analog Value: {$analogValue}</h1>

Here is an example of how to use the `useCrestronDigital` function to display the value of a digital signal, and how to use the `pulseDigital` function to send a pulse to a digital signal:

    <script lang="ts">
      import { useCrestronDigital, pulseDigital } from 'ch5-svelte';
      const digitalValue = useCrestronDigital('Digital-Signal-Name-1');
    </script>

    <h1>Digital Value: {$digitalValue}</h1>
    <button on:click={() => pulseDigital('Digital-Signal-Name-1')}>Pulse Digital Signal</button>

Here is an example of how to use the `useCrestronSerial` function to display the value of a serial signal, and how to use the `sendSerial` function to send a string to a serial signal:

    <script lang="ts">
      import { useCrestronSerial, sendSerial } from 'ch5-svelte';
      const serialValue = useCrestronSerial('Serial-Signal-Name-1');
    </script>

    <h1>Serial Value: {$serialValue}</h1>
    <button on:click={() => sendSerial('Serial-Signal-Name-1', 'Hello World!')}>Send Serial Signal</button>

[]()

## Packing for Crestron Touch Screens

When packing the project for a Crestron touch screen, you will need to use the `ch5-cli` tool to create a `.ch5z` archive. This archive can then be loaded onto the touch screen.

First, build the project:

    npm run build
    

Next, create a `project-config.json` file in the root of your project. This file will tell the `ch5-cli` tool how to pack the project. Here is an example of a `project-config.json` file:

    {
      "projectType": "controlsystem",
      "name": "my-ch5-ui",
      "version": "1.0.0",
      "description": "My CH5 UI",
      "outputName": "my-ch5-ui",
      "sourcePath": "dist",
      "output": "package",
      "contract": "public/config/contract.cse2j",
      "assets": [
        {
          "sourcePath": "public/assets",
          "outputPath": "assets"
        }
      ]
    }

Replace `my-ch5-ui` with the name of your project. Make sure the `sourcePath` points to your build directory (usually `dist`). If you are using a contract, make sure the `contract` path points to your `contract.cse2j` file.

Finally, run the `ch5-cli` tool to pack the project:

    ch5-cli archive project
    

This will create a `.ch5z` archive in the `package` directory of your project. This archive can then be loaded onto the touch screen.

[]()

## SvelteKit

This library can be used with SvelteKit, but there are some additional considerations.

SvelteKit uses Server Side Rendering (SSR) by default. The CrComLib is not designed to be used in a Node.js environment, and will throw errors if it is imported on the server. To use this library with SvelteKit, you will need to disable SSR for any routes that use this library.

This can be done by adding the following code to the `+layout.ts` or `+page.ts` file for the route you want to disable SSR for:

    export const ssr = false;
    export const prerender = false;

Additionally, the CrComLib must be manually imported in a script tag in the `app.html` file. This is because the CrComLib does not have a default export, and instead binds itself to the window object.

Add the following line to the head of your `app.html` file. (`src/app.html`)

    <script src="/cr-com-lib.js"></script>

Here is an example of a complete `app.html` file with the CrComLib imported:

app.html:

    <!doctype html>
    <html lang="en">
    	<head>
    		<meta charset="utf-8" />
    		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
    		<meta name="viewport" content="width=device-width, initial-scale=1" />
    		%sveltekit.head%
    		<!-- Import CrComLib here -->
    		<script src="/cr-com-lib.js"></script>
    	</head>
    	<body data-sveltekit-preload-data="hover">
    		<div style="display: contents">%sveltekit.body%</div>
    	</body>
    </html>

Finally, you will need to ensure that the WebXPanel is only initialized when running on a browser.

Here is an example of a complete `src/routes/+layout.ts` file with SSR and pre-rendering disabled, as well as the WebXPanel setup (using a .env file for the configuration):

    import { browser } from '$app/environment';
    import { PUBLIC_CS_IP, PUBLIC_IP_ID, PUBLIC_ROOM_ID, PUBLIC_TOKEN } from '$env/static/public';

    //CrComlib runs in the browser attached to the window object, so we must globally disable SSR and prerendering
    export const ssr = false;
    export const prerender = false;

    //Make sure the WebXPanel is only initialized in the browser
    if (browser) {
        import('@crestron/ch5-webxpanel').then(({ getWebXPanel, runsInContainerApp }) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { isActive, WebXPanel, WebXPanelConfigParams } = getWebXPanel(!runsInContainerApp());

            const config: Partial<typeof WebXPanelConfigParams> = {
                host: PUBLIC_CS_IP,
                ipId: PUBLIC_IP_ID,
                roomId: PUBLIC_ROOM_ID,
                authToken: PUBLIC_TOKEN
            };

            if (isActive) {
                WebXPanel.initialize(config);
            }
        });
    }

# index | ch5-svelte

### Settings

Member Visibility

*   Protected
*   Inherited
*   External

ThemeOSLightDark

### On This Page

Interfaces

AnalogSignalDigitalSignalSerialSignal

Functions

pulseDigitalsetAnalogsetDigitalsetSerialuseAnaloguseDigitaluseSerial
# Analog Signal Examples | ch5-svelte

[]()

This is a collection of example uses of analog signals. Only basic HTML constructs are used, and no styling is provided. Pick your favorite CSS framework, and or Svelte component library and style it as you like.

[]()

## Progress Bar

    <script lang="ts">  import { useAnalog } from 'ch5-svelte';  const progress = useAnalog("ramp.levelF")</script><progress value={progress.value} max="65535"></progress>
    

`useAnalog` provides an analog signal object that contains a single property `value`. `value` is a `$state<number>` rune that will automatically update in real time when used in a component.

Here we use the HTML Progress element and pass in `progress.value` and set the max to 65535 to display a dynamically updated progress bar that ranges form `0%` ot `0d` to `100%` or `65535d`.

[]()

## Fader/Slider

    <script lang="ts">  import { useAnalog } from 'ch5-svelte';  const fader = useAnalog("ramp.levelF","ramp.level")</script><input type="range" bind:value={fader.value} min="0" max="65535"/>
    

`useAnalog` can optionally take two arguments. The first argument is the signal to read (Feedback from control system), and the second argument is the signal to write (event to control system). When the `value` property is read from, the value ui dynamically updated based on the real-time value of the feedback signal. when the `value` property is written to, the value is transmitted to the control system using the signal name specified in the second argument to `useAnalog`. If only one signal name is passed into `useAnalog` the same name or join is use for both read and write.

Because the `value` property on the returned signal implements both getters and setters, we can simply bind the `value` property of a HTML Input element of type `range` to the `value` property of the analog signal object. This gives us a two-way slider that responds to control system feedback in real time.

[]()

## Fader/Slider with Up and Down Buttons.

    <script lang="ts">  import { useAnalog, useDigital } from 'ch5-svelte';  const fader = useAnalog("ramp.levelF","ramp.level")  const up = useDigital("ramp.Up")  const down = useDigital("ramp.Down")</script><button   onpointerdown={() => down.value = true}  onpointerup={() => down.value = false}  onpointerout={() => down.value = false}  oncontextmenu={(e) => e.preventDefault()}  > Volume Down </button><input type="range" bind:value={fader.value} min="0" max="65535"/><button   onpointerdown={() => up.value = true}  onpointerup={() => up.value = false}  onpointerout={() => up.value = false}  oncontextmenu={(e) => e.preventDefault()}  > Volume UP </button>
    

Because the fader already reactively responds to the control system's state, all you need to do is add a set of up and down buttons. See the Digital Examples section for an explication on how to implement a press-and-hold button.

[]()

## Numeric Input

    <script lang="ts">  import { useAnalog } from 'ch5-svelte';  const numericEntry = useAnalog("ramp.levelF","ramp.level")</script><input type="number" bind:value={numericEntry.value} min="0" max="100"/>
    

This provides a simple input field that allows a user to enter a numeric value.

[]()

## Converting and Modifying Values

    <script lang="ts">  import { useAnalog } from 'ch5-svelte';  const analogSignal = useAnalog("ramp.levelF","ramp.level")  let stringDisplay = $derived(`The Volume Level is ${Math.round(analogSignal.value/655.35)}%`)</script>{stringDisplay}

The $derived rune allows you to modify a reactive value, while preserving its reactivity. Any time the signal is updated by the control system the stringDisplay value is also updated, to include any formatting. See the official Svelte Docs for more information.
# Digital Signal Examples | ch5-svelte

[]()

This is a collection of example uses of digital signals. Only basic HTML constructs are used, and no styling is provided. Pick your favorite CSS framework, and or Svelte component library and style it as you like.

[]()

## Simple Trigger Button (No Feedback)

    <script lang="ts">  import {pulseDigital} from 'ch5-svelte';</script><button onclick={() => pulseDigital("Toggle.Toggle")}>Push It!</button>
    

Pulse Digital sends a rising edge and then a falling edge to the s
(Content truncated due to size limit. Use line ranges to read in chunks)