import {getIcon} from "../services/image";
import {Image} from "native-base";
import React from "react";
import {StyleSheet, Text} from "react-native";

const RepetetiveImage = (props: any) => {
    const cartItem = props.cartitem;
    const iconSource = getIcon(props.src);
    let keyForLimitless = 0;

    const getKeyForLimitless = () =>
    {
        return keyForLimitless ++;
    }

    const renderImages = () => {
        let icons = [];
        console.log('cartItem'); //todo: Debug entfernen
        console.log(cartItem); //todo: Debug entfernen
        for (let i = 1; i <= props.data.limit; i++) {
            if (i <= props.data.used) {
                icons.push(<Image key={i} source={iconSource} alt={props.name}
                                  style={[style.icon, style.iconUsed]} resizeMode="contain"></Image>);
            } else if (cartItem !== undefined && i <= cartItem.amount + props.data.used) {
                icons.push(<Image key={i} source={iconSource} alt={props.name} style={[style.icon, style.iconNew]}
                                  resizeMode="contain"></Image>);
            } else {
                icons.push(<Image key={i} source={iconSource} alt={props.name} style={style.icon}
                                  resizeMode="contain"></Image>)
            }
        }
        if(props.data.limit === null)
        {
            icons.push(<Text key={getKeyForLimitless()}>{props.data.used}{cartItem !== undefined? (<Text> / {cartItem.amount}</Text>):null}</Text>)
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
