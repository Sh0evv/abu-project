import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Layout() {
	const { t, i18n } = useTranslation()

	return (
		<div>
			<nav style={{ display: 'flex', gap: '20px' }}>
				<Link to='/'>{t('Header.Home')}</Link>
				<Link to='/about'>{t('Header.About')}</Link>
				<Link to='/contact'>{t('Header.Contact')}</Link>
			</nav>

			<div>
				<select
					value={i18n.language}
					onChange={e => i18n.changeLanguage(e.target.value)}
				>
					<option value='en'>Eng</option>
					<option value='ru'>Rus</option>
					<option value='tj'>TJK</option>
				</select>
			</div>

			<Outlet />
		</div>
	)
}
