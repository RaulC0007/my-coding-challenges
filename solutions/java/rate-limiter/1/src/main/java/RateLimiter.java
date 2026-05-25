import java.time.Duration;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

public class RateLimiter<K> {
    private final int limit;
    private final Duration windowSize;
    private final TimeSource timeSource;
    private final Map<K, ClientState> clientStates;
    
    // Helper class to track per-client window state
    private static class ClientState {
        Instant windowStart;
        int count;
        
        ClientState(Instant windowStart, int count) {
            this.windowStart = windowStart;
            this.count = count;
        }
    }

    public RateLimiter(int limit, Duration windowSize, TimeSource timeSource) {
        this.limit = limit;
        this.windowSize = windowSize;
        this.timeSource = timeSource;
        this.clientStates = new HashMap<>();
    }

    public boolean allow(K clientId) {
        Instant now = timeSource.now();
        ClientState state = clientStates.get(clientId);
        
        if (state == null) {
            // First request from this client: start new window with count=1
            clientStates.put(clientId, new ClientState(now, 1));
            return true;
        }
        
        // Calculate when the current window expires
        Instant windowEnd = state.windowStart.plus(windowSize);
        
        // Check if we've moved to a new window
        if (!now.isBefore(windowEnd)) {
            // Window expired: reset to new window starting now
            state.windowStart = now;
            state.count = 1;
            return true;
        }
        
        // Still in same window: check if under limit
        if (state.count < limit) {
            state.count++;
            return true;
        }
        
        // At or over limit: deny request
        return false;
    }
}
