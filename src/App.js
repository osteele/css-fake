import React from 'react';
import './App.css';
import { makeDescription } from './css-descriptions';
import { makeNewName } from './css-names';
import { windows } from './utils';

const entries = Array.from(Array(30)).map(() => (
  {
    name: makeNewName(),
    description: makeDescription(),
  }
)).sort(({ name: a }, { name: b }) => a < b ? -1 : a > b ? 1 : 0);

function App() {
  return (
    <div className="container">
      <h1>Rare CSS
        <small className="text-muted">Lesser-Known CSS Attributes</small>
      </h1>

      <dl className="list-group">
        {windows(entries, 2).map((row, i) =>
          <div className="row" key={i}>
            {row.map(({ name, description }, i) =>
              <div key={i} className="col-sm list-group-item" >
                <dt>{name}</dt>
                <dd>{description}</dd>
              </div>
            )}
          </div>
        )}
      </dl>
    </div >
  );
}

export default App;
