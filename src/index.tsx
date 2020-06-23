// index.tsx
import React from 'react';
import { render } from 'react-dom';

console.log('Hello from tsx!');

render(<p>Hello Mark</p>, document.getElementById('root'));

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
