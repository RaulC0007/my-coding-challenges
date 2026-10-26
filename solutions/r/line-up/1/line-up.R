line_up <- function(name, number) {
  suffix <- "th"
  
  if (!(number %% 100 %in% 11:13)) {
    rem <- number %% 10
    if (rem == 1) {
      suffix <- "st"
    } else if (rem == 2) {
      suffix <- "nd"
    } else if (rem == 3) {
      suffix <- "rd"
    }
  }
  
  sprintf("%s, you are the %d%s customer we serve today. Thank you!", name, number, suffix)
}