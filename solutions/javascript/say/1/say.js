export const say = (n) => {
  // Validate input
  if (!Number.isInteger(n) || n < 0 || n > 999_999_999_999) {
    throw new Error('Number must be between 0 and 999,999,999,999.');
  }

  // Handle zero case
  if (n === 0) return 'zero';

  // Arrays for word mappings
  const ones = [
    '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
    'seventeen', 'eighteen', 'nineteen'
  ];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const scales = ['', 'thousand', 'million', 'billion'];

  // Convert a number less than 1000 to words
  function convertLessThanThousand(num) {
    if (num === 0) return '';
    if (num < 20) return ones[num];
    if (num < 100) {
      const ten = Math.floor(num / 10);
      const rest = num % 10;
      return rest ? `${tens[ten]}-${ones[rest]}` : tens[ten];
    }
    const hundred = Math.floor(num / 100);
    const rest = num % 100;
    return rest
      ? `${ones[hundred]} hundred ${convertLessThanThousand(rest)}`
      : `${ones[hundred]} hundred`;
  }

  // Break number into groups of three digits
  const groups = [];
  let num = n;
  while (num > 0) {
    groups.push(num % 1000);
    num = Math.floor(num / 1000);
  }

  // Convert each group to words and combine
  const result = [];
  for (let i = groups.length - 1; i >= 0; i--) {
    if (groups[i] > 0) {
      const groupWords = convertLessThanThousand(groups[i]);
      const scale = scales[i] ? ` ${scales[i]}` : '';
      result.push(`${groupWords}${scale}`);
    }
  }

  return result.join(' ').trim();
};