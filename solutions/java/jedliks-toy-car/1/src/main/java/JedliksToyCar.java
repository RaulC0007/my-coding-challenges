public class JedliksToyCar {
    // Private fields to track car state (encapsulation!)
    private int batteryPercentage = 100;
    private int distanceDrivenInMeters = 0;

    // Task 1: Buy a brand-new remote controlled car
    public static JedliksToyCar buy() {
        return new JedliksToyCar();
    }

    // Task 2: Display the distance driven
    public String distanceDisplay() {
        return "Driven " + distanceDrivenInMeters + " meters";
    }

    // Task 3: Display the battery percentage
    public String batteryDisplay() {
        if (batteryPercentage == 0) {
            return "Battery empty";
        }
        return "Battery at " + batteryPercentage + "%";
    }

    // Tasks 4, 5, 6: Drive the car (update distance and battery)
    public void drive() {
        // Only drive if battery is not drained
        if (batteryPercentage > 0) {
            distanceDrivenInMeters += 20;  // +20 meters per drive
            batteryPercentage -= 1;         // -1% battery per drive
        }
    }
}