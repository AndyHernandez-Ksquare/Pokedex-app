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

for (let i = 0; i <= 8; i++) {
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
// Card 1
// setCards(
//   ".name-1",
//   ".type-1-1",
//   ".type-1-2",
//   ".img-1",
//   ".hp-1",
//   ".attack-1",
//   ".defense-1",
//   ".speed-1"
// );

// // Card 2
// setCards(
//   ".name-2",
//   ".type-2-1",
//   ".type-2-2",
//   ".img-2",
//   ".hp-2",
//   ".attack-2",
//   ".defense-2",
//   ".speed-2"
// );

// // Card 3
// setCards(
//   ".name-3",
//   ".type-3-1",
//   ".type-3-2",
//   ".img-3",
//   ".hp-3",
//   ".attack-3",
//   ".defense-3",
//   ".speed-3"
// );

// // Card 4
// setCards(
//   ".name-4",
//   ".type-4-1",
//   ".type-4-2",
//   ".img-4",
//   ".hp-4",
//   ".attack-4",
//   ".defense-4",
//   ".speed-4"
// );

// // Card 5
// setCards(
//   ".name-5",
//   ".type-5-1",
//   ".type-5-2",
//   ".img-5",
//   ".hp-5",
//   ".attack-5",
//   ".defense-5",
//   ".speed-5"
// );

// // Card 6
// setCards(
//   ".name-6",
//   ".type-6-1",
//   ".type-6-2",
//   ".img-6",
//   ".hp-6",
//   ".attack-6",
//   ".defense-6",
//   ".speed-6"
// );

// // Card 6
// setCards(
//   ".name-7",
//   ".type-7-1",
//   ".type-7-2",
//   ".img-7",
//   ".hp-7",
//   ".attack-7",
//   ".defense-7",
//   ".speed-7"
// );

// // Card 8
// setCards(
//   ".name-8",
//   ".type-8-1",
//   ".type-8-2",
//   ".img-8",
//   ".hp-8",
//   ".attack-8",
//   ".defense-8",
//   ".speed-8"
// );
