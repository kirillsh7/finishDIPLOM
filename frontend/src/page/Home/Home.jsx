import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Line } from 'react-chartjs-2'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { clientAccountItemsSelector, operationsItemsSelector, categoryItemsSelector, clientAccountLoadingSelector, categoryLoadingSelector, errorSelector, operationsLoadingSelector } from '@store'
import { CATEGORY } from '@constants'
import styled from './home.module.css'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
)

export const Home = () => {
	const [incomes, setIncomes] = useState([])
	const [expenses, setExpenses] = useState([])
	const [accounts, setAccounts] = useState([])
	const [chartData, setChartData] = useState({})
	const loaded = useSelector(operationsLoadingSelector)
	const error = useSelector(errorSelector)
	const account = useSelector(clientAccountItemsSelector)
	const operation = useSelector(operationsItemsSelector)
	const category = useSelector(categoryItemsSelector)
	const loadedOperations = useSelector(operationsLoadingSelector)
	const loadedCategory = useSelector(categoryLoadingSelector)
	const loadedClientAccount = useSelector(clientAccountLoadingSelector)
	const loading = loadedOperations || loadedCategory || loadedClientAccount
	useEffect(() => {
		const fetchData = async () => {

			const mockAccounts = account.map(el => ({
				id: el.id,
				name: el.name,
				balance: el.amount,
				currency: 'RUB',
			}))
			const currentData = el => {
				const dateFormat = Number(el.created_date) ? (
					new Date(Number(el.created_date)).toISOString().split('T')[0])
					: (el.created_date)
				return {
					id: el.id,
					amount: el.amount,
					category: el.name,
					date: dateFormat,
					description: el.comment,
				}
			}
			const operationType = operation.map(el => {
				return {
					...el,
					category: category.find(cat => cat.id === el.category).type
				}
			})
			const mockExpenses = operationType
				.filter(el => el?.category === CATEGORY.EXPENSES)
				.map(el => currentData(el))
			const mockIncomes = operationType
				.filter(el => el?.category === CATEGORY.INCOME)
				.map(el => currentData(el))

			setIncomes(mockIncomes)
			setExpenses(mockExpenses)
			setAccounts(mockAccounts)
			prepareChartData(mockIncomes, mockExpenses)

		}
		fetchData()
	}, [account, operation, account])
	const prepareChartData = (incomesData, expensesData) => {
		const incomeByDay = {}
		const expenseByDay = {}

		incomesData.forEach(income => {
			const day = income.date
			incomeByDay[day] = (incomeByDay[day] || 0) + Number(income.amount)
		})

		expensesData.forEach(expense => {
			const day = expense.date
			expenseByDay[day] = (expenseByDay[day] || 0) + Number(expense.amount)
		})

		const allDays = Array.from(
			new Set([...Object.keys(incomeByDay), ...Object.keys(expenseByDay)])
		).sort()
		const data = {
			labels: allDays,
			datasets: [
				{
					label: 'Доходы',
					data: allDays.map(day => incomeByDay[day] || 0),
					borderColor: 'rgb(75, 192, 192)',
					backgroundColor: 'rgba(75, 192, 192, 0.5)',
					tension: 0.1,
				},
				{
					label: 'Расходы',
					data: allDays.map(day => expenseByDay[day] || 0),
					borderColor: 'rgb(255, 99, 132)',
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
					tension: 0.1,
				},
			],
		}
		setChartData(data)
	}
	const totalBalance = accounts.reduce(
		(sum, account) => sum + account.balance,
		0
	)
	if (loading || loaded) return <div>Loading...</div>
	return (

		<div className={styled.container}>
			{error && <div>{error}</div>}
			<div className={styled.gridContainer}>
				<div className={styled.card}>
					<h3 className={styled.cardTitle}>Общий баланс</h3>
					<p className={styled.cardAmount}>{totalBalance.toLocaleString()} ₽</p>
				</div>

				<div className={styled.card}>
					<h3 className={styled.cardTitle}>Доходы</h3>
					<p className={`${styled.cardAmount} ${styled.income}`}>
						{incomes
							.reduce((sum, income) => Number(sum) + Number(income.amount), 0)
							.toLocaleString()}{' '}
						₽
					</p>
				</div>

				<div className={styled.card}>
					<h3 className={styled.cardTitle}>Расходы</h3>
					<p className={`${styled.cardAmount} ${styled.expense}`}>
						{expenses
							.reduce((sum, expense) => Number(sum) + Number(expense.amount), 0)
							.toLocaleString()}{' '}
						₽
					</p>
				</div>
			</div>

			<div className={`${styled.card} ${styled.chartContainer}`}>
				<h2 className={styled.sectionTitle}>Динамика доходов и расходов</h2>
				<div className={styled.chart}>
					{chartData.labels && (
						<Line
							data={chartData}
							options={{ responsive: true, maintainAspectRatio: false }}
						/>
					)}
				</div>
			</div>

			<div className={styled.gridContainer}>
				<div className={styled.card}>
					<div className={styled.sectionHeader}>
						<h2 className={styled.sectionTitle}>Последние доходы</h2>
						<button className={styled.viewAll}>
							<Link to='/operation'>Все</Link>
						</button>
					</div>
					<ul className={styled.list}>
						{incomes.length !== 0 ? incomes.slice(0, 3).map(income => (
							<li key={income.id} className={styled.listItem}>
								<div className={styled.itemRow}>
									<span className={styled.itemName}>{income.category}</span>
									<span className={styled.income}>
										+{income.amount.toLocaleString()} ₽
									</span>
								</div>
								<p className={styled.itemMeta}>
									{income.date} • {income.description}
								</p>
							</li>
						))
							: (
								<li >
									<div >
										<span >Нет доходов</span>
									</div>
								</li>
							)}
					</ul>
				</div>

				<div className={styled.card}>
					<div className={styled.sectionHeader}>
						<h2 className={styled.sectionTitle}>Последние расходы</h2>
						<button className={styled.viewAll}>
							<Link to='/operation'>Все</Link>
						</button>
					</div>
					<ul className={styled.list}>
						{expenses.length !== 0 ? expenses.slice(0, 3).map(expense => (
							<li key={expense.id} className={styled.listItem}>
								<div className={styled.itemRow}>
									<span className={styled.itemName}>{expense.category}</span>
									<span className={styled.expense}>
										-{expense.amount.toLocaleString()} ₽
									</span>
								</div>
								<p className={styled.itemMeta}>
									{expense.date} • {expense.description}
								</p>
							</li>
						))
							: (
								<li >
									<div >
										<span >Нет расходов</span>
									</div>
								</li>
							)}
					</ul>
				</div>

				<div className={styled.card}>
					<div className={styled.sectionHeader}>
						<h2 className={styled.sectionTitle}>Мои счета</h2>
						<button className={styled.viewAll}>
							<Link to='/client-account'>Все</Link>
						</button>
					</div>
					<ul className={styled.list}>
						{accounts.length !== 0 ? accounts.slice(0, 3).map(account => (
							<li key={account.id} className={styled.listItem}>
								<div className={styled.itemRow}>
									<span className={styled.itemName}>{account.name}</span>
									<span>
										{account.balance.toLocaleString()} {account.currency}
									</span>
								</div>
							</li>
						))
							: (
								<li >
									<div >
										<span >Нет счетов</span>
									</div>
								</li>
							)}
					</ul>
				</div>
			</div>
		</div>
	)
}
