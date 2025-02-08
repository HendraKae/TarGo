import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LineChart } from "react-native-chart-kit";
import { LinearGradient } from "expo-linear-gradient";
import { SvgXml } from "react-native-svg";

const Done = `<svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.25 6C0.25 2.82436 2.82436 0.25 6 0.25H16C19.1756 0.25 21.75 2.82436 21.75 6V16C21.75 19.1756 19.1756 21.75 16 21.75H6C2.82436 21.75 0.25 19.1756 0.25 16V6ZM7.96967 11.0303L9.96967 13.0303C10.2626 13.3232 10.7374 13.3232 11.0303 13.0303L15.0303 9.03033C15.3232 8.73744 15.3232 8.26256 15.0303 7.96967C14.7374 7.67678 14.2626 7.67678 13.9697 7.96967L10.5 11.4393L9.03033 9.96967C8.73744 9.67678 8.26256 9.67678 7.96967 9.96967C7.67678 10.2626 7.67678 10.7374 7.96967 11.0303Z" fill="#288dde"/>
</svg>
`;

const Fail = `<svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 0.25C2.82436 0.25 0.25 2.82436 0.25 6V16C0.25 19.1756 2.82436 21.75 6 21.75H16C19.1756 21.75 21.75 19.1756 21.75 16V6C21.75 2.82436 19.1756 0.25 16 0.25H6ZM13.6519 8.34858C13.9448 8.64147 13.9448 9.11634 13.6519 9.40924L12.0609 11.0002L13.6519 12.5913C13.9448 12.8841 13.9448 13.359 13.6519 13.6519C13.359 13.9448 12.8841 13.9448 12.5912 13.6519L11.0002 12.0609L9.40924 13.6519C9.11634 13.9448 8.64147 13.9448 8.34858 13.6519C8.05568 13.359 8.05568 12.8841 8.34858 12.5912L9.93955 11.0002L8.34858 9.40927C8.05568 9.11638 8.05568 8.64151 8.34858 8.34861C8.64147 8.05572 9.11634 8.05572 9.40924 8.34861L11.0002 9.93958L12.5912 8.34858C12.8841 8.05568 13.359 8.05568 13.6519 8.34858Z" fill="#288dde"/>
</svg>
`;

const Time = `<svg width="18" height="19" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.25 12C0.25 6.61522 4.61522 2.25 10 2.25C15.3848 2.25 19.75 6.61522 19.75 12C19.75 17.3848 15.3848 21.75 10 21.75C4.61522 21.75 0.25 17.3848 0.25 12ZM10.75 8C10.75 7.58579 10.4142 7.25 10 7.25C9.58579 7.25 9.25 7.58579 9.25 8V11.7324C9.25 12.1503 9.45888 12.5406 9.80662 12.7725L12.584 14.624C12.9286 14.8538 13.3943 14.7607 13.624 14.416C13.8538 14.0714 13.7607 13.6057 13.416 13.376L10.75 11.5986V8Z" fill="#288dde"/>
<path d="M15 1L19 4" stroke="#288dde" stroke-width="1.5" stroke-linecap="round"/>
<path d="M10 1L10 3" stroke="#288dde" stroke-width="1.5" stroke-linecap="round"/>
<path d="M15 20L16 22" stroke="#288dde" stroke-width="1.5" stroke-linecap="round"/>
<path d="M5 20L4 22" stroke="#288dde" stroke-width="1.5" stroke-linecap="round"/>
<path d="M5 1L1 4" stroke="#288dde" stroke-width="1.5" stroke-linecap="round"/>
</svg>
`;

const Process = `<svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.35523 0.577959C9.20212 0.36366 10.0883 0.25 11 0.25C11.9118 0.25 12.7981 0.363676 13.645 0.578005C14.3362 0.752915 14.6931 1.34983 14.8079 1.84603C14.9439 2.43381 15.3128 2.96329 15.8751 3.28798C16.3922 3.5865 16.9768 3.65663 17.5159 3.52952C18.0114 3.41269 18.7033 3.46835 19.1663 4.00871C20.0272 5.01337 20.7063 6.17937 21.1518 7.45569C21.4178 8.21767 21.0057 8.90381 20.5705 9.26236C20.0682 9.67623 19.75 10.3006 19.75 11C19.75 11.6994 20.0682 12.3238 20.5705 12.7376C21.0057 13.0962 21.4178 13.7823 21.1518 14.5443C20.7063 15.8205 20.0273 16.9864 19.1666 17.991C18.7035 18.5314 18.0116 18.587 17.516 18.4702C16.9768 18.343 16.3922 18.4131 15.8751 18.7117C15.3126 19.0364 14.9438 19.566 14.8078 20.1538C14.693 20.6501 14.3361 21.2471 13.6449 21.422C12.798 21.6363 11.9117 21.75 11 21.75C10.0884 21.75 9.20218 21.6363 8.35531 21.4221C7.66404 21.2471 7.30713 20.6501 7.19235 20.1538C7.05639 19.566 6.68751 19.0364 6.12506 18.7117C5.60795 18.4131 5.02329 18.343 4.48408 18.4702C3.98851 18.5871 3.29654 18.5314 2.83348 17.991C1.97275 16.9864 1.29376 15.8205 0.848236 14.5443C0.582222 13.7823 0.994377 13.0962 1.42955 12.7376C1.93186 12.3238 2.25005 11.6994 2.25005 11C2.25005 10.3006 1.93186 9.67622 1.42955 9.26235C0.994378 8.9038 0.582224 8.21766 0.848237 7.45567C1.29381 6.17934 1.9729 5.01334 2.83377 4.00867C3.2968 3.4683 3.98869 3.41265 4.48422 3.5295C5.02339 3.65664 5.60799 3.58651 6.12507 3.28798C6.68745 2.96329 7.05631 2.43379 7.19231 1.84601C7.30712 1.3498 7.66403 0.752863 8.35523 0.577959ZM11 14C9.34315 14 8 12.6569 8 11C8 9.34315 9.34315 8 11 8C12.6569 8 14 9.34315 14 11C14 12.6569 12.6569 14 11 14Z" fill="#288dde"/>
</svg>
`;

const Grafik = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0.25 6C0.25 2.82436 2.82436 0.25 6 0.25H16C19.1756 0.25 21.75 2.82436 21.75 6V16C21.75 19.1756 19.1756 21.75 16 21.75H6C2.82436 21.75 0.25 19.1756 0.25 16V6ZM6.25 16C6.25 16.4142 6.58579 16.75 7 16.75C7.41421 16.75 7.75 16.4142 7.75 16V13C7.75 12.5858 7.41421 12.25 7 12.25C6.58579 12.25 6.25 12.5858 6.25 13V16ZM11 16.75C10.5858 16.75 10.25 16.4142 10.25 16V6C10.25 5.58579 10.5858 5.25 11 5.25C11.4142 5.25 11.75 5.58579 11.75 6V16C11.75 16.4142 11.4142 16.75 11 16.75ZM14.25 16C14.25 16.4142 14.5858 16.75 15 16.75C15.4142 16.75 15.75 16.4142 15.75 16V9C15.75 8.58579 15.4142 8.25 15 8.25C14.5858 8.25 14.25 8.58579 14.25 9V16Z" fill="#288dde"/>
</svg>
`;

const HomeScreen = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const date = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      setCurrentDate(date.toLocaleDateString("id-ID", options));
    };
    updateDate();
    const intervalId = setInterval(updateDate, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const chartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 65, 50, 32, 70, 85, 60],
        color: (opacity = 1) => `rgba(34, 99, 255, 255)`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff", // Warna bebas, karena opacity 0
    backgroundGradientFromOpacity: 0, // Transparan
    backgroundGradientTo: "#fff", // Warna bebas, karena opacity 0
    backgroundGradientToOpacity: 0, // Transparan
    backgroundGradientToOpacity: 0,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(34, 99, 255, ${opacity})`, // Biru transparan
    labelColor: (opacity = 1) => `rgba(34, 99, 255, ${opacity})`,
    style: {
      fontFamily: "Poppins-Light",
    },
    propsForDots: {
      r: "3",
      strokeWidth: "0",
    },
  };

  // const dataHeight = chartData.datasets[0].data.length * 15;

  return (
    <View style={styles.HomeScreen}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="light-content"
      />

      <View style={styles.mainContent}>
        <LinearGradient
          colors={["#0c3981", "#3175e3"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.linearTop}
        >
          <View style={styles.wpTop}>
            <Text style={styles.nameUser}>Hai {/* nameuser */}User</Text>
            <Text style={styles.Date}>{currentDate}</Text>
          </View>
        </LinearGradient>
        <View style={styles.wpBottom}>
          <View style={styles.absoluteChart}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: -10,
                  paddingBottom: 10,
                }}
              >
                <SvgXml xml={Grafik} style={{ marginRight: 8 }} />
                <Text
                  style={{
                    fontFamily: "Poppins-Medium",
                    fontSize: 14,
                    color: "#0e4192",
                    marginTop: 3,
                  }}
                >
                  Aktivitas Terselesaikan
                </Text>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <LineChart
                  data={chartData}
                  width={chartData.labels.length * 50}
                  height={165}
                  chartConfig={{
                    ...chartConfig,
                    labelColor: () => "#2263FF",
                  }}
                  bezier
                  style={styles.Chart}
                />
              </ScrollView>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.wpBox}>
              <LinearGradient
                colors={["#fff", "#fff"]} // Sama untuk semua status
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.boxW, styles.Done]}
              >
                <SvgXml xml={Done} style={styles.absoluteIconList} />
                <Text style={styles.TextBoxNumber}>5</Text>
                <Text style={styles.TextBox}>Terselesaikan</Text>
              </LinearGradient>
              <LinearGradient
                colors={["#fff", "#fff"]} // Sama untuk semua status
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.box}
              >
                <SvgXml xml={Fail} style={styles.absoluteIconList} />
                <Text style={styles.TextBoxNumber}>5</Text>
                <Text style={styles.TextBox}>Tertunda</Text>
              </LinearGradient>
            </View>
            <View style={styles.wpBox}>
              <LinearGradient
                colors={["#fff", "#fff"]} // Sama untuk semua status
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.box}
              >
                <SvgXml xml={Process} style={styles.absoluteIconList} />
                <Text style={styles.TextBoxNumber}>5</Text>
                <Text style={styles.TextBox}>Dikerjakan</Text>
              </LinearGradient>
              <LinearGradient
                colors={["#fff", "#fff"]} // Sama untuk semua status
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.boxW}
              >
                <SvgXml xml={Time} style={styles.absoluteIconList} />
                <Text style={styles.TextBoxNumber}>5</Text>
                <Text style={styles.TextBox}>Menunggu Jadwal</Text>
              </LinearGradient>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HomeScreen: {
    flex: 1,
    backgroundColor: "#f2fafe",
  },
  mainContent: {
    flex: 1,
  },
  Date: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    color: "#fff",
    marginTop: -5,
  },
  nameUser: {
    marginTop: -5,
    fontSize: 16,
    fontFamily: "Poppins-Light",
    color: "#fff",
  },
  wpTop: {
    marginBottom: 30,
  },
  wpBottom: {
    paddingHorizontal: 15,
    marginTop: 20,
    flex: 1,
  },
  linearTop: {
    paddingHorizontal: 12,
    paddingTop: 70,
    paddingBottom: 100,
  },
  Chart: {
    marginHorizontal: -38,
    backgroundColor: "white",
  },
  absoluteChart: {
    position: "absolute",
    left: 15,
    top: -130,
    borderRadius: 15,
    padding: 15,
    paddingTop: 20,
    backgroundColor: "white",
    elevation: 5, // For Android
    shadowColor: "gray", // For iOS
    shadowOffset: { width: 0, height: 2 }, // For iOS
    shadowOpacity: 0.3, // For iOS
    shadowRadius: 4, // For iOS
  },
  content: {
    paddingTop: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: "5%",
    paddingHorizontal: 10,
  },
  wpBox: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    gap: "5%",
  },
  boxW: {
    backgroundColor: "#fff",
    width: "100%",
    height: "50%",
    borderRadius: 14,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3, // For Android
    shadowColor: "gray", // For iOS
    shadowOffset: { width: 0, height: 2 }, // For iOS
    shadowOpacity: 0.3, // For iOS
    shadowRadius: 4, // For iOS
  },
  box: {
    backgroundColor: "#fff",
    width: "100%",
    height: "28%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    elevation: 3, // For Android
    shadowColor: "gray", // For iOS
    shadowOffset: { width: 0, height: 2 }, // For iOS
    shadowOpacity: 0.3, // For iOS
    shadowRadius: 4, // For iOS
    position: "relative",
  },
  TextBox: {
    color: "#0e4192",
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    textAlign: "center",
    width: "100",
    marginTop: "-2",
    lineHeight: "18",
  },
  TextBoxNumber: {
    color: "#0e4192",
    fontSize: 20,
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    width: "100",
  },
  Done: {
    backgroundColor: "#4CAF50",
  },
  absoluteIconList: {
    position: "absolute",
    top: "10",
    left: "10",
  },
});

export default HomeScreen;
