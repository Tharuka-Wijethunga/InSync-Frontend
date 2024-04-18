import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {View} from "native-base";
const TimeInputIos = ({myTime, setTime}) => {

    const [displaymode, setMode] = useState('time');
    const [isDisplayDate, setShow] = useState(true);
    const changeSelectedDate = (event, selectedDate) => {
        const currentDate = selectedDate || myTime;
        setTime(currentDate);
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
                    value={myTime}
                    mode={displaymode}
                    is24Hour={false}
                    display="default"
                    onChange={changeSelectedDate}
                />
            )}
        </View>
    );
};

export default TimeInputIos;