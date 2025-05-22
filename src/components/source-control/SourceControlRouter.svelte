<script context="module" lang="ts">
  /**
   * Extend the Window interface to include CrComLib
   */
  declare global {
    interface Window {
      CrComLib: {
        subscribeState: (type: string, key: string, callback: (value: any) => void) => string;
        unsubscribeState: (type: string, key: string, id: string) => void;
        getState: (type: string, key: string) => any;
        publishEvent: (type: string, key: string, value: any) => void;
      }
    }
  }
  
  /**
   * Declare CrComLib as an external module
   */
  declare const CrComLib: {
    subscribeState: (type: string, key: string, callback: (value: any) => void) => string;
    unsubscribeState: (type: string, key: string, id: string) => void;
    getState: (type: string, key: string) => any;
    publishEvent: (type: string, key: string, value: any) => void;
  };
  
  /**
   * Type definition for source control components map
   */
  type SourceComponentType = typeof import('./TextSource.svelte').default;
  type ComponentMap = Record<number, SourceComponentType>;
</script>

<script lang="ts">
  /**
   * Properties for the SourceControlRouter component.
   * @typedef {Object} SourceControlRouterProps
   * @property {number} [sourceId=0] - Unique numeric identifier for the source (1-255)
   * @property {string} [sourceLabel=''] - Display name for the source (e.g., 'PC', 'Laptop')
   * @property {string} [controlTypeSignalName=''] - Signal name for determining the control type
   */

  /**
   * SourceControlRouter component dynamically loads the appropriate source control component
   * based on the Crestron control type signal. This provides a way to switch between different
   * control interfaces based on the control system state.
   * 
   * @component
   * @example
   * <SourceControlRouter 
   *   sourceId={1} 
   *   sourceLabel="PC" 
   *   controlTypeSignalName="Settings.SourceCntrlIDfromcntrlSys1"
   * />
   * 
   * @see {@link https://github.com/crestron/ch5-svelte} for Crestron Svelte integration
   */
  
  // Import source control components
  import TextSource from './TextSource.svelte';
  import MediaPlayerSource from './MediaPlayerSource.svelte';
  import DocumentCameraSource from './DocumentCameraSource.svelte';
  import AirmediaSource from './AirmediaSource.svelte';
  import LectureCaptureSource from './LectureCaptureSource.svelte';
  import CameraControlSource from './CameraControlSource.svelte';
  import LaptopSource from './LaptopSource.svelte';
  import RoomPCSource from './RoomPCSource.svelte';
  
  // Import Svelte lifecycle hooks
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  
  /**
   * Unique identifier for the AV source.
   * @type {number}
   * @default 0
   * @example 1
   */
  export let sourceId: number = 0;
  
  /**
   * Display name for the source.
   * Used in the UI and for accessibility.
   * @type {string}
   * @default ''
   * @example 'PC' or 'Laptop'
   */
  export let sourceLabel: string = '';
  
  /**
   * Crestron signal name for source control type.
   * This signal determines which control interface to show.
   * @type {string}
   * @default ''
   */
  export let controlTypeSignalName: string = '';
  
  /**
   * Current control type value from Crestron.
   * Maps to the specific source control component to load.
   * @type {number}
   * @default 0
   */
  let controlType: number = 0;
  
  /**
   * Subscription ID for the control type signal.
   * Used to track and clean up subscriptions when the component is destroyed.
   * @type {string}
   */
  let subscriptionId: string = '';
  
  /**
   * Flag to indicate if there's an error with the control type signal.
   * @type {boolean}
   */
  let signalError: boolean = false;
  
  /**
   * Error message to display if something goes wrong.
   * @type {string}
   */
  let errorMessage: string = '';
  
  /**
   * Status message for debugging.
   * @type {string}
   */
  let statusMessage: string = 'Initializing source control...';
  
  /**
   * Loading state to show when retrieving the control type.
   * @type {boolean}
   */
  let isLoading: boolean = true;
  
  /**
   * Previous signal name for cleanup.
   * @type {string}
   */
  let previousSignalName: string = '';
  
  /**
   * Event dispatcher for control type changes.
   * @type {Function}
   */
  const dispatch = createEventDispatcher();
  
  /**
   * Mapping of control type values to source control components.
   * Each number corresponds to a specific type of source control interface.
   * @type {ComponentMap}
   */
  const controlTypeComponents: ComponentMap = {
    1: TextSource,
    2: MediaPlayerSource,
    3: DocumentCameraSource,
    4: AirmediaSource,
    5: LectureCaptureSource,
    6: CameraControlSource,
    7: LaptopSource,
    8: RoomPCSource
  };
  
  /**
   * Helper function to safely subscribe to a Crestron signal.
   * @param {string} signalType - The type of signal (n, b, s, etc.)
   * @param {string} signalName - The name of the signal to subscribe to
   * @param {Function} callback - The callback function to execute when the signal changes
   * @returns {string} - The subscription ID or empty string if failed
   */
  function safeSubscribe(signalType: string, signalName: string, callback: (value: any) => void): string {
    if (!signalName) {
      console.warn('No signal name provided for subscription');
      return '';
    }
    
    try {
      if (typeof CrComLib !== 'undefined') {
        return CrComLib.subscribeState(signalType, signalName, callback);
      } else {
        console.warn('CrComLib is not available for subscription');
        return '';
      }
    } catch (error) {
      console.error(`Error subscribing to ${signalName}:`, error);
      return '';
    }
  }
  
  /**
   * Helper function to safely get the state of a Crestron signal.
   * @param {string} signalType - The type of signal (n, b, s, etc.)
   * @param {string} signalName - The name of the signal to get
   * @returns {any} - The signal value or null if failed
   */
  function safeGetState(signalType: string, signalName: string): any {
    if (!signalName) {
      console.warn('No signal name provided for getState');
      return null;
    }
    
    try {
      if (typeof CrComLib !== 'undefined') {
        // Use the correct method to get signal values
        const value = CrComLib.getState(signalType, signalName);
        console.log(`Retrieved signal ${signalName} value:`, value);
        return value;
      } else {
        console.warn('CrComLib is not available for getState');
        return null;
      }
    } catch (error) {
      console.error(`Error getting state for ${signalName}:`, error);
      return null;
    }
  }
  
  /**
   * Handle signal subscription
   */
  async function setupSignalSubscription(signalName: string) {
    if (!signalName) {
      console.error(`[Source ${sourceId}] No signal name provided for subscription`);
      return;
    }

    // Clean up previous subscription if it exists
    if (subscriptionId && previousSignalName && typeof window.CrComLib !== 'undefined') {
      try {
        window.CrComLib.unsubscribeState('n', previousSignalName, subscriptionId);
        console.log(`[Source ${sourceId}] Unsubscribed from previous signal: ${previousSignalName}`);
      } catch (error) {
        console.error(`[Source ${sourceId}] Error unsubscribing from ${previousSignalName}:`, error);
      }
      subscriptionId = '';
    }

    // Store current signal name for cleanup
    previousSignalName = signalName;
    isLoading = true;
    signalError = false;

    try {
      console.log(`[Source ${sourceId}] Setting up subscription to: ${signalName}`);
      
      // Get initial value
      const initialValue = window.CrComLib?.getState('n', signalName);
      console.log(`[Source ${sourceId}] Initial value for ${signalName}:`, initialValue);
      
      if (initialValue !== null && initialValue !== undefined) {
        controlType = parseInt(initialValue.toString(), 10) || 0;
        console.log(`[Source ${sourceId}] Initial control type: ${controlType}`);
      }

      // Subscribe to changes
      subscriptionId = window.CrComLib.subscribeState('n', signalName, (value: unknown) => {
        if (value !== null && value !== undefined) {
          const newControlType = parseInt(value.toString(), 10) || 0;
          if (controlType !== newControlType) {
            console.log(`[Source ${sourceId}] Control type changed from ${controlType} to ${newControlType} via ${signalName}`);
            controlType = newControlType;
            dispatch('controlTypeChange', { 
              sourceId,
              controlType: newControlType,
              signalName
            });
          }
        }
      });

      console.log(`[Source ${sourceId}] Successfully subscribed to ${signalName} with ID: ${subscriptionId}`);
    } catch (error) {
      console.error(`[Source ${sourceId}] Error setting up subscription:`, error);
      signalError = true;
      errorMessage = `Subscription error: ${error instanceof Error ? error.message : String(error)}`;
    } finally {
      isLoading = false;
    }
  }

  // React to signal name changes
  $: if (controlTypeSignalName) {
    setupSignalSubscription(controlTypeSignalName);
  }

  // Clean up on destroy
  onDestroy(() => {
    if (subscriptionId && previousSignalName && typeof window.CrComLib !== 'undefined') {
      try {
        window.CrComLib.unsubscribeState('n', previousSignalName, subscriptionId);
        console.log(`[Source ${sourceId}] Unsubscribed from ${previousSignalName} on destroy`);
      } catch (error) {
        console.error(`[Source ${sourceId}] Error during cleanup:`, error);
      }
    }
  });
  
  /**
   * Current component based on control type
   * @type {any}
   */
  let currentComponent: any = null;
  
  // Update component name for debugging
  $: componentName = currentComponent ? 
    currentComponent.name || 'Unknown Component' : 
    'No Component Selected';
  
  // Update component when control type changes
  $: if (controlType) {
    currentComponent = controlTypeComponents[controlType] || null;
    console.log(`[Source ${sourceId}] Control type ${controlType} mapped to component:`, 
      currentComponent?.name || 'None');
  }
</script>

<!-- 
  Dynamic source control rendering based on the control type signal.
  Shows different source controls depending on which one is selected by the control system.
-->
<div class="source-control-router" aria-live="polite">
  {#if isLoading}
    <div class="loading-indicator">
      <i class="fas fa-spinner fa-spin"></i>
      <p>Loading {sourceLabel} controls...</p>
    </div>
  {:else if signalError}
    <div class="error-message">
      <i class="fas fa-exclamation-triangle"></i>
      <h3>Signal Error</h3>
      <p>{errorMessage || `Error with signal: ${controlTypeSignalName}`}</p>
    </div>
  {:else if currentComponent}
    <svelte:component this={currentComponent} {sourceId} {sourceLabel} />
  {:else}
    <div class="error-message">
      <i class="fas fa-question-circle"></i>
      <h3>Unknown Control Type</h3>
      <p>No component found for control type: {controlType}</p>
      <p class="hint">Expected a value between 1-8</p>
    </div>
  {/if}
</div>

<style>
  .source-control-router {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  
  .loading-indicator {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2rem;
    color: #fff;
    text-align: center;
  }
  
  .loading-indicator i {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: #0C234B; /* UABlue */
  }
  
  .error-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2rem;
    text-align: center;
    background-color: rgba(171, 5, 32, 0.1); /* UARed with low opacity */
    border: 2px dashed rgba(171, 5, 32, 0.5);
    border-radius: 0.5rem;
    color: #fff;
  }
  
  .error-message i {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #AB0520; /* UARed */
  }
  
  .error-message h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    color: #fff;
  }
  
  .error-message p {
    margin: 0;
    font-size: 0.9rem;
    opacity: 0.9;
  }
  
  .error-message .hint {
    margin-top: 0.5rem;
    font-size: 0.8rem;
    opacity: 0.7;
  }
  
  .error-message i {
    margin-bottom: 1rem;
  }
  
  .error-message h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .error-message p {
    color: rgba(255, 255, 255, 0.8);
  }
</style>
