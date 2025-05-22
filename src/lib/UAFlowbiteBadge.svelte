<script>
  // Props
  /** @type {'blue'|'red'|'green'|'gray'|string} */
  export let color = 'blue';
  export let href = undefined;
  export let large = false;
  export let pill = false;
  export let outline = false;
  export let icon = '';
  
  // UA Colors using University of Arizona brand colors
  /** @type {Object.<string, {solid: string, outline: string}>} */
  const colors = {
    blue: {
      solid: 'bg-[#0C234B] text-white',
      outline: 'text-[#0C234B] border border-[#0C234B]'
    },
    red: {
      solid: 'bg-[#AB0520] text-white',
      outline: 'text-[#AB0520] border border-[#AB0520]'
    },
    green: {
      solid: 'bg-[#7A9A01] text-white',
      outline: 'text-[#7A9A01] border border-[#7A9A01]'
    },
    gray: {
      solid: 'bg-gray-700 text-white',
      outline: 'text-gray-700 border border-gray-700'
    }
  };
  
  // Set up styling based on props
  $: colorStyle = colors[color] || colors.blue;
  $: badgeStyle = outline ? colorStyle.outline : colorStyle.solid;
  $: badgeClasses = [
    'inline-flex items-center justify-center font-medium',
    large ? 'px-3 py-1.5 text-sm' : 'px-2 py-1 text-xs',
    pill ? 'rounded-full' : 'rounded',
    badgeStyle,
    $$props.class || ''
  ].join(' ');
</script>

{#if href}
  <a href={href} class={badgeClasses} {...$$restProps}>
    {#if icon}<i class="{icon} mr-1"></i>{/if}
    <slot />
  </a>
{:else}
  <span class={badgeClasses} {...$$restProps}>
    {#if icon}<i class="{icon} mr-1"></i>{/if}
    <slot />
  </span>
{/if}
