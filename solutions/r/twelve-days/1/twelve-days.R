recite <- function(start_verse, end_verse) {
  ordinals <- c("first", "second", "third", "fourth", "fifth", "sixth", 
                "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth")
  
  gifts <- c("a Partridge in a Pear Tree.", 
             "two Turtle Doves", 
             "three French Hens", 
             "four Calling Birds", 
             "five Gold Rings", 
             "six Geese-a-Laying", 
             "seven Swans-a-Swimming", 
             "eight Maids-a-Milking", 
             "nine Ladies Dancing", 
             "ten Lords-a-Leaping", 
             "eleven Pipers Piping", 
             "twelve Drummers Drumming")
  
  # Iterate through the requested range of verses
  verses <- sapply(start_verse:end_verse, function(day) {
    # Get the gifts for the current day, in reverse order (from current day down to 1)
    day_gifts <- rev(gifts[1:day])
    
    # For verses after the first, prepend "and " to the final gift
    if (day > 1) {
      day_gifts[length(day_gifts)] <- paste0("and ", day_gifts[length(day_gifts)])
    }
    
    # Construct the full verse string
    paste0("On the ", ordinals[day], " day of Christmas my true love gave to me: ", 
           paste(day_gifts, collapse = ", "))
  }, USE.NAMES = FALSE)
  
  return(verses)
}