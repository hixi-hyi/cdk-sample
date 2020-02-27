import cdk = require('@aws-cdk/core');
import mycdk = require('lib/util');
import construct = require('lib/construct');
import common = require('lib/stack/common');

export interface DockerStackBaseProps {
  common: common.CommonStack,
}

interface DockerStackProps extends DockerStackBaseProps {
}

export class DockerStack extends cdk.Stack {
  public readonly ecs: construct.Ecs;

  constructor(app: cdk.Construct, id: mycdk.Identifier, props: DockerStackProps) {
    super(app, id.cdkId)
    const ecr = new construct.Ecr(this, id.child("Ecr"), {
      repositoryName: id.rank.slashString(mycdk.RankLoc.Legion, mycdk.RankLoc.Genus),
    });
    this.ecs = new construct.Ecs(this, id.child("Ecs"), {
      vpc: props.common.network.vpc,
      ecrRepository: ecr.ecrRepository,
      containerName: id.cdkId,
    });
  }
}

