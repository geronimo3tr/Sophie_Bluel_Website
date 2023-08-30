const form = document.querySelector("form");

form.addEventListener("submit", async function () {
  const email = document.querySelector("input[name='email']");
  const password = document.querySelector("input[name='password']");
  console.log(email);
  const user = {
    email: "sphie.bluel@test.tld",
    password: "S0phie",
  };
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  });
  alert(response.status);
  const result = await response.json();
  console.log(result);
});
