import fs from "node:fs";

type Instructions = Record<string, Record<'before'|'after', number[]>>

const main = () => {
  const file = getFileContent()
  const splitByType = file.split('SECTION')
  const instructions = splitByType[0].split('\n')
  const computedInstructions = computeInstructions(instructions)

  const cases = splitByType[1].split('\n')

  const result = cases.reduce((sum, currentCase) => {
    const parsedCase = currentCase.split(',').map(item => parseInt(item))
    if(parsedCase.length === 1) return sum
    if (validCase(parsedCase, computedInstructions)) {
      sum+= parsedCase[Math.floor(parsedCase.length / 2)]
    }
    return sum
  }, 0)
  console.log(result)
}

const computeInstructions = (instructions: string[]) => {
  return instructions.reduce<Instructions>((computedInstructions, curr) => {
    const [first, second] = curr.split('|')
    const parsedFirst = parseInt(first)
    const parsedSecond = parseInt(second)
    if (parsedFirst === parsedSecond) return computedInstructions
    computedInstructions[first] = {
      ...computedInstructions[first],
      before: (computedInstructions[first]?.before ?? []).concat(parsedSecond)
    }
    computedInstructions[second] = {
      ...computedInstructions[second],
      after: (computedInstructions[second]?.after ?? []).concat(parsedFirst)
    }
    return computedInstructions
  }, {})
}


const validCase = (parsedCase: number[], instructions: Instructions): boolean => {
  let valid = true
  let index = 0
  do {
    const {before, after} = instructions[parsedCase[index]] ?? {}
    const resultBefore = (before ?? []).map((currentNb) => parsedCase.indexOf(currentNb)).filter(currIndex => currIndex < index && currIndex !== -1)
    console.log(after)
    const resultAfter = (after ?? []).map((currentNb) => parsedCase.indexOf(currentNb)).filter(currIndex => currIndex > index && currIndex !== -1)
    console.log(resultBefore, resultAfter)
    if (resultBefore.length !== 0 || resultAfter.length !== 0) {
      valid = false
    }
    index++
  } while(valid && index < parsedCase.length)
  return valid
}

const getFileContent = (): string => {
  return fs.readFileSync('input.txt', 'utf8').toString()
}

main()
