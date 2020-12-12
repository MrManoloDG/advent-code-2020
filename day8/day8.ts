const data = await Deno.readTextFile("data.txt");
let data_array = data.split('\n');

let acc: number = 0;
let instructionIndex: number = 0;
let secondTime: boolean = false;
let instructionsExecuted: Set<number> = new Set();

const parseCommand = (command: string) => {
  let array_co = command.split(" ");
  return [array_co[0], array_co[1]];
}

const executeCommand = (command: string, operator: string) => {
  switch(command){
    case 'acc':
      acc += Number(operator);
      instructionIndex++;
      break;
    case 'jmp':
      instructionIndex += Number(operator);
      break;
    case 'nop':
      instructionIndex++;
      break;
  }
}

while(!secondTime && instructionIndex < data_array.length){
  if(instructionsExecuted.has(instructionIndex)){
    secondTime = true; 
  } else {
    let [command, operator] = parseCommand(data_array[instructionIndex]);
    instructionsExecuted.add(instructionIndex);
    executeCommand(command, operator);
  }
}

console.log(acc);

