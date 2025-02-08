import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";

const svgHome = `<svg width="26" height="26" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5 9.93841C1.5 8.71422 2.06058 7.55744 3.02142 6.79888L8.52142 2.45677C9.97466 1.30948 12.0253 1.30948 13.4786 2.45677L18.9786 6.79888C19.9394 7.55744 20.5 8.71422 20.5 9.93841V16.5C20.5 18.7091 18.7091 20.5 16.5 20.5H15C14.4477 20.5 14 20.0523 14 19.5V16.5C14 15.3954 13.1046 14.5 12 14.5H10C8.89543 14.5 8 15.3954 8 16.5V19.5C8 20.0523 7.55228 20.5 7 20.5H5.5C3.29086 20.5 1.5 18.7091 1.5 16.5L1.5 9.93841Z" stroke="#176AC8" stroke-width="1.5"/>
</svg>
`;
const svgTask = `<svg width="23" height="26" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="16" height="20" rx="4" stroke="#176AC8" stroke-width="1.5"/>
<path d="M5 6H13" stroke="#176AC8" stroke-width="1.5" stroke-linecap="round"/>
<path d="M5 11H13" stroke="#176AC8" stroke-width="1.5" stroke-linecap="round"/>
<path d="M5 16H9" stroke="#176AC8" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`;
const svgAddTask = `<svg width="32" height="32" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="1" width="20" height="20" rx="5" stroke="#ffffff" stroke-width="1.5"/>
<path d="M8 11H14" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 7.99994L11 13.9999" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const DateInput = `<svg width="17" height="19" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="2.5" width="18" height="18" rx="5" stroke="#a3a3a3" stroke-width="1.5"/>
<path d="M1 7.5H19" stroke="#a3a3a3" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M14.5 1L14.5 4" stroke="#a3a3a3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.5 1L5.5 4" stroke="#a3a3a3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.5 11.5H5.5" stroke="#a3a3a3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.5 11.5H10.5" stroke="#a3a3a3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.5 11.5H15.5" stroke="#a3a3a3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.5 15.5H5.5" stroke="#a3a3a3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.5 15.5H10.5" stroke="#a3a3a3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.5 15.5H15.5" stroke="#a3a3a3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const TimeInput = `<svg width="19" height="21" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="11" cy="11" r="10" stroke="#a3a3a3" stroke-width="1.5"/>
<path d="M11 7V10.7324C11 10.8996 11.0836 11.0557 11.2226 11.1484L14 13" stroke="#a3a3a3" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`;

const Sidebar = () => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const bottomSheetAnimation = useRef(new Animated.Value(500)).current;
  const navigation = useNavigation();

  const toggleBottomSheet = () => {
    if (isBottomSheetVisible) {
      Animated.timing(bottomSheetAnimation, {
        toValue: 500,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setBottomSheetVisible(false));
    } else {
      setBottomSheetVisible(true);
      Animated.timing(bottomSheetAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleSubmit = () => {
    console.log("Task Description:", taskDescription);
    console.log("Task Date:", taskDate);
    console.log("Task Time:", taskTime);
    toggleBottomSheet();
  };

  const handleOutsidePress = () => {
    if (isBottomSheetVisible) {
      toggleBottomSheet(); // Close the bottom sheet if clicking outside
    }
  };

  const handleDateChange = (event, selected) => {
    setShowDatePicker(false);
    if (selected) {
      setTaskDate(selected.toISOString().split("T")[0]); // Format YYYY-MM-DD
    }
  };

  const handleTimeChange = (event, selected) => {
    setShowTimePicker(false);
    if (selected) {
      setTaskTime(
        selected.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      ); // Format HH:MM
    }
  };

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity
        style={styles.wpMenu}
        onPress={() => navigation.navigate("Home")}
      >
        <SvgXml xml={svgHome} style={styles.menu} />
        <Text style={styles.TextMenu}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.wpMenu} onPress={toggleBottomSheet}>
        <LinearGradient
          colors={["#bf5128", "#ff8d64"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.wpMenuAdd}
        >
          <SvgXml xml={svgAddTask} style={styles.menu} />
          <Text style={styles.TextMenuAdd}>Add</Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.wpMenu}
        onPress={() =>
          navigation.reset({ index: 0, routes: [{ name: "Activity" }] })
        }
      >
        <SvgXml xml={svgTask} style={styles.menu} />
        <Text style={styles.TextMenu}>Activity</Text>
      </TouchableOpacity>

      {/* Bottom Sheet with Background */}
      {isBottomSheetVisible && (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <Animated.View
            style={[
              styles.bottomSheetContainer,
              { transform: [{ translateY: bottomSheetAnimation }] },
            ]}
          >
            <View style={styles.overlay}></View>
            <View style={styles.bottomSheetContent}>
              <Text style={styles.modalTitle}>Tambahkan Tugas</Text>
              <View style={styles.groupInput}>
                <TextInput
                  style={styles.input}
                  placeholder="Deskripsi Kegiatan"
                  value={taskDescription}
                  onChangeText={setTaskDescription}
                />
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <TextInput
                    style={styles.input}
                    placeholder="Tanggal Kegiatan"
                    value={taskDate}
                    editable={false}
                  />
                  <SvgXml xml={DateInput} style={styles.absoluteIconList} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                  <TextInput
                    style={styles.input}
                    placeholder="Jam Kegiatan"
                    value={taskTime}
                    editable={false}
                  />
                  <SvgXml xml={TimeInput} style={styles.absoluteIconList} />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                  />
                )}
                {showTimePicker && (
                  <DateTimePicker
                    value={selectedDate}
                    mode="time"
                    display="default"
                    onChange={handleTimeChange}
                  />
                )}
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  onPress={toggleBottomSheet}
                  style={[styles.bottomBS, styles.cancelButton]}
                >
                  <Text style={styles.buttonText}>Batal</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[styles.bottomBS, styles.submitButton]}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    backgroundColor: "white",
    bottom: 0,
    width: "100%",
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: "5",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 25, // For Android
    shadowColor: "black", // For iOS
    shadowOffset: { width: 0, height: 2 }, // For iOS
    shadowOpacity: 0.3, // For iOS
    shadowRadius: 4, // For iOS

    // Untuk iOS (Tetap ada untuk kompatibilitas)
    shadowOffset: { width: 0, height: -6 }, // Lebih naik ke atas
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  wpMenu: {
    width: "33.33%",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  wpMenuAdd: {
    backgroundColor: "#fd7f51",
    width: "60",
    height: "60",
    borderRadius: 999,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 40,
    position: "relative",
  },
  menu: {
    width: 30,
    height: 30,
  },
  TextMenu: {
    fontSize: 12,
    color: "#176AC8",
    fontFamily: "Poppins-Medium",
  },
  TextMenuAdd: {
    color: "#fd7f51",
    fontSize: 12.5,
    position: "absolute",
    bottom: -22.5,
    fontFamily: "Poppins-Medium",
  },
  overlay: {
    position: "absolute",
    // top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "1000%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  bottomSheetContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 2,
  },
  modalTitle: {
    fontSize: 15,
    marginBottom: 10,
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    paddingTop: 5,
    paddingBottom: 10,
  },
  groupInput: {
    marginBottom: 10,
    flexDirection: "column",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 11,
    fontFamily: "Poppins-Medium",
    paddingHorizontal: "15",
    fontSize: 13,
    paddingTop: 3 + 9,
    paddingBottom: 1 + 9,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  bottomBS: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    marginHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  cancelButton: {
    backgroundColor: "#3175e3",
  },

  submitButton: {
    backgroundColor: "#3175e3",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  absoluteIconList: {
    position: "absolute",
    right: 15,
    top: "13",
  },
});

export default Sidebar;
