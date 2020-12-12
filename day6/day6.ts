const data = await Deno.readTextFile("data.txt");
let data_array = data.split('\n\n').filter(e => e);

let groups = [];

const clearString = (groupString: string) => {
  return groupString.replace(new RegExp('\n','g'), "");
}

function reemplazarDuplicados(value: string, index: number, self: string[]) { 
    return (self.indexOf(value) === index)?value:'';
}

const countQuestions = (group: string) => {
  let array = clearString(group).split("");
  let uniques = array.filter( reemplazarDuplicados );
  return uniques.length;
}

let count = 0;
for(let group of data_array){
  count += countQuestions(group);
}
console.log(count);
