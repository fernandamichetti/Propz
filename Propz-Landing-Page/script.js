/** Variables **/
var currentCard = 0;
var totalCards = 0;
var data;

/** Making the card appear and move forward or backward **/
function showCard(cardIndex) {
  var cardContainer = document.getElementById("cardContainer");
  var cards = cardContainer.getElementsByClassName("card");

  for (var i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }

  cards[cardIndex].style.display = "block";
}

function showPreviousCard() {
  currentCard = (currentCard - 1 + totalCards) % totalCards;
  showCard(currentCard);
}

function showNextCard() {
  currentCard = (currentCard + 1) % totalCards;
  showCard(currentCard);
}

/** Fetching JSON objects and creating elements **/

fetch("data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonData) {
    data = jsonData;
    totalCards = data.products.length;

    var cardContainer = document.getElementById("cardContainer");
    for (var i = 0; i < totalCards; i++) {
      var card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
      <a href="${data.products[i].linkproduct}" target="_blank">
    <img class="img-product" src="${data.products[i].image}"></a>
    <div class="name-size-container">
        <a class="name-link" href="${
          data.products[i].linkproduct
        }" target="_blank"><h2 class="name-product">${
        data.products[i].nameproduct
      }</h2></a>
        <p class="size-product">${data.products[i].mls}</p>
    </div>
    <div class="no-fees-credit-card-container">
        <div class="value-container">
            <p class="no-fees">${data.products[i].valueCreditNoFees.replace(
              /(R\$)(\d+),(\d+)/,
              '<span class="currency">$1</span><span class="value">$2</span><span class="decimal">,$3</span>'
            )}</p>
            <p class="phrase-fees-no-fees">sem juros¹</p>
        </div>
        <div class="just-cards">
            <img class="credit-card" src="${data.products[i].creditCards[0]}">
            <img class="credit-card2" src="${data.products[i].creditCards[1]}">
        </div>
    </div>
    <div class="with-fees-cash-container">
        <div class="value-container">
            <p class="with-fees">${data.products[i].valueCredit.replace(
              /(R\$)(\d+),(\d+)/,
              '<span class="currency">$1</span><span class="value">$2</span><span class="decimal">,$3</span>'
            )}</p>
            <p class="phrase-fees-no-fees">com juros²</p>
        </div>
        <p class="cash">${data.products[i].value}</p>
    </div>
`;

      cardContainer.appendChild(card);
    }

    showCard(currentCard);
  })
  .catch(function (error) {
    console.log("Error:", error);
  });

/** Making sure the first object appears when the page is loaded **/
window.addEventListener("DOMContentLoaded", function () {
  showCard(currentCard);
});
