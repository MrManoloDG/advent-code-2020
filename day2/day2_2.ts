const data = await Deno.readTextFile("data.txt");
let data_array = data.split('\n').filter(e => e);

const validLine = (values: string[], character: string, password: string) => {
  let position1 = Number(values[0]);
  let position2 = Number(values[1]);
  let valid = false;
  if(password[position1 - 1] === character) valid = !valid;
  if(password[position2 - 1] === character) valid = !valid;
  return valid;
}

let count = 0;
for(let element of data_array) {
  let element_split = element.split(' ');
  let values = element_split[0].split('-');
  if(validLine(values, element_split[1].slice(0, -1), element_split[2])) count++; 
}

console.log(count);
