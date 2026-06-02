import java.time.LocalDate;
import java.time.LocalDateTime;

public class Gigasecond {
    private final LocalDateTime dateTime;
    private static final long GIGASECOND = 1_000_000_000L;

    // Constructor for LocalDate input (assumes start of day: 00:00:00)
    public Gigasecond(LocalDate moment) {
        this.dateTime = moment.atStartOfDay().plusSeconds(GIGASECOND);
    }

    // Constructor for LocalDateTime input
    public Gigasecond(LocalDateTime moment) {
        this.dateTime = moment.plusSeconds(GIGASECOND);
    }

    // Return the calculated moment
    public LocalDateTime getDateTime() {
        return dateTime;
    }
}
