class Animation {

    static blinkEye(repeat = 1) {
        const tl = new TimelineMax({
            repeat: repeat,
            yoyo: true,
        });
        tl.to('.eye-full', 0.25, {
            scaleY: 0.1,
            scaleX: 0.5,
            transformOrigin: '50% 70%',
            ease: Power0.easeNone
        })
        return tl;
    }

    static rollEyes(repeat = 1) {
        const tl = new TimelineMax({
            repeat: repeat,
            yoyo: true,
        });
        tl.to('.inner-eye', 0.5, {
            transformOrigin: '30% 0%',
            rotation: -320,
            ease: Power0.easeNone,
        })
        return tl;
    }

    static growEye(repeat = 1) {
        const tl = new TimelineMax({
            repeat: repeat,
            yoyo: true,
        });

        tl.to('.eye-full', 0.5, {
            transformOrigin: '50% 50%',
            scaleY: 1.2,
            scaleX: 1.2,
            ease: Power0.easeNone
        })
        return tl;
    }

    static greenEyes(repeat = 1) {
        const tl = new TimelineMax({
            repeat: repeat,
            yoyo: true,
        });
        tl.to('.eye', 0.5, {
            fill: 'green',
            ease: Power0.easeNone
        })
        return tl;
    }

    static redMouth(repeat = 1) {
        const tl = new TimelineMax({
            repeat: repeat,
            yoyo: true,
        });
        tl.to('.mouth', 0.4, {
            fill: 'red',
            ease: Power0.easeNone
        })
        return tl;
    }

    static moveNose() {
        const tl = new TimelineMax({
            repeat: 1,
            yoyo: true
        });
        tl.to('.nose-full', 0.2, {
            y: -0.5,
            x: 0,
            ease: Power0.easeOut
        })
        return tl;
    }

    static growCat() {
        const tl = new TimelineMax({
            repeat: 1,
            yoyo: true,
        });
        tl.to('svg', 0.2, {
            transformOrigin: '50% 100%',
            scaleY: 1.5,
            ease: Power0.easeNone
        })
        return tl;
    }

    static moveCat() {
        const tl = new TimelineMax({
            repeat: 1,
            yoyo: true
        });
        tl.to('svg', 2.5, {
            x: '+=250',
            ease: Power0.easeNone
        })
        return tl;
    }

    static cryCat(eye) {
        const tl = new TimelineMax({
        });
        tl
            .set(eye, {
                opacity: 1,
                y: 0,
            })
            .to(eye, 1.5, {
                y: '+=50',
                ease: Power0.easeNone
            })
            .set(eye, {
                opacity: 0,
            })
        return tl;
    }

    static swingCat() {
        const tl = new TimelineMax({
            repeat: 6,
            ease: Power0.easeNone
        })
        tl
            .to('svg', .25, {
                rotation: -13,
            })
            .to('svg', .5, {
                rotation: 13,
            })
            .to('svg', .25, {
                rotation: 0,
            })
        return tl;
    }

    static finalDance() {
        const master = new TimelineMax();
        master.add('start')
        if ((window.matchMedia("(orientation: landscape)").matches) && (window.innerWidth > 767) && (window.innerHeight < 992)) {
            master.add(this.moveCat(), 'start');
        }
        master.add(this.rollEyes(11), 'start');
        master.add(this.redMouth(11), 'start');
        master.add(this.greenEyes(11), 'start');
        master.add(this.swingCat(), 'start');
        return master;
    }
}

const animations = [Animation.blinkEye, Animation.rollEyes, Animation.growEye, Animation.greenEyes, Animation.redMouth, Animation.moveNose, Animation.growCat];