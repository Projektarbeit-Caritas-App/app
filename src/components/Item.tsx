import {Card, CartView, LimitationState, LineItem, Person} from "../redux/data/models";
import React, {useEffect, useState} from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import {Pressable, Text} from "native-base";
import RepetetiveImage from "./RepetetiveImage";
import {useDispatch, useSelector} from "react-redux";
import {dispatchCartView, dispatchSetLineItems} from "../redux/data/dispatcher";

const Item = ({
                  limitation,
                  index,
                  personIndex,
                  persons,
                  card
              }: { limitation: LimitationState, index: number, personIndex: number, persons: Person[], card: Card }) => {
    const state = useSelector(({nonPersistantReducer}: any) => nonPersistantReducer);

    const [lineItems, setLineItems] = useState<LineItem[] | []>(state.lineItemReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        let cartView: CartView = {card: card, persons: []};
        if (lineItems.length > 0) {
            persons.forEach((person: any) => {
                let items = lineItems.filter((lineItem) => lineItem.person_id === person.id);
                if (items.length > 0) {
                    let personCopy: Person = Object.assign({}, person);
                    personCopy.data = [];
                    items.forEach((item) => {
                        let belongingLimitation = person.limitation_states.find((limitation: any) => (limitation.product_type.id === item.product_type_id));
                        // @ts-ignore todo: check notice
                        personCopy.data.push({...item, ...belongingLimitation});
                    })
                    // @ts-ignore todo: check notice
                    cartView.persons.push(personCopy);
                }
            })
        }
        dispatchCartView(dispatch, cartView);

        if (state.lineItemReducer != lineItems) {
            dispatchSetLineItems(dispatch, lineItems);
        }
    }, [lineItems])


    const addOrder = (limitationIndex: any, data: any, personIndex: number) => {
        //have to be implemented to keep data consistent because setLineItem is too slow
        let lineItems: LineItem[] = state.lineItemReducer;
        let item = persons[personIndex];
        let index = lineItems.findIndex(lineItem => lineItem.person_id === item.id && lineItem.product_type_id === data.product_type.id);
        let amount = 1;
        let tempLineItems: LineItem[] = lineItems;
        if (index !== -1) {
            amount += lineItems[index].amount;
            //get all line items but not the selected one and maybe add it later again
            tempLineItems = lineItems.filter(lineItem => !(lineItem.person_id === lineItems[index].person_id && lineItem.product_type_id === lineItems[index].product_type_id));
        }
        let lineItem: LineItem = {
            person_id: item.id,
            product_type_id: data.product_type.id,
            amount: amount
        };
        //if limit reached
        if (data.limit !== null && lineItem.amount + data.used > data.limit) return;

        setLineItems([...tempLineItems, lineItem]);
    }

    const removeOrder = (limitationIndex: any, data: any, personIndex: number) => {
        //have to be implemented to keep data consistent because setLineItem is too slow
        let lineItems: LineItem[] = state.lineItemReducer;

        let item = persons[personIndex];
        let index = lineItems.findIndex(lineItem => lineItem.person_id === item.id && lineItem.product_type_id === data.product_type.id);
        let tempLineItems: LineItem[] = lineItems;
        let amount = 0;
        if (index !== -1) {
            amount = lineItems[index].amount;
            //get all line items but not the selected one and maybe add it later again
            tempLineItems = lineItems.filter(lineItem => !(lineItem.person_id === lineItems[index].person_id && lineItem.product_type_id === lineItems[index].product_type_id));
        }
        //limit reached
        if (amount <= 0) return;

        if (amount > 1) {
            let lineItem: LineItem = {
                person_id: item.id,
                product_type_id: data.product_type.id,
                amount: amount - 1
            };
            setLineItems([...tempLineItems, lineItem]);
        } else setLineItems([...tempLineItems]);
    }

    const cartItem = lineItems.find(lineItem => lineItem.person_id === persons[personIndex].id && lineItem.product_type_id === limitation.product_type.id);
    const increasable = limitation.limit == null || limitation.used < limitation.limit && (cartItem === undefined || false || (limitation.used + cartItem.amount < limitation.limit));
    const decreasable = cartItem !== undefined && (cartItem.amount > 0);
    const entireScreenWidth = Dimensions.get('window').width;

    return (
        <View style={[style.item, entireScreenWidth > 1200 ? style.itemSmall : style.itemBig]}>
            <View style={style.inline}>
                <Text
                    style={[style.actionsText, style.typeText]}>{limitation.product_type.name} ({limitation.product_type.icon})</Text>
                <View style={style.actions}>
                    <Pressable style={decreasable ? style.actionsButton : style.actionsButtonDisabled}
                               onPress={() => removeOrder(index, limitation, personIndex)}><Text
                        style={decreasable ? [style.lineItemText, style.actionsText] : [style.actionsText, style.actionTextDisabled]}>-</Text></Pressable>
                    <Text style={style.actionsText}><RepetetiveImage icon={limitation.product_type.icon}
                                                                     name={limitation.product_type.name}
                                                                     data={limitation}
                                                                     cartitem={cartItem}></RepetetiveImage></Text>
                    <Pressable style={increasable ? style.actionsButton : style.actionsButtonDisabled}
                               onPress={() => addOrder(index, limitation, personIndex)}><Text
                        style={increasable ? [style.lineItemText, style.actionsText] : [style.actionsText, style.actionTextDisabled]}>+</Text></Pressable>
                </View>
            </View>
        </View>
    )
};

export default React.memo(Item);

const style = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        paddingBottom: 10,
        paddingTop: 5,
        paddingHorizontal: 32
    },
    itemSmall: {
        width: '50%'
    },
    itemBig: {
        width: '100%'
    },
    inline: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between"
    },
    actions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    actionsButton: {
        backgroundColor: '#cc1e1c'
    },
    actionTextDisabled: {
        color: '#b0b0b0'
    },
    actionsButtonDisabled: {
        backgroundColor: '#efefef'
    },
    lineItemText: {
        color: '#fff'
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
});
