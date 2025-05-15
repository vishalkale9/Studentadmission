 function validateName() {
  const name = document.getElementById("Name").value.trim();
  const nameError = document.getElementById("nameError");
  if (!/^[A-Za-z\s]+$/.test(name)) {
    nameError.textContent = "Name should contain only letters";
    return false;
  } else {
    nameError.textContent = "";
    return true;
  }
}
function validateEmail() {
  const email = document.getElementById("Email").value.trim();
  const emailError = document.getElementById("emailError");
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    emailError.textContent = "Invalid email format.";
    return false;
  }
  emailError.textContent = "";
  return true;
}

function validateContact() {
  const contact = document.getElementById("Contact").value.trim();
  const contactError = document.getElementById("contactError");
  if (!/^\d{10}$/.test(contact)) {
    contactError.textContent = "Contact must be 10 digits.";
    return false;
  }
  contactError.textContent = "";
  return true;
}

function validateFormstud() {
  const validName = validateName();
  const validEmail = validateEmail();
  const validContact = validateContact();

  return validName && validEmail && validContact;
}