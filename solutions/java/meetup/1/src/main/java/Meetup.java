import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;

class Meetup {
    private final int year;
    private final int month;

    Meetup(int monthOfYear, int year) {
        this.year = year;
        this.month = monthOfYear;
    }

    LocalDate day(DayOfWeek dayOfWeek, MeetupSchedule schedule) {
        LocalDate firstOfMonth = LocalDate.of(year, month, 1);
        
        switch (schedule) {
            case FIRST:
                return firstOfMonth.with(TemporalAdjusters.firstInMonth(dayOfWeek));
            case SECOND:
                return firstOfMonth.with(TemporalAdjusters.dayOfWeekInMonth(2, dayOfWeek));
            case THIRD:
                return firstOfMonth.with(TemporalAdjusters.dayOfWeekInMonth(3, dayOfWeek));
            case FOURTH:
                return firstOfMonth.with(TemporalAdjusters.dayOfWeekInMonth(4, dayOfWeek));
            case LAST:
                return firstOfMonth.with(TemporalAdjusters.lastInMonth(dayOfWeek));
            case TEENTH:
                // The teenth days are 13-19. If we start on the 13th and find the 
                // next (or same) occurrence of the target day, it will always fall 
                // between the 13th and the 19th.
                return firstOfMonth.withDayOfMonth(13).with(TemporalAdjusters.nextOrSame(dayOfWeek));
            default:
                throw new IllegalArgumentException("Unknown schedule: " + schedule);
        }
    }
}