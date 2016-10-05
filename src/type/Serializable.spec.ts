import {Serializable} from './Serializable';

describe('Serializable', ()=> {
	it('should throw error if serialize() and deserialize() methods are not overridden', ()=> {
		class Test extends Serializable{

		}

		let test = new Test();

		expect(test.serialize).toThrowError('This is an abstract method. It needs to be overridden.');
		expect(test.deserialize).toThrowError('This is an abstract method. It needs to be overridden.');
	});
});