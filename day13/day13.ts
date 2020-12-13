const data = (await Deno.readTextFile("data.txt")).trim();
let data_array = data.split('\n');

let timestamp = Number(data_array[0]);
let buses = data_array[1].split(',').filter(e => e !== 'x');

let closerBus = {
  id: 0, 
  time: Number.MAX_SAFE_INTEGER
};

for(let bus of buses){
  let bustime = 0;
  while(bustime <= timestamp){
    bustime += +bus;
  }
  if(bustime < closerBus.time){
    closerBus.id = +bus;
    closerBus.time = bustime;
  }
}

console.log((closerBus.time - timestamp)* closerBus.id);
