const form = document.getElementById("searchForm");
const cardContainer = document.getElementById("cardContainer");
const statusText = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;

  cardContainer.innerHTML = "";
  statusText.textContent = "Loading...";

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();
    statusText.textContent = "";

    cardContainer.innerHTML = `
      <div class="card">
        <img src="${data.avatar_url}" alt="Avatar">
        <h3>${data.login}</h3>
        <p>Followers: ${data.followers}</p>
        <p>Public Repos: ${data.public_repos}</p>
        <a href="${data.html_url}" target="_blank">View Profile</a>
      </div>
    `;
  } catch (error) {
    statusText.textContent = error.message;
  }
});
