<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let tabs: Array<{
    id: string;
    label: string;
    icon: string;
    active?: boolean;
  }> = [];
  
  const dispatch = createEventDispatcher<{
    tabChange: { tabId: string };
  }>();
  
  function handleTabClick(tabId: string, event: MouseEvent) {
    event.preventDefault();
    // Update active state
    tabs = tabs.map(tab => ({
      ...tab,
      active: tab.id === tabId
    }));
    // Dispatch event
    dispatch('tabChange', { tabId });
  }
  
  function handleKeyDown(tabId: string, event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleTabClick(tabId, event as unknown as MouseEvent);
    }
  }
</script>

<div class="tab-bar">
  <div class="tabs-container">
    {#each tabs as tab (tab.id)}
      <button
        class="tab-item {tab.active ? 'active' : ''}"
        on:click={(e) => handleTabClick(tab.id, e)}
        on:keydown={(e) => handleKeyDown(tab.id, e)}
        aria-selected={tab.active}
        role="tab"
        tabindex="0"
      >
        <i class="{tab.icon} tab-icon" aria-hidden="true"></i>
        <span class="tab-label">{tab.label}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  .tab-bar {
    display: flex;
    height: 100%;
    width: 100%;
  }
  
  .tabs-container {
    display: flex;
    height: 100%;
    width: 100%;
  }
  
  .tab-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    height: 100%;
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    border-bottom: 3px solid transparent;
    gap: 8px;
  }
  
  .tab-item:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
  }
  
  .tab-item.active {
    color: white;
    border-bottom-color: #AB0520; /* UARed */
    font-weight: 600;
  }
  
  .tab-icon {
    font-size: 16px;
  }
  
  .tab-label {
    white-space: nowrap;
  }
  
  /* Focus styles for accessibility */
  .tab-item:focus-visible {
    outline: 2px solid #AB0520;
    outline-offset: -2px;
  }
</style>
