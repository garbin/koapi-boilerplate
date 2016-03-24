import {Router} from '/work/koapi/src/koapi';
import Comment from '../models/comment';
import Posts from './posts';

const comments = new Router();

  comments.get('/comments', function*(){
    this.body = yield Comment.fetchAll();
  });

  comments.get('/comments/:id', function*(){
    this.body = yield Comment.where('id', '=', this.params.id).fetch();
  });

  comments.post('/comments', function *() {
    this.body = this.request.body;
  });

export default Posts.use('/posts/:post_id', comments.routes());
