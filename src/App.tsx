import React, { useEffect, useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Task from "./components/Task";
import { TaskType } from "./types";
import colors from "./colors";
import AddTask from "./components/AddTask";
import Database from "./api/database";
import userID from "./api/userID";

export default function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const unsubscribe = Database.startTaskSubscription(userID, snapshot => {
      const tasks: TaskType[] = [];
      snapshot.forEach((doc: any) => {
        const data = doc.data();
        console.log(data);
        tasks.push({
          id: doc.id,
          title: data.title,
          subtasks: data.subtasks
        });
      });
      setTasks(tasks);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView horizontal pagingEnabled>
        <AddTask userID={userID} />
        {tasks.map(task => (
          <Task id={task.id} title={task.title} key={task.id} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "row",
    padding: 20
  }
});
