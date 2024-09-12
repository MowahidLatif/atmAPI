document
  .getElementById("loginForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;

    if (!name || !password) {
      alert("Please fill in both fields");
      return;
    }

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        alert(data.message);
        window.location.href = "/dashboard";
      } else {
        alert(data.error || "Invalid login credentials");
      }
    } catch (error) {
      alert("Login failed. Please try again.");
    }
  });
