fetch("data/settings.json")
    .then(r => r.json())
    .then(settings => {
        // UI Setup
        document.getElementById("logo").src = settings.logo;
        document.getElementById("siteName").innerText = settings.siteName;
        document.getElementById("tagline").innerText = settings.tagline;
        
        // Auto-Sliding Banner Logic [cite: 14]
        const banners = settings.banners || [];
        const adImage = document.getElementById("adImage");
        const adLink = document.getElementById("adLink");
        let bannerIndex = 0;
        
        if (banners.length > 0) {
            // Function to update banner
            const updateBanner = () => {
                const current = banners[bannerIndex];
                adImage.src = current.image;
                adLink.href = current.link;
                bannerIndex = (bannerIndex + 1) % banners.length;
            };
            
            // Initial load
            updateBanner();
            
            // Set interval for 5 seconds [cite: 14]
            setInterval(updateBanner, 5000);
        }
    })
    .catch(e => console.error("Settings error:", e));
