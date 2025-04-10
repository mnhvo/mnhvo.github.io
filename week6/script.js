const header = document.querySelector("header");
//console.log(header.innerHTML);
let course = "0ART1012";
//header.innerHTML += "<h1> this is 0ART1013 </h1.";
const topHeading = document.querySelector("h1");

const myButton = document.querySelector("button");
myButton.addEventListener("click", handleClick);

const myCat = document.querySelector("#my-cat");
console.log(myCat);

function addMe() {
  myCat.classList.add("round");
}

function handleClick() {
  console.log("Hey did you just click on me");
  // topHeading.textContent = "This is the new heading";
  myCat.classList.toggle("round");
}

//console.log(topHeading);
//console.log(topHeading.textContent);
//topHeading.textContent = "This is a new heading";
//topHeading.style.color = "crimson";

const allParas = document.querySelectorAll("p");
//console.log(allParas);
//console.log(allPara.textContent);
for (let i = 0; i < allParas.length; i++) {
  // console.log(allParas[i].textContent);
  allParas[i].style.border = "1px solid green";
  allParas[i].style.backgroundColor = "beige";
}

const myFirstSub = document.querySelector("#first-subheading");
//console.log(myFirstSub);
//console.log(myFirstSub.textContent);
