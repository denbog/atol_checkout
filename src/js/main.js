import '@/scss/main.scss'

import Swiper from 'swiper'
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules'
import tingle from 'tingle.js'
import baguetteBox from 'baguettebox.js'
import tippy from 'tippy.js'
import { MaskInput } from "maska"
import autoComplete from "@tarekraafat/autocomplete.js"


new MaskInput('input[name="phone"]', { mask: "+7 (###) ###-##-##" })

const autoCompleteJS = new autoComplete({
    selector: 'input[name="city"]',
    debounce: 500,
    threshold: 2,
    searchEngine: 'loose',
    data: {
        src: async (query) => {
            try {
                const resp = await fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token 4808f665f589bfae7380e2f522dff85fe8d80ef3'
                    },
                    body: JSON.stringify({
                        query: query,
                        from_bound: { value: "city" },
                        to_bound: { value: "city" }
                    })
                })

                const json = await resp.json()

                return json.suggestions
            } catch (error) {
                return error
            }
        },
        keys: ['value']
    }
})

autoCompleteJS.input.addEventListener('selection', function (event) {
    const selection = event.detail.selection.value

    autoCompleteJS.input.blur()
    autoCompleteJS.input.value = selection.value

    document.querySelector('input[name="place"]').value = selection.data.region_with_type || ''
})

Swiper.use([Autoplay, FreeMode, Navigation, Thumbs])

tippy('[data-tooltip]', {
    content: (reference) => reference.getAttribute('data-tooltip')
});

tippy('[data-info]', {
    content: (reference) => reference.getAttribute('data-info'),
    trigger: 'click',
    theme: 'light'
});

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
    },
    speed: 5000,
    loop: true,
    freeMode: {
        enabled: true,
        momentumBounce: false
    },
    autoplay: {
        delay: 0,
        disableOnInteraction: true
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
})

window.onSubmit = async function (token) 
{
    const form = document.querySelector('#form-callback form')
    if (!form.checkValidity()) {
        form.classList.add('js-validity')
        grecaptcha.reset()
        return
    }

    const formData = new FormData(form)
    
    formData.set('g-recaptcha-response', token)
    formData.set('back_url', window.location.href)

    let response = await fetch('/bitrix/services/main/ajax.php?mode=ajax&c=atol:form.landing&action=submit', {
        method: 'POST',
		headers: {
			"X-Bitrix-Csrf-Token": window.csrfToken || ''
		},
        body: formData
    });
  
    let result = await response.json();

    if ('error' == result.status) {
        document.querySelector('#form-callback .js-form-error').classList.remove('hide')
        grecaptcha.reset()
    } else {
        form.classList.add('hide')
        document.querySelector('#form-callback .js-form-success').classList.remove('hide')
    }
}