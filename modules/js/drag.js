(function() {
    var fnTianjiDrag = function($box, $dragNode) {
        var pageX = 0;
        var pageY = 0;
        var bDrag = false;
        $dragNode = $dragNode || $box;
        $dragNode.css('cursor', 'move');
        $dragNode.on('mousedown', function(e) {
            e = e || window.event;
            var xPos = e.clientX;
            var yPos = e.clientY;
            pageX = xPos - $box.offset().left;
            pageY = yPos - $box.offset().top;
            bDrag = true;
            $(this)[0].setCapture && $(this)[0].setCapture();
            return false;
        });
        $(document).on('mousemove', function(e) {
            if (!bDrag) return;
            e = e || window.event;
            var iLeft = e.clientX - pageX;
            var iTop = e.clientY - pageY;

            var maxL = document.documentElement.clientWidth - $box.width();
            var maxT = document.documentElement.clientHeight - $box.height();

            iLeft = iLeft < 0 ? 0 : iLeft;
            iTop = iTop < 0 ? 0 : iTop;

            iLeft = iLeft > maxL ? maxL : iLeft;
            iTop = iTop > maxT ? maxT : iTop;

            $box.css({
                left: iLeft,
                top: iTop,
                margin: 0
            });
            return false;
        });
        $(document).on('mouseup', function(e) {
            //$dragNode.off('mousedown');
            //$(document).off('mousemove');
            $dragNode[0].releaseCapture && $dragNode[0].releaseCapture();
            bDrag = false;
        });
    };
    window.fnTianjiDrag = fnTianjiDrag;
})();