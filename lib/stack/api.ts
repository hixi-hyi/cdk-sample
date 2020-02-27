import cdk = require('@aws-cdk/core');
import mycdk = require('lib/util');
import usecase = require('./usecase');

interface ApiStackProps extends usecase.DockerStackBaseProps{}

export class ApiStack extends usecase.DockerStack {
  constructor(app: cdk.App, id: mycdk.Identifier, props: ApiStackProps) {
    super(app, id, { ...props, })
  }
}

