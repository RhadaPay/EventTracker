# EventTracker

The EventTracker is a centralised web API built on NodeJS and ExpressJS. Its primary purpose is to handle and log incoming event streams, then make the corresponding batch calls to smart contracts.

This project was based on the [typescript-express-starter](https://github.com/ljlm0402/typescript-express-starter), it's a little verbose so just make sure all edits follow the below pattern.

## Folder Structure and flow
1. Define any new data models in `interfaces`
2. Define business logic in `services`
3. Setup route guards, error handling in `controllers`
4. Register routes and associate middleware in `routes`
5. Add data validators in `dtos` (Data Transfer Objects)
6. Make sure any route files are also registered in `server.ts`
7. `models` is currently only storing dummy data, we will have to link to a schema

## Common Commands
-----------

### Run the app in Docker
```
docker-compose up [--build]
```
This starts the app in development mode, with a bind mount set to everything in the CWD. You will need to ensure you have docker installed and running, and that you have enabled file sharing.

Once the app is running, changes to the code will cause a Hot Reload with nodemon, this will make the server unavailable to serve requests for a couple of seconds.

-----------------
### Compile solidity files
The app uses typechain as a development dependency to generate automatic typings for solidity ABIs. You won't need to do this regularly as the contract is not deployed here, but if you need to redeploy typings, you can use the command below to generate fresh typings.
```
npx typechain --target ethers-v5 --out-dir src/interfaces/typechain './src/interfaces/rhadaPay.json'
```
--------------
### Running tests
I usually like to run tests from within the running docker container by attaching a shell to the running container. You can do this on VS code with the VS Code Docker Extension, right clicking and selecting 'Attach Shell', then running the below command:
```
npm run test
```

### Adding Private Keys
Make sure not to share PKs in Code, you can add `.env` files and they will be ignored by git and docker.