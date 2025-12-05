document.addEventListener("DOMContentLoaded", function () {
      const roomType = document.getElementById("roomType");
      const checkIn = document.getElementById("checkIn");
      const checkOut = document.getElementById("checkOut");

      const pricePerNightSpan = document.getElementById("pricePerNight");
      const numNightsSpan = document.getElementById("numNights");
      const subtotalSpan = document.getElementById("subtotal");
      const taxSpan = document.getElementById("tax");
      const totalSpan = document.getElementById("total");

      const form = document.getElementById("bookingForm");

      function calculateSummary() {
        let pricePerNight = 0;

        const selectedOption = roomType.options[roomType.selectedIndex];
        if (selectedOption && selectedOption.dataset.price) {
          pricePerNight = parseFloat(selectedOption.dataset.price);
        }

        let numNights = 0;
        if (checkIn.value && checkOut.value) {
          const inDate = new Date(checkIn.value);
          const outDate = new Date(checkOut.value);
          const diffMs = outDate - inDate;
          const oneDay = 1000 * 60 * 60 * 24;
          const nights = diffMs / oneDay;

          if (!isNaN(nights) && nights > 0) {
            numNights = nights;
          }
        }

        const subtotal = pricePerNight * numNights;
        const tax = subtotal * 0.10;
        const total = subtotal + tax;

        pricePerNightSpan.textContent = "USD " + pricePerNight.toFixed(2);
        numNightsSpan.textContent = numNights;
        subtotalSpan.textContent = "USD " + subtotal.toFixed(2);
        taxSpan.textContent = "USD " + tax.toFixed(2);
        totalSpan.textContent = "USD " + total.toFixed(2);
      }

      roomType.addEventListener("change", calculateSummary);
      checkIn.addEventListener("change", calculateSummary);
      checkOut.addEventListener("change", calculateSummary);

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        calculateSummary();

        if (!roomType.value) {
          alert("Por favor, selecciona un tipo de habitación.");
          return;
        }

        alert(
          "¡Reserva confirmada!\n\n" +
          "Huésped: " + document.getElementById("fullName").value +
          "\nTipo de habitación: " + roomType.options[roomType.selectedIndex].text +
          "\nNoches: " + numNightsSpan.textContent +
          "\nTotal: " + totalSpan.textContent
        );
      });
    });