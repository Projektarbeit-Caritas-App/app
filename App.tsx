import {Provider} from 'react-redux';
import {extendTheme, NativeBaseProvider, theme} from 'native-base';
import store from "./src/redux/store";
import RootNavigation from "./src/layout/RootNavigation";

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
                <RootNavigation/>
            </Provider>
        </NativeBaseProvider>
    );
}

export default App;
