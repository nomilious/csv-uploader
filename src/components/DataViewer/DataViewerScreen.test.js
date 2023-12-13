import {render, screen, fireEvent} from '@testing-library/react';
import DataViewerScreen from './DataViewerScreen';

const mockData = [
    ['name', 'phone', 'bday', 'address', "email"],
    ['Eduard Belic', '123-456-7890','12/3/4567', 'Moscow', "eduard.belic.2002@gmail.com" ],
];

describe("Testing DataViewer Screen", ()=> {
    test("render DataViewerScreen component", ()=> {
        const onReset = jest.fn();
        render(<DataViewerScreen data={mockData} onReset={onReset} />)

        expect(screen.getByText('Имя')).toBeInTheDocument();
    })
    test("thead creating+redefing", ()=> {
        const onReset = jest.fn();
        render(<DataViewerScreen data={mockData} onReset={onReset} />)


        // must be redefined
        expect(screen.getByText('Имя')).toBeInTheDocument();
        expect(screen.getByText('Номер телефона')).toBeInTheDocument();
        expect(screen.getByText('Дата рождения')).toBeInTheDocument();
        expect(screen.getByText('Адрес')).toBeInTheDocument();
        //not redefined
        expect(screen.getByText('email')).toBeInTheDocument();

    })
    test("tbody creating", ()=> {
        const onReset = jest.fn();
        render(<DataViewerScreen data={mockData} onReset={onReset} />)

        //checking tbpdy elements to be the same as in the array
        for (const array of mockData.slice(1)){
            for (const field of array) {
                expect(screen.getByText(field)).toBeInTheDocument();
            }
        }
    })
    test('calls onReset prop when button is clicked', () => {
        const onResetMock = jest.fn();
        render(<DataViewerScreen data={mockData} onReset={onResetMock} />);
        const button = screen.getByText('Загрузить новый файл');
        fireEvent.click(button);
        expect(onResetMock).toHaveBeenCalled();
    });
    test('has correct propTypes', () => {
        expect(DataViewerScreen.propTypes).toEqual({
            data: expect.any(Function),
            onReset: expect.any(Function),
        });
    });

    test('has correct defaultProps', () => {
        expect(DataViewerScreen.defaultProps).toEqual({
            data: null,
            onReset: expect.any(Function),
        });
    });
})