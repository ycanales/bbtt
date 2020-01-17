function createDayTotals(dayHours, tr) {
    if (!page.list) return
    const hoursStr = dayHours.toString()
    const dayTotalTr = document.createElement('tr')
    const dayTotalTd = document.createElement('td')
    const dayTotalTdSpacer = document.createElement('td')
    dayTotalTd.setAttribute('colspan', 6)
    dayTotalTd.innerHTML = `${hoursStr.substring(1, hoursStr.length - 3)}.${hoursStr.substring(hoursStr.length - 2)}`
    dayTotalTd.style.fontWeight = 'bold'
    dayTotalTr.appendChild(dayTotalTdSpacer)
    dayTotalTr.appendChild(dayTotalTd)
    dayTotalTr.style.backgroundColor = colors[dayIndex % 2]
    tr.insertAdjacentElement('beforebegin', dayTotalTr)
}

const trs = document.querySelectorAll('tr')
const rowsCount = trs.length
const colors = ['#EFF3FB', '#FFFFFF']
let dayHours = 0
let lastDate = ''
let dayIndex = 0

const page = {
    list: location.pathname === '/ListaTimeTracker.aspx'
}
console.log(location)

for (const [i, tr] of trs.entries()) {
    if (i === 0) {
        tr.classList.add('btt-table-header')
        tr.style = null
        continue
    }

    const date = tr.querySelector(':first-child')
    const hours = tr.querySelector(':nth-child(2)')
    const description = tr.querySelector(':nth-child(5)')
    description.classList.add('btt-td-description')
    console.log(i, hours)
    
    if (!lastDate) {
        lastDate = date.textContent
        date.style.fontWeight = 'bold'
    } else if (lastDate !== date.textContent) {
        createDayTotals(dayHours, tr)
        dayHours = 0
        dayIndex += 1
        lastDate = date.textContent
        date.style.fontWeight = 'bold'
    } else if (lastDate === date.textContent) {
        date.textContent = ''
    }
    dayHours += +hours.textContent.replace('.', '')
    tr.style.backgroundColor = colors[dayIndex % 2]
    
    // console.log(i, dayIndex)
    console.log(i, 'dayHours', dayHours)

    if (i === rowsCount - 1) {
        tr.style = null
        tr.classList.add('btt-table-footer')
        // continue   
    }
}

// Style links
const links = document.querySelectorAll('a')
links.forEach(link => {
    if (link.classList.contains('btn-blue')) {
        link.classList.remove('btn-blue')
        link.classList.add('btt-btn-primary')
        if (link.textContent === 'Leaves/Vacations') {
            link.classList.add('btt-btn-secondary')
        }
    }
})

// Style table
const table = document.querySelector('table')
table.parentNode.classList.add('btt-table')

// Move username and remove paragraph
const mainFirstParagraph = document.querySelector('#main p')
const username = document.querySelector('p strong').textContent
console.log(username)
const mainEl = document.querySelector('#main')
mainEl.removeChild(mainFirstParagraph)

const headerEl = document.querySelector('#header')
const logoutEl = document.querySelector('a.logout')
logoutEl.style.margin = '0 0 0 12px'
const usernameEl = document.createElement('div')
usernameEl.innerHTML = username

const titleEl = document.createElement('h1')
titleEl.innerHTML = 'TimeTracker'

headerEl.insertBefore(usernameEl, logoutEl)

const headerLeftEl = document.createElement('div')
headerLeftEl.classList.add('btt-header-wrapper')

const dummyLogoEl = document.createElement('div')
const dummyTitleEl = document.createElement('div')
dummyTitleEl.replaceWith(headerEl.querySelector('a'))
headerLeftEl.append(dummyLogoEl)
dummyLogoEl.replaceWith(headerEl.querySelector('a'))
headerLeftEl.append(titleEl)

const headerRightEl = document.createElement('div')
headerRightEl.style.display = 'flex'
headerRightEl.appendChild(usernameEl)
headerRightEl.appendChild(logoutEl)
headerEl.prepend(headerLeftEl)
headerEl.appendChild(headerRightEl)

// Move date range selector to bottom
if (page.list) {
    const dateRangeEl = document.querySelector('.block-column')
    const dummyEl = document.createElement('div')
    mainEl.append(dummyEl)
    dummyEl.replaceWith(dateRangeEl)
}

// Adjust margin of Track Hours and Leaves/Vacations
const buttonsContainerEl = document.querySelector('p')
buttonsContainerEl.style.margin = 0