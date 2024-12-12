import fs from "node:fs";

const main = () => {
  const file = getFileContent()

  let counter = 0;
  let width = file[0].length
  let height = file.length

  file.forEach((line, i) => {
    line.split('').forEach((letter, j) => {
      let nbDiagonal = 0
      if(letter === 'A') {
        if (i > 0 && i < height -1 && j > 0 && j < width -1) {
          if (file[i-1][j-1] === 'S' && file[i+1][j+1] === 'M') {
            nbDiagonal++
          }
          if(file[i-1][j-1] === 'M' && file[i+1][j+1] === 'S') {
            nbDiagonal++
          }
          if(file[i-1][j+1] === 'S' && file[i+1][j-1] === 'M') {
            nbDiagonal++
          }
          if(file[i-1][j+1] === 'M' && file[i+1][j-1] === 'S') {
            nbDiagonal++
          }
          if (nbDiagonal === 2) counter++
        }
      }
    })
  })

  console.log(counter)

}

const getFileContent = (): string[] => {
  return fs.readFileSync('input.txt', 'utf8').toString().split('\n');
}

main()
