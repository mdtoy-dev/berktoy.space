"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/lazysizes/lazysizes.js
  var require_lazysizes = __commonJS({
    "node_modules/lazysizes/lazysizes.js"(exports, module) {
      (function(window2, factory) {
        var lazySizes2 = factory(window2, window2.document, Date);
        window2.lazySizes = lazySizes2;
        if (typeof module == "object" && module.exports) {
          module.exports = lazySizes2;
        }
      })(
        typeof window != "undefined" ? window : {},
        /**
         * import("./types/global")
         * @typedef { import("./types/lazysizes-config").LazySizesConfigPartial } LazySizesConfigPartial
         */
        function l(window2, document2, Date2) {
          "use strict";
          var lazysizes, lazySizesCfg;
          (function() {
            var prop;
            var lazySizesDefaults = {
              lazyClass: "lazyload",
              loadedClass: "lazyloaded",
              loadingClass: "lazyloading",
              preloadClass: "lazypreload",
              errorClass: "lazyerror",
              //strictClass: 'lazystrict',
              autosizesClass: "lazyautosizes",
              fastLoadedClass: "ls-is-cached",
              iframeLoadMode: 0,
              srcAttr: "data-src",
              srcsetAttr: "data-srcset",
              sizesAttr: "data-sizes",
              //preloadAfterLoad: false,
              minSize: 40,
              customMedia: {},
              init: true,
              expFactor: 1.5,
              hFac: 0.8,
              loadMode: 2,
              loadHidden: true,
              ricTimeout: 0,
              throttleDelay: 125
            };
            lazySizesCfg = window2.lazySizesConfig || window2.lazysizesConfig || {};
            for (prop in lazySizesDefaults) {
              if (!(prop in lazySizesCfg)) {
                lazySizesCfg[prop] = lazySizesDefaults[prop];
              }
            }
          })();
          if (!document2 || !document2.getElementsByClassName) {
            return {
              init: function() {
              },
              /**
               * @type { LazySizesConfigPartial }
               */
              cfg: lazySizesCfg,
              /**
               * @type { true }
               */
              noSupport: true
            };
          }
          var docElem = document2.documentElement;
          var supportPicture = window2.HTMLPictureElement;
          var _addEventListener = "addEventListener";
          var _getAttribute = "getAttribute";
          var addEventListener = window2[_addEventListener].bind(window2);
          var setTimeout2 = window2.setTimeout;
          var requestAnimationFrame = window2.requestAnimationFrame || setTimeout2;
          var requestIdleCallback = window2.requestIdleCallback;
          var regPicture = /^picture$/i;
          var loadEvents = ["load", "error", "lazyincluded", "_lazyloaded"];
          var regClassCache = {};
          var forEach = Array.prototype.forEach;
          var hasClass = function(ele, cls) {
            if (!regClassCache[cls]) {
              regClassCache[cls] = new RegExp("(\\s|^)" + cls + "(\\s|$)");
            }
            return regClassCache[cls].test(ele[_getAttribute]("class") || "") && regClassCache[cls];
          };
          var addClass = function(ele, cls) {
            if (!hasClass(ele, cls)) {
              ele.setAttribute("class", (ele[_getAttribute]("class") || "").trim() + " " + cls);
            }
          };
          var removeClass = function(ele, cls) {
            var reg;
            if (reg = hasClass(ele, cls)) {
              ele.setAttribute("class", (ele[_getAttribute]("class") || "").replace(reg, " "));
            }
          };
          var addRemoveLoadEvents = function(dom, fn, add) {
            var action = add ? _addEventListener : "removeEventListener";
            if (add) {
              addRemoveLoadEvents(dom, fn);
            }
            loadEvents.forEach(function(evt) {
              dom[action](evt, fn);
            });
          };
          var triggerEvent = function(elem, name, detail, noBubbles, noCancelable) {
            var event = document2.createEvent("Event");
            if (!detail) {
              detail = {};
            }
            detail.instance = lazysizes;
            event.initEvent(name, !noBubbles, !noCancelable);
            event.detail = detail;
            elem.dispatchEvent(event);
            return event;
          };
          var updatePolyfill = function(el, full) {
            var polyfill;
            if (!supportPicture && (polyfill = window2.picturefill || lazySizesCfg.pf)) {
              if (full && full.src && !el[_getAttribute]("srcset")) {
                el.setAttribute("srcset", full.src);
              }
              polyfill({ reevaluate: true, elements: [el] });
            } else if (full && full.src) {
              el.src = full.src;
            }
          };
          var getCSS = function(elem, style) {
            return (getComputedStyle(elem, null) || {})[style];
          };
          var getWidth = function(elem, parent, width) {
            width = width || elem.offsetWidth;
            while (width < lazySizesCfg.minSize && parent && !elem._lazysizesWidth) {
              width = parent.offsetWidth;
              parent = parent.parentNode;
            }
            return width;
          };
          var rAF = function() {
            var running, waiting;
            var firstFns = [];
            var secondFns = [];
            var fns = firstFns;
            var run = function() {
              var runFns = fns;
              fns = firstFns.length ? secondFns : firstFns;
              running = true;
              waiting = false;
              while (runFns.length) {
                runFns.shift()();
              }
              running = false;
            };
            var rafBatch = function(fn, queue) {
              if (running && !queue) {
                fn.apply(this, arguments);
              } else {
                fns.push(fn);
                if (!waiting) {
                  waiting = true;
                  (document2.hidden ? setTimeout2 : requestAnimationFrame)(run);
                }
              }
            };
            rafBatch._lsFlush = run;
            return rafBatch;
          }();
          var rAFIt = function(fn, simple) {
            return simple ? function() {
              rAF(fn);
            } : function() {
              var that = this;
              var args = arguments;
              rAF(function() {
                fn.apply(that, args);
              });
            };
          };
          var throttle = function(fn) {
            var running;
            var lastTime = 0;
            var gDelay = lazySizesCfg.throttleDelay;
            var rICTimeout = lazySizesCfg.ricTimeout;
            var run = function() {
              running = false;
              lastTime = Date2.now();
              fn();
            };
            var idleCallback = requestIdleCallback && rICTimeout > 49 ? function() {
              requestIdleCallback(run, { timeout: rICTimeout });
              if (rICTimeout !== lazySizesCfg.ricTimeout) {
                rICTimeout = lazySizesCfg.ricTimeout;
              }
            } : rAFIt(function() {
              setTimeout2(run);
            }, true);
            return function(isPriority) {
              var delay;
              if (isPriority = isPriority === true) {
                rICTimeout = 33;
              }
              if (running) {
                return;
              }
              running = true;
              delay = gDelay - (Date2.now() - lastTime);
              if (delay < 0) {
                delay = 0;
              }
              if (isPriority || delay < 9) {
                idleCallback();
              } else {
                setTimeout2(idleCallback, delay);
              }
            };
          };
          var debounce = function(func) {
            var timeout, timestamp;
            var wait = 99;
            var run = function() {
              timeout = null;
              func();
            };
            var later = function() {
              var last = Date2.now() - timestamp;
              if (last < wait) {
                setTimeout2(later, wait - last);
              } else {
                (requestIdleCallback || run)(run);
              }
            };
            return function() {
              timestamp = Date2.now();
              if (!timeout) {
                timeout = setTimeout2(later, wait);
              }
            };
          };
          var loader = function() {
            var preloadElems, isCompleted, resetPreloadingTimer, loadMode, started;
            var eLvW, elvH, eLtop, eLleft, eLright, eLbottom, isBodyHidden;
            var regImg = /^img$/i;
            var regIframe = /^iframe$/i;
            var supportScroll = "onscroll" in window2 && !/(gle|ing)bot/.test(navigator.userAgent);
            var shrinkExpand = 0;
            var currentExpand = 0;
            var isLoading = 0;
            var lowRuns = -1;
            var resetPreloading = function(e2) {
              isLoading--;
              if (!e2 || isLoading < 0 || !e2.target) {
                isLoading = 0;
              }
            };
            var isVisible = function(elem) {
              if (isBodyHidden == null) {
                isBodyHidden = getCSS(document2.body, "visibility") == "hidden";
              }
              return isBodyHidden || !(getCSS(elem.parentNode, "visibility") == "hidden" && getCSS(elem, "visibility") == "hidden");
            };
            var isNestedVisible = function(elem, elemExpand) {
              var outerRect;
              var parent = elem;
              var visible = isVisible(elem);
              eLtop -= elemExpand;
              eLbottom += elemExpand;
              eLleft -= elemExpand;
              eLright += elemExpand;
              while (visible && (parent = parent.offsetParent) && parent != document2.body && parent != docElem) {
                visible = (getCSS(parent, "opacity") || 1) > 0;
                if (visible && getCSS(parent, "overflow") != "visible") {
                  outerRect = parent.getBoundingClientRect();
                  visible = eLright > outerRect.left && eLleft < outerRect.right && eLbottom > outerRect.top - 1 && eLtop < outerRect.bottom + 1;
                }
              }
              return visible;
            };
            var checkElements = function() {
              var eLlen, i3, rect, autoLoadElem, loadedSomething, elemExpand, elemNegativeExpand, elemExpandVal, beforeExpandVal, defaultExpand, preloadExpand, hFac;
              var lazyloadElems = lazysizes.elements;
              if ((loadMode = lazySizesCfg.loadMode) && isLoading < 8 && (eLlen = lazyloadElems.length)) {
                i3 = 0;
                lowRuns++;
                for (; i3 < eLlen; i3++) {
                  if (!lazyloadElems[i3] || lazyloadElems[i3]._lazyRace) {
                    continue;
                  }
                  if (!supportScroll || lazysizes.prematureUnveil && lazysizes.prematureUnveil(lazyloadElems[i3])) {
                    unveilElement(lazyloadElems[i3]);
                    continue;
                  }
                  if (!(elemExpandVal = lazyloadElems[i3][_getAttribute]("data-expand")) || !(elemExpand = elemExpandVal * 1)) {
                    elemExpand = currentExpand;
                  }
                  if (!defaultExpand) {
                    defaultExpand = !lazySizesCfg.expand || lazySizesCfg.expand < 1 ? docElem.clientHeight > 500 && docElem.clientWidth > 500 ? 500 : 370 : lazySizesCfg.expand;
                    lazysizes._defEx = defaultExpand;
                    preloadExpand = defaultExpand * lazySizesCfg.expFactor;
                    hFac = lazySizesCfg.hFac;
                    isBodyHidden = null;
                    if (currentExpand < preloadExpand && isLoading < 1 && lowRuns > 2 && loadMode > 2 && !document2.hidden) {
                      currentExpand = preloadExpand;
                      lowRuns = 0;
                    } else if (loadMode > 1 && lowRuns > 1 && isLoading < 6) {
                      currentExpand = defaultExpand;
                    } else {
                      currentExpand = shrinkExpand;
                    }
                  }
                  if (beforeExpandVal !== elemExpand) {
                    eLvW = innerWidth + elemExpand * hFac;
                    elvH = innerHeight + elemExpand;
                    elemNegativeExpand = elemExpand * -1;
                    beforeExpandVal = elemExpand;
                  }
                  rect = lazyloadElems[i3].getBoundingClientRect();
                  if ((eLbottom = rect.bottom) >= elemNegativeExpand && (eLtop = rect.top) <= elvH && (eLright = rect.right) >= elemNegativeExpand * hFac && (eLleft = rect.left) <= eLvW && (eLbottom || eLright || eLleft || eLtop) && (lazySizesCfg.loadHidden || isVisible(lazyloadElems[i3])) && (isCompleted && isLoading < 3 && !elemExpandVal && (loadMode < 3 || lowRuns < 4) || isNestedVisible(lazyloadElems[i3], elemExpand))) {
                    unveilElement(lazyloadElems[i3]);
                    loadedSomething = true;
                    if (isLoading > 9) {
                      break;
                    }
                  } else if (!loadedSomething && isCompleted && !autoLoadElem && isLoading < 4 && lowRuns < 4 && loadMode > 2 && (preloadElems[0] || lazySizesCfg.preloadAfterLoad) && (preloadElems[0] || !elemExpandVal && (eLbottom || eLright || eLleft || eLtop || lazyloadElems[i3][_getAttribute](lazySizesCfg.sizesAttr) != "auto"))) {
                    autoLoadElem = preloadElems[0] || lazyloadElems[i3];
                  }
                }
                if (autoLoadElem && !loadedSomething) {
                  unveilElement(autoLoadElem);
                }
              }
            };
            var throttledCheckElements = throttle(checkElements);
            var switchLoadingClass = function(e2) {
              var elem = e2.target;
              if (elem._lazyCache) {
                delete elem._lazyCache;
                return;
              }
              resetPreloading(e2);
              addClass(elem, lazySizesCfg.loadedClass);
              removeClass(elem, lazySizesCfg.loadingClass);
              addRemoveLoadEvents(elem, rafSwitchLoadingClass);
              triggerEvent(elem, "lazyloaded");
            };
            var rafedSwitchLoadingClass = rAFIt(switchLoadingClass);
            var rafSwitchLoadingClass = function(e2) {
              rafedSwitchLoadingClass({ target: e2.target });
            };
            var changeIframeSrc = function(elem, src) {
              var loadMode2 = elem.getAttribute("data-load-mode") || lazySizesCfg.iframeLoadMode;
              if (loadMode2 == 0) {
                elem.contentWindow.location.replace(src);
              } else if (loadMode2 == 1) {
                elem.src = src;
              }
            };
            var handleSources = function(source) {
              var customMedia;
              var sourceSrcset = source[_getAttribute](lazySizesCfg.srcsetAttr);
              if (customMedia = lazySizesCfg.customMedia[source[_getAttribute]("data-media") || source[_getAttribute]("media")]) {
                source.setAttribute("media", customMedia);
              }
              if (sourceSrcset) {
                source.setAttribute("srcset", sourceSrcset);
              }
            };
            var lazyUnveil = rAFIt(function(elem, detail, isAuto, sizes, isImg) {
              var src, srcset, parent, isPicture, event, firesLoad;
              if (!(event = triggerEvent(elem, "lazybeforeunveil", detail)).defaultPrevented) {
                if (sizes) {
                  if (isAuto) {
                    addClass(elem, lazySizesCfg.autosizesClass);
                  } else {
                    elem.setAttribute("sizes", sizes);
                  }
                }
                srcset = elem[_getAttribute](lazySizesCfg.srcsetAttr);
                src = elem[_getAttribute](lazySizesCfg.srcAttr);
                if (isImg) {
                  parent = elem.parentNode;
                  isPicture = parent && regPicture.test(parent.nodeName || "");
                }
                firesLoad = detail.firesLoad || "src" in elem && (srcset || src || isPicture);
                event = { target: elem };
                addClass(elem, lazySizesCfg.loadingClass);
                if (firesLoad) {
                  clearTimeout(resetPreloadingTimer);
                  resetPreloadingTimer = setTimeout2(resetPreloading, 2500);
                  addRemoveLoadEvents(elem, rafSwitchLoadingClass, true);
                }
                if (isPicture) {
                  forEach.call(parent.getElementsByTagName("source"), handleSources);
                }
                if (srcset) {
                  elem.setAttribute("srcset", srcset);
                } else if (src && !isPicture) {
                  if (regIframe.test(elem.nodeName)) {
                    changeIframeSrc(elem, src);
                  } else {
                    elem.src = src;
                  }
                }
                if (isImg && (srcset || isPicture)) {
                  updatePolyfill(elem, { src });
                }
              }
              if (elem._lazyRace) {
                delete elem._lazyRace;
              }
              removeClass(elem, lazySizesCfg.lazyClass);
              rAF(function() {
                var isLoaded = elem.complete && elem.naturalWidth > 1;
                if (!firesLoad || isLoaded) {
                  if (isLoaded) {
                    addClass(elem, lazySizesCfg.fastLoadedClass);
                  }
                  switchLoadingClass(event);
                  elem._lazyCache = true;
                  setTimeout2(function() {
                    if ("_lazyCache" in elem) {
                      delete elem._lazyCache;
                    }
                  }, 9);
                }
                if (elem.loading == "lazy") {
                  isLoading--;
                }
              }, true);
            });
            var unveilElement = function(elem) {
              if (elem._lazyRace) {
                return;
              }
              var detail;
              var isImg = regImg.test(elem.nodeName);
              var sizes = isImg && (elem[_getAttribute](lazySizesCfg.sizesAttr) || elem[_getAttribute]("sizes"));
              var isAuto = sizes == "auto";
              if ((isAuto || !isCompleted) && isImg && (elem[_getAttribute]("src") || elem.srcset) && !elem.complete && !hasClass(elem, lazySizesCfg.errorClass) && hasClass(elem, lazySizesCfg.lazyClass)) {
                return;
              }
              detail = triggerEvent(elem, "lazyunveilread").detail;
              if (isAuto) {
                autoSizer.updateElem(elem, true, elem.offsetWidth);
              }
              elem._lazyRace = true;
              isLoading++;
              lazyUnveil(elem, detail, isAuto, sizes, isImg);
            };
            var afterScroll = debounce(function() {
              lazySizesCfg.loadMode = 3;
              throttledCheckElements();
            });
            var altLoadmodeScrollListner = function() {
              if (lazySizesCfg.loadMode == 3) {
                lazySizesCfg.loadMode = 2;
              }
              afterScroll();
            };
            var onload = function() {
              if (isCompleted) {
                return;
              }
              if (Date2.now() - started < 999) {
                setTimeout2(onload, 999);
                return;
              }
              isCompleted = true;
              lazySizesCfg.loadMode = 3;
              throttledCheckElements();
              addEventListener("scroll", altLoadmodeScrollListner, true);
            };
            return {
              _: function() {
                started = Date2.now();
                lazysizes.elements = document2.getElementsByClassName(lazySizesCfg.lazyClass);
                preloadElems = document2.getElementsByClassName(lazySizesCfg.lazyClass + " " + lazySizesCfg.preloadClass);
                addEventListener("scroll", throttledCheckElements, true);
                addEventListener("resize", throttledCheckElements, true);
                addEventListener("pageshow", function(e2) {
                  if (e2.persisted) {
                    var loadingElements = document2.querySelectorAll("." + lazySizesCfg.loadingClass);
                    if (loadingElements.length && loadingElements.forEach) {
                      requestAnimationFrame(function() {
                        loadingElements.forEach(function(img) {
                          if (img.complete) {
                            unveilElement(img);
                          }
                        });
                      });
                    }
                  }
                });
                if (window2.MutationObserver) {
                  new MutationObserver(throttledCheckElements).observe(docElem, { childList: true, subtree: true, attributes: true });
                } else {
                  docElem[_addEventListener]("DOMNodeInserted", throttledCheckElements, true);
                  docElem[_addEventListener]("DOMAttrModified", throttledCheckElements, true);
                  setInterval(throttledCheckElements, 999);
                }
                addEventListener("hashchange", throttledCheckElements, true);
                ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(name) {
                  document2[_addEventListener](name, throttledCheckElements, true);
                });
                if (/d$|^c/.test(document2.readyState)) {
                  onload();
                } else {
                  addEventListener("load", onload);
                  document2[_addEventListener]("DOMContentLoaded", throttledCheckElements);
                  setTimeout2(onload, 2e4);
                }
                if (lazysizes.elements.length) {
                  checkElements();
                  rAF._lsFlush();
                } else {
                  throttledCheckElements();
                }
              },
              checkElems: throttledCheckElements,
              unveil: unveilElement,
              _aLSL: altLoadmodeScrollListner
            };
          }();
          var autoSizer = function() {
            var autosizesElems;
            var sizeElement = rAFIt(function(elem, parent, event, width) {
              var sources, i3, len;
              elem._lazysizesWidth = width;
              width += "px";
              elem.setAttribute("sizes", width);
              if (regPicture.test(parent.nodeName || "")) {
                sources = parent.getElementsByTagName("source");
                for (i3 = 0, len = sources.length; i3 < len; i3++) {
                  sources[i3].setAttribute("sizes", width);
                }
              }
              if (!event.detail.dataAttr) {
                updatePolyfill(elem, event.detail);
              }
            });
            var getSizeElement = function(elem, dataAttr, width) {
              var event;
              var parent = elem.parentNode;
              if (parent) {
                width = getWidth(elem, parent, width);
                event = triggerEvent(elem, "lazybeforesizes", { width, dataAttr: !!dataAttr });
                if (!event.defaultPrevented) {
                  width = event.detail.width;
                  if (width && width !== elem._lazysizesWidth) {
                    sizeElement(elem, parent, event, width);
                  }
                }
              }
            };
            var updateElementsSizes = function() {
              var i3;
              var len = autosizesElems.length;
              if (len) {
                i3 = 0;
                for (; i3 < len; i3++) {
                  getSizeElement(autosizesElems[i3]);
                }
              }
            };
            var debouncedUpdateElementsSizes = debounce(updateElementsSizes);
            return {
              _: function() {
                autosizesElems = document2.getElementsByClassName(lazySizesCfg.autosizesClass);
                addEventListener("resize", debouncedUpdateElementsSizes);
              },
              checkElems: debouncedUpdateElementsSizes,
              updateElem: getSizeElement
            };
          }();
          var init = function() {
            if (!init.i && document2.getElementsByClassName) {
              init.i = true;
              autoSizer._();
              loader._();
            }
          };
          setTimeout2(function() {
            if (lazySizesCfg.init) {
              init();
            }
          });
          lazysizes = {
            /**
             * @type { LazySizesConfigPartial }
             */
            cfg: lazySizesCfg,
            autoSizer,
            loader,
            init,
            uP: updatePolyfill,
            aC: addClass,
            rC: removeClass,
            hC: hasClass,
            fire: triggerEvent,
            gW: getWidth,
            rAF
          };
          return lazysizes;
        }
      );
    }
  });

  // node_modules/lazysizes/plugins/native-loading/ls.native-loading.js
  var require_ls_native_loading = __commonJS({
    "node_modules/lazysizes/plugins/native-loading/ls.native-loading.js"(exports, module) {
      (function(window2, factory) {
        var globalInstall = function() {
          factory(window2.lazySizes);
          window2.removeEventListener("lazyunveilread", globalInstall, true);
        };
        factory = factory.bind(null, window2, window2.document);
        if (typeof module == "object" && module.exports) {
          factory(require_lazysizes());
        } else if (typeof define == "function" && define.amd) {
          define(["lazysizes"], factory);
        } else if (window2.lazySizes) {
          globalInstall();
        } else {
          window2.addEventListener("lazyunveilread", globalInstall, true);
        }
      })(window, function(window2, document2, lazySizes2) {
        "use strict";
        var imgSupport = "loading" in HTMLImageElement.prototype;
        var iframeSupport = "loading" in HTMLIFrameElement.prototype;
        var isConfigSet = false;
        var oldPrematureUnveil = lazySizes2.prematureUnveil;
        var cfg = lazySizes2.cfg;
        var listenerMap = {
          focus: 1,
          mouseover: 1,
          click: 1,
          load: 1,
          transitionend: 1,
          animationend: 1,
          scroll: 1,
          resize: 1
        };
        if (!cfg.nativeLoading) {
          cfg.nativeLoading = {};
        }
        if (!window2.addEventListener || !window2.MutationObserver || !imgSupport && !iframeSupport) {
          return;
        }
        function disableEvents() {
          var loader = lazySizes2.loader;
          var throttledCheckElements = loader.checkElems;
          var removeALSL = function() {
            setTimeout(function() {
              window2.removeEventListener("scroll", loader._aLSL, true);
            }, 1e3);
          };
          var currentListenerMap = typeof cfg.nativeLoading.disableListeners == "object" ? cfg.nativeLoading.disableListeners : listenerMap;
          if (currentListenerMap.scroll) {
            window2.addEventListener("load", removeALSL);
            removeALSL();
            window2.removeEventListener("scroll", throttledCheckElements, true);
          }
          if (currentListenerMap.resize) {
            window2.removeEventListener("resize", throttledCheckElements, true);
          }
          Object.keys(currentListenerMap).forEach(function(name) {
            if (currentListenerMap[name]) {
              document2.removeEventListener(name, throttledCheckElements, true);
            }
          });
        }
        function runConfig() {
          if (isConfigSet) {
            return;
          }
          isConfigSet = true;
          if (imgSupport && iframeSupport && cfg.nativeLoading.disableListeners) {
            if (cfg.nativeLoading.disableListeners === true) {
              cfg.nativeLoading.setLoadingAttribute = true;
            }
            disableEvents();
          }
          if (cfg.nativeLoading.setLoadingAttribute) {
            window2.addEventListener("lazybeforeunveil", function(e2) {
              var element = e2.target;
              if ("loading" in element && !element.getAttribute("loading")) {
                element.setAttribute("loading", "lazy");
              }
            }, true);
          }
        }
        lazySizes2.prematureUnveil = function prematureUnveil(element) {
          if (!isConfigSet) {
            runConfig();
          }
          if ("loading" in element && (cfg.nativeLoading.setLoadingAttribute || element.getAttribute("loading")) && (element.getAttribute("data-sizes") != "auto" || element.offsetWidth)) {
            return true;
          }
          if (oldPrematureUnveil) {
            return oldPrematureUnveil(element);
          }
        };
      });
    }
  });

  // node_modules/clipboard/dist/clipboard.js
  var require_clipboard = __commonJS({
    "node_modules/clipboard/dist/clipboard.js"(exports, module) {
      (function webpackUniversalModuleDefinition(root, factory) {
        if (typeof exports === "object" && typeof module === "object")
          module.exports = factory();
        else if (typeof define === "function" && define.amd)
          define([], factory);
        else if (typeof exports === "object")
          exports["ClipboardJS"] = factory();
        else
          root["ClipboardJS"] = factory();
      })(exports, function() {
        return (
          /******/
          function() {
            var __webpack_modules__ = {
              /***/
              686: (
                /***/
                function(__unused_webpack_module, __webpack_exports__, __webpack_require__2) {
                  "use strict";
                  __webpack_require__2.d(__webpack_exports__, {
                    "default": function() {
                      return (
                        /* binding */
                        clipboard
                      );
                    }
                  });
                  var tiny_emitter = __webpack_require__2(279);
                  var tiny_emitter_default = /* @__PURE__ */ __webpack_require__2.n(tiny_emitter);
                  var listen = __webpack_require__2(370);
                  var listen_default = /* @__PURE__ */ __webpack_require__2.n(listen);
                  var src_select = __webpack_require__2(817);
                  var select_default = /* @__PURE__ */ __webpack_require__2.n(src_select);
                  ;
                  function command(type) {
                    try {
                      return document.execCommand(type);
                    } catch (err) {
                      return false;
                    }
                  }
                  ;
                  var ClipboardActionCut = function ClipboardActionCut2(target) {
                    var selectedText = select_default()(target);
                    command("cut");
                    return selectedText;
                  };
                  var actions_cut = ClipboardActionCut;
                  ;
                  function createFakeElement(value) {
                    var isRTL = document.documentElement.getAttribute("dir") === "rtl";
                    var fakeElement = document.createElement("textarea");
                    fakeElement.style.fontSize = "12pt";
                    fakeElement.style.border = "0";
                    fakeElement.style.padding = "0";
                    fakeElement.style.margin = "0";
                    fakeElement.style.position = "absolute";
                    fakeElement.style[isRTL ? "right" : "left"] = "-9999px";
                    var yPosition = window.pageYOffset || document.documentElement.scrollTop;
                    fakeElement.style.top = "".concat(yPosition, "px");
                    fakeElement.setAttribute("readonly", "");
                    fakeElement.value = value;
                    return fakeElement;
                  }
                  ;
                  var fakeCopyAction = function fakeCopyAction2(value, options) {
                    var fakeElement = createFakeElement(value);
                    options.container.appendChild(fakeElement);
                    var selectedText = select_default()(fakeElement);
                    command("copy");
                    fakeElement.remove();
                    return selectedText;
                  };
                  var ClipboardActionCopy = function ClipboardActionCopy2(target) {
                    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                      container: document.body
                    };
                    var selectedText = "";
                    if (typeof target === "string") {
                      selectedText = fakeCopyAction(target, options);
                    } else if (target instanceof HTMLInputElement && !["text", "search", "url", "tel", "password"].includes(target === null || target === void 0 ? void 0 : target.type)) {
                      selectedText = fakeCopyAction(target.value, options);
                    } else {
                      selectedText = select_default()(target);
                      command("copy");
                    }
                    return selectedText;
                  };
                  var actions_copy = ClipboardActionCopy;
                  ;
                  function _typeof(obj) {
                    "@babel/helpers - typeof";
                    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                      _typeof = function _typeof2(obj2) {
                        return typeof obj2;
                      };
                    } else {
                      _typeof = function _typeof2(obj2) {
                        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                      };
                    }
                    return _typeof(obj);
                  }
                  var ClipboardActionDefault = function ClipboardActionDefault2() {
                    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                    var _options$action = options.action, action = _options$action === void 0 ? "copy" : _options$action, container = options.container, target = options.target, text = options.text;
                    if (action !== "copy" && action !== "cut") {
                      throw new Error('Invalid "action" value, use either "copy" or "cut"');
                    }
                    if (target !== void 0) {
                      if (target && _typeof(target) === "object" && target.nodeType === 1) {
                        if (action === "copy" && target.hasAttribute("disabled")) {
                          throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                        }
                        if (action === "cut" && (target.hasAttribute("readonly") || target.hasAttribute("disabled"))) {
                          throw new Error(`Invalid "target" attribute. You can't cut text from elements with "readonly" or "disabled" attributes`);
                        }
                      } else {
                        throw new Error('Invalid "target" value, use a valid Element');
                      }
                    }
                    if (text) {
                      return actions_copy(text, {
                        container
                      });
                    }
                    if (target) {
                      return action === "cut" ? actions_cut(target) : actions_copy(target, {
                        container
                      });
                    }
                  };
                  var actions_default = ClipboardActionDefault;
                  ;
                  function clipboard_typeof(obj) {
                    "@babel/helpers - typeof";
                    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
                      clipboard_typeof = function _typeof2(obj2) {
                        return typeof obj2;
                      };
                    } else {
                      clipboard_typeof = function _typeof2(obj2) {
                        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
                      };
                    }
                    return clipboard_typeof(obj);
                  }
                  function _classCallCheck(instance, Constructor) {
                    if (!(instance instanceof Constructor)) {
                      throw new TypeError("Cannot call a class as a function");
                    }
                  }
                  function _defineProperties(target, props) {
                    for (var i3 = 0; i3 < props.length; i3++) {
                      var descriptor = props[i3];
                      descriptor.enumerable = descriptor.enumerable || false;
                      descriptor.configurable = true;
                      if ("value" in descriptor) descriptor.writable = true;
                      Object.defineProperty(target, descriptor.key, descriptor);
                    }
                  }
                  function _createClass(Constructor, protoProps, staticProps) {
                    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) _defineProperties(Constructor, staticProps);
                    return Constructor;
                  }
                  function _inherits(subClass, superClass) {
                    if (typeof superClass !== "function" && superClass !== null) {
                      throw new TypeError("Super expression must either be null or a function");
                    }
                    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
                    if (superClass) _setPrototypeOf(subClass, superClass);
                  }
                  function _setPrototypeOf(o2, p) {
                    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o3, p2) {
                      o3.__proto__ = p2;
                      return o3;
                    };
                    return _setPrototypeOf(o2, p);
                  }
                  function _createSuper(Derived) {
                    var hasNativeReflectConstruct = _isNativeReflectConstruct();
                    return function _createSuperInternal() {
                      var Super = _getPrototypeOf(Derived), result;
                      if (hasNativeReflectConstruct) {
                        var NewTarget = _getPrototypeOf(this).constructor;
                        result = Reflect.construct(Super, arguments, NewTarget);
                      } else {
                        result = Super.apply(this, arguments);
                      }
                      return _possibleConstructorReturn(this, result);
                    };
                  }
                  function _possibleConstructorReturn(self, call) {
                    if (call && (clipboard_typeof(call) === "object" || typeof call === "function")) {
                      return call;
                    }
                    return _assertThisInitialized(self);
                  }
                  function _assertThisInitialized(self) {
                    if (self === void 0) {
                      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    }
                    return self;
                  }
                  function _isNativeReflectConstruct() {
                    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
                    if (Reflect.construct.sham) return false;
                    if (typeof Proxy === "function") return true;
                    try {
                      Date.prototype.toString.call(Reflect.construct(Date, [], function() {
                      }));
                      return true;
                    } catch (e2) {
                      return false;
                    }
                  }
                  function _getPrototypeOf(o2) {
                    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o3) {
                      return o3.__proto__ || Object.getPrototypeOf(o3);
                    };
                    return _getPrototypeOf(o2);
                  }
                  function getAttributeValue(suffix, element) {
                    var attribute = "data-clipboard-".concat(suffix);
                    if (!element.hasAttribute(attribute)) {
                      return;
                    }
                    return element.getAttribute(attribute);
                  }
                  var Clipboard2 = /* @__PURE__ */ function(_Emitter) {
                    _inherits(Clipboard3, _Emitter);
                    var _super = _createSuper(Clipboard3);
                    function Clipboard3(trigger, options) {
                      var _this;
                      _classCallCheck(this, Clipboard3);
                      _this = _super.call(this);
                      _this.resolveOptions(options);
                      _this.listenClick(trigger);
                      return _this;
                    }
                    _createClass(Clipboard3, [{
                      key: "resolveOptions",
                      value: function resolveOptions() {
                        var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                        this.action = typeof options.action === "function" ? options.action : this.defaultAction;
                        this.target = typeof options.target === "function" ? options.target : this.defaultTarget;
                        this.text = typeof options.text === "function" ? options.text : this.defaultText;
                        this.container = clipboard_typeof(options.container) === "object" ? options.container : document.body;
                      }
                      /**
                       * Adds a click event listener to the passed trigger.
                       * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
                       */
                    }, {
                      key: "listenClick",
                      value: function listenClick(trigger) {
                        var _this2 = this;
                        this.listener = listen_default()(trigger, "click", function(e2) {
                          return _this2.onClick(e2);
                        });
                      }
                      /**
                       * Defines a new `ClipboardAction` on each click event.
                       * @param {Event} e
                       */
                    }, {
                      key: "onClick",
                      value: function onClick(e2) {
                        var trigger = e2.delegateTarget || e2.currentTarget;
                        var action = this.action(trigger) || "copy";
                        var text = actions_default({
                          action,
                          container: this.container,
                          target: this.target(trigger),
                          text: this.text(trigger)
                        });
                        this.emit(text ? "success" : "error", {
                          action,
                          text,
                          trigger,
                          clearSelection: function clearSelection() {
                            if (trigger) {
                              trigger.focus();
                            }
                            window.getSelection().removeAllRanges();
                          }
                        });
                      }
                      /**
                       * Default `action` lookup function.
                       * @param {Element} trigger
                       */
                    }, {
                      key: "defaultAction",
                      value: function defaultAction(trigger) {
                        return getAttributeValue("action", trigger);
                      }
                      /**
                       * Default `target` lookup function.
                       * @param {Element} trigger
                       */
                    }, {
                      key: "defaultTarget",
                      value: function defaultTarget(trigger) {
                        var selector = getAttributeValue("target", trigger);
                        if (selector) {
                          return document.querySelector(selector);
                        }
                      }
                      /**
                       * Allow fire programmatically a copy action
                       * @param {String|HTMLElement} target
                       * @param {Object} options
                       * @returns Text copied.
                       */
                    }, {
                      key: "defaultText",
                      /**
                       * Default `text` lookup function.
                       * @param {Element} trigger
                       */
                      value: function defaultText(trigger) {
                        return getAttributeValue("text", trigger);
                      }
                      /**
                       * Destroy lifecycle.
                       */
                    }, {
                      key: "destroy",
                      value: function destroy() {
                        this.listener.destroy();
                      }
                    }], [{
                      key: "copy",
                      value: function copy(target) {
                        var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
                          container: document.body
                        };
                        return actions_copy(target, options);
                      }
                      /**
                       * Allow fire programmatically a cut action
                       * @param {String|HTMLElement} target
                       * @returns Text cutted.
                       */
                    }, {
                      key: "cut",
                      value: function cut(target) {
                        return actions_cut(target);
                      }
                      /**
                       * Returns the support of the given action, or all actions if no action is
                       * given.
                       * @param {String} [action]
                       */
                    }, {
                      key: "isSupported",
                      value: function isSupported() {
                        var action = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : ["copy", "cut"];
                        var actions = typeof action === "string" ? [action] : action;
                        var support = !!document.queryCommandSupported;
                        actions.forEach(function(action2) {
                          support = support && !!document.queryCommandSupported(action2);
                        });
                        return support;
                      }
                    }]);
                    return Clipboard3;
                  }(tiny_emitter_default());
                  var clipboard = Clipboard2;
                }
              ),
              /***/
              828: (
                /***/
                function(module2) {
                  var DOCUMENT_NODE_TYPE = 9;
                  if (typeof Element !== "undefined" && !Element.prototype.matches) {
                    var proto = Element.prototype;
                    proto.matches = proto.matchesSelector || proto.mozMatchesSelector || proto.msMatchesSelector || proto.oMatchesSelector || proto.webkitMatchesSelector;
                  }
                  function closest(element, selector) {
                    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
                      if (typeof element.matches === "function" && element.matches(selector)) {
                        return element;
                      }
                      element = element.parentNode;
                    }
                  }
                  module2.exports = closest;
                }
              ),
              /***/
              438: (
                /***/
                function(module2, __unused_webpack_exports, __webpack_require__2) {
                  var closest = __webpack_require__2(828);
                  function _delegate(element, selector, type, callback, useCapture) {
                    var listenerFn = listener.apply(this, arguments);
                    element.addEventListener(type, listenerFn, useCapture);
                    return {
                      destroy: function() {
                        element.removeEventListener(type, listenerFn, useCapture);
                      }
                    };
                  }
                  function delegate(elements, selector, type, callback, useCapture) {
                    if (typeof elements.addEventListener === "function") {
                      return _delegate.apply(null, arguments);
                    }
                    if (typeof type === "function") {
                      return _delegate.bind(null, document).apply(null, arguments);
                    }
                    if (typeof elements === "string") {
                      elements = document.querySelectorAll(elements);
                    }
                    return Array.prototype.map.call(elements, function(element) {
                      return _delegate(element, selector, type, callback, useCapture);
                    });
                  }
                  function listener(element, selector, type, callback) {
                    return function(e2) {
                      e2.delegateTarget = closest(e2.target, selector);
                      if (e2.delegateTarget) {
                        callback.call(element, e2);
                      }
                    };
                  }
                  module2.exports = delegate;
                }
              ),
              /***/
              879: (
                /***/
                function(__unused_webpack_module, exports2) {
                  exports2.node = function(value) {
                    return value !== void 0 && value instanceof HTMLElement && value.nodeType === 1;
                  };
                  exports2.nodeList = function(value) {
                    var type = Object.prototype.toString.call(value);
                    return value !== void 0 && (type === "[object NodeList]" || type === "[object HTMLCollection]") && "length" in value && (value.length === 0 || exports2.node(value[0]));
                  };
                  exports2.string = function(value) {
                    return typeof value === "string" || value instanceof String;
                  };
                  exports2.fn = function(value) {
                    var type = Object.prototype.toString.call(value);
                    return type === "[object Function]";
                  };
                }
              ),
              /***/
              370: (
                /***/
                function(module2, __unused_webpack_exports, __webpack_require__2) {
                  var is = __webpack_require__2(879);
                  var delegate = __webpack_require__2(438);
                  function listen(target, type, callback) {
                    if (!target && !type && !callback) {
                      throw new Error("Missing required arguments");
                    }
                    if (!is.string(type)) {
                      throw new TypeError("Second argument must be a String");
                    }
                    if (!is.fn(callback)) {
                      throw new TypeError("Third argument must be a Function");
                    }
                    if (is.node(target)) {
                      return listenNode(target, type, callback);
                    } else if (is.nodeList(target)) {
                      return listenNodeList(target, type, callback);
                    } else if (is.string(target)) {
                      return listenSelector(target, type, callback);
                    } else {
                      throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");
                    }
                  }
                  function listenNode(node, type, callback) {
                    node.addEventListener(type, callback);
                    return {
                      destroy: function() {
                        node.removeEventListener(type, callback);
                      }
                    };
                  }
                  function listenNodeList(nodeList, type, callback) {
                    Array.prototype.forEach.call(nodeList, function(node) {
                      node.addEventListener(type, callback);
                    });
                    return {
                      destroy: function() {
                        Array.prototype.forEach.call(nodeList, function(node) {
                          node.removeEventListener(type, callback);
                        });
                      }
                    };
                  }
                  function listenSelector(selector, type, callback) {
                    return delegate(document.body, selector, type, callback);
                  }
                  module2.exports = listen;
                }
              ),
              /***/
              817: (
                /***/
                function(module2) {
                  function select(element) {
                    var selectedText;
                    if (element.nodeName === "SELECT") {
                      element.focus();
                      selectedText = element.value;
                    } else if (element.nodeName === "INPUT" || element.nodeName === "TEXTAREA") {
                      var isReadOnly = element.hasAttribute("readonly");
                      if (!isReadOnly) {
                        element.setAttribute("readonly", "");
                      }
                      element.select();
                      element.setSelectionRange(0, element.value.length);
                      if (!isReadOnly) {
                        element.removeAttribute("readonly");
                      }
                      selectedText = element.value;
                    } else {
                      if (element.hasAttribute("contenteditable")) {
                        element.focus();
                      }
                      var selection = window.getSelection();
                      var range = document.createRange();
                      range.selectNodeContents(element);
                      selection.removeAllRanges();
                      selection.addRange(range);
                      selectedText = selection.toString();
                    }
                    return selectedText;
                  }
                  module2.exports = select;
                }
              ),
              /***/
              279: (
                /***/
                function(module2) {
                  function E() {
                  }
                  E.prototype = {
                    on: function(name, callback, ctx) {
                      var e2 = this.e || (this.e = {});
                      (e2[name] || (e2[name] = [])).push({
                        fn: callback,
                        ctx
                      });
                      return this;
                    },
                    once: function(name, callback, ctx) {
                      var self = this;
                      function listener() {
                        self.off(name, listener);
                        callback.apply(ctx, arguments);
                      }
                      ;
                      listener._ = callback;
                      return this.on(name, listener, ctx);
                    },
                    emit: function(name) {
                      var data = [].slice.call(arguments, 1);
                      var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
                      var i3 = 0;
                      var len = evtArr.length;
                      for (i3; i3 < len; i3++) {
                        evtArr[i3].fn.apply(evtArr[i3].ctx, data);
                      }
                      return this;
                    },
                    off: function(name, callback) {
                      var e2 = this.e || (this.e = {});
                      var evts = e2[name];
                      var liveEvents = [];
                      if (evts && callback) {
                        for (var i3 = 0, len = evts.length; i3 < len; i3++) {
                          if (evts[i3].fn !== callback && evts[i3].fn._ !== callback)
                            liveEvents.push(evts[i3]);
                        }
                      }
                      liveEvents.length ? e2[name] = liveEvents : delete e2[name];
                      return this;
                    }
                  };
                  module2.exports = E;
                  module2.exports.TinyEmitter = E;
                }
              )
              /******/
            };
            var __webpack_module_cache__ = {};
            function __webpack_require__(moduleId) {
              if (__webpack_module_cache__[moduleId]) {
                return __webpack_module_cache__[moduleId].exports;
              }
              var module2 = __webpack_module_cache__[moduleId] = {
                /******/
                // no module.id needed
                /******/
                // no module.loaded needed
                /******/
                exports: {}
                /******/
              };
              __webpack_modules__[moduleId](module2, module2.exports, __webpack_require__);
              return module2.exports;
            }
            !function() {
              __webpack_require__.n = function(module2) {
                var getter = module2 && module2.__esModule ? (
                  /******/
                  function() {
                    return module2["default"];
                  }
                ) : (
                  /******/
                  function() {
                    return module2;
                  }
                );
                __webpack_require__.d(getter, { a: getter });
                return getter;
              };
            }();
            !function() {
              __webpack_require__.d = function(exports2, definition) {
                for (var key in definition) {
                  if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports2, key)) {
                    Object.defineProperty(exports2, key, { enumerable: true, get: definition[key] });
                  }
                }
              };
            }();
            !function() {
              __webpack_require__.o = function(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
              };
            }();
            return __webpack_require__(686);
          }().default
        );
      });
    }
  });

  // node_modules/quicklink/dist/quicklink.mjs
  function e(e2) {
    return new Promise(function(n2, r2, t2) {
      (t2 = new XMLHttpRequest()).open("GET", e2, t2.withCredentials = true), t2.onload = function() {
        200 === t2.status ? n2() : r2();
      }, t2.send();
    });
  }
  var n;
  var r = (n = document.createElement("link")).relList && n.relList.supports && n.relList.supports("prefetch") ? function(e2) {
    return new Promise(function(n2, r2, t2) {
      (t2 = document.createElement("link")).rel = "prefetch", t2.href = e2, t2.onload = n2, t2.onerror = r2, document.head.appendChild(t2);
    });
  } : e;
  var t = window.requestIdleCallback || function(e2) {
    var n2 = Date.now();
    return setTimeout(function() {
      e2({ didTimeout: false, timeRemaining: function() {
        return Math.max(0, 50 - (Date.now() - n2));
      } });
    }, 1);
  };
  var o = /* @__PURE__ */ new Set();
  var i = /* @__PURE__ */ new Set();
  var c = false;
  function a(e2) {
    if (e2) {
      if (e2.saveData) return new Error("Save-Data is enabled");
      if (/2g/.test(e2.effectiveType)) return new Error("network conditions are poor");
    }
    return true;
  }
  function u(e2) {
    if (e2 || (e2 = {}), window.IntersectionObserver) {
      var n2 = function(e3) {
        e3 = e3 || 1;
        var n3 = [], r3 = 0;
        function t2() {
          r3 < e3 && n3.length > 0 && (n3.shift()(), r3++);
        }
        return [function(e4) {
          n3.push(e4) > 1 || t2();
        }, function() {
          r3--, t2();
        }];
      }(e2.throttle || 1 / 0), r2 = n2[0], a2 = n2[1], u2 = e2.limit || 1 / 0, l = e2.origins || [location.hostname], d = e2.ignores || [], h = e2.delay || 0, p = [], m = e2.timeoutFn || t, w = "function" == typeof e2.hrefFn && e2.hrefFn, g = e2.prerender || false;
      c = e2.prerenderAndPrefetch || false;
      var v = new IntersectionObserver(function(n3) {
        n3.forEach(function(n4) {
          if (n4.isIntersecting) p.push((n4 = n4.target).href), function(e3, n5) {
            n5 ? setTimeout(e3, n5) : e3();
          }(function() {
            -1 !== p.indexOf(n4.href) && (v.unobserve(n4), (c || g) && i.size < 1 ? f(w ? w(n4) : n4.href).catch(function(n5) {
              if (!e2.onError) throw n5;
              e2.onError(n5);
            }) : o.size < u2 && !g && r2(function() {
              s(w ? w(n4) : n4.href, e2.priority).then(a2).catch(function(n5) {
                a2(), e2.onError && e2.onError(n5);
              });
            }));
          }, h);
          else {
            var t2 = p.indexOf((n4 = n4.target).href);
            t2 > -1 && p.splice(t2);
          }
        });
      }, { threshold: e2.threshold || 0 });
      return m(function() {
        (e2.el || document).querySelectorAll("a").forEach(function(e3) {
          l.length && !l.includes(e3.hostname) || function e4(n3, r3) {
            return Array.isArray(r3) ? r3.some(function(r4) {
              return e4(n3, r4);
            }) : (r3.test || r3).call(r3, n3.href, n3);
          }(e3, d) || v.observe(e3);
        });
      }, { timeout: e2.timeout || 2e3 }), function() {
        o.clear(), v.disconnect();
      };
    }
  }
  function s(n2, t2, u2) {
    var s2 = a(navigator.connection);
    return s2 instanceof Error ? Promise.reject(new Error("Cannot prefetch, " + s2.message)) : (i.size > 0 && !c && console.warn("[Warning] You are using both prefetching and prerendering on the same document"), Promise.all([].concat(n2).map(function(n3) {
      if (!o.has(n3)) return o.add(n3), (t2 ? function(n4) {
        return window.fetch ? fetch(n4, { credentials: "include" }) : e(n4);
      } : r)(new URL(n3, location.href).toString());
    })));
  }
  function f(e2, n2) {
    var r2 = a(navigator.connection);
    if (r2 instanceof Error) return Promise.reject(new Error("Cannot prerender, " + r2.message));
    if (!HTMLScriptElement.supports("speculationrules")) return s(e2), Promise.reject(new Error("This browser does not support the speculation rules API. Falling back to prefetch."));
    if (document.querySelector('script[type="speculationrules"]')) return Promise.reject(new Error("Speculation Rules is already defined and cannot be altered."));
    for (var t2 = 0, u2 = [].concat(e2); t2 < u2.length; t2 += 1) {
      var f2 = u2[t2];
      if (window.location.origin !== new URL(f2, window.location.href).origin) return Promise.reject(new Error("Only same origin URLs are allowed: " + f2));
      i.add(f2);
    }
    o.size > 0 && !c && console.warn("[Warning] You are using both prefetching and prerendering on the same document");
    var l = function(e3) {
      var n3 = document.createElement("script");
      n3.type = "speculationrules", n3.text = '{"prerender":[{"source": "list","urls": ["' + Array.from(e3).join('","') + '"]}]}';
      try {
        document.head.appendChild(n3);
      } catch (e4) {
        return e4;
      }
      return true;
    }(i);
    return true === l ? Promise.resolve() : Promise.reject(l);
  }

  // node_modules/@thulite/core/assets/js/core.js
  var import_lazysizes = __toESM(require_lazysizes());
  var import_ls = __toESM(require_ls_native_loading());
  u({
    ignores: [
      /\/api\/?/,
      (uri) => uri.includes(".zip"),
      (uri, elem) => elem.hasAttribute("noprefetch"),
      (uri, elem) => elem.hash && elem.pathname === window.location.pathname
    ]
  });
  import_lazysizes.default.cfg.nativeLoading = {
    setLoadingAttribute: true,
    disableListeners: {
      scroll: true
    }
  };

  // ns-hugo-imp:/home/toyenberg/berktoy.space/node_modules/@thulite/doks-core/assets/js/clipboard.js
  var import_clipboard = __toESM(require_clipboard());
  (() => {
    "use strict";
    var cb = document.getElementsByClassName("highlight");
    for (var i3 = 0; i3 < cb.length; ++i3) {
      var element = cb[i3];
      element.insertAdjacentHTML("afterbegin", '<div class="copy"><button title="Copy to clipboard" class="btn-copy" aria-label="Clipboard button"><div></div></button></div>');
    }
    var clipboard = new import_clipboard.default(".btn-copy", {
      target: function(trigger) {
        return trigger.parentNode.nextElementSibling;
      }
    });
    clipboard.on("success", function(e2) {
      e2.clearSelection();
    });
    clipboard.on("error", function(e2) {
      console.error("Action:", e2.action);
      console.error("Trigger:", e2.trigger);
    });
  })();

  // ns-hugo-imp:/home/toyenberg/berktoy.space/node_modules/@thulite/doks-core/assets/js/to-top.js
  var topButton = document.getElementById("toTop");
  if (topButton !== null) {
    topButton.classList.remove("fade");
    window.onscroll = function() {
      scrollFunction();
    };
    topButton.addEventListener("click", topFunction);
  }
  function scrollFunction() {
    if (document.body.scrollTop > 270 || document.documentElement.scrollTop > 270) {
      topButton.classList.add("fade");
    } else {
      topButton.classList.remove("fade");
    }
  }
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // ns-hugo-imp:/home/toyenberg/berktoy.space/node_modules/@thulite/doks-core/assets/js/tabs.js
  var i2;
  var allTabs = document.querySelectorAll("[data-toggle-tab]");
  var allPanes = document.querySelectorAll("[data-pane]");
  function toggleTabs(event) {
    if (event.target) {
      event.preventDefault();
      var clickedTab = event.currentTarget;
      var targetKey = clickedTab.getAttribute("data-toggle-tab");
    } else {
      var targetKey = event;
    }
    if (window.localStorage) {
      window.localStorage.setItem("configLangPref", targetKey);
    }
    var selectedTabs = document.querySelectorAll("[data-toggle-tab=" + targetKey + "]");
    var selectedPanes = document.querySelectorAll("[data-pane=" + targetKey + "]");
    for (var i3 = 0; i3 < allTabs.length; i3++) {
      allTabs[i3].classList.remove("active");
      allPanes[i3].classList.remove("active");
    }
    for (var i3 = 0; i3 < selectedTabs.length; i3++) {
      selectedTabs[i3].classList.add("active");
      selectedPanes[i3].classList.add("show", "active");
    }
  }
  for (i2 = 0; i2 < allTabs.length; i2++) {
    allTabs[i2].addEventListener("click", toggleTabs);
  }
  if (window.localStorage.getItem("configLangPref")) {
    toggleTabs(window.localStorage.getItem("configLangPref"));
  }

  // ns-hugo-imp:/home/toyenberg/berktoy.space/assets/js/custom.js
  (function(w, d, e2, u2, f2, l, n2) {
    w[f2] = w[f2] || function() {
      (w[f2].q = w[f2].q || []).push(arguments);
    }, l = d.createElement(e2), l.async = 1, l.src = u2, n2 = d.getElementsByTagName(e2)[0], n2.parentNode.insertBefore(l, n2);
  })(window, document, "script", "https://assets.mailerlite.com/js/universal.js", "ml");
  ml("account", "1441431");
})();
/*! Bundled license information:

clipboard/dist/clipboard.js:
  (*!
   * clipboard.js v2.0.11
   * https://clipboardjs.com/
   *
   * Licensed MIT © Zeno Rocha
   *)

@thulite/doks-core/assets/js/clipboard.js:
  (*!
   * clipboard.js for Bootstrap based Thulite sites
   * Copyright 2021-2024 Thulite
   * Licensed under the MIT License
   *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vbm9kZV9tb2R1bGVzL2xhenlzaXplcy9sYXp5c2l6ZXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2xhenlzaXplcy9wbHVnaW5zL25hdGl2ZS1sb2FkaW5nL2xzLm5hdGl2ZS1sb2FkaW5nLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jbGlwYm9hcmQvZGlzdC9jbGlwYm9hcmQuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3F1aWNrbGluay9kaXN0L3F1aWNrbGluay5tanMiLCAiLi4vbm9kZV9tb2R1bGVzL0B0aHVsaXRlL2NvcmUvYXNzZXRzL2pzL2NvcmUuanMiLCAibnMtaHVnby1pbXA6L2hvbWUvdG95ZW5iZXJnL2Jlcmt0b3kuc3BhY2Uvbm9kZV9tb2R1bGVzL0B0aHVsaXRlL2Rva3MtY29yZS9hc3NldHMvanMvY2xpcGJvYXJkLmpzIiwgIm5zLWh1Z28taW1wOi9ob21lL3RveWVuYmVyZy9iZXJrdG95LnNwYWNlL25vZGVfbW9kdWxlcy9AdGh1bGl0ZS9kb2tzLWNvcmUvYXNzZXRzL2pzL3RvLXRvcC5qcyIsICJucy1odWdvLWltcDovaG9tZS90b3llbmJlcmcvYmVya3RveS5zcGFjZS9ub2RlX21vZHVsZXMvQHRodWxpdGUvZG9rcy1jb3JlL2Fzc2V0cy9qcy90YWJzLmpzIiwgIm5zLWh1Z28taW1wOi9ob21lL3RveWVuYmVyZy9iZXJrdG95LnNwYWNlL2Fzc2V0cy9qcy9jdXN0b20uanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIihmdW5jdGlvbih3aW5kb3csIGZhY3RvcnkpIHtcblx0dmFyIGxhenlTaXplcyA9IGZhY3Rvcnkod2luZG93LCB3aW5kb3cuZG9jdW1lbnQsIERhdGUpO1xuXHR3aW5kb3cubGF6eVNpemVzID0gbGF6eVNpemVzO1xuXHRpZih0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKXtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGxhenlTaXplcztcblx0fVxufSh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnID9cbiAgICAgIHdpbmRvdyA6IHt9LCBcbi8qKlxuICogaW1wb3J0KFwiLi90eXBlcy9nbG9iYWxcIilcbiAqIEB0eXBlZGVmIHsgaW1wb3J0KFwiLi90eXBlcy9sYXp5c2l6ZXMtY29uZmlnXCIpLkxhenlTaXplc0NvbmZpZ1BhcnRpYWwgfSBMYXp5U2l6ZXNDb25maWdQYXJ0aWFsXG4gKi9cbmZ1bmN0aW9uIGwod2luZG93LCBkb2N1bWVudCwgRGF0ZSkgeyAvLyBQYXNzIGluIHRoZSB3aW5kb3cgRGF0ZSBmdW5jdGlvbiBhbHNvIGZvciBTU1IgYmVjYXVzZSB0aGUgRGF0ZSBjbGFzcyBjYW4gYmUgbG9zdFxuXHQndXNlIHN0cmljdCc7XG5cdC8qanNoaW50IGVxbnVsbDp0cnVlICovXG5cblx0dmFyIGxhenlzaXplcyxcblx0XHQvKipcblx0XHQgKiBAdHlwZSB7IExhenlTaXplc0NvbmZpZ1BhcnRpYWwgfVxuXHRcdCAqL1xuXHRcdGxhenlTaXplc0NmZztcblxuXHQoZnVuY3Rpb24oKXtcblx0XHR2YXIgcHJvcDtcblxuXHRcdHZhciBsYXp5U2l6ZXNEZWZhdWx0cyA9IHtcblx0XHRcdGxhenlDbGFzczogJ2xhenlsb2FkJyxcblx0XHRcdGxvYWRlZENsYXNzOiAnbGF6eWxvYWRlZCcsXG5cdFx0XHRsb2FkaW5nQ2xhc3M6ICdsYXp5bG9hZGluZycsXG5cdFx0XHRwcmVsb2FkQ2xhc3M6ICdsYXp5cHJlbG9hZCcsXG5cdFx0XHRlcnJvckNsYXNzOiAnbGF6eWVycm9yJyxcblx0XHRcdC8vc3RyaWN0Q2xhc3M6ICdsYXp5c3RyaWN0Jyxcblx0XHRcdGF1dG9zaXplc0NsYXNzOiAnbGF6eWF1dG9zaXplcycsXG5cdFx0XHRmYXN0TG9hZGVkQ2xhc3M6ICdscy1pcy1jYWNoZWQnLFxuXHRcdFx0aWZyYW1lTG9hZE1vZGU6IDAsXG5cdFx0XHRzcmNBdHRyOiAnZGF0YS1zcmMnLFxuXHRcdFx0c3Jjc2V0QXR0cjogJ2RhdGEtc3Jjc2V0Jyxcblx0XHRcdHNpemVzQXR0cjogJ2RhdGEtc2l6ZXMnLFxuXHRcdFx0Ly9wcmVsb2FkQWZ0ZXJMb2FkOiBmYWxzZSxcblx0XHRcdG1pblNpemU6IDQwLFxuXHRcdFx0Y3VzdG9tTWVkaWE6IHt9LFxuXHRcdFx0aW5pdDogdHJ1ZSxcblx0XHRcdGV4cEZhY3RvcjogMS41LFxuXHRcdFx0aEZhYzogMC44LFxuXHRcdFx0bG9hZE1vZGU6IDIsXG5cdFx0XHRsb2FkSGlkZGVuOiB0cnVlLFxuXHRcdFx0cmljVGltZW91dDogMCxcblx0XHRcdHRocm90dGxlRGVsYXk6IDEyNSxcblx0XHR9O1xuXG5cdFx0bGF6eVNpemVzQ2ZnID0gd2luZG93LmxhenlTaXplc0NvbmZpZyB8fCB3aW5kb3cubGF6eXNpemVzQ29uZmlnIHx8IHt9O1xuXG5cdFx0Zm9yKHByb3AgaW4gbGF6eVNpemVzRGVmYXVsdHMpe1xuXHRcdFx0aWYoIShwcm9wIGluIGxhenlTaXplc0NmZykpe1xuXHRcdFx0XHRsYXp5U2l6ZXNDZmdbcHJvcF0gPSBsYXp5U2l6ZXNEZWZhdWx0c1twcm9wXTtcblx0XHRcdH1cblx0XHR9XG5cdH0pKCk7XG5cblx0aWYgKCFkb2N1bWVudCB8fCAhZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRpbml0OiBmdW5jdGlvbiAoKSB7fSxcblx0XHRcdC8qKlxuXHRcdFx0ICogQHR5cGUgeyBMYXp5U2l6ZXNDb25maWdQYXJ0aWFsIH1cblx0XHRcdCAqL1xuXHRcdFx0Y2ZnOiBsYXp5U2l6ZXNDZmcsXG5cdFx0XHQvKipcblx0XHRcdCAqIEB0eXBlIHsgdHJ1ZSB9XG5cdFx0XHQgKi9cblx0XHRcdG5vU3VwcG9ydDogdHJ1ZSxcblx0XHR9O1xuXHR9XG5cblx0dmFyIGRvY0VsZW0gPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5cblx0dmFyIHN1cHBvcnRQaWN0dXJlID0gd2luZG93LkhUTUxQaWN0dXJlRWxlbWVudDtcblxuXHR2YXIgX2FkZEV2ZW50TGlzdGVuZXIgPSAnYWRkRXZlbnRMaXN0ZW5lcic7XG5cblx0dmFyIF9nZXRBdHRyaWJ1dGUgPSAnZ2V0QXR0cmlidXRlJztcblxuXHQvKipcblx0ICogVXBkYXRlIHRvIGJpbmQgdG8gd2luZG93IGJlY2F1c2UgJ3RoaXMnIGJlY29tZXMgbnVsbCBkdXJpbmcgU1NSXG5cdCAqIGJ1aWxkcy5cblx0ICovXG5cdHZhciBhZGRFdmVudExpc3RlbmVyID0gd2luZG93W19hZGRFdmVudExpc3RlbmVyXS5iaW5kKHdpbmRvdyk7XG5cblx0dmFyIHNldFRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dDtcblxuXHR2YXIgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCBzZXRUaW1lb3V0O1xuXG5cdHZhciByZXF1ZXN0SWRsZUNhbGxiYWNrID0gd2luZG93LnJlcXVlc3RJZGxlQ2FsbGJhY2s7XG5cblx0dmFyIHJlZ1BpY3R1cmUgPSAvXnBpY3R1cmUkL2k7XG5cblx0dmFyIGxvYWRFdmVudHMgPSBbJ2xvYWQnLCAnZXJyb3InLCAnbGF6eWluY2x1ZGVkJywgJ19sYXp5bG9hZGVkJ107XG5cblx0dmFyIHJlZ0NsYXNzQ2FjaGUgPSB7fTtcblxuXHR2YXIgZm9yRWFjaCA9IEFycmF5LnByb3RvdHlwZS5mb3JFYWNoO1xuXG5cdC8qKlxuXHQgKiBAcGFyYW0gZWxlIHtFbGVtZW50fVxuXHQgKiBAcGFyYW0gY2xzIHtzdHJpbmd9XG5cdCAqL1xuXHR2YXIgaGFzQ2xhc3MgPSBmdW5jdGlvbihlbGUsIGNscykge1xuXHRcdGlmKCFyZWdDbGFzc0NhY2hlW2Nsc10pe1xuXHRcdFx0cmVnQ2xhc3NDYWNoZVtjbHNdID0gbmV3IFJlZ0V4cCgnKFxcXFxzfF4pJytjbHMrJyhcXFxcc3wkKScpO1xuXHRcdH1cblx0XHRyZXR1cm4gcmVnQ2xhc3NDYWNoZVtjbHNdLnRlc3QoZWxlW19nZXRBdHRyaWJ1dGVdKCdjbGFzcycpIHx8ICcnKSAmJiByZWdDbGFzc0NhY2hlW2Nsc107XG5cdH07XG5cblx0LyoqXG5cdCAqIEBwYXJhbSBlbGUge0VsZW1lbnR9XG5cdCAqIEBwYXJhbSBjbHMge3N0cmluZ31cblx0ICovXG5cdHZhciBhZGRDbGFzcyA9IGZ1bmN0aW9uKGVsZSwgY2xzKSB7XG5cdFx0aWYgKCFoYXNDbGFzcyhlbGUsIGNscykpe1xuXHRcdFx0ZWxlLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAoZWxlW19nZXRBdHRyaWJ1dGVdKCdjbGFzcycpIHx8ICcnKS50cmltKCkgKyAnICcgKyBjbHMpO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogQHBhcmFtIGVsZSB7RWxlbWVudH1cblx0ICogQHBhcmFtIGNscyB7c3RyaW5nfVxuXHQgKi9cblx0dmFyIHJlbW92ZUNsYXNzID0gZnVuY3Rpb24oZWxlLCBjbHMpIHtcblx0XHR2YXIgcmVnO1xuXHRcdGlmICgocmVnID0gaGFzQ2xhc3MoZWxlLGNscykpKSB7XG5cdFx0XHRlbGUuc2V0QXR0cmlidXRlKCdjbGFzcycsIChlbGVbX2dldEF0dHJpYnV0ZV0oJ2NsYXNzJykgfHwgJycpLnJlcGxhY2UocmVnLCAnICcpKTtcblx0XHR9XG5cdH07XG5cblx0dmFyIGFkZFJlbW92ZUxvYWRFdmVudHMgPSBmdW5jdGlvbihkb20sIGZuLCBhZGQpe1xuXHRcdHZhciBhY3Rpb24gPSBhZGQgPyBfYWRkRXZlbnRMaXN0ZW5lciA6ICdyZW1vdmVFdmVudExpc3RlbmVyJztcblx0XHRpZihhZGQpe1xuXHRcdFx0YWRkUmVtb3ZlTG9hZEV2ZW50cyhkb20sIGZuKTtcblx0XHR9XG5cdFx0bG9hZEV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGV2dCl7XG5cdFx0XHRkb21bYWN0aW9uXShldnQsIGZuKTtcblx0XHR9KTtcblx0fTtcblxuXHQvKipcblx0ICogQHBhcmFtIGVsZW0geyBFbGVtZW50IH1cblx0ICogQHBhcmFtIG5hbWUgeyBzdHJpbmcgfVxuXHQgKiBAcGFyYW0gZGV0YWlsIHsgYW55IH1cblx0ICogQHBhcmFtIG5vQnViYmxlcyB7IGJvb2xlYW4gfVxuXHQgKiBAcGFyYW0gbm9DYW5jZWxhYmxlIHsgYm9vbGVhbiB9XG5cdCAqIEByZXR1cm5zIHsgQ3VzdG9tRXZlbnQgfVxuXHQgKi9cblx0dmFyIHRyaWdnZXJFdmVudCA9IGZ1bmN0aW9uKGVsZW0sIG5hbWUsIGRldGFpbCwgbm9CdWJibGVzLCBub0NhbmNlbGFibGUpe1xuXHRcdHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuXG5cdFx0aWYoIWRldGFpbCl7XG5cdFx0XHRkZXRhaWwgPSB7fTtcblx0XHR9XG5cblx0XHRkZXRhaWwuaW5zdGFuY2UgPSBsYXp5c2l6ZXM7XG5cblx0XHRldmVudC5pbml0RXZlbnQobmFtZSwgIW5vQnViYmxlcywgIW5vQ2FuY2VsYWJsZSk7XG5cblx0XHRldmVudC5kZXRhaWwgPSBkZXRhaWw7XG5cblx0XHRlbGVtLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdHJldHVybiBldmVudDtcblx0fTtcblxuXHR2YXIgdXBkYXRlUG9seWZpbGwgPSBmdW5jdGlvbiAoZWwsIGZ1bGwpe1xuXHRcdHZhciBwb2x5ZmlsbDtcblx0XHRpZiggIXN1cHBvcnRQaWN0dXJlICYmICggcG9seWZpbGwgPSAod2luZG93LnBpY3R1cmVmaWxsIHx8IGxhenlTaXplc0NmZy5wZikgKSApe1xuXHRcdFx0aWYoZnVsbCAmJiBmdWxsLnNyYyAmJiAhZWxbX2dldEF0dHJpYnV0ZV0oJ3NyY3NldCcpKXtcblx0XHRcdFx0ZWwuc2V0QXR0cmlidXRlKCdzcmNzZXQnLCBmdWxsLnNyYyk7XG5cdFx0XHR9XG5cdFx0XHRwb2x5ZmlsbCh7cmVldmFsdWF0ZTogdHJ1ZSwgZWxlbWVudHM6IFtlbF19KTtcblx0XHR9IGVsc2UgaWYoZnVsbCAmJiBmdWxsLnNyYyl7XG5cdFx0XHRlbC5zcmMgPSBmdWxsLnNyYztcblx0XHR9XG5cdH07XG5cblx0dmFyIGdldENTUyA9IGZ1bmN0aW9uIChlbGVtLCBzdHlsZSl7XG5cdFx0cmV0dXJuIChnZXRDb21wdXRlZFN0eWxlKGVsZW0sIG51bGwpIHx8IHt9KVtzdHlsZV07XG5cdH07XG5cblx0LyoqXG5cdCAqXG5cdCAqIEBwYXJhbSBlbGVtIHsgRWxlbWVudCB9XG5cdCAqIEBwYXJhbSBwYXJlbnQgeyBFbGVtZW50IH1cblx0ICogQHBhcmFtIFt3aWR0aF0ge251bWJlcn1cblx0ICogQHJldHVybnMge251bWJlcn1cblx0ICovXG5cdHZhciBnZXRXaWR0aCA9IGZ1bmN0aW9uKGVsZW0sIHBhcmVudCwgd2lkdGgpe1xuXHRcdHdpZHRoID0gd2lkdGggfHwgZWxlbS5vZmZzZXRXaWR0aDtcblxuXHRcdHdoaWxlKHdpZHRoIDwgbGF6eVNpemVzQ2ZnLm1pblNpemUgJiYgcGFyZW50ICYmICFlbGVtLl9sYXp5c2l6ZXNXaWR0aCl7XG5cdFx0XHR3aWR0aCA9ICBwYXJlbnQub2Zmc2V0V2lkdGg7XG5cdFx0XHRwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gd2lkdGg7XG5cdH07XG5cblx0dmFyIHJBRiA9IChmdW5jdGlvbigpe1xuXHRcdHZhciBydW5uaW5nLCB3YWl0aW5nO1xuXHRcdHZhciBmaXJzdEZucyA9IFtdO1xuXHRcdHZhciBzZWNvbmRGbnMgPSBbXTtcblx0XHR2YXIgZm5zID0gZmlyc3RGbnM7XG5cblx0XHR2YXIgcnVuID0gZnVuY3Rpb24oKXtcblx0XHRcdHZhciBydW5GbnMgPSBmbnM7XG5cblx0XHRcdGZucyA9IGZpcnN0Rm5zLmxlbmd0aCA/IHNlY29uZEZucyA6IGZpcnN0Rm5zO1xuXG5cdFx0XHRydW5uaW5nID0gdHJ1ZTtcblx0XHRcdHdhaXRpbmcgPSBmYWxzZTtcblxuXHRcdFx0d2hpbGUocnVuRm5zLmxlbmd0aCl7XG5cdFx0XHRcdHJ1bkZucy5zaGlmdCgpKCk7XG5cdFx0XHR9XG5cblx0XHRcdHJ1bm5pbmcgPSBmYWxzZTtcblx0XHR9O1xuXG5cdFx0dmFyIHJhZkJhdGNoID0gZnVuY3Rpb24oZm4sIHF1ZXVlKXtcblx0XHRcdGlmKHJ1bm5pbmcgJiYgIXF1ZXVlKXtcblx0XHRcdFx0Zm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZucy5wdXNoKGZuKTtcblxuXHRcdFx0XHRpZighd2FpdGluZyl7XG5cdFx0XHRcdFx0d2FpdGluZyA9IHRydWU7XG5cdFx0XHRcdFx0KGRvY3VtZW50LmhpZGRlbiA/IHNldFRpbWVvdXQgOiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUpKHJ1bik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0cmFmQmF0Y2guX2xzRmx1c2ggPSBydW47XG5cblx0XHRyZXR1cm4gcmFmQmF0Y2g7XG5cdH0pKCk7XG5cblx0dmFyIHJBRkl0ID0gZnVuY3Rpb24oZm4sIHNpbXBsZSl7XG5cdFx0cmV0dXJuIHNpbXBsZSA/XG5cdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0ckFGKGZuKTtcblx0XHRcdH0gOlxuXHRcdFx0ZnVuY3Rpb24oKXtcblx0XHRcdFx0dmFyIHRoYXQgPSB0aGlzO1xuXHRcdFx0XHR2YXIgYXJncyA9IGFyZ3VtZW50cztcblx0XHRcdFx0ckFGKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0Zm4uYXBwbHkodGhhdCwgYXJncyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdDtcblx0fTtcblxuXHR2YXIgdGhyb3R0bGUgPSBmdW5jdGlvbihmbil7XG5cdFx0dmFyIHJ1bm5pbmc7XG5cdFx0dmFyIGxhc3RUaW1lID0gMDtcblx0XHR2YXIgZ0RlbGF5ID0gbGF6eVNpemVzQ2ZnLnRocm90dGxlRGVsYXk7XG5cdFx0dmFyIHJJQ1RpbWVvdXQgPSBsYXp5U2l6ZXNDZmcucmljVGltZW91dDtcblx0XHR2YXIgcnVuID0gZnVuY3Rpb24oKXtcblx0XHRcdHJ1bm5pbmcgPSBmYWxzZTtcblx0XHRcdGxhc3RUaW1lID0gRGF0ZS5ub3coKTtcblx0XHRcdGZuKCk7XG5cdFx0fTtcblx0XHR2YXIgaWRsZUNhbGxiYWNrID0gcmVxdWVzdElkbGVDYWxsYmFjayAmJiBySUNUaW1lb3V0ID4gNDkgP1xuXHRcdFx0ZnVuY3Rpb24oKXtcblx0XHRcdFx0cmVxdWVzdElkbGVDYWxsYmFjayhydW4sIHt0aW1lb3V0OiBySUNUaW1lb3V0fSk7XG5cblx0XHRcdFx0aWYocklDVGltZW91dCAhPT0gbGF6eVNpemVzQ2ZnLnJpY1RpbWVvdXQpe1xuXHRcdFx0XHRcdHJJQ1RpbWVvdXQgPSBsYXp5U2l6ZXNDZmcucmljVGltZW91dDtcblx0XHRcdFx0fVxuXHRcdFx0fSA6XG5cdFx0XHRyQUZJdChmdW5jdGlvbigpe1xuXHRcdFx0XHRzZXRUaW1lb3V0KHJ1bik7XG5cdFx0XHR9LCB0cnVlKVxuXHRcdDtcblxuXHRcdHJldHVybiBmdW5jdGlvbihpc1ByaW9yaXR5KXtcblx0XHRcdHZhciBkZWxheTtcblxuXHRcdFx0aWYoKGlzUHJpb3JpdHkgPSBpc1ByaW9yaXR5ID09PSB0cnVlKSl7XG5cdFx0XHRcdHJJQ1RpbWVvdXQgPSAzMztcblx0XHRcdH1cblxuXHRcdFx0aWYocnVubmluZyl7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0cnVubmluZyA9ICB0cnVlO1xuXG5cdFx0XHRkZWxheSA9IGdEZWxheSAtIChEYXRlLm5vdygpIC0gbGFzdFRpbWUpO1xuXG5cdFx0XHRpZihkZWxheSA8IDApe1xuXHRcdFx0XHRkZWxheSA9IDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmKGlzUHJpb3JpdHkgfHwgZGVsYXkgPCA5KXtcblx0XHRcdFx0aWRsZUNhbGxiYWNrKCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZXRUaW1lb3V0KGlkbGVDYWxsYmFjaywgZGVsYXkpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cblx0Ly9iYXNlZCBvbiBodHRwOi8vbW9kZXJuamF2YXNjcmlwdC5ibG9nc3BvdC5kZS8yMDEzLzA4L2J1aWxkaW5nLWJldHRlci1kZWJvdW5jZS5odG1sXG5cdHZhciBkZWJvdW5jZSA9IGZ1bmN0aW9uKGZ1bmMpIHtcblx0XHR2YXIgdGltZW91dCwgdGltZXN0YW1wO1xuXHRcdHZhciB3YWl0ID0gOTk7XG5cdFx0dmFyIHJ1biA9IGZ1bmN0aW9uKCl7XG5cdFx0XHR0aW1lb3V0ID0gbnVsbDtcblx0XHRcdGZ1bmMoKTtcblx0XHR9O1xuXHRcdHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGxhc3QgPSBEYXRlLm5vdygpIC0gdGltZXN0YW1wO1xuXG5cdFx0XHRpZiAobGFzdCA8IHdhaXQpIHtcblx0XHRcdFx0c2V0VGltZW91dChsYXRlciwgd2FpdCAtIGxhc3QpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0KHJlcXVlc3RJZGxlQ2FsbGJhY2sgfHwgcnVuKShydW4pO1xuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHR0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuXG5cdFx0XHRpZiAoIXRpbWVvdXQpIHtcblx0XHRcdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXHRcdFx0fVxuXHRcdH07XG5cdH07XG5cblx0dmFyIGxvYWRlciA9IChmdW5jdGlvbigpe1xuXHRcdHZhciBwcmVsb2FkRWxlbXMsIGlzQ29tcGxldGVkLCByZXNldFByZWxvYWRpbmdUaW1lciwgbG9hZE1vZGUsIHN0YXJ0ZWQ7XG5cblx0XHR2YXIgZUx2VywgZWx2SCwgZUx0b3AsIGVMbGVmdCwgZUxyaWdodCwgZUxib3R0b20sIGlzQm9keUhpZGRlbjtcblxuXHRcdHZhciByZWdJbWcgPSAvXmltZyQvaTtcblx0XHR2YXIgcmVnSWZyYW1lID0gL15pZnJhbWUkL2k7XG5cblx0XHR2YXIgc3VwcG9ydFNjcm9sbCA9ICgnb25zY3JvbGwnIGluIHdpbmRvdykgJiYgISgvKGdsZXxpbmcpYm90Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKTtcblxuXHRcdHZhciBzaHJpbmtFeHBhbmQgPSAwO1xuXHRcdHZhciBjdXJyZW50RXhwYW5kID0gMDtcblxuXHRcdHZhciBpc0xvYWRpbmcgPSAwO1xuXHRcdHZhciBsb3dSdW5zID0gLTE7XG5cblx0XHR2YXIgcmVzZXRQcmVsb2FkaW5nID0gZnVuY3Rpb24oZSl7XG5cdFx0XHRpc0xvYWRpbmctLTtcblx0XHRcdGlmKCFlIHx8IGlzTG9hZGluZyA8IDAgfHwgIWUudGFyZ2V0KXtcblx0XHRcdFx0aXNMb2FkaW5nID0gMDtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIGlzVmlzaWJsZSA9IGZ1bmN0aW9uIChlbGVtKSB7XG5cdFx0XHRpZiAoaXNCb2R5SGlkZGVuID09IG51bGwpIHtcblx0XHRcdFx0aXNCb2R5SGlkZGVuID0gZ2V0Q1NTKGRvY3VtZW50LmJvZHksICd2aXNpYmlsaXR5JykgPT0gJ2hpZGRlbic7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBpc0JvZHlIaWRkZW4gfHwgIShnZXRDU1MoZWxlbS5wYXJlbnROb2RlLCAndmlzaWJpbGl0eScpID09ICdoaWRkZW4nICYmIGdldENTUyhlbGVtLCAndmlzaWJpbGl0eScpID09ICdoaWRkZW4nKTtcblx0XHR9O1xuXG5cdFx0dmFyIGlzTmVzdGVkVmlzaWJsZSA9IGZ1bmN0aW9uKGVsZW0sIGVsZW1FeHBhbmQpe1xuXHRcdFx0dmFyIG91dGVyUmVjdDtcblx0XHRcdHZhciBwYXJlbnQgPSBlbGVtO1xuXHRcdFx0dmFyIHZpc2libGUgPSBpc1Zpc2libGUoZWxlbSk7XG5cblx0XHRcdGVMdG9wIC09IGVsZW1FeHBhbmQ7XG5cdFx0XHRlTGJvdHRvbSArPSBlbGVtRXhwYW5kO1xuXHRcdFx0ZUxsZWZ0IC09IGVsZW1FeHBhbmQ7XG5cdFx0XHRlTHJpZ2h0ICs9IGVsZW1FeHBhbmQ7XG5cblx0XHRcdHdoaWxlKHZpc2libGUgJiYgKHBhcmVudCA9IHBhcmVudC5vZmZzZXRQYXJlbnQpICYmIHBhcmVudCAhPSBkb2N1bWVudC5ib2R5ICYmIHBhcmVudCAhPSBkb2NFbGVtKXtcblx0XHRcdFx0dmlzaWJsZSA9ICgoZ2V0Q1NTKHBhcmVudCwgJ29wYWNpdHknKSB8fCAxKSA+IDApO1xuXG5cdFx0XHRcdGlmKHZpc2libGUgJiYgZ2V0Q1NTKHBhcmVudCwgJ292ZXJmbG93JykgIT0gJ3Zpc2libGUnKXtcblx0XHRcdFx0XHRvdXRlclJlY3QgPSBwYXJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdFx0XHRcdFx0dmlzaWJsZSA9IGVMcmlnaHQgPiBvdXRlclJlY3QubGVmdCAmJlxuXHRcdFx0XHRcdFx0ZUxsZWZ0IDwgb3V0ZXJSZWN0LnJpZ2h0ICYmXG5cdFx0XHRcdFx0XHRlTGJvdHRvbSA+IG91dGVyUmVjdC50b3AgLSAxICYmXG5cdFx0XHRcdFx0XHRlTHRvcCA8IG91dGVyUmVjdC5ib3R0b20gKyAxXG5cdFx0XHRcdFx0O1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB2aXNpYmxlO1xuXHRcdH07XG5cblx0XHR2YXIgY2hlY2tFbGVtZW50cyA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGVMbGVuLCBpLCByZWN0LCBhdXRvTG9hZEVsZW0sIGxvYWRlZFNvbWV0aGluZywgZWxlbUV4cGFuZCwgZWxlbU5lZ2F0aXZlRXhwYW5kLCBlbGVtRXhwYW5kVmFsLFxuXHRcdFx0XHRiZWZvcmVFeHBhbmRWYWwsIGRlZmF1bHRFeHBhbmQsIHByZWxvYWRFeHBhbmQsIGhGYWM7XG5cdFx0XHR2YXIgbGF6eWxvYWRFbGVtcyA9IGxhenlzaXplcy5lbGVtZW50cztcblxuXHRcdFx0aWYoKGxvYWRNb2RlID0gbGF6eVNpemVzQ2ZnLmxvYWRNb2RlKSAmJiBpc0xvYWRpbmcgPCA4ICYmIChlTGxlbiA9IGxhenlsb2FkRWxlbXMubGVuZ3RoKSl7XG5cblx0XHRcdFx0aSA9IDA7XG5cblx0XHRcdFx0bG93UnVucysrO1xuXG5cdFx0XHRcdGZvcig7IGkgPCBlTGxlbjsgaSsrKXtcblxuXHRcdFx0XHRcdGlmKCFsYXp5bG9hZEVsZW1zW2ldIHx8IGxhenlsb2FkRWxlbXNbaV0uX2xhenlSYWNlKXtjb250aW51ZTt9XG5cblx0XHRcdFx0XHRpZighc3VwcG9ydFNjcm9sbCB8fCAobGF6eXNpemVzLnByZW1hdHVyZVVudmVpbCAmJiBsYXp5c2l6ZXMucHJlbWF0dXJlVW52ZWlsKGxhenlsb2FkRWxlbXNbaV0pKSl7dW52ZWlsRWxlbWVudChsYXp5bG9hZEVsZW1zW2ldKTtjb250aW51ZTt9XG5cblx0XHRcdFx0XHRpZighKGVsZW1FeHBhbmRWYWwgPSBsYXp5bG9hZEVsZW1zW2ldW19nZXRBdHRyaWJ1dGVdKCdkYXRhLWV4cGFuZCcpKSB8fCAhKGVsZW1FeHBhbmQgPSBlbGVtRXhwYW5kVmFsICogMSkpe1xuXHRcdFx0XHRcdFx0ZWxlbUV4cGFuZCA9IGN1cnJlbnRFeHBhbmQ7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCFkZWZhdWx0RXhwYW5kKSB7XG5cdFx0XHRcdFx0XHRkZWZhdWx0RXhwYW5kID0gKCFsYXp5U2l6ZXNDZmcuZXhwYW5kIHx8IGxhenlTaXplc0NmZy5leHBhbmQgPCAxKSA/XG5cdFx0XHRcdFx0XHRcdGRvY0VsZW0uY2xpZW50SGVpZ2h0ID4gNTAwICYmIGRvY0VsZW0uY2xpZW50V2lkdGggPiA1MDAgPyA1MDAgOiAzNzAgOlxuXHRcdFx0XHRcdFx0XHRsYXp5U2l6ZXNDZmcuZXhwYW5kO1xuXG5cdFx0XHRcdFx0XHRsYXp5c2l6ZXMuX2RlZkV4ID0gZGVmYXVsdEV4cGFuZDtcblxuXHRcdFx0XHRcdFx0cHJlbG9hZEV4cGFuZCA9IGRlZmF1bHRFeHBhbmQgKiBsYXp5U2l6ZXNDZmcuZXhwRmFjdG9yO1xuXHRcdFx0XHRcdFx0aEZhYyA9IGxhenlTaXplc0NmZy5oRmFjO1xuXHRcdFx0XHRcdFx0aXNCb2R5SGlkZGVuID0gbnVsbDtcblxuXHRcdFx0XHRcdFx0aWYoY3VycmVudEV4cGFuZCA8IHByZWxvYWRFeHBhbmQgJiYgaXNMb2FkaW5nIDwgMSAmJiBsb3dSdW5zID4gMiAmJiBsb2FkTW9kZSA+IDIgJiYgIWRvY3VtZW50LmhpZGRlbil7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRFeHBhbmQgPSBwcmVsb2FkRXhwYW5kO1xuXHRcdFx0XHRcdFx0XHRsb3dSdW5zID0gMDtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZihsb2FkTW9kZSA+IDEgJiYgbG93UnVucyA+IDEgJiYgaXNMb2FkaW5nIDwgNil7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRFeHBhbmQgPSBkZWZhdWx0RXhwYW5kO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Y3VycmVudEV4cGFuZCA9IHNocmlua0V4cGFuZDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZihiZWZvcmVFeHBhbmRWYWwgIT09IGVsZW1FeHBhbmQpe1xuXHRcdFx0XHRcdFx0ZUx2VyA9IGlubmVyV2lkdGggKyAoZWxlbUV4cGFuZCAqIGhGYWMpO1xuXHRcdFx0XHRcdFx0ZWx2SCA9IGlubmVySGVpZ2h0ICsgZWxlbUV4cGFuZDtcblx0XHRcdFx0XHRcdGVsZW1OZWdhdGl2ZUV4cGFuZCA9IGVsZW1FeHBhbmQgKiAtMTtcblx0XHRcdFx0XHRcdGJlZm9yZUV4cGFuZFZhbCA9IGVsZW1FeHBhbmQ7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmVjdCA9IGxhenlsb2FkRWxlbXNbaV0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cblx0XHRcdFx0XHRpZiAoKGVMYm90dG9tID0gcmVjdC5ib3R0b20pID49IGVsZW1OZWdhdGl2ZUV4cGFuZCAmJlxuXHRcdFx0XHRcdFx0KGVMdG9wID0gcmVjdC50b3ApIDw9IGVsdkggJiZcblx0XHRcdFx0XHRcdChlTHJpZ2h0ID0gcmVjdC5yaWdodCkgPj0gZWxlbU5lZ2F0aXZlRXhwYW5kICogaEZhYyAmJlxuXHRcdFx0XHRcdFx0KGVMbGVmdCA9IHJlY3QubGVmdCkgPD0gZUx2VyAmJlxuXHRcdFx0XHRcdFx0KGVMYm90dG9tIHx8IGVMcmlnaHQgfHwgZUxsZWZ0IHx8IGVMdG9wKSAmJlxuXHRcdFx0XHRcdFx0KGxhenlTaXplc0NmZy5sb2FkSGlkZGVuIHx8IGlzVmlzaWJsZShsYXp5bG9hZEVsZW1zW2ldKSkgJiZcblx0XHRcdFx0XHRcdCgoaXNDb21wbGV0ZWQgJiYgaXNMb2FkaW5nIDwgMyAmJiAhZWxlbUV4cGFuZFZhbCAmJiAobG9hZE1vZGUgPCAzIHx8IGxvd1J1bnMgPCA0KSkgfHwgaXNOZXN0ZWRWaXNpYmxlKGxhenlsb2FkRWxlbXNbaV0sIGVsZW1FeHBhbmQpKSl7XG5cdFx0XHRcdFx0XHR1bnZlaWxFbGVtZW50KGxhenlsb2FkRWxlbXNbaV0pO1xuXHRcdFx0XHRcdFx0bG9hZGVkU29tZXRoaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdGlmKGlzTG9hZGluZyA+IDkpe2JyZWFrO31cblx0XHRcdFx0XHR9IGVsc2UgaWYoIWxvYWRlZFNvbWV0aGluZyAmJiBpc0NvbXBsZXRlZCAmJiAhYXV0b0xvYWRFbGVtICYmXG5cdFx0XHRcdFx0XHRpc0xvYWRpbmcgPCA0ICYmIGxvd1J1bnMgPCA0ICYmIGxvYWRNb2RlID4gMiAmJlxuXHRcdFx0XHRcdFx0KHByZWxvYWRFbGVtc1swXSB8fCBsYXp5U2l6ZXNDZmcucHJlbG9hZEFmdGVyTG9hZCkgJiZcblx0XHRcdFx0XHRcdChwcmVsb2FkRWxlbXNbMF0gfHwgKCFlbGVtRXhwYW5kVmFsICYmICgoZUxib3R0b20gfHwgZUxyaWdodCB8fCBlTGxlZnQgfHwgZUx0b3ApIHx8IGxhenlsb2FkRWxlbXNbaV1bX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ2ZnLnNpemVzQXR0cikgIT0gJ2F1dG8nKSkpKXtcblx0XHRcdFx0XHRcdGF1dG9Mb2FkRWxlbSA9IHByZWxvYWRFbGVtc1swXSB8fCBsYXp5bG9hZEVsZW1zW2ldO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGF1dG9Mb2FkRWxlbSAmJiAhbG9hZGVkU29tZXRoaW5nKXtcblx0XHRcdFx0XHR1bnZlaWxFbGVtZW50KGF1dG9Mb2FkRWxlbSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIHRocm90dGxlZENoZWNrRWxlbWVudHMgPSB0aHJvdHRsZShjaGVja0VsZW1lbnRzKTtcblxuXHRcdHZhciBzd2l0Y2hMb2FkaW5nQ2xhc3MgPSBmdW5jdGlvbihlKXtcblx0XHRcdHZhciBlbGVtID0gZS50YXJnZXQ7XG5cblx0XHRcdGlmIChlbGVtLl9sYXp5Q2FjaGUpIHtcblx0XHRcdFx0ZGVsZXRlIGVsZW0uX2xhenlDYWNoZTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXNldFByZWxvYWRpbmcoZSk7XG5cdFx0XHRhZGRDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcubG9hZGVkQ2xhc3MpO1xuXHRcdFx0cmVtb3ZlQ2xhc3MoZWxlbSwgbGF6eVNpemVzQ2ZnLmxvYWRpbmdDbGFzcyk7XG5cdFx0XHRhZGRSZW1vdmVMb2FkRXZlbnRzKGVsZW0sIHJhZlN3aXRjaExvYWRpbmdDbGFzcyk7XG5cdFx0XHR0cmlnZ2VyRXZlbnQoZWxlbSwgJ2xhenlsb2FkZWQnKTtcblx0XHR9O1xuXHRcdHZhciByYWZlZFN3aXRjaExvYWRpbmdDbGFzcyA9IHJBRkl0KHN3aXRjaExvYWRpbmdDbGFzcyk7XG5cdFx0dmFyIHJhZlN3aXRjaExvYWRpbmdDbGFzcyA9IGZ1bmN0aW9uKGUpe1xuXHRcdFx0cmFmZWRTd2l0Y2hMb2FkaW5nQ2xhc3Moe3RhcmdldDogZS50YXJnZXR9KTtcblx0XHR9O1xuXG5cdFx0dmFyIGNoYW5nZUlmcmFtZVNyYyA9IGZ1bmN0aW9uKGVsZW0sIHNyYyl7XG5cdFx0XHR2YXIgbG9hZE1vZGUgPSBlbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1sb2FkLW1vZGUnKSB8fCBsYXp5U2l6ZXNDZmcuaWZyYW1lTG9hZE1vZGU7XG5cblx0XHRcdC8vIGxvYWRNb2RlIGNhbiBiZSBhbHNvIGEgc3RyaW5nIVxuXHRcdFx0aWYgKGxvYWRNb2RlID09IDApIHtcblx0XHRcdFx0ZWxlbS5jb250ZW50V2luZG93LmxvY2F0aW9uLnJlcGxhY2Uoc3JjKTtcblx0XHRcdH0gZWxzZSBpZiAobG9hZE1vZGUgPT0gMSkge1xuXHRcdFx0XHRlbGVtLnNyYyA9IHNyYztcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIGhhbmRsZVNvdXJjZXMgPSBmdW5jdGlvbihzb3VyY2Upe1xuXHRcdFx0dmFyIGN1c3RvbU1lZGlhO1xuXG5cdFx0XHR2YXIgc291cmNlU3Jjc2V0ID0gc291cmNlW19nZXRBdHRyaWJ1dGVdKGxhenlTaXplc0NmZy5zcmNzZXRBdHRyKTtcblxuXHRcdFx0aWYoIChjdXN0b21NZWRpYSA9IGxhenlTaXplc0NmZy5jdXN0b21NZWRpYVtzb3VyY2VbX2dldEF0dHJpYnV0ZV0oJ2RhdGEtbWVkaWEnKSB8fCBzb3VyY2VbX2dldEF0dHJpYnV0ZV0oJ21lZGlhJyldKSApe1xuXHRcdFx0XHRzb3VyY2Uuc2V0QXR0cmlidXRlKCdtZWRpYScsIGN1c3RvbU1lZGlhKTtcblx0XHRcdH1cblxuXHRcdFx0aWYoc291cmNlU3Jjc2V0KXtcblx0XHRcdFx0c291cmNlLnNldEF0dHJpYnV0ZSgnc3Jjc2V0Jywgc291cmNlU3Jjc2V0KTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIGxhenlVbnZlaWwgPSByQUZJdChmdW5jdGlvbiAoZWxlbSwgZGV0YWlsLCBpc0F1dG8sIHNpemVzLCBpc0ltZyl7XG5cdFx0XHR2YXIgc3JjLCBzcmNzZXQsIHBhcmVudCwgaXNQaWN0dXJlLCBldmVudCwgZmlyZXNMb2FkO1xuXG5cdFx0XHRpZighKGV2ZW50ID0gdHJpZ2dlckV2ZW50KGVsZW0sICdsYXp5YmVmb3JldW52ZWlsJywgZGV0YWlsKSkuZGVmYXVsdFByZXZlbnRlZCl7XG5cblx0XHRcdFx0aWYoc2l6ZXMpe1xuXHRcdFx0XHRcdGlmKGlzQXV0byl7XG5cdFx0XHRcdFx0XHRhZGRDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcuYXV0b3NpemVzQ2xhc3MpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSgnc2l6ZXMnLCBzaXplcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0c3Jjc2V0ID0gZWxlbVtfZ2V0QXR0cmlidXRlXShsYXp5U2l6ZXNDZmcuc3Jjc2V0QXR0cik7XG5cdFx0XHRcdHNyYyA9IGVsZW1bX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ2ZnLnNyY0F0dHIpO1xuXG5cdFx0XHRcdGlmKGlzSW1nKSB7XG5cdFx0XHRcdFx0cGFyZW50ID0gZWxlbS5wYXJlbnROb2RlO1xuXHRcdFx0XHRcdGlzUGljdHVyZSA9IHBhcmVudCAmJiByZWdQaWN0dXJlLnRlc3QocGFyZW50Lm5vZGVOYW1lIHx8ICcnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZpcmVzTG9hZCA9IGRldGFpbC5maXJlc0xvYWQgfHwgKCgnc3JjJyBpbiBlbGVtKSAmJiAoc3Jjc2V0IHx8IHNyYyB8fCBpc1BpY3R1cmUpKTtcblxuXHRcdFx0XHRldmVudCA9IHt0YXJnZXQ6IGVsZW19O1xuXG5cdFx0XHRcdGFkZENsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5sb2FkaW5nQ2xhc3MpO1xuXG5cdFx0XHRcdGlmKGZpcmVzTG9hZCl7XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHJlc2V0UHJlbG9hZGluZ1RpbWVyKTtcblx0XHRcdFx0XHRyZXNldFByZWxvYWRpbmdUaW1lciA9IHNldFRpbWVvdXQocmVzZXRQcmVsb2FkaW5nLCAyNTAwKTtcblx0XHRcdFx0XHRhZGRSZW1vdmVMb2FkRXZlbnRzKGVsZW0sIHJhZlN3aXRjaExvYWRpbmdDbGFzcywgdHJ1ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihpc1BpY3R1cmUpe1xuXHRcdFx0XHRcdGZvckVhY2guY2FsbChwYXJlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NvdXJjZScpLCBoYW5kbGVTb3VyY2VzKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKHNyY3NldCl7XG5cdFx0XHRcdFx0ZWxlbS5zZXRBdHRyaWJ1dGUoJ3NyY3NldCcsIHNyY3NldCk7XG5cdFx0XHRcdH0gZWxzZSBpZihzcmMgJiYgIWlzUGljdHVyZSl7XG5cdFx0XHRcdFx0aWYocmVnSWZyYW1lLnRlc3QoZWxlbS5ub2RlTmFtZSkpe1xuXHRcdFx0XHRcdFx0Y2hhbmdlSWZyYW1lU3JjKGVsZW0sIHNyYyk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVsZW0uc3JjID0gc3JjO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKGlzSW1nICYmIChzcmNzZXQgfHwgaXNQaWN0dXJlKSl7XG5cdFx0XHRcdFx0dXBkYXRlUG9seWZpbGwoZWxlbSwge3NyYzogc3JjfSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYoZWxlbS5fbGF6eVJhY2Upe1xuXHRcdFx0XHRkZWxldGUgZWxlbS5fbGF6eVJhY2U7XG5cdFx0XHR9XG5cdFx0XHRyZW1vdmVDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcubGF6eUNsYXNzKTtcblxuXHRcdFx0ckFGKGZ1bmN0aW9uKCl7XG5cdFx0XHRcdC8vIFBhcnQgb2YgdGhpcyBjYW4gYmUgcmVtb3ZlZCBhcyBzb29uIGFzIHRoaXMgZml4IGlzIG9sZGVyOiBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD03NzMxICgyMDE1KVxuXHRcdFx0XHR2YXIgaXNMb2FkZWQgPSBlbGVtLmNvbXBsZXRlICYmIGVsZW0ubmF0dXJhbFdpZHRoID4gMTtcblxuXHRcdFx0XHRpZiggIWZpcmVzTG9hZCB8fCBpc0xvYWRlZCl7XG5cdFx0XHRcdFx0aWYgKGlzTG9hZGVkKSB7XG5cdFx0XHRcdFx0XHRhZGRDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcuZmFzdExvYWRlZENsYXNzKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0c3dpdGNoTG9hZGluZ0NsYXNzKGV2ZW50KTtcblx0XHRcdFx0XHRlbGVtLl9sYXp5Q2FjaGUgPSB0cnVlO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcblx0XHRcdFx0XHRcdGlmICgnX2xhenlDYWNoZScgaW4gZWxlbSkge1xuXHRcdFx0XHRcdFx0XHRkZWxldGUgZWxlbS5fbGF6eUNhY2hlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0sIDkpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChlbGVtLmxvYWRpbmcgPT0gJ2xhenknKSB7XG5cdFx0XHRcdFx0aXNMb2FkaW5nLS07XG5cdFx0XHRcdH1cblx0XHRcdH0sIHRydWUpO1xuXHRcdH0pO1xuXG5cdFx0LyoqXG5cdFx0ICpcblx0XHQgKiBAcGFyYW0gZWxlbSB7IEVsZW1lbnQgfVxuXHRcdCAqL1xuXHRcdHZhciB1bnZlaWxFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW0pe1xuXHRcdFx0aWYgKGVsZW0uX2xhenlSYWNlKSB7cmV0dXJuO31cblx0XHRcdHZhciBkZXRhaWw7XG5cblx0XHRcdHZhciBpc0ltZyA9IHJlZ0ltZy50ZXN0KGVsZW0ubm9kZU5hbWUpO1xuXG5cdFx0XHQvL2FsbG93IHVzaW5nIHNpemVzPVwiYXV0b1wiLCBidXQgZG9uJ3QgdXNlLiBpdCdzIGludmFsaWQuIFVzZSBkYXRhLXNpemVzPVwiYXV0b1wiIG9yIGEgdmFsaWQgdmFsdWUgZm9yIHNpemVzIGluc3RlYWQgKGkuZS46IHNpemVzPVwiODB2d1wiKVxuXHRcdFx0dmFyIHNpemVzID0gaXNJbWcgJiYgKGVsZW1bX2dldEF0dHJpYnV0ZV0obGF6eVNpemVzQ2ZnLnNpemVzQXR0cikgfHwgZWxlbVtfZ2V0QXR0cmlidXRlXSgnc2l6ZXMnKSk7XG5cdFx0XHR2YXIgaXNBdXRvID0gc2l6ZXMgPT0gJ2F1dG8nO1xuXG5cdFx0XHRpZiggKGlzQXV0byB8fCAhaXNDb21wbGV0ZWQpICYmIGlzSW1nICYmIChlbGVtW19nZXRBdHRyaWJ1dGVdKCdzcmMnKSB8fCBlbGVtLnNyY3NldCkgJiYgIWVsZW0uY29tcGxldGUgJiYgIWhhc0NsYXNzKGVsZW0sIGxhenlTaXplc0NmZy5lcnJvckNsYXNzKSAmJiBoYXNDbGFzcyhlbGVtLCBsYXp5U2l6ZXNDZmcubGF6eUNsYXNzKSl7cmV0dXJuO31cblxuXHRcdFx0ZGV0YWlsID0gdHJpZ2dlckV2ZW50KGVsZW0sICdsYXp5dW52ZWlscmVhZCcpLmRldGFpbDtcblxuXHRcdFx0aWYoaXNBdXRvKXtcblx0XHRcdFx0IGF1dG9TaXplci51cGRhdGVFbGVtKGVsZW0sIHRydWUsIGVsZW0ub2Zmc2V0V2lkdGgpO1xuXHRcdFx0fVxuXG5cdFx0XHRlbGVtLl9sYXp5UmFjZSA9IHRydWU7XG5cdFx0XHRpc0xvYWRpbmcrKztcblxuXHRcdFx0bGF6eVVudmVpbChlbGVtLCBkZXRhaWwsIGlzQXV0bywgc2l6ZXMsIGlzSW1nKTtcblx0XHR9O1xuXG5cdFx0dmFyIGFmdGVyU2Nyb2xsID0gZGVib3VuY2UoZnVuY3Rpb24oKXtcblx0XHRcdGxhenlTaXplc0NmZy5sb2FkTW9kZSA9IDM7XG5cdFx0XHR0aHJvdHRsZWRDaGVja0VsZW1lbnRzKCk7XG5cdFx0fSk7XG5cblx0XHR2YXIgYWx0TG9hZG1vZGVTY3JvbGxMaXN0bmVyID0gZnVuY3Rpb24oKXtcblx0XHRcdGlmKGxhenlTaXplc0NmZy5sb2FkTW9kZSA9PSAzKXtcblx0XHRcdFx0bGF6eVNpemVzQ2ZnLmxvYWRNb2RlID0gMjtcblx0XHRcdH1cblx0XHRcdGFmdGVyU2Nyb2xsKCk7XG5cdFx0fTtcblxuXHRcdHZhciBvbmxvYWQgPSBmdW5jdGlvbigpe1xuXHRcdFx0aWYoaXNDb21wbGV0ZWQpe3JldHVybjt9XG5cdFx0XHRpZihEYXRlLm5vdygpIC0gc3RhcnRlZCA8IDk5OSl7XG5cdFx0XHRcdHNldFRpbWVvdXQob25sb2FkLCA5OTkpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblxuXHRcdFx0aXNDb21wbGV0ZWQgPSB0cnVlO1xuXG5cdFx0XHRsYXp5U2l6ZXNDZmcubG9hZE1vZGUgPSAzO1xuXG5cdFx0XHR0aHJvdHRsZWRDaGVja0VsZW1lbnRzKCk7XG5cblx0XHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFsdExvYWRtb2RlU2Nyb2xsTGlzdG5lciwgdHJ1ZSk7XG5cdFx0fTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRfOiBmdW5jdGlvbigpe1xuXHRcdFx0XHRzdGFydGVkID0gRGF0ZS5ub3coKTtcblxuXHRcdFx0XHRsYXp5c2l6ZXMuZWxlbWVudHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxhenlTaXplc0NmZy5sYXp5Q2xhc3MpO1xuXHRcdFx0XHRwcmVsb2FkRWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGxhenlTaXplc0NmZy5sYXp5Q2xhc3MgKyAnICcgKyBsYXp5U2l6ZXNDZmcucHJlbG9hZENsYXNzKTtcblxuXHRcdFx0XHRhZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblxuXHRcdFx0XHRhZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblxuXHRcdFx0XHRhZGRFdmVudExpc3RlbmVyKCdwYWdlc2hvdycsIGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0aWYgKGUucGVyc2lzdGVkKSB7XG5cdFx0XHRcdFx0XHR2YXIgbG9hZGluZ0VsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLicgKyBsYXp5U2l6ZXNDZmcubG9hZGluZ0NsYXNzKTtcblxuXHRcdFx0XHRcdFx0aWYgKGxvYWRpbmdFbGVtZW50cy5sZW5ndGggJiYgbG9hZGluZ0VsZW1lbnRzLmZvckVhY2gpIHtcblx0XHRcdFx0XHRcdFx0cmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0XHRsb2FkaW5nRWxlbWVudHMuZm9yRWFjaCggZnVuY3Rpb24gKGltZykge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGltZy5jb21wbGV0ZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR1bnZlaWxFbGVtZW50KGltZyk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0aWYod2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIpe1xuXHRcdFx0XHRcdG5ldyBNdXRhdGlvbk9ic2VydmVyKCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzICkub2JzZXJ2ZSggZG9jRWxlbSwge2NoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSwgYXR0cmlidXRlczogdHJ1ZX0gKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkb2NFbGVtW19hZGRFdmVudExpc3RlbmVyXSgnRE9NTm9kZUluc2VydGVkJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cdFx0XHRcdFx0ZG9jRWxlbVtfYWRkRXZlbnRMaXN0ZW5lcl0oJ0RPTUF0dHJNb2RpZmllZCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXHRcdFx0XHRcdHNldEludGVydmFsKHRocm90dGxlZENoZWNrRWxlbWVudHMsIDk5OSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cblx0XHRcdFx0Ly8sICdmdWxsc2NyZWVuY2hhbmdlJ1xuXHRcdFx0XHRbJ2ZvY3VzJywgJ21vdXNlb3ZlcicsICdjbGljaycsICdsb2FkJywgJ3RyYW5zaXRpb25lbmQnLCAnYW5pbWF0aW9uZW5kJ10uZm9yRWFjaChmdW5jdGlvbihuYW1lKXtcblx0XHRcdFx0XHRkb2N1bWVudFtfYWRkRXZlbnRMaXN0ZW5lcl0obmFtZSwgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmKCgvZCR8XmMvLnRlc3QoZG9jdW1lbnQucmVhZHlTdGF0ZSkpKXtcblx0XHRcdFx0XHRvbmxvYWQoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhZGRFdmVudExpc3RlbmVyKCdsb2FkJywgb25sb2FkKTtcblx0XHRcdFx0XHRkb2N1bWVudFtfYWRkRXZlbnRMaXN0ZW5lcl0oJ0RPTUNvbnRlbnRMb2FkZWQnLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzKTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KG9ubG9hZCwgMjAwMDApO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYobGF6eXNpemVzLmVsZW1lbnRzLmxlbmd0aCl7XG5cdFx0XHRcdFx0Y2hlY2tFbGVtZW50cygpO1xuXHRcdFx0XHRcdHJBRi5fbHNGbHVzaCgpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRocm90dGxlZENoZWNrRWxlbWVudHMoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNoZWNrRWxlbXM6IHRocm90dGxlZENoZWNrRWxlbWVudHMsXG5cdFx0XHR1bnZlaWw6IHVudmVpbEVsZW1lbnQsXG5cdFx0XHRfYUxTTDogYWx0TG9hZG1vZGVTY3JvbGxMaXN0bmVyLFxuXHRcdH07XG5cdH0pKCk7XG5cblxuXHR2YXIgYXV0b1NpemVyID0gKGZ1bmN0aW9uKCl7XG5cdFx0dmFyIGF1dG9zaXplc0VsZW1zO1xuXG5cdFx0dmFyIHNpemVFbGVtZW50ID0gckFGSXQoZnVuY3Rpb24oZWxlbSwgcGFyZW50LCBldmVudCwgd2lkdGgpe1xuXHRcdFx0dmFyIHNvdXJjZXMsIGksIGxlbjtcblx0XHRcdGVsZW0uX2xhenlzaXplc1dpZHRoID0gd2lkdGg7XG5cdFx0XHR3aWR0aCArPSAncHgnO1xuXG5cdFx0XHRlbGVtLnNldEF0dHJpYnV0ZSgnc2l6ZXMnLCB3aWR0aCk7XG5cblx0XHRcdGlmKHJlZ1BpY3R1cmUudGVzdChwYXJlbnQubm9kZU5hbWUgfHwgJycpKXtcblx0XHRcdFx0c291cmNlcyA9IHBhcmVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc291cmNlJyk7XG5cdFx0XHRcdGZvcihpID0gMCwgbGVuID0gc291cmNlcy5sZW5ndGg7IGkgPCBsZW47IGkrKyl7XG5cdFx0XHRcdFx0c291cmNlc1tpXS5zZXRBdHRyaWJ1dGUoJ3NpemVzJywgd2lkdGgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmKCFldmVudC5kZXRhaWwuZGF0YUF0dHIpe1xuXHRcdFx0XHR1cGRhdGVQb2x5ZmlsbChlbGVtLCBldmVudC5kZXRhaWwpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdC8qKlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtIGVsZW0ge0VsZW1lbnR9XG5cdFx0ICogQHBhcmFtIGRhdGFBdHRyXG5cdFx0ICogQHBhcmFtIFt3aWR0aF0geyBudW1iZXIgfVxuXHRcdCAqL1xuXHRcdHZhciBnZXRTaXplRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtLCBkYXRhQXR0ciwgd2lkdGgpe1xuXHRcdFx0dmFyIGV2ZW50O1xuXHRcdFx0dmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZTtcblxuXHRcdFx0aWYocGFyZW50KXtcblx0XHRcdFx0d2lkdGggPSBnZXRXaWR0aChlbGVtLCBwYXJlbnQsIHdpZHRoKTtcblx0XHRcdFx0ZXZlbnQgPSB0cmlnZ2VyRXZlbnQoZWxlbSwgJ2xhenliZWZvcmVzaXplcycsIHt3aWR0aDogd2lkdGgsIGRhdGFBdHRyOiAhIWRhdGFBdHRyfSk7XG5cblx0XHRcdFx0aWYoIWV2ZW50LmRlZmF1bHRQcmV2ZW50ZWQpe1xuXHRcdFx0XHRcdHdpZHRoID0gZXZlbnQuZGV0YWlsLndpZHRoO1xuXG5cdFx0XHRcdFx0aWYod2lkdGggJiYgd2lkdGggIT09IGVsZW0uX2xhenlzaXplc1dpZHRoKXtcblx0XHRcdFx0XHRcdHNpemVFbGVtZW50KGVsZW0sIHBhcmVudCwgZXZlbnQsIHdpZHRoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIHVwZGF0ZUVsZW1lbnRzU2l6ZXMgPSBmdW5jdGlvbigpe1xuXHRcdFx0dmFyIGk7XG5cdFx0XHR2YXIgbGVuID0gYXV0b3NpemVzRWxlbXMubGVuZ3RoO1xuXHRcdFx0aWYobGVuKXtcblx0XHRcdFx0aSA9IDA7XG5cblx0XHRcdFx0Zm9yKDsgaSA8IGxlbjsgaSsrKXtcblx0XHRcdFx0XHRnZXRTaXplRWxlbWVudChhdXRvc2l6ZXNFbGVtc1tpXSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0dmFyIGRlYm91bmNlZFVwZGF0ZUVsZW1lbnRzU2l6ZXMgPSBkZWJvdW5jZSh1cGRhdGVFbGVtZW50c1NpemVzKTtcblxuXHRcdHJldHVybiB7XG5cdFx0XHRfOiBmdW5jdGlvbigpe1xuXHRcdFx0XHRhdXRvc2l6ZXNFbGVtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUobGF6eVNpemVzQ2ZnLmF1dG9zaXplc0NsYXNzKTtcblx0XHRcdFx0YWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZGVib3VuY2VkVXBkYXRlRWxlbWVudHNTaXplcyk7XG5cdFx0XHR9LFxuXHRcdFx0Y2hlY2tFbGVtczogZGVib3VuY2VkVXBkYXRlRWxlbWVudHNTaXplcyxcblx0XHRcdHVwZGF0ZUVsZW06IGdldFNpemVFbGVtZW50XG5cdFx0fTtcblx0fSkoKTtcblxuXHR2YXIgaW5pdCA9IGZ1bmN0aW9uKCl7XG5cdFx0aWYoIWluaXQuaSAmJiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKXtcblx0XHRcdGluaXQuaSA9IHRydWU7XG5cdFx0XHRhdXRvU2l6ZXIuXygpO1xuXHRcdFx0bG9hZGVyLl8oKTtcblx0XHR9XG5cdH07XG5cblx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdGlmKGxhenlTaXplc0NmZy5pbml0KXtcblx0XHRcdGluaXQoKTtcblx0XHR9XG5cdH0pO1xuXG5cdGxhenlzaXplcyA9IHtcblx0XHQvKipcblx0XHQgKiBAdHlwZSB7IExhenlTaXplc0NvbmZpZ1BhcnRpYWwgfVxuXHRcdCAqL1xuXHRcdGNmZzogbGF6eVNpemVzQ2ZnLFxuXHRcdGF1dG9TaXplcjogYXV0b1NpemVyLFxuXHRcdGxvYWRlcjogbG9hZGVyLFxuXHRcdGluaXQ6IGluaXQsXG5cdFx0dVA6IHVwZGF0ZVBvbHlmaWxsLFxuXHRcdGFDOiBhZGRDbGFzcyxcblx0XHRyQzogcmVtb3ZlQ2xhc3MsXG5cdFx0aEM6IGhhc0NsYXNzLFxuXHRcdGZpcmU6IHRyaWdnZXJFdmVudCxcblx0XHRnVzogZ2V0V2lkdGgsXG5cdFx0ckFGOiByQUYsXG5cdH07XG5cblx0cmV0dXJuIGxhenlzaXplcztcbn1cbikpO1xuIiwgIihmdW5jdGlvbih3aW5kb3csIGZhY3RvcnkpIHtcblx0dmFyIGdsb2JhbEluc3RhbGwgPSBmdW5jdGlvbigpe1xuXHRcdGZhY3Rvcnkod2luZG93LmxhenlTaXplcyk7XG5cdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2xhenl1bnZlaWxyZWFkJywgZ2xvYmFsSW5zdGFsbCwgdHJ1ZSk7XG5cdH07XG5cblx0ZmFjdG9yeSA9IGZhY3RvcnkuYmluZChudWxsLCB3aW5kb3csIHdpbmRvdy5kb2N1bWVudCk7XG5cblx0aWYodHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyl7XG5cdFx0ZmFjdG9yeShyZXF1aXJlKCdsYXp5c2l6ZXMnKSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcblx0XHRkZWZpbmUoWydsYXp5c2l6ZXMnXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZih3aW5kb3cubGF6eVNpemVzKSB7XG5cdFx0Z2xvYmFsSW5zdGFsbCgpO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsYXp5dW52ZWlscmVhZCcsIGdsb2JhbEluc3RhbGwsIHRydWUpO1xuXHR9XG59KHdpbmRvdywgZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgbGF6eVNpemVzKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaW1nU3VwcG9ydCA9ICdsb2FkaW5nJyBpbiBIVE1MSW1hZ2VFbGVtZW50LnByb3RvdHlwZTtcblx0dmFyIGlmcmFtZVN1cHBvcnQgPSAnbG9hZGluZycgaW4gSFRNTElGcmFtZUVsZW1lbnQucHJvdG90eXBlO1xuXHR2YXIgaXNDb25maWdTZXQgPSBmYWxzZTtcblx0dmFyIG9sZFByZW1hdHVyZVVudmVpbCA9IGxhenlTaXplcy5wcmVtYXR1cmVVbnZlaWw7XG5cdHZhciBjZmcgPSBsYXp5U2l6ZXMuY2ZnO1xuXHR2YXIgbGlzdGVuZXJNYXAgPSB7XG5cdFx0Zm9jdXM6IDEsXG5cdFx0bW91c2VvdmVyOiAxLFxuXHRcdGNsaWNrOiAxLFxuXHRcdGxvYWQ6IDEsXG5cdFx0dHJhbnNpdGlvbmVuZDogMSxcblx0XHRhbmltYXRpb25lbmQ6IDEsXG5cdFx0c2Nyb2xsOiAxLFxuXHRcdHJlc2l6ZTogMSxcblx0fTtcblxuXHRpZiAoIWNmZy5uYXRpdmVMb2FkaW5nKSB7XG5cdFx0Y2ZnLm5hdGl2ZUxvYWRpbmcgPSB7fTtcblx0fVxuXG5cdGlmICghd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgfHwgIXdpbmRvdy5NdXRhdGlvbk9ic2VydmVyIHx8ICghaW1nU3VwcG9ydCAmJiAhaWZyYW1lU3VwcG9ydCkpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRmdW5jdGlvbiBkaXNhYmxlRXZlbnRzKCkge1xuXHRcdHZhciBsb2FkZXIgPSBsYXp5U2l6ZXMubG9hZGVyO1xuXHRcdHZhciB0aHJvdHRsZWRDaGVja0VsZW1lbnRzID0gbG9hZGVyLmNoZWNrRWxlbXM7XG5cdFx0dmFyIHJlbW92ZUFMU0wgPSBmdW5jdGlvbigpe1xuXHRcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgbG9hZGVyLl9hTFNMLCB0cnVlKTtcblx0XHRcdH0sIDEwMDApO1xuXHRcdH07XG5cdFx0dmFyIGN1cnJlbnRMaXN0ZW5lck1hcCA9IHR5cGVvZiBjZmcubmF0aXZlTG9hZGluZy5kaXNhYmxlTGlzdGVuZXJzID09ICdvYmplY3QnID9cblx0XHRcdGNmZy5uYXRpdmVMb2FkaW5nLmRpc2FibGVMaXN0ZW5lcnMgOlxuXHRcdFx0bGlzdGVuZXJNYXA7XG5cblx0XHRpZiAoY3VycmVudExpc3RlbmVyTWFwLnNjcm9sbCkge1xuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCByZW1vdmVBTFNMKTtcblx0XHRcdHJlbW92ZUFMU0woKTtcblxuXHRcdFx0d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRocm90dGxlZENoZWNrRWxlbWVudHMsIHRydWUpO1xuXHRcdH1cblxuXHRcdGlmIChjdXJyZW50TGlzdGVuZXJNYXAucmVzaXplKSB7XG5cdFx0XHR3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhyb3R0bGVkQ2hlY2tFbGVtZW50cywgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0T2JqZWN0LmtleXMoY3VycmVudExpc3RlbmVyTWFwKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcblx0XHRcdGlmIChjdXJyZW50TGlzdGVuZXJNYXBbbmFtZV0pIHtcblx0XHRcdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCB0aHJvdHRsZWRDaGVja0VsZW1lbnRzLCB0cnVlKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHJ1bkNvbmZpZygpIHtcblx0XHRpZiAoaXNDb25maWdTZXQpIHtyZXR1cm47fVxuXHRcdGlzQ29uZmlnU2V0ID0gdHJ1ZTtcblxuXHRcdGlmIChpbWdTdXBwb3J0ICYmIGlmcmFtZVN1cHBvcnQgJiYgY2ZnLm5hdGl2ZUxvYWRpbmcuZGlzYWJsZUxpc3RlbmVycykge1xuXHRcdFx0aWYgKGNmZy5uYXRpdmVMb2FkaW5nLmRpc2FibGVMaXN0ZW5lcnMgPT09IHRydWUpIHtcblx0XHRcdFx0Y2ZnLm5hdGl2ZUxvYWRpbmcuc2V0TG9hZGluZ0F0dHJpYnV0ZSA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGRpc2FibGVFdmVudHMoKTtcblx0XHR9XG5cblx0XHRpZiAoY2ZnLm5hdGl2ZUxvYWRpbmcuc2V0TG9hZGluZ0F0dHJpYnV0ZSkge1xuXHRcdFx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xhenliZWZvcmV1bnZlaWwnLCBmdW5jdGlvbihlKXtcblx0XHRcdFx0dmFyIGVsZW1lbnQgPSBlLnRhcmdldDtcblxuXHRcdFx0XHRpZiAoJ2xvYWRpbmcnIGluIGVsZW1lbnQgJiYgIWVsZW1lbnQuZ2V0QXR0cmlidXRlKCdsb2FkaW5nJykpIHtcblx0XHRcdFx0XHRlbGVtZW50LnNldEF0dHJpYnV0ZSgnbG9hZGluZycsICdsYXp5Jyk7XG5cdFx0XHRcdH1cblx0XHRcdH0sIHRydWUpO1xuXHRcdH1cblx0fVxuXG5cdGxhenlTaXplcy5wcmVtYXR1cmVVbnZlaWwgPSBmdW5jdGlvbiBwcmVtYXR1cmVVbnZlaWwoZWxlbWVudCkge1xuXG5cdFx0aWYgKCFpc0NvbmZpZ1NldCkge1xuXHRcdFx0cnVuQ29uZmlnKCk7XG5cdFx0fVxuXG5cdFx0aWYgKCdsb2FkaW5nJyBpbiBlbGVtZW50ICYmXG5cdFx0XHQoY2ZnLm5hdGl2ZUxvYWRpbmcuc2V0TG9hZGluZ0F0dHJpYnV0ZSB8fCBlbGVtZW50LmdldEF0dHJpYnV0ZSgnbG9hZGluZycpKSAmJlxuXHRcdFx0KGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLXNpemVzJykgIT0gJ2F1dG8nIHx8IGVsZW1lbnQub2Zmc2V0V2lkdGgpKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAob2xkUHJlbWF0dXJlVW52ZWlsKSB7XG5cdFx0XHRyZXR1cm4gb2xkUHJlbWF0dXJlVW52ZWlsKGVsZW1lbnQpO1xuXHRcdH1cblx0fTtcblxufSkpO1xuIiwgIi8qIVxuICogY2xpcGJvYXJkLmpzIHYyLjAuMTFcbiAqIGh0dHBzOi8vY2xpcGJvYXJkanMuY29tL1xuICpcbiAqIExpY2Vuc2VkIE1JVCBcdTAwQTkgWmVubyBSb2NoYVxuICovXG4oZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJDbGlwYm9hcmRKU1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJDbGlwYm9hcmRKU1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbigpIHsgLy8gd2VicGFja0Jvb3RzdHJhcFxuLyoqKioqKi8gXHR2YXIgX193ZWJwYWNrX21vZHVsZXNfXyA9ICh7XG5cbi8qKiovIDY4Njpcbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgX193ZWJwYWNrX2V4cG9ydHNfXywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLy8gRVhQT1JUU1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kKF9fd2VicGFja19leHBvcnRzX18sIHtcbiAgXCJkZWZhdWx0XCI6IGZ1bmN0aW9uKCkgeyByZXR1cm4gLyogYmluZGluZyAqLyBjbGlwYm9hcmQ7IH1cbn0pO1xuXG4vLyBFWFRFUk5BTCBNT0RVTEU6IC4vbm9kZV9tb2R1bGVzL3RpbnktZW1pdHRlci9pbmRleC5qc1xudmFyIHRpbnlfZW1pdHRlciA9IF9fd2VicGFja19yZXF1aXJlX18oMjc5KTtcbnZhciB0aW55X2VtaXR0ZXJfZGVmYXVsdCA9IC8qI19fUFVSRV9fKi9fX3dlYnBhY2tfcmVxdWlyZV9fLm4odGlueV9lbWl0dGVyKTtcbi8vIEVYVEVSTkFMIE1PRFVMRTogLi9ub2RlX21vZHVsZXMvZ29vZC1saXN0ZW5lci9zcmMvbGlzdGVuLmpzXG52YXIgbGlzdGVuID0gX193ZWJwYWNrX3JlcXVpcmVfXygzNzApO1xudmFyIGxpc3Rlbl9kZWZhdWx0ID0gLyojX19QVVJFX18qL19fd2VicGFja19yZXF1aXJlX18ubihsaXN0ZW4pO1xuLy8gRVhURVJOQUwgTU9EVUxFOiAuL25vZGVfbW9kdWxlcy9zZWxlY3Qvc3JjL3NlbGVjdC5qc1xudmFyIHNyY19zZWxlY3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDgxNyk7XG52YXIgc2VsZWN0X2RlZmF1bHQgPSAvKiNfX1BVUkVfXyovX193ZWJwYWNrX3JlcXVpcmVfXy5uKHNyY19zZWxlY3QpO1xuOy8vIENPTkNBVEVOQVRFRCBNT0RVTEU6IC4vc3JjL2NvbW1vbi9jb21tYW5kLmpzXG4vKipcbiAqIEV4ZWN1dGVzIGEgZ2l2ZW4gb3BlcmF0aW9uIHR5cGUuXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gY29tbWFuZCh0eXBlKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmV4ZWNDb21tYW5kKHR5cGUpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9hY3Rpb25zL2N1dC5qc1xuXG5cbi8qKlxuICogQ3V0IGFjdGlvbiB3cmFwcGVyLlxuICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR9IHRhcmdldFxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5cbnZhciBDbGlwYm9hcmRBY3Rpb25DdXQgPSBmdW5jdGlvbiBDbGlwYm9hcmRBY3Rpb25DdXQodGFyZ2V0KSB7XG4gIHZhciBzZWxlY3RlZFRleHQgPSBzZWxlY3RfZGVmYXVsdCgpKHRhcmdldCk7XG4gIGNvbW1hbmQoJ2N1dCcpO1xuICByZXR1cm4gc2VsZWN0ZWRUZXh0O1xufTtcblxuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgYWN0aW9uc19jdXQgPSAoQ2xpcGJvYXJkQWN0aW9uQ3V0KTtcbjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jb21tb24vY3JlYXRlLWZha2UtZWxlbWVudC5qc1xuLyoqXG4gKiBDcmVhdGVzIGEgZmFrZSB0ZXh0YXJlYSBlbGVtZW50IHdpdGggYSB2YWx1ZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSB2YWx1ZVxuICogQHJldHVybiB7SFRNTEVsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUZha2VFbGVtZW50KHZhbHVlKSB7XG4gIHZhciBpc1JUTCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RpcicpID09PSAncnRsJztcbiAgdmFyIGZha2VFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTsgLy8gUHJldmVudCB6b29taW5nIG9uIGlPU1xuXG4gIGZha2VFbGVtZW50LnN0eWxlLmZvbnRTaXplID0gJzEycHQnOyAvLyBSZXNldCBib3ggbW9kZWxcblxuICBmYWtlRWxlbWVudC5zdHlsZS5ib3JkZXIgPSAnMCc7XG4gIGZha2VFbGVtZW50LnN0eWxlLnBhZGRpbmcgPSAnMCc7XG4gIGZha2VFbGVtZW50LnN0eWxlLm1hcmdpbiA9ICcwJzsgLy8gTW92ZSBlbGVtZW50IG91dCBvZiBzY3JlZW4gaG9yaXpvbnRhbGx5XG5cbiAgZmFrZUVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICBmYWtlRWxlbWVudC5zdHlsZVtpc1JUTCA/ICdyaWdodCcgOiAnbGVmdCddID0gJy05OTk5cHgnOyAvLyBNb3ZlIGVsZW1lbnQgdG8gdGhlIHNhbWUgcG9zaXRpb24gdmVydGljYWxseVxuXG4gIHZhciB5UG9zaXRpb24gPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcbiAgZmFrZUVsZW1lbnQuc3R5bGUudG9wID0gXCJcIi5jb25jYXQoeVBvc2l0aW9uLCBcInB4XCIpO1xuICBmYWtlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JlYWRvbmx5JywgJycpO1xuICBmYWtlRWxlbWVudC52YWx1ZSA9IHZhbHVlO1xuICByZXR1cm4gZmFrZUVsZW1lbnQ7XG59XG47Ly8gQ09OQ0FURU5BVEVEIE1PRFVMRTogLi9zcmMvYWN0aW9ucy9jb3B5LmpzXG5cblxuXG4vKipcbiAqIENyZWF0ZSBmYWtlIGNvcHkgYWN0aW9uIHdyYXBwZXIgdXNpbmcgYSBmYWtlIGVsZW1lbnQuXG4gKiBAcGFyYW0ge1N0cmluZ30gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5cbnZhciBmYWtlQ29weUFjdGlvbiA9IGZ1bmN0aW9uIGZha2VDb3B5QWN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG4gIHZhciBmYWtlRWxlbWVudCA9IGNyZWF0ZUZha2VFbGVtZW50KHZhbHVlKTtcbiAgb3B0aW9ucy5jb250YWluZXIuYXBwZW5kQ2hpbGQoZmFrZUVsZW1lbnQpO1xuICB2YXIgc2VsZWN0ZWRUZXh0ID0gc2VsZWN0X2RlZmF1bHQoKShmYWtlRWxlbWVudCk7XG4gIGNvbW1hbmQoJ2NvcHknKTtcbiAgZmFrZUVsZW1lbnQucmVtb3ZlKCk7XG4gIHJldHVybiBzZWxlY3RlZFRleHQ7XG59O1xuLyoqXG4gKiBDb3B5IGFjdGlvbiB3cmFwcGVyLlxuICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR9IHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xuXG5cbnZhciBDbGlwYm9hcmRBY3Rpb25Db3B5ID0gZnVuY3Rpb24gQ2xpcGJvYXJkQWN0aW9uQ29weSh0YXJnZXQpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHtcbiAgICBjb250YWluZXI6IGRvY3VtZW50LmJvZHlcbiAgfTtcbiAgdmFyIHNlbGVjdGVkVGV4dCA9ICcnO1xuXG4gIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgIHNlbGVjdGVkVGV4dCA9IGZha2VDb3B5QWN0aW9uKHRhcmdldCwgb3B0aW9ucyk7XG4gIH0gZWxzZSBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSFRNTElucHV0RWxlbWVudCAmJiAhWyd0ZXh0JywgJ3NlYXJjaCcsICd1cmwnLCAndGVsJywgJ3Bhc3N3b3JkJ10uaW5jbHVkZXModGFyZ2V0ID09PSBudWxsIHx8IHRhcmdldCA9PT0gdm9pZCAwID8gdm9pZCAwIDogdGFyZ2V0LnR5cGUpKSB7XG4gICAgLy8gSWYgaW5wdXQgdHlwZSBkb2Vzbid0IHN1cHBvcnQgYHNldFNlbGVjdGlvblJhbmdlYC4gU2ltdWxhdGUgaXQuIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IVE1MSW5wdXRFbGVtZW50L3NldFNlbGVjdGlvblJhbmdlXG4gICAgc2VsZWN0ZWRUZXh0ID0gZmFrZUNvcHlBY3Rpb24odGFyZ2V0LnZhbHVlLCBvcHRpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBzZWxlY3RlZFRleHQgPSBzZWxlY3RfZGVmYXVsdCgpKHRhcmdldCk7XG4gICAgY29tbWFuZCgnY29weScpO1xuICB9XG5cbiAgcmV0dXJuIHNlbGVjdGVkVGV4dDtcbn07XG5cbi8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gdmFyIGFjdGlvbnNfY29weSA9IChDbGlwYm9hcmRBY3Rpb25Db3B5KTtcbjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9hY3Rpb25zL2RlZmF1bHQuanNcbmZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBfdHlwZW9mKG9iaik7IH1cblxuXG5cbi8qKlxuICogSW5uZXIgZnVuY3Rpb24gd2hpY2ggcGVyZm9ybXMgc2VsZWN0aW9uIGZyb20gZWl0aGVyIGB0ZXh0YCBvciBgdGFyZ2V0YFxuICogcHJvcGVydGllcyBhbmQgdGhlbiBleGVjdXRlcyBjb3B5IG9yIGN1dCBvcGVyYXRpb25zLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqL1xuXG52YXIgQ2xpcGJvYXJkQWN0aW9uRGVmYXVsdCA9IGZ1bmN0aW9uIENsaXBib2FyZEFjdGlvbkRlZmF1bHQoKSB7XG4gIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgLy8gRGVmaW5lcyBiYXNlIHByb3BlcnRpZXMgcGFzc2VkIGZyb20gY29uc3RydWN0b3IuXG4gIHZhciBfb3B0aW9ucyRhY3Rpb24gPSBvcHRpb25zLmFjdGlvbixcbiAgICAgIGFjdGlvbiA9IF9vcHRpb25zJGFjdGlvbiA9PT0gdm9pZCAwID8gJ2NvcHknIDogX29wdGlvbnMkYWN0aW9uLFxuICAgICAgY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXIsXG4gICAgICB0YXJnZXQgPSBvcHRpb25zLnRhcmdldCxcbiAgICAgIHRleHQgPSBvcHRpb25zLnRleHQ7IC8vIFNldHMgdGhlIGBhY3Rpb25gIHRvIGJlIHBlcmZvcm1lZCB3aGljaCBjYW4gYmUgZWl0aGVyICdjb3B5JyBvciAnY3V0Jy5cblxuICBpZiAoYWN0aW9uICE9PSAnY29weScgJiYgYWN0aW9uICE9PSAnY3V0Jykge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBcImFjdGlvblwiIHZhbHVlLCB1c2UgZWl0aGVyIFwiY29weVwiIG9yIFwiY3V0XCInKTtcbiAgfSAvLyBTZXRzIHRoZSBgdGFyZ2V0YCBwcm9wZXJ0eSB1c2luZyBhbiBlbGVtZW50IHRoYXQgd2lsbCBiZSBoYXZlIGl0cyBjb250ZW50IGNvcGllZC5cblxuXG4gIGlmICh0YXJnZXQgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmICh0YXJnZXQgJiYgX3R5cGVvZih0YXJnZXQpID09PSAnb2JqZWN0JyAmJiB0YXJnZXQubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgIGlmIChhY3Rpb24gPT09ICdjb3B5JyAmJiB0YXJnZXQuaGFzQXR0cmlidXRlKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBcInRhcmdldFwiIGF0dHJpYnV0ZS4gUGxlYXNlIHVzZSBcInJlYWRvbmx5XCIgaW5zdGVhZCBvZiBcImRpc2FibGVkXCIgYXR0cmlidXRlJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhY3Rpb24gPT09ICdjdXQnICYmICh0YXJnZXQuaGFzQXR0cmlidXRlKCdyZWFkb25seScpIHx8IHRhcmdldC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBcInRhcmdldFwiIGF0dHJpYnV0ZS4gWW91IGNhblxcJ3QgY3V0IHRleHQgZnJvbSBlbGVtZW50cyB3aXRoIFwicmVhZG9ubHlcIiBvciBcImRpc2FibGVkXCIgYXR0cmlidXRlcycpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgXCJ0YXJnZXRcIiB2YWx1ZSwgdXNlIGEgdmFsaWQgRWxlbWVudCcpO1xuICAgIH1cbiAgfSAvLyBEZWZpbmUgc2VsZWN0aW9uIHN0cmF0ZWd5IGJhc2VkIG9uIGB0ZXh0YCBwcm9wZXJ0eS5cblxuXG4gIGlmICh0ZXh0KSB7XG4gICAgcmV0dXJuIGFjdGlvbnNfY29weSh0ZXh0LCB7XG4gICAgICBjb250YWluZXI6IGNvbnRhaW5lclxuICAgIH0pO1xuICB9IC8vIERlZmluZXMgd2hpY2ggc2VsZWN0aW9uIHN0cmF0ZWd5IGJhc2VkIG9uIGB0YXJnZXRgIHByb3BlcnR5LlxuXG5cbiAgaWYgKHRhcmdldCkge1xuICAgIHJldHVybiBhY3Rpb24gPT09ICdjdXQnID8gYWN0aW9uc19jdXQodGFyZ2V0KSA6IGFjdGlvbnNfY29weSh0YXJnZXQsIHtcbiAgICAgIGNvbnRhaW5lcjogY29udGFpbmVyXG4gICAgfSk7XG4gIH1cbn07XG5cbi8qIGhhcm1vbnkgZGVmYXVsdCBleHBvcnQgKi8gdmFyIGFjdGlvbnNfZGVmYXVsdCA9IChDbGlwYm9hcmRBY3Rpb25EZWZhdWx0KTtcbjsvLyBDT05DQVRFTkFURUQgTU9EVUxFOiAuL3NyYy9jbGlwYm9hcmQuanNcbmZ1bmN0aW9uIGNsaXBib2FyZF90eXBlb2Yob2JqKSB7IFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjsgaWYgKHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiKSB7IGNsaXBib2FyZF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfTsgfSBlbHNlIHsgY2xpcGJvYXJkX3R5cGVvZiA9IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9OyB9IHJldHVybiBjbGlwYm9hcmRfdHlwZW9mKG9iaik7IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb25cIik7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKTsgfVxuXG5mdW5jdGlvbiBfc2V0UHJvdG90eXBlT2YobywgcCkgeyBfc2V0UHJvdG90eXBlT2YgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24gX3NldFByb3RvdHlwZU9mKG8sIHApIHsgby5fX3Byb3RvX18gPSBwOyByZXR1cm4gbzsgfTsgcmV0dXJuIF9zZXRQcm90b3R5cGVPZihvLCBwKTsgfVxuXG5mdW5jdGlvbiBfY3JlYXRlU3VwZXIoRGVyaXZlZCkgeyB2YXIgaGFzTmF0aXZlUmVmbGVjdENvbnN0cnVjdCA9IF9pc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QoKTsgcmV0dXJuIGZ1bmN0aW9uIF9jcmVhdGVTdXBlckludGVybmFsKCkgeyB2YXIgU3VwZXIgPSBfZ2V0UHJvdG90eXBlT2YoRGVyaXZlZCksIHJlc3VsdDsgaWYgKGhhc05hdGl2ZVJlZmxlY3RDb25zdHJ1Y3QpIHsgdmFyIE5ld1RhcmdldCA9IF9nZXRQcm90b3R5cGVPZih0aGlzKS5jb25zdHJ1Y3RvcjsgcmVzdWx0ID0gUmVmbGVjdC5jb25zdHJ1Y3QoU3VwZXIsIGFyZ3VtZW50cywgTmV3VGFyZ2V0KTsgfSBlbHNlIHsgcmVzdWx0ID0gU3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTsgfSByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgcmVzdWx0KTsgfTsgfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmIChjYWxsICYmIChjbGlwYm9hcmRfdHlwZW9mKGNhbGwpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpKSB7IHJldHVybiBjYWxsOyB9IHJldHVybiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpOyB9XG5cbmZ1bmN0aW9uIF9hc3NlcnRUaGlzSW5pdGlhbGl6ZWQoc2VsZikgeyBpZiAoc2VsZiA9PT0gdm9pZCAwKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gc2VsZjsgfVxuXG5mdW5jdGlvbiBfaXNOYXRpdmVSZWZsZWN0Q29uc3RydWN0KCkgeyBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwidW5kZWZpbmVkXCIgfHwgIVJlZmxlY3QuY29uc3RydWN0KSByZXR1cm4gZmFsc2U7IGlmIChSZWZsZWN0LmNvbnN0cnVjdC5zaGFtKSByZXR1cm4gZmFsc2U7IGlmICh0eXBlb2YgUHJveHkgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIHRydWU7IHRyeSB7IERhdGUucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoUmVmbGVjdC5jb25zdHJ1Y3QoRGF0ZSwgW10sIGZ1bmN0aW9uICgpIHt9KSk7IHJldHVybiB0cnVlOyB9IGNhdGNoIChlKSB7IHJldHVybiBmYWxzZTsgfSB9XG5cbmZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IF9nZXRQcm90b3R5cGVPZiA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIF9nZXRQcm90b3R5cGVPZihvKSB7IHJldHVybiBvLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yobyk7IH07IHJldHVybiBfZ2V0UHJvdG90eXBlT2Yobyk7IH1cblxuXG5cblxuXG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHJldHJpZXZlIGF0dHJpYnV0ZSB2YWx1ZS5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzdWZmaXhcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICovXG5cbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZVZhbHVlKHN1ZmZpeCwgZWxlbWVudCkge1xuICB2YXIgYXR0cmlidXRlID0gXCJkYXRhLWNsaXBib2FyZC1cIi5jb25jYXQoc3VmZml4KTtcblxuICBpZiAoIWVsZW1lbnQuaGFzQXR0cmlidXRlKGF0dHJpYnV0ZSkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbn1cbi8qKlxuICogQmFzZSBjbGFzcyB3aGljaCB0YWtlcyBvbmUgb3IgbW9yZSBlbGVtZW50cywgYWRkcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlbSxcbiAqIGFuZCBpbnN0YW50aWF0ZXMgYSBuZXcgYENsaXBib2FyZEFjdGlvbmAgb24gZWFjaCBjbGljay5cbiAqL1xuXG5cbnZhciBDbGlwYm9hcmQgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKF9FbWl0dGVyKSB7XG4gIF9pbmhlcml0cyhDbGlwYm9hcmQsIF9FbWl0dGVyKTtcblxuICB2YXIgX3N1cGVyID0gX2NyZWF0ZVN1cGVyKENsaXBib2FyZCk7XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fEhUTUxDb2xsZWN0aW9ufE5vZGVMaXN0fSB0cmlnZ2VyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqL1xuICBmdW5jdGlvbiBDbGlwYm9hcmQodHJpZ2dlciwgb3B0aW9ucykge1xuICAgIHZhciBfdGhpcztcblxuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDbGlwYm9hcmQpO1xuXG4gICAgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKTtcblxuICAgIF90aGlzLnJlc29sdmVPcHRpb25zKG9wdGlvbnMpO1xuXG4gICAgX3RoaXMubGlzdGVuQ2xpY2sodHJpZ2dlcik7XG5cbiAgICByZXR1cm4gX3RoaXM7XG4gIH1cbiAgLyoqXG4gICAqIERlZmluZXMgaWYgYXR0cmlidXRlcyB3b3VsZCBiZSByZXNvbHZlZCB1c2luZyBpbnRlcm5hbCBzZXR0ZXIgZnVuY3Rpb25zXG4gICAqIG9yIGN1c3RvbSBmdW5jdGlvbnMgdGhhdCB3ZXJlIHBhc3NlZCBpbiB0aGUgY29uc3RydWN0b3IuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKENsaXBib2FyZCwgW3tcbiAgICBrZXk6IFwicmVzb2x2ZU9wdGlvbnNcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gcmVzb2x2ZU9wdGlvbnMoKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgICB0aGlzLmFjdGlvbiA9IHR5cGVvZiBvcHRpb25zLmFjdGlvbiA9PT0gJ2Z1bmN0aW9uJyA/IG9wdGlvbnMuYWN0aW9uIDogdGhpcy5kZWZhdWx0QWN0aW9uO1xuICAgICAgdGhpcy50YXJnZXQgPSB0eXBlb2Ygb3B0aW9ucy50YXJnZXQgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLnRhcmdldCA6IHRoaXMuZGVmYXVsdFRhcmdldDtcbiAgICAgIHRoaXMudGV4dCA9IHR5cGVvZiBvcHRpb25zLnRleHQgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLnRleHQgOiB0aGlzLmRlZmF1bHRUZXh0O1xuICAgICAgdGhpcy5jb250YWluZXIgPSBjbGlwYm9hcmRfdHlwZW9mKG9wdGlvbnMuY29udGFpbmVyKSA9PT0gJ29iamVjdCcgPyBvcHRpb25zLmNvbnRhaW5lciA6IGRvY3VtZW50LmJvZHk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBjbGljayBldmVudCBsaXN0ZW5lciB0byB0aGUgcGFzc2VkIHRyaWdnZXIuXG4gICAgICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR8SFRNTENvbGxlY3Rpb258Tm9kZUxpc3R9IHRyaWdnZXJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcImxpc3RlbkNsaWNrXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGxpc3RlbkNsaWNrKHRyaWdnZXIpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB0aGlzLmxpc3RlbmVyID0gbGlzdGVuX2RlZmF1bHQoKSh0cmlnZ2VyLCAnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gX3RoaXMyLm9uQ2xpY2soZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhIG5ldyBgQ2xpcGJvYXJkQWN0aW9uYCBvbiBlYWNoIGNsaWNrIGV2ZW50LlxuICAgICAqIEBwYXJhbSB7RXZlbnR9IGVcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiBcIm9uQ2xpY2tcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25DbGljayhlKSB7XG4gICAgICB2YXIgdHJpZ2dlciA9IGUuZGVsZWdhdGVUYXJnZXQgfHwgZS5jdXJyZW50VGFyZ2V0O1xuICAgICAgdmFyIGFjdGlvbiA9IHRoaXMuYWN0aW9uKHRyaWdnZXIpIHx8ICdjb3B5JztcbiAgICAgIHZhciB0ZXh0ID0gYWN0aW9uc19kZWZhdWx0KHtcbiAgICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICAgIGNvbnRhaW5lcjogdGhpcy5jb250YWluZXIsXG4gICAgICAgIHRhcmdldDogdGhpcy50YXJnZXQodHJpZ2dlciksXG4gICAgICAgIHRleHQ6IHRoaXMudGV4dCh0cmlnZ2VyKVxuICAgICAgfSk7IC8vIEZpcmVzIGFuIGV2ZW50IGJhc2VkIG9uIHRoZSBjb3B5IG9wZXJhdGlvbiByZXN1bHQuXG5cbiAgICAgIHRoaXMuZW1pdCh0ZXh0ID8gJ3N1Y2Nlc3MnIDogJ2Vycm9yJywge1xuICAgICAgICBhY3Rpb246IGFjdGlvbixcbiAgICAgICAgdGV4dDogdGV4dCxcbiAgICAgICAgdHJpZ2dlcjogdHJpZ2dlcixcbiAgICAgICAgY2xlYXJTZWxlY3Rpb246IGZ1bmN0aW9uIGNsZWFyU2VsZWN0aW9uKCkge1xuICAgICAgICAgIGlmICh0cmlnZ2VyKSB7XG4gICAgICAgICAgICB0cmlnZ2VyLmZvY3VzKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBgYWN0aW9uYCBsb29rdXAgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0cmlnZ2VyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJkZWZhdWx0QWN0aW9uXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlZmF1bHRBY3Rpb24odHJpZ2dlcikge1xuICAgICAgcmV0dXJuIGdldEF0dHJpYnV0ZVZhbHVlKCdhY3Rpb24nLCB0cmlnZ2VyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVmYXVsdCBgdGFyZ2V0YCBsb29rdXAgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtFbGVtZW50fSB0cmlnZ2VyXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogXCJkZWZhdWx0VGFyZ2V0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRlZmF1bHRUYXJnZXQodHJpZ2dlcikge1xuICAgICAgdmFyIHNlbGVjdG9yID0gZ2V0QXR0cmlidXRlVmFsdWUoJ3RhcmdldCcsIHRyaWdnZXIpO1xuXG4gICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGxvdyBmaXJlIHByb2dyYW1tYXRpY2FsbHkgYSBjb3B5IGFjdGlvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fSB0YXJnZXRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIFRleHQgY29waWVkLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZGVmYXVsdFRleHRcIixcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgYHRleHRgIGxvb2t1cCBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRyaWdnZXJcbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVmYXVsdFRleHQodHJpZ2dlcikge1xuICAgICAgcmV0dXJuIGdldEF0dHJpYnV0ZVZhbHVlKCd0ZXh0JywgdHJpZ2dlcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlc3Ryb3kgbGlmZWN5Y2xlLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiZGVzdHJveVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdGhpcy5saXN0ZW5lci5kZXN0cm95KCk7XG4gICAgfVxuICB9XSwgW3tcbiAgICBrZXk6IFwiY29weVwiLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjb3B5KHRhcmdldCkge1xuICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHtcbiAgICAgICAgY29udGFpbmVyOiBkb2N1bWVudC5ib2R5XG4gICAgICB9O1xuICAgICAgcmV0dXJuIGFjdGlvbnNfY29weSh0YXJnZXQsIG9wdGlvbnMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGxvdyBmaXJlIHByb2dyYW1tYXRpY2FsbHkgYSBjdXQgYWN0aW9uXG4gICAgICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR9IHRhcmdldFxuICAgICAqIEByZXR1cm5zIFRleHQgY3V0dGVkLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiY3V0XCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGN1dCh0YXJnZXQpIHtcbiAgICAgIHJldHVybiBhY3Rpb25zX2N1dCh0YXJnZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzdXBwb3J0IG9mIHRoZSBnaXZlbiBhY3Rpb24sIG9yIGFsbCBhY3Rpb25zIGlmIG5vIGFjdGlvbiBpc1xuICAgICAqIGdpdmVuLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBbYWN0aW9uXVxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6IFwiaXNTdXBwb3J0ZWRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNTdXBwb3J0ZWQoKSB7XG4gICAgICB2YXIgYWN0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbJ2NvcHknLCAnY3V0J107XG4gICAgICB2YXIgYWN0aW9ucyA9IHR5cGVvZiBhY3Rpb24gPT09ICdzdHJpbmcnID8gW2FjdGlvbl0gOiBhY3Rpb247XG4gICAgICB2YXIgc3VwcG9ydCA9ICEhZG9jdW1lbnQucXVlcnlDb21tYW5kU3VwcG9ydGVkO1xuICAgICAgYWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgc3VwcG9ydCA9IHN1cHBvcnQgJiYgISFkb2N1bWVudC5xdWVyeUNvbW1hbmRTdXBwb3J0ZWQoYWN0aW9uKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHN1cHBvcnQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIENsaXBib2FyZDtcbn0oKHRpbnlfZW1pdHRlcl9kZWZhdWx0KCkpKTtcblxuLyogaGFybW9ueSBkZWZhdWx0IGV4cG9ydCAqLyB2YXIgY2xpcGJvYXJkID0gKENsaXBib2FyZCk7XG5cbi8qKiovIH0pLFxuXG4vKioqLyA4Mjg6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlKSB7XG5cbnZhciBET0NVTUVOVF9OT0RFX1RZUEUgPSA5O1xuXG4vKipcbiAqIEEgcG9seWZpbGwgZm9yIEVsZW1lbnQubWF0Y2hlcygpXG4gKi9cbmlmICh0eXBlb2YgRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcbiAgICB2YXIgcHJvdG8gPSBFbGVtZW50LnByb3RvdHlwZTtcblxuICAgIHByb3RvLm1hdGNoZXMgPSBwcm90by5tYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgICAgcHJvdG8ubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgIHByb3RvLm1zTWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICAgICAgICAgIHByb3RvLm9NYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgICAgICAgICAgcHJvdG8ud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xufVxuXG4vKipcbiAqIEZpbmRzIHRoZSBjbG9zZXN0IHBhcmVudCB0aGF0IG1hdGNoZXMgYSBzZWxlY3Rvci5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGNsb3Nlc3QgKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gICAgd2hpbGUgKGVsZW1lbnQgJiYgZWxlbWVudC5ub2RlVHlwZSAhPT0gRE9DVU1FTlRfTk9ERV9UWVBFKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZWxlbWVudC5tYXRjaGVzID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAgICAgICBlbGVtZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2xvc2VzdDtcblxuXG4vKioqLyB9KSxcblxuLyoqKi8gNDM4OlxuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgX191bnVzZWRfd2VicGFja19leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbnZhciBjbG9zZXN0ID0gX193ZWJwYWNrX3JlcXVpcmVfXyg4MjgpO1xuXG4vKipcbiAqIERlbGVnYXRlcyBldmVudCB0byBhIHNlbGVjdG9yLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudFxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdXNlQ2FwdHVyZVxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBfZGVsZWdhdGUoZWxlbWVudCwgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XG4gICAgdmFyIGxpc3RlbmVyRm4gPSBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGxpc3RlbmVyRm4sIHVzZUNhcHR1cmUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXJGbiwgdXNlQ2FwdHVyZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogRGVsZWdhdGVzIGV2ZW50IHRvIGEgc2VsZWN0b3IuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fFN0cmluZ3xBcnJheX0gW2VsZW1lbnRzXVxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdXNlQ2FwdHVyZVxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBkZWxlZ2F0ZShlbGVtZW50cywgc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrLCB1c2VDYXB0dXJlKSB7XG4gICAgLy8gSGFuZGxlIHRoZSByZWd1bGFyIEVsZW1lbnQgdXNhZ2VcbiAgICBpZiAodHlwZW9mIGVsZW1lbnRzLmFkZEV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBFbGVtZW50LWxlc3MgdXNhZ2UsIGl0IGRlZmF1bHRzIHRvIGdsb2JhbCBkZWxlZ2F0aW9uXG4gICAgaWYgKHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIFVzZSBgZG9jdW1lbnRgIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIsIHRoZW4gYXBwbHkgYXJndW1lbnRzXG4gICAgICAgIC8vIFRoaXMgaXMgYSBzaG9ydCB3YXkgdG8gLnVuc2hpZnQgYGFyZ3VtZW50c2Agd2l0aG91dCBydW5uaW5nIGludG8gZGVvcHRpbWl6YXRpb25zXG4gICAgICAgIHJldHVybiBfZGVsZWdhdGUuYmluZChudWxsLCBkb2N1bWVudCkuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgU2VsZWN0b3ItYmFzZWQgdXNhZ2VcbiAgICBpZiAodHlwZW9mIGVsZW1lbnRzID09PSAnc3RyaW5nJykge1xuICAgICAgICBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbWVudHMpO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBBcnJheS1saWtlIGJhc2VkIHVzYWdlXG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChlbGVtZW50cywgZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIF9kZWxlZ2F0ZShlbGVtZW50LCBzZWxlY3RvciwgdHlwZSwgY2FsbGJhY2ssIHVzZUNhcHR1cmUpO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIEZpbmRzIGNsb3Nlc3QgbWF0Y2ggYW5kIGludm9rZXMgY2FsbGJhY2suXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybiB7RnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGxpc3RlbmVyKGVsZW1lbnQsIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjaykge1xuICAgIHJldHVybiBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUuZGVsZWdhdGVUYXJnZXQgPSBjbG9zZXN0KGUudGFyZ2V0LCBzZWxlY3Rvcik7XG5cbiAgICAgICAgaWYgKGUuZGVsZWdhdGVUYXJnZXQpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoZWxlbWVudCwgZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVsZWdhdGU7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIDg3OTpcbi8qKiovIChmdW5jdGlvbihfX3VudXNlZF93ZWJwYWNrX21vZHVsZSwgZXhwb3J0cykge1xuXG4vKipcbiAqIENoZWNrIGlmIGFyZ3VtZW50IGlzIGEgSFRNTCBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuZXhwb3J0cy5ub2RlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHVuZGVmaW5lZFxuICAgICAgICAmJiB2YWx1ZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50XG4gICAgICAgICYmIHZhbHVlLm5vZGVUeXBlID09PSAxO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBhcmd1bWVudCBpcyBhIGxpc3Qgb2YgSFRNTCBlbGVtZW50cy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsdWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmV4cG9ydHMubm9kZUxpc3QgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcblxuICAgIHJldHVybiB2YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICYmICh0eXBlID09PSAnW29iamVjdCBOb2RlTGlzdF0nIHx8IHR5cGUgPT09ICdbb2JqZWN0IEhUTUxDb2xsZWN0aW9uXScpXG4gICAgICAgICYmICgnbGVuZ3RoJyBpbiB2YWx1ZSlcbiAgICAgICAgJiYgKHZhbHVlLmxlbmd0aCA9PT0gMCB8fCBleHBvcnRzLm5vZGUodmFsdWVbMF0pKTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYXJndW1lbnQgaXMgYSBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnRzLnN0cmluZyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZydcbiAgICAgICAgfHwgdmFsdWUgaW5zdGFuY2VvZiBTdHJpbmc7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGFyZ3VtZW50IGlzIGEgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbHVlXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5leHBvcnRzLmZuID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgdHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG5cbiAgICByZXR1cm4gdHlwZSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn07XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIDM3MDpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIF9fdW51c2VkX3dlYnBhY2tfZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgaXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDg3OSk7XG52YXIgZGVsZWdhdGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQzOCk7XG5cbi8qKlxuICogVmFsaWRhdGVzIGFsbCBwYXJhbXMgYW5kIGNhbGxzIHRoZSByaWdodFxuICogbGlzdGVuZXIgZnVuY3Rpb24gYmFzZWQgb24gaXRzIHRhcmdldCB0eXBlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fEhUTUxDb2xsZWN0aW9ufE5vZGVMaXN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBsaXN0ZW4odGFyZ2V0LCB0eXBlLCBjYWxsYmFjaykge1xuICAgIGlmICghdGFyZ2V0ICYmICF0eXBlICYmICFjYWxsYmFjaykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgcmVxdWlyZWQgYXJndW1lbnRzJyk7XG4gICAgfVxuXG4gICAgaWYgKCFpcy5zdHJpbmcodHlwZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignU2Vjb25kIGFyZ3VtZW50IG11c3QgYmUgYSBTdHJpbmcnKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzLmZuKGNhbGxiYWNrKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGlyZCBhcmd1bWVudCBtdXN0IGJlIGEgRnVuY3Rpb24nKTtcbiAgICB9XG5cbiAgICBpZiAoaXMubm9kZSh0YXJnZXQpKSB7XG4gICAgICAgIHJldHVybiBsaXN0ZW5Ob2RlKHRhcmdldCwgdHlwZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIGlmIChpcy5ub2RlTGlzdCh0YXJnZXQpKSB7XG4gICAgICAgIHJldHVybiBsaXN0ZW5Ob2RlTGlzdCh0YXJnZXQsIHR5cGUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXMuc3RyaW5nKHRhcmdldCkpIHtcbiAgICAgICAgcmV0dXJuIGxpc3RlblNlbGVjdG9yKHRhcmdldCwgdHlwZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIFN0cmluZywgSFRNTEVsZW1lbnQsIEhUTUxDb2xsZWN0aW9uLCBvciBOb2RlTGlzdCcpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGEgSFRNTCBlbGVtZW50XG4gKiBhbmQgcmV0dXJucyBhIHJlbW92ZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBub2RlXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gbGlzdGVuTm9kZShub2RlLCB0eXBlLCBjYWxsYmFjaykge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjayk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBkZXN0cm95OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGEgbGlzdCBvZiBIVE1MIGVsZW1lbnRzXG4gKiBhbmQgcmV0dXJucyBhIHJlbW92ZSBsaXN0ZW5lciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge05vZGVMaXN0fEhUTUxDb2xsZWN0aW9ufSBub2RlTGlzdFxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGxpc3Rlbk5vZGVMaXN0KG5vZGVMaXN0LCB0eXBlLCBjYWxsYmFjaykge1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobm9kZUxpc3QsIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGNhbGxiYWNrKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChub2RlTGlzdCwgZnVuY3Rpb24obm9kZSkge1xuICAgICAgICAgICAgICAgIG5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gYSBzZWxlY3RvclxuICogYW5kIHJldHVybnMgYSByZW1vdmUgbGlzdGVuZXIgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gbGlzdGVuU2VsZWN0b3Ioc2VsZWN0b3IsIHR5cGUsIGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIGRlbGVnYXRlKGRvY3VtZW50LmJvZHksIHNlbGVjdG9yLCB0eXBlLCBjYWxsYmFjayk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdGVuO1xuXG5cbi8qKiovIH0pLFxuXG4vKioqLyA4MTc6XG4vKioqLyAoZnVuY3Rpb24obW9kdWxlKSB7XG5cbmZ1bmN0aW9uIHNlbGVjdChlbGVtZW50KSB7XG4gICAgdmFyIHNlbGVjdGVkVGV4dDtcblxuICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnU0VMRUNUJykge1xuICAgICAgICBlbGVtZW50LmZvY3VzKCk7XG5cbiAgICAgICAgc2VsZWN0ZWRUZXh0ID0gZWxlbWVudC52YWx1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0lOUFVUJyB8fCBlbGVtZW50Lm5vZGVOYW1lID09PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgIHZhciBpc1JlYWRPbmx5ID0gZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ3JlYWRvbmx5Jyk7XG5cbiAgICAgICAgaWYgKCFpc1JlYWRPbmx5KSB7XG4gICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgncmVhZG9ubHknLCAnJyk7XG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LnNlbGVjdCgpO1xuICAgICAgICBlbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKDAsIGVsZW1lbnQudmFsdWUubGVuZ3RoKTtcblxuICAgICAgICBpZiAoIWlzUmVhZE9ubHkpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdyZWFkb25seScpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2VsZWN0ZWRUZXh0ID0gZWxlbWVudC52YWx1ZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnY29udGVudGVkaXRhYmxlJykpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG5cbiAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZUNvbnRlbnRzKGVsZW1lbnQpO1xuICAgICAgICBzZWxlY3Rpb24ucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIHNlbGVjdGlvbi5hZGRSYW5nZShyYW5nZSk7XG5cbiAgICAgICAgc2VsZWN0ZWRUZXh0ID0gc2VsZWN0aW9uLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGVjdGVkVGV4dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZWxlY3Q7XG5cblxuLyoqKi8gfSksXG5cbi8qKiovIDI3OTpcbi8qKiovIChmdW5jdGlvbihtb2R1bGUpIHtcblxuZnVuY3Rpb24gRSAoKSB7XG4gIC8vIEtlZXAgdGhpcyBlbXB0eSBzbyBpdCdzIGVhc2llciB0byBpbmhlcml0IGZyb21cbiAgLy8gKHZpYSBodHRwczovL2dpdGh1Yi5jb20vbGlwc21hY2sgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc2NvdHRjb3JnYW4vdGlueS1lbWl0dGVyL2lzc3Vlcy8zKVxufVxuXG5FLnByb3RvdHlwZSA9IHtcbiAgb246IGZ1bmN0aW9uIChuYW1lLCBjYWxsYmFjaywgY3R4KSB7XG4gICAgdmFyIGUgPSB0aGlzLmUgfHwgKHRoaXMuZSA9IHt9KTtcblxuICAgIChlW25hbWVdIHx8IChlW25hbWVdID0gW10pKS5wdXNoKHtcbiAgICAgIGZuOiBjYWxsYmFjayxcbiAgICAgIGN0eDogY3R4XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcblxuICBvbmNlOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2ssIGN0eCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBmdW5jdGlvbiBsaXN0ZW5lciAoKSB7XG4gICAgICBzZWxmLm9mZihuYW1lLCBsaXN0ZW5lcik7XG4gICAgICBjYWxsYmFjay5hcHBseShjdHgsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIGxpc3RlbmVyLl8gPSBjYWxsYmFja1xuICAgIHJldHVybiB0aGlzLm9uKG5hbWUsIGxpc3RlbmVyLCBjdHgpO1xuICB9LFxuXG4gIGVtaXQ6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIGRhdGEgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGV2dEFyciA9ICgodGhpcy5lIHx8ICh0aGlzLmUgPSB7fSkpW25hbWVdIHx8IFtdKS5zbGljZSgpO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgbGVuID0gZXZ0QXJyLmxlbmd0aDtcblxuICAgIGZvciAoaTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBldnRBcnJbaV0uZm4uYXBwbHkoZXZ0QXJyW2ldLmN0eCwgZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG5cbiAgb2ZmOiBmdW5jdGlvbiAobmFtZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgZSA9IHRoaXMuZSB8fCAodGhpcy5lID0ge30pO1xuICAgIHZhciBldnRzID0gZVtuYW1lXTtcbiAgICB2YXIgbGl2ZUV2ZW50cyA9IFtdO1xuXG4gICAgaWYgKGV2dHMgJiYgY2FsbGJhY2spIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBldnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChldnRzW2ldLmZuICE9PSBjYWxsYmFjayAmJiBldnRzW2ldLmZuLl8gIT09IGNhbGxiYWNrKVxuICAgICAgICAgIGxpdmVFdmVudHMucHVzaChldnRzW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgZXZlbnQgZnJvbSBxdWV1ZSB0byBwcmV2ZW50IG1lbW9yeSBsZWFrXG4gICAgLy8gU3VnZ2VzdGVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9sYXpkXG4gICAgLy8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vc2NvdHRjb3JnYW4vdGlueS1lbWl0dGVyL2NvbW1pdC9jNmViZmFhOWJjOTczYjMzZDExMGE4NGEzMDc3NDJiN2NmOTRjOTUzI2NvbW1pdGNvbW1lbnQtNTAyNDkxMFxuXG4gICAgKGxpdmVFdmVudHMubGVuZ3RoKVxuICAgICAgPyBlW25hbWVdID0gbGl2ZUV2ZW50c1xuICAgICAgOiBkZWxldGUgZVtuYW1lXTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEU7XG5tb2R1bGUuZXhwb3J0cy5UaW55RW1pdHRlciA9IEU7XG5cblxuLyoqKi8gfSlcblxuLyoqKioqKi8gXHR9KTtcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbi8qKioqKiovIFx0dmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcbi8qKioqKiovIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4vKioqKioqLyBcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG4vKioqKioqLyBcdFx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuLyoqKioqKi8gXHRcdFx0ZXhwb3J0czoge31cbi8qKioqKiovIFx0XHR9O1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbi8qKioqKiovIFx0XG4vKioqKioqLyBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbi8qKioqKiovIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4vKioqKioqLyBcdH1cbi8qKioqKiovIFx0XG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKioqKi8gXHQvKiB3ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbi8qKioqKiovIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbi8qKioqKiovIFx0XHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gXHRcdFx0XHRmdW5jdGlvbigpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovIFx0XHRcdFx0ZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGU7IH07XG4vKioqKioqLyBcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcbi8qKioqKiovIFx0XHRcdHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzICovXG4vKioqKioqLyBcdCFmdW5jdGlvbigpIHtcbi8qKioqKiovIFx0XHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuLyoqKioqKi8gXHRcdFx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcbi8qKioqKiovIFx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuLyoqKioqKi8gXHRcdFx0XHR9XG4vKioqKioqLyBcdFx0XHR9XG4vKioqKioqLyBcdFx0fTtcbi8qKioqKiovIFx0fSgpO1xuLyoqKioqKi8gXHRcbi8qKioqKiovIFx0Lyogd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCAqL1xuLyoqKioqKi8gXHQhZnVuY3Rpb24oKSB7XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqLCBwcm9wKSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTsgfVxuLyoqKioqKi8gXHR9KCk7XG4vKioqKioqLyBcdFxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIFx0Ly8gbW9kdWxlIGV4cG9ydHMgbXVzdCBiZSByZXR1cm5lZCBmcm9tIHJ1bnRpbWUgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8qKioqKiovIFx0Ly8gc3RhcnR1cFxuLyoqKioqKi8gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8qKioqKiovIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oNjg2KTtcbi8qKioqKiovIH0pKClcbi5kZWZhdWx0O1xufSk7IiwgImZ1bmN0aW9uIGUoZSl7cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKG4scix0KXsodD1uZXcgWE1MSHR0cFJlcXVlc3QpLm9wZW4oXCJHRVRcIixlLHQud2l0aENyZWRlbnRpYWxzPSEwKSx0Lm9ubG9hZD1mdW5jdGlvbigpezIwMD09PXQuc3RhdHVzP24oKTpyKCl9LHQuc2VuZCgpfSl9dmFyIG4scj0obj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKSkucmVsTGlzdCYmbi5yZWxMaXN0LnN1cHBvcnRzJiZuLnJlbExpc3Quc3VwcG9ydHMoXCJwcmVmZXRjaFwiKT9mdW5jdGlvbihlKXtyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24obixyLHQpeyh0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpKS5yZWw9XCJwcmVmZXRjaFwiLHQuaHJlZj1lLHQub25sb2FkPW4sdC5vbmVycm9yPXIsZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZCh0KX0pfTplLHQ9d2luZG93LnJlcXVlc3RJZGxlQ2FsbGJhY2t8fGZ1bmN0aW9uKGUpe3ZhciBuPURhdGUubm93KCk7cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtlKHtkaWRUaW1lb3V0OiExLHRpbWVSZW1haW5pbmc6ZnVuY3Rpb24oKXtyZXR1cm4gTWF0aC5tYXgoMCw1MC0oRGF0ZS5ub3coKS1uKSl9fSl9LDEpfSxvPW5ldyBTZXQsaT1uZXcgU2V0LGM9ITE7ZnVuY3Rpb24gYShlKXtpZihlKXtpZihlLnNhdmVEYXRhKXJldHVybiBuZXcgRXJyb3IoXCJTYXZlLURhdGEgaXMgZW5hYmxlZFwiKTtpZigvMmcvLnRlc3QoZS5lZmZlY3RpdmVUeXBlKSlyZXR1cm4gbmV3IEVycm9yKFwibmV0d29yayBjb25kaXRpb25zIGFyZSBwb29yXCIpfXJldHVybiEwfWZ1bmN0aW9uIHUoZSl7aWYoZXx8KGU9e30pLHdpbmRvdy5JbnRlcnNlY3Rpb25PYnNlcnZlcil7dmFyIG49ZnVuY3Rpb24oZSl7ZT1lfHwxO3ZhciBuPVtdLHI9MDtmdW5jdGlvbiB0KCl7cjxlJiZuLmxlbmd0aD4wJiYobi5zaGlmdCgpKCkscisrKX1yZXR1cm5bZnVuY3Rpb24oZSl7bi5wdXNoKGUpPjF8fHQoKX0sZnVuY3Rpb24oKXtyLS0sdCgpfV19KGUudGhyb3R0bGV8fDEvMCkscj1uWzBdLGE9blsxXSx1PWUubGltaXR8fDEvMCxsPWUub3JpZ2luc3x8W2xvY2F0aW9uLmhvc3RuYW1lXSxkPWUuaWdub3Jlc3x8W10saD1lLmRlbGF5fHwwLHA9W10sbT1lLnRpbWVvdXRGbnx8dCx3PVwiZnVuY3Rpb25cIj09dHlwZW9mIGUuaHJlZkZuJiZlLmhyZWZGbixnPWUucHJlcmVuZGVyfHwhMTtjPWUucHJlcmVuZGVyQW5kUHJlZmV0Y2h8fCExO3ZhciB2PW5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihmdW5jdGlvbihuKXtuLmZvckVhY2goZnVuY3Rpb24obil7aWYobi5pc0ludGVyc2VjdGluZylwLnB1c2goKG49bi50YXJnZXQpLmhyZWYpLGZ1bmN0aW9uKGUsbil7bj9zZXRUaW1lb3V0KGUsbik6ZSgpfShmdW5jdGlvbigpey0xIT09cC5pbmRleE9mKG4uaHJlZikmJih2LnVub2JzZXJ2ZShuKSwoY3x8ZykmJmkuc2l6ZTwxP2Yodz93KG4pOm4uaHJlZikuY2F0Y2goZnVuY3Rpb24obil7aWYoIWUub25FcnJvcil0aHJvdyBuO2Uub25FcnJvcihuKX0pOm8uc2l6ZTx1JiYhZyYmcihmdW5jdGlvbigpe3Modz93KG4pOm4uaHJlZixlLnByaW9yaXR5KS50aGVuKGEpLmNhdGNoKGZ1bmN0aW9uKG4pe2EoKSxlLm9uRXJyb3ImJmUub25FcnJvcihuKX0pfSkpfSxoKTtlbHNle3ZhciB0PXAuaW5kZXhPZigobj1uLnRhcmdldCkuaHJlZik7dD4tMSYmcC5zcGxpY2UodCl9fSl9LHt0aHJlc2hvbGQ6ZS50aHJlc2hvbGR8fDB9KTtyZXR1cm4gbShmdW5jdGlvbigpeyhlLmVsfHxkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChcImFcIikuZm9yRWFjaChmdW5jdGlvbihlKXtsLmxlbmd0aCYmIWwuaW5jbHVkZXMoZS5ob3N0bmFtZSl8fGZ1bmN0aW9uIGUobixyKXtyZXR1cm4gQXJyYXkuaXNBcnJheShyKT9yLnNvbWUoZnVuY3Rpb24ocil7cmV0dXJuIGUobixyKX0pOihyLnRlc3R8fHIpLmNhbGwocixuLmhyZWYsbil9KGUsZCl8fHYub2JzZXJ2ZShlKX0pfSx7dGltZW91dDplLnRpbWVvdXR8fDJlM30pLGZ1bmN0aW9uKCl7by5jbGVhcigpLHYuZGlzY29ubmVjdCgpfX19ZnVuY3Rpb24gcyhuLHQsdSl7dmFyIHM9YShuYXZpZ2F0b3IuY29ubmVjdGlvbik7cmV0dXJuIHMgaW5zdGFuY2VvZiBFcnJvcj9Qcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJDYW5ub3QgcHJlZmV0Y2gsIFwiK3MubWVzc2FnZSkpOihpLnNpemU+MCYmIWMmJmNvbnNvbGUud2FybihcIltXYXJuaW5nXSBZb3UgYXJlIHVzaW5nIGJvdGggcHJlZmV0Y2hpbmcgYW5kIHByZXJlbmRlcmluZyBvbiB0aGUgc2FtZSBkb2N1bWVudFwiKSxQcm9taXNlLmFsbChbXS5jb25jYXQobikubWFwKGZ1bmN0aW9uKG4pe2lmKCFvLmhhcyhuKSlyZXR1cm4gby5hZGQobiksKHQ/ZnVuY3Rpb24obil7cmV0dXJuIHdpbmRvdy5mZXRjaD9mZXRjaChuLHtjcmVkZW50aWFsczpcImluY2x1ZGVcIn0pOmUobil9OnIpKG5ldyBVUkwobixsb2NhdGlvbi5ocmVmKS50b1N0cmluZygpKX0pKSl9ZnVuY3Rpb24gZihlLG4pe3ZhciByPWEobmF2aWdhdG9yLmNvbm5lY3Rpb24pO2lmKHIgaW5zdGFuY2VvZiBFcnJvcilyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiQ2Fubm90IHByZXJlbmRlciwgXCIrci5tZXNzYWdlKSk7aWYoIUhUTUxTY3JpcHRFbGVtZW50LnN1cHBvcnRzKFwic3BlY3VsYXRpb25ydWxlc1wiKSlyZXR1cm4gcyhlKSxQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoXCJUaGlzIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCB0aGUgc3BlY3VsYXRpb24gcnVsZXMgQVBJLiBGYWxsaW5nIGJhY2sgdG8gcHJlZmV0Y2guXCIpKTtpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzY3JpcHRbdHlwZT1cInNwZWN1bGF0aW9ucnVsZXNcIl0nKSlyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKFwiU3BlY3VsYXRpb24gUnVsZXMgaXMgYWxyZWFkeSBkZWZpbmVkIGFuZCBjYW5ub3QgYmUgYWx0ZXJlZC5cIikpO2Zvcih2YXIgdD0wLHU9W10uY29uY2F0KGUpO3Q8dS5sZW5ndGg7dCs9MSl7dmFyIGY9dVt0XTtpZih3aW5kb3cubG9jYXRpb24ub3JpZ2luIT09bmV3IFVSTChmLHdpbmRvdy5sb2NhdGlvbi5ocmVmKS5vcmlnaW4pcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihcIk9ubHkgc2FtZSBvcmlnaW4gVVJMcyBhcmUgYWxsb3dlZDogXCIrZikpO2kuYWRkKGYpfW8uc2l6ZT4wJiYhYyYmY29uc29sZS53YXJuKFwiW1dhcm5pbmddIFlvdSBhcmUgdXNpbmcgYm90aCBwcmVmZXRjaGluZyBhbmQgcHJlcmVuZGVyaW5nIG9uIHRoZSBzYW1lIGRvY3VtZW50XCIpO3ZhciBsPWZ1bmN0aW9uKGUpe3ZhciBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7bi50eXBlPVwic3BlY3VsYXRpb25ydWxlc1wiLG4udGV4dD0ne1wicHJlcmVuZGVyXCI6W3tcInNvdXJjZVwiOiBcImxpc3RcIixcInVybHNcIjogW1wiJytBcnJheS5mcm9tKGUpLmpvaW4oJ1wiLFwiJykrJ1wiXX1dfSc7dHJ5e2RvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobil9Y2F0Y2goZSl7cmV0dXJuIGV9cmV0dXJuITB9KGkpO3JldHVybiEwPT09bD9Qcm9taXNlLnJlc29sdmUoKTpQcm9taXNlLnJlamVjdChsKX1leHBvcnR7dSBhcyBsaXN0ZW4scyBhcyBwcmVmZXRjaCxmIGFzIHByZXJlbmRlcn07XG4iLCAiLy8gaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZUxhYnMvcXVpY2tsaW5rXHJcbmltcG9ydCB7IGxpc3RlbiB9IGZyb20gJ3F1aWNrbGluay9kaXN0L3F1aWNrbGluay5tanMnO1xyXG5saXN0ZW4oe1xyXG4gICAgaWdub3JlczogW1xyXG4gICAgICAgIC9cXC9hcGlcXC8/LyxcclxuICAgICAgICB1cmkgPT4gdXJpLmluY2x1ZGVzKCcuemlwJyksXHJcbiAgICAgICAgKHVyaSwgZWxlbSkgPT4gZWxlbS5oYXNBdHRyaWJ1dGUoJ25vcHJlZmV0Y2gnKSxcclxuICAgICAgICAodXJpLCBlbGVtKSA9PiBlbGVtLmhhc2ggJiYgZWxlbS5wYXRobmFtZSA9PT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxyXG4gICAgXVxyXG59KTtcclxuXHJcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hRmFya2FzL2xhenlzaXplcy90cmVlL2doLXBhZ2VzL3BsdWdpbnMvbmF0aXZlLWxvYWRpbmdcclxuaW1wb3J0IGxhenlTaXplcyBmcm9tICdsYXp5c2l6ZXMnO1xyXG5pbXBvcnQgJ2xhenlzaXplcy9wbHVnaW5zL25hdGl2ZS1sb2FkaW5nL2xzLm5hdGl2ZS1sb2FkaW5nJztcclxuXHJcbmxhenlTaXplcy5jZmcubmF0aXZlTG9hZGluZyA9IHtcclxuICAgIHNldExvYWRpbmdBdHRyaWJ1dGU6IHRydWUsXHJcbiAgICBkaXNhYmxlTGlzdGVuZXJzOiB7XHJcbiAgICAgICAgc2Nyb2xsOiB0cnVlXHJcbiAgICB9XHJcbn07XHJcbiIsICIvKiFcclxuICogY2xpcGJvYXJkLmpzIGZvciBCb290c3RyYXAgYmFzZWQgVGh1bGl0ZSBzaXRlc1xyXG4gKiBDb3B5cmlnaHQgMjAyMS0yMDI0IFRodWxpdGVcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXHJcbiAqL1xyXG5cclxuaW1wb3J0IENsaXBib2FyZCBmcm9tICdjbGlwYm9hcmQnO1xyXG5cclxuKCgpID0+IHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgY2IgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdoaWdobGlnaHQnKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNiLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBjYltpXTtcclxuICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsICc8ZGl2IGNsYXNzPVwiY29weVwiPjxidXR0b24gdGl0bGU9XCJDb3B5IHRvIGNsaXBib2FyZFwiIGNsYXNzPVwiYnRuLWNvcHlcIiBhcmlhLWxhYmVsPVwiQ2xpcGJvYXJkIGJ1dHRvblwiPjxkaXY+PC9kaXY+PC9idXR0b24+PC9kaXY+Jyk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGNsaXBib2FyZCA9IG5ldyBDbGlwYm9hcmQoJy5idG4tY29weScsIHtcclxuICAgICAgICB0YXJnZXQ6IGZ1bmN0aW9uICh0cmlnZ2VyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cmlnZ2VyLnBhcmVudE5vZGUubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNsaXBib2FyZC5vbignc3VjY2VzcycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgLypcclxuICAgICAgY29uc29sZS5pbmZvKCdBY3Rpb246JywgZS5hY3Rpb24pO1xyXG4gICAgICBjb25zb2xlLmluZm8oJ1RleHQ6JywgZS50ZXh0KTtcclxuICAgICAgY29uc29sZS5pbmZvKCdUcmlnZ2VyOicsIGUudHJpZ2dlcik7XHJcbiAgICAgICovXHJcblxyXG4gICAgICAgIGUuY2xlYXJTZWxlY3Rpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNsaXBib2FyZC5vbignZXJyb3InLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0FjdGlvbjonLCBlLmFjdGlvbik7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcignVHJpZ2dlcjonLCBlLnRyaWdnZXIpO1xyXG4gICAgfSk7XHJcbn0pKCk7XHJcbiIsICJjb25zdCB0b3BCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9Ub3AnKTtcclxuXHJcbmlmICh0b3BCdXR0b24gIT09IG51bGwpIHtcclxuICAgIHRvcEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdmYWRlJyk7XHJcbiAgICB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgc2Nyb2xsRnVuY3Rpb24oKTtcclxuICAgIH07XHJcblxyXG4gICAgdG9wQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9wRnVuY3Rpb24pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzY3JvbGxGdW5jdGlvbigpIHtcclxuICAgIGlmIChkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA+IDI3MCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID4gMjcwKSB7XHJcbiAgICAgICAgdG9wQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2ZhZGUnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdG9wQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhZGUnKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdG9wRnVuY3Rpb24oKSB7XHJcbiAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDA7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcclxufVxyXG4iLCAiLy8gQmFzZWQgb246IGh0dHBzOi8vZ2l0aHViLmNvbS9nb2h1Z29pby9odWdvRG9jcy9ibG9iL21hc3Rlci9fdmVuZG9yL2dpdGh1Yi5jb20vZ29odWdvaW8vZ29odWdvaW9UaGVtZS9hc3NldHMvanMvdGFicy5qc1xyXG5cclxuLyoqXHJcbiAqIFNjcmlwdHMgd2hpY2ggbWFuYWdlcyBDb2RlIFRvZ2dsZSB0YWJzLlxyXG4gKi9cclxudmFyIGk7XHJcbi8vIHN0b3JlIHRhYnMgdmFyaWFibGVcclxudmFyIGFsbFRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10b2dnbGUtdGFiXScpO1xyXG52YXIgYWxsUGFuZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wYW5lXScpO1xyXG5cclxuZnVuY3Rpb24gdG9nZ2xlVGFicyhldmVudCkge1xyXG4gICAgaWYgKGV2ZW50LnRhcmdldCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIGNsaWNrZWRUYWIgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIHZhciB0YXJnZXRLZXkgPSBjbGlja2VkVGFiLmdldEF0dHJpYnV0ZSgnZGF0YS10b2dnbGUtdGFiJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhciB0YXJnZXRLZXkgPSBldmVudDtcclxuICAgIH1cclxuICAgIC8vIFdlIHN0b3JlIHRoZSBjb25maWcgbGFuZ3VhZ2Ugc2VsZWN0ZWQgaW4gdXNlcnMnIGxvY2FsU3RvcmFnZVxyXG4gICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2NvbmZpZ0xhbmdQcmVmJywgdGFyZ2V0S2V5KTtcclxuICAgIH1cclxuICAgIHZhciBzZWxlY3RlZFRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10b2dnbGUtdGFiPScgKyB0YXJnZXRLZXkgKyAnXScpO1xyXG4gICAgdmFyIHNlbGVjdGVkUGFuZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wYW5lPScgKyB0YXJnZXRLZXkgKyAnXScpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxsVGFicy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGFsbFRhYnNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICAgICAgYWxsUGFuZXNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxlY3RlZFRhYnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBzZWxlY3RlZFRhYnNbaV0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICAgICAgc2VsZWN0ZWRQYW5lc1tpXS5jbGFzc0xpc3QuYWRkKCdzaG93JywgJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG59XHJcblxyXG5mb3IgKGkgPSAwOyBpIDwgYWxsVGFicy5sZW5ndGg7IGkrKykge1xyXG4gICAgYWxsVGFic1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVRhYnMpO1xyXG59XHJcbi8vIFVwb24gcGFnZSBsb2FkLCBpZiB1c2VyIGhhcyBhIHByZWZlcnJlZCBsYW5ndWFnZSBpbiBpdHMgbG9jYWxTdG9yYWdlLCB0YWJzIGFyZSBzZXQgdG8gaXQuXHJcbmlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2NvbmZpZ0xhbmdQcmVmJykpIHtcclxuICAgIHRvZ2dsZVRhYnMod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdjb25maWdMYW5nUHJlZicpKTtcclxufVxyXG4iLCAiLy8gUHV0IHlvdXIgY3VzdG9tIEpTIGNvZGUgaGVyZVxyXG5cclxuICAgIChmdW5jdGlvbih3LGQsZSx1LGYsbCxuKXt3W2ZdPXdbZl18fGZ1bmN0aW9uKCl7KHdbZl0ucT13W2ZdLnF8fFtdKVxyXG4gICAgLnB1c2goYXJndW1lbnRzKTt9LGw9ZC5jcmVhdGVFbGVtZW50KGUpLGwuYXN5bmM9MSxsLnNyYz11LFxyXG4gICAgbj1kLmdldEVsZW1lbnRzQnlUYWdOYW1lKGUpWzBdLG4ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobCxuKTt9KVxyXG4gICAgKHdpbmRvdyxkb2N1bWVudCwnc2NyaXB0JywnaHR0cHM6Ly9hc3NldHMubWFpbGVybGl0ZS5jb20vanMvdW5pdmVyc2FsLmpzJywnbWwnKTtcclxuICAgIG1sKCdhY2NvdW50JywgJzE0NDE0MzEnKTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUEsT0FBQyxTQUFTQSxTQUFRLFNBQVM7QUFDMUIsWUFBSUMsYUFBWSxRQUFRRCxTQUFRQSxRQUFPLFVBQVUsSUFBSTtBQUNyRCxRQUFBQSxRQUFPLFlBQVlDO0FBQ25C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QUVBLEVBQUMsRUFBRSxJQUFFLEVBQUVBLEVBQUMsRUFBRSxLQUFHLENBQUMsR0FDL0QsS0FBSyxTQUFTO0FBQUEsSUFBRSxHQUFFLElBQUUsRUFBRSxjQUFjRixFQUFDLEdBQUUsRUFBRSxRQUFNLEdBQUUsRUFBRSxNQUFJQyxJQUN4REUsS0FBRSxFQUFFLHFCQUFxQkgsRUFBQyxFQUFFLENBQUMsR0FBRUcsR0FBRSxXQUFXLGFBQWEsR0FBRUEsRUFBQztBQUFBLEVBQUUsR0FDN0QsUUFBTyxVQUFTLFVBQVMsaURBQWdELElBQUk7QUFDOUUsS0FBRyxXQUFXLFNBQVM7IiwKICAibmFtZXMiOiBbIndpbmRvdyIsICJsYXp5U2l6ZXMiLCAiZG9jdW1lbnQiLCAiRGF0ZSIsICJzZXRUaW1lb3V0IiwgImUiLCAiaSIsICJsb2FkTW9kZSIsICJ3aW5kb3ciLCAiZG9jdW1lbnQiLCAibGF6eVNpemVzIiwgImUiLCAiX193ZWJwYWNrX3JlcXVpcmVfXyIsICJDbGlwYm9hcmRBY3Rpb25DdXQiLCAiZmFrZUNvcHlBY3Rpb24iLCAiQ2xpcGJvYXJkQWN0aW9uQ29weSIsICJfdHlwZW9mIiwgIm9iaiIsICJDbGlwYm9hcmRBY3Rpb25EZWZhdWx0IiwgImkiLCAibyIsICJfc2V0UHJvdG90eXBlT2YiLCAicCIsICJlIiwgIl9nZXRQcm90b3R5cGVPZiIsICJDbGlwYm9hcmQiLCAiYWN0aW9uIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgImUiLCAibiIsICJyIiwgInQiLCAiYSIsICJ1IiwgInMiLCAiZiIsICJsYXp5U2l6ZXMiLCAiaSIsICJDbGlwYm9hcmQiLCAiZSIsICJpIiwgImUiLCAidSIsICJmIiwgIm4iXQp9Cg==
