import {SafeAreaView, View, StyleSheet, LayoutAnimation, ScrollView} from "react-native";
import {Text, Box, Pressable} from "native-base";
import React, {useState} from "react";
import {LimitationState, Person} from "../redux/data/models";
import Icon from "react-native-vector-icons/FontAwesome";
import Item from "../components/Item";
import Comment from "../components/Comment";
import ShoppingCartButton from "../components/ShoppingCartButton";

const CardPage = (props: any) => {
    const card = props.route.params.data.card;
    const persons = props.route.params.data.persons;

    const Person = ({person, personIndex}: { person: Person, personIndex: number }) => {
        const [open, setopen] = useState(false);
        const onPress = () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setopen(!open);
        };
        const icon = open ? 'caret-up' : 'caret-down';
        return (
            <View style={style.person}>
                <Pressable onPress={onPress}>
                    <View style={style.heading}>
                        <Text style={style.headingText}>{person.age} Jahre, {person.gender}</Text>
                        <Icon name={icon} style={style.headingIcon}/>
                    </View>
                </Pressable>
                <View style={style.itemWrapper}>
                    {person.data && open ? person.data.map((limitation: LimitationState, index: number) => {
                        return (
                            <Item limitation={limitation} index={index} personIndex={personIndex} persons={persons} card={card} key={'i' + index}/>
                        )
                    }) : null}
                    {(!person.data || person.data.length === 0) && open ?(<Text style={style.alignedText}>Keine Daten vorhanden</Text>):null}
                </View>
            </View>
        )
    }

    return (
        <ScrollView>
            <Box alignItems="center" mx={4}>
                <View style={style.container}>
                    <SafeAreaView>
                        <Comment card={card}/>
                        <View style={[style.mb]}>
                            {persons.map((person: Person, personIndex: number) => {
                                return (
                                    <Person person={person} personIndex={personIndex} key={'p' + personIndex}/>
                                )
                            })}
                        </View>
                        <ShoppingCartButton/>
                    </SafeAreaView>
                </View>
            </Box>
        </ScrollView>
    );
}

const style = StyleSheet.create({
    container: {
        width: '100%'
    },
    alignedText: {
      paddingHorizontal: 10
    },
    itemWrapper: {
        flexDirection: 'row',
        justifyContent: "space-between",
        flexWrap: "wrap"
    },
    person:{
        backgroundColor: '#fff',
    },
    heading: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginTop: 10,
        padding: 10,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignContent: "center"
    },
    headingText: {
        fontWeight: '600',
        fontSize: 22
    },
    headingIcon: {
        fontSize: 22
    },
    mt: {
        marginTop: 25
    },
    mb: {
        marginBottom: 25
    }
});

export default CardPage;
