public class EliudsEggs {
    public int eggCount(int number) {
        int count = 0;
        while (number > 0) {
            // Check if the least significant bit is 1
            if ((number & 1) == 1) {
                count++;
            }
            // Unsigned right shift to check the next bit
            number >>>= 1;
        }
        return count;
    }
}