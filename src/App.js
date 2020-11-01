import logo from './logo.svg';
import './App.css';

import Toolbar from './components/toolbar/toolbar';
import DropCanvas from './components/canvas/canvas-new';

function App() {
  return (
    <div className="App">
        <header>
            <h2 className="app-title">React Studio</h2>
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
