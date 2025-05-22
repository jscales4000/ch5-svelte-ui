<script lang="ts">
  import BaseSourceControl from './BaseSourceControl.svelte';
  import { onMount, onDestroy } from 'svelte';
  
  // Define component props
  export let sourceId: number = 0;
  export let sourceLabel: string = 'Media Player';
  
  // Signal names for this source control
  const playSignal = `MediaPlayer.${sourceId}.Play`;
  const pauseSignal = `MediaPlayer.${sourceId}.Pause`;
  const nextSignal = `MediaPlayer.${sourceId}.Next`;
  const prevSignal = `MediaPlayer.${sourceId}.Previous`;
  const muteSignal = `MediaPlayer.${sourceId}.Mute`;
  const volumeSignal = `MediaPlayer.${sourceId}.Volume`;
  const playlistSelectSignal = `MediaPlayer.${sourceId}.SelectItem`;
  
  // Feedback signal names
  const isPlayingSignal = `MediaPlayer.${sourceId}.IsPlaying`;
  const isMutedSignal = `MediaPlayer.${sourceId}.IsMuted`;
  const currentVolumeSignal = `MediaPlayer.${sourceId}.CurrentVolume`;
  const currentTimeSignal = `MediaPlayer.${sourceId}.CurrentTime`;
  const durationSignal = `MediaPlayer.${sourceId}.Duration`;
  const currentItemSignal = `MediaPlayer.${sourceId}.CurrentItem`;
  
  // Media player state
  let isPlaying = false;
  let currentTime = 0;
  let duration = 120; // 2 minutes sample duration
  let volume = 80;
  let isMuted = false;
  let currentPlaylistIndex = 0;
  
  // Subscription IDs for cleanup
  let subscriptions: string[] = [];
  
  // Playlist items
  const playlistItems = [
    { id: 1, title: "University Introduction", duration: 120, icon: "play-circle" },
    { id: 2, title: "Campus Tour", duration: 225, icon: "music" },
    { id: 3, title: "Welcome Message", duration: 90, icon: "film" }
  ];
  
  // Format time in seconds to MM:SS
  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
  
  // Safe publish event function
  function safePublishEvent(type: string, name: string, value: any) {
    try {
      if (typeof window.CrComLib !== 'undefined') {
        console.log(`Publishing event: ${type}.${name} = ${value}`);
        window.CrComLib.publishEvent(type, name, value);
        return true;
      } else {
        console.warn('CrComLib not available for publishing event');
        return false;
      }
    } catch (error) {
      console.error(`Error publishing event ${type}.${name}:`, error);
      return false;
    }
  }
  
  // Safe subscribe function
  function safeSubscribe(type: string, name: string, callback: (value: any) => void): string | null {
    try {
      if (typeof window.CrComLib !== 'undefined') {
        const id = window.CrComLib.subscribeState(type, name, callback);
        console.log(`Subscribed to ${type}.${name} with ID ${id}`);
        return id;
      } else {
        console.warn(`CrComLib not available for subscribing to ${type}.${name}`);
        return null;
      }
    } catch (error) {
      console.error(`Error subscribing to ${type}.${name}:`, error);
      return null;
    }
  }
  
  // Toggle play/pause
  function togglePlay() {
    isPlaying = !isPlaying;
    safePublishEvent('b', isPlaying ? playSignal : pauseSignal, true);
    safePublishEvent('b', isPlayingSignal, isPlaying);
  }
  
  // Handle next track
  function nextTrack() {
    safePublishEvent('b', nextSignal, true);
    // Simulate local UI update
    currentPlaylistIndex = (currentPlaylistIndex + 1) % playlistItems.length;
    currentTime = 0;
  }
  
  // Handle previous track
  function prevTrack() {
    safePublishEvent('b', prevSignal, true);
    // Simulate local UI update
    currentPlaylistIndex = (currentPlaylistIndex - 1 + playlistItems.length) % playlistItems.length;
    currentTime = 0;
  }
  
  // Toggle mute
  function toggleMute() {
    isMuted = !isMuted;
    safePublishEvent('b', muteSignal, isMuted);
    safePublishEvent('b', isMutedSignal, isMuted);
  }
  
  // Update volume
  function updateVolume() {
    safePublishEvent('n', volumeSignal, volume);
    safePublishEvent('n', currentVolumeSignal, volume);
  }
  
  // Select playlist item
  function selectPlaylistItem(index: number) {
    currentPlaylistIndex = index;
    safePublishEvent('n', playlistSelectSignal, playlistItems[index].id);
    safePublishEvent('n', currentItemSignal, playlistItems[index].id);
    currentTime = 0;
    if (!isPlaying) {
      togglePlay(); // Start playing the selected item
    }
  }
  
  onMount(() => {
    // Subscribe to feedback signals to sync UI with control system
    if (typeof window.CrComLib !== 'undefined') {
      // Subscribe to isPlaying signal
      const playingSubId = safeSubscribe('b', isPlayingSignal, (value) => {
        isPlaying = Boolean(value);
      });
      if (playingSubId) subscriptions.push(playingSubId);
      
      // Subscribe to isMuted signal
      const mutedSubId = safeSubscribe('b', isMutedSignal, (value) => {
        isMuted = Boolean(value);
      });
      if (mutedSubId) subscriptions.push(mutedSubId);
      
      // Subscribe to current volume signal
      const volumeSubId = safeSubscribe('n', currentVolumeSignal, (value) => {
        if (value !== null && value !== undefined) {
          volume = Number(value);
        }
      });
      if (volumeSubId) subscriptions.push(volumeSubId);
      
      // Subscribe to current time signal
      const timeSubId = safeSubscribe('n', currentTimeSignal, (value) => {
        if (value !== null && value !== undefined) {
          currentTime = Number(value);
        }
      });
      if (timeSubId) subscriptions.push(timeSubId);
      
      // Subscribe to duration signal
      const durationSubId = safeSubscribe('n', durationSignal, (value) => {
        if (value !== null && value !== undefined) {
          duration = Number(value);
        }
      });
      if (durationSubId) subscriptions.push(durationSubId);
      
      // Subscribe to current item signal
      const itemSubId = safeSubscribe('n', currentItemSignal, (value) => {
        if (value !== null && value !== undefined) {
          const index = playlistItems.findIndex(item => item.id === Number(value));
          if (index !== -1) {
            currentPlaylistIndex = index;
          }
        }
      });
      if (itemSubId) subscriptions.push(itemSubId);
    } else {
      console.warn('CrComLib not available for signal subscriptions');
    }
    
    // Initial state publication
    safePublishEvent('b', isPlayingSignal, isPlaying);
    safePublishEvent('b', isMutedSignal, isMuted);
    safePublishEvent('n', currentVolumeSignal, volume);
  });
  
  onDestroy(() => {
    // Clean up subscriptions when component is destroyed
    if (typeof window.CrComLib !== 'undefined') {
      subscriptions.forEach(id => {
        try {
          window.CrComLib.unsubscribeState('b', '', id); // Type doesn't matter for unsubscribe with ID
          console.log(`Unsubscribed from signal with ID ${id}`);
        } catch (error) {
          console.error(`Error unsubscribing from signal with ID ${id}:`, error);
        }
      });
    }
  });
</script>

<BaseSourceControl {sourceId} {sourceLabel} controlType="Media Player">
  <div class="media-player">
    <!-- Media preview area -->
    <div class="media-preview">
      <div class="placeholder">
        <i class="fas fa-film text-4xl mb-2"></i>
        <p>Now playing: {playlistItems[currentPlaylistIndex].title}</p>
        <p class="text-sm mt-2">{isPlaying ? 'Playing' : 'Paused'}</p>
      </div>
    </div>
    
    <!-- Transport controls -->
    <div class="transport-controls">
      <div class="progress-bar">
        <span class="time-display">{formatTime(currentTime)}</span>
        <div class="progress-track">
          <div class="progress-fill" style="width: {(currentTime / duration) * 100}%"></div>
        </div>
        <span class="time-display">{formatTime(duration)}</span>
      </div>
      
      <div class="control-buttons">
        <button 
          class="control-btn" 
          on:click={prevTrack} 
          aria-label="Previous"
        >
          <i class="fas fa-step-backward"></i>
        </button>
        
        <button 
          class="control-btn play-btn" 
          on:click={togglePlay} 
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          <i class="fas {isPlaying ? 'fa-pause' : 'fa-play'}"></i>
        </button>
        
        <button 
          class="control-btn" 
          on:click={nextTrack} 
          aria-label="Next"
        >
          <i class="fas fa-step-forward"></i>
        </button>
        
        <div class="volume-control">
          <button 
            class="control-btn" 
            on:click={toggleMute} 
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            <i class="fas {isMuted ? 'fa-volume-mute' : 'fa-volume-up'}"></i>
          </button>
          
          <input 
            type="range" 
            min="0" 
            max="100" 
            bind:value={volume} 
            on:change={updateVolume}
            class="volume-slider" 
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
    
    <!-- Media playlist -->
    <div class="media-playlist">
      <h3 class="playlist-header">Playlist</h3>
      <ul class="playlist-items">
        {#each playlistItems as item, index}
          <li class="playlist-item-container">
            <button 
              class="playlist-item {currentPlaylistIndex === index ? 'active' : ''}" 
              on:click={() => selectPlaylistItem(index)}
              aria-label="Select {item.title}"
              aria-current={currentPlaylistIndex === index ? 'true' : 'false'}
            >
              <div class="playlist-item-info">
                <i class="fas fa-{item.icon} mr-2"></i>
                <span>{item.title}</span>
              </div>
              <span class="duration">{formatTime(item.duration)}</span>
            </button>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</BaseSourceControl>

<style>
  .media-player {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
  }
  
  .media-preview {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 0.5rem;
    aspect-ratio: 16/9;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  
  .placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.4);
    text-align: center;
  }
  
  .transport-controls {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .progress-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .time-display {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
    min-width: 2.5rem;
  }
  
  .progress-track {
    flex: 1;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    overflow: hidden;
  }
  
  .progress-fill {
    height: 100%;
    background-color: #AB0520; /* UARed */
    border-radius: 2px;
  }
  
  .control-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
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
  
  .control-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .play-btn {
    background-color: #AB0520; /* UARed */
    width: 3rem;
    height: 3rem;
    font-size: 1.25rem;
  }
  
  .play-btn:hover {
    background-color: #8B0015;
  }
  
  .volume-control {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-left: auto;
  }
  
  .volume-slider {
    -webkit-appearance: none;
    appearance: none;
    width: 80px;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    outline: none;
  }
  
  .volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: white;
    cursor: pointer;
  }
  
  .media-playlist {
    flex: 1;
    overflow-y: auto;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    margin-top: auto;
  }
  
  .playlist-header {
    padding: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .playlist-items {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .playlist-item-container {
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  
  .playlist-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .playlist-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  .playlist-item:focus {
    outline: 2px solid rgba(255, 255, 255, 0.5);
    outline-offset: -2px;
  }
  
  .playlist-item.active {
    background-color: rgba(171, 5, 32, 0.2); /* UARed with transparency */
  }
  
  .playlist-item-info {
    display: flex;
    align-items: center;
  }
  
  .duration {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.7);
  }
</style>
