const mappedNumbers = new Map<string, number>();
async function main() {
  const res = await Deno.readTextFile("./1/input.txt");
  const lines = res.split("\n");
  // getCalibrationValue(lines[5]);
  const numbers = lines.map((line) => getCalibrationValue(line));
  console.log(numbers);
  const total = numbers.reduce((acc, curr) => acc + curr, 0);
  console.log(total);
}

await main();

function initMap() {
  mappedNumbers.set("one", 1);
  mappedNumbers.set("two", 2);
  mappedNumbers.set("three", 3);
  mappedNumbers.set("four", 4);
  mappedNumbers.set("five", 5);
  mappedNumbers.set("six", 6);
  mappedNumbers.set("seven", 7);
  mappedNumbers.set("eight", 8);
  mappedNumbers.set("nine", 9);
}

function getCalibrationValue(line: string) {
  initMap();
  if (line.trim() === "") {
    return 0;
  }
  // reverse keys of map
  const reversedMap = new Map(
    [...mappedNumbers.entries()].map(([k, v]) => [reverseString(k), v])
  );
  const first = getFirstNumber(line, mappedNumbers);
  const last = getFirstNumber(reverseString(line), reversedMap);
  const calibrationValiue = `${first}${last}`;
  const parsedNumber = parseInt(calibrationValiue);
  return parsedNumber;
}

function reverseString(str: string) {
  return str.split("").reverse().join("");
}

function getFirstNumber(line: string, map: Map<string, number>) {
  for (let i = 0; i < line.length; i++) {
    const parsed = parseInt(line[i]);
    if (!isNaN(parsed)) {
      return parsed;
    }

    const wordSizes = [3, 4, 5];
    for (const size of wordSizes) {
      const matchedNumber = matchesNumber(i, line, map, size);
      if (matchedNumber !== 0) {
        return matchedNumber;
      }
    }
  }
}

function matchesNumber(
  index: number,
  line: string,
  map: Map<string, number>,
  size: number
) {
  const word = line.substring(index, index + size);
  const filtered = [...map.keys()]
    .filter((key) => key.length == size)
    .filter((key) => word.includes(key));
  if ([...filtered.keys()].length > 0) {
    return map.get(filtered[0]);
  }
  return 0;
}
