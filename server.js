const express = require('express');
const app = express();

// server config
const port = 3000;

// client-side react render
app.use('/', express.static(__dirname + '/build'));
app.get('*', (req, res, next) => {
    if (req.path.split('/')[1] === 'static') return next();

    res.sendFile(`${__dirname}/build/index.html`);
});

app.listen(port, () => {
    console.log(`run node server port: ${port}`);
});
