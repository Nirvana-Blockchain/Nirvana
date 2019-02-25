## Subscriber Console Module

***
#### Project Structure
* `app/`: We use the container/component architecture. `containers/` contains React components which are connected to the redux store. `components/` contains dumb React components which depend on containers for data. **Container components care about how things work, while components care about how things look.**
* `internals/`: This includes compilation configuration as your source code cannot be executed as-is in the web browser. It needs to pass through webpack to get converted into a version of Javascript that web browsers understand. you won't have to mess around with this folder much.
* `server/`: As the name suggests, this folder contains backend server configuration.

#### Starting Development
+ clone git repo.
+ run `npm install` to install needed packages.
+ run `npm run start` to launch the application. If you start browsing at https://localhost:3000
+ 
#### Deployment
+ run `npm run build` to build production bundle of front-end app.
+ OR 
+ run `npm run start:production` to start both backend and frontend services in production mode.


###### Reference links
+ [React Boilerplate](https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/general)