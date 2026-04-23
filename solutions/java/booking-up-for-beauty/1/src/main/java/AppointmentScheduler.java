import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

class AppointmentScheduler {
    
    // Task 1: Parse appointment date from "M/d/yyyy HH:mm:ss" format
    public LocalDateTime schedule(String appointmentDateDescription) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("M/d/yyyy HH:mm:ss");
        return LocalDateTime.parse(appointmentDateDescription, formatter);
    }

    // Task 2: Check if appointment has already passed
    public boolean hasPassed(LocalDateTime appointmentDate) {
        return appointmentDate.isBefore(LocalDateTime.now());
    }

    // Task 3: Check if appointment is in the afternoon (12:00 to 17:59)
    public boolean isAfternoonAppointment(LocalDateTime appointmentDate) {
        int hour = appointmentDate.getHour();
        return hour >= 12 && hour < 18;
    }

    // Task 4: Format appointment description
    public String getDescription(LocalDateTime appointmentDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(
            "EEEE, MMMM d, yyyy, 'at' h:mm a", Locale.ENGLISH);
        return "You have an appointment on " + appointmentDate.format(formatter) + ".";
    }

    // Task 5: Return this year's anniversary date (September 15)
    public LocalDate getAnniversaryDate() {
        return LocalDate.of(LocalDate.now().getYear(), 9, 15);
    }
}