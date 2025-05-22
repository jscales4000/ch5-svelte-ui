<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  /**
   * Event dispatcher for footer actions.
   * @type {import('svelte').EventDispatcher<{
   *   power: CustomEvent<void>;
   *   volumeUp: CustomEvent<void>;
   *   volumeDown: CustomEvent<void>;
   *   mute: CustomEvent<void>;
   *   settings: CustomEvent<void>;
   * }>}
   */
  const dispatch = createEventDispatcher();
  
  /**
   * Current volume level (0-100).
   * @type {number}
   */
  let volume = 50;
  
  /**
   * Whether the audio is currently muted.
   * @type {boolean}
   */
  let isMuted = false;
  
  /**
   * Handles power button click event.
   * Dispatches 'power' event and logs the action.
   * @returns {void}
   */
  function handlePower(): void {
    dispatch('power');
    console.log('Power button clicked');
  }
  
  /**
   * Handles volume up button click event.
   * Increases volume and dispatches 'volumeUp' event.
   * @returns {void}
   */
  function handleVolumeUp(): void {
    volume = Math.min(100, volume + 5);
    dispatch('volumeUp', { volume });
    console.log('Volume up:', volume);
  }
  
  /**
   * Handles volume down button click event.
   * Decreases volume and dispatches 'volumeDown' event.
   * @returns {void}
   */
  function handleVolumeDown(): void {
    volume = Math.max(0, volume - 5);
    dispatch('volumeDown', { volume });
    console.log('Volume down:', volume);
  }
  
  /**
   * Handles mute toggle button click event.
   * Toggles mute state and dispatches 'mute' event.
   * @returns {void}
   */
  function handleMute(): void {
    isMuted = !isMuted;
    dispatch('mute', { isMuted });
    console.log('Mute toggled:', isMuted);
  }
  
  /**
   * Handles settings button click event.
   * Dispatches 'settings' event.
   * @returns {void}
   */
  function handleSettings(): void {
    dispatch('settings');
    console.log('Settings button clicked');
  }
</script>

<!--
  Footer Component
  
  A responsive footer with media controls and power options.
  
  @component
  @example
  ```svelte
  <Footer 
    on:power={handlePower}
    on:volumeUp={handleVolumeUp}
    on:volumeDown={handleVolumeDown}
    on:mute={handleMute}
    on:settings={handleSettings}
  />
  ```
-->
<div 
  class="relative w-full" 
  role="contentinfo" 
  aria-label="Media controls and system actions"
>
  <!-- Visual divider above footer -->
  <div 
    class="h-4 bg-white w-full border-none m-0" 
    aria-hidden="true"
  ></div>
  
  <!-- Main footer container -->
  <footer 
    class="bg-[#AB0520] text-white py-8 px-4 flex flex-col md:flex-row justify-between items-center w-full min-h-[200px]"
  >
    <!-- Power button (left) -->
    <div class="mb-6 md:mb-0">
      <button 
        class="w-32 h-32 md:w-40 md:h-40 bg-[#12406B] hover:bg-[#235685] rounded-full flex items-center justify-center text-white transition-all shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
        on:click={handlePower}
        on:keydown={(e) => e.key === 'Enter' && handlePower()}
        aria-label="Power"
        tabindex="0"
      >
        <i class="fas fa-power-off text-5xl md:text-6xl" aria-hidden="true"></i>
      </button>
    </div>
    
    <!-- Volume controls (center) -->
    <div class="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
      <div class="flex items-center space-x-4 md:space-x-8">
        <!-- Mute button -->
        <button 
          class="w-20 h-20 md:w-24 md:h-24 bg-[#12406B] hover:bg-[#235685] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          on:click={handleMute}
          on:keydown={(e) => e.key === 'Enter' && handleMute()}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
          tabindex="0"
        >
          <i 
            class={`fas ${isMuted ? 'fa-volume-mute' : 'fa-volume-up'} text-4xl md:text-5xl`} 
            aria-hidden="true"
          ></i>
        </button>
        
        <!-- Volume down -->
        <button 
          class="w-20 h-20 md:w-24 md:h-24 bg-[#12406B] hover:bg-[#235685] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          on:click={handleVolumeDown}
          on:keydown={(e) => e.key === 'Enter' && handleVolumeDown()}
          aria-label="Volume Down"
          tabindex="0"
        >
          <i class="fas fa-volume-down text-4xl md:text-5xl" aria-hidden="true"></i>
        </button>
      </div>
      
      <!-- Volume slider -->
      <div class="w-64 md:w-96 h-4 bg-[#12406B] rounded-full relative shadow-inner">
        <div 
          class="absolute left-0 top-0 bottom-0 bg-white rounded-full transition-all duration-200" 
          style={`width: ${volume}%; margin: 2px;`}
          aria-valuenow={volume}
          aria-valuemin="0"
          aria-valuemax="100"
          role="progressbar"
          aria-label="Volume level"
        ></div>
      </div>
      
      <!-- Volume up -->
      <button 
        class="w-20 h-20 md:w-24 md:h-24 bg-[#12406B] hover:bg-[#235685] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        on:click={handleVolumeUp}
        on:keydown={(e) => e.key === 'Enter' && handleVolumeUp()}
        aria-label="Volume Up"
        tabindex="0"
      >
        <i class="fas fa-volume-up text-4xl md:text-5xl" aria-hidden="true"></i>
      </button>
    </div>
    
    <!-- Additional controls (right) -->
    <div class="mt-6 md:mt-0">
      <button 
        class="w-20 h-20 md:w-24 md:h-24 bg-[#12406B] hover:bg-[#235685] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
        on:click={handleSettings}
        on:keydown={(e) => e.key === 'Enter' && handleSettings()}
        aria-label="Settings"
        tabindex="0"
      >
        <i class="fas fa-cog text-4xl md:text-5xl" aria-hidden="true"></i>
      </button>
    </div>
  </footer>
  
  <!-- Status info section removed -->
</div>

<style>
  /**
   * Custom scrollbar styling for WebKit browsers.
   * Provides better visibility and touch targets for scrollable elements.
   */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: rgba(12, 35, 75, 0.5);
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  
  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(12, 35, 75, 0.7);
  }
  
  /**
   * Focus styles for better keyboard navigation
   */
  button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.5);
  }
  
  /**
   * Responsive adjustments for smaller screens
   */
  @media (max-width: 768px) {
    footer {
      padding: 1.5rem 0.5rem;
    }
    
    .volume-slider {
      width: 200px;
    }
  }
  
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  
  /* Touch targets */
  button {
    min-width: 64px;
    touch-action: manipulation;
  }
</style>
