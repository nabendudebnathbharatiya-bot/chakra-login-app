const CACHE_NAME = "chakradham-v2-firebase"; // নাম পরিবর্তন করা হয়েছে যাতে নতুন কোড লোড হয়
const assets = [
  "./",
  "./index.html",
  "./login.html",
  "./css/style.css",
  "./js/app.js",
  "./js/auth.js",
  "./js/settings.js",
  "./js/firebase-config.js", // নতুন ফাইলটি অ্যাড করা হলো
  "./data/data.json",
  "./data/settings.json",
  "./images/logo.png"
];

// Install Service Worker
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching assets");
      return cache.addAll(assets);
    })
  );
  self.skipWaiting(); // নতুন ভার্সন দ্রুত চালু হবে
});

// Activate Event (পুরনো Cache ডিলিট করা)
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch Event (অফলাইন সাপোর্ট)
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(evt.request).then((fetchRes) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(evt.request.url, fetchRes.clone());
            return fetchRes;
          });
        })
      );
    })
  );
});
