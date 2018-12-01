// Initialize Firebase
const config = {
  apiKey: "AIzaSyCVAGbfCexdFd_zh8yfdlsfKaNl1zvJC34",
  authDomain: "bse-scroreboard.firebaseapp.com",
  databaseURL: "https://bse-scroreboard.firebaseio.com",
  projectId: "bse-scroreboard",
  storageBucket: "bse-scroreboard.appspot.com",
  messagingSenderId: "706311365743",
}

firebase.initializeApp(config)

const firestore = firebase.firestore()
const settings = { timestampsInSnapshots: true}

firestore.settings(settings)

function writeScore(login, score) {
  if (!login)
    return
  firestore.collection('scores').add({
    login: login,
    score: score,
  })
}

const scoreboard = document.querySelector('#scoreboard')

firestore.collection('scores')
  .orderBy("score", "desc")
  .limit(10)
  .get()
  .then(snap => {
    snap.forEach(doc => {
      const data = doc.data()
      const li = document.createElement("li")
      const strong = document.createElement("strong")
      strong.appendChild(document.createTextNode( data.login ))
      li.appendChild(strong)
      li.appendChild(document.createTextNode( data.score ))
      scoreboard.appendChild(li)
    })
  })
