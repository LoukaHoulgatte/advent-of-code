import fs from "node:fs";

const main = () => {
  const file = getFileContent()
  const result = file.reduce((sum, line) => {
    const parsed = line.match(/\d/g)
    if (parsed) {
      sum += parseInt(parsed[0] + parsed[parsed?.length-1])
    }
    return sum
  }, 0)
  console.log(result)
}

const getFileContent = (): string[] => {
  return fs.readFileSync('input.txt', 'utf8').toString().split('\n');
}

main()
