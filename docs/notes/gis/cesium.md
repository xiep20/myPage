# Cesium

Cesium 相关学习与资料整理。

<div style="background: linear-gradient(135deg,rgb(238, 238, 238) 0%,rgb(223, 223, 223) 100%); border-radius: 10px; padding: 5px 10px; margin-bottom: 12px; line-height: 1.5; box-shadow: 0 2px 8px rgba(230,126,34,0.08);">
  <a href="#" style="font-size: 1.8em; font-weight: bold; color: #2196F3; text-decoration: none; letter-spacing: 1px;">Globe3D for cesium</a><br/>
  <span style="font-size: 1.1em;">&nbsp;&nbsp;&nbsp;&nbsp;基于cesium进行二次封装的sdk，对cesium常用功能进行扩展，对地图初始化、各种在线离线服务加载、场景分析、可视化等效果进行封装，不修改cesium源码，需要先引入cesium。</span>
</div>

<div style="background: linear-gradient(135deg,rgb(238, 238, 238) 0%,rgb(223, 223, 223) 100%); border-radius: 10px; padding: 5px 10px; margin-bottom: 12px; line-height: 1.5; box-shadow: 0 2px 8px rgba(230,126,34,0.08);">
  <a href="#" style="font-size: 1.8em; font-weight: bold; color: #2196F3; text-decoration: none; letter-spacing: 1px;">GlobeWeb</a><br/>
  <span style="font-size: 1.1em;">&nbsp;&nbsp;&nbsp;&nbsp;基于cesium的三维开发示例平台，可快速构建跨浏览器、交互式的适应丰富应用场景的三维开放平台。</span>
</div>

<div style="background: linear-gradient(135deg,rgb(238, 238, 238) 0%,rgb(223, 223, 223) 100%); border-radius: 10px; padding: 5px 10px; margin-bottom: 12px; line-height: 1.5; box-shadow: 0 2px 8px rgba(230,126,34,0.08);">
  <a href="#" style="font-size: 1.8em; font-weight: bold; color: #2196F3; text-decoration: none; letter-spacing: 1px;">GlobeExplorer</a><br/>
  <span style="font-size: 1.1em;">&nbsp;&nbsp;&nbsp;&nbsp;基于cesium的三维基础平台框架，集成了常用的GIS相关功能，快速搭建三维可视化系统。</span>
</div>


## Cesium 学习知识点

日常知识点记录

### 二三维切换效果（cesium）

在cesium中实现二三维切换

**<font color="#2196F3">方案一：</font>** cesium直接切换模式
```js
// 获取场景实例
var scene = viewer.scene;
 
// 切换到2D模式
scene.mode = Cesium.SceneMode.SCENE2D;
 
// 切换到3D模式
scene.mode = Cesium.SceneMode.SCENE3D;
```

**<font color="#2196F3">方案二：</font>** 通过控制相机事件实现（viewer.scene.screenSpaceCameraController.tiltEventTypes）
```js
    getMapMode (newV, oldV) {
      const _self = this
      const primitives = this.viewer.scene.primitives._primitives
      if (newV === 3) {
        _self.addTerrain()
        for (let i = 0; i < primitives.length; i++) {
          if (primitives[i].isCesium3DTileset === true) {
            if (!primitives[i].show && primitives[i]._is23d) {
              primitives[i]._is23d = false
              primitives[i].show = true
            }
          }
        }
        this.viewer.scene.screenSpaceCameraController.tiltEventTypes = [
          Cesium.CameraEventType.RIGHT_DRAG,
          Cesium.CameraEventType.PINCH,
          {
            eventType: Cesium.CameraEventType.LEFT_DRAG,
            modifier: Cesium.KeyboardEventModifier.CTRL
          },
          {
            eventType: Cesium.CameraEventType.RIGHT_DRAG,
            modifier: Cesium.KeyboardEventModifier.CTRL
          }
        ]
        // this.viewer.scene.morphTo3D(0)
        this.viewer.camera.flyTo({
          destination: this.viewer.camera.position, // 经度、纬度、高度
          duration: 1,
          easingFunction: Cesium.EasingFunction.LINEAR_NONE,
          orientation: {
            heading: Cesium.Math.toRadians(0), // 绕垂直于地心的轴旋转
            pitch: Cesium.Math.toRadians(-90), // 绕纬度线旋转
            roll: Cesium.Math.toRadians(0) // 绕经度线旋转
          }
        })
      } else {
        this.viewer.camera.flyTo({
          destination: this.viewer.camera.position,
          duration: 1,
          easingFunction: Cesium.EasingFunction.LINEAR_NONE,
          orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-90),
            roll: Cesium.Math.toRadians(0)
          },
          complete: function complete () {
            for (let i = 0; i < primitives.length; i++) {
              if (primitives[i].isCesium3DTileset === true) {
                if (primitives[i].show) {
                  primitives[i]._is23d = true
                  primitives[i].show = false
                }
              }
            }
            _self.addTerrain()
            _self.viewer.scene.screenSpaceCameraController.tiltEventTypes = []
            // _self.viewer.scene.morphTo2D(0)
          }
        })
      }
    }
```




###  cesium大屏项目地图性能优化相关参数

```js
// 1. 地图性能优化参数配置
const mapConfig = {
  canvasScale: 1.0, // 画布缩放
  resolutionScale: 1.0, // 分辨率缩放
  highDynamicRange: false, // HDR
  tileCacheSize: 100, // 瓦片缓存
  targetFrameRate: 10, // 目标帧率，undefined表示无限制,尽可能以最高的帧率渲染场景
  requestRenderMode: false // 按需渲染， 如果为 true，则仅在需要时才会渲染帧，具体取决于场景中的变化。启用会减少应用程序的 CPU/GPU 使用率并在移动设备上使用更少的电池，但需要使用 Scene#requestRender 在此模式下显式渲染新帧。在对 API 的其他部分中的场景进行更改后，这在许多情况下是必要的
  // maximumRenderTimeChange: Infinity // 如果 requestRenderMode 为 true，则此值定义在请求渲染之前允许的模拟时间的最大变化
}

// Viewer初始化
const viewer = new Cesium.Viewer('cesiumContainer', {
  contextOptions: {
    webgl: {
      alpha: true,
      depth: true,
      stencil: true,
      antialias: true,
      premultipliedAlpha: true,
            preserveDrawingBuffer: true, // 通过canvas.toDataURL()实现截图需要将该项设置为true
            failIfMajorPerformanceCaveat: true
    },
    requestWebgl2: true // 是否使用webgl2
  },
  requestRenderMode: mapConfig.requestRenderMode,
  msaaSamples: 1,// 抗锯齿倍数，当使用webgl2时，此参数有效。值越高，越清晰。 推荐高配为2或者4，低配为1
  targetFrameRate: mapConfig.targetFrameRate,// cesium轮训的帧数。 默认为60， cpu高配时，建议设置为30， 低配时，建议设置为10. 此值越高，cpu消耗越大。
  useBrowserRecommendedResolution: false,// 指示是否使用浏览器推荐的分辨率, 默认值为true。 为false时会根据设备的devicePixelRatio乘以宽高来绘制地图，并更清晰，但是更消耗GPU和cpu
  selectionIndicator: false,
        animation: false, // 是否显示动画控件
        baseLayerPicker: true, // 是否显示图层选择控件
        imageryProviderViewModels: [],
        geocoder: false, // 是否显示地名查找控件
        timeline: false, // 是否显示时间线控件
        sceneModePicker: false, // 是否显示投影方式控件
        navigationHelpButton: false, // 是否显示帮助信息控件
        infoBox: false, // 是否显示点击要素之后显示的信息
  fullscreenButton: false
});

// 分辨率与画布缩放（选一个）
viewer.resolutionScale = mapConfig.resolutionScale;
viewer.canvas.width *= mapConfig.canvasScale;
viewer.canvas.height *= mapConfig.canvasScale;

// HDR与瓦片缓存
viewer.scene.highDynamicRange = mapConfig.highDynamicRange;
viewer.scene.globe.tileCacheSize = mapConfig.tileCacheSize;


if (window.vmOpts.highDynamicRange) this.viewer.scene.highDynamicRange = window.vmOpts.highDynamicRange
if (window.vmOpts.tileCacheSize) this.viewer.scene.globe.tileCacheSize = window.vmOpts.tileCacheSize
      
```

加载3dtiles倾斜参数设置
```js
  // 倾斜参数设置（默认）
  {
    showFS: false,
    showVS: false,
    dynamicScreenSpaceError: true, // 瓦片是否应根据动态屏幕空间误差进行细化。距离较远的瓦片将以较低的细节进行渲染。可能会导致远处的瓦片的视觉质量略有下降
    dynamicScreenSpaceErrorDensity: 0.00278, // 数值加大，能让周边加载变快 --- 用于调整动态屏幕空间误差的密度，类似于雾密度(默认0.00278)
    dynamicScreenSpaceErrorFactor: 4.0, // 用于增加计算的动态屏幕空间误差的因素(默认4.0)
    // dynamicScreenSpaceErrorFactorHeightFalloff: 0.25,
    dynamicScreenSpaceErrorHeightFalloff: 0.25, // --- 密度开始下降的瓦片集高度的比率(默认0.25)
    // foveatedScreenSpaceError: true, // --- 优化选项。通过暂时提高屏幕边缘周围图块的屏幕空间错误，优先加载屏幕中心的图块。一旦Cesium3DTileset#foveatedConeSize加载确定的屏幕中心的所有图块，屏幕空间错误就会恢复正常。(默认true)
    // foveatedConeSize: 0.1, // --- 优化选项。当Cesium3DTileset#foveatedScreenSpaceError为 true 时使用来控制决定延迟哪些图块的锥体大小。立即加载此圆锥内的瓷砖。圆锥外的瓷砖可能会根据它们在圆锥外的距离及其屏幕空间误差而延迟。这是由Cesium3DTileset#foveatedInterpolationCallback和控制的Cesium3DTileset#foveatedMinimumScreenSpaceErrorRelaxation。将此设置为 0.0 意味着圆锥将是由相机位置及其视图方向形成的线。将此设置为 1.0 意味着锥体包含相机的整个视野,禁用效果(默认0.1)
    // foveatedMinimumScreenSpaceErrorRelaxation: 0.0, // --- 优化选项。当Cesium3DTileset#foveatedScreenSpaceError为 true 时使用以控制中央凹锥之外的图块的起始屏幕空间误差松弛。屏幕空间错误将从 tileset 值开始Cesium3DTileset#maximumScreenSpaceError根据提供的Cesium3DTileset#foveatedInterpolationCallback.(默认0.0)
    // foveatedTimeDelay: 0.2, // ---优化选项。使用 whenCesium3DTileset#foveatedScreenSpaceError为 true 来控制在相机停止移动后延迟瓷砖开始加载之前等待的时间（以秒为单位）。此时间延迟可防止在相机移动时请求屏幕边缘周围的瓷砖。将此设置为 0.0 将立即请求任何给定视图中的所有图块。(默认0.2)
    skipLevelOfDetail: true, // --- 优化选项。确定是否应在遍历期间应用详细级别跳过(默认false)， 允许引擎在远离相机时渲染低分辨率瓦片，而在靠近相机时渲染高分辨率瓦片
    // baseScreenSpaceError: 1024, // --- When skipLevelOfDetailis true，在跳过详细级别之前必须达到的屏幕空间错误(默认1024)
    // immediatelyLoadDesiredLevelOfDetail: true,// --- 当skipLevelOfDetail是时true，只会下载满足最大屏幕空间错误的图块。忽略跳过因素，只加载所需的图块(默认false)
    // subdomains: window.aisleSplitScreen,
    useIndexDB: false, // 默认为false。是否使用indexdb存储已经下载的3dtiles瓦片，开启则会消耗更多的cpu资源，但是后续加载3dtiles的速度会变快。
    maximumMemoryUsage: 1024 * 1.5, // tileset可以使用的最大内存，内存分配变小有利于倾斜摄影数据回收，提升性能体验
    skipLevels: 3, // 当开启skipLevelOfDetail时，有效，默认跳过1级。
    workNum: 0, // 开启子线程的数量，默认值为0.为0时，使用主线程加载3dtiles。 cpu配置低时建议设置为0.
    skipScreenSpaceErrorFactor: 128, // --- 何时skipLevelOfDetail是true，定义要跳过的最小屏幕空间错误的乘数。与 一起使用skipLevels来确定要加载哪些图块(默认16)
    maximumScreenSpaceError: 24, // 用于驱动细节细化级别的最大屏幕空间误差(默认16)原128。(浏览器GPU进程被撑爆调大，数值加大，会让成像效果变模糊)
    loadSiblings: true, // 定是否始终在遍历期间下载可见瓦片的兄弟。如果为true则不会在已加载完后，自动从中心开始加载附近瓦片
    // cullWithChildrenBounds: true, // ---优化选项。是否使用子边界体积的并集来剔除瓦片（默认true）
    // cullRequestsWhileMoving: true, // ---优化选项。不要请求由于相机移动而在返回时可能未使用的图块。这种优化只适用于静止的瓦片集(默认true)
    cullRequestsWhileMovingMultiplier: 30, // 值越小能够更快的剔除 ---优化选项。移动时用于剔除请求的乘数。较大的是更积极的剔除，较小的较不积极的剔除(默认60)原10
    // preloadWhenHidden: true, // ---tileset.show时 预加载瓷砖false。加载图块，就好像图块集可见但不渲染它们(默认false)
    // preloadFlightDestinations: true, // ---优化选项。在相机飞行时在相机的飞行目的地预加载图块(默认true)
    // preferLeaves: true, // ---优化选项。最好先装载叶子(默认false)
    // subdomains: [
    // '172.0.0.1:8021',
    // '172.0.0.1:8024',
    // '172.0.0.1:8025',
    // '172.0.0.1:8026',
    // '172.0.0.1:8027',
    // ],
    progressiveResolutionHeightFraction: 0.3 // 数值偏于0能够让初始加载变得模糊 --- 这有助于在继续加载全分辨率图块的同时快速放下图块层(默认0.3)
    // customShader: new Cesium.CustomShader({ // 调整亮度
    //   lightingModel: Cesium.LightingModel.SIMPLE_PBR,
    //   fragmentShaderText: `
    //       void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
    //           material.diffuse = material.diffuse * 2.0;
    //       }`
    // })
  }
```



    
## Cesium 学习参考资料

- [Index - Cesium Documentation](https://cesium.com/learn/cesiumjs/ref-doc/)
- [Mars3D三维可视化平台 | 火星科技](http://mars3d.cn/)
- [cesium中文网 | 学习cesiumjs 的好地方--伐罗密](http://cesium.xin/)
- [GitHub - dvgis/cesium-map: Cesium 地图插件](https://github.com/dvgis/cesium-map) 