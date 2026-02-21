// ক্যাশ বাস্টিং ট্রিক (যাতে সবসময় নতুন আপডেট আসে)
const cacheBusterSettings = new Date().getTime();

fetch("data/settings.json?v=" + cacheBusterSettings)
    .then(r => {
        if (!r.ok) throw new Error("Settings file missing or error");
        return r.json();
    })
    .then(s => {
        document.getElementById("logo").src = s.logo;
        document.getElementById("siteName").innerText = s.siteName;
        document.getElementById("tagline").innerText = s.tagline;
        
        // Banner Logic (ব্যানার ঘোরানোর কাজ)
        const banners = s.banners || [];
        const adImage = document.getElementById("adImage");
        const adLink = document.getElementById("adLink");
        let i = 0;
        
        if(banners.length > 0) {
            const update = () => {
                // ব্যানার পরিবর্তন হওয়ার সময় স্মুথ ট্রানজিশনের জন্য
                adImage.style.opacity = 0.5;
                setTimeout(() => {
                    adImage.src = banners[i].image;
                    adLink.href = banners[i].link;
                    adImage.style.opacity = 1;
                }, 150);
                
                i = (i + 1) % banners.length;
            };
            
            // প্রথম ব্যানারটি লোড করা
            update();
            // ৫ সেকেন্ড পর পর ব্যানার চেঞ্জ হবে
            setInterval(update, 5000);
        }
    })
    .catch(err => console.error("Error loading settings:", err));
