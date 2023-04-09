/* let myCat = {
  name: "Трамп",
  image: "https://i.yapx.ru/V1QBD.jpg",
  favorite: true,
}; */

/* createCat(myCat);
createCat(myCat1);
 */
showCats(); //show all cats

addBtn.addEventListener("click", (e) => {
  createModelWindow();
  mdBox.classList.toggle("active");
});

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
