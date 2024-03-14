import mongoose, { Schema } from "mongoose"

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        ingredients: {
            type: String,
            required: true
        },
        instructions: {
            type: String,
            required: true
        },
        createdBy: {
            type: String,
            required: true
        }
    }, {
    timestamps: true
}
)

export const Recipe = mongoose.model("Recipe", recipeSchema)