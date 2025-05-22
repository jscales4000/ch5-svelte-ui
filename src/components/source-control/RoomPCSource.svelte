<script lang="ts">
  import BaseSourceControl from './BaseSourceControl.svelte';
  
  export let sourceId: number = 0;
  export let sourceLabel: string = 'Room PC';
  
  // PC state
  let isLocked = false;
  let volume = 70;
  let isMuted = false;
  
  // Available applications
  const applications = [
    { id: 1, name: 'Web Browser', icon: 'fa-globe' },
    { id: 2, name: 'Microsoft PowerPoint', icon: 'fa-file-powerpoint' },
    { id: 3, name: 'Microsoft Word', icon: 'fa-file-word' },
    { id: 4, name: 'Microsoft Excel', icon: 'fa-file-excel' },
    { id: 5, name: 'Media Player', icon: 'fa-film' },
    { id: 6, name: 'PDF Reader', icon: 'fa-file-pdf' }
  ];
  
  // Lock/unlock PC
  function toggleLock() {
    isLocked = !isLocked;
    // Add your control system logic here
  }
  
  // Launch application
  function launchApp(appId: number) {
    // Add your control system logic here
    const app = applications.find(app => app.id === appId);
    console.log(`Launching: ${app?.name}`);
  }
  
  // Toggle mute
  function toggleMute() {
    isMuted = !isMuted;
    // Add your control system logic here
  }
  
  // Handle volume change
  function handleVolumeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    volume = parseInt(target.value);
    if (volume > 0 && isMuted) {
      isMuted = false;
    }
    // Add your control system logic here
  }
</script>

<BaseSourceControl {sourceId} {sourceLabel} controlType="Computer">
  <div class="room-pc-controls">
    <!-- PC status -->
    <div class="pc-status">
      <div class="status-indicator {isLocked ? 'locked' : 'unlocked'}">
        <i class="fas {isLocked ? 'fa-lock' : 'fa-lock-open'}"></i>
        <span>{isLocked ? 'Locked' : 'Unlocked'}</span>
      </div>
      
      <button 
        class="lock-btn" 
        on:click={toggleLock}
        aria-label={isLocked ? 'Unlock PC' : 'Lock PC'}
      >
        <i class="fas {isLocked ? 'fa-lock-open' : 'fa-lock'}"></i>
        <span>{isLocked ? 'Unlock' : 'Lock'}</span>
      </button>
    </div>
    
    <!-- Applications launcher -->
    <div class="applications-panel">
      <h3 class="section-title">Applications</h3>
      
      <div class="app-grid">
        {#each applications as app}
          <button 
            class="app-btn" 
            on:click={() => launchApp(app.id)}
            disabled={isLocked}
            aria-label={`Launch ${app.name}`}
          >
            <i class="fas {app.icon}"></i>
            <span class="app-name">{app.name}</span>
          </button>
        {/each}
      </div>
    </div>
    
    <!-- Volume controls -->
    <div class="volume-panel">
      <h3 class="section-title">Volume</h3>
      
      <div class="volume-controls">
        <button 
          class="mute-btn" 
          on:click={toggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          <i class="fas {isMuted || volume === 0 ? 'fa-volume-mute' : volume < 50 ? 'fa-volume-down' : 'fa-volume-up'}"></i>
        </button>
        
        <input 
          type="range" 
          min="0" 
          max="100" 
          bind:value={volume} 
          on:input={handleVolumeChange}
          class="volume-slider"
          aria-label="Volume"
        />
        
        <span class="volume-level">{volume}%</span>
      </div>
    </div>
    
    <!-- PC actions -->
    <div class="pc-actions">
      <h3 class="section-title">System Actions</h3>
      
      <div class="action-buttons">
        <button class="action-btn" aria-label="Restart PC">
          <i class="fas fa-redo-alt"></i>
          <span>Restart</span>
        </button>
        
        <button class="action-btn" aria-label="Sleep PC">
          <i class="fas fa-moon"></i>
          <span>Sleep</span>
        </button>
        
        <button class="action-btn" aria-label="Log Out">
          <i class="fas fa-sign-out-alt"></i>
          <span>Log Out</span>
        </button>
        
        <button class="action-btn" aria-label="Shutdown PC">
          <i class="fas fa-power-off"></i>
          <span>Shutdown</span>
        </button>
      </div>
    </div>
  </div>
</BaseSourceControl>

<style>
  .room-pc-controls {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    height: 100%;
    overflow-y: auto;
  }
  
  .pc-status {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.125rem;
    font-weight: 600;
  }
  
  .status-indicator.unlocked {
    color: #48bb78; /* green */
  }
  
  .status-indicator.locked {
    color: #f56565; /* red */
  }
  
  .lock-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 0.375rem;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .lock-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .section-title {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .applications-panel {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
  }
  
  .app-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
  }
  
  .app-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 0.375rem;
    padding: 1rem 0.5rem;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
    min-height: 5rem;
  }
  
  .app-btn:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .app-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .app-btn i {
    font-size: 1.5rem;
  }
  
  .app-name {
    font-size: 0.75rem;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  
  .volume-panel {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
  }
  
  .volume-controls {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .mute-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.25rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;
  }
  
  .mute-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .volume-slider {
    flex: 1;
    -webkit-appearance: none;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    outline: none;
  }
  
  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
  }
  
  .volume-level {
    min-width: 3rem;
    text-align: right;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .pc-actions {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
    margin-top: auto;
  }
  
  .action-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 1rem;
  }
  
  .action-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 0.375rem;
    padding: 0.75rem;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .action-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
</style>
