import java.time.LocalDate;
import java.time.MonthDay;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

class BafflingBirthdays {
    private static final int TRIALS = 10000;
    private final Random random = new Random();

    boolean sharedBirthday(List<LocalDate> birthdates) {
        Set<MonthDay> seen = new HashSet<>();
        for (LocalDate date : birthdates) {
            // MonthDay extracts just the month and day, ignoring the year
            if (!seen.add(MonthDay.from(date))) {
                return true; // Found a duplicate birthday
            }
        }
        return false;
    }

    List<LocalDate> randomBirthdates(int groupSize) {
        List<LocalDate> dates = new ArrayList<>(groupSize);
        // Use a known non-leap year (2023) to strictly satisfy the 365-day assumption
        LocalDate startOfYear = LocalDate.of(2023, 1, 1);
        
        for (int i = 0; i < groupSize; i++) {
            // Uniformly pick a day from 1 to 365
            int dayOfYear = random.nextInt(365) + 1;
            dates.add(startOfYear.plusDays(dayOfYear - 1));
        }
        
        return dates;
    }

    double estimatedProbabilityOfSharedBirthday(int groupSize) {
        // Edge cases
        if (groupSize <= 1) {
            return 0.0;
        }
        // Pigeonhole principle: more than 365 people guarantees a shared birthday
        if (groupSize > 365) {
            return 100.0;
        }
        
        int sharedCount = 0;
        
        // Monte Carlo simulation
        for (int i = 0; i < TRIALS; i++) {
            if (sharedBirthday(randomBirthdates(groupSize))) {
                sharedCount++;
            }
        }
        
        // Return as a percentage (e.g., 50.7 for ~50.7%)
        return (double) sharedCount / TRIALS * 100.0;
    }
}