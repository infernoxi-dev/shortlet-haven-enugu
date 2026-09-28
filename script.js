// Rate per night constant
const NIGHTLY_RATE = 30000;

// Set default dates when the DOM loads (Sep 28 - Sep 29)
document.addEventListener("DOMContentLoaded", () => {
    const today = new Date('2026-09-28');
    const tomorrow = new Date('2026-09-29');

    document.getElementById('checkIn').value = today.toISOString().split('T')[0];
    document.getElementById('checkOut').value = tomorrow.toISOString().split('T')[0];

    // Initial calculation on page load
    calculateTotal();
});

// Toggle Mobile Navigation Menu
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// Dynamically Calculate Nights & Total Price
function calculateTotal() {
    const checkInVal = document.getElementById('checkIn').value;
    const checkOutVal = document.getElementById('checkOut').value;

    if (checkInVal && checkOutVal) {
        const date1 = new Date(checkInVal);
        const date2 = new Date(checkOutVal);
        
        const timeDiff = date2.getTime() - date1.getTime();
        let nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (nights <= 0) {
            nights = 1;
        }

        const total = nights * NIGHTLY_RATE;

        document.getElementById('nightCount').innerText = `${nights} Night${nights > 1 ? 's' : ''}`;
        document.getElementById('totalPrice').innerText = `₦${total.toLocaleString()}`;
    }
}

// Format and Dispatch Reservation Data directly to WhatsApp
function sendWhatsApp(event) {
    event.preventDefault();
    
    const phone = "2347031080961"; // Direct hotel desk contact[span_47](start_span)[span_47](end_span)
    const name = document.getElementById('fullName').value;
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const guests = document.getElementById('guests').value;
    const nights = document.getElementById('nightCount').innerText;
    const total = document.getElementById('totalPrice').innerText;

    const text = `Hello Shortlet Haven! I would like to make a reservation booking:%0A%0A` +
                 `*Name:* ${name}%0A` +
                 `*Check-in:* ${checkIn}%0A` +
                 `*Check-out:* ${checkOut}%0A` +
                 `*Guests:* ${guests}%0A` +
                 `*Duration:* ${nights}%0A` +
                 `*Total Amount:* ${total}%0A%0A` +
                 `Please confirm availability for my stay.`;

    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}

