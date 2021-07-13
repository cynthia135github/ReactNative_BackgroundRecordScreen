import React from "react"
import { Image, Picker, ImageStyle, Platform, TextStyle, View, ImageBackground, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { BulletItem, Button, Header, Text, SimpleInput, SimpleButton } from "@components"
import { color, spacing } from "@theme"
import { Api } from "../../services/api"
import { save } from "../../utils/storage"
import { useState, useEffect } from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
export const logoIgnite = require("./logo-ignite.png")
export const heart = require("./heart.png")

const radioButtonsData: RadioButtonProps[] = [{
  id: '1', // acts as primary key, should be unique and non-empty string
  label: 'Pria',
  value: 'Pria'
}, {
  id: '2',
  label: 'Wanita',
  value: 'Wanita'
}]

export const DaftarAkun = observer(function DaftarAkun() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  var [name, setname] = useState("Joe");
  var [password, setPassword] = useState("123456");
  var [confirmpassword, setConfirmPassword] = useState("123456");
  var [username, setUsername] = useState("xxx@gmail.com");
  var [phonenumber, setPhoneNum] = useState("0812345678");
  var [passwordToogle, setPasswordToogle] = useState(true);
  var [passwordToogle2, setPasswordToogle2] = useState(true);

  const [selectedValue, setSelectedValue] = useState("Negara");
  const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>(radioButtonsData)

  //Constructor
  useEffect(() => {

  });

  const goToLogin = () => navigation.navigate("welcome");

  const pressDaftar = () => {

  }

  const onPressRadioButton = (radioButtonsArray: RadioButtonProps[]) => {
    setRadioButtons(radioButtonsArray);
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./background.png')}
        style={styles.bgImage}
      >

        <View style={{ marginTop: 50, justifyContent: 'flex-start', paddingLeft: 20 }}>
          <Text style={{ fontSize: 35, color: '#fefdfa', fontWeight: 'bold' }}>Mendaftar</Text>
          <Text style={{ fontSize: 35, color: '#fefdfa', fontWeight: 'bold' }}> Akun Baru</Text>
        </View>

        <View style={styles.cardLogin}>
          <View style={{ height: 5 }}></View>
          <SimpleInput
            icon={"user-circle"}
            placeholder={"Nama Lengkap"}
            keyboardType={"default"}
            value={name}
            onChangeText={(values) => setname(values)}
          />
          <View style={{ height: 10 }}></View>
          <SimpleInput
            icon={"lock"}
            placeholder={"Kata Sandi"}
            isPassword={true}
            secure={passwordToogle}
            value={password}
            onTooglePassword={() => setPasswordToogle(!passwordToogle)}
            onChangeText={(values) => setPassword(values)}
          />
          <View style={{ height: 10 }}></View>
          <SimpleInput
            icon={"lock"}
            placeholder={"Konfirmasi Kata Sandi"}
            isPassword={true}
            secure={passwordToogle2}
            value={confirmpassword}
            onTooglePassword={() => setPasswordToogle2(!passwordToogle2)}
            onChangeText={(values) => setConfirmPassword(values)}
          />
          <View style={{ height: 10 }}></View>
          <SimpleInput
            icon={"envelope"}
            placeholder={"Alamat Email"}
            keyboardType={"email-address"}
            value={username}
            onChangeText={(values) => setUsername(values)}
          />
          <View style={{ height: 10 }}></View>
          <SimpleInput
            icon={"mobile"}
            placeholder={"Nomor Handphone"}
            keyboardType={"numeric"}
            value={phonenumber}
            onChangeText={(values) => setPhoneNum(values)}
          />
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="Indonesia" value="Indonesia" />
            <Picker.Item label="Amerika" value="Amerika" />
          </Picker>
          <View style={{ height: 10 }}></View>
          <Text style={styles.gender}>Jenis Kelamin</Text>
          <View style={{ height: 10 }}></View>
          <RadioGroup
            radioButtons={radioButtons}
            layout='row'
            onPress={onPressRadioButton}
          />
          <View style={{ height: 10 }}></View>
          <SimpleButton
            text='Daftar'
            onPress={() => pressDaftar()}
          />
          <Text style={{ marginTop: 22, fontSize: 18, color: color.storybookTextColor }}>Sudah mempunyai akun? <Text style={styles.forgotPassword} onPress={() => goToLogin()}>Masuk sekarang</Text></Text>
        </View>

      </ImageBackground>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#d1ded8',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },

  cardLogin: {
    backgroundColor: "#fefdfa",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 605,
    marginTop: 15,
    marginBottom: 0,
    alignItems: "center"
  },

  bgImage: {
    width: '100%',
    height: '100%',
    margin: 0,
    resizeMode: 'cover',
    position: "absolute"
  },

  forgotPassword: {
    textDecorationLine: 'underline',
    color: '#8B008B',
    fontSize: 18,
    marginTop: 15
  },

  containerItem: {
    margin: 0
  },

  gender: {
    fontSize: 15,
    marginLeft: -188,
    color: color.storybookTextColor,
    fontWeight: 'bold'
  }
});