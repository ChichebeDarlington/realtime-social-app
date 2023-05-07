import mongoose from "mongoose";

export const Database = (URI) => {
  return mongoose.connect(URI);
};
