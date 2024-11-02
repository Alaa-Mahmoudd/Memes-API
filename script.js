let input = document.querySelector("input");
let showBtn = document.querySelector("button");
let myDiv = document.querySelector(".content");

showBtn.addEventListener("click", () => {
  let inputNumber = parseInt(input.value);
  if (isNaN(inputNumber) || inputNumber < 0 || inputNumber > 99) {
    myDiv.innerHTML = "<p>Please enter a valid number </p>";
    return;
  }

  fetch("https://api.imgflip.com/get_memes")
    .then((res) => res.json())
    .then((data) => {
      let memes = data.data.memes;
      let filteredMemes = memes
        .filter((x, index) => index === inputNumber)
        .map((meme) => {
          return `
              <h1>${meme.name}</h1>
              <img src="${meme.url}" alt="${meme.name}">
            `;
        });

      myDiv.innerHTML = filteredMemes.length
        ? filteredMemes.join("")
        : "<p>No meme found for the entered number.</p>";
    })
    .catch((err) => {
      myDiv.innerHTML = "<p>Error fetching memes. Please try again later.</p>";
    });
});
