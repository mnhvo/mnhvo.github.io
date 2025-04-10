let a = 20;
let b = 10;

function add(val1, val2) {
  let total = val1 + val2;
  console.log(total);
}

function subtract(val1, val2) {
  let res = val1 - val2;
  return res;
}

function whatIsMyGrade(marks) {
  if (marks > 80) {
    return "HD";
  } else if (marks < 40) {
    return "FAIL";
  } else {
    return "PASS";
  }
}

let c = add(a, b);
// console.log(c);
// console.log(total); will give error because total is within the functino and is shielded
a = 40;
b = 14;
c = add(a, b);
c = add(34, 67);
// console.log(c)

// console.log(c);
c = subtract(134, 60);
