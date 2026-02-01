fetch("data/settings.json").then(r=>r.json()).then(s=>{
 logo.src=s.logo;
 siteName.innerText=s.siteName;
 tagline.innerText=s.tagline;
 adImage.src=s.banner.image;
 adLink.href=s.banner.link;
});
