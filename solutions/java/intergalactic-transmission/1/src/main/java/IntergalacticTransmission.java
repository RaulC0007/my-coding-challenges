import java.util.ArrayList;
import java.util.List;

public class IntergalacticTransmission {

    public static List<Integer> getTransmitSequence(List<Integer> message) {
        // Step 1: Convert the list of bytes into a single stream of bits
        List<Integer> allBits = new ArrayList<>();
        for (int b : message) {
            for (int i = 7; i >= 0; i--) {
                allBits.add((b >> i) & 1);
            }
        }

        // Step 2: Chunk the bit stream into groups of 7 data bits
        List<Integer> sequence = new ArrayList<>();
        int i = 0;
        while (i < allBits.size()) {
            int data = 0;
            int onesCount = 0;
            
            // Extract up to 7 bits
            for (int j = 0; j < 7; j++) {
                data <<= 1;
                if (i < allBits.size()) {
                    int bit = allBits.get(i);
                    data |= bit;
                    if (bit == 1) onesCount++;
                    i++;
                } else {
                    // Pad with 0s if we run out of message bits
                    // 0 doesn't affect onesCount
                }
            }
            
            // Calculate parity bit (even parity)
            // If onesCount is even, parity is 0. If odd, parity is 1.
            int parity = (onesCount % 2 == 0) ? 0 : 1;
            
            // Construct the 8-bit transmission: [7 data bits] [1 parity bit]
            // The parity bit is the least significant bit (rightmost)
            int transmission = (data << 1) | parity;
            sequence.add(transmission);
        }
        
        return sequence;
    }

    public static List<Integer> decodeSequence(List<Integer> sequence) {
        // Step 1: Validate parity and extract data bits
        List<Integer> allDataBits = new ArrayList<>();
        
        for (int transmission : sequence) {
            // Check parity: count 1s in the 8-bit transmission
            int onesCount = Integer.bitCount(transmission);
            if (onesCount % 2 != 0) {
                throw new IllegalArgumentException("Parity error detected");
            }
            
            // Extract the 7 data bits (ignore the last bit which is parity)
            int data = transmission >> 1;
            
            // Add these 7 bits to our stream
            for (int i = 6; i >= 0; i--) {
                allDataBits.add((data >> i) & 1);
            }
        }
        
        // Step 2: Reconstruct the original bytes from the bit stream
        List<Integer> message = new ArrayList<>();
        // We need to process bits in groups of 8 to form bytes
        // Any remaining bits at the end (padding) are discarded
        
        int numFullBytes = allDataBits.size() / 8;
        
        for (int b = 0; b < numFullBytes; b++) {
            int byteVal = 0;
            for (int i = 0; i < 8; i++) {
                byteVal <<= 1;
                byteVal |= allDataBits.get(b * 8 + i);
            }
            message.add(byteVal);
        }
        
        return message;
    }
}