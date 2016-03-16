import {Router} from 'koapi';

const index = new Router();

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
  index.get('/', function*(){
    this.body = 'Hello World! I\'m an API';
  });

  index.post('/', function *() {
    this.body = this.request.body;
  });

export default index;
