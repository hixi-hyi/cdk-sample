import cdk = require("@aws-cdk/core");
import logs = require("@aws-cdk/aws-logs");
import { Identifier } from "./identifier";

export function RemovalPolicy(id: Identifier): cdk.RemovalPolicy  {
  if (id.rank.isProduction() && id.rank.isStandardFamily()) {
    return cdk.RemovalPolicy.RETAIN
  }
  return cdk.RemovalPolicy.DESTROY
}

export function LogGroupRetentionDay(id: Identifier): logs.RetentionDays {
  if (id.rank.isProduction() && id.rank.isStandardFamily()) {
    return logs.RetentionDays.INFINITE
  }
  return logs.RetentionDays.TWO_WEEKS
}
