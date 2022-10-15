const navigationLinks = document.querySelectorAll('.navigation__link')
const calcElems = document.querySelectorAll('.calc')
const ausn = document.querySelector('.ausn')
const formAusn = ausn.querySelector('.calc__form')
const resultTaxTotal = ausn.querySelector('.result__tax_total')
const calcLabelExpenses = ausn.querySelector('.calc__label_expenses')

function formatCurrency(n) {
	return new Intl.NumberFormat('ru-Ru', {
		style: 'currency',
		currency: 'RUB',
		maximumFractionDigits: 2,
	}).format(n)
}

// АУСН

calcLabelExpenses.style.display = 'none'

navigationLinks.forEach((link) => {
	link.addEventListener('click', (e) => {
		e.preventDefault()
		calcElems.forEach((elem, i) => {
			if (link.dataset.tax === elem.dataset.tax) {
				elem.classList.add('calc_active')
				link.classList.add('navigation__link_active')
			} else {
				elem.classList.remove('calc_active')
				navigationLinks[i].classList.remove('navigation__link_active')
			}
		})
	})
})

formAusn.addEventListener('input', () => {
	if (formAusn.type.value === 'income') {
		calcLabelExpenses.style.display = 'none'
		resultTaxTotal.textContent = formatCurrency(formAusn.income.value * 0.08)
		formAusn.expenses.value = ''
	}
	if (formAusn.type.value === 'expenses') {
		calcLabelExpenses.style.display = ''
		resultTaxTotal.textContent = formatCurrency((formAusn.income.value - formAusn.expenses.value) * 0.2)
	}
})

// Самозанятый

const selfEmployment = document.querySelector('.self-employment')
const formSelfEmployment = selfEmployment.querySelector('.calc__form')
const resultTaxSelfEmployment = selfEmployment.querySelector('.result__tax')
const calcCompensation = selfEmployment.querySelector('.calc__label_compensation')
const resultBlockCompensation = selfEmployment.querySelectorAll('.result__block_compensation')
const resultTaxCompensation = document.querySelector('.result__tax_compensation')
const resultTaxRestCompensation = document.querySelector('.result__tax_rest-compensation')
const resultTaxResult = document.querySelector('.result__tax_result')

function checkCompensation() {
	const setDisplay = formSelfEmployment.addCompensation.checked ? 'block' : 'none'
	calcCompensation.style.display = setDisplay

	resultBlockCompensation.forEach((elem) => {
		elem.style.display = setDisplay
	})
}

checkCompensation()

calcCompensation.style.display = 'none'

formSelfEmployment.addEventListener('input', () => {
	const resultIndividual = formSelfEmployment.individual.value * 0.04
	const resultEntity = formSelfEmployment.entity.value * 0.06

	checkCompensation()

	const tax = resultIndividual + resultEntity
	formSelfEmployment.compensation.value = formSelfEmployment.compensation.value > 10_000 ? 10_000 : formSelfEmployment.compensation.value
	const benifit = formSelfEmployment.compensation.value
	const resBenifit = formSelfEmployment.individual.value * 0.01 + formSelfEmployment.entity.value * 0.02
	const finalBenifit = benifit - resBenifit > 0 ? benifit - resBenifit : 0
	const finalTax = tax - (benifit - finalBenifit)

	resultTaxSelfEmployment.textContent = formatCurrency(tax)
	resultTaxCompensation.textContent = formatCurrency(benifit - finalBenifit)
	resultTaxRestCompensation.textContent = formatCurrency(finalBenifit)
	resultTaxResult.textContent = formatCurrency(finalTax)
})

// ОСНО

const osno = document.querySelector('.osno')
const formOsno = osno.querySelector('.calc__form')

const ndflExpenses = osno.querySelector('.result__block_ndfl-expenses')
const ndflIncome = osno.querySelector('.result__block_ndfl-income')
const profit = osno.querySelector('.result__block_profit')

const resultTaxNds = osno.querySelector('.result__tax_nds')
const resultTaxProperty = osno.querySelector('.result__tax_property')
const resultTaxNdflExpenses = osno.querySelector('.result__tax__ndfl-expenses')
const resultTaxNdflIncome = osno.querySelector('.result__tax_ndfl-income')
const resultTaxProfit = osno.querySelector('.result__tax_profit')

function checkFormBusiness() {
	if (formOsno.formBusiness.value === 'ip') {
		ndflExpenses.style.display = ''
		ndflIncome.style.display = ''
		profit.style.display = 'none'
	}
	if (formOsno.formBusiness.value === 'ooo') {
		ndflExpenses.style.display = 'none'
		ndflIncome.style.display = 'none'
		profit.style.display = ''
	}
}

checkFormBusiness()

formOsno.addEventListener('input', () => {
	checkFormBusiness()

	const income = formOsno.income.value
	const expenses = formOsno.expenses.value
	const property = formOsno.property.value

	const nds = income * 0.2
	const taxProperty = property * 0.02
	const profit = income - expenses
	const ndflExpensesTotal = profit * 0.13
	const ndflIncomeTotal = (income - nds) * 0.13
	const taxProfit = profit * 0.2

	resultTaxNds.textContent = formatCurrency(nds)
	resultTaxProperty.textContent = formatCurrency(taxProperty)
	resultTaxNdflExpenses.textContent = formatCurrency(ndflExpensesTotal)
	resultTaxNdflIncome.textContent = formatCurrency(ndflIncomeTotal)
	resultTaxProfit.textContent = formatCurrency(taxProfit)
})
