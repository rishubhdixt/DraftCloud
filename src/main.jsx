import { StrictMode } from 'react'
import React from 'react';
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'

import store from './store/Store.js'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout } from './components/index.js'
import Login from './pages/logIn.jsx'
import SingUp from './pages/SingUp.jsx'
import AllPosts from './pages/AllPosts.jsx'
import EditPosts from './pages/EditPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import Post from './pages/post.jsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <SingUp />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider
  router={router}
  future={{
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  }}
/>
    </Provider>
  </React.StrictMode>,
)