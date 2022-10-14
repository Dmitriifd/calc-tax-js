const navigationLinks = document.querySelectorAll('.navigation__link')
const calcElems = document.querySelectorAll('.calc')
const ausn = document.querySelector('.ausn')
const formAusn = ausn.querySelector('.calc__form')
const resultTaxTotal = ausn.querySelector('.result__tax_total')
const calcLabelExpenses = ausn.querySelector('.calc__label_expenses')

calcLabelExpenses.style.display = 'none'

navigationLinks.forEach((link) => {
	link.addEventListener('click', (e) => {
		e.preventDefault()
		calcElems.forEach((elem, i) => {
			if (link.dataset.tax === elem.dataset.tax) {
				elem.classList.add('calc_active')
				navigationLinks[i].classList.add('navigation__link_active')
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
		resultTaxTotal.textContent = formAusn.income.value * 0.08
		formAusn.expenses.value = ''
	}
	if (formAusn.type.value === 'expenses') {
		calcLabelExpenses.style.display = ''
		resultTaxTotal.textContent = (formAusn.income.value - formAusn.expenses.value) * 0.2
	}
})
