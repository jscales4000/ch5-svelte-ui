<script lang="ts">
  import BaseSourceControl from './BaseSourceControl.svelte';
  
  export let sourceId: number = 0;
  export let sourceLabel: string = 'Text';
  
  // Default text content with 4 lines
  const defaultText = "Please login into PC to start your presentation\nThis room has camera control, enable it by pressing camera button\n\n";
  
  // Modal state
  let showCameraModal = false;
  
  // Toggle modal
  function toggleCameraModal() {
    showCameraModal = !showCameraModal;
  }
  
  // Close modal when clicking outside
  function handleOutsideClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      showCameraModal = false;
    }
  }
  
  // Camera control functions
  function handlePanTilt(direction: string) {
    // Add control system logic here
    console.log(`Pan/Tilt: ${direction}`);
  }
  
  function handleZoom(direction: string) {
    // Add control system logic here
    console.log(`Zoom: ${direction}`);
  }
  
  function handlePreset(presetId: number) {
    // Add control system logic here
    console.log(`Selected preset: ${presetId}`);
  }
</script>

<BaseSourceControl {sourceId} {sourceLabel} controlType="Text">
  <div class="text-display">
    <!-- Fixed text display -->
    <div class="text-content">
      <pre class="text-area">{defaultText}</pre>
    </div>
    
    <!-- Camera controls button -->
    <div class="camera-button-container">
      <button class="camera-controls-btn" on:click={toggleCameraModal}>
        <i class="fas fa-video mr-2"></i> Camera Controls
      </button>
    </div>
  </div>
  
  <!-- Camera Controls Modal -->
  {#if showCameraModal}
    <div class="modal-overlay" on:click={handleOutsideClick} on:keydown={(e) => e.key === 'Escape' && (showCameraModal = false)} role="dialog" aria-labelledby="camera-controls-title" tabindex="-1">
      <div class="modal-container">
        <div class="modal-header">
          <h3 id="camera-controls-title">Camera Controls</h3>
          <button class="close-btn" on:click={() => showCameraModal = false} aria-label="Close camera controls">
            <i class="fas fa-times"></i>
          </button>
        </div>
        
        <div class="modal-content">
          <!-- Top row: Pan/Tilt and Zoom controls side by side -->
          <div class="controls-row">
            <!-- Pan/Tilt controls -->
            <div class="control-section">
              <h4 class="control-label">Pan/Tilt</h4>
              <div class="pantilt-pad">
                <button 
                  class="direction-btn up" 
                  on:click={() => handlePanTilt('up')}
                  aria-label="Tilt Up"
                >
                  <i class="fas fa-chevron-up"></i>
                </button>
                
                <button 
                  class="direction-btn right" 
                  on:click={() => handlePanTilt('right')}
                  aria-label="Pan Right"
                >
                  <i class="fas fa-chevron-right"></i>
                </button>
                
                <button 
                  class="direction-btn down" 
                  on:click={() => handlePanTilt('down')}
                  aria-label="Tilt Down"
                >
                  <i class="fas fa-chevron-down"></i>
                </button>
                
                <button 
                  class="direction-btn left" 
                  on:click={() => handlePanTilt('left')}
                  aria-label="Pan Left"
                >
                  <i class="fas fa-chevron-left"></i>
                </button>
                
                <div class="center-btn"></div>
              </div>
            </div>
            
            <!-- Zoom controls -->
            <div class="control-section">
              <h4 class="control-label">Zoom</h4>
              <div class="zoom-buttons">
                <button 
                  class="zoom-btn" 
                  on:click={() => handleZoom('out')}
                  aria-label="Zoom Out"
                >
                  <i class="fas fa-search-minus"></i>
                </button>
                
                <div class="zoom-level">
                  <div class="zoom-indicator"></div>
                </div>
                
                <button 
                  class="zoom-btn" 
                  on:click={() => handleZoom('in')}
                  aria-label="Zoom In"
                >
                  <i class="fas fa-search-plus"></i>
                </button>
              </div>
            </div>
          </div>
          
          <!-- Presets -->  
          <div class="control-section presets-section">
            <h4 class="control-label">Camera Presets</h4>
            <div class="preset-buttons">
              <button class="preset-btn" on:click={() => handlePreset(1)}>
                <span class="preset-number">1</span>
                <span class="preset-name">Wide View</span>
              </button>
              <button class="preset-btn" on:click={() => handlePreset(2)}>
                <span class="preset-number">2</span>
                <span class="preset-name">Podium</span>
              </button>
              <button class="preset-btn" on:click={() => handlePreset(3)}>
                <span class="preset-number">3</span>
                <span class="preset-name">Whiteboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</BaseSourceControl>

<style>
  .text-display {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    height: 100%;
    overflow: hidden; /* Prevent scrolling */
  }
  
  .text-content {
    padding: 0.75rem 0.5rem;
  }
  
  .text-area {
    font-family: 'Arial', sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    color: white;
    white-space: pre-wrap;
    width: 100%;
    margin: 0;
  }
  
  /* Camera controls button */
  .camera-button-container {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
  }
  
  .camera-controls-btn {
    background-color: #AB0520; /* UARed */
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .camera-controls-btn:hover {
    background-color: #8B0015;
  }
  
  /* Modal styles */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    backdrop-filter: blur(4px);
  }
  
  .modal-container {
    background: rgba(12,35,73,1); /* Exact RGBA color as specified in memory */
    border-radius: 0.75rem;
    width: 95%; /* Wider to use more screen space */
    /* Fixed size that fits on both touch panels without scrolling */
    height: 700px; /* Will fit on TS-770 (800px height) and TS-1070 */
    overflow: hidden; /* Prevent scrolling */
    box-shadow: 
      0 10px 15px -3px rgba(0, 0, 0, 0.3),
      0 4px 6px -2px rgba(0, 0, 0, 0.2),
      inset 0 2px 4px rgba(255, 255, 255, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    position: relative;
    display: flex;
    flex-direction: column;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    flex-shrink: 0;
  }
  
  .modal-header h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .close-btn {
    background: transparent;
    border: none;
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;
  }
  
  .close-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .modal-content {
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    overflow: hidden;
  }
  
  .controls-row {
    display: flex;
    gap: 0.5rem;
    flex: 1;
  }
  
  .control-section {
    background-color: rgba(18, 35, 75, 0.6);
    border-radius: 0.5rem;
    padding: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  .control-label {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: rgba(255, 255, 255, 0.9);
    text-align: center;
  }
  
  /* Pan/Tilt controls */
  .pantilt-pad {
    position: relative;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
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
  
  .direction-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
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
  
  /* Zoom controls */
  .zoom-buttons {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    max-width: 300px;
    margin: 0 auto;
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
  
  .zoom-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .zoom-level {
    flex: 1;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    margin: 0 0.5rem;
  }
  
  .zoom-indicator {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 25%;
    height: 100%;
    background-color: #AB0520; /* UARed */
    border-radius: 2px;
  }
  
  /* Preset buttons */
  .presets-section {
    flex: 0.5; /* Take less space than the controls row */
    min-height: 120px;
  }
  
  .preset-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    max-width: 100%;
    margin: 0 auto;
    height: 100%;
  }
  
  .preset-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.125rem;
    padding: 0.5rem;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 0.375rem;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
    height: 100%;
  }
  
  .preset-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
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
  
  /* Responsive adjustments */
  @media (min-width: 1600px) {
    .text-area {
      font-size: 1.1rem;
    }
    
    .camera-controls-btn {
      font-size: 1.1rem;
      padding: 0.875rem 1.75rem;
    }
    
    .modal-header h3 {
      font-size: 1.75rem;
    }
    
    .zoom-btn, .direction-btn {
      font-size: 1.1rem;
    }
  }
</style>
