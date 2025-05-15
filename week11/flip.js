//flip on hover
const card = document.querySelector(".card");
console.log(card);

card.addEventListener("mouseenter", flipMe);

function flipMe() {
  card.classList.add("flip");
}

card.addEventListener("mouseleave", flipMeBack);

function flipMeBack() {
  card.classList.remove("flip");
}

//Flip on click
// card.addEventListener("click", toggleFlip);

// function toggleFlip() {
//   card.classList.toggle("flip");
// }
