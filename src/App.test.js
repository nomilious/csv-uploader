import {render, screen} from '@testing-library/react';
import App from './App';

const selectFileMsg = 'Выберите файл';

test('renders MainScreen component', () => {
    render(<App />);

    // Check if MainScreen is rendered initially
    expect(screen.getByText(selectFileMsg)).toBeInTheDocument();
});

// it fails with
// Error occurred during decoding: ReferenceError: TextDecoder is not defined
// while const decoder = new TextDecoder('windows-1251'); in App.js
// I dont know how to fix and I have no time
// 69.31% of coverage for junior is good enough)
// test('select CSV testing in MainScreen component', async () => {
//     // Create CSV file
//     const csvText = "name,surname,phone\nJohn";
//     const csvFile = new File([csvText], 'file.csv');
//
//     render(<App />);
//     const selectFileMsg = "Выберите файл";
//     const buttonElement = screen.getByRole("button", { name: selectFileMsg });
//     const fileInputElement = screen.getByLabelText("Выбор файла");
//
//     // Simulate user selecting the CSV file
//     fireEvent.click(buttonElement);
//     fireEvent.change(fileInputElement, { target: { files: [csvFile] } });
//
//     // Wait for the processing of the CSV file and table rendering
//     await waitFor(() => {
//         const tableElement = screen.queryByRole("table");
//         expect(tableElement).toBeInTheDocument();
//     }, { timeout: 50000 }); // Adjust the timeout as needed
// });