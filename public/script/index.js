document.addEventListener("DOMContentLoaded", function () {
  const resolutionForm = document.getElementById("resolutionForm");

  resolutionForm?.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(resolutionForm);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch(`/resolution/${data.type}`, {
        method: data.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  });

  const deleteButton = document.getElementById("deleteResolution");

  deleteButton?.addEventListener("click", async function () {
    const type = deleteButton.dataset.type;

    try {
      await fetch(`/resolution/${type}`, {
        method: "DELETE",
      });

      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  });

  const logoutButton = document.getElementById("logout");

  logoutButton?.addEventListener("click", async function () {
    try {
      await fetch("/sessions/logoff", {
        method: "POST",
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  });
});
