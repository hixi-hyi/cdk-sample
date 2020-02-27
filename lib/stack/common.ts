import cdk = require("@aws-cdk/core")
import mycdk = require('lib/util');
import construct = require('lib/construct')

export class CommonStack extends cdk.Stack {
  public readonly network: construct.Network

  constructor(app: cdk.App, id: mycdk.Identifier) {
    super(app, id.cdkId)
    this.network = new construct.Network(this, id.child("Network"))
  }
}

