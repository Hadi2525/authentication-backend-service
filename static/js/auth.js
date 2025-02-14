/*
  NOTE:
  In production, store your Firebase configuration values securely—such as in environment variables
  that are injected at build time—so they are not hard-coded in your source code.
*/
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId:  "YOUR_PROJECT_ID",
  storageBucket:  "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId:  "YOUR_MEASUREMENT_ID"
};


// Initialize Firebase (if not already initialized)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Add event listener for the sign-in button
document.getElementById('googleSignIn').addEventListener('click', async () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const user = result.user;
    const token = await user.getIdToken();

    // Once authenticated, update the status message with a checkmark
    displayStatus("✔ You are now authenticated!");
  } catch (error) {
    console.error("Error during sign-in:", error);
    displayStatus("Authentication failed. Please try again.");
  }
});

/**
 * Utility function to update the status message.
 * @param {string} message - The message to display.
 */
function displayStatus(message) {
  const statusElement = document.getElementById('authStatus');
  if (statusElement) {
    statusElement.innerText = message;
  } else {
    console.log(message);
  }
}
