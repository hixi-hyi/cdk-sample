#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { HixiStack } from '../lib/hixi-stack';

const app = new cdk.App();
new HixiStack(app, 'HixiStack');
