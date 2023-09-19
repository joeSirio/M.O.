import { useState } from 'react';
import { FrequencyType } from './enums/FrequencyType.tsx';

const HabitItem = (props) => {
    console.log(props)
    const [expanded, setExpanded] = useState(false);
    const [expandedClass, setExpandedClass] = useState("");
    const [selectedFreq, setSelectedFreq] = useState(props.habit.type);
    const [taskName, setTaskName] = useState(props.habit.name);
    const [taskDescription, setTaskDescription] = useState(props.habit.description);
    const [days, setDays] = useState([{ name: 'Sun', active: props.habit.occurance.indexOf(0) !== -1 },
        { name: 'Mon', active: props.habit.occurance.indexOf(1) !== -1  },
        { name: 'Tues', active: props.habit.occurance.indexOf(2) !== -1 },
        { name: 'Wed', active: props.habit.occurance.indexOf(3) !== -1 },
        { name: 'Thur', active: props.habit.occurance.indexOf(4) !== -1 },
        { name: 'Fri', active: props.habit.occurance.indexOf(5) !== -1 },
        { name: 'Sat', active: props.habit.occurance.indexOf(6) !== -1 }]);

    const toggleExpand = (e, id) => {
        e.stopPropagation();
        if(expanded)
            setExpandedClass("collapse")
        else
            setExpandedClass("expand")
        setExpanded(!expanded);
    }

    const toggleDaySelection = (e, day) => {
        e.stopPropagation();

        let newDay = [...days];
        var index = newDay.findIndex(x => x.name === day);
        newDay[index].active = !newDay[index].active;
        setDays(newDay);
    }

    const updateHabit = (id) => {
        let occurance = [];
        days.forEach((day, i) => {
            if(day.active)
                occurance.push(i);
        });
        
        let habit = {
            id: id,
            name: taskName,
            description: taskDescription,
            FrequencyType: selectedFreq,
            occurance: occurance.join('|').toString(),
            status: props.habit.status
        };
        props.updateHabit(habit)
    }

    const deleteHabit = (id) => {
        props.deleteHabit(id);
        console.log(id);
    }

    return (
        <div className={`habitItem ${props.completed ? "completed" : ""} ${expandedClass}`} 
            onClick={(e) => props.handleDailyCheckbox(e, props.habit.id)}
            title={props.habit.description}>
            <div  className='task-content'>
                {/* CheckMark / Minus Sign */}
                <div className={`habitCheckmarkWrapper`}>
                    <div className='checkmark'></div>
                </div>
                
                {/* Side Arrow & Additional Functionality */}
                <div className={`side-arrow ${expanded ? "expanded" : ""}`} onClick={(e) => toggleExpand(e, props.habit.id)}></div>

                <div className='habit-info'>
                    {props.habit.name}
                    {props.habit.description &&
                        <div className='habit-desc'>{props.habit.description}</div>
                    }
                </div>
            </div>
            <div className='expanded-content'>
                {expanded &&
                    <div className='expanded' onClick={(e) => e.stopPropagation()}>
                        <div className='expanded-edit'>
                            <div className='habit-edit-title'>
                                Habit
                            </div>
                            <input value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                            <div className='habit-edit-title'>
                                Description
                            </div>
                            <input value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
                            <div className='habit-edit-frequency-wrapper'>
                                {/* FUTURE UPDATE: Freq type selector */}
                                {/* <div className='habit-edit-title'>
                                    Frequency
                                </div>
                                <div className='habit-edit-freq-type'>
                                    <div className={`habit-edit-freq-type-option ${selectedFreq === FrequencyType.Daily ? 'selected' : ''}`}
                                        onClick={(e) => setSelectedFreq(0)}>
                                        Daily
                                    </div>
                                    <div className={`habit-edit-freq-type-option ${selectedFreq === FrequencyType.Weekly ? 'selected' : ''}`}
                                        onClick={(e) => setSelectedFreq(1)}>
                                        Weekly
                                    </div>
                                    <div className={`habit-edit-freq-type-option ${selectedFreq === FrequencyType.Monthly ? 'selected' : ''}`}
                                        onClick={(e) => setSelectedFreq(2)}>
                                        Monthly
                                    </div>
                                </div> */}
                                <div className='habit-edit-freq-selector'>
                                    <div className='habit-edit-freq-daily-selector'>
                                        {
                                            days.map((day) => (
                                                <div className={`habit-edit-day-selector ${day.active ? 'selected':''}`} key={day.name} onClick={(e) => toggleDaySelection(e, day.name)}>
                                                    {day.name}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='expanded-controls'>
                            <button className='save-btn' onClick={() => updateHabit(props.habit.id)}>Save</button>
                            <button className='delete-btn' onClick={() => deleteHabit(props.habit.id)}>Delete Habit</button>
                        </div>
                    </div>       
                }
            </div>

        </div>
    )
}

export default HabitItem;