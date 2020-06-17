import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime';

import { palette } from '../config.json';

import { App } from './core/app';

ReactDOM.render(<App palette={palette} />, document.getElementById('root'));
