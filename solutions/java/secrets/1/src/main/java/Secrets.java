public class Secrets {
    
    // Task 1: Shift bits right, inserting 0s from the left (unsigned shift)
    public static int shiftBack(int value, int amount) {
        return value >>> amount;
    }

    // Task 2: Set bits to 1 where mask has 1s (bitwise OR)
    public static int setBits(int value, int mask) {
        return value | mask;
    }

    // Task 3: Flip bits where mask has 1s (bitwise XOR)
    public static int flipBits(int value, int mask) {
        return value ^ mask;
    }

    // Task 4: Clear bits to 0 where mask has 1s (AND with inverted mask)
    public static int clearBits(int value, int mask) {
        return value & ~mask;
    }
}