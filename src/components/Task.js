import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const Task = ({ task, onPress }) => {
  const { title, description, dueDate, status } = task;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.taskInfo}>
        <View style={styles.colorBg}></View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.dueDate}>
          Tenggat: {moment(dueDate).format("DD MMM YYYY")}
        </Text>
      </View>
      <View style={styles.statusContainer}>
        <Text
          style={[styles.status, status === "completed" && styles.completed]}
        >
          {status === "completed" ? "Selesai" : "Menunggu"}
        </Text>
        <Ionicons
          name={status === "completed" ? "checkmark-circle" : "alert-circle"}
          size={24}
          color={status === "completed" ? "#4CAF50" : "#FF5722"}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  taskInfo: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    color: "#333",
  },
  description: {
    fontSize: 14,
    fontFamily: "Poppins-Light",
    color: "#777",
  },
  dueDate: {
    fontSize: 12,
    fontFamily: "Poppins-Light",
    color: "#888",
    marginTop: 5,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  status: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#FF5722",
  },
  completed: {
    color: "#4CAF50",
  },
  colorBg: {
    backgroundColor: "blue",
  },
});

export default Task;
