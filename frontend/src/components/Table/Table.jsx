import { useState, useEffect } from 'react'
import { Pagination } from '@components'
import { TableHeader, TableBody } from './components'
import { paginateData, sortedDataFunc } from '@utils'
export const Table = ({ ...props }) => {
	const { heading, items } = props
	const [data, setData] = useState([])
	const [paginationPage, setPaginationPage] = useState(1)
	const [totalPages, setTotalPages] = useState([])
	const [sortBy, setSortBy] = useState({ key: '', order: 'desc' })
	const limitPage = 5

	const changePaginationPage = page => setPaginationPage(page)

	const handleSort = (key) => {
		if (sortBy.key === key) {
			setSortBy({
				...sortBy,
				order: sortBy.order === 'asc' ? 'desc' : 'asc',
			})
		} else {
			setSortBy({ key, order: 'desc' })
		}
	}


	useEffect(() => {
		const [paginatedData, pageNumbers] = paginateData(sortedDataFunc(items, sortBy), limitPage)
		setData(paginatedData[paginationPage])
		setTotalPages(pageNumbers)
	}, [paginationPage, items, sortBy])

	return (
		<>
			<table>
				<TableHeader heading={heading} handleSort={handleSort} sortBy={sortBy} />
				<TableBody data={data}{...props} />
			</table>

			<Pagination
				totalPages={totalPages}
				changePage={changePaginationPage}
				page={paginationPage}
			/>
		</>
	)
}
