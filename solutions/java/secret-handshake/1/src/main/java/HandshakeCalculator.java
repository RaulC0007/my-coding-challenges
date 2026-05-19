import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

class HandshakeCalculator {

    List<Signal> calculateHandshake(int number) {
        List<Signal> handshake = new ArrayList<>();
        
        // Check each of the rightmost 5 bits using bitwise AND
        if ((number & 1) != 0)  handshake.add(Signal.WINK);
        if ((number & 2) != 0)  handshake.add(Signal.DOUBLE_BLINK);
        if ((number & 4) != 0)  handshake.add(Signal.CLOSE_YOUR_EYES);
        if ((number & 8) != 0)  handshake.add(Signal.JUMP);
        
        // If the 5th bit (16) is set, reverse the order
        if ((number & 16) != 0) {
            Collections.reverse(handshake);
        }
        
        return handshake;
    }
}