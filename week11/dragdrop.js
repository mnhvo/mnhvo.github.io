const card = document.querySelector(".card");
console.log(card);

let draggedCard = null;

card.addEventListener("dragstart", function () {
  dragged = card;
  console.log(draggedCard);
});

const dropBox = document.querySelector(".dropbox");
console.log(dropBox);

dropBox.addEventListener("dragover", function (e) {
  e.preventDefault();
});

dropBox.addEventListener("drop", function (e) {
  const clone = draggedCard;
  dropBox.appendChild(clone);
  clone.addEventListener("click", function () {
    clone.classlist.toggle("flip");
  });
  draggedCard = null;
});
