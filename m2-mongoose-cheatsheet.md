Mongoose static methods:

## Create

-   **Model.create(data)**
-   **Model.insertMany(arr)**

## Read

-   **Model.find()**
    -   find all documents in a collection
    -   note: returns an array (even if there's zero or one documents)
-   **Model.find(filter)**
    -   find all documents that match the filter.
    -   ex: `Model.find({price: {$gt: 20} })`
-   **Model.findOne(filter)**
-   **Model.findById(id)**

## Update

-   **Model.updateMany(filter, update [, options])**
-   **Model.findOneAndUpdate(filter, update [, options])**
-   **Model.findByIdAndUpdate(id, update [, options])**
    -   findByIdAndUpdate() will return the original document (not the updated)
    -   In case you want to receive the updated document, you can pass a third argument with `{ returnDocument: 'after' }`.
    -   Example: `Model.findByIdAndUpdate(id, update, { returnDocument: 'after' })`

## Delete

-   **Model.deleteMany(filter)**
-   **Model.deleteOne(filter)**
-   **Model.findByIdAndRemove(id)**
