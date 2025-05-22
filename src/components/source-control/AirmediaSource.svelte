<script lang="ts">
  import BaseSourceControl from './BaseSourceControl.svelte';
  import { onMount } from 'svelte';
  
  export let sourceId: number = 0;
  export let sourceLabel: string = 'Airmedia';
  
  // State variables
  let connectionCode = "1234-5678";
  let deviceIP = "192.168.1.100";
  let isConnected = false;
  let connectedDevice = "";
  
  // Generate random connection code on mount (simulated)
  onMount(() => {
    // In a real app, this would come from a Crestron signal
    connectionCode = generateCode();
  });
  
  function generateCode() {
    const digits = "0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      if (i === 4) code += "-";
      code += digits[Math.floor(Math.random() * digits.length)];
    }
    return code;
  }
  
  function disconnectDevice() {
    isConnected = false;
    connectedDevice = "";
    // Add your control system logic here
  }
</script>

<BaseSourceControl {sourceId} {sourceLabel} controlType="Wireless Presentation">
  <div class="airmedia-controls">
    <!-- Connection status -->
    <div class="status-panel">
      <div class="status-indicator {isConnected ? 'connected' : 'disconnected'}">
        <i class="fas {isConnected ? 'fa-check-circle' : 'fa-times-circle'}"></i>
        <span>{isConnected ? 'Connected' : 'Ready for Connection'}</span>
      </div>
      
      {#if isConnected}
        <div class="connected-device">
          <h3>Connected Device</h3>
          <p class="device-name">{connectedDevice || "Unknown Device"}</p>
          <button class="disconnect-btn" on:click={disconnectDevice}>
            <i class="fas fa-unlink mr-2"></i>
            Disconnect
          </button>
        </div>
      {/if}
    </div>
    
    <!-- Connection information -->
    <div class="connection-info">
      <h3>Connection Information</h3>
      
      <div class="info-card">
        <div class="info-header">
          <i class="fas fa-key text-xl"></i>
          <h4>Connection Code</h4>
        </div>
        <div class="code-display">
          <span class="code">{connectionCode}</span>
          <div class="tooltip">
            <button class="copy-btn" on:click={() => console.log('Copy code to clipboard')}>
              <i class="fas fa-copy"></i>
            </button>
            <span class="tooltiptext">Copy to clipboard</span>
          </div>
        </div>
      </div>
      
      <div class="info-card">
        <div class="info-header">
          <i class="fas fa-network-wired text-xl"></i>
          <h4>IP Address</h4>
        </div>
        <div class="code-display">
          <span class="code">{deviceIP}</span>
          <div class="tooltip">
            <button class="copy-btn" on:click={() => console.log('Copy IP to clipboard')}>
              <i class="fas fa-copy"></i>
            </button>
            <span class="tooltiptext">Copy to clipboard</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Instructions panel -->
    <div class="instructions-panel">
      <h3>How to Connect</h3>
      <ol class="steps">
        <li>
          <div class="step-number">1</div>
          <div class="step-text">Connect to the same network as the display</div>
        </li>
        <li>
          <div class="step-number">2</div>
          <div class="step-text">Download and open the AirMedia app or use browser extension</div>
        </li>
        <li>
          <div class="step-number">3</div>
          <div class="step-text">Enter the connection code or IP address</div>
        </li>
        <li>
          <div class="step-number">4</div>
          <div class="step-text">Select your content and start presenting</div>
        </li>
      </ol>
      
      <div class="qr-section">
        <h4>Or Scan QR Code</h4>
        <div class="qr-code">
          <i class="fas fa-qrcode text-6xl"></i>
          <!-- In a real app, this would be an actual QR code image -->
        </div>
      </div>
    </div>
  </div>
</BaseSourceControl>

<style>
  .airmedia-controls {
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
  }
  
  .status-indicator {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.125rem;
    font-weight: 600;
    padding-bottom: 0.75rem;
  }
  
  .status-indicator.connected {
    color: #48bb78; /* green */
  }
  
  .status-indicator.disconnected {
    color: #f56565; /* red */
  }
  
  .connected-device {
    margin-top: 0.75rem;
    padding-top: 0.75rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .connected-device h3 {
    font-size: 0.875rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 0.5rem 0;
  }
  
  .device-name {
    font-size: 1.125rem;
    margin: 0 0 1rem 0;
  }
  
  .disconnect-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    background-color: #AB0520; /* UARed */
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .disconnect-btn:hover {
    background-color: #8B0015;
  }
  
  .connection-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .connection-info h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }
  
  .info-card {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
  }
  
  .info-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
  }
  
  .info-header h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    margin: 0;
  }
  
  .code-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .code {
    font-family: monospace;
    font-size: 1.25rem;
    letter-spacing: 0.05em;
  }
  
  .tooltip {
    position: relative;
  }
  
  .copy-btn {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background-color 0.2s;
  }
  
  .copy-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
  
  .tooltiptext {
    visibility: hidden;
    width: 120px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    text-align: center;
    border-radius: 0.25rem;
    padding: 0.25rem 0;
    position: absolute;
    z-index: 1;
    bottom: 125%;
    left: 50%;
    margin-left: -60px;
    opacity: 0;
    transition: opacity 0.3s;
    font-size: 0.75rem;
  }
  
  .tooltip:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
  
  .instructions-panel {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    padding: 1rem;
  }
  
  .instructions-panel h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
  }
  
  .steps {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .steps li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .step-number {
    background-color: #AB0520; /* UARed */
    color: white;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
  }
  
  .step-text {
    flex: 1;
    padding-top: 0.125rem;
  }
  
  .qr-section {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 1rem;
    text-align: center;
  }
  
  .qr-section h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 1rem 0;
  }
  
  .qr-code {
    width: 120px;
    height: 120px;
    background-color: white;
    color: black;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
  }
</style>
