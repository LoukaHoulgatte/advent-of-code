import fs from "node:fs";

const main = () => {
  const file = getFileContent()
  const splitByType = file.split('SECTION')
  const instructions = splitByType[0].split('\n')
  const computedInstructions = computeInstructions(instructions)
  const cases = splitByType[1].split('\n')

  const result = cases.reduce((sum, currentCase) => {
    const parsedCase = currentCase.split(',').map(item => parseInt(item))
    if (validCase(parsedCase, computedInstructions)) {
      sum+= parseInt(currentCase[currentCase.length / 2])
    }
    return sum
  }, 0)
  console.log(result)
}

const computeInstructions = (instructions: string[]): string[] => {
 return []
}

const validCase = (parsedCase: number[], instructions: string[]): boolean => {
  return true
}

const getFileContent = (): string => {
  return fs.readFileSync('input.txt', 'utf8').toString()
}

main()
