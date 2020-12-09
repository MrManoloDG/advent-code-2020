const data = await Deno.readTextFile("data.txt");
let data_array = data.split('\n\n').filter(e => e);

const parsePassaport = (passport: string) => {
  let parsedString = passport.replace(new RegExp('\n ', 'g'), '", "');
  parsedString = parsedString.replace(new RegExp(' ', 'g'), '", "');
  parsedString = parsedString.replace(new RegExp('\n','g'), '", "');
  parsedString = parsedString.replace(new RegExp(':','g'), '":"');
  if(parsedString[parsedString.length - 1] === '"'){
    parsedString = parsedString.slice(0, -4);
  }
  return  '{"' + parsedString + '"}';
}

const checkPassport = (passport: string) => {
  let JSONpassaport = JSON.parse(parsePassaport(passport));
  if (JSONpassaport.byr !== undefined &&
      JSONpassaport.iyr !== undefined &&
      JSONpassaport.eyr !== undefined &&
      JSONpassaport.hgt !== undefined &&
      JSONpassaport.hcl !== undefined &&
      JSONpassaport.ecl !== undefined &&
      JSONpassaport.pid !== undefined 
  ) return true;
  return false;
}

let count = 0;
for(let element of data_array) {
  if(checkPassport(element)) count++;
}

console.log(count);
