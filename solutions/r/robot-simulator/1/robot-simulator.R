new_robot <- function(coordinates, direction) {
  structure(
    list(coordinates = coordinates, direction = direction),
    class = "robot"
  )
}

move <- function(a_robot, commands) {
  UseMethod("move")
}

# nolint start
move.robot <- function(a_robot, commands) {
  # Define directions in clockwise order (matching input case handling via toupper)
  dirs <- c("NORTH", "EAST", "SOUTH", "WEST")
  
  # Split the command string into individual characters
  cmds <- strsplit(commands, "")[[1]]
  
  current_dir <- toupper(a_robot$direction)
  x <- a_robot$coordinates[1]
  y <- a_robot$coordinates[2]
  
  for (cmd in cmds) {
    if (cmd == "R") {
      idx <- match(current_dir, dirs)
      current_dir <- dirs[(idx %% 4) + 1]
    } else if (cmd == "L") {
      idx <- match(current_dir, dirs)
      # Fix counter-clockwise lookup (subtracting 1, handling 0/negative via modulo)
      current_dir <- dirs[((idx - 2) %% 4) + 1]
    } else if (cmd == "A") {
      if (current_dir == "NORTH") {
        y <- y + 1
      } else if (current_dir == "EAST") {
        x <- x + 1
      } else if (current_dir == "SOUTH") {
        y <- y - 1
      } else if (current_dir == "WEST") {
        x <- x - 1
      }
    }
  }
  
  new_robot(c(x, y), current_dir)
}
# nolint end