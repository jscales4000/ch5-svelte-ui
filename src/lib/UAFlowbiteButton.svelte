<script>
  /**
   * A customizable button component with University of Arizona branding.
   * Supports various styles, sizes, and states while maintaining accessibility.
   * @component
   * @example
   * ```svelte
   * <UAFlowbiteButton 
   *   color="blue"
   *   size="md"
   *   on:click={() => console.log('Clicked!')}
   >
   *   Click Me
   * </UAFlowbiteButton>
   * ```
   */
  import { createEventDispatcher } from 'svelte';
  
  /**
   * Button color variant.
   * @type {'blue'|'red'|'gray'|string}
   * @default 'blue'
   */
  export let color = 'blue';
  
  /**
   * Button size variant.
   * @type {'sm'|'md'|'lg'|'xl'|string}
   * @default 'md'
   */
  export let size = 'md';
  
  /**
   * Whether to use pill/rounded style.
   * @type {boolean}
   * @default false
   */
  export let pill = false;
  
  /**
   * Whether to use outline style.
   * @type {boolean}
   * @default false
   */
  export let outline = false;
  
  /**
   * Whether to use gradient background.
   * @type {boolean}
   * @default false
   */
  export let gradient = false;
  
  /**
   * Whether the button is disabled.
   * @type {boolean}
   * @default false
   */
  export let disabled = false;
  
  /**
   * If provided, renders as an anchor tag with this href.
   * @type {string|undefined}
   */
  export let href = undefined;
  
  /**
   * Button type attribute.
   * @type {'button'|'submit'|'reset'}
   * @default 'button'
   */
  export let type = 'button';
  
  /**
   * Button text content (alternative to slot).
   * @type {string}
   * @default ''
   */
  export let label = '';
  
  /**
   * Icon class (e.g., 'fas fa-check').
   * @type {string}
   * @default ''
   */
  export let icon = '';
  
  /**
   * Color configurations using University of Arizona brand colors.
   * Defines solid, outline, and gradient variants for each color.
   * @type {Object.<string, {solid: string, outline: string, gradient: string}>}
   * @private
   */
  const colors = {
    blue: {
      solid: 'bg-[#0C234B] hover:bg-[#1E5288] text-white',
      outline: 'text-[#0C234B] hover:text-white border border-[#0C234B] hover:bg-[#0C234B]',
      gradient: 'text-white bg-gradient-to-r from-[#0C234B] to-[#1E5288] hover:bg-gradient-to-br'
    },
    red: {
      solid: 'bg-[#AB0520] hover:bg-[#C41230] text-white',
      outline: 'text-[#AB0520] hover:text-white border border-[#AB0520] hover:bg-[#AB0520]',
      gradient: 'text-white bg-gradient-to-r from-[#AB0520] to-[#C41230] hover:bg-gradient-to-br'
    },
    gray: {
      solid: 'bg-gray-700 hover:bg-gray-800 text-white',
      outline: 'text-gray-700 hover:text-white border border-gray-700 hover:bg-gray-700',
      gradient: 'text-white bg-gradient-to-r from-gray-700 to-gray-800 hover:bg-gradient-to-br'
    }
  };
  
  /**
   * Size class mappings for different button sizes.
   * @type {Object.<string, string>}
   * @private
   */
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
    xl: 'px-6 py-3 text-xl'
  };
  
  /**
   * Computed style based on the current color prop.
   * Falls back to blue if color is not found.
   * @type {{solid: string, outline: string, gradient: string}}
   * @private
   */
  $: colorStyle = colors[color] ? colors[color] : colors.blue;
  
  /**
   * Computed button style based on outline and gradient props.
   * @type {string}
   * @private
   */
  $: buttonStyle = outline ? colorStyle.outline : (gradient ? colorStyle.gradient : colorStyle.solid);
  
  /**
   * Combined CSS classes for the button.
   * @type {string}
   * @private
   */
  $: buttonClasses = [
    'font-medium rounded focus:ring-4 focus:outline-none inline-flex items-center justify-center',
    pill ? 'rounded-full' : 'rounded-lg',
    sizeClasses[size] || sizeClasses.md,
    buttonStyle,
    disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
  ].join(' ');
  
  /**
   * Event dispatcher for component events.
   * @type {import('svelte').EventDispatcher<{click: MouseEvent}>}
   * @private
   */
  const dispatch = createEventDispatcher();
  
  /**
   * Handles click events and dispatches them if the button is not disabled.
   * @param {MouseEvent} event - The click event
   * @private
   */
  function handleClick(event) {
    if (!disabled) {
      dispatch('click', event);
    }
  }
</script>

{#if href}
  <a 
    {href}
    class={buttonClasses}
    on:click={handleClick}
    {...$$restProps}
  >
    {#if icon}<i class="{icon} mr-2"></i>{/if}
    {#if $$slots.default}
      <slot></slot>
    {:else}
      {label}
    {/if}
  </a>
{:else}
  <button 
    {type}
    class={buttonClasses}
    on:click={handleClick}
    {disabled}
    {...$$restProps}
  >
    {#if icon}<i class="{icon} mr-2"></i>{/if}
    {#if $$slots.default}
      <slot></slot>
    {:else}
      {label}
    {/if}
  </button>
{/if}
