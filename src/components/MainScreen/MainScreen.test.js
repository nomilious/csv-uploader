import {render, screen, fireEvent} from '@testing-library/react';
import MainScreen from './MainScreen';

// describe
const errorMsg = "Неправильный формат файла, разрешены только файлы .CSV";
const selectFileMsg = 'Выберите файл';
const consoleErrorMsg = "onFileLoad not passed";
describe("testing MainScreen functionality", ()=> {
    test('renders MainScreen component', () => {
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
        expect(onFileLoadMock).toBeCalled()
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
                files: [new File([], "my_name.txt")]
            }
        });
        const errorTextElement = screen.getByText(errorMsg)

        // error message must appear
        expect(errorTextElement).toBeInTheDocument()
    });
    test("drag&drop test appearing", ()=> {
        const onFileLoadMock = jest.fn();
        render(<MainScreen onFileLoad={onFileLoadMock} />);

        const formElement = screen.getByTestId('app-main__form');
        const h2Element = screen.getByRole('heading', {
            name: 'Выберите файл в формате CSV',
        });

        // Simulate drag enter event
        fireEvent.dragOver(formElement);


        // Check if the header text changes during drag enter
        expect(h2Element).toHaveTextContent('Перетащите файл в эту область');
    })
    test("drag&drop drop CSV", ()=> {
        const onFileLoadMock = jest.fn();
        render(<MainScreen onFileLoad={onFileLoadMock} />);

        const formElement = screen.getByTestId('app-main__form');
        const h2Element = screen.getByRole('heading', {
            name: 'Выберите файл в формате CSV',
        });

        // Simulate drag enter event
        fireEvent.drop(formElement, { dataTransfer: { files: [new File([], 'file.csv')] } });


        // Check if mock is called
        expect(onFileLoadMock).toBeCalled();
    })
    test("drag&drop drop not CSV", ()=> {
        const onFileLoadMock = jest.fn();
        render(<MainScreen onFileLoad={onFileLoadMock} />);

        const formElement = screen.getByTestId('app-main__form');


        // Simulate drag enter event
        fireEvent.drop(formElement, { dataTransfer: { files: [new File([], 'file.txt')] } });


        // Check if mock is not called(errormsg appears)
        expect(onFileLoadMock).toBeCalledTimes(0);
    })

    test('has correct propTypes', () => {
        expect(MainScreen.propTypes).toEqual({
            onFileLoad: expect.any(Function),
        });
    });

    test('has correct defaultProps', () => {
        expect(MainScreen.defaultProps).toEqual({
            onFileLoad: expect.any(Function),
        });
    });
})
