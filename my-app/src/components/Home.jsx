import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Modal, Box, Button, TextField, Typography } from '@mui/material'

const Home = () => {
	const api = 'https://to-dos-api.softclub.tj/api/to-dos'
	const apiUrl = 'https://to-dos-api.softclub.tj/images'

	const [users, setUsers] = useState([])
	const [open, setOpen] = useState(false)

	async function getUsers() {
		try {
			const { data } = await axios.get(api)
			setUsers(data.data)
		} catch (error) {
			console.error(error)
		}
	}

	async function deleteUser(id) {
		try {
			await axios.delete(`${api}?id=${id}`)
			getUsers()
		} catch (error) {
			console.error(error)
		}
	}

	async function addUser(e) {
		e.preventDefault()
		let target = e.target
		let images = target['imgAdd'].files

		let formData = new FormData()
		formData.append('Name', target['nameAdd'].value)
		formData.append('Description', target['desc'].value)

		for (let i = 0; i < images.length; i++) {
			formData.append('images', images[i])
		}

		try {
			await axios.post(api, formData)
			getUsers()
			setOpen(false)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		getUsers()
	}, [])

	const style = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 400,
		bgcolor: 'background.paper',
		borderRadius: 3,
		boxShadow: 24,
		p: 4,
	}

	return (
		<>
			<div className='max-w-6xl mx-auto p-5 flex justify-end'>
				<Button
					variant='contained'
					color='success'
					onClick={() => setOpen(true)}
				>
					+ Add User
				</Button>
			</div>

			<div className='max-w-6xl mx-auto p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{users.map(e => (
					<div
						key={e.id}
						className='bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4 hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'
					>
						<h1 className='text-2xl font-bold text-gray-800'>{e.name}</h1>

						<div className='flex gap-3 flex-wrap'>
							{e.images.map((img, index) => (
								<div
									key={index}
									className='w-full h-48 overflow-hidden rounded-xl'
								>
									<img
										src={`${apiUrl}/${img.imageName}`}
										alt={e.name}
										className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
									/>
								</div>
							))}
						</div>

						<p className='text-gray-600'>{e.description}</p>

						<Link
							to={`/info/${e.id}`}
							className='mt-auto inline-block text-center bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold'
						>
							Info
						</Link>
						<button
							onClick={() => deleteUser(e.id)}
							className='mt-auto inline-block text-center bg-[red] text-white py-2 px-4 rounded-xl hover:bg-[#4e1818] transition-all duration-300 font-semibold'
						>
							Delete
						</button>
					</div>
				))}
			</div>

			<Modal
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby='add-user-title'
				aria-describedby='add-user-description'
			>
				<Box sx={style}>
					<Typography id='add-user-title' variant='h5' component='h2' mb={2}>
						Add New User
					</Typography>

					<form onSubmit={addUser} className='flex flex-col gap-4'>
						<TextField label='Name' name='nameAdd' required fullWidth />
						<TextField
							label='Description'
							name='desc'
							required
							multiline
							rows={4}
							fullWidth
						/>
						<input
							type='file'
							name='imgAdd'
							multiple
							className='border p-2 rounded-xl'
						/>

						<div className='flex justify-end gap-3 mt-4'>
							<Button variant='outlined' onClick={() => setOpen(false)}>
								Cancel
							</Button>
							<Button variant='contained' color='success' type='submit'>
								Add User
							</Button>
						</div>
					</form>
				</Box>
			</Modal>
		</>
	)
}

export default Home
