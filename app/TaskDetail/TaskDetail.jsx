import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import * as speech from "expo-speech";
export default function TaskDetail({ route }) {
  const { id } = route.params;
  const [task, setTask] = useState(null);
  const tasks = [
    {
      id: 1,
      task_title: "Take Morning Medication",
      description:
        "At 08:00 AM, 02 Oct, 2024, take your morning medication as prescribed by your doctor.",
      date: "02 Oct, 2024 08:00 AM",
      categories: ["Medicine"],
      status: "completed",
      image: require("../../assets/tasks/medication2.webp"),
    },
    {
      id: 2,
      task_title: "Schedule a Routine Health Checkup",
      description:
        "At 10:00 AM, 06 Oct, 2024, schedule a routine health checkup with your doctor.",
      date: "06 Oct, 2024 10:00 AM",
      categories: ["Medicine"],
      status: "pending",
      image: require("../../assets/tasks/health.webp"),
    },
    {
      id: 3,
      task_title: "30-Minute Cardio Workout",
      description:
        "At 07:00 AM, 01 Oct, 2024, perform a 30-minute cardio workout session.",
      date: "01 Oct, 2024 07:00 AM",
      categories: ["Exercise"],
      status: "missed",
      image: require("../../assets/tasks/sports-man-doing-crunches-exercise-tmklqw8p5nd2i09y.webp"),
    },
    {
      id: 4,
      task_title: "Prepare a Healthy Meal Plan for the Week",
      description:
        "At 11:00 AM, 01 Oct, 2024, prepare a nutritious meal plan for the week.",
      date: "01 Oct, 2024 11:00 AM",
      categories: ["Food"],
      status: "missed",
      image: require("../../assets/tasks/meal.jpeg"),
    },
    {
      id: 5,
      task_title: "Track Daily Water Intake",
      description:
        "At 06:00 PM, 02 Oct, 2024, monitor and log your daily water consumption.",
      date: "02 Oct, 2024 06:00 PM",
      categories: ["Medicine"],
      status: "completed",
      image: require("../../assets/tasks/water.jpg"),
    },
    {
      id: 6,
      task_title: "Complete a Full-Body Stretching Routine",
      description:
        "At 08:30 AM, 07 Oct, 2024, complete a full-body stretching routine for flexibility.",
      date: "07 Oct, 2024 08:30 AM",
      categories: ["Exercise"],
      status: "pending",
      image: require("../../assets/tasks/f77da9406a3a76c70a1d3afab2bada0e.gif"),
    },
  ];
  const textToSpeech = (text) => {
    speech.speak(text);
  };

  useEffect(() => {
    async function fetchTasks() {
      try {
        // const response = await fetch(
        //   `https://consumer-tasks.vercel.app/api/tasks/${id}`
        // );
        // if (!response.ok) {
        //   throw new Error(`HTTP error! status: ${response.status}`);
        // }
        // const data = await response.json();
        setTask(tasks);
        console.log(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchTasks();
  }, []);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!task) {
    return <Text>Loading....</Text>;
  }

  const imageSource =
    typeof task.image === "string" ? { uri: task.image } : task.image;
  return (
    <View style={styles.container}>
      <View>
        <Image source={imageSource} style={styles.image} />
      </View>

      {/* Task Details */}
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{task.task_title}</Text>
          <TouchableOpacity onPress={()=>{textToSpeech(task.task_description)}}>
            <Icon name="volume-high-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.dateTimeRow}>
          <Icon name="calendar-outline" size={16} color="#555" />
          <Text style={styles.dateText}>
            {dayjs(task.reminder).format("YYYY-MM-DD HH:mm A")}
          </Text>
          <Icon name="time-outline" size={16} color="#555" />
          <Text style={styles.dateText}>
            {" "}
            {dayjs(task.reminder).format(" HH:mm A")}
          </Text>
        </View>

        <Text style={styles.description}>{task.task_description}</Text>

        {/* Action Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.button,
              isCompleted ? styles.completedButton : styles.defaultButton,
            ]}
            onPress={() => setIsCompleted(!isCompleted)}
          >
            <Icon
              name={
                isCompleted ? "checkmark-circle-outline" : "checkmark-circle"
              }
              size={24}
              color={isCompleted ? "green" : "#fff"}
              style={styles.icon}
            />
            <Text
              style={[
                styles.buttonText,
                isCompleted ? styles.completedText : styles.defaultText,
              ]}
            >
              {isCompleted ? "Completed" : "Mark as Done"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.skipButton]}>
            <Icon
              name="play-skip-forward-outline"
              size={24}
              color="red"
              style={styles.icon}
            />
            <Text style={[styles.buttonText, styles.skipText]}>Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f4" },
  image: { width: "100%", height: 200, resizeMode: "cover" },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 30,
  },
  content: { padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "bold", color: "#333" },
  dateTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  dateText: { marginLeft: 5, marginRight: 20, color: "#555" },
  description: { fontSize: 16, color: "#555", marginBottom: 20 },
  medicationBox: { backgroundColor: "#f9f9f9", padding: 15, borderRadius: 8 },
  subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  medicationText: { fontSize: 16, color: "#555" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    padding: 10,
    borderRadius: 5,
  },
  defaultButton: { backgroundColor: "#28a745" },
  completedButton: {
    borderWidth: 1,
    borderColor: "green",
    backgroundColor: "#fff",
    marginRight: 2,
  },
  skipButton: {
    borderWidth: 1,
    borderColor: "red",
    backgroundColor: "#fff",
    marginLeft: 10,
    alignItems:"center"
  },
  doneButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 3,
  },
 
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  defaultText: { color: "#fff" },
  completedText: { color: "green" },
  skipText: { color: "red" },
  icon: { marginRight: 1 }, // <-- Added the icon style here
});
