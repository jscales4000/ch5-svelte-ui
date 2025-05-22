<script lang="ts">
  import BaseSourceControl from './BaseSourceControl.svelte';
  
  export let sourceId: number = 0;
  export let sourceLabel: string = 'Text';
  
  // State for text content
  let textContent = '';
  
  // Handle text input
  function handleTextInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    textContent = target.value;
    // You can emit an event or update a store here if needed
  }
</script>

<BaseSourceControl {sourceId} {sourceLabel} controlType="Text">
  <div class="text-controls">
    <div class="form-group">
      <label for={`text-input-${sourceId}`} class="sr-only">Enter text for {sourceLabel}</label>
      <textarea
        id={`text-input-${sourceId}`}
        class="text-input"
        placeholder="Enter your text here..."
        rows="6"
        on:input={handleTextInput}
        bind:value={textContent}
      ></textarea>
    </div>
    <div class="text-actions">
      <button class="btn btn-primary" on:click={() => console.log('Send text:', textContent)}>
        <i class="fas fa-paper-plane mr-2"></i> Send to Display
      </button>
      <button class="btn btn-secondary" on:click={() => textContent = ''}>
        <i class="fas fa-eraser mr-2"></i> Clear
      </button>
    </div>
  </div>
</BaseSourceControl>

<style>
  .text-controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
  }
  
  .text-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #4a5568;
    border-radius: 0.375rem;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1rem;
    resize: none;
    min-height: 150px;
  }
  
  .text-input:focus {
    outline: none;
    border-color: #AB0520; /* UARed */
    box-shadow: 0 0 0 2px rgba(171, 5, 32, 0.5);
  }
  
  .text-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
  }
  
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-primary {
    background-color: #AB0520; /* UARed */
    color: white;
    border: 1px solid #8B0015;
  }
  
  .btn-primary:hover {
    background-color: #8B0015;
  }
  
  .btn-secondary {
    background-color: #2d3748;
    color: white;
    border: 1px solid #4a5568;
  }
  
  .btn-secondary:hover {
    background-color: #4a5568;
  }
  
  /* Responsive adjustments */
  @media (min-width: 1600px) {
    .btn {
      padding: 0.625rem 1.25rem;
      font-size: 1.05rem;
    }
  }
</style>
