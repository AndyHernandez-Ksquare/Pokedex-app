// Speed, attack and defende values are in an array called "stats"
// DOM elements

// Generate random number
const generateRandomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 1000) + 1;
  console.log(randomNumber);
  return randomNumber;
};

const fetchData = async () => {
  const req = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${generateRandomNumber()}/`
  );
  const data = await req.json();
  //   console.log(data);
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
  type2.textContent = cardData.types[1] ? cardData.types[1].type.name : "none";
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
// Card 1
setCards(
  ".name-1",
  ".type-1-1",
  ".type-1-2",
  ".img-1",
  ".hp-1",
  ".attack-1",
  ".defense-1",
  ".speed-1"
);

// Card 2
setCards(
  ".name-2",
  ".type-2-1",
  ".type-2-2",
  ".img-2",
  ".hp-2",
  ".attack-2",
  ".defense-2",
  ".speed-2"
);

// Card 3
