/*
 * Copyright 2016 - Daniel Popescu <dpopescu@adobe.com>
 */
import {Serializable} from '../type/Serializable';
import {ClassOptions} from '../type/ClassOptions';
import {PropertyOptions} from '../type/PropertyOptions';

/**
 * Utility class to serialize and deserialize objects
 */
export class Serializer {
	/**
	 * Deserialize a property based on it's type.
	 * @see [[SerializeProperty]], [[PropertyOptions.type]]
	 * @param options - A set of options to use when deserializing this property.
	 * @param value - The object to deserialize.
	 * @returns {any} - The deserialized object.
	 */
	private static deserializeItem(options: PropertyOptions, value: Object) {
		if (options.type) {
			let item = new options.type();

            if(options.optional && !value) {
                return item;
            }

			item.deserialize(value);
			return item;
		} else {
			return value;
		}
	}

	/**
	 * Serialize a property based on it's type.
	 * @see [[SerializeProperty]], [[PropertyOptions.type]]
	 * @param options - A set of options to use when serializing this property.
	 * @param value - The object to serialize.
	 * @returns {Object} - The serialized object.
	 */
	private static serializeItem(options: PropertyOptions, value: any): Object {
		if (options.type) {
			return (value as Serializable).serialize();
		} else {
			return value;
		}
	}

	/**
	 * Serialize a class instance.
	 * @see [[Serialize]], [[ClassOptions]]
	 * @param target - Class type.
	 * @param context - Instance to serialize.
	 * @param classOptions - Class serialization options.
	 * @returns {Object} - The serialized object.
	 */
	public static serialize(target, context: Object, classOptions: ClassOptions): Object {
		let result = {};

		for (let name in target.prototype._serializeMap) {
			let value = context[name];
			let options = target.prototype._serializeMap[name];
			let rootPath = options.root || classOptions.root || null;
			let mapName = options.map || options.name;
			let dataTarget = result;

			if (rootPath && rootPath != '.') {
				if (!result[rootPath]) {
					result[rootPath] = {};
				}
				dataTarget = result[rootPath];
			}

			if (options.list) {
				dataTarget[mapName] = [];
				for (var i = 0; i < value.length; i++) {
					dataTarget[mapName].push(this.serializeItem(options, value[i]));
				}
			} else {
				dataTarget[mapName] = this.serializeItem(options, value);
			}
		}

		return result;
	}

	/**
	 * Deserialize a class instance.
	 * @see [[Serialize]], [[ClassOptions]]
	 * @param target - Class type.
	 * @param context - Instance to deserialize.
	 * @param jsonObject - Object to deserialize.
	 * @param classOptions - Class deserialization options.
	 */
	public static deserialize(target, context: Object, jsonObject: Object, classOptions: ClassOptions = {}) {
		for (let name in target.prototype._serializeMap) {
			let options: PropertyOptions = target.prototype._serializeMap[name];
			let rootPath: string = options.root || classOptions.root || null;
			let mapName: string = options.map || options.name;
			let value: any = jsonObject[mapName] || null;

			if (rootPath && rootPath != '.') {
				value = jsonObject[rootPath][mapName];
			}

			if (options.list) {
				context[name] = [];
				for (let i = 0; i < value.length; i++) {
					context[name].push(this.deserializeItem(options, value[i]));
				}
			} else {
				context[name] = this.deserializeItem(options, value);
			}
		}
	}
}