import mongoose from 'mongoose';

const appSchema = new mongoose.Schema({
    bio: { type: String, required: true },
    image: { type: String, required: true }
});

const AppModel = mongoose.model('App', appSchema);

export default AppModel;