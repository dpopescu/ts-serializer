import {Serializer} from './Serializer';

describe('Serializer', ()=> {
	it('should define methods for serialization and deserialization', ()=> {
		expect(Serializer.serialize).toBeDefined();
		expect(Serializer.deserialize).toBeDefined();
	});

	describe('serialize()', ()=> {
		it('should return an empty object if target\'s _serializeMap is empty', ()=> {
			let value = Serializer.serialize({
				prototype: {
					_serializeMap: {}
				}
			}, {}, {});

			expect(value).toEqual({});
		});
		it('should return a json object for mapped properties', ()=> {
			let value = Serializer.serialize({
				prototype: {
					_serializeMap: {
						a: {name: 'a'},
						b: {name: 'b'},
						c: {name: 'c'}
					}
				}
			}, {
				a: 'a value',
				b: 'b value',
				c: 'c value'
			}, {});

			expect(value).toEqual({
				a: 'a value',
				b: 'b value',
				c: 'c value'
			});
		});
		it('should return a json object for properties with map option', ()=> {
			let value = Serializer.serialize({
				prototype: {
					_serializeMap: {
						a: {name: 'a'},
						b: {name: 'b', map: 'mapped_b'},
						c: {name: 'c'}
					}
				}
			}, {
				a: 'a value',
				b: 'b value',
				c: 'c value'
			}, {});

			expect(value).toEqual({
				a: 'a value',
				mapped_b: 'b value',
				c: 'c value'
			});
		});
		it('should return a json object for properties with root option', ()=> {
			let value = Serializer.serialize({
				prototype: {
					_serializeMap: {
						a: {name: 'a'},
						b: {name: 'b', root: 'someObject'},
						c: {name: 'c'}
					}
				}
			}, {
				a: 'a value',
				b: 'b value',
				c: 'c value'
			}, {});

			expect(value).toEqual({
				a: 'a value',
				someObject: {
					b: 'b value'
				},
				c: 'c value'
			});
		});
		it('should return a json object for properties with class level root option', ()=> {
			let value = Serializer.serialize({
				prototype: {
					_serializeMap: {
						a: {name: 'a'},
						b: {name: 'b'},
						c: {name: 'c'}
					}
				}
			}, {
				a: 'a value',
				b: 'b value',
				c: 'c value'
			}, {root: 'someObject'});

			expect(value).toEqual({
				someObject: {
					a: 'a value',
					b: 'b value',
					c: 'c value'
				}
			});
		});
		it('should return a json object for properties with list option', ()=> {
			let value = Serializer.serialize({
				prototype: {
					_serializeMap: {
						a: {name: 'a'},
						b: {name: 'b', list: true},
						c: {name: 'c'}
					}
				}
			}, {
				a: 'a value',
				b: ['a', 'b', 'c'],
				c: 'c value'
			}, {});

			expect(value).toEqual({
				a: 'a value',
				b: ['a', 'b', 'c'],
				c: 'c value'
			});
		});
		it('should return a json object for properties with type option', ()=> {
			let test = function Test(): void {
				this.serialize = function () {
					return {
						test: 'test'
					};
				}
			};

			let value = Serializer.serialize({
				prototype: {
					_serializeMap: {
						a: {name: 'a'},
						b: {name: 'b', type: test},
						c: {name: 'c'}
					}
				}
			}, {
				a: 'a value',
				b: new test(),
				c: 'c value'
			}, {});

			expect(value).toEqual({
				a: 'a value',
				b: {test: 'test'},
				c: 'c value'
			});
		});
		it('should return a json object for properties with both list and type options', ()=> {
			let test = function Test(): void {
				this.serialize = function () {
					return {
						test: 'test'
					};
				}
			};

			let value = Serializer.serialize({
				prototype: {
					_serializeMap: {
						a: {name: 'a'},
						b: {name: 'b', list: true, type: test},
						c: {name: 'c'}
					}
				}
			}, {
				a: 'a value',
				b: [new test(), new test(), new test()],
				c: 'c value'
			}, {});

			expect(value).toEqual({
				a: 'a value',
				b: [{test: 'test'}, {test: 'test'}, {test: 'test'}],
				c: 'c value'
			});
		});
	});
	describe('deserialize()', ()=> {
		it('should leave the context unchanged if the _serializeMap is empty', ()=> {
			let context = {};

			Serializer.deserialize({
				prototype: {
					_serializeMap: {}
				}
			}, context, {
				a: 'a',
				b: 'b',
				c: 'c'
			});

			expect(context).toEqual({});
		});
		it('should map a simple json object to an existing context', ()=> {
			let context = {};

			Serializer.deserialize({
				prototype: {
					_serializeMap: {
						a: {name: 'a'},
						b: {name: 'b'},
						c: {name: 'c'}
					}
				}
			}, context, {
				a: 'a',
				b: 'b',
				c: 'c'
			});

			expect(context).toEqual({
				a: 'a',
				b: 'b',
				c: 'c'
			});
		});
		it('should map a json object to a context with class level root option', ()=> {
			let context = {};

			Serializer.deserialize({
				prototype: {
					_serializeMap: {
						a: {name: 'a'},
						b: {name: 'b'},
						c: {name: 'c'}
					}
				}
			}, context, {
				someObject: {
					a: 'a',
					b: 'b',
					c: 'c'
				}
			}, {root: 'someObject'});

			expect(context).toEqual({
				a: 'a',
				b: 'b',
				c: 'c'
			});
		});
		it('should map a json object to a context property with root option', ()=> {
			let context = {};

			Serializer.deserialize({
				prototype: {
					_serializeMap: {
						a: {name: 'a'},
						b: {name: 'b', root: 'someObject'},
						c: {name: 'c'}
					}
				}
			}, context, {
				a: 'a',
				someObject: {
					b: 'b',
				},
				c: 'c'
			}, {});

			expect(context).toEqual({
				a: 'a',
				b: 'b',
				c: 'c'
			});
		});
		it('should map a json object to a context property with map option', ()=> {
			let context = {};

			Serializer.deserialize({
				prototype: {
					_serializeMap: {
						a: {name: 'a'},
						b: {name: 'b', map: 'mapped_b'},
						c: {name: 'c'}
					}
				}
			}, context, {
				a: 'a',
				mapped_b: 'b',
				c: 'c'
			}, {});

			expect(context).toEqual({
				a: 'a',
				b: 'b',
				c: 'c'
			});
		});
		it('should map a json object to a context property with list option', ()=> {
			let context = {};

			Serializer.deserialize({
				prototype: {
					_serializeMap: {
						a: {name: 'a'},
						b: {name: 'b', list: true},
						c: {name: 'c'}
					}
				}
			}, context, {
				a: 'a',
				b: ['a', 'b', 'c'],
				c: 'c'
			}, {});

			expect(context).toEqual({
				a: 'a',
				b: ['a', 'b', 'c'],
				c: 'c'
			});
		});
		it('should map a json object to a context property with type option', ()=> {
			let test = function Test(): any {
				this.deserialize = function () {
					this.test = 'test';
				};
			};

			let context: any = {};

			Serializer.deserialize({
				prototype: {
					_serializeMap: {
						a: {name: 'a'},
						b: {name: 'b', type: test},
						c: {name: 'c'}
					}
				}
			}, context, {
				a: 'a',
				b: {test: 'test'},
				c: 'c'
			}, {});

			expect(context.a).toEqual('a');
			expect(context.b.test).toEqual('test');
			expect(context.c).toEqual('c');
		});
		it('should map a json object to a context property with both list and type options', ()=> {
			let test = function Test(): any {
				this.deserialize = function (value) {
					this.test = value.test;
				};
			};

			let context: any = {};

			Serializer.deserialize({
				prototype: {
					_serializeMap: {
						a: {name: 'a'},
						b: {name: 'b', type: test, list: true},
						c: {name: 'c'}
					}
				}
			}, context, {
				a: 'a',
				b: [{test: 'test1'}, {test: 'test2'}, {test: 'test3'}],
				c: 'c'
			}, {});

			expect(context.a).toEqual('a');
			expect(context.b[0].test).toEqual('test1');
			expect(context.b[1].test).toEqual('test2');
			expect(context.b[2].test).toEqual('test3');
			expect(context.c).toEqual('c');
		});
	});
});