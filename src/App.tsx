import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Task from "./components/Task";
import { TaskType } from "./types";
import colors from "./colors";
import AddTask from "./components/AddTask";

type Data = {
  tasks: TaskType[];
};

const data: Data = {
  tasks: [
    {
      id: 1,
      title: "Uppsats",
      subtasks: [
        {
          id: 4,
          title: "Introduktion",
          workload: 2,
          description: "Skriva introduktionen, fam",
          dueDate: new Date(),
          subtasks: [
            {
              id: 4,
              title: "Introduktionbit",
              workload: 2,
              description: "Skriva introduktionen, fam",
              dueDate: new Date(),
              subtasks: [],
              status: "not started"
            },
            {
              id: 4,
              title: "Introduktionbit",
              workload: 2,
              description: "Skriva introduktionen, fam",
              dueDate: new Date(),
              subtasks: [],
              status: "halfwayish"
            },
            {
              id: 4,
              title: "Introduktionbit",
              workload: 2,
              description: "Skriva introduktionen, fam",
              dueDate: new Date(),
              subtasks: [],
              status: "finished"
            },
            {
              id: 4,
              title: "Introduktionbit",
              workload: 2,
              description: "Skriva introduktionen, fam",
              dueDate: new Date(),
              subtasks: [],
              status: "finished"
            }
          ],
          status: "halfwayish"
        },
        {
          id: 5,
          title: "Metod",
          workload: 4,
          description: "Skriva metod, fam",
          dueDate: new Date(),
          subtasks: [],
          status: "not started"
        }
      ]
    },
    {
      id: 2,
      title: "Programmeringsuppgift",
      subtasks: []
    },
    {
      id: 3,
      title: "Practice",
      subtasks: []
    }
  ]
};

export default function App() {
  return (
    <View style={styles.container}>
      <AddTask />
      {data.tasks.map(task => (
        <Task
          id={task.id}
          title={task.title}
          subtasks={task.subtasks}
          key={task.id}
        />
      ))}
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
