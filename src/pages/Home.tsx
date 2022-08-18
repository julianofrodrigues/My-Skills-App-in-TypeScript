import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, SafeAreaView, TextInput, Platform, FlatList, StatusBar } from 'react-native';
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
    id: string;
    name: string;
    date?: Date;
}

export function Home(){
    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState<SkillData[]>([]);
    const [greeting, setGreeting] = useState('');

    function handleAddNewSkill(){
        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }
        setMySkills(oldSkills => [...oldSkills, data]);
    }

    function handleRemoveNewSkill(id: string){
        setMySkills(oldSkills => oldSkills.filter(skill => skill.id !== id));
    }

    useEffect(() => {
        const currentHour = new Date().getHours();
        if(currentHour < 12){
            setGreeting('Good Morning!');
        }
        else if(currentHour >= 12 && currentHour < 18){
            setGreeting('Good Afternoon!');
        }
        else{
            setGreeting('Good Night!');
        }
    }, [])

  return (
    <SafeAreaView style={styles.container}>

        <Text style={styles.title}>Hello, Juliano!</Text>

        <Text style={styles.greeting}>{greeting}</Text>

        <TextInput style={styles.input} placeholder="New Skill" placeholderTextColor="#555"  onChangeText={setNewSkill}/>

        <Button onPress={handleAddNewSkill}  title={'Add'}/>

        <Text style={[styles.title, {marginVertical: 20}]}>My Skills</Text>

        <FlatList data={mySkills} keyExtractor={item => item.id} renderItem={({ item }) => (<SkillCard skill={item.name} onPress={ () => handleRemoveNewSkill(item.id) } />)} />
            
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#121015',
        paddingHorizontal: 30,
        paddingVertical: 50,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    },
    input:{
        backgroundColor: '#1f1e25',
        color: '#fff',
        fontSize: 18,
        padding: Platform.OS == 'ios' ? 15 : 10,
        marginTop: 15,
        borderRadius: 7
    },
    greeting:{
        color: '#fff',
        fontWeight: 'bold'
    }
    
});
