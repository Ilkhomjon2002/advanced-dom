"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const navLinks = document.querySelectorAll(".nav__link");
const btnScrollTo = document.querySelector(".btn--scroll-to");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const section1 = document.getElementById("section--1");

const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const allSections = document.querySelectorAll(".section");

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");

const stickyNav = function (entries, observer) {
	const [entry] = entries;
	if (!entry.isIntersecting) nav.classList.add("sticky");
	else nav.classList.remove("sticky");
};

const navHeight = getComputedStyle(nav).height;
const headerObserver = new IntersectionObserver(stickyNav, {
	root: null,
	threshold: 0,
	rootMargin: `-${navHeight}`,
});
headerObserver.observe(header);

const handleHover = function (e) {
	if (e.target.classList.contains("nav__link")) {
		const link = e.target;
		const siblings = link.closest(".nav").querySelectorAll(".nav__link");
		const logo = link.closest(".nav").querySelector("img");
		siblings.forEach((el) => {
			if (el !== link) el.style.opacity = this;
		});
		logo.style.opacity = this;
	}
};
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

tabsContainer.addEventListener("click", (e) => {
	const clicked = e.target.closest(".operations__tab");

	if (!clicked) return;

	tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
	clicked.classList.add("operations__tab--active");

	tabsContent.forEach((cont) =>
		cont.classList.remove("operations__content--active")
	);
	document
		.querySelector(`.operations__content--${clicked.dataset.tab}`)
		.classList.add("operations__content--active");
});

/*navLinks.forEach((navLink) => {
	navLink.addEventListener("click", (e) => {
		e.preventDefault();

		document
			.querySelector(e.target.getAttribute("href"))
			.scrollIntoView({ behavior: "smooth" });
	});
}); */

document.querySelector(".nav__links").addEventListener("click", (e) => {
	e.preventDefault();
	if (e.target.classList.contains("nav__link")) {
		const id = e.target.getAttribute("href");
		if (!(id.length > 1)) return;
		document.querySelector(id).scrollIntoView({ behavior: "smooth" });
	}
});

btnScrollTo.addEventListener("click", function (e) {
	document.getElementById("section--1").scrollIntoView({ behavior: "smooth" });
});

const openModal = function (e) {
	e.preventDefault();
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
};

const closeModal = function () {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal();
	}
}); //---------------Revealing elements on scroll -------------

const revealSection = (entries, observer) => {
	const [entry] = entries;

	if (!entry.isIntersecting) return;

	entry.target.classList.remove("section--hidden");
	observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
	root: null,
	threshold: 0.15,
});

allSections.forEach((section) => {
	section.classList.add("section--hidden");
	sectionObserver.observe(section);
});
const imgTargets = document.querySelectorAll("img[data-src]");
const loadImg = (entries, observer) => {
	const [entry] = entries;
	if (!entry.isIntersecting) return;

	entry.target.src = entry.target.dataset.src;
	entry.target.addEventListener("load", function () {
		entry.target.classList.remove("lazy-img");
	});
	observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
	root: null,
	threshold: 0,
	rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

//lecture

//console.log(docuement.documentElement) access whole html
//node list bilan html collection farqi  htmlCollection live hisoblanadi

//creating html element
// header.prepend(message) ===insertadjacentHtml('afterstart')
// header.apppend(message.cloneNode(true)) === insertadjacentHtml('beforeend')

//append bilan prependni kamchiligi bitta html elementni faqat bir marta ishlatish mumkin
//ko`p ishlatish uchun esa cloneNode(true) methoni ishlatish kerak

//header.before(message) ===header.insertAdjacentHtml('beforeStart')
//header.after(message) ===header.insertAdjacentHtml('afterEnd')

//deleting html element
//old version
// btn.addEventListener('click',()=>{
// btn.parentElement.removeChild(btn)
//})

//new version
//btn.addEventListener('click',()=>{
// btn.remove()
//})

//----------------Styles,attributes,and classes
//getComputedStyle(btn)  computed styleni olish yo`li

//document.documentElement.style.setProperty("--color-primary", "--orangered");

//modal.setAttribute("designer", "Ilkhom");
//modal.getAttribute("designer");
//modal.dataset.versionNumber  data attributni olish yo`li

//modal.className='hello' classList.add dan farqi className avval hamma classlarni o`chirib keyin yangi class qo`shadi

// ------------- INTERSECTION OBSERVER

const slider = function (direction) {
	let curSlide = 0;
	let maxSlide = slides.length;

	const activeDot = function (slide) {
		document
			.querySelectorAll(".dots__dot")
			.forEach((dot) => dot.classList.remove("dots__dot--active"));

		document
			.querySelector(`.dots__dot[data-slide="${slide}"]`)
			.classList.add("dots__dot--active");
	};

	slides.forEach(
		(img, i) => (img.style.transform = `translate${direction}(${i * 100}%)`)
	);

	const goToSlide = function (slide) {
		slides.forEach(
			(img, i) =>
				(img.style.transform = `translate${direction}(${(i - slide) * 100}%)`)
		);
	};
	const nextSlide = function () {
		if (curSlide === maxSlide - 1) {
			curSlide = 0;
		} else {
			curSlide++;
		}
		goToSlide(curSlide);
		activeDot(curSlide);
	};
	const prevSlide = function () {
		if (curSlide === 0) {
			curSlide = maxSlide - 1;
		} else {
			curSlide--;
		}
		goToSlide(curSlide);
		activeDot(curSlide);
	};

	document.addEventListener("keydown", function (e) {
		e.key === "ArrowRight" && nextSlide();
		e.key === "ArrowLeft" && prevSlide();
	});
	btnRight.addEventListener("click", nextSlide);
	btnLeft.addEventListener("click", prevSlide);

	const dotsContainer = document.querySelector(".dots");

	const createDots = function () {
		slides.forEach((_, i) =>
			dotsContainer.insertAdjacentHTML(
				"beforeend",
				`<button class="dots__dot" data-slide="${i}"></button>`
			)
		);
	};

	dotsContainer.addEventListener("click", (e) => {
		if (e.target.classList.contains("dots__dot")) {
			const { slide } = e.target.dataset;
			goToSlide(slide);
			activeDot(slide);
		}
	});

	const init = function () {
		createDots();
		activeDot(0);
		goToSlide(0);
	};
	init();

	setInterval(() => {
		nextSlide();
	}, 5000);
};

slider("X");
