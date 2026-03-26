export const format = (name, number) => {
    // Determine the ordinal suffix
    const getOrdinalSuffix = (num) => {
        // Special case for numbers ending in 11, 12, 13
        const lastTwoDigits = num % 100;
        if (lastTwoDigits === 11 || lastTwoDigits === 12 || lastTwoDigits === 13) {
            return "th";
        }
        
        // Check the last digit
        const lastDigit = num % 10;
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
};