// функция создания карточки котика
function createCat(myCat, el = box) {
  const card = document.createElement("div");
  card.className = "card";
  // кнопка удаления на карточке котика
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

  //слушатель клика для карточки с котиком, для вызова модального окна просмотра с флагом "редактирование"
  card.addEventListener("click", (e) => {
    // вызов функции создания модального окна с флагом Редактирование
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

  // поставить лайк (сердечко, id котика, явяляется ли любимчиком true/false)
  like.addEventListener("click", (e) => {
    e.stopPropagation();
    setLike(like, myCat.id, !myCat.favorite); // (true => false; false => true)
  });
  if (!myCat.image) {
    pic.classList.add("default");
  } else {
    pic.style.backgroundImage = `url(${myCat.image})`;
  }
  // добавление созданных элементов
  card.append(pic, like, name, btnDelete);
  //Добавление рейтинга
  const rateDiv = document.createElement("div");
  rateDiv.className = "rating";
  if (myCat.rate >= 0) {
    if (myCat.rate === 0) {
      const rate = document.createElement("i");
      rate.className = "fa-regular";
      rate.classList.add("fa-star");
      rateDiv.append(rate);
    } else {
      for (let i = 0; i < myCat.rate; i++) {
        const rate = document.createElement("i");
        rate.className = "fa-solid";
        rate.classList.add("fa-star");
        rateDiv.append(rate);
      }
    }
  }
  card.append(rateDiv);
  el.append(card);
}
