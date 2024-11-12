document.getElementById("burger").addEventListener("click", function () {
  const navigation = document.getElementById("navigation");
  const menuIcon = document.querySelector(".menu");
  const closeIcon = document.querySelector(".close-menu");

  navigation.classList.toggle("active");
  menuIcon.style.display = menuIcon.style.display === "none" ? "block" : "none";
  closeIcon.style.display =
    closeIcon.style.display === "none" ? "block" : "none";
});

const dialog = document.getElementById("addTaskDialog");

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});
