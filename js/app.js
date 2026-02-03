// State variables
let allApps = [];
let currentApps = [];
let favorites = JSON.parse(localStorage.getItem("fav") || "[]");
let page = 1;
const perPage = 20;

// Fetch Data
fetch("data/data.json")
    .then(r => r.json())
    .then(data => {
        allApps = data;
        currentApps = [...allApps];
        createChips();
        render();
    })
    .catch(err => console.error("Error loading data:", err));

// Render Function
function render() {
    const start = (page - 1) * perPage;
    const paginatedList = currentApps.slice(start, start + perPage);
    const content = document.getElementById("content");
    
    content.innerHTML = "";

    if(paginatedList.length === 0) {
        content.innerHTML = `<p style="grid-column: span 2; text-align:center;">No apps found.</p>`;
        return;
    }

    paginatedList.forEach(app => {
        const isPremium = app.premium;
        // Auth check (Safe check)
        const userLoggedIn = (typeof isLoggedIn === 'function') ? isLoggedIn() : false;
        const isLocked = isPremium && !userLoggedIn;
        const isFav = favorites.includes(app.id); 

        content.innerHTML += `
            <div class="card">
                <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFav(${app.id})">
                   ${isFav ? '♥' : '♡'}
                </button>
                <img class="icon" src="${app.image || 'images/logo.png'}" loading="lazy">
                <h4>${app.name}</h4>
                
                <button class="btn open" 
                    onclick="${isLocked ? "window.location.href='login.html'" : `window.location.href='${app.url}'`}">
                    ${isLocked ? "Login to Open" : "Open App"}
                </button>

                <button class="btn info" onclick="openInfo('${app.details || '#'}')">
                    App Info
                </button>
            </div>
        `;
    });

    buildPagination();
}

// Favorite Logic
function toggleFav(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem("fav", JSON.stringify(favorites));
    render(); 
}

function showFavorites() {
    currentApps = allApps.filter(app => favorites.includes(app.id));
    page = 1;
    render();
}

function showHome() {
    currentApps = [...allApps];
    page = 1;
    render();
}

// Search Logic
document.getElementById("search").addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    currentApps = allApps.filter(app => {
        return app.name.toLowerCase().includes(q) || 
               app.category.toLowerCase().includes(q) || 
               (app.tags || []).some(t => t.toLowerCase().includes(q));
    });
    page = 1;
    render();
});

// Chips
function createChips() {
    const chipsContainer = document.getElementById("chips");
    if(!chipsContainer) return;
    const categories = ["All", ...new Set(allApps.map(a => a.category))];
    chipsContainer.innerHTML = categories.map(cat => 
        `<button class="chip" onclick="filterCategory('${cat}')">${cat}</button>`
    ).join("");
}

function filterCategory(cat) {
    currentApps = (cat === "All") ? [...allApps] : allApps.filter(a => a.category === cat);
    page = 1;
    render();
}

// Pagination
function buildPagination() {
    const totalPages = Math.ceil(currentApps.length / perPage);
    const container = document.getElementById("pagination");
    if(!container) return;
    container.innerHTML = "";
    if(totalPages <= 1) return;
    for (let i = 1; i <= totalPages; i++) {
        container.innerHTML += `<button class="${i === page ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }
}

function goToPage(p) {
    page = p;
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Dark Mode
if (localStorage.getItem("theme") === "dark") document.body.classList.add("dark");
function toggleDark() {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

// Info Open (Same Tab)
function openInfo(link) {
    if(link && link !== '#') window.location.href = link;
                      }
