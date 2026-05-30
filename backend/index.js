const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client'); 
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.json({message: "Express API is running"});
})

app.get('/api/expenses', async (req, res) => {
    try {
        const expenses = await prisma.expense.findMany({
            orderBy: {date: 'desc'}
        })

        res.json(expenses);
    }

    catch(err) {
        console.log(err);
        res.json({error: 'Something went wrong'});
    }
})

app.post('/api/expenses', async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;
        const expenses = await prisma.expense.create({
            data: {
                title,
                amount: Number(amount),
                category,
                date: date? new Date(date) : new Date()
            }
        })

        res.json(expenses);
    }

    catch(err) {
        console.log(err);
        res.json({error: 'Something went wrong'});
    }
})

app.delete('/api/expenses/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const expenses = await prisma.expense.delete({where: {id}})

        res.json({message: "Expense deleted!"});
    }
    catch(err) {
        console.log(err);
        res.json({message: "Something went wrong"})
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on  http://localhost:${PORT}`);
})