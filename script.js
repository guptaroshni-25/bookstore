// ===============================
// GLOBAL USER VARIABLE
// ===============================
var userStatus = "guest";


// ===============================
// NAVIGATION FUNCTIONS
// ===============================
function exploreBooks() {
  window.location.href = "products.html";
}


// ===============================
// VIEW PRODUCT
// ===============================
function viewProduct(book) {

  if (!book) {
    console.error("Book object missing ❌");
    return;
  }

  // Store selected product globally
  localStorage.setItem("selectedProduct", JSON.stringify(book));

  window.location.href =
    "product-detail.html?name=" + encodeURIComponent(book.name) +
    "&price=" + encodeURIComponent(book.price) +
    "&img=" + encodeURIComponent(book.img);
}


// ===============================
// ADD TO CART
// ===============================
function addToCart(book) {

  if (!book) {
    book = JSON.parse(localStorage.getItem("selectedProduct"));
  }

  alert("Added to cart");

}


// ===============================
// PURCHASE
// ===============================
function buyNow(book) {

  if (!book) {
    book = JSON.parse(localStorage.getItem("selectedProduct"));
  }

  alert("Purchase initiated");

}


// ===============================
// FORM SUBMIT
// ===============================
function submitForm(event) {

  event.preventDefault();

  alert("Form submitted");

}


// ===============================
// CONSENT FUNCTIONS
// ===============================

// Accept All
function acceptAll() {

  gtag('consent', 'update', {

    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted'

  });

  localStorage.setItem("analyticsConsent", true);
  localStorage.setItem("adsConsent", true);

  hideBanner();

}


// Reject All
function rejectAll() {

  gtag('consent', 'update', {

    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'

  });

  localStorage.setItem("analyticsConsent", false);
  localStorage.setItem("adsConsent", false);

  hideBanner();

}


// Save Preferences
function savePreferences() {

  const analytics =
    document.getElementById("analyticsConsent")?.checked;

  const ads =
    document.getElementById("adsConsent")?.checked;


  gtag('consent', 'update', {

    analytics_storage: analytics ? 'granted' : 'denied',

    ad_storage: ads ? 'granted' : 'denied',

    ad_user_data: ads ? 'granted' : 'denied',

    ad_personalization: ads ? 'granted' : 'denied'

  });


  localStorage.setItem("analyticsConsent", analytics);

  localStorage.setItem("adsConsent", ads);

  hideBanner();

}


// ===============================
// BANNER CONTROL
// ===============================
function hideBanner() {

  const banner =
    document.getElementById("consent-banner");

  if (banner) banner.style.display = "none";

}


// ===============================
// LOAD CONSENT STATE
// ===============================
document.addEventListener("DOMContentLoaded", function () {

  sessionStorage.setItem("sessionUser", "active");

  const banner =
    document.getElementById("consent-banner");

  const analytics =
    localStorage.getItem("analyticsConsent");

  const ads =
    localStorage.getItem("adsConsent");


  if (analytics !== null && ads !== null) {

    gtag('consent', 'update', {

      analytics_storage:
        analytics === "true" ? 'granted' : 'denied',

      ad_storage:
        ads === "true" ? 'granted' : 'denied',

      ad_user_data:
        ads === "true" ? 'granted' : 'denied',

      ad_personalization:
        ads === "true" ? 'granted' : 'denied'

    });

    hideBanner();

  } else {

    if (banner)
      banner.style.display = "block";

  }

  
});
// ======================================
// MP HIT DIRECTLY FROM FRONTEND
// ======================================

document.getElementById("exploreBtn").addEventListener("click", function () {

    // ======================================
    // FETCH REALTIME CLIENT ID
    // ======================================

    gtag('get', 'G-F3B00ZEY0V', 'client_id', function(clientId) {

        console.log("Realtime Client ID:", clientId);


        // ======================================
        // MP PAYLOAD
        // ======================================

        const payload = {

            client_id: clientId,

            user_properties: {

                custom_client_id: {

                    value: clientId + "."

                }

            },

            events: [

                {

                    name: "button_clicks_mp",

                    params: {

                        button_name: "Explore Books",

                        section_name: "Homepage",

                        category: "Books",

                        debug_mode: 1

                    }

                }

            ]

        };


        // ======================================
        // SEND MP HIT TO GA4
        // ======================================

        fetch('https://www.google-analytics.com/mp/collect?measurement_id=G-F3B00ZEY0V&api_secret=37jkdMqARC-kudyCaMWdDQ', {

            method: 'POST',

            body: JSON.stringify(payload)

        })

        .then(response => {

            console.log("MP Hit Sent Successfully");

        })

        .catch(error => {

            console.log(error);

        });

    });

});
