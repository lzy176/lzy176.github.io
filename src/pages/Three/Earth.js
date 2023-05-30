import {
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  Mesh,
  MeshBasicMaterial,
  NormalBlending,
  Points,
  PointsMaterial,
  ShaderMaterial,
  SphereGeometry,
  Sprite,
  SpriteMaterial,
  TextureLoader,
  Vector3,
  DoubleSide,
  SphereBufferGeometry
} from 'three';
import html2canvas from 'html2canvas';
import { flyArc } from './arc';
import {
  MapData,
  EarthUniforms,
  EarthVertexShader,
  EarthFragmentShader,
  AeroSphereUniforms,
  AeroSphereVertexShader,
  AeroSphereFragmentShader
} from './Data';
import {
  createPointMesh,
  createLightPillar,
  createWaveMesh,
  lon2xyz,
  getCirclePoints,
  createAnimateLine
} from './common';
import gsap from 'gsap'
export default class Earth {
  constructor({ textures }) {
    this.textures = textures;
    this.group = new Group();
    this.group.name = 'group';
    this.group.scale.set(0, 0, 0)
    this.earthGroup = new Group();
    this.group.add(this.earthGroup);
    this.earthGroup.name = 'EarthGroup';

    // 标注点效果
    this.markupPoint = new Group();
    this.markupPoint.name = 'markupPoint';
    this.waveMeshArr = [];
    // 卫星和标签
    this.circleLineList = []
    this.circleList = [];
    this.x = 0;
    this.n = 0;
  }

  async init() {
    return new Promise(async (resolve) => {
      this.createEarth(); // 创建地球
      this.createPoint();
      this.createStars(); // 添加星星
      this.createEarthGlow() // 创建地球辉光
      this.createEarthAperture() // 创建地球的大气层
      await this.createMarkupPoint() // 创建柱状点位
      await this.createSpriteLabel() // 创建标签
      this.createAnimateCircle() // 创建环绕卫星
      this.createFlyLine() // 创建飞线
      this.show()
      resolve()
    })
  }
  // 创建地球
  createEarth() {
    const earth_geometry = new SphereGeometry(50, 50, 50);
    EarthUniforms.map.value = this.textures.earth;
    const earth_material = new ShaderMaterial({
      uniforms: EarthUniforms,
      vertexShader: EarthVertexShader,
      fragmentShader: EarthFragmentShader,
    });
    earth_material.needsUpdate = true;
    this.earth = new Mesh(earth_geometry, earth_material);
    this.earth.name = 'earth';
    this.earthGroup.add(this.earth);
  }
  createPoint() {
    const earth_border = new SphereGeometry(60, 60, 60);

    const pointMaterial = new PointsMaterial({
      color: 0x3796c5, //设置颜色，默认 0xFFFFFF
      transparent: true,//透明
      sizeAttenuation: true,//随相机深度衰减
      opacity: 0.3,
      vertexColors: false, //定义材料是否使用顶点颜色，默认false ---如果该选项设置为true，则color属性失效
      size: 0.5, //定义粒子的大小。默认为1.0
    });
    const points = new Points(earth_border, pointMaterial); //将模型添加到场景
    this.earthGroup.add(points);
  }
  createEarthGlow() {
    const R = 50; //地球半径

    // TextureLoader创建一个纹理加载器对象，可以加载图片作为纹理贴图
    const texture = this.textures.glow; // 加载纹理贴图

    // 创建精灵材质对象SpriteMaterial
    const spriteMaterial = new SpriteMaterial({
      map: texture, // 设置精灵纹理贴图
      color: 0x4390d1,
      transparent: true, //开启透明
      opacity: 1, // 可以通过透明度整体调节光圈
      depthWrite: false, //禁止写入深度缓冲区数据
    });

    // 创建表示地球光圈的精灵模型
    const sprite = new Sprite(spriteMaterial);
    sprite.scale.set(R * 3, R * 3, 1); //适当缩放精灵
    this.earthGroup.add(sprite);
  }
  createStars() {
    const vertices = [];
    const colors = [];
    for (let i = 0; i < 500; i++) {
      const vertex = new Vector3();
      vertex.x = 800 * Math.random() - 300;
      vertex.y = 800 * Math.random() - 300;
      vertex.z = 800 * Math.random() - 300;
      vertices.push(vertex.x, vertex.y, vertex.z);
      colors.push(new Color(1, 1, 1));
    }

    // 星空效果
    this.around = new BufferGeometry();
    this.around.setAttribute(
      'position',
      new BufferAttribute(new Float32Array(vertices), 3)
    );
    this.around.setAttribute(
      'color',
      new BufferAttribute(new Float32Array(colors), 3)
    );

    const aroundMaterial = new PointsMaterial({
      size: 2,
      sizeAttenuation: true, // 尺寸衰减
      color: 0x4d76cf,
      transparent: true,
      opacity: 1,
      map: this.textures.gradient,
    });

    this.aroundPoints = new Points(this.around, aroundMaterial);
    this.aroundPoints.name = '星空';
    this.aroundPoints.scale.set(1, 1, 1);
    this.group.add(this.aroundPoints);
  }
  createEarthAperture() {
    //球体 辉光 大气层
    const material1 = new ShaderMaterial({
      uniforms: AeroSphereUniforms,
      vertexShader: AeroSphereVertexShader,
      fragmentShader: AeroSphereFragmentShader,
      blending: NormalBlending,
      transparent: true,
      depthWrite: false,
    });
    const sphere = new SphereGeometry(50, 50, 50);
    const mesh = new Mesh(sphere, material1);
    this.earthGroup.add(mesh);
  }
  async createMarkupPoint() {
    await Promise.all(
      MapData.map(async (item) => {
        const radius = 50;
        const lon = item.startArray.E; //经度
        const lat = item.startArray.N; //纬度

        this.punctuationMaterial = new MeshBasicMaterial({
          color: 0x3892ff,
          map: this.textures.label,
          transparent: true, //使用背景透明的png贴图，注意开启透明计算
          depthWrite: false, //禁止写入深度缓冲区数据
        });

        const mesh = createPointMesh({
          radius,
          lon,
          lat,
          material: this.punctuationMaterial,
        }); //光柱底座矩形平面
        this.markupPoint.add(mesh);
        const LightPillar = createLightPillar({
          radius: 50,
          lon,
          lat,
          index: 0,
          textures: this.textures,
          punctuation: {
            circleColor: 0x3892ff,
            lightColumn: {
              startColor: 0xe4007f, // 起点颜色
              endColor: 0xffffff, // 终点颜色
            },
          },
        }); //光柱
        this.markupPoint.add(LightPillar);
        const WaveMesh = createWaveMesh({
          radius,
          lon,
          lat,
          textures: this.textures,
        }); //波动光圈
        this.markupPoint.add(WaveMesh);
        this.waveMeshArr.push(WaveMesh);

        await Promise.all(
          item.endArray.map((obj) => {
            const lon = obj.E; //经度
            const lat = obj.N; //纬度
            const mesh = createPointMesh({
              radius,
              lon,
              lat,
              material: this.punctuationMaterial,
            }); //光柱底座矩形平面
            this.markupPoint.add(mesh);
            const LightPillar = createLightPillar({
              radius: 50,
              lon,
              lat,
              index: 1,
              textures: this.textures,
              punctuation: {
                circleColor: 0x3892ff,
                lightColumn: {
                  startColor: 0xe4007f, // 起点颜色
                  endColor: 0xffffff, // 终点颜色
                },
              },
            }); //光柱
            this.markupPoint.add(LightPillar);
            const WaveMesh = createWaveMesh({
              radius,
              lon,
              lat,
              textures: this.textures,
            }); //波动光圈
            this.markupPoint.add(WaveMesh);
            this.waveMeshArr.push(WaveMesh);
          })
        );
        this.earthGroup.add(this.markupPoint);
      })
    );
  }
  async createSpriteLabel() {
    await Promise.all(
      MapData.map(async (item) => {
        let cityArry = [];
        cityArry.push(item.startArray);
        cityArry = cityArry.concat(...item.endArray);
        await Promise.all(
          cityArry.map(async (e) => {
            const p = lon2xyz(50 * 1.001, e.E, e.N);
            const shareContent =
              document.getElementById('html2canvas');
            shareContent.innerHTML = `${e.name}`;
            shareContent.style.opacity = '1';
            const opts = {
              backgroundColor: null, // 背景透明
              scale: 6,
              dpi: window.devicePixelRatio,
            };
            const canvas = await html2canvas(
              document.getElementById('html2canvas'),
              opts
            );
            const dataURL = canvas.toDataURL('image/png');
            const map = new TextureLoader().load(dataURL);
            const material = new SpriteMaterial({
              map: map,
              transparent: true,
            });
            const sprite = new Sprite(material);
            const len = 5 + (e.name.length - 2) * 2;
            sprite.scale.set(len, 3, 1);
            sprite.position.set(
              p.x * 1.1,
              p.y * 1.1,
              p.z * 1.1
            );
            this.earth.add(sprite);
          })
        );
      })
    );
  }
  createFlyLine() {
    this.flyLineArcGroup = new Group();
    this.flyLineArcGroup.userData['flyLineArray'] = [];
    this.earthGroup.add(this.flyLineArcGroup);

    MapData.forEach((cities) => {
      cities.endArray.forEach((item) => {
        // 调用函数flyArc绘制球面上任意两点之间飞线圆弧轨迹
        const arcline = flyArc(
          50,
          cities.startArray.E,
          cities.startArray.N,
          item.E,
          item.N,
          {
            color: 0xf3ae76, // 飞线的颜色
            flyLineColor: 0xff7714, // 飞行线的颜色
            speed: 0.004, // 拖尾飞线的速度
          }
        );

        this.flyLineArcGroup.add(arcline); // 飞线插入flyArcGroup中
        this.flyLineArcGroup.userData['flyLineArray'].push(
          arcline.userData['flyLine']
        );
      });
    });
  }
  createAnimateCircle() {
    // 创建 圆环 点
    const list = getCirclePoints({
      radius: 50 + 15,
      number: 150, //切割数
      closed: true, // 闭合
    });
    const mat = new MeshBasicMaterial({
      color: "#0c3172",
      transparent: true,
      opacity: 0.4,
      side: DoubleSide,
    });
    const line = createAnimateLine({
      pointList: list,
      material: mat,
      number: 100,
      radius: 0.1,
    });
    this.earthGroup.add(line);

    // 在clone两条线出来
    const l2 = line.clone();
    l2.scale.set(1.2, 1.2, 1.2);
    l2.rotateZ(Math.PI / 6);
    this.earthGroup.add(l2);

    const l3 = line.clone();
    l3.scale.set(0.8, 0.8, 0.8);
    l3.rotateZ(-Math.PI / 6);
    this.earthGroup.add(l3);

    /**
     * 旋转的球
     */
    const ball = new Mesh(
      new SphereBufferGeometry(1, 32, 32),
      new MeshBasicMaterial({
        color: "#e0b187", // 745F4D
      })
    );

    const ball2 = new Mesh(
      new SphereBufferGeometry(1, 32, 32),
      new MeshBasicMaterial({
        color: "#628fbb", // 324A62
      })
    );

    const ball3 = new Mesh(
      new SphereBufferGeometry(1, 32, 32),
      new MeshBasicMaterial({
        color: "#806bdf", //6D5AC4
      })
    );

    this.circleLineList.push(line, l2, l3);
    ball.name = ball2.name = ball3.name = "卫星";

    for (let i = 0; i < 2; i++) {
      const ball01 = ball.clone();
      // 一根线上总共有几个球，根据数量平均分布一下
      const num = Math.floor(list.length / 2)
      ball01.position.set(
        list[num * (i + 1)][0] * 1,
        list[num * (i + 1)][1] * 1,
        list[num * (i + 1)][2] * 1
      );
      line.add(ball01);

      const ball02 = ball2.clone();
      const num02 = Math.floor(list.length / 2)
      ball02.position.set(
        list[num02 * (i + 1)][0] * 1,
        list[num02 * (i + 1)][1] * 1,
        list[num02 * (i + 1)][2] * 1
      );
      l2.add(ball02);

      const ball03 = ball2.clone();
      const num03 = Math.floor(list.length / 2)
      ball03.position.set(
        list[num03 * (i + 1)][0] * 1,
        list[num03 * (i + 1)][1] * 1,
        list[num03 * (i + 1)][2] * 1
      );
      l3.add(ball03);
    }
  }

  show() {
    gsap.to(this.group.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 3,
      ease: "Quadratic",
      onComplete: () => {
      }
    })
  }

  render() {
    this.flyLineArcGroup.userData['flyLineArray'].forEach(fly => {
      fly.rotation.z += 0.004 // 调节飞线速度
      if (fly.rotation.z >= fly.flyEndAngle) fly.rotation.z = 0;
    })

    this.earthGroup.rotation.y += 0.003;

    this.circleLineList.forEach((e) => {
      e.rotateY(-0.01);
    });

    EarthUniforms.time.value =
      EarthUniforms.time.value < -100
        ? 100
        : EarthUniforms.time.value - 1;

    if (this.waveMeshArr.length) {
      this.waveMeshArr.forEach((mesh) => {
        mesh.userData['scale'] += 0.007;
        mesh.scale.set(
          mesh.userData['size'] * mesh.userData['scale'],
          mesh.userData['size'] * mesh.userData['scale'],
          mesh.userData['size'] * mesh.userData['scale']
        );
        if (mesh.userData['scale'] <= 1.5) {
          (mesh.material).opacity = (mesh.userData['scale'] - 1) * 2; //2等于1/(1.5-1.0)，保证透明度在0~1之间变化
        } else if (mesh.userData['scale'] > 1.5 && mesh.userData['scale'] <= 2) {
          (mesh.material).opacity = 1 - (mesh.userData['scale'] - 1.5) * 2; //2等于1/(2.0-1.5) mesh缩放2倍对应0 缩放1.5被对应1
        } else {
          mesh.userData['scale'] = 1;
        }
      });
    }

  }

}