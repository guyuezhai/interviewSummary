function identity <T,U>(value: T, message: U): T{
    console.log(message);
    return value;
}

console.log(identity<number, string>(12,'hello'));