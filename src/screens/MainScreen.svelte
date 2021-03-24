<script lang="ts">
  import {
    Button,
    ListItemGroup,
    ListItem,
    ProgressCircular,
    ProgressLinear,
    Card,
    CardTitle,
    CardText,
    Switch,
  } from 'svelte-materialify';
  import { connector } from '../connector';
  import { onDestroy, afterUpdate } from 'svelte';
  import type { ServerStatus } from '../connector/connector';
  import { formatTime } from '../utils/time';

  let music_request = connector.get_music_list();
  let status: ServerStatus;
  connector.get_status().then((it) => (status = it));
  let music_id: any;
  let loop_play_checked: boolean;

  const setState = async (
    id: number | undefined,
    state: 'play' | 'paused',
    loop_play?: boolean
  ) => {
    return connector.post_playing_music({ id, state, loop_play });
  };
  const stop = async () => {
    return connector.stop_playing_music();
  };

  const refresher_id = setInterval(() => {
    connector.get_status().then((it) => {
      status = it;

      console.log(loop_play_checked, status.loop_play);
      if (loop_play_checked !== status.loop_play) {
        setState(
          status.playingMusic ? status.playingMusic.id : undefined,
          status.playing ? 'play' : 'paused',
          loop_play_checked
        );
      }
    });
  }, 1000);

  onDestroy(() => clearInterval(refresher_id));
</script>

<div class="screen">
  <div class="grid">
    {#if status}
      <div class="status">
        {#if status.playingMusic}
          <Card>
            <div class="status-card">
              <CardTitle>{status.playingMusic.name}</CardTitle>
              <CardText>
                <div class="playback-info">
                  <div class="current-time">
                    {formatTime(status.playingMusic.playback_time)}
                  </div>
                  <div class="playback">
                    {formatTime(status.playingMusic.length)}
                  </div>
                </div>
                <ProgressLinear
                  value={(status.playingMusic.playback_time /
                    status.playingMusic.length) *
                    100}
                />
              </CardText>
            </div>
          </Card>
        {/if}
      </div>
      <div class="buttons">
        <Button
          on:click={() =>
            setState(
              typeof music_id === 'number' ? music_id : status.playingMusic.id,
              'play'
            )}
          disabled={typeof music_id !== 'number' || status.playing}>再生</Button
        >
        <Button
          on:click={() =>
            setState(
              typeof music_id === 'number' ? music_id : status.playingMusic.id,
              'paused'
            )}
          disabled={!status.playing}>一時停止</Button
        >
        <Button
          on:click={() => stop()}
          disabled={!status.playing && !status.playingMusic}>中断</Button
        >
        <Switch bind:checked={loop_play_checked}>ループ再生</Switch>
      </div>
    {/if}
    {#await music_request}
      <div class="spinner">
        <ProgressCircular
          indeterminate
          size={120}
          style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
        />
      </div>
    {:then musics}
      <ListItemGroup mandatory class="elevation-2 white" bind:value={music_id}>
        <ListItem disabled value={-1}>
          <div class="music">
            <span class="title"> タイトル </span>
            <span class="playback"> 再生時間 </span>
          </div>
        </ListItem>
        {#each musics as music}
          <ListItem value={music.id}>
            <div class="music">
              <span class="title">
                {music.name}
              </span>
              <span class="playback">
                {formatTime(music.length)}
              </span>
            </div>
          </ListItem>
        {/each}
      </ListItemGroup>
    {/await}
  </div>
</div>

<style lang="scss">
  .grid {
    display: grid;
    padding: 2rem 1rem;
  }
  .buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 0.5rem;
  }
  .music {
    display: grid;
    grid-template-columns: 80% 1fr;
  }
  .spinner {
    position: relative;
  }
  .status {
    margin-bottom: 0.5rem;

    .status-card {
      display: grid;
      grid-template-columns: 1fr 2fr;

      .playback-info {
        display: flex;
        justify-content: flex-end;

        .current-time {
          float: left;

          &::after {
            content: '/';
            margin: 0 0.2rem;
          }
        }
      }
    }
  }
</style>
