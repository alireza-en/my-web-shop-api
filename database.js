require('dotenv').config();
const sql = require("mssql");

const config = {
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,

    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

async function getCustomers() {
    const pool = await sql.connect(config);

    const result = await pool.request().query(`
        SELECT *
        FROM dbo.Customer
    `);

    return result.recordset;
}

async function addCustomer(member) {
    const pool = await sql.connect(config);

    const result = await pool.request()
        .input("FullName", sql.NVarChar, member.FullName)
        .input("Phone", sql.VarChar, member.Phone)
        .input("Address", sql.NVarChar, member.Address)
        .query(`
            INSERT INTO dbo.Customer
            (FullName, Phone, Address)
            VALUES
            (@FullName, @Phone, @Address)
        `);

    return result;
}

module.exports = {
    getCustomers,
    addCustomer
};
