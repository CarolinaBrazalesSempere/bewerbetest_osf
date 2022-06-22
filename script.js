document.addEventListener("DOMContentLoaded", () => {
  const selectDrop = document.getElementById("countries");

  fetch("https://restcountries.com/v2/all")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      let output = "";

      data.forEach((country) => {
        output += `
        <option value="${country.name}">${country.name}</option>`;
      });

      selectDrop.innerHTML = output;
    })
    .catch((err) => {
      console.log(err);
    });
});

const form = document.getElementById("form");
const username = document.getElementById("username");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const usernameValue = username.value.trim();
  const lastName = lastname.value.trim();
  const emailValue = email.value.trim();
  const interest = document.getElementById("interest").options[0].value;
  const anrede = document.getElementById("anrede").options[0].value;

  if (usernameValue === "") {
    setError(username, "Vorname ist erforderlich");
  } else {
    setSuccess(username);
  }
  if (lastName === "") {
    setError(lastname, "Nachname ist erforderlich");
  } else {
    setSuccess(lastname);
  }

  if (emailValue === "") {
    setError(email, "Email ist erforderlich");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Geben Sie eine gültige E-Mail Adresse an");
  } else {
    setSuccess(email);
  }

  if (interest == "-1") {
    alert("Interesse ist erforderlich");
  }

  if (anrede == "-1") {
    alert("Anrede ist erforderlich");
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
});
