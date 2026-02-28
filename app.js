document.addEventListener("DOMContentLoaded", () => {
    initHeaderDropdowns();
    initBurgerMenu();
    initMenuChild();
    initStickyLogo();
    initScrollingTextSwiper();
    initTabs();
    initAccordion();
});

/* ---------------------------
 * Header dropdown
 * --------------------------- */
function initHeaderDropdowns() {
    document.querySelectorAll(".header__dropdown").forEach((dropdown) => {
        const button = dropdown.querySelector(".btn--dropdown");
        if (!button) return;

        button.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle("active");
        });

        // close when clicking outside
        document.addEventListener("click", () => {
            dropdown.classList.remove("active");
        });
    });
}

/* ---------------------------
 * Burger menu
 * --------------------------- */
function initBurgerMenu() {
    const burger = document.querySelector(".header__burger-button");
    const menu = document.querySelector(".header__menu");
    const body = document.querySelector("body");

    if (!burger || !menu) return;

    burger.addEventListener("click", (e) => {
        e.preventDefault();
        burger.classList.toggle("active");
        menu.classList.toggle("show");
        body.classList.toggle("menu-is-active");
    });
}

/* ---------------------------
 * Menu child toggle
 * --------------------------- */
function initMenuChild() {
    const wrapper = document.querySelector(".header__menu-item--has-child");
    const menu = document.querySelector(".header__sub-menu");

    if (!wrapper || !menu) return;

    function openMenu() {
        wrapper.classList.add("active");
        menu.classList.add("showing");

        requestAnimationFrame(() => {
            const height = menu.scrollHeight;
            menu.style.height = "0px";

            requestAnimationFrame(() => {
                menu.style.height = height + "px";
            });
        });

        menu.classList.add("show");
    }

    function closeMenu() {
        const height = menu.scrollHeight;
        menu.style.height = height + "px";

        requestAnimationFrame(() => {
            menu.style.height = "0px";
        });

        wrapper.classList.remove("active");
        menu.classList.remove("show");
    }

    wrapper.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isOpen = menu.classList.contains("show");
        isOpen ? closeMenu() : openMenu();
    });

    // ปิดเมื่อคลิกที่อื่น
    document.addEventListener("click", (e) => {
        if (!wrapper.contains(e.target)) {
            if (menu.classList.contains("show")) {
                closeMenu();
            }
        }
    });

    // reset หลัง animation จบ
    menu.addEventListener("transitionend", () => {
        if (menu.classList.contains("show")) {
            menu.style.height = "auto";
        } else {
            menu.classList.remove("showing");
            menu.style.height = "";
        }
    });
}

/* ---------------------------
 * Sticky Logo
 * --------------------------- */
function initStickyLogo() {
    const logo = document.querySelector(".logo-sticky");
    if (!logo) return;

    const minSize = 310;      // ต่ำสุด
    const scrollRange = 768;  // ระยะ scroll ที่ให้ลดครบ

    function updateLogoSize() {
        const viewportWidth = window.innerWidth;
        const scrollY = window.scrollY;

        // progress 0 → 1
        const progress = Math.min(scrollY / scrollRange, 1);

        // ขนาดใหม่: จาก 100vw → 310px
        const newWidth =
            viewportWidth - (viewportWidth - minSize) * progress;

        logo.style.width = newWidth + "px";
    }

    let ticking = false;

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateLogoSize();
                ticking = false;
            });
            ticking = true;
        }
    });

    window.addEventListener("resize", updateLogoSize);
}

/* ---------------------------
 * Swiper: scrolling text
 * --------------------------- */
function initScrollingTextSwiper() {
    const el = document.querySelector(".text-slider .swiper");
    if (!el || typeof Swiper === "undefined") return;

    new Swiper(el, {
        slidesPerView: "auto",
        loop: true,
        allowTouchMove: false,
        speed: 5000,
        autoplay: { delay: 0, disableOnInteraction: false },
        breakpoints: {
            0: {
                spaceBetween: 35,
            },
            768: {
                spaceBetween: 95,
            },
        }
    });
}

/* ---------------------------
 * Tabs
 * --------------------------- */
function initTabs() {
    document.querySelectorAll('.tab').forEach(tab => {
        const links = tab.querySelectorAll('.tab__menu-link');
        const panels = tab.querySelectorAll('.tab__content-item');

        function activateTab(link) {
            const targetId = link.getAttribute('href');
            const targetPanel = tab.querySelector(targetId);

            // remove active ทั้งหมด
            links.forEach(l => l.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // add active ใหม่
            link.classList.add('active');
            targetPanel.classList.add('active');
        }

        // click event
        links.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                activateTab(link);
            });
        });

        // เปิด tab แรก default
        if (links.length) {
            activateTab(links[0]);
        }
    });
}

/* ---------------------------
 * Accordion
 * --------------------------- */
function initAccordion() {
    document.querySelectorAll(".accordion__item").forEach((item) => {
        const header = item.querySelector(".accordion__header");
        const content = item.querySelector(".accordion__content");

        // เริ่มต้นปิด
        content.style.maxHeight = null;

        header.addEventListener("click", () => {
            const isOpen = item.classList.contains("active");

            if (isOpen) {
                // ปิด
                item.classList.remove("active");
                content.style.maxHeight = null;
            } else {
                // เปิด
                item.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
}