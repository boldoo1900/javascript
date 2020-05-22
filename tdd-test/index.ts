function calcScore(scoreStr: string): number {
    let scoreArr = scoreStr.split(" ").map(Number)
    let total = 0;
    let frame = 0;
    let newframe = true;
    scoreArr.forEach((element, index) => {
        if(frame === 10) return;
        if(index !== 0 && element == 0 && scoreArr[index-1] == 10) return      // if 10 then next element automatically 0 note: 10th frame is different

        if(element === 10){     // strike
            if(scoreArr[index+1] === 0){
                total += scoreArr[index+2]
                if(scoreArr[index+2] === 10 && index+2 < 18){           // different on 10th frame
                    total += scoreArr[index+4]
                } else {
                    total += scoreArr[index+3]
                }
            } else {
                total += scoreArr[index+1]
                total += scoreArr[index+2]
            }

            frame++;
        } else if(!newframe){
            if(scoreArr[index-1] + element === 10)  // spare
                total += scoreArr[index + 1]

            frame++;
            newframe = true;
        } else {
            newframe = false;
        }

        total += element

        // if(element != 0)
        //     console.log(total)
    })

    return total
}

test([
    ["2 5 2 5 2 5 2 5 2 5 2 5 2 5 2 5 2 5 2 5 2", 70],   
    ["1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1", 20],
    ["2 8 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3", 67],              // spare
    ["10 0 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3", 70],             // strike
    ["1 4 9 0 0 3 7 3 2 8 10 0 9 1 8 0 10 0 10 9 1", 144],           // 10th frame check
    ["10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 0 10 10 10", 300], 
], calcScore);

function test(expectation: Array<[string, number]>, func: (i: string) => number) {
    expectation.forEach(([i, expect]) => {
        const result =  func(i) === expect ? "Success" : "Failed"
        console.log(`${result}. given: ${i}, expect: ${expect}, got: ${func(i)}`)
    });
}