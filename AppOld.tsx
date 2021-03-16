import React, { useEffect, useState } from 'react';
import {
    Container,
    Header,
    Content,
    Item,
    Input,
    Icon,
    Button,
    Text,
    List,
    ListItem,
    Left,
    Thumbnail,
    Body,
    Spinner,
    View,
} from 'native-base';
import styles from './style';
import api from './api';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

interface IAdvert {
    url: string;
    title: string;
    description: string;
    images: Array<{
        key: number;
        url: string;
    }>;
}

export default function App() {
    let page = 1;
    const limit = 15;
    const [adverts, setAdverts] = useState<IAdvert[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`/home?page=${page}&limit=${limit}`).then(res => {
            setAdverts(res.data.response.docs);
            setLoading(false);
        });
    }, []);

    const loadAdverts = (event: NativeSyntheticEvent<NativeScrollEvent>) => {

        const currentItemIndex =
            Math.floor(event.nativeEvent.contentSize.height) - Math.floor(event.nativeEvent.contentOffset.y);

        console.log('heigh', Math.floor(event.nativeEvent.contentSize.height));
        console.log('y', Math.floor(event.nativeEvent.contentOffset.y));
        console.log('currentItemIndex', currentItemIndex);

        if (currentItemIndex < 700) {
            setLoading(true);
            page++;
            console.log('pagina:', page);
            api.get(`/home?page=${page}&limit=${limit}`).then(res => {
                setAdverts(adverts.concat(res.data.response.docs));
                setLoading(false);
            });
        }
    };

    const handleItem = () => {
        if (loading) return <Spinner key={Math.random()} />;

        console.log('handleItem: ', adverts);

        return (
            <List>
                {adverts.map(advert => {
                    return (
                        <ListItem thumbnail key={advert.images[0].key}>
                            <Left>
                                <Thumbnail style={styles.img} square source={{ uri: advert.images[0].url }} />
                            </Left>
                            <Body>
                                <Text>{advert.title}</Text>
                                <Text note numberOfLines={1}>
                                    {advert.description}
                                </Text>
                            </Body>
                        </ListItem>
                    );
                })}
            </List>
        );
    };

    return (
        <Container>
            <Header searchBar rounded>
                <Item>
                    <Icon name='ios-search' />
                    <Input placeholder='Pesquisa' />
                </Item>
                <Button transparent>
                    <Text>Cancelar</Text>
                </Button>
            </Header>
            {/* <List> */}
                <Content onScroll={loadAdverts}  >{handleItem()}</Content>
            {/* </List> */}
        </Container>
    );
}
