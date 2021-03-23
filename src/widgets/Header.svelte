<script lang="ts">
  export let navOpen: () => void;
</script>

<header>
  <h1 class="logo" on:click={() => navOpen()}>Sirene Front-End</h1>
</header>

<style lang="scss">
  @import 'svelte-materialify/src/styles/tools/colors';

  header {
    background-color: material-color('blue-grey', 'darken-4');
    color: material-color('indigo', 'lighten-5');
    height: 5rem;
  }
  .logo {
    margin: 0;
    padding: 1rem 0.5rem;
    font-size: 2rem;
    line-height: 1.5;
  }
</style>
