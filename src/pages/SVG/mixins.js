import gsap from 'gsap';

let defaultFun = () => {
  const iconPath = document.getElementsByClassName(`icon-path`); // 获取 path 标签
  for (let i = 0; i < iconPath.length; i++) {
    let path = iconPath[i];
    gsap.killTweensOf([path]);
    path.style.fill = '#fff';
    path.style.stroke = '#fff';
    path.style['stroke-dashoffset'] = 0;
    path.style['stroke-width'] = 10;
  }
}
const mixin = {
  watch: {
    $route: function (val) {
      defaultFun.call(this);
      this.play(`${val.name}`)
    },
  },
  mounted() {
    defaultFun.call(this);
    this.play(`${this.$route.name}`)
  },
  methods: {
    play(iconName) {
      const iconPath = document.getElementsByClassName(iconName); // 获取 path 标签
      for (let i = 0; i < iconPath.length; i++) {
        let path = iconPath[i];
        path.style.fill = '#545c64';
        path.style.stroke = '#ffd04b';
        path.style['stroke-width'] = 50;
        path.style['stroke-dashoffset'] = path.getTotalLength();
        path.style['stroke-dasharray'] = path.getTotalLength();
        gsap.to(path, {
          duration: 3,
          'stroke-dashoffset': 0,
          ease: 'none',
          onComplete: () => {
            gsap.to(path, {
              ease: 'none',
              duration: 1,
              fill: '#ffd04b',
              'stroke-width': 10,
            });
          },
        });
      }
    },
  },
}

export default mixin;