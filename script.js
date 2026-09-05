// لینک خرید را پیدا می‌کنیم
const buyLink = document.getElementById("b");

// لینک تماس را پیدا می‌کنیم
const callLink = document.getElementById("cal");

// لینک عضویت را پیدا می‌کنیم
const memberLink = document.getElementById("member");


// کادر خرید را پیدا می‌کنیم
const buyBox = document.getElementById("bu");

// کادر تماس را پیدا می‌کنیم
const phoneBox = document.getElementById("phoneBo");

// کادر عضویت را پیدا می‌کنیم
const memberBox = document.getElementById("memberBo");


// این تابع هر سه کادر را می‌بندد
function closeBoxes() {
    buyBox.style.display = "none";
    phoneBox.style.display = "none";
    memberBox.style.display = "none";
}


// وقتی روی buy کلیک می‌کنیم
buyLink.addEventListener("click", function(event) {

    // جلوگیری از رفتن لینک به صفحه دیگر
    event.preventDefault();

    // ابتدا همه کادرها را می‌بندیم
    closeBoxes();

    // سپس کادر خرید را باز می‌کنیم
    buyBox.style.display = "block";
});


// وقتی روی call کلیک می‌کنیم
callLink.addEventListener("click", function(event) {

    // جلوگیری از رفتار پیش‌فرض لینک
    event.preventDefault();

    // ابتدا همه کادرها را می‌بندیم
    closeBoxes();

    // سپس کادر تماس را باز می‌کنیم
    phoneBox.style.display = "block";
});


// وقتی روی member کلیک می‌کنیم
memberLink.addEventListener("click", function(event) {

    // جلوگیری از رفتار پیش‌فرض لینک
    event.preventDefault();

    // ابتدا همه کادرها را می‌بندیم
    closeBoxes();

    // سپس کادر عضویت را باز می‌کنیم
    memberBox.style.display = "block";
});


// بررسی کلیک در هر جای صفحه
document.addEventListener("click", function(event) {

    // اگر کلیک داخل هیچ‌کدام از کادرها یا روی سه لینک نباشد
    if (
        !buyBox.contains(event.target) &&
        !phoneBox.contains(event.target) &&
        !memberBox.contains(event.target) &&
        event.target !== buyLink &&
        event.target !== callLink &&
        event.target !== memberLink
    ) {

        // کادرها بسته می‌شوند
        closeBoxes();
    }
});

// تمام دکمه‌های افزایش تعداد را پیدا می‌کنیم
const plusButtons = document.querySelectorAll(".plus");

// تمام دکمه‌های کاهش تعداد را پیدا می‌کنیم
const minusButtons = document.querySelectorAll(".minus");

// نمایش جمع کل مبلغ
const total = document.getElementById("total");


// قیمت هر محصول
const prices = [500, 20, 30];


// تابع محاسبه جمع مبلغ
function calculateTotal() {

    // جمع اولیه
    let sum = 0;

    // تمام ردیف‌های محصولات
    const products = document.querySelectorAll(".product-row");

    // روی هر محصول حرکت می‌کنیم
    products.forEach(function(product, index) {

        // تعداد محصول را پیدا می‌کنیم
        const number = product.querySelector(".number");

        // تعداد را به عدد تبدیل می‌کنیم
        const quantity = Number(number.textContent);

        // قیمت × تعداد
        sum += prices[index] * quantity;
    });

    // نمایش جمع جدید
    total.textContent = String(sum);

}


// دکمه‌های + را فعال می‌کنیم
plusButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // ردیف محصول مربوط به همین دکمه
        const product = button.closest(".product-row");

        // تعداد محصول
        const number = product.querySelector(".number");

        // تعداد فعلی
        let quantity = Number(number.textContent);

        // یک عدد اضافه می‌کنیم
        quantity++;

        // نمایش تعداد جدید
        number.textContent = quantity;

        // محاسبه مجدد قیمت
        calculateTotal();
    });
});


// دکمه‌های − را فعال می‌کنیم
minusButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // ردیف محصول مربوط به همین دکمه
        const product = button.closest(".product-row");

        // تعداد محصول
        const number = product.querySelector(".number");

        // تعداد فعلی
        let quantity = Number(number.textContent);

        // اگر تعداد بیشتر از صفر باشد، یکی کم می‌کنیم
        if (quantity > 0) {
            quantity--;
        }

        

        // نمایش تعداد جدید
        number.textContent = quantity;

        // محاسبه مجدد قیمت
        calculateTotal();
    });
});



// دکمه خرید را از HTML پیدا می‌کنیم
const checkoutButton = document.getElementById("checkout");


// وقتی روی دکمه خرید کلیک می‌کنیم
checkoutButton.addEventListener("click", function() {

    // تمام ردیف‌های محصولات را پیدا می‌کنیم
    const products = document.querySelectorAll(".product-row");

    // آرایه‌ای برای نگهداری محصولات سفارش
    const orderItems = [];

    // روی تمام محصولات حرکت می‌کنیم
    products.forEach(function(product, index) {

        // نام محصول را پیدا می‌کنیم
        const name = product.querySelector("span").textContent;

        // تعداد محصول را پیدا می‌کنیم
        const number = product.querySelector(".number");

        // تعداد را از String به Number تبدیل می‌کنیم
        const quantity = Number(number.textContent);

        // اگر تعداد بیشتر از صفر باشد
        if (quantity > 0) {

            // اطلاعات محصول را داخل آرایه قرار می‌دهیم
            orderItems.push({
                name: name,
                quantity: quantity,
                price: prices[index]
            });
        }
    });


    // اگر هیچ محصولی انتخاب نشده باشد
    if (orderItems.length === 0) {

        alert("لطفاً حداقل یک محصول انتخاب کنید.");

        return;
    }


    // اطلاعات کامل سفارش
    const order = {

        // محصولات سفارش
        items: orderItems,

        // مبلغ نهایی
        total: Number(total.textContent)
    };

/*  */
    // ارسال سفارش به API
    fetch("/api/orders", {

        // نوع درخواست
        method: "POST",

        // اعلام اینکه اطلاعات JSON هستند
        headers: {
            "Content-Type": "application/json"
        },

        // تبدیل Object جاوااسکریپت به JSON
        body: JSON.stringify(order)

    })

    // دریافت پاسخ API
    .then(function(response) {

        // تبدیل پاسخ JSON به Object
        return response.json();
    })

    // استفاده از اطلاعات پاسخ API
    .then(function(data) {

        // نمایش پیام سرور
        alert(data.message);

        // نمایش اطلاعات برای بررسی
        console.log("Order:", order);
        console.log("Server response:", data);
    })

    // اگر ارتباط با API با خطا مواجه شود
    .catch(function(error) {

        console.error("Error:", error);

        alert("ارسال سفارش با خطا مواجه شد.");
    });

});

// =========================
// Membership Form
// =========================

// فرم عضویت را از HTML پیدا می‌کنیم
const memberForm = document.getElementById("memberForm");

// وقتی فرم عضویت ارسال می‌شود
memberForm.addEventListener("submit", function(event) {

    // جلوگیری از refresh شدن صفحه
    event.preventDefault();

    // مقدار نام را از فرم می‌گیریم
    const name = memberForm.elements["name"].value;

    // مقدار ایمیل را از فرم می‌گیریم
    const email = memberForm.elements["email"].value;

    // اطلاعات عضو را در یک Object قرار می‌دهیم
    const member = {

        name: name,
        email: email

    };

    // ارسال اطلاعات عضو به Backend
    fetch("/api/members", {

        // نوع درخواست POST است
        method: "POST",

        // مشخص می‌کنیم اطلاعات به صورت JSON است
        headers: {
            "Content-Type": "application/json"
        },

        // تبدیل Object به JSON
        body: JSON.stringify(member)

    })

    // دریافت پاسخ Backend
    .then(function(response) {

        // تبدیل پاسخ JSON به Object JavaScript
        return response.json();

    })

    // استفاده از پاسخ Backend
    .then(function(data) {

        // پیام ارسال‌شده توسط Backend را نمایش می‌دهیم
        alert(data.message);

        // اطلاعات عضو را در Console مرورگر نمایش می‌دهیم
        console.log("Member:", member);

        // پاسخ کامل Backend را نمایش می‌دهیم
        console.log("Server response:", data);

    })

    // اگر ارتباط با Backend خطا داشت
    .catch(function(error) {

        // نمایش خطا در Console
        console.error("Error:", error);

        // نمایش پیام خطا به کاربر
        alert("ثبت عضویت با خطا مواجه شد.");

    });

});