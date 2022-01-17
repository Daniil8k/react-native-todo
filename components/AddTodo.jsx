import { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import getTime from '../utils/getTime'

export default function AddTodo({ add }) {
    const [text, setText] = useState('text')
    const [date, setDate] = useState('2022-01-17T13:50:52.371Z');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = (selectedDate && selectedDate.toISOString()) || date;
        setShow(Platform.OS === 'ios');
        console.log(currentDate);
        setDate(currentDate);
    };

    return (
        <View>
            <View style={styles.form}>
                <View style={styles.formItem}>
                    <Text style={styles.inputLabel}>Enter text:</Text>
                    <TextInput placeholder='Text' style={styles.input} value={text} onChangeText={setText} />
                </View>
                <View style={styles.formItem}>
                    <Text style={styles.inputLabel}>Choose time:</Text>
                    <TouchableOpacity style={{ ...styles.input, ...styles.timeBtn }} onPress={() => setShow(true)}>
                        <Icon color='#9575cd' name='schedule' size={25} type='material' />
                        <Text>{getTime(date)}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.updateBtn}>
                <Button title='add Todo' color='#9575cd' onPress={() => add(text, date)} />
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(date)}
                    mode='time'
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    inputLabel: {
        marginBottom: 5,
        fontWeight: 'bold'
    },
    input: {
        padding: 5,
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 10,
        borderColor: '#9575cd'
    },
    timeBtn: {
        fontSize: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    form: {
        width: '100%',
        marginTop: 20,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    formItem: {
        width: '45%',
        marginRight: 10,
    },
    updateBtn: {
        width: '100%',
        marginBottom: 20
    },
})