export class Gigasecond {
  private inputDate: Date;
  private static readonly GIGASECOND_MS = 1_000_000_000 * 1000; // 10^9 seconds in milliseconds

  constructor(inputDate: Date) {
    this.inputDate = inputDate;
  }

  public date(): Date {
    return new Date(this.inputDate.getTime() + Gigasecond.GIGASECOND_MS);
  }
}