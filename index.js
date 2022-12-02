const selector = (element) => {
  return document.querySelector(element);
};

const nav = selector("#nav");
const navMenu = selector("#navMenu");
const form = selector("form");
const shorterLink = selector(".shorter-link");

navMenu.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  nav.classList.toggle("active-menu");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const link = selector("#link").value;
  shortenURL(link);
});

function urlValidation(defaultUrl) {
  const urlRule =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
  if (defaultUrl.match(urlRule)) {
    return true;
  } else {
    return false;
  }
}

async function shortenURL(link) {
  const divLinkShorte = document.createElement("div");
  const input = selector("#link");
  const errorText = selector(".error-text");

  try {
    if (!urlValidation(link)) {
      input.classList.add("error-link");
      errorText.style.display = "block";
      alert("link invalido");
    } else {
      errorText.style.display = "none";
      input.classList.remove("error-link");

      const response = await fetch(
        `https://api.shrtco.de/v2/shorten?url=${link}`
      );
      const data = await response.json();

      divLinkShorte.classList.add("show-link");

      const createP = document.createElement("p");
      createP.classList.add("link");
      createP.innerText = link;

      const createDiv = document.createElement("div");

      const createA = document.createElement("a");
      createA.setAttribute("href", `https://shrtco.de/${data.result.code}`);
      createA.setAttribute("target", "blank");
      createA.classList.add("new-link");
      createA.innerText = `shrtco.de/${data.result.code}`;

      const btnCopy = document.createElement("button");
      btnCopy.classList.add("btn-blue");
      btnCopy.innerText = "Copy";
      btnCopy.addEventListener("click", () => {
        navigator.clipboard.writeText(
          btnCopy.previousElementSibling.textContent
        );
        btnCopy.innerText = "copied!";
        btnCopy.classList.add("copied");
      });

      createDiv.append(createA, btnCopy);

      divLinkShorte.append(createP, createDiv);
      shorterLink.append(divLinkShorte);
    }
  } catch (err) {
    console.log(err);
    alert("link ja foi modificado");
  }
}
