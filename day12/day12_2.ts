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

let waypoint = {
  x: 10,
  y: 1
}

const executeCommand = (command: string) =>{
  let swap = 0;
  switch(command[0]){
    case 'N':
      waypoint.y += Number(command.substring(1));
      break;
    case 'S':
      waypoint.y -= Number(command.substring(1));	
      break;
    case 'E':
      waypoint.x += Number(command.substring(1));
      break;
    case 'W':
      waypoint.x -= Number(command.substring(1));
      break;
    case 'L':
      for (let i = 0; i < Number(command.substring(1)) / 90; i++) {
        swap = waypoint.x;
        waypoint.x = -waypoint.y;
        waypoint.y = swap;
      }
      break;
    case 'R':
      for (let i = 0; i < Number(command.substring(1))/ 90; i++) {
        swap = waypoint.x;
        waypoint.x = waypoint.y;
        waypoint.y = -swap;
      }
      break;
    case 'F':
      distanceX += waypoint.x * Number(command.substring(1));
      distanceY += waypoint.y * Number(command.substring(1));
      break;
  }
}

for(let row of data_array) {
  executeCommand(row);
}


console.log(Math.abs(distanceX) + Math.abs(distanceY));

