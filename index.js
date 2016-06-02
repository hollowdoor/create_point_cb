module.exports = function createPointCB(object){

    return function pointCB(event){

        event = event || window.event; // IE-ism
        object.target = event.target || event.srcElement || event.originalTarget;
        object.element = this;
        object.type = event.type;

        //Support touch
        //http://www.creativebloq.com/javascript/make-your-site-work-touch-devices-51411644
        //pageX, and pageY change with page scroll
        //so we're not going to use those for x, and y.
        if(event.targetTouches){
            object.x = event.targetTouches[0].clientX;
            object.y = event.targetTouches[0].clientY;
            object.touches = event.touches;
            object.targetTouches = event.targetTouches;
            object.pageX = event.pageX;
            object.pageY = event.pageY;
            object.type = event.type;
        }else{
            // If pageX/Y aren't available and clientX/Y are,
            // calculate pageX/Y - logic taken from jQuery.
            // (This is to support old IE)
            if (event.pageX === null && event.clientX !== null) {
                var eventDoc = (event.target && event.target.ownerDocument) || document;
                var doc = eventDoc.documentElement;
                var body = eventDoc.body;

                object.pageX = event.clientX +
                  (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                  (doc && doc.clientLeft || body && body.clientLeft || 0);
                object.pageY = event.clientY +
                  (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
                  (doc && doc.clientTop  || body && body.clientTop  || 0 );
            }else{
                object.pageX = event.pageX;
                object.pageY = event.pageY;
            }

            object.x = event.clientX;
            object.y = event.clientY;

            object.targetTouches = object.touches = [{
                target: this,
                identifier: ''+this,
                pageX: event.pageX,
                pageY: event.pageY,
                screenX: event.screenX,
                screenY: event.screenY,
                clientX: event.clientX,
                clientY: event.clientY
            }];
        }

    };
};
