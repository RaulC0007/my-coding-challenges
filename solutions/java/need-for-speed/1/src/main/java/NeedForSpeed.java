class NeedForSpeed {
    private int speed;
    private int batteryDrain;
    private int batteryPercentage = 100;
    private int distanceDriven = 0;

    // Task 1: Constructor with speed and battery drain
    NeedForSpeed(int speed, int batteryDrain) {
        this.speed = speed;
        this.batteryDrain = batteryDrain;
    }

    // Task 4: Check if battery is too low to drive
    public boolean batteryDrained() {
        return batteryPercentage < batteryDrain;
    }

    // Task 3: Return total meters driven
    public int distanceDriven() {
        return distanceDriven;
    }

    // Tasks 3 & 4: Drive the car (if battery allows)
    public void drive() {
        if (!batteryDrained()) {
            distanceDriven += speed;
            batteryPercentage -= batteryDrain;
        }
    }

    // Task 5: Static factory method for Nitro car
    public static NeedForSpeed nitro() {
        return new NeedForSpeed(50, 4);
    }
    
    // Package-private getters for RaceTrack access (encapsulation!)
    int getSpeed() {
        return speed;
    }
    
    int getBatteryDrain() {
        return batteryDrain;
    }
}

class RaceTrack {
    private int distance;

    // Task 2: Constructor with track distance
    RaceTrack(int distance) {
        this.distance = distance;
    }

    // Task 6: Check if car can finish the race without draining battery
    public boolean canFinishRace(NeedForSpeed car) {
        // Calculate max drives possible: 100% battery / drain per drive
        int maxDrives = 100 / car.getBatteryDrain();
        // Calculate max distance achievable
        int maxDistance = maxDrives * car.getSpeed();
        // Can finish if max distance >= track distance
        return maxDistance >= distance;
    }
}