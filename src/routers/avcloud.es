import {Router} from 'koapi';

const avcloud = new Router();

  /**
   * @api {get} / Index
   * @apiName Index
   * @apiGroup User
   *
   * @apiParam {Number} id Users unique ID.
   *
   * @apiSuccess {String} firstname Firstname of the User.
   * @apiSuccess {String} lastname  Lastname of the User.
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *     {
   *       "firstname": "John",
   *       "lastname": "Doe"
   *     }
   *
   * @apiError UserNotFound The id of the User was not found.
   *
   * @apiErrorExample Error-Response:
   *     HTTP/1.1 404 Not Found
   *     {
   *       "error": "UserNotFound"
   *     }
   */
  avcloud.get('/__engine/1/ping', async (ctx) => {
    ctx.body = {
      "runtime": "nodejs-" + process.version,
      "version": "custom"
    };
  });

  avcloud.get('/1.1/functions/_ops/metadatas', async (ctx) => {
    ctx.body = [];
  });



export default avcloud;
