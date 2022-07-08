import React, {useEffect, useState} from 'react';
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircleProgressbar = ({
                               percentage = 54,
                               trailColor = '#d3b6c6',
                               textColor = '#9a69cb',
                               pathColor = '#9b6bcc',
                               strokeWidth = 5
                           }) => {
    const [percent, setPercent] = useState(0);
    useEffect(() => {
        if (percent < percentage) {
            setTimeout(() => {
                setPercent(percent + 1);
            }, 15);
        }

    }, [percent])
    return (
        <div style={{width: 60, height: 60}}>
            <CircularProgressbar
                value={percent}
                text={`${percent}%`}
                strokeWidth={strokeWidth}
                styles={buildStyles({
                    strokeLinecap: 'butt',
                    textSize: '24px',
                    pathColor,
                    textColor,
                    trailColor
                })}
            />;
        </div>
    );
};

export default CircleProgressbar;
