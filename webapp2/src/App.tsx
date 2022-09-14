import { FC } from 'react';
import { Link } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

const App: FC = () => {

    return (
        <div className="App">
            <Theme preset={presetGpnDefault}>
                <AppRouter />

                <div style={{ position: 'fixed', zIndex: '200', background: '#fff', right: '0', bottom: '0' }}>
                    <Link to="/etp/rnmc">etp rnmc</Link> ..
                    <Link to="/etp/login">login</Link> ..
                    <Link to="/etp/logincode">login code</Link> ..
                    <Link to="/etp/reg">регистрация</Link>  ..
                    <Link to="/etp/">дашборд</Link>  ..
                    <hr />
                    <Link to="/">rnmc</Link> ..
                    <Link to="/login">login</Link> ..
                    <Link to="/code">login code</Link> ..
                    <Link to="/logout">logout</Link> ..
                    <Link to="/404">404</Link>
                </div>
            </Theme>
        </div>
    );
}

export default App;