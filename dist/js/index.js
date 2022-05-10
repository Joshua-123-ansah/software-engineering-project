import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIPF1QRG-xYdfKgMrOBJFicDgEsV1XdBw",
  authDomain: "nft-project-ac35e.firebaseapp.com",
  databaseURL: "https://nft-project-ac35e-default-rtdb.firebaseio.com",
  projectId: "nft-project-ac35e",
  storageBucket: "nft-project-ac35e.appspot.com",
  messagingSenderId: "560961501265",
  appId: "1:560961501265:web:d034f4f4dd7fba63952070",
};

// init firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

// Reference users collection
const colRef = collection(db, "users");
const nftcol = collection(db, "collections");

// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let users = [];
    snapshot.docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    // console.log(users);
  })
  .catch((err) => {
    console.log(err.message);
  });

function nftCollections() {
  const colns = []; //
  const col_names = {};

  let i = 0;
  getDocs(nftcol)
    .then((snapshot) => {
      let collection = colns;
      snapshot.docs.forEach((doc) => {
        collection.push({ ...doc.data() });

        col_names[i] = [
          doc.data().col_name,
          doc.data().floor_price,
          doc.data().tweet_count,
        ];
        i = i + 1;
      });
    })
    .catch((err) => {
      console.log(err.message);
    });

  return col_names;
}

const names = nftCollections();

const chart1 = document.getElementById("NFT-Collections");
const chart2 = document.getElementById("NFT-Collections2");
const chart3 = document.getElementById("NFT-Collections3");

const f = 0;
const dlist = document.getElementById("NFT-Collections");
const dlist2 = document.getElementById("NFT-Collections2");
const dlist3 = document.getElementById("NFT-Collections3");

if (dlist) {
  let options = '<option value="Choose..." > Choose...</option>';
  let i = 0;
  getDocs(nftcol)
    .then((snapshot) => {
      let c1 = "";
      let c2 = "";
      let c3 = "";
      snapshot.docs.forEach((doc) => {
        options +=
          '<option value="' + names[i][0] + '" >' + names[i][0] + "</option>";
        i = i + 1;
      });
      dlist.innerHTML = options;
      dlist2.innerHTML = options;
      dlist3.innerHTML = options;

      // Dynamically retrieving the charts
      chart1.addEventListener("change", (e) => {
        i = 0;
        snapshot.docs.forEach((doc) => {
          if (chart1.value == names[i][0]) {
            c1 = names[i][1];
          }
          if (chart2.value == names[i][0]) {
            c2 = names[i][1];
          }
          i += 1;
        });

        var ctx = document.getElementById("spurChartjsLine").getContext("2d");
        var myChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                label: chart1.value,
                data: c1,
                backgroundColor: "rgba(6, 11, 38, 0.3)",
                borderColor: " #6578e7",
                fill: true,
              },
              {
                label: chart2.value,
                data: c2,
                backgroundColor: "rgba(6, 11, 38, 0.3)",
                borderColor: " #1c32b0",
                borderwidth: 0.5,
                fill: true,
              },
            ],
          },
          options: {
            legend: {
              display: true,
            },
          },
        });
        myChart;
      });

      chart2.addEventListener("change", (e) => {
        i = 0;
        snapshot.docs.forEach((doc) => {
          if (chart1.value == names[i][0]) {
            c1 = names[i][1];
          }
          if (chart2.value == names[i][0]) {
            c2 = names[i][1];
            console.log(c2);
          }
          i += 1;
        });

        var ctx = document.getElementById("spurChartjsLine").getContext("2d");
        var myChart2 = new Chart(ctx, {
          type: "line",
          data: {
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                label: chart1.value,
                data: c1,
                backgroundColor: "rgba(6, 11, 38, 0.3)",
                borderColor: " #6578e7",
                fill: true,
              },
              {
                label: chart2.value,
                data: c2,
                backgroundColor: "rgba(6, 11, 38, 0.3)",
                borderColor: " #1c32b0",
                borderwidth: 0.5,
                fill: true,
              },
            ],
          },
          options: {
            legend: {
              display: true,
            },
          },
        });
        myChart2;
      });

      // Twitter engagement chart
      chart3.addEventListener("change", (e) => {
        i = 0;
        snapshot.docs.forEach((doc) => {
          if (chart3.value == names[i][0]) {
            c3 = names[i][2];
          }
          i += 1;
        });

        var ctx2 = document.getElementById("spurChartjsBar").getContext("2d");
        var myChart3 = new Chart(ctx2, {
          type: "line",
          data: {
            labels: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
            datasets: [
              {
                label: chart3.value,
                data: c3,
                backgroundColor: "rgba(6, 11, 38, 1)",
                borderColor: "#152584",
              },
            ],
          },
          options: {
            legend: {
              display: false,
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
          },
        });
        myChart3;
      });
    })

    .catch((err) => {
      console.log(err.message);
    });
}

// Chart for twitter engagement

const addUser = async (uid, email, name) => {
  await setDoc(doc(colRef, uid), {
    uid: uid,
    name: name,
    email: email,
  });
};

// signing users up
const signupForm = document.getElementById("signup");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signupForm.email.value;
    const name = signupForm.name.value;
    const password = signupForm.password.value;
    const password_confirm = signupForm.confirmPassword.value;

    if (password !== password_confirm) {
      alert("Password does not match");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (cred) => {
        await addUser(cred.user.uid, email, name);
        window.location.href = "./index.html";
      })
      .catch((err) => {
        alert("Your email is incorrect or password is less than 6");
      });
  });
}

//Login a user in
const loginForm = document.getElementById("login");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        loginForm.reset();
        console.log("Going in");
        window.location.href = "./home.html";
      })
      .catch((err) => {
        alert("Invalid user name or password");
      });
  });
}

let user_info = [];
const loginName = document.getElementById("logIn");
if (loginName) {
  loginName.addEventListener("click", (e) => {
    // e.preventDefault();
    user_info = login_user_info();
  });
}

const login_user_info = async () => {
  const user_uid = auth.currentUser.uid;
  let userInfoSnapshot = doc(db, "users", user_uid);
  let userInfo = await getDoc(userInfoSnapshot);
  return [userInfo.data().name, userInfo.data().email];
};

const user_name = document.getElementById("dash-name");
user_name;
