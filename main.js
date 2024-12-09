// MDN Array.from() & Array.keys() For More Information
// Select Item
let gameSplash = document.querySelector(".control-button");
let button = document.querySelector(".control-button span");
let playerName = document.querySelector(".info-container .name span");
let cardContainer = document.querySelector(".memory-blocks");
let arrayOfBlocks = Array.from(cardContainer.children);
let orderRang = [...Array(arrayOfBlocks.length).keys()];
let duration = 2000;

// Set Player Name
button.onclick = () => {
  document.getElementById("start").play();
  let yourName = prompt("What's Your Name?");
  if (yourName == "" || yourName == null) {
    playerName.innerHTML = "UnKnown";
  } else {
    playerName.innerHTML = yourName;
  }
  gameSplash.remove();
};

// Start Shuffle Function
shuffle(orderRang);

// Add Order CSS Property
arrayOfBlocks.forEach((e, i) => {
  e.style.order = orderRang[i];

  // Add Flipped Class By Clicked
  e.addEventListener("click", () => flipBlocks(e));
});

// Make Function To Add Flipped Class
function flipBlocks(selectBlock) {
  selectBlock.classList.add("flipped");
  // Collect Flipped Card
  let allFlipped = arrayOfBlocks.filter((flipped) =>
    flipped.classList.contains("flipped")
  );
  // Make Condition
  if (allFlipped.length === 2) {
    // Stop Clicking Function
    stopClicking();

    // Check Matched Block Function
    checkMatched(allFlipped[0], allFlipped[1]);
  }
}

// Make Stop Clicking Function
function stopClicking() {
  cardContainer.classList.add("stop");
  setTimeout(() => {
    cardContainer.classList.remove("stop");
  }, duration);
}

// Make Check Matched Function
function checkMatched(first, second) {
  let triesEle = document.querySelector(".tries span");
  if (first.dataset.lang === second.dataset.lang) {
    first.classList.remove("flipped");
    second.classList.remove("flipped");
    first.classList.add("matched");
    second.classList.add("matched");
    document.getElementById("good").play();
  } else {
    triesEle.innerHTML = parseInt(triesEle.innerHTML) + 1;
    setTimeout(() => {
      first.classList.remove("flipped");
      second.classList.remove("flipped");
    }, duration);
    document.getElementById("bad").play();
  }
}

// For Me Search How To Make Random Number Unique

// Make Shuffle Function
function shuffle(array) {
  let current = array.length;
  let stash;
  let random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    stash = array[current];
    array[current] = array[random];
    array[random] = stash;
  }
  return array;
}
