const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns a key as string and not the literal '0' for a valid event", () => {
    const event = { some: 'stuff' };
    const key = deterministicPartitionKey(event);
    
    expect(key).not.toBe("0");
    expect(typeof key).toBe('string');
  });

  it("Returns a key and not the literal '0' for a empty object as event", () => {
    const key = deterministicPartitionKey({});
    expect(key).not.toBe("0");
  });

  it("Returns a key with a length less than 256 characters long", () => {
    const event = { some: 'stuff', inserted: 'into it', without: 'partition key' }
    const key = deterministicPartitionKey(event);
    expect(key.length).toBeLessThan(256);
  });

  it("Returns a key with a length less than 256 characters for 300 characters long event's partition key", () => {
    const partitionKey300CharactersLong = "LJwhzHFMEeDL4zUKbxeeJ3HGyGt3KKBnt79zxzkPkyKRdV5QgHjpZVHz8qfaWFjaxLNUxuqmLe9ZBagkCAvPHQRDUyhJFaEi36rbvQ83MUAb6jC9xiSkjCRBkBmKfr7iLd5dBkj9T9wXbwWXnpwVYGmkqX6dM3bQiiqKn5rdP8LtAMwxVynHnT4FFqdQeEi6LjeFBKrvhbzjrB88g77UKVJ6XjpTPiEBpFHK7iVC8VJNaz7ycMBkErk9T8mUuBTp3MvaitE8ddfRZEVyNFHaj9aZXJc37TL63iS44jGt7axE";
    const event = { some: 'stuff', partitionKey: partitionKey300CharactersLong };
    
    const key = deterministicPartitionKey(event);
    expect(key.length).toBeLessThan(256);
  });

  it("Returns a key when an event's partition key is a deep-nested object", () => {
    const partitionKey = {
      foo: {
        bar: {
          baz: {
            lorem: {
              ipsum: '12345676',
            }
          },
        },
      },
    }
    const event = { partitionKey };
    
    const key = deterministicPartitionKey(event);
    expect(typeof key).toBe('string');
    expect(key).not.toBe('0');
  });
});
