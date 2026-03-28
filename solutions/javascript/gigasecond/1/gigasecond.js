// @ts-check

export const gigasecond = (startDate) => {
  // A gigasecond is 1,000,000,000 seconds.
  // JavaScript Date objects work with milliseconds, so convert gigaseconds to milliseconds.
  const GIGASECOND_IN_MS = 1_000_000_000 * 1000;

  // Get the timestamp (milliseconds since epoch) of the start date.
  const startTime_ms = startDate.getTime();

  // Add the gigaseconds (in milliseconds) to the start time.
  const gigasecondTime_ms = startTime_ms + GIGASECOND_IN_MS;

  // Create a new Date object from the calculated timestamp.
  // This ensures the original startDate object is not mutated.
  return new Date(gigasecondTime_ms);
};