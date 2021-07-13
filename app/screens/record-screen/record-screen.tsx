import React, { useCallback, useMemo } from "react"
import { View, ImageBackground, StyleSheet, Alert, PermissionsAndroid, Platform } from "react-native"
import { NavigationRouteContext, useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, Wallpaper, SimpleButton, SimpleInput } from "@components"
import { color, spacing, typography, helper, global } from "@theme"
import { useState, useEffect } from 'react';
import RecordScreen from 'react-native-record-screen'; //Screen Recorder 
import Video from 'react-native-video';
import CameraRoll from '@react-native-community/cameraroll'; //SAVE TO GALLERY
import RNFetchBlob from 'rn-fetch-blob'; //SAVE TO GALLERY
import * as RNFS from 'react-native-fs'; //LOCAL STORAGE MOVE FILE To Gallery
import BackgroundTimer from 'react-native-background-timer'; // Background Timer

export const RecordingsScreen = observer(function RecordingsScreen() {
    const navigation = useNavigation()
    const goBack = () => navigation.goBack()

    //UTK SCREEN RECORDING
    const [uri, setUri] = useState<string>('');
    const [recording, setRecording] = useState<boolean>(false);

    //FOR LOCAL STORAGE
    var RNFS = require('react-native-fs');

    //SAVE TO GALLERY :: PERIMISSION
    const getPermissionAndroid = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'Download Permission',
                    message: 'Your permission is required to save images or videos to your device',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            }
            Alert.alert(
                'Save Image or Videos',
                'Grant Me Permission to save Image or Videos',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        } catch (err) {
            Alert.alert(
                'Save Image or Videos',
                'Failed to save Image or Videos: ' + err.message,
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
                { cancelable: false },
            );
        }
    };

    //SAVE TO GALLERY
    const handleDownload = async () => {
        // if device is android you have to ensure you have permission
        if (Platform.OS === 'android') {
            const granted = await getPermissionAndroid();
            if (!granted) {
                return;
            }
        }

        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'mp4',
        })
            .fetch('GET', uri)
            .then(res => {
                console.log('Berhasil simpan record: ' + uri);
            });
    }

    //Constructor
    useEffect(() => {
       setRecording(global.statusrecord);
        
        if (helper.uriVideo != null) {
            setUri(helper.uriVideo);
            console.log('UriVideo di UseEffect: ' + helper.uriVideo);
        }
    });

    const copyFile = (uri, destPath) => {
        RNFS.copyFile(uri, destPath)
            .then(res => { console.log('jalan') })
            .catch(err => {
                console.log('ERROR: save video failed!!!');
                console.log(err.message, err.code);
            });
        //ISI ke global variabel
        //helper.uriVideo = res.result.outputURL; 
        //console.log(helper.uriVideo);
    }

    const recordMulai = async () => {
        setUri('');
        setRecording(true);
        await RecordScreen.startRecording({ mic: false }).catch((error) => {
            console.warn(error);
            setRecording(false);
            setUri('');
        });
    }

    const recordStop = async () => {
        const res = await RecordScreen.stopRecording().catch((error) =>
            console.warn(error)
        );
        console.log('res', res);
        if (res) {
            //setUri(res.result.outputURL); //klo ambil uri nya dri setstate ini dia bug jdi yg di copyFile sblmnya krn function setUri ini jalannya stlh function pressRecord
            var uriRecord = res.result.outputURL;
            console.log('outputURL:' + res.result.outputURL);
            //handleDownload();
            var randomNum = Math.floor(Math.random() * 1000) + 1;
            var namafile = new Date().getTime() + "_" + randomNum.toString();
            var destPath = '/storage/emulated/0/DCIM/ConnexProject/' + namafile + '.mp4';
            //MOVE FILE VIDEO SCREEN RECORD TO GALLERY
            RNFS.mkdir('/storage/emulated/0/DCIM/ConnexProject');
            copyFile(uriRecord, destPath);
            //setTimeout(() => copyFile(uriRecord, destPath), 10000);
        }
    }

    //SCREEN RECORDING PAKE BACKGROUND TIMER
    const pressRecord = async () => {
        if (recording) {
            global.statusrecord = false;
            setRecording(false);
            BackgroundTimer.stopBackgroundTimer();
            recordStop();

        } else {
            global.statusrecord = true;
            recordMulai();
            BackgroundTimer.runBackgroundTimer(() => {
                //setiap 5 menit 
                recordStop().then(() => {
                    console.log('Timer Record Upload');
                    recordMulai();
                });
            },
                300000);

        }
    }

    //SCREEN RECORDING BIASA START STOP PAKE BUTTON
    /*const pressRecord = async () => {
        if (recording) {
            setRecording(false);
            const res = await RecordScreen.stopRecording().catch((error) =>
                console.warn(error)
            );
            console.log('res', res);
            if (res) {
                //setUri(res.result.outputURL); //klo ambil uri nya dri setstate ini dia bug jdi yg di copyFile sblmnya krn function setUri ini jalannya stlh function pressRecord
                var uriRecord = res.result.outputURL;
                console.log('outputURL:' + res.result.outputURL);
                //handleDownload();
                var randomNum = Math.floor(Math.random() * 1000) + 1;
                var namafile = new Date().getTime() + "_" + randomNum.toString();
                var destPath = '/storage/emulated/0/DCIM/ConnexProject/' + namafile + '.mp4';
                //MOVE FILE VIDEO SCREEN RECORD TO GALLERY
                RNFS.mkdir('/storage/emulated/0/DCIM/ConnexProject');
                copyFile(uriRecord, destPath);
                //setTimeout(() => copyFile(uriRecord, destPath), 10000);
            }
        } else {
            setUri('');
            setRecording(true);
            await RecordScreen.startRecording({ mic: false }).catch((error) => {
                console.warn(error);
                setRecording(false);
                setUri('');
            });
        }
        
    }*/

    //SCREEN RECORDING
    const _handleOnCleanSandbox = useCallback(() => {
        RecordScreen.clean();
    }, []);

    //BLM KEPAKE
    const btnStyle = useMemo(() => {
        return recording ? styles.btnActive : styles.btnDefault;
    }, [recording]);


    const pressDaftarAkun = () => navigation.navigate("demo");

    const uploadToLocalSorage = () => {

    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('./background.png')}
                style={styles.bgImage}
            >
                <View style={styles.card}>
                    <SimpleButton onPress={goBack} text="Back" />

                    {recording ? (
                        <View style={styles.recordingMark}>
                            <Text style={styles.recordingMarkText}>Recording</Text>
                        </View>
                    ) : (
                        <View>
                            <SimpleButton onPress={_handleOnCleanSandbox} text="Clean Sandbox" />
                        </View>
                    )}

                    {recording ?
                        (<SimpleButton
                            text='Stop Record'
                            onPress={() => pressRecord()}
                        />)
                        : (<SimpleButton
                            text='Record'
                            onPress={() => pressRecord()}
                        />)
                    }
                    {uri ? (
                        <View style={styles.preview}>
                            <Video
                                source={{
                                    uri,
                                }}
                                style={styles.video}
                            />
                        </View>
                    ) : null}
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

    card: {
        backgroundColor: "#fefdfa",
        borderRadius: 25,
        height: 200,
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
        bottom: 0,
        left: 0,
        right: 0
    },

    preview: {
        marginTop: 200,
        marginLeft: 5,
        marginRight: 5,
        bottom: 116,
        width: helper.screenVideoWidth(),
        height: helper.screenVideoHeight(),
        zIndex: 1,
        padding: 6,
        backgroundColor: '#fefdfa',
    },
    video: {
        flex: 1,
    },

    recordingMark: {
        backgroundColor: 'red',
        paddingVertical: 6,
        paddingHorizontal: 16,
        marginBottom: 10,
        borderRadius: 24,
        marginTop: 10
    },

    recordingMarkText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff'
    },

    btnDefault: {
        backgroundColor: '#fff'
    },

    btnActive: {
        backgroundColor: 'red',
    },

});

function componentDidMount() {
    throw new Error("Function not implemented.")
}
