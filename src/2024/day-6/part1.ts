import fs from "node:fs";

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

const main = () => {
  const file = getFileContent()
  const width = file[0].length
  const height = file.length - 1

  let xPosition = 85;
  let yPosition = 48;
  let direction: Direction = 'UP'

  const memo: Record<string, boolean> = {
    [`${xPosition}-${yPosition}`]: true
  };

  while(xPosition > 0 &&xPosition < width && yPosition > 0 && yPosition < height) {
    console.log(xPosition, yPosition, direction)
    const key = xPosition + '-' + yPosition
    switch(direction) {
      case "UP":
        if(nextCaseEmpty(file, xPosition , yPosition - 1)) {
          checkMemo(memo, key)
          yPosition--
        } else {
          direction = "RIGHT"
        }
        break;
      case "DOWN":
        if(nextCaseEmpty(file, xPosition, yPosition + 1)) {
          checkMemo(memo, key)
          yPosition++
        }  else {
          direction = "LEFT"
        }
        break;
      case "LEFT":
        if(nextCaseEmpty(file, xPosition -1, yPosition)) {
          checkMemo(memo, key)
          xPosition--
        } else {
          direction = "UP"
        }
        break;
      case "RIGHT":
        if(nextCaseEmpty(file, xPosition +1, yPosition)) {
          checkMemo(memo, key)
          xPosition++
        } else {
          direction = "DOWN"
        }
        break;
    }
  }

  console.log(Object.keys(memo).length)
}

const checkMemo = (memo: Record<string, boolean>, key: string) => {
  if(!memo[key]) {
    memo[key] = true
  }
}

const nextCaseEmpty = (file: string[], x: number, y: number) => {
  return file[y][x] !== '#'
}

const getFileContent = (): string[] => {
  return fs.readFileSync('input.txt', 'utf8').toString().split('\n');
}

main()
