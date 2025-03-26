window.onload = async function initCMS() {
    const userData = localStorage.getItem("decap-cms-user");
    if (!userData) {
      window.location.href = "/admin/login/";
      return;
    }

    const user = JSON.parse(userData);

    // Ensure CMS is loaded before initializing
    if (!window.CMS) {
      console.error("Decap CMS failed to load.");
      return;
    }

    // Initialize Decap CMS
    CMS.init();
};