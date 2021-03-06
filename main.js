function expandNavBar() {
    const expandedClass = "expanded";
    var bar = document.querySelector('.main-navbar.mobile');

    if (!bar.classList.contains(expandedClass)) {
        bar.classList.add(expandedClass);
    }
    else {
        bar.classList.remove(expandedClass);
    }
}

function fixNavBar() {
    var header = document.querySelector('.header');
    var bar = document.querySelector('.main-navbar.desktop');
    
    $(window).scroll(function() {
        var bottom = header.getBoundingClientRect().bottom;
        //console.log(bottom);

        if (bottom < 40) {
            bar.classList.add('fixed');
        }
        else {
            bar.classList.remove('fixed');
        }
    });
}

var initTops = [];

function slickTitles() {
    for (var h1 of $('.fadein')) {
        //h1.data('fadein')
    }

    $(window).scroll(function() {
        for (var h1 of $('.fadein')) {
            const winHeight = $(window).height();
            var top = h1.getBoundingClientRect().top;
            var perc = 1 - top / winHeight;

            if (-0.1 > perc || perc > 1.1) {
                continue;
            }

            h1.style.opacity = perc * 3.0 - 0.35;
            h1.style.top = '' + 1.0 / (5 * perc + 1) * -120.0 + 'px';
        }
    });
}

$.fn.moveIt = function() {
    var $window = $(window);
    var instances = [];

    $(this).each(function() {
        instances.push(new moveItItem($(this)));
    });

    window.addEventListener('scroll', function() {
        var scrollTop = $window.scrollTop();

        instances.forEach(function(inst) {
            inst.update(scrollTop);
        });
    }, {passive: true});
}

var moveItItem = function(el) {
    this.el = $(el);
    this.speed = parseInt(this.el.attr('data-scroll-speed'));
};

moveItItem.prototype.update = function(scrollTop) {
    this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)');
};

var setUpModal = function() {
    /* Picture modal */
    var modal = $('#pictureModal')[0];

    var modalImg = $('#img01');
    var captionText = $('.modal .caption');
    var closeBtn = $('#pictureModal > .close')[0];

    modal.onclick = closeBtn.onclick = () => {
        modal.style.display = "none";
    }

    modalImg.click((e) => {
        e.stopPropagation();
    });


    /* Hex tiles events */
    for (var hex of document.querySelectorAll('.hex')) {
        /* On click, open modal */
        hex.onclick = function() {
			modalImg.attr("src", "");
            captionText.html("");
			
            modal.style.display = "table";
            modalImg.attr("src", this.dataset.image);
            captionText.html(this.dataset.caption);
        }
    }

    /* Hex tiles animations */
    $(window).scroll(function() {
        const size = 150.0;
        const shift = 100.0;

        for (var hex of $('.hex')) {
            const winHeight = $(window).height();
            var top = hex.getBoundingClientRect().top;
            var bot = -hex.getBoundingClientRect().bottom + winHeight;

            top += shift;
            bot += shift;

            var opacity = Math.min(top, bot) / size;
            hex.style.opacity = opacity;

            /* A sort of "bubble" function for the scale */
            var scale = Math.min(top, bot) / (winHeight / 2);
            scale = Math.sin(scale * 1.57);
            scale = Math.min(1, scale + 0.3);

            hex.style.transform = 'rotate(120deg) scale(' + scale + ')';
        }
    })
}


$(document).ready(function() {
    $('[data-scroll-speed]').moveIt();

    fixNavBar();
    slickTitles();

    setUpModal();
});