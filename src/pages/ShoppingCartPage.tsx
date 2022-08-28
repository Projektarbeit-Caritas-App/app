import {Pressable, Text} from "native-base";
import {useSelector} from "react-redux";
import React, {useState} from "react";
import {LineItem} from "../redux/data/models";
import {SafeAreaView, SectionList, StyleSheet, View} from "react-native";
import RepetetiveImage from "../components/RepetetiveImage";

const ShoppingCartPage = () => {
    const state = useSelector((state: any) => state);
    const [lineItems, setLineItems] = useState<LineItem[] | []>(state.lineItemReducer);
    console.log(lineItems); //todo: Debug entfernen


    // @ts-ignore
    const Item = ({data, section}) => {
        console.log('data'); //todo: Debug entfernen
        console.log(data); //todo: Debug entfernen
        return (
            <View style={style.item}>
                <View style={style.inline}>
                    <Text style={[style.actionsText, style.typeText]}>{data.product_type.name}</Text>
                    <View style={style.actions}>
                        <Text style={style.actionsText}>
                            <RepetetiveImage src={data.product_type.icon}
                                             name={data.product_type.name} data={data}
                                             section={section}
                                             cartitem={data}></RepetetiveImage></Text>
                    </View>
                </View>
            </View>
        )
    };

    return (
        <View style={style.container}>
            <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium consequatur consequuntur
                delectus enim explicabo facilis fuga quidem rem ullam voluptate. Dicta eos esse iusto laudantium non
                officia quae quam similique.</Text>
            <View>
                <SafeAreaView>
                    <SectionList
                        sections={lineItems}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({item, index, section}) => <Item data={item} section={section}/>}
                        renderSectionHeader={({section: {personInfos}}) => (
                            <Text style={style.heading}>{personInfos}</Text>
                        )}
                    />
                </SafeAreaView>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    heading: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: '#fff',
        fontWeight: '600',
        fontSize: 18,
        marginTop: 10,
        padding: 10
    },
    container: {
        width: '100%'
    },
    inline: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    item: {
        backgroundColor: '#fff',
        padding: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    actionsText: {
        fontSize: 20,
        lineHeight: 20,
        paddingVertical: 5,
        paddingHorizontal: 8,
    },
    typeText: {
        minWidth: 200
    },
    actions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: '#ccc',
    }
});

export default ShoppingCartPage;
