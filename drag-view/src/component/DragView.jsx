import React, { useEffect } from "react";

const DragView = ({ customStyle, children, offSetWidth = 40, offSetHeight = 50, imageUrl }) => {
    var mouseOffsetX = 0; // 记录当前鼠标位置
    var mouseOffsetY = 0;
    var isDraging = false; // 记录元素是否可以拖动
    useEffect(() => {
        moveListener();
    }, []);
    const moveListener = () => {
        // 鼠标事件1：鼠标按下标记元素为可拖动状态，并且记下鼠标当前位置的偏移
        get('move-button').addEventListener('mousedown', function (e) {
            var e = e || window.event;
            e.stopPropagation();
            e.preventDefault();
            // 鼠标距离div左侧偏移距离 =  e.pageX鼠标距离页面左侧距离 - get('move').offsetLeft为div距离页面左侧距离
            mouseOffsetX = e.pageX - get('move-view').offsetLeft;
            mouseOffsetY = e.pageY - get('move-view').offsetTop;
            isDraging = true;
        });
        // 移动端
        get('move-button').addEventListener('touchstart', function (e) {
            var e = e || window.event;
            e.stopPropagation();
            // 鼠标距离div左侧偏移距离 =  e.pageX鼠标距离页面左侧距离 - get('move').offsetLeft为div距离页面左侧距离
            mouseOffsetX = e.changedTouches[0].pageX - get('move-view').offsetLeft;
            mouseOffsetY = e.changedTouches[0].pageY - get('move-view').offsetTop;
            console.log('[moveListener][touchstart] offsetLeft:', get('move-view').offsetLeft);
            console.log('[moveListener][touchstart] offsetTop:', get('move-view').offsetTop);
            console.log('[moveListener][touchstart] mouseOffsetX:', mouseOffsetX);
            console.log('[moveListener][touchstart] mouseOffsetX:', mouseOffsetX);
            isDraging = true;
        });
        // 鼠标事件2：鼠标开始移动，要检测浮层是否标记为移动，如果是则更新元素位置到当前鼠标位置
        document.onmousemove = function (e) {
            var e = e || window.event;
            e.stopPropagation();
            var moveX = 0;
            var moveY = 0;
            if (isDraging === true) {
                // div左侧距离页面左侧距离 = e.pageX鼠标距离页面左侧距离 - mouseOffsetX鼠标距离div左侧偏移距离
                moveX = e.pageX - mouseOffsetX;
                moveY = e.pageY - mouseOffsetY;
                const width = window.innerWidth - offSetWidth;
                const height = window.innerHeight - offSetHeight;
                let currentX = moveX;
                let currentY = moveY;
                if (moveX < 0) {
                    currentX = 5;
                } else if (moveX > width) {
                    currentX = width;
                }
                if (moveY < 0) {
                    currentY = 5;
                } else if (moveY > height) {
                    currentY = height;
                }
                get('move-view').style.left = currentX + "px";
                get('move-view').style.top = currentY + "px";
            }
        }
        // 移动
        document.ontouchmove = function (e) {
            var e = e || window.event;
            e.stopPropagation();
            var moveX = 0;
            var moveY = 0;
            if (isDraging === true) {
                // div左侧距离页面左侧距离 = e.pageX鼠标距离页面左侧距离 - mouseOffsetX鼠标距离div左侧偏移距离
                moveX = e.changedTouches[0].pageX - mouseOffsetX;
                moveY = e.changedTouches[0].pageY - mouseOffsetY;
                const width = window.innerWidth - 35;
                const height = window.innerHeight - 235;
                let currentX = moveX;
                let currentY = moveY;
                if (moveX < 0) {
                    currentX = 5;
                } else if (moveX > width) {
                    currentX = width;
                }
                if (moveY < 0) {
                    currentY = 5;
                } else if (moveY > height) {
                    currentY = height;
                }
                get('move-view').style.left = currentX + "px";
                get('move-view').style.top = currentY + "px";
            }
        }

        //  鼠标事件3：放开鼠标后，元素变为不可拖动
        document.onmouseup = function () {
            isDraging = false;
        }
        // 移动端
        document.ontouchend = function () {
            isDraging = false;
        }
    }
    function get(id) {
        return document.getElementById(id)
    }
    return (
        <div id="move-view" style={{...styles.moveview, ...customStyle}}>
            <div id='move-button' style={styles.moveButton}>
                <img style={{ width: 30, height: 30 }} src={imageUrl} />
            </div>
            {children}
        </div>);
}

export default DragView;

const styles = {
    moveview: {
        width: 30,
        zIndex: 1,
        userSelect: 'none',
        background: '#121212',
    },
    moveButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 45,
        cursor: 'pointer',
        userSelect: 'none',
    }
}