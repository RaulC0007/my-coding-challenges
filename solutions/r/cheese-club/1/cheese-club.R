library(purrr)

all_15 <- function(ratings) {
  every(ratings, ~ .x %in% c(1, 5))
}

name_customers <- function(names, ratings) {
  map2(names, ratings, ~ list(name = .x, rating = .y))
}

emphatics <- function(names, ratings) {
  name_customers(names, ratings) |> 
    keep(~ all_15(.x$rating))
}

to_binary <- function(ratings) {
  as.integer(ratings == 5)
}

satisfactions <- function(ratings) {
  round(cumsum(ratings) / seq_along(ratings), 2)
}