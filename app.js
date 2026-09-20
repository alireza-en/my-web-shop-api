
const express = require("express");
const path = require("path");
const { getCustomers } = require("./database");
const app = express();


// =========================
// Middleware
// =========================

app.use(express.json());

app.use(express.static(__dirname));


// =========================
// Home Page
// =========================

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "index.html"));

});


// =========================
// Order API
// =========================

app.post("/api/orders", (req, res) => {

    const order = req.body;

    console.log("New order:", order);

    res.json({

        message: "Order received successfully i am alireza bashiri thanks",

        order: order

    });

});

// =========================
// Membership API
// =========================

// دریافت اطلاعات عضویت از Frontend
app.post("/api/members", (req, res) => {

    // اطلاعات ارسال‌شده از Frontend را دریافت می‌کنیم
    const member = req.body;

    // اطلاعات عضو را در ترمینال نمایش می‌دهیم
    console.log("New member:", member);

    // پاسخ JSON به Frontend
    res.json({

        // پیام موفقیت
        message: "Membership received successfully",

        // برگرداندن اطلاعات عضو
        member: member

    });

});

// =========================
// Feedback API
// =========================

app.post("/api/feedback", (req, res) => {

    const feedback = req.body;

    console.log("New feedback:", feedback);

    res.json({

        message: "Feedback received successfully i am alireza bashiri en",

        feedback: feedback

    });

});
// =========================
// Customers API
// =========================

app.get("/api/customers", async (req, res) => {

    try {

        const customers = await getCustomers();

        res.json(customers);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Database error"
        });

    }

});

// =========================
// Start Server
// =========================

app.listen(3000, () => {

    console.log(
        "I am Alireza Bashiri - Server running on port 3000"
    );

});

