import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  BackHandler,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import Task from "../components/Task";

const ActivityScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const flatListRef = useRef(null);

  useEffect(() => {
    // Set locale ke bahasa Indonesia dengan updateLocale
    moment.updateLocale("id", {
      months: [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ],
      weekdaysShort: ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"],
    });

    const backAction = () => {
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    generateDates();
    return () => backHandler.remove();
  }, [navigation]);

  // Menghasilkan tanggal untuk satu bulan penuh
  const generateDates = () => {
    let tempDates = [];
    const startOfMonth = moment().startOf("month");
    const endOfMonth = moment().endOf("month");

    // Menghasilkan tanggal untuk bulan berjalan
    for (let day = startOfMonth.date(); day <= endOfMonth.date(); day++) {
      tempDates.push(moment().date(day));
    }
    setDates(tempDates);

    setTimeout(() => {
      const todayIndex = tempDates.findIndex(
        (date) => date.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
      );
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          index: todayIndex,
          animated: true,
        });
      }
    }, 100);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f2fafe" />
      {/* Header tetap */}
      <View style={styles.fixedHeader}>
        <View style={styles.padding}>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#2263FF"
              style={styles.icon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari aktivitas..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
            />
          </View>

          {/* Menampilkan bulan dan tahun di bawah search */}
          <Text style={styles.monthYearText}>
            {moment().format("MMMM YYYY")}
          </Text>
        </View>
        <View style={styles.DateMoment}>
          {/* Pemilih Tanggal */}
          <FlatList
            ref={flatListRef}
            data={dates}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateList}
            keyExtractor={(item) => item.format("YYYY-MM-DD")}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dateItem,
                  selectedDate === item.format("YYYY-MM-DD") &&
                    styles.dateItemSelected,
                ]}
                onPress={() => setSelectedDate(item.format("YYYY-MM-DD"))}
              >
                {/* Sesuaikan warna teks saat dipilih */}
                <Text
                  style={[
                    styles.dateText,
                    selectedDate === item.format("YYYY-MM-DD") &&
                      styles.dateTextSelected,
                  ]}
                >
                  {item.format("DD")}
                </Text>
                <Text
                  style={[
                    styles.dayText,
                    selectedDate === item.format("YYYY-MM-DD") &&
                      styles.dayTextSelected,
                  ]}
                >
                  {item.format("ddd")}
                </Text>
              </TouchableOpacity>
            )}
            initialScrollIndex={dates.findIndex(
              (date) =>
                date.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
            )}
            getItemLayout={(data, index) => ({
              length: 80,
              offset: 77 * index,
              index,
            })}
          />
        </View>
      </View>
      {/* Konten yang dapat digulir */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Task />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2fafe",
  },
  scrollContent: {
    paddingTop: 250, // Ruang untuk header tetap
    paddingHorizontal: 15,
    paddingBottom: 90,
  },
  DateMoment: {
    paddingHorizontal: 0,
    marginTop: -10,
  },
  fixedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    paddingTop: 60, // Menyesuaikan agar ada ruang untuk status bar
    backgroundColor: "#f2fafe",
  },
  padding: {
    paddingHorizontal: 15,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 17,
    paddingHorizontal: 15,
    paddingTop: 3,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  icon: {
    marginRight: 8,
    marginTop: -2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    fontFamily: "Poppins-Light",
  },
  dateList: {
    marginTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 10,
    flexDirection: "row",
    gap: 15,
  },
  dateItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dateItemSelected: {
    backgroundColor: "#288dde",
    color: "green",
  },
  dateText: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
  },
  dayText: {
    fontSize: 12,
    fontFamily: "Poppins-Light",
    marginTop: -10,
  },
  dateTextSelected: {
    color: "#fff", // Warna putih saat dipilih
    fontFamily: "Poppins-Medium",
  },
  dayTextSelected: {
    color: "#fff", // Warna putih saat dipilih
    fontFamily: "Poppins-Light",
    marginTop: -10,
  },
  activityText: {
    fontSize: 18,
    color: "#333",
    marginTop: 20,
  },
  monthYearText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    marginTop: 15,
  },
});

export default ActivityScreen;
