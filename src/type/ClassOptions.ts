/*
 * Copyright 2016 - Daniel Popescu <dpopescu@adobe.com>
 */
/**
 * Defines the [[Serialize]] decorator options.
 */
export interface ClassOptions {
    /**
     * Root path to use when mapping.
     *
     * ## Example
     * ```JavaScript
     *  @Serialize({
     *      root: 'someObject'
     *  })
     *  class MyClass extends Serializable {
     *      @SerializeProperty()
     *      name:string;
     *  }
     * ```
     * ### Deserialize
     * ```JavaScript
     *  let instance:MyClass = new MyClass();
     *  instance.deserialize({
     *      someObject: {
     *          name: 'some value'
     *      }
     *  });
     *
     *  console.log(instance.name); // Will output 'some value'
     * ```
     * ### Serialize
     * ```JavaScript
     *  let instance:MyClass = new MyClass();
     *  instance.name = 'value';
     *
     *  console.log(instance.serialize()); // Will output {someObject:{name:'value'}}
     * ```
     */
    root?: string;
}
