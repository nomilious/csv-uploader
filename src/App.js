import MainScreen from "./components/MainScreen";
import DataViewerScreen from "./components/DataViewer";
import {useEffect, useState} from "react";
import './App.css';
import transformText from "./utils/csvUtils";

function App() {
    const [data, setData] = useState(null);
    //TODO add "loading state" while transforming text and reading csv


    useEffect(() => {
        const savedData = localStorage.getItem('data');
        if (savedData) {
            setData(JSON.parse(savedData));
        }
    }, []);

    // used in MainScreen
    const handleFileLoad =  (file) =>{
        const reader = new FileReader();
        reader.onload = function (e) {
            // Get the ArrayBuffer of the file content
            const arrayBuffer = e.target.result;
            // Decode using encoding windows-1251
            const decoder = new TextDecoder('windows-1251');
            // try {
            //     decoder = new TextDecoder('windows-1251');
            //     // Your decoding logic here
            // } catch (error) {
            //     console.error('Error occurred during decoding:', error);
            // }
            const text = decoder.decode(arrayBuffer);

            const transformedText = transformText(text);

            setData(transformedText);
            // upload to localStorage
            localStorage.setItem('data', JSON.stringify(transformedText));

        }
        reader.readAsArrayBuffer(file);
    };

    // used in DataViewerScreen
    const handleReset = () => {
        setData(null);
        localStorage.removeItem('data');
    };

    // if file not chosen => MainScreen, else DataViewerScreen
    if (data) {
        return (
            <div className="app">
                <DataViewerScreen data={data} onReset={handleReset} />
            </div>
        );
    } else {
        return (
            <div className="app">
                <MainScreen onFileLoad={handleFileLoad} />
            </div>
        );
    }
}

export default App;
