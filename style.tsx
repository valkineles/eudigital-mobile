import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor:'green',
        // ...Platform.select({
        //   ios: {
        //     backgroundColor: 'red'
        //   },
        //   android: {
        //     backgroundColor: 'green'
        //   },
        //   default: {
        //     // other platforms, web for example
        //     backgroundColor: 'blue'
        //   }
        // })
    },
    header: {
        //flex: 1,
        flexDirection: 'row',
        //height: '5%',
        justifyContent: 'space-between',
        //backgroundColor:'red',
    },
    createSearchButton: {
        width: 40,
        height: 40,
        backgroundColor: '#15c3d6',
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',
    },

    items: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: '2px',
    },
    img: {
        width: '128px',
        height: '128px',
        borderRadius: 4,
    },

    Description: {
        marginLeft: '4px',
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'column',
        fontFamily: '22px',
        backgroundColor: 'green',
    },
    tinyLogo: {
        width: '100%',
        height: '100%',
    },
    logo: {
        width: 66,
        height: 58,
    },
    statusBar: {
        backgroundColor: 'red',
    },
});
export default styles;
