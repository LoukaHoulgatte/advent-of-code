import fs from "node:fs";

const main = () => {
  let position = 50

  const result = getFileContent().reduce((count, instruction) => {
    const match = instruction.trim().match(/^(?<direction>[A-Z])(?<distance>\d+)$/);

    if( match === null) return count

    const { direction, distance } = match.groups!;
    console.log({ direction, distance: parseInt(distance) % 100, initialDistance: distance, position });

    const aroundTheClock = Math.floor(parseInt(distance) / 100)

    if (direction === "L") {
      position = position - (parseInt(distance) % 100)
      if (position < 0) {
        position = position + 100
      }
    } else {
      position = position + (parseInt(distance) % 100)
      if (position > 99) {
        position = position - 100
      }
    }

    if (position === 0) return count + 1 + aroundTheClock

    return count + aroundTheClock
  }, 0)

  console.log({result})
}

const getFileContent = (): string[] => {
  return fs.readFileSync('input.txt', 'utf8').toString().split('\n');
}

main()
