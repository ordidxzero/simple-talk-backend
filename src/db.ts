import mongoose from 'mongoose';
import './models/user';
import './models/room';
import './models/message';

mongoose
  .connect(process.env.MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => console.log('✅ Successfully connected to MongoDB'))
  .catch(console.error);

mongoose.set('useCreateIndex', true);
