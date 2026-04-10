export class Clock {
  private totalMinutes: number;

  constructor(hour: number, minute: number = 0) {
    // Calculate total minutes and normalize to 0-1439 range (24-hour clock)
    this.totalMinutes = (hour * 60 + minute) % (24 * 60);
    // Handle negative values (wrap around to positive)
    if (this.totalMinutes < 0) {
      this.totalMinutes += 24 * 60;
    }
  }

  public toString(): string {
    const hours = Math.floor(this.totalMinutes / 60);
    const minutes = this.totalMinutes % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  public plus(minutes: number): Clock {
    return new Clock(0, this.totalMinutes + minutes);
  }

  public minus(minutes: number): Clock {
    return new Clock(0, this.totalMinutes - minutes);
  }

  public equals(other: Clock): boolean {
    return this.totalMinutes === other.totalMinutes;
  }
}