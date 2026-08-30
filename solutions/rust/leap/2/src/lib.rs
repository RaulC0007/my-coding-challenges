pub fn is_leap_year(year: u64) -> bool {
    // A year is a leap year if:
    // 1. It is divisible by 4
    // 2. AND it is NOT divisible by 100, OR it is divisible by 400
    year.is_multiple_of(4) && (!year.is_multiple_of(100) || year.is_multiple_of(400))
}