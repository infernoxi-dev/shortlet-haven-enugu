document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("bookingForm");
  const suiteSelect = document.getElementById("suiteSelect");
  const checkInInput = document.getElementById("checkIn");
  const checkOutInput = document.getElementById("checkOut");
  const displayNights = document.getElementById("displayNights");
  const displayTotal = document.getElementById("displayTotal");

  // Set default dates: Check-in Today, Check-out Tomorrow
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (checkInInput && checkOutInput) {
    checkInInput.value = today.toISOString().split("T")[0];
    checkOutInput.value = tomorrow.toISOString().split("T")[0];
    checkInInput.min = today.toISOString().split("T")[0];
  }

  // Calculate live stay nights and total price
  function calculateStay() {
    if (!checkInInput || !checkOutInput || !suiteSelect) return { nights: 1, total: 0 };

    const checkIn = new Date(checkInInput.value);
    const checkOut = new Date(checkOutInput.value);

    // Ensure checkout date is always strictly after checkin
    if (checkOut <= checkIn) {
      const adjustedOut = new Date(checkIn);
      adjustedOut.setDate(adjustedOut.getDate() + 1);
      checkOutInput.value = adjustedOut.toISOString().split("T")[0];
    }

    const diffTime = new Date(checkOutInput.value) - new Date(checkInInput.value);
    let nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (isNaN(nights) || nights < 1) nights = 1;

    const selectedOption = suiteSelect.options[suiteSelect.selectedIndex];
    const pricePerNight = parseInt(selectedOption.getAttribute("data-price"), 10) || 0;
    const total = nights * pricePerNight;

    if (displayNights) displayNights.textContent = `${nights} Night${nights > 1 ? 's' : ''}`;
    if (displayTotal) displayTotal.textContent = `₦${total.toLocaleString()}`;

    return { nights, total };
  }

  // Event Listeners for live price recalculation
  if (suiteSelect) suiteSelect.addEventListener("change", calculateStay);
  if (checkInInput) checkInInput.addEventListener("change", calculateStay);
  if (checkOutInput) checkOutInput.addEventListener("change", calculateStay);

  // Expose selectSuite function to window for room selection buttons
  window.selectSuite = (suiteName) => {
    if (!suiteSelect) return;

    for (let i = 0; i < suiteSelect.options.length; i++) {
      if (suiteSelect.options[i].value === suiteName) {
        suiteSelect.selectedIndex = i;
        break;
      }
    }
    calculateStay();
    
    const reserveSection = document.getElementById("reserve");
    if (reserveSection) {
      reserveSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Run initial calculation on page load
  calculateStay();

  // Handle WhatsApp Booking Dispatch
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("guestName").value.trim();
      const suite = suiteSelect.value;
      const guests = document.getElementById("guestCount").value;
      const checkIn = checkInInput.value;
      const checkOut = checkOutInput.value;

      const { nights, total } = calculateStay();
      
      // Update this phone number with your client's or your demo WhatsApp number
      const hostPhone = "2348000000000"; 

      const message = 
        `*SHORTLET HAVEN ENUGU — DIRECT RESERVATION*%0A` +
        `-----------------------------------------%0A` +
        `*Guest Name:* ${encodeURIComponent(name)}%0A` +
        `*Apartment Selected:* ${encodeURIComponent(suite)}%0A` +
        `*Guests:* ${encodeURIComponent(guests)}%0A` +
        `*Check-In Date:* ${encodeURIComponent(checkIn)}%0A` +
        `*Check-Out Date:* ${encodeURIComponent(checkOut)}%0A` +
        `*Duration:* ${nights} Night(s)%0A` +
        `*Estimated Total:* ₦${total.toLocaleString()}%0A` +
        `-----------------------------------------%0A` +
        `_Sent directly via Shortlet Haven Web Concierge_`;

      window.open(`https://wa.me/${hostPhone}?text=${message}`, "_blank");
    });
  }
});

