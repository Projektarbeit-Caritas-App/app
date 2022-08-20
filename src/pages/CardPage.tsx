import {SafeAreaView, SectionList, View, StyleSheet} from "react-native";
import {Text, Box, Heading, Stack, HStack, Button} from "native-base";
import {format} from 'date-fns'

const CardPage = (props: any) => {
    const card = props.route.params.data.card;

    //Format persons for SectionList
    let persons: any = [];
    let tempPerson: any = {id: 1, age: 1, gender: '', data: null};
    props.route.params.data.persons.forEach((singlePerson: any) =>{
        tempPerson.id = singlePerson.id;
        tempPerson.age = singlePerson.age;
        tempPerson.gender = singlePerson.gender;
        tempPerson.data = singlePerson.limitation_states;
        persons.push(tempPerson);
    })
    console.log(persons); //todo: Debug entfernen
    /*
Array [ {…}, {…} ]
​
0: Object { id: 1, gender: "divers", age: 23, … }
​​
age: 23
​​
created_at: "2022-08-20T12:19:34.000000Z"
​​
gender: "divers"
​​
id: 1
​​
limitation_states: Array(3) [ {…}, {…}, {…} ]
​​​
0: Object { product_type: {…}, limit: 3, used: 0 }
​​​​
limit: 3
​​​​
product_type: Object { id: 1, name: "Rock", icon: "fa-dress" }
​​​​​
icon: "fa-dress"
​​​​​
id: 1
​​​​​
name: "Rock"
​​​​​
<prototype>: Object { … }
​​​​
used: 0
     */

    // @ts-ignore
    const Item = ({data}) => ( //data.product_type.id todo
        <View>
            <Text>{data.product_type.icon} {data.product_type.name}</Text>
            <Text>Benutzt: {data.product_type.used}/{data.limit}</Text>
            <Button>Add</Button>
        </View>
    );

    return (
        <View>
            <Box alignItems="center">
                <Box maxW="500" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" mt={4}
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
                    </Stack>
                </Box>
                <SafeAreaView style={styles.container}>
                    <SectionList
                        sections={persons}
                        keyExtractor={(item, index) => item + index}
                        renderItem={({ item }) => <Item data={item} />}
                        renderSectionHeader={({ section: { age, gender } }) => (
                            <Text>{age}, {gender}</Text>
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
        marginHorizontal: 16
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24
    }
});

export default CardPage;
