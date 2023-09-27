window.addEventListener("load", () => {
  const form = document.querySelector(".row");
  const input = document.querySelector("#input");
  const list = document.querySelector("#ulList");
  const button = document.querySelector("#addBtn");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // Check the input value
  input.addEventListener("input", () => {
    if (input.value === "") {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  });

  // When addBtn clicked, it will create li element
  document.getElementById("addBtn").addEventListener("click", () => {
    if (input.value === "") {
      button.disabled = true;
    } else {
      let newElm = document.createElement("li");
      newElm.innerHTML = input.value;
      newElm.className = "liList";
      list.appendChild(newElm);
      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      newElm.appendChild(span);

      // use class "checked" when click the li
      newElm.addEventListener("click", () => {
        if (newElm.classList.contains("checked")) {
          newElm.classList.remove("checked");
        } else {
          newElm.classList.add("checked");
        }
      });
      span.addEventListener("click", () => {
        list.removeChild(newElm);
        saveLocal(list); // Save after removing an item
      });

      input.value = ""; // Clear the input after adding an item
      saveLocal(list); // Save after adding an item
    }
  });

  const saveLocal = (list) => {
    localStorage.setItem("data", list.innerHTML);
  };
});
