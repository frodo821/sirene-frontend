<script lang="ts">
  import {
    NavigationDrawer,
    List,
    ListItem,
    Overlay,
  } from 'svelte-materialify';
  import { push } from 'svelte-spa-router';

  let opening = false;

  export let handler: (
    openHandler: typeof open,
    closeHandler: typeof close
  ) => void;

  function open() {
    opening = true;
    console.log('open');
  }

  function close() {
    opening = false;
    console.log('close');
  }

  handler(open, close);
</script>

<NavigationDrawer class="blue-grey darken-4" absolute active={opening}>
  <List>
    <ListItem class="indigo-text text-lighten-5" on:click={() => push('/')}>ファイルを再生</ListItem>
    <ListItem class="indigo-text text-lighten-5" on:click={() => push('/keyboard')}>キーボード</ListItem>
    <ListItem class="indigo-text text-lighten-5" on:click={() => push('/debug')}>デバッグ</ListItem>
  </List>
</NavigationDrawer>
<Overlay index={1} active={opening} on:click={close} absolute />
