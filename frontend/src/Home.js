"use client";

import {useEffect, useState} from 'react';
import AddHabit from './AddHabit';
import HabitItem from './HabitItem';
import APIService from './services/APIService';
import { FrequencyType } from "./enums/FrequencyType.tsx";

const Home = () => {
    const [habits, setHabit] = useState([]);
    const [showAddHabit, setShowAddHabit] = useState(false);

    const dbData = [
        {
            id: 1,
            task: "Go for a walk",
            description: "for atleast 30 minutes",
            type: FrequencyType.Daily,
            target:1,
            amount:0,
            status: false,
            occurance: "0|1|2|3|4|5|6",
        },
        {
            id: 2,
            task: "Workout",
            description: "for 1 hour",
            type: FrequencyType.Daily,
            target:1,
            amount:0,
            status: false,
            occurance: "1|2|3|4",
        },
        {
            id: 3,
            task: "Leetcode",
            description: "for 1 hour",
            type: FrequencyType.Daily,
            target:1,
            amount:0,
            status: false,
            occurance: "1|2|3|4|5",
        }
    ];

    const getAllData = () => {
        // APIService.getInstance().GetData().then((results) => {
        //     setHabit([]);
        console.log(dbData);
            dbData.map((result) => {

                let habit = {
                    name: result.task,
                    description: result.description,
                    status: result.status,
                    target: result.target,
                    amount: result.amount,
                    id: result.id,
                    type: result.type,
                    occurance: result.occurance? result.occurance.split('|').map(x=>+x): []
                };
                setHabit(habits => [...habits, habit]);
                return true;
            })
        // })
    }

    useEffect(() => {
        function getData(){
            getAllData()
        }

        getData();
    }, [])

    const showAddHabitPopup = (e) => {
        setShowAddHabit(true);
    }

    const closePopup = () => {
        setShowAddHabit(false);
    }

    const handleAddHabit = (data) => {
        data["id"] = dbData.length + 1;
        dbData.push(data);

        getAllData();
        closePopup();

        // APIService.getInstance().AddHabit(data)
        //     .then(() =>  {
        //         getAllData();
        //         closePopup();
        // });
    }

    const  handleUpdateHabit = (data) => {
        APIService.getInstance().UpdateHabit(data)
            .then(() =>  {
                getAllData();
        });
    }

    const handleDeleteHabit = (id) => {
        APIService.getInstance().DeleteHabit(id)
            .then(() =>  {
                getAllData();
                closePopup();
        });
    }

    const handleDailyCheckbox = (e, id) => {
        let newHabit = [...habits];
        var index = newHabit.findIndex(x => x.id === id);

        if(newHabit[index].target > 1){
            if(newHabit[index].amount < newHabit[index].target){
                newHabit[index].amount ++;
                if(newHabit[index].amount === newHabit[index].target)
                    newHabit[index].status=true;
            }
            else{
                newHabit[index].status = !newHabit[index].status;
                newHabit[index].amount --;
                newHabit[index].anim = newHabit[index].status ? "completed" : "";
            }
        }
        else{
            newHabit[index].status = !newHabit[index].status;
            newHabit[index].anim = newHabit[index].status ? "completed" : "incomplete";
        }
        setHabit(newHabit);
    }

    const handleWeeklyMinus = (e, id) => {
        e.stopPropagation();
        let newHabit = [...habits];
        var index = newHabit.findIndex(x => x.id === id);
        if(newHabit[index].amount > 0){
            newHabit[index].amount --;
            setHabit(newHabit);
        }
    }

    const updateHabit = (habit) => {
        let newHabit = [...habits];
        var index = newHabit.findIndex(x => x.id === habit.id);
        newHabit[index].name = habit.name;
        newHabit[index].description = habit.description;
        newHabit[index].type = habit.FrequencyType;
        newHabit[index].occurance = habit.occurance;
        setHabit(newHabit);
    }

    return ( 
        <div className="home">
            <h2>My Habits</h2>
            <br/>
                <button className='addHabitBtn' onClick={showAddHabitPopup}><span>+</span></button>

            <div className='habitWrapper'>
                {
                habits.filter(habit => habit.target ===  0 && !habit.status).map((habit) => (
                    <HabitItem 
                        key={habit.id} 
                        habit={habit} 
                        handleDailyCheckbox={handleDailyCheckbox}
                        updateHabit={handleUpdateHabit}
                        deleteHabit={handleDeleteHabit} />
                ))}
            </div>

            <div className='habitWrapper'>
                {habits.filter(habit => habit.target !== 0 && !habit.status).map((habit) => (
                    <HabitItem 
                        key={habit.id} 
                        habit={habit} 
                        weekly={true}
                        handleWeeklyMinus={handleWeeklyMinus}  
                        handleDailyCheckbox={handleDailyCheckbox}
                        updateHabit={handleUpdateHabit}
                        deleteHabit={handleDeleteHabit} />
                ))}
            </div>
            
            <div className='habitWrapper'>
                <p style={{marginTop: "50px", paddingBottom:"10px", borderBottom: "1px solid #000"}}>Completed</p>
                {habits.filter(habit => habit.status).map((habit) => (
                    <HabitItem 
                        key={habit.id} 
                        habit={habit} 
                        handleDailyCheckbox={handleDailyCheckbox} 
                        updateHabit={handleUpdateHabit}
                        deleteHabit={handleDeleteHabit}
                        completed="true" />
                ))}
            </div>

            {showAddHabit && 
                <AddHabit handleAddHabit={handleAddHabit} habitLength={habits.length} closePopup={closePopup} />
            }
        </div>
     );
}
 
export default Home;