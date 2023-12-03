const API_KEY = "0f47e69b29b2449ebac83a0a32e6b603";
const url = "https://newsapi.org/v2/everything?q=";
const newsContainer = document.getElementById("news-container");

window.addEventListener("load", () => {
  fetchAndDisplayNews("india");
});
document.addEventListener("DOMContentLoaded", function () {
  var paragraph = document.getElementById("limitedParagraph");
  var words = paragraph.textContent.split(" ").slice(0, 100).join(" ");
  paragraph.textContent = words + "...";
});

// Function to fetch and display news
async function fetchAndDisplayNews(query) {
  try {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await response.json();

    if (data.status === "ok") {
      const articles = data.articles;
      newsContainer.innerHTML = articles
        .map((article) => createNewsCard(article))
        .join("");
    } else {
      newsContainer.innerHTML = "Failed to fetch news data.";
    }
  } catch (error) {
    console.error(error);
    newsContainer.innerHTML = "Failed to fetch news data.";
  }
}

// Function to create a news card
function createNewsCard(article) {
  return `
        <div class="news-card">
            <img src="${article.urlToImage}" alt="" height=300px width:300px>
            <h2>${article.title}</h2>
            <p id="limitedParagraph">${article.description}</p>
           
            <a href="${article.url}" target="_blank">Read more</a>
        </div>
    `;
}

// Fetch and display news when the page loads
fetchAndDisplayNews();
let curSelected = null;
function onNavItemClick(id) {
  fetchAndDisplayNews(id);
  const navItem = document.getElementById(id);
  curSelected?.classList.remove("active");
  curSelected = navItem;
  navItem.classList.add("active");
}

const searchbutton = document.getElementById("btn");
const searchtext = document.getElementById("input");

searchbutton.addEventListener("click", () => {
  const query = searchtext.value;
  if (!query) return;
  curSelected?.classList.remove("active");
  curSelected = null;
  fetchAndDisplayNews(query);
  searchtext.value = "";
});
