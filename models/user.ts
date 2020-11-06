import { User } from "./../types/user"
import { model, Schema } from "mongoose"

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    email_verified: {
        type: Boolean,
        default: false
    }

  },
  { timestamps: true }
)

export default model<User>("User", userSchema)