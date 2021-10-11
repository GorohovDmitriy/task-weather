export let months = [
	'Январь',
	'Феврать',
	'Март',
	'Апрель',
	'Май',
	'Июнь',
	'Июль',
	'Август',
	'Сентябрь',
	'Октябрь',
	'Ноябрь',
	'Декабрь',
]

export let days = ['Воскресенье', 'Понедельник', 'Втоник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

export const getDate = (date) => {
	let day = days[date.getDay()]
	let dateFull = date.getDate()
	let month = months[date.getMonth()]
	let year = date.getFullYear()

	return `${day} ${dateFull} ${month} ${year}`
}