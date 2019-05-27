import { Serializable } from '../../src/type/Serializable';
import { Serialize } from '../../src/decorator/Serialize';
import { Serializer } from '../../src/serialize/Serializer';

describe('Serialize Decorator', () => {
  it('should add serialize and deserialize methods to the target class prototype', () => {
    @Serialize({})
    class Test extends Serializable {}

    const test = new Test();
    expect(test.serialize).toBeDefined();
    expect(test.deserialize).toBeDefined();
  });

  it('should call Serializer.serialize with correct parameters', () => {
    spyOn(Serializer, 'serialize');

    @Serialize({})
    class Test extends Serializable {}

    const test = new Test();
    test.serialize();

    expect(Serializer.serialize).toHaveBeenCalledWith(Test, test, {});
  });

  it('should call Serializer.deserialize with correct parameters', () => {
    spyOn(Serializer, 'deserialize');

    @Serialize({})
    class Test extends Serializable {}

    const test = new Test();
    test.deserialize({
      test: 'test',
    });

    expect(Serializer.deserialize).toHaveBeenCalledWith(
      Test,
      test,
      {
        test: 'test',
      },
      {}
    );
  });
});
