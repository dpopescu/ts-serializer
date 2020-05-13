/*
 * Copyright 2016 - Daniel Popescu <dpopescu@adobe.com>
 */
import { PropertyOptions } from '../type/PropertyOptions';

/**
 * # SerializeProperty decorator
 * >**Note:** Can only be used on class properties.
 *
 * ## How it works
 * This annotation creates a new `_serializeMap` property on the class prototype and adds all decorated properties to this map.
 * The [[Serializer]] will use this map to serialize and deserialize from/to json objects.
 *
 * ## Example
 * ### Simple decorator
 * ```JavaScript
 *  @Serialize()
 *  class MyClass extends Serializable {
 *      @SerializeProperty()
 *      simpleProperty:string;
 *  }
 * ```
 * ### Decorator with options
 * ```JavaScript
 *  @Serialize()
 *  class MyClass extends Serializable {
 *      @SerializeProperty({
 *          map: 'someMapping',
 *          root: 'someObject'
 *      })
 *      simpleProperty:string;
 *  }
 * ```
 * @param options - A set of options to use when decorating a property.
 * @returns {PropertyDecorator}
 */
export function SerializeProperty(
    options: PropertyOptions = {}
): PropertyDecorator {
    return (target: object, name: string | symbol) => {
        if (!target.constructor.prototype._serializeMap) {
            target.constructor.prototype._serializeMap = {};
        }
        options.name = name as string;
        target.constructor.prototype._serializeMap[name] = options;
    };
}
