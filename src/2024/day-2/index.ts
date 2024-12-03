import * as fs from "node:fs";

const main = () => {
  const reports = getFileContent().filter(value => !isNaN(parseInt(value)))

  const goodFlow = reports.filter(checkReport)

  console.log(goodFlow.length)
}

const getFileContent = (): string[] => {
  return fs.readFileSync('input.txt', 'utf8').toString().split('\n');
}

const ascSort = (a: number, b: number) => {
  return b - a
}

const descSort = (a: number, b: number) => {
  return a - b
}

const checkReportMinusOne = (parsedReport: number[]) => {
    const sortFnc = parsedReport[0] < parsedReport[1] ? descSort : ascSort
  if (JSON.stringify(parsedReport) !== JSON.stringify([...parsedReport].sort(sortFnc))) return false;

  let valid = true;
  parsedReport.forEach((value, i) => {
    if (i !== parsedReport.length - 1) {
      const interval = Math.abs(value - parsedReport[i+1])
      if (interval < 1 || interval > 3) valid = false
    }
  })
  return valid
}

const checkReport = (report: string) => {
  const parsedReport = report.split(' ').map(value => parseInt(value))

  let valid = false
  let omittedCharIndex = 0

  while (!valid && omittedCharIndex < parsedReport.length) {
    valid = checkReportMinusOne(parsedReport.toSpliced(omittedCharIndex, 1))
    omittedCharIndex++
  }

  return valid;
}

main()
