document
  .getElementById("create-default-account")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const balance = document.getElementById("balance").value;

    if (!name) {
      alert("Name is missing!");
    }
    if (!type) {
      alert("Type is missing!");
    }

    try {
      const response = await fetch("/accounts/createAccount", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          type: type,
          balance: balance || 0,
        }),
      });

      const data = await response.json();

      if (response.status === 201) {
        alert(data.message);
        window.location.href = "/login";
      } else {
        alert(data.error || "An error occurred during registration.");
      }
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  });
