const { Pool } = require('pg');

class PlaylistsService {
  #pool;

  constructor() {
    this.#pool = new Pool();
  }

  async getPlaylistById(id) {
    const query = {
      text: 'SELECT playlists.id, playlists.name, users.username FROM playlists LEFT JOIN users ON users.id = playlists.owner WHERE playlists.id = $1',
      values: [id],
    };

    const result = await this.#pool.query(query);

    if (!result.rows.length) {
      throw new Error('Playlist tidak ditemukan');
    }

    return result.rows[0];
  }
}

module.exports = PlaylistsService;
