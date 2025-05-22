<script lang="ts">
  import BaseSourceControl from './BaseSourceControl.svelte';
  import { onMount } from 'svelte';
  
  export let sourceId: number = 0;
  export let sourceLabel: string = 'Airmedia';
  
  // State variables
  let connectionCode = "1234-5678";
  let deviceIP = "192.168.2.151";
  let isConnected = false;
  let connectedDevice = "";
  let copySuccess = false;
  let activeCopyButton = '';
  
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
  
  function copyToClipboard(text: string, type: string) {
    navigator.clipboard.writeText(text).then(() => {
      activeCopyButton = type;
      copySuccess = true;
      setTimeout(() => {
        copySuccess = false;
        activeCopyButton = '';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }
  
  // Simulate connection status (in a real app this would be from Crestron)
  function simulateConnection() {
    isConnected = true;
    connectedDevice = "User's Laptop";
  }
</script>

<BaseSourceControl {sourceId} {sourceLabel} controlType="Wireless Presentation">
  <div class="airmedia-controls">
    <!-- Connection status -->
    <div class="status-panel">
      <div class="status-indicator {isConnected ? 'connected' : 'disconnected'}">
        <div class="status-icon">
          <i class="fas {isConnected ? 'fa-check-circle' : 'fa-broadcast-tower fa-pulse'}"></i>
        </div>
        <div class="status-text">
          <span class="status-label">{isConnected ? 'Connected' : 'Ready for Connection'}</span>
          {#if !isConnected}
            <button class="simulate-btn" on:click={simulateConnection}>
              <i class="fas fa-plug mr-1"></i>
              Simulate Connection
            </button>
          {/if}
        </div>
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
      
      <div class="info-cards">
        <div class="info-card">
          <div class="info-header">
            <i class="fas fa-key"></i>
            <h4>Connection Code</h4>
          </div>
          <div class="code-display">
            <span class="code">{connectionCode}</span>
            <button class="copy-btn {activeCopyButton === 'code' && copySuccess ? 'success' : ''}" 
                    on:click={() => copyToClipboard(connectionCode, 'code')}>
              <i class="fas {activeCopyButton === 'code' && copySuccess ? 'fa-check' : 'fa-copy'}"></i>
              <span class="sr-only">Copy to clipboard</span>
            </button>
          </div>
        </div>
        
        <div class="info-card">
          <div class="info-header">
            <i class="fas fa-network-wired"></i>
            <h4>IP Address</h4>
          </div>
          <div class="code-display">
            <span class="code">{deviceIP}</span>
            <button class="copy-btn {activeCopyButton === 'ip' && copySuccess ? 'success' : ''}" 
                    on:click={() => copyToClipboard(deviceIP, 'ip')}>
              <i class="fas {activeCopyButton === 'ip' && copySuccess ? 'fa-check' : 'fa-copy'}"></i>
              <span class="sr-only">Copy to clipboard</span>
            </button>
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
          <div class="step-text">
            <strong>Connect to WiFi</strong>
            <span>Join the same network as this display</span>
          </div>
        </li>
        <li>
          <div class="step-number">2</div>
          <div class="step-text">
            <strong>Open AirMedia</strong>
            <span>Use the app or browser extension</span>
          </div>
        </li>
        <li>
          <div class="step-number">3</div>
          <div class="step-text">
            <strong>Enter Connection Info</strong>
            <span>Use the code or IP address above</span>
          </div>
        </li>
        <li>
          <div class="step-number">4</div>
          <div class="step-text">
            <strong>Present Content</strong>
            <span>Select your screen and start sharing</span>
          </div>
        </li>
      </ol>
      
      <div class="qr-section">
        <h4>Or Scan QR Code to Connect</h4>
        <div class="qr-code">
          <i class="fas fa-qrcode"></i>
          <!-- In a real app, this would be an actual QR code image -->
          <span class="qr-hint">AirMedia Connect</span>
        </div>
      </div>
    </div>
  </div>
</BaseSourceControl>

<style>
  .airmedia-controls {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    height: 100%;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: rgba(171, 5, 32, 0.7) transparent; /* UARed with transparency */
  }
  
  .airmedia-controls::-webkit-scrollbar {
    width: 8px;
  }
  
  .airmedia-controls::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .airmedia-controls::-webkit-scrollbar-thumb {
    background-color: rgba(171, 5, 32, 0.7); /* UARed with transparency */
    border-radius: 8px;
  }
  
  /* Status Panel Styles */
  .status-panel {
    background: #1e5494; /* Solid color that contrasts with the main container */
    border-radius: 0.75rem;
    padding: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 
      0 6px 12px -2px rgba(0, 0, 0, 0.2),
      0 2px 4px rgba(0, 0, 0, 0.15),
      inset 0 1px 2px rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
  }
  
  .status-indicator {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    padding-bottom: 1rem;
  }
  
  .status-icon {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    flex-shrink: 0;
  }
  
  .status-indicator.connected .status-icon {
    background-color: rgba(72, 187, 120, 0.2); /* green with transparency */
    color: #48bb78; /* green */
    border: 2px solid #48bb78;
  }
  
  .status-indicator.disconnected .status-icon {
    background-color: rgba(171, 5, 32, 0.15); /* UARed with transparency */
    color: #f56565; /* red */
    border: 2px solid rgba(171, 5, 32, 0.5);
  }
  
  .status-text {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .status-label {
    font-size: 1.25rem;
    font-weight: 600;
  }
  
  .simulate-btn {
    align-self: flex-start;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.375rem;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .simulate-btn:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  
  .connected-device {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .connected-device h3 {
    font-size: 0.875rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    margin: 0 0 0.5rem 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .device-name {
    font-size: 1.25rem;
    margin: 0 0 1rem 0;
    font-weight: 500;
  }
  
  .disconnect-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.625rem 1.25rem;
    background-color: #AB0520; /* UARed */
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .disconnect-btn:hover {
    background-color: #8B0015;
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }
  
  .disconnect-btn:active {
    transform: translateY(1px);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  
  /* Connection Information Styles */
  .connection-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .connection-info h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.75rem 0;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    text-align: center;
    position: relative;
  }
  
  .connection-info h3::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 4rem;
    height: 2px;
    background-color: #AB0520; /* UARed */
  }
  
  .info-cards {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .info-card {
    background: #235685; /* Solid color matching the button styles in the footer */
    border-radius: 0.75rem;
    padding: 1rem 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 
      0 8px 15px -4px rgba(0, 0, 0, 0.25),
      0 3px 5px -2px rgba(0, 0, 0, 0.15),
      inset 0 1px 2px rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .info-card:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 10px 18px -4px rgba(0, 0, 0, 0.3),
      0 4px 6px -2px rgba(0, 0, 0, 0.2),
      inset 0 1px 2px rgba(255, 255, 255, 0.1);
  }
  
  .info-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 0.75rem;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .info-header i {
    font-size: 1.5rem;
    color: #AB0520; /* UARed */
    width: 2rem;
    text-align: center;
  }
  
  .info-header h4 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
    letter-spacing: 0.05em;
  }
  
  .code-display {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    background-color: rgba(0, 0, 0, 0.15);
    border-radius: 0.5rem;
    padding: 0.75rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .code {
    font-family: monospace;
    font-size: 1.5rem;
    letter-spacing: 0.1em;
    color: white;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }
  
  .copy-btn {
    background-color: rgba(12, 35, 75, 0.6); /* UABlue with transparency */
    color: white;
    border: none;
    border-radius: 0.5rem;
    width: 2.75rem;
    height: 2.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
    flex-shrink: 0;
  }
  
  .copy-btn:hover {
    background-color: rgba(12, 35, 75, 0.9); /* UABlue with less transparency */
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .copy-btn:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .copy-btn i {
    font-size: 1.25rem;
  }
  
  .copy-btn.success {
    background-color: #48bb78; /* green */
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  
  /* Instructions Panel Styles */
  .instructions-panel {
    background: #1e4d8a; /* Solid color that contrasts with the container but is distinct from other panels */
    border-radius: 0.75rem;
    padding: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 
      0 8px 16px -4px rgba(0, 0, 0, 0.3),
      0 4px 8px -2px rgba(0, 0, 0, 0.2),
      inset 0 1px 3px rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
  }
  
  .instructions-panel::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(171, 5, 32, 0.5), transparent); /* UARed gradient */
  }
  
  .instructions-panel h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 1.25rem 0;
    text-align: center;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    position: relative;
  }
  
  .instructions-panel h3::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 4rem;
    height: 2px;
    background-color: #AB0520; /* UARed */
  }
  
  .steps {
    list-style-type: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
  }
  
  .steps li {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.25rem;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .steps li:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
  
  .step-number {
    background-color: #0C234B; /* UABlue */
    color: white;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
    font-size: 1.125rem;
    border: 2px solid rgba(171, 5, 32, 0.7); /* UARed border */
  }
  
  .step-text {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  
  .step-text strong {
    font-size: 1.125rem;
    font-weight: 600;
    color: white;
  }
  
  .step-text span {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .qr-section {
    text-align: center;
    padding-top: 1.5rem;
    margin-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  .qr-section h4 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
    color: white;
  }
  
  .qr-code {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem;
    background-color: white;
    border-radius: 0.75rem;
    color: #0C234B; /* UABlue */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    margin: 0 auto;
    max-width: 10rem;
  }
  
  .qr-code i {
    font-size: 5rem;
  }
  
  .qr-hint {
    font-size: 0.75rem;
    font-weight: 600;
    color: #0C234B; /* UABlue */
  }
  
  /* Media Queries for Touch Panels */
  @media (min-width: 1600px) {
    /* Styles for TS-1070 (1920x1200) */
    .status-icon {
      width: 3.5rem;
      height: 3.5rem;
    }
    
    .status-icon i {
      font-size: 1.75rem;
    }
    
    .status-label {
      font-size: 1.5rem;
    }
    
    .code {
      font-size: 1.75rem;
    }
    
    .copy-btn {
      width: 3rem;
      height: 3rem;
    }
    
    .copy-btn i {
      font-size: 1.5rem;
    }
    
    .step-number {
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1.25rem;
    }
    
    .step-text strong {
      font-size: 1.25rem;
    }
    
    .step-text span {
      font-size: 1rem;
    }
    
    .qr-code {
      max-width: 12rem;
      padding: 2rem;
    }
    
    .qr-code i {
      font-size: 6rem;
    }
  }
</style>
