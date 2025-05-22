<script lang="ts">
  import BaseSourceControl from './BaseSourceControl.svelte';
  
  export let sourceId: number = 0;
  export let sourceLabel: string = 'Document Camera';
  
  // Camera state
  let isOn = true;
  let zoomLevel = 50;
  let brightness = 70;
  let contrast = 60;
  let autoFocus = true;
  
  // Toggle camera power
  function togglePower() {
    isOn = !isOn;
    // Add your control system logic here
  }
  
  // Adjust zoom level
  function adjustZoom(value: number) {
    zoomLevel = Math.max(0, Math.min(100, zoomLevel + value));
    // Add your control system logic here
  }
  
  // Reset settings to default
  function resetSettings() {
    zoomLevel = 50;
    brightness = 70;
    contrast = 60;
    autoFocus = true;
    // Add your control system logic here
  }
</script>

<BaseSourceControl {sourceId} {sourceLabel} controlType="Camera">
  <div class="doc-camera">
    <!-- Camera preview area -->
    <div class="camera-preview {!isOn ? 'camera-off' : ''}">
      {#if isOn}
        <div class="camera-placeholder">
          <i class="fas fa-file-image text-4xl mb-2"></i>
          <p>Document Camera Preview</p>
        </div>
      {:else}
        <div class="camera-off-message">
          <i class="fas fa-power-off text-4xl mb-2"></i>
          <p>Camera is off</p>
        </div>
      {/if}
    </div>
    
    <!-- Camera controls -->
    <div class="camera-controls">
      <div class="control-group">
        <h3 class="control-header">Power</h3>
        <button 
          class="power-button {isOn ? 'on' : 'off'}" 
          on:click={togglePower} 
          aria-label="Toggle camera power"
        >
          <i class="fas fa-power-off"></i>
          <span>{isOn ? 'On' : 'Off'}</span>
        </button>
      </div>
      
      <div class="control-group">
        <h3 class="control-header">Zoom</h3>
        <div class="zoom-controls">
          <button 
            class="control-btn zoom-btn" 
            on:click={() => adjustZoom(-10)}
            disabled={!isOn}
            aria-label="Zoom out"
          >
            <i class="fas fa-search-minus"></i>
          </button>
          
          <div class="slider-container">
            <input 
              type="range" 
              min="0" 
              max="100" 
              bind:value={zoomLevel} 
              disabled={!isOn}
              class="slider"
              aria-label="Zoom level"
            />
            <span class="slider-value">{zoomLevel}%</span>
          </div>
          
          <button 
            class="control-btn zoom-btn" 
            on:click={() => adjustZoom(10)}
            disabled={!isOn}
            aria-label="Zoom in"
          >
            <i class="fas fa-search-plus"></i>
          </button>
        </div>
      </div>
      
      <div class="control-group">
        <h3 class="control-header">Image Adjustments</h3>
        <div class="adjustment-sliders">
          <div class="slider-row">
            <label for="brightness-slider">Brightness</label>
            <div class="slider-container">
              <input 
                id="brightness-slider"
                type="range" 
                min="0" 
                max="100" 
                bind:value={brightness} 
                disabled={!isOn}
                class="slider"
              />
              <span class="slider-value">{brightness}%</span>
            </div>
          </div>
          
          <div class="slider-row">
            <label for="contrast-slider">Contrast</label>
            <div class="slider-container">
              <input 
                id="contrast-slider"
                type="range" 
                min="0" 
                max="100" 
                bind:value={contrast} 
                disabled={!isOn}
                class="slider"
              />
              <span class="slider-value">{contrast}%</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="control-group">
        <h3 class="control-header">Focus</h3>
        <div class="focus-controls">
          <label class="switch">
            <input type="checkbox" bind:checked={autoFocus} disabled={!isOn}>
            <span class="switch-slider"></span>
            <span class="switch-label">Auto Focus</span>
          </label>
        </div>
      </div>
      
      <div class="control-group">
        <button 
          class="reset-button" 
          on:click={resetSettings}
          disabled={!isOn}
          aria-label="Reset to default settings"
        >
          <i class="fas fa-undo mr-2"></i>
          Reset to Defaults
        </button>
      </div>
    </div>
  </div>
</BaseSourceControl>

<style>
  .doc-camera {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
  }
  
  .camera-preview {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 0.5rem;
    aspect-ratio: 4/3;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: background-color 0.3s;
  }
  
  .camera-off {
    background-color: rgba(0, 0, 0, 0.7);
  }
  
  .camera-placeholder,
  .camera-off-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
  }
  
  .camera-controls {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    overflow-y: auto;
  }
  
  .control-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .control-header {
    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
  }
  
  .power-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .power-button.on {
    background-color: #AB0520; /* UARed */
    color: white;
  }
  
  .power-button.off {
    background-color: #4a5568;
    color: white;
  }
  
  .zoom-controls {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .control-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .control-btn:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .control-btn:disabled {
    color: rgba(255, 255, 255, 0.3);
    cursor: not-allowed;
  }
  
  .slider-container {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .slider {
    -webkit-appearance: none;
    appearance: none;
    flex: 1;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    outline: none;
  }
  
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
  }
  
  .slider:disabled {
    opacity: 0.5;
  }
  
  .slider-value {
    min-width: 3rem;
    text-align: right;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .adjustment-sliders {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .slider-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .slider-row label {
    min-width: 5rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .focus-controls {
    display: flex;
    align-items: center;
  }
  
  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .switch-slider {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
    background-color: #4a5568;
    border-radius: 20px;
    transition: 0.4s;
    margin-right: 10px;
  }
  
  .switch-slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }
  
  input:checked + .switch-slider {
    background-color: #AB0520; /* UARed */
  }
  
  input:disabled + .switch-slider {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  input:checked + .switch-slider:before {
    transform: translateX(20px);
  }
  
  .switch-label {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .reset-button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.625rem 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 0.375rem;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 0.5rem;
  }
  
  .reset-button:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .reset-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
