import mongoose from "mongoose";

export interface Tasks extends mongoose.Document {
  name: string;
}

/* Taskschema will correspond to a collection in your MongoDB database. */
const TasksSchema = new mongoose.Schema<Tasks>({
  name: {
    type: String,
    required: [true, "Please provide a name for this task."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
});

export default mongoose.models.Task || mongoose.model<Tasks>("Task", TasksSchema);
