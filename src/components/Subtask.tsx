import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SubtaskType } from "../types";
import { format } from "date-fns";
import colors from "../colors";

type Props = SubtaskType;

function Subtask({ title, description, dueDate, status, subtasks }: Props) {
  let statusStyle;
  if (subtasks.length === 0) {
    switch (status) {
      case "not started":
        statusStyle = styles.statusColor;
        break;
      case "started":
        statusStyle = styles.statusColor2;
        break;
      case "halfwayish":
        statusStyle = styles.statusColor3;
        break;
      case "almost done":
        statusStyle = styles.statusColor4;
        break;
      case "finished":
        statusStyle = styles.statusColor5;
        break;
    }
  }

  return (
    <View style={[styles.subtask, statusStyle]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.date}>{format(dueDate, "PPP")}</Text>
      <Text style={styles.description}>{description}</Text>
      <View>
        {subtasks.map(subtask => (
          <Subtask key={subtask.id} {...subtask} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subtask: {
    backgroundColor: colors.subtaskBackground,
    flex: 1,
    marginBottom: 16,
    padding: 16,
    paddingTop: 10,
    borderRadius: 10
  },
  title: {
    color: colors.textColor,
    fontSize: 24,
    marginBottom: 8
  },
  date: {
    color: colors.textColor
  },
  description: {
    color: colors.textColor,
    marginBottom: 20
  },
  statusColor: {
    backgroundColor: "#62adcc"
  },
  statusColor2: {
    backgroundColor: "#EB8810"
  },
  statusColor3: {
    backgroundColor: "#34CA86"
  },
  statusColor4: {
    backgroundColor: "#A8EB3B"
  },
  statusColor5: {
    backgroundColor: "#9BDB4E"
  }
});

export default Subtask;
