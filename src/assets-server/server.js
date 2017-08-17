const path = require('path');
const Express = require('express');

const app = new Express();

app.use(Express.static(path.join(rootFolder, 'build', 'assets')));
app.use(Express.static(path.join(rootFolder, 'assets')));
app.listen(configuration.assets_server.port);
