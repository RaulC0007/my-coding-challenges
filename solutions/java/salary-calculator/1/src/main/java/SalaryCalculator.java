public class SalaryCalculator {
    
    // Task 1: Salary multiplier based on days skipped (ternary operator)
    public double salaryMultiplier(int daysSkipped) {
        return daysSkipped >= 5 ? 0.85 : 1.0;
    }

    // Task 2a: Bonus multiplier based on products sold (ternary operator)
    public int bonusMultiplier(int productsSold) {
        return productsSold >= 20 ? 13 : 10;
    }

    // Task 2b: Calculate total bonus
    public double bonusForProductsSold(int productsSold) {
        return productsSold * bonusMultiplier(productsSold);
    }

    // Task 3: Final salary with cap (ternary operator for capping)
    public double finalSalary(int daysSkipped, int productsSold) {
        double baseSalary = 1000.0;
        double calculatedSalary = baseSalary * salaryMultiplier(daysSkipped) 
                                + bonusForProductsSold(productsSold);
        return calculatedSalary > 2000.0 ? 2000.0 : calculatedSalary;
    } 
}