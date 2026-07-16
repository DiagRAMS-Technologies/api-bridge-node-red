import { type Node, type NodeDef, type NodeAPI } from 'node-red';
import { jest, describe, beforeEach, test, expect } from '@jest/globals';
import DvGroupAPICredentials, { type APICredentials } from './credentials.js';
import { EventEmitter } from 'events';

describe('DvGroupAPICredentials', () => {
  const RED = {
    nodes: {
      createNode: jest.fn<NodeAPI['nodes']['createNode']>(),
      registerType: jest.fn<NodeAPI['nodes']['registerType']>(),
    },
  };
  const error = jest.fn<Node<object>['error']>();
  const debug = jest.fn<Node<object>['debug']>();
  const log = jest.fn<Node<object>['log']>();

  function spawnEmitter(credentials?: APICredentials) {
    const emitter = new EventEmitter() as unknown as EventEmitter & {
      error: Node<object>['error'];
      debug: Node<object>['debug'];
      log: Node<object>['log'];
      credentials?: Node<object>['credentials'];
    };

    emitter.error = error;
    emitter.debug = debug;
    emitter.log = log;
    emitter.credentials = credentials;

    return emitter;
  }

  beforeEach(() => {
    RED.nodes.createNode.mockClear();
    RED.nodes.registerType.mockClear();
    error.mockClear();
    log.mockClear();
    debug.mockClear();
  });

  test('should work with credentials', () => {
    DvGroupAPICredentials(RED as unknown as NodeAPI);

    const [[, dvGroupAPICredentialsNode]] = RED.nodes.registerType.mock.calls;
    const emitter = spawnEmitter({
      applicationId: 'abbacaca-b0b0-b0b0-b0b0-abbacacacaca',
      applicationSecret: 'this_is_a_secret',
    });

    dvGroupAPICredentialsNode.apply(emitter as unknown as Node<object>, [
      {
        name: 'My Credentials',
      } as unknown as NodeDef,
    ]);

    expect(error.mock.calls).toMatchInlineSnapshot(`[]`);
    expect(debug.mock.calls).toMatchInlineSnapshot(`[]`);
    expect(log.mock.calls).toMatchInlineSnapshot(`
[
  [
    "API credentials ready!",
  ],
]
`);
    expect(RED.nodes.createNode.mock.calls).toMatchInlineSnapshot(`
[
  [
    EventEmitter {
      "_events": {},
      "_eventsCount": 0,
      "_maxListeners": undefined,
      "applicationId": "abbacaca-b0b0-b0b0-b0b0-abbacacacaca",
      "applicationSecret": "this_is_a_secret",
      "credentials": {
        "applicationId": "abbacaca-b0b0-b0b0-b0b0-abbacacacaca",
        "applicationSecret": "this_is_a_secret",
      },
      "debug": [MockFunction],
      "error": [MockFunction],
      "log": [MockFunction] {
        "calls": [
          [
            "API credentials ready!",
          ],
        ],
        "results": [
          {
            "type": "return",
            "value": undefined,
          },
        ],
      },
      Symbol(shapeMode): false,
      Symbol(kCapture): false,
    },
    {
      "name": "My Credentials",
    },
  ],
]
`);
    expect(RED.nodes.registerType.mock.calls).toMatchInlineSnapshot(`
[
  [
    "dvgroup-api-credentials",
    [Function],
    {
      "credentials": {
        "applicationId": {
          "type": "text",
        },
        "applicationSecret": {
          "type": "password",
        },
      },
    },
  ],
]
`);
  });

  test('should fail without credentials', () => {
    DvGroupAPICredentials(RED as unknown as NodeAPI);

    const [[, dvGroupAPICredentialsNode]] = RED.nodes.registerType.mock.calls;
    const emitter = spawnEmitter();

    dvGroupAPICredentialsNode.apply(emitter as unknown as Node<object>, [
      {} as unknown as NodeDef,
    ]);

    expect(error.mock.calls).toMatchInlineSnapshot(`
[
  [
    "Bad API credentials!",
  ],
]
`);
    expect(debug.mock.calls).toMatchInlineSnapshot(`
[
  [
    undefined,
  ],
]
`);
    expect(log.mock.calls).toMatchInlineSnapshot(`[]`);
    expect(RED.nodes.createNode.mock.calls).toMatchInlineSnapshot(`
[
  [
    EventEmitter {
      "_events": {},
      "_eventsCount": 0,
      "_maxListeners": undefined,
      "credentials": undefined,
      "debug": [MockFunction] {
        "calls": [
          [
            undefined,
          ],
        ],
        "results": [
          {
            "type": "return",
            "value": undefined,
          },
        ],
      },
      "error": [MockFunction] {
        "calls": [
          [
            "Bad API credentials!",
          ],
        ],
        "results": [
          {
            "type": "return",
            "value": undefined,
          },
        ],
      },
      "log": [MockFunction],
      Symbol(shapeMode): false,
      Symbol(kCapture): false,
    },
    {},
  ],
]
`);
    expect(RED.nodes.registerType.mock.calls).toMatchInlineSnapshot(`
[
  [
    "dvgroup-api-credentials",
    [Function],
    {
      "credentials": {
        "applicationId": {
          "type": "text",
        },
        "applicationSecret": {
          "type": "password",
        },
      },
    },
  ],
]
`);
  });
});
