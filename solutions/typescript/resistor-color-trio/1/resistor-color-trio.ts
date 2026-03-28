export const COLORS = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white'
];

export function decodedResistorValue(colors: string[]): string {
  // Get the first two colors for the main value
  const firstValue = COLORS.indexOf(colors[0]);
  const secondValue = COLORS.indexOf(colors[1]);
  const mainValue = firstValue * 10 + secondValue;
  
  // Get the multiplier (number of zeros) from the third color
  const zeros = COLORS.indexOf(colors[2]);
  
  // Calculate the total resistance
  let resistance = mainValue * Math.pow(10, zeros);
  
  // Determine the appropriate metric prefix
  const prefixes: { value: number; name: string }[] = [
    { value: 1000000000, name: 'giga' },
    { value: 1000000, name: 'mega' },
    { value: 1000, name: 'kilo' }
  ];
  
  for (const prefix of prefixes) {
    if (resistance >= prefix.value && resistance % prefix.value === 0) {
      resistance = resistance / prefix.value;
      return `${resistance} ${prefix.name}ohms`;
    }
  }
  
  return `${resistance} ohms`;
}