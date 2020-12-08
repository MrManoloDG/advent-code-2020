const data = await Deno.readTextFile("data.txt");
let data_array = data.split('\n').filter(e => e);
let trees = [0,0,0,0,0];
let position = [0,0,0,0,0];

const calculatePosition = (slope: number, right: number, maxLength: number) =>{
  position[slope] = (position[slope] + right) % maxLength;
}

const calculateRow = (nrow: number, row: string) => {
  trees[0] += Number((row[position[0]] === '#')? 1: 0);
  calculatePosition(0,1,row.length);
  trees[1] += Number((row[position[1]] === '#')? 1: 0);
  calculatePosition(1,3,row.length);
  trees[2] += Number((row[position[2]] === '#')? 1: 0);
  calculatePosition(2,5,row.length);
  trees[3] += Number((row[position[3]] === '#')? 1: 0);
  calculatePosition(3,7,row.length);
  if(nrow % 2 === 0){
    trees[4] += Number((row[position[4]] === '#')? 1: 0);
    calculatePosition(4,1,row.length);
  }
}

for(let i = 0; i < data_array.length; i++) {
  calculateRow(i,data_array[i]);
}
console.log(trees);
console.log(trees.reduce((p,c) => p*c));
