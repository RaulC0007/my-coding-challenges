const ONES = [
  '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen'
];

const TENS = [
  '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
];

const SCALES = [
  { value: 1e9, label: 'billion' },
  { value: 1e6, label: 'million' },
  { value: 1e3, label: 'thousand' }
];

export function sayInEnglish(number: number): string {
  if (number < 0 || number > 999_999_999_999) {
    throw new Error('Number must be between 0 and 999,999,999,999.');
  }

  if (number === 0) {
    return 'zero';
  }

  const parts: string[] = [];
  let remaining = number;

  for (const scale of SCALES) {
    const chunk = Math.floor(remaining / scale.value);
    if (chunk > 0) {
      parts.push(`${sayThreeDigits(chunk)} ${scale.label}`);
      remaining %= scale.value;
    }
  }

  if (remaining > 0) {
    parts.push(sayThreeDigits(remaining));
  }

  return parts.join(' ');
}

function sayThreeDigits(num: number): string {
  const chunks: string[] = [];

  const hundreds = Math.floor(num / 100);
  if (hundreds > 0) {
    chunks.push(`${ONES[hundreds]} hundred`);
  }

  const remainder = num % 100;

  if (remainder > 0) {
    if (remainder < 20) {
      chunks.push(ONES[remainder]);
    } else {
      const tens = Math.floor(remainder / 10);
      const ones = remainder % 10;
      const tensWord = TENS[tens];
      
      chunks.push(ones > 0 ? `${tensWord}-${ONES[ones]}` : tensWord);
    }
  }

  return chunks.join(' ');
}