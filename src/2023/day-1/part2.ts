import fs from "node:fs";

const main = () => {
  const file = getFileContent()
  const result = file.reduce((sum, line) => {
    const sanitizedLine = sanitizeLine(line)
    const parsed = sanitizedLine.match(/\d/g)
    if (parsed) {
      sum += parseInt(parsed[0] + parsed.pop!())
    }
    return sum
  }, 0)
  console.log(result)
}

const sanitizeLine = (line: string) => {
  return line
    .replaceAll('one', 'o1e')
    .replaceAll('two', 't2o')
    .replaceAll('three', 't3e')
    .replaceAll('four', 'f4r')
    .replaceAll('five', 'f5e')
    .replaceAll('six', 's6x')
    .replaceAll('seven', 's7n')
    .replaceAll('eight', 'e8t')
    .replaceAll('nine', 'n9e')
}

const getFileContent = (): string[] => {
  return fs.readFileSync('input.txt', 'utf8').toString().split('\n');
}

main()
