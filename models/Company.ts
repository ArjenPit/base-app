import mongoose from "mongoose";

export interface Companies extends mongoose.Document {
  name: string;
  address: {
    street: string;
    postcode: string;
    city: string;
    province: string;
    country: string;
  };
  phone: string;
}

/* Companyschema will correspond to a collection in your MongoDB database. */
const CompanySchema = new mongoose.Schema<Companies>({
  name: {
    type: String,
    required: [true, "Please provide a name for this company."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  address: {
    street: {
      type: String,
    },
    postcode: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  phone: {
    type: String,
  },
});

export default mongoose.models.Company ||
  mongoose.model<Companies>("Company", CompanySchema);
