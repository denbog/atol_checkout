import '@/scss/main.scss'

import Swiper from 'swiper'
import { Navigation, Thumbs } from 'swiper/modules'
import tingle from 'tingle.js'
import baguetteBox from 'baguettebox.js'
import tippy from 'tippy.js'
import { MaskInput } from "maska"

Swiper.use([Navigation, Thumbs])

tippy('[data-tooltip]', {
    content: (reference) => reference.getAttribute('data-tooltip')
});

tippy('[data-info]', {
    content: (reference) => reference.getAttribute('data-info'),
    trigger: 'click',
    theme: 'light'
});

new MaskInput('input[name="phone"]', { mask: "+7 (###) ###-##-##" })

const catalogSwiper = new Swiper('.catalog-swiper', {
    slidesPerView: 1,
    spaceBetween: 40,
    breakpoints: {
        768: {
            slidesPerView: 2
        },
        992: {
            slidesPerView: 3
        }
    },
    navigation: {
        nextEl: '.catalog-button-next',
        prevEl: '.catalog-button-prev',
    }
})

const equipmentSwiper = new Swiper('.equipment-swiper', {
    slidesPerView: 1,
    spaceBetween: 40,
    breakpoints: {
        576: {
            slidesPerView: 2
        },
        768: {
            slidesPerView: 3
        },
        992: {
            slidesPerView: 4
        }
    },
    navigation: {
        nextEl: '.equipment-button-next',
        prevEl: '.equipment-button-prev',
    }
})


document.querySelectorAll('.tabs__button').forEach((el) => {
    el.addEventListener('click', (event) => {
        event.preventDefault()

        el.parentElement.querySelector('.tabs__button--active').classList.remove('tabs__button--active')
        el.classList.add('tabs__button--active')

        const index = [...el.parentElement.children].indexOf(el)

        document.querySelector('.tabs__item--active').classList.remove('tabs__item--active')
        document.querySelector('.tabs__item:nth-child(' + (index + 1) + ')').classList.add('tabs__item--active')
    })
})

const initProduct = () => {
    let swiper = new Swiper(".product-swiper-thumbs", {
        loop: true,
        spaceBetween: 20,
        slidesPerView: 7,
        freeMode: true,
        watchSlidesProgress: true
    });
    let swiper2 = new Swiper(".product-swiper", {
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper
        }
    });

    baguetteBox.run('.product-swiper', {
        overlayBackgroundColor: '#fff'
    })
}

document.querySelectorAll('.js-modal').forEach((el) => {
    el.addEventListener('click', (event) => {
        event.preventDefault()

        const tpl = document.querySelector(event.currentTarget.getAttribute('href'))

        const modal = new tingle.modal({
            closeMethods: ['overlay', 'button', 'escape'],
            closeLabel: "Закрыть",
            cssClass: [el.dataset.class || 'tingle-popup'],
            onOpen: function () {
                if (event.currentTarget.getAttribute('href').indexOf('product')) {
                    initProduct()
                }
            },
            onClose: function () {
                modal.destroy();
            }
        })

        modal.setContent(tpl.content.cloneNode(true))
        modal.open()

    })
})

let formModal;
document.querySelectorAll('.js-open-form').forEach((el) => {
    el.addEventListener('click', (event) => {
        event.preventDefault()

        if (!formModal) {
            formModal = new tingle.modal({
                closeMethods: ['overlay', 'button', 'escape'],
                closeLabel: "Закрыть",
                cssClass: ['tingle-popup'],
                onClose: function () {
                    formModal.close();
                }
            })

            formModal.setContent(document.getElementById('form-callback'))
        }

        formModal.open()
    })
})

document.querySelector('#form-callback form').addEventListener('submit', async (event) => {
    event.preventDefault()

    const form = event.currentTarget

    let response = await fetch('https://atol.sandbox03.market.atol.tech/bitrix/services/main/ajax.php?mode=ajax&c=atol:form.checkout&action=submit', {
        method: 'POST',
		headers: {
			"X-Bitrix-Csrf-Token": window.csrfToken || ''
		},
        body: new FormData(form)
    });
  
    let result = await response.json();
    console.log(form)

    if ('error' == result.status) {
        document.querySelector('#form-callback .js-form-error').classList.remove('hide')
    } else {
        form.classList.add('hide')
        document.querySelector('#form-callback .js-form-success').classList.remove('hide')
    }
})