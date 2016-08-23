declare module "mongoose" {
    import Bluebird = require("bluebird");
    type MongoosePromise<T> = Bluebird<T>;
}
