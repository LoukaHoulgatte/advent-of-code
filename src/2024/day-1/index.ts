import * as fs from "node:fs";

const main = () => {
  const leftColumn: number[] = [];
  const rightColumn: number[] = [];

 getFileContent().forEach(line => {
   const parsedLine = line.split('   ')
   leftColumn.push(parseInt(parsedLine[0], 10))
   rightColumn.push(parseInt(parsedLine[1], 10))
 })

  leftColumn.sort()
  rightColumn.sort()

 const answer = leftColumn.reduce((sum, id, index) => {
   if(!(isNaN(id))) {
     const multiplier = rightColumn.filter(value => value === id)
     sum += id * multiplier.length
   }
   return sum
 }, 0)

  console.log(answer)
}


const getFileContent = (): string[] => {
  return fs.readFileSync('input.txt', 'utf8').toString().split('\n');
}

main()
