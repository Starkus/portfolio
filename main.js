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
        console.log(bottom);

        if (bottom < 40) {
            bar.classList.add('fixed');
        }
        else {
            bar.classList.remove('fixed');
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
    var captionText = $('.caption');
    var closeBtn = $('#pictureModal > .close')[0];

    closeBtn.onclick = () => {
        modal.style.display = "none";
    }


    /* Hex tiles events */
    for (var hex of document.querySelectorAll('.hex')) {
        /* On click, open modal */
        hex.onclick = function() {
            modal.style.display = "block";
            modalImg.attr("src", this.dataset.image);
            console.log(this.dataset.image);
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

    setUpModal();
});