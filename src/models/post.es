import { Model } from '/work/koapi/src/koapi';
import Comment from './comment';
import Joi from 'joi';

export const fields = {
  title: Joi.string().alphanum().min(3).max(30),
};

export default Model.extend({
  tableName: 'posts',
  hasTimestamps: true,
  schema: {
    create: Joi.object().keys({
      title: fields.title.required(),
    }).unknown(true),
    update: Joi.object().keys({
      title: fields.title.required(),
    }).unknown(true)
  },
  comments: function(){
    return this.hasMany(Comment);
  },
});
