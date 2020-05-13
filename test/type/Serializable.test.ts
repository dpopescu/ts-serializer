import { Serializable } from '../../src/type/Serializable';

describe('Serializable', () => {
    it('should throw error if serialize() and deserialize() methods are not overridden', () => {
        class Test extends Serializable {}

        const test = new Test();

        expect(test.serialize).toThrowError(
            'This is an abstract method. It needs to be overridden.'
        );
        expect(test.deserialize).toThrowError(
            'This is an abstract method. It needs to be overridden.'
        );
    });
});
