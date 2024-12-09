import fs from "node:fs";

const main = () => {
  const lines = getFileContent()

  const result = lines.reduce((sum, line) => {
    const [result, numbers] = line.split(':')
    if (!numbers) return sum
    const expectedResult = parseInt(result)
    const parsedNumbers = numbers.trim().split(' ').map(n => parseInt(n))

    if (isLineValid(expectedResult, parsedNumbers)) sum += expectedResult
    return sum
  }, 0)

  console.log(result)
}

const isLineValid = (result: number, numbers: number[]): boolean => {
  return canAchieveResult(result, numbers, 0, 0);
}

const canAchieveResult = (result: number, numbers: number[], index: number, current: number): boolean => {
  if (index === numbers.length) {
    return current === result;
  }

  const newIndex= index + 1

  return canAchieveResult(result, numbers, newIndex, current + numbers[index]) ||
    canAchieveResult(result, numbers, newIndex, current * numbers[index]);
}

const getFileContent = (): string[] => {
  return fs.readFileSync('input.txt', 'utf8').toString().split('\n')
}

main()
