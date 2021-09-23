$(function() {
    $('input[type="tel"]').mask("+38(099) 999-99-99");
})

$('#country').on("change", function() {
    window.country = $(this).val();
    $('.form-c').removeClass('visible-form');
    $('.input').removeClass('visible-form');
    $('.' + country).toggleClass('visible-form');
    if (country == "") {
        $('.form-c').removeClass('visible-form');
    }
    $('.ordering > div > input').removeClass('empty_field');
    $('.' + country + ' input').addClass('empty_field');
    $('.ordering > div > div.input > input').removeClass('empty_field');
    $('.custom-combobox-input').removeClass('empty_field');
    switch (country) {
        case 'ukraine':
            $('input[type="tel"]').mask("+38(099) 999-99-99");
            break;
        case 'russia':
            $('input[type="tel"]').mask("+7(999) 999-99-99");
            break;
        case 'belorusia':
            $('input[type="tel"]').mask("+37(599) 999-99-99");
            break;
        case 'kazahstan':
            $('input[type="tel"]').mask("+7(999) 999-99-99");
            break;
        case 'other_country':
            $('input[type="tel"]').mask("+99(999) 999-99-99");
            break;
        default:
            $('input[type="tel"]').mask("+99(999) 999-99-99");
    }
    $('html, body').animate({
        scrollTop: $(`.form-c.${country}`).offset().top - $(window).height() / 2
            // класс объекта к которому приезжаем
    }, 200);
});


$('input.delivery_method').on('change', function() {
    let selected_method = $(this).val();
    $(this).addClass('check-radio');
    $('.input').removeClass('visible-form');
    $('.' + selected_method).toggleClass('visible-form');
    $('.ordering > div > div.input > input').removeClass('empty_field');
    $('.' + country + ' select').removeClass('empty_field');
    $('.' + selected_method + ' input').addClass('empty_field');
    $('.' + selected_method + ' select').addClass('empty_field');
    $(this).siblings(".payments").css({ 'display': 'block' });
    $('.custom-combobox-input').removeClass('empty_field');
    $('.' + selected_method + ' .custom-combobox-input').addClass('empty_field');
    if ($(window).width() < 1111) {
        $('.mobile__submit-controller').css({ 'display': 'block' });
    }


    $('html, body').animate({
        scrollTop: $(`.form-c.${country} .input.visible-form`).offset().top - $(window).height() / 2
            // класс объекта к которому приезжаем
    }, 200);
});

$('input.payment_method').on('change', function() {
    $(this).addClass('check-radio__payment');
    $('html, body').animate({
        scrollTop: $(`.form-c.${country} .comments`).offset().top - $(window).height() / 2
            // класс объекта к которому приезжаем
    }, 200);
});





$(document).ready(function() {
    $('.ordering > input').addClass('empty_field');
    $('.ordering > div > div.input > input').removeClass('empty_field');
});



$('.input input:last-child, .input select:last-child').on('change', function() {

    if ($(this).val() != '') {
        $('html, body').animate({
            scrollTop: $(`.form-c.${country} .payments`).offset().top - $(window).height() / 2
                // класс объекта к которому приезжаем
        }, 200);
    } else {
        event.preventDefault();
    }
});


$('input, select').change(function() {

    if ($(this).val() != '') {
        $(this).removeClass('empty_field');
        $(this).css('border', 'solid 1px #DBDBDB');
    } else {
        $(this).addClass('empty_field');
    }
});

// FORM CONTROLLER - END



// ПРОВЕРКА ПОЛЕЙ ЧЕРЕЗ КНОПКУ - START

$('.btn_submit').click(function() {
    $('input[type="radio"], input[type="checkbox"]').removeClass('empty_field');
    $('input[type="hidden"], .service_element').removeClass('empty_field');

    if ($('.select2-hidden-accessible').hasClass('empty_field')) {
        $(this).siblings('.select2-container').css('border', 'solid 1px red');
    } else {
        return false;
    }

    let empty_fields = $('.empty_field').length;

    if (empty_fields == 0) {
        let empty_radio_delivery = $('.check-radio').length;
        if (empty_radio_delivery == 0) {

            $('html, body').animate({
                scrollTop: $(`.form-c.${country}`).offset().top - $(window).height() / 2
                    // класс объекта к которому приезжаем
            }, 200);

            $(`.alert-container`).prepend(`<div class="alert_warn right"><h2>Выберите способ доставки!</h2></div>`);
            $('.alert_warn').delay(2500).fadeOut(200);
            preventDefault();
            return false;

        }
        let empty_radio_payment = $('.check-radio__payment').length;
        if (empty_radio_payment == 0) {

            $('html, body').animate({
                scrollTop: $(`.form-c.${country} > .payments`).offset().top - $(window).height() / 2
                    // класс объекта к которому приезжаем
            }, 200);

            $(`.alert-container`).prepend(`<div class="alert_warn right"><h2>Выберите способ оплаты!</h2></div>`);
            $('.alert_warn').delay(2500).fadeOut(200);
            preventDefault();
            return false;
        }
        $('.ordering .form-c').each(function() {
            if ($(this).hasClass(`${country}`) != true) {
                // $(this).remove();
            } else {
                preventDefault();
            }
        });

        $('input:not(.check-radio, .check-radio__payment, .department_check), select:not(.department_check)').each(function() {
            if ($(this).is(':hidden')) {
                $('.check-radio, .check-radio__payment, .department_check, .department_check').addClass('disabled-after-send');
                // $(this).remove();
            } else {
                preventDefault();
            }
        });
        $('form.ordering').submit();
    } else {
        $('html, body').animate({
            scrollTop: $(".empty_field").offset().top - $(window).height() / 2 // класс объекта к которому приезжаем
        }, 200);
        setInterval(function() {
            $('.empty_field').css('border', 'solid 1px red');
        }, 300);

        $('input.empty_field').each(function() {
            $(this).after(`<div class="alert_warn"><h2>Ошибка! Заполните поле!</h2></div>`);
            $('.alert_warn').delay(5000).fadeOut(200);
            preventDefault();
        })
        preventDefault();

    }




});

// ПРОВЕРКА ПОЛЕЙ ЧЕРЕЗ КНОПКУ - END
function checkFields() {
    $('input[type="radio"], input[type="checkbox"]').removeClass('empty_field');
    $('input[type="hidden"], .service_element').removeClass('empty_field');

    if ($('.select2-hidden-accessible').hasClass('empty_field')) {
        $(this).siblings('span').css('border', 'solid 1px red');
    } else {
        return false;
    }

    let empty_fields = $('.empty_field').length;

    if (empty_fields == 0) {
        let empty_radio_delivery = $('.check-radio').length;
        if (empty_radio_delivery == 0) {

            $('html, body').animate({
                scrollTop: $(`.form-c.${country}`).offset().top - $(window).height() / 2
                    // класс объекта к которому приезжаем
            }, 200);

            $(`.alert-container`).prepend(`<div class="alert_warn right"><h2>Выберите способ доставки!</h2></div>`);
            $('.alert_warn').delay(2500).fadeOut(200);
            preventDefault();
            return false;

        }
        let empty_radio_payment = $('.check-radio__payment').length;
        if (empty_radio_payment == 0) {

            $('html, body').animate({
                scrollTop: $(`.form-c.${country} > .payments`).offset().top - $(window).height() / 2
                    // класс объекта к которому приезжаем
            }, 200);

            $(`.alert-container`).prepend(`<div class="alert_warn right"><h2>Выберите способ оплаты!</h2></div>`);
            $('.alert_warn').delay(2500).fadeOut(200);
            preventDefault();
            return false;
        }
        $('.ordering .form-c').each(function() {
            if ($(this).hasClass(`${country}`) != true) {
                // $(this).remove();
            } else {
                preventDefault();
            }
        });

        $('input:not(.check-radio, .check-radio__payment, .department_check), select:not(.department_check)').each(function() {
            if ($(this).is(':hidden')) {
                $('.check-radio, .check-radio__payment, .department_check, .department_check').addClass('disabled-after-send');
                // $(this).remove();
            } else {
                preventDefault();
            }
        });
        $('form.ordering').submit();
    } else {
        $('html, body').animate({
            scrollTop: $(".empty_field").offset().top - $(window).height() / 2 // класс объекта к которому приезжаем
        }, 200);
        setInterval(function() {
            $('.empty_field').css('border', 'solid 1px red');

        }, 300);
        $('.empty_field').siblings('span').find('.select2-selection--single').css('border', 'solid 1px red');
        $('.empty_field').siblings('span').find('.select2-selection--single').after(`<div class="alert_warn"><h2>Ошибка! Заполните поле!</h2></div>`);
        $('.alert_warn').delay(5000).fadeOut(200);
        $('input.empty_field').each(function() {
            $(this).after(`<div class="alert_warn"><h2>Ошибка! Заполните поле!</h2></div>`);
            $('.alert_warn').delay(5000).fadeOut(200);
            //    preventDefault();
        })


    }




};

// ПРОВЕРКА ПОЛЕЙ ЧЕРЕЗ ФУНКЦИЮ - START

function checkInputsAjax(name, message) {
    $(`input[name*=${name}]`).addClass('warning');
    $(document).ready(function() {
        $('html, body').animate({
            scrollTop: $(`.warning`).filter(':first').offset().top - $(window).height() / 2
        }, 200);
    })

    $(`input[name*=${name}]`).css('border', 'solid 1px red');
    if ($(`input[name*=${name}]`).attr('type') == 'radio') {
        $(`.alert-container`).prepend(`<div class="alert_warn right"><h2>${message}</h2></div>`);
    } else {
        $(`input[name*=${name}]`).after(`<div class="alert_warn"><h2>${message}</h2></div>`);
    }

    $('.alert_warn').delay(2500).fadeOut(200);

}

// ПРОВЕРКА ПОЛЕЙ ЧЕРЕЗ ФУНКЦИЮ - END

$('.cart-icon a').click(function() {
    $('.minicart').toggleClass('visible');
});

$('.minicart .close-btn').click(function() {
    $('.minicart').toggleClass('visible');
});

$('#product-slider_for').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    focusOnSelect: true,
    arrows: false,
    draggable: true,
    asNavFor: '#product-slider_nav',
    variableWidth: true
});
$('#product-slider_nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '#product-slider_for',
    draggable: true,
    focusOnSelect: true,
    vertical: true,
    arrows: false,

});

$('.size label').click(function() {
    $(this).parents('.size').toggleClass('toggled');
});

$('#size-plus').click(function() {
    // ОБРАБОТЧИК УВЕЛИЧЕНИЯ КОЛ-ВА ТОВАРА
})

$('#size-minus').click(function() {
    // ОБРАБОТЧИК УМЕНЬШЕНИЯ КОЛ-ВА ТОВАРА
})

$('#add-to-wish').click(function() {
    $(this).toggleClass('active');
})

$('#buy-in-one-click').click(function() {
    if ($(this).parent('.buy-in-one-click').hasClass('active')) {
        return false;
    } else {
        $(this).parent('.buy-in-one-click').addClass('active');
    }
});

$('#add-to-cart').click(function() {
    if ($(this).hasClass('added')) {
        $('.minicart').addClass('visible');

        return false;

    } else {
        $(this).text('Добавлено в корзину');
        $(this).addClass('added');
    }

});


$('#product__slider-colors').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: $('#product__slider-color-prev'),
    nextArrow: $('#product__slider-color-next'),
    infinite: false
})