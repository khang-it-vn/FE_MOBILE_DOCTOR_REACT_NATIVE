import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  AsyncStorage,
  Alert,
  TextInput
} from "react-native";
import { styles } from "./Styles";
import MyHeader from "../../components/MyHeader";
import { useTheme } from "@react-navigation/native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Surface } from "react-native-paper";
import Colors from "../../constants/Colors";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Action = ({ icon, title, screen, navigation, dataSend }) => {
  return (
    <View style={styles.action}>
      <TouchableOpacity
        onPress={() => {
          if(screen === 'NavScan' )
          {
              if(dataSend == null)
              {
                Alert.alert("System Bloodbank", "Bạn cần nhập ID sự kiện trước",[{
                  text: 'OK'
                }])
                return;
              }
          }
          navigation.navigate(screen);
        }}
      >
        <View style={styles.iconContainer}>
          <View style={styles.iconStyle}>
            <MaterialIcons name={icon} size={22} color={Colors.white} />
          </View>
          <View style={styles.viewTitle}>
            <Text style={styles.actionTitle}>{title}</Text>
          </View>
          <Icon
            style={styles.iconRight}
            color={Colors.black}
            size={22}
            name={"chevron-right"}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default function Home({ route, navigation }) {
  const [data, setData] = useState(null);
  const [idsk, setIDSK] = useState(null);
  const getData = async () => {
    try {
      let token = await AsyncStorage.getItem("token");
      token = "Bearer " + token;
      const config = {
        headers: { Authorization: token },
      };

      const res = await axios.get(
        "http://localhost:44369/api/BacSiRules/GetInfoBacSi",
        config
      );
      console.log(res.data);
      setData(res.data.data);
    } catch (error) {}
  };
  const funcSetIDSK = (value) => {
    global.idsk = value
    setIDSK(value);
  } 
  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <MyHeader
        back
        onPressBack={() => navigation.goBack()}
        title={route.name}
        right="more-vertical"
        onRightPress={() => console.log("right")}
      />
      <ScrollView
        showVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 29 }}
      >
        <Surface style={styles.avaInfo}>
          <View style={styles.profileInfos}>
            <Text style={styles.name}>{data && data.hoTen}</Text>
          </View>
          <View style={styles.profileInfos}>
          
           <TextInput onChangeText={funcSetIDSK} style={{borderWidth:0.5, width:190, paddingLeft: 10, fontSize: 18}} placeholder={"nhập ID sự kiện"}/>
          </View>
          
        </Surface>

        <View style={styles.action}>
          <Action
            title={"Xác nhận sức khỏe (sự kiện)"}
            icon={"qr-code-scanner"}
            navigation={navigation}
            screen="NavScan"
            dataSend={idsk}
          />
          <Action
            title={"Xác nhận hiến máu (sự kiện)"}
            icon={"domain-verification"}
            navigation={navigation}
            screen="NavScan2"
            dataSend={idsk}
            />
          <Action
          title={"Xác nhận sức khỏe"}
          icon={"qr-code-scanner"}
          navigation={navigation}
          screen="NavScan3"
        />
        <Action
          title={"Xác nhận hiến máu"}
          icon={"domain-verification"}
          navigation={navigation}
          screen="NavScan4"
        />
        <Action
          title={"Xác nhận nhận quà"}
          icon={"domain-verification"}
          navigation={navigation}
          screen="NavScan5"
        />

          <Action
            title={"Đăng xuất"}
            icon={"logout"}
            navigation={navigation}
            screen="logout"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
