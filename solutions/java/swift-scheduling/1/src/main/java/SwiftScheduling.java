import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Month;
import java.time.temporal.TemporalAdjusters;

public class SwiftScheduling {

    public static LocalDateTime convertToDeliveryDate(LocalDateTime meetingStart, String description) {
        // --- 1. Fechas Fijas ---
        if ("NOW".equals(description)) {
            return meetingStart.plusHours(2);
        }

        if ("ASAP".equals(description)) {
            if (meetingStart.toLocalTime().isBefore(LocalTime.of(13, 0))) {
                return meetingStart.withHour(17).withMinute(0).withSecond(0).withNano(0);
            } else {
                return meetingStart.plusDays(1).withHour(13).withMinute(0).withSecond(0).withNano(0);
            }
        }

        if ("EOW".equals(description)) {
            DayOfWeek day = meetingStart.getDayOfWeek();
            if (day == DayOfWeek.MONDAY || day == DayOfWeek.TUESDAY || day == DayOfWeek.WEDNESDAY) {
                return meetingStart.with(TemporalAdjusters.nextOrSame(DayOfWeek.FRIDAY))
                                   .withHour(17).withMinute(0).withSecond(0).withNano(0);
            } else {
                return meetingStart.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY))
                                   .withHour(20).withMinute(0).withSecond(0).withNano(0);
            }
        }

        // --- 2. Fechas Variables (Meses: <N>M) ---
        if (description.endsWith("M")) {
            int targetMonth = Integer.parseInt(description.substring(0, description.length() - 1));
            int year = meetingStart.getYear();
            
            // Si la reunión empezó en o después del mes objetivo, pasa al próximo año
            if (meetingStart.getMonthValue() >= targetMonth) {
                year++;
            }
            
            return getFirstWorkdayOfMonth(year, targetMonth).atTime(8, 0);
        }

        // --- 3. Fechas Variables (Trimestres: Q<N>) ---
        if (description.startsWith("Q")) {
            int quarter = Integer.parseInt(description.substring(1));
            int year = meetingStart.getYear();
            int currentQuarter = (meetingStart.getMonthValue() - 1) / 3 + 1;

            // Si la reunión empezó después del trimestre objetivo, pasa al próximo año
            if (currentQuarter > quarter) {
                year++;
            }

            // El último mes de un trimestre siempre es Quarter * 3 (ej: Q1 -> Mes 3 / Marzo)
            int targetMonth = quarter * 3;
            return getLastWorkdayOfMonth(year, targetMonth).atTime(8, 0);
        }

        throw new IllegalArgumentException("Unknown description: " + description);
    }

    // Método auxiliar: Encuentra el primer lunes-viernes de un mes
    private static java.time.LocalDate getFirstWorkdayOfMonth(int year, int month) {
        java.time.LocalDate date = java.time.LocalDate.of(year, month, 1);
        DayOfWeek day = date.getDayOfWeek();
        if (day == DayOfWeek.SATURDAY) {
            return date.plusDays(2); // Salta a Lunes
        } else if (day == DayOfWeek.SUNDAY) {
            return date.plusDays(1); // Salta a Lunes
        }
        return date;
    }

    // Método auxiliar: Encuentra el último lunes-viernes de un mes
    private static java.time.LocalDate getLastWorkdayOfMonth(int year, int month) {
        java.time.LocalDate date = java.time.LocalDate.of(year, month, 1).with(TemporalAdjusters.lastDayOfMonth());
        DayOfWeek day = date.getDayOfWeek();
        if (day == DayOfWeek.SATURDAY) {
            return date.minusDays(1); // Retrocede a Viernes
        } else if (day == DayOfWeek.SUNDAY) {
            return date.minusDays(2); // Retrocede a Viernes
        }
        return date;
    }
}   