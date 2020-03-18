import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Picker } from "react-native";
import { TaskType, SubtaskType } from "../types";
import Subtask from "./Subtask";
import colors from "../colors";
import Database from "../api/database";
import userID from "../api/userID";

type Props = { id: string; title: string };

function Task({ id, title }: Props) {
  const [subtasks, setSubtasks] = useState<SubtaskType[]>([]);

  useEffect(() => {
    const unsubscribe = Database.startSubtaskSubscription(
      id,
      userID,
      snapshot => {
        const subtasks: SubtaskType[] = [];
        snapshot.forEach((doc: any) => {
          const data = doc.data();
          console.log(data);
          subtasks.push({
            id: doc.id,
            title: data.title,
            workload: data.workload,
            description: data.description,
            dueDate: data.dueDate.toDate(),
            status: data.status,
            subtasks: []
          });
        });
        setSubtasks(subtasks);
      }
    );
    return unsubscribe;
  }, []);

  if (subtasks != null) {
    return (
      <View style={styles.task}>
        <Text style={styles.title}>{title}</Text>
        <View>
          {subtasks.map(subtask => (
            <Subtask key={subtask.id} {...subtask} />
          ))}
        </View>
        <Picker />
      </View>
    );
  }
  return (
    <View style={styles.task}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    backgroundColor: colors.taskBackground,
    width: 300,
    marginRight: 20,
    padding: 16,
    minHeight: 300,
    borderRadius: 10,
    flex: 1
  },
  title: {
    color: colors.textColor,
    fontSize: 24,
    marginBottom: 20
  }
});

export default Task;
