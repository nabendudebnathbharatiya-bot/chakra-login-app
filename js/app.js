// State variables
let allApps = []; // Store complete list
let currentApps = []; // Store currently filtered list
let favorites = JSON.parse(localStorage.getItem("fav") || "[]");
let page = 1;
const perPage = 20;

// Fetch Data immediately
fetch("data/data.json")
    .then(r => r.json())
    .then(data => {
        allApps = data;
        currentApps = [...allApps]; // Initialize with all apps
        createChips();
        render(); // Render immediately
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
        // Check auth from auth.js
        // Note: auth.js must be loaded before app.js in index.html
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
                    onclick="${isLocked ? "netlifyIdentity.open()" : `window.location.href='${app.url}'`}">
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

// Favorite Logic (LocalStorage)
function toggleFav(id) {
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem("fav", JSON.stringify(favorites));
    
    // If we are currently viewing favorites, re-render to remove the item immediately
    render(); 
}

function showFavorites() {
    // Filter allApps by IDs present in favorites array
    currentApps = allApps.filter(app => favorites.includes(app.id));
    page = 1;
    render();
}

function showHome() {
    currentApps = [...allApps];
    page = 1;
    render();
}

// Search Logic (Name, Category, Tags)
document.getElementById("search").addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    
    currentApps = allApps.filter(app => {
        const nameMatch = app.name.toLowerCase().includes(q);
        const catMatch = app.category.toLowerCase().includes(q);
        const tagMatch = (app.tags || []).some(t => t.toLowerCase().includes(q));
        return nameMatch || catMatch || tagMatch;
    });

    page = 1;
    render();
});

// Category Chips
function createChips() {
    const chipsContainer = document.getElementById("chips");
    if(!chipsContainer) return;
    
    const categories = ["All", ...new Set(allApps.map(a => a.category))];
    
    chipsContainer.innerHTML = categories.map(cat => 
        `<button class="chip" onclick="filterCategory('${cat}')">${cat}</button>`
    ).join("");
}

function filterCategory(cat) {
    if (cat === "All") {
        currentApps = [...allApps];
    } else {
        currentApps = allApps.filter(a => a.category === cat);
    }
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

// Dark Mode Toggle
// Check system preference or saved preference on load
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

function toggleDark() {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
}

// App Info Open (Same Tab)
function openInfo(link) {
    if(link && link !== '#') {
        window.location.href = link;
    }
            }
