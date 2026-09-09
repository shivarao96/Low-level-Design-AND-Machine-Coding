import { useEffect, useRef, useState } from "react"

export const Timer = () => {
    const [startTimer, setStartTimer] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const timeRef = useRef(null);

    useEffect(() => {
        if (startTimer) {
            timeRef.current = setInterval(() => {
                setCurrentTime((prev) => prev + 1000);
            }, 1000);
        }

        return () => {
            clearInterval(timeRef.current);
        }
    }, [setCurrentTime, startTimer])


    const handleStartTimer = () => {
        setStartTimer(!startTimer)
    }

    const reset = () => {
        setStartTimer(false);
        setCurrentTime(0);
        clearInterval(timeRef.current);
    }


    const getFormattedTime = (time) => {
        const getPaddedValues = (val) => {
            return !isNaN(val)
                ? val < 10
                    ? `0${Math.floor(val)}`
                    : Math.floor(val)
                : `00`;
        };

        const seconds = time / 1000;
        const secondsResetted = seconds % 60;

        const minutes = seconds / 60;
        const minutesResetted = minutes % 60;

        const hours = minutes / 60;

        const secondsPadded = getPaddedValues(secondsResetted);
        const minutesPadded = getPaddedValues(minutesResetted);
        const hoursPadded = getPaddedValues(hours);

        return `${hoursPadded}:${minutesPadded}:${secondsPadded}`;
    };


    return (
        <div
            style={{
                background: "white",
                padding: 20,
                textAlign: "center",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                }}
            >
                <button onClick={handleStartTimer}>
                    {startTimer ? "Pause" : currentTime > 0 ? "Resume" : "Start"}
                </button>
                <button onClick={reset}>Reset</button>
            </div>
            <div style={{ margin: "10px 0 0 0" }}>
                {getFormattedTime(currentTime)}
            </div>
        </div>
    );
}