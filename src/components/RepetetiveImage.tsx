import {getIcon} from "../services/image";
import {Image} from "native-base";
import React, {useState} from "react";
import {Text} from "native-base";
import {StyleSheet, View} from "react-native";

const RepetetiveImage = (props: any) => {
    const cartItem = props.cartitem;
    let iconSource = getIcon(props.icon);
    let keyForLimitless = 0;

    const getKeyForLimitless = () =>
    {
        return keyForLimitless ++;
    }

    const renderImages = () => {
        let icons = [];

        let limit = props.data.limit;
        for (let i = 1; i <= limit; i++) {
            if (i <= props.data.used) {
                icons.push(<View key={i}>
                    <Image key={i} source={iconSource} alt={props.name}
                                  style={[style.icon, style.iconUsed]} resizeMode="contain"></Image>
                </View>);
            } else if (cartItem !== undefined && i <= cartItem.amount + props.data.used) {
                icons.push(<View key={i}>
                    <Image key={i} source={iconSource} alt={props.name} style={[style.icon, style.iconNew]}
                           resizeMode="contain"></Image>
                </View>);
            } else {
                icons.push(<View key={i}><Image key={i} source={iconSource} alt={props.name} style={style.icon}
                                                resizeMode="contain"></Image></View>)
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
        marginHorizontal: 2,
    },
    iconUsed: {
        tintColor: '#ddd'
    },
    iconNew: {
        tintColor: '#198754FF'
    },
    used: {
        color: '#ddd'
    },
    new: {
        marginLeft: 10,
        color: '#198754FF'
    }
});

export default React.memo(RepetetiveImage);
