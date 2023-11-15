import mongoose, { Document, Schema } from "mongoose";

interface IUSERID {
  user: Schema.Types.ObjectId;
}

interface ILocate {
  coordinates: [number];
  address: string;
  description: string;
  day: number;
}
