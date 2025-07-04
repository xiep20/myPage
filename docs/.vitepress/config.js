export default {
    title: '谢平',
    description: 'WebGIS、前端与个人项目整理',
    themeConfig: {
      logo: '/logo.png', // 如有 logo 可替换
      nav: [
        { text: '首页', link: '/' },
        { text: '学习笔记', link: '/notes/' },
        { text: '个人项目', link: '/projects/' },
        { text: '关于我', link: '/about' }
      ],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/xiep20' }
      ],
      outline: {
        level: [2, 3, 4], // 或 'deep'
        label: '导航'
      },
      sidebar: {
        '/notes/': [
          {
            text: '学习笔记',
            items: [
              { text: '说明', link: '/notes/' },
              { text: 'GIS', items: [
                { text: 'cesium', link: '/notes/gis/cesium' },
                { text: 'leaflet', link: '/notes/gis/leaflet' },
                { text: 'openlayers', link: '/notes/gis/openlayers' },
                { text: 'mapboxgl', link: '/notes/gis/mapboxgl' },
                {text: 'ThreeJS', link: '/notes/gis/threejs'},
                {text: '其它', link: '/notes/gis/other'}
              ]},
              { text: '前端', items: [
                { text: 'HTML', link: '/notes/frontend/html' },
                { text: 'CSS', link: '/notes/frontend/css' },
                { text: 'JavaScript', link: '/notes/frontend/javascript' },
                { text: 'Vue', link: '/notes/frontend/vue' },
                { text: 'NodeJS', link: '/notes/frontend/nodejs' },
                {text: '其它', link: '/notes/frontend/other'}
              ] },
              {text: '可视化', items: [
                {text: 'Echarts', link: '/notes/visualization/echarts'},
                {text: 'D3', link: '/notes/visualization/d3'},
                {text: 'Echarts', link: '/notes/visualization/echarts'},
                {text: '动画', link: '/notes/visualization/animation'},
              ]},
              {text: '部署运维', items: [
                {text: 'docker', link: '/notes/deploy/docker'},
                {text: 'nginx', link: '/notes/deploy/nginx'},
                {text: 'linux', link: '/notes/deploy/linux'},
                {text: '其他', link: '/notes/deploy/other'},
              ]},
              {text: '其他语言', items: [
                {text: 'GO', link: '/notes/other/golang'},
                {text: 'Python', link: '/notes/other/python'},
              ]},
              {text: '其他', items: [
                {text: 'AI', link: '/notes/other/ai'},
                {text: '工具', link: '/notes/other/tools'},
              ]}
            ]
          }
        ],
        '/projects/': [
          {
            text: '个人项目',
            items: [
              { text: '示例项目', link: '/projects/' }
            ]
          }
        ]
      }
    }
  }
  