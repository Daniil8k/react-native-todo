import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import getTime from '../utils/getTime'

export default function TodoItem({ item, remove }) {
    return (
        <View style={styles.item}>
            <Text style={styles.text}>
                {item.text}
            </Text>
            <View style={styles.toolBar}>
                <Text>
                    {getTime(item.date)}
                </Text>
                <TouchableOpacity style={styles.delete} onPress={() => remove(item.id)}>
                    <Icon color='red' name='delete' size={25} type='material' />
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    item: {
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        padding: 16,
        fontSize: 18
    },
    date: {
        color: 'white',
        fontSize: 12,
        backgroundColor: 'black',
    },
    delete: {
        padding: 16
    },
    toolBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
})