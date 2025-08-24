/*

res.json(data)
Expects a JavaScript object (or array, or anything serializable)
Express automatically converts it to JSON format
Sets the Content-Type: application/json header

res.send(data)
Can send any data type: string, buffer, object, array, etc.
If you pass an object, Express internally calls res.json() for you

| Method       | Input Type Expected           | Converts to JSON?  | Use Case                              |
| ------------ | ----------------------------- | ------------------ | ------------------------------------- |
| `res.json()` | JS object / array / value     | ✅ Yes              | When you want to send structured JSON |
| `res.send()` | Anything (string/object/HTML) | ✅ Only for objects | More flexible (strings, HTML, etc.)   |

app.use(...) is a method to add middleware to your application

express.json() is built-in middleware in Express.
It parses incoming requests with Content-Type: application/json
It converts the raw JSON body from the request into a JavaScript object
The result is stored in req.body
Without this middleware, req.body would be undefined for JSON requests. 

Parsing means reading the raw text of that JSON body and turning it into a JavaScript object so your server can use it

*/