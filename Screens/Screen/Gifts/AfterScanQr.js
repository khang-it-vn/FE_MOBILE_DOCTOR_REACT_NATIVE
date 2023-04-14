import {
  StyleSheet,
  Text,
  View,
  Button,
  AsyncStorage,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import Colors from "../../constants/Colors";
import React, { useEffect, useState } from "react";
import MyHeader from "../../components/MyHeader";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
export default function AfterScanQr({ route, navigation }) {
  console.log(route.params);
  const [data, setData] = useState(route.params.infoData);
  const [image, setImage] = useState(route.params.image);
  console.log(route.params);

  return (
    <View style={styles.container}>
      <View>
        <View>
          <MyHeader back title={"Xác nhận nhận quà"} />
        </View>
        <View style={styles.camScanComp}>
          <Image
            style={{ width: 170, height: 170 }}
            source={{ uri: "data:image/png;base64," + image }}
          />
        </View>

        <View>
          <View style={styles.nameComp}>
            <Text style={styles.name}>{data.nguoiHienMau.hoTen}</Text>
          </View>
          <View style={[styles.nameComp],{textDecoration:'none'}}
          
          >
            <Text style={styles.dc}>Email: {data.nguoiHienMau.email}</Text>
          </View>
          <View style={styles.nameComp}>
            <Text style={styles.dc}>Địa chỉ: {data.nguoiHienMau.dc}</Text>
          </View>
          <View>
            <View style={{ alignItem: "center" }}>
              <Text
                style={{
                  fontSize: 20,
                  paddingLeft: 15,
                  textAlign: "center",
                  margin: 10,
                  fontWeight:'bold'
                }}
              >
                Trạng thái: Đã hiến máu thành công
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camScanComp: {
    width: 450,
    marginTop: 10,
    marginLeft: 120,
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  nameComp: {
    margin: 5,
  },
  submit: {
    height: 100,
    margin: 5,
  },
  openqr: {
    backgroundColor: Colors.lightRed,
    width: 200,
    height: 200,
    borderRadius: 300,
    alignItem: "center",
    justifyContent: "center",
    marginLeft: 115,
  },
  dc: {
    fontSize: 20,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  titleScan: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
