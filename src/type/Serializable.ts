import {PropertyOptions} from './PropertyOptions';
/**
 * Helper class to represent serializable objects. The actual implementation of the [[Serializable.serialize]] and [[Serializable.deserialize]]
 * will be provided by the [[Serializer]]
 */
export abstract class Serializable {
	/**
	 * Serialize as JSON Object
	 */
	serialize(): any {
		throw new Error('This is an abstract method. It needs to be overridden.');
	}

	/**
	 * Deserialize from JSON Object
	 * @param jsonObject - The source object.
	 */
	deserialize(jsonObject): void {
		throw new Error('This is an abstract method. It needs to be overridden.');
	}

	/**
	 * Keeps track of all decorated properties.
	 * >**Note:** This property should only be used by the [[Serializer]] class
	 *
	 * @see [[SerializeProperty]]
	 */
	 _serializeMap: {string: PropertyOptions};

	/**
	 * @hidden
	 */
	prototype:any;
}