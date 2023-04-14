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
export default function ScanQrVerifyDonate({ route, navigation }) {
  console.log(route.params);
  const [data, setData] = useState(route.params.infoData);
  const [image, setImage] = useState(route.params.image);
  const [idsk, setIDSK] = useState(route.params.idsk);
  const [listLoaiTheTich, setListLoaiTheTich] = useState([]);
  const [theTich, setTheTich] = useState(null);
  const [phieuKetQua, setPhieuKetQua] = useState(null);
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
      if(phieuKetQua != null)
      {
        return;
      }
      let token = await AsyncStorage.getItem("token");
      token = "Bearer " + token;
      const config = {
        headers: { Authorization: token },
      };
      const res = await axios.patch(
        "http://localhost:44369/api/BacSiRules/VerifyBloodDonated",
        {
          uid: data.uid,
          iD_SK: idsk,
        },
        config
      );
      console.log(res.data.data);
      setPhieuKetQua(res.data.data.phieuKetQua);

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
          <View>
            <View style={{ alignItem: "center" }}>
              <Text
                style={{
                  fontSize: 20,
                  paddingLeft: 15,
                  textAlign: "center",
                  margin: 10,
                }}
              >
                Loại thể tích đăng ký: {data.loaiTheTich.tenLoai}
              </Text>
            </View>
          </View>
          <View style={{ alignItem: "center", justifyContent: "center" }}>
            
              <TouchableOpacity
              style={{
                margin: 5,
                backgroundColor: !phieuKetQua ? Colors.lightRed : "#50E3C2",
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
               {!phieuKetQua ? "Xác nhận hiến máu": "Xác nhận hiến máu thành công"}
              </Text>
            </TouchableOpacity>
            

            {phieuKetQua && (
              <View style={{ alignItems: "center", marginTop: 10 }}>
                <Text style={{ fontSize: 32, fontWeight: "bold" }}>
                  ID Phiếu kết quả: {phieuKetQua.iD_PKQ}
                </Text>
                <TouchableOpacity 
                style={{margin: 40, backgroundColor: Colors.lightRed,
                    height: 40,
                    width: 100,
                    justifyContent: 'center',
                    borderRadius: 30
                }}
                  onPress={() => {
                    navigation.navigate("ScanVerifyDonate");
                  }}
                >
                  <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>Trở về</Text>
                </TouchableOpacity>
              </View>
            )}
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
