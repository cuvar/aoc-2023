const LIMITS: Record<ColorInfo, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

async function main() {
  const res = await Deno.readTextFile("./2/input.txt");
  const lines = res.split("\n");
  const gameInfos = lines.map((line) => parseGameInfo(line));
  const possibleGames = gameInfos.filter((gameInfo) =>
    isGamePossible(gameInfo)
  );
  const total = possibleGames.reduce((acc, curr) => acc + curr.id, 0);
  console.log(total);
}

await main();

function isGamePossible(gameInfo: GameInfo): boolean {
  for (const round of gameInfo.rounds) {
    if (!isRoundPossible(round)) {
      return false;
    }
  }
  return true;
}

function isRoundPossible(round: RoundInfo[]): boolean {
  for (const ballset of round) {
    if (ballset.balls > LIMITS[ballset.color]) {
      return false;
    }
  }
  return true;
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
