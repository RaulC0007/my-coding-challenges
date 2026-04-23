 class Leap {

    boolean isLeapYear(int year) {
        // A leap year is divisible by 4,
        // unless it is also divisible by 100 (not a leap year),
        // unless it is also divisible by 400 (is a leap year).
        return (year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0));
    }

}