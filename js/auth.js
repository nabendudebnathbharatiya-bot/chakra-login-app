let currentUser = null;

// Initialize Netlify Identity
if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
        currentUser = user;
        updateAuthUI();
    });

    window.netlifyIdentity.on("login", user => {
        currentUser = user;
        updateAuthUI();
        netlifyIdentity.close();
        // Re-render app to unlock premium content [cite: 23]
        if(typeof render === "function") render();
    });

    window.netlifyIdentity.on("logout", () => {
        currentUser = null;
        updateAuthUI();
        // Re-render app to lock premium content
        if(typeof render === "function") render();
    });
}

function isLoggedIn() {
    return !!currentUser;
}

function updateAuthUI() {
    const btn = document.querySelector(".loginBtn");
    if (currentUser) {
        btn.innerText = "Logout";
        btn.onclick = () => netlifyIdentity.logout();
    } else {
        btn.innerText = "Login";
        btn.onclick = () => netlifyIdentity.open();
    }
      }
