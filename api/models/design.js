import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const designSchema = new Schema({
    title: String,
    description: String,
    visibility: String,
    design: {
      shape: Number,
      fontFamily: String,
      fontSize: Number,
      fontWeight: Number,
      letterSpacing: String,
      textColor: String,
      textAlign: String,
      textDecoration: String,
      fontStyle: String,
      textTransform: String,
      borders: [
        {id: Number,
        borderWidth: Number,
        borderStyle: String,
        borderColor: String},
        {id: Number,
        borderWidth: Number,
        borderStyle: String,
        borderColor: String}
      ],
      width: Number,
      height: Number,
      backgroundColor: String,
      backgroundImage: String,
    },
    labels: [{ 
      id: Number,
      name: String
    }],
    authorId: String,
    author: {},
    created: {
      type: Date, 
      default: Date.now
    },
    likes: {
      type: [String],
      default: []
    },
    downloads: {
      type: Number,
      default: 0
    }
})

const Design = mongoose.model('design', designSchema);

export default Design;
