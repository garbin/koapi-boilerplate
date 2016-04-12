import {Router} from 'koapi';
import Post from '../models/post';

const posts = new Router();

  posts.get('/posts', async (ctx) => {
    ctx.body = await Post.fetchAll();
  });

  posts.get('/posts/:id', async (ctx) => {
    var post = await Post.where({id: ctx.params.id}).fetch({'withRelated':'comments'});
    ctx.body = post;
  });

  posts.post('/posts', async (ctx) => {
    var post = await new Post(ctx.request.body).save();
    ctx.body = post;
  });

export default posts;
