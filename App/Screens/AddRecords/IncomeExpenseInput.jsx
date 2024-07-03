import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {Box, HStack, Input, Pressable, Text, VStack} from "native-base";
import Colors from "../../Config/Colors";
import {useFocusEffect} from "@react-navigation/native";

const IncomeExpenseInput = forwardRef(({ setType, setAmount, type, amount }, ref) => {
    const [incomePressed, setIncomePressed] = useState(type === "income");
    const [expensePressed, setExpensePressed] = useState(type === "expense");
    const [element, setElement] = useState(type === "income" ? '+' : '-');
    const [placeholderColor, setPlaceholderColor] = useState(type === "income" ? Colors.Green : Colors.Red);

    useImperativeHandle(ref, () => ({
        resetInputs: () => {
            setIncomePressed(false);
            setExpensePressed(true);
            setElement('-');
            setPlaceholderColor(Colors.Red);
            setType("expense");
            setAmount(0);
        }
    }));

    const handleIncomePress = () => {
        setIncomePressed(true);
        setExpensePressed(false);
        setType("income");
    };
    const handleExpensePress = () => {
        setExpensePressed(true);
        setIncomePressed(false);
        setType("expense");
    };

    // Keyboard popup each time the AddRecord tab is opened
    const inputRef = useRef();

    useFocusEffect(
        React.useCallback(()=>{
            if (inputRef.current) {
                inputRef.current.focus();
            }
        },[])
    );

    const fixedCaretPosition = amount.length;

    const handleSelectionChange = () => {
        inputRef.current?.setNativeProps({
            selection: {start: fixedCaretPosition, end: fixedCaretPosition}
        });
    };


    return (
        <VStack space={4}>
            <Box h="50px" bg={Colors.BGColor} rounded="2xl" alignItems={"center"} justifyContent={"center"} marginTop={3}>
                <HStack space={1}>
                    <Pressable w='48%'
                               borderRadius={20}
                               height={34}
                               justifyContent='center'
                               onPress={()=>{
                                   handleExpensePress();
                                   setElement('-');
                                   setPlaceholderColor(Colors.Red);
                               }}
                               style={{backgroundColor: expensePressed ? '#EF4444' : 'white'}}
                    >
                        <Text fontSize={14}
                              color={(expensePressed ? 'white':'black')}
                              alignSelf='center'
                        >
                            Expense
                        </Text>
                    </Pressable>
                    <Pressable w='48%'
                               borderRadius={20}
                               height={34}
                               justifyContent='center'
                               onPress={()=>{
                                   handleIncomePress();
                                   setElement('+');
                                   setPlaceholderColor(Colors.Green);
                               }}
                               style={{backgroundColor: incomePressed ? '#16A34A' : 'white'}}
                    >
                        <Text fontSize={14}
                              color={(incomePressed ? 'white':'black')}
                              alignSelf='center'
                        >
                            Income
                        </Text>
                    </Pressable>
                </HStack>
            </Box>
            <VStack space={2}>
                <Text fontSize={20} fontWeight="medium">Amount</Text>
                <Input
                    ref={inputRef}
                    variant="filled"
                    placeholder="0"
                    value={amount.toString()}
                    onChangeText={setAmount}
                    onSelectionChange={handleSelectionChange}
                    selection={{
                        start: fixedCaretPosition,
                        end: fixedCaretPosition,
                    }}
                    InputLeftElement={
                        <HStack space={4} alignItems='center' >
                            <Text fontWeight="semibold" paddingLeft={4} marginTop={30} fontSize={14}>
                                LKR
                            </Text>
                            <Text fontSize={42} color={placeholderColor}>
                                {element}
                            </Text>
                        </HStack>
                    }
                    placeholderTextColor={placeholderColor}
                    bg={Colors.BGColor}
                    rounded="20"
                    h="80px"
                    fontSize={48}
                    textAlign="right"
                    caretHidden={true}
                    borderWidth={0}
                    keyboardType="numeric"
                    color={placeholderColor}
                />

            </VStack>
        </VStack>
    );
});

export default IncomeExpenseInput;