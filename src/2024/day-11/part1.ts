import fs from "node:fs";

const main = () => {
  const file = getFileContent()
  let initialNumbers = file.split(' ')

  for(let i = 0; i < 25; i++) {
    initialNumbers = processNumbers(initialNumbers)
  }
  console.log(initialNumbers.length)
}

const processNumbers = (numbers: string[]) => {


  return numbers.flatMap(num => {
    if(num === '0') return '1'
    if(num.length %2 === 0) {
      const parsedNum = num.split('')
      const firstPart = parsedNum.slice(0, parsedNum.length / 2).join('')
      const secondPart = parsedNum.slice(parsedNum.length / 2).join('')
      return [parseInt(firstPart) + '', parseInt(secondPart) + '']
    }
    return parseInt(num)*2024 + ''
  })
}

const getFileContent = (): string => {
  return fs.readFileSync('input.txt', 'utf8').toString().split('\n')[0];
}

main()
