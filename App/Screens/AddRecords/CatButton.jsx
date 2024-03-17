import React from 'react';
import { Button } from 'native-base';
import CatIcon from "./CatIcon";

const CatButton = (props) => {
    return (
        <Button
            variant="ghost"
            borderRadius={30}
            _pressed={{
                bg: "blueGray.200:alpha.50",
            }}
            w="50%"
            {...props} // This will allow you to pass other props to the custom button
        >
            <CatIcon  icon={props.icon} color={props.color} name={props.name} />
        </Button>
    );
};

export default CatButton;
