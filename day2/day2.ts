const data = await Deno.readTextFile("data.txt");
let data_array = data.split('\n').filter(e => e);

const validLine = (values: string[], character: string, password: string) => {
  let character_array = password.match(new RegExp(character,'gi'));
  let number_characters = (character_array !== null)? character_array.length : 0;
  if (number_characters >= Number(values[0]) && number_characters <= Number(values[1])) {
    return true;
  }
  return false;
}

let count = 0;
for(let element of data_array) {
  let element_split = element.split(' ');
  let values = element_split[0].split('-');
  if(validLine(values, element_split[1].slice(0, -1), element_split[2])) count++; 
}

console.log(count);
