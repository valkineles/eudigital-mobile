import { Button, Icon, Input, Item, Text, Header, Container, Form } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import api from '../api';
import DisplayCard from './DisplayCard';

interface IAdvert {
    url: string;
    title: string;
    description: string;
    images: Array<{
        key: number;
        url: string;
    }>;
}

const InfinitLoading = () => {
    const [adverts, setAdverts] = useState<IAdvert[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [nameSearch, setNameSearch] = useState('');

    useEffect(() => {
        handleLoadAdverts();
    }, []);

    // carrega mais itens
    const handleLoadMore = () => {
        setPage(page + 1);
        setLoadingMore(true);
        handleLoadAdverts();
    };

    // carregando no radapé
    const handleFooter = () => {
        if (!loadingMore) return null;
        return <ActivityIndicator size='large' color='#ca0a12' />;
    };

    // quando o usuário puxa para baixo
    const handleRefresh = () => {
        setPage(1);
        setLimit(10);
        setRefreshing(true);
        handleLoadAdverts();
    };

    const handleLoadAdverts = async () => {
        const result = await api.get(`/home?page=${page}&limit=${limit}`);

        if (page === 1) {
            setAdverts(result.data.response.docs);
        } else {
            setAdverts(adverts.concat(result.data.response.docs));
        }

        setRefreshing(false);
    };
    const handleChangeNameSearch = (event: any) => {
        setNameSearch(event.target.value);
    };

    const handleSearch = async (event: any) => {
        event.preventDefault();
        if (nameSearch.trim() === '') {
            return <ActivityIndicator size='large' color='#ca0a12' />;
        } else {
            const result = await api.get(
                `/home?filters=[{"field":"description", "type":"like", "value":"${nameSearch}"}]&page=1&limit=50`
            );
            console.log(result.data.response.docs);
            setAdverts(result.data.response.docs);
        }
        setRefreshing(false);
    };
    const handleItem = () => {
        if (adverts.length <= 0) {
            return <ActivityIndicator size='large' color='#ca0a12' />;
        }

        return (
            <FlatList
                ListFooterComponent={handleFooter}
                vertical={true}
                numColumns={2}
                contentContainerStyle={{
                    flexDirection: 'column',
                }}
                data={adverts}
                keyExtractor={item => item.images[0].key}
                renderItem={({ item }) => (
                    <View style={{ width: '50%' }}>
                        <DisplayCard title={item.description} imgUrl={item.images[0].url} />
                    </View>
                )}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                initialNumToRender={10}
                onRefresh={handleRefresh}
                refreshing={refreshing}
            />
        );
    };

    return (
        <Container>
            <Header searchBar rounded>
                <Item>
                    <Icon name='ios-search' />
                    <Input onChange={handleChangeNameSearch} placeholder='Busca' />
                    <Icon name='ios-cancel' />
                </Item>
                <Button onPress={handleSearch} transparent>
                    <Text>Buscar</Text>
                </Button>
            </Header>
            <View style={styles.container}>{handleItem()}</View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default InfinitLoading;
