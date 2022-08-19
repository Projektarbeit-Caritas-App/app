import Navigation from "./src/layout/Navigation";
import {Provider} from 'react-redux';
import {extendTheme, NativeBaseProvider, theme} from 'native-base';
import store from "./src/redux/store";

const stylesheetTheme = extendTheme({
    colors: {
        primary: theme.colors.rose,
        background: '#fff'
    },
});

const App = () => {
    return (
        <NativeBaseProvider theme={stylesheetTheme}>
            <Provider store={store}>
                <Navigation/>
            </Provider>
        </NativeBaseProvider>
    );
}

export default App;
