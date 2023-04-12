function createModelWindow(myCat = {}, headerM = "Добавить") {
  const modal = document.createElement("div");
  modal.className = "modal";
  const btnModalClose = document.createElement("button");
  btnModalClose.className = "modal-close";
  btnModalClose.classList.add("btn");
  const iModal = document.createElement("i");
  iModal.className = "fa-solid";
  iModal.classList.add("fa-xmark");
  btnModalClose.append(iModal);
  const headerModal = document.createElement("h2");
  headerModal.innerText = headerM;
  const formModal = document.createElement("form");
  formModal.id = "add";
  const previewModal = document.createElement("div");
  previewModal.className = "preview";

  const formLineModal1 = document.createElement("div");
  formLineModal1.className = "form-line";
  formLineModal1.classList.add("form-span-3");
  const inputModal1 = document.createElement("input");
  inputModal1.id = "add2";
  inputModal1.type = "text";
  inputModal1.required = "true";
  inputModal1.name = "name";
  inputModal1.placeholder = "Введите имя";
  const labelModal1 = document.createElement("label");
  labelModal1.innerText = "Имя";
  labelModal1.setAttribute("for", inputModal1.id);
  formLineModal1.append(labelModal1, inputModal1);

  const formLineModal2 = document.createElement("div");
  formLineModal2.className = "form-line";
  formLineModal2.classList.add("form-span-3");
  const inputModal2 = document.createElement("input");
  inputModal2.id = "add3";
  inputModal2.type = "url";
  inputModal2.name = "image";
  inputModal2.placeholder = "Ссылка на изображение";
  const labelModal2 = document.createElement("label");
  labelModal2.innerText = "Изображение";
  labelModal2.setAttribute("for", inputModal2.id);
  formLineModal2.append(labelModal2, inputModal2);

  const formLineModal3 = document.createElement("div");
  formLineModal3.className = "form-line";
  const inputModal3 = document.createElement("input");
  inputModal3.id = "add4";
  inputModal3.type = "number";
  inputModal3.name = "age";
  inputModal3.placeholder = "4";
  inputModal3.min = "0";
  inputModal3.max = "100";
  const labelModal3 = document.createElement("label");
  labelModal3.innerText = "Возраст";
  labelModal3.setAttribute("for", inputModal3.id);
  formLineModal3.append(labelModal3, inputModal3);

  const formLineModal4 = document.createElement("div");
  formLineModal4.className = "form-line";
  const inputModal4 = document.createElement("input");
  inputModal4.id = "add5";
  inputModal4.type = "number";
  inputModal4.name = "rate";
  inputModal4.placeholder = "5";
  inputModal4.min = "0";
  inputModal4.max = "5";
  const labelModal4 = document.createElement("label");
  labelModal4.innerText = "Рейтинг";
  labelModal4.setAttribute("for", inputModal4.id);
  formLineModal4.append(labelModal4, inputModal4);

  const formLineModal5 = document.createElement("div");
  formLineModal5.className = "form-line";
  formLineModal5.classList.add("form-row");

  const inputModal5 = document.createElement("input");
  inputModal5.id = "add6";
  inputModal5.type = "checkbox";
  inputModal5.name = "favorite";
  const labelModal5 = document.createElement("label");
  labelModal5.innerText = "Любимчик";
  labelModal5.setAttribute("for", inputModal5.id);
  formLineModal5.append(labelModal5, inputModal5);

  const formLineModal6 = document.createElement("div");
  formLineModal6.className = "form-span-2";
  //formLineModal6.classList.add("form-span-2");
  const textAreaModal = document.createElement("textarea");
  textAreaModal.id = "add7";
  textAreaModal.type = "text";
  textAreaModal.name = "description";
  textAreaModal.style = "margin-top: 10px";
  textAreaModal.placeholder = "Напишите что-нибудь про своего питомца";
  textAreaModal.rows = "7";
  const labelModal6 = document.createElement("label");
  labelModal6.innerText = "Описание";
  labelModal6.setAttribute("for", textAreaModal.id);
  formLineModal6.append(labelModal6, textAreaModal);

  const formLineModal7 = document.createElement("div");
  formLineModal7.className = "form-line";
  formLineModal7.classList.add("form-span-3");
  const saveBtnModal = document.createElement("button");
  saveBtnModal.className = "btn";
  saveBtnModal.classList.add("saveBtn");
  saveBtnModal.type = "submit";
  const iSaveModal = document.createElement("i");
  iSaveModal.className = "fa-solid";
  iSaveModal.classList.add("fa-floppy-disk");
  const spanSaveModal = document.createElement("span");
  spanSaveModal.innerText = headerM;
  saveBtnModal.append(iSaveModal, spanSaveModal);
  formLineModal7.append(saveBtnModal);

  formModal.append(
    previewModal,
    formLineModal6,
    formLineModal1,
    formLineModal2,
    formLineModal3,
    formLineModal4,
    formLineModal5,
    formLineModal7
  );
  modal.append(btnModalClose, headerModal, formModal);
  mdBox.append(modal);
  const addForm = document.forms.add;
  const prevTag = addForm.querySelector(".preview");
  const mdClose = document.querySelector(".modal-close");

  if (headerM === "Редактирование") {
    inputModal1.value = myCat.name;
    inputModal2.value = myCat.image;
    if (myCat.image !== "" && myCat.image !== undefined) {
      prevTag.style.backgroundImage = `url(${myCat.image})`;
    }
    inputModal3.value = myCat.age;
    inputModal4.value = myCat.rate;
    inputModal5.checked = myCat.favorite;
    textAreaModal.value = myCat.description;
    spanSaveModal.innerText = "Сохранить";
  }

  mdClose.addEventListener("click", (e) => {
    mdBox.classList.toggle("active");
    modal.remove();
  });
  addForm.elements.image.addEventListener("change", (e) => {
    e.preventDefault();
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
    if (headerM === "Добавить") {
      addCat(body);
      modal.remove();
    }
    if (headerM === "Редактирование") {
      modifyCat(myCat.id, body);
    }
  });
}
