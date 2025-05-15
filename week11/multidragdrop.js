const myCards = [
  { id: 1, name: "Queen", src: "queen.png" },
  { id: 2, name: "Jack", src: "jack.png" },
  { id: 3, name: "King", src: "king.png" },
];

let cardComposition = "";

for (let i = 0; i < myCards.length; i++) {
  cardComposition += `
    <div class="card-container">
            <div class="card" draggable="true">
              <div class="card-face"><img src="cloud.png" alt="Back" /></div>
              <div class="card-face flip">
                <img src="queen.png" alt="Queen" />
              </div>
            </div>
          </div>
`;
  console.log(cardComposition);
}

const deck = document.querySelector(".deck");
console.log(deck);
deck.innerHTML = "";
deck.innerHTML = cardComposition;
