import fs from "node:fs";

const main = () => {



  const fileHor = getFileContent()
  const rawFileVer = getFileContent().map(row => row.split(''))
  const fileVer = inverseRowsAndColumns(rawFileVer).map(row => row.join(''))
  const fileDiag = extractDiagonals(rawFileVer).map(row => row.join(''));

  const resultHor = processFile(fileHor)
  const resultVer = processFile(fileVer)
  const resultDiag = processFile(fileDiag);


  console.log(resultHor + resultVer + resultDiag)
}

const getFileContent = (): string[] => {
  return fs.readFileSync('input.txt', 'utf8').toString().split('\n');
}

const extractDiagonals = (matrix: string[][]): string[][] => {
  const diagonals: string[][] = [];
  const numberOfRows = matrix.length;
  const numberOfColumns = matrix[0].length;

  for (let d = 0; d < numberOfRows + numberOfColumns - 1; d++) {
    const diag1: string[] = [];
    const diag2: string[] = [];
    for (let i = 0; i < numberOfRows; i++) {
      const j = d - i;
      if (j >= 0 && j < numberOfColumns) {
        diag1.push(matrix[i][j]);
        diag2.push(matrix[i][numberOfColumns - j - 1]);
      }
    }
    if (diag1.length > 0) diagonals.push(diag1);
    if (diag2.length > 0) diagonals.push(diag2);
  }

  return diagonals;
}

const inverseRowsAndColumns = (matrix: string[][]): string[][] => {
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

const processFile = (file: string[]) => {
  const result = calculateRegular(file)
  const resultBackward = calculateBackward(file)
  return result + resultBackward
}

const calculateRegular = (file: string[]) => {
  const regexHor = /(XMAS)/g

  return file.reduce((sum, line) => {
    const captureGroups = [...line.matchAll(regexHor)]
    sum += captureGroups.length
    return sum
  }, 0)
}

const calculateBackward = (file: string[]) => {
  const regexHorBackward = /(SAMX)/g
  return file.reduce((sum, line) => {
    const captureGroups = [...line.matchAll(regexHorBackward)]
    sum += captureGroups.length
    return sum
  }, 0)
}

main()
