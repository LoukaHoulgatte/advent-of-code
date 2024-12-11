import fs from "node:fs";

const main = () => {
  const file = getFileContent()
  const parsedDisk = file.split('')
  let id = 0
  let position = 0

  const sortedDisk = parsedDisk.reduce((acc, element, index) => {
    const nb = parseInt(element)

    if(index%2 === 1) {
      for(let i =0; i<nb; i++) {
        acc[position++] = '.'
      }
    } else {
      for (let i = 0; i < nb; i++) {
        acc[position++] = id + ''
      }
      id++
    }
    return acc
  }, {} as Record<string, string>)

  Object.values(sortedDisk).forEach((value, i) => {
    if(value === '.') {
      let otherElement = '.'
      const newList = Object.values(sortedDisk)
      while(otherElement === '.') {
        otherElement = newList.pop()!
      }
      if (i < newList.length) {
        sortedDisk[i] = otherElement
        sortedDisk[newList.length] = '.'
      }
    }
  })
  const result = Object.values(sortedDisk).reduce((sum, value, index) => {
    if (value !== '.'){
      sum += index * parseInt(value)
    }
    return sum
  }, 0)
  console.log(result)
}

const getFileContent = (): string => {
  return fs.readFileSync('input.txt', 'utf8').toString().split('\n')[0];
}

main()
