import {SafeAreaView, SectionList, View, StyleSheet} from "react-native";
import {Text, Box, Heading, Stack, HStack, Pressable} from "native-base";
import {format} from 'date-fns'
import {useState} from "react";
import {LineItem} from "../redux/data/models";

const CardPage = (props: any) => {
    const card = props.route.params.data.card;
    const cardId = card.id;

    let tempPerson: any = {id: 1, age: 1, gender: '', data: null};
    let tempPersons: any = [];
    props.route.params.data.persons.forEach((singlePerson: any) => {
        tempPerson.id = singlePerson.id;
        tempPerson.age = singlePerson.age;
        tempPerson.gender = "männlich";
        if (singlePerson.gender === 'female') {
            tempPerson.gender = "weiblich";
        } else if (singlePerson.gender === 'divers') {
            tempPerson.gender = singlePerson.gender;
        }
        tempPerson.data = singlePerson.limitation_states;
        tempPersons.push(tempPerson);
    })

    const [lineItems, setLineItems] = useState<LineItem[] | []>([]);
    const [persons, setPersons] = useState<any[]>(tempPersons);

    const addOrder = (personIndex: any, data: any) => {
        let item = persons[personIndex];
        console.log("amangus",item, data); //todo: Debug entfernen
        let index = lineItems.findIndex(lineItem => lineItem.person_id===item.id && lineItem.product_type_id === data.product_type.id);
        let amount = 1;
        let tempLineItems: LineItem[] = lineItems;
        console.log('index',index); //todo: Debug entfernen
        if(index !== -1)
        {
            amount += lineItems[index].amount;
            tempLineItems = tempLineItems.slice(index, index);
            console.log('sliced '+ index, tempLineItems); //todo: Debug entfernen
        }
        let lineItem: LineItem = {
            person_id: item.id,
            product_type_id: data.product_type.id,
            amount: amount
        };
        console.log(tempLineItems); //todo: Debug entfernen
        tempLineItems.push(lineItem);
        setLineItems(tempLineItems);
        data.used = 5555;
        console.log('setLineItems', tempLineItems); //todo: Debug entfernen
    }

    // @ts-ignore
    const Item = ({data, index}) => {
        return( //data.product_type.id todo
        <View style={styles.item}>
            <Text>{data.product_type.icon} {data.product_type.name}</Text>
            <View style={styles.inline}>
                <View style={styles.actions}>
                    <Pressable style={styles.actionsButton}><Text style={styles.actionsText}>-</Text></Pressable>
                    <Text style={styles.actionsText}>{data.used}/{data.limit}</Text>
                    <Pressable style={styles.actionsButton} onPress={() => addOrder(index, data)}><Text style={styles.actionsText}>+</Text></Pressable>
                </View>
            </View>
        </View>
    )};

    return (
        <View>
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
                            }} fontWeight="500" ml="-0.5" mt="-1">Nr: {cardId}</Text>
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
                    </Stack>
                </Box>
                <SafeAreaView style={styles.container}>
                    <SectionList
                        sections={persons}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({item, index}) => <Item data={item} index={index}/>}
                        renderSectionHeader={({section: {age, gender}}) => (
                            <Text style={styles.heading}>{age} Jahre, {gender}</Text>
                        )}
                    />
                </SafeAreaView>
            </Box>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16,
        width: '100%'
    },
    item: {
        backgroundColor: '#fff',
        padding: 10,
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
    inline:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    actions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderWidth: 1,
        borderColor: '#ccc'
    },
    actionsButton: {
        backgroundColor: '#efefef'
    },
    actionsText:{
        fontWeight: '700',
        paddingVertical: 3,
        paddingHorizontal: 8
    }
});

export default CardPage;
