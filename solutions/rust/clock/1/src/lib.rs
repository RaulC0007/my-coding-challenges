use std::fmt;

#[derive(Debug, PartialEq, Eq)]
pub struct Clock {
    hours: i32,
    minutes: i32,
}

impl Clock {
    // Create a new clock with the given hours and minutes
    // Normalizes the time to be within 0..24 hours and 0..59 minutes
    pub fn new(hours: i32, minutes: i32) -> Self {
        let total_minutes = (hours * 60 + minutes).rem_euclid(24 * 60);
        let h = total_minutes / 60;
        let m = total_minutes % 60;
        Clock { hours: h, minutes: m }
    }

    // Add minutes to the clock, returning a new normalized Clock
    pub fn add_minutes(&self, minutes: i32) -> Self {
        let total_minutes = (self.hours * 60 + self.minutes + minutes).rem_euclid(24 * 60);
        let h = total_minutes / 60;
        let m = total_minutes % 60;
        Clock { hours: h, minutes: m }
    }
}

// Implement Display for formatting as "HH:MM"
impl fmt::Display for Clock {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{:02}:{:02}", self.hours, self.minutes)
    }
}
