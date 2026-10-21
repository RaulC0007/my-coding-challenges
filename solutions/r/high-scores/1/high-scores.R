scores_list <- function(scores) {
  scores
}

latest <- function(scores) {
  scores[length(scores)]
}

personal_best <- function(scores) {
  max(scores)
}

personal_top_three <- function(scores) {
  # Sort in descending order and take the top 3 (or fewer if less available)
  sorted <- sort(scores, decreasing = TRUE)
  head(sorted, 3)
}