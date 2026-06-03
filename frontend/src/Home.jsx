import { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import Calendar from './Calendar';

function Home() {
    const [expenses, setExpenses] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());



    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/expenses`);
                const data = await res.json();

                setExpenses(data);
            }
            catch(err) {
                console.log(err);
            }
        }

        fetchData();
    }, [])

    const handleAddExpense = async (formData) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/expenses`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });

            const newExpense = await res.json();
            setExpenses(prev => [...prev, newExpense]);

        }

        catch(err) {
            console.log(err);
        }
    }

    const handleDelete = async (id) => {
        try {
            await fetch(`${import.meta.env.VITE_API_URL}/api/expenses/${id}`, {
                method: 'DELETE'
            })

            setExpenses(prev => prev.filter(expense => expense.id !== id));
        }
        catch(err) {
            console.error(err);
        }
    }

    const handleMonthChange = (direction) => {
        setCurrentMonth(prev => {
            const newMonth = new Date(prev);
            newMonth.setMonth(newMonth.getMonth() + direction)
            return newMonth;
        })
    }

    const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return (
        expenseDate.getDate() === selectedDate.getDate() &&
        expenseDate.getMonth() === selectedDate.getMonth() &&
        expenseDate.getFullYear() === selectedDate.getFullYear()
        )
    })

    const dailyTotal = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

    return (
        <>
        <main className='container'>
            <div className='main-layout'>
            <div className='left-panel'>
                <Calendar
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                currentMonth={currentMonth}
                onMonthChange={handleMonthChange}
                expenses={expenses}
                />
                <ExpenseForm onAddExpense={handleAddExpense} selectedDate={selectedDate} />
            </div>

            <div className='right-panel'>
                <div className='daily-header'>
                    <h3>{selectedDate.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</h3>
                    <p className='daily-total'>RM {dailyTotal.toFixed(2)}</p>
                </div>
                <ExpenseList expenses={filteredExpenses} onDelete={handleDelete} />
            </div>

            </div>
        </main>
        </>
    )
}

export default Home;
