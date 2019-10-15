import { default as React, useState } from 'react';
import './App.css';
import { fakeAttributeName } from './fakeCssAttributeNames';
import { fakeDescription } from './fakeCssDescriptions';
import { arrayWindows, stringCompare } from './utils';

function App() {
  const [entries, setEntries] = useState(fakeEntries());
  const [spinning, setSpinning] = useState(false);

  function replaceAllItems() {
    if (spinning) { return; }
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
      setEntries(fakeEntries());
    }, 1000);
  }

  function replaceItem(i) {
    setEntries([...entries.slice(0, i), fakeEntry(), ...entries.slice(i + 1)])
  }

  return (
    <div className="container">
      <h1>Rare CSS
          <i title="Click to refresh" onClick={replaceAllItems} className={`${spinning && 'fa-spin'} fa fa-refresh`} aria-hidden="true"></i>
        <small className="text-muted">Lesser-Known CSS Attributes</small>
      </h1>

      <dl className="list-group">
        {arrayWindows(entries, 2).map((row, i) =>
          <div className="row" key={i}>
            {row.map(({ name, description }, j) =>
              <div key={j} className="col-sm list-group-item"
                onClick={() => replaceItem(2 * i + j)}>
                <dt>{name}</dt>
                <dd>{description}</dd>
              </div>
            )}
          </div>
        )}
      </dl>
      <footer className="small">This site is under <a href="https://underconstruction.fun">under construction</a>.</footer>
    </div>
  );
}

const fakeEntries = () => Array.from(Array(30)).map(fakeEntry)
  .sort(({ name: a }, { name: b }) => stringCompare(a, b));

const fakeEntry = () => ({
  name: fakeAttributeName(),
  description: fakeDescription(),
})

export default App;
