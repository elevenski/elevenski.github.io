/*

BU COMPONENT BETA AŞAMASINDA VE BİRSÜRÜ BUG'LARI VARDIR.
GELİŞTİRİLMEYE AÇIKTIR.

*/

$(document).ready(function () {
    function time() {
        var ndate = new Date();
        var hours = ndate.getHours();
        var message = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';
        $('#date').html('<i class="fa-regular fa-clock text-gray-500 inline-flex ml-1 mr-2"></i>' + hours.leadingZeroes(2) + ":" + ndate.getMinutes().leadingZeroes(2) + ":" + ndate.getSeconds().leadingZeroes(2) + (hours < 12 ? 'AM' : 'PM'));
    }
    function day_message() {
        var ndate = new Date();
        var hours = ndate.getHours();
        var message = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';
        $("#day-message").html(message);
    }
    function cat() { // 0 pazar, 1 pazartesi, 2 salı, 3 çarşamba, 4 perşembe, 5 cuma, 6 cumartesi
        var ndate = new Date();
        var hours = ndate.getHours();
        var day = ndate.getDay();

        if (day === 1 || day === 2 || day === 3 || day === 4 || day === 5) {
            if (hours >= 9 && hours <= 17) {
                $("#cat").html('<i class="fa-regular fa-graduation-cap text-gray-500 inline-flex ml-1 mr-2"></i>on School');
            } else if (hours >= 23 || hours <= 8) {
                $("#cat").html('<i class="fa-regular fa-snooze text-gray-500 inline-flex ml-1 mr-2"></i>on Bed');
            } else {
                $("#cat").html('<i class="fa-regular fa-circle-question text-gray-500 inline-flex ml-1 mr-2"></i>Can do anything');
            }
        } else if (day === 6 || day === 0) {
            if (hours >= 23 || hours <= 10) {
                $("#cat").html('<i class="fa-regular fa-snooze text-gray-500 inline-flex ml-1 mr-2"></i>on Bed');
            } else {
                $("#cat").html('<i class="fa-regular fa-circle-question text-gray-500 inline-flex ml-1 mr-2"></i>Can do anything');
            }
        } else {
            $("#cat").html('<i class="fa-regular fa-circle-question text-gray-500 inline-flex ml-1 mr-2"></i>Can do anything');
        }

        /*if (hours >= 23 && hours <= 10) {
            $("#cat").html('<i class="fa-regular fa-snooze text-gray-500 inline-flex ml-1 mr-2"></i>on Bed');
        } else {
            $("#cat").html('<i class="fa-regular fa-circle-question text-gray-500 inline-flex ml-1 mr-2"></i>Can do anything');
        }*/
        
    }

    setInterval(time, 1000);
    setInterval(day_message, 7000);
    setInterval(cat, 1000);
});

Number.prototype.leadingZeroes = function (len) {
    return (new Array(len).fill('0', 0).join('') + this).slice(-Math.abs(len));
}