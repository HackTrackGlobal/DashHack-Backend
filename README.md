# Trackboard backend

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Running
You now what to do..

```bash
node server.js
```

## Notes
You can access the `socket.io` object from the request object:
```javascript
app.get('/nah', function(req, res) {
  req.io // this is it
})
```

Also, note that `config.js` is not exsiting. After cloning this repo, create it, and add it to `.gitignore`.