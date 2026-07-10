class Clock {
    private int minutes;
    
    Clock(int hours, int minutes) {
        int totalMinutes = hours * 60 + minutes;
        // Normalize to 0-1439 (24 hours * 60 minutes)
        this.minutes = ((totalMinutes % 1440) + 1440) % 1440;
    }
    
    void add(int minutes) {
        int totalMinutes = this.minutes + minutes;
        this.minutes = ((totalMinutes % 1440) + 1440) % 1440;
    }
    
    @Override
    public String toString() {
        int hours = this.minutes / 60;
        int mins = this.minutes % 60;
        return String.format("%02d:%02d", hours, mins);
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Clock clock = (Clock) obj;
        return this.minutes == clock.minutes;
    }
    
    @Override
    public int hashCode() {
        return minutes;
    }
}