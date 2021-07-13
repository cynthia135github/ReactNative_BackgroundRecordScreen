import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { color, styles } from "@theme";

export interface SimpleButtonProps {
    text?: string
    size?: string
    onPress?: any
  }

  export function SimpleButton(props: SimpleButtonProps) {
    return(
        <TouchableOpacity
            onPress={props.onPress}
            style={[{
                height:40,
                width:300,
                marginTop:20,
                alignItems: "center",
                backgroundColor: '#8B008B',
                borderRadius: 10,
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
            },  
            (props.size == "medium") && { width:280 },
            (props.size == "huge") && { width: 320 },
        ]}  
        >
            <Text style={{fontSize: 14, color: '#fefdfa', fontWeight: 'bold'}}>{props.text}</Text>

        </TouchableOpacity>
    )
}