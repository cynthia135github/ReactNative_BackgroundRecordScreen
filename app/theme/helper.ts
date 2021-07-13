import { Dimensions } from "react-native";

const widthDevice = Dimensions.get("window").width;
const heightDevice = Dimensions.get("window").height;

export class helper {

    static uriVideo : string;

    static getUriVideo(){
        return this.uriVideo
    }

    static screenRatio(sizeParam){
        let size = (sizeParam/360) * 100 * widthDevice;

        return size;
    }

    static screenVideoWidth(){
        let sizeWidth = widthDevice /1;

        return sizeWidth;
    }

    static screenVideoHeight(){
        let sizeHeight = heightDevice /2;

        return sizeHeight;
    }
}