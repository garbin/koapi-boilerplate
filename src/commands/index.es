import Post from '../models/post';
import {Model} from '/work/koapi/src/koapi';

export default {
  command: 'example [test]',
  description: 'Example',
  action: function* (test, options) {
    console.log(test);
    console.log(yield Post.fetchAll());
  }
};
