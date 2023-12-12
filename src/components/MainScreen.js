import { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./MainScreen.css";


const MainScreen = ({ onFileLoad }) => {
    const [error, setError] = useState('');
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            selectFile(file);
        }
    };

    const selectFile = (file) => {
        if (file.name.endsWith('.csv')) {
            setError('');
            onFileLoad(file);
        } else {
            setError("Неправильный формат файла, разрешены только файлы .CSV");
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDragging(false);

        const file = event.dataTransfer.files[0];
        if (file) {
            selectFile(file);
        }
    };


    const handleButtonClick = (event) => {
        if (fileInputRef.current) {
            const fileInput = fileInputRef.current;
            fileInput.click(); // Trigger the click event on the file input
        }
    };

    return (
        <div
            className={`app-main container d-flex justify-content-center align-items-center vh-100`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <form className={`app-main__form bg-white rounded d-flex justify-content-center align-items-center flex-column ${dragging ? 'drag-over' : ''}`}>

                <h2 className="app-main__header">{dragging ? "Перетащите файл в эту область" : "Выберите файл в формате CSV"}</h2>
                <input
                    type="file"
                    onChange={(e) => handleFileSelect(e)}
                    className="app-main__input"
                    ref={fileInputRef}
                />
                {!dragging && (
                    <button onClick={handleButtonClick} className="app-main__btn btn mt-5" type="button">
                        Выберите файл
                    </button>
                )}
                {error && <p className="app-main__error">{error}</p>}

            </form>
        </div>
    );
};

MainScreen.propTypes = {
    onFileLoad: PropTypes.func.isRequired,
};
MainScreen.defaultProps = {
    onFileLoad: () => {
        console.error("onFileLoad not passed");
    },
};

export default MainScreen;
