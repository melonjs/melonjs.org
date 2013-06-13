/*
 * jToolBox JavaScript Library v0.4.0
 * or... my humble attempt to create a game/app framework :)
 *
 * Minified version
 *
 * Copyright (C) 2010, Olivier BIOT
 * http://olivierbiot.wordpress.com/
 * 
 */
(function(g,d){document=g.document;g.sys={mod:"jToolBox",ver:"0.4.0",ua:navigator.userAgent.toLowerCase(),sound:false,storage:false,gyro:(g.DeviceMotionEvent!==d),fps:60,scale:1,};var t={mp3:false,ogg:false,ma4:false,wav:false,};var p=false,n=false,k=[];function h(){if(!n){if(!document.body){setTimeout(h,10)}else{n=true;for(var u=0;u<k.length;u++){k[u].call(g,[])}k=[]}}}function s(){if(p){return}p=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",h,false)}g.addEventListener("load",h,false)}onReady=function(u){s();if(n){u.call(g,[])}else{k.push(function(){return u.call(g,[])})}return this};s();function r(){var u=document.createElement("audio");if(u.canPlayType){g.sys.sound=true;t.mp3=("no"!=u.canPlayType("audio/mpeg"))&&(""!=u.canPlayType("audio/mpeg"));t.ogg=("no"!=u.canPlayType('audio/ogg; codecs="vorbis"'))&&(""!=u.canPlayType('audio/ogg; codecs="vorbis"'));t.wav=("no"!=u.canPlayType('audio/wav; codecs="1"'))&&(""!=u.canPlayType('audio/wav; codecs="1"'))}if((g.sys.ua.search("iphone")>-1)||(g.sys.ua.search("ipod")>-1)||(g.sys.ua.search("ipad")>-1)){g.sys.sound=false}}g.onReady(function(){r()});var m={_canvas:null,_context2D:null,_backBufferCanvas:null,_backBufferContext2D:null,_wrapper:null,_double_buffering:false,_game_width_zoom:0,_game_height_zoom:0,_font:{image:null,size:-1,firstChar:-1},_framecount:0,_fps:0,_lastTime:null,_debug:false,_htmlFrameCounter:null,init:function(v,y,u,w,x){_double_buffering=w;g.sys.scale=_double_buffering===true?x:1;this._game_width_zoom=y*g.sys.scale;this._game_height_zoom=u*g.sys.scale;_wrapper=document.getElementById(v);_canvas=document.createElement("canvas");_canvas.setAttribute("width",(this._game_width_zoom)+"px");_canvas.setAttribute("height",(this._game_height_zoom)+"px");_canvas.setAttribute("border","0px solid black");_wrapper.appendChild(_canvas);if(_canvas.getContext){this._context2D=_canvas.getContext("2d");if(_double_buffering){this._backBufferContext2D=m.createCanvasSurface(y,u);this._backBufferCanvas=this._backBufferContext2D.canvas}else{this._backBufferContext2D=this._context2D}}else{return false}m._htmlFrameCounter=document.getElementById("framecounter");if(m._htmlFrameCounter!==null){this._debug=true;m._lastTime=new Date();m._fps=g.sys.fps}return true},getWrapper:function(){return _wrapper},createCanvasSurface:function(v,u){var w=document.createElement("canvas");w.width=v;w.height=u;return w.getContext("2d")},getScreenCanvas:function(){return _canvas},getScreenFrameBuffer:function(){return this._backBufferContext2D},updateDisplaySize:function(u){if(_double_buffering){if(u){g.sys.scale=u}else{g.sys.scale=document.getElementById("screen size").value}this._game_width_zoom=this._backBufferCanvas.width*g.sys.scale;this._game_height_zoom=this._backBufferCanvas.height*g.sys.scale;this._canvas.width=this._game_width_zoom;this._canvas.height=this._game_height_zoom}},clearSurface:function(v,u){v.fillStyle=u;v.fillRect(0,0,v.canvas.width,v.canvas.height)},scale:function(u,v){u.translate(-(((u.canvas.width*v)-u.canvas.width)>>1),-(((u.canvas.height*v)-u.canvas.height)>>1));u.scale(v,v)},setAlpha:function(v,u){v.globalCompositeOperation=u?"source-over":"copy"},blitSurface:function(){if(_double_buffering){this.blitSurface=function(){if(this._debug){this._fpsCount()}this._context2D.drawImage(this._backBufferCanvas,0,0,this._backBufferCanvas.width,this._backBufferCanvas.height,0,0,this._game_width_zoom,this._game_height_zoom)}}else{this.blitSurface=function(){if(this._debug){this._fpsCount()}}}this.blitSurface()},setFont:function(u,v,w){this._font.image=u;this._font.size=v;this._font.firstChar=w},setSystemFont:function(w,v,x,u){w.fillStyle=u;w.font=v;w.textBaseline=x},drawFont:function(z,u,C,B){var v=u;var A;for(var w=B.length;w--;){A=(B.charAt(w)*this._font.size)+this._font.firstChar;z.drawImage(this._font.image,A,0,this._font.size,this._font.image.height,v,C,this._font.size,this._font.image.height);v-=this._font.size}},_fpsCount:function(){var u=new Date();if((((u.getTime()-m._lastTime.getTime())>>0)+1)>=1000){m._fps=m._frameCount;m._frameCount=0;m._lastTime=u;m._htmlFrameCounter.innerHTML="("+m._fps+"/"+g.sys.fps+" fps)"}m._frameCount++}};if(!Function.bind){Function.prototype.bind=function(v){var u=this;return function(){return u.apply(v,arguments)}}}var c={random:function(v,u){return(~~(Math.random()*(u-v+1))+v)},round:function(u,w){var v=Math.pow(10,w);return(Math.round(u*v)/v)}};var i={_audio_channels:[],_supportedFormat:["mp3","ogg","wav"],_requestedFormat:null,_ActiveAudioExt:-1,_play_cb:null,_load_cb:null,sound_enable:true,init:function(u){if(u){this._requestedFormat=new String(u)}else{this._requestedFormat=new String("mp3")}if(!g.sys.sound){this.sound_enable=false}else{this._ActiveAudioExt=this.getSupportedAudioFormat()}},getSupportedAudioFormat:function(){var u=0;if((this._requestedFormat.search(/mp3/i)!=-1)&&t.mp3){return this._supportedFormat[u]}if((this._requestedFormat.search(/ogg/i)!=-1)&&t.ogg){return this._supportedFormat[++u]}if((this._requestedFormat.search(/wav/i)!=-1)&&t.wav){return this._supportedFormat[++u]}this.sound_enable=false;return -1},setLoadCallback:function(u){this._load_cb=u},soundLoadError:function(u){this._audio_channels[u][0].load()},soundLoaded:function(u,w){if(w>1){for(var v=1;v<w;v++){this._audio_channels[u].push(this._audio_channels[u][0].cloneNode(true))}}if(this._load_cb){this._load_cb()}},load:function(v){if(this._ActiveAudioExt==-1){return 0}var u=document.createElement("audio");u.autobuffer=true;u.preload="auto";u.onerror=function(){i.soundLoadError(v.name)};u.addEventListener("canplaythrough",function(){this.removeEventListener("canplaythrough",arguments.callee,false);i.soundLoaded(v.name,v.channel)},false);u.src=v.src+v.name+"."+this._ActiveAudioExt;u.load();this._audio_channels[v.name]=[u];return 1},stop:function(v){if(this.sound_enable){var w=this._audio_channels[v];for(var u=w.length;u--;){w[u].pause();w[u].currentTime=0}}},pause:function(v){if(this.sound_enable){var w=this._audio_channels[v];for(var u=w.length;u--;){w[u].pause()}}},play:function(x,w,z){if(this.sound_enable){var y=this._audio_channels[x];var v=0;for(var u=y.length;u--;){if(y[v].ended||y[v].pause){break}v++}y[v].currentTime=0;y[v].loop=w;y[v].play();if(z&&!w){i._play_cb=z;y[v].addEventListener("ended",function(A){this.removeEventListener("ended",arguments.callee,false);i._play_cb()},false)}}else{if(z&&!w){i._play_cb=z;setTimeout(i._play_cb(),2000)}}}};var f={_imageList:[],_ressourceCount:0,_loadCount:0,_loaded_cb:d,_timerId:0,preload:function(x,v,u,w){if(x){this.preloadImages(x)}if(v){this.preloadSounds(v)}if(u){this.preloadScripts(u)}f._loaded_cb=w;this.checkLoadStatus()},checkLoadStatus:function(){if(f._loadCount==f._ressourceCount){f._timerId=setTimeout(this._loaded_cb.bind(this),500)}else{f._timerId=setTimeout(this.checkLoadStatus.bind(this),100)}},ressourceLoaded:function(){f._loadCount++},preloadImages:function(u){for(var v=0;v<u.length;v++){f._imageList.push(u[v].name);f._imageList[u[v].name]=new Image();f._imageList[u[v].name].onload=this.onImageLoad.bind(this);f._imageList[u[v].name].onerror=this.onImageError.bind(this);f._imageList[u[v].name].src=u[v].src}f._ressourceCount+=u.length},onImageLoad:function(u){this.ressourceLoaded()},onImageError:function(u){console.log("Failing loading image")},preloadSounds:function(u){i.setLoadCallback(this.ressourceLoaded.bind(this));for(var v=0;v<u.length;v++){f._ressourceCount+=i.load(u[v])}},preloadScripts:function(u){for(var v=0;v<u.length;v++){var w=document.createElement("object");w.data=u[v];w.type="text/javascript";w.width=w.height=0;m._wrapper.appendChild(w)}f._ressourceCount+=u.length},getImageRessource:function(u){if(f._imageList!=null){return f._imageList[u]}else{console.log("warning %s ressource not yet loaded!",u);return null}},getLoadProgress:function(){return f._loadCount/f._ressourceCount}};function e(u,z,w){this.x=u;this.y=z;this.z=0;this.currentSpriteOff=0;this.scale_x=1;this.scale_y=1;this.spriteWidth=0;this.spriteHeight=0;this.scaleFlag=false;this.autodestroy=true;try{this.image=w;this.spriteWidth=this.image.width;this.spriteHeight=this.image.height}catch(v){}}e.prototype.flipX=function(u){if(u){this.scale_x=this.scale_x>0?-this.scale_x:this.scale_x}else{this.scale_x=this.scale_x<0?-this.scale_x:this.scale_x}this.scaleFlag=((this.scale_x!=1)||(this.scale_y!=1))};e.prototype.flipY=function(u){if(u){this.scale_y=this.scale_y>0?-this.scale_y:this.scale_y}else{this.scale_y=this.scale_y<0?-this.scale_y:this.scale_y}this.scaleFlag=((this.scale_x!=1)||(this.scale_y!=1))};e.prototype.draw=function(v){var u=this.x,w=this.y;if(this.scaleFlag){v.scale(this.scale_x,this.scale_y);u=(this.x*this.scale_x)-(this.scale_x<0?this.spriteWidth:0);w=(this.y*this.scale_y)-(this.scale_y<0?this.spriteHeight:0)}v.drawImage(this.image,this.currentSpriteOff,0,this.spriteWidth,this.spriteHeight,u,w,this.spriteWidth,this.spriteHeight);if(this.scaleFlag){v.setTransform(1,0,0,1,0,0)}};e.prototype.update=function(){return false};e.prototype.onDestroyEvent=function(){};e.prototype.destroy=function(){this.onDestroyEvent();if(this.autodestroy){this.image=null;l.remove(this)}};function o(u,z,v,w){e.call(this,u,z,v);this.type=0;this.currentSprite=0;this.collisionEnable=false;this.spritecount=w;this.fpscount=0;this.animationspeed=g.sys.fps/5;this.spriteWidth=this.spriteWidth/w;this.updateColRect(0.4,0.4);this.setCurrentSprite(0)}o.prototype=new e();o.prototype.setCurrentSprite=function(u){this.currentSprite=u;this.currentSpriteOff=this.spriteWidth*u};o.prototype.updateColRect=function(v,u){this.col_width=this.spriteWidth*v;this.col_height=this.spriteHeight*u;this.col_x_off=(this.spriteWidth-this.col_width)/2;this.col_y_off=(this.spriteHeight-this.col_height)/2};o.prototype.update=function(){if(this.fpscount++>this.animationspeed){this.setCurrentSprite(++this.currentSprite<this.spritecount?this.currentSprite:0);this.fpscount=0;return true}return false};o.prototype.collide=function(u){var w=u.y+u.col_y_off;var v=this.y+this.col_y_off;if(((w+u.col_height)<v)||(w>(v+this.col_height))){return l.NO_OBJECT}w=u.x+u.col_x_off;v=this.x+this.col_x_off;if(((w+u.col_width)<v)||(w>(v+this.col_width))){return l.NO_OBJECT}return this.type};var l={NO_OBJECT:0,ENEMY_OBJECT:1,COLLECTABLE_OBJECT:2,ACTION_OBJECT:3,gameObjects:[],parentCanvas:null,canvas_invalidated:true,registeredEventObj:[],init:function(v,u){this.spriteCanvasSurface=m.createCanvasSurface(v,u)},reset:function(){this.removeAll()},add:function(u,v){if(v){u.z=v}this.gameObjects.push(u);if((u).keyEvent){this.registeredEventObj.push(u)}},keyEvent:function(w,v){for(var u=this.registeredEventObj.length;u--;){this.registeredEventObj[u].keyEvent(w,v)}},update:function(){for(var u=this.gameObjects.length;u--;){if(this.gameObjects[u].update()){this.canvas_invalidated=true}}},remove:function(u){this.gameObjects.splice(this.gameObjects.indexOf(u),1);if(u.keyEvent){this.registeredEventObj.splice(this.registeredEventObj.indexOf(u),1)}},removeAll:function(){this.gameObjects=[];this.registeredEventObj=[]},sort:function(){this.gameObjects.sort(function(v,u){return(u.z-v.z)});this.canvas_invalidated=true},collide:function(v,A){var w=this.gameObjects;var u;for(var z=w.length;z--;){if(w[z].collisionEnable){u=w[z].collide(v,A);switch(u){case l.NO_OBJECT:break;case l.COLLECTABLE_OBJECT:w[z].destroy();return u;break;case l.ENEMY_OBJECT:return u;break}}}return u},draw:function(w,u,z){if(this.canvas_invalidated){for(var v=this.gameObjects.length;v--;){this.gameObjects[v].draw(this.spriteCanvasSurface)}this.canvas_invalidated=false;w.drawImage(this.spriteCanvasSurface.canvas,u,z)}}};function b(u,w,v){e.call(this,u,w,v);this.isClickable=true}b.prototype=new e();b.prototype.clicked=function(){};b.prototype.onMouseClick=function(u,v){if((u>this.xpos)&&(u<this.xpos+this.width)&&(v>this.ypos)&&(v<this.ypos+this.height)){if(this.isClickable){this.clicked()}return true}return false};function j(){this.tilewidth=0;this.tileheight=0;this.width=0;this.height=0;this.level=0;this.data=null;this.tileImage=null;this.mapCanvas=null;this.tileInvalidated=null;this.x_lookupTable=[];this.y_lookupTable=[];this.dirtyRect=false;this.init=function(C,B,v,A,w,z){this.tileImage=C;this.tilewidth=A;this.tileheight=w;this.width=B;this.height=v;for(var u=0;u<this.width*this.tilewidth;u++){this.x_lookupTable[u]=Math.floor(u/this.tilewidth)}for(var D=0;D<this.height*this.tileheight;D++){this.y_lookupTable[D]=Math.floor(D/this.tileheight)}if(z){this.dirtyRect=z}else{this.mapCanvas=m.createCanvasSurface(this.width*this.tilewidth,this.height*this.tileheight)}this.reset()},this.reset=function(){},this.update=function(){return false},this.setLevelData=function(A,v){var w;if(this.dirtyRect){if(this.tileInvalidated==null){this.tileInvalidated=[];this.data=[];for(var u=0;u<this.width;u++){this.tileInvalidated[u]=[];this.data[u]=[]}}for(var u=0;u<this.width;u++){for(var z=0;z<this.height;z++){this.tileInvalidated[u][z]=true}}}this.level=A;w=A*(this.height*this.width);for(var u=this.width;u--;){for(var z=this.height;z--;){if(this.tileInvalidated[u][z]==true){this.data[u][z]=v[w+(z*this.width)+u]}}}},this.getTile=function(u,v){return(this.data[this.x_lookupTable[u]][this.y_lookupTable[v]])},this.setTile=function(u,w,v){this.data[this.x_lookupTable[u]][this.y_lookupTable[w]]=v},this.invalidateTile=function(u,v){this.tileInvalidated[this.x_lookupTable[u]][this.y_lookupTable[v]]=true},this.drawTile=function(v,u,A,w){var z=g_level_desc.tileoffset[w]*this.tilewidth;v.drawImage(this.tileImage,z,0,this.tilewidth,this.tileheight,u*this.tilewidth,A*this.tileheight,this.tilewidth,this.tileheight)},this.draw=function(v){if(this.dirtyRect){for(var u=this.width;u--;){for(var w=this.height;w--;){if(this.tileInvalidated[u][w]==true){this.drawTile(v,u,w,this.data[u][w]);this.tileInvalidated[u][w]=false}}}}else{}}}function q(u){this.nextState=u;this.actionKey=13;this._frameBuffer=m.getScreenFrameBuffer();this.reset=function(){this.onResetEvent();l.reset();l.add(this)},this.destroy=function(){this.onDestroyEvent()};this.update=function(){return true},this.draw=function(v){},this.onUpdateFrame=function(){this.update();this.draw(this._frameBuffer);m.blitSurface()}}q.prototype.onResetEvent=function(){};q.prototype.onDestroyEvent=function(){};q.prototype.keyEvent=function(v,u){if((v==this.actionKey)&&u){a.setState(this.nextState)}};var a={STATE_LOADING:0,STATE_MENU:1,STATE_READY:2,STATE_PLAY:3,STATE_PAUSE:4,STATE_UNPAUSE:5,STATE_GAMEOVER:6,STATE_GAME_END:7,STATE_SCORE:8,_state:-1,_intervalId:-1,_kbEvent_cb:null,_mouseEvent_cb:null,_gyroEvent_cb:null,_screenObject:[null,null,null,null,null,null,null,null,null,],_loadingLogo:null,init:function(){this.setScreenObject(this.STATE_LOADING,this)},reset:function(){},destroy:function(){},setScreenObject:function(u,v){this._screenObject[u]=v},setSplashScreen:function(u){this._loadingLogo=new Image();this._loadingLogo.src=u},enableKeyboardEvent:function(u,v){document.onkeydown=function(w){a.onKeyEvent(w,true)};document.onkeyup=function(w){a.onKeyEvent(w,false)};this._kbEvent_cb=v},enableMouseEvent:function(u,v){m.getScreenCanvas().addEventListener("click",a.onMouseEvent,false);this._mouseEvent_cb=v},enableGyroscopicEvent:function(u,v){if(windows.sys.gyro){g.ondevicemotion=this.onGyroEvent.bind(this);this._gyroEvent_cb=v}},setState:function(u){switch(u){case this.STATE_PAUSE:this._state=u;clearInterval(this._intervalId);break;case this.STATE_UNPAUSE:this._state=this.STATE_PLAY;this._startMainLoop(this.STATE_PLAY);break;case this.STATE_LOADING:case this.STATE_MENU:case this.STATE_PLAY:case this.STATE_GAMEOVER:case this.STATE_GAME_END:case this.STATE_SCORE:if(this._intervalId!=-1){clearInterval(this._intervalId);this._screenObject[this._state].destroy()}this._screenObject[u].reset();this._startMainLoop(u);this._state=u;break;default:break}},_startMainLoop:function(u){this._intervalId=setInterval(this._screenObject[u].onUpdateFrame.bind(this._screenObject[u]),1000/g.sys.fps)},onMouseEvent:function(v){var u=v.clientX-m.getScreenCanvas().offsetLeft;var w=v.clientY-m.getScreenCanvas().offsetTop;this._mouseEvent_cb(u,w)},onKeyEvent:function(x,u){var v=false;switch(x.keyCode){case 38:case 40:case 37:case 39:case 88:case 32:case 13:v=true;this._kbEvent_cb(x.keyCode,u);break;case 80:v=true;var w=this._state;if(!u&&(w==this.STATE_PAUSE)){this.setState(this.STATE_UNPAUSE)}else{if(!u&&(w==this.STATE_PLAY)){this.setState(this.STATE_PAUSE)}}break;default:break}if(v){x.preventDefault();if(x.stopPropagation){x.stopPropagation()}x.cancelBubble=true}},onGyroEvent:function(u){},onUpdateFrame:function(){var u=m.getScreenFrameBuffer();var x=u.canvas.height/2;m.clearSurface(u,"black");if(this._loadingLogo){u.drawImage(this._loadingLogo,(u.canvas.width-this._loadingLogo.width)/2,(u.canvas.height-this._loadingLogo.height)/2);x+=this._loadingLogo.height/2+20}var v=Math.floor(f.getLoadProgress()*u.canvas.width);u.strokeStyle="gray";u.strokeRect(0,x,u.canvas.width,20);u.fillStyle="gray";u.fillRect(0,x,v,20);m.setSystemFont(u,"bold 14px Courier","top","white");var w=u.measureText("Loading...");u.fillText("Loading...",((u.canvas.width-w.width)/2),(x)+1);m.blitSurface()},};g.ScreenObject=q;g.SpriteObject=e;g.AnimatedSpriteObject=o;g.VideoMngr=m;g.RessourceMngr=f;g.SoundMngr=i;g.AppMngr=a;g.GameObjectMngr=l;g.BackgroundMap=j})(window);