function handleCredentialResponse(response) {
  const userInfo = JSON.parse(atob(response.credential.split(".")[1]));

  // Store user data in localStorage
  localStorage.setItem("user", JSON.stringify(userInfo));

  // Display user info
  document.body.innerHTML += `<h3>Welcome, ${userInfo.name}!</h3>
                                <img src="${userInfo.picture}" alt="Profile Picture"/>`;
}

// Auto-login if user is already stored
window.onload = function () {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    document.body.innerHTML += `<h3>Welcome back, ${user.name}!</h3>
                                    <img src="${user.picture}" alt="Profile Picture"/>`;
  }
};
