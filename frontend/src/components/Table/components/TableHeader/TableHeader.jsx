import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai"
export const TableHeader = ({ heading, handleSort, sortBy }) => {
	return (
		<thead>
			<tr>
				{heading.map(({ name, key }, index) => (
					<th
						key={index}
						onClick={() => handleSort(key)}
					>
						{name}
						{
							sortBy.key === key
								? sortBy.order === 'asc'
									? <AiFillCaretUp />
									: <AiFillCaretDown />
								: null
						}
					</th>
				))}
			</tr>
		</thead>
	)
}
