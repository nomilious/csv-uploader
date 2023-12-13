import transformText from './csvUtils';

describe('transformText function', () => {
    test('transform with addresses', () => {
        const inputText = `name,address\nJohn,"Moscow, str 1, 2023"\nJane,"Piter, Piter, str 1, 2023"`;
        const expectedOutput = [
            ['name', 'address'],
            ['John', 'Moscow, str 1, 2023'],
            ['Jane', 'Piter, Piter, str 1, 2023']
        ];
        expect(transformText(inputText)).toEqual(expectedOutput);
    });
    test('transform with only addresses', () => {
        const inputText = `address\n"Moscow, str 1, 2023"\n"Piter, Piter, str 1, 2023"`;
        const expectedOutput = [
            ['address'],
            ['Moscow, str 1, 2023'],
            ['Piter, Piter, str 1, 2023']
        ];
        expect(transformText(inputText)).toEqual(expectedOutput);
    });

})
