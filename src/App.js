import logo from './logo.svg';
import './App.scss';

import Toolbar from './components/toolbar/toolbar';
import DropCanvas from './components/canvas/canvas';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fontawesome from './utils/fontAwesome';

function App() {
    /**
     * Lifecycle method that renders React Elements in DOM
     */
    return (
        <div className="App">
            <header>
                <h2 className="app-title">
                    <FontAwesomeIcon className="logo highlight" icon="paint-brush"></FontAwesomeIcon>
                    React <span className="highlight">Studio</span>
                </h2>
            </header>
            <main>
                <section className="panel-left">
                    <Toolbar></Toolbar>
                </section>
                <section className="panel-right">
                    <DropCanvas></DropCanvas>
                </section>
            </main>
        </div>
    );
}

export default App;
