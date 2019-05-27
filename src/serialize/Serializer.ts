/*
 * Copyright 2016 - Daniel Popescu <dpopescu@adobe.com>
 */
import { Serializable } from '../type/Serializable';
import { ClassOptions } from '../type/ClassOptions';
import { PropertyOptions } from '../type/PropertyOptions';

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
  private static deserializeItem(options: PropertyOptions, value: object) {
    if (options.optional && !value) {
      return null;
    } else if (options.type) {
      const item = new options.type();
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
   * @returns {Object | null} - The serialized object.
   */
  private static serializeItem(options: PropertyOptions, value: any): object | null {
    if (options.optional && !value) {
      return null;
    } else if (options.type) {
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
   * @returns {object} - The serialized object.
   */
  public static serialize(
    target: any,
    context: Record<string, any>,
    classOptions: ClassOptions
  ): object {
    const result: Record<string, any> = {};

    Object.keys(target.prototype._serializeMap).forEach(name => {
      const value = context[name] || null;
      const options = target.prototype._serializeMap[name];
      const rootPath = options.root || classOptions.root || null;
      const mapName = options.map || options.name;
      let dataTarget = result;

      if (rootPath && rootPath !== '.') {
        if (!result[rootPath]) {
          result[rootPath] = {};
        }
        dataTarget = result[rootPath];
      }

      if (options.list) {
        if (value) {
          dataTarget[mapName] = value.map((v: any) => this.serializeItem(options, v));
        } else {
          dataTarget[mapName] = [];
        }
      } else {
        dataTarget[mapName] = this.serializeItem(options, value);
      }
    });

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
  public static deserialize(
    target: any,
    context: Record<string, any>,
    jsonObject: Record<string, any>,
    classOptions: ClassOptions = {}
  ) {
    Object.keys(target.prototype._serializeMap).forEach(name => {
      const options: PropertyOptions = target.prototype._serializeMap[name];
      const rootPath: string | null = options.root || classOptions.root || null;
      const mapName: string = options.map || options.name || '';
      let value: any = jsonObject[mapName] || null;

      if (rootPath && rootPath !== '.') {
        value = jsonObject[rootPath][mapName];
      }

      if (options.list) {
        if (value) {
          context[name] = value.map((v: any) => this.deserializeItem(options, v));
        } else {
          context[name] = [];
        }
      } else {
        context[name] = this.deserializeItem(options, value);
      }
    });
  }
}
