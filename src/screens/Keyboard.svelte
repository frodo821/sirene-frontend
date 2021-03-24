<script lang="ts">
  import { Card, Select, Switch } from 'svelte-materialify';
  import { connector } from '../connector';
  import SopranoKeyboard from '../widgets/SopranoKeyboard.svelte';
  import AltoKeyboard from '../widgets/AltoKeyboard.svelte';

  const onPointerDown = (
    evt: PointerEvent & { currentTarget: HTMLDivElement }
  ) => {
    const target = evt.currentTarget;
    target.style.background = 'rgb(79, 232, 255)';
    const key = parseInt(target.getAttribute('data-keyid'));

    console.log(key);

    if (key !== key || typeof value !== 'string') {
      return;
    }

    connector.play_note(value, key - 1);
  };
  const onPointerUp = (
    evt: PointerEvent & { currentTarget: HTMLDivElement }
  ) => {
    const target = evt.currentTarget;
    target.style.background = '';

    if (typeof value !== 'string') {
      return;
    }

    connector.play_note(value, 27);
  };

  let items: { name: string; value: string }[] = [];
  let value: any;
  let keyboard: boolean = true;

  connector.get_status().then((it) => {
    items = it.connectedPorts.map(({ port: name }) => ({ name, value: name }));
  });
</script>

<div class="screen">
  <div class="controls">
    <Card style="padding: 0.5rem;margin: 1rem 0.5rem;">
      <Select bind:value {items}>Port</Select>
      <Switch bind:checked={keyboard}
        >キーボード: {keyboard ? 'ソプラノ' : 'アルト'}</Switch
      >
    </Card>
  </div>
  <Card style="padding: 0.5rem;margin: 1rem 0.5rem;">
    {#if keyboard}
      <SopranoKeyboard {onPointerDown} {onPointerUp} />
    {:else}
      <AltoKeyboard {onPointerDown} {onPointerUp} />
    {/if}
  </Card>
</div>
