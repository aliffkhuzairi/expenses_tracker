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

    const [saved, setSaved] = useState('');

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
            setSaved(category);
            setTimeout(() => setSaved(''), 2000);
            console.log('Saved:', newBudget);
        }

        catch (err) {
            console.log(err);
        }
    }

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
        <div className='container'>
            <div className='budget-card card'>
                <h2>Budget Settings</h2>
                <p style={{ color: '#6d6d6d', marginTop: '8px'}}>Set your monthly spending limits</p>
                {categories.map(category => (
                    <div className='budget-layout' key={category}>
                        <label style={{ backgroundColor: getCategory(category)}}>{category}</label>
                        <div className='budget-input'>
                            <input 
                                type='number'
                                value={budgets[category]}
                                onChange={(e) => setBudgets(prev => ({...prev, [category]: e.target.value}))} />
                                <button onClick={() => handleSave(category)}>Save</button>
                                {saved === category && <span style={{ color: '#4CAF50', fontSize: '13px' }}>✅ Saved</span>}
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Budget;