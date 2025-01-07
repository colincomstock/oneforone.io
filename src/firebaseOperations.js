import { app, database } from "./firebaseConfig.js"
import { ref, set, get } from "firebase/database"

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
    return new Promise(async (resolve, reject) => {
        try {
            const snapshot = await get(lastSongRef);
            if (snapshot.exists()) {
                const data = snapshot.val();
                console.log("Read data: ", data);
                resolve(data);
            } else {
                console.log("No data found");
                resolve(null);
            }
        } catch (error) {
            console.error( "Error reading data: ", error);
            reject(error);
        }
    });
};

export { writeToDatabase, readFromDatabase}