import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';

import CartWeather from './components/CartWeather/CartWeather'
import { Switch, Route } from 'react-router-dom'
import SearchWeather from './components/SearchWeather/SearchWeather'
import {
	API_WEATHER_MINSK,
	API_WEATHER_BRATISLAVA,
	API_WEATHER_MOSCOW,
	API_WEATHER_MINSK_CURRENT,
} from './API'

import './App.scss'

function App() {
	const [currentWeather, setCurrentWeather] = useState({})
	const [weatherMinsk, setWeatherMinsk] = useState({})
	const [weatherMoscow, setWeatherMoscow] = useState({})
	const [weatherBratislava, setWeatherBratislava] = useState({})
	const [isLoading, setIsLoading] = React.useState(true)

	useEffect(() => {
		async function fetchData() {
			try {
				const [responseMinsk, responseMoscow, responseBratislava, responseCurrent] =
					await Promise.all([
						axios.get(API_WEATHER_MINSK),
						axios.get(API_WEATHER_MOSCOW),
						axios.get(API_WEATHER_BRATISLAVA),
						axios.get(API_WEATHER_MINSK_CURRENT),
					])
				setIsLoading(false)

				setWeatherMinsk(responseMinsk?.data)
				setWeatherMoscow(responseMoscow?.data)
				setWeatherBratislava(responseBratislava?.data)
				setCurrentWeather(responseCurrent?.data)
			} catch (error) {
				alert('Данные не пришли... или нет подключения к интернету :-(')
			}
		}

		fetchData()
	}, [])

	return (
		<div className='app'>
			<Switch>
				<Route path='/' exact>
					<CartWeather
						isLoading={isLoading}
						weatherMinsk={weatherMinsk}
						weatherBratislava={weatherBratislava}
						weatherMoscow={weatherMoscow}
						currentWeather={currentWeather}
					/>
				</Route>
			</Switch>
			<Route path='/search'>
				<SearchWeather />
			</Route>
		</div>
	)
}

App.propTypes = {
	currentWeather: PropTypes.object,
	weatherBratislava: PropTypes.object,
	weatherMoscow: PropTypes.object,
	weatherMinsk: PropTypes.object,
	isLoading: PropTypes.bool.isRequired

}

export default App
