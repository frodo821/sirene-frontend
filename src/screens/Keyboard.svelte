<script lang="ts">
  import { Card, Select, Switch } from 'svelte-materialify';
  import { connector } from '../connector';
  import SopranoKeyboard from '../widgets/SopranoKeyboard.svelte';
  import AltoKeyboard from '../widgets/AltoKeyboard.svelte';
  import { onDestroy } from 'svelte';

  type WSEvent = MessageEvent<string>;

  const onPointerDown = (
    evt: PointerEvent & { currentTarget: HTMLDivElement }
  ) => {
    const target = evt.currentTarget;
    target.classList.add('active', 'manual');
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
    target.classList.remove('active', 'manual');

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
    value = (items[0] || { value: undefined }).value;
  });

  const ws = new WebSocket(`ws://${location.host}/ws`);

  ws.onmessage = (message: WSEvent) => {
    const data: { time: number; notes: number[] } = JSON.parse(message.data);
    const notes = (data.notes || [])
      .map((it, idx) => [it+1, idx])
      .filter(([it]) => it !== 0);
    notes.forEach(([note, index]) => {
      const key = note.toString().padStart(2, '0');
      document
        .querySelectorAll(`.keyboard .key[data-keyid="${key}"]`)
        .forEach((it) => {
          it.classList.add('active', `color-${index % 8}`);
        });
    });

    const keys = notes
      .map(([it]) => `[data-keyid="${it.toString().padStart(2, '0')}"]`)
      .join();

    document
      .querySelectorAll(
        keys.length < 1
          ? '.keyboard .key:not(.manual)'
          : `.keyboard .key:not(.manual):not(${keys})`
      )
      .forEach((it) => {
        it.classList.remove(
          'active',
          'color-0',
          'color-1',
          'color-2',
          'color-3',
          'color-4',
          'color-5',
          'color-6',
          'color-7'
        );
      });
  };

  onDestroy(() => {
    ws.close();
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

    :global(.keyboard .key.active) {
      background: #4fe8ff;
    }

    :global(.keyboard .key.active.color-0) {
      background: #ff7f7f;
    }

    :global(.keyboard .key.active.color-1) {
      background: #ff7fbf;
    }

    :global(.keyboard .key.active.color-2) {
      background: #ff7fff;
    }

    :global(.keyboard .key.active.color-3) {
      background: #bf7fff;
    }

    :global(.keyboard .key.active.color-4) {
      background: #7f7fff;
    }

    :global(.keyboard .key.active.color-5) {
      background: #7fbfff;
    }

    :global(.keyboard .key.active.color-6) {
      background: #4fe8ff;
    }

    :global(.keyboard .key.active.color-7) {
      background: #7fff7f;
    }

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
