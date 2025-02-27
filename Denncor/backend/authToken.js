// In-memory database for simplicity
const users = {};

// Function to generate an authentication token
function generateAuthToken(user) {
  return Math.random().toString(36).substr(2, 10); // Simple token generation for demo purposes
}

// Function to handle API requests
function apiRequest(url, method, data) {
  if (url === "/api/signup" && method === "POST") {
    const { firstName, lastName, email, password } = data;
    if (!firstName || !lastName || !email || !password) {
      return { error: "Please fill in all fields" };
    }

    // Create a new user in the in-memory database
    const user = { firstName, lastName, email, password };
    users[email] = user;

    // Generate an authentication token for the new user
    const authToken = generateAuthToken(user);

    return { authToken };
  } else {
    return { error: "Not found" };
  }
}

const response = apiRequest("/api/signup", "POST", signUpData);
console.log(response); // Output: { authToken: 'some_random_token' }
