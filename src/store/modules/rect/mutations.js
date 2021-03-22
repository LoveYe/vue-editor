import {
    ENABLE_ACTIVE,
    DISABLE_ACTIVE,
    ENABLE_ASPECT,
    DISABLE_ASPECT,
    ENABLE_DRAGGABLE,
    DISABLE_DRAGGABLE,
    ENABLE_RESIZABLE,
    DISABLE_RESIZABLE,
    ENABLE_PARENT_LIMITATION,
    DISABLE_PARENT_LIMITATION,
    ENABLE_SNAP_TO_GRID,
    DISABLE_SNAP_TO_GRID,
    CHANGE_ZINDEX,
    ENABLE_BOTH_AXIS,
    ENABLE_X_AXIS,
    ENABLE_Y_AXIS,
    ENABLE_NONE_AXIS,
    CHANGE_HEIGHT,
    CHANGE_LEFT,
    CHANGE_MINH,
    CHANGE_MINW,
    CHANGE_TOP,
    CHANGE_WIDTH,
    CHANGE_LAYERS,
    CHANGE_TEXT,
    CHANGE_COLOR,
    CHANGE_BG_TEXTCOLOR,
    DELETE_LAYER
} from './mutation-types';

export default {
    [ENABLE_ACTIVE](state, id) {
        state.rects[id].active = true;
    },
    [DISABLE_ACTIVE](state, id) {
        state.rects[id].active = false;
    },

    [ENABLE_ASPECT](state, id) {
        state.rects[id].aspectRatio = true;
    },
    [DISABLE_ASPECT](state, id) {
        state.rects[id].aspectRatio = false;
    },

    [ENABLE_DRAGGABLE](state, id) {
        state.rects[id].draggable = true;
    },
    [DISABLE_DRAGGABLE](state, id) {
        state.rects[id].draggable = false;
    },

    [ENABLE_RESIZABLE](state, id) {
        state.rects[id].resizable = true;
    },
    [DISABLE_RESIZABLE](state, id) {
        state.rects[id].resizable = false;
    },

    [ENABLE_SNAP_TO_GRID](state, id) {
        state.rects[id].snapToGrid = true;
    },
    [DISABLE_SNAP_TO_GRID](state, id) {
        state.rects[id].snapToGrid = false;
    },

    [ENABLE_BOTH_AXIS](state, id) {
        state.rects[id].axis = 'both';
    },
    [ENABLE_NONE_AXIS](state, id) {
        state.rects[id].axis = 'none';
    },
    [ENABLE_X_AXIS](state, id) {
        state.rects[id].axis = 'x';
    },
    [ENABLE_Y_AXIS](state, id) {
        state.rects[id].axis = 'y';
    },

    [ENABLE_PARENT_LIMITATION](state, id) {
        state.rects[id].parentLim = true;
    },
    [DISABLE_PARENT_LIMITATION](state, id) {
        state.rects[id].parentLim = false;
    },

    [CHANGE_ZINDEX](state, payload) {
        state.rects[payload.id].zIndex = payload.zIndex;
    },

    [CHANGE_HEIGHT](state, payload) {
        state.rects[payload.id].height = payload.height;
    },

    [CHANGE_WIDTH](state, payload) {
        state.rects[payload.id].width = payload.width;
    },

    [CHANGE_TOP](state, payload) {
        state.rects[payload.id].top = payload.top;
    },

    [CHANGE_LEFT](state, payload) {
        state.rects[payload.id].left = payload.left;
    },

    [CHANGE_MINH](state, payload) {

        state.rects[payload.id].minh = payload.minh;
    },

    [CHANGE_MINW](state, payload) {
        state.rects[payload.id].minw = payload.minw;
    },
    //添加试图
    [CHANGE_LAYERS](state, payload) {
        console.log('图层存储和删除 ---- ', payload);
        console.log('state ---- ', state.rects);
        state.rects.push(payload.layer)
    },
    //修改文字
    [CHANGE_TEXT](state, payload) {
        state.rects[payload.id].text = payload.text;
    },
    //修改文字
    [CHANGE_TEXT](state, payload) {
        state.rects[payload.id].text = payload.text;
    },
    //修改字体颜色
    [CHANGE_COLOR](state, payload) {
        console.log('字体颜色是',payload)
        state.rects[payload.id].color = payload.text;
    },
    //修改背景色
    [CHANGE_BG_TEXTCOLOR](state, payload) {
        state.rects[payload.id].backGroundColor = payload.text;
    },
    //删除
    [DELETE_LAYER](state, payload) {
        console.log('-------',state.rects , payload)
        state.rects =  state.rects.filter((item,index) => {
            return index != payload.id
        })
        
       
    },
    
    
};