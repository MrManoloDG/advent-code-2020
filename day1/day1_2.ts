const data = await Deno.readTextFile("data.txt");
let expense_report = data.split('\n').filter(e => e);

for(let x of expense_report) {
  for(let y of expense_report) {
    for(let z of expense_report) {
      if ((Number(x) + Number(y) + Number(z))== 2020 && x != y && y != z && x != z){
	console.log("Numbers:> " + x + " + " + y + " + " + z + " = " + (Number(x) * Number(y) * Number(z)));
      }  
    }
  }
}

