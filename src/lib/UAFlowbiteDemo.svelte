<script>
  import UAFlowbiteButton from './UAFlowbiteButton.svelte';
  import UAFlowbiteCard from './UAFlowbiteCard.svelte';
  import UAFlowbiteBadge from './UAFlowbiteBadge.svelte';
  
  // Demo state for interactive elements
  let counter = 0;
  function incrementCounter() {
    counter++;
  }
</script>

<div class="p-4 max-w-4xl mx-auto">
  <h2 class="text-2xl font-bold mb-6 text-[#0C234B]">University of Arizona Styled Components</h2>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <!-- Component Cards -->
    <UAFlowbiteCard>
      <h5 class="mb-2 text-xl font-bold tracking-tight text-[#0C234B]">UA Button Components</h5>
      <p class="mb-4 text-gray-700">Buttons styled according to University of Arizona brand guidelines.</p>
      
      <div class="flex flex-wrap gap-2">
        <UAFlowbiteButton color="blue">Primary</UAFlowbiteButton>
        <UAFlowbiteButton color="red">Accent</UAFlowbiteButton>
        <UAFlowbiteButton color="gray">Neutral</UAFlowbiteButton>
      </div>
      
      <div class="flex flex-wrap gap-2 mt-3">
        <UAFlowbiteButton color="blue" outline>Outline</UAFlowbiteButton>
        <UAFlowbiteButton color="blue" pill>Pill</UAFlowbiteButton>
        <UAFlowbiteButton color="blue" gradient>Gradient</UAFlowbiteButton>
      </div>
      
      <div class="mt-4">
        <UAFlowbiteButton 
          color="blue" 
          icon="fas fa-plus-circle"
          on:click={incrementCounter}
        >
          Clicked {counter} times
        </UAFlowbiteButton>
      </div>
    </UAFlowbiteCard>
    
    <UAFlowbiteCard>
      <h5 class="mb-2 text-xl font-bold tracking-tight text-[#0C234B]">UA Badge Components</h5>
      <p class="mb-4 text-gray-700">Status badges with UA brand colors.</p>
      
      <div class="flex flex-wrap gap-2 mb-4">
        <UAFlowbiteBadge color="blue">Default</UAFlowbiteBadge>
        <UAFlowbiteBadge color="red">Alert</UAFlowbiteBadge>
        <UAFlowbiteBadge color="green">Success</UAFlowbiteBadge>
        <UAFlowbiteBadge color="gray">Neutral</UAFlowbiteBadge>
      </div>
      
      <div class="flex flex-wrap gap-2 mb-4">
        <UAFlowbiteBadge color="blue" pill>Pill</UAFlowbiteBadge>
        <UAFlowbiteBadge color="blue" outline>Outline</UAFlowbiteBadge>
        <UAFlowbiteBadge color="blue" large>Large</UAFlowbiteBadge>
      </div>
      
      <div class="flex flex-wrap gap-2">
        <UAFlowbiteBadge color="blue" icon="fas fa-info-circle">Info</UAFlowbiteBadge>
        <UAFlowbiteBadge color="red" icon="fas fa-exclamation-triangle">Warning</UAFlowbiteBadge>
        <UAFlowbiteBadge color="green" icon="fas fa-check-circle">Complete</UAFlowbiteBadge>
      </div>
    </UAFlowbiteCard>
  </div>
  
  <UAFlowbiteCard>
    <h5 class="text-xl font-bold mb-4 text-[#0C234B]">Integration with Crestron CH5</h5>
    <p class="mb-4 text-gray-700">These components can be used alongside Crestron CH5 controls for touch panels, maintaining the University of Arizona brand while providing modern UI elements.</p>
    
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div>
        <h6 class="font-semibold mb-2 text-[#0C234B]">Touch Panel Controls</h6>
        <div class="flex gap-2 flex-wrap">
          <UAFlowbiteButton color="blue" icon="fas fa-power-off">Power</UAFlowbiteButton>
          <UAFlowbiteButton color="blue" icon="fas fa-volume-up">Volume</UAFlowbiteButton>
          <UAFlowbiteButton color="blue" icon="fas fa-desktop">Display</UAFlowbiteButton>
        </div>
      </div>
      
      <div>
        <h6 class="font-semibold mb-2 text-[#0C234B]">System Status</h6>
        <div class="flex gap-2 flex-wrap">
          <UAFlowbiteBadge color="green" icon="fas fa-check-circle">Connected</UAFlowbiteBadge>
          <UAFlowbiteBadge color="blue" icon="fas fa-university">UA Branded</UAFlowbiteBadge>
          <UAFlowbiteBadge color="gray" icon="fas fa-code">Custom Components</UAFlowbiteBadge>
        </div>
      </div>
    </div>
    
    <UAFlowbiteButton color="red" href="https://www.arizona.edu/" icon="fas fa-external-link-alt">University of Arizona</UAFlowbiteButton>
  </UAFlowbiteCard>
</div>
