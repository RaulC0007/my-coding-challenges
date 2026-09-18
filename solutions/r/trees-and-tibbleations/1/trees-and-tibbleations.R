library(datasets)
library(dplyr)
library(tibble)

# 1. Rename Girth column to Diameter
tree_data <- trees |>
  as_tibble() |>
  rename(Diameter = Girth)

# 2. Add Girth and Weight columns
girth_n_weight <- function(data, rnd_digits) {
  data |>
    mutate(
      Girth = round(pi * Diameter, rnd_digits),
      Weight = round(35 * Volume, rnd_digits)
    )
}

# 3. Orchard copy: move Weight and Height to front, sort by Weight
orchard_copy <- function(data) {
  data |>
    relocate(Weight, Height) |>
    arrange(Weight)
}

# 4. Customer copy: filter by height and weight constraints, select specific columns
customer_copy <- function(data, min_height, max_height, max_weight) {
  data |>
    filter(
      between(Height, min_height, max_height),
      Weight <= max_weight
    ) |>
    select(Height, Weight, Diameter, Girth)
}