import { createContext } from 'react';

const InputParamsContext = createContext({
    inputParams: {},
    updateInputParams: () => {},
    levels: {},
    updateLevels: () => {},
    colors: {},
    updateColors: () => {},
});

export default InputParamsContext;