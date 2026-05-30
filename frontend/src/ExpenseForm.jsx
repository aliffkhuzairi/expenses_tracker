import { useState } from 'react';


function ExpenseForm({onAddExpense, selectedDate}) {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!formData.title || !formData.amount) return;

        onAddExpense({...formData, date: selectedDate});

        setFormData({
            title: '',
            amount: '',
            category: '',
        })
    }

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData((prev) => ({...prev, [name] : value}));
    }

    return (
        <div className='form-card'>
            <form onSubmit={handleSubmit}>
                <div className='form-field'>
                    <label>Title 
                        <input type='text' name='title' value={formData.title} onChange={handleChange}/>
                    </label>

                    <label>Amount (in RM)
                        <input type='number' name='amount' value={formData.amount} onChange={handleChange}/>
                    </label>

                    <label>Category
                        <select name='category' value={formData.category} onChange={handleChange}>
                            <option value='' >Select category</option>
                            <option value='Food'>Food</option>
                            <option value='Transport'>Transport</option>
                            <option value='Entertainment'>Entertainment</option>
                            <option value='Utilities'>Utilities</option>
                            <option value='Shopping'>Shopping</option>
                            <option value='Others'>Others</option>
                        </select>
                    </label>

                </div>
                <button type='submit' className='btn-add'>Add Expense</button>
            </form>
        </div>
    )
}

export default ExpenseForm;