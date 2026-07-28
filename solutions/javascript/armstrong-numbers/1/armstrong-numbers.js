export const isArmstrongNumber = (input) => {
  const num = BigInt(input);
  const digits = num.toString().split('');
  const power = BigInt(digits.length);

  const sum = digits.reduce(
    (acc, digit) => acc + BigInt(digit) ** power,
    0n
  );

  return sum === num;
};
