<script lang="ts">
  // Video stream component optimized for Crestron ch5-video
  
  import { onMount, onDestroy } from 'svelte';
  
  export let streamUrl: string = '';
  export let stretch: boolean = true;
  export let aspectRatio: string = '16:9';
  
  // State
  let isLoading: boolean = true;
  let hasError: boolean = false;
  let errorMessage: string = '';
  
  // Handle component lifecycle
  onMount(() => {
    // After component mounts, attach event listeners to ch5-video
    setTimeout(() => {
      const videoEl = document.querySelector('ch5-video');
      if (videoEl) {
        videoEl.addEventListener('loaded', () => {
          isLoading = false;
        });
        
        videoEl.addEventListener('error', (e: any) => {
          hasError = true;
          errorMessage = `Error loading video stream: ${e.detail || 'Unknown error'}`;
          console.error('Video stream error:', e);
        });
      }
    }, 500); // Short delay to ensure component is rendered
  });
  
  onDestroy(() => {
    // Clean up event listeners
    const videoEl = document.querySelector('ch5-video');
    if (videoEl) {
      videoEl.removeEventListener('loaded', () => {});
      videoEl.removeEventListener('error', () => {});
    }
  });
</script>

<div class="video-container" style="aspect-ratio: {aspectRatio};">
  <!-- Crestron CH5 Video Component -->
  <!-- Note: No background colors used to allow video to show through -->
  <ch5-video
    sourceurl={streamUrl}
    stretch={stretch.toString()}
  ></ch5-video>
  
  <!-- Overlay for loading state -->
  {#if isLoading}
    <div class="video-overlay loading-overlay">
      <div class="spinner"></div>
      <span>Connecting to camera...</span>
    </div>
  {/if}
  
  <!-- Overlay for error state -->
  {#if hasError}
    <div class="video-overlay error-overlay">
      <i class="fas fa-exclamation-triangle"></i>
      <span>{errorMessage}</span>
      <button on:click={() => window.location.reload()}>Retry</button>
    </div>
  {/if}
  
  <!-- Visual frame for the video container -->
  <div class="video-frame"></div>
</div>

<style>
  .video-container {
    width: 100%;
    position: relative;
    /* No background color - important for ch5-video to work */
    overflow: hidden;
    border-radius: 0.75rem;
  }
  
  /* Create a visual border without using background */
  .video-frame {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.75rem;
    box-shadow: 
      0 10px 15px -3px rgba(0, 0, 0, 0.3),
      0 4px 6px -2px rgba(0, 0, 0, 0.2);
    /* No background color */
  }
  
  .video-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
  
  /* Use minimal background for overlays when needed */
  .loading-overlay {
    /* Semi-transparent background only when loading */
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
  }
  
  .error-overlay {
    /* Semi-transparent background only when error */
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
  }
  
  .spinner {
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #AB0520; /* UARed color */
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .error-overlay i {
    font-size: 2rem;
    color: #AB0520; /* UARed color */
    margin-bottom: 1rem;
  }
  
  .error-overlay button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 4px;
    color: white;
    cursor: pointer;
  }
</style>
