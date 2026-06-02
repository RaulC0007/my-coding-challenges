import java.util.ArrayList;
import java.util.List;

class VariableLengthQuantity {

    List<String> encode(List<Long> numbers) {
        List<String> result = new ArrayList<>();
        
        for (Long number : numbers) {
            result.addAll(encodeOne(number));
        }
        
        return result;
    }
    
    private List<String> encodeOne(long number) {
        List<String> bytes = new ArrayList<>();
        
        // Handle zero as a special case
        if (number == 0) {
            bytes.add("0x0");
            return bytes;
        }
        
        // Extract 7-bit chunks from LSB to MSB
        List<Integer> chunks = new ArrayList<>();
        long n = number;
        while (n > 0) {
            chunks.add((int)(n & 0x7F));
            n >>>= 7;
        }
        
        // Encode chunks in reverse order (MSB first) with continuation bits
        for (int i = chunks.size() - 1; i >= 0; i--) {
            int chunk = chunks.get(i);
            if (i > 0) {
                // Set continuation bit for all but the last chunk
                chunk |= 0x80;
            }
            bytes.add("0x" + Integer.toHexString(chunk));
        }
        
        return bytes;
    }

    List<String> decode(List<Long> bytes) {
        List<String> result = new ArrayList<>();
        long value = 0;
        boolean inProgress = false;
        
        for (Long byteVal : bytes) {
            int b = byteVal.intValue();
            
            // Extract 7 data bits
            int data = b & 0x7F;
            
            // Shift existing value and add new 7 bits
            value = (value << 7) | data;
            
            // Check if this is the last byte (continuation bit clear)
            if ((b & 0x80) == 0) {
                // Validate that the decoded value fits in 32-bit unsigned
                if (value > 0xFFFFFFFFL) {
                    throw new IllegalArgumentException("Invalid variable-length quantity encoding");
                }
                result.add("0x" + Long.toHexString(value));
                value = 0;
                inProgress = false;
            } else {
                inProgress = true;
            }
        }
        
        // If we ended with an incomplete sequence (last byte had continuation bit set)
        if (inProgress) {
            throw new IllegalArgumentException("Invalid variable-length quantity encoding");
        }
        
        return result;
    }
}