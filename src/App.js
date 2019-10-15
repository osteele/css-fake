import { default as React, useEffect, useRef, useState } from 'react';
import './App.css';
import { fakeAttributeName } from './fakeCssAttributeNames';
import { fakeDescription } from './fakeCssDescriptions';
import { arrayWindows, stringCompare } from './utils';

function App() {
  const [entries, setEntries] = useState(fakeEntries());
  const [scheduleReplaceAll, spinning] = useMutexProtection((release) => {
    setTimeout(() => {
      replaceAllItems();
      release();
    }, 1000);
  });

  useReplaceableTimeout(() => {
    const match = window.location.search.match(/[?&]refresh(?:=(\d+))?($|&)/);
    if (match) {
      const seconds = Number(match[1] || 10000);
      return setTimeout(replaceAllItems, seconds);
    }
  });

  const replaceAllItems = () => setEntries(fakeEntries());
  const replaceItem = (i) =>
    setEntries([...entries.slice(0, i), fakeEntry(), ...entries.slice(i + 1)]);

  return (
    <div className="container">
      <h1>Rare CSS
          <i title="Click to refresh" onClick={scheduleReplaceAll} className={`${spinning && 'fa-spin'} fa fa-refresh`} aria-hidden="true"></i>
        <small className="text-muted">Lesser-Known CSS Attributes</small>
      </h1>

      <dl className="list-group">
        {arrayWindows(entries, 2).map((row, i) =>
          <div className="row" key={i}>
            {row.map(({ name, description }, j) =>
              <div key={j} className="col-sm list-group-item" onClick={() => replaceItem(2 * i + j)}>
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

// Accepts a function that creates a timeout. If the function
// returns a setTimeout id, the timeout is cancelled if the
// function is called again.
function useReplaceableTimeout(callback) {
  const timeoutIdRef = useRef(null);
  useEffect(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    const timeoutId = callback();
    timeoutIdRef.current = timeoutId;
  });
}

// Accepts a function that shouldn't be called again until it has signaled that
// it is complete, by calling its argument.
//
// Returns a function that guards the callback, and a value that indicates
// whether the function is currently running.
function useMutexProtection(callback) {
  const [isRunning, setIsRunning] = useState(false);
  function guardedCallback() {
    if (isRunning) { return; }
    setIsRunning(true);
    callback(() => setIsRunning(false));
  }
  return [guardedCallback, isRunning];
}

export default App;
