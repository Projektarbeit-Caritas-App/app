import {getIcon} from "../services/image";
import {Image} from "native-base";
import React from "react";
import {StyleSheet} from "react-native";

const RepetetiveImage = (props: any) => {
    const cartItem = props.cartitem;
    const iconSource = getIcon(props.src);
    const renderImages = () => {
        let icons = [];
        for (let i = 1; i <= props.data.limit; i++) {
            if (i <= props.data.used) {
                icons.push(<Image key={i} source={iconSource} alt={props.name}
                                  style={[style.icon, style.iconUsed]} resizeMode="contain"></Image>);
            } else if (cartItem !== undefined && i <= cartItem.amount) {
                icons.push(<Image key={i} source={iconSource} alt={props.name} style={[style.icon, style.iconNew]}
                                  resizeMode="contain"></Image>);
            } else {
                icons.push(<Image key={i} source={iconSource} alt={props.name} style={style.icon}
                                  resizeMode="contain"></Image>)
            }
        }
        return icons;
    };
    return (
        <>
            {renderImages()}
        </>
    )
}

const style = StyleSheet.create({
    icon: {
        width: 20,
        height: 20
    },
    iconUsed: {
        tintColor: 'gray'
    },
    iconNew: {
        tintColor: 'green'
    }
});

export default RepetetiveImage;
