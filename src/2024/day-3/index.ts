import * as fs from "node:fs";

const main = () => {
  const regex = /mul\((\d{1,3}),(\d{1,3})\)|(don't\(\))|(do\(\))/g

  const file = getFileContent()

  const captureGroups = [...file.matchAll(regex)]

  let result = 0
  let enabled = true
  captureGroups.forEach(([string, X, Y]) => {
    if(string === 'do()') {
      enabled = true
    }
    if(string === 'don\'t()') {
      enabled = false
    }
    if(X !== undefined && Y !== undefined && enabled){
      result += parseInt(X) * parseInt(Y)
    }
  })
  console.log(result)
}

const getFileContent = (): string => {
    return fs.readFileSync('input.txt', 'utf8').toString();
  }

main()

