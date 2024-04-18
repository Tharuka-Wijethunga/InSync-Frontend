import { View, Input, Pressable } from "native-base";
import React, { useState } from 'react';
import Colors from "../../../Config/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function DateInputAndroid() {
    const today = new Date();
    const [date, setDate] = useState(today);
    const [showPicker, setShowPicker] = useState(false);
    const [displaymode, setMode] = useState('date');

    const toggleDatepicker = () => {
        setShowPicker(!showPicker);
    };

    const changeSelectedDate = (event, selectedDate) => {
        const currentDate = selectedDate || today;
        toggleDatepicker();
        setDate(currentDate);
    };

    const formattedDate = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric'
    });

    return (
        <View flex={1}>
            {showPicker && (
                <DateTimePicker
                    mode={displaymode}
                    display={"default"}
                    value={date}
                    onChange={changeSelectedDate}
                />
            )}

            <Pressable onPress={toggleDatepicker}>
                <Input
                    textAlign={"center"}
                    variant={"filled"}
                    placeholder={"Select Date"}
                    dat
                    rounded={"full"}
                    borderWidth={0}
                    backgroundColor={Colors.BGColor}
                    value={formattedDate}
                    editable={false}
                    fontWeight={"normal"}
                    fontSize={16}
                />
            </Pressable>
        </View>
    );
}
