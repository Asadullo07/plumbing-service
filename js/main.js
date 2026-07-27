/* ============================================================
   AquaPro Plumbing — main.js
   Navbar | Hero | Stats | Slider | Filters | Cursor | FAQ
   ============================================================ */

'use strict'

/* ---------- Loading Screen ---------- */
window.addEventListener('load', () => {
	const loader = document.getElementById('loading-screen')
	if (!loader) return
	setTimeout(() => {
		loader.classList.add('hidden')
		setTimeout(() => {
			loader.style.display = 'none'
		}, 500)
	}, 1400)
})

/* ---------- Footer Year ---------- */
const yearEl = document.getElementById('footer-year')
if (yearEl)
	yearEl.textContent = new Date().getFullYear()

	/* ---------- Cursor Follower ---------- */
;(function initCursor() {
	const follower = document.getElementById('cursor-follower')
	if (!follower || !window.matchMedia('(hover: hover)').matches) return

	let mouseX = 0,
		mouseY = 0
	let curX = 0,
		curY = 0

	document.addEventListener(
		'mousemove',
		e => {
			mouseX = e.clientX
			mouseY = e.clientY
			follower.style.opacity = '1'
		},
		{ passive: true },
	)

	document.addEventListener('mouseleave', () => {
		follower.style.opacity = '0'
	})

	const interactiveSelector =
		'a, button, [role="button"], input, select, textarea, label'
	document.addEventListener(
		'mouseover',
		e => {
			if (e.target.closest(interactiveSelector)) {
				follower.style.width = '48px'
				follower.style.height = '48px'
			}
		},
		{ passive: true },
	)
	document.addEventListener(
		'mouseout',
		e => {
			if (e.target.closest(interactiveSelector)) {
				follower.style.width = '28px'
				follower.style.height = '28px'
			}
		},
		{ passive: true },
	)

	function animateCursor() {
		curX += (mouseX - curX) * 0.12
		curY += (mouseY - curY) * 0.12
		follower.style.left = curX + 'px'
		follower.style.top = curY + 'px'
		requestAnimationFrame(animateCursor)
	}
	animateCursor()
})()

/* ---------- Navbar ---------- */
;(function initNavbar() {
	const navbar = document.getElementById('navbar')
	const hamburger = document.getElementById('hamburger')
	const mobileMenu = document.getElementById('mobile-menu')
	const mobileLinks = document.querySelectorAll('.mobile-link')
	if (!navbar) return

	let lastScroll = 0
	let ticking = false

	window.addEventListener(
		'scroll',
		() => {
			if (!ticking) {
				requestAnimationFrame(() => {
					const scrollY = window.scrollY
					navbar.classList.toggle('scrolled', scrollY > 60)
					navbar.classList.toggle(
						'hidden',
						scrollY > lastScroll && scrollY > 300,
					)
					lastScroll = scrollY
					ticking = false
				})
				ticking = true
			}
		},
		{ passive: true },
	)

	if (hamburger && mobileMenu) {
		hamburger.addEventListener('click', () => {
			const isOpen = hamburger.classList.toggle('open')
			hamburger.setAttribute('aria-expanded', isOpen)
			mobileMenu.hidden = !isOpen
		})
		mobileLinks.forEach(link => {
			link.addEventListener('click', () => {
				hamburger.classList.remove('open')
				hamburger.setAttribute('aria-expanded', 'false')
				mobileMenu.hidden = true
			})
		})
		document.addEventListener('click', e => {
			if (!navbar.contains(e.target)) {
				hamburger.classList.remove('open')
				hamburger.setAttribute('aria-expanded', 'false')
				mobileMenu.hidden = true
			}
		})
	}

	// Active nav link on scroll
	const sections = document.querySelectorAll('section[id]')
	const navLinks = document.querySelectorAll('.nav-link')
	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					navLinks.forEach(link => {
						link.classList.toggle(
							'active',
							link.dataset.section === entry.target.id,
						)
					})
				}
			})
		},
		{ rootMargin: '-40% 0px -55% 0px' },
	)
	sections.forEach(s => observer.observe(s))
})()

/* ---------- Back to Top ---------- */
;(function initBackToTop() {
	const btn = document.getElementById('back-to-top')
	if (!btn) return
	window.addEventListener(
		'scroll',
		() => {
			btn.hidden = window.scrollY < 600
			btn.classList.toggle('visible', window.scrollY >= 600)
		},
		{ passive: true },
	)
	btn.addEventListener('click', () =>
		window.scrollTo({ top: 0, behavior: 'smooth' }),
	)
})()

/* ---------- Typing Headline ---------- */
;(function initTyping() {
	const el = document.getElementById('typed-text')
	if (!el) return
	const words = ['Homes.', 'Businesses.', 'Every Property.']
	let wIdx = 0,
		cIdx = 0,
		deleting = false
	const TYPE_SPEED = 90,
		DELETE_SPEED = 45,
		PAUSE = 1800

	function type() {
		const word = words[wIdx]
		if (deleting) {
			el.textContent = word.substring(0, cIdx--)
			if (cIdx < 0) {
				deleting = false
				wIdx = (wIdx + 1) % words.length
				setTimeout(type, 400)
				return
			}
			setTimeout(type, DELETE_SPEED)
		} else {
			el.textContent = word.substring(0, cIdx++)
			if (cIdx > word.length) {
				deleting = true
				setTimeout(type, PAUSE)
				return
			}
			setTimeout(type, TYPE_SPEED)
		}
	}
	setTimeout(type, 1600)
})()

/* ---------- Number Counter ---------- */
function animateCounter(el) {
	const target = +el.dataset.count
	const duration = 1800
	const start = performance.now()
	function update(now) {
		const progress = Math.min((now - start) / duration, 1)
		const eased = 1 - Math.pow(1 - progress, 3)
		el.textContent = Math.round(eased * target).toLocaleString()
		if (progress < 1) requestAnimationFrame(update)
	}
	requestAnimationFrame(update)
}

/* ---------- Progress Bars ---------- */
function animateProgress(bar) {
	bar.style.width = (bar.dataset.width || 0) + '%'
}

/* ---------- Scroll Reveal ---------- */
;(function initScrollReveal() {
	const animEls = document.querySelectorAll(
		'.fade-up, .fade-left, .fade-right, .scale-in',
	)
	const counters = document.querySelectorAll('[data-count]')
	const progressBars = document.querySelectorAll('.progress-fill')

	const obs = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible')
					obs.unobserve(entry.target)
				}
			})
		},
		{ rootMargin: '0px 0px -60px 0px', threshold: 0.1 },
	)
	animEls.forEach(el => obs.observe(el))

	const counterObs = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					animateCounter(entry.target)
					counterObs.unobserve(entry.target)
				}
			})
		},
		{ threshold: 0.5 },
	)
	counters.forEach(c => counterObs.observe(c))

	const progressObs = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					animateProgress(entry.target)
					progressObs.unobserve(entry.target)
				}
			})
		},
		{ threshold: 0.3 },
	)
	progressBars.forEach(b => progressObs.observe(b))
})()

/* ---------- Testimonial Slider (FIXED) ---------- */
;(function initSlider() {
	const slider = document.querySelector('.testimonial-slider')
	const track = document.getElementById('testimonial-track')
	const dotsWrap = document.getElementById('slider-dots')
	const prevBtn = document.getElementById('prev-btn')
	const nextBtn = document.getElementById('next-btn')
	if (!track || !slider) return

	const cards = Array.from(track.querySelectorAll('.testimonial-card'))
	const GAP = 20
	let current = 0
	let autoTimer = null

	/* Cards visible at current viewport width */
	function getVisible() {
		const w = slider.offsetWidth
		if (w <= 600) return 1
		if (w <= 900) return 2
		return 3
	}

	/* Last scrollable position */
	function maxIndex() {
		return Math.max(0, cards.length - getVisible())
	}

	/* Set each card's pixel width so they fill the slider perfectly */
	function setCardWidths() {
		const visible = getVisible()
		const cardW = (slider.offsetWidth - GAP * (visible - 1)) / visible
		cards.forEach(c => {
			c.style.width = cardW + 'px'
		})
		return cardW
	}

	/* Rebuild dot buttons */
	function buildDots() {
		dotsWrap.innerHTML = ''
		const total = maxIndex() + 1
		for (let i = 0; i < total; i++) {
			const dot = document.createElement('button')
			dot.className = 'slider-dot' + (i === current ? ' active' : '')
			dot.setAttribute('aria-label', 'Testimonial ' + (i + 1))
			dot.addEventListener('click', () => goTo(i))
			dotsWrap.appendChild(dot)
		}
	}

	function updateDots() {
		dotsWrap.querySelectorAll('.slider-dot').forEach((d, i) => {
			d.classList.toggle('active', i === current)
		})
	}

	function goTo(idx) {
		current = Math.max(0, Math.min(idx, maxIndex()))
		const cardW = setCardWidths()
		const offset = current * (cardW + GAP)
		track.style.transform = `translateX(-${offset}px)`
		updateDots()
		resetAuto()
	}

	function resetAuto() {
		clearInterval(autoTimer)
		autoTimer = setInterval(() => {
			goTo(current >= maxIndex() ? 0 : current + 1)
		}, 5000)
	}

	prevBtn?.addEventListener('click', () => goTo(current - 1))
	nextBtn?.addEventListener('click', () => goTo(current + 1))

	/* Touch swipe */
	let startX = 0
	track.addEventListener(
		'touchstart',
		e => {
			startX = e.touches[0].clientX
		},
		{ passive: true },
	)
	track.addEventListener(
		'touchend',
		e => {
			const diff = startX - e.changedTouches[0].clientX
			if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1)
		},
		{ passive: true },
	)

	/* ResizeObserver — recalculates on any slider width change */
	if (window.ResizeObserver) {
		new ResizeObserver(() => {
			if (current > maxIndex()) current = maxIndex()
			buildDots()
			goTo(current)
		}).observe(slider)
	} else {
		window.addEventListener(
			'resize',
			() => {
				if (current > maxIndex()) current = maxIndex()
				buildDots()
				goTo(current)
			},
			{ passive: true },
		)
	}

	/* Init */
	setCardWidths()
	buildDots()
	goTo(0)
})()

/* ---------- Portfolio Filters ---------- */
;(function initPortfolioFilter() {
	const filterBtns = document.querySelectorAll('.filter-btn')
	const cards = document.querySelectorAll('.portfolio-card')
	if (!filterBtns.length) return

	filterBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			filterBtns.forEach(b => b.classList.remove('active'))
			btn.classList.add('active')
			const filter = btn.dataset.filter
			cards.forEach(card => {
				card.classList.toggle(
					'hidden',
					filter !== 'all' && card.dataset.category !== filter,
				)
			})
		})
	})
})()

/* ---------- FAQ Accordion ---------- */
;(function initFAQ() {
	const questions = document.querySelectorAll('.faq-question')
	questions.forEach(q => {
		q.addEventListener('click', () => {
			const expanded = q.getAttribute('aria-expanded') === 'true'
			const answer = document.getElementById(q.getAttribute('aria-controls'))

			// Close all others
			questions.forEach(other => {
				if (other !== q) {
					other.setAttribute('aria-expanded', 'false')
					const otherAns = document.getElementById(
						other.getAttribute('aria-controls'),
					)
					if (otherAns) otherAns.hidden = true
				}
			})

			q.setAttribute('aria-expanded', !expanded)
			if (answer) answer.hidden = expanded
		})
	})
})()

/* ---------- Smooth Scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
	a.addEventListener('click', e => {
		const target = document.querySelector(a.getAttribute('href'))
		if (target) {
			e.preventDefault()
			target.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	})
})

/* ---------- Lightbox Data ---------- */
const LIGHTBOX_DATA = [
	{
		img: 'https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-53fd55e/www.decorilla.com/online-decorating/wp-content/uploads/2025/04/Contemporary-master-bathroom-remodel-by-Decorilla-2048x1365.jpg',
		icon: 'fa-bath',
		title: 'Modern Bathroom Renovation',
		desc: 'Full plumbing rough-in and finish for a complete master bathroom redesign in Pacific Heights.',
		tag: 'Residential',
	},
	{
		img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5t3RzPQcyhVwP53L_laiwvQYJ38a9aCbVO-aY4N858sHN3GnxBub2SEj4&s=10',
		icon: 'fa-utensils',
		title: 'Restaurant Kitchen System',
		desc: 'Commercial-grade grease trap, drain, and supply line installation for a 120-seat restaurant in SoMa.',
		tag: 'Commercial',
	},
	{
		img: 'https://www.jrgasandwater.com.au/cdn/shop/files/burst-pipe-repair-service-1375749.png?v=1777088707&width=720',
		icon: 'fa-pipe-valve',
		title: 'Burst Pipe Emergency Repair',
		desc: 'Emergency response within 38 minutes. Burst main repaired and damage controlled in under 2 hours.',
		tag: 'Emergency',
	},
	{
		img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop',
		icon: 'fa-fire-flame-curved',
		title: 'Tankless Water Heater Install',
		desc: 'Replaced a 40-gallon tank with a Navien NPE-240A tankless system — 34% energy savings.',
		tag: 'Residential',
	},
	{
		img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEpesJxVT7uID6UXIug9KhL1eInMHcdLaL3T_KhdgDnVhFP4nLxoymKqTh&s=10',
		icon: 'fa-building',
		title: 'Office Building Refit',
		desc: '12-floor commercial refit in downtown SF: fixtures, main lines, backflow prevention, and code compliance.',
		tag: 'Commercial',
	},
	{
		img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrqGEak5Wrqmg8htKFz9WCrXgwr0kTiX5HTB1kO5TW6ZOEKUuWRDlYK_k&s=10',
		icon: 'fa-sink',
		title: 'Full Kitchen Remodel',
		desc: 'Relocated island sink, dishwasher, and pot filler for an open-concept kitchen in Marin County.',
		tag: 'Residential',
	},
]

window.openLightbox = function (index) {
	const data = LIGHTBOX_DATA[index]
	if (!data) return
	const img = document.getElementById('lightbox-img')
	const title = document.getElementById('lightbox-title')
	const desc = document.getElementById('lightbox-desc')
	const tag = document.getElementById('lightbox-tag')

	if (img) {
		img.innerHTML = data.img
			? `<img src="${data.img}" alt="${data.title}" style="width:100%;height:100%;object-fit:cover;display:block;" loading="lazy" />`
			: `<i class="fa-solid ${data.icon}"></i>`
	}
	if (title) title.textContent = data.title
	if (desc) desc.textContent = data.desc
	if (tag) tag.textContent = data.tag

	const prev = document.getElementById('lightbox-prev')
	const next = document.getElementById('lightbox-next')
	if (prev)
		prev.onclick = () =>
			openLightbox(index > 0 ? index - 1 : LIGHTBOX_DATA.length - 1)
	if (next)
		next.onclick = () =>
			openLightbox(index < LIGHTBOX_DATA.length - 1 ? index + 1 : 0)

	openModal('lightbox-modal')
}
  