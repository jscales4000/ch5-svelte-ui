# Dynamic Source Control Implementation Guide

This document explains how we successfully implemented dynamic source control functionality in the Crestron control system interface using Svelte 5, TypeScript, and the Crestron CH5 libraries.

## Overview

The dynamic source control system allows for real-time loading of different AV control interfaces based on signals from the Crestron control system. This implementation ensures proper signal handling, bidirectional communication, and robust error management.

## Key Components

### 1. SourceControlRouter

The central component responsible for:
- Reading a numeric signal from the control system to determine which source control component to display
- Dynamically loading the appropriate component based on the signal value
- Managing subscriptions to control system signals
- Handling errors gracefully

### 2. Source Control Components

Individual control interfaces for different source types:
- MediaPlayerSource
- DocumentCameraSource
- AirmediaSource
- TextSource
- LectureCaptureSource
- CameraControlSource
- LaptopSource
- RoomPCSource

## Implementation Details

### TypeScript Interface for CrComLib

To ensure proper TypeScript integration with the Crestron libraries, we extended the global Window interface:

```typescript
declare global {
  interface Window {
    CrComLib: {
      subscribeState: (type: string, key: string, callback: (value: any) => void) => string;
      unsubscribeState: (type: string, key: string, id: string) => void;
      getState: (type: string, key: string) => any;
      publishEvent: (type: string, key: string, value: any) => void;
    }
  }
}
```

### SourceControlRouter Implementation

The router maps numeric values to specific component types:

```typescript
const controlTypeComponents = {
  1: TextSource,
  2: MediaPlayerSource,
  3: DocumentCameraSource,
  4: AirmediaSource,
  5: LectureCaptureSource,
  6: CameraControlSource,
  7: LaptopSource,
  8: RoomPCSource
};
```

#### Signal Initialization and Subscription

```typescript
onMount(async () => {
  // Add a small delay to allow the Crestron API to initialize fully
  await tick();
  
  statusMessage = `Mounting component for source: ${sourceId} (${sourceLabel})`;
  console.log(statusMessage);
  
  if (!controlTypeSignalName) {
    console.error('No control type signal name provided');
    signalError = true;
    errorMessage = 'No control type signal specified';
    isLoading = false;
    return;
  }
  
  // Set a default value for testing if needed
  controlType = 1; // Default to TextSource for testing
  
  try {
    // Ensure CrComLib is available
    if (typeof window.CrComLib === 'undefined') {
      console.error('CrComLib is not available in window object');
      signalError = true;
      errorMessage = 'Crestron Library not available';
      isLoading = false;
      return;
    }
    
    // Get the initial state directly from CrComLib
    const initialValue = window.CrComLib.getState('n', controlTypeSignalName);
    console.log(`Initial value for ${controlTypeSignalName}:`, initialValue);
    
    if (initialValue !== null && initialValue !== undefined) {
      controlType = parseInt(initialValue.toString(), 10) || 0;
      statusMessage = `Initial control type: ${controlType} from signal ${controlTypeSignalName}`;
      console.log(statusMessage);
    } else {
      statusMessage = `No initial control type value from signal ${controlTypeSignalName}`;
      console.warn(statusMessage);
      
      // Try to force set a value for testing
      try {
        window.CrComLib.publishEvent('n', controlTypeSignalName, 3);
        console.log(`Published test value (3) to ${controlTypeSignalName}`);
      } catch (e) {
        console.warn('Failed to publish test value:', e);
      }
    }
    
    // Subscribe to the signal for updates
    subscriptionId = window.CrComLib.subscribeState('n', controlTypeSignalName, (value: unknown) => {
      console.log(`Signal ${controlTypeSignalName} changed to:`, value);
      if (value !== null && value !== undefined) {
        const newControlType = parseInt(value.toString(), 10) || 0;
        if (controlType !== newControlType) {
          console.log(`Control type changed from ${controlType} to ${newControlType}`);
          controlType = newControlType;
        }
        signalError = false;
      } else {
        console.warn(`Received null/undefined value for ${controlTypeSignalName}`);
      }
    });
    
    if (!subscriptionId) {
      signalError = true;
      errorMessage = `Failed to subscribe to control type signal: ${controlTypeSignalName}`;
      console.error(errorMessage);
    } else {
      console.log(`Successfully subscribed to ${controlTypeSignalName} with ID: ${subscriptionId}`);
    }
  } catch (error: unknown) {
    console.error('Error during initialization:', error);
    signalError = true;
    errorMessage = `Error initializing: ${error instanceof Error ? error.message : String(error)}`;
  } finally {
    isLoading = false;
  }
});
```

#### Cleanup on Component Destruction

```typescript
onDestroy(() => {
  if (subscriptionId && typeof window.CrComLib !== 'undefined') {
    try {
      window.CrComLib.unsubscribeState('n', controlTypeSignalName, subscriptionId);
      console.log(`Unsubscribed from ${controlTypeSignalName}`);
    } catch (error) {
      console.error(`Error unsubscribing from ${controlTypeSignalName}:`, error);
    }
  }
});
```

### Source Control Component Implementation (MediaPlayerSource Example)

Source control components need to:
1. Define signal names based on their source ID
2. Subscribe to feedback signals
3. Publish events back to the control system for user interactions
4. Clean up subscriptions when the component is destroyed

#### Signal Definition

```typescript
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
```

#### Safe Signal Publishing

```typescript
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
```

#### User Interaction Handlers

```typescript
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

// Update volume
function updateVolume() {
  safePublishEvent('n', volumeSignal, volume);
  safePublishEvent('n', currentVolumeSignal, volume);
}
```

#### Signal Subscriptions

```typescript
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
    
    // Initial state publication
    safePublishEvent('b', isPlayingSignal, isPlaying);
    safePublishEvent('b', isMutedSignal, isMuted);
    safePublishEvent('n', currentVolumeSignal, volume);
  }
});
```

#### Cleanup Subscriptions

```typescript
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
```

### Accessible UI Components

To ensure accessibility, we implemented proper button controls with ARIA attributes and keyboard navigation:

```html
<button 
  class="control-btn play-btn" 
  on:click={togglePlay} 
  aria-label={isPlaying ? 'Pause' : 'Play'}
>
  <i class="fas {isPlaying ? 'fa-pause' : 'fa-play'}"></i>
</button>

<!-- Playlist items with proper accessibility -->
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
```

## Best Practices

1. **Type Safety**: Use TypeScript interface extensions for CrComLib to ensure proper type checking.

2. **Error Handling**: Implement try/catch blocks around all Crestron API calls.

3. **Subscription Management**: Always store subscription IDs and clean them up in onDestroy to prevent memory leaks.

4. **Debugging Helpers**: Include verbose logging during development to identify signal issues.

5. **Accessibility**: Use proper semantic HTML elements with ARIA attributes for interactive components.

6. **Defensive Programming**: Check for null/undefined values from signals and provide default values when necessary.

7. **Component Isolation**: Keep each source control component focused on its specific functionality.

## Troubleshooting Common Issues

### CrComLib is not defined

This often occurs if the component mounts before the Crestron libraries have fully initialized. Solution:

```typescript
// Add a small delay to allow the Crestron API to initialize fully
await tick();

// Or with a timeout
setTimeout(() => {
  // Initialize CrComLib connections
}, 500);
```

### Signal state not updating

Ensure you're using the correct signal type ('b' for boolean, 'n' for numeric, 's' for string):

```typescript
// For boolean signals
window.CrComLib.subscribeState('b', booleanSignalName, callback);

// For numeric signals
window.CrComLib.subscribeState('n', numericSignalName, callback);

// For string signals
window.CrComLib.subscribeState('s', stringSignalName, callback);
```

### Components not receiving initial values

Explicitly get the initial state during component mounting:

```typescript
const initialValue = window.CrComLib.getState('n', signalName);
if (initialValue !== null && initialValue !== undefined) {
  // Use the initial value
}
```

## Conclusion

By implementing this architecture, we've created a robust system for dynamic source control that:

1. Responds properly to control system signals
2. Sends commands back to the control system when user actions occur
3. Provides appropriate visual feedback
4. Handles errors gracefully
5. Maintains accessibility standards

This approach allows for flexible control system integration while maintaining a modular component architecture that's easy to extend for new source types.
