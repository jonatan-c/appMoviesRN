/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable comma-dangle */
/* eslint-disable eol-last */
/* eslint-disable semi */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState } from 'react';

interface ImageColors {
    primary: string;
    secundary: string;
}

interface ContextProps {
    colors : ImageColors;
    prevColors: ImageColors;
    setMainColors: (colors: ImageColors) => void;
    setPrevMainColors: (colors: ImageColors) => void;
}
export const GradientContext = createContext({} as ContextProps)

export const GradientProvider = ({children}: any) => {

    const [colors, setColors] = useState<ImageColors>({
        primary: 'transparent',
        secundary: 'transparent'
    })

    const [prevColors, setPrevColors] = useState<ImageColors>({
        primary: 'transparent',
        secundary: 'transparent'
    })

    const setMainColors = (colors : ImageColors) => {
        setColors(colors);
    }

    const setPrevMainColors = (colors : ImageColors) => {
        setPrevColors(colors);
    }

    return (
        <GradientContext.Provider
            value={{
                colors,
                prevColors,
                setMainColors,
                setPrevMainColors
            }}
        >
            {children}
        </GradientContext.Provider>
    )
}