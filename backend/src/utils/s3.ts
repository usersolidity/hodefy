import S3 from "aws-sdk/clients/s3.js";
import { AWS_CONFIG } from "../constants/index.js";

export const client = new S3(AWS_CONFIG);
