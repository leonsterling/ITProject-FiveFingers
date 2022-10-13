import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const usePasswordToggle = () => {
    const [visible, setVisibility] = useState(false);

    const IconToggle = (
        <Icon icon= { visible? "ant-design:eye-filled" : "ant-design:eye-invisible-filled" }
        onClick = {() => setVisibility(visibility => !visibility)}  
        />
    );

    const InputType = visible ? "text" : "password";

    return [InputType, IconToggle];
};

export default usePasswordToggle;