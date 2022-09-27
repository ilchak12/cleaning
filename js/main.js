// Switch btn
const switchMainBtn = document.getElementsByClassName('switch')[0];
const switchBtns = Array.from(document.getElementsByClassName('switch__btn'));

switchMainBtn.addEventListener('click', function () {
    switchBtns.forEach((btn, i) => {
        btn.classList.toggle('active');
    })
})

// Burger menu
const burgerBtn = document.getElementsByClassName('burger-menu__icon')[0];
const burgerMenu = document.getElementsByClassName('burger-menu__inner')[0];

burgerBtn.addEventListener('click', function () {
    this.classList.toggle('active');
    burgerMenu.classList.toggle('active');
})

// // Cleaning btn
const cleanBtn = document.getElementsByClassName('btn-circle')[0];
const stickyArea = document.getElementsByClassName('sticky-area')[0];

window.pageYOffset > 0 ? cleanBtn.classList.add('hide') : cleanBtn.classList.remove('hide');

window.addEventListener('scroll', function (e) {
    window.pageYOffset > 0 ? cleanBtn.classList.add('hide') : cleanBtn.classList.remove('hide');
})

stickyArea.addEventListener('mousemove', function (e) {
    let mouseX = e.clientX;
    let mouseY = e.clientY;
    let posTop = this.offsetTop;
    let posLeft = this.offsetLeft;
    let x = (mouseX - posLeft + 10) - cleanBtn.offsetWidth;
    let y = (mouseY - posTop + 10) - cleanBtn.offsetHeight;

    console.log(mouseX)
    console.log(mouseY)

    if (cleanBtn.classList.contains('hide')) cleanBtn.style.transform = `translate(${x}px, ${y}px)`;
})

stickyArea.addEventListener('mouseleave', function () {
    cleanBtn.removeAttribute('style');
})

// Features
const featureItems = Array.from(document.getElementsByClassName('features__list-item'));

const callback = (entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fadeIn");
        }
    })
}
const options = {};
const newObserver = new IntersectionObserver(callback, options);

featureItems.forEach(item => {
    newObserver.observe(item);
})

// How we work GSAP
const workMenuItems = Array.from(document.querySelectorAll('.how-we-work__menu-item a'));
const workMenuImages = Array.from(document.querySelectorAll('.how-we-work__image-area'));
const workMenu = document.getElementsByClassName('how-we-work__menu')[0];
const workImageParent = document.getElementsByClassName('how-we-work__image')[0];

workMenuItems.forEach((item, i) => {
    item.addEventListener('mouseenter', function (e) {
        e.preventDefault();

        let prevActiveMenuImage = document.querySelector('.how-we-work__image-area.active');

        workMenuImages.forEach(prevItem => prevItem.classList.remove('hide'));
        prevActiveMenuImage.classList.remove('active');
        prevActiveMenuImage.classList.add('hide');

        workMenuImages[i].classList.add('active');
        workMenuImages[i].classList.remove('hide');
    })

    item.addEventListener('click', function (e) {
        e.preventDefault();

        let prevActiveMenuItem = document.querySelector('.how-we-work__menu-item.active');
        prevActiveMenuItem.classList.remove('active');

        item.parentElement.classList.add('active');
    })
})

document.body.style.height = document.body.scrollHeight + 'px';

gsap.registerPlugin(ScrollTrigger);
gsap.to('.how-we-work__image', {
    scrollTrigger: {
        trigger: '.how-we-work',
        start: '99% bottom',
        end: '99% top',
        // markers: true,
        toggleClass: {targets: workMenu, className: 'slideIn'},
        onEnter: () => {
            workImageParent.classList.add('active');
            window.scrollTo(0, document.body.scrollHeight);

            let translateX = (window.innerWidth - (window.innerWidth - workMenu.offsetWidth)) / 2;
            let translateY = Math.floor(workImageParent.getBoundingClientRect().top - ((window.innerHeight * 1)/100));

            if(window.innerWidth < 769) {
                translateX = 0;
                translateY = Math.floor(workImageParent.getBoundingClientRect().top - workMenu.offsetHeight)
                workImageParent.style.height = window.innerHeight - workMenu.offsetHeight + 'px';
            }

            workImageParent.style.transform = `translateX(${translateX}px)`;
            workImageParent.style.marginTop = -translateY + 'px';

            cleanBtn.classList.add('remove');
        },
        onLeaveBack: () => {
            workImageParent.classList.remove('active');
            workImageParent.removeAttribute('style');

            cleanBtn.classList.remove('remove');
        }
    },
})