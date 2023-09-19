import {useEffect, useState} from 'react';
import { FrequencyType } from './enums/FrequencyType.tsx';

const AddHabit = (props) => {

    const [firstRender, setFirstRender] = useState(false);
    const [selectedFreq, setSelectedFreq] = useState(FrequencyType.Daily);
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [days, setDays] = useState([{ name: 'Sun', active: true },
        { name: 'Mon', active: false },
        { name: 'Tues', active: false },
        { name: 'Wed', active: false },
        { name: 'Thur', active: false },
        { name: 'Fri', active: false },
        { name: 'Sat', active: false }]);

    useEffect(() => {
        if(!firstRender){
            setFirstRenderTrue();
        }
     });

    const setFirstRenderTrue = () => {
        setFirstRender(true)
    }
    
    const toggleDaySelection = (e, day) => {
        e.stopPropagation();

        let newDay = [...days];
        var index = newDay.findIndex(x => x.name === day);
        newDay[index].active = !newDay[index].active;
        setDays(newDay);
    }

    const closePopup = (e) => {
        if (!document.getElementById('AddHabitPopup').contains(e.target))
            props.closePopup();
    }

    const handleSubmit = () => {
        let occurance = [];
        days.forEach((day, i) => {
            if(day.active)
                occurance.push(i);
        });
        
        let habit = {
            name: taskName,
            description: taskDescription,
            FrequencyType: selectedFreq,
            occurance: occurance.join('|').toString(),
            amount: 0
        };
        props.handleAddHabit(habit);
    }

    return(
        <div className='overlay' onClick={closePopup}>
            <div id="AddHabitPopup" className='popup-wrapper add-habit-popup'>
                <h2>Add A New Habit</h2>
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
                        <div className='habit-edit-title'>
                            Frequency
                        </div>
                        {/* FUTURE UPDATE: Freq type selector */}
                        {/* <div className='habit-edit-freq-type'>
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
                    <button className='save-btn' onClick={() => handleSubmit()}>Save</button>
                </div>
            </div>
                {/* <h2>Add A New Habit</h2>
                <div className='add-habit-input-wrapper'>
                    <input type="text" placeholder="Go For A Walk" id="input-name" className="add-habit-input" />
                    <br/>
                    <textarea placeholder="Walk for 30 minutes" id="input-description" className="add-habit-input"></textarea>
                    <div className="swal-fill-wrapper"> Fill Color:  
                        <input type="color" id="input-color" className="add-habit-input add-habit-color-input" />
                    </div>
                    <select name="frequency" id="input-frequency" onChange={showCustom} > 
                        <option value="0">Every Day</option> 
                        <option value="1">Once A Week</option> 
                        <option value="2">2 Times A Week</option> 
                        <option value="3">3 Times a Week</option> 
                        <option value="4">4 Times a Week</option> 
                        <option value="5">5 Times a Week</option> 
                        <option value="-1"> Custom </option> 
                    </select>
                    {showingCustom &&
                        <input type="number" id="input-frequency-custom" className="add-habit-input add-habit-freq-custom" min="1" />
                    }
                </div>

                <div className='submit-btn-wrapper'>
                    <button type='submit' onClick={handleSubmit}>Add Habit</button>
                </div> */}
        </div>
    )
}

export default AddHabit;