import {Box, Button, Center, Heading, HStack, Spinner, Stack, Text, TextArea} from "native-base";
import {StyleSheet, View} from "react-native";
import React, {useEffect, useState} from "react";
import {setCardComment} from "../redux/data/api";
import {useDispatch, useSelector} from "react-redux";
import {Card} from "../redux/data/models";
import {format} from 'date-fns'

const Comment = ({card}: { card: Card }) => {
    const dispatch = useDispatch();
    const [comment, setComment] = useState<string>(card.comment);
    const [commentChanged, setCommentChanged] = useState(false);
    const persistantReducer = useSelector(({persistantReducer}: any) => persistantReducer);
    const [pageLoading, setPageLoading] = useState(false);

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
        setPageLoading(true);
        setCardComment(card.id, comment, config, dispatch).then(() => {
            card.comment = comment;
            setCommentChanged(false);
            setPageLoading(false);
        }).catch(() => {
            alert("Fehler beim Speichern des Kommentars. Bitte versuchen Sie es erneut oder kontaktieren Sie einen Administrator.")
        });
    }


    return (
        <Box rounded="lg" width={'100%'} overflow="hidden" borderColor="coolGray.200" borderWidth="1"
             my={4}
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
                {pageLoading ? (
                    <Center>
                        <HStack space={8} justifyContent="center" alignItems="center">
                            <Spinner size="lg"/>
                        </HStack>;
                    </Center>
                ) : (<>
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
                </>)}
            </Stack>
        </Box>
    );
}

const style = StyleSheet.create({
    mt: {
        marginTop: 25
    },
    mb: {
        marginBottom: 25
    }
});

export default React.memo(Comment);
