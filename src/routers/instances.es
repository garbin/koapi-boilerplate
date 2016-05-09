import {Router} from 'koapi'
import Instance from '../models/instance'
import InstanceData from '../models/instance_data'
import AV from 'avoscloud-sdk'

const instance = new Router();

  instance.prefix('/api');

  instance.get('/instances', async (ctx) => {
    ctx.body = await (new AV.Query('Instance')).find();
  });

  instance.post('/instances', async (ctx) => {
    var instance = new Instance();
    instance.set('config', {'test':'test'});
    ctx.body = await instance.save();
  });

  instance.get('/instances/:id', async (ctx) => {
    ctx.body = await (new AV.Query('Instance')).equalTo('objectId', ctx.params.id).first();
  });

  instance.get('/instances/:id/data', async(ctx)=>{
    ctx.body = await (new AV.Query('InstanceData')).equalTo('instanceId', ctx.params.id).find();
  });

  instance.post('/instances/:id/data', async(ctx)=>{
    let data = new InstanceData();
    data.set('instance_id', ctx.params.id);
    data.set('data', ctx.request.body);
    ctx.body = await data.save();
  });

export default instance;
