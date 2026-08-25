library(stringr)

message <- function(msg) {
  msg |> 
    str_extract(":.*") |> 
    str_remove(":") |> 
    str_trim()
}

log_level <- function(msg) {
  msg |> 
    str_extract("\\[.*\\]") |> 
    str_remove_all("\\[|\\]") |> 
    str_to_lower()
}

reformat <- function(msg) {
  msg_level <- log_level(msg)
  msg_message <- message(msg)
  str_glue("{msg_message} ({msg_level})")
}