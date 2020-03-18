import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import colors from "../colors";
import Button from "./Button";
import Database from "../api/database";

type Props = { userID: string };

function AddTask({ userID }: Props) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handlePress() {
    setIsSubmitting(true);
    Database.addNewTask(userID, newTaskTitle).then(() => {
      setIsSubmitting(false);
    });
  }

  const isDisabled = newTaskTitle === "" || isSubmitting;

  return (
    <View style={styles.task}>
      <TextInput
        value={newTaskTitle}
        onChangeText={text => setNewTaskTitle(text)}
        placeholder="New Task Name"
        style={styles.title}
      />
      <Button disabled={isDisabled} title="Add +" onPress={handlePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  task: {
    backgroundColor: colors.taskBackground,
    width: 300,
    marginRight: 20,
    padding: 16,
    borderRadius: 10
  },
  title: {
    color: colors.textColor,
    fontSize: 24,
    marginBottom: 20,
    backgroundColor: colors.textInputBackground
  },
  button: {
    backgroundColor: colors.primary,
    color: colors.primary
  }
});

export default AddTask;
