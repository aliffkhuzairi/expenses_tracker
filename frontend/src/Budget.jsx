import { useState, useEffect } from 'react';

function Budget() {

    const [budgets, setBudgets] = useState({
        Food: '',
        Transport: '',
        Entertainment: '',
        Utilities: '',
        Shopping: '',
        Others: ''
    });

    const categories = ['Food', 'Transport', 'Entertainment', 'Utilities', 'Shopping', 'Others'];

    useEffect(() => {
        try {
            const fetchData = async () => {
                const res = await fetch('http://localhost:3001/api/budgets');
                const data = await res.json();

                const budgetObj = {};
                data.forEach(b => { budgetObj[b.category] = b.amount; });
                setBudgets(prev => ({...prev, ...budgetObj }));
            }

            fetchData();
        }
        catch (err) {
            console.log(err);
        }
        
    }, [])

    const handleSave = async (category) => {
        try {
            const res = await fetch('http://localhost:3001/api/budgets', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({category, amount: budgets[category] })
            });

            const newBudget = await res.json();
            console.log('Saved:', newBudget);
        }

        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='container'>
            <h2>Setup your monthly budget</h2>
            {categories.map(category => (
                <div key={category}>
                    <label>{category}</label>
                    <input 
                        type='number'
                        value={budgets[category]}
                        onChange={(e) => setBudgets(prev => ({...prev, [category]: e.target.value}))} />

                    <button onClick={() => handleSave(category)}>Save</button>
                </div>
            ))}
        </div>
    )
}

export default Budget;