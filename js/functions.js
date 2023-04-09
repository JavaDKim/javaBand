//function: show all cats from BD over API
function showCats() {
  fetch(path + "/show")
    .then(function (res) {
      if (res.statusText === "OK") {
        return res.json();
      }
    })
    .then(function (data) {
      for (const iterator of data) {
        createCat(iterator, box);
      }
    });
}

function createCat(myCat, el = box) {
  const card = document.createElement("div");
  const btnDelete = document.createElement("button");
  btnDelete.className = "btnDelete";
  btnDelete.classList.add("btn");
  const iDelete = document.createElement("i");
  iDelete.className = "fa-solid";
  iDelete.classList.add("fa-xmark");
  btnDelete.append(iDelete);
  btnDelete.addEventListener("click", (e) => {
    e.stopPropagation();
    let isDelete = confirm(
      `Уверены, что хотите удалить котика с именем ${myCat.name}?`
    );
    if (isDelete) {
      deleteCat(myCat.id);
    }
  });

  card.className = "card";
  //слушатель клика для карточки с котиком, для вызова модального окна просмотра
  card.addEventListener("click", (e) => {
    createModelWindow(myCat, "Редактирование");
    mdBox.classList.toggle("active");
  });
  const pic = document.createElement("div");
  pic.className = "pic";
  const name = document.createElement("h3");
  name.innerText = myCat.name;
  const like = document.createElement("i");
  like.className = "fa-heart card__like";
  like.classList.add(myCat.favorite ? "fa-solid" : "fa-regular");
  like.addEventListener("click", (e) => {
    e.stopPropagation();
    // поставить лайк (сердечко, id котика, явяляется ли любимчиком true/false)
    setLike(like, myCat.id, !myCat.favorite); // (true => false; false => true)
  });
  if (!myCat.image) {
    pic.classList.add("default");
  } else {
    pic.style.backgroundImage = `url(${myCat.image})`;
  }
  card.append(pic, like, name, btnDelete);
  if (myCat.rate >= 0) {
    const rate = document.createElement("span");
    rate.innerText = `${myCat.age}`;
    card.append(rate);
  }
  el.append(card);
}

function setLike(el, id, like) {
  el.classList.toggle("fa-solid");
  el.classList.toggle("fa-regular");

  fetch(path + "/update/" + id, {
    method: "put",
    // без headers на сервер прийдет undefined
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ favorite: like }),
  }).then((res) => res.json());
}
/* function createCat(myCat, el = box) {
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
        method: "put",
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
    //     fetch(`${path}/delete/${idCat}`, { method: "delete" }).then((res) => {
    //  console.log(res.status);
    //}); 
    alert(
      "Заблокировано дабы сохранить БД, а код такой fetch(`${path}/delete/${idCat}`, { method: `delete` })"
    );
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
 */
