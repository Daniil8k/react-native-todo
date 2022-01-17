import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import Header from './components/Header'
import AddTodo from './components/AddTodo'
import TodoItem from './components/TodoItem'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const todosFlatList = useRef(null)
  const [todos, setTodos] = useState([{
    id: '0',
    text: "add",
    date: '2022-01-17T10:50:52.371Z',
  },
  {
    id: '1',
    text: "your",
    date: '2022-01-17T13:50:52.371Z',
  },
  {
    id: '2',
    text: "todo",
    date: '2022-01-17T19:50:52.371Z',
  },
  ])

  useEffect(async () => {
    try {
      let todosValue = await AsyncStorage.getItem('@todos')

      if (todosValue) {
        setTodos(JSON.parse(todosValue))
      }
    } catch (e) {
      console.log(e);
    }
  }, [])

  useEffect(async () => {
    try {
      await AsyncStorage.setItem('@todos', JSON.stringify(todos))
    } catch (e) {
      console.log();
    }

    if (todos.length && todos.length % 10 === 0) {
      Alert.alert('Stop clicking', `${todos.length} todos`, [{
        text: 'ok',
        onPress: () => console.log('alert pressed')
      }])
    }
  }, [todos])

  const addTodo = async (text, date) => {
    if (!text.trim()) {
      return
    }

    setTodos((prev) => {
      let id = Math.random().toString()

      return prev.concat({
        id,
        text,
        date
      })
    }
    )

    setImmediate(() => todosFlatList.current.scrollToEnd())
  }

  const removeTodo = async (id) => {
    setTodos((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo add={addTodo} />
          {todos.length ? (<FlatList
            style={styles.list}
            ref={todosFlatList}
            keyExtractor={(item, index) => item.id}
            data={todos}
            renderItem={({ item }) =>
              <TodoItem item={item} remove={removeTodo} />
            }
          />) : (<Text style={styles.list}>Empty</Text>)}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    color: '#404364',
    marginBottom: 50
  },
  container: {
    backgroundColor: '#fff',
    overflow: 'scroll',
  },
  content: {
    padding: 10,
    overflow: 'scroll',
  },
  list: {
    overflow: 'scroll',
    marginBottom: 20,
    textAlign: 'center',
    marginBottom: 150
  },
  item: {
    display: 'flex',
    width: '100%',
    marginBottom: 24,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24,
    borderRadius: 5,
    justifyContent: 'space-between'
  }
});
