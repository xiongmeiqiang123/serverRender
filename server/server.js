const express = require( 'express')
const React = require( 'react')
const { renderToString } = require( 'react-dom/server')
const { RoutingContext, match } = require( 'react-router')
const { Provider } = require( 'react-redux')
const routes = require( './routes')
const configureStore = require( './store')

const app = express();

function renderFullPage(html, initialState) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
      <div id="root">
        <div>
          ${html}
        </div>
      </div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
      <script src="/static/bundle.js"></script>
    </body>
    </html>
  `;
}

app.use((req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(`Internal Server Error ${err}`);
    } else if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const store = configureStore();
      const state = store.getState();

      Promise.all([
        store.dispatch(fetchList()),
        store.dispatch(fetchItem(renderProps.params.id))
      ])
      .then(() => {
        const html = renderToString(
          <Provider store={store}>
            <RoutingContext {...renderProps} />
          </Provider>
        );
        res.end(renderFullPage(html, store.getState()));
      });
    } else {
      res.status(404).end('Not found');
    }
  });
});
