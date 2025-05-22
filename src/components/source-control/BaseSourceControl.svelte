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
    padding: 1rem;
    color: white;
    background-color: rgba(12, 35, 75, 0.9); /* UABlue with transparency */
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .source-content {
    flex: 1;
    overflow-y: auto;
    padding: 0.5rem;
  }

  /* Responsive adjustments */
  @media (min-width: 1600px) {
    /* Source control responsive styles */
  }
</style>
