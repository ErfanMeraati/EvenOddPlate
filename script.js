document.addEventListener("DOMContentLoaded", function () {
    const iranCode = document.getElementById("iranCode");
    const plateNumber = document.getElementById("plateNumber");
    const letter = document.getElementById("letter");
    const regionCode = document.getElementById("regionCode");
    const resultAlert = document.getElementById("resultAlert");
    const resultText = document.getElementById("resultText");

    function validateNumber(input, length) {
        input.value = input.value.replace(/[^0-9]/g, "").slice(0, length);
        checkTrafficPermission();
    }

    function checkTrafficPermission() {
        if (iranCode.value.length !== 2 || plateNumber.value.length !== 3 || !letter.value || regionCode.value.length !== 2) {
            resultAlert.classList.add("d-none");
            return;
        }
        
        const today = new Date();
        const days = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"];
        const todayName = days[today.getDay()];
        
        const isEvenDay = ["شنبه", "دوشنبه", "چهارشنبه"].includes(todayName);
        const plateLastDigit = parseInt(plateNumber.value[2]);
        const isEvenPlate = plateLastDigit % 2 === 0;
        const canDrive = (isEvenDay && isEvenPlate) || (!isEvenDay && !isEvenPlate);

        if (todayName === "جمعه") {
            resultText.innerText = ` امروز جمعه است و طرح زوج و فرد اعمال نمی‌شود. و پلاک شما ${isEvenPlate ? "زوج" : "فرد"} است.`;
            resultAlert.classList.remove("d-none");
            resultAlert.classList.add("alert-info");
            return;
        }

        resultText.innerText = `امروز ${todayName} است و پلاک شما ${isEvenPlate ? "زوج" : "فرد"} است. ${canDrive ? "می‌توانید" : "نمی‌توانید"} تردد کنید.`;
        resultAlert.classList.remove("d-none");
        resultAlert.classList.toggle("alert-success", canDrive);
        resultAlert.classList.toggle("alert-danger", !canDrive);
    }

    [iranCode, plateNumber, regionCode].forEach(input => {
        input.addEventListener("input", function() {
            validateNumber(input, input.id === "plateNumber" ? 3 : 2);
        });
    });

    letter.addEventListener("change", checkTrafficPermission);
});
