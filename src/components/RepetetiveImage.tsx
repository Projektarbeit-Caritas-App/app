import {getIcon} from "../services/image";
import {Image} from "native-base";
import React from "react";
import {Text} from "native-base";
import {StyleSheet} from "react-native";

const RepetetiveImage = (props: any) => {
    const cartItem = props.cartitem;
    const iconSource = getIcon(props.icon);
    let keyForLimitless = 0;

    const getKeyForLimitless = () =>
    {
        return keyForLimitless ++;
    }

    const renderImages = () => {
        let icons = [];

        //todo remove workarount
        let limit = props.data.limit;
        if(limit === 999) limit = null;

        for (let i = 1; i <= limit; i++) {
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
        if(limit === null)
        {
            icons.push(<Text key={getKeyForLimitless()}><Text style={style.used}>{props.data.used}</Text>{cartItem !== undefined? ( <Text style={style.new}>+{cartItem.amount}</Text>):null}</Text>)
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
        height: 20,
        marginRight: 7
    },
    iconUsed: {
        tintColor: '#ddd'
    },
    iconNew: {
        tintColor: 'rgb(25, 135, 84)'
    },
    used: {
        color: '#ddd'
    },
    new: {
        marginLeft: 10,
        color: 'rgb(25, 135, 84)'
    }
});

export default RepetetiveImage;
