import cdk = require('@aws-cdk/core');
import mycdk = require('lib/util');
import usecase = require('./usecase');

interface GuiStackProps extends usecase.DockerStackBaseProps{}

export class GuiStack extends usecase.DockerStack {
  constructor(app: cdk.App, id: mycdk.Identifier, props: GuiStackProps) {
    super(app, id, { ...props, })
  }
}

