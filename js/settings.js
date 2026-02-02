fetch("data/settings.json")
.then(r=>r.json())
.then(s=>{

 logo.src=s.logo;
 siteName.innerText=s.siteName;
 tagline.innerText=s.tagline;

 /* banner slider */
 const banners=s.banners||[];

 let i=0;

 function show(){
   adImage.src=banners[i].image;
   adLink.href=banners[i].link;

   i=(i+1)%banners.length;
 }

 show();
 setInterval(show,5000); // 3 sec auto slide
});
      
