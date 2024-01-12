import mongoose from "mongoose";

export interface Person {
  _id: mongoose.Types.ObjectId | null;
  firstName: string;
  lastName: string;
  address: {
    street: string;
    number: number | null;
    addendum: string;
    city: string;
    postcode: string;
    country: string;
  };
  company: mongoose.Types.ObjectId | null;
  // company: string;
}

// Put all person methods to this interface
interface PersonMethods {
    fullName(): string;
}

// Create a new Model type that knows about PersonMethods (as 3rd parameter)
type PersonModel = mongoose.Model<Person, {}, PersonMethods>

// make sure the schema knows about PersonMethods as well (also 3rd parameter)
const personSchema = new mongoose.Schema<Person, PersonModel, PersonMethods>({
  firstName: { type: String },
  lastName: { type: String, required: true },
  address: {
    street: String,
    number: Number,
    addendum: String,
    city: String,
    postcode: String,
    country: String,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
});

personSchema.method('fullName', function fullName() {
    return this.firstName + ' ' + this.lastName;
})

export default mongoose.models.Person ||
  mongoose.model<Person, PersonModel>("Person", personSchema);
