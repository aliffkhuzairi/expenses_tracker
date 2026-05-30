function Calendar({ selectedDate, onSelectDate, currentMonth, onMonthChange, expenses}) {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDay = new Date(year, month, 1).getDay();

    console.log('Year:', year);
    console.log('Month:', month);
    console.log('Days in month:', daysInMonth);
    console.log('Starting day:', startingDay);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className='calendar card'>
            <div className='calendar-header'>
                <button onClick={() => onMonthChange(-1)}>
                    <i class="fa-solid fa-angle-left"></i>
                </button>
                <h2>{monthNames[month]} {year}</h2>
                <button onClick={() => onMonthChange(1)}>
                    <i class="fa-solid fa-angle-right"></i>
                </button>
            </div>

            <div className='calendar-grid'>
                {days.map((day) => (
                    <div className='calendar-day-label' key={day}>{day}</div>
                ))}

                {/* Empty cells before day 1 */}
                {Array(startingDay).fill(null).map((_, i) => (
                    <div key={`empty-${i}`} className='calendar-day-empty'></div>
                ))}

                {/* Day cells */}
                {Array(daysInMonth).fill(null).map((_, i) => {
                    const day = i + 1;
                    const isToday = 
                        day === new Date().getDate() && 
                        month === new Date().getMonth() &&
                        year === new Date().getFullYear();

                    const isSelected = 
                        day == selectedDate.getDate() &&
                        month == selectedDate.getMonth() &&
                        year == selectedDate.getFullYear();

                    const hasExpenses = expenses.some((expense) => {
                        const expenseDate = new Date(expense.date);

                        return (
                            expenseDate.getDate() === day &&
                            expenseDate.getMonth() === month &&
                            expenseDate.getFullYear() === year
                        )
                    })

                    return (
                        <div
                            key={day}
                            className={`calendar-day ${isToday? 'today' : ''} ${isSelected? 'selected' : ''}`}
                            onClick={() => onSelectDate(new Date(year, month, day))}>

                                {day}
                                {hasExpenses && 
                                <span 
                                    className='expense-dot'
                                    style={{ background: isToday ? 'white' : '#ff6b6b' }}>
                                </span>}
                        </div>
                    )

                })}
            </div>
            
        </div>
    )
}

export default Calendar;