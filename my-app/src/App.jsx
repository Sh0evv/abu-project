import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import About from './components/About'
import Home from './components/Home'
import Contact from './components/Contact'
import Layout from './components/Layout'
import Info from './components/Info'


export default function App() {
	let router = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
			children: [
				{ index: true, element: <Home /> },
				{ path: 'about', element: <About /> },
				{ path: 'contact', element: <Contact /> },
				{ path: 'info/:id', element: <Info /> },
			],
		},
	])

	return <RouterProvider router={router} />
}
