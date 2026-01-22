import fs from "node:fs";

const main = () => {
  let position = 50

  const result = getFileContent().reduce((numberOfZeros, instruction) => {
    const match = instruction.trim().match(/^(?<direction>[A-Z])(?<distance>\d+)$/);

    if (match === null) return numberOfZeros

    const { direction, distance } = match.groups!;

    const parsedDistance = parseInt(distance)

    let passingZeros = 0

    if (direction === "L") {
      if (position === 0) {
        passingZeros = Math.floor(parsedDistance / 100)
      } else if (parsedDistance >= position) {
        passingZeros = 1 + Math.floor((parsedDistance - position) / 100)
      }
      position = ((position - parsedDistance) % 100 + 100) % 100
    }

    if (direction === "R") {
      passingZeros = Math.floor((position + parsedDistance) / 100)
      position = (position + parsedDistance) % 100
    }

    return numberOfZeros + passingZeros
  }, 0)

  console.log({result})
}

const getFileContent = (): string[] => {
  return fs.readFileSync('input.txt', 'utf8').toString().split('\n');
}

main()
