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
export default function ScanQrVerifyDefaultDonate({ route, navigation }) {
  console.log(route.params);
  const [data, setData] = useState(route.params.infoData);
  const [image, setImage] = useState(route.params.image);
  const [listLoaiTheTich, setListLoaiTheTich] = useState([]);
  const [theTich, setTheTich] = useState(null);
  const [loaiMau, setLoaiMau] = useState(route.params.loaiMau)
  console.log(route.params);

  useEffect(() => {
    (async () => {
      try {
        let token = await AsyncStorage.getItem("token");
        token = "Bearer " + token;
        const config = {
          headers: { Authorization: token },
        };
        const res = await axios.get(
          "http://localhost:44369/api/LoaiTheTich",
          config
        );
        setListLoaiTheTich(res.data.data);
        console.log(listLoaiTheTich);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  const handleVerifyHealth = async () => {
    try {
      if (theTich == null) {
        Alert.alert(
          "System BloodBank",
          "Bạn cần chọn thể tích trước khi xác nhận sức khỏe"
        );
        return;
      }
      let token = await AsyncStorage.getItem("token");
      token = "Bearer " + token;
      const config = {
        headers: { Authorization: token },
      };
      const res = await axios.patch(
        "http://localhost:44369/api/BacSiRules/VerifyHealthDefault",
        {
          uid: data.uid,
          iD_DC: data.iD_DC,
          ngayHenHien: data.ngayHenHien,
          iD_LTT: theTich,
        },
        config
      );
      console.log(res.data);
      if (res.data.success) {
        Alert.alert("System BloodBank", "Xác nhận sức khỏe thành công", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("ScanVerifyDefaultDonate");
            },
          },
        ]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <View>
          <MyHeader back title={"Xác nhận sức khỏe"} />
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
          <View style={styles.nameComp}>
            <Text style={styles.dc}>Địa chỉ: {data.nguoiHienMau.dc}</Text>
          </View>
          <View style={styles.nameComp}>
            <Text style={styles.name}>Nhóm máu: {loaiMau != null ? loaiMau.tenLoai : "Chưa xác định nhóm máu"}</Text>
          </View>
          <View>
            <SelectDropdown
              buttonStyle={{
                backgroundColor: "white",
                width: "98%",
                borderWidth: 1,
                margin: 5,
              }}
              buttonTextStyle={{ fontSize: 20 }}
              data={listLoaiTheTich}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem.iD_LTT);
                setTheTich(selectedItem.iD_LTT);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem.tenLoai;
              }}
              defaultValueByIndex={data ? data.iD_LTT : -1}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item.tenLoai;
              }}
            />
          </View>
          <View style={{ alignItem: "center", justifyContent: "center" }}>
            <TouchableOpacity
              style={{
                margin: 5,
                backgroundColor: Colors.lightRed,
                padding: 5,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
                onPress={handleVerifyHealth}
              >
                Xác nhận sức khỏe
              </Text>
            </TouchableOpacity>
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
