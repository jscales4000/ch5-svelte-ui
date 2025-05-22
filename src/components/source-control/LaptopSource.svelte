<script lang="ts">
  import BaseSourceControl from './BaseSourceControl.svelte';
  
  export let sourceId: number = 0;
  export let sourceLabel: string = 'Laptop';
  
  // Display settings
  let resolution = '1920x1080';
  let refreshRate = '60';
  let aspectRatio = '16:9';
  
  // Available resolutions
  const resolutions = [
    '1280x720',
    '1920x1080',
    '2560x1440',
    '3840x2160'
  ];
  
  // Available refresh rates
  const refreshRates = [
    '30',
    '60',
    '75',
    '120'
  ];
  
  // Available aspect ratios
  const aspectRatios = [
    '16:9',
    '16:10',
    '4:3',
    '21:9'
  ];
  
  // Connection status
  let isConnected = true;
  let connectionType = 'HDMI';
  
  // Handle display changes
  function applyDisplaySettings() {
    // Add your control system logic here
    console.log('Applying settings:', { resolution, refreshRate, aspectRatio });
  }
  
  // Handle connection reset
  function resetConnection() {
    // Add your control system logic here
    console.log('Resetting connection');
  }
</script>

<BaseSourceControl {sourceId} {sourceLabel} controlType="Display">
  <div class="laptop-controls">
    <!-- Connection status -->
    <div class="status-panel">
      <div class="status-indicator {isConnected ? 'connected' : 'disconnected'}">
        <i class="fas {isConnected ? 'fa-check-circle' : 'fa-times-circle'}"></i>
        <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
        {#if isConnected}
          <span class="connection-type">via {connectionType}</span>
        {/if}
      </div>
      
      {#if isConnected}
        <button class="reset-btn" on:click={resetConnection}>
          <i class="fas fa-sync-alt mr-2"></i>
          Reset Connection
        </button>
      {/if}
    </div>
    
    <!-- Display settings -->
    <div class="display-settings">
      <h3 class="settings-title">Display Settings</h3>
      
      <div class="settings-container">
        <!-- Resolution -->
        <div class="setting-group">
          <label for={`resolution-${sourceId}`}>Resolution</label>
          <select 
            id={`resolution-${sourceId}`}
            bind:value={resolution} 
            disabled={!isConnected}
          >
            {#each resolutions as res}
              <option value={res}>{res}</option>
            {/each}
          </select>
        </div>
        
        <!-- Refresh Rate -->
        <div class="setting-group">
          <label for={`refresh-${sourceId}`}>Refresh Rate</label>
          <select 
            id={`refresh-${sourceId}`}
            bind:value={refreshRate} 
            disabled={!isConnected}
          >
            {#each refreshRates as rate}
              <option value={rate}>{rate} Hz</option>
            {/each}
          </select>
        </div>
        
        <!-- Aspect Ratio -->
        <div class="setting-group">
          <label for={`aspect-${sourceId}`}>Aspect Ratio</label>
          <select 
            id={`aspect-${sourceId}`}
            bind:value={aspectRatio} 
            disabled={!isConnected}
          >
            {#each aspectRatios as ratio}
              <option value={ratio}>{ratio}</option>
            {/each}
          </select>
        </div>
      </div>
      
      <button 
        class="apply-btn" 
        on:click={applyDisplaySettings}
        disabled={!isConnected}
      >
        Apply Settings
      </button>
    </div>
    
    <!-- Connection help -->
    <div class="connection-help">
      <h3 class="help-title">Connection Help</h3>
      
      <div class="help-content">
        <h4>Troubleshooting Steps</h4>
        <ul class="help-list">
          <li>Ensure your laptop is powered on and not in sleep mode</li>
          <li>Check that the cable is securely connected to both devices</li>
          <li>Press Windows+P or Fn+F7 (may vary by laptop) to access display settings</li>
          <li>Select "Duplicate" or "Second screen only" mode on your laptop</li>
          <li>Try disconnecting and reconnecting the cable</li>
          <li>Use the "Reset Connection" button above if available</li>
        </ul>
        
        <h4>Compatible Adapters</h4>
        <div class="adapter-list">
          <div class="adapter">
            <i class="fas fa-plug"></i>
            <span>HDMI</span>
          </div>
          <div class="adapter">
            <i class="fas fa-plug"></i>
            <span>DisplayPort</span>
          </div>
          <div class="adapter">
            <i class="fas fa-plug"></i>
            <span>USB-C</span>
          </div>
          <div class="adapter">
            <i class="fas fa-plug"></i>
            <span>VGA</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</BaseSourceControl>

<style>
  .laptop-controls {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    height: 100%;
    overflow-y: auto;
  }
  
  .status-panel {
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
  
  .status-indicator.connected {
    color: #48bb78; /* green */
  }
  
  .status-indicator.disconnected {
    color: #f56565; /* red */
  }
  
  .connection-type {
    font-size: 0.875rem;
    font-weight: normal;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .reset-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 0.375rem;
    color: white;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .reset-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .display-settings {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
  }
  
  .settings-title,
  .help-title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .settings-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .setting-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .setting-group label {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  select {
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
  
  select:focus {
    outline: none;
    border-color: #AB0520; /* UARed */
  }
  
  select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .apply-btn {
    display: block;
    width: 100%;
    padding: 0.75rem;
    background-color: #AB0520; /* UARed */
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .apply-btn:hover:not(:disabled) {
    background-color: #8B0015;
  }
  
  .apply-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .connection-help {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
    margin-top: auto;
  }
  
  .help-content h4 {
    font-size: 0.875rem;
    font-weight: 600;
    margin: 0 0 0.75rem 0;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .help-list {
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  .help-list li {
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .adapter-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  
  .adapter {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.375rem;
    padding: 0.75rem;
    min-width: 80px;
    text-align: center;
  }
  
  .adapter i {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .adapter span {
    font-size: 0.75rem;
  }
</style>
