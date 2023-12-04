
const newsContainer = document.getElementById("news-container");
window.addEventListener("load", () => {
  fetchAndDisplayNews("sports");
});

// Function to fetch and display news
async function fetchAndDisplayNews(query) {
  try {
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${query}&apikey=64401b3238944e124bcdee91c79a2d86`
    );
    const data = await response.json();
    console.log(data);
    if (data) {
      const articles = data.articles;
      console.log(articles);
      newsContainer.innerHTML = articles
        .map((article) => createNewsCard(article))
        .join("");
    } else {
      newsContainer.innerHTML = "You Can Search 10 NEWS Per Day ";
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
            <img src="${article.image}" alt="" height=300px width:300px>
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
