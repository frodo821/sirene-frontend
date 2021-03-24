<script lang="ts">
  import { Card, Select } from 'svelte-materialify';
  import { connector } from '../connector';

  const onPointerDown = (
    evt: PointerEvent & { currentTarget: HTMLDivElement }
  ) => {
    const target = evt.currentTarget;
    target.style.background = 'rgb(79, 232, 255)';
    const key = parseInt(target.getAttribute('data-keyid'));

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
    const key = parseInt(target.getAttribute('data-keyid'));

    if (key !== key || typeof value !== 'string') {
      return;
    }

    connector.play_note(value, 27);
  };

  let items: { name: string; value: string }[] = [];
  let value: any;

  connector.get_status().then((it) => {
    items = it.connectedPorts.map(({ port: name }) => ({ name, value: name }));
  });
</script>

<div class="screen">
  <div class="ports">
    <Card style="padding: 0.5rem;margin: 1rem 0.5rem;">
      <Select bind:value {items}>Port</Select>
    </Card>
  </div>
  <Card style="padding: 0.5rem;margin: 1rem 0.5rem;">
    <div class="keyboard">
      <div class="white-keys">
        <div
          class="key wh-key"
          data-keyid="01"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key wh-key"
          data-keyid="03"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key wh-key"
          data-keyid="05"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key wh-key"
          data-keyid="06"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key wh-key"
          data-keyid="08"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key wh-key"
          data-keyid="10"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key wh-key"
          data-keyid="12"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key wh-key"
          data-keyid="13"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key wh-key"
          data-keyid="15"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key wh-key"
          data-keyid="17"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key wh-key"
          data-keyid="18"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key wh-key"
          data-keyid="20"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key wh-key"
          data-keyid="22"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key wh-key"
          data-keyid="24"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key wh-key"
          data-keyid="25"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key wh-key"
          data-keyid="27"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
      </div>
      <div class="black-keys">
        <div
          class="key bl-key"
          data-keyid="02"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key bl-key"
          data-keyid="04"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key bl-key"
          data-keyid="07"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key bl-key"
          data-keyid="09"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key bl-key"
          data-keyid="11"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key bl-key"
          data-keyid="14"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key bl-key"
          data-keyid="16"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key bl-key"
          data-keyid="19"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key bl-key"
          data-keyid="21"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key bl-key"
          data-keyid="23"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
        <div
          class="key bl-key"
          data-keyid="26"
          role="button"
          on:pointerdown={onPointerDown}
          on:pointerup={onPointerUp}
          on:pointerleave={onPointerUp}
        />
      </div>
    </div>
  </Card>
</div>

<style lang="scss">
  @import '../styles/utils';
  .keyboard {
    position: relative;

    @include mobile {
      margin-left: 2rem;
    }

    @include desktop {
      width: 48rem;
      height: 10rem;
      margin: auto;
    }

    .key {
      cursor: pointer;
      border: solid 1px gray;
    }

    .black-keys {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .bl-key {
      background: black;
      pointer-events: all;

      @include mobile {
        margin: 1rem 0;
        width: 8rem;
        height: 2rem;

        &:first-child {
          margin-top: 2rem;
        }

        &:nth-child(5n + 3) {
          margin-top: 4rem;
        }

        &:nth-child(5n + 1):not(:first-child) {
          margin-top: 4rem;
        }
      }

      @include desktop {
        margin: 0 0.5rem;
        width: 2rem;
        height: 8rem;
        float: left;
        &:first-child {
          margin-left: 2rem;
        }

        &:nth-child(5n + 3) {
          margin-left: 3.5rem;
        }

        &:nth-child(5n + 1):not(:first-child) {
          margin-left: 3.5rem;
        }
      }
    }

    .wh-key {
      background: white;

      @include mobile {
        width: 10rem;
        height: 3rem;
      }

      @include desktop {
        width: 3rem;
        height: 10rem;
        float: left;
      }
    }
  }
</style>
