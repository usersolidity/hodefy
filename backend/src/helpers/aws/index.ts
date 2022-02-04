import { client } from "../../utils/s3";
import { UploadParams } from "../../interfaces/aws";

export const upload = async (param: UploadParams, cb: any): Promise<any> => {
  client.upload(param, async (err: Error, data: any) => {
    if (err) {
      throw new Error("Could not upload data, please try again");
    }
    const amazonS3Url = data.Location;
    // await cb(amazonS3Url);
  });
};
