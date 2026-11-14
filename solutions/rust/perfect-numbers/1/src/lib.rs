#[derive(Debug, PartialEq, Eq)]
pub enum Classification {
    Abundant,
    Perfect,
    Deficient,
}

pub fn classify(num: u64) -> Option<Classification> {
    if num == 0 {
        return None;
    }
    if num == 1 {
        return Some(Classification::Deficient);
    }

    let mut aliquot_sum = 1;
    let limit = (num as f64).sqrt() as u64;
    for i in 2..=limit {
        if num % i == 0 {
            aliquot_sum += i;
            let other = num / i;
            if other != i {
                aliquot_sum += other;
            }
        }
    }

    match aliquot_sum.cmp(&num) {
        std::cmp::Ordering::Equal => Some(Classification::Perfect),
        std::cmp::Ordering::Greater => Some(Classification::Abundant),
        std::cmp::Ordering::Less => Some(Classification::Deficient),
    }
}