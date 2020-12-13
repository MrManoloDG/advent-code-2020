const data = (await Deno.readTextFile("data.txt")).trim();
let data_array = data.split('\n');

let timestamp = Number(data_array[0]);
let [firstBus, ...buses] = data_array[1]
  .split(',')
  .map((n, i) => [parseInt(n, 10), i])
  .filter(([e]) => !Number.isNaN(e));

let multiplier = firstBus[0];
let bustime = 0;
for(let [bus, index] of buses){
 while (true) {
    if ((bustime + index) % bus === 0) {
      multiplier *= bus;
      break;
    }
    bustime += multiplier;
  }
}

console.log(bustime);
