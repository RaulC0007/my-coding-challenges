#[derive(Debug, PartialEq, Eq)]
pub enum Error {
    NotEnoughPinsLeft,
    GameComplete,
}

pub struct BowlingGame {
    rolls: Vec<u16>,
    frame: u8,
    roll_in_frame: u8,
    is_complete: bool,
}

impl BowlingGame {
    pub fn new() -> Self {
        BowlingGame {
            rolls: Vec::new(),
            frame: 1,
            roll_in_frame: 1,
            is_complete: false,
        }
    }

    pub fn roll(&mut self, pins: u16) -> Result<(), Error> {
        if self.is_complete {
            return Err(Error::GameComplete);
        }
        if pins > 10 {
            return Err(Error::NotEnoughPinsLeft);
        }

        // Validate the roll based on the current state
        if self.frame < 10 {
            if self.roll_in_frame == 2 {
                if let Some(&last) = self.rolls.last() {
                    if last + pins > 10 {
                        return Err(Error::NotEnoughPinsLeft);
                    }
                }
            }
        } else if self.frame == 10 {
            if self.roll_in_frame == 2 {
                if let Some(&first) = self.rolls.last() {
                    if first < 10 && first + pins > 10 {
                        return Err(Error::NotEnoughPinsLeft);
                    }
                }
            } else if self.roll_in_frame == 3 {
                let len = self.rolls.len();
                if len >= 2 {
                    let first = self.rolls[len - 2];
                    let second = self.rolls[len - 1];
                    // If the first roll of the 10th frame was a strike, and the second wasn't,
                    // the second and third rolls cannot exceed 10 pins combined.
                    if first == 10 && second < 10 && second + pins > 10 {
                        return Err(Error::NotEnoughPinsLeft);
                    }
                }
            }
        }

        // Record the valid roll
        self.rolls.push(pins);

        // Update the state machine
        if self.frame < 10 {
            if pins == 10 {
                // Strike: move to next frame
                self.frame += 1;
                self.roll_in_frame = 1;
            } else {
                self.roll_in_frame += 1;
                if self.roll_in_frame > 2 {
                    self.frame += 1;
                    self.roll_in_frame = 1;
                }
            }
        } else {
            // 10th frame logic
            if self.roll_in_frame == 1 {
                self.roll_in_frame = 2;
            } else if self.roll_in_frame == 2 {
                let len = self.rolls.len();
                let first = self.rolls[len - 2];
                let second = self.rolls[len - 1];
                
                // If strike or spare, player gets a fill ball
                if first == 10 || first + second == 10 {
                    self.roll_in_frame = 3;
                } else {
                    // Open frame in the 10th, game is over
                    self.is_complete = true;
                }
            } else if self.roll_in_frame == 3 {
                // After the fill ball, the game is always complete
                self.is_complete = true;
            }
        }

        Ok(())
    }

    pub fn score(&self) -> Option<u16> {
        if !self.is_complete {
            return None;
        }

        let mut total_score = 0;
        let mut i = 0;
        let mut frame = 1;

        while frame <= 10 {
            if self.rolls[i] == 10 {
                // Strike: 10 + next two rolls
                total_score += 10 + self.rolls[i + 1] + self.rolls[i + 2];
                i += 1;
            } else if self.rolls[i] + self.rolls[i + 1] == 10 {
                // Spare: 10 + next one roll
                total_score += 10 + self.rolls[i + 2];
                i += 2;
            } else {
                // Open frame: sum of two rolls
                total_score += self.rolls[i] + self.rolls[i + 1];
                i += 2;
            }
            frame += 1;
        }

        Some(total_score)
    }
}