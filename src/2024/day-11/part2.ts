import fs from "node:fs";

const main = () => {
  const file = getFileContent()
  let initialNumbers = file.split(' ')

  const memo: Record<string, number> = {};

  const computed = initialNumbers.map((num, i) => {
    console.log('------------------------------------------' + i)
    return processNum(num, 0, 75, memo)
  })
  console.log(computed.reduce((sum, curr) => {
    sum+= curr;
    return sum;
  } ))
}

const processNum = (num: string, index: number, max: number, memo: Record<string, number> ): number => {
  const key = `${num}-${index}`;
  if (memo[key] !== undefined) {
    return memo[key];
  }
  if (index === max) {
    return 1
  }

  const newIndex = index + 1
  let result: number;

  if(num === '0') {
    result = processNum('1', newIndex, max, memo)
  } else if(num.length %2 === 0) {
    const parsedNum = num.split('')
    const firstPart = parsedNum.slice(0, parsedNum.length / 2).join('')
    const secondPart = parsedNum.slice(parsedNum.length / 2).join('')

    result = processNum(parseInt(firstPart) + '', newIndex, max, memo) + processNum(parseInt(secondPart) + '', newIndex, max, memo)
  } else {
    result = processNum(parseInt(num)*2024 + '', newIndex, max, memo)
  }

  memo[key] = result;
  return result;
}

const getFileContent = (): string => {
  return fs.readFileSync('input.txt', 'utf8').toString().split('\n')[0];
}

main()
