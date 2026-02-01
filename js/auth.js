let user=null;
netlifyIdentity.on("init",u=>user=u);
function isLoggedIn(){return !!user}
