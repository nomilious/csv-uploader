import {render, screen, fireEvent} from '@testing-library/react';
import MainScreen from './MainScreen';

// describe
const errorMsg = "Неправильный формат файла, разрешены только файлы .CSV";
const selectFileMsg = 'Выберите файл';
const consoleErrorMsg = "onFileLoad not passed";
test('renders MainScreen component', () => {
    // mock представляет собой имитацию или замену реального объекта или функции в тестах.
    const onFileLoadMock = jest.fn();
    render(<MainScreen onFileLoad={onFileLoadMock} />)

    const chooseFileButton = screen.getByText(selectFileMsg);
    expect(chooseFileButton).toBeInTheDocument();
});

test('onFileLoad not passed console error', () => {
    const consoleErrorSpy = jest.spyOn(global.console, 'log'); // Spy on console.error
    render(<MainScreen />);

    const csvText = "name,surname,phone\nJohn"
    const csvFile = new File([csvText], 'file.csv', {type: "text/csv"});

    const buttonElement = screen.getByRole("button", {name: selectFileMsg});
    const fileInputElement = screen.getByLabelText("Выбор файла")

    fireEvent.click(buttonElement);
    fireEvent.change(fileInputElement, { target: { files: [csvFile] } });

    // Expect the console.error message to be called
    expect(consoleErrorSpy).toHaveBeenCalledWith(consoleErrorMsg)
});

test('select CSV testing in MainScreen component', () => {
    // mock представляет собой имитацию или замену реального объекта или функции в тестах.
    const onFileLoadMock = jest.fn();

    // Create CSV file
    const csvText = "name,surname,phone\nJohn"
    const csvFile = new File([csvText], 'file.csv');

    render(<MainScreen onFileLoad={onFileLoadMock()} />);
    const buttonElement = screen.getByRole("button", {name: selectFileMsg});
    const fileInputElement = screen.getByLabelText("Выбор файла")

    // Simulate user selecting the CSV file
    fireEvent.click(buttonElement);
    fireEvent.change(fileInputElement, { target: { files: [csvFile] } });


    // our mock function must be called
    expect(onFileLoadMock).toBeCalledTimes(1)
});

test('select not CSV testing in MainScreen component', () => {
    const onFileLoadMock = jest.fn();

    render(<MainScreen onFileLoad={onFileLoadMock()} />);
    const buttonElement = screen.getByRole("button", {name: selectFileMsg});
    const fileInputElement = screen.getByLabelText("Выбор файла")

    // Simulate user selecting the CSV file
    fireEvent.click(buttonElement);
    fireEvent.change(fileInputElement, {
        target: {
            files: [new File([""], "my_name.txt", {type: "text/txt"})]
        }
    });
    const errorTextElement = screen.getByText(errorMsg)

    // our mock function must be called
    expect(errorTextElement).toBeInTheDocument()
});