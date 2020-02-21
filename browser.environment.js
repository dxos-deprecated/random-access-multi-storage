//
// Copyright 2019 Wireline, Inc.
//

import pify from 'pify';

import * as testModule from './src/browser';

window.testModule = testModule;
window.Buffer = Buffer;
window.pify = pify;
