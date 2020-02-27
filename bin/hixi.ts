#!/usr/bin/env node
import 'source-map-support/register'
import cdk = require('@aws-cdk/core')
import mycdk = require('lib/util');
import { CommonStack } from "lib/stack/common"
import { ApiStack } from "lib/stack/api"
import { GuiStack } from "lib/stack/gui"

const id = new mycdk.Identifier(new mycdk.Rank({
  kingdom: 'hixi',
  division: 'sampleapp',
  section: 'dev', //TODO retrieve from environment
}))
const app = new cdk.App()

{
  const legionId = id.child({legion: 'service'})
  {
    const serviceId = legionId.child({family: 'standard'})
    const commonStack = new CommonStack(app, serviceId.child({genus: 'common'}))
    new ApiStack(app, serviceId.child({genus: 'api'}), {
      common: commonStack,
    })
    new GuiStack(app, serviceId.child({genus: 'gui'}), {
      common: commonStack,
    })
  }
  {
    const serviceId = legionId.child({family: 'qa'})
    const commonStack = new CommonStack(app, serviceId.child({genus: 'common'}))
    new ApiStack(app, serviceId.child({genus: 'api'}), {
      common: commonStack,
    })
    new GuiStack(app, serviceId.child({genus: 'gui'}), {
      common: commonStack,
    })
  }
}
