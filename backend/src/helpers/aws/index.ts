import { client } from "../../utils/s3.js";
import { UploadParams } from "../../interfaces/aws/index.js";

export const upload = async (param: UploadParams, cb: any): Promise<any> => {
  console.log('inside upload')
  return await client.upload(param, (err: Error, data: any) => {
    if (err) {
      console.log('error in upload ', err)
      throw new Error("Could not upload data, please try again");
    }
    console.log('la data ',data)
    const amazonS3Url = data?.Location;
    return amazonS3Url;
    // await cb(amazonS3Url);
  });
};
