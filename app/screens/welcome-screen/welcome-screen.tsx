import React, { Component } from "react"
import { View, Image, ViewStyle, TextStyle, ImageStyle, SafeAreaView, ImageBackground, StyleSheet } from "react-native"
import { NavigationRouteContext, useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper, SimpleButton, SimpleInput } from "@components"
import { color, spacing, typography, helper } from "@theme"
import { useState, useEffect } from 'react';
import BackgroundTimer from 'react-native-background-timer'; // Background Timer
import { captureScreen } from "react-native-view-shot"; // Screenshot


export const LoginScreen = observer(function LoginScreen() {
  const navigation = useNavigation();
  var [username, setUsername] = useState("xxx@gmail.com");
  var [password, setPassword] = useState("123456");
  var [passwordToogle, setPasswordToogle] = useState(true);

  // Screenshot path
  const [imageURI, setImageURI] = useState(
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sample_img.png',
  );
  const [savedImagePath, setSavedImagePath] = useState('');

  //screenshot
  const takeScreenShot = () => {
    // To capture Screenshot
    captureScreen({
      // Either png or jpg (or webm Android Only), Defaults: png
      format: 'jpg',
      // Quality 0.0 - 1.0 (only available for jpg)
      quality: 0.8, 
    }).then(
      //callback function to get the result URL of the screnshot
      (uri) => {
        setSavedImagePath(uri);
        setImageURI(uri);
        console.log("screenshot: " + uri);
        return uri;
      },
      (error) => console.error('Oops, Something Went Wrong', error),
    );
  };

  //Constructor
  useEffect(() => {
    // BackgroundTimer.runBackgroundTimer(() => {
    //   //setiap 3 seconds 
    //   takeScreenShot();
    //   //console.log('Timer');
    // },
    //   10000);

    //BackgroundTimer.stopBackgroundTimer(); //after this call all code on background stop run.

  });

  const pressLogin = () => navigation.navigate("cobarecord");

  const pressForgotPassword = () => {

  }

  const pressDaftarAkun = () => navigation.navigate("demo");

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./background.png')}
        style={styles.bgImage}
      >

        <View style={{ marginTop: 75, justifyContent: 'flex-start', paddingLeft: 20 }}>
          <Text style={{ fontSize: 35, color: '#fefdfa', fontWeight: 'bold' }}>Masuk ke</Text>
          <Text style={{ fontSize: 35, color: '#fefdfa', fontWeight: 'bold' }}> Aplikasi</Text>
        </View>

        <View style={styles.cardLogin}>
          <View style={{ height: 40 }}></View>
          <SimpleInput
            icon={"envelope"}
            placeholder={"Alamat Email"}
            keyboardType={"email-address"}
            value={username}
            onChangeText={(values) => setUsername(values)}
          />
          <View style={{ height: 40 }}></View>
          <SimpleInput
            icon={"lock"}
            placeholder={"Kata Sandi"}
            isPassword={true}
            secure={passwordToogle}
            value={password}
            onTooglePassword={() => setPasswordToogle(!passwordToogle)}
            onChangeText={(values) => setPassword(values)}
          />
          <View style={{ height: 40 }}></View>
          <SimpleButton
            text='Masuk'
            onPress={() => pressLogin()}
          />
          <Text style={styles.forgotPassword} onPress={() => pressForgotPassword()} >Lupa Kata Sandi?</Text>
          <Text style={{ marginTop: 22, fontSize: 18, color: color.storybookTextColor }}>Belum punya akun? Daftar <Text style={styles.forgotPassword} onPress={() => pressDaftarAkun()}>di sini</Text></Text>
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
    height: 540,
    marginTop: 80,
    alignItems: "center"
  },

  bgImage: {
    width: '100%',
    height: '100%',
    margin: 0,
    resizeMode: 'cover',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },

  forgotPassword: {
    textDecorationLine: 'underline',
    color: '#8B008B',
    fontSize: 18,
    marginTop: 15
  },


});

function componentDidMount() {
  throw new Error("Function not implemented.")
}
