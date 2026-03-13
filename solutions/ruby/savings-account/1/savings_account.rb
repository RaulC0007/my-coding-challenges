module SavingsAccount
  # Task 1: Calculate the interest rate based on balance
  def self.interest_rate(balance)
    if balance < 0
      3.213
    elsif balance < 1000
      0.5
    elsif balance < 5000
      1.621
    else
      2.475
    end
  end

  # Task 2: Calculate the annual balance update
  def self.annual_balance_update(balance)
    rate = interest_rate(balance)
    balance + (balance * rate / 100)
  end

  # Task 3: Calculate years before reaching desired balance
  def self.years_before_desired_balance(current_balance, desired_balance)
    years = 0
    balance = current_balance
    
    while balance < desired_balance
      balance = annual_balance_update(balance)
      years += 1
    end
    
    years
  end
end