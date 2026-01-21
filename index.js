window.onscroll = function () {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        $("#header").addClass("scrolled");
    } else {
        $("#header").removeClass("scrolled");
    }
}

// Initial check on load
$(window).on('load', function () {
    window.onscroll();
});

function magnify(imglink) {
    $("#img_here").css("background", `url('${imglink}') center center`);
    $("#magnify").css("display", "flex");
    $("#magnify").addClass("animated fadeIn");
    setTimeout(function () {
        $("#magnify").removeClass("animated fadeIn");
    }, 800);
}

function closemagnify() {
    $("#magnify").addClass("animated fadeOut");
    setTimeout(function () {
        $("#magnify").css("display", "none");
        $("#magnify").removeClass("animated fadeOut");
        $("#img_here").css("background", `url('') center center`);
    }, 800);
}

setTimeout(function () {
    $("#loading").addClass("animated fadeOut");
    setTimeout(function () {
        $("#loading").removeClass("animated fadeOut");
        $("#loading").css("display", "none");
    }, 800);
}, 1650);

$(document).ready(function () {
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('body,html').animate({
                scrollTop: $(hash).offset().top - 70
            }, 1200, function () {
                history.pushState(null, null, hash);
            });
        }
    });

    const workEx = $('#work_ex');
    const items = workEx.children('.project-item').get();
    let isMobileOrder = false;

    function reorderProjects() {
        const currentWidth = $(window).width();
        if (currentWidth < 1000 && !isMobileOrder) {
            // Transpose order: [1, 3, 5, 2, 4] 
            // This makes the visual row pairs from desktop appear sequentially on mobile
            const mobileOrder = [items[0], items[2], items[1], items[3], items[4]];
            workEx.empty().append(mobileOrder);
            isMobileOrder = true;
        } else if (currentWidth >= 1000 && isMobileOrder) {
            // Restore original column-first order: [1, 2, 3, 4]
            workEx.empty().append(items);
            isMobileOrder = false;
        }
    }

    // Initial check
    reorderProjects();

    // Check on resize with debounce
    let resizeTimer;
    $(window).on('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(reorderProjects, 100);
    });
});

