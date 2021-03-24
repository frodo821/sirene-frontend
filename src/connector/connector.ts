export interface Music {
  id: number;
  name: string;
  length: number;
}

export interface ConnectedPort {
  port: string;
}

export interface MusicPlayback extends Music {
  playback_time: number;
}

export interface ServerStatus {
  playing: boolean;
  connectedPorts: ConnectedPort[];
  playingMusic: MusicPlayback | null;
  loop_play: boolean;
}

export interface PlayMusicParams {
  id: number;
  play_at?: number;
  play_device_ports?: string[];
  state: 'play' | 'paused';
  loop_play?: boolean;
}

export interface SireneBackendConnector {
  get_music_list(): Promise<Music[]>;
  get_music_by_id(id: number): Promise<Music>;

  play_note(port: string, note: number): Promise<void>;
  stop_note(ports: string[]): Promise<void>;
  stop_all_notes(): Promise<void>;

  get_status(): Promise<ServerStatus>;

  get_playing_music(): Promise<Music>;
  post_playing_music(params: PlayMusicParams): Promise<void>;
  stop_playing_music(): Promise<void>;
}
