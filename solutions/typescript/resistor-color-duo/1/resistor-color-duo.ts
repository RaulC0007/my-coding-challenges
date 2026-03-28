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

export function decodedValue(colors: string[]): number {
  const firstColor = colors[0];
  const secondColor = colors[1];
  
  const firstValue = COLORS.indexOf(firstColor);
  const secondValue = COLORS.indexOf(secondColor);
  
  return firstValue * 10 + secondValue;
}