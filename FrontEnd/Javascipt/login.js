const form = document.querySelector("form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const login = {
    email: document.querySelector("input[name='email']").value,
    password: document.querySelector("input[name='password']").value,
  };

  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(login),
  });
  if (response.ok === true) {
    // Successful login
    const result = await response.json();
    localStorage.setItem("token", result.token); /*keep token*/

    window.location.href = "../index.html";
  } else if (response.status === 401) {
    // Unauthorized (wrong email or password)
    alert("Erreur dans l'identifiant ou le mot de passe");
  } else if (response.status === 404) {
    // Unauthorized (wrong email or password)
    alert("Erreur dans l'identifiant ou le mot de passe");
  } else {
    // Handle other status codes as needed
    alert("Une erreur est survenue . réessayer plus tard.");
  }
});
