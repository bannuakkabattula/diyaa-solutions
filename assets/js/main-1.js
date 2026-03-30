(function ($) {
  // =========================================================================
  // Function Table of Contents
  // =========================================================================
  // 1.  Lenis Scroll Initialization
  // 2.  preloader
  // 3.  handleStickyHeader
  // 4.  initSearchPopup
  // 5.  initMobileMenu
  // 6.  setBackgroundImages
  // 7.  setMaskImages
  // 8.  heroOneSlider
  // 9.  heroMouseParallax
  // 10. portfolioSlider
  // 11. setHoverActiveClass
  // 12. handleVideoModal
  // 13. pricingToggle
  // 14. testimonialSlider
  // 15. instagramSlider
  // 16. instagramPopup
  // 17. initMarquee
  // 18. setCurrentYear
  // 19. testimonialTwoSlider
  // 20. workShowcaseAnimation
  // 21. hoverBtnAnimation
  // 22. initTextRevealAnim
  // 23. initTextAnimation
  // 24. animateCounter
  // 25. animateSkills
  // 26. SkillScrollTrigger
  // 27. gsapSectionSticky
  // 28. initFadeAnim
  // =========================================================================

  // =================== Lenis Scroll Js Start ===================
  gsap.registerPlugin(ScrollTrigger);
  gsap.config({ nullTargetWarn: false });
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  // =================== Lenis Scroll Js End ===================

  // =================== preloader Scroll Js Start ===================
  function preloader() {
    $(".preloader")
      .delay(1000)
      .fadeOut("slow")
      .queue(function () {
        $(this).remove();
        ScrollTrigger.refresh();
      });
  }

  $(window).on("load", function () {
    preloader();
  });

  // =================== preloader Scroll Js End ===================

  // =================== handleStickyHeader Js Start ===================
  let lastScrollTop = window.scrollY || document.documentElement.scrollTop;
  const handleStickyHeader = () => {
    const currentScrollTop =
      window.scrollY || document.documentElement.scrollTop;

    const headers = document.querySelectorAll(".header.section");

    headers.forEach((header) => {
      if (currentScrollTop > lastScrollTop) {
        header.classList.remove("sticky");
        header.classList.add("transformed");
      } else if (currentScrollTop <= 500) {
        header.classList.remove("sticky");
        header.classList.remove("transformed");
      } else {
        header.classList.add("sticky");
        header.classList.remove("transformed");
      }
    });

    lastScrollTop = currentScrollTop;
  };

  window.addEventListener("scroll", handleStickyHeader);
  // =================== handleStickyHeader Js End ===================

  // =================== initSearchPopup Js Start ===================
  const initSearchPopup = () => {
    const searchBtn = document.querySelector(".header-search .search");
    const closeBtn = document.querySelector(".search__close_btn");
    const popup = document.querySelector(".search__popup");
    const overlay = document.querySelector(".body-overlay");

    const toggle = (state) => {
      popup?.classList.toggle("search-opened", state);
      overlay?.classList.toggle("opened", state);
    };

    searchBtn?.addEventListener("click", () => toggle(true));

    [closeBtn, overlay].forEach((el) =>
      el?.addEventListener("click", () => toggle(false))
    );
  };

  initSearchPopup();
  // =================== initSearchPopup Js End ===================

  // =================== initMobileMenu Js Start ===================
  const initMobileMenu = () => {
    // 1. Initialize the MeanMenu Plugin
    $(".mobile-menu-active").meanmenu({
      meanMenuContainer: ".mobile_menu",
      meanScreenWidth: "991",
      meanExpand: ['<i class="fa-light fa-plus"></i>'],
    });

    // 2. Open Mobile Menu
    $(".hamburger-menu").on("click", function () {
      $(".hamburger-area").addClass("opened");
      $(".body-overlay").addClass("opened");
    });

    // 3. Shared Close Function logic
    const closeMobileMenu = () => {
      $(".hamburger-area").removeClass("opened");
      $(".body-overlay").removeClass("opened");
      $(".hamburger-menu").removeClass("on");
    };

    // 4. Close Events (Button and Overlay)
    $(".hamburger_close_btn").on("click", closeMobileMenu);
    $(".body-overlay").on("click", closeMobileMenu);
  };
  initMobileMenu();
  // =================== initMobileMenu Js End ===================

  // =================== setBackgroundImages Js Start ===================
  const setBackgroundImages = () => {
    var elements = document.querySelectorAll("[data-background]");
    if (elements?.length > 0) {
      elements.forEach(function (element) {
        var src = element.getAttribute("data-background");
        element.style.backgroundImage = "url(" + src + ")";
        element.classList.add("background-image");
        element.removeAttribute("data-background");
      });
    }
  };
  setBackgroundImages();
  // =================== setBackgroundImages Js End ===================

  // =================== setMaskImages Js Start ===================
  const setMaskImages = () => {
    var elements = document.querySelectorAll("[data-mask]");
    if (elements?.length > 0) {
      elements.forEach(function (element) {
        var src = element.getAttribute("data-mask");
        element.style.maskImage = "url(" + src + ")";
        element.style.webkitMaskImage = "url(" + src + ")";
        element.classList.add("mask-image");
        element.removeAttribute("data-mask");
      });
    }
  };
  setMaskImages();
  // =================== setMaskImages Js End ===================

  // =================== heroOneSlider Js Start ===================
  const heroOneSlider = () => {
    const element = document.querySelector(".hero-one__slider");
    if (!element) return;

    const swiper = new Swiper(element, {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 2000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      on: {
        init: function () {
          const activeSlide = this.slides[this.activeIndex];
          animateSlide(activeSlide);
        },
        slideChangeTransitionStart: function () {
          const activeSlide = this.slides[this.activeIndex];
          animateSlide(activeSlide);
        },
      },
    });

    function animateSlide(slide) {
      const title = slide.querySelector(".hero-title");
      const subTitle = slide.querySelector(".hero-sub-title");
      const desc = slide.querySelector(".hero-content p");
      const img = slide.querySelector(".hero-thumb > img");

      if (subTitle) {
        gsap.killTweensOf(subTitle);
        gsap.fromTo(
          subTitle,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 }
        );
      }

      if (title) {
        gsap.killTweensOf(title);
        gsap.fromTo(
          title,
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 }
        );
      }

      if (desc) {
        gsap.killTweensOf(desc);
        gsap.fromTo(
          desc,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power2.out", delay: 0.7 }
        );
      }

      if (img) {
        gsap.killTweensOf(img);
        gsap.fromTo(
          img,
          { x: 100, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, ease: "back.out(2.5)", delay: 0.5 }
        );
      }

      const shape1 = slide.querySelector(".hero-content .shape-1");
      if (shape1) {
        gsap.killTweensOf(shape1);
        gsap.fromTo(
          shape1,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "back.out(1.5)",
            delay: 0.5,
          }
        );
      }
    }
  };
  heroOneSlider();
  // =================== heroOneSlider Js End ===================

  // =================== heroMouseParallax Js Start ===================
  const heroMouseParallax = () => {
    if ($(window).width() > 780) {
      $(".paralax__animation").mousemove(function (e) {
        $("[data-depth]").each(function () {
          var depth = $(this).data("depth");
          var amountMovedX = (e.pageX * -depth) / 8;
          var amountMovedY = (e.pageY * -depth) / 8;

          $(this).css({
            transform:
              "translate3d(" + amountMovedX + "px," + amountMovedY + "px, 0)",
          });
        });
      });
    }
  };
  heroMouseParallax();
  // =================== heroMouseParallax Js End ===================

  // =================== portfolioSlider Js Start ===================
  const portfolioSlider = () => {
    const element = document.querySelector(".portfolio__slider");
    const pagination = document.querySelector(".portfolio__pagination");
    if (!element || !pagination) return;

    new Swiper(element, {
      slidesPerView: 1,
      spaceBetween: 25,
      loop: true,
      speed: 2000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      centeredSlides: true,
      pagination: {
        el: pagination,
        clickable: true,
        renderBullet: function (index, className) {
          return (
            '<div class="' +
            className +
            '">' +
            '<span class="pagination-bullet"></span>' +
            "</div>"
          );
        },
      },
      breakpoints: {
        767: {
          slidesPerView: 1.5,
        },
        991: {
          slidesPerView: 1.8,
        },
        1350: {
          slidesPerView: 2.5,
        },
      },
    });
  };
  portfolioSlider();
  // =================== portfolioSlider Js End ===================

  // =================== setHoverActiveClass Js Start ===================
  const setHoverActiveClass = (
    listenerSelector,
    targetSelector,
    activeClass = "active"
  ) => {
    if (
      typeof listenerSelector !== "string" ||
      typeof targetSelector !== "string"
    ) {
      return;
    }
    const listeners = document.querySelectorAll(listenerSelector);
    if (listeners.length === 0) return;
    let currentActiveItem = null;
    listeners.forEach((listener) => {
      const targetElement = listener.querySelector(targetSelector) || listener;
      if (targetElement.classList.contains(activeClass)) {
        currentActiveItem = targetElement;
      }
    });
    if (!currentActiveItem) {
      currentActiveItem =
        listeners[0].querySelector(targetSelector) || listeners[0];
      currentActiveItem.classList.add(activeClass);
    }
    listeners.forEach((listener) => {
      const targetElement = listener.querySelector(targetSelector) || listener;
      listener.addEventListener("mouseenter", function () {
        if (currentActiveItem && currentActiveItem !== targetElement) {
          currentActiveItem.classList.remove(activeClass);
        }
        targetElement.classList.add(activeClass);
        currentActiveItem = targetElement;
      });
    });
  };
  setHoverActiveClass(".service__item", ".service__item", "active");
  setHoverActiveClass(".pricing__item", ".pricing__item", "active");
  setHoverActiveClass(".pricing-two__item", ".pricing-two__item", "active");
  setHoverActiveClass(".team-two__item", ".team-two__item", "active");
  setHoverActiveClass(".widget-service-item", ".widget-service-item", "active");
  // =================== setHoverActiveClass Js End ===================

  // =================== handleVideoModal Js Start ===================
  const handleVideoModal = (modalId, videoFrameId) => {
    const videoModal = document.getElementById(modalId);
    const videoFrame = document.getElementById(videoFrameId);
    if (videoModal && videoFrame) {
      videoModal.addEventListener("show.bs.modal", (event) => {
        const button = event.relatedTarget;
        const videoId = button.getAttribute("data-video-id");

        if (videoId) {
          videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        }
      });
      videoModal.addEventListener("hide.bs.modal", () => {
        videoFrame.src = "";
      });
    }
  };
  handleVideoModal("globalVideoModal", "globalVideoIFrame");
  // =================== handleVideoModal Js End ===================

  // =================== pricingToggle Js Start ===================
  const pricingToggle = () => {
    const monthlyBtn = document.querySelector(".pricing-monthly");
    const yearlyBtn = document.querySelector(".pricing-yearly");
    const pricingItems = document.querySelectorAll(".pricing__item");

    if (!monthlyBtn || !yearlyBtn || !pricingItems.length) return;

    monthlyBtn.addEventListener("click", () => {
      monthlyBtn.classList.add("current");
      yearlyBtn.classList.remove("current");
      pricingItems.forEach((item) => {
        item.classList.add("monthly");
        item.classList.remove("yearly");
      });
    });

    yearlyBtn.addEventListener("click", () => {
      yearlyBtn.classList.add("current");
      monthlyBtn.classList.remove("current");
      pricingItems.forEach((item) => {
        item.classList.add("yearly");
        item.classList.remove("monthly");
      });
    });
  };
  pricingToggle();
  // =================== pricingToggle Js End ===================

  // =================== testimonialSlider Js Start ===================
  const testimonialSlider = () => {
    const thumbElement = document.querySelector(".testimonial__thumb-slider");
    const contentElement = document.querySelector(
      ".testimonial__content-slider"
    );
    const pagination = document.querySelector(
      ".testimonial__content-pagination"
    );
    if (!thumbElement || !contentElement) return;

    const thumbSlider = new Swiper(thumbElement, {
      spaceBetween: 10,
      slidesPerView: 1,
      speed: 1000,
      watchSlidesProgress: true,
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
    });

    const contentSlider = new Swiper(contentElement, {
      spaceBetween: 20,
      loop: true,
      speed: 1000,
      pagination: {
        el: pagination,
        clickable: true,
        renderBullet: function (index, className) {
          return (
            '<div class="' +
            className +
            '">' +
            '<span class="pagination-bullet"></span>' +
            "</div>"
          );
        },
      },
    });

    thumbSlider.controller.control = contentSlider;
    contentSlider.controller.control = thumbSlider;
  };

  testimonialSlider();
  // =================== testimonialSlider Js End ===================

  // =================== instagramSlider Js Start ===================
  const instagramSlider = () => {
    const element = document.querySelector(".instagrame__slider");
    if (!element) return;

    new Swiper(element, {
      slidesPerView: "auto",
      spaceBetween: 0,
      loop: true,
      speed: 6000,
      allowTouchMove: false,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
    });
  };
  instagramSlider();
  // =================== instagramSlider Js End ===================

  // =================== instagramPopup Js Start ===================
  const instagramPopup = () => {
    const wrapper = $(".instagrame__slider");
    if (wrapper.length) {
      wrapper.magnificPopup({
        delegate: ".popup-image",
        type: "image",
        gallery: {
          enabled: true,
        },
      });
    }
  };
  instagramPopup();
  // =================== instagramPopup Js End ===================

  // =================== initMarquee Js Start ===================
  const initMarquee = () => {
    const $marquee = $(".marquee_mode");
    if (!$marquee.length) return;

    $marquee.each(function () {
      const $this = $(this);
      const originalHtml = $this.html();

      const getSpeed = () => {
        if ($(window).width() < 768) return 10;
        if ($(window).width() < 1200) return 15;
        return 20;
      };

      const init = () => {
        if ($this.data("marquee-init")) {
          $this.marquee("destroy");
          $this.html(originalHtml);
        }

        $this.marquee({
          speed: getSpeed(),
          delayBeforeStart: 0,
          direction: "left",
          duplicated: true,
          pauseOnHover: true,
          startVisible: true,
        });
        $this.data("marquee-init", true);
      };

      init();

      let resizeTimer;
      $(window).on("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(init, 200);
      });
    });
  };
  initMarquee();
  // =================== initMarquee Js End ===================

  // =================== setCurrentYear Js Start ===================
  const setCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll(".current-year");
    if (yearElements?.length > 0) {
      yearElements.forEach((el) => {
        el.textContent = currentYear;
      });
    }
  };
  setCurrentYear();
  // =================== setCurrentYear Js End ===================

  // =================== testimonialTwoSlider Js Start ===================
  const testimonialTwoSlider = () => {
    const container = document.querySelector(".testimonial-two__reviewer-list");
    const tabLinks = document.querySelectorAll(
      ".testimonial-two__reviewer-list .nav-link"
    );

    if (!container || !tabLinks.length) return;

    const centerTab = (tab) => {
      const tabTop = tab.offsetTop;
      const tabHeight = tab.offsetHeight;
      const containerHeight = container.clientHeight;
      let targetScrollTop = tabTop - containerHeight / 2 + tabHeight / 2;

      container.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
    };

    tabLinks.forEach((tab) => {
      tab.addEventListener("click", function () {
        centerTab(this);
      });

      if (tab.classList.contains("active")) {
        setTimeout(() => centerTab(tab), 100);
      }
    });

    const triggerTabList = [].slice.call(tabLinks);
    triggerTabList.forEach(function (triggerEl) {
      triggerEl.addEventListener("shown.bs.tab", function (event) {
        centerTab(event.target);
      });
    });
  };
  testimonialTwoSlider();
  // =================== testimonialTwoSlider Js End ===================

  // =================== workShowcaseAnimation Js Start ===================
  const workShowcaseAnimation = () => {
    const workItems = document.querySelectorAll(".work-showcase__item");
    const workShowcase = document.querySelector(".work-showcase");
    const workContent = document.querySelector(".work-showcase__content");

    if (!workItems.length || !workShowcase || !workContent) return;

    ScrollTrigger.matchMedia({
      "(min-width: 1200px)": function () {
        ScrollTrigger.create({
          trigger: workShowcase,
          pin: workContent,
          start: "top 90px",
          end: "bottom bottom",
          pinSpacing: false,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        });
      },

      // Animation (Desktop LG+)
      "(min-width: 768px)": function () {
        // Initial State
        gsap.set(workItems, {
          y: 80,
          opacity: 0,
          rotationX: 45,
          transformOrigin: "bottom center",
          transformPerspective: 1000,
          transformStyle: "preserve-3d",
          x: 0,
          rotationY: 0,
          skewY: 0,
          scale: 0.9,
        });

        // Batch Animation
        ScrollTrigger.batch(workItems, {
          start: "top 90%",
          onEnter: (batch) =>
            gsap.to(batch, {
              y: 0,
              opacity: 1,
              rotationX: 0,
              rotationZ: 0,
              scale: 1,
              duration: 1.2,
              stagger: 0.15,
              ease: "power3.out",
            }),
          onLeaveBack: (batch) =>
            gsap.to(batch, {
              y: 80,
              opacity: 0,
              rotationX: 45,
              scale: 0.9,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.in",
            }),
        });
      },
    });

    // Explicitly refresh on resize ensures robustness
    window.addEventListener("resize", () => ScrollTrigger.refresh());
  };

  workShowcaseAnimation();
  // =================== workShowcaseAnimation Js End ===================

  // =================== hoverBtnAnimation Js Start ===================
  const hoverBtnAnimation = () => {
    $(".button-v3").on("mouseenter", function (e) {
      var x = e.pageX - $(this).offset().left;
      var y = e.pageY - $(this).offset().top;
      $(this).find(".tw-btn-circle-dot").css({
        top: y,
        left: x,
      });
    });
    $(".button-v3").on("mouseout", function (e) {
      var x = e.pageX - $(this).offset().left;
      var y = e.pageY - $(this).offset().top;
      $(this).find(".tw-btn-circle-dot").css({
        top: y,
        left: x,
      });
    });
    var hoverBtns = gsap.utils.toArray(".tw-hover-btn-wrapper");
    const hoverBtnItem = gsap.utils.toArray(".tw-hover-btn-item");
    hoverBtns.forEach((btn, i) => {
      $(btn).mousemove(function (e) {
        callParallax(e);
      });

      function callParallax(e) {
        parallaxIt(e, hoverBtnItem[i], 60);
      }

      function parallaxIt(e, target, movement) {
        var $this = $(btn);
        var relX = e.pageX - $this.offset().left;
        var relY = e.pageY - $this.offset().top;
        gsap.to(target, 1, {
          x: ((relX - $this.width() / 2) / $this.width()) * movement,
          y: ((relY - $this.height() / 2) / $this.height()) * movement,
          ease: Power2.easeOut,
        });
      }
      $(btn).mouseleave(function (e) {
        gsap.to(hoverBtnItem[i], 1, {
          x: 0,
          y: 0,
          ease: Power2.easeOut,
        });
      });
    });
  };
  hoverBtnAnimation();
  // =================== hoverBtnAnimation Js End ===================

  // =================== Text Slider Js Start ===================
  var textSliderSelector = ".text-slider__slider";
  if (textSliderSelector) {
    var textSlider = new Swiper(textSliderSelector, {
      spaceBetween: 15,
      centeredSlides: true,
      speed: 12000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      loop: true,
      slidesPerView: "auto",
      allowTouchMove: false,
      disableOnInteraction: true,
    });
  }
  // =================== Text Slider Js End ===================

  // =================== initTextRevealAnim Js Start ===================
  const initTextRevealAnim = () => {
    const tp_anim_reveal = document.querySelectorAll(".tp-text-revel-anim");

    if (!tp_anim_reveal || tp_anim_reveal.length === 0) {
      return;
    }

    tp_anim_reveal.forEach((areveal) => {
      const getAttributeValue = (attr, defaultValue) =>
        areveal.getAttribute(attr) || defaultValue;
      const duration_value = parseFloat(getAttributeValue("data-duration", 1));
      const onscroll_value = parseInt(getAttributeValue("data-on-scroll", 1));
      const stagger_value = parseFloat(getAttributeValue("data-stagger", 0.02));
      const data_delay = parseFloat(getAttributeValue("data-delay", 0.1));
      const ease_value = getAttributeValue("data-ease", "circ.out");

      areveal.split = new SplitText(areveal, {
        type: "lines,words,chars",
        linesClass: "tp-revel-line",
      });
      const animationProps = {
        duration: duration_value,
        delay: data_delay,
        ease: ease_value,
        y: 100,
        stagger: stagger_value,
        opacity: 0,
      };

      if (onscroll_value === 1) {
        areveal.anim = gsap.from(areveal.split.chars, {
          scrollTrigger: {
            trigger: areveal,
            start: "top 85%",
          },
          ...animationProps,
        });
      } else {
        areveal.anim = gsap.from(areveal.split.chars, animationProps);
      }
    });
  };
  initTextRevealAnim();
  // =================== initTextRevealAnim Js End ===================

  // =================== initTextAnimation Js Start ===================
  function initTextAnimation(options = {}) {
    const {
      selector = ".text-anim",
      ease = "power2.out",
      start = "top 85%",
    } = options;

    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    elements.forEach((element) => {
      const stagger = parseFloat(element.dataset.stagger) || 0.03;
      const translateX = parseFloat(element.dataset.x) || 20;
      const delay = parseFloat(element.dataset.delay) || 0.1;
      const duration = parseFloat(element.dataset.duration) || 1;

      const split = new SplitText(element, {
        type: "chars, words",
      });

      gsap.from(split.chars, {
        x: translateX,
        autoAlpha: 0,
        duration: duration,
        delay: delay,
        stagger: stagger,
        ease: ease,
        scrollTrigger: {
          trigger: element,
          start: start,
        },
      });
    });
  }

  initTextAnimation();
  // =================== initTextAnimation Js End ===================

  // =================== animateCounter Js Start ===================
  const animateCounter = (element, target) => {
    const counter = { value: 0 };
    gsap.to(counter, {
      duration: 1.5,
      value: target,
      ease: "power2.out",
      onUpdate: function () {
        element.textContent = Math.round(counter.value) + "%";
      },
    });
  };
  // =================== animateCounter Js End ===================

  // =================== animateSkills Js Start ===================
  const animateSkills = () => {
    if (document.querySelectorAll(".skill-item").length === 0) return;
    let tl = gsap.timeline({ paused: true });
    tl.kill();
    tl = gsap.timeline();
    gsap.set(".progress-bar", { width: "0%" });
    gsap.set(".skill-percentage", { opacity: 0, right: "100%" });
    gsap.set(".skill-item", { opacity: 0, x: -50 });
    tl.to(
      ".skill-item",
      {
        duration: 0.6,
        opacity: 1,
        x: 0,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=0.4"
    );

    const progressBars = document.querySelectorAll(".progress-bar");
    progressBars.forEach((bar, index) => {
      const percentage = parseInt(bar.getAttribute("data-percentage"));
      const percentageElement =
        bar.parentElement.querySelector(".skill-percentage");

      tl.to(
        bar,
        {
          duration: 1.5,
          width: percentage + "%",
          ease: "power3.out",
        },
        index === 0 ? "+=0.2" : "-=1.3"
      ).to(
        percentageElement,
        {
          duration: 1.5,
          right: 100 - percentage + "%",
          opacity: 1,
          ease: "power3.out",
          onStart: function () {
            animateCounter(percentageElement, percentage);
          },
        },
        "-=1.5"
      );
    });
  };
  // =================== animateSkills Js End ===================

  // =================== SkillScrollTrigger Js Start ===================
  const SkillScrollTrigger = () => {
    if (document.querySelectorAll(".user-info.skills").length === 0) return;
    ScrollTrigger.create({
      trigger: ".user-info.skills",
      start: "top 80%",
      onEnter: () => animateSkills(),
      once: true,
    });
  };
  SkillScrollTrigger();
  // =================== SkillScrollTrigger Js End ===================

  // =================== gsapSectionSticky Js Start ===================
  let stickySection = gsap.matchMedia();
  const gsapSectionSticky = () => {
    stickySection.add("(min-width: 992px)", () => {
      if ($(".gsap-p-sticky-wrapper").length > 0) {
        ScrollTrigger.create({
          trigger: ".gsap-p-sticky-wrapper",
          start: "top 15px",
          end: "bottom 103%",
          pin: ".gsap-p-sticky",
          pinSpacing: true,
        });
      }
    });
  };
  gsapSectionSticky();
  // =================== gsapSectionSticky Js End ===================

  // =================== initFadeAnim Js Start ===================
  const initFadeAnim = () => {
    let fadeArray_items = document.querySelectorAll(".fade-anim");
    if (fadeArray_items.length > 0) {
      const fadeArray = gsap.utils.toArray(".fade-anim");
      fadeArray.forEach((item, i) => {
        var fade_direction = "bottom";
        var onscroll_value = 1;
        var duration_value = 1.15;
        var fade_offset = 50;
        var delay_value = 0.25;
        var ease_value = "power2.out";
        if (item.getAttribute("data-offset")) {
          fade_offset = item.getAttribute("data-offset");
        }
        if (item.getAttribute("data-duration")) {
          duration_value = item.getAttribute("data-duration");
        }
        if (item.getAttribute("data-direction")) {
          fade_direction = item.getAttribute("data-direction");
        }
        if (item.getAttribute("data-on-scroll")) {
          onscroll_value = item.getAttribute("data-on-scroll");
        }
        if (item.getAttribute("data-delay")) {
          delay_value = item.getAttribute("data-delay");
        }
        if (item.getAttribute("data-ease")) {
          ease_value = item.getAttribute("data-ease");
        }
        let animation_settings = {
          opacity: 0,
          ease: ease_value,
          duration: duration_value,
          delay: delay_value,
        };
        if (fade_direction == "top") {
          animation_settings["y"] = -fade_offset;
        }
        if (fade_direction == "left") {
          animation_settings["x"] = -fade_offset;
        }
        if (fade_direction == "bottom") {
          animation_settings["y"] = fade_offset;
        }
        if (fade_direction == "right") {
          animation_settings["x"] = fade_offset;
        }
        if (onscroll_value == 1) {
          animation_settings["scrollTrigger"] = {
            trigger: item,
            start: "top 85%",
          };
        }
        gsap.from(item, animation_settings);
      });
    }
  };
  initFadeAnim();
  // =================== initFadeAnim Js End ===================
})(jQuery);
