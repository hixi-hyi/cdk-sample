import cdk = require("@aws-cdk/core");
import ec2 = require("@aws-cdk/aws-ec2");
import mycdk = require('cdk-identifier');

export class Network extends cdk.Construct {
  public readonly vpc: ec2.Vpc;

  constructor(scope:  cdk.Construct, id: mycdk.Identifier) {
    super(scope, id.cdkId);

    this.vpc = new ec2.Vpc(this, "Vpc", {
      natGateways: 1,
      maxAzs: 4,
    });
  }
}
