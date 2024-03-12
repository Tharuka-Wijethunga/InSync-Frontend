import React, {useState} from 'react';
import {HStack, IconButton, Input, View} from "native-base";
import DateTimePicker from '@react-native-community/datetimepicker';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Colors from "../../Config/Colors";
import TimeInput from "./TimeInput";

const DateInput = () => {
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

export default DateInput;