import React, { InputHTMLAttributes, useEffect, useRef, useState, useCallback } from 'react';
import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { useField } from '@unform/core';

import { Container, Error } from './styles';

interface InputProp extends InputHTMLAttributes<HTMLInputElement>{
    name: string;
    containerStyle?: object;
    icon: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProp> = ({name, containerStyle = {}, icon: Icon, ...rest}) => {
    
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    
    const inputRef = useRef<HTMLInputElement>(null);
    const { fieldName, defaultValue, error, registerField } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        })
    }, [fieldName, registerField]);

    const handleInputFocus = useCallback(() => {
        
        setIsFocused(true);

    },[]);

    const handleInputBlur = useCallback(() => {
        
        setIsFocused(false);

        setIsFilled(!!inputRef.current?.value);

    },[]);

    return (
        <Container 
            style={containerStyle} 
            isErrored={!!error} 
            isFilled={isFilled} 
            isFocused={isFocused} 
            data-testid='input-container'
        >
        
            { Icon && <Icon size={20} /> }
            <input
                
                onFocus={handleInputFocus}
                onBlur={handleInputBlur} 
                defaultValue={defaultValue} 
                ref={inputRef} 
                {...rest} 
            />
            { error && (
                <Error title={error}>
                    <FiAlertCircle color="c53030" size={20}/>
                </Error> 
            )}
        </Container>
    );
}

export default Input;