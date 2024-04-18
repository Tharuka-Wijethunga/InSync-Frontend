import React, {useState} from 'react';
import {View} from "native-base";
import DateTimePicker from '@react-native-community/datetimepicker';



const DateIos = () => {
    const [mydate, setDate] = useState(new Date());
    const [displaymode, setMode] = useState('date');
    const [isDisplayDate, setShow] = useState(true);
    const changeSelectedDate = (event, selectedDate) => {
        const currentDate = selectedDate || mydate;
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
                    value={mydate}
                    mode={displaymode}
                    display="default"
                    onChange={changeSelectedDate}
                />
            )}
        </View>

    );
};

export default DateIos;