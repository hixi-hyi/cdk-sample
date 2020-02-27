import cdk = require("@aws-cdk/core");
import mycdk = require('lib/util');
import ecr = require("@aws-cdk/aws-ecr");

interface EcrStackProps {
  repositoryName: string,
}

export class Ecr extends cdk.Construct {
  public readonly ecrRepository: ecr.Repository;

  constructor(scope: cdk.Construct, id: mycdk.Identifier, props: EcrStackProps) {
    super(scope, id.cdkId);
    this.ecrRepository =  new ecr.Repository(this, "Repository", {
      repositoryName: props.repositoryName,
      removalPolicy: mycdk.RemovalPolicy(id),
    })
  }
}

