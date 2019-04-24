import {SerializeProperty} from './SerializeProperty';
import {Serializable} from '../type/Serializable';

describe('SerializeProperty decorator', () => {
	it('should create an empty serializeMap', () => {
		class Test extends Serializable {
			@SerializeProperty()
			test: string;
		}

		expect(Test.prototype._serializeMap).toBeDefined();
	});
	it('should not overwrite the serializeMap if already exists', () => {
		class Test extends Serializable {
			@SerializeProperty()
			test: string;
			@SerializeProperty()
			anotherTest: string;
		}

		expect(Test.prototype._serializeMap).toEqual({
			test: {
				name: 'test'
			},
			anotherTest: {
				name: 'anotherTest'
			}
		});
	});
	it('should add the correct options object to the serializeMap', () => {
		class Test extends Serializable {
			@SerializeProperty({
				map: 'mapped_test',
				root: 'someObject'
			})
			test: string;
		}

		expect(Test.prototype._serializeMap).toEqual({
			test: {
				name: 'test',
				map: 'mapped_test',
				root: 'someObject'
			}
		});
	});
    it("should add the correct optional option to the serializeMap", () => {
        class Test extends Serializable {
            @SerializeProperty({
                map: "mapped_test",
                optional: true
            })
            test: string;
        }

        expect(Test.prototype._serializeMap).toEqual({
            test: {
                name: "test",
                map: "mapped_test",
                optional: true
            }
        });
    });
});
