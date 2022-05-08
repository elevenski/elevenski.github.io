/*

Saatlere göre aktivitenizi renderlar.

*/

$(document).ready(function () {
    function day_message() {
        var ndate = new Date();
        var hours = ndate.getHours();
        var message = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';
        $("#day-message").html(message);
    }
    function cat() { // 0 pazar, 1 pazartesi, 2 salı, 3 çarşamba, 4 perşembe, 5 cuma, 6 cumartesi
        var nndate = new Date(),
        domEnder = function() { var a = nndate; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
        dayOfMonth = today + ( nndate.getDate() < 10) ? '0' + nndate.getDate() + domEnder : nndate.getDate() + domEnder,
        months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
        curMonth = months[nndate.getMonth()],
        curYear = nndate.getFullYear(),
        curHour = nndate.getHours() > 12 ? nndate.getHours() - 12 : (nndate.getHours() < 10 ? "0" + nndate.getHours() : nndate.getHours()),
        curMinute = nndate.getMinutes() < 10 ? "0" + nndate.getMinutes() : nndate.getMinutes(),
        curSeconds = nndate.getSeconds() < 10 ? "0" + nndate.getSeconds() : nndate.getSeconds(),
        curMeridiem = nndate.getHours() > 12 ? "PM" : "AM";
        var today = dayOfMonth + " " + curMonth + " " + curYear + " <span class='ml-1 mr-1'>•</span> " + curHour + ":" + curMinute + ":" + curSeconds + " " + curMeridiem;
        //
        var ndate = new Date();
        var hours = ndate.getHours();
        var day = ndate.getDay();

        if (day === 1 || day === 2 || day === 3 || day === 4 || day === 5) {
            if (hours >= 9 && hours <= 17) {
                $("#cat").html(`<i class="fa-regular fa-graduation-cap text-gray-500 inline-flex ml-1 mr-2"></i>${today}`);
            } else if (hours >= 23 || hours <= 8) {
                $("#cat").html(`<i class="fa-regular fa-snooze text-gray-500 inline-flex ml-1 mr-2"></i>${today}`);
            } else {
                $("#cat").html(`<i class="fa-regular fa-circle-question text-gray-500 inline-flex ml-1 mr-2"></i>${today}`);
            }
        } else if (day === 6 || day === 0) {
            if (hours >= 23 || hours <= 10) {
                $("#cat").html(`<i class="fa-regular fa-snooze text-gray-500 inline-flex ml-1 mr-2"></i>${today}`);
            } else {
                $("#cat").html(`<i class="fa-regular fa-circle-question text-gray-500 inline-flex ml-1 mr-2"></i>${today}`);
            }
        } else {
            $("#cat").html(`<i class="fa-regular fa-circle-question text-gray-500 inline-flex ml-1 mr-2"></i>${today}`);
        }
    }

    setInterval(day_message, 7000);
    setInterval(cat, 1000);
});

Number.prototype.leadingZeroes = function (len) {
    return (new Array(len).fill('0', 0).join('') + this).slice(-Math.abs(len));
}