import {SafeAreaView, SectionList, View, StyleSheet} from "react-native";
import {Text, Box, Heading, Stack, HStack, Pressable} from "native-base";
import {format} from 'date-fns'
import {useState} from "react";
import {LineItem} from "../redux/data/models";

const CardPage = (props: any) => {
    const card = props.route.params.data.card;
    const cardId = card.id;

    const [lineItems, setLineItems] = useState<LineItem[] | []>([]);
    const [persons, setPersons] = useState<any[]>(props.route.params.data.persons);


    const addOrder = (limitationIndex: any, data: any, section: any) => {
        let item = persons[section.index];
        let index = lineItems.findIndex(lineItem => lineItem.person_id===item.id && lineItem.product_type_id === data.product_type.id);
        let amount = 1;
        let tempLineItems: LineItem[] = lineItems;
        if(index !== -1)
        {
            amount += lineItems[index].amount;
            tempLineItems = lineItems.filter(lineItem => !(lineItem.person_id === lineItems[index].person_id && lineItem.product_type_id === lineItems[index].product_type_id));
        }

        let lineItem: LineItem = {
            person_id: item.id,
            product_type_id: data.product_type.id,
            amount: amount
        };
        setLineItems([...tempLineItems, lineItem]);
    }

    // @ts-ignore
    const Item = ({data, index, section}) => {
        let cartItem = lineItems.find(lineItem => lineItem.person_id===persons[section.index].id && lineItem.product_type_id === data.product_type.id);
        return( //data.product_type.id todo
        <View style={styles.item}>
            <Text>{data.product_type.icon} {data.product_type.name}</Text>
            <View style={styles.inline}>
                <View style={styles.actions}>
                    <Pressable style={styles.actionsButton}><Text style={styles.actionsText}>-</Text></Pressable>
                    <Text style={styles.actionsText}>{data.used}/{data.limit} [{cartItem ? (<Text>{cartItem.amount}</Text>):null} ]</Text>
                    <Pressable style={styles.actionsButton} onPress={() => addOrder(index, data, section)}><Text style={styles.actionsText}>+</Text></Pressable>
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
                        renderItem={({item, index, section}) => <Item data={item} index={index} section={section}/>}
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
