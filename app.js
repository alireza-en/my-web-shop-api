const express = require("express");
const {
    getCustomers,
    addCustomer
} = require("./database");

const sql = require("mssql");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("."));

// Home
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Get customers
app.get("/api/members", async (req, res) => {
    try {
        const customers = await getCustomers();
        res.json(customers);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Database error"
        });
    }
});

// Add customer
app.post("/api/members", async (req, res) => {
    try {
        await addCustomer(req.body);

        res.json({
            message: "Customer added successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Could not add customer"
        });
    }
});

// Add feedback
app.post("/api/feedback", async (req, res) => {
    try {
        const pool = await sql.connect({
            server: process.env.DB_SERVER,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            options: {
                encrypt: true,
                trustServerCertificate: true
            }
        });

        await pool.request()
            .input("FullName", sql.NVarChar(100), req.body.FullName)
            .input("Email", sql.VarChar(150), req.body.Email)
            .input("Message", sql.NVarChar(1000), req.body.Message)
            .query(`
                INSERT INTO dbo.Feedback
                (FullName, Email, Message)
                VALUES
                (@FullName, @Email, @Message)
            `);

        res.json({
            message: "Feedback added successfully"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Could not save feedback"
        });
    }
});

app.listen(PORT, () => {
    console.log(
        `I am Alireza Bashiri - Server running on port ${PORT}`
    );
});
