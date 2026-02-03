let currentUser = null;

// অথেন্টিকেশন স্ট্যাটাস চেক (রিয়েল-টাইম)
auth.onAuthStateChanged((user) => {
    const loginBtn = document.querySelector(".loginBtn");
    
    if (user) {
        // ইউজার লগইন আছে
        currentUser = user;
        console.log("User Logged In:", user.email);
        
        // হেডারের বাটন পরিবর্তন করা (Logout দেখাবে)
        if (loginBtn) {
            loginBtn.innerText = "Logout";
            loginBtn.onclick = logoutUser;
        }
        
        // যদি কেউ ভুল করে লগইন পেজে চলে যায়, তাকে হোমে পাঠানো
        if (window.location.pathname.includes("login.html")) {
            window.location.href = "index.html";
        }
        
    } else {
        // ইউজার লগইন নেই (Public User)
        currentUser = null;
        
        // হেডারের বাটন পরিবর্তন করা (Login দেখাবে)
        if (loginBtn) {
            loginBtn.innerText = "Login";
            loginBtn.onclick = () => window.location.href = "login.html";
        }
        
        // ❌ এখানে কোনো Redirect কোড নেই, তাই সবাই সাইট দেখতে পাবে
    }
});

function isLoggedIn() {
    return !!currentUser;
}

function logoutUser() {
    auth.signOut().then(() => {
        // লগআউট হলে পেজ রিলোড হবে যাতে বাটন রিসেট হয়
        window.location.reload();
    });
            }        btn.onclick = () => netlifyIdentity.open();
    }
      }
