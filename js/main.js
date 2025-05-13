/**
 * Main JavaScript file for SH Infotech website
 */
document.addEventListener("DOMContentLoaded", () => {
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener)
  }

  /**
   * Navbar links active state on scroll
   */
  const navbarlinks = select("#navbar .scrollto", true)
  const navbarlinksActive = () => {
    const position = window.scrollY + 200
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return
      const section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        navbarlink.classList.add("active")
      } else {
        navbarlink.classList.remove("active")
      }
    })
  }
  window.addEventListener("load", navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    const header = select("#header")
    const offset = header.offsetHeight

    const elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  const selectHeader = select("#header")
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled")
      } else {
        selectHeader.classList.remove("header-scrolled")
      }
    }
    window.addEventListener("load", headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  const backtotop = select(".back-to-top")
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active")
      } else {
        backtotop.classList.remove("active")
      }
    }
    window.addEventListener("load", toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    // Prevent default behavior
    e.preventDefault();

    // Toggle body class for mobile nav active state
    select("body").classList.toggle("mobile-nav-active");

    // Toggle navbar-mobile class on #navbar element
    const navbar = select("#navbar");
    if (navbar) {
      navbar.classList.toggle("navbar-mobile");
    }

    // Toggle icon between menu and x
    this.classList.toggle("bx-menu");
    this.classList.toggle("bx-x");

    // Log to console for debugging
    console.log("Mobile nav toggled");
    console.log("Body has mobile-nav-active:", select("body").classList.contains("mobile-nav-active"));
    console.log("Navbar has navbar-mobile:", navbar ? navbar.classList.contains("navbar-mobile") : "not found");
  })

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault()
        this.nextElementSibling.classList.toggle("dropdown-active")
      }
    },
    true,
  )

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault()

        const navbar = select("#navbar")
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile")
          const navbarToggle = select(".mobile-nav-toggle")
          navbarToggle.classList.toggle("bx-menu")
          navbarToggle.classList.toggle("bx-x")
        }
        scrollto(this.hash)
      }
    },
    true,
  )

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  })

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    })
  })

  /**
   * Contact form validation
   */
  const contactForm = select(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Simple form validation
      const name = select("#name").value
      const email = select("#email").value
      const subject = select("#subject").value
      const message = select('textarea[name="message"]').value

      if (!name || !email || !subject || !message) {
        alert("Please fill in all fields")
        return
      }

      // Here you would typically send the form data to a server
      // For demo purposes, we'll just show a success message
      alert("Thank you for your message. We will get back to you soon!")
      this.reset()
    })
  }
})


