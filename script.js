/* https://i.yapx.ru/V1QA8.jpg
https://i.yapx.ru/V1QBC.jpg
https://i.yapx.ru/V1QBG.jpg
 */
let myCat = {
  name: "Макрон",
  age: 3,
  image: "https://i.yapx.ru/V1QBK.jpg",
  favorite: false,
};

let myCat1 = {
  name: "Трамп",
  image: "https://i.yapx.ru/V1QBD.jpg",
  favorite: true,
};

const box = document.querySelector(".container");

/* createCat(myCat);
createCat(myCat1);
 */

const user = "KIM_DG833";
const path = `https://cats.petiteweb.dev/api/single/${user}`;

let ids = [];
fetch(path + "/ids")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    ids = [...data];
    myCat1.id = ids.length ? ids[ids.length - 1] + 1 : 1;
    //addCat(myCat1);
  });

fetch(path + "/show")
  .then(function (res) {
    if (res.statusText === "OK") {
      return res.json();
    }
  })
  .then(function (data) {
    for (const iterator of data) {
      createCat(iterator);
    }
  });

function createCat(myCat, el = box) {
  const card = document.createElement("div");
  card.className = "card";
  const pic = document.createElement("div");
  pic.className = "pic";
  const name = document.createElement("h3");
  name.innerText = myCat.name;
  const like = document.createElement("i");
  like.className = "fa-heart card__like";
  like.classList.add(myCat.favorite ? "fa-solid" : "fa-regular");
  like.addEventListener("click", (e) => {
    e.stopPropagation();
    if (myCat.id) {
      fetch(`${path}/update/${myCat.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorite: !myCat.favorite }),
      }).then((res) => {
        if (res.status === 200) {
          like.classList.toggle("fa-solid");
          like.classList.toggle("fa-regular");
        }
      });
    }
  });
  if (!myCat.image) {
    pic.classList.add("default");
  } else {
    pic.style.backgroundImage = `url(${myCat.image})`;
  }
  card.append(pic, like, name);
  if (myCat.age >= 0) {
    const age = document.createElement("span");
    age.innerText = myCat.age;
    card.append(age);
  }
  card.addEventListener("click", (e) => deleteCard(myCat.id, card));
  el.append(card);
}

function deleteCard(idCat, card) {
  if (idCat) {
    fetch(`${path}/delete/${idCat}`, { method: "delete" }).then((res) => {
      console.log(res.status);
    });
  }
}
function addCat(myCat) {
  fetch(path + "/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(myCat),
  })
    .then((res) => res.json())
    .then((data) => {
      res.status === 200 ? el.remove() : "";
    });
}
