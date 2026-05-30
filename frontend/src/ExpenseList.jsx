import ExpenseItem from "./ExpenseItem";

function ExpenseList({expenses, onDelete}) {

    if (expenses.length === 0) {
        return <p style={{ color: '#888', marginTop: '16px' }}>No expenses for this date.</p>
    }

    return (
        <div className='expense-list'>
            {expenses.map((expense) => (
                <ExpenseItem key={expense.id} expense={expense} onDelete={onDelete} />
            ))}
        </div>
    )
}

export default ExpenseList;