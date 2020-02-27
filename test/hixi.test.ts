import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import Hixi = require('../lib/hixi-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new Hixi.HixiStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});