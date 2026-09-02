pub fn factors(mut n: u64) -> Vec<u64> {
    let mut result = Vec::new();
    
    // Handle the special case of n = 1 (no prime factors)
    if n == 1 {
        return result;
    }
    
    // Check for factor 2 separately (to allow skipping even numbers later)
    while n % 2 == 0 {
        result.push(2);
        n /= 2;
    }
    
    // Check for odd factors from 3 upwards
    let mut divisor = 3;
    while divisor * divisor <= n {
        while n % divisor == 0 {
            result.push(divisor);
            n /= divisor;
        }
        divisor += 2; // Only check odd numbers
    }
    
    // If n is still greater than 1, it's a prime factor
    if n > 1 {
        result.push(n);
    }
    
    result
}