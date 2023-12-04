import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home.js';
import Login from './Login.js';
import Create from './Create.js';
import Favorite from './Favorite.js';
import Allposts from './Allposts.js';
import Post from './Post.js';
import Korzina from './Korzina.js';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home></Home>
    },
    {
      path: '/login',
      element: <Login></Login>
    },
    {
      path: '/create',
      element: <Create></Create>
    },
    {
      path: '/favorite',
      element: <Favorite></Favorite>
    },
    {
      path: '/posts',
      element: <Allposts></Allposts>
    },
    {
      path: '/post/:id',
      element: <Post></Post>
    },
    {
      path: '/korzina',
      element: <Korzina></Korzina>
    },
  ])
  return (
    <RouterProvider router={router}>
    <div className="App">
      hi
    </div>
    </RouterProvider>
  );
}

export default App;
