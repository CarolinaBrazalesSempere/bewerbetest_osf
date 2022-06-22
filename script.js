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
const interest = document.getElementById("interest").value;
const anrede = document.getElementById("anrede").value;

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
  const interestValue = interest.selectedIndex != -1;

  if (usernameValue === "") {
    setError(username, "Username is required");
  } else {
    setSuccess(username);
  }
  if (lastName === "") {
    setError(lastname, "Lastname is required");
  } else {
    setSuccess(lastname);
  }

  if (emailValue === "") {
    setError(email, "Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "Provide a valid email address");
  } else {
    setSuccess(email);
  }

  if (interestValue === "-1") {
    setError(interest, "Choose one");
  } else {
    setSuccess(interest);
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
});
