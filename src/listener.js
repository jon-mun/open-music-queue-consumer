class Listener {
  #playlistsService;

  #playlistSongsService;

  #mailSender;

  constructor(playlistsService, playlistSongsService, mailSender) {
    this.#playlistsService = playlistsService;
    this.#playlistSongsService = playlistSongsService;
    this.#mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(
        message.content.toString(),
      );

      const playlist = await this.#playlistsService.getPlaylistById(playlistId);
      const songs = await this.#playlistSongsService.getSongsFromPlaylist(
        playlistId,
      );

      const data = {
        playlist: {
          id: playlist.id,
          name: playlist.name,
          songs,
        },
      };
      const result = await this.#mailSender.sendEmail(
        targetEmail,
        JSON.stringify(data),
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
