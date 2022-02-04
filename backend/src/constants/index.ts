import { AWSConfig } from "../interfaces/aws";

export const AWS_CONFIG: AWSConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!,
};

export const UPLOAD_DIR = 'uploads';

export const PORT = 4000;


// pPFDZH4Acw1a/E1untRtXExKIKt3bIuV8M9xhGwu
