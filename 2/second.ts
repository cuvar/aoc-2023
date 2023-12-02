const LIMITS: Record<ColorInfo, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

async function main() {
  const res = await Deno.readTextFile("./2/input.txt");
  const lines = res.split("\n");
  const gameInfos = lines.map((line) => parseGameInfo(line));
  console.log(getPower(gameInfos[0]));

  const powers = gameInfos.map((gameInfo) => getPower(gameInfo));
  const total = powers.reduce((acc, curr) => acc + curr, 0);
  console.log(total);
}

await main();

function getPower(gameInfo: GameInfo): number {
  const maxInfo = getMaxNumbers(gameInfo);
  const power = maxInfo.red * maxInfo.green * maxInfo.blue;
  return power;
}

function getMaxNumbers(gameInfo: GameInfo): MaxInfo {
  let maxRed = 0;
  let maxGreen = 0;
  let maxBlue = 0;

  for (const round of gameInfo.rounds) {
    for (const ballSet of round) {
      if (ballSet.color === "red") maxRed = Math.max(maxRed, ballSet.balls);
      if (ballSet.color === "green")
        maxGreen = Math.max(maxGreen, ballSet.balls);
      if (ballSet.color === "blue") maxBlue = Math.max(maxBlue, ballSet.balls);
    }
  }
  return {
    red: maxRed,
    green: maxGreen,
    blue: maxBlue,
  };
}

function parseGameInfo(line: string) {
  const parts = line.split(":");
  const id = parseInt(parts[0].replace("Game ", ""));
  const rounds = parts[1].split("; ");
  const ballsInfo = rounds.map((round) => {
    const colorNumCombination = round.trim().split(", ");
    const roundInfo = colorNumCombination.map((colorNum) => {
      const splitted = colorNum.split(" ");
      return {
        balls: parseInt(splitted[0]),
        color: splitted[1],
      } as RoundInfo;
    });
    return roundInfo;
  });

  return {
    id: id,
    rounds: ballsInfo,
  } as GameInfo;
}

type GameInfo = {
  id: number;
  rounds: RoundInfo[][];
};

type RoundInfo = {
  balls: number;
  color: ColorInfo;
};

type ColorInfo = "red" | "green" | "blue";

type MaxInfo = Record<ColorInfo, number>;
