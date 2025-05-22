<script>
  import { Button, Card, Badge, Alert } from 'flowbite-svelte';
</script>

<div class="p-4">
  <h2 class="text-xl font-bold mb-4">Flowbite Components Test</h2>
  
  <div class="mb-4">
    <Card>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">University of Arizona Controls</h5>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 leading-tight">
        This panel uses Flowbite components integrated with Crestron CH5.
      </p>
      <div class="flex gap-2">
        <Button color="blue">Touch Panel</Button>
        <Button color="alternative">Settings</Button>
      </div>
    </Card>
  </div>
  
  <div class="flex space-x-2 mb-4">
    <Badge color="blue">Connected</Badge>
    <Badge color="red">UA Branding</Badge>
    <Badge color="green">Flowbite</Badge>
  </div>
  
  <Alert>
    <span class="font-medium">Flowbite integration successful!</span> You can now use Flowbite components in your project.
  </Alert>
</div>
