class ArmstrongNumbers {

    boolean isArmstrongNumber(int numberToCheck) {
        // Convert number to string to easily access each digit
        String numStr = String.valueOf(numberToCheck);
        int numDigits = numStr.length();
        int sum = 0;
        
        // Calculate sum of each digit raised to the power of total digits
        for (char digitChar : numStr.toCharArray()) {
            int digit = Character.getNumericValue(digitChar);
            sum += (int) Math.pow(digit, numDigits);
        }
        
        // Check if the sum equals the original number
        return sum == numberToCheck;
    }

}