//DOM lara ulaşılması
let ulDom = document.querySelector("#list");
let taskInput = document.querySelector("#task");

loadItems();
//görev ekleme fonksiyonu
function newElement() {
  // bir div elementi oluşturuldu ve div'e bir atadık
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("list-item");
  // bir li elementi oluşturuldu ve bir class atandı
  const newTodoli = document.createElement("li");
  newTodoli.classList.add("todo-item");
  // li elemanlarına tıklanınca 
  newTodoli.addEventListener("click", completeListItem);
  newTodoli.innerText = taskInput.value;
  todoDiv.appendChild(newTodoli);

  // silme butonu oluşturma 
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "X";
  deleteButton.classList.add("btn-delete");
  // silme butununa tıklanınca
  deleteButton.addEventListener("click", deleteListItem);
  todoDiv.appendChild(deleteButton);

  //text inputa değer girilmişse
  if (taskInput.value != "") {
    //listeye oluşturduğumuz div i gönder
    ulDom.appendChild(todoDiv);
    //local storage a kaydet
    loadStorage(taskInput.value);
    //yazılmış olan text input değerini temizle
    taskInput.value = "";
    //başarılı mesajı çıksın
    $(".success").toast("show");
  // input text de değer yoksa başarısız
  } else {
    $(".error").toast("show");
  }
}

function deleteListItem(e) {
  //sadece target elementi silseydik hatalı olurdu o yüzden parent targer in parent ını aldık
  const item = e.target.parentElement;
  item.remove();
  dltStorage(e.target.previousElementSibling.innerText);
}

function completeListItem(e) {
  const item = e.target;
  item.classList.toggle("checked");
}

function loadStorage(text) {
  let str = JSON.parse(localStorage.getItem("todo"));
  let toDos;
  if (str == null) {
    toDos = [];
  } else {
    toDos = getStorage();
  }
  toDos.push(text);
  localStorage.setItem("todo", JSON.stringify(toDos));
}

function getStorage() {
  let toDo = JSON.parse(localStorage.getItem("todo"));
  return toDo;
}

function loadItems() {
  let toDo = getStorage();
  console.log(toDo);
  if (toDo != null) {
    let html;
    for (let i = 0; i < toDo.length; i++) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("list-item");
        //Create LI
        const newTodo = document.createElement("li");
        newTodo.classList.add("todo-item");
        //Complete click event
        newTodo.addEventListener("click", completeListItem);
        newTodo.innerText = toDo[i];
        todoDiv.appendChild(newTodo);
      
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "X";
        deleteButton.classList.add("btn-delete");
        //Delete Button Click Event
        deleteButton.addEventListener("click", deleteListItem);
        todoDiv.appendChild(deleteButton);
        ulDom.appendChild(todoDiv);
    }
  }
}

function dltStorage(text) {
  let toDo = getStorage();
  toDo.forEach((element, id) => {
    if (element === text) {
      toDo.splice(id, 1);
    }
  });
  localStorage.setItem("todo", JSON.stringify(toDo));
}

function clearAll(){
    ulDom.innerHTML = "";
}