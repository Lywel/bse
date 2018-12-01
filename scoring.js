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
  const doc = {
    login: login,
    score: score,
    date: firebase.firestore.FieldValue.serverTimestamp(),
  }
  console.log(doc)
  firestore.collection('scores').add(doc)
}

const scoreboard = document.querySelector('#scoreboard')

function showScoreboard(snap) {
  // Clear
  while (scoreboard.firstChild)
    scoreboard.removeChild(scoreboard.firstChild)

  // Add
  snap.forEach(doc => {
    const data = doc.data()
    const li = document.createElement("li")

    const strong = document.createElement("strong")
    strong.appendChild(document.createTextNode( data.login ))
    const score = document.createElement("span")
    score.appendChild(document.createTextNode( data.score ))

    li.appendChild(strong)
    li.appendChild(score)

    if (data.date) {
      const date = document.createElement("span")
      date.appendChild(document.createTextNode( (new Date(data.date.seconds)).toLocaleString() ))

      li.appendChild(date)
    }

    scoreboard.appendChild(li)
  })
}

firestore.collection("scores")
  .orderBy("score", "desc")
  .limit(60)
  .onSnapshot(showScoreboard)
