export function format(name: string, number: number): string {
  // Helper function to get the ordinal suffix
  const getOrdinalSuffix = (n: number): string => {
    const lastTwoDigits = n % 100;
    const lastDigit = n % 10;
    
    // Special cases: numbers ending in 11, 12, 13
    if (lastTwoDigits === 11 || lastTwoDigits === 12 || lastTwoDigits === 13) {
      return "th";
    }
    
    // Standard rules for last digit
    switch (lastDigit) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };
  
  const ordinalSuffix = getOrdinalSuffix(number);
  return `${name}, you are the ${number}${ordinalSuffix} customer we serve today. Thank you!`;
}