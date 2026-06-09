public class Say {
    
    private static final String[] ONES = {
        "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
        "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
        "seventeen", "eighteen", "nineteen"
    };
    
    private static final String[] TENS = {
        "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
    };
    
    private static final String[] SCALES = {"", "thousand", "million", "billion"};
    
    public String say(long number) {
        // Validate input range
        if (number < 0 || number > 999_999_999_999L) {
            throw new IllegalArgumentException("Number must be between 0 and 999,999,999,999.");
        }
        
        // Special case for zero
        if (number == 0) {
            return "zero";
        }
        
        StringBuilder result = new StringBuilder();
        int scaleIndex = 0;
        
        // Process number in chunks of 3 digits (ones, thousands, millions, billions)
        while (number > 0) {
            int chunk = (int) (number % 1000);
            if (chunk != 0) {
                String chunkWords = convertChunk(chunk);
                if (scaleIndex > 0) {
                    chunkWords += " " + SCALES[scaleIndex];
                }
                if (result.length() > 0) {
                    result.insert(0, chunkWords + " ");
                } else {
                    result.append(chunkWords);
                }
            }
            number /= 1000;
            scaleIndex++;
        }
        
        return result.toString();
    }
    
    // Convert a number 1-999 to words (no scale suffix)
    private String convertChunk(int num) {
        StringBuilder chunk = new StringBuilder();
        
        // Handle hundreds place
        if (num >= 100) {
            chunk.append(ONES[num / 100]).append(" hundred");
            num %= 100;
            if (num > 0) {
                chunk.append(" ");
            }
        }
        
        // Handle tens and ones place
        if (num >= 20) {
            chunk.append(TENS[num / 10]);
            if (num % 10 > 0) {
                chunk.append("-").append(ONES[num % 10]);
            }
        } else if (num > 0) {
            chunk.append(ONES[num]);
        }
        
        return chunk.toString();
    }
}