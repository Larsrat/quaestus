import firebase from "firebase/app";
import "firebase/firestore";

class Database {
  private database: firebase.firestore.Firestore | null = null;

  constructor() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyDGm257EDd-6viINJexfZ9z8UP1m0EOg_Q",
      authDomain: "quaestus-dfe1f.firebaseapp.com",
      databaseURL: "https://quaestus-dfe1f.firebaseio.com",
      projectId: "quaestus-dfe1f",
      storageBucket: "quaestus-dfe1f.appspot.com",
      messagingSenderId: "536708551043",
      appId: "1:536708551043:web:3179a7482e9086995926b6"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    this.database = firebase.firestore();
  }

  addNewTask(userID: string, title: string) {
    return this.database!.collection("users")
      .doc(userID)
      .collection("tasks")
      .add({
        title
      });
  }

  removeTask(userID: string, id: string) {
    return this.database!.collection("users")
      .doc(userID)
      .collection("tasks")
      .doc(id)
      .delete();
  }

  startTaskSubscription(
    userID: string,
    callback: (
      snapshot: firebase.firestore.QuerySnapshot<
        firebase.firestore.DocumentData
      >
    ) => void
  ) {
    const unsubscribe = this.database!.collection(
      `/users/${userID}/tasks`
    ).onSnapshot(callback);
    return unsubscribe;
  }

  startSubtaskSubscription(
    task: string,
    userID: string,
    callback: (
      snapshot: firebase.firestore.QuerySnapshot<
        firebase.firestore.DocumentData
      >
    ) => void
  ) {
    const unsubscribe = this.database!.collection(
      `/users/${userID}/tasks/${task}/subtasks`
    ).onSnapshot(callback);
    return unsubscribe;
  }
}

const database = new Database();

export default database;
