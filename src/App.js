import { default as React, useState } from 'react';
import './App.css';
import { makeDescription } from './css-descriptions';
import { makeNewName } from './css-names';
import { stringCompare, windows } from './utils';

function App() {
  const [entries, setEntries] = useState(makeRandomEntries());
  const [spinning, setSpinning] = useState(false);
  function doRefresh() {
    setEntries(makeRandomEntries());
    setSpinning(true);
    setTimeout(() => setSpinning(false), 1000);
  }
  return (
    <div className="container">
      <h1>Rare CSS
          <i title="Click to refresh" onClick={doRefresh} className={`${spinning && 'fa-spin'} fa fa-refresh`} aria-hidden="true"></i>
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

const makeRandomEntries = () => Array.from(Array(30)).map(() => (
  {
    name: makeNewName(),
    description: makeDescription(),
  }
)).sort(({ name: a }, { name: b }) => stringCompare(a, b));


export default App;
