function lazyLoadImg() {
    $(function() {
        var lazyObj = {
            placeholder: "http://static.tianji.com/images/logos/user/medium_logo.png",
            data_attribute: "src",
            effect: "fadeIn"
        };
        if ($().lazyload) {
            $("img.lazyload").lazyload(lazyObj);
            if ($("#profile_right img.lazyload").length != 0) {
                $("#profile_right img.lazyload").lazyload(lazyObj);
            }
        }
    });
};
lazyLoadImg();