const { Pool } = require('pg');

class PlaylistSongsService {
  #pool;

  constructor() {
    this.pool = new Pool();
  }

  async getSongsFromPlaylist(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer 
      FROM songs 
      LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id 
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this.pool.query(query);

    return result.rows;
  }
}

module.exports = PlaylistSongsService;
