import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>To-do</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'coral',
    },
    title: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 24
    }
})