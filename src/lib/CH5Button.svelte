<script>
  import { createEventDispatcher } from 'svelte';
  
  // Props with default values
  export let label = 'Button';
  export let disabled = false;
  export let fullWidth = false;
  export let className = '';
  
  const dispatch = createEventDispatcher();
  
  // Handle button click
  function handleClick() {
    if (!disabled) {
      dispatch('click');
    }
  }
  
  // Apply fullWidth class if needed
  $: buttonClasses = [
    'flex items-center justify-center',
    'rounded-lg font-medium',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-blue-500',
    'px-4 py-2',
    'bg-blue-600 hover:bg-blue-700 text-white',
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    className
  ].filter(Boolean).join(' ');
</script>

<button
  class={buttonClasses}
  on:click={handleClick}
  {disabled}
  aria-label={label}
>
  {label}
</button>

<style>
  .full-width {
    width: 100%;
  }
</style>
