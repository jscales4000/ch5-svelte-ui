<script>
  // Props
  export let padding = true;
  export let hover = false;
  export let reverse = false;
  
  // Tailwind classes
  $: cardClasses = [
    'bg-white rounded-lg border border-gray-200 shadow-md',
    hover ? 'hover:bg-gray-100' : '',
    padding ? 'p-6' : '',
    reverse ? 'flex-row-reverse' : '',
    $$props.class || ''
  ].filter(Boolean).join(' ');
</script>

<div class={cardClasses} {...$$restProps}>
  <slot />
</div>
