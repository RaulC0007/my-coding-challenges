time_to_mix_juice <- function(juice) {
  switch(juice,
    "Pure Strawberry Joy" = 0.5,
    "Energizer" = 1.5,
    "Green Garden" = 1.5,
    "Tropical Island" = 3,
    "All or Nothing" = 5,
    2.5  # default for all other drinks
  )
}

limes_to_cut <- function(needed, limes) {
  wedges_per_lime <- c("small" = 6, "medium" = 8, "large" = 10)
  
  total_wedges <- 0
  limes_cut <- 0
  
  for (lime in limes) {
    if (total_wedges >= needed) {
      break
    }
    total_wedges <- total_wedges + wedges_per_lime[lime]
    limes_cut <- limes_cut + 1
  }
  
  return(limes_cut)
}

order_times <- function(orders) {
  for (order in orders) {
    print(time_to_mix_juice(order))
  }
}

remaining_orders <- function(time_left, orders) {
  remaining <- c()
  for (order in orders) {
    if (time_left > 0) {
      time_needed <- time_to_mix_juice(order)
      time_left <- time_left - time_needed
    } else {
      remaining <- c(remaining, order)
    }
  }
  return(remaining)
}