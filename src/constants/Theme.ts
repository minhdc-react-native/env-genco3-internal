import {
    MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

const ThemeCustomize = {

}

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        ...ThemeCustomize
    },
};