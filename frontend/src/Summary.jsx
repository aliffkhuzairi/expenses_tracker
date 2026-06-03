import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
        <div style={{ 
            background: 'white', 
            padding: '8px 12px', 
            borderRadius: '8px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            fontSize: '13px'
        }}>
            <p style={{ fontWeight: 600, marginBottom: '4px' }}>{label || payload[0].name}</p>
            <p style={{ color: '#667eea' }}>RM {payload[0].value.toFixed(2)}</p>
        </div>
        );
    }
    return null;
};

function Summary() {

    const [expenses, setExpenses] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState('all');
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ expenseRes, budgetRes ]= await Promise.all([
                    fetch(`${import.meta.env.VITE_API_URL}/api/expenses`),
                    fetch(`${import.meta.env.VITE_API_URL}/api/budgets`)
                ])
                ;
                const expenseData = await expenseRes.json();
                const budgetData = await budgetRes.json();

                setExpenses(expenseData);
                setBudgets(budgetData);
            }
            catch(err) {
                console.log(err);
            }
        }
        fetchData();
    }, []);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

    const filteredExpense = expenses.filter((expense) => {
        const date = new Date(expense.date);
        const yearMatch = date.getFullYear() === Number(selectedYear);
        const monthMatch = selectedMonth === 'all' || date.getMonth() === Number(selectedMonth);
        return yearMatch && monthMatch;
    })

    const availableYears = [...new Set(expenses.map(expense => 
        new Date(expense.date).getFullYear()
    ))].sort((a, b) => b - a);

    const monthlyData = monthNames.map((name, index) => ({
        name: name.slice(0, 3),
        amount: filteredExpense
            .filter(expense => new Date(expense.date).getMonth() === index)
            .reduce((sum, expense) => sum + expense.amount, 0)
    }));

    const byCategory = filteredExpense.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const categoryData = Object.entries(byCategory).map(([name, value]) => ({
        name,
        value
    }));

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


    const total = filteredExpense.reduce((sum, e) => sum + e.amount, 0);
    const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];
    const transactionCount = filteredExpense.length;

    const budgetMap = budgets.reduce((acc, b) => {
        acc[b.category] = b.amount;
        return acc;
    }, {});

    return (
        <div className='container'>
            <section className='filter'>
                <div className='filter-row'>
                    <label>Year: </label>
                    <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                        <option value=''>Select year</option>
                        {availableYears.map((year) => (
                            <option value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <div className='filter-row'>
                    <label>Month: </label>
                    <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                        <option value='all'>All</option>
                        {monthNames.map((month, index) => (
                            <option key={month} value={index}>{month}</option>
                        ))}
                    </select>
                </div>
            </section>

            <section className='stat-cards'>
                <div className='total card'>
                    <h3>Total Spent</h3>
                    <p>RM {total.toFixed(2)}</p>
                </div>
                <div className='top-category card'>
                    <h3>Top Category</h3>
                    <p>{topCategory ? topCategory[0] : 'N/A'}</p>
                    <p>RM {topCategory ? topCategory[1].toFixed(2) : '0.00'}</p>
                </div>
                <div className='transaction card'>
                    <h3>Transactions</h3>
                    <p>{transactionCount}</p>
                </div>
            </section>

            <section className='summary-layout'>
                <div className='left-col'>
                    <div className='monthly-breakdown card'>
                        <h3>Monthly Breakdown</h3>
                        {monthlyData.filter(({ amount }) => amount > 0).length === 0 
                            ? <p style={{ color: '#888', fontSize: '14px' }}>No expenses for this period.</p>
                            : monthlyData.filter(({ amount }) => amount > 0)

                            .map(({ name, amount }) => (
                                <div key={name}>
                                    <span>{name}</span>
                                    <span>RM {amount.toFixed(2)}</span>
                                </div>
                        ))}
                    </div>
                    { selectedMonth === 'all' && (
                        <div className='chart-card card'>
                            <h3>Monthly Spending</h3>
                            <ResponsiveContainer width='100%' height={250}>
                                <BarChart data={monthlyData} margin={{ top: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                                        {monthlyData.map((entry, index) => (
                                        <Cell key={index} fill={entry.amount > 0 ? '#667eea' : '#f0f0f0'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                    
                    
                </div>

                <div className='right-col'>
                    <div className='category-breakdown card'>
                        <h3>By Category</h3>
                        {Object.entries(byCategory).length === 0
                            ? <p style={{ color: '#888', fontSize: '14px' }}>No expenses for this period.</p>
                            : Object.entries(byCategory).map(([category, amount]) => {
                                const budget = budgetMap[category];
                                const percent = budget ? Math.min((amount / budget) * 100, 100) : null;

                                return (
                                    <div key={category} className='category-row'>
                                        <div className='category-info'>
                                            <span>{category}</span>
                                            <span>RM {amount.toFixed(2)} {budget && selectedMonth !== 'all' ? `/ RM ${budget}` : ''}</span>
                                        </div>
                                        <div className='category-progress'>
                                            {budget && selectedMonth !== 'all' && (
                                                <div className='progress-bar-bg'>
                                                    <div className='progress-bar-fill'
                                                        style={{ 
                                                            width: `${percent}%`,
                                                            background: percent >= 100 ? '#ff4444' : percent >= 80 ? '#FF9800' : '#4CAF50'
                                                        }}
                                                    >

                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        
                                    </div>    
                                );   
                        })}
                    </div>
                    <div className='chart-card card'>
                        <h3>Spending by Category</h3>
                        {categoryData.length === 0
                            ? <p style={{ color: '#888', fontSize: '14px' }}>No expenses for this period.</p>
                            : <ResponsiveContainer width='100%' height={250}>
                                <PieChart margin={{ top: 10 }}>
                                    <Legend />
                                    <Pie
                                        data={categoryData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={90}
                                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                                        labelLine={false}
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={index} fill={getCategory(entry.name)} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>    
                        }
                        
                    </div>
                </div>
            </section>
        </div>
    )
    
}

export default Summary;