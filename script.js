document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Get user input
  var userid = document.getElementById("userid").value;
  var password = document.getElementById("password").value;

  // Validate user input
  if (userid.trim() === "" || password.trim() === "") {
    showError("Please enter both User ID and Password.");
    return;
  }

  // Load user data from GitHub
  fetch("https://raw.githubusercontent.com/su-resh/idpass/main/idpass.json")
    .then(response => response.json())
    .then(data => {
      // Check if the provided credentials match any user
      var user = data.users.find(user => user.id === userid && user.password === password);
      if (user) {
        showSuccess("Login successful!");
        // Redirect to homepage after 2 seconds
        setTimeout(function () {
          window.location.href = "popup.html";
          // Replace "homepage.html" with the actual homepage URL
        }, 2000);
      } else {
        showError("Invalid User ID or Password.");
      }
    })
    .catch(error => {
      console.error("Error fetching user data:", error);
      showError("An error occurred. Please try again later.");
    });
});

function showError(message) {
  var errorMessageElement = document.getElementById("error-message");
  errorMessageElement.innerText = message;
  errorMessageElement.style.display = "block";
}

function showSuccess(message) {
  var errorMessageElement = document.getElementById("error-message");
  errorMessageElement.innerText = message;
  errorMessageElement.style.color = "green";
  errorMessageElement.style.display = "block";
}
