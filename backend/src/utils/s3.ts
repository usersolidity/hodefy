
import S3 from 'aws-sdk/clients/s3.js';
import { AWS_CONFIG } from '../constants/index.js';

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/modules/credentials.html


// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/s3clientconfig.html


// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/s3client.html
export const client = new S3(AWS_CONFIG);

