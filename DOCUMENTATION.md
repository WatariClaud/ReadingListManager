## Running server

Check the [README.md](./README.md) and follow instructions to run backend server

For the frontend:

In your frontend directory, run ```npm install``` then ```npm run dev```

http://localhost:3000 in your browser should open a valid client facing application.




### Miscellaneous


- I moved the assets folder into the public folder, since serving them from another folder will require either more verbose code (importing images), or using image manager packages (like next-image), so it just seemed easier to move them and leave the ```book.coverPhotoURL``

- I have submitted everything in a single commit (no individual commits, since I have kept track of everything since I started building 3 days ago).

- I have not used any caching for books data, each reload fetches from the API, but I have used context to create a store for the books to handle deletion of books (without affecting the backend server).


- Have not included building and bundling. Just run locally. If you want to build, run ```npm run build```