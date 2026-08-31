pub fn nth(n: u32) -> u32 {
    if n == 0 {
        return 2;
    }
    
    let mut primes = vec![2];
    let mut candidate = 3;
    
    while primes.len() <= n as usize {
        let is_prime = primes.iter().all(|&p| candidate % p != 0);
        if is_prime {
            primes.push(candidate);
        }
        candidate += 2; // Only check odd numbers
    }
    
    primes[n as usize]
}