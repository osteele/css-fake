import { default as React, useState } from 'react';
import './App.css';
import { makeDescription } from './css-descriptions';
import { makeNewName } from './css-names';
import { stringCompare, windows } from './utils';

function App() {
  const [entries, setEntries] = useState(makeRandomEntries());
  const [spinning, setSpinning] = useState(false);
  function doRefresh() {
    if (spinning) { return; }
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      setEntries(makeRandomEntries());
    }, 1000);
  }
  function refreshItem(i) {
    const item = { name: makeNewName(), description: makeDescription() }
    setEntries([...entries.slice(0, i), item, ...entries.slice(i + 1)])
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
            {row.map(({ name, description }, j) =>
              <div key={j} className="col-sm list-group-item" onClick={() => refreshItem(2 * i + j)}>
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
