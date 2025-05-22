<script lang="ts">
  /**
   * Main application component for the Crestron CH5 Svelte Demo Panel.
   * Handles core application state, Crestron signal management, and UI rendering.
   * @component
   * @requires ./components/SourceControl.svelte
   * @see https://github.com/crestron/ch5-svelte for Crestron Svelte integration
   */
  
  import { useAnalog, useDigital, useSerial } from 'ch5-svelte';
  import { onMount, onDestroy } from 'svelte';
  import SourceControl from './components/SourceControl.svelte';
  
  /**
   * Type definition for the Crestron Communication Library (CrComLib) interface.
   * Provides type safety for Crestron signal operations.
   * @typedef {Object} CrComLibType
   * @property {Function} subscribeState - Subscribes to a Crestron signal
   * @property {Function} unsubscribeState - Unsubscribes from a Crestron signal
   * @property {Function} getState - Gets the current state of a Crestron signal
   */
  interface CrComLibType {
    /**
     * Subscribes to a Crestron signal
     * @param {string} type - Signal type ('b' for boolean, 'n' for number, 's' for string)
     * @param {string} key - Signal join name
     * @param {(value: any) => void} callback - Callback function when signal changes
     * @returns {string} Subscription ID for unsubscribing
     */
    subscribeState: (
      type: string, 
      key: string, 
      callback: (value: any) => void
    ) => string;
    
    /**
     * Unsubscribes from a Crestron signal
     * @param {string} type - Signal type
     * @param {string} key - Signal join name
     * @param {string} id - Subscription ID from subscribeState
     */
    unsubscribeState: (type: string, key: string, id: string) => void;
    
    /**
     * Gets the current state of a Crestron signal
     * @param {string} type - Signal type
     * @param {string} key - Signal join name
     * @returns {any} Current value of the signal
     */
    getState: (type: string, key: string) => any;
  }
  
  /**
   * Global Crestron Communication Library instance.
   * @type {CrComLibType|undefined}
   * @see CrComLibType
   */
  const crComLib = (window as any).CrComLib as CrComLibType | undefined;
  
  /**
   * Generic interface for Crestron signals with type safety.
   * @template T - Type of the signal value
   */
  interface CrestronSignal<T = any> {
    /** Current value of the signal */
    value: T;
    
    /** Sets the signal value (for output signals) */
    set?: (value: T) => void;
    
    /** Pulses the signal (for digital signals) */
    pulse?: () => void;
    
    /** Subscribes to value changes */
    subscribe?: (callback: (value: T) => void) => () => void;
  }
  
  /**
   * Represents an AV source in the system.
   * @typedef {Object} Source
   * @property {number} id - Unique identifier for the source
   * @property {string} label - Display name of the source
   * @property {string} icon - Font Awesome icon class for the source
   */
  interface Source {
    id: number;
    label: string;
    icon: string;
  }
  
  /**
   * Default source configurations that will be overridden by the control system.
   * @type {Source[]}
   * @example
   * [
   *   { id: 1, label: 'PC', icon: 'fa-desktop' },
   *   { id: 2, label: 'Laptop', icon: 'fa-laptop' }
   * ]
   */
  const defaultSources: Source[] = [
    { id: 1, label: 'PC', icon: 'fa-solid fa-desktop' },
    { id: 2, label: 'Laptop', icon: 'fa-solid fa-laptop' },
    { id: 3, label: 'Airmedia', icon: 'fa-solid fa-wifi' },
    { id: 4, label: 'Doc Cam', icon: 'fa-solid fa-video' },
    { id: 5, label: 'Lectern HDMI', icon: 'fa-solid fa-plug' },
    { id: 6, label: 'Floor Plate', icon: 'fa-solid fa-square' },
    { id: 7, label: 'Floor Plate 2', icon: 'fa-solid fa-square' },
    { id: 8, label: 'Source 8', icon: 'fa-solid fa-square' }
  ];
  
  /**
   * Reactive array of all available sources.
   * Updated from the control system or falls back to defaultSources.
   * @type {Source[]}
   */
  let allSources = [...defaultSources];
  
  /**
   * Number of source buttons to display.
   * Used to control how many sources are shown in the UI.
   * @type {number}
   */
  let sourceBtnCount = allSources.length;
  $: visibleSources = allSources.slice(0, Math.min(Math.max(0, sourceBtnCount), allSources.length));
  
  
  // Current time display
  let currentTime = '';
  
  function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    currentTime = `${displayHours}:${minutes} ${ampm}`;
  }
  
  // Update time every minute
  setInterval(updateTime, 60000);
  updateTime(); // Initial call
  
  // Track current source and volume state
  let currentSource: number = 0;
  let currentVolume: number = 50; // 0-100 scale
  let isMuted = false;
  let isMicMuted = false;
  let sourceFeedbackSubscriptionId: string | null = null;
  let showPowerModal = false;
  let showHelpModal = false;
  let showSettingsPasswordModal = false;
  let showSettings = false;
  let settingsPassword = '';
  let passwordInput = '';
  let passwordError = '';
  let activeTab = 'Audio';
  const CORRECT_PASSWORD = '1234'; // In production, use a more secure method
  let countdown = 300; // 30 seconds (in 100ms increments)
  let countdownInterval: ReturnType<typeof setInterval> | null = null;
  
  // Settings tabs
  const settingsTabs = ['Audio', 'Video', 'Icons', 'Aux'];
  
  // Get the currently selected source
  $: selectedSource = allSources.find(source => source.id === currentSource);

  function openHelpModal() {
    showHelpModal = true;
  }

  function closeHelpModal() {
    showHelpModal = false;
  }

  function openSettings() {
    showSettingsPasswordModal = true;
    passwordInput = '';
    passwordError = '';
  }

  function closeSettingsPasswordModal() {
    showSettingsPasswordModal = false;
    passwordInput = '';
    passwordError = '';
  }

  function verifyPassword() {
    if (passwordInput === CORRECT_PASSWORD) {
      showSettingsPasswordModal = false;
      showSettings = true;
      passwordError = '';
      passwordInput = '';
    } else {
      passwordError = 'Incorrect password. Please try again.';
    }
  }

  function closeSettings() {
    showSettings = false;
  }

  function openPowerModal() {
    showPowerModal = true;
    countdown = 300; // Reset to 30 seconds
    
    // Start countdown
    countdownInterval = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        // When countdown reaches zero, trigger power off
        if (powerSignal) {
          powerSignal.pulse();
        }
        closePowerModal();
      }
    }, 100); // Update every 100ms for smoother countdown
  }

  function closePowerModal() {
    if (countdownInterval) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
    showPowerModal = false;
  }

  function confirmShutdown() {
    console.log('Triggering system shutdown...');
    // Pulse the digital signal to trigger power off
    if (powerSignal) {
      powerSignal.pulse();
    }
    closePowerModal();
  }

  onDestroy(() => {
    if (countdownInterval) {
      clearInterval(countdownInterval);
    }
  });

  // Crestron signals
  let sourceSignal: CrestronSignal<number> | null = null;
  let feedbackSignal: CrestronSignal<number> | null = null;
  let volumeUpSignal: CrestronSignal<boolean> | null = null;
  let volumeDownSignal: CrestronSignal<boolean> | null = null;
  let muteToggleSignal: CrestronSignal<boolean> | null = null;
  let volumeFeedbackSignal: CrestronSignal<number> | null = null;
  let muteFeedbackSignal: CrestronSignal<boolean> | null = null;
  
  // Room name state
  let roomName = 'Room Name';
  let roomNameSubscriptionId: string | null = null;
  
  // Subscribe to source name updates using CrComLib
  function setupSourceNameSubscriptions() {
    if (!crComLib) return [];
    
    const subscriptionIds: string[] = [];
    
    // Create subscriptions for each source name
    for (let i = 1; i <= 8; i++) {
      const signalName = `MPC3201B.Source${i}Name`;
      try {
        const subId = crComLib.subscribeState(
          's', // 's' for string signal
          signalName,
          (value: string) => {
            if (value && value.trim() !== '') {
              allSources = allSources.map(source => 
                source.id === i ? { ...source, label: value } : source
              );
              console.log(`Updated source ${i} name to:`, value);
            }
          }
        );
        subscriptionIds.push(subId);
        
        // Get initial value
        const initialValue = crComLib.getState('s', signalName);
        if (initialValue && initialValue.trim() !== '') {
          allSources = allSources.map(source => 
            source.id === i ? { ...source, label: initialValue } : source
          );
        }
      } catch (error) {
        console.error(`Error setting up subscription for ${signalName}:`, error);
      }
    }
    
    return subscriptionIds;
  }
  
  // Subscribe to room name updates using CrComLib directly
  onMount(() => {
    const sourceSubscriptions = setupSourceNameSubscriptions();
    
    // Cleanup function for source subscriptions
    return () => {
      if (crComLib) {
        sourceSubscriptions.forEach((subId, index) => {
          try {
            crComLib.unsubscribeState('s', `MPC3201B.Source${index + 1}Name`, subId);
          } catch (error) {
            console.error(`Error unsubscribing from source ${index + 1} name:`, error);
          }
        });
      }
    };
  });
  
  onMount(() => {
    console.log('Setting up room name subscription...');
    
    // Check if CrComLib is available
    if (crComLib) {
      try {
        // Subscribe to the room name signal
        roomNameSubscriptionId = crComLib.subscribeState(
          's', // 's' for string signal
          'MPC3201B.RoomName',
          (value: string) => {
            console.log('Received room name update:', value);
            roomName = value || 'Room Name';
          }
        );
        console.log('Room name subscription ID:', roomNameSubscriptionId);
        
        // Get initial value
        const initialValue = crComLib.getState('s', 'MPC3201B.RoomName');
        if (initialValue) {
          console.log('Initial room name:', initialValue);
          roomName = initialValue;
        }
      } catch (error) {
        console.error('Error setting up room name subscription:', error);
      }
    } else {
      console.warn('CrComLib not available for room name subscription');
    }
    
    // Cleanup function
    return () => {
      if (crComLib) {
        // Clean up room name subscription
        if (roomNameSubscriptionId) {
          try {
            console.log('Cleaning up room name subscription');
            crComLib.unsubscribeState('s', 'MPC3201B.RoomName', roomNameSubscriptionId);
          } catch (error) {
            console.error('Error cleaning up room name subscription:', error);
          }
        }
        
        // Clean up source feedback subscription
        if (sourceFeedbackSubscriptionId) {
          try {
            console.log('Cleaning up source feedback subscription');
            crComLib.unsubscribeState('n', 'MPC3201B.SourceFb', sourceFeedbackSubscriptionId);
          } catch (error) {
            console.error('Error cleaning up source feedback subscription:', error);
          }
        }
      }
    };
  });
  
  // Power signal using useDigital for MPC3201B.Power
  const powerSignal = useDigital('MPC3201B.Power');
  
  // Ensure powerSignal is properly typed
  if (!powerSignal) {
    throw new Error('Failed to initialize power signal');
  }
  
  // Initialize Crestron signals
  onMount(() => {
    try {
      // Source control signals
      sourceSignal = useAnalog("MPC3201B.Source");
      feedbackSignal = useAnalog("MPC3201B.SourceFb");
      
      // Subscribe to source feedback changes
      if (crComLib) {
        sourceFeedbackSubscriptionId = crComLib.subscribeState(
          'n', // 'n' for numeric signal
          'MPC3201B.SourceFb',
          (value: number) => {
            console.log('Source feedback changed:', value);
            if (value !== null && value !== undefined) {
              const sourceId = Math.round(Number(value));
              currentSource = sourceId;
              console.log('Updated current source from feedback:', sourceId);
            }
          }
        );
        console.log('Source feedback subscription ID:', sourceFeedbackSubscriptionId);
        
        // Get initial value
        const initialSource = crComLib.getState('n', 'MPC3201B.SourceFb');
        if (initialSource !== null && initialSource !== undefined) {
          const sourceId = Math.round(Number(initialSource));
          currentSource = sourceId;
          console.log('Initial source from feedback:', sourceId);
        }
      }
      
      // Volume control signals
      volumeUpSignal = useDigital("MPC3201B.VolumeUp");
      volumeDownSignal = useDigital("MPC3201B.VolumeDown");
      muteToggleSignal = useDigital("MPC3201B.Mute");
      
      // Feedback signals
      volumeFeedbackSignal = useAnalog("MPC3201B.Bargraph");
      muteFeedbackSignal = useDigital("MPC3201B.MuteFb");
      
      // Subscribe to source button count changes
      const btnCountSignal = useAnalog("MPC3201B.SourceBtnCount");
      if (btnCountSignal) {
        // Initial update
        if (btnCountSignal.value !== undefined) {
          sourceBtnCount = Math.round(btnCountSignal.value);
          console.log('Initial source button count:', sourceBtnCount);
        }
        
        // Set up polling for updates
        const interval = setInterval(() => {
          if (btnCountSignal?.value !== undefined) {
            const newCount = Math.round(btnCountSignal.value);
            if (newCount !== sourceBtnCount) {
              sourceBtnCount = newCount;
              console.log('Updated source button count to:', sourceBtnCount);
            }
          }
          
          // Update volume and mute state
          if (volumeFeedbackSignal?.value !== undefined) {
            currentVolume = Math.min(100, Math.max(0, Math.round(volumeFeedbackSignal.value)));
          }
          
          if (muteFeedbackSignal?.value !== undefined) {
            isMuted = muteFeedbackSignal.value;
          }
          
        }, 100);
        
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
      }
      
      // Volume control signals
      volumeUpSignal = useDigital("MPC3201B.VolumeUp");
      volumeDownSignal = useDigital("MPC3201B.VolumeDown");
      muteToggleSignal = useDigital("MPC3201B.Mute");
      
      // Feedback signals
      volumeFeedbackSignal = useAnalog("MPC3201B.Bargraph");
      muteFeedbackSignal = useDigital("MPC3201B.MuteFb");
      
      // Update state when feedback changes
      const interval = setInterval(() => {
        // Update source
        if (feedbackSignal?.value !== undefined) {
          currentSource = feedbackSignal.value;
        }
        
        // Update volume level (0-100 scale)
        if (volumeFeedbackSignal?.value !== undefined) {
          // Directly use the value (0-100) from the control system
          currentVolume = Math.min(100, Math.max(0, Math.round(volumeFeedbackSignal.value)));
        }
        
        // Update mute state
        if (muteFeedbackSignal?.value !== undefined) {
          isMuted = muteFeedbackSignal.value;
        }
      }, 100);
      
      return () => clearInterval(interval);
    } catch (error) {
      console.error('Error initializing signals:', error);
    }
  });
  
  // Function to handle source selection
  function selectSource(sourceId: number): void {
    try {
      currentSource = sourceId;
      
      // Send the command if signal is available
      if (sourceSignal) {
        sourceSignal.value = sourceId;
      }
      
      console.log(`Selected source: ${sourceId}`);
    } catch (error) {
      console.error('Error selecting source:', error);
    }
  }

  // Button click handlers
  function handlePower() {
    openPowerModal();
  }
  
  function handleMute() {
    try {
      console.log('Mute toggled');
      if (muteToggleSignal?.pulse) {
        // Send a pulse to toggle mute
        muteToggleSignal.pulse();
        // Toggle local state immediately for better UX
        isMuted = !isMuted;
      }
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  }
  
  function toggleMicrophone() {
    try {
      console.log('Microphone toggled');
      isMicMuted = !isMicMuted;
      // Add your microphone toggle logic here
    } catch (error) {
      console.error('Error toggling microphone:', error);
    }
  }
  
  function handleVolumeUp() {
    try {
      console.log('Volume up');
      if (volumeUpSignal?.pulse) {
        volumeUpSignal.pulse();
      }
    } catch (error) {
      console.error('Error increasing volume:', error);
    }
  }
  
  function handleVolumeDown() {
    try {
      console.log('Volume down');
      if (volumeDownSignal?.pulse) {
        volumeDownSignal.pulse();
      }
    } catch (error) {
      console.error('Error decreasing volume:', error);
    }
  }
</script>

<div id="app-container" class="fixed inset-0 w-screen h-screen overflow-hidden bg-[#0C234B] flex items-center justify-center">
  <main class="relative bg-[#0a1a36] overflow-hidden" style="width: 1280px; height: 800px; transform-origin: center center;">
  <!-- Header with status, icons and time -->
  <header class="relative h-16 px-6">
    <!-- Header content positioned 1/2 of header height from center -->
    <div class="absolute top-1/2 -translate-y-1/2 left-6 flex items-center space-x-4">
      <img 
        src="/images/arizona-wildcats-logo.svg" 
        alt="Arizona Wildcats Logo" 
        class="h-10 w-auto"
      />
      <div class="status text-lg font-medium">{roomName || 'Loading...'}</div>
    </div>
    <div class="absolute top-1/2 -translate-y-1/2 right-6 flex items-center space-x-4">
      <div class="time text-lg font-medium">{new Date().toLocaleTimeString()}</div>
      <button class="icon-button flex items-center space-x-1" on:click={openHelpModal}>
        <i class="fas fa-question-circle text-xl"></i>
        <span class="button-text">Help</span>
      </button>
      <button class="icon-button flex items-center space-x-1" on:click={openSettings}>
        <i class="fas fa-cog text-xl"></i>
        <span class="button-text">Settings</span>
      </button>
    </div>
  </header>
  
  <!-- Tab Navigation -->
  <div class="tab-navigation" style="display: none;">
    <button class="tab-button">
      <i class="fas fa-home"></i> Home
    </button>
    <button class="tab-button active">
      <i class="fas fa-list"></i> Sources
    </button>
    <button class="tab-button">
      <i class="fas fa-cog"></i> Settings
    </button>
    <button class="tab-button">
      <i class="fas fa-question-circle"></i> Help
    </button>
  </div>
  
  <!-- Main content area -->
  <div class="content-area">
    <!-- Source selection buttons -->
    <div class="source-list">
      {#each visibleSources as source}
        <button 
          class="source-button {currentSource === source.id ? 'active' : ''}"
          on:click={() => selectSource(source.id)}
        >
          <i class="{source.icon}"></i>
          <span>{source.label}</span>
        </button>
      {/each}
    </div>
    
    <!-- Main display area -->
    <div class="display-area">
      {#if currentSource === 0}
        <div class="ua-logo-container">
          <img src="https://brand.arizona.edu/sites/default/files/UA_Block_A_White.png" alt="University of Arizona Logo" class="ua-logo" />
          <h2>University of Arizona</h2>
          <p>Touch Panel Control System</p>
          <p class="instruction">Select a source to begin</p>
        </div>
      {:else}
        {#if selectedSource}
          <SourceControl 
            sourceId={currentSource} 
            sourceLabel={selectedSource.label} 
          />
        {/if}
      {/if}
    </div>
  </div>
  
  <!-- White separator line -->
  <div class="white-line"></div>
  
  <!-- Footer with controls -->
  <div class="relative w-full" style="position: relative; height: 100px; background-color: #0C234B;">
    <!-- Footer with reduced size -->
    <footer class="relative overflow-hidden text-white py-4 px-8 flex justify-between items-center w-full h-full">
      <!-- Full gradient overlay -->
      <div class="gradient-overlay" style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 0;"></div>
      <!-- White divider line above footer -->
      <div style="position: absolute; top: -2px; left: 0; right: 0; height: 2px; background-color: white; z-index: 1;"></div>
      <!-- Content container -->
      <div class="relative z-10 w-full flex justify-between items-center">
      <!-- Left side - Power button -->
      <div class="flex-1">
        <button 
          class="w-20 h-20 bg-[#12406B] hover:bg-[#235685] rounded-full flex items-center justify-center text-white transition-colors shadow-lg"
          on:click={handlePower}
          aria-label="Power"
        >
          <i class="fas fa-power-off text-4xl"></i>
        </button>
      </div>
      
      <!-- Right side - Volume controls -->
      <div class="flex-1 flex justify-end items-center space-x-4">
        <!-- Microphone button -->
        <button 
          class="w-16 h-16 flex items-center justify-center rounded-full shadow-md transition-colors {isMicMuted ? 'border-4 border-[#0C234B] bg-[#AB0520]' : 'bg-[#12406B] hover:bg-[#235685]'}"
          on:click={toggleMicrophone}
          aria-label={isMicMuted ? 'Unmute Microphone' : 'Mute Microphone'}
          style="width: 4rem; height: 4rem;"
        >
          <i class={`fas ${isMicMuted ? 'fa-microphone-slash text-white' : 'fa-microphone'}`} style="font-size: 1.8rem;"></i>
        </button>
        
        <!-- Mute button -->
        <button 
          class="w-16 h-16 flex items-center justify-center rounded-full shadow-md transition-colors {isMuted ? 'border-4 border-[#0C234B] bg-[#AB0520]' : 'bg-[#12406B] hover:bg-[#235685]'}"
          on:click={handleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          style="width: 4rem; height: 4rem;"
        >
          <i class={`fas ${isMuted ? 'fa-volume-mute text-white' : 'fa-volume-off'}`} style="font-size: 1.8rem;"></i>
        </button>
        
        <!-- Volume down -->
        <button 
          class="w-16 h-16 bg-[#12406B] hover:bg-[#235685] rounded-full flex items-center justify-center shadow-md"
          on:click={handleVolumeDown}
          aria-label="Volume Down"
          style="width: 4rem; height: 4rem;"
        >
          <i class="fas fa-volume-down" style="font-size: 1.8rem;"></i>
        </button>
        
        <!-- Volume slider with feedback -->
        <div class="w-48 h-4 bg-[#12406B] rounded-full relative shadow-inner">
          <!-- Active volume level -->
          <div 
            class="absolute left-0 top-0 bottom-0 bg-white rounded-full transition-all duration-200" 
            style="width: {currentVolume}%; margin: 1px;"
          ></div>
          <!-- Background track (shows full range) -->
          <div 
            class="absolute top-0 bottom-0 bg-white bg-opacity-20 rounded-full" 
            style="left: 0; right: 0; margin: 1px;"
          ></div>
        </div>
        
        <!-- Volume percentage display -->
        <div class="text-sm font-mono w-10 text-center text-white">
          {currentVolume}%
        </div>
        
        <!-- Volume up -->
        <button 
          class="w-16 h-16 bg-[#12406B] hover:bg-[#235685] rounded-full flex items-center justify-center shadow-md"
          on:click={handleVolumeUp}
          aria-label="Volume Up"
          style="width: 4rem; height: 4rem;"
        >
          <i class="fas fa-volume-up" style="font-size: 1.8rem;"></i>
        </button>
      </div>
      </div>
      <!-- Subtle overlay for depth -->
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-10"></div>
    </footer>
  </div>

  <!-- Power Confirmation Modal -->
  {#if showPowerModal}
    <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div class="bg-[#0C234B] text-white rounded-lg p-6 max-w-lg w-full mx-4 border-2 border-white transform scale-125 origin-center">
        <h3 class="text-2xl font-bold mb-4 text-center">System Shutdown</h3>
        <p class="mb-4 text-base text-center">
          Are you sure you want to shutdown the system?
          <br>
          <span class="text-yellow-300 font-bold text-lg block mt-1">{Math.ceil(countdown / 10)} seconds remaining</span>
        </p>
        <div class="flex justify-center space-x-4 mt-6">
          <button 
            on:click={confirmShutdown}
            class="px-6 py-2 bg-[#AB0520] hover:bg-red-700 rounded-md font-medium transition-colors"
          >
            Yes, Shutdown
          </button>
          <button 
            on:click={closePowerModal}
            class="px-6 py-2 bg-gray-500 hover:bg-gray-600 rounded-md font-medium transition-colors"
          >
            No, Return
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Help Modal -->
  {#if showHelpModal}
    <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" on:click|self={closeHelpModal}>
      <div class="bg-[#0C234B] text-white rounded-lg p-8 max-w-md w-full mx-4 border-2 border-white transform scale-125 origin-center">
        <div class="text-center mb-6">
          <i class="fas fa-phone-alt text-4xl text-[#AB0520] mb-4"></i>
          <h3 class="text-2xl font-bold mb-2">Need Help?</h3>
          <p class="text-lg mb-6">For technical support, please call:</p>
          <a href="tel:+15206214888" class="text-3xl font-bold text-white hover:text-[#AB0520] transition-colors">
            (520) 621-4888
          </a>
          <p class="text-sm text-gray-300 mt-2">Available Monday-Friday, 8AM-5PM</p>
        </div>
        <div class="flex justify-center">
          <button 
            on:click={closeHelpModal}
            class="px-8 py-2 bg-[#0C234B] border-2 border-white text-white hover:bg-[#AB0520] rounded-md font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  {/if}

  <!-- Settings Password Modal -->
  {#if showSettingsPasswordModal}
    <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" on:click|self={closeSettingsPasswordModal}>
      <div class="bg-[#0C234B] text-white rounded-lg p-8 max-w-md w-full mx-4 border-2 border-white transform scale-125 origin-center">
        <div class="text-center mb-6">
          <i class="fas fa-lock text-4xl text-[#AB0520] mb-4"></i>
          <h3 class="text-2xl font-bold mb-2">Enter Admin Password</h3>
          
          <div class="mb-4">
            <input 
              type="password"
              bind:value={passwordInput}
              class="w-full px-4 py-2 rounded text-black"
              placeholder="Enter password"
              on:keydown={(e) => e.key === 'Enter' && verifyPassword()}
            />
            {#if passwordError}
              <p class="text-red-400 text-sm mt-1">{passwordError}</p>
            {/if}
          </div>
          
          <div class="flex justify-center space-x-4">
            <button 
              on:click={verifyPassword}
              class="px-6 py-2 bg-[#0C234B] border-2 border-white text-white hover:bg-[#AB0520] rounded-md font-medium transition-colors"
            >
              Enter
            </button>
            <button 
              on:click={closeSettingsPasswordModal}
              class="px-6 py-2 bg-gray-500 hover:bg-gray-600 rounded-md font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Settings Modal -->
  {#if showSettings}
    <div class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div class="bg-[#0C234B] text-white rounded-lg p-6 max-w-5xl w-full mx-4 border-2 border-white transform scale-125 origin-center max-h-[90vh] overflow-hidden flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold">System Settings</h2>
          <button 
            on:click={closeSettings}
            class="text-white hover:text-[#AB0520] text-2xl p-1"
            aria-label="Close settings"
          >
            &times;
          </button>
        </div>
        
        <!-- Tabs Navigation -->
        <div class="border-b border-gray-700 mb-6">
          <div class="flex space-x-1">
            {#each settingsTabs as tab}
              <button
                class={`px-6 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-[#0a1a36] text-white border-b-2 border-[#AB0520]'
                    : 'text-gray-400 hover:text-white hover:bg-[#0a1a36]'
                }`}
                on:click={() => activeTab = tab}
                aria-current={activeTab === tab ? 'page' : undefined}
              >
                {tab}
              </button>
            {/each}
          </div>
        </div>
        
        <!-- Tab Content -->
        <div class="flex-1 overflow-y-auto pr-2">
          <!-- Audio Tab -->
          {#if activeTab === 'Audio'}
            <div class="space-y-6">
              <div class="bg-[#0a1a36] p-6 rounded-lg">
                <h3 class="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">Audio Output</h3>
                <div class="space-y-6">
                  <div class="flex items-center justify-between">
                    <div>
                      <label class="block text-sm font-medium mb-1">Master Volume</label>
                      <p class="text-xs text-gray-400">Adjust the overall system volume</p>
                    </div>
                    <input type="range" min="0" max="100" value="75" class="w-64 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div>
                      <label class="block text-sm font-medium mb-1">Startup Volume</label>
                      <p class="text-xs text-gray-400">Volume level when system starts</p>
                    </div>
                    <input type="range" min="0" max="100" value="30" class="w-64 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="flex items-center space-x-3">
                        <input type="checkbox" class="form-checkbox h-5 w-5 text-[#AB0520] rounded" checked />
                        <span class="text-sm font-medium">Startup Sound</span>
                      </label>
                      <p class="text-xs text-gray-400 mt-1">Play sound when system starts</p>
                    </div>
                    
                    <div>
                      <label class="flex items-center space-x-3">
                        <input type="checkbox" class="form-checkbox h-5 w-5 text-[#AB0520] rounded" checked />
                        <span class="text-sm font-medium">Button Clicks</span>
                      </label>
                      <p class="text-xs text-gray-400 mt-1">Play sound on button press</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/if}
          
          <!-- Video Tab -->
          {#if activeTab === 'Video'}
            <div class="space-y-6">
              <div class="bg-[#0a1a36] p-6 rounded-lg">
                <h3 class="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">Display Settings</h3>
                <div class="space-y-6">
                  <div class="flex items-center justify-between">
                    <div>
                      <label class="block text-sm font-medium mb-1">Screen Brightness</label>
                      <p class="text-xs text-gray-400">Adjust the display brightness</p>
                    </div>
                    <input type="range" min="0" max="100" value="80" class="w-64 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" />
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <div>
                      <label class="block text-sm font-medium mb-1">Screen Timeout</label>
                      <p class="text-xs text-gray-400">Time before screen dims</p>
                    </div>
                    <select class="bg-[#0C234B] border border-gray-600 rounded px-3 py-1.5 text-sm">
                      <option>1 minute</option>
                      <option>5 minutes</option>
                      <option>15 minutes</option>
                      <option>30 minutes</option>
                      <option>Never</option>
                    </select>
                  </div>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label class="flex items-center space-x-3">
                        <input type="checkbox" class="form-checkbox h-5 w-5 text-[#AB0520] rounded" checked />
                        <span class="text-sm font-medium">Auto-Dim Display</span>
                      </label>
                      <p class="text-xs text-gray-400 mt-1">Dim display in low light</p>
                    </div>
                    
                    <div>
                      <label class="flex items-center space-x-3">
                        <input type="checkbox" class="form-checkbox h-5 w-5 text-[#AB0520] rounded" />
                        <span class="text-sm font-medium">High Contrast Mode</span>
                      </label>
                      <p class="text-xs text-gray-400 mt-1">Enhance color contrast</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/if}
          
          <!-- Icons Tab -->
          {#if activeTab === 'Icons'}
            <div class="space-y-6">
              <div class="bg-[#0a1a36] p-6 rounded-lg">
                <h3 class="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">Icon Settings</h3>
                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium mb-2">Icon Size</label>
                    <div class="flex items-center space-x-4">
                      {#each ['Small', 'Medium', 'Large'] as size}
                        <label class="flex items-center">
                          <input 
                            type="radio" 
                            name="iconSize" 
                            value={size.toLowerCase()} 
                            class="h-4 w-4 text-[#AB0520] focus:ring-[#AB0520]"
                            checked={size === 'Medium'}
                          />
                          <span class="ml-2 text-sm">{size}</span>
                        </label>
                      {/each}
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium mb-2">Icon Style</label>
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {#each [
                        { name: 'Default', icon: 'fa-solid fa-icons' },
                          { name: 'Minimal', icon: 'fa-solid fa-border-style' },
                          { name: 'Colorful', icon: 'fa-solid fa-palette' },
                          { name: '3D', icon: 'fa-solid fa-cube' }
                        ] as style}
                        <div class="flex flex-col items-center p-3 border rounded-lg border-gray-700 hover:border-[#AB0520] transition-colors cursor-pointer">
                          <i class="${style.icon} text-2xl mb-2"></i>
                          <span class="text-sm">{style.name}</span>
                        </div>
                      {/each}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/if}
          
          <!-- Aux Tab -->
          {#if activeTab === 'Aux'}
            <div class="space-y-6">
              <div class="bg-[#0a1a36] p-6 rounded-lg">
                <h3 class="text-xl font-semibold mb-4 pb-2 border-b border-gray-700">Auxiliary Settings</h3>
                <div class="space-y-6">
                  <div class="space-y-4">
                    <div>
                      <label class="block text-sm font-medium mb-1">Auxiliary Input Label</label>
                      <input 
                        type="text" 
                        placeholder="Enter custom label" 
                        class="w-full px-3 py-2 bg-[#0C234B] border border-gray-600 rounded-md text-sm"
                        value="Auxiliary Input"
                      />
                    </div>
                    
                    <div>
                      <label class="block text-sm font-medium mb-1">Default Aux Volume</label>
                      <div class="flex items-center space-x-4">
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value="60" 
                          class="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <span class="text-sm w-12 text-center">60%</span>
                      </div>
                    </div>
                    
                    <div class="pt-2">
                      <label class="flex items-center space-x-3">
                        <input type="checkbox" class="form-checkbox h-5 w-5 text-[#AB0520] rounded" checked />
                        <span class="text-sm font-medium">Enable Auxiliary Input</span>
                      </label>
                      <p class="text-xs text-gray-400 mt-1">Show auxiliary input in source list</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          {/if}
        </div>
        
        <!-- Footer Buttons -->
        <div class="flex justify-end space-x-4 pt-6 mt-4 border-t border-gray-700">
          <button 
            on:click={closeSettings}
            class="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-md font-medium transition-colors"
          >
            Cancel
          </button>
          <button 
            on:click={() => {
              // Save settings logic here
              closeSettings();
            }}
            class="px-6 py-2 bg-[#0C234B] border-2 border-white text-white hover:bg-[#AB0520] rounded-md font-medium transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  {/if}
  </main>
</div>

<style>
  /* Reset and base styles */
  :global(html), :global(body) {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    border: none !important;
  }
  
  :global(#app) {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: none !important;
    overflow: hidden;
  }
  
  /* Scale for TS-1070 (1920x1200) */
  @media (min-width: 1600px) {
    #app-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    #app-container main {
      transform: scale(1.5);
      transform-origin: center center;
      width: 1280px;
      height: 800px;
      position: relative;
    }
    
    /* Adjust specific elements if needed */
    #app-container header {
      padding-top: 1rem;
    }
  }
  
  /* Ensure touch targets are properly sized */
  button, [role="button"] {
    min-height: 48px;
    min-width: 48px;
  }
  
  /* Optimize text rendering */
  body {
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Main container */
  main {
    display: flex;
    flex-direction: column;
    background-color: #0a1a36;
    color: white;
    overflow: hidden;
    padding-top: 0;
    margin-top: 0;
  }
  
  /* Header styles */
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    background-color: #0C234B;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    height: 60px; /* Increased height to match sidebar */
    min-height: 60px; /* Ensure height is maintained */
  }
  
  .status {
    font-size: 24px;
    font-weight: 600;
    color: #FFFFFF;
  }
  
  .header-controls {
    display: flex;
    align-items: center;
    gap: 24px;
  }
  
  .icon-button {
    background: none;
    border: none;
    color: #FFFFFF;
    font-size: 18px;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 4px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  
  .button-text {
    font-size: 16px;
    font-weight: 500;
  }
  
  .icon-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }
  
  .time {
    font-size: 24px;
    font-weight: 600;
    color: #FFFFFF;
    margin-left: 4px;
  }
  
  /* Tab Navigation */
  .tab-navigation {
    display: none; /* Hide the tab navigation */
    position: absolute;
    top: 60px; /* Height of the header */
    left: 220px; /* Width of the sidebar */
    right: 0;
    height: 50px;
    background-color: #0a1a36;
    display: flex;
    justify-content: flex-end; /* Align buttons to the right */
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 10;
  }

  .tab-button {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    padding: 0 15px; /* Slightly reduced padding */
    height: 100%;
    display: flex;
    align-items: center;
    gap: 6px; /* Reduced gap */
    font-size: 14px; /* Slightly smaller font */
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 3px solid transparent;
    outline: none; /* Remove focus outline */
    white-space: nowrap; /* Prevent wrapping */
  }

  .tab-button:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
  }

  .tab-button.active {
    color: white;
    border-bottom-color: #AB0520; /* UA Red */
    font-weight: 500;
  }

  .tab-button i {
    font-size: 18px;
  }

  /* Content area */
  .content-area {
    display: flex;
    flex: 1;
    padding: 0;
    margin: 0; /* Reset margin to align with header */
    overflow: hidden;
  }
  
  /* Source list */
  .source-list {
    width: 220px;
    background-color: rgba(0, 0, 0, 0.2);
    padding: 15px 0;
    overflow-y: auto;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .source-button {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 30px 20px;
    min-height: 80px;
    background: none;
    border: none;
    color: white;
    text-align: left;
    font-size: 21.6px; /* Increased by 20% from 18px */
    cursor: pointer;
    transition: background-color 0.2s;
    outline: none; /* Remove focus outline */
  }
  
  .source-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .source-button.active {
    background-color: rgba(171, 5, 32, 0.5); /* UA red with transparency */
    border-left: 4px solid #AB0520;
  }
  
  .source-button i {
    width: 32px;
    margin-right: 12px;
    font-size: 28px; /* Increased icon size proportionally */
  }
  
  /* Display area */
  .display-area {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .ua-logo-container {
    text-align: center;
  }
  
  .ua-logo {
    height: 100px;
    margin-bottom: 20px;
  }
  
  .ua-logo-container h2 {
    font-size: 28px;
    margin-bottom: 10px;
  }
  
  .ua-logo-container p {
    font-size: 16px;
    margin-bottom: 5px;
  }
  
  .instruction {
    opacity: 0.8;
    margin-top: 20px;
  }
  
  /* White separator line */
  .white-line {
    height: 2px;
    background-color: white;
    width: 100%;
  }
  
  /* Status info */
  .status-info {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  }
  
  .system-status {
    display: flex;
    align-items: center;
  }
  
  .status-indicator {
    width: 8px;
    height: 8px;
    background-color: #4caf50;
    border-radius: 50%;
    margin-right: 5px;
  }
  
  .separator {
    margin: 0 10px;
    opacity: 0.7;
  }
</style>