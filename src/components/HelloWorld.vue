<template>
  <div class="home">
    <div class="left">
      <div class="left-main">
        <el-button type="info" @click="addLayers('文字')">文字</el-button>
        <el-button type="info" @click="addLayers('日期')">日期</el-button>
        <el-button type="info" @click="addLayers('图片')">图片</el-button>
        <el-select
          v-model="value"
          placeholder="请选择"
          style="margin-left: 10px"
        >
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="middle">
      <div
        class="middle-main"
        :style="{
          width: sceneWdith + 'px',
          height: sceneHeight + 'px',
        }"
      >
        <VueDragResize
          v-for="(rect, index) in rects"
          :key="index"
          :w="rect.width"
          :h="rect.height"
          :x="rect.left"
          :y="rect.top"
          :parentW="listWidth"
          :parentH="listHeight"
          :axis="rect.axis"
          :isActive="rect.active"
          :minw="rect.minw"
          :minh="rect.minh"
          :isDraggable="rect.draggable"
          :isResizable="rect.resizable"
          :parentLimitation="rect.parentLim"
          :snapToGrid="rect.snapToGrid"
          :aspectRatio="rect.aspectRatio"
          :z="rect.zIndex"
          :contentClass="rect.class"
          v-on:activated="activateEv(index)"
          v-on:deactivated="deactivateEv(index)"
          v-on:dragging="changePosition($event, index)"
          v-on:resizing="changeSize($event, index)"
        >
          <div v-if="rect.type == '图片'" style="width: 100%; height: 100%">
            <el-image
              :src="rect.img"
              style="width: 100%; height: 100%"
              fit="cover"
            >
            </el-image>
          </div>
          <div
            v-if="rect.type == '文字' || rect.type == '日期'"
            class="filler"
            :style="{ color: rect.color, background: rect.backGroundColor }"
          >
            {{ rect.text }}
          </div>
        </VueDragResize>
      </div>
    </div>
    <div class="right">
      <div class="right-main">
        <toolbar
          style="
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            margin: 0;
            background: #232539;
          "
        ></toolbar>
      </div>
    </div>
  </div>
</template>

<script>
import VueDragResize from "vue-drag-resize";
import toolbar from "./toolbar";
export default {
  name: "Home",
  components: { VueDragResize, toolbar },
  computed: {
    sceneWdith() {
      return this.value.split("*")[0];
    },
    sceneHeight() {
      return this.value.split("*")[1];
    },
    rects() {
      return this.$store.state.rect.rects;
    },
    listWidth() {
      return 100;
    },
    listHeight() {
      return 100;
    },
  },
  data() {
    return {
      flag: 2,
      value: "375*667",
      layers: [],
      options: ["375*667", "100*200", "400*600"],
    };
  },
  methods: {
    addLayers(type) {
      let date = new Date();
      let time =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();
      let layer = {
        width: 200,
        height: 150,
        top: 170,
        left: 10,
        draggable: true,
        resizable: true,
        minw: 10,
        minh: 10,
        axis: "both",
        parentLim: false,
        snapToGrid: false,
        aspectRatio: false,
        zIndex: 1,
        active: false,
      };
      if (type == "日期") {
        let useLayer = {
          ...layer,
          color: "#000",
          backGroundColor: "#81D4FA",
          text: time,
          type: "日期",
        };
        console.log("userLayer", useLayer);
        this.$store.commit("rect/CHANGE_LAYERS", { layer: useLayer });
      } else if (type == "文字") {
        let useLayer = {
          ...layer,
          color: "#000",
          backGroundColor: "#81D4FA",
          text: "文字",
          type: "文字",
        };
        console.log("userLayer", useLayer);
        this.$store.commit("rect/CHANGE_LAYERS", { layer: useLayer });
      } else if (type == "图片") {
        let useLayer = {
          ...layer,
          type: "图片",
          img:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        };
        console.log("userLayer", useLayer);
        this.$store.commit("rect/CHANGE_LAYERS", { layer: useLayer });
      }
    },

    activateEv(index) {
      this.$store.dispatch("rect/setActive", { id: index });
    },

    deactivateEv(index) {
      this.$store.dispatch("rect/unsetActive", { id: index });
    },

    changePosition(newRect, index) {
      this.$store.dispatch("rect/setTop", { id: index, top: newRect.top });
      this.$store.dispatch("rect/setLeft", { id: index, left: newRect.left });
      this.$store.dispatch("rect/setWidth", {
        id: index,
        width: newRect.width,
      });
      this.$store.dispatch("rect/setHeight", {
        id: index,
        height: newRect.height,
      });
    },

    changeSize(newRect, index) {
      this.$store.dispatch("rect/setTop", { id: index, top: newRect.top });
      this.$store.dispatch("rect/setLeft", { id: index, left: newRect.left });
      this.$store.dispatch("rect/setWidth", {
        id: index,
        width: newRect.width,
      });
      this.$store.dispatch("rect/setHeight", {
        id: index,
        height: newRect.height,
      });
    },
  },

  created() {
    //初始化编辑器
    // this.layers = this.$store.state.rect.rects;
  },
};
</script>

<style scoped lang="scss">
.home {
  display: flex;

  overflow: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  background: #232539;
}
.left {
  position: absolute;
  z-index: 2;
  display: flex;
  left: 0;
  top: 0;
  width: 20%;
  height: 100%;
  background: #232539;
  box-shadow: 0 0 2px #aaa;
  box-sizing: border-box;
}
.middle {
  position: absolute;
  left: 20%;
  top: 0;
  bottom: 0;
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #232539;
  z-index: 1;
  &-main {
    position: absolute;
    box-shadow: 0 0 2px #aaa;
    background-color: white;
  }
}
.right {
  position: absolute;
  right: 0;
  top: 0;
  width: 20%;
  height: 100%;
  background: gray;
  z-index: 2;
  &-main {
    position: absolute;
    box-shadow: 0 0 2px #aaa;
    width: 100%;
    height: 100%;
  }
}
.filler {
  width: 100%;
  height: 100%;
}
</style>
