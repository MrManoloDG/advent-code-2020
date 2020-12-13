const data = (await Deno.readTextFile("data.txt")).trim();
let data_array = data.split('\n');

const navigation = new Proxy(['N', 'E', 'S', 'W'], {
    get(target, name, receiver) {
      if (typeof name !== 'string') {
	      return Reflect.get(target, name, receiver);
      }

      const index = Number(name);

      if (Number.isNaN(index)) {
	      return Reflect.get(target, name, receiver);
      }

      return target[index < 0 ? target.length + index : index];
    }
});

let orien: string = 'E';
let distanceX = 0;
let distanceY = 0;

const calculeOrientation = (degrees: number, left: boolean) => {
  let res = '';
  let index = navigation.indexOf(orien);
  switch(degrees % 360){
    case 0:
      res = orien;
      break;
    case 90:
      res = left? navigation[(index-1)%4] : navigation[(index+1)%4];
      break;
    case 180:
      res = left? navigation[(index-2)%4] : navigation[(index+2)%4];
      break;
    case 270:
      res = left? navigation[(index-3)%4] : navigation[(index+3)%4];
      break;
  }
  return res;
}

const executeCommand = (command: string) =>{
  switch(command[0]){
    case 'N':
      distanceY += Number(command.substring(1));
      break;
    case 'S':
      distanceY -= Number(command.substring(1));	
      break;
    case 'E':
      distanceX += Number(command.substring(1));
      break;
    case 'W':
      distanceX -= Number(command.substring(1));
      break;
    case 'L':
      orien = calculeOrientation(Number(command.substring(1)), true);
      break;
    case 'R':
      orien = calculeOrientation(Number(command.substring(1)), false);
      break;
    case 'F':
      executeCommand(orien + command.substring(1));
      break;
  }
}

for(let row of data_array) {
  executeCommand(row);
}


console.log(Math.abs(distanceX) + Math.abs(distanceY));

