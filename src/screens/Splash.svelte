<script lang="ts">
  import { ProgressCircular } from 'svelte-materialify';
</script>

<div class="splash screen">
  <ProgressCircular
    indeterminate
    size={120}
    style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
  />
</div>

<style>
  .splash {
    position: relative;
  }
</style>
