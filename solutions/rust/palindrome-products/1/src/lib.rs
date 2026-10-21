use std::collections::HashSet;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Palindrome {
    value: u64,
    factors: HashSet<(u64, u64)>,
}

impl Palindrome {
    pub fn new(value: u64, factors: HashSet<(u64, u64)>) -> Self {
        Palindrome { value, factors }
    }

    pub fn value(&self) -> u64 {
        self.value
    }

    pub fn into_factors(self) -> HashSet<(u64, u64)> {
        self.factors
    }
}

pub fn palindrome_products(min: u64, max: u64) -> Option<(Palindrome, Palindrome)> {
    if min > max {
        return None;
    }

    let mut min_val: Option<(u64, HashSet<(u64, u64)>)> = None;
    let mut max_val: Option<(u64, HashSet<(u64, u64)>)> = None;

    for i in min..=max {
        for j in i..=max {
            let prod = i * j;
            if is_palindrome(prod) {
                match min_val {
                    None => {
                        min_val = Some((prod, [(i, j)].into_iter().collect()));
                    }
                    Some((m_val, ref mut factors)) => {
                        if prod < m_val {
                            min_val = Some((prod, [(i, j)].into_iter().collect()));
                        } else if prod == m_val {
                            factors.insert((i, j));
                        }
                    }
                }

                match max_val {
                    None => {
                        max_val = Some((prod, [(i, j)].into_iter().collect()));
                    }
                    Some((m_val, ref mut factors)) => {
                        if prod > m_val {
                            max_val = Some((prod, [(i, j)].into_iter().collect()));
                        } else if prod == m_val {
                            factors.insert((i, j));
                        }
                    }
                }
            }
        }
    }

    Some((
        Palindrome::new(min_val.as_ref()?.0, min_val?.1),
        Palindrome::new(max_val.as_ref()?.0, max_val?.1),
    ))
}

fn is_palindrome(n: u64) -> bool {
    let s = n.to_string();
    s.bytes().eq(s.bytes().rev())
}