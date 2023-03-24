// Speed, attack and defende values are in an array called "stats"
// DOM elements

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
};

// Create 12 cards
for (let i = 0; i <= 12; i++) {
  setCards(
    `.name-${i}`,
    `.type-${i}-1`,
    `.type-${i}-2`,
    `.img-${i}`,
    `.hp-${i}`,
    `.attack-${i}`,
    `.defense-${i}`,
    `.speed-${i}`
  );
}
