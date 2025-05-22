<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  // Using export const for properties that are needed by parent components
  // but not directly used within this component's template
  export let sourceId: number = 0; // Used in handleAction
  export const sourceLabel: string = ''; // Used by parent components
  export const controlType: string = ''; // Used by parent components

  const dispatch = createEventDispatcher();

  function handleAction(action: string, value?: any) {
    dispatch('control', {
      sourceId,
      action,
      value
    });
  }
</script>

<div class="source-control">
  <div class="source-content">
    <slot></slot>
  </div>
</div>

<style>
  .source-control {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%; /* Ensure full width */
    max-width: 100%; /* Use full available width */
    margin: 0 auto; /* Center the component */
    padding: 1.25rem; /* Balanced padding */
    overflow: hidden; /* Prevent scrolling */
    color: white;
    background: rgba(12,35,73,1); /* Exact RGBA color as specified */
    border-radius: 0.75rem;
    box-shadow: 
      0 10px 15px -3px rgba(0, 0, 0, 0.3),
      0 4px 6px -2px rgba(0, 0, 0, 0.2),
      inset 0 2px 4px rgba(255, 255, 255, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;
  }
  
  .source-control::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, rgba(171, 5, 32, 0.6), rgba(171, 5, 32, 0.9), rgba(171, 5, 32, 0.6)); /* UARed gradient */
    box-shadow: 0 0 8px 1px rgba(171, 5, 32, 0.4); /* Glow effect */
  }

  .source-content {
    flex: 1;
    overflow-y: auto;
    padding: 0.75rem 0.5rem;
    position: relative;
    scrollbar-width: thin;
    scrollbar-color: rgba(171, 5, 32, 0.6) transparent; /* UARed scrollbar */
  }
  
  .source-content::-webkit-scrollbar {
    width: 6px;
  }
  
  .source-content::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .source-content::-webkit-scrollbar-thumb {
    background-color: rgba(171, 5, 32, 0.6); /* UARed with transparency */
    border-radius: 6px;
  }

  /* Responsive adjustments */
  @media (min-width: 1600px) {
    /* Styles for TS-1070 (1920x1200) */
    .source-control {
      padding: 1.25rem;
      border-radius: 1rem;
      box-shadow: 
        0 15px 20px -5px rgba(0, 0, 0, 0.4),
        0 8px 10px -6px rgba(0, 0, 0, 0.25),
        inset 0 2px 6px rgba(255, 255, 255, 0.1),
        0 0 0 1px rgba(255, 255, 255, 0.15);
    }
    
    .source-control::before {
      height: 4px;
    }
    
    .source-content {
      padding: 1rem 0.75rem;
    }
  }
</style>
