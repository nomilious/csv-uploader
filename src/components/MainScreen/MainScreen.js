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


    const handleButtonClick = () => {
        if (fileInputRef.current) {
            const fileInput = fileInputRef.current;
            // Trigger the click event on the file input
            fileInput.click();
        }
    };

    // center this form
    // by clicking on button, we trigger the input.type=list click
    return (
        <div
            className={`app-main`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <form data-testid="app-main__form" className={`app-main__form  ${dragging ? 'drag-over' : ''}`}>
                <h2 className="app-main__header">{dragging ? "Перетащите файл в эту область" : "Выберите файл в формате CSV"}</h2>
                {/*hidden by default*/}
                <label htmlFor="fileInput" className="app-main__label">
                    Выбор файла
                </label>
                {/*hidden by default*/}
                <input
                    id="fileInput"
                    type="file"
                    onChange={(e) => handleFileSelect(e)}
                    className="app-main__input"
                    placeholder="Choose File"
                    ref={fileInputRef}
                />
                {!dragging && (
                    <button onClick={handleButtonClick} className="app-main__btn main-btn" type="button">
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
        console.log("onFileLoad not passed");
    },
};

export default MainScreen;
