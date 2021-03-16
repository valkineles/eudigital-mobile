import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, CardItem, Body, Button } from 'native-base';

interface IParam {
  imgUrl: string,
  title: string
}

const DisplayCard = (props: IParam) => {
  console.log(props.imgUrl, props.title);
    return (
        <View>
            <TouchableOpacity onPress={() => {}}>
                <Card>
                    <CardItem style={{ height: 280, borderRadius: 4 }}>
                        <Body>
                            <Image style={styles.image} resizeMode='cover' source={{ uri: props.imgUrl }} />
                            <Text style={{ marginBottom: 10 }}>{props.title}</Text>
                            <View style={{ position: 'absolute', bottom: 0 }}>
                                <Button
                                    style={{
                                        borderRadius: 4,
                                        backgroundColor: '#ca0a12',
                                        width: 145,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}
                                    onPress={() => {}}
                                >
                                    <Text style={{ color: 'white' }}>COMPRAR</Text>
                                </Button>
                            </View>
                        </Body>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
    },
});

export default DisplayCard;
