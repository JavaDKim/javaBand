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
  mdBox.classList.toggle("active");
});

mdClose.addEventListener("click", (e) => {
  mdBox.classList.toggle("active");
});
mdBox.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    mdBox.classList.remove("active");
  }
});
addForm.elements.image.addEventListener("change", (e) => {
  e.preventDefault();
  const prevTag = addForm.querySelector(".preview");
  prevTag.style.backgroundImage = `url(${e.currentTarget.value})`;
});
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const body = {};
  for (let i = 0; i < addForm.elements.length; i++) {
    const el = addForm.elements[i];
    //console.log(el.name, el.value);
    if (el.name && el.name !== "favorite") {
      body[el.name] = el.value;
    }
  }

  body.favorite = addForm.elements.favorite.checked;
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
          addForm.reset();
          prevTag.style = null;
          mdBox.classList.remove("active");
          createCat(body);
        }
      });
    });

  /*   fetch(path + "/add", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => {
    console.log(res.status);
  });
 */
});
