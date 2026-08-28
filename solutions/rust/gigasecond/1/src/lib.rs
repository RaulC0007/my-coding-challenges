use time::PrimitiveDateTime as DateTime;
use time::Duration;

// Returns a DateTime one billion seconds after start.
pub fn after(start: DateTime) -> DateTime {
    // A gigasecond is 1,000,000,000 seconds
    let gigasecond = Duration::seconds(1_000_000_000);
    start + gigasecond
}