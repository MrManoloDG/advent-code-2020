const data = await Deno.readTextFile("data.txt");
let data_array = data.split('\n').filter(e => e);

let position_x = 0;
let trees = 0;
for(let row of data_array) {
  if(row[position_x] === '#') trees++;
  position_x = (position_x + 3) % row.length;
}

console.log(trees);

