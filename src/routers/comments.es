import {Router} from 'koapi';
import Comment from '../models/comment';
import Posts from './posts';

const comments = new Router();

  comments.get('/comments', async (ctx) =>{
    ctx.body = await Comment.fetchAll();
  });

  comments.get('/comments/:id', async (ctx) =>{
    ctx.body = await Comment.where('id', '=', ctx.params.id).fetch();
  });

  comments.post('/comments', async (ctx) => {
    ctx.body = ctx.request.body;
  });

export default Posts.use('/posts/:post_id', comments.routes());
