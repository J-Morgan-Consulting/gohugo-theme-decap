export function loadLoginForm(containerId) {
  const gatewayUrl = "https://decap.jmcl.co";
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get("error");
  // Check if the error is "access_denied" and show an alert
  if (error === "access_denied") {
    alert("Unauthorized access");
  }

  const container = document.getElementById(containerId);
  if (!container) {
    console.error("Container not found");
    return;
  }

  // Inject Bootstrap if not already loaded
  if (!document.querySelector('link[href*="bootstrap.min.css"]')) {
    const bootstrapLink = document.createElement("link");
    bootstrapLink.rel = "stylesheet";
    bootstrapLink.href = "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
    document.head.appendChild(bootstrapLink);
  }

  container.innerHTML = `
    <style>
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f8f9fa;
      }
      .login-container {
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
        text-align: center;
      }
      .login-container h2 {
        margin-bottom: 1.5rem;
      }
      .logo {
        width: 100px;
        margin-bottom: 1rem;
      }
    </style>

    <div class="login-container">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTevQpwoU5ftJ1z4qrxNsnjc03Gc35298HvHA&s" alt="Decap CMS Logo" class="logo">
      <h2 style="font-weight:600;">CMS Login</h2>
      <button id="google-login" style="border: none; background: none; padding: 0; cursor: pointer;">
        <img src="https://developers.google.com/static/identity/images/branding_guideline_sample_lt_rd_lg.svg" alt="Sign in with Google">
      </button>
    </div>
  `;
   
  document.getElementById("google-login").addEventListener("click", async () => {
    try {
      const response = await fetch(`${gatewayUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider: "google" }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url; // Redirect user to Google sign-in
      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  });

  // Capture tokens from the redirect URL
  async function handleAuthRedirect() {
    // Getting fragment
    const fragment = window.location.hash.substring(1);
    const params = new URLSearchParams(fragment);
    const accessToken = params.get("access_token");
    if (accessToken) {
      let url = `${gatewayUrl}/auth/callback?access_token=` + encodeURIComponent(accessToken);
      let response = await fetch(url); 
      let data = await response.json();
      if (data.github_token){
        localStorage.setItem("decap-cms-user",
          JSON.stringify({
            token: data.github_token,
            login: data.user,
            backendName: "github",
          })
        )
        window.location.href = "/admin/";
      }
    }
  }
  // Call function to check if user is returning from OAuth login
  handleAuthRedirect();
}