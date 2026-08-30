pub fn is_leap_year(year: u64) -> bool {
    // A year is a leap year if:
    // 1. It is divisible by 4
    // 2. AND it is NOT divisible by 100, OR it is divisible by 400
    (year % 4 == 0) && (year % 100 != 0 || year % 400 == 0)
}