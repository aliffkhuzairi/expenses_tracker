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
        <div className='expense-card card'>
            <div className='expense-left'>
                <h2>{expense.title}</h2>
                <div className='expense-meta'>
                    <span className='badge' style={{ 
                        backgroundColor: getCategory(expense.category),
                    }}
                    >
                        {expense.category}
                    </span>
                </div>
            </div>
            <div className='expense-right'>
                <p className='amount'>RM {expense.amount.toFixed(2)}</p>
                <button type='button' className='btn-delete' onClick={() => onDelete(expense.id)}>
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
        </div>
    )
}

export default ExpenseItem;