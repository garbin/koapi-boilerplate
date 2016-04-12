import Post from '../models/post';
import {Model} from 'koapi';

// see https://github.com/tj/commander.js
export default {
  command: 'example [test]',
  description: 'Example',
  action: async (cmd, test, options) => {
    console.log(await Post.fetchAll());
  }
};
