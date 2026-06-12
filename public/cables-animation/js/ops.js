"use strict";

var CABLES=CABLES||{};
CABLES.OPS=CABLES.OPS||{};

var Ops=Ops || {};
Ops.Gl=Ops.Gl || {};
Ops.Anim=Ops.Anim || {};
Ops.Gl.Meshes=Ops.Gl.Meshes || {};
Ops.Gl.Shader=Ops.Gl.Shader || {};



// **************************************************************
// 
// Ops.Gl.MainLoop_v2
// 
// **************************************************************

Ops.Gl.MainLoop_v2= class extends CABLES.Op 
{
static staticAttachments={};

constructor()
{
super(...arguments);
const op=this;
const staticAttachments=this.constructor.staticAttachments;
const attachments=op.attachments={};
const
    hdpi = op.inFloat("Max Pixel Density (DPR)", 2),
    fpsLimit = op.inValue("FPS Limit", 0),
    reduceFocusFPS = op.inValueBool("Reduce FPS unfocussed", false),
    clear = op.inValueBool("Transparent", false),
    active = op.inValueBool("Active", 1),
    inFocus = op.inValueBool("Focus canvas", 1),
    trigger = op.outTrigger("trigger"),
    width = op.outNumber("width"),
    height = op.outNumber("height"),
    outPixel = op.outNumber("Pixel Density");

op.onAnimFrame = render;
hdpi.onChange = updateHdpi;

const cgl = op.patch.cg = op.patch.cgl;
let rframes = 0;
let rframeStart = 0;
let timeOutTest = null;
let addedListener = false;
if (!op.patch.cgl) op.uiAttr({ "error": "No webgl cgl context" });

const identTranslate = vec3.create();
vec3.set(identTranslate, 0, 0, 0);
const identTranslateView = vec3.create();
vec3.set(identTranslateView, 0, 0, -2);

let firstTime = true;
let fsElement = null;
let winhasFocus = true;
let winVisible = true;
let lastFrame = -1;
let duplicate = 0;
window.addEventListener("blur", () => { winhasFocus = false; });
window.addEventListener("focus", () => { winhasFocus = true; });
document.addEventListener("visibilitychange", () => { winVisible = !document.hidden; });
if (CABLES.UI)gui.canvasManager.addCgContext(op.patch.cgl);

testMultiMainloop();

// op.patch.cgl.cgCanvas.forceAspect = 1.7777777;
op.patch.tempData.mainloopOp = this;

op.patch.cgl.canvas.classList.add("cablescontext");
op.patch.cgl.canvas.dataset.contextname = "cgl";
op.patch.cgl.canvas.dataset.api = "webgl";

if (CABLES.UI)gui.setLayout();

function updateHdpi()
{
    setPixelDensity();

    if (CABLES.UI)
    {
        if (hdpi.get() < 1)
            op.patch.cgl.canvas.style.imageRendering = "pixelated";
    }

    op.patch.cgl.updateSize();
    if (CABLES.UI) gui.setLayout();
}

active.onChange = function ()
{
    op.patch.removeOnAnimFrame(op);

    if (active.get())
    {
        op.setUiAttrib({ "extendTitle": "" });
        op.onAnimFrame = render;
        op.patch.addOnAnimFrame(op);
        op.log("adding again!");
    }
    else
    {
        op.setUiAttrib({ "extendTitle": "Inactive" });
    }
};

function getFpsLimit()
{
    if (reduceFocusFPS.get())
    {
        if (!winVisible) return 10;
        if (!winhasFocus) return 30;
    }

    return fpsLimit.get();
}

op.onDelete = function ()
{
    cgl.gl.clearColor(0, 0, 0.0, 0);
    cgl.gl.clear(cgl.gl.COLOR_BUFFER_BIT | cgl.gl.DEPTH_BUFFER_BIT);
};

function setPixelDensity()
{
    if (hdpi.get() != 0) op.patch.cgl.pixelDensity = Math.min(hdpi.get(), window.devicePixelRatio);
    else op.patch.cgl.pixelDensity = window.devicePixelRatio;
}

function render(time, frame, delta)
{
    if (frame === lastFrame)
    {
        if (duplicate < 10)console.warn("duplicate frame?!");
        duplicate++;
        return;
    }
    lastFrame = frame;

    if (!active.get()) return;
    if (cgl.aborted || cgl.canvas.clientWidth === 0 || cgl.canvas.clientHeight === 0) return;

    op.patch.cg = cgl;

    setPixelDensity();

    // if (hdpi.get())op.patch.cgl.pixelDensity = window.devicePixelRatio;

    const startTime = performance.now();

    op.patch.config.fpsLimit = getFpsLimit();

    if (cgl.canvasWidth == -1)
    {
        cgl.setCanvas(op.patch.config.glCanvasId);
        return;
    }

    if (cgl.canvasWidth != width.get() || cgl.canvasHeight != height.get())
    {
        width.set(cgl.canvasWidth / 1);
        height.set(cgl.canvasHeight / 1);
    }

    if (CABLES.now() - rframeStart > 1000)
    {
        CGL.fpsReport = CGL.fpsReport || [];
        if (op.patch.loading.getProgress() >= 1.0 && rframeStart !== 0)CGL.fpsReport.push(rframes);
        rframes = 0;
        rframeStart = CABLES.now();
    }
    cgl.lastShader = null;
    cgl.lastMesh = null;

    cgl.renderStart(cgl, identTranslate, identTranslateView);

    if (!clear.get()) cgl.gl.clearColor(0, 0, 0, 1);
    else cgl.gl.clearColor(0, 0, 0, 0);

    cgl.gl.clear(cgl.gl.COLOR_BUFFER_BIT | cgl.gl.DEPTH_BUFFER_BIT);

    trigger.trigger();

    if (cgl.lastMesh)cgl.lastMesh.unBind();

    if (CGL.Texture.previewTexture)
    {
        if (!CGL.Texture.texturePreviewer) CGL.Texture.texturePreviewer = new CGL.Texture.texturePreview(cgl);
        CGL.Texture.texturePreviewer.render(CGL.Texture.previewTexture);
    }
    cgl.renderEnd(cgl);

    op.patch.cg = null;

    if (!clear.get())
    {
        cgl.gl.clearColor(1, 1, 1, 1);
        cgl.gl.colorMask(false, false, false, true);
        cgl.gl.clear(cgl.gl.COLOR_BUFFER_BIT);
        cgl.gl.colorMask(true, true, true, true);
    }

    if (!cgl.tempData.phong)cgl.tempData.phong = {};
    rframes++;
    if (firstTime)
    {
        if (inFocus.get()) cgl.canvas.focus();
        firstTime = false;
    }

    outPixel.set(op.patch.cgl.pixelDensity);
    op.patch.cgl.profileData.profileMainloopMs = performance.now() - startTime;
}

function testMultiMainloop()
{
    clearTimeout(timeOutTest);
    timeOutTest = setTimeout(
        () =>
        {
            if (op.patch.getOpsByObjName(op.name).length > 1)
            {
                op.setUiError("multimainloop", "there should only be one mainloop op!");
                if (!addedListener)addedListener = op.patch.addEventListener("onOpDelete", testMultiMainloop);
            }
            else op.setUiError("multimainloop", null, 1);
        }, 500);
}

}
};






// **************************************************************
// 
// Ops.Anim.Timer_v2
// 
// **************************************************************

Ops.Anim.Timer_v2= class extends CABLES.Op 
{
static staticAttachments={};

constructor()
{
super(...arguments);
const op=this;
const staticAttachments=this.constructor.staticAttachments;
const attachments=op.attachments={};
const
    inSpeed = op.inValue("Speed", 1),
    playPause = op.inValueBool("Play", true),
    reset = op.inTriggerButton("Reset"),
    inSyncTimeline = op.inValueBool("Sync to timeline", false),
    outTime = op.outNumber("Time");

op.setPortGroup("Controls", [playPause, reset, inSpeed]);

const timer = new CABLES.Timer();
let lastTime = null;
let time = 0;
let syncTimeline = false;

playPause.onChange = setState;
setState();

function setState()
{
    if (playPause.get())
    {
        timer.play();
        op.patch.addOnAnimFrame(op);
    }
    else
    {
        timer.pause();
        op.patch.removeOnAnimFrame(op);
    }
}

reset.onTriggered = doReset;

function doReset()
{
    time = 0;
    lastTime = null;
    timer.setTime(0);
    outTime.set(0);
}

inSyncTimeline.onChange = function ()
{
    syncTimeline = inSyncTimeline.get();
    playPause.setUiAttribs({ "greyout": syncTimeline });
    reset.setUiAttribs({ "greyout": syncTimeline });
};

op.onAnimFrame = function (tt, frameNum, deltaMs)
{
    if (timer.isPlaying())
    {
        if (CABLES.overwriteTime !== undefined)
        {
            outTime.set(CABLES.overwriteTime * inSpeed.get());
        }
        else

        if (syncTimeline)
        {
            outTime.set(tt * inSpeed.get());
        }
        else
        {
            timer.update();

            const timerVal = timer.get();

            if (lastTime === null)
            {
                lastTime = timerVal;
                return;
            }

            const t = Math.abs(timerVal - lastTime);
            lastTime = timerVal;

            time += t * inSpeed.get();
            if (time != time)time = 0;
            outTime.set(time);
        }
    }
};

}
};






// **************************************************************
// 
// Ops.Gl.Shader.CustomShader_v2
// 
// **************************************************************

Ops.Gl.Shader.CustomShader_v2= class extends CABLES.Op 
{
static staticAttachments={};

constructor()
{
super(...arguments);
const op=this;
const staticAttachments=this.constructor.staticAttachments;
const attachments=op.attachments={};
const
    render = op.inTrigger("render"),
    fragmentShader = op.inStringEditor("Fragment Code"),
    vertexShader = op.inStringEditor("Vertex Code"),
    asMaterial = op.inValueBool("Use As Material", true),
    trigger = op.outTrigger("trigger"),
    outShader = op.outObject("Shader", null, "shader"),
    outErrors = op.outBool("Has Errors");

const texSlotOff = 7;
const cgl = op.patch.cgl;
const uniformInputs = [];
const uniformTextures = [];
const vectors = [];

op.toWorkPortsNeedToBeLinked(render);

fragmentShader.setUiAttribs({ "editorSyntax": "glsl" });
vertexShader.setUiAttribs({ "editorSyntax": "glsl" });

const shader = new CGL.Shader(cgl, "customshader", op);

shader.logError = false;
shader.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG", "MODULE_VERTEX_MODELVIEW"]);

op.setPortGroup("Source Code", [fragmentShader, vertexShader]);
op.setPortGroup("Options", [asMaterial]);

fragmentShader.set(CGL.Shader.getDefaultFragmentShader());
vertexShader.set(CGL.Shader.getDefaultVertexShader());

fragmentShader.onChange = vertexShader.onChange = function ()
{
    if (fragmentShader.isLinked() && !fragmentShader.get()) return;
    needsUpdate = true;
};

render.onTriggered = doRender;

let updateCount = 0;
let needsUpdate = true;
op.onLoadedValueSet = initDataOnLoad;

function initDataOnLoad(data)
{
    updateShader();
    if (!data) return;

    // set uniform values AFTER shader has been compiled and uniforms are extracted and uniform ports are created.
    for (let i = 0; i < uniformInputs.length; i++)
        for (let j = 0; j < data.portsIn.length; j++)
            if (uniformInputs[i] && uniformInputs[i].name == data.portsIn[j].name)
            {
                uniformInputs[i].set(data.portsIn[j].value);
                uniformInputs[i].deSerializeSettings(data.portsIn[j]);
            }
}

op.init = function ()
{
    updateShader();
};

function doRender()
{
    setVectorValues();
    if (needsUpdate)updateShader();
    if (asMaterial.get()) cgl.pushShader(shader);
    pushTextures();
    trigger.trigger();
    shader.popTextures();
    if (asMaterial.get()) cgl.popShader();
}

function pushTextures()
{
    for (let i = 0; i < uniformTextures.length; i++)
        if (uniformTextures[i] && uniformTextures[i].get() && uniformTextures[i].get().tex)
            shader.pushTexture(uniformTextures[i].uniform, uniformTextures[i].get().tex);
        else
            shader.pushTexture(uniformTextures[i], CGL.Texture.getEmptyTexture(cgl));
}

function bindTextures()// old - should be removed in next version ?
{
    for (let i = 0; i < uniformTextures.length; i++)
        if (uniformTextures[i] && uniformTextures[i].get() && uniformTextures[i].get().tex)
            cgl.setTexture(0 + i + texSlotOff, uniformTextures[i].get().tex);
}

function hasUniformInput(name)
{
    for (let i = 0; i < uniformInputs.length; i++) if (uniformInputs[i] && uniformInputs[i].name == name) return true;
    for (let i = 0; i < uniformTextures.length; i++) if (uniformTextures[i] && uniformTextures[i].name == name) return true;
    return false;
}

const tempMat4 = mat4.create();
const uniformNameBlacklist = [
    "modelMatrix",
    "viewMatrix",
    "normalMatrix",
    "mvMatrix",
    "projMatrix",
    "inverseViewMatrix",
    "camPos"
];

let countTexture = 0;
const foundNames = [];

function parseUniforms(src)
{
    const lblines = src.split("\n");
    const groupUniforms = [];

    for (let k = 0; k < lblines.length; k++)
    {
        const lines = lblines[k].split(";");

        for (let i = 0; i < lines.length; i++)
        {
            let words = lines[i].split(" ");

            for (let j = 0; j < words.length; j++) words[j] = (words[j] + "").trim();

            if (words[0] === "UNI" || words[0] === "uniform")
            {
                let varnames = words[2];
                if (words.length > 4) for (let j = 3; j < words.length; j++)varnames += words[j];

                words = words.filter(function (el) { return el !== ""; });
                const type = words[1];

                let names = [];
                if (varnames)
                {
                    names = [varnames];
                    if (varnames.indexOf(",") > -1) names = varnames.split(",");
                }

                for (let l = 0; l < names.length; l++)
                {
                    if (uniformNameBlacklist.indexOf(names[l]) > -1) continue;
                    const uniName = names[l].trim().replace(/\[\d+\]$/, "");

                    if (type === "float")
                    {
                        foundNames.push(uniName);
                        if (!hasUniformInput(uniName))
                        {
                            const arrayMatch = names[l].trim().match(/\[\d+\]$/);
                            if (arrayMatch)
                            {
                                const arrayLength = parseInt(arrayMatch[0].trim().slice(1, -1));

                                const newInput = op.inArray(uniName, []);
                                newInput.uniform = new CGL.Uniform(shader, "f[]", uniName, new Float32Array(arrayLength));
                                uniformInputs.push(newInput);
                                groupUniforms.push(newInput);

                                const vec = {
                                    "name": uniName,
                                    "num": arrayLength,
                                    "port": newInput,
                                    "uni": newInput.uniform,
                                    "changed": false
                                };
                                newInput.onChange = function () { this.changed = true; }.bind(vec);

                                vectors.push(vec);
                            }
                            else
                            {
                                const newInput = op.inFloat(uniName, 0);
                                newInput.uniform = new CGL.Uniform(shader, "f", uniName, newInput);
                                uniformInputs.push(newInput);
                                groupUniforms.push(newInput);
                            }
                        }
                    }
                    else if (type === "int")
                    {
                        foundNames.push(uniName);
                        if (!hasUniformInput(uniName))
                        {
                            const newInput = op.inInt(uniName, 0);
                            newInput.uniform = new CGL.Uniform(shader, "i", uniName, newInput);
                            uniformInputs.push(newInput);
                            groupUniforms.push(newInput);
                        }
                    }
                    else if (type === "bool")
                    {
                        foundNames.push(uniName);
                        if (!hasUniformInput(uniName))
                        {
                            const newInput = op.inBool(uniName, false);
                            newInput.uniform = new CGL.Uniform(shader, "b", uniName, newInput);
                            uniformInputs.push(newInput);
                            groupUniforms.push(newInput);
                        }
                    }
                    else if (type === "mat4")
                    {
                        foundNames.push(uniName);
                        if (!hasUniformInput(uniName))
                        {
                            const newInput = op.inArray(uniName, 0);
                            newInput.uniform = new CGL.Uniform(shader, "m4", uniName, newInput);
                            uniformInputs.push(newInput);
                            groupUniforms.push(newInput);

                            const vec = {
                                "name": uniName,
                                "num": 16,
                                "port": newInput,
                                "uni": newInput.uniform,
                                "changed": false
                            };
                            newInput.onChange = function () { this.changed = true; }.bind(vec);

                            vectors.push(vec);
                        }
                    }
                    else if (type === "sampler2D" || type === "samplerCube")
                    {
                        foundNames.push(uniName);
                        if (!hasUniformInput(uniName))
                        {
                            const newInputTex = op.inObject(uniName);

                            let uniType = "t";
                            if (type === "samplerCube")uniType = "tc";

                            newInputTex.uniform = new CGL.Uniform(shader, uniType, uniName, texSlotOff + uniformTextures.length);
                            uniformTextures.push(newInputTex);
                            groupUniforms.push(newInputTex);
                            newInputTex.set(CGL.Texture.getTempTexture(cgl));
                            newInputTex.on("change", (v, p) =>
                            {
                                if (!v)p.set(CGL.Texture.getTempTexture(cgl));
                            });
                            countTexture++;
                        }
                    }
                    else if (type === "vec3" || type === "vec2" || type === "vec4")
                    {
                        let num = 2;
                        if (type === "vec4")num = 4;
                        if (type === "vec3")num = 3;
                        foundNames.push(uniName + " X");
                        foundNames.push(uniName + " Y");
                        if (num > 2)foundNames.push(uniName + " Z");
                        if (num > 3)foundNames.push(uniName + " W");

                        if (!hasUniformInput(uniName + " X"))
                        {
                            const group = [];
                            const vec = {
                                "name": uniName,
                                "num": num,
                                "changed": false,
                            };
                            vectors.push(vec);
                            initVectorUniform(vec);

                            const newInputX = op.inFloat(uniName + " X", 0);
                            newInputX.onChange = function () { this.changed = true; }.bind(vec);
                            uniformInputs.push(newInputX);
                            group.push(newInputX);
                            vec.x = newInputX;

                            const newInputY = op.inFloat(uniName + " Y", 0);
                            newInputY.onChange = function () { this.changed = true; }.bind(vec);
                            uniformInputs.push(newInputY);
                            group.push(newInputY);
                            vec.y = newInputY;

                            if (num > 2)
                            {
                                const newInputZ = op.inFloat(uniName + " Z", 0);
                                newInputZ.onChange = function () { this.changed = true; }.bind(vec);
                                uniformInputs.push(newInputZ);
                                group.push(newInputZ);
                                vec.z = newInputZ;
                            }
                            if (num > 3)
                            {
                                const newInputW = op.inFloat(uniName + " W", 0);
                                newInputW.onChange = function () { this.changed = true; }.bind(vec);
                                uniformInputs.push(newInputW);
                                group.push(newInputW);
                                vec.w = newInputW;
                            }

                            op.setPortGroup(uniName, group);
                        }
                    }
                }
            }
        }
    }
    op.setPortGroup("uniforms", groupUniforms);
}

function updateShader()
{
    if (!shader) return;
    let manual = false;
    updateCount++;
    if (updateCount > 2)manual = true;

    // shader.bindTextures = bindTextures.bind(this);
    shader.setSource(vertexShader.get(), fragmentShader.get(), manual);

    if (cgl.glVersion == 1)
    {
        cgl.enableExtension("OES_standard_derivatives");
        // cgl.enableExtension('OES_texture_float');
        // cgl.enableExtension('OES_texture_float_linear');
        // cgl.enableExtension('OES_texture_half_float');
        // cgl.enableExtension('OES_texture_half_float_linear');

        shader.enableExtension("GL_OES_standard_derivatives");
    // shader.enableExtension("GL_OES_texture_float");
    // shader.enableExtension("GL_OES_texture_float_linear");
    // shader.enableExtension("GL_OES_texture_half_float");
    // shader.enableExtension("GL_OES_texture_half_float_linear");
    }

    countTexture = 0;
    foundNames.length = 0;

    parseUniforms(vertexShader.get());
    parseUniforms(fragmentShader.get());

    for (let j = 0; j < uniformTextures.length; j++)
        for (let i = 0; i < foundNames.length; i++)
            if (uniformTextures[j] && foundNames.indexOf(uniformTextures[j].name) == -1)
            {
                uniformTextures[j].remove();
                uniformTextures[j] = null;
            }

    for (let j = 0; j < uniformInputs.length; j++)
        for (let i = 0; i < foundNames.length; i++)
            if (uniformInputs[j] && foundNames.indexOf(uniformInputs[j].name) == -1)
            {
                uniformInputs[j].remove();
                uniformInputs[j] = null;
            }

    for (let j = 0; j < vectors.length; j++)
    {
        initVectorUniform(vectors[j]);
        vectors[j].changed = true;
    }

    for (let i = 0; i < uniformInputs.length; i++)
        if (uniformInputs[i] && uniformInputs[i].uniform) uniformInputs[i].uniform.needsUpdate = true;

    shader.compile();

    op.refreshParams();

    // outShader.set(null);
    outShader.setRef(shader);
    needsUpdate = false;

    if (shader.hasErrors()) op.setUiError("compile", "Shader has errors", 2, { "button": "show",
        "buttonCb": () =>
        {
            CABLES.UI.showShaderError(shader);
        } });
    else op.setUiError("compile", null);

    outErrors.set(shader.hasErrors());
}

function initVectorUniform(vec)
{
    if (vec.num == 2) vec.uni = new CGL.Uniform(shader, "2f", vec.name, [0, 0]);
    else if (vec.num == 3) vec.uni = new CGL.Uniform(shader, "3f", vec.name, [0, 0, 0]);
    else if (vec.num == 4) vec.uni = new CGL.Uniform(shader, "4f", vec.name, [0, 0, 0, 0]);
}

function setVectorValues()
{
    for (let i = 0; i < vectors.length; i++)
    {
        const v = vectors[i];
        if (v.changed)
        {
            if (v.num === 2) v.uni.setValue([v.x.get(), v.y.get()]);
            else if (v.num === 3) v.uni.setValue([v.x.get(), v.y.get(), v.z.get()]);
            else if (v.num === 4) v.uni.setValue([v.x.get(), v.y.get(), v.z.get(), v.w.get()]);
            else if (v.num > 4)
            {
                v.uni.setValue(v.port.get());
            }

            v.changed = false;
        }
    }
}

}
};






// **************************************************************
// 
// Ops.Gl.CanvasInfo_v3
// 
// **************************************************************

Ops.Gl.CanvasInfo_v3= class extends CABLES.Op 
{
static staticAttachments={};

constructor()
{
super(...arguments);
const op=this;
const staticAttachments=this.constructor.staticAttachments;
const attachments=op.attachments={};
const
    width = op.outNumber("CSS Width"),
    height = op.outNumber("CSS Height"),
    pixelRatio = op.outNumber("Pixel Ratio"),
    widthPixel = op.outNumber("Pixel Width"),
    heightPixel = op.outNumber("Pixel Height"),
    aspect = op.outNumber("Aspect Ratio"),
    landscape = op.outBool("Landscape"),
    outCanvasEle = op.outObject("Canvas", null, "element"),
    outCanvasParentEle = op.outObject("Canvas Parent", null, "element"),
    outResize = op.outTrigger("Resized");

let cgl = op.patch.cgl;
outCanvasEle.setRef(op.patch.cgl.canvas);
outCanvasParentEle.setRef(op.patch.cgl.canvas.parentElement);

cgl.on("resize", () =>
{
    outResize.trigger();
    update();
});

update();

function update()
{
    let div = 1;

    if (cgl.canvasHeight == 0)setTimeout(update, 100);

    height.set(cgl.canvasHeight / op.patch.cgl.pixelDensity);
    width.set(cgl.canvasWidth / op.patch.cgl.pixelDensity);

    widthPixel.set(cgl.canvasWidth);
    heightPixel.set(cgl.canvasHeight);

    pixelRatio.set(op.patch.cgl.pixelDensity); // window.devicePixelRatio

    aspect.set(cgl.canvasWidth / cgl.canvasHeight);
    landscape.set(cgl.canvasWidth > cgl.canvasHeight ? 1 : 0);
}

}
};






// **************************************************************
// 
// Ops.Gl.MediaRecorder_v2
// 
// **************************************************************

Ops.Gl.MediaRecorder_v2= class extends CABLES.Op 
{
static staticAttachments={};

constructor()
{
super(...arguments);
const op=this;
const staticAttachments=this.constructor.staticAttachments;
const attachments=op.attachments={};
const videoTypes = ["webm", "mp4", "x-matroska"];
const audioTypes = ["webm", "mp3", "x-matroska"];
const videoCodecs = ["vp9", "vp8", "avc1", "av1", "h265", "h264", "mpeg", "mp4a"];
const audioCodecs = ["opus", "pcm", "aac", "mp3", "ogg"];

const supportedVideos = getSupportedMimeTypes("video", videoTypes, videoCodecs, audioCodecs);

let startTime = 0;
let duration = 0;

function getSupportedMimeTypes(media, types, codecs, codecsB)
{
    const isSupported = MediaRecorder.isTypeSupported;
    const supported = [];

    types.forEach((type) =>
    {
        const mimeType = `${media}/${type}`;
        if (isSupported(mimeType))
            supported.push(mimeType);
    });

    types.forEach((type) =>
    {
        const mimeType = `${media}/${type}`;
        codecs.forEach((codec) =>
        {
            return [`${mimeType};codecs=${codec}`].forEach((variation) =>
            {
                if (isSupported(variation)) supported.push(variation);

                codecsB.forEach((codecB) =>
                {
                    return [`${mimeType};codecs=${codec},${codecB}`].forEach((eachVariation) =>
                    {
                        if (isSupported(eachVariation)) supported.push(eachVariation);
                    });
                });
            });
        });
    });
    return supported;
}

// /////////////////

const
    recordingToggle = op.inBool("Recording", false),

    inFilename = op.inString("Filename", "cables"),
    inDownl = op.inBool("Download Video", true),

    inCodecs = op.inDropDown("Mimetype", supportedVideos),
    inMbit = op.inFloat("MBit", 5),
    inFPSMax = op.inFloat("Max FPS", 30),
    inFPS = op.inFloat("Force FPS", 0),

    inMedia = op.inSwitch("Media", ["Video", "Audio", "Audio+Video"], "Video"),
    inAudio = op.inObject("Audio In", null, "audioNode"),

    inCanvasWhich = op.inSwitch("Canvas", ["Default", "By Id"], "Default"),
    inCanvasId = op.inString("Video Canvas Id", "glcanvas"),

    outState = op.outString("State"),
    outError = op.outString("Error"),
    outCodec = op.outString("Final Mimetype"),
    outCodecs = op.outArray("Valid Mimetypes", supportedVideos),
    outDuration = op.outNumber("Duration"),
    outFinished = op.outTrigger("Finished Recording"),

    outDataUrl = op.outString("Video DataUrl");

op.setPortGroup("Inputs", [inMedia, inAudio]);
op.setPortGroup("Canvas", [inCanvasId, inCanvasWhich]);
op.setPortGroup("Encoding", [inMbit, inCodecs, inFPS, inFPSMax]);

const gl = op.patch.cgl.gl;
let fb = null;
const cgl = op.patch.cgl;

let cgl_filter = 0;
let cgl_wrap = 0;
let tex = null;
let timeout = null;
let firstTime = true;
let mediaRecorder;
let recordedBlobs;
let sourceBuffer;

recordingToggle.onChange = toggleRecording;

inFPSMax.onChange =
    inFPS.onChange =
    inMbit.onChange =
    inMedia.onChange =
    inAudio.onChange =
    inCanvasId.onChange =
    inCanvasWhich.onChange =
    inCodecs.onChange = setupMediaRecorder;

op.patch.cgl.on("resize", () =>
{
    if (mediaRecorder && mediaRecorder.state === "active")mediaRecorder.stop();
    mediaRecorder = null;
});

setupMediaRecorder();

function handleDataAvailable(event)
{
    if (event.data && event.data.size > 0)
    {
        recordedBlobs.push(event.data);
    }
}

function toggleRecording()
{
    if (recordingToggle.get())
    {
        startTime = performance.now();
        startRecording();
    }
    else
    {
        duration = performance.now() - startTime;
        outDuration.set(duration);
        stopRecording();
    }
}

function setupMediaRecorder()
{
    outCodec.set("unknown");

    outState.set("");
    outCodec.set("");
    outError.set("");
    op.setUiError("constr", null);
    op.setUiError("audionoaudio", null);
    op.setUiError("nocanvas", null);
    mediaRecorder = null;

    if (inCodecs.get() === "" || inCodecs.get() === 0)
    {
        return;
    }

    let codec = inCodecs.get();

    if (supportedVideos.indexOf(codec) == -1)
    {
        codec = supportedVideos[0];
        op.logWarn("incompaticle codec, switching to first one:", codec);
    }

    let options = { "mimeType": codec, "videoBitsPerSecond": inMbit.get() * 1024 * 1024 };
    recordedBlobs = [];
    try
    {
        let canvas = op.patch.cgl.canvas;

        inCanvasId.setUiAttribs({ "greyout": inCanvasWhich.get() == "Default" });

        if (inCanvasWhich.get() == "By Id")
            canvas = document.getElementById(inCanvasId.get());

        if (!canvas)
        {
            op.setUiError("nocanvas", "canvas not found ");
            return;
        }
        canvas.getContext("2d");
        const streamVid = canvas.captureStream(inFPSMax.get());

        let stream = streamVid;
        if (inMedia.get() !== "Video")
        {
            const audioCtx = CABLES.WEBAUDIO.createAudioContext(op);
            const streamAudio = audioCtx.createMediaStreamDestination();

            if (!inAudio.get())
            {
                op.setUiError("audionoaudio", "no audio connected ");
                return;
            }
            inAudio.get().connect(streamAudio);

            if (inMedia.get() === "Audio+Video")stream = new MediaStream([...streamVid.getTracks(), ...streamAudio.stream.getTracks()]);
            else stream = streamAudio.stream ? streamAudio.stream : streamAudio;
        }

        mediaRecorder = new MediaRecorder(stream, options);
    }
    catch (err)
    {
        op.error(err);
        op.error("error mr constructor: ", err);
        outError.set(err.message);
        op.setUiError("contr", "MediaRecorder error: " + err.message);
    }
    if (mediaRecorder)
    {
        outState.set(mediaRecorder.state);
        outCodec.set(mediaRecorder.mimeType);
    }
    else
    {
        op.warn("no mediarecorder created...");
    }
}

// The nested try blocks will be simplified when Chrome 47 moves to Stable
function startRecording()
{
    if (!mediaRecorder)setupMediaRecorder();
    if (!mediaRecorder)
    {
        op.setUiError("noobj", "could not create mediarecorder, try setting all parameters");
        return;
    }

    recordedBlobs = [];

    op.setUiError("noobj", null);

    op.verbose("start recording: ", inCodecs.get());

    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(1000);
    outState.set(mediaRecorder.state);

    if (inFPS.get() != 0)
    {
        mediaRecorder.pause();
        interValRecording();
    }
    op.log("MediaRecorder started", mediaRecorder);
}

function interValRecording()
{
    if (mediaRecorder.state === "inactive") return;
    mediaRecorder.resume();

    setTimeout(
        () =>
        {
            if (mediaRecorder && mediaRecorder.state != "inactive") mediaRecorder.pause();
            interValRecording();
        }, 1000 / inFPS.get());
}

function stopRecording()
{
    if (!mediaRecorder)
    {
        // op.warn("cant stop no mediarecorder");
        return;
    }

    op.verbose("mediaRecorder.state", mediaRecorder.state);
    if (mediaRecorder.state === "inactive") return;

    // op.verbose("mediaRecorder.videoBitsPerSecond  ", mediaRecorder.videoBitsPerSecond / 1024 / 1024);
    // op.verbose("mediaRecorder.mimeType  ", mediaRecorder.mimeType);
    outCodec.set(mediaRecorder.mimeType);

    mediaRecorder.onstop = download;

    mediaRecorder.stop();
    outState.set(mediaRecorder.state);
    op.verbose("Recorded Blobs: ", recordedBlobs);
    // download();
}

function download()
{
    if (recordedBlobs.length === 0)
    {
        op.warn("download canceled, no recordedBlobs");
    }

    if (!mediaRecorder) return;

    const blob = new Blob(recordedBlobs, { "type": "application/octet-stream" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    const codec = mediaRecorder.mimeType;
    let ext = "webm";
    if (codec.indexOf("video/x-matroska") >= 0)ext = "mkv";
    if (codec.indexOf("video/mp4") >= 0)ext = "mp4";

    if (inDownl.get())
    {
        a.download = (inFilename.get() || "cables") + "." + ext;
        document.body.appendChild(a);
        a.click();
    }

    if (inDownl.get())
        setTimeout(() =>
        {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);

    outDataUrl.set(url);
    //     outBlobs.setRef({ "blob": blob, "duration": duration });
    // }
    outFinished.trigger();
}

}
};






// **************************************************************
// 
// Ops.Gl.Meshes.FullscreenRectangle_v2
// 
// **************************************************************

Ops.Gl.Meshes.FullscreenRectangle_v2= class extends CABLES.Op 
{
static staticAttachments={};

constructor()
{
super(...arguments);
const op=this;
const staticAttachments=this.constructor.staticAttachments;
const attachments=op.attachments={"shader_frag":"UNI sampler2D tex;\nIN vec2 texCoord;\n\nvoid main()\n{\n    outColor= texture(tex,texCoord);\n}\n\n","shader_vert":"{{MODULES_HEAD}}\n\nIN vec3 vPosition;\nUNI mat4 projMatrix;\nUNI mat4 mvMatrix;\n\nOUT vec2 texCoord;\nIN vec2 attrTexCoord;\n\nvoid main()\n{\n   vec4 pos=vec4(vPosition,  1.0);\n\n   texCoord=vec2(attrTexCoord.x,(1.0-attrTexCoord.y));\n\n   gl_Position = projMatrix * mvMatrix * pos;\n}\n",};
const
    render = op.inTrigger("render"),
    inScale = op.inSwitch("Scale", ["Stretch", "Fit"], "Fit"),
    flipY = op.inValueBool("Flip Y"),
    flipX = op.inValueBool("Flip X"),
    inTexture = op.inTexture("Texture"),
    trigger = op.outTrigger("trigger");

const cgl = op.patch.cgl;
let mesh = null;
let geom = new CGL.Geometry("fullscreen rectangle");
let x = 0, y = 0, w = 0, h = 0;

op.toWorkShouldNotBeChild("Ops.Gl.TextureEffects.ImageCompose", CABLES.OP_PORT_TYPE_FUNCTION);
op.toWorkPortsNeedToBeLinked(render);

flipX.onChange = rebuildFlip;
flipY.onChange = rebuildFlip;
render.onTriggered = doRender;
inTexture.onLinkChanged = updateUi;
inScale.onChange = updateScale;

const shader = new CGL.Shader(cgl, "fullscreenrectangle", this);
shader.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG"]);

shader.setSource(attachments.shader_vert, attachments.shader_frag);
shader.fullscreenRectUniform = new CGL.Uniform(shader, "t", "tex", 0);
shader.aspectUni = new CGL.Uniform(shader, "f", "aspectTex", 0);

let useShader = false;
let updateShaderLater = true;
let fitImageAspect = false;

updateUi();
updateScale();

inTexture.onChange = function ()
{
    updateShaderLater = true;
};

function updateUi()
{
    if (!CABLES.UI) return;
    flipY.setUiAttribs({ "greyout": !inTexture.isLinked() });
    flipX.setUiAttribs({ "greyout": !inTexture.isLinked() });
    inScale.setUiAttribs({ "greyout": !inTexture.isLinked() });
}

function updateShader()
{
    let tex = inTexture.get();
    if (tex) useShader = true;
    else useShader = false;
}

op.preRender = function ()
{
    updateShader();
    shader.bind();
    if (mesh)mesh.render(shader);
    doRender();
};

function updateScale()
{
    fitImageAspect = inScale.get() == "Fit";
}

function doRender()
{
    if (cgl.viewPort[2] != w || cgl.viewPort[3] != h || !mesh) rebuild();

    if (updateShaderLater) updateShader();

    cgl.pushPMatrix();
    mat4.identity(cgl.pMatrix);
    mat4.ortho(cgl.pMatrix, 0, w, h, 0, -10.0, 1000);

    cgl.pushModelMatrix();
    mat4.identity(cgl.mMatrix);

    cgl.pushViewMatrix();
    mat4.identity(cgl.vMatrix);

    if (fitImageAspect && inTexture.get())
    {
        const rat = inTexture.get().width / inTexture.get().height;

        let _h = h;
        let _w = h * rat;

        if (_w > w)
        {
            _h = w * 1 / rat;
            _w = w;
        }

        cgl.pushViewPort((w - _w) / 2, (h - _h) / 2, _w, _h);
    }

    if (useShader)
    {
        if (inTexture.get()) cgl.setTexture(0, inTexture.get().tex);
        mesh.render(shader);
    }
    else
    {
        mesh.render(cgl.getShader());
    }

    cgl.gl.clear(cgl.gl.DEPTH_BUFFER_BIT);

    cgl.popPMatrix();
    cgl.popModelMatrix();
    cgl.popViewMatrix();

    if (fitImageAspect && inTexture.get()) cgl.popViewPort();

    trigger.trigger();
}

function rebuildFlip()
{
    mesh = null;
}

function rebuild()
{
    if (cgl.viewPort[2] == w && cgl.viewPort[3] == h && mesh) return;

    let xx = 0, xy = 0;

    w = cgl.viewPort[2];
    h = cgl.viewPort[3];

    geom.vertices = new Float32Array([
        xx + w, xy + h, 0.0,
        xx, xy + h, 0.0,
        xx + w, xy, 0.0,
        xx, xy, 0.0
    ]);

    let tc = null;

    if (flipY.get())
        tc = new Float32Array([
            1.0, 0.0,
            0.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ]);
    else
        tc = new Float32Array([
            1.0, 1.0,
            0.0, 1.0,
            1.0, 0.0,
            0.0, 0.0
        ]);

    if (flipX.get())
    {
        tc[0] = 0.0;
        tc[2] = 1.0;
        tc[4] = 0.0;
        tc[6] = 1.0;
    }

    geom.setTexCoords(tc);

    geom.verticesIndices = new Uint16Array([
        2, 1, 0,
        3, 1, 2
    ]);

    geom.vertexNormals = new Float32Array([
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
    ]);
    geom.tangents = new Float32Array([
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0]);
    geom.biTangents == new Float32Array([
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0]);

    if (!mesh) mesh = new CGL.Mesh(cgl, geom);
    else mesh.setGeom(geom);
}

}
};






// **************************************************************
// 
// Ops.Gl.ClearColor
// 
// **************************************************************

Ops.Gl.ClearColor= class extends CABLES.Op 
{
static staticAttachments={};

constructor()
{
super(...arguments);
const op=this;
const staticAttachments=this.constructor.staticAttachments;
const attachments=op.attachments={};
const
    render = op.inTrigger("render"),
    trigger = op.outTrigger("trigger"),
    r = op.inFloatSlider("r", 0.1),
    g = op.inFloatSlider("g", 0.1),
    b = op.inFloatSlider("b", 0.1),
    a = op.inFloatSlider("a", 1);

r.setUiAttribs({ "colorPick": true });

const cgl = op.patch.cgl;

render.onTriggered = function ()
{
    cgl.gl.clearColor(r.get(), g.get(), b.get(), a.get());
    cgl.gl.clear(cgl.gl.COLOR_BUFFER_BIT | cgl.gl.DEPTH_BUFFER_BIT);
    trigger.trigger();
};

}
};





window.addEventListener('load', function(event) {
CABLES.jsLoaded=new Event('CABLES.jsLoaded');
document.dispatchEvent(CABLES.jsLoaded);
});
