async function fetchUserInfo() {
  try {
    const response = await fetch("/users/infoUser", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    document.getElementById("user-name").textContent = data.name;
    document.getElementById("user-email").textContent = data.email;

    const accountsList = document.getElementById("accounts-list");
    accountsList.innerHTML = "";

    if (Array.isArray(data.accounts) && data.accounts.length > 0) {
      data.accounts.forEach((account) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${account.type} - ${
          account.name
        } (Balance: $${account.balance.toFixed(2)})`;
        accountsList.appendChild(listItem);
      });
    } else {
      const listItem = document.createElement("li");
      listItem.textContent = `No accounts created, create one now!`;
      accountsList.appendChild(listItem);
    }
  } catch (error) {
    console.error("Failed to fetch user info:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  fetchUserInfo();
});
