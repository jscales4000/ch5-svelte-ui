<script lang="ts">
  import BaseSourceControl from './BaseSourceControl.svelte';
  
  export let sourceId: number = 0;
  export let sourceLabel: string = 'Camera Control';
  
  // Camera state
  let isPowered = true;
  let currentPreset = 0;
  let zoomLevel = 50;
  let focusMode = 'auto';
  
  // Camera presets
  const presets = [
    { id: 1, name: 'Wide Room View' },
    { id: 2, name: 'Podium' },
    { id: 3, name: 'Whiteboard' },
    { id: 4, name: 'Student Area' },
    { id: 5, name: 'Custom View' }
  ];
  
  // Select a preset
  function selectPreset(presetId: number) {
    currentPreset = presetId;
    // Add your control system logic here
  }
  
  // Toggle camera power
  function togglePower() {
    isPowered = !isPowered;
    // Add your control system logic here
  }
  
  // Handle pan/tilt controls
  function handlePanTilt(direction: string) {
    // Add your control system logic here
    console.log(`Pan/Tilt: ${direction}`);
  }
  
  // Handle zoom change
  function handleZoom(direction: string) {
    if (direction === 'in' && zoomLevel < 100) {
      zoomLevel += 10;
    } else if (direction === 'out' && zoomLevel > 0) {
      zoomLevel -= 10;
    }
    // Add your control system logic here
  }
  
  // Toggle focus mode
  function toggleFocus() {
    focusMode = focusMode === 'auto' ? 'manual' : 'auto';
    // Add your control system logic here
  }
</script>

<BaseSourceControl {sourceId} {sourceLabel} controlType="Camera">
  <div class="camera-controls">
    <!-- Camera preview -->
    <div class="camera-preview {isPowered ? '' : 'powered-off'}">
      {#if isPowered}
        <div class="preview-placeholder">
          <i class="fas fa-video text-4xl mb-2"></i>
          <p>Camera Preview</p>
          {#if currentPreset > 0}
            <div class="preset-indicator">
              Preset: {presets.find(p => p.id === currentPreset)?.name || 'None'}
            </div>
          {/if}
        </div>
      {:else}
        <div class="powered-off-message">
          <i class="fas fa-power-off text-4xl mb-2"></i>
          <p>Camera is off</p>
        </div>
      {/if}
    </div>
    
    <!-- Main controls section -->
    <div class="control-panel">
      <!-- Power control -->
      <div class="power-control">
        <button 
          class="power-btn {isPowered ? 'on' : 'off'}" 
          on:click={togglePower}
          aria-label={isPowered ? 'Turn Camera Off' : 'Turn Camera On'}
        >
          <i class="fas fa-power-off"></i>
          <span>{isPowered ? 'On' : 'Off'}</span>
        </button>
      </div>
      
      <!-- Pan/Tilt controls -->
      <div class="pantilt-controls">
        <h3 class="control-label">Pan/Tilt</h3>
        <div class="pantilt-pad">
          <button 
            class="direction-btn up" 
            on:click={() => handlePanTilt('up')}
            disabled={!isPowered}
            aria-label="Tilt Up"
          >
            <i class="fas fa-chevron-up"></i>
          </button>
          
          <button 
            class="direction-btn right" 
            on:click={() => handlePanTilt('right')}
            disabled={!isPowered}
            aria-label="Pan Right"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
          
          <button 
            class="direction-btn down" 
            on:click={() => handlePanTilt('down')}
            disabled={!isPowered}
            aria-label="Tilt Down"
          >
            <i class="fas fa-chevron-down"></i>
          </button>
          
          <button 
            class="direction-btn left" 
            on:click={() => handlePanTilt('left')}
            disabled={!isPowered}
            aria-label="Pan Left"
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          
          <div class="center-btn"></div>
        </div>
      </div>
      
      <!-- Zoom controls -->
      <div class="zoom-controls">
        <h3 class="control-label">Zoom</h3>
        <div class="zoom-buttons">
          <button 
            class="zoom-btn" 
            on:click={() => handleZoom('out')}
            disabled={!isPowered || zoomLevel === 0}
            aria-label="Zoom Out"
          >
            <i class="fas fa-search-minus"></i>
          </button>
          
          <div class="zoom-level">
            <div class="zoom-indicator" style="width: {zoomLevel}%"></div>
          </div>
          
          <button 
            class="zoom-btn" 
            on:click={() => handleZoom('in')}
            disabled={!isPowered || zoomLevel === 100}
            aria-label="Zoom In"
          >
            <i class="fas fa-search-plus"></i>
          </button>
        </div>
      </div>
      
      <!-- Focus control -->
      <div class="focus-control">
        <h3 class="control-label">Focus</h3>
        <button 
          class="focus-btn" 
          on:click={toggleFocus}
          disabled={!isPowered}
          aria-label={`Switch to ${focusMode === 'auto' ? 'Manual' : 'Auto'} Focus`}
        >
          <i class="fas {focusMode === 'auto' ? 'fa-magic' : 'fa-bullseye'}"></i>
          <span>{focusMode === 'auto' ? 'Auto Focus' : 'Manual Focus'}</span>
        </button>
      </div>
    </div>
    
    <!-- Preset controls -->
    <div class="presets-panel">
      <h3 class="control-label">Camera Presets</h3>
      <div class="preset-buttons">
        {#each presets as preset}
          <button 
            class="preset-btn {currentPreset === preset.id ? 'active' : ''}" 
            on:click={() => selectPreset(preset.id)}
            disabled={!isPowered}
            aria-label={`Select ${preset.name} Preset`}
          >
            <span class="preset-number">{preset.id}</span>
            <span class="preset-name">{preset.name}</span>
          </button>
        {/each}
      </div>
    </div>
  </div>
</BaseSourceControl>

<style>
  .camera-controls {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    height: 100%;
  }
  
  .camera-preview {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 0.5rem;
    aspect-ratio: 16/9;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    transition: background-color 0.3s;
  }
  
  .camera-preview.powered-off {
    background-color: rgba(0, 0, 0, 0.7);
  }
  
  .preview-placeholder,
  .powered-off-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
  }
  
  .preset-indicator {
    position: absolute;
    bottom: 1rem;
    left: 1rem;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
    font-size: 0.875rem;
  }
  
  .control-panel {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  
  .power-control {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
  }
  
  .power-btn {
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
    width: 100%;
    max-width: 200px;
  }
  
  .power-btn.on {
    background-color: #AB0520; /* UARed */
    color: white;
  }
  
  .power-btn.off {
    background-color: #4a5568;
    color: white;
  }
  
  .control-label {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 0.75rem 0;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
  }
  
  .pantilt-controls {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
  }
  
  .pantilt-pad {
    position: relative;
    width: 100%;
    aspect-ratio: 1/1;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 0.25rem;
  }
  
  .direction-btn {
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 0.25rem;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .direction-btn:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .direction-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .direction-btn.up {
    grid-column: 2;
    grid-row: 1;
  }
  
  .direction-btn.right {
    grid-column: 3;
    grid-row: 2;
  }
  
  .direction-btn.down {
    grid-column: 2;
    grid-row: 3;
  }
  
  .direction-btn.left {
    grid-column: 1;
    grid-row: 2;
  }
  
  .center-btn {
    grid-column: 2;
    grid-row: 2;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
  }
  
  .zoom-controls {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
  }
  
  .zoom-buttons {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .zoom-btn {
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    font-size: 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }
  
  .zoom-btn:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .zoom-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .zoom-level {
    flex: 1;
    height: 8px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    overflow: hidden;
  }
  
  .zoom-indicator {
    height: 100%;
    background-color: #AB0520; /* UARed */
    border-radius: 4px;
    transition: width 0.2s;
  }
  
  .focus-control {
    grid-column: 1 / -1;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
  }
  
  .focus-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.75rem;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 0.375rem;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .focus-btn:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .focus-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .presets-panel {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
    margin-top: auto;
  }
  
  .preset-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.75rem;
  }
  
  .preset-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.75rem;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 0.375rem;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
    min-height: 4rem;
  }
  
  .preset-btn:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .preset-btn.active {
    background-color: rgba(171, 5, 32, 0.6); /* UARed with transparency */
    border: 1px solid #AB0520;
  }
  
  .preset-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .preset-number {
    font-weight: 700;
    font-size: 0.875rem;
  }
  
  .preset-name {
    font-size: 0.75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
</style>
