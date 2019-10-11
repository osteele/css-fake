import React from 'react';
// import './App.css';
import { makeDescription } from './css-descriptions.js';
import { makeNewName } from './css-names.js';

const entries = Array.from(Array(30)).map(() => (
  {
    name: makeNewName(),
    description: makeDescription(),
  }
)).sort(({ name: a }, { name: b }) => a < b ? -1 : a > b ? 1 : 0);

function App() {
  return (
    <div className="container">
      <h1>Lesser-Known CSS Attributes</h1>

      <div className="row">
        {[0, 1].map((i) =>
          <div className="col-sm" key={i}>
            <dl className="list-group">
              {everyNth(entries, 2, i).map(({ name, description }, i) =>
                <div key={i} className="list-group-item">
                  <dt>{name}</dt>
                  <dd>{description}</dd>
                </div>
              )}
            </dl>
          </div>
        )
        }
      </div >
    </div >
  );
}

function everyNth(items, n, offset) {
  const ar = [];
  for (let i = offset || 0; i < items.length; i += n) {
    ar.push(items[i]);
  }
  return ar;
}

export default App;
