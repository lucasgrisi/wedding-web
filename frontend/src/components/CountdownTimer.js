import React, { useState, useEffect } from 'react';
import './CountdownTimer.css'; // Import the CSS file for styling

const CountdownTimer = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const circleStyle = {
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        // display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '10px',
        fontSize: '24px',
        fontWeight: 'bold',
        padding: '5px'
    };

    return (
        <div className="countdown-container">
            <div className="countdown-item">
                <div className="countdown-circle" style={circleStyle}>
                    {timeLeft.days}<br />
                    <span style={{ fontSize: '12px' }}>Dias</span>
                </div>
            </div>
            <div className="countdown-item">
                <div className="countdown-circle" style={circleStyle}>
                    {timeLeft.hours}<br />
                    <span style={{ fontSize: '12px' }}>Horas</span>
                </div>
            </div>
            <div className="countdown-item">
                <div className="countdown-circle" style={circleStyle}>
                    {timeLeft.minutes}<br />
                    <span style={{ fontSize: '12px' }}>Minutos</span>
                </div>
            </div>
            <div className="countdown-item">
                <div className="countdown-circle" style={circleStyle}>
                    {timeLeft.seconds}<br />
                    <span style={{ fontSize: '12px' }}>Segundos</span>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
