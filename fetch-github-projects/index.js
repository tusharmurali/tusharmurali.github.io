const fs = require("fs");
const axios = require("axios");

const GITHUB_API_URL = "https://api.github.com/users/tusharmurali/repos";
const OUTPUT_FILE = "../github_projects.json";

axios
  .get(GITHUB_API_URL)
  .then((response) => {
    const formattedRepos = response.data
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .map((repo) => ({
        title: repo.name,
        language: repo.language,
        description: repo.description || "No description provided.",
        ...(repo.homepage && { demo: repo.homepage }),
        github: repo.html_url
      }));
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(formattedRepos, null, 2));
    console.log("Repositories saved to", OUTPUT_FILE);
  })
  .catch((error) => {
    console.error("Error fetching repos:", error.message);
  });
