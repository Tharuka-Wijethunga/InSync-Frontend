import { View, Input, Pressable } from "native-base";
import React, { useState } from 'react';
import Colors from "../../../Config/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TimeAndroid() {
    const today = new Date();
    const [time, setTime] = useState(today);
    const [showPicker, setShowPicker] = useState(false);
    const [displaymode, setMode] = useState('time');
    const toggleDatepicker = () => {
        setShowPicker(!showPicker);
    };

    const changeSelectedTime = (event, selectedTime) => {
        const currentTime = selectedTime || today;
        toggleDatepicker();
        setTime(currentTime);
    };

    const formattedTime = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <View flex={1}>
            {showPicker && (
                <DateTimePicker
                    mode={displaymode}
                    display={"default"}
                    value={time}
                    is24Hour={false}
                    onChange={changeSelectedTime}
                />
            )}

            <Pressable onPress={toggleDatepicker}>
                <Input
                    textAlign={"center"}
                    variant={"filled"}
                    placeholder={"Select Time"}
                    dat
                    rounded={"full"}
                    borderWidth={0}
                    backgroundColor={Colors.BGColor}
                    value={formattedTime}
                    editable={false}
                    fontWeight={"normal"}
                    fontSize={16}
                />
            </Pressable>
        </View>
    );
}
