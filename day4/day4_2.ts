const data = await Deno.readTextFile("data.txt");
let data_array = data.split('\n\n').filter(e => e);

const eye_color_list = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
interface Number {
  between(a: number, b: number): boolean;
}

Number.prototype.between = function(a: number, b: number) {
  var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return this >= min && this <= max;
};

const validateHeight = (height: string) =>{
  if(height.includes("cm")) {
    let [n, d] = height.split("cm");
    if(Number(n).between(150, 193)) return true;  
  }
  if (height.includes("in")) {
    let [n, d] = height.split("in");
    if(Number(n).between(59, 76)) return true; 
  }
  return false;
}

const validatePassport = (passport: any) => {
  let valid: boolean = false;
  if (Number(passport.byr).between(1920,2002) &&
      Number(passport.iyr).between(2010,2020) &&
      Number(passport.eyr).between(2020,2030) && 
      /#(\d|[a-f]){6}/.test(passport.hcl.trim()) &&
      eye_color_list.includes(passport.ecl.trim()) &&
      passport.pid.length === 9 &&
      validateHeight(passport.hgt.trim())
  ) valid = true;
  return valid;
}

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
  ) {
    return validatePassport(JSONpassaport);
  } else return false;
}

let count = 0;
for(let element of data_array) {
  if(checkPassport(element)) count++;
}

console.log(count);
