/*
 * Copyright 2016 - Daniel Popescu <dpopescu@adobe.com>
 */
import { Serializer } from '../serialize/Serializer';
import { ClassOptions } from '../type/ClassOptions';

/**
 * # Serialize decorators
 * >**Note:** Can only be used on a class.
 *
 * ## How it works
 * This annotation will add the implementation for [[Serializable.serialize]] and [[Serializable.deserialize]] methods on the class prototype.
 * The current implementation will use the [[Serializer.serialize]] and [[Serializer.deserialize]] methods.
 *
 * ## Example
 * ### Simple decorator
 * ```JavaScript
 *  @Serialize()
 *  class MyClass extends Serializable {}
 * ```
 * ### Decorator with options
 * ```JavaScript
 *  @Serialize({
 *      root: 'someRootObject'
 *  })
 *  class MyClass extends Serializable {}
 * ```
 * @param classOptions - A set of options to use when decorating the class.
 * @returns {ClassDecorator}
 */
export function Serialize(classOptions: ClassOptions): ClassDecorator {
  return (target): void => {
    target.prototype.deserialize = function(jsonObject: object): void {
      Serializer.deserialize(target, this, jsonObject, classOptions);
    };
    target.prototype.serialize = function(): object {
      return Serializer.serialize(target, this, classOptions);
    };
  };
}
