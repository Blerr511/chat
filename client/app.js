const socket = require("socket.io-client")("http://localhost:8080/");

socket.on("connect", () => {
    // either with send()
    socket.send("Hello!");

    // or with emit() and custom event names
    socket.emit(
        "salutations",
        "Hello!",
        { mr: "john" },
        Uint8Array.from([1, 2, 3, 4])
    );
    socket.emit("auth", {token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjQ1ODJjNWMzN2YwNTQ1ODAzOGI3OTAiLCJ1c2VybmFtZSI6InRlc3Q0IiwiZW1haWwiOiJ0ZXN0NEAiLCJfX3YiOjAsImlhdCI6MTU5ODM5MTkzN30.PR6_dbX2xtmnVJc2JZKvw5ONJN9G2BEQyX0JboWVaQs"});
});

// handle the event sent with socket.send()
socket.on("message", (data) => {
    console.log(data);
});

// handle the event sent with socket.emit()
socket.on("greetings", (elem1, elem2, elem3) => {
    console.log(elem1, elem2, elem3);
});
