// DOM elements
const searchInput = document.getElementById("search-input");
const resetButton = document.getElementById("reset-button");

// Array to store the name of the pokemon in each card
const cardsArray = [];
// Generate random number
const generateRandomNumber = () => {
  // Generate random number between 1 and 1000
  //   This is what gives a random pokemon on each render
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  return randomNumber;
};

const fetchData = async () => {
  const req = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${generateRandomNumber()}/`
  );
  const data = await req.json();
  return data;
};

// Function to create cards
const setCards = async (
  nameClass,
  type1Class,
  type2Class,
  imgClass,
  hpClass,
  attackClass,
  defenseClass,
  speedClass
) => {
  // Get the data
  const cardData = await fetchData();
  //   Set name text and src to its wikipedia
  const name = document.querySelector(nameClass);
  name.textContent = cardData.forms[0].name;
  name.href = `https://en.wikipedia.org/wiki/${name.textContent}`;

  //    Set the type 1 text
  const type1 = document.querySelector(type1Class);
  type1.textContent = cardData.types[0].type.name;
  //    Set the type 2 text only if it exists
  const type2 = document.querySelector(type2Class);
  type2.textContent = cardData.types[1] ? cardData.types[1].type.name : "N/A";
  //   Set the image
  //   The deffault image is the bulbasaur one
  const img = document.querySelector(imgClass);
  img.src = cardData.sprites.other["official-artwork"].front_default;

  //   Set the stats
  // HP
  const hp = document.querySelector(hpClass);
  hp.textContent = `HP: ${cardData.stats[0].base_stat}`;

  //   Attack
  const attack = document.querySelector(attackClass);
  attack.textContent = `ATTACK: ${cardData.stats[1].base_stat}`;
  //   Defense
  const defense = document.querySelector(defenseClass);
  defense.textContent = `DEFENSE: ${cardData.stats[2].base_stat}`;
  //   Speed
  const speed = document.querySelector(speedClass);
  speed.textContent = `SPEED: ${cardData.stats[5].base_stat}`;

  return name.textContent;
};

// Function to set all the cards on the page
// This is an IIFE function
(async () => {
  // Array to store promises when calling the setCards function
  const cardPromises = [];
  //   I had to put this for loop inside an async function because I notice it was pushing the names in the cardsArray randomly
  // That error is now fixed
  for (let i = 1; i <= 12; i++) {
    cardPromises.push(
      setCards(
        `.name-${i}`,
        `.type-${i}-1`,
        `.type-${i}-2`,
        `.img-${i}`,
        `.hp-${i}`,
        `.attack-${i}`,
        `.defense-${i}`,
        `.speed-${i}`
      )
    );
  }
  //   Wait for all promises to resolve and store the card names in the cardsArray array
  const cardNames = await Promise.all(cardPromises);
  cardsArray.push(...cardNames);
})();

// Add event listener to the search bar
searchInput.addEventListener("input", () => {
  // Get the search input from the user
  const searchQuery = searchInput.value.toLowerCase();
  // Loop through all the elements in the cardsArray
  for (let i = 0; i < cardsArray.length; i++) {
    // Get the name of the current card
    const cardName = cardsArray[i].toLowerCase();
    // Get the card DOM element by its index
    const card = document.querySelector(`.card-${i}`);
    // If the card includes the search input, show it
    if (cardName.includes(searchQuery)) {
      card.style.display = "block";
    }
    // If not, hide it
    else {
      card.style.display = "none";
    }
  }
});

// Add an event listener to the reset button
resetButton.addEventListener("click", () => {
  // Reset the search input value
  searchInput.value = "";
  // Show all the cards
  for (let i = 0; i < cardsArray.length; i++) {
    const card = document.querySelector(`.card-${i}`);
    card.style.display = "block";
  }
});
