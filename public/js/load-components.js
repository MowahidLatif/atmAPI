function loadComponent(url, placeholderId) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not load ${url}: ${response.statusText}`);
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById(placeholderId).innerHTML = html;
    })
    .catch((error) => {
      console.error(error);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  loadComponent("/nav.html", "nav-placeholder");
  loadComponent("/footer.html", "footer-placeholder");
});
