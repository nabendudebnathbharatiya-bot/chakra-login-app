// আপনার Firebase প্রোজেক্টের কনফিগারেশন
const firebaseConfig = {
    apiKey: "AIzaSyBfuvG2cutlIt0I0g0HiO8UTWZIVSf0UhE",
    authDomain: "chakra-login.firebaseapp.com",
    projectId: "chakra-login",
    storageBucket: "chakra-login.firebasestorage.app",
    messagingSenderId: "56779138869",
    appId: "1:56779138869:web:9db029ab84ab040f9f4e7c"
};

// Firebase চালু করা হচ্ছে
// (index.html ফাইলে আমরা লাইব্রেরি লোড করেছি, তাই এখানে import এর দরকার নেই)
firebase.initializeApp(firebaseConfig);

// অথেন্টিকেশন ভেরিয়েবল তৈরি (এটি auth.js ফাইলে ব্যবহার হবে)
const auth = firebase.auth();
