# koapi-boilerplate
A Koapi boilerplate

## Contains

- [x] [Koapi](https://github.com/koapi/koapi)
- [x] [Knex](http://knexjs.org/)
- [x] [Bookshelf](http://bookshelfjs.org/)
- [x] [Babel](https://babeljs.io/)
- [x] [Apidoc](http://apidocjs.com/)
- [x] [Nodemon](http://nodemon.io/)
- [x] [Istanbul](https://github.com/gotwarlost/istanbul)
- [x] [Mochajs](https://mochajs.org/)
- [x] [Shouldjs](http://shouldjs.github.io/)

## Run dev server

### dev server
```bash
npm run dev:server
```

### watch apidoc

```bash
npm run dev:apidoc
```

### serve apidoc

```bash
npm run serve:apidoc
```
### serve coverage

```bash
npm run serve:coverage
```



## Test

```bash
# For unit testing
npm test

# For code coverage testing
npm run test:coverage
```

## Database maintenance
```bash
# Create table & seed data
npm run db:setup

# Rollback db changes
npm run db:rollback
```

### Knex cli tools
```bash
# migrate
npm run knex migrate:latest

# seed
npm run knex seed:run

# other knex migration tools
...
```

## Build
```bash
npm run build
```
