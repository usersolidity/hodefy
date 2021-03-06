import { getDb } from "../utils/database.js";
import { ObjectId } from "mongodb";

export class Property {
  constructor(
    public readonly ownerAddress: string,
    public links: string[],
    public nftToken: string | null,
    public city: string,
    public country: string,
    public streetAddress: string,
    public metadataURI: string

  ) {
    this.ownerAddress = ownerAddress;
    this.links = links;
    this.nftToken = nftToken;
    this.city = city;
    this.country = country;
    this.streetAddress = streetAddress;
    this.metadataURI = metadataURI;
  }

  async save(this: Property) {
    const db = getDb();
    try {
      const result = await db.collection("properties").insertOne(this);
      return result;
    } catch (err) {
      return;
    }
  }

  static async findById(id: ObjectId) {
    const db = getDb();
    try {
      const result = await db
        .collection("properties")
        .aggregate([
          { $match: { _id: id } },
          {
            $project: {
              _id: 0,
              ownerAddress: 1,
              link: { $first: "$links" },
              streetAddress: 1,
              city: 1,
              country: 1,
              metadataURI: 1
            },
          },
        ])
        .toArray();
      return result;
    } catch (err) {
      return;
    }
  }

  static async findByNFTToken(nftToken: string) {
    const db = getDb();
    try {
      const result = await db.collection("properties").findOne({ nftToken });
      return result;
    } catch (err) {
      return;
    }
  }

  static async findManyByLocation(query: any) {
    const db = getDb();
    try {
      const result = await db.collection("properties").find(query).toArray();
      return result;
    } catch (err) {
      return;
    }
  }
}
