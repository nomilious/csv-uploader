import MainScreen from "./components/MainScreen";
import './App.css';
import {useState} from "react";

function App() {
    const [file, setFile] = useState(null);

    return (
        <div className="App">
            <MainScreen onFileLoad={() => {}}/>
        </div>
    );
}

export default App;
