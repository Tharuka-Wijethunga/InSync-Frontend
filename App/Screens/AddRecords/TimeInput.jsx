import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {View} from "native-base";
const TimeInput = () => {
    const [mydate, setDate] = useState(new Date());
    const [displaymode, setMode] = useState('time');
    const [isDisplayDate, setShow] = useState(true);
    const changeSelectedDate = (event, selectedDate) => {
        const currentDate = selectedDate || mydate;
        setDate(currentDate);
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };
    const displayTimepicker = () => {
        showMode('time');
    };
    return (
        <View>
            {isDisplayDate && (
                <DateTimePicker
                    value={mydate}
                    mode={displaymode}
                    is24Hour={false}
                    display="default"
                    onChange={changeSelectedDate}
                />
            )}
        </View>
    );
};

export default TimeInput;