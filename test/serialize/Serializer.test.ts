import {Serializer} from '../../src/serialize/Serializer';

describe('Serializer', () => {
    it('should define methods for serialization and deserialization', () => {
        expect(Serializer.serialize).toBeDefined();
        expect(Serializer.deserialize).toBeDefined();
    });

    describe('serialize()', () => {
        it("should return an empty object if target's _serializeMap is empty", () => {
            const value = Serializer.serialize(
                {
                    prototype: {
                        _serializeMap: {},
                    },
                },
                {},
                {}
            );

            expect(value).toEqual({});
        });
        it('should return a json object for mapped properties', () => {
            const value = Serializer.serialize(
                {
                    prototype: {
                        _serializeMap: {
                            a: {name: 'a'},
                            b: {name: 'b'},
                            c: {name: 'c'},
                        },
                    },
                },
                {
                    a: 'a value',
                    b: 'b value',
                    c: 'c value',
                },
                {}
            );

            expect(value).toEqual({
                a: 'a value',
                b: 'b value',
                c: 'c value',
            });
        });
        it('should return a json object for properties with map option', () => {
            const value = Serializer.serialize(
                {
                    prototype: {
                        _serializeMap: {
                            a: {name: 'a'},
                            b: {name: 'b', map: 'mapped_b'},
                            c: {name: 'c'},
                        },
                    },
                },
                {
                    a: 'a value',
                    b: 'b value',
                    c: 'c value',
                },
                {}
            );

            expect(value).toEqual({
                a: 'a value',
                mapped_b: 'b value',
                c: 'c value',
            });
        });
        it('should return a json object for properties with root option', () => {
            const value = Serializer.serialize(
                {
                    prototype: {
                        _serializeMap: {
                            a: {name: 'a'},
                            b: {name: 'b', root: 'someObject'},
                            c: {name: 'c'},
                        },
                    },
                },
                {
                    a: 'a value',
                    b: 'b value',
                    c: 'c value',
                },
                {}
            );

            expect(value).toEqual({
                a: 'a value',
                someObject: {
                    b: 'b value',
                },
                c: 'c value',
            });
        });
        it('should return a json object for properties with class level root option', () => {
            const value = Serializer.serialize(
                {
                    prototype: {
                        _serializeMap: {
                            a: {name: 'a'},
                            b: {name: 'b'},
                            c: {name: 'c'},
                        },
                    },
                },
                {
                    a: 'a value',
                    b: 'b value',
                    c: 'c value',
                },
                {root: 'someObject'}
            );

            expect(value).toEqual({
                someObject: {
                    a: 'a value',
                    b: 'b value',
                    c: 'c value',
                },
            });
        });
        it('should return a json object for properties with list option', () => {
            const value = Serializer.serialize(
                {
                    prototype: {
                        _serializeMap: {
                            a: {name: 'a'},
                            b: {name: 'b', list: true},
                            c: {name: 'c'},
                        },
                    },
                },
                {
                    a: 'a value',
                    b: ['a', 'b', 'c'],
                    c: 'c value',
                },
                {}
            );

            expect(value).toEqual({
                a: 'a value',
                b: ['a', 'b', 'c'],
                c: 'c value',
            });
        });
        it('should return a json object for properties with type option', () => {
            const test: any = function Test(): void {
                this.serialize = () => {
                    return {
                        test: 'test',
                    };
                };
            };

            const value = Serializer.serialize(
                {
                    prototype: {
                        _serializeMap: {
                            a: {name: 'a'},
                            b: {name: 'b', type: test},
                            c: {name: 'c'},
                        },
                    },
                },
                {
                    a: 'a value',
                    b: new test(),
                    c: 'c value',
                },
                {}
            );

            expect(value).toEqual({
                a: 'a value',
                b: {test: 'test'},
                c: 'c value',
            });
        });
        it('should return a json object for properties with both list and type options', () => {
            const test: any = function Test(): void {
                this.serialize = () => {
                    return {
                        test: 'test',
                    };
                };
            };

            const value = Serializer.serialize(
                {
                    prototype: {
                        _serializeMap: {
                            a: {name: 'a'},
                            b: {name: 'b', list: true, type: test},
                            c: {name: 'c'},
                        },
                    },
                },
                {
                    a: 'a value',
                    b: [new test(), new test(), new test()],
                    c: 'c value',
                },
                {}
            );

            expect(value).toEqual({
                a: 'a value',
                b: [{test: 'test'}, {test: 'test'}, {test: 'test'}],
                c: 'c value',
            });
        });
        it('should return a json object for properties with both list and type options', () => {
            const test: any = function Test(): void {
                this.serialize = (v: any) => {
                    return {
                        test: v.test,
                    };
                };
            };

            const value = Serializer.serialize(
                {
                    prototype: {
                        _serializeMap: {
                            a: {name: 'a'},
                            b: {name: 'b', type: test, optional: true},
                            c: {name: 'c', optional: true},
                            d: {name: 'd', list: true, optional: true},
                        },
                    },
                },
                {
                    a: 'a value',
                },
                {}
            );

            expect(value).toEqual({
                a: 'a value',
                b: null,
                c: null,
                d: [],
            });
        });
        it('should return a json object with the right negative values', () => {
            const value = Serializer.serialize(
                {
                    prototype: {
                        _serializeMap: {
                            a: {name: 'a'},
                            b: {name: 'b'},
                            c: {name: 'c'},
                            d: {name: 'd'},
                            e: {name: 'e'},
                            f: {name: 'f'},
                        },
                    },
                },
                {
                    a: true,
                    b: false,
                    c: null,
                    d: undefined,
                    e: 0,
                    f: 1,
                },
                {}
            );

            expect(value).toEqual({
                a: true,
                b: false,
                c: null,
                d: null,
                e: 0,
                f: 1,
            });
        });
    });
});
describe('deserialize()', () => {
    it('should leave the context unchanged if the _serializeMap is empty', () => {
        const context = {};

        Serializer.deserialize(
            {
                prototype: {
                    _serializeMap: {},
                },
            },
            context,
            {
                a: 'a',
                b: 'b',
                c: 'c',
            }
        );

        expect(context).toEqual({});
    });
    it('should map a simple json object to an existing context', () => {
        const context = {};

        Serializer.deserialize(
            {
                prototype: {
                    _serializeMap: {
                        a: {name: 'a'},
                        b: {name: 'b'},
                        c: {name: 'c'},
                    },
                },
            },
            context,
            {
                a: 'a',
                b: 'b',
                c: 'c',
            }
        );

        expect(context).toEqual({
            a: 'a',
            b: 'b',
            c: 'c',
        });
    });
    it('should map a json object to a context with class level root option', () => {
        const context = {};

        Serializer.deserialize(
            {
                prototype: {
                    _serializeMap: {
                        a: {name: 'a'},
                        b: {name: 'b'},
                        c: {name: 'c'},
                    },
                },
            },
            context,
            {
                someObject: {
                    a: 'a',
                    b: 'b',
                    c: 'c',
                },
            },
            {root: 'someObject'}
        );

        expect(context).toEqual({
            a: 'a',
            b: 'b',
            c: 'c',
        });
    });
    it('should map a json object to a context property with root option', () => {
        const context = {};

        Serializer.deserialize(
            {
                prototype: {
                    _serializeMap: {
                        a: {name: 'a'},
                        b: {name: 'b', root: 'someObject'},
                        c: {name: 'c'},
                    },
                },
            },
            context,
            {
                a: 'a',
                someObject: {
                    b: 'b',
                },
                c: 'c',
            },
            {}
        );

        expect(context).toEqual({
            a: 'a',
            b: 'b',
            c: 'c',
        });
    });
    it('should map a json object to a context property with map option', () => {
        const context = {};

        Serializer.deserialize(
            {
                prototype: {
                    _serializeMap: {
                        a: {name: 'a'},
                        b: {name: 'b', map: 'mapped_b'},
                        c: {name: 'c'},
                    },
                },
            },
            context,
            {
                a: 'a',
                mapped_b: 'b',
                c: 'c',
            },
            {}
        );

        expect(context).toEqual({
            a: 'a',
            b: 'b',
            c: 'c',
        });
    });
    it('should map a json object to a context property with list option', () => {
        const context = {};

        Serializer.deserialize(
            {
                prototype: {
                    _serializeMap: {
                        a: {name: 'a'},
                        b: {name: 'b', list: true},
                        c: {name: 'c'},
                    },
                },
            },
            context,
            {
                a: 'a',
                b: ['a', 'b', 'c'],
                c: 'c',
            },
            {}
        );

        expect(context).toEqual({
            a: 'a',
            b: ['a', 'b', 'c'],
            c: 'c',
        });
    });
    it('should map a json object to a context property with type option', () => {
        const test = function Test(): any {
            this.deserialize = () => {
                this.test = 'test';
            };
        };

        const context: any = {};

        Serializer.deserialize(
            {
                prototype: {
                    _serializeMap: {
                        a: {name: 'a'},
                        b: {name: 'b', type: test},
                        c: {name: 'c'},
                    },
                },
            },
            context,
            {
                a: 'a',
                b: {test: 'test'},
                c: 'c',
            },
            {}
        );

        expect(context.a).toEqual('a');
        expect(context.b.test).toEqual('test');
        expect(context.c).toEqual('c');
    });
    it('should map a json object to a context property with both list and type options', () => {
        const test = function Test(): any {
            this.deserialize = function (value: any) {
                this.test = value.test;
            };
        };

        const context: any = {};

        Serializer.deserialize(
            {
                prototype: {
                    _serializeMap: {
                        a: {name: 'a'},
                        b: {name: 'b', type: test, list: true},
                        c: {name: 'c'},
                    },
                },
            },
            context,
            {
                a: 'a',
                b: [{test: 'test1'}, {test: 'test2'}, {test: 'test3'}],
                c: 'c',
            },
            {}
        );

        expect(context.a).toEqual('a');
        expect(context.b[0].test).toEqual('test1');
        expect(context.b[1].test).toEqual('test2');
        expect(context.b[2].test).toEqual('test3');
        expect(context.c).toEqual('c');
    });
    it('should map a json object to a context property without some properties', () => {
        const test = function Test(): void {
            this.serialize = (v: any) => {
                return {
                    test: v.test,
                };
            };
        };

        const context: any = {};

        Serializer.deserialize(
            {
                prototype: {
                    _serializeMap: {
                        a: {name: 'a'},
                        b: {name: 'b', type: test, optional: true},
                        c: {name: 'c', optional: true},
                        d: {name: 'd', list: true, optional: true},
                    },
                },
            },
            context,
            {
                a: 'a',
            }
        );

        expect(context.a).toEqual('a');
        expect(context.b).toBeNull();
        expect(context.c).toBeNull();
        expect(context.d).toEqual([]);
    });
    it('should return a json object with the right negative values', () => {
        const context: any = {};

        Serializer.deserialize(
            {
                prototype: {
                    _serializeMap: {
                        a: {name: 'a'},
                        b: {name: 'b'},
                        c: {name: 'c'},
                        d: {name: 'd'},
                        e: {name: 'e'},
                        f: {name: 'f'},
                    },
                },
            },
            context,
            {
                a: true,
                b: false,
                c: null,
                d: undefined,
                e: 0,
                f: 1,
            }
        );

        expect(context.a).toBeTruthy();
        expect(context.b).toBeFalsy();
        expect(context.c).toBeNull();
        expect(context.d).toBeNull();
        expect(context.e).toEqual(0);
        expect(context.f).toEqual(1);
    });
    it('should return a json object with the right negative values', () => {
        const context: any = {};

        Serializer.deserialize(
            {
                prototype: {
                    _serializeMap: {
                        a: {name: 'a'},
                        b: {name: 'b'},
                        c: {name: 'c'},
                        d: {name: 'd'},
                        e: {name: 'e'},
                        f: {name: 'f'},
                        g: {optional: true, map: 'mapName', root: 'rootName'}
                    },
                },
            },
            context,
            {
                a: true,
                b: false,
                c: null,
                d: undefined,
                e: 0,
                f: 1,
            }
        );

        expect(context.a).toBeTruthy();
        expect(context.b).toBeFalsy();
        expect(context.c).toBeNull();
        expect(context.d).toBeNull();
        expect(context.e).toEqual(0);
        expect(context.f).toEqual(1);
    });
});
