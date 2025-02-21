// Connecting to mongodb
db = connect('mongodb://localhost:27017/Library');

// Inserting books to books collection in Library db
db.books.insertMany([
    {
        title: 'Lost in The Jungle',
        author: 'Marcus Glaive',
        genre: 'Action',
        ISBN: 978 - 0 - 321 - 76572 - 3,
        published_year: 2002
    },
    {
        title: 'Lost in The Jungle 2',
        author: 'Marcus Glaive',
        genre: 'Action',
        ISBN: 978 - 1 - 492 - 25573 - 5,
        published_year: 2000
    },
    {
        title: 'Beasts of Valor',
        author: 'Antony Cruise',
        genre: 'Sci-fi',
        ISBN: 978 - 0 - 596 - 52068 - 7,
        published_year: 2005
    },
    {
        title: 'How to Survive A Zombie Apocalypse',
        author: 'Miranda Wells',
        genre: 'Horror',
        ISBN: 978 - 0 - 7356 - 6748 - 3,
        published_year: 1990
    },
    {
        title: 'How to Survive A Zombie Apocalypse 2',
        author: 'Miranda Wells',
        genre: 'Horror',
        ISBN: 978 - 3 - 16 - 148410 - 0,
        published_year: 1992
    }
]);

// Retrieving all books
db.books.find();

// Retrieving books based on specific author
db.books.find([{
    author: "Marcus Glaive"
}]);

// Finding books published after 2000
db.books.aggregate([
    {
        $match: { published_year: { $gte: 2000 } }
    }
]);
s
// Updating publishedYear using ISBN
db.books.updateOne(
    { ISBN: 978 - 3 - 16 - 148410 - 0 },
    {
        $set: { published_year: 1950 }
    }
);

// Adding a new field called rating
db.books.updateMany(
    {},
    { $set: { rating: 8 } }
);

// Finding total number of books per genre
db.books.aggregate([
    { $group: { id: '$genre', total: { $sum: 1 } } },
    { $sort: { total: -1 } }
]);

// Finding average published year
db.books.aggregate([
    { $group: { average_year: { $avg: '$published_year' } } }
]);

// Identifying top rated book
db.books.aggregate([
    { $sort: { rating: -1 } },
    { $limit: 1 }
]);

// Deleting a book by its ISBN
db.books.deleteOne(
    { ISBN: 978 - 0 - 596 - 52068 - 7 }
);

// Deleting books based on genre
db.books.deleteMany(
    { genre: 'Action' }
);

// Creating an index for authors
db.books.createIndex(
    { author: 1 }
);

// Benefits of Having an index:

// 1. Faster Query Execution:

// Reduced Scan Time: Indexes allow MongoDB to quickly locate documents that match a query without having to scan the entire collection. This dramatically reduces the amount of data that needs to be processed, leading to faster query execution times.
// Efficient Data Retrieval: When a query uses an indexed field, MongoDB can use the index to directly access the relevant documents, similar to how an index in a book helps you find specific information quickly.
// 2. Improved Sorting Performance:

// Faster Sorting: If you frequently sort query results by a particular field, creating an index on that field can significantly speed up the sorting process. Without an index, MongoDB has to perform an in-memory sort, which can be slow for large datasets.
// 3. Enhanced Aggregation Performance:

// Faster Aggregation: Indexes can also improve the performance of aggregation pipelines. When aggregation operations use indexed fields, MongoDB can perform the operations more efficiently.
// 4. Reduced I/O Operations:

// Fewer Disk Reads: By reducing the amount of data that needs to be scanned, indexes minimize the number of disk I/O operations required to execute a query. This is particularly important for large datasets that don't fit entirely in memory.
// 5. Better Overall Application Performance:

// Improved Responsiveness: Faster query execution and reduced I/O operations contribute to a more responsive application, especially under heavy load.
// Scalability: Indexes help your application scale more effectively by allowing it to handle larger datasets and more concurrent users.

// Data Modeling Exercise:
// 1. Users Collection
db.users.insertOne({
    username: "john_doe",
    email: "john.doe@example.com",
    password: "hashed_password", // Store hashed passwords
    address: {
        street: "123 Main St",
        city: "Anytown",
        zip: "12345",
        country: "USA"
    },
    registrationDate: new Date(),
    role: "customer" // or "admin"
});

// 2. Products Collection
db.products.insertMany([
    {
        name: "Laptop",
        description: "Powerful laptop for work and play",
        price: 1200.00,
        category: "Electronics",
        stock: 50,
        images: ["laptop1.jpg", "laptop2.jpg"], // Array of image URLs/paths
        ratings: [4, 5, 3, 4], // Array of ratings, calculate average in app
        brand: "BrandX"
    },
    {
        name: "T-Shirt",
        description: "Comfortable cotton t-shirt",
        price: 25.00,
        category: "Clothing",
        stock: 100,
        images: ["tshirt1.jpg"],
        ratings: [5, 4, 5],
        brand: "BrandY"
    }
]);

// 3. Orders Collection (Referencing Users and Embedding Product Details)
db.orders.insertOne({
    userId: ObjectId("user_object_id"), // Reference to users collection
    orderDate: new Date(),
    status: "pending", // or "shipped", "delivered", "canceled"
    shippingAddress: {
        street: "456 Oak Ave",
        city: "Othertown",
        zip: "54321",
        country: "USA"
    },
    items: [ // Embedded product details
        {
            productId: ObjectId("product_laptop_object_id"), //product id from the product collection.
            name: "Laptop", // product name from the product collection.
            price: 1200.00, //product price from the product collection.
            quantity: 1
        },
        {
            productId: ObjectId("product_tshirt_object_id"),
            name: "T-Shirt",
            price: 25.00,
            quantity: 2
        }
    ],
    totalAmount: 1250.00 // Calculated total
});
