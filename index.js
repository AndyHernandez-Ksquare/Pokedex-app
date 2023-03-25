// DOM elements
const searchInput = document.getElementById("search-input");
const resetButton = document.getElementById("reset-button");
const otherCardsButton = document.querySelector(".other-cards");

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

const placeCards = async () => {
  // Array to store promises when calling the setCards function
  const cardPromises = [];
  //   I had to put this for loop inside an async function because I noticed it was pushing the names in the cardsArray randomly
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
};
// Call the function on render
placeCards();

// Add event listener to the search bar
searchInput.addEventListener("input", () => {
  // Get the search input from the user
  const searchQuery = searchInput.value.toLowerCase();

  // Get all rows that contain the cards to be searched
  const rows = document.querySelectorAll(".first-row, .second-row, .third-row");

  // For each row, get all the cards within it and check if their name matches the search query
  rows.forEach((row) => {
    const cards = row.querySelectorAll(".card");
    let hasMatch = false;

    cards.forEach((card) => {
      // Get the name of the card and convert it to lowercase
      const name = card.querySelector(".name").textContent.toLowerCase();

      // If the name includes the search query, show the card and center it on the screen using absolute positioning
      if (name.includes(searchQuery)) {
        hasMatch = true;
        card.style.display = "block";
        card.style.position = "absolute";
        card.style.top = "12rem";
        card.style.left = "0";
        card.style.right = "0";
        card.style.margin = "auto";
      }
      // Else, the card gets hidden
      else {
        card.style.display = "none";
      }
    });

    // If at least one card in the row matches the search query, show the row
    if (hasMatch) {
      row.style.display = "flex";
    }
    // Otherwise, hide the row
    else {
      row.style.display = "none";
    }
  });
});

// Add an event listener to the reset button
resetButton.addEventListener("click", () => {
  // Reset the search input value
  searchInput.value = "";

  // Show all the cards
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.style.display = "block";
    card.style.position = "";
    card.style.top = "";
    card.style.left = "";
    card.style.right = "";
    card.style.margin = "";
  });

  // Show all the rows
  const rows = document.querySelectorAll(".row");
  rows.forEach((row) => {
    row.style.display = "flex";
  });
});

// Button to get other cards
otherCardsButton.addEventListener("click", () => {
  setCards();
  placeCards();
});
