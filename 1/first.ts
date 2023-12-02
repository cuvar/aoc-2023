async function main() {
  const res = await Deno.readTextFile("./1/input.txt");
  const lines = res.split("\n");
  const numbers = lines.map((line) => getCalibrationValue(line));
  console.log(numbers);

  const total = numbers.reduce((acc, curr) => acc + curr, 0);
  console.log(total);
}

await main();

function getCalibrationValue(line: string) {
  if (line.trim() === "") {
    return 0;
  }
  const chars = line.split("");
  const filtered = chars.filter((char) => {
    const parsed = parseInt(char);
    return !isNaN(parsed);
  });
  if (filtered.length === 0) {
    return 0;
  } else if (filtered.length === 1) {
    return parseInt(`${filtered[0]}${filtered[0]}`);
  }

  const calibrationValiue = `${filtered[0]}${filtered[filtered.length - 1]}`;
  const parsedNumber = parseInt(calibrationValiue);
  return parsedNumber;
}
