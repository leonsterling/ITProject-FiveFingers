import React, { useState } from 'react';
import { Icon } from '@iconify/react';

const PasswordToggle = () => {

    const[visible, setVisibility] = useState(false);
   
    const Icon = (
        <Icon 
            icon={visible ? "bi:eye-slash-fill" : "bi:eye-fill"} 
            onClick={ () => setVisibility(isPasswordShown => !isPasswordShown)} 
        />
    );

    const InputType = visible ? "text" : "password"; 

    return [InputType, Icon];
};

export default PasswordToggle;