// Placeholder.tsx
import React from 'react';

interface PlaceholderProps {
    type: string;
    label: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
}

export default function Placeholder({ 
    type, 
    label, 
    value, 
    onChange, 
    error 
}: PlaceholderProps) {
    
    const inputStyles = {
        width: '80%',
        padding: '12px 15px',
        margin: '8px auto',
        display: 'block',
        borderRadius: '25px',
        border: error ? '2px solid #ff4757' : '2px solid #e0e0e0',
        backgroundColor: error ? '#fff8f8' : 'white',
        fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
        fontSize: '14px',
        transition: 'all 0.3s ease',
        outline: 'none',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
    };

    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={label}
            style={inputStyles}
            onFocus={(e) => {
                e.target.style.borderColor = 'rgb(104, 217, 212)';
                e.target.style.boxShadow = '0 0 10px rgba(104, 217, 212, 0.3)';
                e.target.style.transform = 'scale(1.02)';
            }}
            onBlur={(e) => {
                e.target.style.borderColor = error ? '#ff4757' : '#e0e0e0';
                e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                e.target.style.transform = 'scale(1)';
            }}
        />
    );
}