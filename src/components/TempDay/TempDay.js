import React from 'react'
import './TempDay.scss'

function TempDay({ weatherDay }) {
	const { list } = weatherDay

	return (
		<div className='date__block'>
			{
				list && list?.map((item, index) => (
					<div key={`${item?.dt}__${index}`} className='date__day'>
						<p className='temp__time'>{item?.dt_txt}</p>
						<p className='temp__day'>{Math.round(item?.main?.temp - 273)}&deg;C</p>
					</div>
				))
			}
		</div>
	)
}

export default TempDay
