import Navigation from "./src/layout/Navigation";
import {Provider} from 'react-redux';
import {extendTheme, NativeBaseProvider, theme} from 'native-base';
import store from "./src/redux/store";

const style = extendTheme({
    colors: {
        primary: theme.colors.rose,
    },
});

const App = () => {
    return (
        <NativeBaseProvider theme={style}>
            <Provider store={store}>
                <Navigation/>
            </Provider>
        </NativeBaseProvider>
    );
}

export default App;
