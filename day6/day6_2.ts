const data = await Deno.readTextFile("data.txt");
let data_array = data.split('\n');

const countQ = (group: Set<string>[]) => {
  let join = new Set([...group[0]].filter( (e) => {
    let inAll = true;
    for(let i = 0; i < group.length; i++) {
      inAll = inAll && group[i].has(e);
    }
    return inAll;
  }));
  console.log(join);
  return join.size;
}

let listGroup = [];
let count = 0;
for(let group of [...data_array]){
  if(group != ""){
    listGroup.push(new Set(group.split("")));
  } else {
    count += countQ(listGroup);
    listGroup = [];
  }
}
console.log(count);

