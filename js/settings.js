fetch("data/settings.json").then(r => r.json()).then(s => {
    document.getElementById("logo").src = s.logo;
    document.getElementById("siteName").innerText = s.siteName;
    document.getElementById("tagline").innerText = s.tagline;
    
    // Banner Logic
    const banners = s.banners || [];
    const adImage = document.getElementById("adImage");
    const adLink = document.getElementById("adLink");
    let i = 0;
    
    if(banners.length > 0) {
        const update = () => {
            adImage.src = banners[i].image;
            adLink.href = banners[i].link;
            i = (i + 1) % banners.length;
        };
        update();
        setInterval(update, 5000);
    }
});
