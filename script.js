// --- SHORTLET HAVEN ENUGU - MAIN JAVASCRIPT ---

// Dynamic Pricing & Date Calculation Logic
const apartmentSelect = document.getElementById('apartment');
const guestsSelect = document.getElementById('guests');
const checkInInput = document.getElementById('checkin');
const checkOutInput = document.getElementById('checkout');
const durationDisplay = document.getElementById('duration-display');
const totalDisplay = document.getElementById('total-display');
const bookingForm = document.getElementById('bookingForm');

// Base rates per night (in NGN)
const prices = {
  '1-bedroom': 40000,
  '2-bedroom': 60000,
  'penthouse': 120000
};

function calculateTotal() {
  if (!checkInInput || !checkOutInput) return;

  const checkInDate = new Date(checkInInput.value);
  const checkOutDate = new Date(checkOutInput.value);

  if (checkInDate && checkOutDate && checkOutDate > checkInDate) {
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    const selectedApartment = apartmentSelect ? apartmentSelect.value : '2-bedroom';
    const ratePerNight = prices[selectedApartment] || 60000;
    const grandTotal = nights * ratePerNight;

    if (durationDisplay) durationDisplay.textContent = `${nights} ${nights === 1 ? 'Night' : 'Nights'}`;
    if (totalDisplay) totalDisplay.textContent = `₦${grandTotal.toLocaleString()}`;
  } else {
    if (durationDisplay) durationDisplay.textContent = '1 Night';
    if (totalDisplay) totalDisplay.textContent = '₦60,000';
  }
}

// Event listeners for reservation inputs
if (apartmentSelect) apartmentSelect.addEventListener('change', calculateTotal);
if (checkInInput) checkInInput.addEventListener('change', calculateTotal);
if (checkOutInput) checkOutInput.addEventListener('change', calculateTotal);

// WhatsApp Direct Booking Dispatcher
if (bookingForm) {
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const apartmentText = apartmentSelect ? apartmentSelect.options[apartmentSelect.selectedIndex].text : '2-Bedroom Luxury Apartment';
    const guests = guestsSelect ? guestsSelect.value : '2';
    const checkIn = checkInInput ? checkInInput.value : 'Not set';
    const checkOut = checkOutInput ? checkOutInput.value : 'Not set';
    const totalCost = totalDisplay ? totalDisplay.textContent : '₦60,000';

    const whatsappNumber = '2348000000000'; // Replace with your host phone number
    const message = `Hello Shortlet Haven! I would like to make a reservation:\n\n` +
                    `*Apartment:* ${apartmentText}\n` +
                    `*Guests:* ${guests}\n` +
                    `*Check-in:* ${checkIn}\n` +
                    `*Check-out:* ${checkOut}\n` +
                    `*Estimated Total:* ${totalCost}\n\n` +
                    `Please confirm availability!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
  });
}

// Suite Selection Buttons Helper
function selectSuite(apartmentType) {
  if (apartmentSelect) {
    apartmentSelect.value = apartmentType;
    calculateTotal();
  }
  const reserveSection = document.getElementById('reserve');
  if (reserveSection) {
    reserveSection.scrollIntoView({ behavior: 'smooth' });
  }
}


// --- MOBILE NAVBAR TOGGLE, CLOSE & BACKDROP LOGIC ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const menuBackdrop = document.getElementById('menuBackdrop');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    if (menuBackdrop) menuBackdrop.classList.toggle('active');
  });
}

function closeMenu() {
  if (navLinks) navLinks.classList.remove('active');
  if (navToggle) navToggle.classList.remove('active');
  if (menuBackdrop) menuBackdrop.classList.remove('active');
}

