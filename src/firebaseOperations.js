import { app, database } from "./firebaseConfig.js"
import { ref, set, onValue } from "firebase/database"

const lastSongRef = ref(database, "lastSong");

function writeToDatabase(newLink) {
set(lastSongRef, {
    songLink: newLink
})
    .then(() => {
    console.log("Data written successfully!");
    })
    .catch((error) => {
    console.error("Error writing to database:", error);
    });
};

function readFromDatabase() {
onValue(lastSongRef, (snapshot) => {
    if (snapshot.exists()) {
    const data = snapshot.val();
    console.log("Real-time data: ", data);
    } else {
    console.log("No data found");
    }
}, (error) => {
    console.error("Error reading data: ", error);
})
};

export { writeToDatabase, readFromDatabase}