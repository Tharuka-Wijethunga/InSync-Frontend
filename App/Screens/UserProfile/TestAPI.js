import React, { useState, useEffect } from 'react';
import { Button, TextInput, View } from 'react-native';
import {Text} from "native-base";

const YourComponent = () => {
    const [todoList, setTodoList] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deleteTitle, setDeleteTitle] = useState('');

    const handleShowTodo = () => {
        fetch('http://192.168.232.230:8000/api/todo')
            .then(response => response.json())
            .then(json => setTodoList(json))
            .catch(error => console.error(error));
    };

    const handleDelete = () => {
        fetch(`http://192.168.232.230:8000/api/todo/${deleteTitle}`, {
            method: 'DELETE',
        })
            .then(response => {
                console.log("successfully deleted");
                handleShowTodo();
            })
            .catch(error => console.error(error));
    };

    const handleSubmit = () => {
        fetch('http://192.168.232.230:8000/api/todo/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        })
            .then(response => {
                console.log("successfully added");
                handleShowTodo();
            })
            .catch(error => console.error(error));
    };

    return (
        <View>
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="Enter a title"
            />
            <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
            />
            <Button title="Add Task" onPress={handleSubmit} />
            <Button title="Show Tasks" onPress={handleShowTodo} />
            <TextInput
                value={deleteTitle}
                onChangeText={setDeleteTitle}
                placeholder="Enter title of task to delete"
            />
            <Button title="Delete Task" onPress={handleDelete} />
            {todoList.length > 0 ? (
                todoList.map((todo, index) => (
                    <View key={index}>
                        <Text>{todo.title}</Text>
                        <Text>{todo.description}</Text>
                    </View>
                ))
            ) : (
                <Text>No Records added yet!</Text>
            )}
        </View>
    );
};

export default YourComponent;
