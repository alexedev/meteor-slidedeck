var vazcoSideToSide = function(fromX, toX) {
    return function(options) {
        options = _.extend({
            duration: 700,
            delay: 350,
            easing: 'ease-in-out'
        }, options);

        return {
            insertElement: function(node, next, done) {
                var $node = $(node);
                $node
                    .css('transform', 'translateX(' + fromX + ')')
                    .insertBefore(next)
                    .velocity({
                        translateX: [0, fromX]
                    }, {
                        delay: options.delay,
                        easing: options.easing,
                        duration: options.duration,
                        queue: false,
                        complete: done
                    });
            },
            removeElement: function(node, done) {
                var $node = $(node);
                $node
                    .velocity({
                        translateX: [toX]
                    }, {
                        duration: options.duration,
                        easing: options.easing,
                        complete: function() {
                            $node.remove();
                            done();
                        }
                    });
            }
        }
    }
}

Momentum.registerPlugin('vazco-right-to-left', vazcoSideToSide('200%', '-200%'));
Momentum.registerPlugin('vazco-left-to-right', vazcoSideToSide('-200%', '200%'));
