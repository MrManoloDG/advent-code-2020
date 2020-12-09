const data = await Deno.readTextFile("data.txt");
let data_array = data.split('\n').filter(e => e);

const calculatePos = (seatString: string, length: number, start: number, end: number) => {
  let min=start, max=end, value=0;
  for(let i=0; i < length; i++){
    if(seatString[i] === 'F' || seatString[i] === 'L'){
      max = min + Math.floor((max-min)/ 2);
      value = max;
    }
    if(seatString[i] === 'B' || seatString[i] === 'R'){
      min = min + Math.floor((max-min)/ 2) + 1;
      value = min;
    }
  }
  return value;
}

let maxId = 0;
for(let row of data_array) {
  let id = calculatePos(row, 7, 0, 127) * 8 + calculatePos(row.substr(-3), 3, 0, 7);
  if (id > maxId) maxId = id;
}
console.log(maxId);
