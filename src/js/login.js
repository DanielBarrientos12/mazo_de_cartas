const form = document.forms["loginForm"];

form.addEventListener("submit", function handleFormSumit(event) {
  event.preventDefault();

  const username = form["username"].value;
  const password = form["password"].value;

  if (username === "admin" && password === "1234") {
    localStorage.setItem("username", username);
    window.location.href = "./src/pages/juego.html"; 
  } else {
    let errorMessage = document.createElement("p");
    errorMessage.id = "password-error-message";
    errorMessage.style.color = "#f00";
    errorMessage.textContent = "Error al inciar sesion.";
    form.appendChild(errorMessage);
  }
});