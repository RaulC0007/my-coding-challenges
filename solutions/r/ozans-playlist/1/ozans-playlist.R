remove_duplicates <- function(playlist) {
  unique(playlist)
}

has_track <- function(playlist, track) {
  track %in% playlist
}

add_tracks <- function(playlist, tracks) {
  # Add only tracks that are not already in the playlist
  new_tracks <- tracks[!tracks %in% playlist]
  c(playlist, new_tracks)
}

delete_tracks <- function(playlist, tracks) {
  # Keep only tracks that are not in the tracks to delete
  playlist[!playlist %in% tracks]
}

find_common_tracks <- function(playlist_1, playlist_2) {
  intersect(playlist_1, playlist_2)
}