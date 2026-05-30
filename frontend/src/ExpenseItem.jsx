function ExpenseItem({expense, onDelete}) {
    
    const getCategory = (category) => {
        const colors = {
            Food: '#4CAF50',
            Transport: '#2196F3',
            Entertainment: '#9C27B0',
            Utilities: '#FF9800',
            Shopping: '#E91E63',
            Others: '#607D8B'
        }

        return colors[category] || '#607D8B';
    }

    return (
        <div className='expense-card'>
            <div>
                <h2>{expense.title}</h2>
                <div className='expense-info'>
                    <p>Category: </p>
                    <span style={{ 
                        backgroundColor: getCategory(expense.category),
                        color: '#ccc',
                        padding: '12px'
                     }}
                     >
                        {expense.category}
                     </span>
                     <p>{new Date(expense.date).toLocaleDateString('en-GB')}</p>
                </div>
            </div>
            <div>
                <p className='amount'>RM {expense.amount.toFixed(2)}</p>
                <button type='button' className='btn-delete' onClick={() => onDelete(expense.id)}>Delete Expense</button>
            </div>
        </div>
    )
}

export default ExpenseItem;