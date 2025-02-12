import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { SvgXml } from "react-native-svg";

const time = `<svg width="16" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="11" cy="11" r="10" stroke="#2B3F6C" stroke-width="1.5"/>
<path d="M11 7V10.7324C11 10.8996 11.0836 11.0557 11.2226 11.1484L14 13" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`;
const date = `<svg width="14" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="1" y="2.5" width="18" height="18" rx="5" stroke="#2B3F6C" stroke-width="1.5"/>
<path d="M1 7.5H19" stroke="#2B3F6C" stroke-width="1.5" stroke-linejoin="round"/>
<path d="M14.5 1L14.5 4" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5.5 1L5.5 4" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.5 11.5H5.5" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.5 11.5H10.5" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.5 11.5H15.5" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.5 15.5H5.5" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.5 15.5H10.5" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.5 15.5H15.5" stroke="#2B3F6C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
const Delete = `<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.41773 3.25C1.39152 3.25 0.234916 5.56321 1.45064 7.18418C1.96952 7.87601 2.25001 8.71748 2.25001 9.58228V16C2.25001 18.6234 4.37666 20.75 7.00001 20.75H11C13.6234 20.75 15.75 18.6234 15.75 16V9.58228C15.75 8.71748 16.0305 7.87601 16.5494 7.18418C17.7651 5.56321 16.6085 3.25 14.5823 3.25H3.41773ZM10.9998 8.25C11.414 8.25 11.7498 8.58579 11.7498 9V15C11.7498 15.4142 11.414 15.75 10.9998 15.75C10.5856 15.75 10.2498 15.4142 10.2498 15V9C10.2498 8.58579 10.5856 8.25 10.9998 8.25ZM7.74982 9C7.74982 8.58579 7.41403 8.25 6.99982 8.25C6.5856 8.25 6.24982 8.58579 6.24982 9L6.24982 15C6.24982 15.4142 6.5856 15.75 6.99982 15.75C7.41403 15.75 7.74982 15.4142 7.74982 15L7.74982 9Z" fill="#288dde"/>
<path d="M13 4L12.4558 2.36754C12.1836 1.55086 11.4193 1 10.5585 1H7.44152C6.58066 1 5.81638 1.55086 5.54415 2.36754L5 4" stroke="#288dde" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`;
const TaskDone = `<svg width="19" height="19" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.25 6C0.25 2.82436 2.82436 0.25 6 0.25H16C19.1756 0.25 21.75 2.82436 21.75 6V16C21.75 19.1756 19.1756 21.75 16 21.75H6C2.82436 21.75 0.25 19.1756 0.25 16V6ZM7.96967 11.0303L9.96967 13.0303C10.2626 13.3232 10.7374 13.3232 11.0303 13.0303L15.0303 9.03033C15.3232 8.73744 15.3232 8.26256 15.0303 7.96967C14.7374 7.67678 14.2626 7.67678 13.9697 7.96967L10.5 11.4393L9.03033 9.96967C8.73744 9.67678 8.26256 9.67678 7.96967 9.96967C7.67678 10.2626 7.67678 10.7374 7.96967 11.0303Z" fill="#288dde"/>
</svg>
`;

const Task = ({ titleTask, TimeTask, DateTask }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [taskDoneModalVisible, setTaskDoneModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.WpText}>
        <Text style={[styles.text, styles.textTitle]}>{titleTask}</Text>
        <View style={styles.TimeDateText}>
          <SvgXml xml={time} style={styles.iconTask} />
          <Text style={styles.text}>{TimeTask}</Text>
          <Text style={styles.text}>|</Text>
          <SvgXml xml={date} style={styles.iconTask} />
          <Text style={styles.text}>{DateTask}</Text>
        </View>
      </View>
      <View style={styles.colorBg}></View>
      <View style={styles.wpActionBtn}>
        <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
          <SvgXml xml={Delete} style={styles.iconTask} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTaskDoneModalVisible(true)}>
          <SvgXml xml={TaskDone} style={styles.iconTask} />
        </TouchableOpacity>
      </View>

      {/* Delete Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => setDeleteModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Apakah anda yakin ingin menghapus data ini ?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.textStyle}>Batal</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonDelete]}
                onPress={() => {
                  // Handle delete action here
                  setDeleteModalVisible(false);
                }}
              >
                <Text style={[styles.textStyle, styles.textStyleDelete]}>
                  Hapus
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Task Done Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={taskDoneModalVisible}
        onRequestClose={() => setTaskDoneModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Apakah anda yakin ingin menandai selesai ?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.button, styles.buttonCancel]}
                onPress={() => setTaskDoneModalVisible(false)}
              >
                <Text style={styles.textStyle}>Batal</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonDone]}
                onPress={() => {
                  // Handle task done action here
                  setTaskDoneModalVisible(false);
                }}
              >
                <Text style={[styles.textStyle, styles.textStyleDone]}>
                  Selesai
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 5, // For Android
    shadowColor: "gray", // For iOS
    shadowOffset: { width: 0, height: 2 }, // For iOS
    shadowOpacity: 0.3, // For iOS
    shadowRadius: 4, // For iOS
    position: "relative",
    marginBottom: 20,
  },
  text: {
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    color: "#2B3F6C",
  },
  textTitle: {
    fontSize: 16,
    color: "black",
    maxWidth: 220,
  },
  colorBg: {
    backgroundColor: "#288dde",
    width: "15",
    position: "absolute",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    bottom: 0,
    top: 0,
    left: 0,
  },
  WpText: {
    flexDirection: "column",
    gap: 3,
  },
  TimeDateText: {
    flexDirection: "row",
    gap: 8,
  },
  wpActionBtn: {
    backgroundColor: "",
    width: "60",
    position: "absolute",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    bottom: 0,
    top: 0,
    right: 0,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: "45%",
    alignItems: "center",
  },
  textStyle: {
    color: "black",
    fontFamily: "Poppins-Medium",
    textAlign: "center",
  },
  buttonCancel: {
    backgroundColor: "#f1f1f1",
  },
  buttonDelete: {
    backgroundColor: "#ff4d4d",
  },
  buttonDone: {
    backgroundColor: "#288dde",
  },
  textStyleDelete: {
    color: "white",
  },
  textStyleDone: {
    color: "white",
  },
});

export default Task;
