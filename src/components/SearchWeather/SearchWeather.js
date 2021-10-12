import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types'

import { API_KEY } from '../../API'
import TempDay from '../TempDay/TempDay'
import GlobalSvg from '../../assets/icons/GlobalSvg'

import './SearchWeather.scss'

function SearchWeather() {
	const [seacrchCity, setSeacrchCity] = React.useState({})
	const [weatherDay, setWeatherDay] = React.useState({})
	const [query, setQuery] = React.useState('')
	const [isLoaded, setIsLoaded] = React.useState(true)

	async function fetchSearch(event) {
		try {
			if (event.key === 'Enter') {
				const [seacrchCity, weatherDays] = await Promise.all([
					axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`),
					axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${API_KEY}`),
				])

				setIsLoaded(false)

				setSeacrchCity(seacrchCity?.data)
				setWeatherDay(weatherDays?.data)
				setQuery('')
			}
		} catch (error) {
			alert('Произошла ошибка поиск не выполнелся ;-(')
		}
	}

	return (
		<div className='block'>
			<Link to='/'>
				<div className='icon__back'>
					<GlobalSvg id='back' />
				</div>
			</Link>
			<h1>Тут вы можете ввести название города и узнать погоду на ближайшие 5 дней.</h1>
			<div className='search__block'>
				<input
					className='search'
					type='text'
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyPress={fetchSearch}
				/>
				{!isLoaded ? (
					<div className='response__city'>
						<div className='city__block'>
							<h2>
								{seacrchCity?.name}, <span>{seacrchCity?.sys?.country}</span>
							</h2>
							<span>{Math.round(seacrchCity?.main?.temp - 273)}&deg;C</span>
							<div className='city__max-min'>
								<p className='city-max'>
									Макс: {Math.round(seacrchCity?.main?.temp_max - 273)}&deg;C
								</p>
								<p className='city-min'>
									Мин: {Math.round(seacrchCity?.main?.temp_min - 273)}&deg;C
								</p>
							</div>
						</div>
						<TempDay weatherDay={weatherDay} />
					</div>
				) : null}
			</div>
		</div>
	)
}

SearchWeather.propTypes = {
	query: PropTypes.string.isRequired,
	seacrchCity: PropTypes.object.isRequired,
	weatherDay: PropTypes.object.isRequired,
	isLoaded: PropTypes.bool.isRequired,
	fetchSearch: PropTypes.func.isRequired,
}

export default SearchWeather
