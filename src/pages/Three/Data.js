import { Color } from 'three';
export const MapData = [
  {
    startArray: {
      name: '杭州',
      N: 30.246026,
      E: 120.210792,
    },
    endArray: [{
      name: '曼谷',
      N: 22, //维度
      E: 100.49074172973633, //经度
    },
    {
      name: '澳大利亚',
      N: -23.68477416688374,
      E: 133.857421875,
    },

    {
      name: '新疆维吾尔自治区',
      N: 41.748,
      E: 84.9023,
    },

    {
      name: '德黑兰',
      N: 35,
      E: 51,
    },
    {
      name: '美国',
      N: 34.125447565116126,
      E: 241.7431640625,
    },
    {
      name: '英国',
      N: 51.508742458803326,
      E: 359.82421875,
    },
    {
      name: '巴西',
      N: -9.96885060854611,
      E: 668.1445312499999,
    },
    ]
  },
  {
    startArray: {
      name: '北京',
      N: 39.89491,
      E: 116.322056,
    },
    endArray: [{
      name: '西藏',
      N: 29.660361, //维度
      E: 91.132212 //经度
    },
    {
      name: '广西',
      N: 22.830824,
      E: 108.30616
    },

    {
      name: '江西',
      N: 28.676493,
      E: 115.892151
    },
    {
      name: '贵阳',
      N: 26.647661,
      E: 106.630153
    }
    ]
  },
  {
    startArray: {
      name: '亚的斯亚贝巴',
      N: 9.514079262770891,
      E: 38.78173828125,
    },
    endArray: [{
      name: '罗安达',
      N: -8.754794702435605, //维度
      E: 13.3154296875 //经度
    },
    {
      name: '基苏木',
      N: -0.13183582116662093, //维度
      E: 34.716796875 //经度
    },
    {
      name: '卢萨卡',
      N: -15.47485740268724, //维度
      E: 28.27880859375 //经度
    },
    ]
  },
]
export const EarthUniforms = {
  glowColor: {
    value: new Color(0x0cd1eb),
  },
  scale: {
    type: 'f',
    value: -1.0,
  },
  bias: {
    type: 'f',
    value: 1.0,
  },
  power: {
    type: 'f',
    value: 3.3,
  },
  time: {
    type: 'f',
    value: 100,
  },
  isHover: {
    value: false,
  },
  map: {
    value: null,
  }
}
export const EarthVertexShader = [
  'varying vec2 vUv;',
  'varying vec3 vNormal;',
  'varying vec3 vp;',
  'varying vec3 vPositionNormal;',
  'void main(void){',
  'vUv = uv;',
  'vNormal = normalize( normalMatrix * normal );', // 转换到视图空间
  'vp = position;',
  'vPositionNormal = normalize(( modelViewMatrix * vec4(position, 1.0) ).xyz);',
  'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
  '}',
].join('\n');
export const EarthFragmentShader = [
  'uniform vec3 glowColor;',
  'uniform float bias;',
  'uniform float power;',
  'uniform float time;',
  'varying vec3 vp;',
  'varying vec3 vNormal;',
  'varying vec3 vPositionNormal;',
  'uniform float scale;',
  // 获取纹理
  'uniform sampler2D map;',
  // 纹理坐标
  'varying vec2 vUv;',

  'void main(void){',
  'float a = pow( bias + scale * abs(dot(vNormal, vPositionNormal)), power );',
  ' if(vp.y > time && vp.y < time + 20.0) {',
  'float t =  smoothstep(0.0, 0.8,  (1.0 - abs(0.5 - (vp.y - time) / 20.0)) / 3.0  );',
  'gl_FragColor = mix(gl_FragColor, vec4(glowColor, 1.0), t * t );',
  '}',
  'gl_FragColor = mix(gl_FragColor, vec4( glowColor, 1.0 ), a);',
  'float b = 0.8;',
  'gl_FragColor = gl_FragColor + texture2D( map, vUv );',
  '}',
].join('\n');
export const AeroSphereUniforms = {
  coeficient: {
    type: 'f',
    value: 1.0,
  },
  power: {
    type: 'f',
    value: 3,
  },
  glowColor: {
    type: 'c',
    value: new Color(0x4390d1),
  },
}
export const AeroSphereVertexShader = [
  'varying vec3	vVertexWorldPosition;',
  'varying vec3	vVertexNormal;',
  'varying vec4	vFragColor;',
  'void main(){',
  '	vVertexNormal	= normalize(normalMatrix * normal);', //将法线转换到视图坐标系中
  '	vVertexWorldPosition	= (modelMatrix * vec4(position, 1.0)).xyz;', //将顶点转换到世界坐标系中
  '	// set gl_Position',
  '	gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
  '}',
].join('\n');
export const AeroSphereFragmentShader = [
  'uniform vec3	glowColor;',
  'uniform float	coeficient;',
  'uniform float	power;',

  'varying vec3	vVertexNormal;',
  'varying vec3	vVertexWorldPosition;',

  'varying vec4	vFragColor;',

  'void main(){',
  '	vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;', //世界坐标系中从相机位置到顶点位置的距离
  '	vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;', //视图坐标系中从相机位置到顶点位置的距离
  '	viewCameraToVertex= normalize(viewCameraToVertex);', //规一化
  '	float intensity	= pow(coeficient + dot(vVertexNormal, viewCameraToVertex), power);',
  '	gl_FragColor = vec4(glowColor, intensity);',
  '}',
].join('\n');


