import java.util.ArrayList;
import java.util.List;

public class SplitSecondStopwatch {
    private enum State { READY, RUNNING, STOPPED }
    
    private State state = State.READY;
    private long currentTime = 0;
    private long lapStartTime = 0;
    
    // ⭐ NEW: Track the frozen duration of current lap when stopped
    private long currentLapDuration = 0;
    
    private long accumulatedTime = 0;
    private final List<Long> previousLapTimes = new ArrayList<>();
    
    public void start() {
        if (state == State.RUNNING) {
            throw new IllegalStateException("cannot start an already running stopwatch");
        }
        if (state == State.READY || state == State.STOPPED) {
            lapStartTime = currentTime;
            state = State.RUNNING;
        }
    }

    public void stop() {
        if (state != State.RUNNING) {
            throw new IllegalStateException("cannot stop a stopwatch that is not running");
        }
        // ⭐ FIX: Freeze current lap duration when stopping
        currentLapDuration = currentTime - lapStartTime;
        accumulatedTime += currentLapDuration;
        state = State.STOPPED;
    }

    public void reset() {
        if (state != State.STOPPED) {
            throw new IllegalStateException("cannot reset a stopwatch that is not stopped");
        }
        state = State.READY;
        accumulatedTime = 0;
        currentLapDuration = 0;  // ⭐ FIX: Clear frozen lap duration
        lapStartTime = 0;
        previousLapTimes.clear();
    }

    public void lap() {
        if (state != State.RUNNING) {
            throw new IllegalStateException("cannot lap a stopwatch that is not running");
        }
        long lapDuration = currentTime - lapStartTime;
        previousLapTimes.add(lapDuration);
        accumulatedTime += lapDuration;
        // ⭐ FIX: Reset for new lap segment
        currentLapDuration = 0;
        lapStartTime = currentTime;
    }

    public String state() {
        return state.name().toLowerCase();
    }

    public String currentLap() {
        // ⭐ FIX: State-aware calculation
        if (state == State.RUNNING) {
            // Running: frozen duration + elapsed since lap start
            return formatTime(currentLapDuration + (currentTime - lapStartTime));
        } else {
            // Stopped/Ready: just the frozen duration
            return formatTime(currentLapDuration);
        }
    }

    public String total() {
        if (state == State.RUNNING) {
            return formatTime(accumulatedTime + (currentTime - lapStartTime));
        } else {
            return formatTime(accumulatedTime);
        }
    }

    public List<String> previousLaps() {
        List<String> result = new ArrayList<>();
        for (long lapTime : previousLapTimes) {
            result.add(formatTime(lapTime));
        }
        return result;
    }

    public void advanceTime(String timeString) {
        currentTime += parseTime(timeString);
    }
    
    private long parseTime(String timeString) {
        String[] parts = timeString.split(":");
        long hours = Long.parseLong(parts[0]);
        long minutes = Long.parseLong(parts[1]);
        long seconds = Long.parseLong(parts[2]);
        return hours * 3600 + minutes * 60 + seconds;
    }
    
    private String formatTime(long totalSeconds) {
        long hours = totalSeconds / 3600;
        long remaining = totalSeconds % 3600;
        long minutes = remaining / 60;
        long seconds = remaining % 60;
        return String.format("%02d:%02d:%02d", hours, minutes, seconds);
    }
}