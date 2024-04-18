import React, {useState} from 'react';
import {View} from "native-base";
import DateTimePicker from '@react-native-community/datetimepicker';



const DateInputIos = ({myDate,setDate}) => {
    const [displaymode, setMode] = useState('date');
    const [isDisplayDate, setShow] = useState(true);
    const changeSelectedDate = (event, selectedDate) => {
        const currentDate = selectedDate || myDate;
        setDate(currentDate);
    };
    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    return (
        <View>
            {isDisplayDate && (
                <DateTimePicker
                    value={myDate}
                    mode={displaymode}
                    display="default"
                    onChange={changeSelectedDate}
                />
            )}
        </View>

    );
};

export default DateInputIos;