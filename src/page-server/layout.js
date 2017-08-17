export default (params, reactContent, helmet, initState) => {
  let chunks = {};

  if (params.chunks) {
    chunks = params.chunks();
  } else {
    chunks = require(`${__dirname}/../../build/assets/webpack-chunks.json`);
  }

  return `<!doctype html>
  <html ${helmet.htmlAttributes.toString()}>
    <head>
      <meta charSet="utf-8" />
      <link rel="stylesheet" href="${chunks.styles.main}" />
    </head>
    <body ${helmet.bodyAttributes.toString()}>
      <div id="root">${reactContent}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initState)}
      </script>
      <script src="${chunks.javascript.main}"></script>
    </body>
  </html>`;
};
