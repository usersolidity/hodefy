export interface AWSConfig {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}

export interface UploadParams {
  Bucket: string;
  Key: string;
  Body: any;
  ACL: string;
}
