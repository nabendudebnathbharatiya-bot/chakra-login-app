let apps=[];
let fav=JSON.parse(localStorage.getItem("fav")||"[]");

let page=1;
const perPage=20;

fetch("data/data.json").then(r=>r.json()).then(d=>{
 apps=d;
 createChips();
 render();
});

function render(){
 const start=(page-1)*perPage;
 const list=apps.slice(start,start+perPage);

 content.innerHTML="";

 list.forEach(a=>{
 const locked=a.premium&&!isLoggedIn();

 content.innerHTML+=`
 <div class="card">

   <img class="icon" src="${a.image||'images/logo.png'}">

   <h4>${a.name}</h4>

   <button class="btn open"
     onclick="${locked?"location.href='login.html'":`location.href='${a.url}'`}">
     ${locked?"Login":"Open"}
   </button>

   <button class="btn info"
     onclick="openInfo('${a.details||''}')">
     App Info
   </button>

 </div>`;
 });

 buildPagination();
}

/* ---------- info ---------- */
function openInfo(link){
  if(link) location.href = link;
}


/* ---------- search ---------- */
search.oninput=e=>{
 const q=e.target.value.toLowerCase();
 apps=apps.filter(a =>
  a.name.toLowerCase().includes(q) ||
  (a.tags||[]).join(" ").includes(q)
 );
 page=1;
 render();
};

/* ---------- chips ---------- */
function createChips(){
 const cats=[...new Set(apps.map(a=>a.category).filter(Boolean))];

 cats.forEach(c=>{
  chips.innerHTML+=`<button class="chip" onclick="filterCat('${c}')">${c}</button>`;
 });
}

function filterCat(c){
 apps=apps.filter(a=>a.category==c);
 page=1;
 render();
}

/* ---------- pagination ---------- */
function buildPagination(){
 const pages=Math.ceil(apps.length/perPage);
 pagination.innerHTML="";

 for(let i=1;i<=pages;i++){
  pagination.innerHTML+=
  `<button onclick="go(${i})">${i}</button>`;
 }
}

function go(p){page=p;render();}

/* ---------- nav ---------- */
function showHome(){location.reload()}
function showFavorites(){render(apps.filter(a=>fav.includes(a.name)))}
function toggleDark(){document.body.classList.toggle("dark")}
