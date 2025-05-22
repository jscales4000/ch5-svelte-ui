<script lang="ts">
  import BaseSourceControl from './BaseSourceControl.svelte';
  
  export let sourceId: number = 0;
  export let sourceLabel: string = 'Lecture Capture';
  
  // State variables
  let isRecording = false;
  let isPaused = false;
  let elapsedTime = 0;
  let recordingName = "Lecture Recording";
  
  // Camera options
  let selectedCamera = "Main";
  const cameraOptions = ["Main", "Secondary", "Student View", "Document"];
  
  // Audio options
  let microphoneEnabled = true;
  let roomAudioEnabled = true;
  
  // Timer interval
  let timerInterval: number | null = null;
  
  // Toggle recording state
  function toggleRecording() {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }
  
  // Start recording
  function startRecording() {
    isRecording = true;
    isPaused = false;
    
    // Start timer
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = window.setInterval(() => {
      if (!isPaused) {
        elapsedTime++;
      }
    }, 1000);
    
    // Add your control system logic here
  }
  
  // Stop recording
  function stopRecording() {
    isRecording = false;
    isPaused = false;
    
    // Stop timer
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    
    // Reset elapsed time
    elapsedTime = 0;
    
    // Add your control system logic here
  }
  
  // Pause recording
  function pauseRecording() {
    isPaused = !isPaused;
    // Add your control system logic here
  }
  
  // Format time in seconds to HH:MM:SS
  function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return [
      hours.toString().padStart(2, '0'),
      mins.toString().padStart(2, '0'),
      secs.toString().padStart(2, '0')
    ].join(':');
  }
  
  // Handle camera change
  function handleCameraChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    selectedCamera = target.value;
    // Add your control system logic here
  }
  
  // Clean up on component unmount
  function cleanup() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }
</script>

<BaseSourceControl {sourceId} {sourceLabel} controlType="Capture">
  <div class="lecture-capture">
    <!-- Recording preview -->
    <div class="recording-preview">
      <div class="camera-feed">
        <div class="placeholder">
          <i class="fas fa-video text-4xl mb-2"></i>
          <p>Camera: {selectedCamera}</p>
          
          <!-- Recording indicator -->
          {#if isRecording}
            <div class="recording-indicator {isPaused ? 'paused' : ''}">
              <div class="indicator-dot"></div>
              <span>{isPaused ? 'PAUSED' : 'REC'}</span>
            </div>
          {/if}
        </div>
      </div>
      
      <!-- Recording timer -->
      <div class="recording-timer">
        <div class="timer-display {isRecording ? 'active' : ''}">
          <i class="fas fa-clock mr-2"></i>
          <span>{formatTime(elapsedTime)}</span>
        </div>
      </div>
    </div>
    
    <!-- Recording controls -->
    <div class="recording-controls">
      <div class="control-section">
        <h3 class="section-header">Recording Controls</h3>
        
        <div class="primary-controls">
          <button 
            class="control-btn {isRecording ? 'stop' : 'record'}" 
            on:click={toggleRecording}
            aria-label={isRecording ? 'Stop Recording' : 'Start Recording'}
          >
            <i class="fas {isRecording ? 'fa-stop' : 'fa-circle'}"></i>
            <span>{isRecording ? 'Stop' : 'Record'}</span>
          </button>
          
          {#if isRecording}
            <button 
              class="control-btn pause" 
              on:click={pauseRecording}
              aria-label={isPaused ? 'Resume Recording' : 'Pause Recording'}
            >
              <i class="fas {isPaused ? 'fa-play' : 'fa-pause'}"></i>
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
          {/if}
        </div>
        
        <div class="recording-name">
          <label for={`recording-name-${sourceId}`}>Recording Name</label>
          <input 
            type="text" 
            id={`recording-name-${sourceId}`}
            bind:value={recordingName} 
            disabled={isRecording}
          />
        </div>
      </div>
      
      <div class="control-section">
        <h3 class="section-header">Camera Controls</h3>
        
        <div class="camera-selection">
          <label for={`camera-select-${sourceId}`}>Camera Source</label>
          <select 
            id={`camera-select-${sourceId}`}
            bind:value={selectedCamera} 
            on:change={handleCameraChange}
            disabled={isRecording && !isPaused}
          >
            {#each cameraOptions as camera}
              <option value={camera}>{camera}</option>
            {/each}
          </select>
        </div>
      </div>
      
      <div class="control-section">
        <h3 class="section-header">Audio Controls</h3>
        
        <div class="audio-options">
          <label class="switch">
            <input 
              type="checkbox" 
              bind:checked={microphoneEnabled}
              disabled={isRecording && !isPaused}
            >
            <span class="switch-slider"></span>
            <span class="switch-label">Microphone</span>
          </label>
          
          <label class="switch">
            <input 
              type="checkbox" 
              bind:checked={roomAudioEnabled}
              disabled={isRecording && !isPaused}
            >
            <span class="switch-slider"></span>
            <span class="switch-label">Room Audio</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</BaseSourceControl>

<style>
  .lecture-capture {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    height: 100%;
  }
  
  .recording-preview {
    flex: 0 0 auto;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  .camera-feed {
    aspect-ratio: 16/9;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
    width: 100%;
    height: 100%;
  }
  
  .recording-indicator {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.625rem;
    background-color: rgba(171, 5, 32, 0.8); /* UARed with transparency */
    border-radius: 0.25rem;
    font-weight: 600;
    animation: pulse 1.5s ease infinite;
  }
  
  .recording-indicator.paused {
    background-color: rgba(0, 0, 0, 0.6);
    animation: none;
  }
  
  .indicator-dot {
    width: 0.75rem;
    height: 0.75rem;
    border-radius: 50%;
    background-color: #ff0000;
  }
  
  .recording-indicator.paused .indicator-dot {
    background-color: #f7b500;
  }
  
  @keyframes pulse {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }
  
  .recording-timer {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0.625rem;
    text-align: center;
  }
  
  .timer-display {
    font-family: monospace;
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .timer-display.active {
    color: white;
  }
  
  .recording-controls {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    overflow-y: auto;
  }
  
  .control-section {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
  }
  
  .section-header {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .primary-controls {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .control-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 0.5rem;
    color: white;
    padding: 0.75rem;
    cursor: pointer;
    transition: background-color 0.2s;
    flex: 1;
  }
  
  .control-btn i {
    font-size: 1.5rem;
  }
  
  .control-btn.record {
    background-color: #AB0520; /* UARed */
  }
  
  .control-btn.record:hover {
    background-color: #8B0015;
  }
  
  .control-btn.stop {
    background-color: #f56565; /* red */
  }
  
  .control-btn.stop:hover {
    background-color: #e53e3e;
  }
  
  .control-btn.pause {
    background-color: #ed8936; /* orange */
  }
  
  .control-btn.pause:hover {
    background-color: #dd6b20;
  }
  
  .recording-name {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .recording-name label {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .recording-name input {
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.25rem;
    padding: 0.625rem;
    color: white;
    font-size: 0.875rem;
  }
  
  .recording-name input:focus {
    outline: none;
    border-color: #AB0520; /* UARed */
  }
  
  .recording-name input:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .camera-selection {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .camera-selection label {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .camera-selection select {
    background-color: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.25rem;
    padding: 0.625rem;
    color: white;
    font-size: 0.875rem;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'/%3E%3C/svg%3E");
    background-position: right 0.5rem center;
    background-repeat: no-repeat;
    background-size: 1.25rem;
    padding-right: 2rem;
  }
  
  .camera-selection select:focus {
    outline: none;
    border-color: #AB0520; /* UARed */
  }
  
  .camera-selection select:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .audio-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
</style>
