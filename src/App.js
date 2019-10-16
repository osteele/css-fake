import { default as React, useState } from 'react';
import './App.css';
import { fakeAttributeName } from './fakeCssAttributeNames';
import { fakeDescription } from './fakeCssDescriptions';
import { useMutexGuard, useRestartableTimeoutEffect } from './hooks';
import { arrayWindows, stringCompare } from './utils';


function App() {
  const [entries, setEntries] = useState(fakeEntries());
  const [scheduleReplaceAll, spinning] = useMutexGuard((release) => {
    setTimeout(() => {
      replaceAllItems();
      release();
    }, 1000);
  });

  useRestartableTimeoutEffect(() => {
    const match = window.location.search.match(/[?&]refresh(?:=(\d+))?($|&)/);
    if (match) {
      const seconds = Number(match[1] || 10000);
      return setTimeout(replaceAllItems, seconds);
    }
  });

  const replaceAllItems = () =>
    setEntries(fakeEntries());
  const replaceItem = (i) =>
    setEntries([...entries.slice(0, i), fakeEntry(), ...entries.slice(i + 1)]);

  return (
    <div className="container">
      <h1>Rare CSS
          <i
          title="Click to refresh"
          onClick={scheduleReplaceAll}
          className={`fa fa-refresh ${spinning && 'fa-spin'}`}
          aria-hidden="true" />
        <small className="text-muted">Lesser-Known CSS Attributes</small>
      </h1>

      <dl className="list-group">
        {arrayWindows(entries, 2).map((row, i) =>
          <div className="row" key={i}>
            {row.map(({ name, description }, j) =>
              <div
                key={j}
                className="col-sm list-group-item"
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
});

export default App;
