import cdk = require("@aws-cdk/core");
import mycdk = require('lib/util');
import ec2 = require("@aws-cdk/aws-ec2");
import ecr = require("@aws-cdk/aws-ecr");
import ecs = require("@aws-cdk/aws-ecs");
import iam = require("@aws-cdk/aws-iam");
import ecsPatterns =  require("@aws-cdk/aws-ecs-patterns");

interface EcsStackProps {
  vpc: ec2.Vpc;
  ecrRepository: ecr.Repository;
  containerName: string;
}

export class Ecs extends cdk.Construct {
  public readonly ecsCluster: ecs.Cluster;
  public readonly ecsService: ecsPatterns.ApplicationLoadBalancedFargateService;
  public readonly taskRole: iam.IRole;

  constructor(scope: cdk.Construct, id: mycdk.Identifier, props: EcsStackProps) {
    super(scope, id.cdkId)

    this.ecsCluster = new ecs.Cluster(this, "Cluster", {
      clusterName: id.stackName,
      vpc: props.vpc,
    });

    this.ecsService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, "Service", {
      cluster: this.ecsCluster,
      desiredCount: 1,
      publicLoadBalancer: true,
      taskImageOptions: {
        containerName: props.containerName,
        containerPort: 3000,
        image: ecs.ContainerImage.fromEcrRepository(props.ecrRepository),
      },
    });
    this.ecsService.targetGroup.configureHealthCheck({
      path: '/health',
    });

    const taskDefinitionPolicy = new iam.PolicyStatement();
    taskDefinitionPolicy.addActions(
      // Rules which allow ECS to attach network interfaces to instances
      // on your behalf in order for awsvpc networking mode to work right  "ec2:AttachNetworkInterface",
      "ec2:CreateNetworkInterface",
      "ec2:CreateNetworkInterfacePermission",
      "ec2:DeleteNetworkInterface",
      "ec2:DeleteNetworkInterfacePermission",
      "ec2:Describe*",
      "ec2:DetachNetworkInterface",
      // Rules which allow ECS to update load balancers on your behalf
      //  with the information sabout how to send traffic to your containers
      "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
      "elasticloadbalancing:DeregisterTargets",
      "elasticloadbalancing:Describe*",
      "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
      "elasticloadbalancing:RegisterTargets",
      //  Rules which allow ECS to run tasks that have IAM roles assigned to them.
      "iam:PassRole",
      //  Rules that let ECS create and push logs to CloudWatch.
      "logs:DescribeLogStreams",
      "logs:CreateLogGroup"
    );
    taskDefinitionPolicy.addAllResources();

    this.ecsService.service.taskDefinition.addToExecutionRolePolicy(
      taskDefinitionPolicy
    );

    const taskRolePolicy =  new iam.PolicyStatement();
    taskRolePolicy.addActions(
      // Allow the ECS Tasks to download images from ECR
      "ecr:GetAuthorizationToken",
      "ecr:BatchCheckLayerAvailability",
      "ecr:GetDownloadUrlForLayer",
      "ecr:BatchGetImage",
      // Allow the ECS tasks to upload logs to CloudWatch
      "logs:CreateLogStream",
      "logs:CreateLogGroup",
      "logs:PutLogEvents",
    );
    taskRolePolicy.addAllResources();

    this.ecsService.service.taskDefinition.addToTaskRolePolicy(
     taskRolePolicy
    );
    this.taskRole = this.ecsService.service.taskDefinition.taskRole;
  }
}




