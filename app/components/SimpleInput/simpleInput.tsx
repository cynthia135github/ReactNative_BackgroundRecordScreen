import { color } from "@theme";
import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
// import { Icon } from 'react-native-vector-icons/dist/FontAwesome';
import { Icon } from 'react-native-elements';

export interface SimpleInputProps {
    icon?: string
    placeholder?: string
    isPassword?: boolean
    size?: string
    keyboardType?: string
    secure?: boolean
    value?: string
    onTooglePassword?: any
    onChangeText?: any
  }

export function SimpleInput(props: SimpleInputProps) {
    return (
        <View
          style={[
            {
              width: 300,
              height: 40,
              marginTop:20,
              backgroundColor: '#F5F5F5',
              borderRadius: 10,
              paddingLeft: 20,
              paddingRight: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",

            },
            (props.size == "medium") && { width: 280 },
            (props.size == "big") && { width: 280, height: 120 },
          ]}
        >
          {(props.size != "big") && <Icon name={props.icon} type='font-awesome' color={color.mygrey}/>}
    
          <TextInput
            style={[
              {
                width: 230,
                color: '#000000',
              },
              (props.size == "medium") && { width: 220 },
              (props.size == "big") && { width:280, height:120, textAlignVertical: "top" },
              (props.isPassword == true) && { width:190 },
            ]}
            placeholderTextColor={'#808080'}
            placeholder={props.placeholder}
            keyboardType={props.keyboardType == 'email-address'
                          ? 'email-address'
                          : props.keyboardType == 'numeric'
                                ? 'numeric'
                                : 'default'
                         }
            secureTextEntry={props.secure}
            value={props.value}
            onChangeText={props.onChangeText}
            multiline={(props.size == "big") ? true : false}
          />
    
          {(props.isPassword == true) &&
            <TouchableOpacity onPress={props.onTooglePassword}>
              <Icon name={props.secure == true ? 'eye-slash' : 'eye'} type='font-awesome'color='#808080'/>
            </TouchableOpacity>
          }
        </View>
      )
}

