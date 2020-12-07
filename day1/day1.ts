const data = await Deno.readTextFile("data.txt");
let expense_report = data.split('\n');

let complement: Record<number, boolean> = {}

for(let element of expense_report) {
  let e: number = +element;
  complement[e] = true;
  let toFind = 2020 - e;

  if (complement[toFind]){
    console.log(e * toFind);
  }
}

