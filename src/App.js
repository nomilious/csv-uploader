import MainScreen from "./components/MainScreen";
import DataViewerScreen from "./components/DataViewer";
import {useEffect, useState} from "react";
import './App.css';

function App() {
    const [data, setData] = useState(null);
    //TODO add "loading state" while transforming text and reading csv


    useEffect(() => {
        const savedData = localStorage.getItem('data');
        if (savedData) {
            setData(JSON.parse(savedData));
        }
    }, []);

    const transformText = (text) => {
        // split by new line
        const rows = text.replaceAll('\r\n', "\n").split("\n");// because of different end on macOs and Windows


        // to parse right: split by address, then split the part before it by commas
        return rows.map(row => {
            const parts = row.split('"'); // Split by address

            // If there are quotes present
            if (parts.length > 1) {
                // part needed to be splitted by commax
                const firstPart = parts[0].split(',').slice(0, -1);
                // The address part with potential commas
                const address = parts[1];

                // Combine the parsed first part with the address
                return [...firstPart, address];
            } else {
                // If no quotes, split the row by commas directly
                return row.split(',');
            }
        });


        // Extract the field names from the first row
        // const fields = rows[0].split(',');
        //
        // const jsonData = [];
        //
        // for (let i = 1; i < rows.length; i++) {
        //     const values = rows[i].split(',');
        //
        //     // Create an object to store values with field names as keys
        //     const obj = {};
        //     for (let j = 0; j < fields.length; j++) {
        //         obj[fields[j]] = values[j];
        //     }
        //
        //     // Push the object into the JSON data array
        //     jsonData.push(obj);
        // }
        // return jsonData;
    }

    // used in MainScreen
    const handleFileLoad = (file) =>{
        const reader = new FileReader();
        reader.onload = function (e) {
            // Get the ArrayBuffer of the file content
            const arrayBuffer = e.target.result;

            // Decode using encoding windows-1251
            const decoder = new TextDecoder('windows-1251');
            const text = decoder.decode(arrayBuffer);

            const transformedText = transformText(text);

            setData(transformedText);
            // "upload" to localStorage
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
