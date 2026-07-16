import { type Node, type NodeAPI, type NodeDef } from 'node-red';

export type APICredentials = {
  applicationId: string;
  applicationSecret: string;
};

export type Properties = {
  name: string;
};

export type DVGroupAPICredentialsNode = Node<APICredentials> & APICredentials;

function main(RED: NodeAPI) {
  function DVGroupAPICredentials(
    this: DVGroupAPICredentialsNode,
    config: NodeDef & Properties,
  ) {
    RED.nodes.createNode(this, config);

    if (
      this.credentials &&
      this.credentials.applicationId &&
      this.credentials.applicationSecret
    ) {
      this.log('API credentials ready!');
      this.applicationId = this.credentials.applicationId;
      this.applicationSecret = this.credentials.applicationSecret;
      return;
    }

    this.error('Bad API credentials!');
    this.debug(JSON.stringify(this.credentials));
  }

  RED.nodes.registerType('dvgroup-api-credentials', DVGroupAPICredentials, {
    credentials: {
      applicationId: { type: 'text' },
      applicationSecret: { type: 'password' },
    },
  });
}

export default main;
