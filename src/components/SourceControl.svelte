<script lang="ts">
  /**
   * Properties for the SourceControl component.
   * @typedef {Object} SourceControlProps
   * @property {number} [sourceId=0] - Unique numeric identifier for the source (1-255)
   * @property {string} [sourceLabel=''] - Display name for the source (e.g., 'PC', 'Laptop')
   */

  /**
   * SourceControl component displays controls specific to an AV source in a Crestron system.
   * This component provides a consistent UI for source-specific controls and integrates
   * with the Crestron control system for state management.
   * 
   * @component
   * @example
   * Basic usage:
   * ```svelte
   * <SourceControl sourceId={1} sourceLabel="PC" />
   * ```
   * 
   * With dynamic source:
   * ```svelte
   * <SourceControl 
   *   sourceId={currentSourceId} 
   *   sourceLabel={sourceLabels[currentSourceId]}
   * />
   * ```
   * 
   * @see {@link https://github.com/crestron/ch5-svelte} for Crestron Svelte integration
   */
  
  import { onMount } from 'svelte';
  import SourceControlRouter from './source-control/SourceControlRouter.svelte';
  
  /**
   * Unique identifier for the AV source.
   * @type {number}
   * @default 0
   * @example 1
   */
  export let sourceId = 0;
  
  /**
   * Display name for the source.
   * Used in the UI and for accessibility.
   * @type {string}
   * @default ''
   * @example 'PC' or 'Laptop'
   */
  export let sourceLabel = '';
  
  /**
   * Crestron signal name for source control type.
   * This is used to determine which control interface to show.
   * If not provided, it will be automatically generated based on sourceId.
   * @type {string}
   */
  export let controlTypeSignalName = '';
  
  /**
   * Computed title for the source control section.
   * Combines the source label with 'Controls' for display.
   * @type {string}
   * @example 'PC Controls'
   */
  $: sourceTitle = `${sourceLabel} Controls`;
  
  // Generate the signal name based on sourceId
  $: computedSignalName = controlTypeSignalName || 
    (sourceId > 0 ? `Settings.SourceCntrlIDfromcntrlSys${sourceId}` : '');
  
  // Debug log when source changes
  $: {
    if (sourceId > 0) {
      console.log(`[SourceControl] Source ${sourceId} (${sourceLabel}) using signal: ${computedSignalName}`);
    }
  }

  onMount(() => {
    console.log(`[SourceControl] Mounted for source ${sourceId}: ${sourceLabel}`);
    console.log(`[SourceControl] Using control type signal: ${computedSignalName}`);
  });
</script>

<!-- 
  Main container for source-specific controls.
  Uses ARIA attributes for better accessibility.
-->
<div class="source-control-container" role="region" aria-label={sourceTitle}>
  <!-- 
    Section heading for the source controls.
    Uses a heading level appropriate for the document structure.
  -->
  <h2 class="source-title">{sourceTitle}</h2>
  
  <!-- 
    Dynamic source control content based on control system signals.
    The SourceControlRouter will load the appropriate control interface
    based on the value of the controlTypeSignalName.
  -->
  <div class="controls-content">
    {#if sourceId > 0}
      <SourceControlRouter 
        key={sourceId}
        {sourceId} 
        {sourceLabel} 
        controlTypeSignalName={computedSignalName}
      />
    {:else}
      <div class="error-message">
        <i class="fas fa-exclamation-triangle text-4xl mb-4"></i>
        <h3>Invalid Source</h3>
        <p>No valid source ID was provided.</p>
      </div>
    {/if}
  </div>
</div>

<style>
  /* Add styling for the error message */
  .error-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 2rem;
    background-color: rgba(171, 5, 32, 0.1); /* UARed with low opacity */
    border: 2px dashed rgba(171, 5, 32, 0.5);
    border-radius: 0.5rem;
    text-align: center;
    color: white;
  }
  
  .error-message h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .error-message p {
    color: rgba(255, 255, 255, 0.8);
  }
  
  /**
   * Main container styles for the source control component.
   * Uses flexbox for vertical layout and fills available space.
   */
  .source-control-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0.5rem 1.5rem 1.5rem; /* Reduced top padding to minimum */
    color: white;
    background-color: rgba(12, 35, 75, 0.9); /* UABlue with transparency */
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    margin-top: 0; /* Removed top margin completely */
  }
  
  /**
   * Title styling for the source control section.
   * Uses the University of Arizona brand typography scale.
   */
  .source-title {
    font-size: 1.75rem;
    font-weight: 600;
    margin: 0 auto 1.5rem auto; /* Reset top margin and keep horizontal centering */
    color: white;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 2px solid #AB0520; /* UARed */
    padding-bottom: 0.5rem;
    display: inline-block;
  }
  
  /**
   * Content container for the source controls.
   * Provides proper layout and scrolling for control interfaces.
   */
  .controls-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #AB0520 transparent; /* UARed for scrollbar */
    max-height: 100%;
    border-radius: 0.25rem;
  }
  
  /* Custom scrollbar for WebKit browsers */
  .controls-content::-webkit-scrollbar {
    width: 8px;
  }
  
  .controls-content::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .controls-content::-webkit-scrollbar-thumb {
    background-color: #AB0520; /* UARed */
    border-radius: 4px;
  }
  
  /**
   * Media query for larger screens (TS-1070).
   * Increases sizes proportionally for better visibility on large displays.
   */
  @media (min-width: 1600px) {
    .source-title {
      font-size: 2rem;
    }
  }
</style>
