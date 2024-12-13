import fs from "node:fs";

const main = () => {
  const lines = getFileContent();

  let max = 0;
  let currentElf = 0

  lines.forEach(num => {
    const parsedNum = parseInt(num)
    if (isNaN(parsedNum)) {
      if(currentElf > max) max = currentElf
      currentElf = 0
    } else {
      currentElf += parsedNum
    }
  })
  console.log(max)
}

const getFileContent = (): string[] => {
  return fs.readFileSync('input.txt', 'utf8').toString().split('\n');
}

main()
