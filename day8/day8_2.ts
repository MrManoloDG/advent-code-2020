const data_txt = await Deno.readTextFile("data.txt");
let data_array = data_txt.split('\n');

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
      instructionIndex+= Number(operator);
      break;
    case 'nop':
      instructionIndex++;
      break;
  }
}

const executeProgram = (data: string[]) => {
  while(!secondTime && instructionIndex < data.length){
    if(instructionsExecuted.has(instructionIndex)){
      secondTime = true; 
    } else {
      let [command, operator] = parseCommand(data[instructionIndex]);
      instructionsExecuted.add(instructionIndex);
      executeCommand(command, operator);
    }
  } 
}

for(let i = 0; i < data_array.length; i++){
  let data = [...data_array];
  acc = 0;
  instructionIndex = 0;
  secondTime = false;
  instructionsExecuted = new Set();
  
  if(data[i].slice(0,3) !== 'acc'){
    let swap = data[i].slice(0,3) === "nop" ? "jmp" : "nop";
    data[i] = swap + data[i].substring(3); 
    executeProgram(data);
    if(!secondTime) console.log(acc);
  }
}

