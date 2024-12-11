import fs from "node:fs";

const main = () => {
  const file = getFileContent()
  let initialNumbers = file.split(' ')


  const computed = initialNumbers.map((num, i) => {
    console.log('------------------------------------------' + i)
    return processNum(num, 0, 75)
  })
  console.log(computed.reduce((sum, curr) => {
    sum+= curr;
    return sum;
  } ))
}

const processNum = (num: string, index: number, max: number): number => {
  if (index === max) {
    return 1
  }

  const newIndex = index + 1
  if(num === '0') return processNum('1', newIndex, max)
  if(num.length %2 === 0) {
    const parsedNum = num.split('')
    const firstPart = parsedNum.slice(0, parsedNum.length / 2).join('')
    const secondPart = parsedNum.slice(parsedNum.length / 2).join('')

    return processNum(parseInt(firstPart) + '', newIndex, max) + processNum(parseInt(secondPart) + '', newIndex, max)
  }
  return processNum(parseInt(num)*2024 + '', newIndex, max)
}

const getFileContent = (): string => {
  return fs.readFileSync('input.txt', 'utf8').toString().split('\n')[0];
}

main()
