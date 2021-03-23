import type * as connector from './connector';

export default class BackendConnector
  implements connector.SireneBackendConnector {
  constructor(private base_url: string) {}

  async get_music_list(): Promise<connector.Music[]> {
    const response = await fetch(`${this.base_url}/musics`);
    if (!response.ok) {
      throw new Error(`Failed to invoke api: ${response.statusText}`);
    }
    return response.json();
  }

  async get_music_by_id(id: number): Promise<connector.Music> {
    const response = await fetch(`${this.base_url}/musics/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to invoke api: ${response.statusText}`);
    }
    return response.json();
  }

  async play_note(port: string, note: number): Promise<void> {
    const response = await fetch(`${this.base_url}/notes?n=${note}&p=${port}`);
    if (!response.ok) {
      throw new Error(`Failed to invoke api: ${response.statusText}`);
    }
    return;
  }

  async stop_note(ports: string[]): Promise<void> {
    const response = await fetch(
      `${this.base_url}/notes?${ports.map((it) => `p=${it}`).join('&')}`,
      { method: 'DELETE' }
    );
    if (!response.ok) {
      throw new Error(`Failed to invoke api: ${response.statusText}`);
    }
    return;
  }

  async stop_all_notes(): Promise<void> {
    const response = await fetch(`${this.base_url}/notes`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to invoke api: ${response.statusText}`);
    }
    return;
  }

  async get_status(): Promise<connector.ServerStatus> {
    const response = await fetch(`${this.base_url}/status`);
    if (!response.ok) {
      throw new Error(`Failed to invoke api: ${response.statusText}`);
    }
    return response.json();
  }

  async get_playing_music(): Promise<connector.Music> {
    const response = await fetch(`${this.base_url}/status/play`);
    if (!response.ok) {
      throw new Error(`Failed to invoke api: ${response.statusText}`);
    }
    return response.json();
  }

  async post_playing_music(params: connector.PlayMusicParams): Promise<void> {
    const response = await fetch(`${this.base_url}/status/play`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: [['Content-Type', 'application/json']],
    });
    if (!response.ok) {
      throw new Error(`Failed to invoke api: ${response.statusText}`);
    }
  }

  async stop_playing_music(): Promise<void> {
    const response = await fetch(`${this.base_url}/status/play`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to invoke api: ${response.statusText}`);
    }
  }
}
