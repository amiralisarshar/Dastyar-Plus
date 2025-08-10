/* <--===--{Script, Developer : Amirali Sarshar}--===--> */
document.getElementById("searchButton").addEventListener("click", function() {
    let searchQuery = document.getElementById("searchInput").value;
    document.getElementById("loading").style.display = "block";

    fetch(`https://fa.wikipedia.org/w/api.php?action=query&format=json&origin=*&list=search&srsearch=${searchQuery}`)
    .then(response => response.json())
    .then(data => {
        let pages = data.query.search;
        if (pages.length === 0) {
            document.getElementById("result").innerHTML = "نتیجه ای پیدا نشد";
            document.getElementById("loading").style.display = "none";
            return;
        }
        
        let pageId = pages[0].pageid;
        return fetch(`https://fa.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exintro=true&explaintext=true&pageids=${pageId}`);
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("loading").style.display = "none";

        let pages = data.query.pages;
        let extract = pages[Object.keys(pages)[0]]?.extract || "❌ مقدمه‌ای پیدا نشد!";
        let rephrasedText = rephraseText(extract.split(".").slice(0, 3).join("."));

        document.getElementById("result").innerHTML = `<div class="result-item">${rephrasedText}...</div>`;
    })
    .catch(error => {
        console.log(error);
        document.getElementById("loading").style.display = "none";
    });
});

function rephraseText(originalText) {
    return originalText.replace().replace();
}

document.getElementById("toggleMode").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    document.getElementById("toggleMode").textContent = document.body.classList.contains("dark-mode") ? "حالت روشن" : "حالت تاریک";
});

document.getElementById("loading").style.display = "none";

document.getElementById("searchInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("searchButton").click();
    }
});