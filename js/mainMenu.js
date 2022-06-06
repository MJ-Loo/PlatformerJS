let menuContainer = document.getElementById("menuContainer");

const gameName = menuContainer.getElementsByTagName("p");
const menuButtons = menuContainer.getElementsByTagName("button");

function toggleControls() {
    var x = document.getElementById("controls");
    if (x.style.visibility === "hidden") {
      x.style.visibility = "visible";
    } else {
      x.style.visibility = "hidden";
    }
  }


function splitText(words) {
  for (let word of words) {
    let newword = word.textContent.split(" ");
    word.textContent = "";
    for (let i = 0; i < newword.length; i++) {
      let newWords = newword[i].split("");
      let wordwrap = document.createElement("span");
      wordwrap.classList.add("word-" + i, "word");
      wordwrap.setAttribute("data-word", newword[i]);
      let letters = newword[i].split("");
      let j = 0;
      for (let letter of letters) {
        j++;
        wordwrap.innerHTML +=
          '<span style="--char-index:' +
          j +
          '" data-char="' +
          letter +
          '">' +
          letter +
          "</span>";
      }
      word.appendChild(wordwrap);
    }
  }
  document.body.classList.add("loaded");
}

function addSVG(buttons) {
  let i = 0;
  for (let button of buttons) {
    i++;
    button.innerHTML += "<span class='overlay'></span>";
  }
}

splitText(gameName);
splitText(menuButtons);
addSVG(menuButtons);

var pointerX = 0;
var pointerY = 0;
var width = window.innerWidth / 2;
var height = window.innerHeight / 2;
var body = document.body;
var light = document.getElementById("light");

window.addEventListener(
  "resize",
  function (event) {
    width = window.innerWidth / 2;
    height = window.innerHeight / 2;
  },
  true
);

document.onmousemove = function (event) {
  pointerX = ((width - event.pageX) * -1) / width;
  pointerY = ((height - event.pageY) * -1) / height;
  body.style.setProperty("--x", pointerX);
  body.style.setProperty("--y", pointerY);
  body.style.setProperty("--total", Math.abs(pointerX) + Math.abs(pointerY));
};

