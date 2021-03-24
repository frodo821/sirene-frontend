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
  <Card style="padding: 0.5rem;margin: 1rem 0.5rem">
    <div class={`keyboard-container active-${keyboard ? 'soprano' : 'alto'}`}>
      <div class="keyborad-soprano">
        <SopranoKeyboard {onPointerDown} {onPointerUp} />
      </div>
      <div class="keyboard-alto">
        <AltoKeyboard {onPointerDown} {onPointerUp} />
      </div>
    </div>
  </Card>
</div>

<style lang="scss">
  @import '../styles/utils';
  .keyboard-container {
    position: relative;
    transform-style: preserve-3d;
    &.active-soprano {
      background: none;

      .keyborad-soprano {
        opacity: 1;
        @include desktop {
          transform: rotateX(0deg);
        }

        @include mobile {
          transform: rotateY(0deg);
        }
      }
    }
    &.active-alto {
      background: none;
      .keyboard-alto {
        opacity: 1;
        @include desktop {
          transform: translateX(-50%) rotateX(0deg);
        }

        @include mobile {
          transform: rotateY(0deg);
        }
      }
    }

    .keyborad-soprano {
      transition: 500ms;
      transform-origin: left top;
      opacity: 0;

      @include desktop {
        transform: rotateX(90deg);
      }

      @include mobile {
        transform: rotateY(90deg);
      }
    }

    .keyboard-alto {
      position: absolute;
      transition: 500ms;
      transform-origin: left top;
      opacity: 0;

      @include desktop {
        left: 50%;
        top: 0;
        transform: translateX(-50%) rotateX(-90deg);
      }

      @include mobile {
        left: 0;
        top: 0;
        transform: rotateY(-90deg);
      }
    }
  }
</style>
