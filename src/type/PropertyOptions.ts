/*
 * Copyright 2016 - Daniel Popescu <dpopescu@adobe.com>
 */
import { ClassOptions } from './ClassOptions';

/**
 * Defines [[SerializeProperty]] decorator options
 */
export interface PropertyOptions extends ClassOptions {
    /**
     * Used by the [[Serializer]] to locate properties in the `_serializeMap`. This property should only be set by the [[SerializeProperty]]
     */
    name?: string;
    /**
     * Used to map to a different property name in the json object.
     *
     * ## Example
     * ```JavaScript
     *  @Serialize()
     *  class MyClass extends Serializable {
     *      @SerializeProperty({
     *          map: 'first_name'
     *      })
     *      firstName:string;
     *  }
     * ```
     * ### Deserialize
     * ```JavaScript
     *  let instance:MyClass = new MyClass();
     *  instance.deserialize({
     *      first_name: 'some value'
     *  });
     *
     *  console.log(instance.firstName); // Will output 'some value'
     * ```
     * ### Serialize
     * ```JavaScript
     *  let instance:MyClass = new MyClass();
     *  instance.firstName = 'value'
     *
     *  console.log(instance.serialize()); // Will output {first_name:'value'}
     * ```
     */
    map?: string;
    /**
     * Used to map a collection of elements.
     *
     * ## Example
     * ```JavaScript
     *  @Serialize()
     *  class MyClass extends Serializable {
     *      @SerializeProperty({
     *          list: true
     *      })
     *      values:string[];
     *  }
     * ```
     * ### Deserialize
     * ```JavaScript
     *  let instance:MyClass = new MyClass();
     *  instance.deserialize({
     *      values: ['a', 'b', 'c']
     *  });
     *
     *  console.log(instance.values); // Will output ['a', 'b', 'c']
     * ```
     * ### Serialize
     * ```JavaScript
     *  let instance:MyClass = new MyClass();
     *  instance.values = ['a', 'b', 'c'];
     *
     *  console.log(instance.serialize()); // Will output {values:['a','b','c']}
     * ```
     */
    list?: boolean;
    /**
     * Specifies the type of the property.
     *
     * ## Example
     * ```JavaScript
     *  @Serialize()
     *  class User extends Serializable {
     *      @SerializeProperty()
     *      firstName:string;
     *      @SerializeProperty()
     *      lastName:string;
     *  }
     *
     *  @Serialize()
     *  class Profile extends Serializable {
     *      @SerializeProperty({
     *          type: User
     *      })
     *      user:User;
     *  }
     * ```
     * ### Deserialize
     * ```JavaScript
     *  let profile:Profile = new Profile();
     *  profile.deserialize({
     *      user: {
     *          firstName: 'John',
     *          lastName: 'Doe'
     *      }
     *  });
     *
     *  console.log(profile.user.firstName); // Will output 'John'
     *  console.log(profile.user.lastName); // Will output 'Doe'
     * ```
     * ### Serialize
     * ```JavaScript
     *  let profile:Profile = new Profile();
     *  profile.user = new User();
     *  profile.user.firstName = 'John';
     *  profile.user.lastName = 'Doe';
     *
     *  console.log(profile.serialize()); // Will output {user:{firstName:'John', lastName:'Doe'}}
     * ```
     */
    type?: any;
    /**
     * Specifies if the property is optional or not.
     *
     * ## Example
     * ```JavaScript
     *  @Serialize()
     *  class User extends Serializable {
     *      @SerializeProperty()
     *      name:string;
     *      @SerializeProperty({
     * 		optional: true
     * 	  })
     *      age:number;
     *  }
     * ```
     * ### Deserialize
     * ```JavaScript
     *  let user:User = new User();
     *  user.deserialize({
     *      name: 'John'
     *  });
     *
     *  console.log(profile.name); // Will output 'John'
     *  console.log(profile.age); // Will output 'null'
     * ```
     * ### Serialize
     * ```JavaScript
     *  let user:User = new User();
     *  user.name = 'John';
     *
     *  console.log(user.serialize()); // Will output {name:'John', age:'null}
     * ```
     */
    optional?: boolean;
}
