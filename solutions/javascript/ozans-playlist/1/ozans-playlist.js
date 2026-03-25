// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Removes duplicate tracks from a playlist.
 *
 * @param {string[]} playlist The original playlist with potentially duplicate tracks.
 * @returns {string[]} A new playlist with only unique entries.
 */
export function removeDuplicates(playlist) {
  // A Set automatically handles uniqueness.
  // Create a Set from the playlist, which will remove duplicates.
  // Then convert the Set back to an Array.
  return Array.from(new Set(playlist));
}

/**
 * Checks whether a playlist includes a track.
 *
 * @param {string[]} playlist The playlist to check.
 * @param {string} track The track to look for.
 * @returns {boolean} True if the track is in the playlist, false otherwise.
 */
export function hasTrack(playlist, track) {
  // Convert the playlist to a Set for efficient lookup (O(1) on average).
  const playlistSet = new Set(playlist);
  return playlistSet.has(track);
}

/**
 * Adds a track to a playlist.
 * If the track already exists, it should not be added again (maintaining uniqueness).
 *
 * @param {string[]} playlist The original playlist.
 * @param {string} track The track to add.
 * @returns {string[]} A new playlist that includes the track (if not already present).
 */
export function addTrack(playlist, track) {
  // Create a Set from the existing playlist.
  const playlistSet = new Set(playlist);
  // Add the new track. Sets automatically prevent duplicates.
  playlistSet.add(track);
  // Convert the Set back to an Array to return the new playlist.
  return Array.from(playlistSet);
}

/**
 * Deletes a track from a playlist.
 *
 * @param {string[]} playlist The original playlist.
 * @param {string} track The track to delete.
 * @returns {string[]} A new playlist that does not include the track.
 */
export function deleteTrack(playlist, track) {
  // Create a Set from the existing playlist.
  const playlistSet = new Set(playlist);
  // Delete the track. If the track is not in the set, nothing happens.
  playlistSet.delete(track);
  // Convert the Set back to an Array.
  return Array.from(playlistSet);
}

/**
 * Lists the unique artists in a playlist.
 *
 * @param {string[]} playlist The playlist of tracks.
 * @returns {string[]} An array of unique artist names.
 */
export function listArtists(playlist) {
  const artists = new Set(); // Use a Set to store unique artist names.

  for (const track of playlist) {
    // Each track is formatted as "<SONG> - <ARTIST>".
    // Use String.prototype.split() to get the artist name.
    const parts = track.split(' - ');
    // The artist name is the last part.
    if (parts.length > 1) { // Ensure there's actually an artist part
      const artistName = parts[parts.length - 1];
      artists.add(artistName); // Add to the Set, which handles uniqueness.
    }
  }

  // Convert the Set of unique artists back to an Array.
  return Array.from(artists);
}

