let accountBalance = 0;
const navbarContainer = document.getElementById("navbarContainer");
navbarContainer.style.display = "none";

function showAlert(message, isSuccess) {
  if (isSuccess) {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: message,
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: message,
    });
  }
}

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    if (name.trim() === "") {
      showAlert("Please enter your name.", false);
      return;
    }
    document.getElementById("welcomeMsg").textContent = "Hello, " + name;
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("mainPage").style.display = "block";
    navbarContainer.style.display = "flex";
    showAlert("Login successful!", true);
  });

document
  .getElementById("incomeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var incomeName = document.getElementById("incomeName").value;
    var incomeNominal = parseFloat(
      document.getElementById("incomeNominal").value
    );
    if (incomeName.trim() === "" || isNaN(incomeNominal)) {
      showAlert("Please fill in all fields correctly.", false);
      return;
    }
    updateAccountBalance(incomeNominal, true);
    var transactionHistory = document.getElementById("transactionHistory");
    var transactionItem = document.createElement("div");
    transactionItem.classList.add("transaction-card", "income-card");
    transactionItem.innerHTML =
      "<p class='income'>" +
      "Income: " +
      incomeName +
      " - Amount: $" +
      incomeNominal.toLocaleString() +
      "</p>";
    transactionHistory.appendChild(transactionItem);
    document.getElementById("incomeForm").reset();
    showMain();
    showAlert("Income added successfully!", true);
  });

document
  .getElementById("outcomeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var outcomeName = document.getElementById("outcomeName").value;
    var outcomeNominal = parseFloat(
      document.getElementById("outcomeNominal").value
    );
    if (outcomeName.trim() === "" || isNaN(outcomeNominal)) {
      showAlert("Please fill in all fields correctly.", false);
      return;
    }
    updateAccountBalance(outcomeNominal, false);
    var outcomeType = document.getElementById("outcomeType").value;
    var transactionHistory = document.getElementById("transactionHistory");
    var transactionItem = document.createElement("div");
    transactionItem.classList.add("transaction-card", "outcome-card");
    transactionItem.innerHTML =
      "<p class='outcome'>" +
      "Outcome (" +
      outcomeType +
      "): " +
      outcomeName +
      " - Amount: $" +
      outcomeNominal.toLocaleString() +
      "</p>";
    transactionHistory.appendChild(transactionItem);
    document.getElementById("outcomeForm").reset();
    showMain();
    showAlert("Outcome added successfully!", true);
  });

function showMain() {
  document.getElementById("mainPage").style.display = "block";
  document.getElementById("incomePage").style.display = "none";
  document.getElementById("outcomePage").style.display = "none";
  document.getElementById("aboutPage").style.display = "none";
}

function showIncome() {
  document.getElementById("mainPage").style.display = "none";
  document.getElementById("incomePage").style.display = "block";
  document.getElementById("outcomePage").style.display = "none";
  document.getElementById("aboutPage").style.display = "none";
}

function showOutcome() {
  document.getElementById("mainPage").style.display = "none";
  document.getElementById("incomePage").style.display = "none";
  document.getElementById("outcomePage").style.display = "block";
  document.getElementById("aboutPage").style.display = "none";
}

function showAbout() {
  document.getElementById("mainPage").style.display = "none";
  document.getElementById("incomePage").style.display = "none";
  document.getElementById("outcomePage").style.display = "none";
  document.getElementById("aboutPage").style.display = "block";
}

function updateAccountBalance(amount, isIncome) {
  if (isIncome) {
    accountBalance += amount;
  } else {
    accountBalance -= amount;
  }
  document.getElementById("accountBalance").textContent =
    accountBalance.toLocaleString();
}
