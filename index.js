module.exports = function createPointCB(object){

    // A persistent object (as opposed to returned object) is used to save memory
    // This is good to prevent layout thrashing, or for games, and such

    // NOTE
    // This uses IE fixes which should be OK to remove some day. :)
    // Some speed will be gained by removal of these.

    // pointCB should be saved in a variable on return
    // This allows the usage of element.removeEventListener

    return function pointCB(event){

        event = event || window.event; // IE-ism
        object.target = event.target || event.srcElement || event.originalTarget;
        object.element = this;
        object.type = event.type;

        // Support touch
        // http://www.creativebloq.com/javascript/make-your-site-work-touch-devices-51411644

        if(event.targetTouches){
            object.x = event.targetTouches[0].clientX;
            object.y = event.targetTouches[0].clientY;
            object.pageX = event.pageX;
            object.pageY = event.pageY;
        }else{

            // If pageX/Y aren't available and clientX/Y are,
            // calculate pageX/Y - logic taken from jQuery.
            // (This is to support old IE)
            // NOTE Hopefully this can be removed soon.

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

            // pageX, and pageY change with page scroll
            // so we're not going to use those for x, and y.
            // NOTE Most browsers also alias clientX/Y with x/y
            // so that's something to consider down the road.

            object.x = event.clientX;
            object.y = event.clientY;
        }

    };

    //NOTE Remember accessibility, Aria roles, and labels.
};
