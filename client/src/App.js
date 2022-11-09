import { Outlet } from 'react-router-dom';
import AppBar from './components/AppBar';

const App = () => {
    return (
        <div>
            <AppBar />
            <Outlet />
        </div>
    );
}

export default App;
