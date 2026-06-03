import { useState } from 'react';


function ExpenseForm({onAddExpense, selectedDate}) {
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        category: '',
    });

    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!formData.title || !formData.amount || !formData.category) {
            setError('Please fill in all fields.');
            return;
        }

        setError('');

        onAddExpense({...formData, date: selectedDate});

        setFormData({
            title: '',
            amount: '',
            category: '',
        })

        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    }

    const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData((prev) => ({...prev, [name] : value}));
    }

    return (
        <div className='form-card card'>
            <form onSubmit={handleSubmit}>
                <h2>Add New Expense</h2>
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
                {error && <p className='error-message'>{error}</p>}
                {saved && (
                    <p className='success-message'>✅ Expense added successfully!</p>
                )}
            </form>
        </div>
    )
}

export default ExpenseForm;