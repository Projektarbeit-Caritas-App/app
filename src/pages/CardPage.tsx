import {SafeAreaView, SectionList, View, StyleSheet} from "react-native";
import {Text, Box, Heading, Stack, HStack, Pressable, Image, Button, TextArea} from "native-base";
import {format} from 'date-fns'
import React, {useEffect, useState} from "react";
import {CartView, LineItem, Person} from "../redux/data/models";
import {useDispatch, useSelector} from "react-redux";
import {
    dispatchSetLineItems,
    dispatchCartView
} from "../redux/data/dispatcher";
import {useNavigation} from "@react-navigation/native";
import RepetetiveImage from "../components/RepetetiveImage";
import {setCardComment} from "../redux/data/api";

const CardPage = (props: any) => {
    const card = props.route.params.data.card;
    const dispatch = useDispatch();
    const state = useSelector(({nonPersistantReducer}: any) => nonPersistantReducer);
    const [lineItems, setLineItems] = useState<LineItem[] | []>(state.lineItemReducer);
    const persons = props.route.params.data.persons;
    const navigation = useNavigation();
    const [comment, setComment] = useState<string>(card.comment);
    const [commentChanged, setCommentChanged] = useState(false);
    const persistantReducer = useSelector(({persistantReducer}: any) => persistantReducer);

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
        console.log(cartView); //todo: Debug entfernen
        dispatchCartView(dispatch, cartView);

        if (state.lineItemReducer != lineItems) {
            dispatchSetLineItems(dispatch, lineItems);
        }
    }, [lineItems])

    useEffect(() => {
        if (comment != card.comment && !(comment === '' && card.comment === null)) {
            setCommentChanged(true);
        } else {
            setCommentChanged(false);
        }
    }, [comment])

    const handleCommentChange = (value: any) => {
        setComment(value);
    }

    const changeComment = () => {
        const config = {
            headers: {Authorization: `Bearer ${persistantReducer.token}`}
        };
        setCardComment(card.id, comment, config, dispatch).then(() => {
            card.comment = comment;
            setCommentChanged(false);
        }).catch(() => {
           alert("Fehler beim Speichern des Kommentars. Bitte versuchen Sie es erneut oder kontaktieren Sie einen Administrator.")
        });
    }


    const addOrder = (limitationIndex: any, data: any, section: any) => {
        let item = persons[section.index];
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

    const removeOrder = (limitationIndex: any, data: any, section: any) => {
        let item = persons[section.index];
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

    // @ts-ignore
    const Item = ({data, index, section}) => {
        let cartItem = lineItems.find(lineItem => lineItem.person_id === persons[section.index].id && lineItem.product_type_id === data.product_type.id);
        let increasable = data.limit == null || data.used < data.limit && (cartItem === undefined || false || (data.used + cartItem.amount < data.limit));
        let decreasable = cartItem !== undefined && (cartItem.amount > 0);
        return (
            <View style={style.item}>
                <View style={style.inline}>
                    <Text style={[style.actionsText, style.typeText]}>{data.product_type.name} ({data.product_type.icon})</Text>
                    <View style={style.actions}>
                        <Pressable style={decreasable ? style.actionsButton : style.actionsButtonDisabled}
                                   onPress={() => removeOrder(index, data, section)}><Text
                            style={decreasable ? [style.lineItemText, style.actionsText] : [style.actionsText, style.actionTextDisabled]}>-</Text></Pressable>
                        <Text style={style.actionsText}><RepetetiveImage icon={data.product_type.icon}
                                                                         name={data.product_type.name} data={data}
                                                                         section={section}
                                                                         cartitem={cartItem}></RepetetiveImage></Text>
                        <Pressable style={increasable ? style.actionsButton : style.actionsButtonDisabled}
                                   onPress={() => addOrder(index, data, section)}><Text
                            style={increasable ? [style.lineItemText, style.actionsText] : [style.actionsText, style.actionTextDisabled]}>+</Text></Pressable>
                    </View>
                </View>
            </View>
        )
    };

    return (
        <>
            <Box alignItems="center" mx={4}>
                <Box rounded="lg" width={'100%'} overflow="hidden" borderColor="coolGray.200" borderWidth="1" m={4}
                     _dark={{
                         borderColor: "coolGray.600",
                         backgroundColor: "gray.700"
                     }} _web={{
                    shadow: 2,
                    borderWidth: 0
                }} _light={{
                    backgroundColor: "gray.50"
                }}>
                    <Stack p="4" space={0}>
                        <Stack space={2}>
                            <Heading size="md" ml="-1">{card.last_name}, {card.first_name}</Heading>
                            <Text fontSize="xs" _light={{
                                color: "violet.500"
                            }} _dark={{
                                color: "violet.400"
                            }} fontWeight="500" ml="-0.5" mt="-1">Nr: {card.id}</Text>
                        </Stack>
                        {card.street ? (
                            <Text fontWeight="400">
                                {card.street}
                            </Text>
                        ) : null}
                        <Text fontWeight="400">
                            {card.postcode} {card.city}
                        </Text>
                        {card.valid_until ? (
                            <Text fontWeight="400">
                                Gültig ab: {format(new Date(card.valid_until), 'dd.MM.Y')}
                            </Text>
                        ) : null}
                        <HStack alignItems="center" space={4} justifyContent="space-between">
                            <HStack alignItems="center">
                                <Text color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">Zuletzt
                                    aktualisiert: {format(new Date(card.updated_at), 'dd.MM.Y')}</Text>
                            </HStack>
                        </HStack>
                        <Box style={style.mt}>
                            <TextArea autoCompleteType={'off'} aria-label="t1" numberOfLines={4}
                                      placeholder="Kommentar abgeben..." value={comment}
                                      onChangeText={value => handleCommentChange(value)} mb="5"/>
                        </Box>
                        {commentChanged ? (
                            <View>
                                <Button onPress={() => (changeComment())}>Kommentar speichern</Button>
                            </View>
                        ) : null}
                    </Stack>
                </Box>

                <View style={style.container}>
                    <SafeAreaView>
                        <SectionList
                            contentContainerStyle={style.sectionContent}
                            sections={persons}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({item, index, section}) => <Item data={item} index={index} section={section}/>}
                            renderSectionHeader={({section: {age, gender}}) => (
                                <Text style={style.heading}>{age} Jahre, {gender}</Text>
                            )}
                        />
                    </SafeAreaView>
                </View>

                {lineItems.length > 0 ? (
                    <View style={[style.container, style.mt]}>
                        <Button onPress={() => navigation.navigate('ShoppingCartPage')}>Zum Warenkorb</Button>
                    </View>
                ) : null}
            </Box>
        </>
    );
}

const style = StyleSheet.create({
    container: {
        width: '100%'
    },
    item: {
        backgroundColor: '#fff',
        padding: 5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    heading: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: '#fff',
        fontWeight: '600',
        fontSize: 18,
        marginTop: 10,
        padding: 10
    },
    inline: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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
    mt: {
        marginTop: 25
    },
    sectionContent:{
    }
});

export default CardPage;
