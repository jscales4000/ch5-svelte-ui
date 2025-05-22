<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  // Define interface for source items
  interface Source {
    id: number;
    label: string;
    icon: string;
  }
  
  // Export props with proper types
  export let sources: Source[] = [];
  export let currentSource: number = 0;
  
  // Create event dispatcher
  const dispatch = createEventDispatcher<{select: number}>();
  
  // Handle source selection
  function selectSource(sourceId: number): void {
    dispatch('select', sourceId);
  }
</script>

<!-- UA styled Flowbite Sidebar -->
<div class="h-full w-64 flex-shrink-0 p-0 m-0">
  <div class="flex flex-col h-full py-0 bg-[#AB0520] text-white overflow-y-auto">
    <!-- UA Logo -->
    <div class="flex items-center justify-center p-4 border-b border-[#AB0520]">
      <img 
        src="https://brand.arizona.edu/sites/default/files/UA_Block_A_White.png" 
        alt="University of Arizona" 
        class="h-10"
      />
      <span class="ml-3 text-xl font-bold">Sources</span>
    </div>
    
    <!-- Source selection list -->
    <ul class="space-y-2 p-2">
      {#each sources as source}
        <li>
          <button
            class="w-full flex items-center p-3 text-white text-base font-normal rounded-lg hover:bg-[#163a6c] transition"
            class:bg-[#163a6c]={currentSource === source.id}
            class:border-l-4={currentSource === source.id}
            class:border-[#AB0520]={currentSource === source.id}
            on:click={() => selectSource(source.id)}
          >
            <i class="{source.icon} w-6 h-6 text-gray-300 transition duration-75 mr-3"></i>
            <span>{source.label}</span>
          </button>
        </li>
      {/each}
    </ul>
    
    <!-- UA Info -->
    <div class="mt-auto p-4 bg-[#AB0520] text-sm">
      <div class="flex items-center mb-2">
        <div class="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
        <span>System: Online</span>
      </div>
      <div>University of Arizona</div>
    </div>
  </div>
</div>
