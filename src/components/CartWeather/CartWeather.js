import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { getDate } from '../../dataDate'
import Loading from '../Loading/Loading'
import GlobalSvg from '../../assets/icons/GlobalSvg'

import './CartWeather.scss'

const CartWeather = ({
	weatherMinsk,
	weatherBratislava,
	weatherMoscow,
	currentWeather,
	isLoading,
}) => {
	const [selectCity, setSelectCity] = useState(JSON.parse(localStorage.getItem('temp')) || 0)

	const toggleMinsk = () => {
		localStorage.setItem('temp', 0)
		setSelectCity(0)
	}
	const toggleMoscow = () => {
		localStorage.setItem('temp', 2)
		setSelectCity(2)
	}
	const toggleBratislava = () => {
		localStorage.setItem('temp', 1)
		setSelectCity(1)
	}

	return (
		<div className='wrapper'>
			{isLoading ? (
				<Loading />
			) : (
				<div className='container'>
					<Link to='/search'>
						<div className='icon__search'>
							<GlobalSvg id='search' />
						</div>
					</Link>
					<h3 className='date'>{getDate(new Date())}</h3>
					<h1>
						{selectCity === 0
							? weatherMinsk?.city?.name
							: selectCity === 1
								? weatherBratislava?.name
								: selectCity === 2
									? weatherMoscow?.name
									: null}
						,&nbsp;
						{selectCity === 0
							? weatherMinsk?.city?.country
							: selectCity === 1
								? weatherBratislava?.sys?.country
								: selectCity === 2
									? weatherMoscow?.sys?.country
									: null}
					</h1>
					<span className='blue'>
						{selectCity === 0
							? Math.round(currentWeather?.main?.temp) - 273
							: selectCity === 1
								? Math.round(weatherBratislava?.main?.temp) - 273
								: selectCity === 2
									? Math.round(weatherMoscow?.main?.temp) - 273
									: null}
						&deg;C
					</span>
					<div className='max-min'>
						<p>
							Макс.&nbsp;
							{selectCity === 0
								? Math.round(currentWeather?.main?.temp_max) - 273
								: selectCity === 1
									? Math.round(weatherBratislava?.main?.temp_max) - 273
									: selectCity === 2
										? Math.round(weatherMoscow?.main?.temp_max) - 273
										: null}
							&deg;,
						</p>
						<p>
							Мин.&nbsp;
							{selectCity === 0
								? Math.round(currentWeather?.main?.temp_min) - 273
								: selectCity === 1
									? Math.round(weatherBratislava?.main?.temp_min) - 273
									: selectCity === 2
										? Math.round(weatherMoscow?.main?.temp_min) - 273
										: null}
							&deg;
						</p>
					</div>
					<div className='button__box'>
						<button className='minsk btn' onClick={toggleMinsk}>
							MINSK
						</button>
						<button className='moscow btn' onClick={toggleMoscow}>
							MOSCOW
						</button>
						<button className='bratislava btn' onClick={toggleBratislava}>
							BRATISLAVA
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default CartWeather
