import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TaskType } from "../types";
import Subtask from "./Subtask";
import colors from "../colors";

type Props = TaskType;

function Task({ title, subtasks }: Props) {
  return (
    <View style={styles.task}>
      <Text style={styles.title}>{title}</Text>
      <View>
        {subtasks.map(subtask => (
          <Subtask key={subtask.id} {...subtask} />
        ))}
      </View>
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
    borderRadius: 10
  },
  title: {
    color: colors.textColor,
    fontSize: 24,
    marginBottom: 20
  }
});

export default Task;
