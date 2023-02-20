import * as cdk from "aws-cdk-lib";
import * as path from 'path';

const app = new cdk.App();
const stack = new cdk.Stack(app, "TravelBlog");

// Create S3 bucket to host static website files
const clientBucket = new cdk.aws_s3.Bucket(stack, "Bucket");

// Create CloudFront Distribution
const distribution = new cdk.aws_cloudfront.Distribution(stack, "Distribution", {
    defaultBehavior: {
        compress: true,
        origin: new cdk.aws_cloudfront_origins.S3Origin(clientBucket),
        viewerProtocolPolicy: cdk.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    }
});

// Upload client files to s3 bucket
new cdk.aws_s3_deployment.BucketDeployment(stack, "BucketDeployment", {
    destinationBucket: clientBucket,
    distribution,
    distributionPaths: ["/*"],
    memoryLimit: 512,
    sources: [
        cdk.aws_s3_deployment.Source.asset(
            path.resolve(__dirname, "../client/build")
        )
    ],
});