import {Provider} from 'react-redux';
import {extendTheme, NativeBaseProvider, theme} from 'native-base';
import {store, persistor} from "./src/redux/store";
import RootNavigation from "./src/layout/RootNavigation";
import {PersistGate} from 'redux-persist/integration/react'

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
                <PersistGate loading={null} persistor={persistor}>
                    <RootNavigation/>
                </PersistGate>
            </Provider>
        </NativeBaseProvider>
    );
}

export default App;
