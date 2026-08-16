can_fast_attack <- function(knight_is_awake) {
  # Fast attack is possible if the knight is NOT awake
  !knight_is_awake
}

can_spy <- function(knight_is_awake, archer_is_awake, prisoner_is_awake) {
  # Spying is possible if at least one character is awake
  knight_is_awake || archer_is_awake || prisoner_is_awake
}

can_signal_prisoner <- function(archer_is_awake, prisoner_is_awake) {
  # Signaling is possible if prisoner is awake AND archer is NOT awake
  prisoner_is_awake && !archer_is_awake
}

can_free_prisoner <- function(knight_is_awake,
                              archer_is_awake,
                              prisoner_is_awake,
                              pet_dog_is_present) {
  # Two ways to free the prisoner:
  # 1. With dog: archer must be asleep (knight is scared of dog)
  # 2. Without dog: prisoner awake AND knight asleep AND archer asleep
  (pet_dog_is_present && !archer_is_awake) ||
    (!pet_dog_is_present && prisoner_is_awake && !knight_is_awake && !archer_is_awake)
}