showCats(); //show all cats

addBtn.addEventListener("click", (e) => {
  // вызов функции создания модального окна с флагом добавить
  createModelWindow();
  mdBox.classList.toggle("active");
});
//функция показа всех котиков на главной странице
function showCats() {
  fetch(path + "/show")
    .then(function (res) {
      if (res.statusText === "OK") {
        return res.json();
      }
    })
    .then(function (data) {
      for (const iterator of data) {
        //вызов функции создания карточки котика
        createCat(iterator, box);
      }
    });
}
//функция добавления котика
function addCat(body) {
  let ids = [];
  fetch(path + "/ids")
    .then((res) => res.json())
    .then((data) => {
      ids = [...data];
      body.id = ids.length ? ids[ids.length - 1] + 1 : 1;
      return fetch(path + "/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).then((res) => {
        if (res.status === 200) {
          mdBox.classList.remove("active");
          createCat(body);
        }
      });
    });
}
//функция удаления котика
function deleteCat(idCat) {
  //card.stopP
  if (idCat) {
    fetch(`${path}/delete/${idCat}`, { method: "delete" }).then((res) => {
      if (res.status == 200) {
        location.reload();
      }
    });
  }
}
//функция редактирования котика
function modifyCat(catID, bodyCat) {
  console.log(catID);

  fetch(path + `/update/${catID}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyCat),
  }).then((res) => {
    if (res.status == 200) {
      location.reload();
    }
  });
}
//функция установки лайка котика
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
