<script lang="ts">
  import Router from 'svelte-spa-router';
  import { MaterialApp } from 'svelte-materialify';
  import routes from './routing';
  import Header from './widgets/Header.svelte';
  import Navigation from './widgets/Navigation.svelte';

  let close: () => void;
  let open: () => void;

  let handler = (open_: () => void, close_: () => void) => {
    open = open_;
    close = close_;
  };
</script>

<MaterialApp theme="light">
  <div class="root">
    <Header navOpen={open} />
    <Navigation {handler} />
    <main>
      <Router {routes} />
    </main>
  </div>
</MaterialApp>

<style lang="scss">
  @import 'svelte-materialify/src/styles/tools/colors';

  div.root {
    background-color: material-color('indigo', 'lighten-5');
    width: 100vw;
    height: 100vh;
    overflow: auto;
  }
  main {
    min-height: calc(100% - 5rem);
    display: grid;
  }
</style>
