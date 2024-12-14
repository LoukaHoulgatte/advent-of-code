import fs from "node:fs";

const main = () => {
  const lines = getFileContent();

  let max: number[] = [];
  let currentElf = 0

  lines.forEach(num => {
    const parsedNum = parseInt(num)
    if (isNaN(parsedNum)) {
      if(max.length <= 2) {
        max.push(currentElf)
        max.sort(sortFn)
      } else {
        if (max[2] < currentElf) {
          max.push(currentElf)
          max.sort(sortFn)
          max.pop()
        }
      }
      currentElf = 0
    } else {
      currentElf += parsedNum
    }
  })
  console.log(max[0] + max[1] + max[2])
}

const sortFn = (a: number, b: number) => b-a

const getFileContent = (): string[] => {
  return fs.readFileSync('input.txt', 'utf8').toString().split('\n');
}

main()
