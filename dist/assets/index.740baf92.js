(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const stringToByteArray$1 = function(str) {
  const out = [];
  let p2 = 0;
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if (c < 128) {
      out[p2++] = c;
    } else if (c < 2048) {
      out[p2++] = c >> 6 | 192;
      out[p2++] = c & 63 | 128;
    } else if ((c & 64512) === 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) === 56320) {
      c = 65536 + ((c & 1023) << 10) + (str.charCodeAt(++i) & 1023);
      out[p2++] = c >> 18 | 240;
      out[p2++] = c >> 12 & 63 | 128;
      out[p2++] = c >> 6 & 63 | 128;
      out[p2++] = c & 63 | 128;
    } else {
      out[p2++] = c >> 12 | 224;
      out[p2++] = c >> 6 & 63 | 128;
      out[p2++] = c & 63 | 128;
    }
  }
  return out;
};
const byteArrayToString = function(bytes) {
  const out = [];
  let pos = 0, c = 0;
  while (pos < bytes.length) {
    const c1 = bytes[pos++];
    if (c1 < 128) {
      out[c++] = String.fromCharCode(c1);
    } else if (c1 > 191 && c1 < 224) {
      const c2 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
    } else if (c1 > 239 && c1 < 365) {
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      const c4 = bytes[pos++];
      const u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) - 65536;
      out[c++] = String.fromCharCode(55296 + (u >> 10));
      out[c++] = String.fromCharCode(56320 + (u & 1023));
    } else {
      const c2 = bytes[pos++];
      const c3 = bytes[pos++];
      out[c++] = String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
    }
  }
  return out.join("");
};
const base64 = {
  byteToCharMap_: null,
  charToByteMap_: null,
  byteToCharMapWebSafe_: null,
  charToByteMapWebSafe_: null,
  ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  get ENCODED_VALS() {
    return this.ENCODED_VALS_BASE + "+/=";
  },
  get ENCODED_VALS_WEBSAFE() {
    return this.ENCODED_VALS_BASE + "-_.";
  },
  HAS_NATIVE_SUPPORT: typeof atob === "function",
  encodeByteArray(input, webSafe) {
    if (!Array.isArray(input)) {
      throw Error("encodeByteArray takes an array as a parameter");
    }
    this.init_();
    const byteToCharMap = webSafe ? this.byteToCharMapWebSafe_ : this.byteToCharMap_;
    const output = [];
    for (let i = 0; i < input.length; i += 3) {
      const byte1 = input[i];
      const haveByte2 = i + 1 < input.length;
      const byte2 = haveByte2 ? input[i + 1] : 0;
      const haveByte3 = i + 2 < input.length;
      const byte3 = haveByte3 ? input[i + 2] : 0;
      const outByte1 = byte1 >> 2;
      const outByte2 = (byte1 & 3) << 4 | byte2 >> 4;
      let outByte3 = (byte2 & 15) << 2 | byte3 >> 6;
      let outByte4 = byte3 & 63;
      if (!haveByte3) {
        outByte4 = 64;
        if (!haveByte2) {
          outByte3 = 64;
        }
      }
      output.push(byteToCharMap[outByte1], byteToCharMap[outByte2], byteToCharMap[outByte3], byteToCharMap[outByte4]);
    }
    return output.join("");
  },
  encodeString(input, webSafe) {
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return btoa(input);
    }
    return this.encodeByteArray(stringToByteArray$1(input), webSafe);
  },
  decodeString(input, webSafe) {
    if (this.HAS_NATIVE_SUPPORT && !webSafe) {
      return atob(input);
    }
    return byteArrayToString(this.decodeStringToByteArray(input, webSafe));
  },
  decodeStringToByteArray(input, webSafe) {
    this.init_();
    const charToByteMap = webSafe ? this.charToByteMapWebSafe_ : this.charToByteMap_;
    const output = [];
    for (let i = 0; i < input.length; ) {
      const byte1 = charToByteMap[input.charAt(i++)];
      const haveByte2 = i < input.length;
      const byte2 = haveByte2 ? charToByteMap[input.charAt(i)] : 0;
      ++i;
      const haveByte3 = i < input.length;
      const byte3 = haveByte3 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      const haveByte4 = i < input.length;
      const byte4 = haveByte4 ? charToByteMap[input.charAt(i)] : 64;
      ++i;
      if (byte1 == null || byte2 == null || byte3 == null || byte4 == null) {
        throw Error();
      }
      const outByte1 = byte1 << 2 | byte2 >> 4;
      output.push(outByte1);
      if (byte3 !== 64) {
        const outByte2 = byte2 << 4 & 240 | byte3 >> 2;
        output.push(outByte2);
        if (byte4 !== 64) {
          const outByte3 = byte3 << 6 & 192 | byte4;
          output.push(outByte3);
        }
      }
    }
    return output;
  },
  init_() {
    if (!this.byteToCharMap_) {
      this.byteToCharMap_ = {};
      this.charToByteMap_ = {};
      this.byteToCharMapWebSafe_ = {};
      this.charToByteMapWebSafe_ = {};
      for (let i = 0; i < this.ENCODED_VALS.length; i++) {
        this.byteToCharMap_[i] = this.ENCODED_VALS.charAt(i);
        this.charToByteMap_[this.byteToCharMap_[i]] = i;
        this.byteToCharMapWebSafe_[i] = this.ENCODED_VALS_WEBSAFE.charAt(i);
        this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[i]] = i;
        if (i >= this.ENCODED_VALS_BASE.length) {
          this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(i)] = i;
          this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(i)] = i;
        }
      }
    }
  }
};
const base64Encode = function(str) {
  const utf8Bytes = stringToByteArray$1(str);
  return base64.encodeByteArray(utf8Bytes, true);
};
const base64urlEncodeWithoutPadding = function(str) {
  return base64Encode(str).replace(/\./g, "");
};
const base64Decode = function(str) {
  try {
    return base64.decodeString(str, true);
  } catch (e) {
    console.error("base64Decode failed: ", e);
  }
  return null;
};
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getGlobal() {
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("Unable to locate global object.");
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const getDefaultsFromGlobal = () => getGlobal().__FIREBASE_DEFAULTS__;
const getDefaultsFromEnvVariable = () => {
  if (typeof process === "undefined" || typeof process.env === "undefined") {
    return;
  }
  const defaultsJsonString = {}.__FIREBASE_DEFAULTS__;
  if (defaultsJsonString) {
    return JSON.parse(defaultsJsonString);
  }
};
const getDefaultsFromCookie = () => {
  if (typeof document === "undefined") {
    return;
  }
  let match;
  try {
    match = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
  } catch (e) {
    return;
  }
  const decoded = match && base64Decode(match[1]);
  return decoded && JSON.parse(decoded);
};
const getDefaults = () => {
  try {
    return getDefaultsFromGlobal() || getDefaultsFromEnvVariable() || getDefaultsFromCookie();
  } catch (e) {
    console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
    return;
  }
};
const getDefaultEmulatorHost = (productName) => {
  var _a2, _b;
  return (_b = (_a2 = getDefaults()) === null || _a2 === void 0 ? void 0 : _a2.emulatorHosts) === null || _b === void 0 ? void 0 : _b[productName];
};
const getDefaultEmulatorHostnameAndPort = (productName) => {
  const host = getDefaultEmulatorHost(productName);
  if (!host) {
    return void 0;
  }
  const separatorIndex = host.lastIndexOf(":");
  if (separatorIndex <= 0 || separatorIndex + 1 === host.length) {
    throw new Error(`Invalid host ${host} with no separate hostname and port!`);
  }
  const port = parseInt(host.substring(separatorIndex + 1), 10);
  if (host[0] === "[") {
    return [host.substring(1, separatorIndex - 1), port];
  } else {
    return [host.substring(0, separatorIndex), port];
  }
};
const getDefaultAppConfig = () => {
  var _a2;
  return (_a2 = getDefaults()) === null || _a2 === void 0 ? void 0 : _a2.config;
};
const getExperimentalSetting = (name2) => {
  var _a2;
  return (_a2 = getDefaults()) === null || _a2 === void 0 ? void 0 : _a2[`_${name2}`];
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Deferred {
  constructor() {
    this.reject = () => {
    };
    this.resolve = () => {
    };
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
  wrapCallback(callback) {
    return (error, value) => {
      if (error) {
        this.reject(error);
      } else {
        this.resolve(value);
      }
      if (typeof callback === "function") {
        this.promise.catch(() => {
        });
        if (callback.length === 1) {
          callback(error);
        } else {
          callback(error, value);
        }
      }
    };
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function createMockUserToken(token, projectId) {
  if (token.uid) {
    throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');
  }
  const header = {
    alg: "none",
    type: "JWT"
  };
  const project = projectId || "demo-project";
  const iat = token.iat || 0;
  const sub = token.sub || token.user_id;
  if (!sub) {
    throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");
  }
  const payload = Object.assign({
    iss: `https://securetoken.google.com/${project}`,
    aud: project,
    iat,
    exp: iat + 3600,
    auth_time: iat,
    sub,
    user_id: sub,
    firebase: {
      sign_in_provider: "custom",
      identities: {}
    }
  }, token);
  const signature = "";
  return [
    base64urlEncodeWithoutPadding(JSON.stringify(header)),
    base64urlEncodeWithoutPadding(JSON.stringify(payload)),
    signature
  ].join(".");
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getUA() {
  if (typeof navigator !== "undefined" && typeof navigator["userAgent"] === "string") {
    return navigator["userAgent"];
  } else {
    return "";
  }
}
function isMobileCordova() {
  return typeof window !== "undefined" && !!(window["cordova"] || window["phonegap"] || window["PhoneGap"]) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA());
}
function isBrowserExtension() {
  const runtime = typeof chrome === "object" ? chrome.runtime : typeof browser === "object" ? browser.runtime : void 0;
  return typeof runtime === "object" && runtime.id !== void 0;
}
function isReactNative() {
  return typeof navigator === "object" && navigator["product"] === "ReactNative";
}
function isIE() {
  const ua2 = getUA();
  return ua2.indexOf("MSIE ") >= 0 || ua2.indexOf("Trident/") >= 0;
}
function isIndexedDBAvailable() {
  try {
    return typeof indexedDB === "object";
  } catch (e) {
    return false;
  }
}
function validateIndexedDBOpenable() {
  return new Promise((resolve, reject) => {
    try {
      let preExist = true;
      const DB_CHECK_NAME = "validate-browser-context-for-indexeddb-analytics-module";
      const request = self.indexedDB.open(DB_CHECK_NAME);
      request.onsuccess = () => {
        request.result.close();
        if (!preExist) {
          self.indexedDB.deleteDatabase(DB_CHECK_NAME);
        }
        resolve(true);
      };
      request.onupgradeneeded = () => {
        preExist = false;
      };
      request.onerror = () => {
        var _a2;
        reject(((_a2 = request.error) === null || _a2 === void 0 ? void 0 : _a2.message) || "");
      };
    } catch (error) {
      reject(error);
    }
  });
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ERROR_NAME = "FirebaseError";
class FirebaseError extends Error {
  constructor(code, message, customData) {
    super(message);
    this.code = code;
    this.customData = customData;
    this.name = ERROR_NAME;
    Object.setPrototypeOf(this, FirebaseError.prototype);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ErrorFactory.prototype.create);
    }
  }
}
class ErrorFactory {
  constructor(service, serviceName, errors) {
    this.service = service;
    this.serviceName = serviceName;
    this.errors = errors;
  }
  create(code, ...data) {
    const customData = data[0] || {};
    const fullCode = `${this.service}/${code}`;
    const template = this.errors[code];
    const message = template ? replaceTemplate(template, customData) : "Error";
    const fullMessage = `${this.serviceName}: ${message} (${fullCode}).`;
    const error = new FirebaseError(fullCode, fullMessage, customData);
    return error;
  }
}
function replaceTemplate(template, data) {
  return template.replace(PATTERN, (_, key) => {
    const value = data[key];
    return value != null ? String(value) : `<${key}?>`;
  });
}
const PATTERN = /\{\$([^}]+)}/g;
function isEmpty(obj) {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }
  return true;
}
function deepEqual(a, b2) {
  if (a === b2) {
    return true;
  }
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b2);
  for (const k2 of aKeys) {
    if (!bKeys.includes(k2)) {
      return false;
    }
    const aProp = a[k2];
    const bProp = b2[k2];
    if (isObject(aProp) && isObject(bProp)) {
      if (!deepEqual(aProp, bProp)) {
        return false;
      }
    } else if (aProp !== bProp) {
      return false;
    }
  }
  for (const k2 of bKeys) {
    if (!aKeys.includes(k2)) {
      return false;
    }
  }
  return true;
}
function isObject(thing) {
  return thing !== null && typeof thing === "object";
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function querystring(querystringParams) {
  const params = [];
  for (const [key, value] of Object.entries(querystringParams)) {
    if (Array.isArray(value)) {
      value.forEach((arrayVal) => {
        params.push(encodeURIComponent(key) + "=" + encodeURIComponent(arrayVal));
      });
    } else {
      params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
    }
  }
  return params.length ? "&" + params.join("&") : "";
}
function querystringDecode(querystring2) {
  const obj = {};
  const tokens = querystring2.replace(/^\?/, "").split("&");
  tokens.forEach((token) => {
    if (token) {
      const [key, value] = token.split("=");
      obj[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });
  return obj;
}
function extractQuerystring(url) {
  const queryStart = url.indexOf("?");
  if (!queryStart) {
    return "";
  }
  const fragmentStart = url.indexOf("#", queryStart);
  return url.substring(queryStart, fragmentStart > 0 ? fragmentStart : void 0);
}
function createSubscribe(executor, onNoObservers) {
  const proxy = new ObserverProxy(executor, onNoObservers);
  return proxy.subscribe.bind(proxy);
}
class ObserverProxy {
  constructor(executor, onNoObservers) {
    this.observers = [];
    this.unsubscribes = [];
    this.observerCount = 0;
    this.task = Promise.resolve();
    this.finalized = false;
    this.onNoObservers = onNoObservers;
    this.task.then(() => {
      executor(this);
    }).catch((e) => {
      this.error(e);
    });
  }
  next(value) {
    this.forEachObserver((observer) => {
      observer.next(value);
    });
  }
  error(error) {
    this.forEachObserver((observer) => {
      observer.error(error);
    });
    this.close(error);
  }
  complete() {
    this.forEachObserver((observer) => {
      observer.complete();
    });
    this.close();
  }
  subscribe(nextOrObserver, error, complete) {
    let observer;
    if (nextOrObserver === void 0 && error === void 0 && complete === void 0) {
      throw new Error("Missing Observer.");
    }
    if (implementsAnyMethods(nextOrObserver, [
      "next",
      "error",
      "complete"
    ])) {
      observer = nextOrObserver;
    } else {
      observer = {
        next: nextOrObserver,
        error,
        complete
      };
    }
    if (observer.next === void 0) {
      observer.next = noop;
    }
    if (observer.error === void 0) {
      observer.error = noop;
    }
    if (observer.complete === void 0) {
      observer.complete = noop;
    }
    const unsub = this.unsubscribeOne.bind(this, this.observers.length);
    if (this.finalized) {
      this.task.then(() => {
        try {
          if (this.finalError) {
            observer.error(this.finalError);
          } else {
            observer.complete();
          }
        } catch (e) {
        }
        return;
      });
    }
    this.observers.push(observer);
    return unsub;
  }
  unsubscribeOne(i) {
    if (this.observers === void 0 || this.observers[i] === void 0) {
      return;
    }
    delete this.observers[i];
    this.observerCount -= 1;
    if (this.observerCount === 0 && this.onNoObservers !== void 0) {
      this.onNoObservers(this);
    }
  }
  forEachObserver(fn2) {
    if (this.finalized) {
      return;
    }
    for (let i = 0; i < this.observers.length; i++) {
      this.sendOne(i, fn2);
    }
  }
  sendOne(i, fn2) {
    this.task.then(() => {
      if (this.observers !== void 0 && this.observers[i] !== void 0) {
        try {
          fn2(this.observers[i]);
        } catch (e) {
          if (typeof console !== "undefined" && console.error) {
            console.error(e);
          }
        }
      }
    });
  }
  close(err) {
    if (this.finalized) {
      return;
    }
    this.finalized = true;
    if (err !== void 0) {
      this.finalError = err;
    }
    this.task.then(() => {
      this.observers = void 0;
      this.onNoObservers = void 0;
    });
  }
}
function implementsAnyMethods(obj, methods) {
  if (typeof obj !== "object" || obj === null) {
    return false;
  }
  for (const method of methods) {
    if (method in obj && typeof obj[method] === "function") {
      return true;
    }
  }
  return false;
}
function noop() {
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getModularInstance(service) {
  if (service && service._delegate) {
    return service._delegate;
  } else {
    return service;
  }
}
class Component {
  constructor(name2, instanceFactory, type) {
    this.name = name2;
    this.instanceFactory = instanceFactory;
    this.type = type;
    this.multipleInstances = false;
    this.serviceProps = {};
    this.instantiationMode = "LAZY";
    this.onInstanceCreated = null;
  }
  setInstantiationMode(mode) {
    this.instantiationMode = mode;
    return this;
  }
  setMultipleInstances(multipleInstances) {
    this.multipleInstances = multipleInstances;
    return this;
  }
  setServiceProps(props) {
    this.serviceProps = props;
    return this;
  }
  setInstanceCreatedCallback(callback) {
    this.onInstanceCreated = callback;
    return this;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_ENTRY_NAME$1 = "[DEFAULT]";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Provider {
  constructor(name2, container) {
    this.name = name2;
    this.container = container;
    this.component = null;
    this.instances = /* @__PURE__ */ new Map();
    this.instancesDeferred = /* @__PURE__ */ new Map();
    this.instancesOptions = /* @__PURE__ */ new Map();
    this.onInitCallbacks = /* @__PURE__ */ new Map();
  }
  get(identifier) {
    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
    if (!this.instancesDeferred.has(normalizedIdentifier)) {
      const deferred = new Deferred();
      this.instancesDeferred.set(normalizedIdentifier, deferred);
      if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
        try {
          const instance = this.getOrInitializeService({
            instanceIdentifier: normalizedIdentifier
          });
          if (instance) {
            deferred.resolve(instance);
          }
        } catch (e) {
        }
      }
    }
    return this.instancesDeferred.get(normalizedIdentifier).promise;
  }
  getImmediate(options) {
    var _a2;
    const normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
    const optional = (_a2 = options === null || options === void 0 ? void 0 : options.optional) !== null && _a2 !== void 0 ? _a2 : false;
    if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
      try {
        return this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
      } catch (e) {
        if (optional) {
          return null;
        } else {
          throw e;
        }
      }
    } else {
      if (optional) {
        return null;
      } else {
        throw Error(`Service ${this.name} is not available`);
      }
    }
  }
  getComponent() {
    return this.component;
  }
  setComponent(component) {
    if (component.name !== this.name) {
      throw Error(`Mismatching Component ${component.name} for Provider ${this.name}.`);
    }
    if (this.component) {
      throw Error(`Component for ${this.name} has already been provided`);
    }
    this.component = component;
    if (!this.shouldAutoInitialize()) {
      return;
    }
    if (isComponentEager(component)) {
      try {
        this.getOrInitializeService({ instanceIdentifier: DEFAULT_ENTRY_NAME$1 });
      } catch (e) {
      }
    }
    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
      try {
        const instance = this.getOrInitializeService({
          instanceIdentifier: normalizedIdentifier
        });
        instanceDeferred.resolve(instance);
      } catch (e) {
      }
    }
  }
  clearInstance(identifier = DEFAULT_ENTRY_NAME$1) {
    this.instancesDeferred.delete(identifier);
    this.instancesOptions.delete(identifier);
    this.instances.delete(identifier);
  }
  async delete() {
    const services = Array.from(this.instances.values());
    await Promise.all([
      ...services.filter((service) => "INTERNAL" in service).map((service) => service.INTERNAL.delete()),
      ...services.filter((service) => "_delete" in service).map((service) => service._delete())
    ]);
  }
  isComponentSet() {
    return this.component != null;
  }
  isInitialized(identifier = DEFAULT_ENTRY_NAME$1) {
    return this.instances.has(identifier);
  }
  getOptions(identifier = DEFAULT_ENTRY_NAME$1) {
    return this.instancesOptions.get(identifier) || {};
  }
  initialize(opts = {}) {
    const { options = {} } = opts;
    const normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);
    if (this.isInitialized(normalizedIdentifier)) {
      throw Error(`${this.name}(${normalizedIdentifier}) has already been initialized`);
    }
    if (!this.isComponentSet()) {
      throw Error(`Component ${this.name} has not been registered yet`);
    }
    const instance = this.getOrInitializeService({
      instanceIdentifier: normalizedIdentifier,
      options
    });
    for (const [instanceIdentifier, instanceDeferred] of this.instancesDeferred.entries()) {
      const normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);
      if (normalizedIdentifier === normalizedDeferredIdentifier) {
        instanceDeferred.resolve(instance);
      }
    }
    return instance;
  }
  onInit(callback, identifier) {
    var _a2;
    const normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
    const existingCallbacks = (_a2 = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a2 !== void 0 ? _a2 : /* @__PURE__ */ new Set();
    existingCallbacks.add(callback);
    this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
    const existingInstance = this.instances.get(normalizedIdentifier);
    if (existingInstance) {
      callback(existingInstance, normalizedIdentifier);
    }
    return () => {
      existingCallbacks.delete(callback);
    };
  }
  invokeOnInitCallbacks(instance, identifier) {
    const callbacks = this.onInitCallbacks.get(identifier);
    if (!callbacks) {
      return;
    }
    for (const callback of callbacks) {
      try {
        callback(instance, identifier);
      } catch (_a2) {
      }
    }
  }
  getOrInitializeService({ instanceIdentifier, options = {} }) {
    let instance = this.instances.get(instanceIdentifier);
    if (!instance && this.component) {
      instance = this.component.instanceFactory(this.container, {
        instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
        options
      });
      this.instances.set(instanceIdentifier, instance);
      this.instancesOptions.set(instanceIdentifier, options);
      this.invokeOnInitCallbacks(instance, instanceIdentifier);
      if (this.component.onInstanceCreated) {
        try {
          this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
        } catch (_a2) {
        }
      }
    }
    return instance || null;
  }
  normalizeInstanceIdentifier(identifier = DEFAULT_ENTRY_NAME$1) {
    if (this.component) {
      return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME$1;
    } else {
      return identifier;
    }
  }
  shouldAutoInitialize() {
    return !!this.component && this.component.instantiationMode !== "EXPLICIT";
  }
}
function normalizeIdentifierForFactory(identifier) {
  return identifier === DEFAULT_ENTRY_NAME$1 ? void 0 : identifier;
}
function isComponentEager(component) {
  return component.instantiationMode === "EAGER";
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ComponentContainer {
  constructor(name2) {
    this.name = name2;
    this.providers = /* @__PURE__ */ new Map();
  }
  addComponent(component) {
    const provider2 = this.getProvider(component.name);
    if (provider2.isComponentSet()) {
      throw new Error(`Component ${component.name} has already been registered with ${this.name}`);
    }
    provider2.setComponent(component);
  }
  addOrOverwriteComponent(component) {
    const provider2 = this.getProvider(component.name);
    if (provider2.isComponentSet()) {
      this.providers.delete(component.name);
    }
    this.addComponent(component);
  }
  getProvider(name2) {
    if (this.providers.has(name2)) {
      return this.providers.get(name2);
    }
    const provider2 = new Provider(name2, this);
    this.providers.set(name2, provider2);
    return provider2;
  }
  getProviders() {
    return Array.from(this.providers.values());
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var LogLevel;
(function(LogLevel2) {
  LogLevel2[LogLevel2["DEBUG"] = 0] = "DEBUG";
  LogLevel2[LogLevel2["VERBOSE"] = 1] = "VERBOSE";
  LogLevel2[LogLevel2["INFO"] = 2] = "INFO";
  LogLevel2[LogLevel2["WARN"] = 3] = "WARN";
  LogLevel2[LogLevel2["ERROR"] = 4] = "ERROR";
  LogLevel2[LogLevel2["SILENT"] = 5] = "SILENT";
})(LogLevel || (LogLevel = {}));
const levelStringToEnum = {
  "debug": LogLevel.DEBUG,
  "verbose": LogLevel.VERBOSE,
  "info": LogLevel.INFO,
  "warn": LogLevel.WARN,
  "error": LogLevel.ERROR,
  "silent": LogLevel.SILENT
};
const defaultLogLevel = LogLevel.INFO;
const ConsoleMethod = {
  [LogLevel.DEBUG]: "log",
  [LogLevel.VERBOSE]: "log",
  [LogLevel.INFO]: "info",
  [LogLevel.WARN]: "warn",
  [LogLevel.ERROR]: "error"
};
const defaultLogHandler = (instance, logType, ...args) => {
  if (logType < instance.logLevel) {
    return;
  }
  const now = new Date().toISOString();
  const method = ConsoleMethod[logType];
  if (method) {
    console[method](`[${now}]  ${instance.name}:`, ...args);
  } else {
    throw new Error(`Attempted to log a message with an invalid logType (value: ${logType})`);
  }
};
class Logger {
  constructor(name2) {
    this.name = name2;
    this._logLevel = defaultLogLevel;
    this._logHandler = defaultLogHandler;
    this._userLogHandler = null;
  }
  get logLevel() {
    return this._logLevel;
  }
  set logLevel(val) {
    if (!(val in LogLevel)) {
      throw new TypeError(`Invalid value "${val}" assigned to \`logLevel\``);
    }
    this._logLevel = val;
  }
  setLogLevel(val) {
    this._logLevel = typeof val === "string" ? levelStringToEnum[val] : val;
  }
  get logHandler() {
    return this._logHandler;
  }
  set logHandler(val) {
    if (typeof val !== "function") {
      throw new TypeError("Value assigned to `logHandler` must be a function");
    }
    this._logHandler = val;
  }
  get userLogHandler() {
    return this._userLogHandler;
  }
  set userLogHandler(val) {
    this._userLogHandler = val;
  }
  debug(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.DEBUG, ...args);
    this._logHandler(this, LogLevel.DEBUG, ...args);
  }
  log(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.VERBOSE, ...args);
    this._logHandler(this, LogLevel.VERBOSE, ...args);
  }
  info(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.INFO, ...args);
    this._logHandler(this, LogLevel.INFO, ...args);
  }
  warn(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.WARN, ...args);
    this._logHandler(this, LogLevel.WARN, ...args);
  }
  error(...args) {
    this._userLogHandler && this._userLogHandler(this, LogLevel.ERROR, ...args);
    this._logHandler(this, LogLevel.ERROR, ...args);
  }
}
const instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
let idbProxyableTypes;
let cursorAdvanceMethods;
function getIdbProxyableTypes() {
  return idbProxyableTypes || (idbProxyableTypes = [
    IDBDatabase,
    IDBObjectStore,
    IDBIndex,
    IDBCursor,
    IDBTransaction
  ]);
}
function getCursorAdvanceMethods() {
  return cursorAdvanceMethods || (cursorAdvanceMethods = [
    IDBCursor.prototype.advance,
    IDBCursor.prototype.continue,
    IDBCursor.prototype.continuePrimaryKey
  ]);
}
const cursorRequestMap = /* @__PURE__ */ new WeakMap();
const transactionDoneMap = /* @__PURE__ */ new WeakMap();
const transactionStoreNamesMap = /* @__PURE__ */ new WeakMap();
const transformCache = /* @__PURE__ */ new WeakMap();
const reverseTransformCache = /* @__PURE__ */ new WeakMap();
function promisifyRequest(request) {
  const promise = new Promise((resolve, reject) => {
    const unlisten = () => {
      request.removeEventListener("success", success);
      request.removeEventListener("error", error);
    };
    const success = () => {
      resolve(wrap(request.result));
      unlisten();
    };
    const error = () => {
      reject(request.error);
      unlisten();
    };
    request.addEventListener("success", success);
    request.addEventListener("error", error);
  });
  promise.then((value) => {
    if (value instanceof IDBCursor) {
      cursorRequestMap.set(value, request);
    }
  }).catch(() => {
  });
  reverseTransformCache.set(promise, request);
  return promise;
}
function cacheDonePromiseForTransaction(tx) {
  if (transactionDoneMap.has(tx))
    return;
  const done = new Promise((resolve, reject) => {
    const unlisten = () => {
      tx.removeEventListener("complete", complete);
      tx.removeEventListener("error", error);
      tx.removeEventListener("abort", error);
    };
    const complete = () => {
      resolve();
      unlisten();
    };
    const error = () => {
      reject(tx.error || new DOMException("AbortError", "AbortError"));
      unlisten();
    };
    tx.addEventListener("complete", complete);
    tx.addEventListener("error", error);
    tx.addEventListener("abort", error);
  });
  transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
  get(target, prop, receiver) {
    if (target instanceof IDBTransaction) {
      if (prop === "done")
        return transactionDoneMap.get(target);
      if (prop === "objectStoreNames") {
        return target.objectStoreNames || transactionStoreNamesMap.get(target);
      }
      if (prop === "store") {
        return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
      }
    }
    return wrap(target[prop]);
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  },
  has(target, prop) {
    if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
      return true;
    }
    return prop in target;
  }
};
function replaceTraps(callback) {
  idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
  if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) {
    return function(storeNames, ...args) {
      const tx = func.call(unwrap(this), storeNames, ...args);
      transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
      return wrap(tx);
    };
  }
  if (getCursorAdvanceMethods().includes(func)) {
    return function(...args) {
      func.apply(unwrap(this), args);
      return wrap(cursorRequestMap.get(this));
    };
  }
  return function(...args) {
    return wrap(func.apply(unwrap(this), args));
  };
}
function transformCachableValue(value) {
  if (typeof value === "function")
    return wrapFunction(value);
  if (value instanceof IDBTransaction)
    cacheDonePromiseForTransaction(value);
  if (instanceOfAny(value, getIdbProxyableTypes()))
    return new Proxy(value, idbProxyTraps);
  return value;
}
function wrap(value) {
  if (value instanceof IDBRequest)
    return promisifyRequest(value);
  if (transformCache.has(value))
    return transformCache.get(value);
  const newValue = transformCachableValue(value);
  if (newValue !== value) {
    transformCache.set(value, newValue);
    reverseTransformCache.set(newValue, value);
  }
  return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);
function openDB(name2, version2, { blocked, upgrade, blocking, terminated } = {}) {
  const request = indexedDB.open(name2, version2);
  const openPromise = wrap(request);
  if (upgrade) {
    request.addEventListener("upgradeneeded", (event) => {
      upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction));
    });
  }
  if (blocked)
    request.addEventListener("blocked", () => blocked());
  openPromise.then((db2) => {
    if (terminated)
      db2.addEventListener("close", () => terminated());
    if (blocking)
      db2.addEventListener("versionchange", () => blocking());
  }).catch(() => {
  });
  return openPromise;
}
const readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
const writeMethods = ["put", "add", "delete", "clear"];
const cachedMethods = /* @__PURE__ */ new Map();
function getMethod(target, prop) {
  if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
    return;
  }
  if (cachedMethods.get(prop))
    return cachedMethods.get(prop);
  const targetFuncName = prop.replace(/FromIndex$/, "");
  const useIndex = prop !== targetFuncName;
  const isWrite = writeMethods.includes(targetFuncName);
  if (!(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) {
    return;
  }
  const method = async function(storeName, ...args) {
    const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
    let target2 = tx.store;
    if (useIndex)
      target2 = target2.index(args.shift());
    return (await Promise.all([
      target2[targetFuncName](...args),
      isWrite && tx.done
    ]))[0];
  };
  cachedMethods.set(prop, method);
  return method;
}
replaceTraps((oldTraps) => ({
  ...oldTraps,
  get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
  has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class PlatformLoggerServiceImpl {
  constructor(container) {
    this.container = container;
  }
  getPlatformInfoString() {
    const providers = this.container.getProviders();
    return providers.map((provider2) => {
      if (isVersionServiceProvider(provider2)) {
        const service = provider2.getImmediate();
        return `${service.library}/${service.version}`;
      } else {
        return null;
      }
    }).filter((logString) => logString).join(" ");
  }
}
function isVersionServiceProvider(provider2) {
  const component = provider2.getComponent();
  return (component === null || component === void 0 ? void 0 : component.type) === "VERSION";
}
const name$o = "@firebase/app";
const version$1$1 = "0.9.3";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const logger = new Logger("@firebase/app");
const name$n = "@firebase/app-compat";
const name$m = "@firebase/analytics-compat";
const name$l = "@firebase/analytics";
const name$k = "@firebase/app-check-compat";
const name$j = "@firebase/app-check";
const name$i = "@firebase/auth";
const name$h = "@firebase/auth-compat";
const name$g = "@firebase/database";
const name$f = "@firebase/database-compat";
const name$e = "@firebase/functions";
const name$d = "@firebase/functions-compat";
const name$c = "@firebase/installations";
const name$b = "@firebase/installations-compat";
const name$a = "@firebase/messaging";
const name$9 = "@firebase/messaging-compat";
const name$8 = "@firebase/performance";
const name$7 = "@firebase/performance-compat";
const name$6 = "@firebase/remote-config";
const name$5 = "@firebase/remote-config-compat";
const name$4 = "@firebase/storage";
const name$3 = "@firebase/storage-compat";
const name$2 = "@firebase/firestore";
const name$1$1 = "@firebase/firestore-compat";
const name$p = "firebase";
const version$2 = "9.17.1";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_ENTRY_NAME = "[DEFAULT]";
const PLATFORM_LOG_STRING = {
  [name$o]: "fire-core",
  [name$n]: "fire-core-compat",
  [name$l]: "fire-analytics",
  [name$m]: "fire-analytics-compat",
  [name$j]: "fire-app-check",
  [name$k]: "fire-app-check-compat",
  [name$i]: "fire-auth",
  [name$h]: "fire-auth-compat",
  [name$g]: "fire-rtdb",
  [name$f]: "fire-rtdb-compat",
  [name$e]: "fire-fn",
  [name$d]: "fire-fn-compat",
  [name$c]: "fire-iid",
  [name$b]: "fire-iid-compat",
  [name$a]: "fire-fcm",
  [name$9]: "fire-fcm-compat",
  [name$8]: "fire-perf",
  [name$7]: "fire-perf-compat",
  [name$6]: "fire-rc",
  [name$5]: "fire-rc-compat",
  [name$4]: "fire-gcs",
  [name$3]: "fire-gcs-compat",
  [name$2]: "fire-fst",
  [name$1$1]: "fire-fst-compat",
  "fire-js": "fire-js",
  [name$p]: "fire-js-all"
};
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _apps = /* @__PURE__ */ new Map();
const _components = /* @__PURE__ */ new Map();
function _addComponent(app2, component) {
  try {
    app2.container.addComponent(component);
  } catch (e) {
    logger.debug(`Component ${component.name} failed to register with FirebaseApp ${app2.name}`, e);
  }
}
function _registerComponent(component) {
  const componentName = component.name;
  if (_components.has(componentName)) {
    logger.debug(`There were multiple attempts to register component ${componentName}.`);
    return false;
  }
  _components.set(componentName, component);
  for (const app2 of _apps.values()) {
    _addComponent(app2, component);
  }
  return true;
}
function _getProvider(app2, name2) {
  const heartbeatController = app2.container.getProvider("heartbeat").getImmediate({ optional: true });
  if (heartbeatController) {
    void heartbeatController.triggerHeartbeat();
  }
  return app2.container.getProvider(name2);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ERRORS = {
  ["no-app"]: "No Firebase App '{$appName}' has been created - call Firebase App.initializeApp()",
  ["bad-app-name"]: "Illegal App name: '{$appName}",
  ["duplicate-app"]: "Firebase App named '{$appName}' already exists with different options or config",
  ["app-deleted"]: "Firebase App named '{$appName}' already deleted",
  ["no-options"]: "Need to provide options, when not being deployed to hosting via source.",
  ["invalid-app-argument"]: "firebase.{$appName}() takes either no argument or a Firebase App instance.",
  ["invalid-log-argument"]: "First argument to `onLog` must be null or a function.",
  ["idb-open"]: "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
  ["idb-get"]: "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
  ["idb-set"]: "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
  ["idb-delete"]: "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."
};
const ERROR_FACTORY = new ErrorFactory("app", "Firebase", ERRORS);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class FirebaseAppImpl {
  constructor(options, config, container) {
    this._isDeleted = false;
    this._options = Object.assign({}, options);
    this._config = Object.assign({}, config);
    this._name = config.name;
    this._automaticDataCollectionEnabled = config.automaticDataCollectionEnabled;
    this._container = container;
    this.container.addComponent(new Component("app", () => this, "PUBLIC"));
  }
  get automaticDataCollectionEnabled() {
    this.checkDestroyed();
    return this._automaticDataCollectionEnabled;
  }
  set automaticDataCollectionEnabled(val) {
    this.checkDestroyed();
    this._automaticDataCollectionEnabled = val;
  }
  get name() {
    this.checkDestroyed();
    return this._name;
  }
  get options() {
    this.checkDestroyed();
    return this._options;
  }
  get config() {
    this.checkDestroyed();
    return this._config;
  }
  get container() {
    return this._container;
  }
  get isDeleted() {
    return this._isDeleted;
  }
  set isDeleted(val) {
    this._isDeleted = val;
  }
  checkDestroyed() {
    if (this.isDeleted) {
      throw ERROR_FACTORY.create("app-deleted", { appName: this._name });
    }
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const SDK_VERSION = version$2;
function initializeApp(_options, rawConfig = {}) {
  let options = _options;
  if (typeof rawConfig !== "object") {
    const name3 = rawConfig;
    rawConfig = { name: name3 };
  }
  const config = Object.assign({ name: DEFAULT_ENTRY_NAME, automaticDataCollectionEnabled: false }, rawConfig);
  const name2 = config.name;
  if (typeof name2 !== "string" || !name2) {
    throw ERROR_FACTORY.create("bad-app-name", {
      appName: String(name2)
    });
  }
  options || (options = getDefaultAppConfig());
  if (!options) {
    throw ERROR_FACTORY.create("no-options");
  }
  const existingApp = _apps.get(name2);
  if (existingApp) {
    if (deepEqual(options, existingApp.options) && deepEqual(config, existingApp.config)) {
      return existingApp;
    } else {
      throw ERROR_FACTORY.create("duplicate-app", { appName: name2 });
    }
  }
  const container = new ComponentContainer(name2);
  for (const component of _components.values()) {
    container.addComponent(component);
  }
  const newApp = new FirebaseAppImpl(options, config, container);
  _apps.set(name2, newApp);
  return newApp;
}
function getApp(name2 = DEFAULT_ENTRY_NAME) {
  const app2 = _apps.get(name2);
  if (!app2 && name2 === DEFAULT_ENTRY_NAME) {
    return initializeApp();
  }
  if (!app2) {
    throw ERROR_FACTORY.create("no-app", { appName: name2 });
  }
  return app2;
}
function registerVersion(libraryKeyOrName, version2, variant) {
  var _a2;
  let library = (_a2 = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a2 !== void 0 ? _a2 : libraryKeyOrName;
  if (variant) {
    library += `-${variant}`;
  }
  const libraryMismatch = library.match(/\s|\//);
  const versionMismatch = version2.match(/\s|\//);
  if (libraryMismatch || versionMismatch) {
    const warning = [
      `Unable to register library "${library}" with version "${version2}":`
    ];
    if (libraryMismatch) {
      warning.push(`library name "${library}" contains illegal characters (whitespace or "/")`);
    }
    if (libraryMismatch && versionMismatch) {
      warning.push("and");
    }
    if (versionMismatch) {
      warning.push(`version name "${version2}" contains illegal characters (whitespace or "/")`);
    }
    logger.warn(warning.join(" "));
    return;
  }
  _registerComponent(new Component(`${library}-version`, () => ({ library, version: version2 }), "VERSION"));
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DB_NAME$1 = "firebase-heartbeat-database";
const DB_VERSION$1 = 1;
const STORE_NAME = "firebase-heartbeat-store";
let dbPromise = null;
function getDbPromise() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME$1, DB_VERSION$1, {
      upgrade: (db2, oldVersion) => {
        switch (oldVersion) {
          case 0:
            db2.createObjectStore(STORE_NAME);
        }
      }
    }).catch((e) => {
      throw ERROR_FACTORY.create("idb-open", {
        originalErrorMessage: e.message
      });
    });
  }
  return dbPromise;
}
async function readHeartbeatsFromIndexedDB(app2) {
  try {
    const db2 = await getDbPromise();
    return db2.transaction(STORE_NAME).objectStore(STORE_NAME).get(computeKey(app2));
  } catch (e) {
    if (e instanceof FirebaseError) {
      logger.warn(e.message);
    } else {
      const idbGetError = ERROR_FACTORY.create("idb-get", {
        originalErrorMessage: e === null || e === void 0 ? void 0 : e.message
      });
      logger.warn(idbGetError.message);
    }
  }
}
async function writeHeartbeatsToIndexedDB(app2, heartbeatObject) {
  try {
    const db2 = await getDbPromise();
    const tx = db2.transaction(STORE_NAME, "readwrite");
    const objectStore = tx.objectStore(STORE_NAME);
    await objectStore.put(heartbeatObject, computeKey(app2));
    return tx.done;
  } catch (e) {
    if (e instanceof FirebaseError) {
      logger.warn(e.message);
    } else {
      const idbGetError = ERROR_FACTORY.create("idb-set", {
        originalErrorMessage: e === null || e === void 0 ? void 0 : e.message
      });
      logger.warn(idbGetError.message);
    }
  }
}
function computeKey(app2) {
  return `${app2.name}!${app2.options.appId}`;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const MAX_HEADER_BYTES = 1024;
const STORED_HEARTBEAT_RETENTION_MAX_MILLIS = 30 * 24 * 60 * 60 * 1e3;
class HeartbeatServiceImpl {
  constructor(container) {
    this.container = container;
    this._heartbeatsCache = null;
    const app2 = this.container.getProvider("app").getImmediate();
    this._storage = new HeartbeatStorageImpl(app2);
    this._heartbeatsCachePromise = this._storage.read().then((result) => {
      this._heartbeatsCache = result;
      return result;
    });
  }
  async triggerHeartbeat() {
    const platformLogger = this.container.getProvider("platform-logger").getImmediate();
    const agent = platformLogger.getPlatformInfoString();
    const date = getUTCDateString();
    if (this._heartbeatsCache === null) {
      this._heartbeatsCache = await this._heartbeatsCachePromise;
    }
    if (this._heartbeatsCache.lastSentHeartbeatDate === date || this._heartbeatsCache.heartbeats.some((singleDateHeartbeat) => singleDateHeartbeat.date === date)) {
      return;
    } else {
      this._heartbeatsCache.heartbeats.push({ date, agent });
    }
    this._heartbeatsCache.heartbeats = this._heartbeatsCache.heartbeats.filter((singleDateHeartbeat) => {
      const hbTimestamp = new Date(singleDateHeartbeat.date).valueOf();
      const now = Date.now();
      return now - hbTimestamp <= STORED_HEARTBEAT_RETENTION_MAX_MILLIS;
    });
    return this._storage.overwrite(this._heartbeatsCache);
  }
  async getHeartbeatsHeader() {
    if (this._heartbeatsCache === null) {
      await this._heartbeatsCachePromise;
    }
    if (this._heartbeatsCache === null || this._heartbeatsCache.heartbeats.length === 0) {
      return "";
    }
    const date = getUTCDateString();
    const { heartbeatsToSend, unsentEntries } = extractHeartbeatsForHeader(this._heartbeatsCache.heartbeats);
    const headerString = base64urlEncodeWithoutPadding(JSON.stringify({ version: 2, heartbeats: heartbeatsToSend }));
    this._heartbeatsCache.lastSentHeartbeatDate = date;
    if (unsentEntries.length > 0) {
      this._heartbeatsCache.heartbeats = unsentEntries;
      await this._storage.overwrite(this._heartbeatsCache);
    } else {
      this._heartbeatsCache.heartbeats = [];
      void this._storage.overwrite(this._heartbeatsCache);
    }
    return headerString;
  }
}
function getUTCDateString() {
  const today = new Date();
  return today.toISOString().substring(0, 10);
}
function extractHeartbeatsForHeader(heartbeatsCache, maxSize = MAX_HEADER_BYTES) {
  const heartbeatsToSend = [];
  let unsentEntries = heartbeatsCache.slice();
  for (const singleDateHeartbeat of heartbeatsCache) {
    const heartbeatEntry = heartbeatsToSend.find((hb2) => hb2.agent === singleDateHeartbeat.agent);
    if (!heartbeatEntry) {
      heartbeatsToSend.push({
        agent: singleDateHeartbeat.agent,
        dates: [singleDateHeartbeat.date]
      });
      if (countBytes(heartbeatsToSend) > maxSize) {
        heartbeatsToSend.pop();
        break;
      }
    } else {
      heartbeatEntry.dates.push(singleDateHeartbeat.date);
      if (countBytes(heartbeatsToSend) > maxSize) {
        heartbeatEntry.dates.pop();
        break;
      }
    }
    unsentEntries = unsentEntries.slice(1);
  }
  return {
    heartbeatsToSend,
    unsentEntries
  };
}
class HeartbeatStorageImpl {
  constructor(app2) {
    this.app = app2;
    this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck();
  }
  async runIndexedDBEnvironmentCheck() {
    if (!isIndexedDBAvailable()) {
      return false;
    } else {
      return validateIndexedDBOpenable().then(() => true).catch(() => false);
    }
  }
  async read() {
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return { heartbeats: [] };
    } else {
      const idbHeartbeatObject = await readHeartbeatsFromIndexedDB(this.app);
      return idbHeartbeatObject || { heartbeats: [] };
    }
  }
  async overwrite(heartbeatsObject) {
    var _a2;
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return;
    } else {
      const existingHeartbeatsObject = await this.read();
      return writeHeartbeatsToIndexedDB(this.app, {
        lastSentHeartbeatDate: (_a2 = heartbeatsObject.lastSentHeartbeatDate) !== null && _a2 !== void 0 ? _a2 : existingHeartbeatsObject.lastSentHeartbeatDate,
        heartbeats: heartbeatsObject.heartbeats
      });
    }
  }
  async add(heartbeatsObject) {
    var _a2;
    const canUseIndexedDB = await this._canUseIndexedDBPromise;
    if (!canUseIndexedDB) {
      return;
    } else {
      const existingHeartbeatsObject = await this.read();
      return writeHeartbeatsToIndexedDB(this.app, {
        lastSentHeartbeatDate: (_a2 = heartbeatsObject.lastSentHeartbeatDate) !== null && _a2 !== void 0 ? _a2 : existingHeartbeatsObject.lastSentHeartbeatDate,
        heartbeats: [
          ...existingHeartbeatsObject.heartbeats,
          ...heartbeatsObject.heartbeats
        ]
      });
    }
  }
}
function countBytes(heartbeatsCache) {
  return base64urlEncodeWithoutPadding(
    JSON.stringify({ version: 2, heartbeats: heartbeatsCache })
  ).length;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function registerCoreComponents(variant) {
  _registerComponent(new Component("platform-logger", (container) => new PlatformLoggerServiceImpl(container), "PRIVATE"));
  _registerComponent(new Component("heartbeat", (container) => new HeartbeatServiceImpl(container), "PRIVATE"));
  registerVersion(name$o, version$1$1, variant);
  registerVersion(name$o, version$1$1, "esm2017");
  registerVersion("fire-js", "");
}
registerCoreComponents("");
var name$1 = "firebase";
var version$1 = "9.17.1";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
registerVersion(name$1, version$1, "app");
function __rest(s, e) {
  var t2 = {};
  for (var p2 in s)
    if (Object.prototype.hasOwnProperty.call(s, p2) && e.indexOf(p2) < 0)
      t2[p2] = s[p2];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p2 = Object.getOwnPropertySymbols(s); i < p2.length; i++) {
      if (e.indexOf(p2[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p2[i]))
        t2[p2[i]] = s[p2[i]];
    }
  return t2;
}
function _prodErrorMap() {
  return {
    ["dependent-sdk-initialized-before-auth"]: "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."
  };
}
const prodErrorMap = _prodErrorMap;
const _DEFAULT_AUTH_ERROR_FACTORY = new ErrorFactory("auth", "Firebase", _prodErrorMap());
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const logClient = new Logger("@firebase/auth");
function _logError(msg, ...args) {
  if (logClient.logLevel <= LogLevel.ERROR) {
    logClient.error(`Auth (${SDK_VERSION}): ${msg}`, ...args);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _fail(authOrCode, ...rest) {
  throw createErrorInternal(authOrCode, ...rest);
}
function _createError(authOrCode, ...rest) {
  return createErrorInternal(authOrCode, ...rest);
}
function _errorWithCustomMessage(auth2, code, message) {
  const errorMap = Object.assign(Object.assign({}, prodErrorMap()), { [code]: message });
  const factory = new ErrorFactory("auth", "Firebase", errorMap);
  return factory.create(code, {
    appName: auth2.name
  });
}
function _assertInstanceOf(auth2, object, instance) {
  const constructorInstance = instance;
  if (!(object instanceof constructorInstance)) {
    if (constructorInstance.name !== object.constructor.name) {
      _fail(auth2, "argument-error");
    }
    throw _errorWithCustomMessage(auth2, "argument-error", `Type of ${object.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`);
  }
}
function createErrorInternal(authOrCode, ...rest) {
  if (typeof authOrCode !== "string") {
    const code = rest[0];
    const fullParams = [...rest.slice(1)];
    if (fullParams[0]) {
      fullParams[0].appName = authOrCode.name;
    }
    return authOrCode._errorFactory.create(code, ...fullParams);
  }
  return _DEFAULT_AUTH_ERROR_FACTORY.create(authOrCode, ...rest);
}
function _assert(assertion, authOrCode, ...rest) {
  if (!assertion) {
    throw createErrorInternal(authOrCode, ...rest);
  }
}
function debugFail(failure) {
  const message = `INTERNAL ASSERTION FAILED: ` + failure;
  _logError(message);
  throw new Error(message);
}
function debugAssert(assertion, message) {
  if (!assertion) {
    debugFail(message);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const instanceCache = /* @__PURE__ */ new Map();
function _getInstance(cls) {
  debugAssert(cls instanceof Function, "Expected a class definition");
  let instance = instanceCache.get(cls);
  if (instance) {
    debugAssert(instance instanceof cls, "Instance stored in cache mismatched with class");
    return instance;
  }
  instance = new cls();
  instanceCache.set(cls, instance);
  return instance;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function initializeAuth(app2, deps) {
  const provider2 = _getProvider(app2, "auth");
  if (provider2.isInitialized()) {
    const auth3 = provider2.getImmediate();
    const initialOptions = provider2.getOptions();
    if (deepEqual(initialOptions, deps !== null && deps !== void 0 ? deps : {})) {
      return auth3;
    } else {
      _fail(auth3, "already-initialized");
    }
  }
  const auth2 = provider2.initialize({ options: deps });
  return auth2;
}
function _initializeAuthInstance(auth2, deps) {
  const persistence = (deps === null || deps === void 0 ? void 0 : deps.persistence) || [];
  const hierarchy = (Array.isArray(persistence) ? persistence : [persistence]).map(_getInstance);
  if (deps === null || deps === void 0 ? void 0 : deps.errorMap) {
    auth2._updateErrorMap(deps.errorMap);
  }
  auth2._initializeWithPersistence(hierarchy, deps === null || deps === void 0 ? void 0 : deps.popupRedirectResolver);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _getCurrentUrl() {
  var _a2;
  return typeof self !== "undefined" && ((_a2 = self.location) === null || _a2 === void 0 ? void 0 : _a2.href) || "";
}
function _isHttpOrHttps() {
  return _getCurrentScheme() === "http:" || _getCurrentScheme() === "https:";
}
function _getCurrentScheme() {
  var _a2;
  return typeof self !== "undefined" && ((_a2 = self.location) === null || _a2 === void 0 ? void 0 : _a2.protocol) || null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _isOnline() {
  if (typeof navigator !== "undefined" && navigator && "onLine" in navigator && typeof navigator.onLine === "boolean" && (_isHttpOrHttps() || isBrowserExtension() || "connection" in navigator)) {
    return navigator.onLine;
  }
  return true;
}
function _getUserLanguage() {
  if (typeof navigator === "undefined") {
    return null;
  }
  const navigatorLanguage = navigator;
  return navigatorLanguage.languages && navigatorLanguage.languages[0] || navigatorLanguage.language || null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Delay {
  constructor(shortDelay, longDelay) {
    this.shortDelay = shortDelay;
    this.longDelay = longDelay;
    debugAssert(longDelay > shortDelay, "Short delay should be less than long delay!");
    this.isMobile = isMobileCordova() || isReactNative();
  }
  get() {
    if (!_isOnline()) {
      return Math.min(5e3, this.shortDelay);
    }
    return this.isMobile ? this.longDelay : this.shortDelay;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _emulatorUrl(config, path) {
  debugAssert(config.emulator, "Emulator should always be set here");
  const { url } = config.emulator;
  if (!path) {
    return url;
  }
  return `${url}${path.startsWith("/") ? path.slice(1) : path}`;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class FetchProvider {
  static initialize(fetchImpl, headersImpl, responseImpl) {
    this.fetchImpl = fetchImpl;
    if (headersImpl) {
      this.headersImpl = headersImpl;
    }
    if (responseImpl) {
      this.responseImpl = responseImpl;
    }
  }
  static fetch() {
    if (this.fetchImpl) {
      return this.fetchImpl;
    }
    if (typeof self !== "undefined" && "fetch" in self) {
      return self.fetch;
    }
    debugFail("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
  }
  static headers() {
    if (this.headersImpl) {
      return this.headersImpl;
    }
    if (typeof self !== "undefined" && "Headers" in self) {
      return self.Headers;
    }
    debugFail("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
  }
  static response() {
    if (this.responseImpl) {
      return this.responseImpl;
    }
    if (typeof self !== "undefined" && "Response" in self) {
      return self.Response;
    }
    debugFail("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill");
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const SERVER_ERROR_MAP = {
  ["CREDENTIAL_MISMATCH"]: "custom-token-mismatch",
  ["MISSING_CUSTOM_TOKEN"]: "internal-error",
  ["INVALID_IDENTIFIER"]: "invalid-email",
  ["MISSING_CONTINUE_URI"]: "internal-error",
  ["INVALID_PASSWORD"]: "wrong-password",
  ["MISSING_PASSWORD"]: "internal-error",
  ["EMAIL_EXISTS"]: "email-already-in-use",
  ["PASSWORD_LOGIN_DISABLED"]: "operation-not-allowed",
  ["INVALID_IDP_RESPONSE"]: "invalid-credential",
  ["INVALID_PENDING_TOKEN"]: "invalid-credential",
  ["FEDERATED_USER_ID_ALREADY_LINKED"]: "credential-already-in-use",
  ["MISSING_REQ_TYPE"]: "internal-error",
  ["EMAIL_NOT_FOUND"]: "user-not-found",
  ["RESET_PASSWORD_EXCEED_LIMIT"]: "too-many-requests",
  ["EXPIRED_OOB_CODE"]: "expired-action-code",
  ["INVALID_OOB_CODE"]: "invalid-action-code",
  ["MISSING_OOB_CODE"]: "internal-error",
  ["CREDENTIAL_TOO_OLD_LOGIN_AGAIN"]: "requires-recent-login",
  ["INVALID_ID_TOKEN"]: "invalid-user-token",
  ["TOKEN_EXPIRED"]: "user-token-expired",
  ["USER_NOT_FOUND"]: "user-token-expired",
  ["TOO_MANY_ATTEMPTS_TRY_LATER"]: "too-many-requests",
  ["INVALID_CODE"]: "invalid-verification-code",
  ["INVALID_SESSION_INFO"]: "invalid-verification-id",
  ["INVALID_TEMPORARY_PROOF"]: "invalid-credential",
  ["MISSING_SESSION_INFO"]: "missing-verification-id",
  ["SESSION_EXPIRED"]: "code-expired",
  ["MISSING_ANDROID_PACKAGE_NAME"]: "missing-android-pkg-name",
  ["UNAUTHORIZED_DOMAIN"]: "unauthorized-continue-uri",
  ["INVALID_OAUTH_CLIENT_ID"]: "invalid-oauth-client-id",
  ["ADMIN_ONLY_OPERATION"]: "admin-restricted-operation",
  ["INVALID_MFA_PENDING_CREDENTIAL"]: "invalid-multi-factor-session",
  ["MFA_ENROLLMENT_NOT_FOUND"]: "multi-factor-info-not-found",
  ["MISSING_MFA_ENROLLMENT_ID"]: "missing-multi-factor-info",
  ["MISSING_MFA_PENDING_CREDENTIAL"]: "missing-multi-factor-session",
  ["SECOND_FACTOR_EXISTS"]: "second-factor-already-in-use",
  ["SECOND_FACTOR_LIMIT_EXCEEDED"]: "maximum-second-factor-count-exceeded",
  ["BLOCKING_FUNCTION_ERROR_RESPONSE"]: "internal-error"
};
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_API_TIMEOUT_MS = new Delay(3e4, 6e4);
function _addTidIfNecessary(auth2, request) {
  if (auth2.tenantId && !request.tenantId) {
    return Object.assign(Object.assign({}, request), { tenantId: auth2.tenantId });
  }
  return request;
}
async function _performApiRequest(auth2, method, path, request, customErrorMap = {}) {
  return _performFetchWithErrorHandling(auth2, customErrorMap, async () => {
    let body = {};
    let params = {};
    if (request) {
      if (method === "GET") {
        params = request;
      } else {
        body = {
          body: JSON.stringify(request)
        };
      }
    }
    const query = querystring(Object.assign({ key: auth2.config.apiKey }, params)).slice(1);
    const headers = await auth2._getAdditionalHeaders();
    headers["Content-Type"] = "application/json";
    if (auth2.languageCode) {
      headers["X-Firebase-Locale"] = auth2.languageCode;
    }
    return FetchProvider.fetch()(_getFinalTarget(auth2, auth2.config.apiHost, path, query), Object.assign({
      method,
      headers,
      referrerPolicy: "no-referrer"
    }, body));
  });
}
async function _performFetchWithErrorHandling(auth2, customErrorMap, fetchFn) {
  auth2._canInitEmulator = false;
  const errorMap = Object.assign(Object.assign({}, SERVER_ERROR_MAP), customErrorMap);
  try {
    const networkTimeout = new NetworkTimeout(auth2);
    const response = await Promise.race([
      fetchFn(),
      networkTimeout.promise
    ]);
    networkTimeout.clearNetworkTimeout();
    const json = await response.json();
    if ("needConfirmation" in json) {
      throw _makeTaggedError(auth2, "account-exists-with-different-credential", json);
    }
    if (response.ok && !("errorMessage" in json)) {
      return json;
    } else {
      const errorMessage = response.ok ? json.errorMessage : json.error.message;
      const [serverErrorCode, serverErrorMessage] = errorMessage.split(" : ");
      if (serverErrorCode === "FEDERATED_USER_ID_ALREADY_LINKED") {
        throw _makeTaggedError(auth2, "credential-already-in-use", json);
      } else if (serverErrorCode === "EMAIL_EXISTS") {
        throw _makeTaggedError(auth2, "email-already-in-use", json);
      } else if (serverErrorCode === "USER_DISABLED") {
        throw _makeTaggedError(auth2, "user-disabled", json);
      }
      const authError = errorMap[serverErrorCode] || serverErrorCode.toLowerCase().replace(/[_\s]+/g, "-");
      if (serverErrorMessage) {
        throw _errorWithCustomMessage(auth2, authError, serverErrorMessage);
      } else {
        _fail(auth2, authError);
      }
    }
  } catch (e) {
    if (e instanceof FirebaseError) {
      throw e;
    }
    _fail(auth2, "network-request-failed");
  }
}
async function _performSignInRequest(auth2, method, path, request, customErrorMap = {}) {
  const serverResponse = await _performApiRequest(auth2, method, path, request, customErrorMap);
  if ("mfaPendingCredential" in serverResponse) {
    _fail(auth2, "multi-factor-auth-required", {
      _serverResponse: serverResponse
    });
  }
  return serverResponse;
}
function _getFinalTarget(auth2, host, path, query) {
  const base = `${host}${path}?${query}`;
  if (!auth2.config.emulator) {
    return `${auth2.config.apiScheme}://${base}`;
  }
  return _emulatorUrl(auth2.config, base);
}
class NetworkTimeout {
  constructor(auth2) {
    this.auth = auth2;
    this.timer = null;
    this.promise = new Promise((_, reject) => {
      this.timer = setTimeout(() => {
        return reject(_createError(this.auth, "network-request-failed"));
      }, DEFAULT_API_TIMEOUT_MS.get());
    });
  }
  clearNetworkTimeout() {
    clearTimeout(this.timer);
  }
}
function _makeTaggedError(auth2, code, response) {
  const errorParams = {
    appName: auth2.name
  };
  if (response.email) {
    errorParams.email = response.email;
  }
  if (response.phoneNumber) {
    errorParams.phoneNumber = response.phoneNumber;
  }
  const error = _createError(auth2, code, errorParams);
  error.customData._tokenResponse = response;
  return error;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function deleteAccount(auth2, request) {
  return _performApiRequest(auth2, "POST", "/v1/accounts:delete", request);
}
async function getAccountInfo(auth2, request) {
  return _performApiRequest(auth2, "POST", "/v1/accounts:lookup", request);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function utcTimestampToDateString(utcTimestamp) {
  if (!utcTimestamp) {
    return void 0;
  }
  try {
    const date = new Date(Number(utcTimestamp));
    if (!isNaN(date.getTime())) {
      return date.toUTCString();
    }
  } catch (e) {
  }
  return void 0;
}
async function getIdTokenResult(user, forceRefresh = false) {
  const userInternal = getModularInstance(user);
  const token = await userInternal.getIdToken(forceRefresh);
  const claims = _parseToken(token);
  _assert(claims && claims.exp && claims.auth_time && claims.iat, userInternal.auth, "internal-error");
  const firebase = typeof claims.firebase === "object" ? claims.firebase : void 0;
  const signInProvider = firebase === null || firebase === void 0 ? void 0 : firebase["sign_in_provider"];
  return {
    claims,
    token,
    authTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.auth_time)),
    issuedAtTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.iat)),
    expirationTime: utcTimestampToDateString(secondsStringToMilliseconds(claims.exp)),
    signInProvider: signInProvider || null,
    signInSecondFactor: (firebase === null || firebase === void 0 ? void 0 : firebase["sign_in_second_factor"]) || null
  };
}
function secondsStringToMilliseconds(seconds) {
  return Number(seconds) * 1e3;
}
function _parseToken(token) {
  const [algorithm, payload, signature] = token.split(".");
  if (algorithm === void 0 || payload === void 0 || signature === void 0) {
    _logError("JWT malformed, contained fewer than 3 sections");
    return null;
  }
  try {
    const decoded = base64Decode(payload);
    if (!decoded) {
      _logError("Failed to decode base64 JWT payload");
      return null;
    }
    return JSON.parse(decoded);
  } catch (e) {
    _logError("Caught error parsing JWT payload as JSON", e === null || e === void 0 ? void 0 : e.toString());
    return null;
  }
}
function _tokenExpiresIn(token) {
  const parsedToken = _parseToken(token);
  _assert(parsedToken, "internal-error");
  _assert(typeof parsedToken.exp !== "undefined", "internal-error");
  _assert(typeof parsedToken.iat !== "undefined", "internal-error");
  return Number(parsedToken.exp) - Number(parsedToken.iat);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function _logoutIfInvalidated(user, promise, bypassAuthState = false) {
  if (bypassAuthState) {
    return promise;
  }
  try {
    return await promise;
  } catch (e) {
    if (e instanceof FirebaseError && isUserInvalidated(e)) {
      if (user.auth.currentUser === user) {
        await user.auth.signOut();
      }
    }
    throw e;
  }
}
function isUserInvalidated({ code }) {
  return code === `auth/${"user-disabled"}` || code === `auth/${"user-token-expired"}`;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ProactiveRefresh {
  constructor(user) {
    this.user = user;
    this.isRunning = false;
    this.timerId = null;
    this.errorBackoff = 3e4;
  }
  _start() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    this.schedule();
  }
  _stop() {
    if (!this.isRunning) {
      return;
    }
    this.isRunning = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
    }
  }
  getInterval(wasError) {
    var _a2;
    if (wasError) {
      const interval = this.errorBackoff;
      this.errorBackoff = Math.min(this.errorBackoff * 2, 96e4);
      return interval;
    } else {
      this.errorBackoff = 3e4;
      const expTime = (_a2 = this.user.stsTokenManager.expirationTime) !== null && _a2 !== void 0 ? _a2 : 0;
      const interval = expTime - Date.now() - 3e5;
      return Math.max(0, interval);
    }
  }
  schedule(wasError = false) {
    if (!this.isRunning) {
      return;
    }
    const interval = this.getInterval(wasError);
    this.timerId = setTimeout(async () => {
      await this.iteration();
    }, interval);
  }
  async iteration() {
    try {
      await this.user.getIdToken(true);
    } catch (e) {
      if ((e === null || e === void 0 ? void 0 : e.code) === `auth/${"network-request-failed"}`) {
        this.schedule(true);
      }
      return;
    }
    this.schedule();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class UserMetadata {
  constructor(createdAt, lastLoginAt) {
    this.createdAt = createdAt;
    this.lastLoginAt = lastLoginAt;
    this._initializeTime();
  }
  _initializeTime() {
    this.lastSignInTime = utcTimestampToDateString(this.lastLoginAt);
    this.creationTime = utcTimestampToDateString(this.createdAt);
  }
  _copy(metadata) {
    this.createdAt = metadata.createdAt;
    this.lastLoginAt = metadata.lastLoginAt;
    this._initializeTime();
  }
  toJSON() {
    return {
      createdAt: this.createdAt,
      lastLoginAt: this.lastLoginAt
    };
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function _reloadWithoutSaving(user) {
  var _a2;
  const auth2 = user.auth;
  const idToken = await user.getIdToken();
  const response = await _logoutIfInvalidated(user, getAccountInfo(auth2, { idToken }));
  _assert(response === null || response === void 0 ? void 0 : response.users.length, auth2, "internal-error");
  const coreAccount = response.users[0];
  user._notifyReloadListener(coreAccount);
  const newProviderData = ((_a2 = coreAccount.providerUserInfo) === null || _a2 === void 0 ? void 0 : _a2.length) ? extractProviderData(coreAccount.providerUserInfo) : [];
  const providerData = mergeProviderData(user.providerData, newProviderData);
  const oldIsAnonymous = user.isAnonymous;
  const newIsAnonymous = !(user.email && coreAccount.passwordHash) && !(providerData === null || providerData === void 0 ? void 0 : providerData.length);
  const isAnonymous = !oldIsAnonymous ? false : newIsAnonymous;
  const updates = {
    uid: coreAccount.localId,
    displayName: coreAccount.displayName || null,
    photoURL: coreAccount.photoUrl || null,
    email: coreAccount.email || null,
    emailVerified: coreAccount.emailVerified || false,
    phoneNumber: coreAccount.phoneNumber || null,
    tenantId: coreAccount.tenantId || null,
    providerData,
    metadata: new UserMetadata(coreAccount.createdAt, coreAccount.lastLoginAt),
    isAnonymous
  };
  Object.assign(user, updates);
}
async function reload(user) {
  const userInternal = getModularInstance(user);
  await _reloadWithoutSaving(userInternal);
  await userInternal.auth._persistUserIfCurrent(userInternal);
  userInternal.auth._notifyListenersIfCurrent(userInternal);
}
function mergeProviderData(original, newData) {
  const deduped = original.filter((o) => !newData.some((n) => n.providerId === o.providerId));
  return [...deduped, ...newData];
}
function extractProviderData(providers) {
  return providers.map((_a2) => {
    var { providerId } = _a2, provider2 = __rest(_a2, ["providerId"]);
    return {
      providerId,
      uid: provider2.rawId || "",
      displayName: provider2.displayName || null,
      email: provider2.email || null,
      phoneNumber: provider2.phoneNumber || null,
      photoURL: provider2.photoUrl || null
    };
  });
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function requestStsToken(auth2, refreshToken) {
  const response = await _performFetchWithErrorHandling(auth2, {}, async () => {
    const body = querystring({
      "grant_type": "refresh_token",
      "refresh_token": refreshToken
    }).slice(1);
    const { tokenApiHost, apiKey } = auth2.config;
    const url = _getFinalTarget(auth2, tokenApiHost, "/v1/token", `key=${apiKey}`);
    const headers = await auth2._getAdditionalHeaders();
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    return FetchProvider.fetch()(url, {
      method: "POST",
      headers,
      body
    });
  });
  return {
    accessToken: response.access_token,
    expiresIn: response.expires_in,
    refreshToken: response.refresh_token
  };
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class StsTokenManager {
  constructor() {
    this.refreshToken = null;
    this.accessToken = null;
    this.expirationTime = null;
  }
  get isExpired() {
    return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
  }
  updateFromServerResponse(response) {
    _assert(response.idToken, "internal-error");
    _assert(typeof response.idToken !== "undefined", "internal-error");
    _assert(typeof response.refreshToken !== "undefined", "internal-error");
    const expiresIn = "expiresIn" in response && typeof response.expiresIn !== "undefined" ? Number(response.expiresIn) : _tokenExpiresIn(response.idToken);
    this.updateTokensAndExpiration(response.idToken, response.refreshToken, expiresIn);
  }
  async getToken(auth2, forceRefresh = false) {
    _assert(!this.accessToken || this.refreshToken, auth2, "user-token-expired");
    if (!forceRefresh && this.accessToken && !this.isExpired) {
      return this.accessToken;
    }
    if (this.refreshToken) {
      await this.refresh(auth2, this.refreshToken);
      return this.accessToken;
    }
    return null;
  }
  clearRefreshToken() {
    this.refreshToken = null;
  }
  async refresh(auth2, oldToken) {
    const { accessToken, refreshToken, expiresIn } = await requestStsToken(auth2, oldToken);
    this.updateTokensAndExpiration(accessToken, refreshToken, Number(expiresIn));
  }
  updateTokensAndExpiration(accessToken, refreshToken, expiresInSec) {
    this.refreshToken = refreshToken || null;
    this.accessToken = accessToken || null;
    this.expirationTime = Date.now() + expiresInSec * 1e3;
  }
  static fromJSON(appName, object) {
    const { refreshToken, accessToken, expirationTime } = object;
    const manager = new StsTokenManager();
    if (refreshToken) {
      _assert(typeof refreshToken === "string", "internal-error", {
        appName
      });
      manager.refreshToken = refreshToken;
    }
    if (accessToken) {
      _assert(typeof accessToken === "string", "internal-error", {
        appName
      });
      manager.accessToken = accessToken;
    }
    if (expirationTime) {
      _assert(typeof expirationTime === "number", "internal-error", {
        appName
      });
      manager.expirationTime = expirationTime;
    }
    return manager;
  }
  toJSON() {
    return {
      refreshToken: this.refreshToken,
      accessToken: this.accessToken,
      expirationTime: this.expirationTime
    };
  }
  _assign(stsTokenManager) {
    this.accessToken = stsTokenManager.accessToken;
    this.refreshToken = stsTokenManager.refreshToken;
    this.expirationTime = stsTokenManager.expirationTime;
  }
  _clone() {
    return Object.assign(new StsTokenManager(), this.toJSON());
  }
  _performRefresh() {
    return debugFail("not implemented");
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function assertStringOrUndefined(assertion, appName) {
  _assert(typeof assertion === "string" || typeof assertion === "undefined", "internal-error", { appName });
}
class UserImpl {
  constructor(_a2) {
    var { uid, auth: auth2, stsTokenManager } = _a2, opt = __rest(_a2, ["uid", "auth", "stsTokenManager"]);
    this.providerId = "firebase";
    this.proactiveRefresh = new ProactiveRefresh(this);
    this.reloadUserInfo = null;
    this.reloadListener = null;
    this.uid = uid;
    this.auth = auth2;
    this.stsTokenManager = stsTokenManager;
    this.accessToken = stsTokenManager.accessToken;
    this.displayName = opt.displayName || null;
    this.email = opt.email || null;
    this.emailVerified = opt.emailVerified || false;
    this.phoneNumber = opt.phoneNumber || null;
    this.photoURL = opt.photoURL || null;
    this.isAnonymous = opt.isAnonymous || false;
    this.tenantId = opt.tenantId || null;
    this.providerData = opt.providerData ? [...opt.providerData] : [];
    this.metadata = new UserMetadata(opt.createdAt || void 0, opt.lastLoginAt || void 0);
  }
  async getIdToken(forceRefresh) {
    const accessToken = await _logoutIfInvalidated(this, this.stsTokenManager.getToken(this.auth, forceRefresh));
    _assert(accessToken, this.auth, "internal-error");
    if (this.accessToken !== accessToken) {
      this.accessToken = accessToken;
      await this.auth._persistUserIfCurrent(this);
      this.auth._notifyListenersIfCurrent(this);
    }
    return accessToken;
  }
  getIdTokenResult(forceRefresh) {
    return getIdTokenResult(this, forceRefresh);
  }
  reload() {
    return reload(this);
  }
  _assign(user) {
    if (this === user) {
      return;
    }
    _assert(this.uid === user.uid, this.auth, "internal-error");
    this.displayName = user.displayName;
    this.photoURL = user.photoURL;
    this.email = user.email;
    this.emailVerified = user.emailVerified;
    this.phoneNumber = user.phoneNumber;
    this.isAnonymous = user.isAnonymous;
    this.tenantId = user.tenantId;
    this.providerData = user.providerData.map((userInfo) => Object.assign({}, userInfo));
    this.metadata._copy(user.metadata);
    this.stsTokenManager._assign(user.stsTokenManager);
  }
  _clone(auth2) {
    return new UserImpl(Object.assign(Object.assign({}, this), { auth: auth2, stsTokenManager: this.stsTokenManager._clone() }));
  }
  _onReload(callback) {
    _assert(!this.reloadListener, this.auth, "internal-error");
    this.reloadListener = callback;
    if (this.reloadUserInfo) {
      this._notifyReloadListener(this.reloadUserInfo);
      this.reloadUserInfo = null;
    }
  }
  _notifyReloadListener(userInfo) {
    if (this.reloadListener) {
      this.reloadListener(userInfo);
    } else {
      this.reloadUserInfo = userInfo;
    }
  }
  _startProactiveRefresh() {
    this.proactiveRefresh._start();
  }
  _stopProactiveRefresh() {
    this.proactiveRefresh._stop();
  }
  async _updateTokensIfNecessary(response, reload2 = false) {
    let tokensRefreshed = false;
    if (response.idToken && response.idToken !== this.stsTokenManager.accessToken) {
      this.stsTokenManager.updateFromServerResponse(response);
      tokensRefreshed = true;
    }
    if (reload2) {
      await _reloadWithoutSaving(this);
    }
    await this.auth._persistUserIfCurrent(this);
    if (tokensRefreshed) {
      this.auth._notifyListenersIfCurrent(this);
    }
  }
  async delete() {
    const idToken = await this.getIdToken();
    await _logoutIfInvalidated(this, deleteAccount(this.auth, { idToken }));
    this.stsTokenManager.clearRefreshToken();
    return this.auth.signOut();
  }
  toJSON() {
    return Object.assign(Object.assign({
      uid: this.uid,
      email: this.email || void 0,
      emailVerified: this.emailVerified,
      displayName: this.displayName || void 0,
      isAnonymous: this.isAnonymous,
      photoURL: this.photoURL || void 0,
      phoneNumber: this.phoneNumber || void 0,
      tenantId: this.tenantId || void 0,
      providerData: this.providerData.map((userInfo) => Object.assign({}, userInfo)),
      stsTokenManager: this.stsTokenManager.toJSON(),
      _redirectEventId: this._redirectEventId
    }, this.metadata.toJSON()), {
      apiKey: this.auth.config.apiKey,
      appName: this.auth.name
    });
  }
  get refreshToken() {
    return this.stsTokenManager.refreshToken || "";
  }
  static _fromJSON(auth2, object) {
    var _a2, _b, _c2, _d, _e2, _f, _g, _h;
    const displayName = (_a2 = object.displayName) !== null && _a2 !== void 0 ? _a2 : void 0;
    const email = (_b = object.email) !== null && _b !== void 0 ? _b : void 0;
    const phoneNumber = (_c2 = object.phoneNumber) !== null && _c2 !== void 0 ? _c2 : void 0;
    const photoURL = (_d = object.photoURL) !== null && _d !== void 0 ? _d : void 0;
    const tenantId = (_e2 = object.tenantId) !== null && _e2 !== void 0 ? _e2 : void 0;
    const _redirectEventId = (_f = object._redirectEventId) !== null && _f !== void 0 ? _f : void 0;
    const createdAt = (_g = object.createdAt) !== null && _g !== void 0 ? _g : void 0;
    const lastLoginAt = (_h = object.lastLoginAt) !== null && _h !== void 0 ? _h : void 0;
    const { uid, emailVerified, isAnonymous, providerData, stsTokenManager: plainObjectTokenManager } = object;
    _assert(uid && plainObjectTokenManager, auth2, "internal-error");
    const stsTokenManager = StsTokenManager.fromJSON(this.name, plainObjectTokenManager);
    _assert(typeof uid === "string", auth2, "internal-error");
    assertStringOrUndefined(displayName, auth2.name);
    assertStringOrUndefined(email, auth2.name);
    _assert(typeof emailVerified === "boolean", auth2, "internal-error");
    _assert(typeof isAnonymous === "boolean", auth2, "internal-error");
    assertStringOrUndefined(phoneNumber, auth2.name);
    assertStringOrUndefined(photoURL, auth2.name);
    assertStringOrUndefined(tenantId, auth2.name);
    assertStringOrUndefined(_redirectEventId, auth2.name);
    assertStringOrUndefined(createdAt, auth2.name);
    assertStringOrUndefined(lastLoginAt, auth2.name);
    const user = new UserImpl({
      uid,
      auth: auth2,
      email,
      emailVerified,
      displayName,
      isAnonymous,
      photoURL,
      phoneNumber,
      tenantId,
      stsTokenManager,
      createdAt,
      lastLoginAt
    });
    if (providerData && Array.isArray(providerData)) {
      user.providerData = providerData.map((userInfo) => Object.assign({}, userInfo));
    }
    if (_redirectEventId) {
      user._redirectEventId = _redirectEventId;
    }
    return user;
  }
  static async _fromIdTokenResponse(auth2, idTokenResponse, isAnonymous = false) {
    const stsTokenManager = new StsTokenManager();
    stsTokenManager.updateFromServerResponse(idTokenResponse);
    const user = new UserImpl({
      uid: idTokenResponse.localId,
      auth: auth2,
      stsTokenManager,
      isAnonymous
    });
    await _reloadWithoutSaving(user);
    return user;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class InMemoryPersistence {
  constructor() {
    this.type = "NONE";
    this.storage = {};
  }
  async _isAvailable() {
    return true;
  }
  async _set(key, value) {
    this.storage[key] = value;
  }
  async _get(key) {
    const value = this.storage[key];
    return value === void 0 ? null : value;
  }
  async _remove(key) {
    delete this.storage[key];
  }
  _addListener(_key, _listener) {
    return;
  }
  _removeListener(_key, _listener) {
    return;
  }
}
InMemoryPersistence.type = "NONE";
const inMemoryPersistence = InMemoryPersistence;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _persistenceKeyName(key, apiKey, appName) {
  return `${"firebase"}:${key}:${apiKey}:${appName}`;
}
class PersistenceUserManager {
  constructor(persistence, auth2, userKey) {
    this.persistence = persistence;
    this.auth = auth2;
    this.userKey = userKey;
    const { config, name: name2 } = this.auth;
    this.fullUserKey = _persistenceKeyName(this.userKey, config.apiKey, name2);
    this.fullPersistenceKey = _persistenceKeyName("persistence", config.apiKey, name2);
    this.boundEventHandler = auth2._onStorageEvent.bind(auth2);
    this.persistence._addListener(this.fullUserKey, this.boundEventHandler);
  }
  setCurrentUser(user) {
    return this.persistence._set(this.fullUserKey, user.toJSON());
  }
  async getCurrentUser() {
    const blob = await this.persistence._get(this.fullUserKey);
    return blob ? UserImpl._fromJSON(this.auth, blob) : null;
  }
  removeCurrentUser() {
    return this.persistence._remove(this.fullUserKey);
  }
  savePersistenceForRedirect() {
    return this.persistence._set(this.fullPersistenceKey, this.persistence.type);
  }
  async setPersistence(newPersistence) {
    if (this.persistence === newPersistence) {
      return;
    }
    const currentUser = await this.getCurrentUser();
    await this.removeCurrentUser();
    this.persistence = newPersistence;
    if (currentUser) {
      return this.setCurrentUser(currentUser);
    }
  }
  delete() {
    this.persistence._removeListener(this.fullUserKey, this.boundEventHandler);
  }
  static async create(auth2, persistenceHierarchy, userKey = "authUser") {
    if (!persistenceHierarchy.length) {
      return new PersistenceUserManager(_getInstance(inMemoryPersistence), auth2, userKey);
    }
    const availablePersistences = (await Promise.all(persistenceHierarchy.map(async (persistence) => {
      if (await persistence._isAvailable()) {
        return persistence;
      }
      return void 0;
    }))).filter((persistence) => persistence);
    let selectedPersistence = availablePersistences[0] || _getInstance(inMemoryPersistence);
    const key = _persistenceKeyName(userKey, auth2.config.apiKey, auth2.name);
    let userToMigrate = null;
    for (const persistence of persistenceHierarchy) {
      try {
        const blob = await persistence._get(key);
        if (blob) {
          const user = UserImpl._fromJSON(auth2, blob);
          if (persistence !== selectedPersistence) {
            userToMigrate = user;
          }
          selectedPersistence = persistence;
          break;
        }
      } catch (_a2) {
      }
    }
    const migrationHierarchy = availablePersistences.filter((p2) => p2._shouldAllowMigration);
    if (!selectedPersistence._shouldAllowMigration || !migrationHierarchy.length) {
      return new PersistenceUserManager(selectedPersistence, auth2, userKey);
    }
    selectedPersistence = migrationHierarchy[0];
    if (userToMigrate) {
      await selectedPersistence._set(key, userToMigrate.toJSON());
    }
    await Promise.all(persistenceHierarchy.map(async (persistence) => {
      if (persistence !== selectedPersistence) {
        try {
          await persistence._remove(key);
        } catch (_a2) {
        }
      }
    }));
    return new PersistenceUserManager(selectedPersistence, auth2, userKey);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _getBrowserName(userAgent) {
  const ua2 = userAgent.toLowerCase();
  if (ua2.includes("opera/") || ua2.includes("opr/") || ua2.includes("opios/")) {
    return "Opera";
  } else if (_isIEMobile(ua2)) {
    return "IEMobile";
  } else if (ua2.includes("msie") || ua2.includes("trident/")) {
    return "IE";
  } else if (ua2.includes("edge/")) {
    return "Edge";
  } else if (_isFirefox(ua2)) {
    return "Firefox";
  } else if (ua2.includes("silk/")) {
    return "Silk";
  } else if (_isBlackBerry(ua2)) {
    return "Blackberry";
  } else if (_isWebOS(ua2)) {
    return "Webos";
  } else if (_isSafari(ua2)) {
    return "Safari";
  } else if ((ua2.includes("chrome/") || _isChromeIOS(ua2)) && !ua2.includes("edge/")) {
    return "Chrome";
  } else if (_isAndroid(ua2)) {
    return "Android";
  } else {
    const re2 = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/;
    const matches = userAgent.match(re2);
    if ((matches === null || matches === void 0 ? void 0 : matches.length) === 2) {
      return matches[1];
    }
  }
  return "Other";
}
function _isFirefox(ua2 = getUA()) {
  return /firefox\//i.test(ua2);
}
function _isSafari(userAgent = getUA()) {
  const ua2 = userAgent.toLowerCase();
  return ua2.includes("safari/") && !ua2.includes("chrome/") && !ua2.includes("crios/") && !ua2.includes("android");
}
function _isChromeIOS(ua2 = getUA()) {
  return /crios\//i.test(ua2);
}
function _isIEMobile(ua2 = getUA()) {
  return /iemobile/i.test(ua2);
}
function _isAndroid(ua2 = getUA()) {
  return /android/i.test(ua2);
}
function _isBlackBerry(ua2 = getUA()) {
  return /blackberry/i.test(ua2);
}
function _isWebOS(ua2 = getUA()) {
  return /webos/i.test(ua2);
}
function _isIOS(ua2 = getUA()) {
  return /iphone|ipad|ipod/i.test(ua2) || /macintosh/i.test(ua2) && /mobile/i.test(ua2);
}
function _isIOSStandalone(ua2 = getUA()) {
  var _a2;
  return _isIOS(ua2) && !!((_a2 = window.navigator) === null || _a2 === void 0 ? void 0 : _a2.standalone);
}
function _isIE10() {
  return isIE() && document.documentMode === 10;
}
function _isMobileBrowser(ua2 = getUA()) {
  return _isIOS(ua2) || _isAndroid(ua2) || _isWebOS(ua2) || _isBlackBerry(ua2) || /windows phone/i.test(ua2) || _isIEMobile(ua2);
}
function _isIframe() {
  try {
    return !!(window && window !== window.top);
  } catch (e) {
    return false;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _getClientVersion(clientPlatform, frameworks = []) {
  let reportedPlatform;
  switch (clientPlatform) {
    case "Browser":
      reportedPlatform = _getBrowserName(getUA());
      break;
    case "Worker":
      reportedPlatform = `${_getBrowserName(getUA())}-${clientPlatform}`;
      break;
    default:
      reportedPlatform = clientPlatform;
  }
  const reportedFrameworks = frameworks.length ? frameworks.join(",") : "FirebaseCore-web";
  return `${reportedPlatform}/${"JsCore"}/${SDK_VERSION}/${reportedFrameworks}`;
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class AuthMiddlewareQueue {
  constructor(auth2) {
    this.auth = auth2;
    this.queue = [];
  }
  pushCallback(callback, onAbort) {
    const wrappedCallback = (user) => new Promise((resolve, reject) => {
      try {
        const result = callback(user);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
    wrappedCallback.onAbort = onAbort;
    this.queue.push(wrappedCallback);
    const index = this.queue.length - 1;
    return () => {
      this.queue[index] = () => Promise.resolve();
    };
  }
  async runMiddleware(nextUser) {
    if (this.auth.currentUser === nextUser) {
      return;
    }
    const onAbortStack = [];
    try {
      for (const beforeStateCallback of this.queue) {
        await beforeStateCallback(nextUser);
        if (beforeStateCallback.onAbort) {
          onAbortStack.push(beforeStateCallback.onAbort);
        }
      }
    } catch (e) {
      onAbortStack.reverse();
      for (const onAbort of onAbortStack) {
        try {
          onAbort();
        } catch (_) {
        }
      }
      throw this.auth._errorFactory.create("login-blocked", {
        originalMessage: e === null || e === void 0 ? void 0 : e.message
      });
    }
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class AuthImpl {
  constructor(app2, heartbeatServiceProvider, config) {
    this.app = app2;
    this.heartbeatServiceProvider = heartbeatServiceProvider;
    this.config = config;
    this.currentUser = null;
    this.emulatorConfig = null;
    this.operations = Promise.resolve();
    this.authStateSubscription = new Subscription(this);
    this.idTokenSubscription = new Subscription(this);
    this.beforeStateQueue = new AuthMiddlewareQueue(this);
    this.redirectUser = null;
    this.isProactiveRefreshEnabled = false;
    this._canInitEmulator = true;
    this._isInitialized = false;
    this._deleted = false;
    this._initializationPromise = null;
    this._popupRedirectResolver = null;
    this._errorFactory = _DEFAULT_AUTH_ERROR_FACTORY;
    this.lastNotifiedUid = void 0;
    this.languageCode = null;
    this.tenantId = null;
    this.settings = { appVerificationDisabledForTesting: false };
    this.frameworks = [];
    this.name = app2.name;
    this.clientVersion = config.sdkClientVersion;
  }
  _initializeWithPersistence(persistenceHierarchy, popupRedirectResolver) {
    if (popupRedirectResolver) {
      this._popupRedirectResolver = _getInstance(popupRedirectResolver);
    }
    this._initializationPromise = this.queue(async () => {
      var _a2, _b;
      if (this._deleted) {
        return;
      }
      this.persistenceManager = await PersistenceUserManager.create(this, persistenceHierarchy);
      if (this._deleted) {
        return;
      }
      if ((_a2 = this._popupRedirectResolver) === null || _a2 === void 0 ? void 0 : _a2._shouldInitProactively) {
        try {
          await this._popupRedirectResolver._initialize(this);
        } catch (e) {
        }
      }
      await this.initializeCurrentUser(popupRedirectResolver);
      this.lastNotifiedUid = ((_b = this.currentUser) === null || _b === void 0 ? void 0 : _b.uid) || null;
      if (this._deleted) {
        return;
      }
      this._isInitialized = true;
    });
    return this._initializationPromise;
  }
  async _onStorageEvent() {
    if (this._deleted) {
      return;
    }
    const user = await this.assertedPersistence.getCurrentUser();
    if (!this.currentUser && !user) {
      return;
    }
    if (this.currentUser && user && this.currentUser.uid === user.uid) {
      this._currentUser._assign(user);
      await this.currentUser.getIdToken();
      return;
    }
    await this._updateCurrentUser(user, true);
  }
  async initializeCurrentUser(popupRedirectResolver) {
    var _a2;
    const previouslyStoredUser = await this.assertedPersistence.getCurrentUser();
    let futureCurrentUser = previouslyStoredUser;
    let needsTocheckMiddleware = false;
    if (popupRedirectResolver && this.config.authDomain) {
      await this.getOrInitRedirectPersistenceManager();
      const redirectUserEventId = (_a2 = this.redirectUser) === null || _a2 === void 0 ? void 0 : _a2._redirectEventId;
      const storedUserEventId = futureCurrentUser === null || futureCurrentUser === void 0 ? void 0 : futureCurrentUser._redirectEventId;
      const result = await this.tryRedirectSignIn(popupRedirectResolver);
      if ((!redirectUserEventId || redirectUserEventId === storedUserEventId) && (result === null || result === void 0 ? void 0 : result.user)) {
        futureCurrentUser = result.user;
        needsTocheckMiddleware = true;
      }
    }
    if (!futureCurrentUser) {
      return this.directlySetCurrentUser(null);
    }
    if (!futureCurrentUser._redirectEventId) {
      if (needsTocheckMiddleware) {
        try {
          await this.beforeStateQueue.runMiddleware(futureCurrentUser);
        } catch (e) {
          futureCurrentUser = previouslyStoredUser;
          this._popupRedirectResolver._overrideRedirectResult(this, () => Promise.reject(e));
        }
      }
      if (futureCurrentUser) {
        return this.reloadAndSetCurrentUserOrClear(futureCurrentUser);
      } else {
        return this.directlySetCurrentUser(null);
      }
    }
    _assert(this._popupRedirectResolver, this, "argument-error");
    await this.getOrInitRedirectPersistenceManager();
    if (this.redirectUser && this.redirectUser._redirectEventId === futureCurrentUser._redirectEventId) {
      return this.directlySetCurrentUser(futureCurrentUser);
    }
    return this.reloadAndSetCurrentUserOrClear(futureCurrentUser);
  }
  async tryRedirectSignIn(redirectResolver) {
    let result = null;
    try {
      result = await this._popupRedirectResolver._completeRedirectFn(this, redirectResolver, true);
    } catch (e) {
      await this._setRedirectUser(null);
    }
    return result;
  }
  async reloadAndSetCurrentUserOrClear(user) {
    try {
      await _reloadWithoutSaving(user);
    } catch (e) {
      if ((e === null || e === void 0 ? void 0 : e.code) !== `auth/${"network-request-failed"}`) {
        return this.directlySetCurrentUser(null);
      }
    }
    return this.directlySetCurrentUser(user);
  }
  useDeviceLanguage() {
    this.languageCode = _getUserLanguage();
  }
  async _delete() {
    this._deleted = true;
  }
  async updateCurrentUser(userExtern) {
    const user = userExtern ? getModularInstance(userExtern) : null;
    if (user) {
      _assert(user.auth.config.apiKey === this.config.apiKey, this, "invalid-user-token");
    }
    return this._updateCurrentUser(user && user._clone(this));
  }
  async _updateCurrentUser(user, skipBeforeStateCallbacks = false) {
    if (this._deleted) {
      return;
    }
    if (user) {
      _assert(this.tenantId === user.tenantId, this, "tenant-id-mismatch");
    }
    if (!skipBeforeStateCallbacks) {
      await this.beforeStateQueue.runMiddleware(user);
    }
    return this.queue(async () => {
      await this.directlySetCurrentUser(user);
      this.notifyAuthListeners();
    });
  }
  async signOut() {
    await this.beforeStateQueue.runMiddleware(null);
    if (this.redirectPersistenceManager || this._popupRedirectResolver) {
      await this._setRedirectUser(null);
    }
    return this._updateCurrentUser(null, true);
  }
  setPersistence(persistence) {
    return this.queue(async () => {
      await this.assertedPersistence.setPersistence(_getInstance(persistence));
    });
  }
  _getPersistence() {
    return this.assertedPersistence.persistence.type;
  }
  _updateErrorMap(errorMap) {
    this._errorFactory = new ErrorFactory("auth", "Firebase", errorMap());
  }
  onAuthStateChanged(nextOrObserver, error, completed) {
    return this.registerStateListener(this.authStateSubscription, nextOrObserver, error, completed);
  }
  beforeAuthStateChanged(callback, onAbort) {
    return this.beforeStateQueue.pushCallback(callback, onAbort);
  }
  onIdTokenChanged(nextOrObserver, error, completed) {
    return this.registerStateListener(this.idTokenSubscription, nextOrObserver, error, completed);
  }
  toJSON() {
    var _a2;
    return {
      apiKey: this.config.apiKey,
      authDomain: this.config.authDomain,
      appName: this.name,
      currentUser: (_a2 = this._currentUser) === null || _a2 === void 0 ? void 0 : _a2.toJSON()
    };
  }
  async _setRedirectUser(user, popupRedirectResolver) {
    const redirectManager = await this.getOrInitRedirectPersistenceManager(popupRedirectResolver);
    return user === null ? redirectManager.removeCurrentUser() : redirectManager.setCurrentUser(user);
  }
  async getOrInitRedirectPersistenceManager(popupRedirectResolver) {
    if (!this.redirectPersistenceManager) {
      const resolver = popupRedirectResolver && _getInstance(popupRedirectResolver) || this._popupRedirectResolver;
      _assert(resolver, this, "argument-error");
      this.redirectPersistenceManager = await PersistenceUserManager.create(this, [_getInstance(resolver._redirectPersistence)], "redirectUser");
      this.redirectUser = await this.redirectPersistenceManager.getCurrentUser();
    }
    return this.redirectPersistenceManager;
  }
  async _redirectUserForId(id2) {
    var _a2, _b;
    if (this._isInitialized) {
      await this.queue(async () => {
      });
    }
    if (((_a2 = this._currentUser) === null || _a2 === void 0 ? void 0 : _a2._redirectEventId) === id2) {
      return this._currentUser;
    }
    if (((_b = this.redirectUser) === null || _b === void 0 ? void 0 : _b._redirectEventId) === id2) {
      return this.redirectUser;
    }
    return null;
  }
  async _persistUserIfCurrent(user) {
    if (user === this.currentUser) {
      return this.queue(async () => this.directlySetCurrentUser(user));
    }
  }
  _notifyListenersIfCurrent(user) {
    if (user === this.currentUser) {
      this.notifyAuthListeners();
    }
  }
  _key() {
    return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
  }
  _startProactiveRefresh() {
    this.isProactiveRefreshEnabled = true;
    if (this.currentUser) {
      this._currentUser._startProactiveRefresh();
    }
  }
  _stopProactiveRefresh() {
    this.isProactiveRefreshEnabled = false;
    if (this.currentUser) {
      this._currentUser._stopProactiveRefresh();
    }
  }
  get _currentUser() {
    return this.currentUser;
  }
  notifyAuthListeners() {
    var _a2, _b;
    if (!this._isInitialized) {
      return;
    }
    this.idTokenSubscription.next(this.currentUser);
    const currentUid = (_b = (_a2 = this.currentUser) === null || _a2 === void 0 ? void 0 : _a2.uid) !== null && _b !== void 0 ? _b : null;
    if (this.lastNotifiedUid !== currentUid) {
      this.lastNotifiedUid = currentUid;
      this.authStateSubscription.next(this.currentUser);
    }
  }
  registerStateListener(subscription, nextOrObserver, error, completed) {
    if (this._deleted) {
      return () => {
      };
    }
    const cb2 = typeof nextOrObserver === "function" ? nextOrObserver : nextOrObserver.next.bind(nextOrObserver);
    const promise = this._isInitialized ? Promise.resolve() : this._initializationPromise;
    _assert(promise, this, "internal-error");
    promise.then(() => cb2(this.currentUser));
    if (typeof nextOrObserver === "function") {
      return subscription.addObserver(nextOrObserver, error, completed);
    } else {
      return subscription.addObserver(nextOrObserver);
    }
  }
  async directlySetCurrentUser(user) {
    if (this.currentUser && this.currentUser !== user) {
      this._currentUser._stopProactiveRefresh();
    }
    if (user && this.isProactiveRefreshEnabled) {
      user._startProactiveRefresh();
    }
    this.currentUser = user;
    if (user) {
      await this.assertedPersistence.setCurrentUser(user);
    } else {
      await this.assertedPersistence.removeCurrentUser();
    }
  }
  queue(action) {
    this.operations = this.operations.then(action, action);
    return this.operations;
  }
  get assertedPersistence() {
    _assert(this.persistenceManager, this, "internal-error");
    return this.persistenceManager;
  }
  _logFramework(framework) {
    if (!framework || this.frameworks.includes(framework)) {
      return;
    }
    this.frameworks.push(framework);
    this.frameworks.sort();
    this.clientVersion = _getClientVersion(this.config.clientPlatform, this._getFrameworks());
  }
  _getFrameworks() {
    return this.frameworks;
  }
  async _getAdditionalHeaders() {
    var _a2;
    const headers = {
      ["X-Client-Version"]: this.clientVersion
    };
    if (this.app.options.appId) {
      headers["X-Firebase-gmpid"] = this.app.options.appId;
    }
    const heartbeatsHeader = await ((_a2 = this.heartbeatServiceProvider.getImmediate({
      optional: true
    })) === null || _a2 === void 0 ? void 0 : _a2.getHeartbeatsHeader());
    if (heartbeatsHeader) {
      headers["X-Firebase-Client"] = heartbeatsHeader;
    }
    return headers;
  }
}
function _castAuth(auth2) {
  return getModularInstance(auth2);
}
class Subscription {
  constructor(auth2) {
    this.auth = auth2;
    this.observer = null;
    this.addObserver = createSubscribe((observer) => this.observer = observer);
  }
  get next() {
    _assert(this.observer, this.auth, "internal-error");
    return this.observer.next.bind(this.observer);
  }
}
function connectAuthEmulator(auth2, url, options) {
  const authInternal = _castAuth(auth2);
  _assert(authInternal._canInitEmulator, authInternal, "emulator-config-failed");
  _assert(/^https?:\/\//.test(url), authInternal, "invalid-emulator-scheme");
  const disableWarnings = !!(options === null || options === void 0 ? void 0 : options.disableWarnings);
  const protocol = extractProtocol(url);
  const { host, port } = extractHostAndPort(url);
  const portStr = port === null ? "" : `:${port}`;
  authInternal.config.emulator = { url: `${protocol}//${host}${portStr}/` };
  authInternal.settings.appVerificationDisabledForTesting = true;
  authInternal.emulatorConfig = Object.freeze({
    host,
    port,
    protocol: protocol.replace(":", ""),
    options: Object.freeze({ disableWarnings })
  });
  if (!disableWarnings) {
    emitEmulatorWarning();
  }
}
function extractProtocol(url) {
  const protocolEnd = url.indexOf(":");
  return protocolEnd < 0 ? "" : url.substr(0, protocolEnd + 1);
}
function extractHostAndPort(url) {
  const protocol = extractProtocol(url);
  const authority = /(\/\/)?([^?#/]+)/.exec(url.substr(protocol.length));
  if (!authority) {
    return { host: "", port: null };
  }
  const hostAndPort = authority[2].split("@").pop() || "";
  const bracketedIPv6 = /^(\[[^\]]+\])(:|$)/.exec(hostAndPort);
  if (bracketedIPv6) {
    const host = bracketedIPv6[1];
    return { host, port: parsePort(hostAndPort.substr(host.length + 1)) };
  } else {
    const [host, port] = hostAndPort.split(":");
    return { host, port: parsePort(port) };
  }
}
function parsePort(portStr) {
  if (!portStr) {
    return null;
  }
  const port = Number(portStr);
  if (isNaN(port)) {
    return null;
  }
  return port;
}
function emitEmulatorWarning() {
  function attachBanner() {
    const el = document.createElement("p");
    const sty = el.style;
    el.innerText = "Running in emulator mode. Do not use with production credentials.";
    sty.position = "fixed";
    sty.width = "100%";
    sty.backgroundColor = "#ffffff";
    sty.border = ".1em solid #000000";
    sty.color = "#b50000";
    sty.bottom = "0px";
    sty.left = "0px";
    sty.margin = "0px";
    sty.zIndex = "10000";
    sty.textAlign = "center";
    el.classList.add("firebase-emulator-warning");
    document.body.appendChild(el);
  }
  if (typeof console !== "undefined" && typeof console.info === "function") {
    console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.");
  }
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    if (document.readyState === "loading") {
      window.addEventListener("DOMContentLoaded", attachBanner);
    } else {
      attachBanner();
    }
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class AuthCredential {
  constructor(providerId, signInMethod) {
    this.providerId = providerId;
    this.signInMethod = signInMethod;
  }
  toJSON() {
    return debugFail("not implemented");
  }
  _getIdTokenResponse(_auth) {
    return debugFail("not implemented");
  }
  _linkToIdToken(_auth, _idToken) {
    return debugFail("not implemented");
  }
  _getReauthenticationResolver(_auth) {
    return debugFail("not implemented");
  }
}
async function updateEmailPassword(auth2, request) {
  return _performApiRequest(auth2, "POST", "/v1/accounts:update", request);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function signInWithPassword(auth2, request) {
  return _performSignInRequest(auth2, "POST", "/v1/accounts:signInWithPassword", _addTidIfNecessary(auth2, request));
}
async function sendOobCode(auth2, request) {
  return _performApiRequest(auth2, "POST", "/v1/accounts:sendOobCode", _addTidIfNecessary(auth2, request));
}
async function sendPasswordResetEmail$1(auth2, request) {
  return sendOobCode(auth2, request);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function signInWithEmailLink$1(auth2, request) {
  return _performSignInRequest(auth2, "POST", "/v1/accounts:signInWithEmailLink", _addTidIfNecessary(auth2, request));
}
async function signInWithEmailLinkForLinking(auth2, request) {
  return _performSignInRequest(auth2, "POST", "/v1/accounts:signInWithEmailLink", _addTidIfNecessary(auth2, request));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class EmailAuthCredential extends AuthCredential {
  constructor(_email, _password, signInMethod, _tenantId = null) {
    super("password", signInMethod);
    this._email = _email;
    this._password = _password;
    this._tenantId = _tenantId;
  }
  static _fromEmailAndPassword(email, password) {
    return new EmailAuthCredential(email, password, "password");
  }
  static _fromEmailAndCode(email, oobCode, tenantId = null) {
    return new EmailAuthCredential(email, oobCode, "emailLink", tenantId);
  }
  toJSON() {
    return {
      email: this._email,
      password: this._password,
      signInMethod: this.signInMethod,
      tenantId: this._tenantId
    };
  }
  static fromJSON(json) {
    const obj = typeof json === "string" ? JSON.parse(json) : json;
    if ((obj === null || obj === void 0 ? void 0 : obj.email) && (obj === null || obj === void 0 ? void 0 : obj.password)) {
      if (obj.signInMethod === "password") {
        return this._fromEmailAndPassword(obj.email, obj.password);
      } else if (obj.signInMethod === "emailLink") {
        return this._fromEmailAndCode(obj.email, obj.password, obj.tenantId);
      }
    }
    return null;
  }
  async _getIdTokenResponse(auth2) {
    switch (this.signInMethod) {
      case "password":
        return signInWithPassword(auth2, {
          returnSecureToken: true,
          email: this._email,
          password: this._password
        });
      case "emailLink":
        return signInWithEmailLink$1(auth2, {
          email: this._email,
          oobCode: this._password
        });
      default:
        _fail(auth2, "internal-error");
    }
  }
  async _linkToIdToken(auth2, idToken) {
    switch (this.signInMethod) {
      case "password":
        return updateEmailPassword(auth2, {
          idToken,
          returnSecureToken: true,
          email: this._email,
          password: this._password
        });
      case "emailLink":
        return signInWithEmailLinkForLinking(auth2, {
          idToken,
          email: this._email,
          oobCode: this._password
        });
      default:
        _fail(auth2, "internal-error");
    }
  }
  _getReauthenticationResolver(auth2) {
    return this._getIdTokenResponse(auth2);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function signInWithIdp(auth2, request) {
  return _performSignInRequest(auth2, "POST", "/v1/accounts:signInWithIdp", _addTidIfNecessary(auth2, request));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const IDP_REQUEST_URI$1 = "http://localhost";
class OAuthCredential extends AuthCredential {
  constructor() {
    super(...arguments);
    this.pendingToken = null;
  }
  static _fromParams(params) {
    const cred = new OAuthCredential(params.providerId, params.signInMethod);
    if (params.idToken || params.accessToken) {
      if (params.idToken) {
        cred.idToken = params.idToken;
      }
      if (params.accessToken) {
        cred.accessToken = params.accessToken;
      }
      if (params.nonce && !params.pendingToken) {
        cred.nonce = params.nonce;
      }
      if (params.pendingToken) {
        cred.pendingToken = params.pendingToken;
      }
    } else if (params.oauthToken && params.oauthTokenSecret) {
      cred.accessToken = params.oauthToken;
      cred.secret = params.oauthTokenSecret;
    } else {
      _fail("argument-error");
    }
    return cred;
  }
  toJSON() {
    return {
      idToken: this.idToken,
      accessToken: this.accessToken,
      secret: this.secret,
      nonce: this.nonce,
      pendingToken: this.pendingToken,
      providerId: this.providerId,
      signInMethod: this.signInMethod
    };
  }
  static fromJSON(json) {
    const obj = typeof json === "string" ? JSON.parse(json) : json;
    const { providerId, signInMethod } = obj, rest = __rest(obj, ["providerId", "signInMethod"]);
    if (!providerId || !signInMethod) {
      return null;
    }
    const cred = new OAuthCredential(providerId, signInMethod);
    cred.idToken = rest.idToken || void 0;
    cred.accessToken = rest.accessToken || void 0;
    cred.secret = rest.secret;
    cred.nonce = rest.nonce;
    cred.pendingToken = rest.pendingToken || null;
    return cred;
  }
  _getIdTokenResponse(auth2) {
    const request = this.buildRequest();
    return signInWithIdp(auth2, request);
  }
  _linkToIdToken(auth2, idToken) {
    const request = this.buildRequest();
    request.idToken = idToken;
    return signInWithIdp(auth2, request);
  }
  _getReauthenticationResolver(auth2) {
    const request = this.buildRequest();
    request.autoCreate = false;
    return signInWithIdp(auth2, request);
  }
  buildRequest() {
    const request = {
      requestUri: IDP_REQUEST_URI$1,
      returnSecureToken: true
    };
    if (this.pendingToken) {
      request.pendingToken = this.pendingToken;
    } else {
      const postBody = {};
      if (this.idToken) {
        postBody["id_token"] = this.idToken;
      }
      if (this.accessToken) {
        postBody["access_token"] = this.accessToken;
      }
      if (this.secret) {
        postBody["oauth_token_secret"] = this.secret;
      }
      postBody["providerId"] = this.providerId;
      if (this.nonce && !this.pendingToken) {
        postBody["nonce"] = this.nonce;
      }
      request.postBody = querystring(postBody);
    }
    return request;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function parseMode(mode) {
  switch (mode) {
    case "recoverEmail":
      return "RECOVER_EMAIL";
    case "resetPassword":
      return "PASSWORD_RESET";
    case "signIn":
      return "EMAIL_SIGNIN";
    case "verifyEmail":
      return "VERIFY_EMAIL";
    case "verifyAndChangeEmail":
      return "VERIFY_AND_CHANGE_EMAIL";
    case "revertSecondFactorAddition":
      return "REVERT_SECOND_FACTOR_ADDITION";
    default:
      return null;
  }
}
function parseDeepLink(url) {
  const link = querystringDecode(extractQuerystring(url))["link"];
  const doubleDeepLink = link ? querystringDecode(extractQuerystring(link))["deep_link_id"] : null;
  const iOSDeepLink = querystringDecode(extractQuerystring(url))["deep_link_id"];
  const iOSDoubleDeepLink = iOSDeepLink ? querystringDecode(extractQuerystring(iOSDeepLink))["link"] : null;
  return iOSDoubleDeepLink || iOSDeepLink || doubleDeepLink || link || url;
}
class ActionCodeURL {
  constructor(actionLink) {
    var _a2, _b, _c2, _d, _e2, _f;
    const searchParams = querystringDecode(extractQuerystring(actionLink));
    const apiKey = (_a2 = searchParams["apiKey"]) !== null && _a2 !== void 0 ? _a2 : null;
    const code = (_b = searchParams["oobCode"]) !== null && _b !== void 0 ? _b : null;
    const operation = parseMode((_c2 = searchParams["mode"]) !== null && _c2 !== void 0 ? _c2 : null);
    _assert(apiKey && code && operation, "argument-error");
    this.apiKey = apiKey;
    this.operation = operation;
    this.code = code;
    this.continueUrl = (_d = searchParams["continueUrl"]) !== null && _d !== void 0 ? _d : null;
    this.languageCode = (_e2 = searchParams["languageCode"]) !== null && _e2 !== void 0 ? _e2 : null;
    this.tenantId = (_f = searchParams["tenantId"]) !== null && _f !== void 0 ? _f : null;
  }
  static parseLink(link) {
    const actionLink = parseDeepLink(link);
    try {
      return new ActionCodeURL(actionLink);
    } catch (_a2) {
      return null;
    }
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class EmailAuthProvider {
  constructor() {
    this.providerId = EmailAuthProvider.PROVIDER_ID;
  }
  static credential(email, password) {
    return EmailAuthCredential._fromEmailAndPassword(email, password);
  }
  static credentialWithLink(email, emailLink) {
    const actionCodeUrl = ActionCodeURL.parseLink(emailLink);
    _assert(actionCodeUrl, "argument-error");
    return EmailAuthCredential._fromEmailAndCode(email, actionCodeUrl.code, actionCodeUrl.tenantId);
  }
}
EmailAuthProvider.PROVIDER_ID = "password";
EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD = "password";
EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD = "emailLink";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class FederatedAuthProvider {
  constructor(providerId) {
    this.providerId = providerId;
    this.defaultLanguageCode = null;
    this.customParameters = {};
  }
  setDefaultLanguage(languageCode) {
    this.defaultLanguageCode = languageCode;
  }
  setCustomParameters(customOAuthParameters) {
    this.customParameters = customOAuthParameters;
    return this;
  }
  getCustomParameters() {
    return this.customParameters;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class BaseOAuthProvider extends FederatedAuthProvider {
  constructor() {
    super(...arguments);
    this.scopes = [];
  }
  addScope(scope) {
    if (!this.scopes.includes(scope)) {
      this.scopes.push(scope);
    }
    return this;
  }
  getScopes() {
    return [...this.scopes];
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class FacebookAuthProvider extends BaseOAuthProvider {
  constructor() {
    super("facebook.com");
  }
  static credential(accessToken) {
    return OAuthCredential._fromParams({
      providerId: FacebookAuthProvider.PROVIDER_ID,
      signInMethod: FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD,
      accessToken
    });
  }
  static credentialFromResult(userCredential) {
    return FacebookAuthProvider.credentialFromTaggedObject(userCredential);
  }
  static credentialFromError(error) {
    return FacebookAuthProvider.credentialFromTaggedObject(error.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
    if (!tokenResponse || !("oauthAccessToken" in tokenResponse)) {
      return null;
    }
    if (!tokenResponse.oauthAccessToken) {
      return null;
    }
    try {
      return FacebookAuthProvider.credential(tokenResponse.oauthAccessToken);
    } catch (_a2) {
      return null;
    }
  }
}
FacebookAuthProvider.FACEBOOK_SIGN_IN_METHOD = "facebook.com";
FacebookAuthProvider.PROVIDER_ID = "facebook.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class GoogleAuthProvider extends BaseOAuthProvider {
  constructor() {
    super("google.com");
    this.addScope("profile");
  }
  static credential(idToken, accessToken) {
    return OAuthCredential._fromParams({
      providerId: GoogleAuthProvider.PROVIDER_ID,
      signInMethod: GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD,
      idToken,
      accessToken
    });
  }
  static credentialFromResult(userCredential) {
    return GoogleAuthProvider.credentialFromTaggedObject(userCredential);
  }
  static credentialFromError(error) {
    return GoogleAuthProvider.credentialFromTaggedObject(error.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
    if (!tokenResponse) {
      return null;
    }
    const { oauthIdToken, oauthAccessToken } = tokenResponse;
    if (!oauthIdToken && !oauthAccessToken) {
      return null;
    }
    try {
      return GoogleAuthProvider.credential(oauthIdToken, oauthAccessToken);
    } catch (_a2) {
      return null;
    }
  }
}
GoogleAuthProvider.GOOGLE_SIGN_IN_METHOD = "google.com";
GoogleAuthProvider.PROVIDER_ID = "google.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class GithubAuthProvider extends BaseOAuthProvider {
  constructor() {
    super("github.com");
  }
  static credential(accessToken) {
    return OAuthCredential._fromParams({
      providerId: GithubAuthProvider.PROVIDER_ID,
      signInMethod: GithubAuthProvider.GITHUB_SIGN_IN_METHOD,
      accessToken
    });
  }
  static credentialFromResult(userCredential) {
    return GithubAuthProvider.credentialFromTaggedObject(userCredential);
  }
  static credentialFromError(error) {
    return GithubAuthProvider.credentialFromTaggedObject(error.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
    if (!tokenResponse || !("oauthAccessToken" in tokenResponse)) {
      return null;
    }
    if (!tokenResponse.oauthAccessToken) {
      return null;
    }
    try {
      return GithubAuthProvider.credential(tokenResponse.oauthAccessToken);
    } catch (_a2) {
      return null;
    }
  }
}
GithubAuthProvider.GITHUB_SIGN_IN_METHOD = "github.com";
GithubAuthProvider.PROVIDER_ID = "github.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class TwitterAuthProvider extends BaseOAuthProvider {
  constructor() {
    super("twitter.com");
  }
  static credential(token, secret) {
    return OAuthCredential._fromParams({
      providerId: TwitterAuthProvider.PROVIDER_ID,
      signInMethod: TwitterAuthProvider.TWITTER_SIGN_IN_METHOD,
      oauthToken: token,
      oauthTokenSecret: secret
    });
  }
  static credentialFromResult(userCredential) {
    return TwitterAuthProvider.credentialFromTaggedObject(userCredential);
  }
  static credentialFromError(error) {
    return TwitterAuthProvider.credentialFromTaggedObject(error.customData || {});
  }
  static credentialFromTaggedObject({ _tokenResponse: tokenResponse }) {
    if (!tokenResponse) {
      return null;
    }
    const { oauthAccessToken, oauthTokenSecret } = tokenResponse;
    if (!oauthAccessToken || !oauthTokenSecret) {
      return null;
    }
    try {
      return TwitterAuthProvider.credential(oauthAccessToken, oauthTokenSecret);
    } catch (_a2) {
      return null;
    }
  }
}
TwitterAuthProvider.TWITTER_SIGN_IN_METHOD = "twitter.com";
TwitterAuthProvider.PROVIDER_ID = "twitter.com";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function signUp(auth2, request) {
  return _performSignInRequest(auth2, "POST", "/v1/accounts:signUp", _addTidIfNecessary(auth2, request));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class UserCredentialImpl {
  constructor(params) {
    this.user = params.user;
    this.providerId = params.providerId;
    this._tokenResponse = params._tokenResponse;
    this.operationType = params.operationType;
  }
  static async _fromIdTokenResponse(auth2, operationType, idTokenResponse, isAnonymous = false) {
    const user = await UserImpl._fromIdTokenResponse(auth2, idTokenResponse, isAnonymous);
    const providerId = providerIdForResponse(idTokenResponse);
    const userCred = new UserCredentialImpl({
      user,
      providerId,
      _tokenResponse: idTokenResponse,
      operationType
    });
    return userCred;
  }
  static async _forOperation(user, operationType, response) {
    await user._updateTokensIfNecessary(response, true);
    const providerId = providerIdForResponse(response);
    return new UserCredentialImpl({
      user,
      providerId,
      _tokenResponse: response,
      operationType
    });
  }
}
function providerIdForResponse(response) {
  if (response.providerId) {
    return response.providerId;
  }
  if ("phoneNumber" in response) {
    return "phone";
  }
  return null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class MultiFactorError extends FirebaseError {
  constructor(auth2, error, operationType, user) {
    var _a2;
    super(error.code, error.message);
    this.operationType = operationType;
    this.user = user;
    Object.setPrototypeOf(this, MultiFactorError.prototype);
    this.customData = {
      appName: auth2.name,
      tenantId: (_a2 = auth2.tenantId) !== null && _a2 !== void 0 ? _a2 : void 0,
      _serverResponse: error.customData._serverResponse,
      operationType
    };
  }
  static _fromErrorAndOperation(auth2, error, operationType, user) {
    return new MultiFactorError(auth2, error, operationType, user);
  }
}
function _processCredentialSavingMfaContextIfNecessary(auth2, operationType, credential, user) {
  const idTokenProvider = operationType === "reauthenticate" ? credential._getReauthenticationResolver(auth2) : credential._getIdTokenResponse(auth2);
  return idTokenProvider.catch((error) => {
    if (error.code === `auth/${"multi-factor-auth-required"}`) {
      throw MultiFactorError._fromErrorAndOperation(auth2, error, operationType, user);
    }
    throw error;
  });
}
async function _link$1(user, credential, bypassAuthState = false) {
  const response = await _logoutIfInvalidated(user, credential._linkToIdToken(user.auth, await user.getIdToken()), bypassAuthState);
  return UserCredentialImpl._forOperation(user, "link", response);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function _reauthenticate(user, credential, bypassAuthState = false) {
  const { auth: auth2 } = user;
  const operationType = "reauthenticate";
  try {
    const response = await _logoutIfInvalidated(user, _processCredentialSavingMfaContextIfNecessary(auth2, operationType, credential, user), bypassAuthState);
    _assert(response.idToken, auth2, "internal-error");
    const parsed = _parseToken(response.idToken);
    _assert(parsed, auth2, "internal-error");
    const { sub: localId } = parsed;
    _assert(user.uid === localId, auth2, "user-mismatch");
    return UserCredentialImpl._forOperation(user, operationType, response);
  } catch (e) {
    if ((e === null || e === void 0 ? void 0 : e.code) === `auth/${"user-not-found"}`) {
      _fail(auth2, "user-mismatch");
    }
    throw e;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function _signInWithCredential(auth2, credential, bypassAuthState = false) {
  const operationType = "signIn";
  const response = await _processCredentialSavingMfaContextIfNecessary(auth2, operationType, credential);
  const userCredential = await UserCredentialImpl._fromIdTokenResponse(auth2, operationType, response);
  if (!bypassAuthState) {
    await auth2._updateCurrentUser(userCredential.user);
  }
  return userCredential;
}
async function signInWithCredential(auth2, credential) {
  return _signInWithCredential(_castAuth(auth2), credential);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _setActionCodeSettingsOnRequest(auth2, request, actionCodeSettings) {
  var _a2;
  _assert(((_a2 = actionCodeSettings.url) === null || _a2 === void 0 ? void 0 : _a2.length) > 0, auth2, "invalid-continue-uri");
  _assert(typeof actionCodeSettings.dynamicLinkDomain === "undefined" || actionCodeSettings.dynamicLinkDomain.length > 0, auth2, "invalid-dynamic-link-domain");
  request.continueUrl = actionCodeSettings.url;
  request.dynamicLinkDomain = actionCodeSettings.dynamicLinkDomain;
  request.canHandleCodeInApp = actionCodeSettings.handleCodeInApp;
  if (actionCodeSettings.iOS) {
    _assert(actionCodeSettings.iOS.bundleId.length > 0, auth2, "missing-ios-bundle-id");
    request.iOSBundleId = actionCodeSettings.iOS.bundleId;
  }
  if (actionCodeSettings.android) {
    _assert(actionCodeSettings.android.packageName.length > 0, auth2, "missing-android-pkg-name");
    request.androidInstallApp = actionCodeSettings.android.installApp;
    request.androidMinimumVersionCode = actionCodeSettings.android.minimumVersion;
    request.androidPackageName = actionCodeSettings.android.packageName;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function sendPasswordResetEmail(auth2, email, actionCodeSettings) {
  const authModular = getModularInstance(auth2);
  const request = {
    requestType: "PASSWORD_RESET",
    email
  };
  if (actionCodeSettings) {
    _setActionCodeSettingsOnRequest(authModular, request, actionCodeSettings);
  }
  await sendPasswordResetEmail$1(authModular, request);
}
async function createUserWithEmailAndPassword(auth2, email, password) {
  const authInternal = _castAuth(auth2);
  const response = await signUp(authInternal, {
    returnSecureToken: true,
    email,
    password
  });
  const userCredential = await UserCredentialImpl._fromIdTokenResponse(authInternal, "signIn", response);
  await authInternal._updateCurrentUser(userCredential.user);
  return userCredential;
}
function signInWithEmailAndPassword(auth2, email, password) {
  return signInWithCredential(getModularInstance(auth2), EmailAuthProvider.credential(email, password));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function updateProfile$1(auth2, request) {
  return _performApiRequest(auth2, "POST", "/v1/accounts:update", request);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function updateProfile(user, { displayName, photoURL: photoUrl }) {
  if (displayName === void 0 && photoUrl === void 0) {
    return;
  }
  const userInternal = getModularInstance(user);
  const idToken = await userInternal.getIdToken();
  const profileRequest = {
    idToken,
    displayName,
    photoUrl,
    returnSecureToken: true
  };
  const response = await _logoutIfInvalidated(userInternal, updateProfile$1(userInternal.auth, profileRequest));
  userInternal.displayName = response.displayName || null;
  userInternal.photoURL = response.photoUrl || null;
  const passwordProvider = userInternal.providerData.find(({ providerId }) => providerId === "password");
  if (passwordProvider) {
    passwordProvider.displayName = userInternal.displayName;
    passwordProvider.photoURL = userInternal.photoURL;
  }
  await userInternal._updateTokensIfNecessary(response);
}
function onIdTokenChanged(auth2, nextOrObserver, error, completed) {
  return getModularInstance(auth2).onIdTokenChanged(nextOrObserver, error, completed);
}
function beforeAuthStateChanged(auth2, callback, onAbort) {
  return getModularInstance(auth2).beforeAuthStateChanged(callback, onAbort);
}
function onAuthStateChanged(auth2, nextOrObserver, error, completed) {
  return getModularInstance(auth2).onAuthStateChanged(nextOrObserver, error, completed);
}
function signOut(auth2) {
  return getModularInstance(auth2).signOut();
}
const STORAGE_AVAILABLE_KEY = "__sak";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class BrowserPersistenceClass {
  constructor(storageRetriever, type) {
    this.storageRetriever = storageRetriever;
    this.type = type;
  }
  _isAvailable() {
    try {
      if (!this.storage) {
        return Promise.resolve(false);
      }
      this.storage.setItem(STORAGE_AVAILABLE_KEY, "1");
      this.storage.removeItem(STORAGE_AVAILABLE_KEY);
      return Promise.resolve(true);
    } catch (_a2) {
      return Promise.resolve(false);
    }
  }
  _set(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
    return Promise.resolve();
  }
  _get(key) {
    const json = this.storage.getItem(key);
    return Promise.resolve(json ? JSON.parse(json) : null);
  }
  _remove(key) {
    this.storage.removeItem(key);
    return Promise.resolve();
  }
  get storage() {
    return this.storageRetriever();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _iframeCannotSyncWebStorage() {
  const ua2 = getUA();
  return _isSafari(ua2) || _isIOS(ua2);
}
const _POLLING_INTERVAL_MS$1 = 1e3;
const IE10_LOCAL_STORAGE_SYNC_DELAY = 10;
class BrowserLocalPersistence extends BrowserPersistenceClass {
  constructor() {
    super(() => window.localStorage, "LOCAL");
    this.boundEventHandler = (event, poll) => this.onStorageEvent(event, poll);
    this.listeners = {};
    this.localCache = {};
    this.pollTimer = null;
    this.safariLocalStorageNotSynced = _iframeCannotSyncWebStorage() && _isIframe();
    this.fallbackToPolling = _isMobileBrowser();
    this._shouldAllowMigration = true;
  }
  forAllChangedKeys(cb2) {
    for (const key of Object.keys(this.listeners)) {
      const newValue = this.storage.getItem(key);
      const oldValue = this.localCache[key];
      if (newValue !== oldValue) {
        cb2(key, oldValue, newValue);
      }
    }
  }
  onStorageEvent(event, poll = false) {
    if (!event.key) {
      this.forAllChangedKeys((key2, _oldValue, newValue) => {
        this.notifyListeners(key2, newValue);
      });
      return;
    }
    const key = event.key;
    if (poll) {
      this.detachListener();
    } else {
      this.stopPolling();
    }
    if (this.safariLocalStorageNotSynced) {
      const storedValue2 = this.storage.getItem(key);
      if (event.newValue !== storedValue2) {
        if (event.newValue !== null) {
          this.storage.setItem(key, event.newValue);
        } else {
          this.storage.removeItem(key);
        }
      } else if (this.localCache[key] === event.newValue && !poll) {
        return;
      }
    }
    const triggerListeners = () => {
      const storedValue2 = this.storage.getItem(key);
      if (!poll && this.localCache[key] === storedValue2) {
        return;
      }
      this.notifyListeners(key, storedValue2);
    };
    const storedValue = this.storage.getItem(key);
    if (_isIE10() && storedValue !== event.newValue && event.newValue !== event.oldValue) {
      setTimeout(triggerListeners, IE10_LOCAL_STORAGE_SYNC_DELAY);
    } else {
      triggerListeners();
    }
  }
  notifyListeners(key, value) {
    this.localCache[key] = value;
    const listeners = this.listeners[key];
    if (listeners) {
      for (const listener of Array.from(listeners)) {
        listener(value ? JSON.parse(value) : value);
      }
    }
  }
  startPolling() {
    this.stopPolling();
    this.pollTimer = setInterval(() => {
      this.forAllChangedKeys((key, oldValue, newValue) => {
        this.onStorageEvent(
          new StorageEvent("storage", {
            key,
            oldValue,
            newValue
          }),
          true
        );
      });
    }, _POLLING_INTERVAL_MS$1);
  }
  stopPolling() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }
  attachListener() {
    window.addEventListener("storage", this.boundEventHandler);
  }
  detachListener() {
    window.removeEventListener("storage", this.boundEventHandler);
  }
  _addListener(key, listener) {
    if (Object.keys(this.listeners).length === 0) {
      if (this.fallbackToPolling) {
        this.startPolling();
      } else {
        this.attachListener();
      }
    }
    if (!this.listeners[key]) {
      this.listeners[key] = /* @__PURE__ */ new Set();
      this.localCache[key] = this.storage.getItem(key);
    }
    this.listeners[key].add(listener);
  }
  _removeListener(key, listener) {
    if (this.listeners[key]) {
      this.listeners[key].delete(listener);
      if (this.listeners[key].size === 0) {
        delete this.listeners[key];
      }
    }
    if (Object.keys(this.listeners).length === 0) {
      this.detachListener();
      this.stopPolling();
    }
  }
  async _set(key, value) {
    await super._set(key, value);
    this.localCache[key] = JSON.stringify(value);
  }
  async _get(key) {
    const value = await super._get(key);
    this.localCache[key] = JSON.stringify(value);
    return value;
  }
  async _remove(key) {
    await super._remove(key);
    delete this.localCache[key];
  }
}
BrowserLocalPersistence.type = "LOCAL";
const browserLocalPersistence = BrowserLocalPersistence;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class BrowserSessionPersistence extends BrowserPersistenceClass {
  constructor() {
    super(() => window.sessionStorage, "SESSION");
  }
  _addListener(_key, _listener) {
    return;
  }
  _removeListener(_key, _listener) {
    return;
  }
}
BrowserSessionPersistence.type = "SESSION";
const browserSessionPersistence = BrowserSessionPersistence;
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _allSettled(promises) {
  return Promise.all(promises.map(async (promise) => {
    try {
      const value = await promise;
      return {
        fulfilled: true,
        value
      };
    } catch (reason) {
      return {
        fulfilled: false,
        reason
      };
    }
  }));
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Receiver {
  constructor(eventTarget) {
    this.eventTarget = eventTarget;
    this.handlersMap = {};
    this.boundEventHandler = this.handleEvent.bind(this);
  }
  static _getInstance(eventTarget) {
    const existingInstance = this.receivers.find((receiver) => receiver.isListeningto(eventTarget));
    if (existingInstance) {
      return existingInstance;
    }
    const newInstance = new Receiver(eventTarget);
    this.receivers.push(newInstance);
    return newInstance;
  }
  isListeningto(eventTarget) {
    return this.eventTarget === eventTarget;
  }
  async handleEvent(event) {
    const messageEvent = event;
    const { eventId, eventType, data } = messageEvent.data;
    const handlers = this.handlersMap[eventType];
    if (!(handlers === null || handlers === void 0 ? void 0 : handlers.size)) {
      return;
    }
    messageEvent.ports[0].postMessage({
      status: "ack",
      eventId,
      eventType
    });
    const promises = Array.from(handlers).map(async (handler) => handler(messageEvent.origin, data));
    const response = await _allSettled(promises);
    messageEvent.ports[0].postMessage({
      status: "done",
      eventId,
      eventType,
      response
    });
  }
  _subscribe(eventType, eventHandler) {
    if (Object.keys(this.handlersMap).length === 0) {
      this.eventTarget.addEventListener("message", this.boundEventHandler);
    }
    if (!this.handlersMap[eventType]) {
      this.handlersMap[eventType] = /* @__PURE__ */ new Set();
    }
    this.handlersMap[eventType].add(eventHandler);
  }
  _unsubscribe(eventType, eventHandler) {
    if (this.handlersMap[eventType] && eventHandler) {
      this.handlersMap[eventType].delete(eventHandler);
    }
    if (!eventHandler || this.handlersMap[eventType].size === 0) {
      delete this.handlersMap[eventType];
    }
    if (Object.keys(this.handlersMap).length === 0) {
      this.eventTarget.removeEventListener("message", this.boundEventHandler);
    }
  }
}
Receiver.receivers = [];
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _generateEventId(prefix = "", digits = 10) {
  let random = "";
  for (let i = 0; i < digits; i++) {
    random += Math.floor(Math.random() * 10);
  }
  return prefix + random;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Sender {
  constructor(target) {
    this.target = target;
    this.handlers = /* @__PURE__ */ new Set();
  }
  removeMessageHandler(handler) {
    if (handler.messageChannel) {
      handler.messageChannel.port1.removeEventListener("message", handler.onMessage);
      handler.messageChannel.port1.close();
    }
    this.handlers.delete(handler);
  }
  async _send(eventType, data, timeout = 50) {
    const messageChannel = typeof MessageChannel !== "undefined" ? new MessageChannel() : null;
    if (!messageChannel) {
      throw new Error("connection_unavailable");
    }
    let completionTimer;
    let handler;
    return new Promise((resolve, reject) => {
      const eventId = _generateEventId("", 20);
      messageChannel.port1.start();
      const ackTimer = setTimeout(() => {
        reject(new Error("unsupported_event"));
      }, timeout);
      handler = {
        messageChannel,
        onMessage(event) {
          const messageEvent = event;
          if (messageEvent.data.eventId !== eventId) {
            return;
          }
          switch (messageEvent.data.status) {
            case "ack":
              clearTimeout(ackTimer);
              completionTimer = setTimeout(() => {
                reject(new Error("timeout"));
              }, 3e3);
              break;
            case "done":
              clearTimeout(completionTimer);
              resolve(messageEvent.data.response);
              break;
            default:
              clearTimeout(ackTimer);
              clearTimeout(completionTimer);
              reject(new Error("invalid_response"));
              break;
          }
        }
      };
      this.handlers.add(handler);
      messageChannel.port1.addEventListener("message", handler.onMessage);
      this.target.postMessage({
        eventType,
        eventId,
        data
      }, [messageChannel.port2]);
    }).finally(() => {
      if (handler) {
        this.removeMessageHandler(handler);
      }
    });
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _window() {
  return window;
}
function _setWindowLocation(url) {
  _window().location.href = url;
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _isWorker() {
  return typeof _window()["WorkerGlobalScope"] !== "undefined" && typeof _window()["importScripts"] === "function";
}
async function _getActiveServiceWorker() {
  if (!(navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker)) {
    return null;
  }
  try {
    const registration = await navigator.serviceWorker.ready;
    return registration.active;
  } catch (_a2) {
    return null;
  }
}
function _getServiceWorkerController() {
  var _a2;
  return ((_a2 = navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker) === null || _a2 === void 0 ? void 0 : _a2.controller) || null;
}
function _getWorkerGlobalScope() {
  return _isWorker() ? self : null;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DB_NAME = "firebaseLocalStorageDb";
const DB_VERSION = 1;
const DB_OBJECTSTORE_NAME = "firebaseLocalStorage";
const DB_DATA_KEYPATH = "fbase_key";
class DBPromise {
  constructor(request) {
    this.request = request;
  }
  toPromise() {
    return new Promise((resolve, reject) => {
      this.request.addEventListener("success", () => {
        resolve(this.request.result);
      });
      this.request.addEventListener("error", () => {
        reject(this.request.error);
      });
    });
  }
}
function getObjectStore(db2, isReadWrite) {
  return db2.transaction([DB_OBJECTSTORE_NAME], isReadWrite ? "readwrite" : "readonly").objectStore(DB_OBJECTSTORE_NAME);
}
function _deleteDatabase() {
  const request = indexedDB.deleteDatabase(DB_NAME);
  return new DBPromise(request).toPromise();
}
function _openDatabase() {
  const request = indexedDB.open(DB_NAME, DB_VERSION);
  return new Promise((resolve, reject) => {
    request.addEventListener("error", () => {
      reject(request.error);
    });
    request.addEventListener("upgradeneeded", () => {
      const db2 = request.result;
      try {
        db2.createObjectStore(DB_OBJECTSTORE_NAME, { keyPath: DB_DATA_KEYPATH });
      } catch (e) {
        reject(e);
      }
    });
    request.addEventListener("success", async () => {
      const db2 = request.result;
      if (!db2.objectStoreNames.contains(DB_OBJECTSTORE_NAME)) {
        db2.close();
        await _deleteDatabase();
        resolve(await _openDatabase());
      } else {
        resolve(db2);
      }
    });
  });
}
async function _putObject(db2, key, value) {
  const request = getObjectStore(db2, true).put({
    [DB_DATA_KEYPATH]: key,
    value
  });
  return new DBPromise(request).toPromise();
}
async function getObject(db2, key) {
  const request = getObjectStore(db2, false).get(key);
  const data = await new DBPromise(request).toPromise();
  return data === void 0 ? null : data.value;
}
function _deleteObject(db2, key) {
  const request = getObjectStore(db2, true).delete(key);
  return new DBPromise(request).toPromise();
}
const _POLLING_INTERVAL_MS = 800;
const _TRANSACTION_RETRY_COUNT = 3;
class IndexedDBLocalPersistence {
  constructor() {
    this.type = "LOCAL";
    this._shouldAllowMigration = true;
    this.listeners = {};
    this.localCache = {};
    this.pollTimer = null;
    this.pendingWrites = 0;
    this.receiver = null;
    this.sender = null;
    this.serviceWorkerReceiverAvailable = false;
    this.activeServiceWorker = null;
    this._workerInitializationPromise = this.initializeServiceWorkerMessaging().then(() => {
    }, () => {
    });
  }
  async _openDb() {
    if (this.db) {
      return this.db;
    }
    this.db = await _openDatabase();
    return this.db;
  }
  async _withRetries(op) {
    let numAttempts = 0;
    while (true) {
      try {
        const db2 = await this._openDb();
        return await op(db2);
      } catch (e) {
        if (numAttempts++ > _TRANSACTION_RETRY_COUNT) {
          throw e;
        }
        if (this.db) {
          this.db.close();
          this.db = void 0;
        }
      }
    }
  }
  async initializeServiceWorkerMessaging() {
    return _isWorker() ? this.initializeReceiver() : this.initializeSender();
  }
  async initializeReceiver() {
    this.receiver = Receiver._getInstance(_getWorkerGlobalScope());
    this.receiver._subscribe("keyChanged", async (_origin, data) => {
      const keys = await this._poll();
      return {
        keyProcessed: keys.includes(data.key)
      };
    });
    this.receiver._subscribe("ping", async (_origin, _data) => {
      return ["keyChanged"];
    });
  }
  async initializeSender() {
    var _a2, _b;
    this.activeServiceWorker = await _getActiveServiceWorker();
    if (!this.activeServiceWorker) {
      return;
    }
    this.sender = new Sender(this.activeServiceWorker);
    const results = await this.sender._send("ping", {}, 800);
    if (!results) {
      return;
    }
    if (((_a2 = results[0]) === null || _a2 === void 0 ? void 0 : _a2.fulfilled) && ((_b = results[0]) === null || _b === void 0 ? void 0 : _b.value.includes("keyChanged"))) {
      this.serviceWorkerReceiverAvailable = true;
    }
  }
  async notifyServiceWorker(key) {
    if (!this.sender || !this.activeServiceWorker || _getServiceWorkerController() !== this.activeServiceWorker) {
      return;
    }
    try {
      await this.sender._send(
        "keyChanged",
        { key },
        this.serviceWorkerReceiverAvailable ? 800 : 50
      );
    } catch (_a2) {
    }
  }
  async _isAvailable() {
    try {
      if (!indexedDB) {
        return false;
      }
      const db2 = await _openDatabase();
      await _putObject(db2, STORAGE_AVAILABLE_KEY, "1");
      await _deleteObject(db2, STORAGE_AVAILABLE_KEY);
      return true;
    } catch (_a2) {
    }
    return false;
  }
  async _withPendingWrite(write) {
    this.pendingWrites++;
    try {
      await write();
    } finally {
      this.pendingWrites--;
    }
  }
  async _set(key, value) {
    return this._withPendingWrite(async () => {
      await this._withRetries((db2) => _putObject(db2, key, value));
      this.localCache[key] = value;
      return this.notifyServiceWorker(key);
    });
  }
  async _get(key) {
    const obj = await this._withRetries((db2) => getObject(db2, key));
    this.localCache[key] = obj;
    return obj;
  }
  async _remove(key) {
    return this._withPendingWrite(async () => {
      await this._withRetries((db2) => _deleteObject(db2, key));
      delete this.localCache[key];
      return this.notifyServiceWorker(key);
    });
  }
  async _poll() {
    const result = await this._withRetries((db2) => {
      const getAllRequest = getObjectStore(db2, false).getAll();
      return new DBPromise(getAllRequest).toPromise();
    });
    if (!result) {
      return [];
    }
    if (this.pendingWrites !== 0) {
      return [];
    }
    const keys = [];
    const keysInResult = /* @__PURE__ */ new Set();
    for (const { fbase_key: key, value } of result) {
      keysInResult.add(key);
      if (JSON.stringify(this.localCache[key]) !== JSON.stringify(value)) {
        this.notifyListeners(key, value);
        keys.push(key);
      }
    }
    for (const localKey of Object.keys(this.localCache)) {
      if (this.localCache[localKey] && !keysInResult.has(localKey)) {
        this.notifyListeners(localKey, null);
        keys.push(localKey);
      }
    }
    return keys;
  }
  notifyListeners(key, newValue) {
    this.localCache[key] = newValue;
    const listeners = this.listeners[key];
    if (listeners) {
      for (const listener of Array.from(listeners)) {
        listener(newValue);
      }
    }
  }
  startPolling() {
    this.stopPolling();
    this.pollTimer = setInterval(async () => this._poll(), _POLLING_INTERVAL_MS);
  }
  stopPolling() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }
  _addListener(key, listener) {
    if (Object.keys(this.listeners).length === 0) {
      this.startPolling();
    }
    if (!this.listeners[key]) {
      this.listeners[key] = /* @__PURE__ */ new Set();
      void this._get(key);
    }
    this.listeners[key].add(listener);
  }
  _removeListener(key, listener) {
    if (this.listeners[key]) {
      this.listeners[key].delete(listener);
      if (this.listeners[key].size === 0) {
        delete this.listeners[key];
      }
    }
    if (Object.keys(this.listeners).length === 0) {
      this.stopPolling();
    }
  }
}
IndexedDBLocalPersistence.type = "LOCAL";
const indexedDBLocalPersistence = IndexedDBLocalPersistence;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getScriptParentElement() {
  var _a2, _b;
  return (_b = (_a2 = document.getElementsByTagName("head")) === null || _a2 === void 0 ? void 0 : _a2[0]) !== null && _b !== void 0 ? _b : document;
}
function _loadJS(url) {
  return new Promise((resolve, reject) => {
    const el = document.createElement("script");
    el.setAttribute("src", url);
    el.onload = resolve;
    el.onerror = (e) => {
      const error = _createError("internal-error");
      error.customData = e;
      reject(error);
    };
    el.type = "text/javascript";
    el.charset = "UTF-8";
    getScriptParentElement().appendChild(el);
  });
}
function _generateCallbackName(prefix) {
  return `__${prefix}${Math.floor(Math.random() * 1e6)}`;
}
new Delay(3e4, 6e4);
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function _withDefaultResolver(auth2, resolverOverride) {
  if (resolverOverride) {
    return _getInstance(resolverOverride);
  }
  _assert(auth2._popupRedirectResolver, auth2, "argument-error");
  return auth2._popupRedirectResolver;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class IdpCredential extends AuthCredential {
  constructor(params) {
    super("custom", "custom");
    this.params = params;
  }
  _getIdTokenResponse(auth2) {
    return signInWithIdp(auth2, this._buildIdpRequest());
  }
  _linkToIdToken(auth2, idToken) {
    return signInWithIdp(auth2, this._buildIdpRequest(idToken));
  }
  _getReauthenticationResolver(auth2) {
    return signInWithIdp(auth2, this._buildIdpRequest());
  }
  _buildIdpRequest(idToken) {
    const request = {
      requestUri: this.params.requestUri,
      sessionId: this.params.sessionId,
      postBody: this.params.postBody,
      tenantId: this.params.tenantId,
      pendingToken: this.params.pendingToken,
      returnSecureToken: true,
      returnIdpCredential: true
    };
    if (idToken) {
      request.idToken = idToken;
    }
    return request;
  }
}
function _signIn(params) {
  return _signInWithCredential(params.auth, new IdpCredential(params), params.bypassAuthState);
}
function _reauth(params) {
  const { auth: auth2, user } = params;
  _assert(user, auth2, "internal-error");
  return _reauthenticate(user, new IdpCredential(params), params.bypassAuthState);
}
async function _link(params) {
  const { auth: auth2, user } = params;
  _assert(user, auth2, "internal-error");
  return _link$1(user, new IdpCredential(params), params.bypassAuthState);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class AbstractPopupRedirectOperation {
  constructor(auth2, filter, resolver, user, bypassAuthState = false) {
    this.auth = auth2;
    this.resolver = resolver;
    this.user = user;
    this.bypassAuthState = bypassAuthState;
    this.pendingPromise = null;
    this.eventManager = null;
    this.filter = Array.isArray(filter) ? filter : [filter];
  }
  execute() {
    return new Promise(async (resolve, reject) => {
      this.pendingPromise = { resolve, reject };
      try {
        this.eventManager = await this.resolver._initialize(this.auth);
        await this.onExecution();
        this.eventManager.registerConsumer(this);
      } catch (e) {
        this.reject(e);
      }
    });
  }
  async onAuthEvent(event) {
    const { urlResponse, sessionId, postBody, tenantId, error, type } = event;
    if (error) {
      this.reject(error);
      return;
    }
    const params = {
      auth: this.auth,
      requestUri: urlResponse,
      sessionId,
      tenantId: tenantId || void 0,
      postBody: postBody || void 0,
      user: this.user,
      bypassAuthState: this.bypassAuthState
    };
    try {
      this.resolve(await this.getIdpTask(type)(params));
    } catch (e) {
      this.reject(e);
    }
  }
  onError(error) {
    this.reject(error);
  }
  getIdpTask(type) {
    switch (type) {
      case "signInViaPopup":
      case "signInViaRedirect":
        return _signIn;
      case "linkViaPopup":
      case "linkViaRedirect":
        return _link;
      case "reauthViaPopup":
      case "reauthViaRedirect":
        return _reauth;
      default:
        _fail(this.auth, "internal-error");
    }
  }
  resolve(cred) {
    debugAssert(this.pendingPromise, "Pending promise was never set");
    this.pendingPromise.resolve(cred);
    this.unregisterAndCleanUp();
  }
  reject(error) {
    debugAssert(this.pendingPromise, "Pending promise was never set");
    this.pendingPromise.reject(error);
    this.unregisterAndCleanUp();
  }
  unregisterAndCleanUp() {
    if (this.eventManager) {
      this.eventManager.unregisterConsumer(this);
    }
    this.pendingPromise = null;
    this.cleanUp();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _POLL_WINDOW_CLOSE_TIMEOUT = new Delay(2e3, 1e4);
async function signInWithPopup(auth2, provider2, resolver) {
  const authInternal = _castAuth(auth2);
  _assertInstanceOf(auth2, provider2, FederatedAuthProvider);
  const resolverInternal = _withDefaultResolver(authInternal, resolver);
  const action = new PopupOperation(authInternal, "signInViaPopup", provider2, resolverInternal);
  return action.executeNotNull();
}
class PopupOperation extends AbstractPopupRedirectOperation {
  constructor(auth2, filter, provider2, resolver, user) {
    super(auth2, filter, resolver, user);
    this.provider = provider2;
    this.authWindow = null;
    this.pollId = null;
    if (PopupOperation.currentPopupAction) {
      PopupOperation.currentPopupAction.cancel();
    }
    PopupOperation.currentPopupAction = this;
  }
  async executeNotNull() {
    const result = await this.execute();
    _assert(result, this.auth, "internal-error");
    return result;
  }
  async onExecution() {
    debugAssert(this.filter.length === 1, "Popup operations only handle one event");
    const eventId = _generateEventId();
    this.authWindow = await this.resolver._openPopup(
      this.auth,
      this.provider,
      this.filter[0],
      eventId
    );
    this.authWindow.associatedEvent = eventId;
    this.resolver._originValidation(this.auth).catch((e) => {
      this.reject(e);
    });
    this.resolver._isIframeWebStorageSupported(this.auth, (isSupported) => {
      if (!isSupported) {
        this.reject(_createError(this.auth, "web-storage-unsupported"));
      }
    });
    this.pollUserCancellation();
  }
  get eventId() {
    var _a2;
    return ((_a2 = this.authWindow) === null || _a2 === void 0 ? void 0 : _a2.associatedEvent) || null;
  }
  cancel() {
    this.reject(_createError(this.auth, "cancelled-popup-request"));
  }
  cleanUp() {
    if (this.authWindow) {
      this.authWindow.close();
    }
    if (this.pollId) {
      window.clearTimeout(this.pollId);
    }
    this.authWindow = null;
    this.pollId = null;
    PopupOperation.currentPopupAction = null;
  }
  pollUserCancellation() {
    const poll = () => {
      var _a2, _b;
      if ((_b = (_a2 = this.authWindow) === null || _a2 === void 0 ? void 0 : _a2.window) === null || _b === void 0 ? void 0 : _b.closed) {
        this.pollId = window.setTimeout(() => {
          this.pollId = null;
          this.reject(_createError(this.auth, "popup-closed-by-user"));
        }, 2e3);
        return;
      }
      this.pollId = window.setTimeout(poll, _POLL_WINDOW_CLOSE_TIMEOUT.get());
    };
    poll();
  }
}
PopupOperation.currentPopupAction = null;
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const PENDING_REDIRECT_KEY = "pendingRedirect";
const redirectOutcomeMap = /* @__PURE__ */ new Map();
class RedirectAction extends AbstractPopupRedirectOperation {
  constructor(auth2, resolver, bypassAuthState = false) {
    super(auth2, [
      "signInViaRedirect",
      "linkViaRedirect",
      "reauthViaRedirect",
      "unknown"
    ], resolver, void 0, bypassAuthState);
    this.eventId = null;
  }
  async execute() {
    let readyOutcome = redirectOutcomeMap.get(this.auth._key());
    if (!readyOutcome) {
      try {
        const hasPendingRedirect = await _getAndClearPendingRedirectStatus(this.resolver, this.auth);
        const result = hasPendingRedirect ? await super.execute() : null;
        readyOutcome = () => Promise.resolve(result);
      } catch (e) {
        readyOutcome = () => Promise.reject(e);
      }
      redirectOutcomeMap.set(this.auth._key(), readyOutcome);
    }
    if (!this.bypassAuthState) {
      redirectOutcomeMap.set(this.auth._key(), () => Promise.resolve(null));
    }
    return readyOutcome();
  }
  async onAuthEvent(event) {
    if (event.type === "signInViaRedirect") {
      return super.onAuthEvent(event);
    } else if (event.type === "unknown") {
      this.resolve(null);
      return;
    }
    if (event.eventId) {
      const user = await this.auth._redirectUserForId(event.eventId);
      if (user) {
        this.user = user;
        return super.onAuthEvent(event);
      } else {
        this.resolve(null);
      }
    }
  }
  async onExecution() {
  }
  cleanUp() {
  }
}
async function _getAndClearPendingRedirectStatus(resolver, auth2) {
  const key = pendingRedirectKey(auth2);
  const persistence = resolverPersistence(resolver);
  if (!await persistence._isAvailable()) {
    return false;
  }
  const hasPendingRedirect = await persistence._get(key) === "true";
  await persistence._remove(key);
  return hasPendingRedirect;
}
function _overrideRedirectResult(auth2, result) {
  redirectOutcomeMap.set(auth2._key(), result);
}
function resolverPersistence(resolver) {
  return _getInstance(resolver._redirectPersistence);
}
function pendingRedirectKey(auth2) {
  return _persistenceKeyName(PENDING_REDIRECT_KEY, auth2.config.apiKey, auth2.name);
}
async function _getRedirectResult(auth2, resolverExtern, bypassAuthState = false) {
  const authInternal = _castAuth(auth2);
  const resolver = _withDefaultResolver(authInternal, resolverExtern);
  const action = new RedirectAction(authInternal, resolver, bypassAuthState);
  const result = await action.execute();
  if (result && !bypassAuthState) {
    delete result.user._redirectEventId;
    await authInternal._persistUserIfCurrent(result.user);
    await authInternal._setRedirectUser(null, resolverExtern);
  }
  return result;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const EVENT_DUPLICATION_CACHE_DURATION_MS = 10 * 60 * 1e3;
class AuthEventManager {
  constructor(auth2) {
    this.auth = auth2;
    this.cachedEventUids = /* @__PURE__ */ new Set();
    this.consumers = /* @__PURE__ */ new Set();
    this.queuedRedirectEvent = null;
    this.hasHandledPotentialRedirect = false;
    this.lastProcessedEventTime = Date.now();
  }
  registerConsumer(authEventConsumer) {
    this.consumers.add(authEventConsumer);
    if (this.queuedRedirectEvent && this.isEventForConsumer(this.queuedRedirectEvent, authEventConsumer)) {
      this.sendToConsumer(this.queuedRedirectEvent, authEventConsumer);
      this.saveEventToCache(this.queuedRedirectEvent);
      this.queuedRedirectEvent = null;
    }
  }
  unregisterConsumer(authEventConsumer) {
    this.consumers.delete(authEventConsumer);
  }
  onEvent(event) {
    if (this.hasEventBeenHandled(event)) {
      return false;
    }
    let handled = false;
    this.consumers.forEach((consumer) => {
      if (this.isEventForConsumer(event, consumer)) {
        handled = true;
        this.sendToConsumer(event, consumer);
        this.saveEventToCache(event);
      }
    });
    if (this.hasHandledPotentialRedirect || !isRedirectEvent(event)) {
      return handled;
    }
    this.hasHandledPotentialRedirect = true;
    if (!handled) {
      this.queuedRedirectEvent = event;
      handled = true;
    }
    return handled;
  }
  sendToConsumer(event, consumer) {
    var _a2;
    if (event.error && !isNullRedirectEvent(event)) {
      const code = ((_a2 = event.error.code) === null || _a2 === void 0 ? void 0 : _a2.split("auth/")[1]) || "internal-error";
      consumer.onError(_createError(this.auth, code));
    } else {
      consumer.onAuthEvent(event);
    }
  }
  isEventForConsumer(event, consumer) {
    const eventIdMatches = consumer.eventId === null || !!event.eventId && event.eventId === consumer.eventId;
    return consumer.filter.includes(event.type) && eventIdMatches;
  }
  hasEventBeenHandled(event) {
    if (Date.now() - this.lastProcessedEventTime >= EVENT_DUPLICATION_CACHE_DURATION_MS) {
      this.cachedEventUids.clear();
    }
    return this.cachedEventUids.has(eventUid(event));
  }
  saveEventToCache(event) {
    this.cachedEventUids.add(eventUid(event));
    this.lastProcessedEventTime = Date.now();
  }
}
function eventUid(e) {
  return [e.type, e.eventId, e.sessionId, e.tenantId].filter((v2) => v2).join("-");
}
function isNullRedirectEvent({ type, error }) {
  return type === "unknown" && (error === null || error === void 0 ? void 0 : error.code) === `auth/${"no-auth-event"}`;
}
function isRedirectEvent(event) {
  switch (event.type) {
    case "signInViaRedirect":
    case "linkViaRedirect":
    case "reauthViaRedirect":
      return true;
    case "unknown":
      return isNullRedirectEvent(event);
    default:
      return false;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function _getProjectConfig(auth2, request = {}) {
  return _performApiRequest(auth2, "GET", "/v1/projects", request);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const IP_ADDRESS_REGEX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
const HTTP_REGEX = /^https?/;
async function _validateOrigin(auth2) {
  if (auth2.config.emulator) {
    return;
  }
  const { authorizedDomains } = await _getProjectConfig(auth2);
  for (const domain of authorizedDomains) {
    try {
      if (matchDomain(domain)) {
        return;
      }
    } catch (_a2) {
    }
  }
  _fail(auth2, "unauthorized-domain");
}
function matchDomain(expected) {
  const currentUrl = _getCurrentUrl();
  const { protocol, hostname } = new URL(currentUrl);
  if (expected.startsWith("chrome-extension://")) {
    const ceUrl = new URL(expected);
    if (ceUrl.hostname === "" && hostname === "") {
      return protocol === "chrome-extension:" && expected.replace("chrome-extension://", "") === currentUrl.replace("chrome-extension://", "");
    }
    return protocol === "chrome-extension:" && ceUrl.hostname === hostname;
  }
  if (!HTTP_REGEX.test(protocol)) {
    return false;
  }
  if (IP_ADDRESS_REGEX.test(expected)) {
    return hostname === expected;
  }
  const escapedDomainPattern = expected.replace(/\./g, "\\.");
  const re2 = new RegExp("^(.+\\." + escapedDomainPattern + "|" + escapedDomainPattern + ")$", "i");
  return re2.test(hostname);
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const NETWORK_TIMEOUT = new Delay(3e4, 6e4);
function resetUnloadedGapiModules() {
  const beacon = _window().___jsl;
  if (beacon === null || beacon === void 0 ? void 0 : beacon.H) {
    for (const hint of Object.keys(beacon.H)) {
      beacon.H[hint].r = beacon.H[hint].r || [];
      beacon.H[hint].L = beacon.H[hint].L || [];
      beacon.H[hint].r = [...beacon.H[hint].L];
      if (beacon.CP) {
        for (let i = 0; i < beacon.CP.length; i++) {
          beacon.CP[i] = null;
        }
      }
    }
  }
}
function loadGapi(auth2) {
  return new Promise((resolve, reject) => {
    var _a2, _b, _c2;
    function loadGapiIframe() {
      resetUnloadedGapiModules();
      gapi.load("gapi.iframes", {
        callback: () => {
          resolve(gapi.iframes.getContext());
        },
        ontimeout: () => {
          resetUnloadedGapiModules();
          reject(_createError(auth2, "network-request-failed"));
        },
        timeout: NETWORK_TIMEOUT.get()
      });
    }
    if ((_b = (_a2 = _window().gapi) === null || _a2 === void 0 ? void 0 : _a2.iframes) === null || _b === void 0 ? void 0 : _b.Iframe) {
      resolve(gapi.iframes.getContext());
    } else if (!!((_c2 = _window().gapi) === null || _c2 === void 0 ? void 0 : _c2.load)) {
      loadGapiIframe();
    } else {
      const cbName = _generateCallbackName("iframefcb");
      _window()[cbName] = () => {
        if (!!gapi.load) {
          loadGapiIframe();
        } else {
          reject(_createError(auth2, "network-request-failed"));
        }
      };
      return _loadJS(`https://apis.google.com/js/api.js?onload=${cbName}`).catch((e) => reject(e));
    }
  }).catch((error) => {
    cachedGApiLoader = null;
    throw error;
  });
}
let cachedGApiLoader = null;
function _loadGapi(auth2) {
  cachedGApiLoader = cachedGApiLoader || loadGapi(auth2);
  return cachedGApiLoader;
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const PING_TIMEOUT = new Delay(5e3, 15e3);
const IFRAME_PATH = "__/auth/iframe";
const EMULATED_IFRAME_PATH = "emulator/auth/iframe";
const IFRAME_ATTRIBUTES = {
  style: {
    position: "absolute",
    top: "-100px",
    width: "1px",
    height: "1px"
  },
  "aria-hidden": "true",
  tabindex: "-1"
};
const EID_FROM_APIHOST = /* @__PURE__ */ new Map([
  ["identitytoolkit.googleapis.com", "p"],
  ["staging-identitytoolkit.sandbox.googleapis.com", "s"],
  ["test-identitytoolkit.sandbox.googleapis.com", "t"]
]);
function getIframeUrl(auth2) {
  const config = auth2.config;
  _assert(config.authDomain, auth2, "auth-domain-config-required");
  const url = config.emulator ? _emulatorUrl(config, EMULATED_IFRAME_PATH) : `https://${auth2.config.authDomain}/${IFRAME_PATH}`;
  const params = {
    apiKey: config.apiKey,
    appName: auth2.name,
    v: SDK_VERSION
  };
  const eid = EID_FROM_APIHOST.get(auth2.config.apiHost);
  if (eid) {
    params.eid = eid;
  }
  const frameworks = auth2._getFrameworks();
  if (frameworks.length) {
    params.fw = frameworks.join(",");
  }
  return `${url}?${querystring(params).slice(1)}`;
}
async function _openIframe(auth2) {
  const context = await _loadGapi(auth2);
  const gapi2 = _window().gapi;
  _assert(gapi2, auth2, "internal-error");
  return context.open({
    where: document.body,
    url: getIframeUrl(auth2),
    messageHandlersFilter: gapi2.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
    attributes: IFRAME_ATTRIBUTES,
    dontclear: true
  }, (iframe) => new Promise(async (resolve, reject) => {
    await iframe.restyle({
      setHideOnLeave: false
    });
    const networkError = _createError(auth2, "network-request-failed");
    const networkErrorTimer = _window().setTimeout(() => {
      reject(networkError);
    }, PING_TIMEOUT.get());
    function clearTimerAndResolve() {
      _window().clearTimeout(networkErrorTimer);
      resolve(iframe);
    }
    iframe.ping(clearTimerAndResolve).then(clearTimerAndResolve, () => {
      reject(networkError);
    });
  }));
}
/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const BASE_POPUP_OPTIONS = {
  location: "yes",
  resizable: "yes",
  statusbar: "yes",
  toolbar: "no"
};
const DEFAULT_WIDTH = 500;
const DEFAULT_HEIGHT = 600;
const TARGET_BLANK = "_blank";
const FIREFOX_EMPTY_URL = "http://localhost";
class AuthPopup {
  constructor(window2) {
    this.window = window2;
    this.associatedEvent = null;
  }
  close() {
    if (this.window) {
      try {
        this.window.close();
      } catch (e) {
      }
    }
  }
}
function _open(auth2, url, name2, width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT) {
  const top = Math.max((window.screen.availHeight - height) / 2, 0).toString();
  const left = Math.max((window.screen.availWidth - width) / 2, 0).toString();
  let target = "";
  const options = Object.assign(Object.assign({}, BASE_POPUP_OPTIONS), {
    width: width.toString(),
    height: height.toString(),
    top,
    left
  });
  const ua2 = getUA().toLowerCase();
  if (name2) {
    target = _isChromeIOS(ua2) ? TARGET_BLANK : name2;
  }
  if (_isFirefox(ua2)) {
    url = url || FIREFOX_EMPTY_URL;
    options.scrollbars = "yes";
  }
  const optionsString = Object.entries(options).reduce((accum, [key, value]) => `${accum}${key}=${value},`, "");
  if (_isIOSStandalone(ua2) && target !== "_self") {
    openAsNewWindowIOS(url || "", target);
    return new AuthPopup(null);
  }
  const newWin = window.open(url || "", target, optionsString);
  _assert(newWin, auth2, "popup-blocked");
  try {
    newWin.focus();
  } catch (e) {
  }
  return new AuthPopup(newWin);
}
function openAsNewWindowIOS(url, target) {
  const el = document.createElement("a");
  el.href = url;
  el.target = target;
  const click = document.createEvent("MouseEvent");
  click.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 1, null);
  el.dispatchEvent(click);
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const WIDGET_PATH = "__/auth/handler";
const EMULATOR_WIDGET_PATH = "emulator/auth/handler";
function _getRedirectUrl(auth2, provider2, authType, redirectUrl, eventId, additionalParams) {
  _assert(auth2.config.authDomain, auth2, "auth-domain-config-required");
  _assert(auth2.config.apiKey, auth2, "invalid-api-key");
  const params = {
    apiKey: auth2.config.apiKey,
    appName: auth2.name,
    authType,
    redirectUrl,
    v: SDK_VERSION,
    eventId
  };
  if (provider2 instanceof FederatedAuthProvider) {
    provider2.setDefaultLanguage(auth2.languageCode);
    params.providerId = provider2.providerId || "";
    if (!isEmpty(provider2.getCustomParameters())) {
      params.customParameters = JSON.stringify(provider2.getCustomParameters());
    }
    for (const [key, value] of Object.entries(additionalParams || {})) {
      params[key] = value;
    }
  }
  if (provider2 instanceof BaseOAuthProvider) {
    const scopes = provider2.getScopes().filter((scope) => scope !== "");
    if (scopes.length > 0) {
      params.scopes = scopes.join(",");
    }
  }
  if (auth2.tenantId) {
    params.tid = auth2.tenantId;
  }
  const paramsDict = params;
  for (const key of Object.keys(paramsDict)) {
    if (paramsDict[key] === void 0) {
      delete paramsDict[key];
    }
  }
  return `${getHandlerBase(auth2)}?${querystring(paramsDict).slice(1)}`;
}
function getHandlerBase({ config }) {
  if (!config.emulator) {
    return `https://${config.authDomain}/${WIDGET_PATH}`;
  }
  return _emulatorUrl(config, EMULATOR_WIDGET_PATH);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const WEB_STORAGE_SUPPORT_KEY = "webStorageSupport";
class BrowserPopupRedirectResolver {
  constructor() {
    this.eventManagers = {};
    this.iframes = {};
    this.originValidationPromises = {};
    this._redirectPersistence = browserSessionPersistence;
    this._completeRedirectFn = _getRedirectResult;
    this._overrideRedirectResult = _overrideRedirectResult;
  }
  async _openPopup(auth2, provider2, authType, eventId) {
    var _a2;
    debugAssert((_a2 = this.eventManagers[auth2._key()]) === null || _a2 === void 0 ? void 0 : _a2.manager, "_initialize() not called before _openPopup()");
    const url = _getRedirectUrl(auth2, provider2, authType, _getCurrentUrl(), eventId);
    return _open(auth2, url, _generateEventId());
  }
  async _openRedirect(auth2, provider2, authType, eventId) {
    await this._originValidation(auth2);
    _setWindowLocation(_getRedirectUrl(auth2, provider2, authType, _getCurrentUrl(), eventId));
    return new Promise(() => {
    });
  }
  _initialize(auth2) {
    const key = auth2._key();
    if (this.eventManagers[key]) {
      const { manager, promise: promise2 } = this.eventManagers[key];
      if (manager) {
        return Promise.resolve(manager);
      } else {
        debugAssert(promise2, "If manager is not set, promise should be");
        return promise2;
      }
    }
    const promise = this.initAndGetManager(auth2);
    this.eventManagers[key] = { promise };
    promise.catch(() => {
      delete this.eventManagers[key];
    });
    return promise;
  }
  async initAndGetManager(auth2) {
    const iframe = await _openIframe(auth2);
    const manager = new AuthEventManager(auth2);
    iframe.register("authEvent", (iframeEvent) => {
      _assert(iframeEvent === null || iframeEvent === void 0 ? void 0 : iframeEvent.authEvent, auth2, "invalid-auth-event");
      const handled = manager.onEvent(iframeEvent.authEvent);
      return { status: handled ? "ACK" : "ERROR" };
    }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
    this.eventManagers[auth2._key()] = { manager };
    this.iframes[auth2._key()] = iframe;
    return manager;
  }
  _isIframeWebStorageSupported(auth2, cb2) {
    const iframe = this.iframes[auth2._key()];
    iframe.send(WEB_STORAGE_SUPPORT_KEY, { type: WEB_STORAGE_SUPPORT_KEY }, (result) => {
      var _a2;
      const isSupported = (_a2 = result === null || result === void 0 ? void 0 : result[0]) === null || _a2 === void 0 ? void 0 : _a2[WEB_STORAGE_SUPPORT_KEY];
      if (isSupported !== void 0) {
        cb2(!!isSupported);
      }
      _fail(auth2, "internal-error");
    }, gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER);
  }
  _originValidation(auth2) {
    const key = auth2._key();
    if (!this.originValidationPromises[key]) {
      this.originValidationPromises[key] = _validateOrigin(auth2);
    }
    return this.originValidationPromises[key];
  }
  get _shouldInitProactively() {
    return _isMobileBrowser() || _isSafari() || _isIOS();
  }
}
const browserPopupRedirectResolver = BrowserPopupRedirectResolver;
var name = "@firebase/auth";
var version = "0.21.3";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class AuthInterop {
  constructor(auth2) {
    this.auth = auth2;
    this.internalListeners = /* @__PURE__ */ new Map();
  }
  getUid() {
    var _a2;
    this.assertAuthConfigured();
    return ((_a2 = this.auth.currentUser) === null || _a2 === void 0 ? void 0 : _a2.uid) || null;
  }
  async getToken(forceRefresh) {
    this.assertAuthConfigured();
    await this.auth._initializationPromise;
    if (!this.auth.currentUser) {
      return null;
    }
    const accessToken = await this.auth.currentUser.getIdToken(forceRefresh);
    return { accessToken };
  }
  addAuthTokenListener(listener) {
    this.assertAuthConfigured();
    if (this.internalListeners.has(listener)) {
      return;
    }
    const unsubscribe = this.auth.onIdTokenChanged((user) => {
      listener((user === null || user === void 0 ? void 0 : user.stsTokenManager.accessToken) || null);
    });
    this.internalListeners.set(listener, unsubscribe);
    this.updateProactiveRefresh();
  }
  removeAuthTokenListener(listener) {
    this.assertAuthConfigured();
    const unsubscribe = this.internalListeners.get(listener);
    if (!unsubscribe) {
      return;
    }
    this.internalListeners.delete(listener);
    unsubscribe();
    this.updateProactiveRefresh();
  }
  assertAuthConfigured() {
    _assert(this.auth._initializationPromise, "dependent-sdk-initialized-before-auth");
  }
  updateProactiveRefresh() {
    if (this.internalListeners.size > 0) {
      this.auth._startProactiveRefresh();
    } else {
      this.auth._stopProactiveRefresh();
    }
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function getVersionForPlatform(clientPlatform) {
  switch (clientPlatform) {
    case "Node":
      return "node";
    case "ReactNative":
      return "rn";
    case "Worker":
      return "webworker";
    case "Cordova":
      return "cordova";
    default:
      return void 0;
  }
}
function registerAuth(clientPlatform) {
  _registerComponent(new Component("auth", (container, { options: deps }) => {
    const app2 = container.getProvider("app").getImmediate();
    const heartbeatServiceProvider = container.getProvider("heartbeat");
    const { apiKey, authDomain } = app2.options;
    return ((app3, heartbeatServiceProvider2) => {
      _assert(apiKey && !apiKey.includes(":"), "invalid-api-key", { appName: app3.name });
      _assert(!(authDomain === null || authDomain === void 0 ? void 0 : authDomain.includes(":")), "argument-error", {
        appName: app3.name
      });
      const config = {
        apiKey,
        authDomain,
        clientPlatform,
        apiHost: "identitytoolkit.googleapis.com",
        tokenApiHost: "securetoken.googleapis.com",
        apiScheme: "https",
        sdkClientVersion: _getClientVersion(clientPlatform)
      };
      const authInstance = new AuthImpl(app3, heartbeatServiceProvider2, config);
      _initializeAuthInstance(authInstance, deps);
      return authInstance;
    })(app2, heartbeatServiceProvider);
  }, "PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((container, _instanceIdentifier, _instance) => {
    const authInternalProvider = container.getProvider("auth-internal");
    authInternalProvider.initialize();
  }));
  _registerComponent(new Component("auth-internal", (container) => {
    const auth2 = _castAuth(container.getProvider("auth").getImmediate());
    return ((auth3) => new AuthInterop(auth3))(auth2);
  }, "PRIVATE").setInstantiationMode("EXPLICIT"));
  registerVersion(name, version, getVersionForPlatform(clientPlatform));
  registerVersion(name, version, "esm2017");
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const DEFAULT_ID_TOKEN_MAX_AGE = 5 * 60;
const authIdTokenMaxAge = getExperimentalSetting("authIdTokenMaxAge") || DEFAULT_ID_TOKEN_MAX_AGE;
let lastPostedIdToken = null;
const mintCookieFactory = (url) => async (user) => {
  const idTokenResult = user && await user.getIdTokenResult();
  const idTokenAge = idTokenResult && (new Date().getTime() - Date.parse(idTokenResult.issuedAtTime)) / 1e3;
  if (idTokenAge && idTokenAge > authIdTokenMaxAge) {
    return;
  }
  const idToken = idTokenResult === null || idTokenResult === void 0 ? void 0 : idTokenResult.token;
  if (lastPostedIdToken === idToken) {
    return;
  }
  lastPostedIdToken = idToken;
  await fetch(url, {
    method: idToken ? "POST" : "DELETE",
    headers: idToken ? {
      "Authorization": `Bearer ${idToken}`
    } : {}
  });
};
function getAuth(app2 = getApp()) {
  const provider2 = _getProvider(app2, "auth");
  if (provider2.isInitialized()) {
    return provider2.getImmediate();
  }
  const auth2 = initializeAuth(app2, {
    popupRedirectResolver: browserPopupRedirectResolver,
    persistence: [
      indexedDBLocalPersistence,
      browserLocalPersistence,
      browserSessionPersistence
    ]
  });
  const authTokenSyncUrl = getExperimentalSetting("authTokenSyncURL");
  if (authTokenSyncUrl) {
    const mintCookie = mintCookieFactory(authTokenSyncUrl);
    beforeAuthStateChanged(auth2, mintCookie, () => mintCookie(auth2.currentUser));
    onIdTokenChanged(auth2, (user) => mintCookie(user));
  }
  const authEmulatorHost = getDefaultEmulatorHost("auth");
  if (authEmulatorHost) {
    connectAuthEmulator(auth2, `http://${authEmulatorHost}`);
  }
  return auth2;
}
registerAuth("Browser");
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var k$1, goog = goog || {}, l = commonjsGlobal || self;
function aa$1() {
}
function ba(a) {
  var b2 = typeof a;
  b2 = "object" != b2 ? b2 : a ? Array.isArray(a) ? "array" : b2 : "null";
  return "array" == b2 || "object" == b2 && "number" == typeof a.length;
}
function p(a) {
  var b2 = typeof a;
  return "object" == b2 && null != a || "function" == b2;
}
function ca$1(a) {
  return Object.prototype.hasOwnProperty.call(a, da) && a[da] || (a[da] = ++ea$1);
}
var da = "closure_uid_" + (1e9 * Math.random() >>> 0), ea$1 = 0;
function fa$1(a, b2, c) {
  return a.call.apply(a.bind, arguments);
}
function ha$1(a, b2, c) {
  if (!a)
    throw Error();
  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var e = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(e, d);
      return a.apply(b2, e);
    };
  }
  return function() {
    return a.apply(b2, arguments);
  };
}
function q$1(a, b2, c) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? q$1 = fa$1 : q$1 = ha$1;
  return q$1.apply(null, arguments);
}
function ia(a, b2) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var d = c.slice();
    d.push.apply(d, arguments);
    return a.apply(this, d);
  };
}
function t(a, b2) {
  function c() {
  }
  c.prototype = b2.prototype;
  a.X = b2.prototype;
  a.prototype = new c();
  a.prototype.constructor = a;
  a.Wb = function(d, e, f) {
    for (var h = Array(arguments.length - 2), n = 2; n < arguments.length; n++)
      h[n - 2] = arguments[n];
    return b2.prototype[e].apply(d, h);
  };
}
function v$1() {
  this.s = this.s;
  this.o = this.o;
}
var ja = 0;
v$1.prototype.s = false;
v$1.prototype.na = function() {
  if (!this.s && (this.s = true, this.M(), 0 != ja)) {
    ca$1(this);
  }
};
v$1.prototype.M = function() {
  if (this.o)
    for (; this.o.length; )
      this.o.shift()();
};
const la$1 = Array.prototype.indexOf ? function(a, b2) {
  return Array.prototype.indexOf.call(a, b2, void 0);
} : function(a, b2) {
  if ("string" === typeof a)
    return "string" !== typeof b2 || 1 != b2.length ? -1 : a.indexOf(b2, 0);
  for (let c = 0; c < a.length; c++)
    if (c in a && a[c] === b2)
      return c;
  return -1;
};
function ma$1(a) {
  const b2 = a.length;
  if (0 < b2) {
    const c = Array(b2);
    for (let d = 0; d < b2; d++)
      c[d] = a[d];
    return c;
  }
  return [];
}
function na(a, b2) {
  for (let c = 1; c < arguments.length; c++) {
    const d = arguments[c];
    if (ba(d)) {
      const e = a.length || 0, f = d.length || 0;
      a.length = e + f;
      for (let h = 0; h < f; h++)
        a[e + h] = d[h];
    } else
      a.push(d);
  }
}
function w(a, b2) {
  this.type = a;
  this.g = this.target = b2;
  this.defaultPrevented = false;
}
w.prototype.h = function() {
  this.defaultPrevented = true;
};
var oa$1 = function() {
  if (!l.addEventListener || !Object.defineProperty)
    return false;
  var a = false, b2 = Object.defineProperty({}, "passive", { get: function() {
    a = true;
  } });
  try {
    l.addEventListener("test", aa$1, b2), l.removeEventListener("test", aa$1, b2);
  } catch (c) {
  }
  return a;
}();
function pa$1(a) {
  return /^[\s\xa0]*$/.test(a);
}
var qa = String.prototype.trim ? function(a) {
  return a.trim();
} : function(a) {
  return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
};
function ra(a, b2) {
  return a < b2 ? -1 : a > b2 ? 1 : 0;
}
function sa$1() {
  var a = l.navigator;
  return a && (a = a.userAgent) ? a : "";
}
function x$1(a) {
  return -1 != sa$1().indexOf(a);
}
function ta$1(a) {
  ta$1[" "](a);
  return a;
}
ta$1[" "] = aa$1;
function ua$1(a) {
  var b2 = va$1;
  return Object.prototype.hasOwnProperty.call(b2, 9) ? b2[9] : b2[9] = a(9);
}
var wa$1 = x$1("Opera"), y = x$1("Trident") || x$1("MSIE"), xa = x$1("Edge"), ya$1 = xa || y, za$1 = x$1("Gecko") && !(-1 != sa$1().toLowerCase().indexOf("webkit") && !x$1("Edge")) && !(x$1("Trident") || x$1("MSIE")) && !x$1("Edge"), Aa$1 = -1 != sa$1().toLowerCase().indexOf("webkit") && !x$1("Edge");
function Ba() {
  var a = l.document;
  return a ? a.documentMode : void 0;
}
var Ea;
a: {
  var Fa$1 = "", Ga$1 = function() {
    var a = sa$1();
    if (za$1)
      return /rv:([^\);]+)(\)|;)/.exec(a);
    if (xa)
      return /Edge\/([\d\.]+)/.exec(a);
    if (y)
      return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
    if (Aa$1)
      return /WebKit\/(\S+)/.exec(a);
    if (wa$1)
      return /(?:Version)[ \/]?(\S+)/.exec(a);
  }();
  Ga$1 && (Fa$1 = Ga$1 ? Ga$1[1] : "");
  if (y) {
    var Ha = Ba();
    if (null != Ha && Ha > parseFloat(Fa$1)) {
      Ea = String(Ha);
      break a;
    }
  }
  Ea = Fa$1;
}
var va$1 = {};
function Ia$1() {
  return ua$1(function() {
    let a = 0;
    const b2 = qa(String(Ea)).split("."), c = qa("9").split("."), d = Math.max(b2.length, c.length);
    for (let h = 0; 0 == a && h < d; h++) {
      var e = b2[h] || "", f = c[h] || "";
      do {
        e = /(\d*)(\D*)(.*)/.exec(e) || ["", "", "", ""];
        f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
        if (0 == e[0].length && 0 == f[0].length)
          break;
        a = ra(0 == e[1].length ? 0 : parseInt(e[1], 10), 0 == f[1].length ? 0 : parseInt(f[1], 10)) || ra(0 == e[2].length, 0 == f[2].length) || ra(e[2], f[2]);
        e = e[3];
        f = f[3];
      } while (0 == a);
    }
    return 0 <= a;
  });
}
var Ja$1;
if (l.document && y) {
  var Ka = Ba();
  Ja$1 = Ka ? Ka : parseInt(Ea, 10) || void 0;
} else
  Ja$1 = void 0;
var La = Ja$1;
function z$1(a, b2) {
  w.call(this, a ? a.type : "");
  this.relatedTarget = this.g = this.target = null;
  this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
  this.key = "";
  this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = false;
  this.state = null;
  this.pointerId = 0;
  this.pointerType = "";
  this.i = null;
  if (a) {
    var c = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.g = b2;
    if (b2 = a.relatedTarget) {
      if (za$1) {
        a: {
          try {
            ta$1(b2.nodeName);
            var e = true;
            break a;
          } catch (f) {
          }
          e = false;
        }
        e || (b2 = null);
      }
    } else
      "mouseover" == c ? b2 = a.fromElement : "mouseout" == c && (b2 = a.toElement);
    this.relatedTarget = b2;
    d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
    this.button = a.button;
    this.key = a.key || "";
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.pointerId = a.pointerId || 0;
    this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Ma$1[a.pointerType] || "";
    this.state = a.state;
    this.i = a;
    a.defaultPrevented && z$1.X.h.call(this);
  }
}
t(z$1, w);
var Ma$1 = { 2: "touch", 3: "pen", 4: "mouse" };
z$1.prototype.h = function() {
  z$1.X.h.call(this);
  var a = this.i;
  a.preventDefault ? a.preventDefault() : a.returnValue = false;
};
var A = "closure_listenable_" + (1e6 * Math.random() | 0);
var Na = 0;
function Oa$1(a, b2, c, d, e) {
  this.listener = a;
  this.proxy = null;
  this.src = b2;
  this.type = c;
  this.capture = !!d;
  this.ha = e;
  this.key = ++Na;
  this.ba = this.ea = false;
}
function Pa(a) {
  a.ba = true;
  a.listener = null;
  a.proxy = null;
  a.src = null;
  a.ha = null;
}
function Qa(a, b2, c) {
  for (const d in a)
    b2.call(c, a[d], d, a);
}
function Ra(a) {
  const b2 = {};
  for (const c in a)
    b2[c] = a[c];
  return b2;
}
const Sa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function Ta$1(a, b2) {
  let c, d;
  for (let e = 1; e < arguments.length; e++) {
    d = arguments[e];
    for (c in d)
      a[c] = d[c];
    for (let f = 0; f < Sa.length; f++)
      c = Sa[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
  }
}
function Ua$1(a) {
  this.src = a;
  this.g = {};
  this.h = 0;
}
Ua$1.prototype.add = function(a, b2, c, d, e) {
  var f = a.toString();
  a = this.g[f];
  a || (a = this.g[f] = [], this.h++);
  var h = Va(a, b2, d, e);
  -1 < h ? (b2 = a[h], c || (b2.ea = false)) : (b2 = new Oa$1(b2, this.src, f, !!d, e), b2.ea = c, a.push(b2));
  return b2;
};
function Wa(a, b2) {
  var c = b2.type;
  if (c in a.g) {
    var d = a.g[c], e = la$1(d, b2), f;
    (f = 0 <= e) && Array.prototype.splice.call(d, e, 1);
    f && (Pa(b2), 0 == a.g[c].length && (delete a.g[c], a.h--));
  }
}
function Va(a, b2, c, d) {
  for (var e = 0; e < a.length; ++e) {
    var f = a[e];
    if (!f.ba && f.listener == b2 && f.capture == !!c && f.ha == d)
      return e;
  }
  return -1;
}
var Xa = "closure_lm_" + (1e6 * Math.random() | 0), Ya = {};
function $a$1(a, b2, c, d, e) {
  if (d && d.once)
    return ab(a, b2, c, d, e);
  if (Array.isArray(b2)) {
    for (var f = 0; f < b2.length; f++)
      $a$1(a, b2[f], c, d, e);
    return null;
  }
  c = bb(c);
  return a && a[A] ? a.N(b2, c, p(d) ? !!d.capture : !!d, e) : cb(a, b2, c, false, d, e);
}
function cb(a, b2, c, d, e, f) {
  if (!b2)
    throw Error("Invalid event type");
  var h = p(e) ? !!e.capture : !!e, n = db$1(a);
  n || (a[Xa] = n = new Ua$1(a));
  c = n.add(b2, c, d, h, f);
  if (c.proxy)
    return c;
  d = eb();
  c.proxy = d;
  d.src = a;
  d.listener = c;
  if (a.addEventListener)
    oa$1 || (e = h), void 0 === e && (e = false), a.addEventListener(b2.toString(), d, e);
  else if (a.attachEvent)
    a.attachEvent(fb(b2.toString()), d);
  else if (a.addListener && a.removeListener)
    a.addListener(d);
  else
    throw Error("addEventListener and attachEvent are unavailable.");
  return c;
}
function eb() {
  function a(c) {
    return b2.call(a.src, a.listener, c);
  }
  const b2 = gb;
  return a;
}
function ab(a, b2, c, d, e) {
  if (Array.isArray(b2)) {
    for (var f = 0; f < b2.length; f++)
      ab(a, b2[f], c, d, e);
    return null;
  }
  c = bb(c);
  return a && a[A] ? a.O(b2, c, p(d) ? !!d.capture : !!d, e) : cb(a, b2, c, true, d, e);
}
function hb(a, b2, c, d, e) {
  if (Array.isArray(b2))
    for (var f = 0; f < b2.length; f++)
      hb(a, b2[f], c, d, e);
  else
    (d = p(d) ? !!d.capture : !!d, c = bb(c), a && a[A]) ? (a = a.i, b2 = String(b2).toString(), b2 in a.g && (f = a.g[b2], c = Va(f, c, d, e), -1 < c && (Pa(f[c]), Array.prototype.splice.call(f, c, 1), 0 == f.length && (delete a.g[b2], a.h--)))) : a && (a = db$1(a)) && (b2 = a.g[b2.toString()], a = -1, b2 && (a = Va(b2, c, d, e)), (c = -1 < a ? b2[a] : null) && ib(c));
}
function ib(a) {
  if ("number" !== typeof a && a && !a.ba) {
    var b2 = a.src;
    if (b2 && b2[A])
      Wa(b2.i, a);
    else {
      var c = a.type, d = a.proxy;
      b2.removeEventListener ? b2.removeEventListener(c, d, a.capture) : b2.detachEvent ? b2.detachEvent(fb(c), d) : b2.addListener && b2.removeListener && b2.removeListener(d);
      (c = db$1(b2)) ? (Wa(c, a), 0 == c.h && (c.src = null, b2[Xa] = null)) : Pa(a);
    }
  }
}
function fb(a) {
  return a in Ya ? Ya[a] : Ya[a] = "on" + a;
}
function gb(a, b2) {
  if (a.ba)
    a = true;
  else {
    b2 = new z$1(b2, this);
    var c = a.listener, d = a.ha || a.src;
    a.ea && ib(a);
    a = c.call(d, b2);
  }
  return a;
}
function db$1(a) {
  a = a[Xa];
  return a instanceof Ua$1 ? a : null;
}
var jb = "__closure_events_fn_" + (1e9 * Math.random() >>> 0);
function bb(a) {
  if ("function" === typeof a)
    return a;
  a[jb] || (a[jb] = function(b2) {
    return a.handleEvent(b2);
  });
  return a[jb];
}
function B$1() {
  v$1.call(this);
  this.i = new Ua$1(this);
  this.P = this;
  this.I = null;
}
t(B$1, v$1);
B$1.prototype[A] = true;
B$1.prototype.removeEventListener = function(a, b2, c, d) {
  hb(this, a, b2, c, d);
};
function C$1(a, b2) {
  var c, d = a.I;
  if (d)
    for (c = []; d; d = d.I)
      c.push(d);
  a = a.P;
  d = b2.type || b2;
  if ("string" === typeof b2)
    b2 = new w(b2, a);
  else if (b2 instanceof w)
    b2.target = b2.target || a;
  else {
    var e = b2;
    b2 = new w(d, a);
    Ta$1(b2, e);
  }
  e = true;
  if (c)
    for (var f = c.length - 1; 0 <= f; f--) {
      var h = b2.g = c[f];
      e = kb(h, d, true, b2) && e;
    }
  h = b2.g = a;
  e = kb(h, d, true, b2) && e;
  e = kb(h, d, false, b2) && e;
  if (c)
    for (f = 0; f < c.length; f++)
      h = b2.g = c[f], e = kb(h, d, false, b2) && e;
}
B$1.prototype.M = function() {
  B$1.X.M.call(this);
  if (this.i) {
    var a = this.i, c;
    for (c in a.g) {
      for (var d = a.g[c], e = 0; e < d.length; e++)
        Pa(d[e]);
      delete a.g[c];
      a.h--;
    }
  }
  this.I = null;
};
B$1.prototype.N = function(a, b2, c, d) {
  return this.i.add(String(a), b2, false, c, d);
};
B$1.prototype.O = function(a, b2, c, d) {
  return this.i.add(String(a), b2, true, c, d);
};
function kb(a, b2, c, d) {
  b2 = a.i.g[String(b2)];
  if (!b2)
    return true;
  b2 = b2.concat();
  for (var e = true, f = 0; f < b2.length; ++f) {
    var h = b2[f];
    if (h && !h.ba && h.capture == c) {
      var n = h.listener, u = h.ha || h.src;
      h.ea && Wa(a.i, h);
      e = false !== n.call(u, d) && e;
    }
  }
  return e && !d.defaultPrevented;
}
var lb = l.JSON.stringify;
function mb() {
  var a = nb;
  let b2 = null;
  a.g && (b2 = a.g, a.g = a.g.next, a.g || (a.h = null), b2.next = null);
  return b2;
}
class ob {
  constructor() {
    this.h = this.g = null;
  }
  add(a, b2) {
    const c = pb.get();
    c.set(a, b2);
    this.h ? this.h.next = c : this.g = c;
    this.h = c;
  }
}
var pb = new class {
  constructor(a, b2) {
    this.i = a;
    this.j = b2;
    this.h = 0;
    this.g = null;
  }
  get() {
    let a;
    0 < this.h ? (this.h--, a = this.g, this.g = a.next, a.next = null) : a = this.i();
    return a;
  }
}(() => new qb(), (a) => a.reset());
class qb {
  constructor() {
    this.next = this.g = this.h = null;
  }
  set(a, b2) {
    this.h = a;
    this.g = b2;
    this.next = null;
  }
  reset() {
    this.next = this.g = this.h = null;
  }
}
function rb(a) {
  l.setTimeout(() => {
    throw a;
  }, 0);
}
function sb(a, b2) {
  ub || vb();
  wb || (ub(), wb = true);
  nb.add(a, b2);
}
var ub;
function vb() {
  var a = l.Promise.resolve(void 0);
  ub = function() {
    a.then(xb);
  };
}
var wb = false, nb = new ob();
function xb() {
  for (var a; a = mb(); ) {
    try {
      a.h.call(a.g);
    } catch (c) {
      rb(c);
    }
    var b2 = pb;
    b2.j(a);
    100 > b2.h && (b2.h++, a.next = b2.g, b2.g = a);
  }
  wb = false;
}
function yb(a, b2) {
  B$1.call(this);
  this.h = a || 1;
  this.g = b2 || l;
  this.j = q$1(this.lb, this);
  this.l = Date.now();
}
t(yb, B$1);
k$1 = yb.prototype;
k$1.ca = false;
k$1.R = null;
k$1.lb = function() {
  if (this.ca) {
    var a = Date.now() - this.l;
    0 < a && a < 0.8 * this.h ? this.R = this.g.setTimeout(this.j, this.h - a) : (this.R && (this.g.clearTimeout(this.R), this.R = null), C$1(this, "tick"), this.ca && (zb(this), this.start()));
  }
};
k$1.start = function() {
  this.ca = true;
  this.R || (this.R = this.g.setTimeout(this.j, this.h), this.l = Date.now());
};
function zb(a) {
  a.ca = false;
  a.R && (a.g.clearTimeout(a.R), a.R = null);
}
k$1.M = function() {
  yb.X.M.call(this);
  zb(this);
  delete this.g;
};
function Ab(a, b2, c) {
  if ("function" === typeof a)
    c && (a = q$1(a, c));
  else if (a && "function" == typeof a.handleEvent)
    a = q$1(a.handleEvent, a);
  else
    throw Error("Invalid listener argument");
  return 2147483647 < Number(b2) ? -1 : l.setTimeout(a, b2 || 0);
}
function Bb(a) {
  a.g = Ab(() => {
    a.g = null;
    a.i && (a.i = false, Bb(a));
  }, a.j);
  const b2 = a.h;
  a.h = null;
  a.m.apply(null, b2);
}
class Cb extends v$1 {
  constructor(a, b2) {
    super();
    this.m = a;
    this.j = b2;
    this.h = null;
    this.i = false;
    this.g = null;
  }
  l(a) {
    this.h = arguments;
    this.g ? this.i = true : Bb(this);
  }
  M() {
    super.M();
    this.g && (l.clearTimeout(this.g), this.g = null, this.i = false, this.h = null);
  }
}
function D(a) {
  v$1.call(this);
  this.h = a;
  this.g = {};
}
t(D, v$1);
var Db = [];
function Eb(a, b2, c, d) {
  Array.isArray(c) || (c && (Db[0] = c.toString()), c = Db);
  for (var e = 0; e < c.length; e++) {
    var f = $a$1(b2, c[e], d || a.handleEvent, false, a.h || a);
    if (!f)
      break;
    a.g[f.key] = f;
  }
}
function Fb(a) {
  Qa(a.g, function(b2, c) {
    this.g.hasOwnProperty(c) && ib(b2);
  }, a);
  a.g = {};
}
D.prototype.M = function() {
  D.X.M.call(this);
  Fb(this);
};
D.prototype.handleEvent = function() {
  throw Error("EventHandler.handleEvent not implemented");
};
function Gb() {
  this.g = true;
}
Gb.prototype.Aa = function() {
  this.g = false;
};
function Hb(a, b2, c, d, e, f) {
  a.info(function() {
    if (a.g)
      if (f) {
        var h = "";
        for (var n = f.split("&"), u = 0; u < n.length; u++) {
          var m = n[u].split("=");
          if (1 < m.length) {
            var r = m[0];
            m = m[1];
            var F = r.split("_");
            h = 2 <= F.length && "type" == F[1] ? h + (r + "=" + m + "&") : h + (r + "=redacted&");
          }
        }
      } else
        h = null;
    else
      h = f;
    return "XMLHTTP REQ (" + d + ") [attempt " + e + "]: " + b2 + "\n" + c + "\n" + h;
  });
}
function Ib(a, b2, c, d, e, f, h) {
  a.info(function() {
    return "XMLHTTP RESP (" + d + ") [ attempt " + e + "]: " + b2 + "\n" + c + "\n" + f + " " + h;
  });
}
function E(a, b2, c, d) {
  a.info(function() {
    return "XMLHTTP TEXT (" + b2 + "): " + Jb(a, c) + (d ? " " + d : "");
  });
}
function Kb(a, b2) {
  a.info(function() {
    return "TIMEOUT: " + b2;
  });
}
Gb.prototype.info = function() {
};
function Jb(a, b2) {
  if (!a.g)
    return b2;
  if (!b2)
    return null;
  try {
    var c = JSON.parse(b2);
    if (c) {
      for (a = 0; a < c.length; a++)
        if (Array.isArray(c[a])) {
          var d = c[a];
          if (!(2 > d.length)) {
            var e = d[1];
            if (Array.isArray(e) && !(1 > e.length)) {
              var f = e[0];
              if ("noop" != f && "stop" != f && "close" != f)
                for (var h = 1; h < e.length; h++)
                  e[h] = "";
            }
          }
        }
    }
    return lb(c);
  } catch (n) {
    return b2;
  }
}
var G$1 = {}, Lb = null;
function Mb() {
  return Lb = Lb || new B$1();
}
G$1.Pa = "serverreachability";
function Nb(a) {
  w.call(this, G$1.Pa, a);
}
t(Nb, w);
function H$1(a) {
  const b2 = Mb();
  C$1(b2, new Nb(b2));
}
G$1.STAT_EVENT = "statevent";
function Ob(a, b2) {
  w.call(this, G$1.STAT_EVENT, a);
  this.stat = b2;
}
t(Ob, w);
function I(a) {
  const b2 = Mb();
  C$1(b2, new Ob(b2, a));
}
G$1.Qa = "timingevent";
function Pb(a, b2) {
  w.call(this, G$1.Qa, a);
  this.size = b2;
}
t(Pb, w);
function J(a, b2) {
  if ("function" !== typeof a)
    throw Error("Fn must not be null and must be a function");
  return l.setTimeout(function() {
    a();
  }, b2);
}
var Qb = { NO_ERROR: 0, mb: 1, zb: 2, yb: 3, tb: 4, xb: 5, Ab: 6, Ma: 7, TIMEOUT: 8, Db: 9 };
var Rb = { rb: "complete", Nb: "success", Na: "error", Ma: "abort", Fb: "ready", Gb: "readystatechange", TIMEOUT: "timeout", Bb: "incrementaldata", Eb: "progress", ub: "downloadprogress", Vb: "uploadprogress" };
function Sb() {
}
Sb.prototype.h = null;
function Tb(a) {
  return a.h || (a.h = a.i());
}
function Ub() {
}
var K$1 = { OPEN: "a", qb: "b", Na: "c", Cb: "d" };
function Vb() {
  w.call(this, "d");
}
t(Vb, w);
function Wb() {
  w.call(this, "c");
}
t(Wb, w);
var Xb;
function Yb() {
}
t(Yb, Sb);
Yb.prototype.g = function() {
  return new XMLHttpRequest();
};
Yb.prototype.i = function() {
  return {};
};
Xb = new Yb();
function L$1(a, b2, c, d) {
  this.l = a;
  this.j = b2;
  this.m = c;
  this.U = d || 1;
  this.S = new D(this);
  this.O = Zb;
  a = ya$1 ? 125 : void 0;
  this.T = new yb(a);
  this.H = null;
  this.i = false;
  this.s = this.A = this.v = this.K = this.F = this.V = this.B = null;
  this.D = [];
  this.g = null;
  this.C = 0;
  this.o = this.u = null;
  this.Y = -1;
  this.I = false;
  this.N = 0;
  this.L = null;
  this.$ = this.J = this.Z = this.P = false;
  this.h = new $b();
}
function $b() {
  this.i = null;
  this.g = "";
  this.h = false;
}
var Zb = 45e3, ac$1 = {}, bc$1 = {};
k$1 = L$1.prototype;
k$1.setTimeout = function(a) {
  this.O = a;
};
function cc$1(a, b2, c) {
  a.K = 1;
  a.v = dc$1(M$1(b2));
  a.s = c;
  a.P = true;
  ec$1(a, null);
}
function ec$1(a, b2) {
  a.F = Date.now();
  N$1(a);
  a.A = M$1(a.v);
  var c = a.A, d = a.U;
  Array.isArray(d) || (d = [String(d)]);
  fc$1(c.i, "t", d);
  a.C = 0;
  c = a.l.H;
  a.h = new $b();
  a.g = gc(a.l, c ? b2 : null, !a.s);
  0 < a.N && (a.L = new Cb(q$1(a.La, a, a.g), a.N));
  Eb(a.S, a.g, "readystatechange", a.ib);
  b2 = a.H ? Ra(a.H) : {};
  a.s ? (a.u || (a.u = "POST"), b2["Content-Type"] = "application/x-www-form-urlencoded", a.g.da(a.A, a.u, a.s, b2)) : (a.u = "GET", a.g.da(a.A, a.u, null, b2));
  H$1();
  Hb(a.j, a.u, a.A, a.m, a.U, a.s);
}
k$1.ib = function(a) {
  a = a.target;
  const b2 = this.L;
  b2 && 3 == O$1(a) ? b2.l() : this.La(a);
};
k$1.La = function(a) {
  try {
    if (a == this.g)
      a: {
        const r = O$1(this.g);
        var b2 = this.g.Ea();
        const F = this.g.aa();
        if (!(3 > r) && (3 != r || ya$1 || this.g && (this.h.h || this.g.fa() || hc$1(this.g)))) {
          this.I || 4 != r || 7 == b2 || (8 == b2 || 0 >= F ? H$1(3) : H$1(2));
          ic$1(this);
          var c = this.g.aa();
          this.Y = c;
          b:
            if (jc(this)) {
              var d = hc$1(this.g);
              a = "";
              var e = d.length, f = 4 == O$1(this.g);
              if (!this.h.i) {
                if ("undefined" === typeof TextDecoder) {
                  P$1(this);
                  Q$1(this);
                  var h = "";
                  break b;
                }
                this.h.i = new l.TextDecoder();
              }
              for (b2 = 0; b2 < e; b2++)
                this.h.h = true, a += this.h.i.decode(d[b2], { stream: f && b2 == e - 1 });
              d.splice(
                0,
                e
              );
              this.h.g += a;
              this.C = 0;
              h = this.h.g;
            } else
              h = this.g.fa();
          this.i = 200 == c;
          Ib(this.j, this.u, this.A, this.m, this.U, r, c);
          if (this.i) {
            if (this.Z && !this.J) {
              b: {
                if (this.g) {
                  var n, u = this.g;
                  if ((n = u.g ? u.g.getResponseHeader("X-HTTP-Initial-Response") : null) && !pa$1(n)) {
                    var m = n;
                    break b;
                  }
                }
                m = null;
              }
              if (c = m)
                E(this.j, this.m, c, "Initial handshake response via X-HTTP-Initial-Response"), this.J = true, kc(this, c);
              else {
                this.i = false;
                this.o = 3;
                I(12);
                P$1(this);
                Q$1(this);
                break a;
              }
            }
            this.P ? (lc$1(this, r, h), ya$1 && this.i && 3 == r && (Eb(this.S, this.T, "tick", this.hb), this.T.start())) : (E(this.j, this.m, h, null), kc(this, h));
            4 == r && P$1(this);
            this.i && !this.I && (4 == r ? mc(this.l, this) : (this.i = false, N$1(this)));
          } else
            400 == c && 0 < h.indexOf("Unknown SID") ? (this.o = 3, I(12)) : (this.o = 0, I(13)), P$1(this), Q$1(this);
        }
      }
  } catch (r) {
  } finally {
  }
};
function jc(a) {
  return a.g ? "GET" == a.u && 2 != a.K && a.l.Da : false;
}
function lc$1(a, b2, c) {
  let d = true, e;
  for (; !a.I && a.C < c.length; )
    if (e = nc$1(a, c), e == bc$1) {
      4 == b2 && (a.o = 4, I(14), d = false);
      E(a.j, a.m, null, "[Incomplete Response]");
      break;
    } else if (e == ac$1) {
      a.o = 4;
      I(15);
      E(a.j, a.m, c, "[Invalid Chunk]");
      d = false;
      break;
    } else
      E(a.j, a.m, e, null), kc(a, e);
  jc(a) && e != bc$1 && e != ac$1 && (a.h.g = "", a.C = 0);
  4 != b2 || 0 != c.length || a.h.h || (a.o = 1, I(16), d = false);
  a.i = a.i && d;
  d ? 0 < c.length && !a.$ && (a.$ = true, b2 = a.l, b2.g == a && b2.$ && !b2.K && (b2.j.info("Great, no buffering proxy detected. Bytes received: " + c.length), oc$1(b2), b2.K = true, I(11))) : (E(
    a.j,
    a.m,
    c,
    "[Invalid Chunked Response]"
  ), P$1(a), Q$1(a));
}
k$1.hb = function() {
  if (this.g) {
    var a = O$1(this.g), b2 = this.g.fa();
    this.C < b2.length && (ic$1(this), lc$1(this, a, b2), this.i && 4 != a && N$1(this));
  }
};
function nc$1(a, b2) {
  var c = a.C, d = b2.indexOf("\n", c);
  if (-1 == d)
    return bc$1;
  c = Number(b2.substring(c, d));
  if (isNaN(c))
    return ac$1;
  d += 1;
  if (d + c > b2.length)
    return bc$1;
  b2 = b2.substr(d, c);
  a.C = d + c;
  return b2;
}
k$1.cancel = function() {
  this.I = true;
  P$1(this);
};
function N$1(a) {
  a.V = Date.now() + a.O;
  pc$1(a, a.O);
}
function pc$1(a, b2) {
  if (null != a.B)
    throw Error("WatchDog timer not null");
  a.B = J(q$1(a.gb, a), b2);
}
function ic$1(a) {
  a.B && (l.clearTimeout(a.B), a.B = null);
}
k$1.gb = function() {
  this.B = null;
  const a = Date.now();
  0 <= a - this.V ? (Kb(this.j, this.A), 2 != this.K && (H$1(), I(17)), P$1(this), this.o = 2, Q$1(this)) : pc$1(this, this.V - a);
};
function Q$1(a) {
  0 == a.l.G || a.I || mc(a.l, a);
}
function P$1(a) {
  ic$1(a);
  var b2 = a.L;
  b2 && "function" == typeof b2.na && b2.na();
  a.L = null;
  zb(a.T);
  Fb(a.S);
  a.g && (b2 = a.g, a.g = null, b2.abort(), b2.na());
}
function kc(a, b2) {
  try {
    var c = a.l;
    if (0 != c.G && (c.g == a || qc$1(c.h, a))) {
      if (!a.J && qc$1(c.h, a) && 3 == c.G) {
        try {
          var d = c.Fa.g.parse(b2);
        } catch (m) {
          d = null;
        }
        if (Array.isArray(d) && 3 == d.length) {
          var e = d;
          if (0 == e[0])
            a: {
              if (!c.u) {
                if (c.g)
                  if (c.g.F + 3e3 < a.F)
                    rc$1(c), sc$1(c);
                  else
                    break a;
                tc$1(c);
                I(18);
              }
            }
          else
            c.Ba = e[1], 0 < c.Ba - c.T && 37500 > e[2] && c.L && 0 == c.A && !c.v && (c.v = J(q$1(c.cb, c), 6e3));
          if (1 >= uc$1(c.h) && c.ja) {
            try {
              c.ja();
            } catch (m) {
            }
            c.ja = void 0;
          }
        } else
          R(c, 11);
      } else if ((a.J || c.g == a) && rc$1(c), !pa$1(b2))
        for (e = c.Fa.g.parse(b2), b2 = 0; b2 < e.length; b2++) {
          let m = e[b2];
          c.T = m[0];
          m = m[1];
          if (2 == c.G)
            if ("c" == m[0]) {
              c.I = m[1];
              c.ka = m[2];
              const r = m[3];
              null != r && (c.ma = r, c.j.info("VER=" + c.ma));
              const F = m[4];
              null != F && (c.Ca = F, c.j.info("SVER=" + c.Ca));
              const Ca = m[5];
              null != Ca && "number" === typeof Ca && 0 < Ca && (d = 1.5 * Ca, c.J = d, c.j.info("backChannelRequestTimeoutMs_=" + d));
              d = c;
              const Z2 = a.g;
              if (Z2) {
                const Da = Z2.g ? Z2.g.getResponseHeader("X-Client-Wire-Protocol") : null;
                if (Da) {
                  var f = d.h;
                  f.g || -1 == Da.indexOf("spdy") && -1 == Da.indexOf("quic") && -1 == Da.indexOf("h2") || (f.j = f.l, f.g = /* @__PURE__ */ new Set(), f.h && (vc$1(f, f.h), f.h = null));
                }
                if (d.D) {
                  const tb = Z2.g ? Z2.g.getResponseHeader("X-HTTP-Session-Id") : null;
                  tb && (d.za = tb, S$1(d.F, d.D, tb));
                }
              }
              c.G = 3;
              c.l && c.l.xa();
              c.$ && (c.P = Date.now() - a.F, c.j.info("Handshake RTT: " + c.P + "ms"));
              d = c;
              var h = a;
              d.sa = wc(d, d.H ? d.ka : null, d.V);
              if (h.J) {
                xc$1(d.h, h);
                var n = h, u = d.J;
                u && n.setTimeout(u);
                n.B && (ic$1(n), N$1(n));
                d.g = h;
              } else
                yc(d);
              0 < c.i.length && zc(c);
            } else
              "stop" != m[0] && "close" != m[0] || R(c, 7);
          else
            3 == c.G && ("stop" == m[0] || "close" == m[0] ? "stop" == m[0] ? R(c, 7) : Ac$1(c) : "noop" != m[0] && c.l && c.l.wa(m), c.A = 0);
        }
    }
    H$1(4);
  } catch (m) {
  }
}
function Bc$1(a) {
  if (a.W && "function" == typeof a.W)
    return a.W();
  if ("undefined" !== typeof Map && a instanceof Map || "undefined" !== typeof Set && a instanceof Set)
    return Array.from(a.values());
  if ("string" === typeof a)
    return a.split("");
  if (ba(a)) {
    for (var b2 = [], c = a.length, d = 0; d < c; d++)
      b2.push(a[d]);
    return b2;
  }
  b2 = [];
  c = 0;
  for (d in a)
    b2[c++] = a[d];
  return b2;
}
function Cc$1(a) {
  if (a.oa && "function" == typeof a.oa)
    return a.oa();
  if (!a.W || "function" != typeof a.W) {
    if ("undefined" !== typeof Map && a instanceof Map)
      return Array.from(a.keys());
    if (!("undefined" !== typeof Set && a instanceof Set)) {
      if (ba(a) || "string" === typeof a) {
        var b2 = [];
        a = a.length;
        for (var c = 0; c < a; c++)
          b2.push(c);
        return b2;
      }
      b2 = [];
      c = 0;
      for (const d in a)
        b2[c++] = d;
      return b2;
    }
  }
}
function Dc$1(a, b2) {
  if (a.forEach && "function" == typeof a.forEach)
    a.forEach(b2, void 0);
  else if (ba(a) || "string" === typeof a)
    Array.prototype.forEach.call(a, b2, void 0);
  else
    for (var c = Cc$1(a), d = Bc$1(a), e = d.length, f = 0; f < e; f++)
      b2.call(void 0, d[f], c && c[f], a);
}
var Ec$1 = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
function Fc$1(a, b2) {
  if (a) {
    a = a.split("&");
    for (var c = 0; c < a.length; c++) {
      var d = a[c].indexOf("="), e = null;
      if (0 <= d) {
        var f = a[c].substring(0, d);
        e = a[c].substring(d + 1);
      } else
        f = a[c];
      b2(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
    }
  }
}
function T(a, b2) {
  this.g = this.s = this.j = "";
  this.m = null;
  this.o = this.l = "";
  this.h = false;
  if (a instanceof T) {
    this.h = void 0 !== b2 ? b2 : a.h;
    Gc$1(this, a.j);
    this.s = a.s;
    this.g = a.g;
    Hc(this, a.m);
    this.l = a.l;
    b2 = a.i;
    var c = new Ic$1();
    c.i = b2.i;
    b2.g && (c.g = new Map(b2.g), c.h = b2.h);
    Jc(this, c);
    this.o = a.o;
  } else
    a && (c = String(a).match(Ec$1)) ? (this.h = !!b2, Gc$1(this, c[1] || "", true), this.s = Kc$1(c[2] || ""), this.g = Kc$1(c[3] || "", true), Hc(this, c[4]), this.l = Kc$1(c[5] || "", true), Jc(this, c[6] || "", true), this.o = Kc$1(c[7] || "")) : (this.h = !!b2, this.i = new Ic$1(null, this.h));
}
T.prototype.toString = function() {
  var a = [], b2 = this.j;
  b2 && a.push(Lc$1(b2, Mc$1, true), ":");
  var c = this.g;
  if (c || "file" == b2)
    a.push("//"), (b2 = this.s) && a.push(Lc$1(b2, Mc$1, true), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.m, null != c && a.push(":", String(c));
  if (c = this.l)
    this.g && "/" != c.charAt(0) && a.push("/"), a.push(Lc$1(c, "/" == c.charAt(0) ? Nc$1 : Oc$1, true));
  (c = this.i.toString()) && a.push("?", c);
  (c = this.o) && a.push("#", Lc$1(c, Pc$1));
  return a.join("");
};
function M$1(a) {
  return new T(a);
}
function Gc$1(a, b2, c) {
  a.j = c ? Kc$1(b2, true) : b2;
  a.j && (a.j = a.j.replace(/:$/, ""));
}
function Hc(a, b2) {
  if (b2) {
    b2 = Number(b2);
    if (isNaN(b2) || 0 > b2)
      throw Error("Bad port number " + b2);
    a.m = b2;
  } else
    a.m = null;
}
function Jc(a, b2, c) {
  b2 instanceof Ic$1 ? (a.i = b2, Qc(a.i, a.h)) : (c || (b2 = Lc$1(b2, Rc$1)), a.i = new Ic$1(b2, a.h));
}
function S$1(a, b2, c) {
  a.i.set(b2, c);
}
function dc$1(a) {
  S$1(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36));
  return a;
}
function Kc$1(a, b2) {
  return a ? b2 ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : "";
}
function Lc$1(a, b2, c) {
  return "string" === typeof a ? (a = encodeURI(a).replace(b2, Sc$1), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null;
}
function Sc$1(a) {
  a = a.charCodeAt(0);
  return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
}
var Mc$1 = /[#\/\?@]/g, Oc$1 = /[#\?:]/g, Nc$1 = /[#\?]/g, Rc$1 = /[#\?@]/g, Pc$1 = /#/g;
function Ic$1(a, b2) {
  this.h = this.g = null;
  this.i = a || null;
  this.j = !!b2;
}
function U$1(a) {
  a.g || (a.g = /* @__PURE__ */ new Map(), a.h = 0, a.i && Fc$1(a.i, function(b2, c) {
    a.add(decodeURIComponent(b2.replace(/\+/g, " ")), c);
  }));
}
k$1 = Ic$1.prototype;
k$1.add = function(a, b2) {
  U$1(this);
  this.i = null;
  a = V$1(this, a);
  var c = this.g.get(a);
  c || this.g.set(a, c = []);
  c.push(b2);
  this.h += 1;
  return this;
};
function Tc$1(a, b2) {
  U$1(a);
  b2 = V$1(a, b2);
  a.g.has(b2) && (a.i = null, a.h -= a.g.get(b2).length, a.g.delete(b2));
}
function Uc$1(a, b2) {
  U$1(a);
  b2 = V$1(a, b2);
  return a.g.has(b2);
}
k$1.forEach = function(a, b2) {
  U$1(this);
  this.g.forEach(function(c, d) {
    c.forEach(function(e) {
      a.call(b2, e, d, this);
    }, this);
  }, this);
};
k$1.oa = function() {
  U$1(this);
  const a = Array.from(this.g.values()), b2 = Array.from(this.g.keys()), c = [];
  for (let d = 0; d < b2.length; d++) {
    const e = a[d];
    for (let f = 0; f < e.length; f++)
      c.push(b2[d]);
  }
  return c;
};
k$1.W = function(a) {
  U$1(this);
  let b2 = [];
  if ("string" === typeof a)
    Uc$1(this, a) && (b2 = b2.concat(this.g.get(V$1(this, a))));
  else {
    a = Array.from(this.g.values());
    for (let c = 0; c < a.length; c++)
      b2 = b2.concat(a[c]);
  }
  return b2;
};
k$1.set = function(a, b2) {
  U$1(this);
  this.i = null;
  a = V$1(this, a);
  Uc$1(this, a) && (this.h -= this.g.get(a).length);
  this.g.set(a, [b2]);
  this.h += 1;
  return this;
};
k$1.get = function(a, b2) {
  if (!a)
    return b2;
  a = this.W(a);
  return 0 < a.length ? String(a[0]) : b2;
};
function fc$1(a, b2, c) {
  Tc$1(a, b2);
  0 < c.length && (a.i = null, a.g.set(V$1(a, b2), ma$1(c)), a.h += c.length);
}
k$1.toString = function() {
  if (this.i)
    return this.i;
  if (!this.g)
    return "";
  const a = [], b2 = Array.from(this.g.keys());
  for (var c = 0; c < b2.length; c++) {
    var d = b2[c];
    const f = encodeURIComponent(String(d)), h = this.W(d);
    for (d = 0; d < h.length; d++) {
      var e = f;
      "" !== h[d] && (e += "=" + encodeURIComponent(String(h[d])));
      a.push(e);
    }
  }
  return this.i = a.join("&");
};
function V$1(a, b2) {
  b2 = String(b2);
  a.j && (b2 = b2.toLowerCase());
  return b2;
}
function Qc(a, b2) {
  b2 && !a.j && (U$1(a), a.i = null, a.g.forEach(function(c, d) {
    var e = d.toLowerCase();
    d != e && (Tc$1(this, d), fc$1(this, e, c));
  }, a));
  a.j = b2;
}
var Vc$1 = class {
  constructor(a, b2) {
    this.h = a;
    this.g = b2;
  }
};
function Wc(a) {
  this.l = a || Xc;
  l.PerformanceNavigationTiming ? (a = l.performance.getEntriesByType("navigation"), a = 0 < a.length && ("hq" == a[0].nextHopProtocol || "h2" == a[0].nextHopProtocol)) : a = !!(l.g && l.g.Ga && l.g.Ga() && l.g.Ga().$b);
  this.j = a ? this.l : 1;
  this.g = null;
  1 < this.j && (this.g = /* @__PURE__ */ new Set());
  this.h = null;
  this.i = [];
}
var Xc = 10;
function Yc(a) {
  return a.h ? true : a.g ? a.g.size >= a.j : false;
}
function uc$1(a) {
  return a.h ? 1 : a.g ? a.g.size : 0;
}
function qc$1(a, b2) {
  return a.h ? a.h == b2 : a.g ? a.g.has(b2) : false;
}
function vc$1(a, b2) {
  a.g ? a.g.add(b2) : a.h = b2;
}
function xc$1(a, b2) {
  a.h && a.h == b2 ? a.h = null : a.g && a.g.has(b2) && a.g.delete(b2);
}
Wc.prototype.cancel = function() {
  this.i = Zc(this);
  if (this.h)
    this.h.cancel(), this.h = null;
  else if (this.g && 0 !== this.g.size) {
    for (const a of this.g.values())
      a.cancel();
    this.g.clear();
  }
};
function Zc(a) {
  if (null != a.h)
    return a.i.concat(a.h.D);
  if (null != a.g && 0 !== a.g.size) {
    let b2 = a.i;
    for (const c of a.g.values())
      b2 = b2.concat(c.D);
    return b2;
  }
  return ma$1(a.i);
}
function $c$1() {
}
$c$1.prototype.stringify = function(a) {
  return l.JSON.stringify(a, void 0);
};
$c$1.prototype.parse = function(a) {
  return l.JSON.parse(a, void 0);
};
function ad() {
  this.g = new $c$1();
}
function bd(a, b2, c) {
  const d = c || "";
  try {
    Dc$1(a, function(e, f) {
      let h = e;
      p(e) && (h = lb(e));
      b2.push(d + f + "=" + encodeURIComponent(h));
    });
  } catch (e) {
    throw b2.push(d + "type=" + encodeURIComponent("_badmap")), e;
  }
}
function cd(a, b2) {
  const c = new Gb();
  if (l.Image) {
    const d = new Image();
    d.onload = ia(dd, c, d, "TestLoadImage: loaded", true, b2);
    d.onerror = ia(dd, c, d, "TestLoadImage: error", false, b2);
    d.onabort = ia(dd, c, d, "TestLoadImage: abort", false, b2);
    d.ontimeout = ia(dd, c, d, "TestLoadImage: timeout", false, b2);
    l.setTimeout(function() {
      if (d.ontimeout)
        d.ontimeout();
    }, 1e4);
    d.src = a;
  } else
    b2(false);
}
function dd(a, b2, c, d, e) {
  try {
    b2.onload = null, b2.onerror = null, b2.onabort = null, b2.ontimeout = null, e(d);
  } catch (f) {
  }
}
function ed(a) {
  this.l = a.ac || null;
  this.j = a.jb || false;
}
t(ed, Sb);
ed.prototype.g = function() {
  return new fd(this.l, this.j);
};
ed.prototype.i = function(a) {
  return function() {
    return a;
  };
}({});
function fd(a, b2) {
  B$1.call(this);
  this.D = a;
  this.u = b2;
  this.m = void 0;
  this.readyState = gd;
  this.status = 0;
  this.responseType = this.responseText = this.response = this.statusText = "";
  this.onreadystatechange = null;
  this.v = new Headers();
  this.h = null;
  this.C = "GET";
  this.B = "";
  this.g = false;
  this.A = this.j = this.l = null;
}
t(fd, B$1);
var gd = 0;
k$1 = fd.prototype;
k$1.open = function(a, b2) {
  if (this.readyState != gd)
    throw this.abort(), Error("Error reopening a connection");
  this.C = a;
  this.B = b2;
  this.readyState = 1;
  hd(this);
};
k$1.send = function(a) {
  if (1 != this.readyState)
    throw this.abort(), Error("need to call open() first. ");
  this.g = true;
  const b2 = { headers: this.v, method: this.C, credentials: this.m, cache: void 0 };
  a && (b2.body = a);
  (this.D || l).fetch(new Request(this.B, b2)).then(this.Wa.bind(this), this.ga.bind(this));
};
k$1.abort = function() {
  this.response = this.responseText = "";
  this.v = new Headers();
  this.status = 0;
  this.j && this.j.cancel("Request was aborted.").catch(() => {
  });
  1 <= this.readyState && this.g && 4 != this.readyState && (this.g = false, id(this));
  this.readyState = gd;
};
k$1.Wa = function(a) {
  if (this.g && (this.l = a, this.h || (this.status = this.l.status, this.statusText = this.l.statusText, this.h = a.headers, this.readyState = 2, hd(this)), this.g && (this.readyState = 3, hd(this), this.g)))
    if ("arraybuffer" === this.responseType)
      a.arrayBuffer().then(this.Ua.bind(this), this.ga.bind(this));
    else if ("undefined" !== typeof l.ReadableStream && "body" in a) {
      this.j = a.body.getReader();
      if (this.u) {
        if (this.responseType)
          throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');
        this.response = [];
      } else
        this.response = this.responseText = "", this.A = new TextDecoder();
      jd(this);
    } else
      a.text().then(this.Va.bind(this), this.ga.bind(this));
};
function jd(a) {
  a.j.read().then(a.Ta.bind(a)).catch(a.ga.bind(a));
}
k$1.Ta = function(a) {
  if (this.g) {
    if (this.u && a.value)
      this.response.push(a.value);
    else if (!this.u) {
      var b2 = a.value ? a.value : new Uint8Array(0);
      if (b2 = this.A.decode(b2, { stream: !a.done }))
        this.response = this.responseText += b2;
    }
    a.done ? id(this) : hd(this);
    3 == this.readyState && jd(this);
  }
};
k$1.Va = function(a) {
  this.g && (this.response = this.responseText = a, id(this));
};
k$1.Ua = function(a) {
  this.g && (this.response = a, id(this));
};
k$1.ga = function() {
  this.g && id(this);
};
function id(a) {
  a.readyState = 4;
  a.l = null;
  a.j = null;
  a.A = null;
  hd(a);
}
k$1.setRequestHeader = function(a, b2) {
  this.v.append(a, b2);
};
k$1.getResponseHeader = function(a) {
  return this.h ? this.h.get(a.toLowerCase()) || "" : "";
};
k$1.getAllResponseHeaders = function() {
  if (!this.h)
    return "";
  const a = [], b2 = this.h.entries();
  for (var c = b2.next(); !c.done; )
    c = c.value, a.push(c[0] + ": " + c[1]), c = b2.next();
  return a.join("\r\n");
};
function hd(a) {
  a.onreadystatechange && a.onreadystatechange.call(a);
}
Object.defineProperty(fd.prototype, "withCredentials", { get: function() {
  return "include" === this.m;
}, set: function(a) {
  this.m = a ? "include" : "same-origin";
} });
var kd = l.JSON.parse;
function W$1(a) {
  B$1.call(this);
  this.headers = /* @__PURE__ */ new Map();
  this.u = a || null;
  this.h = false;
  this.C = this.g = null;
  this.H = "";
  this.m = 0;
  this.j = "";
  this.l = this.F = this.v = this.D = false;
  this.B = 0;
  this.A = null;
  this.J = ld;
  this.K = this.L = false;
}
t(W$1, B$1);
var ld = "", md = /^https?$/i, nd = ["POST", "PUT"];
k$1 = W$1.prototype;
k$1.Ka = function(a) {
  this.L = a;
};
k$1.da = function(a, b2, c, d) {
  if (this.g)
    throw Error("[goog.net.XhrIo] Object is active with another request=" + this.H + "; newUri=" + a);
  b2 = b2 ? b2.toUpperCase() : "GET";
  this.H = a;
  this.j = "";
  this.m = 0;
  this.D = false;
  this.h = true;
  this.g = this.u ? this.u.g() : Xb.g();
  this.C = this.u ? Tb(this.u) : Tb(Xb);
  this.g.onreadystatechange = q$1(this.Ha, this);
  try {
    this.F = true, this.g.open(b2, String(a), true), this.F = false;
  } catch (f) {
    od(this, f);
    return;
  }
  a = c || "";
  c = new Map(this.headers);
  if (d)
    if (Object.getPrototypeOf(d) === Object.prototype)
      for (var e in d)
        c.set(e, d[e]);
    else if ("function" === typeof d.keys && "function" === typeof d.get)
      for (const f of d.keys())
        c.set(f, d.get(f));
    else
      throw Error("Unknown input type for opt_headers: " + String(d));
  d = Array.from(c.keys()).find((f) => "content-type" == f.toLowerCase());
  e = l.FormData && a instanceof l.FormData;
  !(0 <= la$1(nd, b2)) || d || e || c.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  for (const [f, h] of c)
    this.g.setRequestHeader(f, h);
  this.J && (this.g.responseType = this.J);
  "withCredentials" in this.g && this.g.withCredentials !== this.L && (this.g.withCredentials = this.L);
  try {
    pd(this), 0 < this.B && ((this.K = qd(this.g)) ? (this.g.timeout = this.B, this.g.ontimeout = q$1(this.qa, this)) : this.A = Ab(this.qa, this.B, this)), this.v = true, this.g.send(a), this.v = false;
  } catch (f) {
    od(this, f);
  }
};
function qd(a) {
  return y && Ia$1() && "number" === typeof a.timeout && void 0 !== a.ontimeout;
}
k$1.qa = function() {
  "undefined" != typeof goog && this.g && (this.j = "Timed out after " + this.B + "ms, aborting", this.m = 8, C$1(this, "timeout"), this.abort(8));
};
function od(a, b2) {
  a.h = false;
  a.g && (a.l = true, a.g.abort(), a.l = false);
  a.j = b2;
  a.m = 5;
  rd(a);
  sd(a);
}
function rd(a) {
  a.D || (a.D = true, C$1(a, "complete"), C$1(a, "error"));
}
k$1.abort = function(a) {
  this.g && this.h && (this.h = false, this.l = true, this.g.abort(), this.l = false, this.m = a || 7, C$1(this, "complete"), C$1(this, "abort"), sd(this));
};
k$1.M = function() {
  this.g && (this.h && (this.h = false, this.l = true, this.g.abort(), this.l = false), sd(this, true));
  W$1.X.M.call(this);
};
k$1.Ha = function() {
  this.s || (this.F || this.v || this.l ? td(this) : this.fb());
};
k$1.fb = function() {
  td(this);
};
function td(a) {
  if (a.h && "undefined" != typeof goog && (!a.C[1] || 4 != O$1(a) || 2 != a.aa())) {
    if (a.v && 4 == O$1(a))
      Ab(a.Ha, 0, a);
    else if (C$1(a, "readystatechange"), 4 == O$1(a)) {
      a.h = false;
      try {
        const n = a.aa();
        a:
          switch (n) {
            case 200:
            case 201:
            case 202:
            case 204:
            case 206:
            case 304:
            case 1223:
              var b2 = true;
              break a;
            default:
              b2 = false;
          }
        var c;
        if (!(c = b2)) {
          var d;
          if (d = 0 === n) {
            var e = String(a.H).match(Ec$1)[1] || null;
            if (!e && l.self && l.self.location) {
              var f = l.self.location.protocol;
              e = f.substr(0, f.length - 1);
            }
            d = !md.test(e ? e.toLowerCase() : "");
          }
          c = d;
        }
        if (c)
          C$1(a, "complete"), C$1(
            a,
            "success"
          );
        else {
          a.m = 6;
          try {
            var h = 2 < O$1(a) ? a.g.statusText : "";
          } catch (u) {
            h = "";
          }
          a.j = h + " [" + a.aa() + "]";
          rd(a);
        }
      } finally {
        sd(a);
      }
    }
  }
}
function sd(a, b2) {
  if (a.g) {
    pd(a);
    const c = a.g, d = a.C[0] ? aa$1 : null;
    a.g = null;
    a.C = null;
    b2 || C$1(a, "ready");
    try {
      c.onreadystatechange = d;
    } catch (e) {
    }
  }
}
function pd(a) {
  a.g && a.K && (a.g.ontimeout = null);
  a.A && (l.clearTimeout(a.A), a.A = null);
}
function O$1(a) {
  return a.g ? a.g.readyState : 0;
}
k$1.aa = function() {
  try {
    return 2 < O$1(this) ? this.g.status : -1;
  } catch (a) {
    return -1;
  }
};
k$1.fa = function() {
  try {
    return this.g ? this.g.responseText : "";
  } catch (a) {
    return "";
  }
};
k$1.Sa = function(a) {
  if (this.g) {
    var b2 = this.g.responseText;
    a && 0 == b2.indexOf(a) && (b2 = b2.substring(a.length));
    return kd(b2);
  }
};
function hc$1(a) {
  try {
    if (!a.g)
      return null;
    if ("response" in a.g)
      return a.g.response;
    switch (a.J) {
      case ld:
      case "text":
        return a.g.responseText;
      case "arraybuffer":
        if ("mozResponseArrayBuffer" in a.g)
          return a.g.mozResponseArrayBuffer;
    }
    return null;
  } catch (b2) {
    return null;
  }
}
k$1.Ea = function() {
  return this.m;
};
k$1.Oa = function() {
  return "string" === typeof this.j ? this.j : String(this.j);
};
function ud(a) {
  let b2 = "";
  Qa(a, function(c, d) {
    b2 += d;
    b2 += ":";
    b2 += c;
    b2 += "\r\n";
  });
  return b2;
}
function vd(a, b2, c) {
  a: {
    for (d in c) {
      var d = false;
      break a;
    }
    d = true;
  }
  d || (c = ud(c), "string" === typeof a ? null != c && encodeURIComponent(String(c)) : S$1(a, b2, c));
}
function wd(a, b2, c) {
  return c && c.internalChannelParams ? c.internalChannelParams[a] || b2 : b2;
}
function xd(a) {
  this.Ca = 0;
  this.i = [];
  this.j = new Gb();
  this.ka = this.sa = this.F = this.V = this.g = this.za = this.D = this.ia = this.o = this.S = this.s = null;
  this.ab = this.U = 0;
  this.Za = wd("failFast", false, a);
  this.L = this.v = this.u = this.m = this.l = null;
  this.Y = true;
  this.pa = this.Ba = this.T = -1;
  this.Z = this.A = this.C = 0;
  this.Xa = wd("baseRetryDelayMs", 5e3, a);
  this.bb = wd("retryDelaySeedMs", 1e4, a);
  this.$a = wd("forwardChannelMaxRetries", 2, a);
  this.ta = wd("forwardChannelRequestTimeoutMs", 2e4, a);
  this.ra = a && a.xmlHttpFactory || void 0;
  this.Da = a && a.Zb || false;
  this.J = void 0;
  this.H = a && a.supportsCrossDomainXhr || false;
  this.I = "";
  this.h = new Wc(a && a.concurrentRequestLimit);
  this.Fa = new ad();
  this.O = a && a.fastHandshake || false;
  this.N = a && a.encodeInitMessageHeaders || false;
  this.O && this.N && (this.N = false);
  this.Ya = a && a.Xb || false;
  a && a.Aa && this.j.Aa();
  a && a.forceLongPolling && (this.Y = false);
  this.$ = !this.O && this.Y && a && a.detectBufferingProxy || false;
  this.ja = void 0;
  this.P = 0;
  this.K = false;
  this.la = this.B = null;
}
k$1 = xd.prototype;
k$1.ma = 8;
k$1.G = 1;
function Ac$1(a) {
  yd(a);
  if (3 == a.G) {
    var b2 = a.U++, c = M$1(a.F);
    S$1(c, "SID", a.I);
    S$1(c, "RID", b2);
    S$1(c, "TYPE", "terminate");
    zd(a, c);
    b2 = new L$1(a, a.j, b2, void 0);
    b2.K = 2;
    b2.v = dc$1(M$1(c));
    c = false;
    l.navigator && l.navigator.sendBeacon && (c = l.navigator.sendBeacon(b2.v.toString(), ""));
    !c && l.Image && (new Image().src = b2.v, c = true);
    c || (b2.g = gc(b2.l, null), b2.g.da(b2.v));
    b2.F = Date.now();
    N$1(b2);
  }
  Ad(a);
}
function sc$1(a) {
  a.g && (oc$1(a), a.g.cancel(), a.g = null);
}
function yd(a) {
  sc$1(a);
  a.u && (l.clearTimeout(a.u), a.u = null);
  rc$1(a);
  a.h.cancel();
  a.m && ("number" === typeof a.m && l.clearTimeout(a.m), a.m = null);
}
function zc(a) {
  Yc(a.h) || a.m || (a.m = true, sb(a.Ja, a), a.C = 0);
}
function Bd(a, b2) {
  if (uc$1(a.h) >= a.h.j - (a.m ? 1 : 0))
    return false;
  if (a.m)
    return a.i = b2.D.concat(a.i), true;
  if (1 == a.G || 2 == a.G || a.C >= (a.Za ? 0 : a.$a))
    return false;
  a.m = J(q$1(a.Ja, a, b2), Cd(a, a.C));
  a.C++;
  return true;
}
k$1.Ja = function(a) {
  if (this.m)
    if (this.m = null, 1 == this.G) {
      if (!a) {
        this.U = Math.floor(1e5 * Math.random());
        a = this.U++;
        const e = new L$1(this, this.j, a, void 0);
        let f = this.s;
        this.S && (f ? (f = Ra(f), Ta$1(f, this.S)) : f = this.S);
        null !== this.o || this.N || (e.H = f, f = null);
        if (this.O)
          a: {
            var b2 = 0;
            for (var c = 0; c < this.i.length; c++) {
              b: {
                var d = this.i[c];
                if ("__data__" in d.g && (d = d.g.__data__, "string" === typeof d)) {
                  d = d.length;
                  break b;
                }
                d = void 0;
              }
              if (void 0 === d)
                break;
              b2 += d;
              if (4096 < b2) {
                b2 = c;
                break a;
              }
              if (4096 === b2 || c === this.i.length - 1) {
                b2 = c + 1;
                break a;
              }
            }
            b2 = 1e3;
          }
        else
          b2 = 1e3;
        b2 = Dd(this, e, b2);
        c = M$1(this.F);
        S$1(c, "RID", a);
        S$1(c, "CVER", 22);
        this.D && S$1(c, "X-HTTP-Session-Id", this.D);
        zd(this, c);
        f && (this.N ? b2 = "headers=" + encodeURIComponent(String(ud(f))) + "&" + b2 : this.o && vd(c, this.o, f));
        vc$1(this.h, e);
        this.Ya && S$1(c, "TYPE", "init");
        this.O ? (S$1(c, "$req", b2), S$1(c, "SID", "null"), e.Z = true, cc$1(e, c, null)) : cc$1(e, c, b2);
        this.G = 2;
      }
    } else
      3 == this.G && (a ? Ed(this, a) : 0 == this.i.length || Yc(this.h) || Ed(this));
};
function Ed(a, b2) {
  var c;
  b2 ? c = b2.m : c = a.U++;
  const d = M$1(a.F);
  S$1(d, "SID", a.I);
  S$1(d, "RID", c);
  S$1(d, "AID", a.T);
  zd(a, d);
  a.o && a.s && vd(d, a.o, a.s);
  c = new L$1(a, a.j, c, a.C + 1);
  null === a.o && (c.H = a.s);
  b2 && (a.i = b2.D.concat(a.i));
  b2 = Dd(a, c, 1e3);
  c.setTimeout(Math.round(0.5 * a.ta) + Math.round(0.5 * a.ta * Math.random()));
  vc$1(a.h, c);
  cc$1(c, d, b2);
}
function zd(a, b2) {
  a.ia && Qa(a.ia, function(c, d) {
    S$1(b2, d, c);
  });
  a.l && Dc$1({}, function(c, d) {
    S$1(b2, d, c);
  });
}
function Dd(a, b2, c) {
  c = Math.min(a.i.length, c);
  var d = a.l ? q$1(a.l.Ra, a.l, a) : null;
  a: {
    var e = a.i;
    let f = -1;
    for (; ; ) {
      const h = ["count=" + c];
      -1 == f ? 0 < c ? (f = e[0].h, h.push("ofs=" + f)) : f = 0 : h.push("ofs=" + f);
      let n = true;
      for (let u = 0; u < c; u++) {
        let m = e[u].h;
        const r = e[u].g;
        m -= f;
        if (0 > m)
          f = Math.max(0, e[u].h - 100), n = false;
        else
          try {
            bd(r, h, "req" + m + "_");
          } catch (F) {
            d && d(r);
          }
      }
      if (n) {
        d = h.join("&");
        break a;
      }
    }
  }
  a = a.i.splice(0, c);
  b2.D = a;
  return d;
}
function yc(a) {
  a.g || a.u || (a.Z = 1, sb(a.Ia, a), a.A = 0);
}
function tc$1(a) {
  if (a.g || a.u || 3 <= a.A)
    return false;
  a.Z++;
  a.u = J(q$1(a.Ia, a), Cd(a, a.A));
  a.A++;
  return true;
}
k$1.Ia = function() {
  this.u = null;
  Fd(this);
  if (this.$ && !(this.K || null == this.g || 0 >= this.P)) {
    var a = 2 * this.P;
    this.j.info("BP detection timer enabled: " + a);
    this.B = J(q$1(this.eb, this), a);
  }
};
k$1.eb = function() {
  this.B && (this.B = null, this.j.info("BP detection timeout reached."), this.j.info("Buffering proxy detected and switch to long-polling!"), this.L = false, this.K = true, I(10), sc$1(this), Fd(this));
};
function oc$1(a) {
  null != a.B && (l.clearTimeout(a.B), a.B = null);
}
function Fd(a) {
  a.g = new L$1(a, a.j, "rpc", a.Z);
  null === a.o && (a.g.H = a.s);
  a.g.N = 0;
  var b2 = M$1(a.sa);
  S$1(b2, "RID", "rpc");
  S$1(b2, "SID", a.I);
  S$1(b2, "CI", a.L ? "0" : "1");
  S$1(b2, "AID", a.T);
  S$1(b2, "TYPE", "xmlhttp");
  zd(a, b2);
  a.o && a.s && vd(b2, a.o, a.s);
  a.J && a.g.setTimeout(a.J);
  var c = a.g;
  a = a.ka;
  c.K = 1;
  c.v = dc$1(M$1(b2));
  c.s = null;
  c.P = true;
  ec$1(c, a);
}
k$1.cb = function() {
  null != this.v && (this.v = null, sc$1(this), tc$1(this), I(19));
};
function rc$1(a) {
  null != a.v && (l.clearTimeout(a.v), a.v = null);
}
function mc(a, b2) {
  var c = null;
  if (a.g == b2) {
    rc$1(a);
    oc$1(a);
    a.g = null;
    var d = 2;
  } else if (qc$1(a.h, b2))
    c = b2.D, xc$1(a.h, b2), d = 1;
  else
    return;
  if (0 != a.G) {
    if (a.pa = b2.Y, b2.i)
      if (1 == d) {
        c = b2.s ? b2.s.length : 0;
        b2 = Date.now() - b2.F;
        var e = a.C;
        d = Mb();
        C$1(d, new Pb(d, c));
        zc(a);
      } else
        yc(a);
    else if (e = b2.o, 3 == e || 0 == e && 0 < a.pa || !(1 == d && Bd(a, b2) || 2 == d && tc$1(a)))
      switch (c && 0 < c.length && (b2 = a.h, b2.i = b2.i.concat(c)), e) {
        case 1:
          R(a, 5);
          break;
        case 4:
          R(a, 10);
          break;
        case 3:
          R(a, 6);
          break;
        default:
          R(a, 2);
      }
  }
}
function Cd(a, b2) {
  let c = a.Xa + Math.floor(Math.random() * a.bb);
  a.l || (c *= 2);
  return c * b2;
}
function R(a, b2) {
  a.j.info("Error code " + b2);
  if (2 == b2) {
    var c = null;
    a.l && (c = null);
    var d = q$1(a.kb, a);
    c || (c = new T("//www.google.com/images/cleardot.gif"), l.location && "http" == l.location.protocol || Gc$1(c, "https"), dc$1(c));
    cd(c.toString(), d);
  } else
    I(2);
  a.G = 0;
  a.l && a.l.va(b2);
  Ad(a);
  yd(a);
}
k$1.kb = function(a) {
  a ? (this.j.info("Successfully pinged google.com"), I(2)) : (this.j.info("Failed to ping google.com"), I(1));
};
function Ad(a) {
  a.G = 0;
  a.la = [];
  if (a.l) {
    const b2 = Zc(a.h);
    if (0 != b2.length || 0 != a.i.length)
      na(a.la, b2), na(a.la, a.i), a.h.i.length = 0, ma$1(a.i), a.i.length = 0;
    a.l.ua();
  }
}
function wc(a, b2, c) {
  var d = c instanceof T ? M$1(c) : new T(c, void 0);
  if ("" != d.g)
    b2 && (d.g = b2 + "." + d.g), Hc(d, d.m);
  else {
    var e = l.location;
    d = e.protocol;
    b2 = b2 ? b2 + "." + e.hostname : e.hostname;
    e = +e.port;
    var f = new T(null, void 0);
    d && Gc$1(f, d);
    b2 && (f.g = b2);
    e && Hc(f, e);
    c && (f.l = c);
    d = f;
  }
  c = a.D;
  b2 = a.za;
  c && b2 && S$1(d, c, b2);
  S$1(d, "VER", a.ma);
  zd(a, d);
  return d;
}
function gc(a, b2, c) {
  if (b2 && !a.H)
    throw Error("Can't create secondary domain capable XhrIo object.");
  b2 = c && a.Da && !a.ra ? new W$1(new ed({ jb: true })) : new W$1(a.ra);
  b2.Ka(a.H);
  return b2;
}
function Gd() {
}
k$1 = Gd.prototype;
k$1.xa = function() {
};
k$1.wa = function() {
};
k$1.va = function() {
};
k$1.ua = function() {
};
k$1.Ra = function() {
};
function Hd() {
  if (y && !(10 <= Number(La)))
    throw Error("Environmental error: no available transport.");
}
Hd.prototype.g = function(a, b2) {
  return new X$1(a, b2);
};
function X$1(a, b2) {
  B$1.call(this);
  this.g = new xd(b2);
  this.l = a;
  this.h = b2 && b2.messageUrlParams || null;
  a = b2 && b2.messageHeaders || null;
  b2 && b2.clientProtocolHeaderRequired && (a ? a["X-Client-Protocol"] = "webchannel" : a = { "X-Client-Protocol": "webchannel" });
  this.g.s = a;
  a = b2 && b2.initMessageHeaders || null;
  b2 && b2.messageContentType && (a ? a["X-WebChannel-Content-Type"] = b2.messageContentType : a = { "X-WebChannel-Content-Type": b2.messageContentType });
  b2 && b2.ya && (a ? a["X-WebChannel-Client-Profile"] = b2.ya : a = { "X-WebChannel-Client-Profile": b2.ya });
  this.g.S = a;
  (a = b2 && b2.Yb) && !pa$1(a) && (this.g.o = a);
  this.A = b2 && b2.supportsCrossDomainXhr || false;
  this.v = b2 && b2.sendRawJson || false;
  (b2 = b2 && b2.httpSessionIdParam) && !pa$1(b2) && (this.g.D = b2, a = this.h, null !== a && b2 in a && (a = this.h, b2 in a && delete a[b2]));
  this.j = new Y$1(this);
}
t(X$1, B$1);
X$1.prototype.m = function() {
  this.g.l = this.j;
  this.A && (this.g.H = true);
  var a = this.g, b2 = this.l, c = this.h || void 0;
  I(0);
  a.V = b2;
  a.ia = c || {};
  a.L = a.Y;
  a.F = wc(a, null, a.V);
  zc(a);
};
X$1.prototype.close = function() {
  Ac$1(this.g);
};
X$1.prototype.u = function(a) {
  var b2 = this.g;
  if ("string" === typeof a) {
    var c = {};
    c.__data__ = a;
    a = c;
  } else
    this.v && (c = {}, c.__data__ = lb(a), a = c);
  b2.i.push(new Vc$1(b2.ab++, a));
  3 == b2.G && zc(b2);
};
X$1.prototype.M = function() {
  this.g.l = null;
  delete this.j;
  Ac$1(this.g);
  delete this.g;
  X$1.X.M.call(this);
};
function Id(a) {
  Vb.call(this);
  var b2 = a.__sm__;
  if (b2) {
    a: {
      for (const c in b2) {
        a = c;
        break a;
      }
      a = void 0;
    }
    if (this.i = a)
      a = this.i, b2 = null !== b2 && a in b2 ? b2[a] : void 0;
    this.data = b2;
  } else
    this.data = a;
}
t(Id, Vb);
function Jd() {
  Wb.call(this);
  this.status = 1;
}
t(Jd, Wb);
function Y$1(a) {
  this.g = a;
}
t(Y$1, Gd);
Y$1.prototype.xa = function() {
  C$1(this.g, "a");
};
Y$1.prototype.wa = function(a) {
  C$1(this.g, new Id(a));
};
Y$1.prototype.va = function(a) {
  C$1(this.g, new Jd());
};
Y$1.prototype.ua = function() {
  C$1(this.g, "b");
};
Hd.prototype.createWebChannel = Hd.prototype.g;
X$1.prototype.send = X$1.prototype.u;
X$1.prototype.open = X$1.prototype.m;
X$1.prototype.close = X$1.prototype.close;
Qb.NO_ERROR = 0;
Qb.TIMEOUT = 8;
Qb.HTTP_ERROR = 6;
Rb.COMPLETE = "complete";
Ub.EventType = K$1;
K$1.OPEN = "a";
K$1.CLOSE = "b";
K$1.ERROR = "c";
K$1.MESSAGE = "d";
B$1.prototype.listen = B$1.prototype.N;
W$1.prototype.listenOnce = W$1.prototype.O;
W$1.prototype.getLastError = W$1.prototype.Oa;
W$1.prototype.getLastErrorCode = W$1.prototype.Ea;
W$1.prototype.getStatus = W$1.prototype.aa;
W$1.prototype.getResponseJson = W$1.prototype.Sa;
W$1.prototype.getResponseText = W$1.prototype.fa;
W$1.prototype.send = W$1.prototype.da;
W$1.prototype.setWithCredentials = W$1.prototype.Ka;
var createWebChannelTransport = function() {
  return new Hd();
};
var getStatEventTarget = function() {
  return Mb();
};
var ErrorCode = Qb;
var EventType = Rb;
var Event = G$1;
var Stat = { sb: 0, vb: 1, wb: 2, Pb: 3, Ub: 4, Rb: 5, Sb: 6, Qb: 7, Ob: 8, Tb: 9, PROXY: 10, NOPROXY: 11, Mb: 12, Ib: 13, Jb: 14, Hb: 15, Kb: 16, Lb: 17, ob: 18, nb: 19, pb: 20 };
var FetchXmlHttpFactory = ed;
var WebChannel = Ub;
var XhrIo = W$1;
const b = "@firebase/firestore";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class P {
  constructor(t2) {
    this.uid = t2;
  }
  isAuthenticated() {
    return null != this.uid;
  }
  toKey() {
    return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
  }
  isEqual(t2) {
    return t2.uid === this.uid;
  }
}
P.UNAUTHENTICATED = new P(null), P.GOOGLE_CREDENTIALS = new P("google-credentials-uid"), P.FIRST_PARTY = new P("first-party-uid"), P.MOCK_USER = new P("mock-user");
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
let v = "9.17.1";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const V = new Logger("@firebase/firestore");
function S() {
  return V.logLevel;
}
function C(t2, ...e) {
  if (V.logLevel <= LogLevel.DEBUG) {
    const n = e.map(k);
    V.debug(`Firestore (${v}): ${t2}`, ...n);
  }
}
function x(t2, ...e) {
  if (V.logLevel <= LogLevel.ERROR) {
    const n = e.map(k);
    V.error(`Firestore (${v}): ${t2}`, ...n);
  }
}
function N(t2, ...e) {
  if (V.logLevel <= LogLevel.WARN) {
    const n = e.map(k);
    V.warn(`Firestore (${v}): ${t2}`, ...n);
  }
}
function k(t2) {
  if ("string" == typeof t2)
    return t2;
  try {
    return e = t2, JSON.stringify(e);
  } catch (e2) {
    return t2;
  }
  /**
  * @license
  * Copyright 2020 Google LLC
  *
  * Licensed under the Apache License, Version 2.0 (the "License");
  * you may not use this file except in compliance with the License.
  * You may obtain a copy of the License at
  *
  *   http://www.apache.org/licenses/LICENSE-2.0
  *
  * Unless required by applicable law or agreed to in writing, software
  * distributed under the License is distributed on an "AS IS" BASIS,
  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  * See the License for the specific language governing permissions and
  * limitations under the License.
  */
  var e;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function O(t2 = "Unexpected state") {
  const e = `FIRESTORE (${v}) INTERNAL ASSERTION FAILED: ` + t2;
  throw x(e), new Error(e);
}
function M(t2, e) {
  t2 || O();
}
function $(t2, e) {
  return t2;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const B = {
  OK: "ok",
  CANCELLED: "cancelled",
  UNKNOWN: "unknown",
  INVALID_ARGUMENT: "invalid-argument",
  DEADLINE_EXCEEDED: "deadline-exceeded",
  NOT_FOUND: "not-found",
  ALREADY_EXISTS: "already-exists",
  PERMISSION_DENIED: "permission-denied",
  UNAUTHENTICATED: "unauthenticated",
  RESOURCE_EXHAUSTED: "resource-exhausted",
  FAILED_PRECONDITION: "failed-precondition",
  ABORTED: "aborted",
  OUT_OF_RANGE: "out-of-range",
  UNIMPLEMENTED: "unimplemented",
  INTERNAL: "internal",
  UNAVAILABLE: "unavailable",
  DATA_LOSS: "data-loss"
};
class L extends FirebaseError {
  constructor(t2, e) {
    super(t2, e), this.code = t2, this.message = e, this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class q {
  constructor() {
    this.promise = new Promise((t2, e) => {
      this.resolve = t2, this.reject = e;
    });
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class U {
  constructor(t2, e) {
    this.user = e, this.type = "OAuth", this.headers = /* @__PURE__ */ new Map(), this.headers.set("Authorization", `Bearer ${t2}`);
  }
}
class K {
  getToken() {
    return Promise.resolve(null);
  }
  invalidateToken() {
  }
  start(t2, e) {
    t2.enqueueRetryable(() => e(P.UNAUTHENTICATED));
  }
  shutdown() {
  }
}
class G {
  constructor(t2) {
    this.token = t2, this.changeListener = null;
  }
  getToken() {
    return Promise.resolve(this.token);
  }
  invalidateToken() {
  }
  start(t2, e) {
    this.changeListener = e, t2.enqueueRetryable(() => e(this.token.user));
  }
  shutdown() {
    this.changeListener = null;
  }
}
class Q {
  constructor(t2) {
    this.t = t2, this.currentUser = P.UNAUTHENTICATED, this.i = 0, this.forceRefresh = false, this.auth = null;
  }
  start(t2, e) {
    let n = this.i;
    const s = (t3) => this.i !== n ? (n = this.i, e(t3)) : Promise.resolve();
    let i = new q();
    this.o = () => {
      this.i++, this.currentUser = this.u(), i.resolve(), i = new q(), t2.enqueueRetryable(() => s(this.currentUser));
    };
    const r = () => {
      const e2 = i;
      t2.enqueueRetryable(async () => {
        await e2.promise, await s(this.currentUser);
      });
    }, o = (t3) => {
      C("FirebaseAuthCredentialsProvider", "Auth detected"), this.auth = t3, this.auth.addAuthTokenListener(this.o), r();
    };
    this.t.onInit((t3) => o(t3)), setTimeout(() => {
      if (!this.auth) {
        const t3 = this.t.getImmediate({
          optional: true
        });
        t3 ? o(t3) : (C("FirebaseAuthCredentialsProvider", "Auth not yet detected"), i.resolve(), i = new q());
      }
    }, 0), r();
  }
  getToken() {
    const t2 = this.i, e = this.forceRefresh;
    return this.forceRefresh = false, this.auth ? this.auth.getToken(e).then((e2) => this.i !== t2 ? (C("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."), this.getToken()) : e2 ? (M("string" == typeof e2.accessToken), new U(e2.accessToken, this.currentUser)) : null) : Promise.resolve(null);
  }
  invalidateToken() {
    this.forceRefresh = true;
  }
  shutdown() {
    this.auth && this.auth.removeAuthTokenListener(this.o);
  }
  u() {
    const t2 = this.auth && this.auth.getUid();
    return M(null === t2 || "string" == typeof t2), new P(t2);
  }
}
class j {
  constructor(t2, e, n, s) {
    this.h = t2, this.l = e, this.m = n, this.g = s, this.type = "FirstParty", this.user = P.FIRST_PARTY, this.p = /* @__PURE__ */ new Map();
  }
  I() {
    return this.g ? this.g() : (M(!("object" != typeof this.h || null === this.h || !this.h.auth || !this.h.auth.getAuthHeaderValueForFirstParty)), this.h.auth.getAuthHeaderValueForFirstParty([]));
  }
  get headers() {
    this.p.set("X-Goog-AuthUser", this.l);
    const t2 = this.I();
    return t2 && this.p.set("Authorization", t2), this.m && this.p.set("X-Goog-Iam-Authorization-Token", this.m), this.p;
  }
}
class W {
  constructor(t2, e, n, s) {
    this.h = t2, this.l = e, this.m = n, this.g = s;
  }
  getToken() {
    return Promise.resolve(new j(this.h, this.l, this.m, this.g));
  }
  start(t2, e) {
    t2.enqueueRetryable(() => e(P.FIRST_PARTY));
  }
  shutdown() {
  }
  invalidateToken() {
  }
}
class z {
  constructor(t2) {
    this.value = t2, this.type = "AppCheck", this.headers = /* @__PURE__ */ new Map(), t2 && t2.length > 0 && this.headers.set("x-firebase-appcheck", this.value);
  }
}
class H {
  constructor(t2) {
    this.T = t2, this.forceRefresh = false, this.appCheck = null, this.A = null;
  }
  start(t2, e) {
    const n = (t3) => {
      null != t3.error && C("FirebaseAppCheckTokenProvider", `Error getting App Check token; using placeholder token instead. Error: ${t3.error.message}`);
      const n2 = t3.token !== this.A;
      return this.A = t3.token, C("FirebaseAppCheckTokenProvider", `Received ${n2 ? "new" : "existing"} token.`), n2 ? e(t3.token) : Promise.resolve();
    };
    this.o = (e2) => {
      t2.enqueueRetryable(() => n(e2));
    };
    const s = (t3) => {
      C("FirebaseAppCheckTokenProvider", "AppCheck detected"), this.appCheck = t3, this.appCheck.addTokenListener(this.o);
    };
    this.T.onInit((t3) => s(t3)), setTimeout(() => {
      if (!this.appCheck) {
        const t3 = this.T.getImmediate({
          optional: true
        });
        t3 ? s(t3) : C("FirebaseAppCheckTokenProvider", "AppCheck not yet detected");
      }
    }, 0);
  }
  getToken() {
    const t2 = this.forceRefresh;
    return this.forceRefresh = false, this.appCheck ? this.appCheck.getToken(t2).then((t3) => t3 ? (M("string" == typeof t3.token), this.A = t3.token, new z(t3.token)) : null) : Promise.resolve(null);
  }
  invalidateToken() {
    this.forceRefresh = true;
  }
  shutdown() {
    this.appCheck && this.appCheck.removeTokenListener(this.o);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Y(t2) {
  const e = "undefined" != typeof self && (self.crypto || self.msCrypto), n = new Uint8Array(t2);
  if (e && "function" == typeof e.getRandomValues)
    e.getRandomValues(n);
  else
    for (let e2 = 0; e2 < t2; e2++)
      n[e2] = Math.floor(256 * Math.random());
  return n;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class X {
  static R() {
    const t2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = Math.floor(256 / t2.length) * t2.length;
    let n = "";
    for (; n.length < 20; ) {
      const s = Y(40);
      for (let i = 0; i < s.length; ++i)
        n.length < 20 && s[i] < e && (n += t2.charAt(s[i] % t2.length));
    }
    return n;
  }
}
function Z(t2, e) {
  return t2 < e ? -1 : t2 > e ? 1 : 0;
}
function tt(t2, e, n) {
  return t2.length === e.length && t2.every((t3, s) => n(t3, e[s]));
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class nt {
  constructor(t2, e) {
    if (this.seconds = t2, this.nanoseconds = e, e < 0)
      throw new L(B.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
    if (e >= 1e9)
      throw new L(B.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
    if (t2 < -62135596800)
      throw new L(B.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t2);
    if (t2 >= 253402300800)
      throw new L(B.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t2);
  }
  static now() {
    return nt.fromMillis(Date.now());
  }
  static fromDate(t2) {
    return nt.fromMillis(t2.getTime());
  }
  static fromMillis(t2) {
    const e = Math.floor(t2 / 1e3), n = Math.floor(1e6 * (t2 - 1e3 * e));
    return new nt(e, n);
  }
  toDate() {
    return new Date(this.toMillis());
  }
  toMillis() {
    return 1e3 * this.seconds + this.nanoseconds / 1e6;
  }
  _compareTo(t2) {
    return this.seconds === t2.seconds ? Z(this.nanoseconds, t2.nanoseconds) : Z(this.seconds, t2.seconds);
  }
  isEqual(t2) {
    return t2.seconds === this.seconds && t2.nanoseconds === this.nanoseconds;
  }
  toString() {
    return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
  }
  toJSON() {
    return {
      seconds: this.seconds,
      nanoseconds: this.nanoseconds
    };
  }
  valueOf() {
    const t2 = this.seconds - -62135596800;
    return String(t2).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class st {
  constructor(t2) {
    this.timestamp = t2;
  }
  static fromTimestamp(t2) {
    return new st(t2);
  }
  static min() {
    return new st(new nt(0, 0));
  }
  static max() {
    return new st(new nt(253402300799, 999999999));
  }
  compareTo(t2) {
    return this.timestamp._compareTo(t2.timestamp);
  }
  isEqual(t2) {
    return this.timestamp.isEqual(t2.timestamp);
  }
  toMicroseconds() {
    return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
  }
  toString() {
    return "SnapshotVersion(" + this.timestamp.toString() + ")";
  }
  toTimestamp() {
    return this.timestamp;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class it {
  constructor(t2, e, n) {
    void 0 === e ? e = 0 : e > t2.length && O(), void 0 === n ? n = t2.length - e : n > t2.length - e && O(), this.segments = t2, this.offset = e, this.len = n;
  }
  get length() {
    return this.len;
  }
  isEqual(t2) {
    return 0 === it.comparator(this, t2);
  }
  child(t2) {
    const e = this.segments.slice(this.offset, this.limit());
    return t2 instanceof it ? t2.forEach((t3) => {
      e.push(t3);
    }) : e.push(t2), this.construct(e);
  }
  limit() {
    return this.offset + this.length;
  }
  popFirst(t2) {
    return t2 = void 0 === t2 ? 1 : t2, this.construct(this.segments, this.offset + t2, this.length - t2);
  }
  popLast() {
    return this.construct(this.segments, this.offset, this.length - 1);
  }
  firstSegment() {
    return this.segments[this.offset];
  }
  lastSegment() {
    return this.get(this.length - 1);
  }
  get(t2) {
    return this.segments[this.offset + t2];
  }
  isEmpty() {
    return 0 === this.length;
  }
  isPrefixOf(t2) {
    if (t2.length < this.length)
      return false;
    for (let e = 0; e < this.length; e++)
      if (this.get(e) !== t2.get(e))
        return false;
    return true;
  }
  isImmediateParentOf(t2) {
    if (this.length + 1 !== t2.length)
      return false;
    for (let e = 0; e < this.length; e++)
      if (this.get(e) !== t2.get(e))
        return false;
    return true;
  }
  forEach(t2) {
    for (let e = this.offset, n = this.limit(); e < n; e++)
      t2(this.segments[e]);
  }
  toArray() {
    return this.segments.slice(this.offset, this.limit());
  }
  static comparator(t2, e) {
    const n = Math.min(t2.length, e.length);
    for (let s = 0; s < n; s++) {
      const n2 = t2.get(s), i = e.get(s);
      if (n2 < i)
        return -1;
      if (n2 > i)
        return 1;
    }
    return t2.length < e.length ? -1 : t2.length > e.length ? 1 : 0;
  }
}
class rt extends it {
  construct(t2, e, n) {
    return new rt(t2, e, n);
  }
  canonicalString() {
    return this.toArray().join("/");
  }
  toString() {
    return this.canonicalString();
  }
  static fromString(...t2) {
    const e = [];
    for (const n of t2) {
      if (n.indexOf("//") >= 0)
        throw new L(B.INVALID_ARGUMENT, `Invalid segment (${n}). Paths must not contain // in them.`);
      e.push(...n.split("/").filter((t3) => t3.length > 0));
    }
    return new rt(e);
  }
  static emptyPath() {
    return new rt([]);
  }
}
const ot = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
class ut extends it {
  construct(t2, e, n) {
    return new ut(t2, e, n);
  }
  static isValidIdentifier(t2) {
    return ot.test(t2);
  }
  canonicalString() {
    return this.toArray().map((t2) => (t2 = t2.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), ut.isValidIdentifier(t2) || (t2 = "`" + t2 + "`"), t2)).join(".");
  }
  toString() {
    return this.canonicalString();
  }
  isKeyField() {
    return 1 === this.length && "__name__" === this.get(0);
  }
  static keyField() {
    return new ut(["__name__"]);
  }
  static fromServerFormat(t2) {
    const e = [];
    let n = "", s = 0;
    const i = () => {
      if (0 === n.length)
        throw new L(B.INVALID_ARGUMENT, `Invalid field path (${t2}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
      e.push(n), n = "";
    };
    let r = false;
    for (; s < t2.length; ) {
      const e2 = t2[s];
      if ("\\" === e2) {
        if (s + 1 === t2.length)
          throw new L(B.INVALID_ARGUMENT, "Path has trailing escape character: " + t2);
        const e3 = t2[s + 1];
        if ("\\" !== e3 && "." !== e3 && "`" !== e3)
          throw new L(B.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t2);
        n += e3, s += 2;
      } else
        "`" === e2 ? (r = !r, s++) : "." !== e2 || r ? (n += e2, s++) : (i(), s++);
    }
    if (i(), r)
      throw new L(B.INVALID_ARGUMENT, "Unterminated ` in path: " + t2);
    return new ut(e);
  }
  static emptyPath() {
    return new ut([]);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ct {
  constructor(t2) {
    this.path = t2;
  }
  static fromPath(t2) {
    return new ct(rt.fromString(t2));
  }
  static fromName(t2) {
    return new ct(rt.fromString(t2).popFirst(5));
  }
  static empty() {
    return new ct(rt.emptyPath());
  }
  get collectionGroup() {
    return this.path.popLast().lastSegment();
  }
  hasCollectionId(t2) {
    return this.path.length >= 2 && this.path.get(this.path.length - 2) === t2;
  }
  getCollectionGroup() {
    return this.path.get(this.path.length - 2);
  }
  getCollectionPath() {
    return this.path.popLast();
  }
  isEqual(t2) {
    return null !== t2 && 0 === rt.comparator(this.path, t2.path);
  }
  toString() {
    return this.path.toString();
  }
  static comparator(t2, e) {
    return rt.comparator(t2.path, e.path);
  }
  static isDocumentKey(t2) {
    return t2.length % 2 == 0;
  }
  static fromSegments(t2) {
    return new ct(new rt(t2.slice()));
  }
}
function mt(t2, e) {
  const n = t2.toTimestamp().seconds, s = t2.toTimestamp().nanoseconds + 1, i = st.fromTimestamp(1e9 === s ? new nt(n + 1, 0) : new nt(n, s));
  return new yt(i, ct.empty(), e);
}
function gt(t2) {
  return new yt(t2.readTime, t2.key, -1);
}
class yt {
  constructor(t2, e, n) {
    this.readTime = t2, this.documentKey = e, this.largestBatchId = n;
  }
  static min() {
    return new yt(st.min(), ct.empty(), -1);
  }
  static max() {
    return new yt(st.max(), ct.empty(), -1);
  }
}
function pt(t2, e) {
  let n = t2.readTime.compareTo(e.readTime);
  return 0 !== n ? n : (n = ct.comparator(t2.documentKey, e.documentKey), 0 !== n ? n : Z(t2.largestBatchId, e.largestBatchId));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const It = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";
class Tt {
  constructor() {
    this.onCommittedListeners = [];
  }
  addOnCommittedListener(t2) {
    this.onCommittedListeners.push(t2);
  }
  raiseOnCommittedEvent() {
    this.onCommittedListeners.forEach((t2) => t2());
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
async function Et(t2) {
  if (t2.code !== B.FAILED_PRECONDITION || t2.message !== It)
    throw t2;
  C("LocalStore", "Unexpectedly lost primary lease");
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class At {
  constructor(t2) {
    this.nextCallback = null, this.catchCallback = null, this.result = void 0, this.error = void 0, this.isDone = false, this.callbackAttached = false, t2((t3) => {
      this.isDone = true, this.result = t3, this.nextCallback && this.nextCallback(t3);
    }, (t3) => {
      this.isDone = true, this.error = t3, this.catchCallback && this.catchCallback(t3);
    });
  }
  catch(t2) {
    return this.next(void 0, t2);
  }
  next(t2, e) {
    return this.callbackAttached && O(), this.callbackAttached = true, this.isDone ? this.error ? this.wrapFailure(e, this.error) : this.wrapSuccess(t2, this.result) : new At((n, s) => {
      this.nextCallback = (e2) => {
        this.wrapSuccess(t2, e2).next(n, s);
      }, this.catchCallback = (t3) => {
        this.wrapFailure(e, t3).next(n, s);
      };
    });
  }
  toPromise() {
    return new Promise((t2, e) => {
      this.next(t2, e);
    });
  }
  wrapUserFunction(t2) {
    try {
      const e = t2();
      return e instanceof At ? e : At.resolve(e);
    } catch (t3) {
      return At.reject(t3);
    }
  }
  wrapSuccess(t2, e) {
    return t2 ? this.wrapUserFunction(() => t2(e)) : At.resolve(e);
  }
  wrapFailure(t2, e) {
    return t2 ? this.wrapUserFunction(() => t2(e)) : At.reject(e);
  }
  static resolve(t2) {
    return new At((e, n) => {
      e(t2);
    });
  }
  static reject(t2) {
    return new At((e, n) => {
      n(t2);
    });
  }
  static waitFor(t2) {
    return new At((e, n) => {
      let s = 0, i = 0, r = false;
      t2.forEach((t3) => {
        ++s, t3.next(() => {
          ++i, r && i === s && e();
        }, (t4) => n(t4));
      }), r = true, i === s && e();
    });
  }
  static or(t2) {
    let e = At.resolve(false);
    for (const n of t2)
      e = e.next((t3) => t3 ? At.resolve(t3) : n());
    return e;
  }
  static forEach(t2, e) {
    const n = [];
    return t2.forEach((t3, s) => {
      n.push(e.call(this, t3, s));
    }), this.waitFor(n);
  }
  static mapArray(t2, e) {
    return new At((n, s) => {
      const i = t2.length, r = new Array(i);
      let o = 0;
      for (let u = 0; u < i; u++) {
        const c = u;
        e(t2[c]).next((t3) => {
          r[c] = t3, ++o, o === i && n(r);
        }, (t3) => s(t3));
      }
    });
  }
  static doWhile(t2, e) {
    return new At((n, s) => {
      const i = () => {
        true === t2() ? e().next(() => {
          i();
        }, s) : n();
      };
      i();
    });
  }
}
function Vt(t2) {
  return "IndexedDbTransactionError" === t2.name;
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ot {
  constructor(t2, e) {
    this.previousValue = t2, e && (e.sequenceNumberHandler = (t3) => this.ut(t3), this.ct = (t3) => e.writeSequenceNumber(t3));
  }
  ut(t2) {
    return this.previousValue = Math.max(t2, this.previousValue), this.previousValue;
  }
  next() {
    const t2 = ++this.previousValue;
    return this.ct && this.ct(t2), t2;
  }
}
Ot.at = -1;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Mt {
  constructor(t2, e, n, s, i, r, o, u) {
    this.databaseId = t2, this.appId = e, this.persistenceKey = n, this.host = s, this.ssl = i, this.forceLongPolling = r, this.autoDetectLongPolling = o, this.useFetchStreams = u;
  }
}
class Ft {
  constructor(t2, e) {
    this.projectId = t2, this.database = e || "(default)";
  }
  static empty() {
    return new Ft("", "");
  }
  get isDefaultDatabase() {
    return "(default)" === this.database;
  }
  isEqual(t2) {
    return t2 instanceof Ft && t2.projectId === this.projectId && t2.database === this.database;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function $t(t2) {
  let e = 0;
  for (const n in t2)
    Object.prototype.hasOwnProperty.call(t2, n) && e++;
  return e;
}
function Bt(t2, e) {
  for (const n in t2)
    Object.prototype.hasOwnProperty.call(t2, n) && e(n, t2[n]);
}
function Lt(t2) {
  for (const e in t2)
    if (Object.prototype.hasOwnProperty.call(t2, e))
      return false;
  return true;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function qt(t2) {
  return null == t2;
}
function Ut(t2) {
  return 0 === t2 && 1 / t2 == -1 / 0;
}
function Kt(t2) {
  return "number" == typeof t2 && Number.isInteger(t2) && !Ut(t2) && t2 <= Number.MAX_SAFE_INTEGER && t2 >= Number.MIN_SAFE_INTEGER;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Qt {
  constructor(t2) {
    this.binaryString = t2;
  }
  static fromBase64String(t2) {
    const e = atob(t2);
    return new Qt(e);
  }
  static fromUint8Array(t2) {
    const e = function(t3) {
      let e2 = "";
      for (let n = 0; n < t3.length; ++n)
        e2 += String.fromCharCode(t3[n]);
      return e2;
    }(t2);
    return new Qt(e);
  }
  [Symbol.iterator]() {
    let t2 = 0;
    return {
      next: () => t2 < this.binaryString.length ? {
        value: this.binaryString.charCodeAt(t2++),
        done: false
      } : {
        value: void 0,
        done: true
      }
    };
  }
  toBase64() {
    return t2 = this.binaryString, btoa(t2);
    var t2;
  }
  toUint8Array() {
    return function(t2) {
      const e = new Uint8Array(t2.length);
      for (let n = 0; n < t2.length; n++)
        e[n] = t2.charCodeAt(n);
      return e;
    }(this.binaryString);
  }
  approximateByteSize() {
    return 2 * this.binaryString.length;
  }
  compareTo(t2) {
    return Z(this.binaryString, t2.binaryString);
  }
  isEqual(t2) {
    return this.binaryString === t2.binaryString;
  }
}
Qt.EMPTY_BYTE_STRING = new Qt("");
const jt = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
function Wt(t2) {
  if (M(!!t2), "string" == typeof t2) {
    let e = 0;
    const n = jt.exec(t2);
    if (M(!!n), n[1]) {
      let t3 = n[1];
      t3 = (t3 + "000000000").substr(0, 9), e = Number(t3);
    }
    const s = new Date(t2);
    return {
      seconds: Math.floor(s.getTime() / 1e3),
      nanos: e
    };
  }
  return {
    seconds: zt(t2.seconds),
    nanos: zt(t2.nanos)
  };
}
function zt(t2) {
  return "number" == typeof t2 ? t2 : "string" == typeof t2 ? Number(t2) : 0;
}
function Ht(t2) {
  return "string" == typeof t2 ? Qt.fromBase64String(t2) : Qt.fromUint8Array(t2);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Jt(t2) {
  var e, n;
  return "server_timestamp" === (null === (n = ((null === (e = null == t2 ? void 0 : t2.mapValue) || void 0 === e ? void 0 : e.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue);
}
function Yt(t2) {
  const e = t2.mapValue.fields.__previous_value__;
  return Jt(e) ? Yt(e) : e;
}
function Xt(t2) {
  const e = Wt(t2.mapValue.fields.__local_write_time__.timestampValue);
  return new nt(e.seconds, e.nanos);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const Zt = {
  mapValue: {
    fields: {
      __type__: {
        stringValue: "__max__"
      }
    }
  }
};
function ee(t2) {
  return "nullValue" in t2 ? 0 : "booleanValue" in t2 ? 1 : "integerValue" in t2 || "doubleValue" in t2 ? 2 : "timestampValue" in t2 ? 3 : "stringValue" in t2 ? 5 : "bytesValue" in t2 ? 6 : "referenceValue" in t2 ? 7 : "geoPointValue" in t2 ? 8 : "arrayValue" in t2 ? 9 : "mapValue" in t2 ? Jt(t2) ? 4 : we(t2) ? 9007199254740991 : 10 : O();
}
function ne(t2, e) {
  if (t2 === e)
    return true;
  const n = ee(t2);
  if (n !== ee(e))
    return false;
  switch (n) {
    case 0:
    case 9007199254740991:
      return true;
    case 1:
      return t2.booleanValue === e.booleanValue;
    case 4:
      return Xt(t2).isEqual(Xt(e));
    case 3:
      return function(t3, e2) {
        if ("string" == typeof t3.timestampValue && "string" == typeof e2.timestampValue && t3.timestampValue.length === e2.timestampValue.length)
          return t3.timestampValue === e2.timestampValue;
        const n2 = Wt(t3.timestampValue), s = Wt(e2.timestampValue);
        return n2.seconds === s.seconds && n2.nanos === s.nanos;
      }(t2, e);
    case 5:
      return t2.stringValue === e.stringValue;
    case 6:
      return function(t3, e2) {
        return Ht(t3.bytesValue).isEqual(Ht(e2.bytesValue));
      }(t2, e);
    case 7:
      return t2.referenceValue === e.referenceValue;
    case 8:
      return function(t3, e2) {
        return zt(t3.geoPointValue.latitude) === zt(e2.geoPointValue.latitude) && zt(t3.geoPointValue.longitude) === zt(e2.geoPointValue.longitude);
      }(t2, e);
    case 2:
      return function(t3, e2) {
        if ("integerValue" in t3 && "integerValue" in e2)
          return zt(t3.integerValue) === zt(e2.integerValue);
        if ("doubleValue" in t3 && "doubleValue" in e2) {
          const n2 = zt(t3.doubleValue), s = zt(e2.doubleValue);
          return n2 === s ? Ut(n2) === Ut(s) : isNaN(n2) && isNaN(s);
        }
        return false;
      }(t2, e);
    case 9:
      return tt(t2.arrayValue.values || [], e.arrayValue.values || [], ne);
    case 10:
      return function(t3, e2) {
        const n2 = t3.mapValue.fields || {}, s = e2.mapValue.fields || {};
        if ($t(n2) !== $t(s))
          return false;
        for (const t4 in n2)
          if (n2.hasOwnProperty(t4) && (void 0 === s[t4] || !ne(n2[t4], s[t4])))
            return false;
        return true;
      }(t2, e);
    default:
      return O();
  }
}
function se(t2, e) {
  return void 0 !== (t2.values || []).find((t3) => ne(t3, e));
}
function ie(t2, e) {
  if (t2 === e)
    return 0;
  const n = ee(t2), s = ee(e);
  if (n !== s)
    return Z(n, s);
  switch (n) {
    case 0:
    case 9007199254740991:
      return 0;
    case 1:
      return Z(t2.booleanValue, e.booleanValue);
    case 2:
      return function(t3, e2) {
        const n2 = zt(t3.integerValue || t3.doubleValue), s2 = zt(e2.integerValue || e2.doubleValue);
        return n2 < s2 ? -1 : n2 > s2 ? 1 : n2 === s2 ? 0 : isNaN(n2) ? isNaN(s2) ? 0 : -1 : 1;
      }(t2, e);
    case 3:
      return re(t2.timestampValue, e.timestampValue);
    case 4:
      return re(Xt(t2), Xt(e));
    case 5:
      return Z(t2.stringValue, e.stringValue);
    case 6:
      return function(t3, e2) {
        const n2 = Ht(t3), s2 = Ht(e2);
        return n2.compareTo(s2);
      }(t2.bytesValue, e.bytesValue);
    case 7:
      return function(t3, e2) {
        const n2 = t3.split("/"), s2 = e2.split("/");
        for (let t4 = 0; t4 < n2.length && t4 < s2.length; t4++) {
          const e3 = Z(n2[t4], s2[t4]);
          if (0 !== e3)
            return e3;
        }
        return Z(n2.length, s2.length);
      }(t2.referenceValue, e.referenceValue);
    case 8:
      return function(t3, e2) {
        const n2 = Z(zt(t3.latitude), zt(e2.latitude));
        if (0 !== n2)
          return n2;
        return Z(zt(t3.longitude), zt(e2.longitude));
      }(t2.geoPointValue, e.geoPointValue);
    case 9:
      return function(t3, e2) {
        const n2 = t3.values || [], s2 = e2.values || [];
        for (let t4 = 0; t4 < n2.length && t4 < s2.length; ++t4) {
          const e3 = ie(n2[t4], s2[t4]);
          if (e3)
            return e3;
        }
        return Z(n2.length, s2.length);
      }(t2.arrayValue, e.arrayValue);
    case 10:
      return function(t3, e2) {
        if (t3 === Zt.mapValue && e2 === Zt.mapValue)
          return 0;
        if (t3 === Zt.mapValue)
          return 1;
        if (e2 === Zt.mapValue)
          return -1;
        const n2 = t3.fields || {}, s2 = Object.keys(n2), i = e2.fields || {}, r = Object.keys(i);
        s2.sort(), r.sort();
        for (let t4 = 0; t4 < s2.length && t4 < r.length; ++t4) {
          const e3 = Z(s2[t4], r[t4]);
          if (0 !== e3)
            return e3;
          const o = ie(n2[s2[t4]], i[r[t4]]);
          if (0 !== o)
            return o;
        }
        return Z(s2.length, r.length);
      }(t2.mapValue, e.mapValue);
    default:
      throw O();
  }
}
function re(t2, e) {
  if ("string" == typeof t2 && "string" == typeof e && t2.length === e.length)
    return Z(t2, e);
  const n = Wt(t2), s = Wt(e), i = Z(n.seconds, s.seconds);
  return 0 !== i ? i : Z(n.nanos, s.nanos);
}
function oe(t2) {
  return ue(t2);
}
function ue(t2) {
  return "nullValue" in t2 ? "null" : "booleanValue" in t2 ? "" + t2.booleanValue : "integerValue" in t2 ? "" + t2.integerValue : "doubleValue" in t2 ? "" + t2.doubleValue : "timestampValue" in t2 ? function(t3) {
    const e2 = Wt(t3);
    return `time(${e2.seconds},${e2.nanos})`;
  }(t2.timestampValue) : "stringValue" in t2 ? t2.stringValue : "bytesValue" in t2 ? Ht(t2.bytesValue).toBase64() : "referenceValue" in t2 ? (n = t2.referenceValue, ct.fromName(n).toString()) : "geoPointValue" in t2 ? `geo(${(e = t2.geoPointValue).latitude},${e.longitude})` : "arrayValue" in t2 ? function(t3) {
    let e2 = "[", n2 = true;
    for (const s of t3.values || [])
      n2 ? n2 = false : e2 += ",", e2 += ue(s);
    return e2 + "]";
  }(t2.arrayValue) : "mapValue" in t2 ? function(t3) {
    const e2 = Object.keys(t3.fields || {}).sort();
    let n2 = "{", s = true;
    for (const i of e2)
      s ? s = false : n2 += ",", n2 += `${i}:${ue(t3.fields[i])}`;
    return n2 + "}";
  }(t2.mapValue) : O();
  var e, n;
}
function ae(t2) {
  return !!t2 && "integerValue" in t2;
}
function he(t2) {
  return !!t2 && "arrayValue" in t2;
}
function le(t2) {
  return !!t2 && "nullValue" in t2;
}
function fe(t2) {
  return !!t2 && "doubleValue" in t2 && isNaN(Number(t2.doubleValue));
}
function de(t2) {
  return !!t2 && "mapValue" in t2;
}
function _e(t2) {
  if (t2.geoPointValue)
    return {
      geoPointValue: Object.assign({}, t2.geoPointValue)
    };
  if (t2.timestampValue && "object" == typeof t2.timestampValue)
    return {
      timestampValue: Object.assign({}, t2.timestampValue)
    };
  if (t2.mapValue) {
    const e = {
      mapValue: {
        fields: {}
      }
    };
    return Bt(t2.mapValue.fields, (t3, n) => e.mapValue.fields[t3] = _e(n)), e;
  }
  if (t2.arrayValue) {
    const e = {
      arrayValue: {
        values: []
      }
    };
    for (let n = 0; n < (t2.arrayValue.values || []).length; ++n)
      e.arrayValue.values[n] = _e(t2.arrayValue.values[n]);
    return e;
  }
  return Object.assign({}, t2);
}
function we(t2) {
  return "__max__" === (((t2.mapValue || {}).fields || {}).__type__ || {}).stringValue;
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ie {
  constructor(t2, e) {
    this.position = t2, this.inclusive = e;
  }
}
function Te(t2, e, n) {
  let s = 0;
  for (let i = 0; i < t2.position.length; i++) {
    const r = e[i], o = t2.position[i];
    if (r.field.isKeyField())
      s = ct.comparator(ct.fromName(o.referenceValue), n.key);
    else {
      s = ie(o, n.data.field(r.field));
    }
    if ("desc" === r.dir && (s *= -1), 0 !== s)
      break;
  }
  return s;
}
function Ee(t2, e) {
  if (null === t2)
    return null === e;
  if (null === e)
    return false;
  if (t2.inclusive !== e.inclusive || t2.position.length !== e.position.length)
    return false;
  for (let n = 0; n < t2.position.length; n++) {
    if (!ne(t2.position[n], e.position[n]))
      return false;
  }
  return true;
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ae {
}
class Re extends Ae {
  constructor(t2, e, n) {
    super(), this.field = t2, this.op = e, this.value = n;
  }
  static create(t2, e, n) {
    return t2.isKeyField() ? "in" === e || "not-in" === e ? this.createKeyFieldInFilter(t2, e, n) : new ke(t2, e, n) : "array-contains" === e ? new $e(t2, n) : "in" === e ? new Be(t2, n) : "not-in" === e ? new Le(t2, n) : "array-contains-any" === e ? new qe(t2, n) : new Re(t2, e, n);
  }
  static createKeyFieldInFilter(t2, e, n) {
    return "in" === e ? new Oe(t2, n) : new Me(t2, n);
  }
  matches(t2) {
    const e = t2.data.field(this.field);
    return "!=" === this.op ? null !== e && this.matchesComparison(ie(e, this.value)) : null !== e && ee(this.value) === ee(e) && this.matchesComparison(ie(e, this.value));
  }
  matchesComparison(t2) {
    switch (this.op) {
      case "<":
        return t2 < 0;
      case "<=":
        return t2 <= 0;
      case "==":
        return 0 === t2;
      case "!=":
        return 0 !== t2;
      case ">":
        return t2 > 0;
      case ">=":
        return t2 >= 0;
      default:
        return O();
    }
  }
  isInequality() {
    return ["<", "<=", ">", ">=", "!=", "not-in"].indexOf(this.op) >= 0;
  }
  getFlattenedFilters() {
    return [this];
  }
  getFilters() {
    return [this];
  }
  getFirstInequalityField() {
    return this.isInequality() ? this.field : null;
  }
}
class be extends Ae {
  constructor(t2, e) {
    super(), this.filters = t2, this.op = e, this.ht = null;
  }
  static create(t2, e) {
    return new be(t2, e);
  }
  matches(t2) {
    return Pe(this) ? void 0 === this.filters.find((e) => !e.matches(t2)) : void 0 !== this.filters.find((e) => e.matches(t2));
  }
  getFlattenedFilters() {
    return null !== this.ht || (this.ht = this.filters.reduce((t2, e) => t2.concat(e.getFlattenedFilters()), [])), this.ht;
  }
  getFilters() {
    return Object.assign([], this.filters);
  }
  getFirstInequalityField() {
    const t2 = this.lt((t3) => t3.isInequality());
    return null !== t2 ? t2.field : null;
  }
  lt(t2) {
    for (const e of this.getFlattenedFilters())
      if (t2(e))
        return e;
    return null;
  }
}
function Pe(t2) {
  return "and" === t2.op;
}
function Ve(t2) {
  return Se(t2) && Pe(t2);
}
function Se(t2) {
  for (const e of t2.filters)
    if (e instanceof be)
      return false;
  return true;
}
function De(t2) {
  if (t2 instanceof Re)
    return t2.field.canonicalString() + t2.op.toString() + oe(t2.value);
  if (Ve(t2))
    return t2.filters.map((t3) => De(t3)).join(",");
  {
    const e = t2.filters.map((t3) => De(t3)).join(",");
    return `${t2.op}(${e})`;
  }
}
function Ce(t2, e) {
  return t2 instanceof Re ? function(t3, e2) {
    return e2 instanceof Re && t3.op === e2.op && t3.field.isEqual(e2.field) && ne(t3.value, e2.value);
  }(t2, e) : t2 instanceof be ? function(t3, e2) {
    if (e2 instanceof be && t3.op === e2.op && t3.filters.length === e2.filters.length) {
      return t3.filters.reduce((t4, n, s) => t4 && Ce(n, e2.filters[s]), true);
    }
    return false;
  }(t2, e) : void O();
}
function Ne(t2) {
  return t2 instanceof Re ? function(t3) {
    return `${t3.field.canonicalString()} ${t3.op} ${oe(t3.value)}`;
  }(t2) : t2 instanceof be ? function(t3) {
    return t3.op.toString() + " {" + t3.getFilters().map(Ne).join(" ,") + "}";
  }(t2) : "Filter";
}
class ke extends Re {
  constructor(t2, e, n) {
    super(t2, e, n), this.key = ct.fromName(n.referenceValue);
  }
  matches(t2) {
    const e = ct.comparator(t2.key, this.key);
    return this.matchesComparison(e);
  }
}
class Oe extends Re {
  constructor(t2, e) {
    super(t2, "in", e), this.keys = Fe("in", e);
  }
  matches(t2) {
    return this.keys.some((e) => e.isEqual(t2.key));
  }
}
class Me extends Re {
  constructor(t2, e) {
    super(t2, "not-in", e), this.keys = Fe("not-in", e);
  }
  matches(t2) {
    return !this.keys.some((e) => e.isEqual(t2.key));
  }
}
function Fe(t2, e) {
  var n;
  return ((null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []).map((t3) => ct.fromName(t3.referenceValue));
}
class $e extends Re {
  constructor(t2, e) {
    super(t2, "array-contains", e);
  }
  matches(t2) {
    const e = t2.data.field(this.field);
    return he(e) && se(e.arrayValue, this.value);
  }
}
class Be extends Re {
  constructor(t2, e) {
    super(t2, "in", e);
  }
  matches(t2) {
    const e = t2.data.field(this.field);
    return null !== e && se(this.value.arrayValue, e);
  }
}
class Le extends Re {
  constructor(t2, e) {
    super(t2, "not-in", e);
  }
  matches(t2) {
    if (se(this.value.arrayValue, {
      nullValue: "NULL_VALUE"
    }))
      return false;
    const e = t2.data.field(this.field);
    return null !== e && !se(this.value.arrayValue, e);
  }
}
class qe extends Re {
  constructor(t2, e) {
    super(t2, "array-contains-any", e);
  }
  matches(t2) {
    const e = t2.data.field(this.field);
    return !(!he(e) || !e.arrayValue.values) && e.arrayValue.values.some((t3) => se(this.value.arrayValue, t3));
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ue {
  constructor(t2, e = "asc") {
    this.field = t2, this.dir = e;
  }
}
function Ke(t2, e) {
  return t2.dir === e.dir && t2.field.isEqual(e.field);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ge {
  constructor(t2, e) {
    this.comparator = t2, this.root = e || je.EMPTY;
  }
  insert(t2, e) {
    return new Ge(this.comparator, this.root.insert(t2, e, this.comparator).copy(null, null, je.BLACK, null, null));
  }
  remove(t2) {
    return new Ge(this.comparator, this.root.remove(t2, this.comparator).copy(null, null, je.BLACK, null, null));
  }
  get(t2) {
    let e = this.root;
    for (; !e.isEmpty(); ) {
      const n = this.comparator(t2, e.key);
      if (0 === n)
        return e.value;
      n < 0 ? e = e.left : n > 0 && (e = e.right);
    }
    return null;
  }
  indexOf(t2) {
    let e = 0, n = this.root;
    for (; !n.isEmpty(); ) {
      const s = this.comparator(t2, n.key);
      if (0 === s)
        return e + n.left.size;
      s < 0 ? n = n.left : (e += n.left.size + 1, n = n.right);
    }
    return -1;
  }
  isEmpty() {
    return this.root.isEmpty();
  }
  get size() {
    return this.root.size;
  }
  minKey() {
    return this.root.minKey();
  }
  maxKey() {
    return this.root.maxKey();
  }
  inorderTraversal(t2) {
    return this.root.inorderTraversal(t2);
  }
  forEach(t2) {
    this.inorderTraversal((e, n) => (t2(e, n), false));
  }
  toString() {
    const t2 = [];
    return this.inorderTraversal((e, n) => (t2.push(`${e}:${n}`), false)), `{${t2.join(", ")}}`;
  }
  reverseTraversal(t2) {
    return this.root.reverseTraversal(t2);
  }
  getIterator() {
    return new Qe(this.root, null, this.comparator, false);
  }
  getIteratorFrom(t2) {
    return new Qe(this.root, t2, this.comparator, false);
  }
  getReverseIterator() {
    return new Qe(this.root, null, this.comparator, true);
  }
  getReverseIteratorFrom(t2) {
    return new Qe(this.root, t2, this.comparator, true);
  }
}
class Qe {
  constructor(t2, e, n, s) {
    this.isReverse = s, this.nodeStack = [];
    let i = 1;
    for (; !t2.isEmpty(); )
      if (i = e ? n(t2.key, e) : 1, e && s && (i *= -1), i < 0)
        t2 = this.isReverse ? t2.left : t2.right;
      else {
        if (0 === i) {
          this.nodeStack.push(t2);
          break;
        }
        this.nodeStack.push(t2), t2 = this.isReverse ? t2.right : t2.left;
      }
  }
  getNext() {
    let t2 = this.nodeStack.pop();
    const e = {
      key: t2.key,
      value: t2.value
    };
    if (this.isReverse)
      for (t2 = t2.left; !t2.isEmpty(); )
        this.nodeStack.push(t2), t2 = t2.right;
    else
      for (t2 = t2.right; !t2.isEmpty(); )
        this.nodeStack.push(t2), t2 = t2.left;
    return e;
  }
  hasNext() {
    return this.nodeStack.length > 0;
  }
  peek() {
    if (0 === this.nodeStack.length)
      return null;
    const t2 = this.nodeStack[this.nodeStack.length - 1];
    return {
      key: t2.key,
      value: t2.value
    };
  }
}
class je {
  constructor(t2, e, n, s, i) {
    this.key = t2, this.value = e, this.color = null != n ? n : je.RED, this.left = null != s ? s : je.EMPTY, this.right = null != i ? i : je.EMPTY, this.size = this.left.size + 1 + this.right.size;
  }
  copy(t2, e, n, s, i) {
    return new je(null != t2 ? t2 : this.key, null != e ? e : this.value, null != n ? n : this.color, null != s ? s : this.left, null != i ? i : this.right);
  }
  isEmpty() {
    return false;
  }
  inorderTraversal(t2) {
    return this.left.inorderTraversal(t2) || t2(this.key, this.value) || this.right.inorderTraversal(t2);
  }
  reverseTraversal(t2) {
    return this.right.reverseTraversal(t2) || t2(this.key, this.value) || this.left.reverseTraversal(t2);
  }
  min() {
    return this.left.isEmpty() ? this : this.left.min();
  }
  minKey() {
    return this.min().key;
  }
  maxKey() {
    return this.right.isEmpty() ? this.key : this.right.maxKey();
  }
  insert(t2, e, n) {
    let s = this;
    const i = n(t2, s.key);
    return s = i < 0 ? s.copy(null, null, null, s.left.insert(t2, e, n), null) : 0 === i ? s.copy(null, e, null, null, null) : s.copy(null, null, null, null, s.right.insert(t2, e, n)), s.fixUp();
  }
  removeMin() {
    if (this.left.isEmpty())
      return je.EMPTY;
    let t2 = this;
    return t2.left.isRed() || t2.left.left.isRed() || (t2 = t2.moveRedLeft()), t2 = t2.copy(null, null, null, t2.left.removeMin(), null), t2.fixUp();
  }
  remove(t2, e) {
    let n, s = this;
    if (e(t2, s.key) < 0)
      s.left.isEmpty() || s.left.isRed() || s.left.left.isRed() || (s = s.moveRedLeft()), s = s.copy(null, null, null, s.left.remove(t2, e), null);
    else {
      if (s.left.isRed() && (s = s.rotateRight()), s.right.isEmpty() || s.right.isRed() || s.right.left.isRed() || (s = s.moveRedRight()), 0 === e(t2, s.key)) {
        if (s.right.isEmpty())
          return je.EMPTY;
        n = s.right.min(), s = s.copy(n.key, n.value, null, null, s.right.removeMin());
      }
      s = s.copy(null, null, null, null, s.right.remove(t2, e));
    }
    return s.fixUp();
  }
  isRed() {
    return this.color;
  }
  fixUp() {
    let t2 = this;
    return t2.right.isRed() && !t2.left.isRed() && (t2 = t2.rotateLeft()), t2.left.isRed() && t2.left.left.isRed() && (t2 = t2.rotateRight()), t2.left.isRed() && t2.right.isRed() && (t2 = t2.colorFlip()), t2;
  }
  moveRedLeft() {
    let t2 = this.colorFlip();
    return t2.right.left.isRed() && (t2 = t2.copy(null, null, null, null, t2.right.rotateRight()), t2 = t2.rotateLeft(), t2 = t2.colorFlip()), t2;
  }
  moveRedRight() {
    let t2 = this.colorFlip();
    return t2.left.left.isRed() && (t2 = t2.rotateRight(), t2 = t2.colorFlip()), t2;
  }
  rotateLeft() {
    const t2 = this.copy(null, null, je.RED, null, this.right.left);
    return this.right.copy(null, null, this.color, t2, null);
  }
  rotateRight() {
    const t2 = this.copy(null, null, je.RED, this.left.right, null);
    return this.left.copy(null, null, this.color, null, t2);
  }
  colorFlip() {
    const t2 = this.left.copy(null, null, !this.left.color, null, null), e = this.right.copy(null, null, !this.right.color, null, null);
    return this.copy(null, null, !this.color, t2, e);
  }
  checkMaxDepth() {
    const t2 = this.check();
    return Math.pow(2, t2) <= this.size + 1;
  }
  check() {
    if (this.isRed() && this.left.isRed())
      throw O();
    if (this.right.isRed())
      throw O();
    const t2 = this.left.check();
    if (t2 !== this.right.check())
      throw O();
    return t2 + (this.isRed() ? 0 : 1);
  }
}
je.EMPTY = null, je.RED = true, je.BLACK = false;
je.EMPTY = new class {
  constructor() {
    this.size = 0;
  }
  get key() {
    throw O();
  }
  get value() {
    throw O();
  }
  get color() {
    throw O();
  }
  get left() {
    throw O();
  }
  get right() {
    throw O();
  }
  copy(t2, e, n, s, i) {
    return this;
  }
  insert(t2, e, n) {
    return new je(t2, e);
  }
  remove(t2, e) {
    return this;
  }
  isEmpty() {
    return true;
  }
  inorderTraversal(t2) {
    return false;
  }
  reverseTraversal(t2) {
    return false;
  }
  minKey() {
    return null;
  }
  maxKey() {
    return null;
  }
  isRed() {
    return false;
  }
  checkMaxDepth() {
    return true;
  }
  check() {
    return 0;
  }
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class We {
  constructor(t2) {
    this.comparator = t2, this.data = new Ge(this.comparator);
  }
  has(t2) {
    return null !== this.data.get(t2);
  }
  first() {
    return this.data.minKey();
  }
  last() {
    return this.data.maxKey();
  }
  get size() {
    return this.data.size;
  }
  indexOf(t2) {
    return this.data.indexOf(t2);
  }
  forEach(t2) {
    this.data.inorderTraversal((e, n) => (t2(e), false));
  }
  forEachInRange(t2, e) {
    const n = this.data.getIteratorFrom(t2[0]);
    for (; n.hasNext(); ) {
      const s = n.getNext();
      if (this.comparator(s.key, t2[1]) >= 0)
        return;
      e(s.key);
    }
  }
  forEachWhile(t2, e) {
    let n;
    for (n = void 0 !== e ? this.data.getIteratorFrom(e) : this.data.getIterator(); n.hasNext(); ) {
      if (!t2(n.getNext().key))
        return;
    }
  }
  firstAfterOrEqual(t2) {
    const e = this.data.getIteratorFrom(t2);
    return e.hasNext() ? e.getNext().key : null;
  }
  getIterator() {
    return new ze(this.data.getIterator());
  }
  getIteratorFrom(t2) {
    return new ze(this.data.getIteratorFrom(t2));
  }
  add(t2) {
    return this.copy(this.data.remove(t2).insert(t2, true));
  }
  delete(t2) {
    return this.has(t2) ? this.copy(this.data.remove(t2)) : this;
  }
  isEmpty() {
    return this.data.isEmpty();
  }
  unionWith(t2) {
    let e = this;
    return e.size < t2.size && (e = t2, t2 = this), t2.forEach((t3) => {
      e = e.add(t3);
    }), e;
  }
  isEqual(t2) {
    if (!(t2 instanceof We))
      return false;
    if (this.size !== t2.size)
      return false;
    const e = this.data.getIterator(), n = t2.data.getIterator();
    for (; e.hasNext(); ) {
      const t3 = e.getNext().key, s = n.getNext().key;
      if (0 !== this.comparator(t3, s))
        return false;
    }
    return true;
  }
  toArray() {
    const t2 = [];
    return this.forEach((e) => {
      t2.push(e);
    }), t2;
  }
  toString() {
    const t2 = [];
    return this.forEach((e) => t2.push(e)), "SortedSet(" + t2.toString() + ")";
  }
  copy(t2) {
    const e = new We(this.comparator);
    return e.data = t2, e;
  }
}
class ze {
  constructor(t2) {
    this.iter = t2;
  }
  getNext() {
    return this.iter.getNext().key;
  }
  hasNext() {
    return this.iter.hasNext();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Je {
  constructor(t2) {
    this.fields = t2, t2.sort(ut.comparator);
  }
  static empty() {
    return new Je([]);
  }
  unionWith(t2) {
    let e = new We(ut.comparator);
    for (const t3 of this.fields)
      e = e.add(t3);
    for (const n of t2)
      e = e.add(n);
    return new Je(e.toArray());
  }
  covers(t2) {
    for (const e of this.fields)
      if (e.isPrefixOf(t2))
        return true;
    return false;
  }
  isEqual(t2) {
    return tt(this.fields, t2.fields, (t3, e) => t3.isEqual(e));
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ye {
  constructor(t2) {
    this.value = t2;
  }
  static empty() {
    return new Ye({
      mapValue: {}
    });
  }
  field(t2) {
    if (t2.isEmpty())
      return this.value;
    {
      let e = this.value;
      for (let n = 0; n < t2.length - 1; ++n)
        if (e = (e.mapValue.fields || {})[t2.get(n)], !de(e))
          return null;
      return e = (e.mapValue.fields || {})[t2.lastSegment()], e || null;
    }
  }
  set(t2, e) {
    this.getFieldsMap(t2.popLast())[t2.lastSegment()] = _e(e);
  }
  setAll(t2) {
    let e = ut.emptyPath(), n = {}, s = [];
    t2.forEach((t3, i2) => {
      if (!e.isImmediateParentOf(i2)) {
        const t4 = this.getFieldsMap(e);
        this.applyChanges(t4, n, s), n = {}, s = [], e = i2.popLast();
      }
      t3 ? n[i2.lastSegment()] = _e(t3) : s.push(i2.lastSegment());
    });
    const i = this.getFieldsMap(e);
    this.applyChanges(i, n, s);
  }
  delete(t2) {
    const e = this.field(t2.popLast());
    de(e) && e.mapValue.fields && delete e.mapValue.fields[t2.lastSegment()];
  }
  isEqual(t2) {
    return ne(this.value, t2.value);
  }
  getFieldsMap(t2) {
    let e = this.value;
    e.mapValue.fields || (e.mapValue = {
      fields: {}
    });
    for (let n = 0; n < t2.length; ++n) {
      let s = e.mapValue.fields[t2.get(n)];
      de(s) && s.mapValue.fields || (s = {
        mapValue: {
          fields: {}
        }
      }, e.mapValue.fields[t2.get(n)] = s), e = s;
    }
    return e.mapValue.fields;
  }
  applyChanges(t2, e, n) {
    Bt(e, (e2, n2) => t2[e2] = n2);
    for (const e2 of n)
      delete t2[e2];
  }
  clone() {
    return new Ye(_e(this.value));
  }
}
function Xe(t2) {
  const e = [];
  return Bt(t2.fields, (t3, n) => {
    const s = new ut([t3]);
    if (de(n)) {
      const t4 = Xe(n.mapValue).fields;
      if (0 === t4.length)
        e.push(s);
      else
        for (const n2 of t4)
          e.push(s.child(n2));
    } else
      e.push(s);
  }), new Je(e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ze {
  constructor(t2, e, n, s, i, r, o) {
    this.key = t2, this.documentType = e, this.version = n, this.readTime = s, this.createTime = i, this.data = r, this.documentState = o;
  }
  static newInvalidDocument(t2) {
    return new Ze(
      t2,
      0,
      st.min(),
      st.min(),
      st.min(),
      Ye.empty(),
      0
    );
  }
  static newFoundDocument(t2, e, n, s) {
    return new Ze(
      t2,
      1,
      e,
      st.min(),
      n,
      s,
      0
    );
  }
  static newNoDocument(t2, e) {
    return new Ze(
      t2,
      2,
      e,
      st.min(),
      st.min(),
      Ye.empty(),
      0
    );
  }
  static newUnknownDocument(t2, e) {
    return new Ze(
      t2,
      3,
      e,
      st.min(),
      st.min(),
      Ye.empty(),
      2
    );
  }
  convertToFoundDocument(t2, e) {
    return !this.createTime.isEqual(st.min()) || 2 !== this.documentType && 0 !== this.documentType || (this.createTime = t2), this.version = t2, this.documentType = 1, this.data = e, this.documentState = 0, this;
  }
  convertToNoDocument(t2) {
    return this.version = t2, this.documentType = 2, this.data = Ye.empty(), this.documentState = 0, this;
  }
  convertToUnknownDocument(t2) {
    return this.version = t2, this.documentType = 3, this.data = Ye.empty(), this.documentState = 2, this;
  }
  setHasCommittedMutations() {
    return this.documentState = 2, this;
  }
  setHasLocalMutations() {
    return this.documentState = 1, this.version = st.min(), this;
  }
  setReadTime(t2) {
    return this.readTime = t2, this;
  }
  get hasLocalMutations() {
    return 1 === this.documentState;
  }
  get hasCommittedMutations() {
    return 2 === this.documentState;
  }
  get hasPendingWrites() {
    return this.hasLocalMutations || this.hasCommittedMutations;
  }
  isValidDocument() {
    return 0 !== this.documentType;
  }
  isFoundDocument() {
    return 1 === this.documentType;
  }
  isNoDocument() {
    return 2 === this.documentType;
  }
  isUnknownDocument() {
    return 3 === this.documentType;
  }
  isEqual(t2) {
    return t2 instanceof Ze && this.key.isEqual(t2.key) && this.version.isEqual(t2.version) && this.documentType === t2.documentType && this.documentState === t2.documentState && this.data.isEqual(t2.data);
  }
  mutableCopy() {
    return new Ze(this.key, this.documentType, this.version, this.readTime, this.createTime, this.data.clone(), this.documentState);
  }
  toString() {
    return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`;
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class tn {
  constructor(t2, e = null, n = [], s = [], i = null, r = null, o = null) {
    this.path = t2, this.collectionGroup = e, this.orderBy = n, this.filters = s, this.limit = i, this.startAt = r, this.endAt = o, this.ft = null;
  }
}
function en(t2, e = null, n = [], s = [], i = null, r = null, o = null) {
  return new tn(t2, e, n, s, i, r, o);
}
function nn(t2) {
  const e = $(t2);
  if (null === e.ft) {
    let t3 = e.path.canonicalString();
    null !== e.collectionGroup && (t3 += "|cg:" + e.collectionGroup), t3 += "|f:", t3 += e.filters.map((t4) => De(t4)).join(","), t3 += "|ob:", t3 += e.orderBy.map((t4) => function(t5) {
      return t5.field.canonicalString() + t5.dir;
    }(t4)).join(","), qt(e.limit) || (t3 += "|l:", t3 += e.limit), e.startAt && (t3 += "|lb:", t3 += e.startAt.inclusive ? "b:" : "a:", t3 += e.startAt.position.map((t4) => oe(t4)).join(",")), e.endAt && (t3 += "|ub:", t3 += e.endAt.inclusive ? "a:" : "b:", t3 += e.endAt.position.map((t4) => oe(t4)).join(",")), e.ft = t3;
  }
  return e.ft;
}
function sn(t2, e) {
  if (t2.limit !== e.limit)
    return false;
  if (t2.orderBy.length !== e.orderBy.length)
    return false;
  for (let n = 0; n < t2.orderBy.length; n++)
    if (!Ke(t2.orderBy[n], e.orderBy[n]))
      return false;
  if (t2.filters.length !== e.filters.length)
    return false;
  for (let n = 0; n < t2.filters.length; n++)
    if (!Ce(t2.filters[n], e.filters[n]))
      return false;
  return t2.collectionGroup === e.collectionGroup && (!!t2.path.isEqual(e.path) && (!!Ee(t2.startAt, e.startAt) && Ee(t2.endAt, e.endAt)));
}
function rn(t2) {
  return ct.isDocumentKey(t2.path) && null === t2.collectionGroup && 0 === t2.filters.length;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class an {
  constructor(t2, e = null, n = [], s = [], i = null, r = "F", o = null, u = null) {
    this.path = t2, this.collectionGroup = e, this.explicitOrderBy = n, this.filters = s, this.limit = i, this.limitType = r, this.startAt = o, this.endAt = u, this.dt = null, this._t = null, this.startAt, this.endAt;
  }
}
function hn(t2, e, n, s, i, r, o, u) {
  return new an(t2, e, n, s, i, r, o, u);
}
function ln(t2) {
  return new an(t2);
}
function fn(t2) {
  return 0 === t2.filters.length && null === t2.limit && null == t2.startAt && null == t2.endAt && (0 === t2.explicitOrderBy.length || 1 === t2.explicitOrderBy.length && t2.explicitOrderBy[0].field.isKeyField());
}
function dn(t2) {
  return t2.explicitOrderBy.length > 0 ? t2.explicitOrderBy[0].field : null;
}
function _n(t2) {
  for (const e of t2.filters) {
    const t3 = e.getFirstInequalityField();
    if (null !== t3)
      return t3;
  }
  return null;
}
function wn(t2) {
  return null !== t2.collectionGroup;
}
function mn(t2) {
  const e = $(t2);
  if (null === e.dt) {
    e.dt = [];
    const t3 = _n(e), n = dn(e);
    if (null !== t3 && null === n)
      t3.isKeyField() || e.dt.push(new Ue(t3)), e.dt.push(new Ue(ut.keyField(), "asc"));
    else {
      let t4 = false;
      for (const n2 of e.explicitOrderBy)
        e.dt.push(n2), n2.field.isKeyField() && (t4 = true);
      if (!t4) {
        const t5 = e.explicitOrderBy.length > 0 ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir : "asc";
        e.dt.push(new Ue(ut.keyField(), t5));
      }
    }
  }
  return e.dt;
}
function gn(t2) {
  const e = $(t2);
  if (!e._t)
    if ("F" === e.limitType)
      e._t = en(e.path, e.collectionGroup, mn(e), e.filters, e.limit, e.startAt, e.endAt);
    else {
      const t3 = [];
      for (const n2 of mn(e)) {
        const e2 = "desc" === n2.dir ? "asc" : "desc";
        t3.push(new Ue(n2.field, e2));
      }
      const n = e.endAt ? new Ie(e.endAt.position, e.endAt.inclusive) : null, s = e.startAt ? new Ie(e.startAt.position, e.startAt.inclusive) : null;
      e._t = en(e.path, e.collectionGroup, t3, e.filters, e.limit, n, s);
    }
  return e._t;
}
function pn(t2, e, n) {
  return new an(t2.path, t2.collectionGroup, t2.explicitOrderBy.slice(), t2.filters.slice(), e, n, t2.startAt, t2.endAt);
}
function In(t2, e) {
  return sn(gn(t2), gn(e)) && t2.limitType === e.limitType;
}
function Tn(t2) {
  return `${nn(gn(t2))}|lt:${t2.limitType}`;
}
function En(t2) {
  return `Query(target=${function(t3) {
    let e = t3.path.canonicalString();
    return null !== t3.collectionGroup && (e += " collectionGroup=" + t3.collectionGroup), t3.filters.length > 0 && (e += `, filters: [${t3.filters.map((t4) => Ne(t4)).join(", ")}]`), qt(t3.limit) || (e += ", limit: " + t3.limit), t3.orderBy.length > 0 && (e += `, orderBy: [${t3.orderBy.map((t4) => function(t5) {
      return `${t5.field.canonicalString()} (${t5.dir})`;
    }(t4)).join(", ")}]`), t3.startAt && (e += ", startAt: ", e += t3.startAt.inclusive ? "b:" : "a:", e += t3.startAt.position.map((t4) => oe(t4)).join(",")), t3.endAt && (e += ", endAt: ", e += t3.endAt.inclusive ? "a:" : "b:", e += t3.endAt.position.map((t4) => oe(t4)).join(",")), `Target(${e})`;
  }(gn(t2))}; limitType=${t2.limitType})`;
}
function An(t2, e) {
  return e.isFoundDocument() && function(t3, e2) {
    const n = e2.key.path;
    return null !== t3.collectionGroup ? e2.key.hasCollectionId(t3.collectionGroup) && t3.path.isPrefixOf(n) : ct.isDocumentKey(t3.path) ? t3.path.isEqual(n) : t3.path.isImmediateParentOf(n);
  }(t2, e) && function(t3, e2) {
    for (const n of mn(t3))
      if (!n.field.isKeyField() && null === e2.data.field(n.field))
        return false;
    return true;
  }(t2, e) && function(t3, e2) {
    for (const n of t3.filters)
      if (!n.matches(e2))
        return false;
    return true;
  }(t2, e) && function(t3, e2) {
    if (t3.startAt && !function(t4, e3, n) {
      const s = Te(t4, e3, n);
      return t4.inclusive ? s <= 0 : s < 0;
    }(t3.startAt, mn(t3), e2))
      return false;
    if (t3.endAt && !function(t4, e3, n) {
      const s = Te(t4, e3, n);
      return t4.inclusive ? s >= 0 : s > 0;
    }(t3.endAt, mn(t3), e2))
      return false;
    return true;
  }(t2, e);
}
function Rn(t2) {
  return t2.collectionGroup || (t2.path.length % 2 == 1 ? t2.path.lastSegment() : t2.path.get(t2.path.length - 2));
}
function bn(t2) {
  return (e, n) => {
    let s = false;
    for (const i of mn(t2)) {
      const t3 = Pn(i, e, n);
      if (0 !== t3)
        return t3;
      s = s || i.field.isKeyField();
    }
    return 0;
  };
}
function Pn(t2, e, n) {
  const s = t2.field.isKeyField() ? ct.comparator(e.key, n.key) : function(t3, e2, n2) {
    const s2 = e2.data.field(t3), i = n2.data.field(t3);
    return null !== s2 && null !== i ? ie(s2, i) : O();
  }(t2.field, e, n);
  switch (t2.dir) {
    case "asc":
      return s;
    case "desc":
      return -1 * s;
    default:
      return O();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function vn(t2, e) {
  if (t2.wt) {
    if (isNaN(e))
      return {
        doubleValue: "NaN"
      };
    if (e === 1 / 0)
      return {
        doubleValue: "Infinity"
      };
    if (e === -1 / 0)
      return {
        doubleValue: "-Infinity"
      };
  }
  return {
    doubleValue: Ut(e) ? "-0" : e
  };
}
function Vn(t2) {
  return {
    integerValue: "" + t2
  };
}
function Sn(t2, e) {
  return Kt(e) ? Vn(e) : vn(t2, e);
}
/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Dn {
  constructor() {
    this._ = void 0;
  }
}
function Cn(t2, e, n) {
  return t2 instanceof kn ? function(t3, e2) {
    const n2 = {
      fields: {
        __type__: {
          stringValue: "server_timestamp"
        },
        __local_write_time__: {
          timestampValue: {
            seconds: t3.seconds,
            nanos: t3.nanoseconds
          }
        }
      }
    };
    return e2 && (n2.fields.__previous_value__ = e2), {
      mapValue: n2
    };
  }(n, e) : t2 instanceof On ? Mn(t2, e) : t2 instanceof Fn ? $n(t2, e) : function(t3, e2) {
    const n2 = Nn(t3, e2), s = Ln(n2) + Ln(t3.gt);
    return ae(n2) && ae(t3.gt) ? Vn(s) : vn(t3.yt, s);
  }(t2, e);
}
function xn(t2, e, n) {
  return t2 instanceof On ? Mn(t2, e) : t2 instanceof Fn ? $n(t2, e) : n;
}
function Nn(t2, e) {
  return t2 instanceof Bn ? ae(n = e) || function(t3) {
    return !!t3 && "doubleValue" in t3;
  }(n) ? e : {
    integerValue: 0
  } : null;
  var n;
}
class kn extends Dn {
}
class On extends Dn {
  constructor(t2) {
    super(), this.elements = t2;
  }
}
function Mn(t2, e) {
  const n = qn(e);
  for (const e2 of t2.elements)
    n.some((t3) => ne(t3, e2)) || n.push(e2);
  return {
    arrayValue: {
      values: n
    }
  };
}
class Fn extends Dn {
  constructor(t2) {
    super(), this.elements = t2;
  }
}
function $n(t2, e) {
  let n = qn(e);
  for (const e2 of t2.elements)
    n = n.filter((t3) => !ne(t3, e2));
  return {
    arrayValue: {
      values: n
    }
  };
}
class Bn extends Dn {
  constructor(t2, e) {
    super(), this.yt = t2, this.gt = e;
  }
}
function Ln(t2) {
  return zt(t2.integerValue || t2.doubleValue);
}
function qn(t2) {
  return he(t2) && t2.arrayValue.values ? t2.arrayValue.values.slice() : [];
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Un {
  constructor(t2, e) {
    this.field = t2, this.transform = e;
  }
}
function Kn(t2, e) {
  return t2.field.isEqual(e.field) && function(t3, e2) {
    return t3 instanceof On && e2 instanceof On || t3 instanceof Fn && e2 instanceof Fn ? tt(t3.elements, e2.elements, ne) : t3 instanceof Bn && e2 instanceof Bn ? ne(t3.gt, e2.gt) : t3 instanceof kn && e2 instanceof kn;
  }(t2.transform, e.transform);
}
class Gn {
  constructor(t2, e) {
    this.version = t2, this.transformResults = e;
  }
}
class Qn {
  constructor(t2, e) {
    this.updateTime = t2, this.exists = e;
  }
  static none() {
    return new Qn();
  }
  static exists(t2) {
    return new Qn(void 0, t2);
  }
  static updateTime(t2) {
    return new Qn(t2);
  }
  get isNone() {
    return void 0 === this.updateTime && void 0 === this.exists;
  }
  isEqual(t2) {
    return this.exists === t2.exists && (this.updateTime ? !!t2.updateTime && this.updateTime.isEqual(t2.updateTime) : !t2.updateTime);
  }
}
function jn(t2, e) {
  return void 0 !== t2.updateTime ? e.isFoundDocument() && e.version.isEqual(t2.updateTime) : void 0 === t2.exists || t2.exists === e.isFoundDocument();
}
class Wn {
}
function zn(t2, e) {
  if (!t2.hasLocalMutations || e && 0 === e.fields.length)
    return null;
  if (null === e)
    return t2.isNoDocument() ? new is(t2.key, Qn.none()) : new Zn(t2.key, t2.data, Qn.none());
  {
    const n = t2.data, s = Ye.empty();
    let i = new We(ut.comparator);
    for (let t3 of e.fields)
      if (!i.has(t3)) {
        let e2 = n.field(t3);
        null === e2 && t3.length > 1 && (t3 = t3.popLast(), e2 = n.field(t3)), null === e2 ? s.delete(t3) : s.set(t3, e2), i = i.add(t3);
      }
    return new ts(t2.key, s, new Je(i.toArray()), Qn.none());
  }
}
function Hn(t2, e, n) {
  t2 instanceof Zn ? function(t3, e2, n2) {
    const s = t3.value.clone(), i = ns(t3.fieldTransforms, e2, n2.transformResults);
    s.setAll(i), e2.convertToFoundDocument(n2.version, s).setHasCommittedMutations();
  }(t2, e, n) : t2 instanceof ts ? function(t3, e2, n2) {
    if (!jn(t3.precondition, e2))
      return void e2.convertToUnknownDocument(n2.version);
    const s = ns(t3.fieldTransforms, e2, n2.transformResults), i = e2.data;
    i.setAll(es(t3)), i.setAll(s), e2.convertToFoundDocument(n2.version, i).setHasCommittedMutations();
  }(t2, e, n) : function(t3, e2, n2) {
    e2.convertToNoDocument(n2.version).setHasCommittedMutations();
  }(0, e, n);
}
function Jn(t2, e, n, s) {
  return t2 instanceof Zn ? function(t3, e2, n2, s2) {
    if (!jn(t3.precondition, e2))
      return n2;
    const i = t3.value.clone(), r = ss(t3.fieldTransforms, s2, e2);
    return i.setAll(r), e2.convertToFoundDocument(e2.version, i).setHasLocalMutations(), null;
  }(t2, e, n, s) : t2 instanceof ts ? function(t3, e2, n2, s2) {
    if (!jn(t3.precondition, e2))
      return n2;
    const i = ss(t3.fieldTransforms, s2, e2), r = e2.data;
    if (r.setAll(es(t3)), r.setAll(i), e2.convertToFoundDocument(e2.version, r).setHasLocalMutations(), null === n2)
      return null;
    return n2.unionWith(t3.fieldMask.fields).unionWith(t3.fieldTransforms.map((t4) => t4.field));
  }(t2, e, n, s) : function(t3, e2, n2) {
    if (jn(t3.precondition, e2))
      return e2.convertToNoDocument(e2.version).setHasLocalMutations(), null;
    return n2;
  }(t2, e, n);
}
function Yn(t2, e) {
  let n = null;
  for (const s of t2.fieldTransforms) {
    const t3 = e.data.field(s.field), i = Nn(s.transform, t3 || null);
    null != i && (null === n && (n = Ye.empty()), n.set(s.field, i));
  }
  return n || null;
}
function Xn(t2, e) {
  return t2.type === e.type && (!!t2.key.isEqual(e.key) && (!!t2.precondition.isEqual(e.precondition) && (!!function(t3, e2) {
    return void 0 === t3 && void 0 === e2 || !(!t3 || !e2) && tt(t3, e2, (t4, e3) => Kn(t4, e3));
  }(t2.fieldTransforms, e.fieldTransforms) && (0 === t2.type ? t2.value.isEqual(e.value) : 1 !== t2.type || t2.data.isEqual(e.data) && t2.fieldMask.isEqual(e.fieldMask)))));
}
class Zn extends Wn {
  constructor(t2, e, n, s = []) {
    super(), this.key = t2, this.value = e, this.precondition = n, this.fieldTransforms = s, this.type = 0;
  }
  getFieldMask() {
    return null;
  }
}
class ts extends Wn {
  constructor(t2, e, n, s, i = []) {
    super(), this.key = t2, this.data = e, this.fieldMask = n, this.precondition = s, this.fieldTransforms = i, this.type = 1;
  }
  getFieldMask() {
    return this.fieldMask;
  }
}
function es(t2) {
  const e = /* @__PURE__ */ new Map();
  return t2.fieldMask.fields.forEach((n) => {
    if (!n.isEmpty()) {
      const s = t2.data.field(n);
      e.set(n, s);
    }
  }), e;
}
function ns(t2, e, n) {
  const s = /* @__PURE__ */ new Map();
  M(t2.length === n.length);
  for (let i = 0; i < n.length; i++) {
    const r = t2[i], o = r.transform, u = e.data.field(r.field);
    s.set(r.field, xn(o, u, n[i]));
  }
  return s;
}
function ss(t2, e, n) {
  const s = /* @__PURE__ */ new Map();
  for (const i of t2) {
    const t3 = i.transform, r = n.data.field(i.field);
    s.set(i.field, Cn(t3, r, e));
  }
  return s;
}
class is extends Wn {
  constructor(t2, e) {
    super(), this.key = t2, this.precondition = e, this.type = 2, this.fieldTransforms = [];
  }
  getFieldMask() {
    return null;
  }
}
class rs extends Wn {
  constructor(t2, e) {
    super(), this.key = t2, this.precondition = e, this.type = 3, this.fieldTransforms = [];
  }
  getFieldMask() {
    return null;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class os {
  constructor(t2) {
    this.count = t2;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var us, cs;
function as(t2) {
  switch (t2) {
    default:
      return O();
    case B.CANCELLED:
    case B.UNKNOWN:
    case B.DEADLINE_EXCEEDED:
    case B.RESOURCE_EXHAUSTED:
    case B.INTERNAL:
    case B.UNAVAILABLE:
    case B.UNAUTHENTICATED:
      return false;
    case B.INVALID_ARGUMENT:
    case B.NOT_FOUND:
    case B.ALREADY_EXISTS:
    case B.PERMISSION_DENIED:
    case B.FAILED_PRECONDITION:
    case B.ABORTED:
    case B.OUT_OF_RANGE:
    case B.UNIMPLEMENTED:
    case B.DATA_LOSS:
      return true;
  }
}
function hs(t2) {
  if (void 0 === t2)
    return x("GRPC error has no .code"), B.UNKNOWN;
  switch (t2) {
    case us.OK:
      return B.OK;
    case us.CANCELLED:
      return B.CANCELLED;
    case us.UNKNOWN:
      return B.UNKNOWN;
    case us.DEADLINE_EXCEEDED:
      return B.DEADLINE_EXCEEDED;
    case us.RESOURCE_EXHAUSTED:
      return B.RESOURCE_EXHAUSTED;
    case us.INTERNAL:
      return B.INTERNAL;
    case us.UNAVAILABLE:
      return B.UNAVAILABLE;
    case us.UNAUTHENTICATED:
      return B.UNAUTHENTICATED;
    case us.INVALID_ARGUMENT:
      return B.INVALID_ARGUMENT;
    case us.NOT_FOUND:
      return B.NOT_FOUND;
    case us.ALREADY_EXISTS:
      return B.ALREADY_EXISTS;
    case us.PERMISSION_DENIED:
      return B.PERMISSION_DENIED;
    case us.FAILED_PRECONDITION:
      return B.FAILED_PRECONDITION;
    case us.ABORTED:
      return B.ABORTED;
    case us.OUT_OF_RANGE:
      return B.OUT_OF_RANGE;
    case us.UNIMPLEMENTED:
      return B.UNIMPLEMENTED;
    case us.DATA_LOSS:
      return B.DATA_LOSS;
    default:
      return O();
  }
}
(cs = us || (us = {}))[cs.OK = 0] = "OK", cs[cs.CANCELLED = 1] = "CANCELLED", cs[cs.UNKNOWN = 2] = "UNKNOWN", cs[cs.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", cs[cs.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", cs[cs.NOT_FOUND = 5] = "NOT_FOUND", cs[cs.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", cs[cs.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", cs[cs.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", cs[cs.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", cs[cs.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", cs[cs.ABORTED = 10] = "ABORTED", cs[cs.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", cs[cs.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", cs[cs.INTERNAL = 13] = "INTERNAL", cs[cs.UNAVAILABLE = 14] = "UNAVAILABLE", cs[cs.DATA_LOSS = 15] = "DATA_LOSS";
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ls {
  constructor(t2, e) {
    this.mapKeyFn = t2, this.equalsFn = e, this.inner = {}, this.innerSize = 0;
  }
  get(t2) {
    const e = this.mapKeyFn(t2), n = this.inner[e];
    if (void 0 !== n) {
      for (const [e2, s] of n)
        if (this.equalsFn(e2, t2))
          return s;
    }
  }
  has(t2) {
    return void 0 !== this.get(t2);
  }
  set(t2, e) {
    const n = this.mapKeyFn(t2), s = this.inner[n];
    if (void 0 === s)
      return this.inner[n] = [[t2, e]], void this.innerSize++;
    for (let n2 = 0; n2 < s.length; n2++)
      if (this.equalsFn(s[n2][0], t2))
        return void (s[n2] = [t2, e]);
    s.push([t2, e]), this.innerSize++;
  }
  delete(t2) {
    const e = this.mapKeyFn(t2), n = this.inner[e];
    if (void 0 === n)
      return false;
    for (let s = 0; s < n.length; s++)
      if (this.equalsFn(n[s][0], t2))
        return 1 === n.length ? delete this.inner[e] : n.splice(s, 1), this.innerSize--, true;
    return false;
  }
  forEach(t2) {
    Bt(this.inner, (e, n) => {
      for (const [e2, s] of n)
        t2(e2, s);
    });
  }
  isEmpty() {
    return Lt(this.inner);
  }
  size() {
    return this.innerSize;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const fs = new Ge(ct.comparator);
function ds() {
  return fs;
}
const _s = new Ge(ct.comparator);
function ws(...t2) {
  let e = _s;
  for (const n of t2)
    e = e.insert(n.key, n);
  return e;
}
function ms(t2) {
  let e = _s;
  return t2.forEach((t3, n) => e = e.insert(t3, n.overlayedDocument)), e;
}
function gs() {
  return ps();
}
function ys() {
  return ps();
}
function ps() {
  return new ls((t2) => t2.toString(), (t2, e) => t2.isEqual(e));
}
const Is = new Ge(ct.comparator);
const Ts = new We(ct.comparator);
function Es(...t2) {
  let e = Ts;
  for (const n of t2)
    e = e.add(n);
  return e;
}
const As = new We(Z);
function Rs() {
  return As;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class bs {
  constructor(t2, e, n, s, i) {
    this.snapshotVersion = t2, this.targetChanges = e, this.targetMismatches = n, this.documentUpdates = s, this.resolvedLimboDocuments = i;
  }
  static createSynthesizedRemoteEventForCurrentChange(t2, e, n) {
    const s = /* @__PURE__ */ new Map();
    return s.set(t2, Ps.createSynthesizedTargetChangeForCurrentChange(t2, e, n)), new bs(st.min(), s, Rs(), ds(), Es());
  }
}
class Ps {
  constructor(t2, e, n, s, i) {
    this.resumeToken = t2, this.current = e, this.addedDocuments = n, this.modifiedDocuments = s, this.removedDocuments = i;
  }
  static createSynthesizedTargetChangeForCurrentChange(t2, e, n) {
    return new Ps(n, e, Es(), Es(), Es());
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class vs {
  constructor(t2, e, n, s) {
    this.It = t2, this.removedTargetIds = e, this.key = n, this.Tt = s;
  }
}
class Vs {
  constructor(t2, e) {
    this.targetId = t2, this.Et = e;
  }
}
class Ss {
  constructor(t2, e, n = Qt.EMPTY_BYTE_STRING, s = null) {
    this.state = t2, this.targetIds = e, this.resumeToken = n, this.cause = s;
  }
}
class Ds {
  constructor() {
    this.At = 0, this.Rt = Ns(), this.bt = Qt.EMPTY_BYTE_STRING, this.Pt = false, this.vt = true;
  }
  get current() {
    return this.Pt;
  }
  get resumeToken() {
    return this.bt;
  }
  get Vt() {
    return 0 !== this.At;
  }
  get St() {
    return this.vt;
  }
  Dt(t2) {
    t2.approximateByteSize() > 0 && (this.vt = true, this.bt = t2);
  }
  Ct() {
    let t2 = Es(), e = Es(), n = Es();
    return this.Rt.forEach((s, i) => {
      switch (i) {
        case 0:
          t2 = t2.add(s);
          break;
        case 2:
          e = e.add(s);
          break;
        case 1:
          n = n.add(s);
          break;
        default:
          O();
      }
    }), new Ps(this.bt, this.Pt, t2, e, n);
  }
  xt() {
    this.vt = false, this.Rt = Ns();
  }
  Nt(t2, e) {
    this.vt = true, this.Rt = this.Rt.insert(t2, e);
  }
  kt(t2) {
    this.vt = true, this.Rt = this.Rt.remove(t2);
  }
  Ot() {
    this.At += 1;
  }
  Mt() {
    this.At -= 1;
  }
  Ft() {
    this.vt = true, this.Pt = true;
  }
}
class Cs {
  constructor(t2) {
    this.$t = t2, this.Bt = /* @__PURE__ */ new Map(), this.Lt = ds(), this.qt = xs(), this.Ut = new We(Z);
  }
  Kt(t2) {
    for (const e of t2.It)
      t2.Tt && t2.Tt.isFoundDocument() ? this.Gt(e, t2.Tt) : this.Qt(e, t2.key, t2.Tt);
    for (const e of t2.removedTargetIds)
      this.Qt(e, t2.key, t2.Tt);
  }
  jt(t2) {
    this.forEachTarget(t2, (e) => {
      const n = this.Wt(e);
      switch (t2.state) {
        case 0:
          this.zt(e) && n.Dt(t2.resumeToken);
          break;
        case 1:
          n.Mt(), n.Vt || n.xt(), n.Dt(t2.resumeToken);
          break;
        case 2:
          n.Mt(), n.Vt || this.removeTarget(e);
          break;
        case 3:
          this.zt(e) && (n.Ft(), n.Dt(t2.resumeToken));
          break;
        case 4:
          this.zt(e) && (this.Ht(e), n.Dt(t2.resumeToken));
          break;
        default:
          O();
      }
    });
  }
  forEachTarget(t2, e) {
    t2.targetIds.length > 0 ? t2.targetIds.forEach(e) : this.Bt.forEach((t3, n) => {
      this.zt(n) && e(n);
    });
  }
  Jt(t2) {
    const e = t2.targetId, n = t2.Et.count, s = this.Yt(e);
    if (s) {
      const t3 = s.target;
      if (rn(t3))
        if (0 === n) {
          const n2 = new ct(t3.path);
          this.Qt(e, n2, Ze.newNoDocument(n2, st.min()));
        } else
          M(1 === n);
      else {
        this.Xt(e) !== n && (this.Ht(e), this.Ut = this.Ut.add(e));
      }
    }
  }
  Zt(t2) {
    const e = /* @__PURE__ */ new Map();
    this.Bt.forEach((n2, s2) => {
      const i = this.Yt(s2);
      if (i) {
        if (n2.current && rn(i.target)) {
          const e2 = new ct(i.target.path);
          null !== this.Lt.get(e2) || this.te(s2, e2) || this.Qt(s2, e2, Ze.newNoDocument(e2, t2));
        }
        n2.St && (e.set(s2, n2.Ct()), n2.xt());
      }
    });
    let n = Es();
    this.qt.forEach((t3, e2) => {
      let s2 = true;
      e2.forEachWhile((t4) => {
        const e3 = this.Yt(t4);
        return !e3 || 2 === e3.purpose || (s2 = false, false);
      }), s2 && (n = n.add(t3));
    }), this.Lt.forEach((e2, n2) => n2.setReadTime(t2));
    const s = new bs(t2, e, this.Ut, this.Lt, n);
    return this.Lt = ds(), this.qt = xs(), this.Ut = new We(Z), s;
  }
  Gt(t2, e) {
    if (!this.zt(t2))
      return;
    const n = this.te(t2, e.key) ? 2 : 0;
    this.Wt(t2).Nt(e.key, n), this.Lt = this.Lt.insert(e.key, e), this.qt = this.qt.insert(e.key, this.ee(e.key).add(t2));
  }
  Qt(t2, e, n) {
    if (!this.zt(t2))
      return;
    const s = this.Wt(t2);
    this.te(t2, e) ? s.Nt(e, 1) : s.kt(e), this.qt = this.qt.insert(e, this.ee(e).delete(t2)), n && (this.Lt = this.Lt.insert(e, n));
  }
  removeTarget(t2) {
    this.Bt.delete(t2);
  }
  Xt(t2) {
    const e = this.Wt(t2).Ct();
    return this.$t.getRemoteKeysForTarget(t2).size + e.addedDocuments.size - e.removedDocuments.size;
  }
  Ot(t2) {
    this.Wt(t2).Ot();
  }
  Wt(t2) {
    let e = this.Bt.get(t2);
    return e || (e = new Ds(), this.Bt.set(t2, e)), e;
  }
  ee(t2) {
    let e = this.qt.get(t2);
    return e || (e = new We(Z), this.qt = this.qt.insert(t2, e)), e;
  }
  zt(t2) {
    const e = null !== this.Yt(t2);
    return e || C("WatchChangeAggregator", "Detected inactive target", t2), e;
  }
  Yt(t2) {
    const e = this.Bt.get(t2);
    return e && e.Vt ? null : this.$t.ne(t2);
  }
  Ht(t2) {
    this.Bt.set(t2, new Ds());
    this.$t.getRemoteKeysForTarget(t2).forEach((e) => {
      this.Qt(t2, e, null);
    });
  }
  te(t2, e) {
    return this.$t.getRemoteKeysForTarget(t2).has(e);
  }
}
function xs() {
  return new Ge(ct.comparator);
}
function Ns() {
  return new Ge(ct.comparator);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const ks = (() => {
  const t2 = {
    asc: "ASCENDING",
    desc: "DESCENDING"
  };
  return t2;
})(), Os = (() => {
  const t2 = {
    "<": "LESS_THAN",
    "<=": "LESS_THAN_OR_EQUAL",
    ">": "GREATER_THAN",
    ">=": "GREATER_THAN_OR_EQUAL",
    "==": "EQUAL",
    "!=": "NOT_EQUAL",
    "array-contains": "ARRAY_CONTAINS",
    in: "IN",
    "not-in": "NOT_IN",
    "array-contains-any": "ARRAY_CONTAINS_ANY"
  };
  return t2;
})(), Ms = (() => {
  const t2 = {
    and: "AND",
    or: "OR"
  };
  return t2;
})();
class Fs {
  constructor(t2, e) {
    this.databaseId = t2, this.wt = e;
  }
}
function $s(t2, e) {
  if (t2.wt) {
    return `${new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + e.nanoseconds).slice(-9)}Z`;
  }
  return {
    seconds: "" + e.seconds,
    nanos: e.nanoseconds
  };
}
function Bs(t2, e) {
  return t2.wt ? e.toBase64() : e.toUint8Array();
}
function Ls(t2, e) {
  return $s(t2, e.toTimestamp());
}
function qs(t2) {
  return M(!!t2), st.fromTimestamp(function(t3) {
    const e = Wt(t3);
    return new nt(e.seconds, e.nanos);
  }(t2));
}
function Us(t2, e) {
  return function(t3) {
    return new rt(["projects", t3.projectId, "databases", t3.database]);
  }(t2).child("documents").child(e).canonicalString();
}
function Ks(t2) {
  const e = rt.fromString(t2);
  return M(wi(e)), e;
}
function Gs(t2, e) {
  return Us(t2.databaseId, e.path);
}
function Qs(t2, e) {
  const n = Ks(e);
  if (n.get(1) !== t2.databaseId.projectId)
    throw new L(B.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + t2.databaseId.projectId);
  if (n.get(3) !== t2.databaseId.database)
    throw new L(B.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + t2.databaseId.database);
  return new ct(Hs(n));
}
function js(t2, e) {
  return Us(t2.databaseId, e);
}
function Ws(t2) {
  const e = Ks(t2);
  return 4 === e.length ? rt.emptyPath() : Hs(e);
}
function zs(t2) {
  return new rt(["projects", t2.databaseId.projectId, "databases", t2.databaseId.database]).canonicalString();
}
function Hs(t2) {
  return M(t2.length > 4 && "documents" === t2.get(4)), t2.popFirst(5);
}
function Js(t2, e, n) {
  return {
    name: Gs(t2, e),
    fields: n.value.mapValue.fields
  };
}
function Zs(t2, e) {
  let n;
  if ("targetChange" in e) {
    e.targetChange;
    const s = function(t3) {
      return "NO_CHANGE" === t3 ? 0 : "ADD" === t3 ? 1 : "REMOVE" === t3 ? 2 : "CURRENT" === t3 ? 3 : "RESET" === t3 ? 4 : O();
    }(e.targetChange.targetChangeType || "NO_CHANGE"), i = e.targetChange.targetIds || [], r = function(t3, e2) {
      return t3.wt ? (M(void 0 === e2 || "string" == typeof e2), Qt.fromBase64String(e2 || "")) : (M(void 0 === e2 || e2 instanceof Uint8Array), Qt.fromUint8Array(e2 || new Uint8Array()));
    }(t2, e.targetChange.resumeToken), o = e.targetChange.cause, u = o && function(t3) {
      const e2 = void 0 === t3.code ? B.UNKNOWN : hs(t3.code);
      return new L(e2, t3.message || "");
    }(o);
    n = new Ss(s, i, r, u || null);
  } else if ("documentChange" in e) {
    e.documentChange;
    const s = e.documentChange;
    s.document, s.document.name, s.document.updateTime;
    const i = Qs(t2, s.document.name), r = qs(s.document.updateTime), o = s.document.createTime ? qs(s.document.createTime) : st.min(), u = new Ye({
      mapValue: {
        fields: s.document.fields
      }
    }), c = Ze.newFoundDocument(i, r, o, u), a = s.targetIds || [], h = s.removedTargetIds || [];
    n = new vs(a, h, c.key, c);
  } else if ("documentDelete" in e) {
    e.documentDelete;
    const s = e.documentDelete;
    s.document;
    const i = Qs(t2, s.document), r = s.readTime ? qs(s.readTime) : st.min(), o = Ze.newNoDocument(i, r), u = s.removedTargetIds || [];
    n = new vs([], u, o.key, o);
  } else if ("documentRemove" in e) {
    e.documentRemove;
    const s = e.documentRemove;
    s.document;
    const i = Qs(t2, s.document), r = s.removedTargetIds || [];
    n = new vs([], r, i, null);
  } else {
    if (!("filter" in e))
      return O();
    {
      e.filter;
      const t3 = e.filter;
      t3.targetId;
      const s = t3.count || 0, i = new os(s), r = t3.targetId;
      n = new Vs(r, i);
    }
  }
  return n;
}
function ti(t2, e) {
  let n;
  if (e instanceof Zn)
    n = {
      update: Js(t2, e.key, e.value)
    };
  else if (e instanceof is)
    n = {
      delete: Gs(t2, e.key)
    };
  else if (e instanceof ts)
    n = {
      update: Js(t2, e.key, e.data),
      updateMask: _i(e.fieldMask)
    };
  else {
    if (!(e instanceof rs))
      return O();
    n = {
      verify: Gs(t2, e.key)
    };
  }
  return e.fieldTransforms.length > 0 && (n.updateTransforms = e.fieldTransforms.map((t3) => function(t4, e2) {
    const n2 = e2.transform;
    if (n2 instanceof kn)
      return {
        fieldPath: e2.field.canonicalString(),
        setToServerValue: "REQUEST_TIME"
      };
    if (n2 instanceof On)
      return {
        fieldPath: e2.field.canonicalString(),
        appendMissingElements: {
          values: n2.elements
        }
      };
    if (n2 instanceof Fn)
      return {
        fieldPath: e2.field.canonicalString(),
        removeAllFromArray: {
          values: n2.elements
        }
      };
    if (n2 instanceof Bn)
      return {
        fieldPath: e2.field.canonicalString(),
        increment: n2.gt
      };
    throw O();
  }(0, t3))), e.precondition.isNone || (n.currentDocument = function(t3, e2) {
    return void 0 !== e2.updateTime ? {
      updateTime: Ls(t3, e2.updateTime)
    } : void 0 !== e2.exists ? {
      exists: e2.exists
    } : O();
  }(t2, e.precondition)), n;
}
function ni(t2, e) {
  return t2 && t2.length > 0 ? (M(void 0 !== e), t2.map((t3) => function(t4, e2) {
    let n = t4.updateTime ? qs(t4.updateTime) : qs(e2);
    return n.isEqual(st.min()) && (n = qs(e2)), new Gn(n, t4.transformResults || []);
  }(t3, e))) : [];
}
function si(t2, e) {
  return {
    documents: [js(t2, e.path)]
  };
}
function ii(t2, e) {
  const n = {
    structuredQuery: {}
  }, s = e.path;
  null !== e.collectionGroup ? (n.parent = js(t2, s), n.structuredQuery.from = [{
    collectionId: e.collectionGroup,
    allDescendants: true
  }]) : (n.parent = js(t2, s.popLast()), n.structuredQuery.from = [{
    collectionId: s.lastSegment()
  }]);
  const i = function(t3) {
    if (0 === t3.length)
      return;
    return di(be.create(t3, "and"));
  }(e.filters);
  i && (n.structuredQuery.where = i);
  const r = function(t3) {
    if (0 === t3.length)
      return;
    return t3.map((t4) => function(t5) {
      return {
        field: li(t5.field),
        direction: ci(t5.dir)
      };
    }(t4));
  }(e.orderBy);
  r && (n.structuredQuery.orderBy = r);
  const o = function(t3, e2) {
    return t3.wt || qt(e2) ? e2 : {
      value: e2
    };
  }(t2, e.limit);
  var u;
  return null !== o && (n.structuredQuery.limit = o), e.startAt && (n.structuredQuery.startAt = {
    before: (u = e.startAt).inclusive,
    values: u.position
  }), e.endAt && (n.structuredQuery.endAt = function(t3) {
    return {
      before: !t3.inclusive,
      values: t3.position
    };
  }(e.endAt)), n;
}
function ri(t2) {
  let e = Ws(t2.parent);
  const n = t2.structuredQuery, s = n.from ? n.from.length : 0;
  let i = null;
  if (s > 0) {
    M(1 === s);
    const t3 = n.from[0];
    t3.allDescendants ? i = t3.collectionId : e = e.child(t3.collectionId);
  }
  let r = [];
  n.where && (r = function(t3) {
    const e2 = ui(t3);
    if (e2 instanceof be && Ve(e2))
      return e2.getFilters();
    return [e2];
  }(n.where));
  let o = [];
  n.orderBy && (o = n.orderBy.map((t3) => function(t4) {
    return new Ue(
      fi(t4.field),
      function(t5) {
        switch (t5) {
          case "ASCENDING":
            return "asc";
          case "DESCENDING":
            return "desc";
          default:
            return;
        }
      }(t4.direction)
    );
  }(t3)));
  let u = null;
  n.limit && (u = function(t3) {
    let e2;
    return e2 = "object" == typeof t3 ? t3.value : t3, qt(e2) ? null : e2;
  }(n.limit));
  let c = null;
  n.startAt && (c = function(t3) {
    const e2 = !!t3.before, n2 = t3.values || [];
    return new Ie(n2, e2);
  }(n.startAt));
  let a = null;
  return n.endAt && (a = function(t3) {
    const e2 = !t3.before, n2 = t3.values || [];
    return new Ie(n2, e2);
  }(n.endAt)), hn(e, i, o, r, u, "F", c, a);
}
function oi(t2, e) {
  const n = function(t3, e2) {
    switch (e2) {
      case 0:
        return null;
      case 1:
        return "existence-filter-mismatch";
      case 2:
        return "limbo-document";
      default:
        return O();
    }
  }(0, e.purpose);
  return null == n ? null : {
    "goog-listen-tags": n
  };
}
function ui(t2) {
  return void 0 !== t2.unaryFilter ? function(t3) {
    switch (t3.unaryFilter.op) {
      case "IS_NAN":
        const e = fi(t3.unaryFilter.field);
        return Re.create(e, "==", {
          doubleValue: NaN
        });
      case "IS_NULL":
        const n = fi(t3.unaryFilter.field);
        return Re.create(n, "==", {
          nullValue: "NULL_VALUE"
        });
      case "IS_NOT_NAN":
        const s = fi(t3.unaryFilter.field);
        return Re.create(s, "!=", {
          doubleValue: NaN
        });
      case "IS_NOT_NULL":
        const i = fi(t3.unaryFilter.field);
        return Re.create(i, "!=", {
          nullValue: "NULL_VALUE"
        });
      default:
        return O();
    }
  }(t2) : void 0 !== t2.fieldFilter ? function(t3) {
    return Re.create(fi(t3.fieldFilter.field), function(t4) {
      switch (t4) {
        case "EQUAL":
          return "==";
        case "NOT_EQUAL":
          return "!=";
        case "GREATER_THAN":
          return ">";
        case "GREATER_THAN_OR_EQUAL":
          return ">=";
        case "LESS_THAN":
          return "<";
        case "LESS_THAN_OR_EQUAL":
          return "<=";
        case "ARRAY_CONTAINS":
          return "array-contains";
        case "IN":
          return "in";
        case "NOT_IN":
          return "not-in";
        case "ARRAY_CONTAINS_ANY":
          return "array-contains-any";
        default:
          return O();
      }
    }(t3.fieldFilter.op), t3.fieldFilter.value);
  }(t2) : void 0 !== t2.compositeFilter ? function(t3) {
    return be.create(t3.compositeFilter.filters.map((t4) => ui(t4)), function(t4) {
      switch (t4) {
        case "AND":
          return "and";
        case "OR":
          return "or";
        default:
          return O();
      }
    }(t3.compositeFilter.op));
  }(t2) : O();
}
function ci(t2) {
  return ks[t2];
}
function ai(t2) {
  return Os[t2];
}
function hi(t2) {
  return Ms[t2];
}
function li(t2) {
  return {
    fieldPath: t2.canonicalString()
  };
}
function fi(t2) {
  return ut.fromServerFormat(t2.fieldPath);
}
function di(t2) {
  return t2 instanceof Re ? function(t3) {
    if ("==" === t3.op) {
      if (fe(t3.value))
        return {
          unaryFilter: {
            field: li(t3.field),
            op: "IS_NAN"
          }
        };
      if (le(t3.value))
        return {
          unaryFilter: {
            field: li(t3.field),
            op: "IS_NULL"
          }
        };
    } else if ("!=" === t3.op) {
      if (fe(t3.value))
        return {
          unaryFilter: {
            field: li(t3.field),
            op: "IS_NOT_NAN"
          }
        };
      if (le(t3.value))
        return {
          unaryFilter: {
            field: li(t3.field),
            op: "IS_NOT_NULL"
          }
        };
    }
    return {
      fieldFilter: {
        field: li(t3.field),
        op: ai(t3.op),
        value: t3.value
      }
    };
  }(t2) : t2 instanceof be ? function(t3) {
    const e = t3.getFilters().map((t4) => di(t4));
    if (1 === e.length)
      return e[0];
    return {
      compositeFilter: {
        op: hi(t3.op),
        filters: e
      }
    };
  }(t2) : O();
}
function _i(t2) {
  const e = [];
  return t2.fields.forEach((t3) => e.push(t3.canonicalString())), {
    fieldPaths: e
  };
}
function wi(t2) {
  return t2.length >= 4 && "projects" === t2.get(0) && "databases" === t2.get(2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Qi {
  constructor(t2, e, n, s) {
    this.batchId = t2, this.localWriteTime = e, this.baseMutations = n, this.mutations = s;
  }
  applyToRemoteDocument(t2, e) {
    const n = e.mutationResults;
    for (let e2 = 0; e2 < this.mutations.length; e2++) {
      const s = this.mutations[e2];
      if (s.key.isEqual(t2.key)) {
        Hn(s, t2, n[e2]);
      }
    }
  }
  applyToLocalView(t2, e) {
    for (const n of this.baseMutations)
      n.key.isEqual(t2.key) && (e = Jn(n, t2, e, this.localWriteTime));
    for (const n of this.mutations)
      n.key.isEqual(t2.key) && (e = Jn(n, t2, e, this.localWriteTime));
    return e;
  }
  applyToLocalDocumentSet(t2, e) {
    const n = ys();
    return this.mutations.forEach((s) => {
      const i = t2.get(s.key), r = i.overlayedDocument;
      let o = this.applyToLocalView(r, i.mutatedFields);
      o = e.has(s.key) ? null : o;
      const u = zn(r, o);
      null !== u && n.set(s.key, u), r.isValidDocument() || r.convertToNoDocument(st.min());
    }), n;
  }
  keys() {
    return this.mutations.reduce((t2, e) => t2.add(e.key), Es());
  }
  isEqual(t2) {
    return this.batchId === t2.batchId && tt(this.mutations, t2.mutations, (t3, e) => Xn(t3, e)) && tt(this.baseMutations, t2.baseMutations, (t3, e) => Xn(t3, e));
  }
}
class ji {
  constructor(t2, e, n, s) {
    this.batch = t2, this.commitVersion = e, this.mutationResults = n, this.docVersions = s;
  }
  static from(t2, e, n) {
    M(t2.mutations.length === n.length);
    let s = Is;
    const i = t2.mutations;
    for (let t3 = 0; t3 < i.length; t3++)
      s = s.insert(i[t3].key, n[t3].version);
    return new ji(t2, e, n, s);
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Wi {
  constructor(t2, e) {
    this.largestBatchId = t2, this.mutation = e;
  }
  getKey() {
    return this.mutation.key;
  }
  isEqual(t2) {
    return null !== t2 && this.mutation === t2.mutation;
  }
  toString() {
    return `Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class zi {
  constructor(t2, e, n, s, i = st.min(), r = st.min(), o = Qt.EMPTY_BYTE_STRING) {
    this.target = t2, this.targetId = e, this.purpose = n, this.sequenceNumber = s, this.snapshotVersion = i, this.lastLimboFreeSnapshotVersion = r, this.resumeToken = o;
  }
  withSequenceNumber(t2) {
    return new zi(this.target, this.targetId, this.purpose, t2, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken);
  }
  withResumeToken(t2, e) {
    return new zi(this.target, this.targetId, this.purpose, this.sequenceNumber, e, this.lastLimboFreeSnapshotVersion, t2);
  }
  withLastLimboFreeSnapshotVersion(t2) {
    return new zi(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, t2, this.resumeToken);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Hi {
  constructor(t2) {
    this.ie = t2;
  }
}
function ir(t2) {
  const e = ri({
    parent: t2.parent,
    structuredQuery: t2.structuredQuery
  });
  return "LAST" === t2.limitType ? pn(e, e.limit, "L") : e;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Nr {
  constructor() {
    this.Je = new kr();
  }
  addToCollectionParentIndex(t2, e) {
    return this.Je.add(e), At.resolve();
  }
  getCollectionParents(t2, e) {
    return At.resolve(this.Je.getEntries(e));
  }
  addFieldIndex(t2, e) {
    return At.resolve();
  }
  deleteFieldIndex(t2, e) {
    return At.resolve();
  }
  getDocumentsMatchingTarget(t2, e) {
    return At.resolve(null);
  }
  getIndexType(t2, e) {
    return At.resolve(0);
  }
  getFieldIndexes(t2, e) {
    return At.resolve([]);
  }
  getNextCollectionGroupToUpdate(t2) {
    return At.resolve(null);
  }
  getMinOffset(t2, e) {
    return At.resolve(yt.min());
  }
  getMinOffsetFromCollectionGroup(t2, e) {
    return At.resolve(yt.min());
  }
  updateCollectionGroup(t2, e, n) {
    return At.resolve();
  }
  updateIndexEntries(t2, e) {
    return At.resolve();
  }
}
class kr {
  constructor() {
    this.index = {};
  }
  add(t2) {
    const e = t2.lastSegment(), n = t2.popLast(), s = this.index[e] || new We(rt.comparator), i = !s.has(n);
    return this.index[e] = s.add(n), i;
  }
  has(t2) {
    const e = t2.lastSegment(), n = t2.popLast(), s = this.index[e];
    return s && s.has(n);
  }
  getEntries(t2) {
    return (this.index[t2] || new We(rt.comparator)).toArray();
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Yr {
  constructor(t2) {
    this.bn = t2;
  }
  next() {
    return this.bn += 2, this.bn;
  }
  static Pn() {
    return new Yr(0);
  }
  static vn() {
    return new Yr(-1);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class co {
  constructor() {
    this.changes = new ls((t2) => t2.toString(), (t2, e) => t2.isEqual(e)), this.changesApplied = false;
  }
  addEntry(t2) {
    this.assertNotApplied(), this.changes.set(t2.key, t2);
  }
  removeEntry(t2, e) {
    this.assertNotApplied(), this.changes.set(t2, Ze.newInvalidDocument(t2).setReadTime(e));
  }
  getEntry(t2, e) {
    this.assertNotApplied();
    const n = this.changes.get(e);
    return void 0 !== n ? At.resolve(n) : this.getFromCache(t2, e);
  }
  getEntries(t2, e) {
    return this.getAllFromCache(t2, e);
  }
  apply(t2) {
    return this.assertNotApplied(), this.changesApplied = true, this.applyChanges(t2);
  }
  assertNotApplied() {
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class yo {
  constructor(t2, e) {
    this.overlayedDocument = t2, this.mutatedFields = e;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class po {
  constructor(t2, e, n, s) {
    this.remoteDocumentCache = t2, this.mutationQueue = e, this.documentOverlayCache = n, this.indexManager = s;
  }
  getDocument(t2, e) {
    let n = null;
    return this.documentOverlayCache.getOverlay(t2, e).next((s) => (n = s, this.remoteDocumentCache.getEntry(t2, e))).next((t3) => (null !== n && Jn(n.mutation, t3, Je.empty(), nt.now()), t3));
  }
  getDocuments(t2, e) {
    return this.remoteDocumentCache.getEntries(t2, e).next((e2) => this.getLocalViewOfDocuments(t2, e2, Es()).next(() => e2));
  }
  getLocalViewOfDocuments(t2, e, n = Es()) {
    const s = gs();
    return this.populateOverlays(t2, s, e).next(() => this.computeViews(t2, e, s, n).next((t3) => {
      let e2 = ws();
      return t3.forEach((t4, n2) => {
        e2 = e2.insert(t4, n2.overlayedDocument);
      }), e2;
    }));
  }
  getOverlayedDocuments(t2, e) {
    const n = gs();
    return this.populateOverlays(t2, n, e).next(() => this.computeViews(t2, e, n, Es()));
  }
  populateOverlays(t2, e, n) {
    const s = [];
    return n.forEach((t3) => {
      e.has(t3) || s.push(t3);
    }), this.documentOverlayCache.getOverlays(t2, s).next((t3) => {
      t3.forEach((t4, n2) => {
        e.set(t4, n2);
      });
    });
  }
  computeViews(t2, e, n, s) {
    let i = ds();
    const r = ps(), o = ps();
    return e.forEach((t3, e2) => {
      const o2 = n.get(e2.key);
      s.has(e2.key) && (void 0 === o2 || o2.mutation instanceof ts) ? i = i.insert(e2.key, e2) : void 0 !== o2 ? (r.set(e2.key, o2.mutation.getFieldMask()), Jn(o2.mutation, e2, o2.mutation.getFieldMask(), nt.now())) : r.set(e2.key, Je.empty());
    }), this.recalculateAndSaveOverlays(t2, i).next((t3) => (t3.forEach((t4, e2) => r.set(t4, e2)), e.forEach((t4, e2) => {
      var n2;
      return o.set(t4, new yo(e2, null !== (n2 = r.get(t4)) && void 0 !== n2 ? n2 : null));
    }), o));
  }
  recalculateAndSaveOverlays(t2, e) {
    const n = ps();
    let s = new Ge((t3, e2) => t3 - e2), i = Es();
    return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t2, e).next((t3) => {
      for (const i2 of t3)
        i2.keys().forEach((t4) => {
          const r = e.get(t4);
          if (null === r)
            return;
          let o = n.get(t4) || Je.empty();
          o = i2.applyToLocalView(r, o), n.set(t4, o);
          const u = (s.get(i2.batchId) || Es()).add(t4);
          s = s.insert(i2.batchId, u);
        });
    }).next(() => {
      const r = [], o = s.getReverseIterator();
      for (; o.hasNext(); ) {
        const s2 = o.getNext(), u = s2.key, c = s2.value, a = ys();
        c.forEach((t3) => {
          if (!i.has(t3)) {
            const s3 = zn(e.get(t3), n.get(t3));
            null !== s3 && a.set(t3, s3), i = i.add(t3);
          }
        }), r.push(this.documentOverlayCache.saveOverlays(t2, u, a));
      }
      return At.waitFor(r);
    }).next(() => n);
  }
  recalculateAndSaveOverlaysForDocumentKeys(t2, e) {
    return this.remoteDocumentCache.getEntries(t2, e).next((e2) => this.recalculateAndSaveOverlays(t2, e2));
  }
  getDocumentsMatchingQuery(t2, e, n) {
    return function(t3) {
      return ct.isDocumentKey(t3.path) && null === t3.collectionGroup && 0 === t3.filters.length;
    }(e) ? this.getDocumentsMatchingDocumentQuery(t2, e.path) : wn(e) ? this.getDocumentsMatchingCollectionGroupQuery(t2, e, n) : this.getDocumentsMatchingCollectionQuery(t2, e, n);
  }
  getNextDocuments(t2, e, n, s) {
    return this.remoteDocumentCache.getAllFromCollectionGroup(t2, e, n, s).next((i) => {
      const r = s - i.size > 0 ? this.documentOverlayCache.getOverlaysForCollectionGroup(t2, e, n.largestBatchId, s - i.size) : At.resolve(gs());
      let o = -1, u = i;
      return r.next((e2) => At.forEach(e2, (e3, n2) => (o < n2.largestBatchId && (o = n2.largestBatchId), i.get(e3) ? At.resolve() : this.remoteDocumentCache.getEntry(t2, e3).next((t3) => {
        u = u.insert(e3, t3);
      }))).next(() => this.populateOverlays(t2, e2, i)).next(() => this.computeViews(t2, u, e2, Es())).next((t3) => ({
        batchId: o,
        changes: ms(t3)
      })));
    });
  }
  getDocumentsMatchingDocumentQuery(t2, e) {
    return this.getDocument(t2, new ct(e)).next((t3) => {
      let e2 = ws();
      return t3.isFoundDocument() && (e2 = e2.insert(t3.key, t3)), e2;
    });
  }
  getDocumentsMatchingCollectionGroupQuery(t2, e, n) {
    const s = e.collectionGroup;
    let i = ws();
    return this.indexManager.getCollectionParents(t2, s).next((r) => At.forEach(r, (r2) => {
      const o = function(t3, e2) {
        return new an(
          e2,
          null,
          t3.explicitOrderBy.slice(),
          t3.filters.slice(),
          t3.limit,
          t3.limitType,
          t3.startAt,
          t3.endAt
        );
      }(e, r2.child(s));
      return this.getDocumentsMatchingCollectionQuery(t2, o, n).next((t3) => {
        t3.forEach((t4, e2) => {
          i = i.insert(t4, e2);
        });
      });
    }).next(() => i));
  }
  getDocumentsMatchingCollectionQuery(t2, e, n) {
    let s;
    return this.documentOverlayCache.getOverlaysForCollection(t2, e.path, n.largestBatchId).next((i) => (s = i, this.remoteDocumentCache.getDocumentsMatchingQuery(t2, e, n, s))).next((t3) => {
      s.forEach((e2, n3) => {
        const s2 = n3.getKey();
        null === t3.get(s2) && (t3 = t3.insert(s2, Ze.newInvalidDocument(s2)));
      });
      let n2 = ws();
      return t3.forEach((t4, i) => {
        const r = s.get(t4);
        void 0 !== r && Jn(r.mutation, i, Je.empty(), nt.now()), An(e, i) && (n2 = n2.insert(t4, i));
      }), n2;
    });
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Io {
  constructor(t2) {
    this.yt = t2, this.Zn = /* @__PURE__ */ new Map(), this.ts = /* @__PURE__ */ new Map();
  }
  getBundleMetadata(t2, e) {
    return At.resolve(this.Zn.get(e));
  }
  saveBundleMetadata(t2, e) {
    var n;
    return this.Zn.set(e.id, {
      id: (n = e).id,
      version: n.version,
      createTime: qs(n.createTime)
    }), At.resolve();
  }
  getNamedQuery(t2, e) {
    return At.resolve(this.ts.get(e));
  }
  saveNamedQuery(t2, e) {
    return this.ts.set(e.name, function(t3) {
      return {
        name: t3.name,
        query: ir(t3.bundledQuery),
        readTime: qs(t3.readTime)
      };
    }(e)), At.resolve();
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class To {
  constructor() {
    this.overlays = new Ge(ct.comparator), this.es = /* @__PURE__ */ new Map();
  }
  getOverlay(t2, e) {
    return At.resolve(this.overlays.get(e));
  }
  getOverlays(t2, e) {
    const n = gs();
    return At.forEach(e, (e2) => this.getOverlay(t2, e2).next((t3) => {
      null !== t3 && n.set(e2, t3);
    })).next(() => n);
  }
  saveOverlays(t2, e, n) {
    return n.forEach((n2, s) => {
      this.oe(t2, e, s);
    }), At.resolve();
  }
  removeOverlaysForBatchId(t2, e, n) {
    const s = this.es.get(n);
    return void 0 !== s && (s.forEach((t3) => this.overlays = this.overlays.remove(t3)), this.es.delete(n)), At.resolve();
  }
  getOverlaysForCollection(t2, e, n) {
    const s = gs(), i = e.length + 1, r = new ct(e.child("")), o = this.overlays.getIteratorFrom(r);
    for (; o.hasNext(); ) {
      const t3 = o.getNext().value, r2 = t3.getKey();
      if (!e.isPrefixOf(r2.path))
        break;
      r2.path.length === i && (t3.largestBatchId > n && s.set(t3.getKey(), t3));
    }
    return At.resolve(s);
  }
  getOverlaysForCollectionGroup(t2, e, n, s) {
    let i = new Ge((t3, e2) => t3 - e2);
    const r = this.overlays.getIterator();
    for (; r.hasNext(); ) {
      const t3 = r.getNext().value;
      if (t3.getKey().getCollectionGroup() === e && t3.largestBatchId > n) {
        let e2 = i.get(t3.largestBatchId);
        null === e2 && (e2 = gs(), i = i.insert(t3.largestBatchId, e2)), e2.set(t3.getKey(), t3);
      }
    }
    const o = gs(), u = i.getIterator();
    for (; u.hasNext(); ) {
      if (u.getNext().value.forEach((t3, e2) => o.set(t3, e2)), o.size() >= s)
        break;
    }
    return At.resolve(o);
  }
  oe(t2, e, n) {
    const s = this.overlays.get(n.key);
    if (null !== s) {
      const t3 = this.es.get(s.largestBatchId).delete(n.key);
      this.es.set(s.largestBatchId, t3);
    }
    this.overlays = this.overlays.insert(n.key, new Wi(e, n));
    let i = this.es.get(e);
    void 0 === i && (i = Es(), this.es.set(e, i)), this.es.set(e, i.add(n.key));
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Eo {
  constructor() {
    this.ns = new We(Ao.ss), this.rs = new We(Ao.os);
  }
  isEmpty() {
    return this.ns.isEmpty();
  }
  addReference(t2, e) {
    const n = new Ao(t2, e);
    this.ns = this.ns.add(n), this.rs = this.rs.add(n);
  }
  us(t2, e) {
    t2.forEach((t3) => this.addReference(t3, e));
  }
  removeReference(t2, e) {
    this.cs(new Ao(t2, e));
  }
  hs(t2, e) {
    t2.forEach((t3) => this.removeReference(t3, e));
  }
  ls(t2) {
    const e = new ct(new rt([])), n = new Ao(e, t2), s = new Ao(e, t2 + 1), i = [];
    return this.rs.forEachInRange([n, s], (t3) => {
      this.cs(t3), i.push(t3.key);
    }), i;
  }
  fs() {
    this.ns.forEach((t2) => this.cs(t2));
  }
  cs(t2) {
    this.ns = this.ns.delete(t2), this.rs = this.rs.delete(t2);
  }
  ds(t2) {
    const e = new ct(new rt([])), n = new Ao(e, t2), s = new Ao(e, t2 + 1);
    let i = Es();
    return this.rs.forEachInRange([n, s], (t3) => {
      i = i.add(t3.key);
    }), i;
  }
  containsKey(t2) {
    const e = new Ao(t2, 0), n = this.ns.firstAfterOrEqual(e);
    return null !== n && t2.isEqual(n.key);
  }
}
class Ao {
  constructor(t2, e) {
    this.key = t2, this._s = e;
  }
  static ss(t2, e) {
    return ct.comparator(t2.key, e.key) || Z(t2._s, e._s);
  }
  static os(t2, e) {
    return Z(t2._s, e._s) || ct.comparator(t2.key, e.key);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ro {
  constructor(t2, e) {
    this.indexManager = t2, this.referenceDelegate = e, this.mutationQueue = [], this.ws = 1, this.gs = new We(Ao.ss);
  }
  checkEmpty(t2) {
    return At.resolve(0 === this.mutationQueue.length);
  }
  addMutationBatch(t2, e, n, s) {
    const i = this.ws;
    this.ws++, this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1];
    const r = new Qi(i, e, n, s);
    this.mutationQueue.push(r);
    for (const e2 of s)
      this.gs = this.gs.add(new Ao(e2.key, i)), this.indexManager.addToCollectionParentIndex(t2, e2.key.path.popLast());
    return At.resolve(r);
  }
  lookupMutationBatch(t2, e) {
    return At.resolve(this.ys(e));
  }
  getNextMutationBatchAfterBatchId(t2, e) {
    const n = e + 1, s = this.ps(n), i = s < 0 ? 0 : s;
    return At.resolve(this.mutationQueue.length > i ? this.mutationQueue[i] : null);
  }
  getHighestUnacknowledgedBatchId() {
    return At.resolve(0 === this.mutationQueue.length ? -1 : this.ws - 1);
  }
  getAllMutationBatches(t2) {
    return At.resolve(this.mutationQueue.slice());
  }
  getAllMutationBatchesAffectingDocumentKey(t2, e) {
    const n = new Ao(e, 0), s = new Ao(e, Number.POSITIVE_INFINITY), i = [];
    return this.gs.forEachInRange([n, s], (t3) => {
      const e2 = this.ys(t3._s);
      i.push(e2);
    }), At.resolve(i);
  }
  getAllMutationBatchesAffectingDocumentKeys(t2, e) {
    let n = new We(Z);
    return e.forEach((t3) => {
      const e2 = new Ao(t3, 0), s = new Ao(t3, Number.POSITIVE_INFINITY);
      this.gs.forEachInRange([e2, s], (t4) => {
        n = n.add(t4._s);
      });
    }), At.resolve(this.Is(n));
  }
  getAllMutationBatchesAffectingQuery(t2, e) {
    const n = e.path, s = n.length + 1;
    let i = n;
    ct.isDocumentKey(i) || (i = i.child(""));
    const r = new Ao(new ct(i), 0);
    let o = new We(Z);
    return this.gs.forEachWhile((t3) => {
      const e2 = t3.key.path;
      return !!n.isPrefixOf(e2) && (e2.length === s && (o = o.add(t3._s)), true);
    }, r), At.resolve(this.Is(o));
  }
  Is(t2) {
    const e = [];
    return t2.forEach((t3) => {
      const n = this.ys(t3);
      null !== n && e.push(n);
    }), e;
  }
  removeMutationBatch(t2, e) {
    M(0 === this.Ts(e.batchId, "removed")), this.mutationQueue.shift();
    let n = this.gs;
    return At.forEach(e.mutations, (s) => {
      const i = new Ao(s.key, e.batchId);
      return n = n.delete(i), this.referenceDelegate.markPotentiallyOrphaned(t2, s.key);
    }).next(() => {
      this.gs = n;
    });
  }
  An(t2) {
  }
  containsKey(t2, e) {
    const n = new Ao(e, 0), s = this.gs.firstAfterOrEqual(n);
    return At.resolve(e.isEqual(s && s.key));
  }
  performConsistencyCheck(t2) {
    return this.mutationQueue.length, At.resolve();
  }
  Ts(t2, e) {
    return this.ps(t2);
  }
  ps(t2) {
    if (0 === this.mutationQueue.length)
      return 0;
    return t2 - this.mutationQueue[0].batchId;
  }
  ys(t2) {
    const e = this.ps(t2);
    if (e < 0 || e >= this.mutationQueue.length)
      return null;
    return this.mutationQueue[e];
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class bo {
  constructor(t2) {
    this.Es = t2, this.docs = new Ge(ct.comparator), this.size = 0;
  }
  setIndexManager(t2) {
    this.indexManager = t2;
  }
  addEntry(t2, e) {
    const n = e.key, s = this.docs.get(n), i = s ? s.size : 0, r = this.Es(e);
    return this.docs = this.docs.insert(n, {
      document: e.mutableCopy(),
      size: r
    }), this.size += r - i, this.indexManager.addToCollectionParentIndex(t2, n.path.popLast());
  }
  removeEntry(t2) {
    const e = this.docs.get(t2);
    e && (this.docs = this.docs.remove(t2), this.size -= e.size);
  }
  getEntry(t2, e) {
    const n = this.docs.get(e);
    return At.resolve(n ? n.document.mutableCopy() : Ze.newInvalidDocument(e));
  }
  getEntries(t2, e) {
    let n = ds();
    return e.forEach((t3) => {
      const e2 = this.docs.get(t3);
      n = n.insert(t3, e2 ? e2.document.mutableCopy() : Ze.newInvalidDocument(t3));
    }), At.resolve(n);
  }
  getDocumentsMatchingQuery(t2, e, n, s) {
    let i = ds();
    const r = e.path, o = new ct(r.child("")), u = this.docs.getIteratorFrom(o);
    for (; u.hasNext(); ) {
      const { key: t3, value: { document: o2 } } = u.getNext();
      if (!r.isPrefixOf(t3.path))
        break;
      t3.path.length > r.length + 1 || (pt(gt(o2), n) <= 0 || (s.has(o2.key) || An(e, o2)) && (i = i.insert(o2.key, o2.mutableCopy())));
    }
    return At.resolve(i);
  }
  getAllFromCollectionGroup(t2, e, n, s) {
    O();
  }
  As(t2, e) {
    return At.forEach(this.docs, (t3) => e(t3));
  }
  newChangeBuffer(t2) {
    return new Po(this);
  }
  getSize(t2) {
    return At.resolve(this.size);
  }
}
class Po extends co {
  constructor(t2) {
    super(), this.Yn = t2;
  }
  applyChanges(t2) {
    const e = [];
    return this.changes.forEach((n, s) => {
      s.isValidDocument() ? e.push(this.Yn.addEntry(t2, s)) : this.Yn.removeEntry(n);
    }), At.waitFor(e);
  }
  getFromCache(t2, e) {
    return this.Yn.getEntry(t2, e);
  }
  getAllFromCache(t2, e) {
    return this.Yn.getEntries(t2, e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class vo {
  constructor(t2) {
    this.persistence = t2, this.Rs = new ls((t3) => nn(t3), sn), this.lastRemoteSnapshotVersion = st.min(), this.highestTargetId = 0, this.bs = 0, this.Ps = new Eo(), this.targetCount = 0, this.vs = Yr.Pn();
  }
  forEachTarget(t2, e) {
    return this.Rs.forEach((t3, n) => e(n)), At.resolve();
  }
  getLastRemoteSnapshotVersion(t2) {
    return At.resolve(this.lastRemoteSnapshotVersion);
  }
  getHighestSequenceNumber(t2) {
    return At.resolve(this.bs);
  }
  allocateTargetId(t2) {
    return this.highestTargetId = this.vs.next(), At.resolve(this.highestTargetId);
  }
  setTargetsMetadata(t2, e, n) {
    return n && (this.lastRemoteSnapshotVersion = n), e > this.bs && (this.bs = e), At.resolve();
  }
  Dn(t2) {
    this.Rs.set(t2.target, t2);
    const e = t2.targetId;
    e > this.highestTargetId && (this.vs = new Yr(e), this.highestTargetId = e), t2.sequenceNumber > this.bs && (this.bs = t2.sequenceNumber);
  }
  addTargetData(t2, e) {
    return this.Dn(e), this.targetCount += 1, At.resolve();
  }
  updateTargetData(t2, e) {
    return this.Dn(e), At.resolve();
  }
  removeTargetData(t2, e) {
    return this.Rs.delete(e.target), this.Ps.ls(e.targetId), this.targetCount -= 1, At.resolve();
  }
  removeTargets(t2, e, n) {
    let s = 0;
    const i = [];
    return this.Rs.forEach((r, o) => {
      o.sequenceNumber <= e && null === n.get(o.targetId) && (this.Rs.delete(r), i.push(this.removeMatchingKeysForTargetId(t2, o.targetId)), s++);
    }), At.waitFor(i).next(() => s);
  }
  getTargetCount(t2) {
    return At.resolve(this.targetCount);
  }
  getTargetData(t2, e) {
    const n = this.Rs.get(e) || null;
    return At.resolve(n);
  }
  addMatchingKeys(t2, e, n) {
    return this.Ps.us(e, n), At.resolve();
  }
  removeMatchingKeys(t2, e, n) {
    this.Ps.hs(e, n);
    const s = this.persistence.referenceDelegate, i = [];
    return s && e.forEach((e2) => {
      i.push(s.markPotentiallyOrphaned(t2, e2));
    }), At.waitFor(i);
  }
  removeMatchingKeysForTargetId(t2, e) {
    return this.Ps.ls(e), At.resolve();
  }
  getMatchingKeysForTargetId(t2, e) {
    const n = this.Ps.ds(e);
    return At.resolve(n);
  }
  containsKey(t2, e) {
    return At.resolve(this.Ps.containsKey(e));
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Vo {
  constructor(t2, e) {
    this.Vs = {}, this.overlays = {}, this.Ss = new Ot(0), this.Ds = false, this.Ds = true, this.referenceDelegate = t2(this), this.Cs = new vo(this);
    this.indexManager = new Nr(), this.remoteDocumentCache = function(t3) {
      return new bo(t3);
    }((t3) => this.referenceDelegate.xs(t3)), this.yt = new Hi(e), this.Ns = new Io(this.yt);
  }
  start() {
    return Promise.resolve();
  }
  shutdown() {
    return this.Ds = false, Promise.resolve();
  }
  get started() {
    return this.Ds;
  }
  setDatabaseDeletedListener() {
  }
  setNetworkEnabled() {
  }
  getIndexManager(t2) {
    return this.indexManager;
  }
  getDocumentOverlayCache(t2) {
    let e = this.overlays[t2.toKey()];
    return e || (e = new To(), this.overlays[t2.toKey()] = e), e;
  }
  getMutationQueue(t2, e) {
    let n = this.Vs[t2.toKey()];
    return n || (n = new Ro(e, this.referenceDelegate), this.Vs[t2.toKey()] = n), n;
  }
  getTargetCache() {
    return this.Cs;
  }
  getRemoteDocumentCache() {
    return this.remoteDocumentCache;
  }
  getBundleCache() {
    return this.Ns;
  }
  runTransaction(t2, e, n) {
    C("MemoryPersistence", "Starting transaction:", t2);
    const s = new So(this.Ss.next());
    return this.referenceDelegate.ks(), n(s).next((t3) => this.referenceDelegate.Os(s).next(() => t3)).toPromise().then((t3) => (s.raiseOnCommittedEvent(), t3));
  }
  Ms(t2, e) {
    return At.or(Object.values(this.Vs).map((n) => () => n.containsKey(t2, e)));
  }
}
class So extends Tt {
  constructor(t2) {
    super(), this.currentSequenceNumber = t2;
  }
}
class Do {
  constructor(t2) {
    this.persistence = t2, this.Fs = new Eo(), this.$s = null;
  }
  static Bs(t2) {
    return new Do(t2);
  }
  get Ls() {
    if (this.$s)
      return this.$s;
    throw O();
  }
  addReference(t2, e, n) {
    return this.Fs.addReference(n, e), this.Ls.delete(n.toString()), At.resolve();
  }
  removeReference(t2, e, n) {
    return this.Fs.removeReference(n, e), this.Ls.add(n.toString()), At.resolve();
  }
  markPotentiallyOrphaned(t2, e) {
    return this.Ls.add(e.toString()), At.resolve();
  }
  removeTarget(t2, e) {
    this.Fs.ls(e.targetId).forEach((t3) => this.Ls.add(t3.toString()));
    const n = this.persistence.getTargetCache();
    return n.getMatchingKeysForTargetId(t2, e.targetId).next((t3) => {
      t3.forEach((t4) => this.Ls.add(t4.toString()));
    }).next(() => n.removeTargetData(t2, e));
  }
  ks() {
    this.$s = /* @__PURE__ */ new Set();
  }
  Os(t2) {
    const e = this.persistence.getRemoteDocumentCache().newChangeBuffer();
    return At.forEach(this.Ls, (n) => {
      const s = ct.fromPath(n);
      return this.qs(t2, s).next((t3) => {
        t3 || e.removeEntry(s, st.min());
      });
    }).next(() => (this.$s = null, e.apply(t2)));
  }
  updateLimboDocument(t2, e) {
    return this.qs(t2, e).next((t3) => {
      t3 ? this.Ls.delete(e.toString()) : this.Ls.add(e.toString());
    });
  }
  xs(t2) {
    return 0;
  }
  qs(t2, e) {
    return At.or([() => At.resolve(this.Fs.containsKey(e)), () => this.persistence.getTargetCache().containsKey(t2, e), () => this.persistence.Ms(t2, e)]);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class $o {
  constructor(t2, e, n, s) {
    this.targetId = t2, this.fromCache = e, this.Si = n, this.Di = s;
  }
  static Ci(t2, e) {
    let n = Es(), s = Es();
    for (const t3 of e.docChanges)
      switch (t3.type) {
        case 0:
          n = n.add(t3.doc.key);
          break;
        case 1:
          s = s.add(t3.doc.key);
      }
    return new $o(t2, e.fromCache, n, s);
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Bo {
  constructor() {
    this.xi = false;
  }
  initialize(t2, e) {
    this.Ni = t2, this.indexManager = e, this.xi = true;
  }
  getDocumentsMatchingQuery(t2, e, n, s) {
    return this.ki(t2, e).next((i) => i || this.Oi(t2, e, s, n)).next((n2) => n2 || this.Mi(t2, e));
  }
  ki(t2, e) {
    if (fn(e))
      return At.resolve(null);
    let n = gn(e);
    return this.indexManager.getIndexType(t2, n).next((s) => 0 === s ? null : (null !== e.limit && 1 === s && (e = pn(e, null, "F"), n = gn(e)), this.indexManager.getDocumentsMatchingTarget(t2, n).next((s2) => {
      const i = Es(...s2);
      return this.Ni.getDocuments(t2, i).next((s3) => this.indexManager.getMinOffset(t2, n).next((n2) => {
        const r = this.Fi(e, s3);
        return this.$i(e, r, i, n2.readTime) ? this.ki(t2, pn(e, null, "F")) : this.Bi(t2, r, e, n2);
      }));
    })));
  }
  Oi(t2, e, n, s) {
    return fn(e) || s.isEqual(st.min()) ? this.Mi(t2, e) : this.Ni.getDocuments(t2, n).next((i) => {
      const r = this.Fi(e, i);
      return this.$i(e, r, n, s) ? this.Mi(t2, e) : (S() <= LogLevel.DEBUG && C("QueryEngine", "Re-using previous result from %s to execute query: %s", s.toString(), En(e)), this.Bi(t2, r, e, mt(s, -1)));
    });
  }
  Fi(t2, e) {
    let n = new We(bn(t2));
    return e.forEach((e2, s) => {
      An(t2, s) && (n = n.add(s));
    }), n;
  }
  $i(t2, e, n, s) {
    if (null === t2.limit)
      return false;
    if (n.size !== e.size)
      return true;
    const i = "F" === t2.limitType ? e.last() : e.first();
    return !!i && (i.hasPendingWrites || i.version.compareTo(s) > 0);
  }
  Mi(t2, e) {
    return S() <= LogLevel.DEBUG && C("QueryEngine", "Using full collection scan to execute query:", En(e)), this.Ni.getDocumentsMatchingQuery(t2, e, yt.min());
  }
  Bi(t2, e, n, s) {
    return this.Ni.getDocumentsMatchingQuery(t2, n, s).next((t3) => (e.forEach((e2) => {
      t3 = t3.insert(e2.key, e2);
    }), t3));
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Lo {
  constructor(t2, e, n, s) {
    this.persistence = t2, this.Li = e, this.yt = s, this.qi = new Ge(Z), this.Ui = new ls((t3) => nn(t3), sn), this.Ki = /* @__PURE__ */ new Map(), this.Gi = t2.getRemoteDocumentCache(), this.Cs = t2.getTargetCache(), this.Ns = t2.getBundleCache(), this.Qi(n);
  }
  Qi(t2) {
    this.documentOverlayCache = this.persistence.getDocumentOverlayCache(t2), this.indexManager = this.persistence.getIndexManager(t2), this.mutationQueue = this.persistence.getMutationQueue(t2, this.indexManager), this.localDocuments = new po(this.Gi, this.mutationQueue, this.documentOverlayCache, this.indexManager), this.Gi.setIndexManager(this.indexManager), this.Li.initialize(this.localDocuments, this.indexManager);
  }
  collectGarbage(t2) {
    return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (e) => t2.collect(e, this.qi));
  }
}
function qo(t2, e, n, s) {
  return new Lo(t2, e, n, s);
}
async function Uo(t2, e) {
  const n = $(t2);
  return await n.persistence.runTransaction("Handle user change", "readonly", (t3) => {
    let s;
    return n.mutationQueue.getAllMutationBatches(t3).next((i) => (s = i, n.Qi(e), n.mutationQueue.getAllMutationBatches(t3))).next((e2) => {
      const i = [], r = [];
      let o = Es();
      for (const t4 of s) {
        i.push(t4.batchId);
        for (const e3 of t4.mutations)
          o = o.add(e3.key);
      }
      for (const t4 of e2) {
        r.push(t4.batchId);
        for (const e3 of t4.mutations)
          o = o.add(e3.key);
      }
      return n.localDocuments.getDocuments(t3, o).next((t4) => ({
        ji: t4,
        removedBatchIds: i,
        addedBatchIds: r
      }));
    });
  });
}
function Ko(t2, e) {
  const n = $(t2);
  return n.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (t3) => {
    const s = e.batch.keys(), i = n.Gi.newChangeBuffer({
      trackRemovals: true
    });
    return function(t4, e2, n2, s2) {
      const i2 = n2.batch, r = i2.keys();
      let o = At.resolve();
      return r.forEach((t5) => {
        o = o.next(() => s2.getEntry(e2, t5)).next((e3) => {
          const r2 = n2.docVersions.get(t5);
          M(null !== r2), e3.version.compareTo(r2) < 0 && (i2.applyToRemoteDocument(e3, n2), e3.isValidDocument() && (e3.setReadTime(n2.commitVersion), s2.addEntry(e3)));
        });
      }), o.next(() => t4.mutationQueue.removeMutationBatch(e2, i2));
    }(n, t3, e, i).next(() => i.apply(t3)).next(() => n.mutationQueue.performConsistencyCheck(t3)).next(() => n.documentOverlayCache.removeOverlaysForBatchId(t3, s, e.batch.batchId)).next(() => n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t3, function(t4) {
      let e2 = Es();
      for (let n2 = 0; n2 < t4.mutationResults.length; ++n2) {
        t4.mutationResults[n2].transformResults.length > 0 && (e2 = e2.add(t4.batch.mutations[n2].key));
      }
      return e2;
    }(e))).next(() => n.localDocuments.getDocuments(t3, s));
  });
}
function Go(t2) {
  const e = $(t2);
  return e.persistence.runTransaction("Get last remote snapshot version", "readonly", (t3) => e.Cs.getLastRemoteSnapshotVersion(t3));
}
function Qo(t2, e) {
  const n = $(t2), s = e.snapshotVersion;
  let i = n.qi;
  return n.persistence.runTransaction("Apply remote event", "readwrite-primary", (t3) => {
    const r = n.Gi.newChangeBuffer({
      trackRemovals: true
    });
    i = n.qi;
    const o = [];
    e.targetChanges.forEach((r2, u2) => {
      const c2 = i.get(u2);
      if (!c2)
        return;
      o.push(n.Cs.removeMatchingKeys(t3, r2.removedDocuments, u2).next(() => n.Cs.addMatchingKeys(t3, r2.addedDocuments, u2)));
      let a = c2.withSequenceNumber(t3.currentSequenceNumber);
      e.targetMismatches.has(u2) ? a = a.withResumeToken(Qt.EMPTY_BYTE_STRING, st.min()).withLastLimboFreeSnapshotVersion(st.min()) : r2.resumeToken.approximateByteSize() > 0 && (a = a.withResumeToken(r2.resumeToken, s)), i = i.insert(u2, a), function(t4, e2, n2) {
        if (0 === t4.resumeToken.approximateByteSize())
          return true;
        if (e2.snapshotVersion.toMicroseconds() - t4.snapshotVersion.toMicroseconds() >= 3e8)
          return true;
        return n2.addedDocuments.size + n2.modifiedDocuments.size + n2.removedDocuments.size > 0;
      }(c2, a, r2) && o.push(n.Cs.updateTargetData(t3, a));
    });
    let u = ds(), c = Es();
    if (e.documentUpdates.forEach((s2) => {
      e.resolvedLimboDocuments.has(s2) && o.push(n.persistence.referenceDelegate.updateLimboDocument(t3, s2));
    }), o.push(jo(t3, r, e.documentUpdates).next((t4) => {
      u = t4.Wi, c = t4.zi;
    })), !s.isEqual(st.min())) {
      const e2 = n.Cs.getLastRemoteSnapshotVersion(t3).next((e3) => n.Cs.setTargetsMetadata(t3, t3.currentSequenceNumber, s));
      o.push(e2);
    }
    return At.waitFor(o).next(() => r.apply(t3)).next(() => n.localDocuments.getLocalViewOfDocuments(t3, u, c)).next(() => u);
  }).then((t3) => (n.qi = i, t3));
}
function jo(t2, e, n) {
  let s = Es(), i = Es();
  return n.forEach((t3) => s = s.add(t3)), e.getEntries(t2, s).next((t3) => {
    let s2 = ds();
    return n.forEach((n2, r) => {
      const o = t3.get(n2);
      r.isFoundDocument() !== o.isFoundDocument() && (i = i.add(n2)), r.isNoDocument() && r.version.isEqual(st.min()) ? (e.removeEntry(n2, r.readTime), s2 = s2.insert(n2, r)) : !o.isValidDocument() || r.version.compareTo(o.version) > 0 || 0 === r.version.compareTo(o.version) && o.hasPendingWrites ? (e.addEntry(r), s2 = s2.insert(n2, r)) : C("LocalStore", "Ignoring outdated watch update for ", n2, ". Current version:", o.version, " Watch version:", r.version);
    }), {
      Wi: s2,
      zi: i
    };
  });
}
function Wo(t2, e) {
  const n = $(t2);
  return n.persistence.runTransaction("Get next mutation batch", "readonly", (t3) => (void 0 === e && (e = -1), n.mutationQueue.getNextMutationBatchAfterBatchId(t3, e)));
}
function zo(t2, e) {
  const n = $(t2);
  return n.persistence.runTransaction("Allocate target", "readwrite", (t3) => {
    let s;
    return n.Cs.getTargetData(t3, e).next((i) => i ? (s = i, At.resolve(s)) : n.Cs.allocateTargetId(t3).next((i2) => (s = new zi(e, i2, 0, t3.currentSequenceNumber), n.Cs.addTargetData(t3, s).next(() => s))));
  }).then((t3) => {
    const s = n.qi.get(t3.targetId);
    return (null === s || t3.snapshotVersion.compareTo(s.snapshotVersion) > 0) && (n.qi = n.qi.insert(t3.targetId, t3), n.Ui.set(e, t3.targetId)), t3;
  });
}
async function Ho(t2, e, n) {
  const s = $(t2), i = s.qi.get(e), r = n ? "readwrite" : "readwrite-primary";
  try {
    n || await s.persistence.runTransaction("Release target", r, (t3) => s.persistence.referenceDelegate.removeTarget(t3, i));
  } catch (t3) {
    if (!Vt(t3))
      throw t3;
    C("LocalStore", `Failed to update sequence numbers for target ${e}: ${t3}`);
  }
  s.qi = s.qi.remove(e), s.Ui.delete(i.target);
}
function Jo(t2, e, n) {
  const s = $(t2);
  let i = st.min(), r = Es();
  return s.persistence.runTransaction("Execute query", "readonly", (t3) => function(t4, e2, n2) {
    const s2 = $(t4), i2 = s2.Ui.get(n2);
    return void 0 !== i2 ? At.resolve(s2.qi.get(i2)) : s2.Cs.getTargetData(e2, n2);
  }(s, t3, gn(e)).next((e2) => {
    if (e2)
      return i = e2.lastLimboFreeSnapshotVersion, s.Cs.getMatchingKeysForTargetId(t3, e2.targetId).next((t4) => {
        r = t4;
      });
  }).next(() => s.Li.getDocumentsMatchingQuery(t3, e, n ? i : st.min(), n ? r : Es())).next((t4) => (Zo(s, Rn(e), t4), {
    documents: t4,
    Hi: r
  })));
}
function Zo(t2, e, n) {
  let s = t2.Ki.get(e) || st.min();
  n.forEach((t3, e2) => {
    e2.readTime.compareTo(s) > 0 && (s = e2.readTime);
  }), t2.Ki.set(e, s);
}
class au {
  constructor() {
    this.activeTargetIds = Rs();
  }
  er(t2) {
    this.activeTargetIds = this.activeTargetIds.add(t2);
  }
  nr(t2) {
    this.activeTargetIds = this.activeTargetIds.delete(t2);
  }
  tr() {
    const t2 = {
      activeTargetIds: this.activeTargetIds.toArray(),
      updateTimeMs: Date.now()
    };
    return JSON.stringify(t2);
  }
}
class lu {
  constructor() {
    this.Lr = new au(), this.qr = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null;
  }
  addPendingMutation(t2) {
  }
  updateMutationState(t2, e, n) {
  }
  addLocalQueryTarget(t2) {
    return this.Lr.er(t2), this.qr[t2] || "not-current";
  }
  updateQueryState(t2, e, n) {
    this.qr[t2] = e;
  }
  removeLocalQueryTarget(t2) {
    this.Lr.nr(t2);
  }
  isLocalQueryTarget(t2) {
    return this.Lr.activeTargetIds.has(t2);
  }
  clearQueryState(t2) {
    delete this.qr[t2];
  }
  getAllActiveQueryTargets() {
    return this.Lr.activeTargetIds;
  }
  isActiveQueryTarget(t2) {
    return this.Lr.activeTargetIds.has(t2);
  }
  start() {
    return this.Lr = new au(), Promise.resolve();
  }
  handleUserChange(t2, e, n) {
  }
  setOnlineState(t2) {
  }
  shutdown() {
  }
  writeSequenceNumber(t2) {
  }
  notifyBundleLoaded(t2) {
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class fu {
  Ur(t2) {
  }
  shutdown() {
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class du {
  constructor() {
    this.Kr = () => this.Gr(), this.Qr = () => this.jr(), this.Wr = [], this.zr();
  }
  Ur(t2) {
    this.Wr.push(t2);
  }
  shutdown() {
    window.removeEventListener("online", this.Kr), window.removeEventListener("offline", this.Qr);
  }
  zr() {
    window.addEventListener("online", this.Kr), window.addEventListener("offline", this.Qr);
  }
  Gr() {
    C("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
    for (const t2 of this.Wr)
      t2(0);
  }
  jr() {
    C("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
    for (const t2 of this.Wr)
      t2(1);
  }
  static C() {
    return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _u = {
  BatchGetDocuments: "batchGet",
  Commit: "commit",
  RunQuery: "runQuery",
  RunAggregationQuery: "runAggregationQuery"
};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class wu {
  constructor(t2) {
    this.Hr = t2.Hr, this.Jr = t2.Jr;
  }
  Yr(t2) {
    this.Xr = t2;
  }
  Zr(t2) {
    this.eo = t2;
  }
  onMessage(t2) {
    this.no = t2;
  }
  close() {
    this.Jr();
  }
  send(t2) {
    this.Hr(t2);
  }
  so() {
    this.Xr();
  }
  io(t2) {
    this.eo(t2);
  }
  ro(t2) {
    this.no(t2);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class mu extends class {
  constructor(t2) {
    this.databaseInfo = t2, this.databaseId = t2.databaseId;
    const e = t2.ssl ? "https" : "http";
    this.oo = e + "://" + t2.host, this.uo = "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database + "/documents";
  }
  get co() {
    return false;
  }
  ao(t2, e, n, s, i) {
    const r = this.ho(t2, e);
    C("RestConnection", "Sending: ", r, n);
    const o = {};
    return this.lo(o, s, i), this.fo(t2, r, o, n).then((t3) => (C("RestConnection", "Received: ", t3), t3), (e2) => {
      throw N("RestConnection", `${t2} failed with error: `, e2, "url: ", r, "request:", n), e2;
    });
  }
  _o(t2, e, n, s, i, r) {
    return this.ao(t2, e, n, s, i);
  }
  lo(t2, e, n) {
    t2["X-Goog-Api-Client"] = "gl-js/ fire/" + v, t2["Content-Type"] = "text/plain", this.databaseInfo.appId && (t2["X-Firebase-GMPID"] = this.databaseInfo.appId), e && e.headers.forEach((e2, n2) => t2[n2] = e2), n && n.headers.forEach((e2, n2) => t2[n2] = e2);
  }
  ho(t2, e) {
    const n = _u[t2];
    return `${this.oo}/v1/${e}:${n}`;
  }
} {
  constructor(t2) {
    super(t2), this.forceLongPolling = t2.forceLongPolling, this.autoDetectLongPolling = t2.autoDetectLongPolling, this.useFetchStreams = t2.useFetchStreams;
  }
  fo(t2, e, n, s) {
    return new Promise((i, r) => {
      const o = new XhrIo();
      o.setWithCredentials(true), o.listenOnce(EventType.COMPLETE, () => {
        try {
          switch (o.getLastErrorCode()) {
            case ErrorCode.NO_ERROR:
              const e2 = o.getResponseJson();
              C("Connection", "XHR received:", JSON.stringify(e2)), i(e2);
              break;
            case ErrorCode.TIMEOUT:
              C("Connection", 'RPC "' + t2 + '" timed out'), r(new L(B.DEADLINE_EXCEEDED, "Request time out"));
              break;
            case ErrorCode.HTTP_ERROR:
              const n2 = o.getStatus();
              if (C("Connection", 'RPC "' + t2 + '" failed with status:', n2, "response text:", o.getResponseText()), n2 > 0) {
                let t3 = o.getResponseJson();
                Array.isArray(t3) && (t3 = t3[0]);
                const e3 = null == t3 ? void 0 : t3.error;
                if (e3 && e3.status && e3.message) {
                  const t4 = function(t5) {
                    const e4 = t5.toLowerCase().replace(/_/g, "-");
                    return Object.values(B).indexOf(e4) >= 0 ? e4 : B.UNKNOWN;
                  }(e3.status);
                  r(new L(t4, e3.message));
                } else
                  r(new L(B.UNKNOWN, "Server responded with status " + o.getStatus()));
              } else
                r(new L(B.UNAVAILABLE, "Connection failed."));
              break;
            default:
              O();
          }
        } finally {
          C("Connection", 'RPC "' + t2 + '" completed.');
        }
      });
      const u = JSON.stringify(s);
      o.send(e, "POST", u, n, 15);
    });
  }
  wo(t2, e, n) {
    const s = [this.oo, "/", "google.firestore.v1.Firestore", "/", t2, "/channel"], i = createWebChannelTransport(), r = getStatEventTarget(), o = {
      httpSessionIdParam: "gsessionid",
      initMessageHeaders: {},
      messageUrlParams: {
        database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`
      },
      sendRawJson: true,
      supportsCrossDomainXhr: true,
      internalChannelParams: {
        forwardChannelRequestTimeoutMs: 6e5
      },
      forceLongPolling: this.forceLongPolling,
      detectBufferingProxy: this.autoDetectLongPolling
    };
    this.useFetchStreams && (o.xmlHttpFactory = new FetchXmlHttpFactory({})), this.lo(o.initMessageHeaders, e, n), o.encodeInitMessageHeaders = true;
    const u = s.join("");
    C("Connection", "Creating WebChannel: " + u, o);
    const c = i.createWebChannel(u, o);
    let a = false, h = false;
    const l2 = new wu({
      Hr: (t3) => {
        h ? C("Connection", "Not sending because WebChannel is closed:", t3) : (a || (C("Connection", "Opening WebChannel transport."), c.open(), a = true), C("Connection", "WebChannel sending:", t3), c.send(t3));
      },
      Jr: () => c.close()
    }), f = (t3, e2, n2) => {
      t3.listen(e2, (t4) => {
        try {
          n2(t4);
        } catch (t5) {
          setTimeout(() => {
            throw t5;
          }, 0);
        }
      });
    };
    return f(c, WebChannel.EventType.OPEN, () => {
      h || C("Connection", "WebChannel transport opened.");
    }), f(c, WebChannel.EventType.CLOSE, () => {
      h || (h = true, C("Connection", "WebChannel transport closed"), l2.io());
    }), f(c, WebChannel.EventType.ERROR, (t3) => {
      h || (h = true, N("Connection", "WebChannel transport errored:", t3), l2.io(new L(B.UNAVAILABLE, "The operation could not be completed")));
    }), f(c, WebChannel.EventType.MESSAGE, (t3) => {
      var e2;
      if (!h) {
        const n2 = t3.data[0];
        M(!!n2);
        const s2 = n2, i2 = s2.error || (null === (e2 = s2[0]) || void 0 === e2 ? void 0 : e2.error);
        if (i2) {
          C("Connection", "WebChannel received error:", i2);
          const t4 = i2.status;
          let e3 = function(t5) {
            const e4 = us[t5];
            if (void 0 !== e4)
              return hs(e4);
          }(t4), n3 = i2.message;
          void 0 === e3 && (e3 = B.INTERNAL, n3 = "Unknown error status: " + t4 + " with message " + i2.message), h = true, l2.io(new L(e3, n3)), c.close();
        } else
          C("Connection", "WebChannel received:", n2), l2.ro(n2);
      }
    }), f(r, Event.STAT_EVENT, (t3) => {
      t3.stat === Stat.PROXY ? C("Connection", "Detected buffering proxy") : t3.stat === Stat.NOPROXY && C("Connection", "Detected no buffering proxy");
    }), setTimeout(() => {
      l2.so();
    }, 0), l2;
  }
}
function yu() {
  return "undefined" != typeof document ? document : null;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function pu(t2) {
  return new Fs(t2, true);
}
class Iu {
  constructor(t2, e, n = 1e3, s = 1.5, i = 6e4) {
    this.Hs = t2, this.timerId = e, this.mo = n, this.yo = s, this.po = i, this.Io = 0, this.To = null, this.Eo = Date.now(), this.reset();
  }
  reset() {
    this.Io = 0;
  }
  Ao() {
    this.Io = this.po;
  }
  Ro(t2) {
    this.cancel();
    const e = Math.floor(this.Io + this.bo()), n = Math.max(0, Date.now() - this.Eo), s = Math.max(0, e - n);
    s > 0 && C("ExponentialBackoff", `Backing off for ${s} ms (base delay: ${this.Io} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`), this.To = this.Hs.enqueueAfterDelay(this.timerId, s, () => (this.Eo = Date.now(), t2())), this.Io *= this.yo, this.Io < this.mo && (this.Io = this.mo), this.Io > this.po && (this.Io = this.po);
  }
  Po() {
    null !== this.To && (this.To.skipDelay(), this.To = null);
  }
  cancel() {
    null !== this.To && (this.To.cancel(), this.To = null);
  }
  bo() {
    return (Math.random() - 0.5) * this.Io;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Tu {
  constructor(t2, e, n, s, i, r, o, u) {
    this.Hs = t2, this.vo = n, this.Vo = s, this.connection = i, this.authCredentialsProvider = r, this.appCheckCredentialsProvider = o, this.listener = u, this.state = 0, this.So = 0, this.Do = null, this.Co = null, this.stream = null, this.xo = new Iu(t2, e);
  }
  No() {
    return 1 === this.state || 5 === this.state || this.ko();
  }
  ko() {
    return 2 === this.state || 3 === this.state;
  }
  start() {
    4 !== this.state ? this.auth() : this.Oo();
  }
  async stop() {
    this.No() && await this.close(0);
  }
  Mo() {
    this.state = 0, this.xo.reset();
  }
  Fo() {
    this.ko() && null === this.Do && (this.Do = this.Hs.enqueueAfterDelay(this.vo, 6e4, () => this.$o()));
  }
  Bo(t2) {
    this.Lo(), this.stream.send(t2);
  }
  async $o() {
    if (this.ko())
      return this.close(0);
  }
  Lo() {
    this.Do && (this.Do.cancel(), this.Do = null);
  }
  qo() {
    this.Co && (this.Co.cancel(), this.Co = null);
  }
  async close(t2, e) {
    this.Lo(), this.qo(), this.xo.cancel(), this.So++, 4 !== t2 ? this.xo.reset() : e && e.code === B.RESOURCE_EXHAUSTED ? (x(e.toString()), x("Using maximum backoff delay to prevent overloading the backend."), this.xo.Ao()) : e && e.code === B.UNAUTHENTICATED && 3 !== this.state && (this.authCredentialsProvider.invalidateToken(), this.appCheckCredentialsProvider.invalidateToken()), null !== this.stream && (this.Uo(), this.stream.close(), this.stream = null), this.state = t2, await this.listener.Zr(e);
  }
  Uo() {
  }
  auth() {
    this.state = 1;
    const t2 = this.Ko(this.So), e = this.So;
    Promise.all([this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken()]).then(([t3, n]) => {
      this.So === e && this.Go(t3, n);
    }, (e2) => {
      t2(() => {
        const t3 = new L(B.UNKNOWN, "Fetching auth token failed: " + e2.message);
        return this.Qo(t3);
      });
    });
  }
  Go(t2, e) {
    const n = this.Ko(this.So);
    this.stream = this.jo(t2, e), this.stream.Yr(() => {
      n(() => (this.state = 2, this.Co = this.Hs.enqueueAfterDelay(this.Vo, 1e4, () => (this.ko() && (this.state = 3), Promise.resolve())), this.listener.Yr()));
    }), this.stream.Zr((t3) => {
      n(() => this.Qo(t3));
    }), this.stream.onMessage((t3) => {
      n(() => this.onMessage(t3));
    });
  }
  Oo() {
    this.state = 5, this.xo.Ro(async () => {
      this.state = 0, this.start();
    });
  }
  Qo(t2) {
    return C("PersistentStream", `close with error: ${t2}`), this.stream = null, this.close(4, t2);
  }
  Ko(t2) {
    return (e) => {
      this.Hs.enqueueAndForget(() => this.So === t2 ? e() : (C("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), Promise.resolve()));
    };
  }
}
class Eu extends Tu {
  constructor(t2, e, n, s, i, r) {
    super(t2, "listen_stream_connection_backoff", "listen_stream_idle", "health_check_timeout", e, n, s, r), this.yt = i;
  }
  jo(t2, e) {
    return this.connection.wo("Listen", t2, e);
  }
  onMessage(t2) {
    this.xo.reset();
    const e = Zs(this.yt, t2), n = function(t3) {
      if (!("targetChange" in t3))
        return st.min();
      const e2 = t3.targetChange;
      return e2.targetIds && e2.targetIds.length ? st.min() : e2.readTime ? qs(e2.readTime) : st.min();
    }(t2);
    return this.listener.Wo(e, n);
  }
  zo(t2) {
    const e = {};
    e.database = zs(this.yt), e.addTarget = function(t3, e2) {
      let n2;
      const s = e2.target;
      return n2 = rn(s) ? {
        documents: si(t3, s)
      } : {
        query: ii(t3, s)
      }, n2.targetId = e2.targetId, e2.resumeToken.approximateByteSize() > 0 ? n2.resumeToken = Bs(t3, e2.resumeToken) : e2.snapshotVersion.compareTo(st.min()) > 0 && (n2.readTime = $s(t3, e2.snapshotVersion.toTimestamp())), n2;
    }(this.yt, t2);
    const n = oi(this.yt, t2);
    n && (e.labels = n), this.Bo(e);
  }
  Ho(t2) {
    const e = {};
    e.database = zs(this.yt), e.removeTarget = t2, this.Bo(e);
  }
}
class Au extends Tu {
  constructor(t2, e, n, s, i, r) {
    super(t2, "write_stream_connection_backoff", "write_stream_idle", "health_check_timeout", e, n, s, r), this.yt = i, this.Jo = false;
  }
  get Yo() {
    return this.Jo;
  }
  start() {
    this.Jo = false, this.lastStreamToken = void 0, super.start();
  }
  Uo() {
    this.Jo && this.Xo([]);
  }
  jo(t2, e) {
    return this.connection.wo("Write", t2, e);
  }
  onMessage(t2) {
    if (M(!!t2.streamToken), this.lastStreamToken = t2.streamToken, this.Jo) {
      this.xo.reset();
      const e = ni(t2.writeResults, t2.commitTime), n = qs(t2.commitTime);
      return this.listener.Zo(n, e);
    }
    return M(!t2.writeResults || 0 === t2.writeResults.length), this.Jo = true, this.listener.tu();
  }
  eu() {
    const t2 = {};
    t2.database = zs(this.yt), this.Bo(t2);
  }
  Xo(t2) {
    const e = {
      streamToken: this.lastStreamToken,
      writes: t2.map((t3) => ti(this.yt, t3))
    };
    this.Bo(e);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ru extends class {
} {
  constructor(t2, e, n, s) {
    super(), this.authCredentials = t2, this.appCheckCredentials = e, this.connection = n, this.yt = s, this.nu = false;
  }
  su() {
    if (this.nu)
      throw new L(B.FAILED_PRECONDITION, "The client has already been terminated.");
  }
  ao(t2, e, n) {
    return this.su(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(([s, i]) => this.connection.ao(t2, e, n, s, i)).catch((t3) => {
      throw "FirebaseError" === t3.name ? (t3.code === B.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), t3) : new L(B.UNKNOWN, t3.toString());
    });
  }
  _o(t2, e, n, s) {
    return this.su(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(([i, r]) => this.connection._o(t2, e, n, i, r, s)).catch((t3) => {
      throw "FirebaseError" === t3.name ? (t3.code === B.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), t3) : new L(B.UNKNOWN, t3.toString());
    });
  }
  terminate() {
    this.nu = true;
  }
}
class Pu {
  constructor(t2, e) {
    this.asyncQueue = t2, this.onlineStateHandler = e, this.state = "Unknown", this.iu = 0, this.ru = null, this.ou = true;
  }
  uu() {
    0 === this.iu && (this.cu("Unknown"), this.ru = this.asyncQueue.enqueueAfterDelay("online_state_timeout", 1e4, () => (this.ru = null, this.au("Backend didn't respond within 10 seconds."), this.cu("Offline"), Promise.resolve())));
  }
  hu(t2) {
    "Online" === this.state ? this.cu("Unknown") : (this.iu++, this.iu >= 1 && (this.lu(), this.au(`Connection failed 1 times. Most recent error: ${t2.toString()}`), this.cu("Offline")));
  }
  set(t2) {
    this.lu(), this.iu = 0, "Online" === t2 && (this.ou = false), this.cu(t2);
  }
  cu(t2) {
    t2 !== this.state && (this.state = t2, this.onlineStateHandler(t2));
  }
  au(t2) {
    const e = `Could not reach Cloud Firestore backend. ${t2}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
    this.ou ? (x(e), this.ou = false) : C("OnlineStateTracker", e);
  }
  lu() {
    null !== this.ru && (this.ru.cancel(), this.ru = null);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class vu {
  constructor(t2, e, n, s, i) {
    this.localStore = t2, this.datastore = e, this.asyncQueue = n, this.remoteSyncer = {}, this.fu = [], this.du = /* @__PURE__ */ new Map(), this._u = /* @__PURE__ */ new Set(), this.wu = [], this.mu = i, this.mu.Ur((t3) => {
      n.enqueueAndForget(async () => {
        Mu(this) && (C("RemoteStore", "Restarting streams for network reachability change."), await async function(t4) {
          const e2 = $(t4);
          e2._u.add(4), await Su(e2), e2.gu.set("Unknown"), e2._u.delete(4), await Vu(e2);
        }(this));
      });
    }), this.gu = new Pu(n, s);
  }
}
async function Vu(t2) {
  if (Mu(t2))
    for (const e of t2.wu)
      await e(true);
}
async function Su(t2) {
  for (const e of t2.wu)
    await e(false);
}
function Du(t2, e) {
  const n = $(t2);
  n.du.has(e.targetId) || (n.du.set(e.targetId, e), Ou(n) ? ku(n) : tc(n).ko() && xu(n, e));
}
function Cu(t2, e) {
  const n = $(t2), s = tc(n);
  n.du.delete(e), s.ko() && Nu(n, e), 0 === n.du.size && (s.ko() ? s.Fo() : Mu(n) && n.gu.set("Unknown"));
}
function xu(t2, e) {
  t2.yu.Ot(e.targetId), tc(t2).zo(e);
}
function Nu(t2, e) {
  t2.yu.Ot(e), tc(t2).Ho(e);
}
function ku(t2) {
  t2.yu = new Cs({
    getRemoteKeysForTarget: (e) => t2.remoteSyncer.getRemoteKeysForTarget(e),
    ne: (e) => t2.du.get(e) || null
  }), tc(t2).start(), t2.gu.uu();
}
function Ou(t2) {
  return Mu(t2) && !tc(t2).No() && t2.du.size > 0;
}
function Mu(t2) {
  return 0 === $(t2)._u.size;
}
function Fu(t2) {
  t2.yu = void 0;
}
async function $u(t2) {
  t2.du.forEach((e, n) => {
    xu(t2, e);
  });
}
async function Bu(t2, e) {
  Fu(t2), Ou(t2) ? (t2.gu.hu(e), ku(t2)) : t2.gu.set("Unknown");
}
async function Lu(t2, e, n) {
  if (t2.gu.set("Online"), e instanceof Ss && 2 === e.state && e.cause)
    try {
      await async function(t3, e2) {
        const n2 = e2.cause;
        for (const s of e2.targetIds)
          t3.du.has(s) && (await t3.remoteSyncer.rejectListen(s, n2), t3.du.delete(s), t3.yu.removeTarget(s));
      }(t2, e);
    } catch (n2) {
      C("RemoteStore", "Failed to remove targets %s: %s ", e.targetIds.join(","), n2), await qu(t2, n2);
    }
  else if (e instanceof vs ? t2.yu.Kt(e) : e instanceof Vs ? t2.yu.Jt(e) : t2.yu.jt(e), !n.isEqual(st.min()))
    try {
      const e2 = await Go(t2.localStore);
      n.compareTo(e2) >= 0 && await function(t3, e3) {
        const n2 = t3.yu.Zt(e3);
        return n2.targetChanges.forEach((n3, s) => {
          if (n3.resumeToken.approximateByteSize() > 0) {
            const i = t3.du.get(s);
            i && t3.du.set(s, i.withResumeToken(n3.resumeToken, e3));
          }
        }), n2.targetMismatches.forEach((e4) => {
          const n3 = t3.du.get(e4);
          if (!n3)
            return;
          t3.du.set(e4, n3.withResumeToken(Qt.EMPTY_BYTE_STRING, n3.snapshotVersion)), Nu(t3, e4);
          const s = new zi(n3.target, e4, 1, n3.sequenceNumber);
          xu(t3, s);
        }), t3.remoteSyncer.applyRemoteEvent(n2);
      }(t2, n);
    } catch (e2) {
      C("RemoteStore", "Failed to raise snapshot:", e2), await qu(t2, e2);
    }
}
async function qu(t2, e, n) {
  if (!Vt(e))
    throw e;
  t2._u.add(1), await Su(t2), t2.gu.set("Offline"), n || (n = () => Go(t2.localStore)), t2.asyncQueue.enqueueRetryable(async () => {
    C("RemoteStore", "Retrying IndexedDB access"), await n(), t2._u.delete(1), await Vu(t2);
  });
}
function Uu(t2, e) {
  return e().catch((n) => qu(t2, n, e));
}
async function Ku(t2) {
  const e = $(t2), n = ec(e);
  let s = e.fu.length > 0 ? e.fu[e.fu.length - 1].batchId : -1;
  for (; Gu(e); )
    try {
      const t3 = await Wo(e.localStore, s);
      if (null === t3) {
        0 === e.fu.length && n.Fo();
        break;
      }
      s = t3.batchId, Qu(e, t3);
    } catch (t3) {
      await qu(e, t3);
    }
  ju(e) && Wu(e);
}
function Gu(t2) {
  return Mu(t2) && t2.fu.length < 10;
}
function Qu(t2, e) {
  t2.fu.push(e);
  const n = ec(t2);
  n.ko() && n.Yo && n.Xo(e.mutations);
}
function ju(t2) {
  return Mu(t2) && !ec(t2).No() && t2.fu.length > 0;
}
function Wu(t2) {
  ec(t2).start();
}
async function zu(t2) {
  ec(t2).eu();
}
async function Hu(t2) {
  const e = ec(t2);
  for (const n of t2.fu)
    e.Xo(n.mutations);
}
async function Ju(t2, e, n) {
  const s = t2.fu.shift(), i = ji.from(s, e, n);
  await Uu(t2, () => t2.remoteSyncer.applySuccessfulWrite(i)), await Ku(t2);
}
async function Yu(t2, e) {
  e && ec(t2).Yo && await async function(t3, e2) {
    if (n = e2.code, as(n) && n !== B.ABORTED) {
      const n2 = t3.fu.shift();
      ec(t3).Mo(), await Uu(t3, () => t3.remoteSyncer.rejectFailedWrite(n2.batchId, e2)), await Ku(t3);
    }
    var n;
  }(t2, e), ju(t2) && Wu(t2);
}
async function Xu(t2, e) {
  const n = $(t2);
  n.asyncQueue.verifyOperationInProgress(), C("RemoteStore", "RemoteStore received new credentials");
  const s = Mu(n);
  n._u.add(3), await Su(n), s && n.gu.set("Unknown"), await n.remoteSyncer.handleCredentialChange(e), n._u.delete(3), await Vu(n);
}
async function Zu(t2, e) {
  const n = $(t2);
  e ? (n._u.delete(2), await Vu(n)) : e || (n._u.add(2), await Su(n), n.gu.set("Unknown"));
}
function tc(t2) {
  return t2.pu || (t2.pu = function(t3, e, n) {
    const s = $(t3);
    return s.su(), new Eu(e, s.connection, s.authCredentials, s.appCheckCredentials, s.yt, n);
  }(t2.datastore, t2.asyncQueue, {
    Yr: $u.bind(null, t2),
    Zr: Bu.bind(null, t2),
    Wo: Lu.bind(null, t2)
  }), t2.wu.push(async (e) => {
    e ? (t2.pu.Mo(), Ou(t2) ? ku(t2) : t2.gu.set("Unknown")) : (await t2.pu.stop(), Fu(t2));
  })), t2.pu;
}
function ec(t2) {
  return t2.Iu || (t2.Iu = function(t3, e, n) {
    const s = $(t3);
    return s.su(), new Au(e, s.connection, s.authCredentials, s.appCheckCredentials, s.yt, n);
  }(t2.datastore, t2.asyncQueue, {
    Yr: zu.bind(null, t2),
    Zr: Yu.bind(null, t2),
    tu: Hu.bind(null, t2),
    Zo: Ju.bind(null, t2)
  }), t2.wu.push(async (e) => {
    e ? (t2.Iu.Mo(), await Ku(t2)) : (await t2.Iu.stop(), t2.fu.length > 0 && (C("RemoteStore", `Stopping write stream with ${t2.fu.length} pending writes`), t2.fu = []));
  })), t2.Iu;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class nc {
  constructor(t2, e, n, s, i) {
    this.asyncQueue = t2, this.timerId = e, this.targetTimeMs = n, this.op = s, this.removalCallback = i, this.deferred = new q(), this.then = this.deferred.promise.then.bind(this.deferred.promise), this.deferred.promise.catch((t3) => {
    });
  }
  static createAndSchedule(t2, e, n, s, i) {
    const r = Date.now() + n, o = new nc(t2, e, r, s, i);
    return o.start(n), o;
  }
  start(t2) {
    this.timerHandle = setTimeout(() => this.handleDelayElapsed(), t2);
  }
  skipDelay() {
    return this.handleDelayElapsed();
  }
  cancel(t2) {
    null !== this.timerHandle && (this.clearTimeout(), this.deferred.reject(new L(B.CANCELLED, "Operation cancelled" + (t2 ? ": " + t2 : ""))));
  }
  handleDelayElapsed() {
    this.asyncQueue.enqueueAndForget(() => null !== this.timerHandle ? (this.clearTimeout(), this.op().then((t2) => this.deferred.resolve(t2))) : Promise.resolve());
  }
  clearTimeout() {
    null !== this.timerHandle && (this.removalCallback(this), clearTimeout(this.timerHandle), this.timerHandle = null);
  }
}
function sc(t2, e) {
  if (x("AsyncQueue", `${e}: ${t2}`), Vt(t2))
    return new L(B.UNAVAILABLE, `${e}: ${t2}`);
  throw t2;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ic {
  constructor(t2) {
    this.comparator = t2 ? (e, n) => t2(e, n) || ct.comparator(e.key, n.key) : (t3, e) => ct.comparator(t3.key, e.key), this.keyedMap = ws(), this.sortedSet = new Ge(this.comparator);
  }
  static emptySet(t2) {
    return new ic(t2.comparator);
  }
  has(t2) {
    return null != this.keyedMap.get(t2);
  }
  get(t2) {
    return this.keyedMap.get(t2);
  }
  first() {
    return this.sortedSet.minKey();
  }
  last() {
    return this.sortedSet.maxKey();
  }
  isEmpty() {
    return this.sortedSet.isEmpty();
  }
  indexOf(t2) {
    const e = this.keyedMap.get(t2);
    return e ? this.sortedSet.indexOf(e) : -1;
  }
  get size() {
    return this.sortedSet.size;
  }
  forEach(t2) {
    this.sortedSet.inorderTraversal((e, n) => (t2(e), false));
  }
  add(t2) {
    const e = this.delete(t2.key);
    return e.copy(e.keyedMap.insert(t2.key, t2), e.sortedSet.insert(t2, null));
  }
  delete(t2) {
    const e = this.get(t2);
    return e ? this.copy(this.keyedMap.remove(t2), this.sortedSet.remove(e)) : this;
  }
  isEqual(t2) {
    if (!(t2 instanceof ic))
      return false;
    if (this.size !== t2.size)
      return false;
    const e = this.sortedSet.getIterator(), n = t2.sortedSet.getIterator();
    for (; e.hasNext(); ) {
      const t3 = e.getNext().key, s = n.getNext().key;
      if (!t3.isEqual(s))
        return false;
    }
    return true;
  }
  toString() {
    const t2 = [];
    return this.forEach((e) => {
      t2.push(e.toString());
    }), 0 === t2.length ? "DocumentSet ()" : "DocumentSet (\n  " + t2.join("  \n") + "\n)";
  }
  copy(t2, e) {
    const n = new ic();
    return n.comparator = this.comparator, n.keyedMap = t2, n.sortedSet = e, n;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class rc {
  constructor() {
    this.Tu = new Ge(ct.comparator);
  }
  track(t2) {
    const e = t2.doc.key, n = this.Tu.get(e);
    n ? 0 !== t2.type && 3 === n.type ? this.Tu = this.Tu.insert(e, t2) : 3 === t2.type && 1 !== n.type ? this.Tu = this.Tu.insert(e, {
      type: n.type,
      doc: t2.doc
    }) : 2 === t2.type && 2 === n.type ? this.Tu = this.Tu.insert(e, {
      type: 2,
      doc: t2.doc
    }) : 2 === t2.type && 0 === n.type ? this.Tu = this.Tu.insert(e, {
      type: 0,
      doc: t2.doc
    }) : 1 === t2.type && 0 === n.type ? this.Tu = this.Tu.remove(e) : 1 === t2.type && 2 === n.type ? this.Tu = this.Tu.insert(e, {
      type: 1,
      doc: n.doc
    }) : 0 === t2.type && 1 === n.type ? this.Tu = this.Tu.insert(e, {
      type: 2,
      doc: t2.doc
    }) : O() : this.Tu = this.Tu.insert(e, t2);
  }
  Eu() {
    const t2 = [];
    return this.Tu.inorderTraversal((e, n) => {
      t2.push(n);
    }), t2;
  }
}
class oc {
  constructor(t2, e, n, s, i, r, o, u, c) {
    this.query = t2, this.docs = e, this.oldDocs = n, this.docChanges = s, this.mutatedKeys = i, this.fromCache = r, this.syncStateChanged = o, this.excludesMetadataChanges = u, this.hasCachedResults = c;
  }
  static fromInitialDocuments(t2, e, n, s, i) {
    const r = [];
    return e.forEach((t3) => {
      r.push({
        type: 0,
        doc: t3
      });
    }), new oc(
      t2,
      e,
      ic.emptySet(e),
      r,
      n,
      s,
      true,
      false,
      i
    );
  }
  get hasPendingWrites() {
    return !this.mutatedKeys.isEmpty();
  }
  isEqual(t2) {
    if (!(this.fromCache === t2.fromCache && this.hasCachedResults === t2.hasCachedResults && this.syncStateChanged === t2.syncStateChanged && this.mutatedKeys.isEqual(t2.mutatedKeys) && In(this.query, t2.query) && this.docs.isEqual(t2.docs) && this.oldDocs.isEqual(t2.oldDocs)))
      return false;
    const e = this.docChanges, n = t2.docChanges;
    if (e.length !== n.length)
      return false;
    for (let t3 = 0; t3 < e.length; t3++)
      if (e[t3].type !== n[t3].type || !e[t3].doc.isEqual(n[t3].doc))
        return false;
    return true;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class uc {
  constructor() {
    this.Au = void 0, this.listeners = [];
  }
}
class cc {
  constructor() {
    this.queries = new ls((t2) => Tn(t2), In), this.onlineState = "Unknown", this.Ru = /* @__PURE__ */ new Set();
  }
}
async function ac(t2, e) {
  const n = $(t2), s = e.query;
  let i = false, r = n.queries.get(s);
  if (r || (i = true, r = new uc()), i)
    try {
      r.Au = await n.onListen(s);
    } catch (t3) {
      const n2 = sc(t3, `Initialization of query '${En(e.query)}' failed`);
      return void e.onError(n2);
    }
  if (n.queries.set(s, r), r.listeners.push(e), e.bu(n.onlineState), r.Au) {
    e.Pu(r.Au) && dc(n);
  }
}
async function hc(t2, e) {
  const n = $(t2), s = e.query;
  let i = false;
  const r = n.queries.get(s);
  if (r) {
    const t3 = r.listeners.indexOf(e);
    t3 >= 0 && (r.listeners.splice(t3, 1), i = 0 === r.listeners.length);
  }
  if (i)
    return n.queries.delete(s), n.onUnlisten(s);
}
function lc(t2, e) {
  const n = $(t2);
  let s = false;
  for (const t3 of e) {
    const e2 = t3.query, i = n.queries.get(e2);
    if (i) {
      for (const e3 of i.listeners)
        e3.Pu(t3) && (s = true);
      i.Au = t3;
    }
  }
  s && dc(n);
}
function fc(t2, e, n) {
  const s = $(t2), i = s.queries.get(e);
  if (i)
    for (const t3 of i.listeners)
      t3.onError(n);
  s.queries.delete(e);
}
function dc(t2) {
  t2.Ru.forEach((t3) => {
    t3.next();
  });
}
class _c {
  constructor(t2, e, n) {
    this.query = t2, this.vu = e, this.Vu = false, this.Su = null, this.onlineState = "Unknown", this.options = n || {};
  }
  Pu(t2) {
    if (!this.options.includeMetadataChanges) {
      const e2 = [];
      for (const n of t2.docChanges)
        3 !== n.type && e2.push(n);
      t2 = new oc(
        t2.query,
        t2.docs,
        t2.oldDocs,
        e2,
        t2.mutatedKeys,
        t2.fromCache,
        t2.syncStateChanged,
        true,
        t2.hasCachedResults
      );
    }
    let e = false;
    return this.Vu ? this.Du(t2) && (this.vu.next(t2), e = true) : this.Cu(t2, this.onlineState) && (this.xu(t2), e = true), this.Su = t2, e;
  }
  onError(t2) {
    this.vu.error(t2);
  }
  bu(t2) {
    this.onlineState = t2;
    let e = false;
    return this.Su && !this.Vu && this.Cu(this.Su, t2) && (this.xu(this.Su), e = true), e;
  }
  Cu(t2, e) {
    if (!t2.fromCache)
      return true;
    const n = "Offline" !== e;
    return (!this.options.Nu || !n) && (!t2.docs.isEmpty() || t2.hasCachedResults || "Offline" === e);
  }
  Du(t2) {
    if (t2.docChanges.length > 0)
      return true;
    const e = this.Su && this.Su.hasPendingWrites !== t2.hasPendingWrites;
    return !(!t2.syncStateChanged && !e) && true === this.options.includeMetadataChanges;
  }
  xu(t2) {
    t2 = oc.fromInitialDocuments(t2.query, t2.docs, t2.mutatedKeys, t2.fromCache, t2.hasCachedResults), this.Vu = true, this.vu.next(t2);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class pc {
  constructor(t2) {
    this.key = t2;
  }
}
class Ic {
  constructor(t2) {
    this.key = t2;
  }
}
class Tc {
  constructor(t2, e) {
    this.query = t2, this.qu = e, this.Uu = null, this.hasCachedResults = false, this.current = false, this.Ku = Es(), this.mutatedKeys = Es(), this.Gu = bn(t2), this.Qu = new ic(this.Gu);
  }
  get ju() {
    return this.qu;
  }
  Wu(t2, e) {
    const n = e ? e.zu : new rc(), s = e ? e.Qu : this.Qu;
    let i = e ? e.mutatedKeys : this.mutatedKeys, r = s, o = false;
    const u = "F" === this.query.limitType && s.size === this.query.limit ? s.last() : null, c = "L" === this.query.limitType && s.size === this.query.limit ? s.first() : null;
    if (t2.inorderTraversal((t3, e2) => {
      const a = s.get(t3), h = An(this.query, e2) ? e2 : null, l2 = !!a && this.mutatedKeys.has(a.key), f = !!h && (h.hasLocalMutations || this.mutatedKeys.has(h.key) && h.hasCommittedMutations);
      let d = false;
      if (a && h) {
        a.data.isEqual(h.data) ? l2 !== f && (n.track({
          type: 3,
          doc: h
        }), d = true) : this.Hu(a, h) || (n.track({
          type: 2,
          doc: h
        }), d = true, (u && this.Gu(h, u) > 0 || c && this.Gu(h, c) < 0) && (o = true));
      } else
        !a && h ? (n.track({
          type: 0,
          doc: h
        }), d = true) : a && !h && (n.track({
          type: 1,
          doc: a
        }), d = true, (u || c) && (o = true));
      d && (h ? (r = r.add(h), i = f ? i.add(t3) : i.delete(t3)) : (r = r.delete(t3), i = i.delete(t3)));
    }), null !== this.query.limit)
      for (; r.size > this.query.limit; ) {
        const t3 = "F" === this.query.limitType ? r.last() : r.first();
        r = r.delete(t3.key), i = i.delete(t3.key), n.track({
          type: 1,
          doc: t3
        });
      }
    return {
      Qu: r,
      zu: n,
      $i: o,
      mutatedKeys: i
    };
  }
  Hu(t2, e) {
    return t2.hasLocalMutations && e.hasCommittedMutations && !e.hasLocalMutations;
  }
  applyChanges(t2, e, n) {
    const s = this.Qu;
    this.Qu = t2.Qu, this.mutatedKeys = t2.mutatedKeys;
    const i = t2.zu.Eu();
    i.sort((t3, e2) => function(t4, e3) {
      const n2 = (t5) => {
        switch (t5) {
          case 0:
            return 1;
          case 2:
          case 3:
            return 2;
          case 1:
            return 0;
          default:
            return O();
        }
      };
      return n2(t4) - n2(e3);
    }(t3.type, e2.type) || this.Gu(t3.doc, e2.doc)), this.Ju(n);
    const r = e ? this.Yu() : [], o = 0 === this.Ku.size && this.current ? 1 : 0, u = o !== this.Uu;
    if (this.Uu = o, 0 !== i.length || u) {
      return {
        snapshot: new oc(
          this.query,
          t2.Qu,
          s,
          i,
          t2.mutatedKeys,
          0 === o,
          u,
          false,
          !!n && n.resumeToken.approximateByteSize() > 0
        ),
        Xu: r
      };
    }
    return {
      Xu: r
    };
  }
  bu(t2) {
    return this.current && "Offline" === t2 ? (this.current = false, this.applyChanges(
      {
        Qu: this.Qu,
        zu: new rc(),
        mutatedKeys: this.mutatedKeys,
        $i: false
      },
      false
    )) : {
      Xu: []
    };
  }
  Zu(t2) {
    return !this.qu.has(t2) && (!!this.Qu.has(t2) && !this.Qu.get(t2).hasLocalMutations);
  }
  Ju(t2) {
    t2 && (t2.addedDocuments.forEach((t3) => this.qu = this.qu.add(t3)), t2.modifiedDocuments.forEach((t3) => {
    }), t2.removedDocuments.forEach((t3) => this.qu = this.qu.delete(t3)), this.current = t2.current);
  }
  Yu() {
    if (!this.current)
      return [];
    const t2 = this.Ku;
    this.Ku = Es(), this.Qu.forEach((t3) => {
      this.Zu(t3.key) && (this.Ku = this.Ku.add(t3.key));
    });
    const e = [];
    return t2.forEach((t3) => {
      this.Ku.has(t3) || e.push(new Ic(t3));
    }), this.Ku.forEach((n) => {
      t2.has(n) || e.push(new pc(n));
    }), e;
  }
  tc(t2) {
    this.qu = t2.Hi, this.Ku = Es();
    const e = this.Wu(t2.documents);
    return this.applyChanges(e, true);
  }
  ec() {
    return oc.fromInitialDocuments(this.query, this.Qu, this.mutatedKeys, 0 === this.Uu, this.hasCachedResults);
  }
}
class Ec {
  constructor(t2, e, n) {
    this.query = t2, this.targetId = e, this.view = n;
  }
}
class Ac {
  constructor(t2) {
    this.key = t2, this.nc = false;
  }
}
class Rc {
  constructor(t2, e, n, s, i, r) {
    this.localStore = t2, this.remoteStore = e, this.eventManager = n, this.sharedClientState = s, this.currentUser = i, this.maxConcurrentLimboResolutions = r, this.sc = {}, this.ic = new ls((t3) => Tn(t3), In), this.rc = /* @__PURE__ */ new Map(), this.oc = /* @__PURE__ */ new Set(), this.uc = new Ge(ct.comparator), this.cc = /* @__PURE__ */ new Map(), this.ac = new Eo(), this.hc = {}, this.lc = /* @__PURE__ */ new Map(), this.fc = Yr.vn(), this.onlineState = "Unknown", this.dc = void 0;
  }
  get isPrimaryClient() {
    return true === this.dc;
  }
}
async function bc(t2, e) {
  const n = ta(t2);
  let s, i;
  const r = n.ic.get(e);
  if (r)
    s = r.targetId, n.sharedClientState.addLocalQueryTarget(s), i = r.view.ec();
  else {
    const t3 = await zo(n.localStore, gn(e));
    n.isPrimaryClient && Du(n.remoteStore, t3);
    const r2 = n.sharedClientState.addLocalQueryTarget(t3.targetId);
    s = t3.targetId, i = await Pc(n, e, s, "current" === r2, t3.resumeToken);
  }
  return i;
}
async function Pc(t2, e, n, s, i) {
  t2._c = (e2, n2, s2) => async function(t3, e3, n3, s3) {
    let i2 = e3.view.Wu(n3);
    i2.$i && (i2 = await Jo(
      t3.localStore,
      e3.query,
      false
    ).then(({ documents: t4 }) => e3.view.Wu(t4, i2)));
    const r2 = s3 && s3.targetChanges.get(e3.targetId), o2 = e3.view.applyChanges(
      i2,
      t3.isPrimaryClient,
      r2
    );
    return Bc(t3, e3.targetId, o2.Xu), o2.snapshot;
  }(t2, e2, n2, s2);
  const r = await Jo(
    t2.localStore,
    e,
    true
  ), o = new Tc(e, r.Hi), u = o.Wu(r.documents), c = Ps.createSynthesizedTargetChangeForCurrentChange(n, s && "Offline" !== t2.onlineState, i), a = o.applyChanges(
    u,
    t2.isPrimaryClient,
    c
  );
  Bc(t2, n, a.Xu);
  const h = new Ec(e, n, o);
  return t2.ic.set(e, h), t2.rc.has(n) ? t2.rc.get(n).push(e) : t2.rc.set(n, [e]), a.snapshot;
}
async function vc(t2, e) {
  const n = $(t2), s = n.ic.get(e), i = n.rc.get(s.targetId);
  if (i.length > 1)
    return n.rc.set(s.targetId, i.filter((t3) => !In(t3, e))), void n.ic.delete(e);
  if (n.isPrimaryClient) {
    n.sharedClientState.removeLocalQueryTarget(s.targetId);
    n.sharedClientState.isActiveQueryTarget(s.targetId) || await Ho(
      n.localStore,
      s.targetId,
      false
    ).then(() => {
      n.sharedClientState.clearQueryState(s.targetId), Cu(n.remoteStore, s.targetId), Fc(n, s.targetId);
    }).catch(Et);
  } else
    Fc(n, s.targetId), await Ho(
      n.localStore,
      s.targetId,
      true
    );
}
async function Vc(t2, e, n) {
  const s = ea(t2);
  try {
    const t3 = await function(t4, e2) {
      const n2 = $(t4), s2 = nt.now(), i = e2.reduce((t5, e3) => t5.add(e3.key), Es());
      let r, o;
      return n2.persistence.runTransaction("Locally write mutations", "readwrite", (t5) => {
        let u = ds(), c = Es();
        return n2.Gi.getEntries(t5, i).next((t6) => {
          u = t6, u.forEach((t7, e3) => {
            e3.isValidDocument() || (c = c.add(t7));
          });
        }).next(() => n2.localDocuments.getOverlayedDocuments(t5, u)).next((i2) => {
          r = i2;
          const o2 = [];
          for (const t6 of e2) {
            const e3 = Yn(t6, r.get(t6.key).overlayedDocument);
            null != e3 && o2.push(new ts(t6.key, e3, Xe(e3.value.mapValue), Qn.exists(true)));
          }
          return n2.mutationQueue.addMutationBatch(t5, s2, o2, e2);
        }).next((e3) => {
          o = e3;
          const s3 = e3.applyToLocalDocumentSet(r, c);
          return n2.documentOverlayCache.saveOverlays(t5, e3.batchId, s3);
        });
      }).then(() => ({
        batchId: o.batchId,
        changes: ms(r)
      }));
    }(s.localStore, e);
    s.sharedClientState.addPendingMutation(t3.batchId), function(t4, e2, n2) {
      let s2 = t4.hc[t4.currentUser.toKey()];
      s2 || (s2 = new Ge(Z));
      s2 = s2.insert(e2, n2), t4.hc[t4.currentUser.toKey()] = s2;
    }(s, t3.batchId, n), await Uc(s, t3.changes), await Ku(s.remoteStore);
  } catch (t3) {
    const e2 = sc(t3, "Failed to persist write");
    n.reject(e2);
  }
}
async function Sc(t2, e) {
  const n = $(t2);
  try {
    const t3 = await Qo(n.localStore, e);
    e.targetChanges.forEach((t4, e2) => {
      const s = n.cc.get(e2);
      s && (M(t4.addedDocuments.size + t4.modifiedDocuments.size + t4.removedDocuments.size <= 1), t4.addedDocuments.size > 0 ? s.nc = true : t4.modifiedDocuments.size > 0 ? M(s.nc) : t4.removedDocuments.size > 0 && (M(s.nc), s.nc = false));
    }), await Uc(n, t3, e);
  } catch (t3) {
    await Et(t3);
  }
}
function Dc(t2, e, n) {
  const s = $(t2);
  if (s.isPrimaryClient && 0 === n || !s.isPrimaryClient && 1 === n) {
    const t3 = [];
    s.ic.forEach((n2, s2) => {
      const i = s2.view.bu(e);
      i.snapshot && t3.push(i.snapshot);
    }), function(t4, e2) {
      const n2 = $(t4);
      n2.onlineState = e2;
      let s2 = false;
      n2.queries.forEach((t5, n3) => {
        for (const t6 of n3.listeners)
          t6.bu(e2) && (s2 = true);
      }), s2 && dc(n2);
    }(s.eventManager, e), t3.length && s.sc.Wo(t3), s.onlineState = e, s.isPrimaryClient && s.sharedClientState.setOnlineState(e);
  }
}
async function Cc(t2, e, n) {
  const s = $(t2);
  s.sharedClientState.updateQueryState(e, "rejected", n);
  const i = s.cc.get(e), r = i && i.key;
  if (r) {
    let t3 = new Ge(ct.comparator);
    t3 = t3.insert(r, Ze.newNoDocument(r, st.min()));
    const n2 = Es().add(r), i2 = new bs(
      st.min(),
      /* @__PURE__ */ new Map(),
      new We(Z),
      t3,
      n2
    );
    await Sc(s, i2), s.uc = s.uc.remove(r), s.cc.delete(e), qc(s);
  } else
    await Ho(
      s.localStore,
      e,
      false
    ).then(() => Fc(s, e, n)).catch(Et);
}
async function xc(t2, e) {
  const n = $(t2), s = e.batch.batchId;
  try {
    const t3 = await Ko(n.localStore, e);
    Mc(n, s, null), Oc(n, s), n.sharedClientState.updateMutationState(s, "acknowledged"), await Uc(n, t3);
  } catch (t3) {
    await Et(t3);
  }
}
async function Nc(t2, e, n) {
  const s = $(t2);
  try {
    const t3 = await function(t4, e2) {
      const n2 = $(t4);
      return n2.persistence.runTransaction("Reject batch", "readwrite-primary", (t5) => {
        let s2;
        return n2.mutationQueue.lookupMutationBatch(t5, e2).next((e3) => (M(null !== e3), s2 = e3.keys(), n2.mutationQueue.removeMutationBatch(t5, e3))).next(() => n2.mutationQueue.performConsistencyCheck(t5)).next(() => n2.documentOverlayCache.removeOverlaysForBatchId(t5, s2, e2)).next(() => n2.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t5, s2)).next(() => n2.localDocuments.getDocuments(t5, s2));
      });
    }(s.localStore, e);
    Mc(s, e, n), Oc(s, e), s.sharedClientState.updateMutationState(e, "rejected", n), await Uc(s, t3);
  } catch (n2) {
    await Et(n2);
  }
}
function Oc(t2, e) {
  (t2.lc.get(e) || []).forEach((t3) => {
    t3.resolve();
  }), t2.lc.delete(e);
}
function Mc(t2, e, n) {
  const s = $(t2);
  let i = s.hc[s.currentUser.toKey()];
  if (i) {
    const t3 = i.get(e);
    t3 && (n ? t3.reject(n) : t3.resolve(), i = i.remove(e)), s.hc[s.currentUser.toKey()] = i;
  }
}
function Fc(t2, e, n = null) {
  t2.sharedClientState.removeLocalQueryTarget(e);
  for (const s of t2.rc.get(e))
    t2.ic.delete(s), n && t2.sc.wc(s, n);
  if (t2.rc.delete(e), t2.isPrimaryClient) {
    t2.ac.ls(e).forEach((e2) => {
      t2.ac.containsKey(e2) || $c(t2, e2);
    });
  }
}
function $c(t2, e) {
  t2.oc.delete(e.path.canonicalString());
  const n = t2.uc.get(e);
  null !== n && (Cu(t2.remoteStore, n), t2.uc = t2.uc.remove(e), t2.cc.delete(n), qc(t2));
}
function Bc(t2, e, n) {
  for (const s of n)
    if (s instanceof pc)
      t2.ac.addReference(s.key, e), Lc(t2, s);
    else if (s instanceof Ic) {
      C("SyncEngine", "Document no longer in limbo: " + s.key), t2.ac.removeReference(s.key, e);
      t2.ac.containsKey(s.key) || $c(t2, s.key);
    } else
      O();
}
function Lc(t2, e) {
  const n = e.key, s = n.path.canonicalString();
  t2.uc.get(n) || t2.oc.has(s) || (C("SyncEngine", "New document in limbo: " + n), t2.oc.add(s), qc(t2));
}
function qc(t2) {
  for (; t2.oc.size > 0 && t2.uc.size < t2.maxConcurrentLimboResolutions; ) {
    const e = t2.oc.values().next().value;
    t2.oc.delete(e);
    const n = new ct(rt.fromString(e)), s = t2.fc.next();
    t2.cc.set(s, new Ac(n)), t2.uc = t2.uc.insert(n, s), Du(t2.remoteStore, new zi(gn(ln(n.path)), s, 2, Ot.at));
  }
}
async function Uc(t2, e, n) {
  const s = $(t2), i = [], r = [], o = [];
  s.ic.isEmpty() || (s.ic.forEach((t3, u) => {
    o.push(s._c(u, e, n).then((t4) => {
      if ((t4 || n) && s.isPrimaryClient && s.sharedClientState.updateQueryState(u.targetId, (null == t4 ? void 0 : t4.fromCache) ? "not-current" : "current"), t4) {
        i.push(t4);
        const e2 = $o.Ci(u.targetId, t4);
        r.push(e2);
      }
    }));
  }), await Promise.all(o), s.sc.Wo(i), await async function(t3, e2) {
    const n2 = $(t3);
    try {
      await n2.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (t4) => At.forEach(e2, (e3) => At.forEach(e3.Si, (s2) => n2.persistence.referenceDelegate.addReference(t4, e3.targetId, s2)).next(() => At.forEach(e3.Di, (s2) => n2.persistence.referenceDelegate.removeReference(t4, e3.targetId, s2)))));
    } catch (t4) {
      if (!Vt(t4))
        throw t4;
      C("LocalStore", "Failed to update sequence numbers: " + t4);
    }
    for (const t4 of e2) {
      const e3 = t4.targetId;
      if (!t4.fromCache) {
        const t5 = n2.qi.get(e3), s2 = t5.snapshotVersion, i2 = t5.withLastLimboFreeSnapshotVersion(s2);
        n2.qi = n2.qi.insert(e3, i2);
      }
    }
  }(s.localStore, r));
}
async function Kc(t2, e) {
  const n = $(t2);
  if (!n.currentUser.isEqual(e)) {
    C("SyncEngine", "User change. New user:", e.toKey());
    const t3 = await Uo(n.localStore, e);
    n.currentUser = e, function(t4, e2) {
      t4.lc.forEach((t5) => {
        t5.forEach((t6) => {
          t6.reject(new L(B.CANCELLED, e2));
        });
      }), t4.lc.clear();
    }(n, "'waitForPendingWrites' promise is rejected due to a user change."), n.sharedClientState.handleUserChange(e, t3.removedBatchIds, t3.addedBatchIds), await Uc(n, t3.ji);
  }
}
function Gc(t2, e) {
  const n = $(t2), s = n.cc.get(e);
  if (s && s.nc)
    return Es().add(s.key);
  {
    let t3 = Es();
    const s2 = n.rc.get(e);
    if (!s2)
      return t3;
    for (const e2 of s2) {
      const s3 = n.ic.get(e2);
      t3 = t3.unionWith(s3.view.ju);
    }
    return t3;
  }
}
function ta(t2) {
  const e = $(t2);
  return e.remoteStore.remoteSyncer.applyRemoteEvent = Sc.bind(null, e), e.remoteStore.remoteSyncer.getRemoteKeysForTarget = Gc.bind(null, e), e.remoteStore.remoteSyncer.rejectListen = Cc.bind(null, e), e.sc.Wo = lc.bind(null, e.eventManager), e.sc.wc = fc.bind(null, e.eventManager), e;
}
function ea(t2) {
  const e = $(t2);
  return e.remoteStore.remoteSyncer.applySuccessfulWrite = xc.bind(null, e), e.remoteStore.remoteSyncer.rejectFailedWrite = Nc.bind(null, e), e;
}
class sa {
  constructor() {
    this.synchronizeTabs = false;
  }
  async initialize(t2) {
    this.yt = pu(t2.databaseInfo.databaseId), this.sharedClientState = this.gc(t2), this.persistence = this.yc(t2), await this.persistence.start(), this.localStore = this.Ic(t2), this.gcScheduler = this.Tc(t2, this.localStore), this.indexBackfillerScheduler = this.Ec(t2, this.localStore);
  }
  Tc(t2, e) {
    return null;
  }
  Ec(t2, e) {
    return null;
  }
  Ic(t2) {
    return qo(this.persistence, new Bo(), t2.initialUser, this.yt);
  }
  yc(t2) {
    return new Vo(Do.Bs, this.yt);
  }
  gc(t2) {
    return new lu();
  }
  async terminate() {
    this.gcScheduler && this.gcScheduler.stop(), await this.sharedClientState.shutdown(), await this.persistence.shutdown();
  }
}
class oa {
  async initialize(t2, e) {
    this.localStore || (this.localStore = t2.localStore, this.sharedClientState = t2.sharedClientState, this.datastore = this.createDatastore(e), this.remoteStore = this.createRemoteStore(e), this.eventManager = this.createEventManager(e), this.syncEngine = this.createSyncEngine(
      e,
      !t2.synchronizeTabs
    ), this.sharedClientState.onlineStateHandler = (t3) => Dc(this.syncEngine, t3, 1), this.remoteStore.remoteSyncer.handleCredentialChange = Kc.bind(null, this.syncEngine), await Zu(this.remoteStore, this.syncEngine.isPrimaryClient));
  }
  createEventManager(t2) {
    return new cc();
  }
  createDatastore(t2) {
    const e = pu(t2.databaseInfo.databaseId), n = (s = t2.databaseInfo, new mu(s));
    var s;
    return function(t3, e2, n2, s2) {
      return new Ru(t3, e2, n2, s2);
    }(t2.authCredentials, t2.appCheckCredentials, n, e);
  }
  createRemoteStore(t2) {
    return e = this.localStore, n = this.datastore, s = t2.asyncQueue, i = (t3) => Dc(this.syncEngine, t3, 0), r = du.C() ? new du() : new fu(), new vu(e, n, s, i, r);
    var e, n, s, i, r;
  }
  createSyncEngine(t2, e) {
    return function(t3, e2, n, s, i, r, o) {
      const u = new Rc(t3, e2, n, s, i, r);
      return o && (u.dc = true), u;
    }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, t2.initialUser, t2.maxConcurrentLimboResolutions, e);
  }
  terminate() {
    return async function(t2) {
      const e = $(t2);
      C("RemoteStore", "RemoteStore shutting down."), e._u.add(5), await Su(e), e.mu.shutdown(), e.gu.set("Unknown");
    }(this.remoteStore);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function ua(t2, e, n) {
  if (!n)
    throw new L(B.INVALID_ARGUMENT, `Function ${t2}() cannot be called with an empty ${e}.`);
}
function ca(t2, e, n, s) {
  if (true === e && true === s)
    throw new L(B.INVALID_ARGUMENT, `${t2} and ${n} cannot be used together.`);
}
function aa(t2) {
  if (!ct.isDocumentKey(t2))
    throw new L(B.INVALID_ARGUMENT, `Invalid document reference. Document references must have an even number of segments, but ${t2} has ${t2.length}.`);
}
function ha(t2) {
  if (ct.isDocumentKey(t2))
    throw new L(B.INVALID_ARGUMENT, `Invalid collection reference. Collection references must have an odd number of segments, but ${t2} has ${t2.length}.`);
}
function la(t2) {
  if (void 0 === t2)
    return "undefined";
  if (null === t2)
    return "null";
  if ("string" == typeof t2)
    return t2.length > 20 && (t2 = `${t2.substring(0, 20)}...`), JSON.stringify(t2);
  if ("number" == typeof t2 || "boolean" == typeof t2)
    return "" + t2;
  if ("object" == typeof t2) {
    if (t2 instanceof Array)
      return "an array";
    {
      const e = function(t3) {
        if (t3.constructor)
          return t3.constructor.name;
        return null;
      }(t2);
      return e ? `a custom ${e} object` : "an object";
    }
  }
  return "function" == typeof t2 ? "a function" : O();
}
function fa(t2, e) {
  if ("_delegate" in t2 && (t2 = t2._delegate), !(t2 instanceof e)) {
    if (e.name === t2.constructor.name)
      throw new L(B.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
    {
      const n = la(t2);
      throw new L(B.INVALID_ARGUMENT, `Expected type '${e.name}', but it was: ${n}`);
    }
  }
  return t2;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const _a = /* @__PURE__ */ new Map();
class wa {
  constructor(t2) {
    var e;
    if (void 0 === t2.host) {
      if (void 0 !== t2.ssl)
        throw new L(B.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
      this.host = "firestore.googleapis.com", this.ssl = true;
    } else
      this.host = t2.host, this.ssl = null === (e = t2.ssl) || void 0 === e || e;
    if (this.credentials = t2.credentials, this.ignoreUndefinedProperties = !!t2.ignoreUndefinedProperties, void 0 === t2.cacheSizeBytes)
      this.cacheSizeBytes = 41943040;
    else {
      if (-1 !== t2.cacheSizeBytes && t2.cacheSizeBytes < 1048576)
        throw new L(B.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
      this.cacheSizeBytes = t2.cacheSizeBytes;
    }
    this.experimentalForceLongPolling = !!t2.experimentalForceLongPolling, this.experimentalAutoDetectLongPolling = !!t2.experimentalAutoDetectLongPolling, this.useFetchStreams = !!t2.useFetchStreams, ca("experimentalForceLongPolling", t2.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", t2.experimentalAutoDetectLongPolling);
  }
  isEqual(t2) {
    return this.host === t2.host && this.ssl === t2.ssl && this.credentials === t2.credentials && this.cacheSizeBytes === t2.cacheSizeBytes && this.experimentalForceLongPolling === t2.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === t2.experimentalAutoDetectLongPolling && this.ignoreUndefinedProperties === t2.ignoreUndefinedProperties && this.useFetchStreams === t2.useFetchStreams;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ma {
  constructor(t2, e, n, s) {
    this._authCredentials = t2, this._appCheckCredentials = e, this._databaseId = n, this._app = s, this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new wa({}), this._settingsFrozen = false;
  }
  get app() {
    if (!this._app)
      throw new L(B.FAILED_PRECONDITION, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
    return this._app;
  }
  get _initialized() {
    return this._settingsFrozen;
  }
  get _terminated() {
    return void 0 !== this._terminateTask;
  }
  _setSettings(t2) {
    if (this._settingsFrozen)
      throw new L(B.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
    this._settings = new wa(t2), void 0 !== t2.credentials && (this._authCredentials = function(t3) {
      if (!t3)
        return new K();
      switch (t3.type) {
        case "gapi":
          const e = t3.client;
          return new W(e, t3.sessionIndex || "0", t3.iamToken || null, t3.authTokenFactory || null);
        case "provider":
          return t3.client;
        default:
          throw new L(B.INVALID_ARGUMENT, "makeAuthCredentialsProvider failed due to invalid credential type");
      }
    }(t2.credentials));
  }
  _getSettings() {
    return this._settings;
  }
  _freezeSettings() {
    return this._settingsFrozen = true, this._settings;
  }
  _delete() {
    return this._terminateTask || (this._terminateTask = this._terminate()), this._terminateTask;
  }
  toJSON() {
    return {
      app: this._app,
      databaseId: this._databaseId,
      settings: this._settings
    };
  }
  _terminate() {
    return function(t2) {
      const e = _a.get(t2);
      e && (C("ComponentProvider", "Removing Datastore"), _a.delete(t2), e.terminate());
    }(this), Promise.resolve();
  }
}
function ga(t2, e, n, s = {}) {
  var i;
  const r = (t2 = fa(t2, ma))._getSettings();
  if ("firestore.googleapis.com" !== r.host && r.host !== e && N("Host has been set in both settings() and useEmulator(), emulator host will be used"), t2._setSettings(Object.assign(Object.assign({}, r), {
    host: `${e}:${n}`,
    ssl: false
  })), s.mockUserToken) {
    let e2, n2;
    if ("string" == typeof s.mockUserToken)
      e2 = s.mockUserToken, n2 = P.MOCK_USER;
    else {
      e2 = createMockUserToken(s.mockUserToken, null === (i = t2._app) || void 0 === i ? void 0 : i.options.projectId);
      const r2 = s.mockUserToken.sub || s.mockUserToken.user_id;
      if (!r2)
        throw new L(B.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
      n2 = new P(r2);
    }
    t2._authCredentials = new G(new U(e2, n2));
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ya {
  constructor(t2, e, n) {
    this.converter = e, this._key = n, this.type = "document", this.firestore = t2;
  }
  get _path() {
    return this._key.path;
  }
  get id() {
    return this._key.path.lastSegment();
  }
  get path() {
    return this._key.path.canonicalString();
  }
  get parent() {
    return new Ia(this.firestore, this.converter, this._key.path.popLast());
  }
  withConverter(t2) {
    return new ya(this.firestore, t2, this._key);
  }
}
class pa {
  constructor(t2, e, n) {
    this.converter = e, this._query = n, this.type = "query", this.firestore = t2;
  }
  withConverter(t2) {
    return new pa(this.firestore, t2, this._query);
  }
}
class Ia extends pa {
  constructor(t2, e, n) {
    super(t2, e, ln(n)), this._path = n, this.type = "collection";
  }
  get id() {
    return this._query.path.lastSegment();
  }
  get path() {
    return this._query.path.canonicalString();
  }
  get parent() {
    const t2 = this._path.popLast();
    return t2.isEmpty() ? null : new ya(
      this.firestore,
      null,
      new ct(t2)
    );
  }
  withConverter(t2) {
    return new Ia(this.firestore, t2, this._path);
  }
}
function Ta(t2, e, ...n) {
  if (t2 = getModularInstance(t2), ua("collection", "path", e), t2 instanceof ma) {
    const s = rt.fromString(e, ...n);
    return ha(s), new Ia(t2, null, s);
  }
  {
    if (!(t2 instanceof ya || t2 instanceof Ia))
      throw new L(B.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    const s = t2._path.child(rt.fromString(e, ...n));
    return ha(s), new Ia(
      t2.firestore,
      null,
      s
    );
  }
}
function Aa(t2, e, ...n) {
  if (t2 = getModularInstance(t2), 1 === arguments.length && (e = X.R()), ua("doc", "path", e), t2 instanceof ma) {
    const s = rt.fromString(e, ...n);
    return aa(s), new ya(
      t2,
      null,
      new ct(s)
    );
  }
  {
    if (!(t2 instanceof ya || t2 instanceof Ia))
      throw new L(B.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    const s = t2._path.child(rt.fromString(e, ...n));
    return aa(s), new ya(t2.firestore, t2 instanceof Ia ? t2.converter : null, new ct(s));
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class va {
  constructor(t2) {
    this.observer = t2, this.muted = false;
  }
  next(t2) {
    this.observer.next && this.Rc(this.observer.next, t2);
  }
  error(t2) {
    this.observer.error ? this.Rc(this.observer.error, t2) : x("Uncaught Error in snapshot listener:", t2.toString());
  }
  bc() {
    this.muted = true;
  }
  Rc(t2, e) {
    this.muted || setTimeout(() => {
      this.muted || t2(e);
    }, 0);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class ka {
  constructor(t2, e, n, s) {
    this.authCredentials = t2, this.appCheckCredentials = e, this.asyncQueue = n, this.databaseInfo = s, this.user = P.UNAUTHENTICATED, this.clientId = X.R(), this.authCredentialListener = () => Promise.resolve(), this.appCheckCredentialListener = () => Promise.resolve(), this.authCredentials.start(n, async (t3) => {
      C("FirestoreClient", "Received user=", t3.uid), await this.authCredentialListener(t3), this.user = t3;
    }), this.appCheckCredentials.start(n, (t3) => (C("FirestoreClient", "Received new app check token=", t3), this.appCheckCredentialListener(t3, this.user)));
  }
  async getConfiguration() {
    return {
      asyncQueue: this.asyncQueue,
      databaseInfo: this.databaseInfo,
      clientId: this.clientId,
      authCredentials: this.authCredentials,
      appCheckCredentials: this.appCheckCredentials,
      initialUser: this.user,
      maxConcurrentLimboResolutions: 100
    };
  }
  setCredentialChangeListener(t2) {
    this.authCredentialListener = t2;
  }
  setAppCheckTokenChangeListener(t2) {
    this.appCheckCredentialListener = t2;
  }
  verifyNotTerminated() {
    if (this.asyncQueue.isShuttingDown)
      throw new L(B.FAILED_PRECONDITION, "The client has already been terminated.");
  }
  terminate() {
    this.asyncQueue.enterRestrictedMode();
    const t2 = new q();
    return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
      try {
        this.onlineComponents && await this.onlineComponents.terminate(), this.offlineComponents && await this.offlineComponents.terminate(), this.authCredentials.shutdown(), this.appCheckCredentials.shutdown(), t2.resolve();
      } catch (e) {
        const n = sc(e, "Failed to shutdown persistence");
        t2.reject(n);
      }
    }), t2.promise;
  }
}
async function Oa(t2, e) {
  t2.asyncQueue.verifyOperationInProgress(), C("FirestoreClient", "Initializing OfflineComponentProvider");
  const n = await t2.getConfiguration();
  await e.initialize(n);
  let s = n.initialUser;
  t2.setCredentialChangeListener(async (t3) => {
    s.isEqual(t3) || (await Uo(e.localStore, t3), s = t3);
  }), e.persistence.setDatabaseDeletedListener(() => t2.terminate()), t2.offlineComponents = e;
}
async function Ma(t2, e) {
  t2.asyncQueue.verifyOperationInProgress();
  const n = await Fa(t2);
  C("FirestoreClient", "Initializing OnlineComponentProvider");
  const s = await t2.getConfiguration();
  await e.initialize(n, s), t2.setCredentialChangeListener((t3) => Xu(e.remoteStore, t3)), t2.setAppCheckTokenChangeListener((t3, n2) => Xu(e.remoteStore, n2)), t2.onlineComponents = e;
}
async function Fa(t2) {
  return t2.offlineComponents || (C("FirestoreClient", "Using default OfflineComponentProvider"), await Oa(t2, new sa())), t2.offlineComponents;
}
async function $a(t2) {
  return t2.onlineComponents || (C("FirestoreClient", "Using default OnlineComponentProvider"), await Ma(t2, new oa())), t2.onlineComponents;
}
function Ua(t2) {
  return $a(t2).then((t3) => t3.syncEngine);
}
async function Ga(t2) {
  const e = await $a(t2), n = e.eventManager;
  return n.onListen = bc.bind(null, e.syncEngine), n.onUnlisten = vc.bind(null, e.syncEngine), n;
}
function za(t2, e, n = {}) {
  const s = new q();
  return t2.asyncQueue.enqueueAndForget(async () => function(t3, e2, n2, s2, i) {
    const r = new va({
      next: (r2) => {
        e2.enqueueAndForget(() => hc(t3, o));
        const u = r2.docs.has(n2);
        !u && r2.fromCache ? i.reject(new L(B.UNAVAILABLE, "Failed to get document because the client is offline.")) : u && r2.fromCache && s2 && "server" === s2.source ? i.reject(new L(B.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : i.resolve(r2);
      },
      error: (t4) => i.reject(t4)
    }), o = new _c(ln(n2.path), r, {
      includeMetadataChanges: true,
      Nu: true
    });
    return ac(t3, o);
  }(await Ga(t2), t2.asyncQueue, e, n, s)), s.promise;
}
function Ja(t2, e, n = {}) {
  const s = new q();
  return t2.asyncQueue.enqueueAndForget(async () => function(t3, e2, n2, s2, i) {
    const r = new va({
      next: (n3) => {
        e2.enqueueAndForget(() => hc(t3, o)), n3.fromCache && "server" === s2.source ? i.reject(new L(B.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : i.resolve(n3);
      },
      error: (t4) => i.reject(t4)
    }), o = new _c(n2, r, {
      includeMetadataChanges: true,
      Nu: true
    });
    return ac(t3, o);
  }(await Ga(t2), t2.asyncQueue, e, n, s)), s.promise;
}
class th {
  constructor() {
    this.Bc = Promise.resolve(), this.Lc = [], this.qc = false, this.Uc = [], this.Kc = null, this.Gc = false, this.Qc = false, this.jc = [], this.xo = new Iu(this, "async_queue_retry"), this.Wc = () => {
      const t3 = yu();
      t3 && C("AsyncQueue", "Visibility state changed to " + t3.visibilityState), this.xo.Po();
    };
    const t2 = yu();
    t2 && "function" == typeof t2.addEventListener && t2.addEventListener("visibilitychange", this.Wc);
  }
  get isShuttingDown() {
    return this.qc;
  }
  enqueueAndForget(t2) {
    this.enqueue(t2);
  }
  enqueueAndForgetEvenWhileRestricted(t2) {
    this.zc(), this.Hc(t2);
  }
  enterRestrictedMode(t2) {
    if (!this.qc) {
      this.qc = true, this.Qc = t2 || false;
      const e = yu();
      e && "function" == typeof e.removeEventListener && e.removeEventListener("visibilitychange", this.Wc);
    }
  }
  enqueue(t2) {
    if (this.zc(), this.qc)
      return new Promise(() => {
      });
    const e = new q();
    return this.Hc(() => this.qc && this.Qc ? Promise.resolve() : (t2().then(e.resolve, e.reject), e.promise)).then(() => e.promise);
  }
  enqueueRetryable(t2) {
    this.enqueueAndForget(() => (this.Lc.push(t2), this.Jc()));
  }
  async Jc() {
    if (0 !== this.Lc.length) {
      try {
        await this.Lc[0](), this.Lc.shift(), this.xo.reset();
      } catch (t2) {
        if (!Vt(t2))
          throw t2;
        C("AsyncQueue", "Operation failed with retryable error: " + t2);
      }
      this.Lc.length > 0 && this.xo.Ro(() => this.Jc());
    }
  }
  Hc(t2) {
    const e = this.Bc.then(() => (this.Gc = true, t2().catch((t3) => {
      this.Kc = t3, this.Gc = false;
      const e2 = function(t4) {
        let e3 = t4.message || "";
        t4.stack && (e3 = t4.stack.includes(t4.message) ? t4.stack : t4.message + "\n" + t4.stack);
        return e3;
      }(t3);
      throw x("INTERNAL UNHANDLED ERROR: ", e2), t3;
    }).then((t3) => (this.Gc = false, t3))));
    return this.Bc = e, e;
  }
  enqueueAfterDelay(t2, e, n) {
    this.zc(), this.jc.indexOf(t2) > -1 && (e = 0);
    const s = nc.createAndSchedule(this, t2, e, n, (t3) => this.Yc(t3));
    return this.Uc.push(s), s;
  }
  zc() {
    this.Kc && O();
  }
  verifyOperationInProgress() {
  }
  async Xc() {
    let t2;
    do {
      t2 = this.Bc, await t2;
    } while (t2 !== this.Bc);
  }
  Zc(t2) {
    for (const e of this.Uc)
      if (e.timerId === t2)
        return true;
    return false;
  }
  ta(t2) {
    return this.Xc().then(() => {
      this.Uc.sort((t3, e) => t3.targetTimeMs - e.targetTimeMs);
      for (const e of this.Uc)
        if (e.skipDelay(), "all" !== t2 && e.timerId === t2)
          break;
      return this.Xc();
    });
  }
  ea(t2) {
    this.jc.push(t2);
  }
  Yc(t2) {
    const e = this.Uc.indexOf(t2);
    this.Uc.splice(e, 1);
  }
}
class ih extends ma {
  constructor(t2, e, n, s) {
    super(t2, e, n, s), this.type = "firestore", this._queue = new th(), this._persistenceKey = (null == s ? void 0 : s.name) || "[DEFAULT]";
  }
  _terminate() {
    return this._firestoreClient || ch(this), this._firestoreClient.terminate();
  }
}
function oh(e, n) {
  const s = "object" == typeof e ? e : getApp(), i = "string" == typeof e ? e : n || "(default)", r = _getProvider(s, "firestore").getImmediate({
    identifier: i
  });
  if (!r._initialized) {
    const t2 = getDefaultEmulatorHostnameAndPort("firestore");
    t2 && ga(r, ...t2);
  }
  return r;
}
function uh(t2) {
  return t2._firestoreClient || ch(t2), t2._firestoreClient.verifyNotTerminated(), t2._firestoreClient;
}
function ch(t2) {
  var e;
  const n = t2._freezeSettings(), s = function(t3, e2, n2, s2) {
    return new Mt(t3, e2, n2, s2.host, s2.ssl, s2.experimentalForceLongPolling, s2.experimentalAutoDetectLongPolling, s2.useFetchStreams);
  }(t2._databaseId, (null === (e = t2._app) || void 0 === e ? void 0 : e.options.appId) || "", t2._persistenceKey, n);
  t2._firestoreClient = new ka(t2._authCredentials, t2._appCheckCredentials, t2._queue, s);
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ih {
  constructor(t2) {
    this._byteString = t2;
  }
  static fromBase64String(t2) {
    try {
      return new Ih(Qt.fromBase64String(t2));
    } catch (t3) {
      throw new L(B.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + t3);
    }
  }
  static fromUint8Array(t2) {
    return new Ih(Qt.fromUint8Array(t2));
  }
  toBase64() {
    return this._byteString.toBase64();
  }
  toUint8Array() {
    return this._byteString.toUint8Array();
  }
  toString() {
    return "Bytes(base64: " + this.toBase64() + ")";
  }
  isEqual(t2) {
    return this._byteString.isEqual(t2._byteString);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Th {
  constructor(...t2) {
    for (let e = 0; e < t2.length; ++e)
      if (0 === t2[e].length)
        throw new L(B.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
    this._internalPath = new ut(t2);
  }
  isEqual(t2) {
    return this._internalPath.isEqual(t2._internalPath);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Ah {
  constructor(t2) {
    this._methodName = t2;
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Rh {
  constructor(t2, e) {
    if (!isFinite(t2) || t2 < -90 || t2 > 90)
      throw new L(B.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t2);
    if (!isFinite(e) || e < -180 || e > 180)
      throw new L(B.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
    this._lat = t2, this._long = e;
  }
  get latitude() {
    return this._lat;
  }
  get longitude() {
    return this._long;
  }
  isEqual(t2) {
    return this._lat === t2._lat && this._long === t2._long;
  }
  toJSON() {
    return {
      latitude: this._lat,
      longitude: this._long
    };
  }
  _compareTo(t2) {
    return Z(this._lat, t2._lat) || Z(this._long, t2._long);
  }
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const bh = /^__.*__$/;
class Ph {
  constructor(t2, e, n) {
    this.data = t2, this.fieldMask = e, this.fieldTransforms = n;
  }
  toMutation(t2, e) {
    return null !== this.fieldMask ? new ts(t2, this.data, this.fieldMask, e, this.fieldTransforms) : new Zn(t2, this.data, e, this.fieldTransforms);
  }
}
class vh {
  constructor(t2, e, n) {
    this.data = t2, this.fieldMask = e, this.fieldTransforms = n;
  }
  toMutation(t2, e) {
    return new ts(t2, this.data, this.fieldMask, e, this.fieldTransforms);
  }
}
function Vh(t2) {
  switch (t2) {
    case 0:
    case 2:
    case 1:
      return true;
    case 3:
    case 4:
      return false;
    default:
      throw O();
  }
}
class Sh {
  constructor(t2, e, n, s, i, r) {
    this.settings = t2, this.databaseId = e, this.yt = n, this.ignoreUndefinedProperties = s, void 0 === i && this.na(), this.fieldTransforms = i || [], this.fieldMask = r || [];
  }
  get path() {
    return this.settings.path;
  }
  get sa() {
    return this.settings.sa;
  }
  ia(t2) {
    return new Sh(Object.assign(Object.assign({}, this.settings), t2), this.databaseId, this.yt, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
  }
  ra(t2) {
    var e;
    const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t2), s = this.ia({
      path: n,
      oa: false
    });
    return s.ua(t2), s;
  }
  ca(t2) {
    var e;
    const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t2), s = this.ia({
      path: n,
      oa: false
    });
    return s.na(), s;
  }
  aa(t2) {
    return this.ia({
      path: void 0,
      oa: true
    });
  }
  ha(t2) {
    return Hh(t2, this.settings.methodName, this.settings.la || false, this.path, this.settings.fa);
  }
  contains(t2) {
    return void 0 !== this.fieldMask.find((e) => t2.isPrefixOf(e)) || void 0 !== this.fieldTransforms.find((e) => t2.isPrefixOf(e.field));
  }
  na() {
    if (this.path)
      for (let t2 = 0; t2 < this.path.length; t2++)
        this.ua(this.path.get(t2));
  }
  ua(t2) {
    if (0 === t2.length)
      throw this.ha("Document fields must not be empty");
    if (Vh(this.sa) && bh.test(t2))
      throw this.ha('Document fields cannot begin and end with "__"');
  }
}
class Dh {
  constructor(t2, e, n) {
    this.databaseId = t2, this.ignoreUndefinedProperties = e, this.yt = n || pu(t2);
  }
  da(t2, e, n, s = false) {
    return new Sh({
      sa: t2,
      methodName: e,
      fa: n,
      path: ut.emptyPath(),
      oa: false,
      la: s
    }, this.databaseId, this.yt, this.ignoreUndefinedProperties);
  }
}
function Ch(t2) {
  const e = t2._freezeSettings(), n = pu(t2._databaseId);
  return new Dh(t2._databaseId, !!e.ignoreUndefinedProperties, n);
}
function xh(t2, e, n, s, i, r = {}) {
  const o = t2.da(r.merge || r.mergeFields ? 2 : 0, e, n, i);
  Qh("Data must be an object, but it was:", o, s);
  const u = Kh(s, o);
  let c, a;
  if (r.merge)
    c = new Je(o.fieldMask), a = o.fieldTransforms;
  else if (r.mergeFields) {
    const t3 = [];
    for (const s2 of r.mergeFields) {
      const i2 = jh(e, s2, n);
      if (!o.contains(i2))
        throw new L(B.INVALID_ARGUMENT, `Field '${i2}' is specified in your field mask but missing from your input data.`);
      Jh(t3, i2) || t3.push(i2);
    }
    c = new Je(t3), a = o.fieldTransforms.filter((t4) => c.covers(t4.field));
  } else
    c = null, a = o.fieldTransforms;
  return new Ph(new Ye(u), c, a);
}
class Nh extends Ah {
  _toFieldTransform(t2) {
    if (2 !== t2.sa)
      throw 1 === t2.sa ? t2.ha(`${this._methodName}() can only appear at the top level of your update data`) : t2.ha(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);
    return t2.fieldMask.push(t2.path), null;
  }
  isEqual(t2) {
    return t2 instanceof Nh;
  }
}
function kh(t2, e, n) {
  return new Sh({
    sa: 3,
    fa: e.settings.fa,
    methodName: t2._methodName,
    oa: n
  }, e.databaseId, e.yt, e.ignoreUndefinedProperties);
}
class Mh extends Ah {
  constructor(t2, e) {
    super(t2), this._a = e;
  }
  _toFieldTransform(t2) {
    const e = kh(
      this,
      t2,
      true
    ), n = this._a.map((t3) => Uh(t3, e)), s = new On(n);
    return new Un(t2.path, s);
  }
  isEqual(t2) {
    return this === t2;
  }
}
class Fh extends Ah {
  constructor(t2, e) {
    super(t2), this._a = e;
  }
  _toFieldTransform(t2) {
    const e = kh(
      this,
      t2,
      true
    ), n = this._a.map((t3) => Uh(t3, e)), s = new Fn(n);
    return new Un(t2.path, s);
  }
  isEqual(t2) {
    return this === t2;
  }
}
function Bh(t2, e, n, s) {
  const i = t2.da(1, e, n);
  Qh("Data must be an object, but it was:", i, s);
  const r = [], o = Ye.empty();
  Bt(s, (t3, s2) => {
    const u2 = zh(e, t3, n);
    s2 = getModularInstance(s2);
    const c = i.ca(u2);
    if (s2 instanceof Nh)
      r.push(u2);
    else {
      const t4 = Uh(s2, c);
      null != t4 && (r.push(u2), o.set(u2, t4));
    }
  });
  const u = new Je(r);
  return new vh(o, u, i.fieldTransforms);
}
function Lh(t2, e, n, s, i, r) {
  const o = t2.da(1, e, n), u = [jh(e, s, n)], c = [i];
  if (r.length % 2 != 0)
    throw new L(B.INVALID_ARGUMENT, `Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);
  for (let t3 = 0; t3 < r.length; t3 += 2)
    u.push(jh(e, r[t3])), c.push(r[t3 + 1]);
  const a = [], h = Ye.empty();
  for (let t3 = u.length - 1; t3 >= 0; --t3)
    if (!Jh(a, u[t3])) {
      const e2 = u[t3];
      let n2 = c[t3];
      n2 = getModularInstance(n2);
      const s2 = o.ca(e2);
      if (n2 instanceof Nh)
        a.push(e2);
      else {
        const t4 = Uh(n2, s2);
        null != t4 && (a.push(e2), h.set(e2, t4));
      }
    }
  const l2 = new Je(a);
  return new vh(h, l2, o.fieldTransforms);
}
function Uh(t2, e) {
  if (Gh(
    t2 = getModularInstance(t2)
  ))
    return Qh("Unsupported field value:", e, t2), Kh(t2, e);
  if (t2 instanceof Ah)
    return function(t3, e2) {
      if (!Vh(e2.sa))
        throw e2.ha(`${t3._methodName}() can only be used with update() and set()`);
      if (!e2.path)
        throw e2.ha(`${t3._methodName}() is not currently supported inside arrays`);
      const n = t3._toFieldTransform(e2);
      n && e2.fieldTransforms.push(n);
    }(t2, e), null;
  if (void 0 === t2 && e.ignoreUndefinedProperties)
    return null;
  if (e.path && e.fieldMask.push(e.path), t2 instanceof Array) {
    if (e.settings.oa && 4 !== e.sa)
      throw e.ha("Nested arrays are not supported");
    return function(t3, e2) {
      const n = [];
      let s = 0;
      for (const i of t3) {
        let t4 = Uh(i, e2.aa(s));
        null == t4 && (t4 = {
          nullValue: "NULL_VALUE"
        }), n.push(t4), s++;
      }
      return {
        arrayValue: {
          values: n
        }
      };
    }(t2, e);
  }
  return function(t3, e2) {
    if (null === (t3 = getModularInstance(t3)))
      return {
        nullValue: "NULL_VALUE"
      };
    if ("number" == typeof t3)
      return Sn(e2.yt, t3);
    if ("boolean" == typeof t3)
      return {
        booleanValue: t3
      };
    if ("string" == typeof t3)
      return {
        stringValue: t3
      };
    if (t3 instanceof Date) {
      const n = nt.fromDate(t3);
      return {
        timestampValue: $s(e2.yt, n)
      };
    }
    if (t3 instanceof nt) {
      const n = new nt(t3.seconds, 1e3 * Math.floor(t3.nanoseconds / 1e3));
      return {
        timestampValue: $s(e2.yt, n)
      };
    }
    if (t3 instanceof Rh)
      return {
        geoPointValue: {
          latitude: t3.latitude,
          longitude: t3.longitude
        }
      };
    if (t3 instanceof Ih)
      return {
        bytesValue: Bs(e2.yt, t3._byteString)
      };
    if (t3 instanceof ya) {
      const n = e2.databaseId, s = t3.firestore._databaseId;
      if (!s.isEqual(n))
        throw e2.ha(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`);
      return {
        referenceValue: Us(t3.firestore._databaseId || e2.databaseId, t3._key.path)
      };
    }
    throw e2.ha(`Unsupported field value: ${la(t3)}`);
  }(t2, e);
}
function Kh(t2, e) {
  const n = {};
  return Lt(t2) ? e.path && e.path.length > 0 && e.fieldMask.push(e.path) : Bt(t2, (t3, s) => {
    const i = Uh(s, e.ra(t3));
    null != i && (n[t3] = i);
  }), {
    mapValue: {
      fields: n
    }
  };
}
function Gh(t2) {
  return !("object" != typeof t2 || null === t2 || t2 instanceof Array || t2 instanceof Date || t2 instanceof nt || t2 instanceof Rh || t2 instanceof Ih || t2 instanceof ya || t2 instanceof Ah);
}
function Qh(t2, e, n) {
  if (!Gh(n) || !function(t3) {
    return "object" == typeof t3 && null !== t3 && (Object.getPrototypeOf(t3) === Object.prototype || null === Object.getPrototypeOf(t3));
  }(n)) {
    const s = la(n);
    throw "an object" === s ? e.ha(t2 + " a custom object") : e.ha(t2 + " " + s);
  }
}
function jh(t2, e, n) {
  if ((e = getModularInstance(e)) instanceof Th)
    return e._internalPath;
  if ("string" == typeof e)
    return zh(t2, e);
  throw Hh(
    "Field path arguments must be of type string or ",
    t2,
    false,
    void 0,
    n
  );
}
const Wh = new RegExp("[~\\*/\\[\\]]");
function zh(t2, e, n) {
  if (e.search(Wh) >= 0)
    throw Hh(
      `Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,
      t2,
      false,
      void 0,
      n
    );
  try {
    return new Th(...e.split("."))._internalPath;
  } catch (s) {
    throw Hh(
      `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
      t2,
      false,
      void 0,
      n
    );
  }
}
function Hh(t2, e, n, s, i) {
  const r = s && !s.isEmpty(), o = void 0 !== i;
  let u = `Function ${e}() called with invalid data`;
  n && (u += " (via `toFirestore()`)"), u += ". ";
  let c = "";
  return (r || o) && (c += " (found", r && (c += ` in field ${s}`), o && (c += ` in document ${i}`), c += ")"), new L(B.INVALID_ARGUMENT, u + t2 + c);
}
function Jh(t2, e) {
  return t2.some((t3) => t3.isEqual(e));
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Yh {
  constructor(t2, e, n, s, i) {
    this._firestore = t2, this._userDataWriter = e, this._key = n, this._document = s, this._converter = i;
  }
  get id() {
    return this._key.path.lastSegment();
  }
  get ref() {
    return new ya(this._firestore, this._converter, this._key);
  }
  exists() {
    return null !== this._document;
  }
  data() {
    if (this._document) {
      if (this._converter) {
        const t2 = new Xh(
          this._firestore,
          this._userDataWriter,
          this._key,
          this._document,
          null
        );
        return this._converter.fromFirestore(t2);
      }
      return this._userDataWriter.convertValue(this._document.data.value);
    }
  }
  get(t2) {
    if (this._document) {
      const e = this._document.data.field(Zh("DocumentSnapshot.get", t2));
      if (null !== e)
        return this._userDataWriter.convertValue(e);
    }
  }
}
class Xh extends Yh {
  data() {
    return super.data();
  }
}
function Zh(t2, e) {
  return "string" == typeof e ? zh(t2, e) : e instanceof Th ? e._internalPath : e._delegate._internalPath;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function tl(t2) {
  if ("L" === t2.limitType && 0 === t2.explicitOrderBy.length)
    throw new L(B.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
}
class Pl {
  convertValue(t2, e = "none") {
    switch (ee(t2)) {
      case 0:
        return null;
      case 1:
        return t2.booleanValue;
      case 2:
        return zt(t2.integerValue || t2.doubleValue);
      case 3:
        return this.convertTimestamp(t2.timestampValue);
      case 4:
        return this.convertServerTimestamp(t2, e);
      case 5:
        return t2.stringValue;
      case 6:
        return this.convertBytes(Ht(t2.bytesValue));
      case 7:
        return this.convertReference(t2.referenceValue);
      case 8:
        return this.convertGeoPoint(t2.geoPointValue);
      case 9:
        return this.convertArray(t2.arrayValue, e);
      case 10:
        return this.convertObject(t2.mapValue, e);
      default:
        throw O();
    }
  }
  convertObject(t2, e) {
    const n = {};
    return Bt(t2.fields, (t3, s) => {
      n[t3] = this.convertValue(s, e);
    }), n;
  }
  convertGeoPoint(t2) {
    return new Rh(zt(t2.latitude), zt(t2.longitude));
  }
  convertArray(t2, e) {
    return (t2.values || []).map((t3) => this.convertValue(t3, e));
  }
  convertServerTimestamp(t2, e) {
    switch (e) {
      case "previous":
        const n = Yt(t2);
        return null == n ? null : this.convertValue(n, e);
      case "estimate":
        return this.convertTimestamp(Xt(t2));
      default:
        return null;
    }
  }
  convertTimestamp(t2) {
    const e = Wt(t2);
    return new nt(e.seconds, e.nanos);
  }
  convertDocumentKey(t2, e) {
    const n = rt.fromString(t2);
    M(wi(n));
    const s = new Ft(n.get(1), n.get(3)), i = new ct(n.popFirst(5));
    return s.isEqual(e) || x(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`), i;
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function vl(t2, e, n) {
  let s;
  return s = t2 ? n && (n.merge || n.mergeFields) ? t2.toFirestore(e, n) : t2.toFirestore(e) : e, s;
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class Sl {
  constructor(t2, e) {
    this.hasPendingWrites = t2, this.fromCache = e;
  }
  isEqual(t2) {
    return this.hasPendingWrites === t2.hasPendingWrites && this.fromCache === t2.fromCache;
  }
}
class Dl extends Yh {
  constructor(t2, e, n, s, i, r) {
    super(t2, e, n, s, r), this._firestore = t2, this._firestoreImpl = t2, this.metadata = i;
  }
  exists() {
    return super.exists();
  }
  data(t2 = {}) {
    if (this._document) {
      if (this._converter) {
        const e = new Cl(
          this._firestore,
          this._userDataWriter,
          this._key,
          this._document,
          this.metadata,
          null
        );
        return this._converter.fromFirestore(e, t2);
      }
      return this._userDataWriter.convertValue(this._document.data.value, t2.serverTimestamps);
    }
  }
  get(t2, e = {}) {
    if (this._document) {
      const n = this._document.data.field(Zh("DocumentSnapshot.get", t2));
      if (null !== n)
        return this._userDataWriter.convertValue(n, e.serverTimestamps);
    }
  }
}
class Cl extends Dl {
  data(t2 = {}) {
    return super.data(t2);
  }
}
class xl {
  constructor(t2, e, n, s) {
    this._firestore = t2, this._userDataWriter = e, this._snapshot = s, this.metadata = new Sl(s.hasPendingWrites, s.fromCache), this.query = n;
  }
  get docs() {
    const t2 = [];
    return this.forEach((e) => t2.push(e)), t2;
  }
  get size() {
    return this._snapshot.docs.size;
  }
  get empty() {
    return 0 === this.size;
  }
  forEach(t2, e) {
    this._snapshot.docs.forEach((n) => {
      t2.call(e, new Cl(this._firestore, this._userDataWriter, n.key, n, new Sl(this._snapshot.mutatedKeys.has(n.key), this._snapshot.fromCache), this.query.converter));
    });
  }
  docChanges(t2 = {}) {
    const e = !!t2.includeMetadataChanges;
    if (e && this._snapshot.excludesMetadataChanges)
      throw new L(B.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
    return this._cachedChanges && this._cachedChangesIncludeMetadataChanges === e || (this._cachedChanges = function(t3, e2) {
      if (t3._snapshot.oldDocs.isEmpty()) {
        let e3 = 0;
        return t3._snapshot.docChanges.map((n) => {
          const s = new Cl(t3._firestore, t3._userDataWriter, n.doc.key, n.doc, new Sl(t3._snapshot.mutatedKeys.has(n.doc.key), t3._snapshot.fromCache), t3.query.converter);
          return n.doc, {
            type: "added",
            doc: s,
            oldIndex: -1,
            newIndex: e3++
          };
        });
      }
      {
        let n = t3._snapshot.oldDocs;
        return t3._snapshot.docChanges.filter((t4) => e2 || 3 !== t4.type).map((e3) => {
          const s = new Cl(t3._firestore, t3._userDataWriter, e3.doc.key, e3.doc, new Sl(t3._snapshot.mutatedKeys.has(e3.doc.key), t3._snapshot.fromCache), t3.query.converter);
          let i = -1, r = -1;
          return 0 !== e3.type && (i = n.indexOf(e3.doc.key), n = n.delete(e3.doc.key)), 1 !== e3.type && (n = n.add(e3.doc), r = n.indexOf(e3.doc.key)), {
            type: Nl(e3.type),
            doc: s,
            oldIndex: i,
            newIndex: r
          };
        });
      }
    }(this, e), this._cachedChangesIncludeMetadataChanges = e), this._cachedChanges;
  }
}
function Nl(t2) {
  switch (t2) {
    case 0:
      return "added";
    case 2:
    case 3:
      return "modified";
    case 1:
      return "removed";
    default:
      return O();
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function Ol(t2) {
  t2 = fa(t2, ya);
  const e = fa(t2.firestore, ih);
  return za(uh(e), t2._key).then((n) => Hl(e, t2, n));
}
class Ml extends Pl {
  constructor(t2) {
    super(), this.firestore = t2;
  }
  convertBytes(t2) {
    return new Ih(t2);
  }
  convertReference(t2) {
    const e = this.convertDocumentKey(t2, this.firestore._databaseId);
    return new ya(this.firestore, null, e);
  }
}
function Bl(t2) {
  t2 = fa(t2, pa);
  const e = fa(t2.firestore, ih), n = uh(e), s = new Ml(e);
  return tl(t2._query), Ja(n, t2._query).then((n2) => new xl(e, s, t2, n2));
}
function Ul(t2, e, n) {
  t2 = fa(t2, ya);
  const s = fa(t2.firestore, ih), i = vl(t2.converter, e, n);
  return zl(s, [xh(Ch(s), "setDoc", t2._key, i, null !== t2.converter, n).toMutation(t2._key, Qn.none())]);
}
function Kl(t2, e, n, ...s) {
  t2 = fa(t2, ya);
  const i = fa(t2.firestore, ih), r = Ch(i);
  let o;
  o = "string" == typeof (e = getModularInstance(e)) || e instanceof Th ? Lh(r, "updateDoc", t2._key, e, n, s) : Bh(r, "updateDoc", t2._key, e);
  return zl(i, [o.toMutation(t2._key, Qn.exists(true))]);
}
function Gl(t2) {
  return zl(fa(t2.firestore, ih), [new is(t2._key, Qn.none())]);
}
function Ql(t2, e) {
  const n = fa(t2.firestore, ih), s = Aa(t2), i = vl(t2.converter, e);
  return zl(n, [xh(Ch(t2.firestore), "addDoc", s._key, i, null !== t2.converter, {}).toMutation(s._key, Qn.exists(false))]).then(() => s);
}
function zl(t2, e) {
  return function(t3, e2) {
    const n = new q();
    return t3.asyncQueue.enqueueAndForget(async () => Vc(await Ua(t3), e2, n)), n.promise;
  }(uh(t2), e);
}
function Hl(t2, e, n) {
  const s = n.docs.get(e._key), i = new Ml(t2);
  return new Dl(t2, i, e._key, s, new Sl(n.hasPendingWrites, n.fromCache), e.converter);
}
function of(...t2) {
  return new Mh("arrayUnion", t2);
}
function uf(...t2) {
  return new Fh("arrayRemove", t2);
}
!function(t2, e = true) {
  !function(t3) {
    v = t3;
  }(SDK_VERSION), _registerComponent(new Component("firestore", (t3, { instanceIdentifier: n, options: s }) => {
    const i = t3.getProvider("app").getImmediate(), r = new ih(new Q(t3.getProvider("auth-internal")), new H(t3.getProvider("app-check-internal")), function(t4, e2) {
      if (!Object.prototype.hasOwnProperty.apply(t4.options, ["projectId"]))
        throw new L(B.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
      return new Ft(t4.options.projectId, e2);
    }(i, n), i);
    return s = Object.assign({
      useFetchStreams: e
    }, s), r._setSettings(s), r;
  }, "PUBLIC").setMultipleInstances(true)), registerVersion(b, "3.8.3", t2), registerVersion(b, "3.8.3", "esm2017");
}();
const firebaseConfig = {
  apiKey: "AIzaSyDojXQHUtfaDPj9_wH9bFFZE1Z8Mip71Ik",
  authDomain: "dog-tips-2023.firebaseapp.com",
  projectId: "dog-tips-2023",
  storageBucket: "dog-tips-2023.appspot.com",
  messagingSenderId: "439680268677",
  appId: "1:439680268677:web:36e313106b288c22d5ecec",
  measurementId: "G-6XKRKS7PRF"
};
const redirecionarPagina = (hash) => {
  window.location.hash = hash;
  window.dispatchEvent(new HashChangeEvent("hashchange"));
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider(app);
const db = oh(app);
function autenticarUsuario(email, senha) {
  return signInWithEmailAndPassword(auth, email, senha);
}
async function criarUsuario(email, senha, nomeTutor, nomeCao) {
  await createUserWithEmailAndPassword(auth, email, senha);
  await updateProfile(auth.currentUser, {
    displayName: nomeTutor
  });
  const usuario = {
    email,
    nomeTutor,
    nomeCao
  };
  await Ul(Aa(db, "usuarios", auth.currentUser.uid), usuario);
}
async function logarGoogle() {
  await signInWithPopup(auth, provider);
  const usuarioGoogle = {
    email: auth.currentUser.email,
    nomeTutor: auth.currentUser.displayName,
    nomeCao: ""
  };
  await Ul(Aa(db, "usuarios", auth.currentUser.uid), usuarioGoogle);
}
const editarNomeCao = async (novoNomeCao) => {
  await Kl(Aa(db, "usuarios", auth.currentUser.uid), {
    nomeCao: novoNomeCao
  });
};
const redefinirSenha$1 = (email) => sendPasswordResetEmail(auth, email);
const criarPost = async (textPost) => {
  const dataCriacao = Date.now();
  const dataAtual = new Date(dataCriacao);
  const dataPostagem = dataAtual.toLocaleDateString();
  const post = {
    author: auth.currentUser.uid,
    nomeTutor: auth.currentUser.displayName,
    texto: textPost,
    likes: [],
    data: dataPostagem
  };
  const docRef = await Ql(Ta(db, "posts"), post);
  post.id = docRef.id;
  return post;
};
const obterPosts = async () => {
  const colecaoPosts = await Bl(Ta(db, "posts"));
  const textos = [];
  colecaoPosts.forEach((post) => {
    const data = post.data();
    data.id = post.id;
    textos.push(data);
  });
  return textos;
};
const obterNomeUsuario = async () => {
  const usuarioRef = await Ol(Aa(db, "usuarios", auth.currentUser.uid));
  const usuario = {
    uid: auth.currentUser.uid,
    displayName: auth.currentUser.displayName,
    email: usuarioRef.data().email,
    nomeTutor: usuarioRef.data().nomeTutor,
    nomeCao: usuarioRef.data().nomeCao
  };
  return usuario;
};
const verificaUsuarioLogado = () => {
  onAuthStateChanged(auth, (users) => {
    if (users) {
      redirecionarPagina("#feed");
    } else {
      redirecionarPagina("");
    }
  });
};
const deletarPost = (postId) => {
  const postRef = Aa(db, "posts", postId);
  Gl(postRef);
};
const editarPost = (postId, textPost) => {
  const dataCriacao = Date.now();
  const dataAtual = new Date(dataCriacao);
  const dataPostagem = dataAtual.toLocaleDateString();
  Kl(Aa(db, "posts", postId), {
    texto: textPost,
    data: dataPostagem
  });
};
function curtir(postId, uid) {
  Kl(Aa(db, "posts", postId), {
    likes: of(uid)
  });
}
function descurtir(postId, uid) {
  Kl(Aa(db, "posts", postId), {
    likes: uf(uid)
  });
}
const sair = () => signOut(auth);
const registro = () => {
  const container = document.createElement("div");
  const template = `
        <div class="main">
            <div class="txt-entrar"> 
                <h3>J\xE1 possui cadastro?</h3>
                <p class="txt-entrar">Clique no bot\xE3o abaixo e veja as \xFAltimas atualiza\xE7\xF5es dos seus amigos.</p>
                <button class="btn-entrar"><a href="#login">Entrar</a></button>
                <img src="./img/illustrations/good_dogg.png" class="ilustracao-cadastro" alt="ilustra\xE7\xE3o-cadastro">
            </div>
            <div class="tela-principal">
                <div class="logo-tela">
                    <img src="./img/logo/logo.png" id="logo" alt="logo-dogTips">
                </div>
                <div class="estilo-card">
                    <form>
                        <div class="input-card">
                            <i class="fas fa-user"></i>
                            <label for="nometutor">
                                <input type="text" id="nometutor" placeholder="Seu nome" minlength="3" required/>
                            </label>
                        </div>
                        <div class="input-card">
                            <i class="fas fa-paw"></i>
                            <label for="nomecao">
                                <input type="text" id="nomecao" placeholder="Nome do c\xE3ozinho" minlength="3" required/> 
                            </label>
                        </div>
                        <div class="input-card">
                            <i class="fas fa-envelope"></i>
                            <label for="email">
                                <input type="email" id="email" placeholder="nome@dominio.com" minlength="4" required/>
                            </label>
                        </div>
                        <div class="input-card">
                            <i class="fas fa-lock"></i>
                            <label for="senha">
                                <input type="password" id="senha" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022" minlength="6" required/>
                            </label>
                        </div>
                        <div class="espa\xE7o-entrar">
                            <button type="submit" value="cadastrar" id="cadastrar" class="btn-cadastrar">CADASTRAR</button>
                        </div>
                        <p id="txtAlert" class="mensagem-vazia"><p>
                        <p class="text-cadastro-google">Ou cadastre-se com o Google</p>
                        <div class="cadastro-google"> 
                            <a href="#registro" id="registro-google" class="icon-google">
                                <i class="fa-brands fa-google"></i>
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `;
  container.innerHTML = template;
  const btnCadastrar = container.querySelector("#cadastrar");
  btnCadastrar.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;
    const nomeCao = document.querySelector("#nomecao").value;
    const nomeTutor = document.querySelector("#nometutor").value;
    if (!email || !senha || !nomeCao || !nomeTutor) {
      const msgCampoVazio = container.querySelector("#txtAlert");
      msgCampoVazio.innerHTML = "Preencha todos os campos!";
    }
    criarUsuario(email, senha, nomeTutor, nomeCao).then(() => {
      redirecionarPagina("#feed");
    }).catch((error) => {
      console.log(error);
      const emailCadastrado = container.querySelector("#txtAlert");
      if (error.code === "auth/email-already-in-use") {
        emailCadastrado.innerHTML = "Esse e-mail j\xE1 est\xE1 registrado!";
      }
    });
  });
  const selecionarGoogle = container.querySelector("#registro-google");
  selecionarGoogle.addEventListener("click", async () => {
    await logarGoogle();
  });
  return container;
};
const login = () => {
  const container = document.createElement("div");
  const template = `
        <div class="main">
            <div class="txt-novo-usuario"> 
                <h3>Primeira vez aqui?</h3>
                <p class="txt-novo-usuario">Participe da nossa comunidade, cadastre seu c\xE3o e compartilhe 
                experi\xEAncias! Voc\xEA poder\xE1 seguir todos seus amigos e fazer novos. 
                Al\xE9m de registrar a vida do seu c\xE3o, voc\xEA poder\xE1 acompanhar 
                a vida de outros c\xE3ezinhos e interagir nas publica\xE7\xF5es. </p>
                <a href="#registro">
                    <button class="btn-registrar">registre-se</button>
                </a>
                <img src="./img/illustrations/social_update.png" class="ilustracao-login" alt="ilustra\xE7\xE3o-login">
            </div>
            <div class="tela-principal">
                <div class="logo-tela">
                    <img src="./img/logo/logo.png" class="img-logo" alt="logo-dogTips">
                </div>
                <div class="estilo-card">
                    <form id="formulario-login">
                        <div class="input-card">
                            <i class="fas fa-envelope"></i>
                            <label for="email">
                                <input type="email" id="email" placeholder="nome@dominio.com" minlength="4" required/>
                            </label>
                        </div>
                        <div class="input-card">
                            <i class="fas fa-lock"></i>
                            <label for="password">
                                <input type="password" id="senha" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022" minlength="6" required/>
                            </label>
                        </div>
                        <p class="texto-centralizado">Esqueceu sua senha?</p> 
                        <p class="texto-centralizado"><a href="#redefinirSenha" id="clique-esqueceu">Clique aqui!</a></p>
                        <div class="espa\xE7o-acessar">
                            <button class="btn-acessar">ACESSAR</button>
                        </div>
                        <div class="mensagem-erro" id="mensagem-erro"></div>
                        <p class="texto-centralizado">Ou fa\xE7a login com o Google</p>
                        <div class="cadastro-google"> 
                            <a href="#login" id="registro-google" class="icon-google">
                            <i class="fa-brands fa-google"></i>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `;
  container.innerHTML = template;
  const botaoLogin = container.querySelector(".btn-acessar");
  const formulario = container.querySelector("#formulario-login");
  const mensagemErro = container.querySelector("#mensagem-erro");
  botaoLogin.addEventListener("click", async (e) => {
    mensagemErro.innerHTML = "";
    if (formulario.checkValidity()) {
      e.preventDefault();
      const email = container.querySelector("#email").value;
      const senha = container.querySelector("#senha").value;
      try {
        await autenticarUsuario(email, senha);
        redirecionarPagina("#feed");
      } catch (error) {
        mensagemErro.innerHTML = "<p>Usu\xE1rio ou senha inv\xE1lidos</p>";
      }
    }
  });
  const selecionarGoogle = container.querySelector("#registro-google");
  selecionarGoogle.addEventListener("click", async () => {
    await logarGoogle();
    redirecionarPagina("#feed");
  });
  return container;
};
const redefinirSenha = () => {
  const container = document.createElement("div");
  const template = `
    <div class="main">
      <div class="txt-voltar">
        <button class="btn-voltar"><a href="#login">Voltar</a></button>
        <img src="./img/illustrations/dog_pop.png" class="ilustracao-redefinir-senha" alt="ilustra\xE7\xE3o-redefinir-senha">
      </div>
      <div class="tela-principal">
        <div class="logo-tela-redefinir">
          <img src="./img/logo/logo.png" class="img-logo" alt="logo-dogTips">
        </div>
        <div class="estilo-card-redefir-senha">
          <form>
            <p class="msg-email-redefinir-senha">Para redefinir sua senha, informe o endere\xE7o de e-mail cadastrado</p>
            <div class="input-card">
              <i class="fas fa-envelope"></i>
              <label class="label-esqueceu-senha">
                <input type="email" id="email" placeholder="E-mail" minlength="4" required/>
              </label>
            </div>
            <div class="espa\xE7o-redefinir">
              <button type="submit" class="btn-redefinir-senha" id="btn-redefinir-senha">REDEFINIR SENHA</button>
            </div>
          </form>
          <p id="msg-redefine-senha" class="msg-redefine-senha"></p>
        </div>
      </div>
    </div>
    `;
  container.innerHTML = template;
  const botaoRedefinir = container.querySelector("#btn-redefinir-senha");
  botaoRedefinir.addEventListener("click", (e) => {
    e.preventDefault();
    const email = container.querySelector("#email").value;
    redefinirSenha$1(email).then(() => {
      const msgConfirmaRedefinicao = container.querySelector("#msg-redefine-senha");
      msgConfirmaRedefinicao.innerHTML = "Em breve, voc\xEA receber\xE1 um e-mail com todas as instru\xE7\xF5es para redefinir sua senha.";
    }).catch((error) => {
      const msgErroRedefinicao = container.querySelector("#msg-redefine-senha");
      if (error.code === "auth/user-not-found") {
        msgErroRedefinicao.innerHTML = "O e-mail informado n\xE3o est\xE1 cadastrado em nosso sistema.";
      }
    });
  });
  return container;
};
const feed = async () => {
  const usuarioLogado = await obterNomeUsuario();
  const container = document.createElement("div");
  const template = `
    <div class="feed-desktop>"
        <div class="main">
            <div class="barra-feed">
                <i class="fa-solid fa-bars fa-2x icon-menu" id="burguer"></i>
                <menu id="itens">
                    <ul>
                        <li class="barra-itens"><a href="#">feed</a></li>
                        <li class="barra-itens"><a href="#sobre">sobre</a></li>
                        <li class="barra-itens"><a id="btnSair" class="btn-sair"type="button">sair</a></li>
                    </ul>
                </menu>
                <div class="info-usuario">
                <h2>Seja bem-vindo(a)!</h2>
                <div class="perfil">
                    <div class="tutor">
                        <i class="fa-solid fa-circle-user fa-3x icon-usu\xE1rio"></i>
                        <p class="texto-feed">@${usuarioLogado.displayName}</p>
                    </div>
                    <div class="cao">
                        <i class="fa-solid fa-paw fa-3x icon-c\xE3o"></i>
                        <p class="texto-feed" id="cadastro-cao">@${usuarioLogado.nomeCao}</p>
                        <div class="input-nome-cao"></div>
                    </div>
                </div>    
                </div>
            </div>
                <div class="tela-principal">
                    <div class="logo-tela-feed">
                        <img src="./img/logo/logo.png" class="img-logo-feed" alt="logo-dogTips">
                    </div>
                    <div class="div-postagem-tutor">
                        <textarea class="texto-tutor" id="texto-tutor"name="texto-tutor" cols="50" rows="4" placeholder="O que gostaria de compartilhar?"></textarea>
                        <button class="btn-publicar" id="btn-publicar">publicar</button>
                    </div>
                        <span id="alerta-publicacao" class="alerta-publicacao"></span>
                        </div>
                        <div id="postagens" class="postagens"></div>
                </div>
        </div>
    </div>
        `;
  container.innerHTML = template;
  const iconeMenu = container.querySelector("#burguer");
  iconeMenu.addEventListener("click", () => {
    const itens = container.querySelector("#itens");
    if (itens.style.display === "block") {
      itens.style.display = "none";
    } else {
      itens.style.display = "block";
    }
  });
  if (usuarioLogado.nomeCao === "") {
    const divInptNomeCao = container.querySelector(".input-nome-cao");
    divInptNomeCao.innerHTML = ` <input type="text" class="nome-cao" id="nome-cao" placeholder=" insira o nome do c\xE3o">
    <button class="btn-salvar-nome-cao" id="btn-salvar-nome-cao">salvar</button>`;
    const salvarBtn = divInptNomeCao.querySelector(".btn-salvar-nome-cao");
    salvarBtn.addEventListener("click", async () => {
      const novoNomeCao = divInptNomeCao.querySelector("#nome-cao").value;
      await editarNomeCao(novoNomeCao);
      container.querySelector("#cadastro-cao").textContent = `@${novoNomeCao}`;
      divInptNomeCao.setAttribute("style", "display: none");
    });
  }
  const exibirPost = (post) => {
    const posts = document.querySelector("#postagens");
    const containerPost = document.createElement("div");
    const templatePost = `
          <div class="div-postagem-anteriores-tutor">
            <div id="icone-superiores">
              <i class="fa-solid fa-circle-user fa-2x icon-usuario-txt"></i>
              <p class="tutor-txt-area">${post.nomeTutor}</p>
              <p class="data-postagem">${post.data}</p>
            </div>
            <textarea class="texto-tutor-postado" id="texto-tutor-postado" style='resize:none' disabled>${post.texto}</textarea>
            <div id="icones-inferiores">
              <button class="btn-curtir" id="btn-curtir" >
              <img ${post.likes.includes(usuarioLogado.uid) ? 'src="img/icones-feed/like-pata-2.png"' : 'src="img/icones-feed/like-pata-3.png"'}>  ${post.likes.length}
              </button>
              <p class="numero-curtidas"></p>
              ${post.author === usuarioLogado.uid ? `
              <button class="btn-editar">
              <i class="fa-sharp fa-solid fa-pencil" id="btn-editar" type="button"></i>
              </button>
              ` : ""}
              ${post.author === usuarioLogado.uid ? `
                <button class="btn-deletar">
                  <i class="fa-solid fa-trash-can" id="btn-deletar" type="button"></i>
                </button>
              ` : ""}
            <div class="caixa-deletar" id="caixa-deletar-${post.id}">
                <div class="modal">
                    <p class="txt-excluir">Tem certeza que deseja excluir?</p>
                    <div class="btn-caixa">
                        <button class="btn-excluir" id='btn-excluir'>Excluir</button>
                        <button class="btn-cancelar" id="btn-cancelar">Cancelar</button>
                    </div>
                </div>
            </div>
          </div>
        `;
    containerPost.innerHTML = templatePost;
    posts.appendChild(containerPost);
    if (post.author === usuarioLogado.uid) {
      const btnDeletar = containerPost.querySelector("#btn-deletar");
      btnDeletar.addEventListener("click", () => {
        const modal = document.getElementById(`caixa-deletar-${post.id}`);
        modal.style.display = "block";
        const btnCancelar = modal.querySelector("#btn-cancelar");
        btnCancelar.addEventListener("click", () => {
          modal.style.display = "none";
        });
        const btnExcluir = modal.querySelector("#btn-excluir");
        btnExcluir.addEventListener("click", () => {
          deletarPost(post.id);
          containerPost.remove();
          modal.style.display = "none";
        });
      });
    }
    if (post.author === usuarioLogado.uid) {
      const btnEditar = containerPost.querySelector("#btn-editar");
      btnEditar.addEventListener("click", (e) => {
        const textArea = containerPost.querySelector("#texto-tutor-postado");
        textArea.removeAttribute("disabled");
        btnEditar.removeEventListener("click", e);
        btnEditar.addEventListener("click", () => {
          textArea.setAttribute("disabled", "true");
          editarPost(post.id, textArea.value);
        });
      });
    }
    const btnCurtir = containerPost.querySelector("#btn-curtir");
    btnCurtir.addEventListener("click", () => {
      if (post.likes.includes(usuarioLogado.uid)) {
        descurtir(post.id, usuarioLogado.uid);
        post.likes.splice(post.likes.indexOf(usuarioLogado.uid));
        btnCurtir.innerHTML = `<img class='btn-curtir' src='img/icones-feed/like-pata-3.png' alt='descurtir'><p class='numero-curtidas'>${post.likes.length}</p>`;
      } else {
        curtir(post.id, usuarioLogado.uid);
        post.likes.push(usuarioLogado.uid);
        btnCurtir.innerHTML = `<img class='btn-curtir' src='img/icones-feed/like-pata-2.png' alt='curtido'><p class='numero-curtidas'>${post.likes.length}</p>`;
      }
      btnCurtir.querySelector("p").innerText = post.likes.length;
    });
  };
  obterPosts().then((posts) => {
    posts.innerHTML = "";
    posts.forEach((post) => exibirPost(post));
  });
  const btnPublicar = container.querySelector("#btn-publicar");
  const alertaPublicacao = container.querySelector("#alerta-publicacao");
  btnPublicar.addEventListener("click", async () => {
    const textoTutor = container.querySelector("#texto-tutor");
    const textPost = textoTutor.value;
    if (textPost !== "") {
      try {
        const novoPost = await criarPost(textPost);
        exibirPost(novoPost);
        textoTutor.value = "";
      } catch (error) {
        alertaPublicacao.setAttribute("style", "display: block");
        alertaPublicacao.innerHTML = "Ocorreu um erro, tente novamente.";
      }
    } else {
      alertaPublicacao.setAttribute("style", "display: block");
      alertaPublicacao.innerHTML = "Por favor, escreva algo antes de publicar!";
    }
  });
  const btnSair = container.querySelector("#btnSair");
  btnSair.addEventListener("click", () => {
    sair().then(() => {
      window.location.hash = "#login";
    }).catch(() => {
      alert("Ocorreu um erro, tente novamente.");
    });
  });
  return container;
};
const sobre = () => {
  const container = document.createElement("div");
  const template = `
        <div class="main">
            <div class="barra-feed">
                <i class="fa-solid fa-bars fa-2x icon-menu" id="burguer"></i>
                <menu id="itens">
                    <ul>
                        <li class="barra-itens"><a href="#feed">feed</a></li>
                        <li class="barra-itens"><a href="#">sobre</a></li>
                        <li class="barra-itens"><a id="btnSair" class="btn-sair"type="button">sair</a></li>
                    </ul>
                </menu>
                <div class="info-rede-social" id="info-rede-social">
                    <p>A Dog Tips \xE9 uma rede social para tutores de c\xE3es, criada para ajud\xE1-los a compartilhar informa\xE7\xF5es 
                    e dicas sobre cuidados com seus animais de estima\xE7\xE3o.</p>
                </div>
                <p class="txt-devs-desktop"id="txt-devs-desktop">As Desenvoldedoras e seus pets</p>
            </div>
            <div class="tela-principal-sobre">
                <div class="logo-tela-sobre">
                    <img src="./img/logo/logo.png" class="img-logo-sobre" id="img-logo-sobre" alt="logo-dogTips">
                </div>
                <p class="txt-devs">As Desenvoldedoras e seus pets</p>
            </div>
        </div>
        <div class="cards-devs" id="cards-devs">
            <div class="card-ana" id="card-ana">
                <div class="img-ana-tieta">
                    <img src="./img/devs/ana.png" class="img-ana" alt="Foto da desenvolvedora Ana">
                    <img src="./img/devs/tieta.png" class="img-tieta" alt="Foto da cadela Tieta">
                </div>
                <p class="tutora-ana">@Ana Paula Janu\xE1rio</p>
                <p class="cadela-tieta">@Tieta</p>
                <div class="img-sociais">
                    <a href="https://www.linkedin.com/in/ana-paula-413517259/" target="_blank"><img src="./img/icones-feed/linkedin.png" class="img-linkedin" alt="Logo do linkedin"></a>
                    <a href="https://github.com/paulajanu" target="_blank"><img src="./img/icones-feed/github.png" class="img-github" alt="Logo do github"></a>.
                </div>
            </div>
            <div class="card-paola" id="card-paola">
                <div class="img-paola-juca">
                    <img src="./img/devs/paola.png" class="img-paola" alt="Foto da desenvolvedora Paola">
                    <img src="./img/devs/juca.png" class="img-juca" alt="Foto do cachorro Juca">
                </div>
                <p class="tutora-paola">@Paola Oliveira</p>
                <p class="cachorro-juca">@Juca</p>
                <div class="img-sociais">
                    <a href="https://www.linkedin.com/in/paola-natalia-oliveira-440969150/" target="_blank"><img src="./img/icones-feed/linkedin.png" class="img-linkedin" alt="Logo do linkedin"></a>
                    <a href="https://github.com/paola-oliveira" target="_blank"><img src="./img/icones-feed/github.png" class="img-github" alt="Logo do github"></a>
                </div>
            </div>
            <div class="card-thai">
                <div class="img-thai-luigi">
                    <img src="./img/devs/thai.png" class="img-thai" alt="Foto da desenvolvedora Thai">
                    <img src="./img/devs/luigi.png" class="img-luigi" alt="Foto do cachorro Luigi">
                </div>
                <p class="tutora-thai">@Thainara Tabile</p>
                <p class="cachorro-luigi">@Luigi</p>
                <div class="img-sociais">
                    <a href="https://www.linkedin.com/in/thainaratabile/" target="_blank"><img src="./img/icones-feed/linkedin.png" class="img-linkedin" alt="Logo do linkedin"></a>
                    <a href="https://github.com/ThainaraTabile" target="_blank"><img src="./img/icones-feed/github.png" class="img-github" alt="Logo do github"></a>
                </div>
            </div>
        </div>
      `;
  container.innerHTML = template;
  const iconeMenu = container.querySelector("#burguer");
  iconeMenu.addEventListener("click", () => {
    const itens = container.querySelector("#itens");
    if (itens.style.display === "block") {
      itens.style.display = "none";
    } else {
      itens.style.display = "block";
    }
  });
  const btnSair = container.querySelector("#btnSair");
  btnSair.addEventListener("click", () => {
    sair().then(() => {
      window.location.hash = "#login";
    }).catch(() => {
      alert("Ocorreu um erro, tente novamente.");
    });
  });
  return container;
};
const main = document.querySelector("#root");
const init = async () => {
  switch (window.location.hash) {
    case " ":
      main.appendChild(login());
      break;
    case "#login":
      main.appendChild(login());
      break;
    case "#redefinirSenha":
      main.appendChild(redefinirSenha());
      break;
    case "#registro":
      main.appendChild(registro());
      break;
    case "#sobre":
      main.appendChild(sobre());
      break;
    case "#feed":
      main.appendChild(await feed());
      break;
    default:
      main.appendChild(login());
  }
};
window.addEventListener("hashchange", () => {
  main.innerHTML = "";
  init();
});
window.addEventListener("load", () => {
  verificaUsuarioLogado();
});
