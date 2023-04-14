import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, AsyncStorage, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";

export default function OnScan({ route, navigation }) {
  console.log(global.idsk);
  const [hasPermission, setHasPermission] = React.useState(false);
  const [scanData, setScanData] = React.useState();
  const [data, setData] = useState(null);
  const [titleStateScandata, setTitleStateScanData] = useState("Đang kiểm tra thông tin");
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  const getDataOfNHM = async (data) => {
    try {
      let token = await AsyncStorage.getItem("token");
      token = "Bearer " + token;
      const config = {
        headers: { Authorization: token },
      };
      console.log("http://localhost:44369/api/BacSiRules/GetVerifyHealth?uid="+data);
      const res_info_data = await axios.get(
        "http://localhost:44369/api/BacSiRules/GetVerifyHealth?uid="+data,
        config
      ).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          if(error.response.status == 404)
          {
            setTitleStateScanData("Không tìm thấy dữ liệu người dùng đã có xác nhận sức khỏe\n Bạn có muốn Scan lại không?")
          }
          console.log(error.response.headers);
        }
      });
      ;
    console.log(res_info_data);
    console.log(res_info_data.data);
    if(res_info_data.data[0].success == false || !res_info_data.data )
    {
      setTitleStateScanData("Không tìm thấy xác nhận sức khỏe này");
      return;
    }
    setTitleStateScanData("Scan mới")
     navigation.navigate("AfterScanQr", {
        infoData:res_info_data.data[0].data,
        image: res_info_data.data[1]
     })
    } catch (error) {
      console.log(error.message);
     
    }
  };
  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text>Please grant camera permissions to app.</Text>
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    
    getDataOfNHM(data);
    setScanData(true);
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        style={StyleSheet.absoluteFillObject}
        onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
      />
      {scanData && (
        <Button title={titleStateScandata} onPress={() => {
          setScanData(undefined)
          setTitleStateScanData("Đang kiểm tra thông tin");
        }} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
