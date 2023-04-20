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
const index = "";
const login$1 = "";
const cadastro$1 = "";
const postagem$1 = "";
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
        throw new DecodeBase64StringError();
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
class DecodeBase64StringError extends Error {
  constructor() {
    super(...arguments);
    this.name = "DecodeBase64StringError";
  }
}
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
    const provider = this.getProvider(component.name);
    if (provider.isComponentSet()) {
      throw new Error(`Component ${component.name} has already been registered with ${this.name}`);
    }
    provider.setComponent(component);
  }
  addOrOverwriteComponent(component) {
    const provider = this.getProvider(component.name);
    if (provider.isComponentSet()) {
      this.providers.delete(component.name);
    }
    this.addComponent(component);
  }
  getProvider(name2) {
    if (this.providers.has(name2)) {
      return this.providers.get(name2);
    }
    const provider = new Provider(name2, this);
    this.providers.set(name2, provider);
    return provider;
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
    return providers.map((provider) => {
      if (isVersionServiceProvider(provider)) {
        const service = provider.getImmediate();
        return `${service.library}/${service.version}`;
      } else {
        return null;
      }
    }).filter((logString) => logString).join(" ");
  }
}
function isVersionServiceProvider(provider) {
  const component = provider.getComponent();
  return (component === null || component === void 0 ? void 0 : component.type) === "VERSION";
}
const name$o = "@firebase/app";
const version$1$1 = "0.9.7";
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
const version$2 = "9.19.1";
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
  const provider = _getProvider(app2, "auth");
  if (provider.isInitialized()) {
    const auth3 = provider.getImmediate();
    const initialOptions = provider.getOptions();
    if (deepEqual(initialOptions, deps !== null && deps !== void 0 ? deps : {})) {
      return auth3;
    } else {
      _fail(auth3, "already-initialized");
    }
  }
  const auth2 = provider.initialize({ options: deps });
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
  ["MISSING_PASSWORD"]: "missing-password",
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
    _fail(auth2, "network-request-failed", { "message": String(e) });
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
    var { providerId } = _a2, provider = __rest(_a2, ["providerId"]);
    return {
      providerId,
      uid: provider.rawId || "",
      displayName: provider.displayName || null,
      email: provider.email || null,
      phoneNumber: provider.phoneNumber || null,
      photoURL: provider.photoUrl || null
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
    const newUser = new UserImpl(Object.assign(Object.assign({}, this), { auth: auth2, stsTokenManager: this.stsTokenManager._clone() }));
    newUser.metadata._copy(this.metadata);
    return newUser;
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
    var _a2, _b, _c2, _d, _e2, _f, _g, _h2;
    const displayName = (_a2 = object.displayName) !== null && _a2 !== void 0 ? _a2 : void 0;
    const email = (_b = object.email) !== null && _b !== void 0 ? _b : void 0;
    const phoneNumber = (_c2 = object.phoneNumber) !== null && _c2 !== void 0 ? _c2 : void 0;
    const photoURL = (_d = object.photoURL) !== null && _d !== void 0 ? _d : void 0;
    const tenantId = (_e2 = object.tenantId) !== null && _e2 !== void 0 ? _e2 : void 0;
    const _redirectEventId = (_f = object._redirectEventId) !== null && _f !== void 0 ? _f : void 0;
    const createdAt = (_g = object.createdAt) !== null && _g !== void 0 ? _g : void 0;
    const lastLoginAt = (_h2 = object.lastLoginAt) !== null && _h2 !== void 0 ? _h2 : void 0;
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
    const re = /([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/;
    const matches = userAgent.match(re);
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
    const index2 = this.queue.length - 1;
    return () => {
      this.queue[index2] = () => Promise.resolve();
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
    const el2 = document.createElement("p");
    const sty = el2.style;
    el2.innerText = "Running in emulator mode. Do not use with production credentials.";
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
    el2.classList.add("firebase-emulator-warning");
    document.body.appendChild(el2);
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
    const el2 = document.createElement("script");
    el2.setAttribute("src", url);
    el2.onload = resolve;
    el2.onerror = (e) => {
      const error = _createError("internal-error");
      error.customData = e;
      reject(error);
    };
    el2.type = "text/javascript";
    el2.charset = "UTF-8";
    getScriptParentElement().appendChild(el2);
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
async function signInWithPopup(auth2, provider, resolver) {
  const authInternal = _castAuth(auth2);
  _assertInstanceOf(auth2, provider, FederatedAuthProvider);
  const resolverInternal = _withDefaultResolver(authInternal, resolver);
  const action = new PopupOperation(authInternal, "signInViaPopup", provider, resolverInternal);
  return action.executeNotNull();
}
class PopupOperation extends AbstractPopupRedirectOperation {
  constructor(auth2, filter, provider, resolver, user) {
    super(auth2, filter, resolver, user);
    this.provider = provider;
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
  const re = new RegExp("^(.+\\." + escapedDomainPattern + "|" + escapedDomainPattern + ")$", "i");
  return re.test(hostname);
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
  const el2 = document.createElement("a");
  el2.href = url;
  el2.target = target;
  const click = document.createEvent("MouseEvent");
  click.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 1, null);
  el2.dispatchEvent(click);
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
function _getRedirectUrl(auth2, provider, authType, redirectUrl, eventId, additionalParams) {
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
  if (provider instanceof FederatedAuthProvider) {
    provider.setDefaultLanguage(auth2.languageCode);
    params.providerId = provider.providerId || "";
    if (!isEmpty(provider.getCustomParameters())) {
      params.customParameters = JSON.stringify(provider.getCustomParameters());
    }
    for (const [key, value] of Object.entries(additionalParams || {})) {
      params[key] = value;
    }
  }
  if (provider instanceof BaseOAuthProvider) {
    const scopes = provider.getScopes().filter((scope) => scope !== "");
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
  async _openPopup(auth2, provider, authType, eventId) {
    var _a2;
    debugAssert((_a2 = this.eventManagers[auth2._key()]) === null || _a2 === void 0 ? void 0 : _a2.manager, "_initialize() not called before _openPopup()");
    const url = _getRedirectUrl(auth2, provider, authType, _getCurrentUrl(), eventId);
    return _open(auth2, url, _generateEventId());
  }
  async _openRedirect(auth2, provider, authType, eventId) {
    await this._originValidation(auth2);
    _setWindowLocation(_getRedirectUrl(auth2, provider, authType, _getCurrentUrl(), eventId));
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
var name$1 = "@firebase/auth";
var version$1 = "0.22.0";
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
  registerVersion(name$1, version$1, getVersionForPlatform(clientPlatform));
  registerVersion(name$1, version$1, "esm2017");
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
  const provider = _getProvider(app2, "auth");
  if (provider.isInitialized()) {
    return provider.getImmediate();
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
function ba$1(a) {
  var b2 = typeof a;
  b2 = "object" != b2 ? b2 : a ? Array.isArray(a) ? "array" : b2 : "null";
  return "array" == b2 || "object" == b2 && "number" == typeof a.length;
}
function p(a) {
  var b2 = typeof a;
  return "object" == b2 && null != a || "function" == b2;
}
function ca(a) {
  return Object.prototype.hasOwnProperty.call(a, da) && a[da] || (a[da] = ++ea);
}
var da = "closure_uid_" + (1e9 * Math.random() >>> 0), ea = 0;
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
var ja$1 = 0;
v$1.prototype.s = false;
v$1.prototype.na = function() {
  if (!this.s && (this.s = true, this.M(), 0 != ja$1)) {
    ca(this);
  }
};
v$1.prototype.M = function() {
  if (this.o)
    for (; this.o.length; )
      this.o.shift()();
};
const la = Array.prototype.indexOf ? function(a, b2) {
  return Array.prototype.indexOf.call(a, b2, void 0);
} : function(a, b2) {
  if ("string" === typeof a)
    return "string" !== typeof b2 || 1 != b2.length ? -1 : a.indexOf(b2, 0);
  for (let c = 0; c < a.length; c++)
    if (c in a && a[c] === b2)
      return c;
  return -1;
};
function ma(a) {
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
    if (ba$1(d)) {
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
var oa = function() {
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
function pa(a) {
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
function sa() {
  var a = l.navigator;
  return a && (a = a.userAgent) ? a : "";
}
function x$1(a) {
  return -1 != sa().indexOf(a);
}
function ta(a) {
  ta[" "](a);
  return a;
}
ta[" "] = aa$1;
function ua(a) {
  var b2 = va$1;
  return Object.prototype.hasOwnProperty.call(b2, 9) ? b2[9] : b2[9] = a(9);
}
var wa = x$1("Opera"), y = x$1("Trident") || x$1("MSIE"), xa$1 = x$1("Edge"), ya = xa$1 || y, za$1 = x$1("Gecko") && !(-1 != sa().toLowerCase().indexOf("webkit") && !x$1("Edge")) && !(x$1("Trident") || x$1("MSIE")) && !x$1("Edge"), Aa$1 = -1 != sa().toLowerCase().indexOf("webkit") && !x$1("Edge");
function Ba() {
  var a = l.document;
  return a ? a.documentMode : void 0;
}
var Ea$1;
a: {
  var Fa$1 = "", Ga$1 = function() {
    var a = sa();
    if (za$1)
      return /rv:([^\);]+)(\)|;)/.exec(a);
    if (xa$1)
      return /Edge\/([\d\.]+)/.exec(a);
    if (y)
      return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
    if (Aa$1)
      return /WebKit\/(\S+)/.exec(a);
    if (wa)
      return /(?:Version)[ \/]?(\S+)/.exec(a);
  }();
  Ga$1 && (Fa$1 = Ga$1 ? Ga$1[1] : "");
  if (y) {
    var Ha$1 = Ba();
    if (null != Ha$1 && Ha$1 > parseFloat(Fa$1)) {
      Ea$1 = String(Ha$1);
      break a;
    }
  }
  Ea$1 = Fa$1;
}
var va$1 = {};
function Ia() {
  return ua(function() {
    let a = 0;
    const b2 = qa(String(Ea$1)).split("."), c = qa("9").split("."), d = Math.max(b2.length, c.length);
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
var Ja;
if (l.document && y) {
  var Ka$1 = Ba();
  Ja = Ka$1 ? Ka$1 : parseInt(Ea$1, 10) || void 0;
} else
  Ja = void 0;
var La = Ja;
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
            ta(b2.nodeName);
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
    this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Ma[a.pointerType] || "";
    this.state = a.state;
    this.i = a;
    a.defaultPrevented && z$1.X.h.call(this);
  }
}
t(z$1, w);
var Ma = { 2: "touch", 3: "pen", 4: "mouse" };
z$1.prototype.h = function() {
  z$1.X.h.call(this);
  var a = this.i;
  a.preventDefault ? a.preventDefault() : a.returnValue = false;
};
var A = "closure_listenable_" + (1e6 * Math.random() | 0);
var Na = 0;
function Oa(a, b2, c, d, e) {
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
function Qa$1(a, b2, c) {
  for (const d in a)
    b2.call(c, a[d], d, a);
}
function Ra$1(a) {
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
function Ua(a) {
  this.src = a;
  this.g = {};
  this.h = 0;
}
Ua.prototype.add = function(a, b2, c, d, e) {
  var f = a.toString();
  a = this.g[f];
  a || (a = this.g[f] = [], this.h++);
  var h = Va(a, b2, d, e);
  -1 < h ? (b2 = a[h], c || (b2.ea = false)) : (b2 = new Oa(b2, this.src, f, !!d, e), b2.ea = c, a.push(b2));
  return b2;
};
function Wa$1(a, b2) {
  var c = b2.type;
  if (c in a.g) {
    var d = a.g[c], e = la(d, b2), f;
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
var Xa$1 = "closure_lm_" + (1e6 * Math.random() | 0), Ya$1 = {};
function $a(a, b2, c, d, e) {
  if (d && d.once)
    return ab(a, b2, c, d, e);
  if (Array.isArray(b2)) {
    for (var f = 0; f < b2.length; f++)
      $a(a, b2[f], c, d, e);
    return null;
  }
  c = bb(c);
  return a && a[A] ? a.N(b2, c, p(d) ? !!d.capture : !!d, e) : cb(a, b2, c, false, d, e);
}
function cb(a, b2, c, d, e, f) {
  if (!b2)
    throw Error("Invalid event type");
  var h = p(e) ? !!e.capture : !!e, n = db$1(a);
  n || (a[Xa$1] = n = new Ua(a));
  c = n.add(b2, c, d, h, f);
  if (c.proxy)
    return c;
  d = eb();
  c.proxy = d;
  d.src = a;
  d.listener = c;
  if (a.addEventListener)
    oa || (e = h), void 0 === e && (e = false), a.addEventListener(b2.toString(), d, e);
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
      Wa$1(b2.i, a);
    else {
      var c = a.type, d = a.proxy;
      b2.removeEventListener ? b2.removeEventListener(c, d, a.capture) : b2.detachEvent ? b2.detachEvent(fb(c), d) : b2.addListener && b2.removeListener && b2.removeListener(d);
      (c = db$1(b2)) ? (Wa$1(c, a), 0 == c.h && (c.src = null, b2[Xa$1] = null)) : Pa(a);
    }
  }
}
function fb(a) {
  return a in Ya$1 ? Ya$1[a] : Ya$1[a] = "on" + a;
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
  a = a[Xa$1];
  return a instanceof Ua ? a : null;
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
  this.i = new Ua(this);
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
      h.ea && Wa$1(a.i, h);
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
    var f = $a(b2, c[e], d || a.handleEvent, false, a.h || a);
    if (!f)
      break;
    a.g[f.key] = f;
  }
}
function Fb(a) {
  Qa$1(a.g, function(b2, c) {
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
            var F2 = r.split("_");
            h = 2 <= F2.length && "type" == F2[1] ? h + (r + "=" + m + "&") : h + (r + "=redacted&");
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
  a = ya ? 125 : void 0;
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
var Zb = 45e3, ac$1 = {}, bc = {};
k$1 = L$1.prototype;
k$1.setTimeout = function(a) {
  this.O = a;
};
function cc$1(a, b2, c) {
  a.K = 1;
  a.v = dc$1(M(b2));
  a.s = c;
  a.P = true;
  ec$1(a, null);
}
function ec$1(a, b2) {
  a.F = Date.now();
  N$1(a);
  a.A = M(a.v);
  var c = a.A, d = a.U;
  Array.isArray(d) || (d = [String(d)]);
  fc$1(c.i, "t", d);
  a.C = 0;
  c = a.l.H;
  a.h = new $b();
  a.g = gc$1(a.l, c ? b2 : null, !a.s);
  0 < a.N && (a.L = new Cb(q$1(a.La, a, a.g), a.N));
  Eb(a.S, a.g, "readystatechange", a.ib);
  b2 = a.H ? Ra$1(a.H) : {};
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
        const F2 = this.g.aa();
        if (!(3 > r) && (3 != r || ya || this.g && (this.h.h || this.g.fa() || hc$1(this.g)))) {
          this.I || 4 != r || 7 == b2 || (8 == b2 || 0 >= F2 ? H$1(3) : H$1(2));
          ic$1(this);
          var c = this.g.aa();
          this.Y = c;
          b:
            if (jc$1(this)) {
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
                  if ((n = u.g ? u.g.getResponseHeader("X-HTTP-Initial-Response") : null) && !pa(n)) {
                    var m = n;
                    break b;
                  }
                }
                m = null;
              }
              if (c = m)
                E(this.j, this.m, c, "Initial handshake response via X-HTTP-Initial-Response"), this.J = true, kc$1(this, c);
              else {
                this.i = false;
                this.o = 3;
                I(12);
                P$1(this);
                Q$1(this);
                break a;
              }
            }
            this.P ? (lc$1(this, r, h), ya && this.i && 3 == r && (Eb(this.S, this.T, "tick", this.hb), this.T.start())) : (E(this.j, this.m, h, null), kc$1(this, h));
            4 == r && P$1(this);
            this.i && !this.I && (4 == r ? mc$1(this.l, this) : (this.i = false, N$1(this)));
          } else
            400 == c && 0 < h.indexOf("Unknown SID") ? (this.o = 3, I(12)) : (this.o = 0, I(13)), P$1(this), Q$1(this);
        }
      }
  } catch (r) {
  } finally {
  }
};
function jc$1(a) {
  return a.g ? "GET" == a.u && 2 != a.K && a.l.Da : false;
}
function lc$1(a, b2, c) {
  let d = true, e;
  for (; !a.I && a.C < c.length; )
    if (e = nc$1(a, c), e == bc) {
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
      E(a.j, a.m, e, null), kc$1(a, e);
  jc$1(a) && e != bc && e != ac$1 && (a.h.g = "", a.C = 0);
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
    return bc;
  c = Number(b2.substring(c, d));
  if (isNaN(c))
    return ac$1;
  d += 1;
  if (d + c > b2.length)
    return bc;
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
  0 == a.l.G || a.I || mc$1(a.l, a);
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
function kc$1(a, b2) {
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
      } else if ((a.J || c.g == a) && rc$1(c), !pa(b2))
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
              const F2 = m[4];
              null != F2 && (c.Ca = F2, c.j.info("SVER=" + c.Ca));
              const Ca = m[5];
              null != Ca && "number" === typeof Ca && 0 < Ca && (d = 1.5 * Ca, c.J = d, c.j.info("backChannelRequestTimeoutMs_=" + d));
              d = c;
              const Z2 = a.g;
              if (Z2) {
                const Da2 = Z2.g ? Z2.g.getResponseHeader("X-Client-Wire-Protocol") : null;
                if (Da2) {
                  var f = d.h;
                  f.g || -1 == Da2.indexOf("spdy") && -1 == Da2.indexOf("quic") && -1 == Da2.indexOf("h2") || (f.j = f.l, f.g = /* @__PURE__ */ new Set(), f.h && (vc(f, f.h), f.h = null));
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
              d.sa = wc$1(d, d.H ? d.ka : null, d.V);
              if (h.J) {
                xc$1(d.h, h);
                var n = h, u = d.J;
                u && n.setTimeout(u);
                n.B && (ic$1(n), N$1(n));
                d.g = h;
              } else
                yc$1(d);
              0 < c.i.length && zc$1(c);
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
  if (ba$1(a)) {
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
      if (ba$1(a) || "string" === typeof a) {
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
  else if (ba$1(a) || "string" === typeof a)
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
    Hc$1(this, a.m);
    this.l = a.l;
    b2 = a.i;
    var c = new Ic$1();
    c.i = b2.i;
    b2.g && (c.g = new Map(b2.g), c.h = b2.h);
    Jc$1(this, c);
    this.o = a.o;
  } else
    a && (c = String(a).match(Ec$1)) ? (this.h = !!b2, Gc$1(this, c[1] || "", true), this.s = Kc(c[2] || ""), this.g = Kc(c[3] || "", true), Hc$1(this, c[4]), this.l = Kc(c[5] || "", true), Jc$1(this, c[6] || "", true), this.o = Kc(c[7] || "")) : (this.h = !!b2, this.i = new Ic$1(null, this.h));
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
  (c = this.o) && a.push("#", Lc$1(c, Pc));
  return a.join("");
};
function M(a) {
  return new T(a);
}
function Gc$1(a, b2, c) {
  a.j = c ? Kc(b2, true) : b2;
  a.j && (a.j = a.j.replace(/:$/, ""));
}
function Hc$1(a, b2) {
  if (b2) {
    b2 = Number(b2);
    if (isNaN(b2) || 0 > b2)
      throw Error("Bad port number " + b2);
    a.m = b2;
  } else
    a.m = null;
}
function Jc$1(a, b2, c) {
  b2 instanceof Ic$1 ? (a.i = b2, Qc$1(a.i, a.h)) : (c || (b2 = Lc$1(b2, Rc)), a.i = new Ic$1(b2, a.h));
}
function S$1(a, b2, c) {
  a.i.set(b2, c);
}
function dc$1(a) {
  S$1(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36));
  return a;
}
function Kc(a, b2) {
  return a ? b2 ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : "";
}
function Lc$1(a, b2, c) {
  return "string" === typeof a ? (a = encodeURI(a).replace(b2, Sc$1), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null;
}
function Sc$1(a) {
  a = a.charCodeAt(0);
  return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
}
var Mc$1 = /[#\/\?@]/g, Oc$1 = /[#\?:]/g, Nc$1 = /[#\?]/g, Rc = /[#\?@]/g, Pc = /#/g;
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
  0 < c.length && (a.i = null, a.g.set(V$1(a, b2), ma(c)), a.h += c.length);
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
function Qc$1(a, b2) {
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
function Wc$1(a) {
  this.l = a || Xc$1;
  l.PerformanceNavigationTiming ? (a = l.performance.getEntriesByType("navigation"), a = 0 < a.length && ("hq" == a[0].nextHopProtocol || "h2" == a[0].nextHopProtocol)) : a = !!(l.g && l.g.Ga && l.g.Ga() && l.g.Ga().$b);
  this.j = a ? this.l : 1;
  this.g = null;
  1 < this.j && (this.g = /* @__PURE__ */ new Set());
  this.h = null;
  this.i = [];
}
var Xc$1 = 10;
function Yc$1(a) {
  return a.h ? true : a.g ? a.g.size >= a.j : false;
}
function uc$1(a) {
  return a.h ? 1 : a.g ? a.g.size : 0;
}
function qc$1(a, b2) {
  return a.h ? a.h == b2 : a.g ? a.g.has(b2) : false;
}
function vc(a, b2) {
  a.g ? a.g.add(b2) : a.h = b2;
}
function xc$1(a, b2) {
  a.h && a.h == b2 ? a.h = null : a.g && a.g.has(b2) && a.g.delete(b2);
}
Wc$1.prototype.cancel = function() {
  this.i = Zc$1(this);
  if (this.h)
    this.h.cancel(), this.h = null;
  else if (this.g && 0 !== this.g.size) {
    for (const a of this.g.values())
      a.cancel();
    this.g.clear();
  }
};
function Zc$1(a) {
  if (null != a.h)
    return a.i.concat(a.h.D);
  if (null != a.g && 0 !== a.g.size) {
    let b2 = a.i;
    for (const c of a.g.values())
      b2 = b2.concat(c.D);
    return b2;
  }
  return ma(a.i);
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
  !(0 <= la(nd, b2)) || d || e || c.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
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
  return y && Ia() && "number" === typeof a.timeout && void 0 !== a.ontimeout;
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
  Qa$1(a, function(c, d) {
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
  this.h = new Wc$1(a && a.concurrentRequestLimit);
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
    var b2 = a.U++, c = M(a.F);
    S$1(c, "SID", a.I);
    S$1(c, "RID", b2);
    S$1(c, "TYPE", "terminate");
    zd(a, c);
    b2 = new L$1(a, a.j, b2, void 0);
    b2.K = 2;
    b2.v = dc$1(M(c));
    c = false;
    l.navigator && l.navigator.sendBeacon && (c = l.navigator.sendBeacon(b2.v.toString(), ""));
    !c && l.Image && (new Image().src = b2.v, c = true);
    c || (b2.g = gc$1(b2.l, null), b2.g.da(b2.v));
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
function zc$1(a) {
  Yc$1(a.h) || a.m || (a.m = true, sb(a.Ja, a), a.C = 0);
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
        this.S && (f ? (f = Ra$1(f), Ta$1(f, this.S)) : f = this.S);
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
        c = M(this.F);
        S$1(c, "RID", a);
        S$1(c, "CVER", 22);
        this.D && S$1(c, "X-HTTP-Session-Id", this.D);
        zd(this, c);
        f && (this.N ? b2 = "headers=" + encodeURIComponent(String(ud(f))) + "&" + b2 : this.o && vd(c, this.o, f));
        vc(this.h, e);
        this.Ya && S$1(c, "TYPE", "init");
        this.O ? (S$1(c, "$req", b2), S$1(c, "SID", "null"), e.Z = true, cc$1(e, c, null)) : cc$1(e, c, b2);
        this.G = 2;
      }
    } else
      3 == this.G && (a ? Ed(this, a) : 0 == this.i.length || Yc$1(this.h) || Ed(this));
};
function Ed(a, b2) {
  var c;
  b2 ? c = b2.m : c = a.U++;
  const d = M(a.F);
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
  vc(a.h, c);
  cc$1(c, d, b2);
}
function zd(a, b2) {
  a.ia && Qa$1(a.ia, function(c, d) {
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
          } catch (F2) {
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
function yc$1(a) {
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
  var b2 = M(a.sa);
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
  c.v = dc$1(M(b2));
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
function mc$1(a, b2) {
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
        zc$1(a);
      } else
        yc$1(a);
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
    const b2 = Zc$1(a.h);
    if (0 != b2.length || 0 != a.i.length)
      na(a.la, b2), na(a.la, a.i), a.h.i.length = 0, ma(a.i), a.i.length = 0;
    a.l.ua();
  }
}
function wc$1(a, b2, c) {
  var d = c instanceof T ? M(c) : new T(c, void 0);
  if ("" != d.g)
    b2 && (d.g = b2 + "." + d.g), Hc$1(d, d.m);
  else {
    var e = l.location;
    d = e.protocol;
    b2 = b2 ? b2 + "." + e.hostname : e.hostname;
    e = +e.port;
    var f = new T(null, void 0);
    d && Gc$1(f, d);
    b2 && (f.g = b2);
    e && Hc$1(f, e);
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
function gc$1(a, b2, c) {
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
  (a = b2 && b2.Yb) && !pa(a) && (this.g.o = a);
  this.A = b2 && b2.supportsCrossDomainXhr || false;
  this.v = b2 && b2.sendRawJson || false;
  (b2 = b2 && b2.httpSessionIdParam) && !pa(b2) && (this.g.D = b2, a = this.h, null !== a && b2 in a && (a = this.h, b2 in a && delete a[b2]));
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
  a.F = wc$1(a, null, a.V);
  zc$1(a);
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
  3 == b2.G && zc$1(b2);
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
const v = "@firebase/firestore";
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
class b {
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
b.UNAUTHENTICATED = new b(null), b.GOOGLE_CREDENTIALS = new b("google-credentials-uid"), b.FIRST_PARTY = new b("first-party-uid"), b.MOCK_USER = new b("mock-user");
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
let P = "9.19.0";
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
    V.debug(`Firestore (${P}): ${t2}`, ...n);
  }
}
function x(t2, ...e) {
  if (V.logLevel <= LogLevel.ERROR) {
    const n = e.map(k);
    V.error(`Firestore (${P}): ${t2}`, ...n);
  }
}
function N(t2, ...e) {
  if (V.logLevel <= LogLevel.WARN) {
    const n = e.map(k);
    V.warn(`Firestore (${P}): ${t2}`, ...n);
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
  const e = `FIRESTORE (${P}) INTERNAL ASSERTION FAILED: ` + t2;
  throw x(e), new Error(e);
}
function $(t2, e) {
  t2 || O();
}
function F(t2, e) {
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
    t2.enqueueRetryable(() => e(b.UNAUTHENTICATED));
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
    this.t = t2, this.currentUser = b.UNAUTHENTICATED, this.i = 0, this.forceRefresh = false, this.auth = null;
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
    return this.forceRefresh = false, this.auth ? this.auth.getToken(e).then((e2) => this.i !== t2 ? (C("FirebaseAuthCredentialsProvider", "getToken aborted due to token change."), this.getToken()) : e2 ? ($("string" == typeof e2.accessToken), new U(e2.accessToken, this.currentUser)) : null) : Promise.resolve(null);
  }
  invalidateToken() {
    this.forceRefresh = true;
  }
  shutdown() {
    this.auth && this.auth.removeAuthTokenListener(this.o);
  }
  u() {
    const t2 = this.auth && this.auth.getUid();
    return $(null === t2 || "string" == typeof t2), new b(t2);
  }
}
class z {
  constructor(t2, e, n) {
    this.h = t2, this.l = e, this.m = n, this.type = "FirstParty", this.user = b.FIRST_PARTY, this.g = /* @__PURE__ */ new Map();
  }
  p() {
    return this.m ? this.m() : null;
  }
  get headers() {
    this.g.set("X-Goog-AuthUser", this.h);
    const t2 = this.p();
    return t2 && this.g.set("Authorization", t2), this.l && this.g.set("X-Goog-Iam-Authorization-Token", this.l), this.g;
  }
}
class j {
  constructor(t2, e, n) {
    this.h = t2, this.l = e, this.m = n;
  }
  getToken() {
    return Promise.resolve(new z(this.h, this.l, this.m));
  }
  start(t2, e) {
    t2.enqueueRetryable(() => e(b.FIRST_PARTY));
  }
  shutdown() {
  }
  invalidateToken() {
  }
}
class W {
  constructor(t2) {
    this.value = t2, this.type = "AppCheck", this.headers = /* @__PURE__ */ new Map(), t2 && t2.length > 0 && this.headers.set("x-firebase-appcheck", this.value);
  }
}
class H {
  constructor(t2) {
    this.I = t2, this.forceRefresh = false, this.appCheck = null, this.T = null;
  }
  start(t2, e) {
    const n = (t3) => {
      null != t3.error && C("FirebaseAppCheckTokenProvider", `Error getting App Check token; using placeholder token instead. Error: ${t3.error.message}`);
      const n2 = t3.token !== this.T;
      return this.T = t3.token, C("FirebaseAppCheckTokenProvider", `Received ${n2 ? "new" : "existing"} token.`), n2 ? e(t3.token) : Promise.resolve();
    };
    this.o = (e2) => {
      t2.enqueueRetryable(() => n(e2));
    };
    const s = (t3) => {
      C("FirebaseAppCheckTokenProvider", "AppCheck detected"), this.appCheck = t3, this.appCheck.addTokenListener(this.o);
    };
    this.I.onInit((t3) => s(t3)), setTimeout(() => {
      if (!this.appCheck) {
        const t3 = this.I.getImmediate({
          optional: true
        });
        t3 ? s(t3) : C("FirebaseAppCheckTokenProvider", "AppCheck not yet detected");
      }
    }, 0);
  }
  getToken() {
    const t2 = this.forceRefresh;
    return this.forceRefresh = false, this.appCheck ? this.appCheck.getToken(t2).then((t3) => t3 ? ($("string" == typeof t3.token), this.T = t3.token, new W(t3.token)) : null) : Promise.resolve(null);
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
class Z {
  static A() {
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
function X(t2, e) {
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
    return this.seconds === t2.seconds ? X(this.nanoseconds, t2.nanoseconds) : X(this.seconds, t2.seconds);
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
  return 0 !== n ? n : (n = ct.comparator(t2.documentKey, e.documentKey), 0 !== n ? n : X(t2.largestBatchId, e.largestBatchId));
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
    this.previousValue = t2, e && (e.sequenceNumberHandler = (t3) => this.ot(t3), this.ut = (t3) => e.writeSequenceNumber(t3));
  }
  ot(t2) {
    return this.previousValue = Math.max(t2, this.previousValue), this.previousValue;
  }
  next() {
    const t2 = ++this.previousValue;
    return this.ut && this.ut(t2), t2;
  }
}
Ot.ct = -1;
function $t(t2) {
  return null == t2;
}
function Mt(t2) {
  return 0 === t2 && 1 / t2 == -1 / 0;
}
function Ft(t2) {
  return "number" == typeof t2 && Number.isInteger(t2) && !Mt(t2) && t2 <= Number.MAX_SAFE_INTEGER && t2 >= Number.MIN_SAFE_INTEGER;
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
function we(t2) {
  let e = 0;
  for (const n in t2)
    Object.prototype.hasOwnProperty.call(t2, n) && e++;
  return e;
}
function _e(t2, e) {
  for (const n in t2)
    Object.prototype.hasOwnProperty.call(t2, n) && e(n, t2[n]);
}
function me(t2) {
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
class ge {
  constructor(t2, e) {
    this.comparator = t2, this.root = e || pe.EMPTY;
  }
  insert(t2, e) {
    return new ge(this.comparator, this.root.insert(t2, e, this.comparator).copy(null, null, pe.BLACK, null, null));
  }
  remove(t2) {
    return new ge(this.comparator, this.root.remove(t2, this.comparator).copy(null, null, pe.BLACK, null, null));
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
    return new ye(this.root, null, this.comparator, false);
  }
  getIteratorFrom(t2) {
    return new ye(this.root, t2, this.comparator, false);
  }
  getReverseIterator() {
    return new ye(this.root, null, this.comparator, true);
  }
  getReverseIteratorFrom(t2) {
    return new ye(this.root, t2, this.comparator, true);
  }
}
class ye {
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
class pe {
  constructor(t2, e, n, s, i) {
    this.key = t2, this.value = e, this.color = null != n ? n : pe.RED, this.left = null != s ? s : pe.EMPTY, this.right = null != i ? i : pe.EMPTY, this.size = this.left.size + 1 + this.right.size;
  }
  copy(t2, e, n, s, i) {
    return new pe(null != t2 ? t2 : this.key, null != e ? e : this.value, null != n ? n : this.color, null != s ? s : this.left, null != i ? i : this.right);
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
      return pe.EMPTY;
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
          return pe.EMPTY;
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
    const t2 = this.copy(null, null, pe.RED, null, this.right.left);
    return this.right.copy(null, null, this.color, t2, null);
  }
  rotateRight() {
    const t2 = this.copy(null, null, pe.RED, this.left.right, null);
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
pe.EMPTY = null, pe.RED = true, pe.BLACK = false;
pe.EMPTY = new class {
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
    return new pe(t2, e);
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
class Ie {
  constructor(t2) {
    this.comparator = t2, this.data = new ge(this.comparator);
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
    return new Te(this.data.getIterator());
  }
  getIteratorFrom(t2) {
    return new Te(this.data.getIteratorFrom(t2));
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
    if (!(t2 instanceof Ie))
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
    const e = new Ie(this.comparator);
    return e.data = t2, e;
  }
}
class Te {
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
class Ae {
  constructor(t2) {
    this.fields = t2, t2.sort(ut.comparator);
  }
  static empty() {
    return new Ae([]);
  }
  unionWith(t2) {
    let e = new Ie(ut.comparator);
    for (const t3 of this.fields)
      e = e.add(t3);
    for (const n of t2)
      e = e.add(n);
    return new Ae(e.toArray());
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
 * Copyright 2023 Google LLC
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
class Re extends Error {
  constructor() {
    super(...arguments), this.name = "Base64DecodeError";
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
class be {
  constructor(t2) {
    this.binaryString = t2;
  }
  static fromBase64String(t2) {
    const e = function(t3) {
      try {
        return atob(t3);
      } catch (t4) {
        throw "undefined" != typeof DOMException && t4 instanceof DOMException ? new Re("Invalid base64 string: " + t4) : t4;
      }
    }(t2);
    return new be(e);
  }
  static fromUint8Array(t2) {
    const e = function(t3) {
      let e2 = "";
      for (let n = 0; n < t3.length; ++n)
        e2 += String.fromCharCode(t3[n]);
      return e2;
    }(t2);
    return new be(e);
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
    return X(this.binaryString, t2.binaryString);
  }
  isEqual(t2) {
    return this.binaryString === t2.binaryString;
  }
}
be.EMPTY_BYTE_STRING = new be("");
const Pe = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
function Ve(t2) {
  if ($(!!t2), "string" == typeof t2) {
    let e = 0;
    const n = Pe.exec(t2);
    if ($(!!n), n[1]) {
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
    seconds: Se(t2.seconds),
    nanos: Se(t2.nanos)
  };
}
function Se(t2) {
  return "number" == typeof t2 ? t2 : "string" == typeof t2 ? Number(t2) : 0;
}
function De(t2) {
  return "string" == typeof t2 ? be.fromBase64String(t2) : be.fromUint8Array(t2);
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
function Ce(t2) {
  var e, n;
  return "server_timestamp" === (null === (n = ((null === (e = null == t2 ? void 0 : t2.mapValue) || void 0 === e ? void 0 : e.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue);
}
function xe(t2) {
  const e = t2.mapValue.fields.__previous_value__;
  return Ce(e) ? xe(e) : e;
}
function Ne(t2) {
  const e = Ve(t2.mapValue.fields.__local_write_time__.timestampValue);
  return new nt(e.seconds, e.nanos);
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
class ke {
  constructor(t2, e, n, s, i, r, o, u) {
    this.databaseId = t2, this.appId = e, this.persistenceKey = n, this.host = s, this.ssl = i, this.forceLongPolling = r, this.autoDetectLongPolling = o, this.useFetchStreams = u;
  }
}
class Oe {
  constructor(t2, e) {
    this.projectId = t2, this.database = e || "(default)";
  }
  static empty() {
    return new Oe("", "");
  }
  get isDefaultDatabase() {
    return "(default)" === this.database;
  }
  isEqual(t2) {
    return t2 instanceof Oe && t2.projectId === this.projectId && t2.database === this.database;
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
const $e = {
  mapValue: {
    fields: {
      __type__: {
        stringValue: "__max__"
      }
    }
  }
};
function Fe(t2) {
  return "nullValue" in t2 ? 0 : "booleanValue" in t2 ? 1 : "integerValue" in t2 || "doubleValue" in t2 ? 2 : "timestampValue" in t2 ? 3 : "stringValue" in t2 ? 5 : "bytesValue" in t2 ? 6 : "referenceValue" in t2 ? 7 : "geoPointValue" in t2 ? 8 : "arrayValue" in t2 ? 9 : "mapValue" in t2 ? Ce(t2) ? 4 : Ze(t2) ? 9007199254740991 : 10 : O();
}
function Be(t2, e) {
  if (t2 === e)
    return true;
  const n = Fe(t2);
  if (n !== Fe(e))
    return false;
  switch (n) {
    case 0:
    case 9007199254740991:
      return true;
    case 1:
      return t2.booleanValue === e.booleanValue;
    case 4:
      return Ne(t2).isEqual(Ne(e));
    case 3:
      return function(t3, e2) {
        if ("string" == typeof t3.timestampValue && "string" == typeof e2.timestampValue && t3.timestampValue.length === e2.timestampValue.length)
          return t3.timestampValue === e2.timestampValue;
        const n2 = Ve(t3.timestampValue), s = Ve(e2.timestampValue);
        return n2.seconds === s.seconds && n2.nanos === s.nanos;
      }(t2, e);
    case 5:
      return t2.stringValue === e.stringValue;
    case 6:
      return function(t3, e2) {
        return De(t3.bytesValue).isEqual(De(e2.bytesValue));
      }(t2, e);
    case 7:
      return t2.referenceValue === e.referenceValue;
    case 8:
      return function(t3, e2) {
        return Se(t3.geoPointValue.latitude) === Se(e2.geoPointValue.latitude) && Se(t3.geoPointValue.longitude) === Se(e2.geoPointValue.longitude);
      }(t2, e);
    case 2:
      return function(t3, e2) {
        if ("integerValue" in t3 && "integerValue" in e2)
          return Se(t3.integerValue) === Se(e2.integerValue);
        if ("doubleValue" in t3 && "doubleValue" in e2) {
          const n2 = Se(t3.doubleValue), s = Se(e2.doubleValue);
          return n2 === s ? Mt(n2) === Mt(s) : isNaN(n2) && isNaN(s);
        }
        return false;
      }(t2, e);
    case 9:
      return tt(t2.arrayValue.values || [], e.arrayValue.values || [], Be);
    case 10:
      return function(t3, e2) {
        const n2 = t3.mapValue.fields || {}, s = e2.mapValue.fields || {};
        if (we(n2) !== we(s))
          return false;
        for (const t4 in n2)
          if (n2.hasOwnProperty(t4) && (void 0 === s[t4] || !Be(n2[t4], s[t4])))
            return false;
        return true;
      }(t2, e);
    default:
      return O();
  }
}
function Le(t2, e) {
  return void 0 !== (t2.values || []).find((t3) => Be(t3, e));
}
function qe(t2, e) {
  if (t2 === e)
    return 0;
  const n = Fe(t2), s = Fe(e);
  if (n !== s)
    return X(n, s);
  switch (n) {
    case 0:
    case 9007199254740991:
      return 0;
    case 1:
      return X(t2.booleanValue, e.booleanValue);
    case 2:
      return function(t3, e2) {
        const n2 = Se(t3.integerValue || t3.doubleValue), s2 = Se(e2.integerValue || e2.doubleValue);
        return n2 < s2 ? -1 : n2 > s2 ? 1 : n2 === s2 ? 0 : isNaN(n2) ? isNaN(s2) ? 0 : -1 : 1;
      }(t2, e);
    case 3:
      return Ue(t2.timestampValue, e.timestampValue);
    case 4:
      return Ue(Ne(t2), Ne(e));
    case 5:
      return X(t2.stringValue, e.stringValue);
    case 6:
      return function(t3, e2) {
        const n2 = De(t3), s2 = De(e2);
        return n2.compareTo(s2);
      }(t2.bytesValue, e.bytesValue);
    case 7:
      return function(t3, e2) {
        const n2 = t3.split("/"), s2 = e2.split("/");
        for (let t4 = 0; t4 < n2.length && t4 < s2.length; t4++) {
          const e3 = X(n2[t4], s2[t4]);
          if (0 !== e3)
            return e3;
        }
        return X(n2.length, s2.length);
      }(t2.referenceValue, e.referenceValue);
    case 8:
      return function(t3, e2) {
        const n2 = X(Se(t3.latitude), Se(e2.latitude));
        if (0 !== n2)
          return n2;
        return X(Se(t3.longitude), Se(e2.longitude));
      }(t2.geoPointValue, e.geoPointValue);
    case 9:
      return function(t3, e2) {
        const n2 = t3.values || [], s2 = e2.values || [];
        for (let t4 = 0; t4 < n2.length && t4 < s2.length; ++t4) {
          const e3 = qe(n2[t4], s2[t4]);
          if (e3)
            return e3;
        }
        return X(n2.length, s2.length);
      }(t2.arrayValue, e.arrayValue);
    case 10:
      return function(t3, e2) {
        if (t3 === $e.mapValue && e2 === $e.mapValue)
          return 0;
        if (t3 === $e.mapValue)
          return 1;
        if (e2 === $e.mapValue)
          return -1;
        const n2 = t3.fields || {}, s2 = Object.keys(n2), i = e2.fields || {}, r = Object.keys(i);
        s2.sort(), r.sort();
        for (let t4 = 0; t4 < s2.length && t4 < r.length; ++t4) {
          const e3 = X(s2[t4], r[t4]);
          if (0 !== e3)
            return e3;
          const o = qe(n2[s2[t4]], i[r[t4]]);
          if (0 !== o)
            return o;
        }
        return X(s2.length, r.length);
      }(t2.mapValue, e.mapValue);
    default:
      throw O();
  }
}
function Ue(t2, e) {
  if ("string" == typeof t2 && "string" == typeof e && t2.length === e.length)
    return X(t2, e);
  const n = Ve(t2), s = Ve(e), i = X(n.seconds, s.seconds);
  return 0 !== i ? i : X(n.nanos, s.nanos);
}
function Ke(t2) {
  return Ge(t2);
}
function Ge(t2) {
  return "nullValue" in t2 ? "null" : "booleanValue" in t2 ? "" + t2.booleanValue : "integerValue" in t2 ? "" + t2.integerValue : "doubleValue" in t2 ? "" + t2.doubleValue : "timestampValue" in t2 ? function(t3) {
    const e2 = Ve(t3);
    return `time(${e2.seconds},${e2.nanos})`;
  }(t2.timestampValue) : "stringValue" in t2 ? t2.stringValue : "bytesValue" in t2 ? De(t2.bytesValue).toBase64() : "referenceValue" in t2 ? (n = t2.referenceValue, ct.fromName(n).toString()) : "geoPointValue" in t2 ? `geo(${(e = t2.geoPointValue).latitude},${e.longitude})` : "arrayValue" in t2 ? function(t3) {
    let e2 = "[", n2 = true;
    for (const s of t3.values || [])
      n2 ? n2 = false : e2 += ",", e2 += Ge(s);
    return e2 + "]";
  }(t2.arrayValue) : "mapValue" in t2 ? function(t3) {
    const e2 = Object.keys(t3.fields || {}).sort();
    let n2 = "{", s = true;
    for (const i of e2)
      s ? s = false : n2 += ",", n2 += `${i}:${Ge(t3.fields[i])}`;
    return n2 + "}";
  }(t2.mapValue) : O();
  var e, n;
}
function Qe(t2, e) {
  return {
    referenceValue: `projects/${t2.projectId}/databases/${t2.database}/documents/${e.path.canonicalString()}`
  };
}
function ze(t2) {
  return !!t2 && "integerValue" in t2;
}
function je(t2) {
  return !!t2 && "arrayValue" in t2;
}
function We(t2) {
  return !!t2 && "nullValue" in t2;
}
function He(t2) {
  return !!t2 && "doubleValue" in t2 && isNaN(Number(t2.doubleValue));
}
function Je(t2) {
  return !!t2 && "mapValue" in t2;
}
function Ye(t2) {
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
    return _e(t2.mapValue.fields, (t3, n) => e.mapValue.fields[t3] = Ye(n)), e;
  }
  if (t2.arrayValue) {
    const e = {
      arrayValue: {
        values: []
      }
    };
    for (let n = 0; n < (t2.arrayValue.values || []).length; ++n)
      e.arrayValue.values[n] = Ye(t2.arrayValue.values[n]);
    return e;
  }
  return Object.assign({}, t2);
}
function Ze(t2) {
  return "__max__" === (((t2.mapValue || {}).fields || {}).__type__ || {}).stringValue;
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
class sn {
  constructor(t2) {
    this.value = t2;
  }
  static empty() {
    return new sn({
      mapValue: {}
    });
  }
  field(t2) {
    if (t2.isEmpty())
      return this.value;
    {
      let e = this.value;
      for (let n = 0; n < t2.length - 1; ++n)
        if (e = (e.mapValue.fields || {})[t2.get(n)], !Je(e))
          return null;
      return e = (e.mapValue.fields || {})[t2.lastSegment()], e || null;
    }
  }
  set(t2, e) {
    this.getFieldsMap(t2.popLast())[t2.lastSegment()] = Ye(e);
  }
  setAll(t2) {
    let e = ut.emptyPath(), n = {}, s = [];
    t2.forEach((t3, i2) => {
      if (!e.isImmediateParentOf(i2)) {
        const t4 = this.getFieldsMap(e);
        this.applyChanges(t4, n, s), n = {}, s = [], e = i2.popLast();
      }
      t3 ? n[i2.lastSegment()] = Ye(t3) : s.push(i2.lastSegment());
    });
    const i = this.getFieldsMap(e);
    this.applyChanges(i, n, s);
  }
  delete(t2) {
    const e = this.field(t2.popLast());
    Je(e) && e.mapValue.fields && delete e.mapValue.fields[t2.lastSegment()];
  }
  isEqual(t2) {
    return Be(this.value, t2.value);
  }
  getFieldsMap(t2) {
    let e = this.value;
    e.mapValue.fields || (e.mapValue = {
      fields: {}
    });
    for (let n = 0; n < t2.length; ++n) {
      let s = e.mapValue.fields[t2.get(n)];
      Je(s) && s.mapValue.fields || (s = {
        mapValue: {
          fields: {}
        }
      }, e.mapValue.fields[t2.get(n)] = s), e = s;
    }
    return e.mapValue.fields;
  }
  applyChanges(t2, e, n) {
    _e(e, (e2, n2) => t2[e2] = n2);
    for (const e2 of n)
      delete t2[e2];
  }
  clone() {
    return new sn(Ye(this.value));
  }
}
function rn(t2) {
  const e = [];
  return _e(t2.fields, (t3, n) => {
    const s = new ut([t3]);
    if (Je(n)) {
      const t4 = rn(n.mapValue).fields;
      if (0 === t4.length)
        e.push(s);
      else
        for (const n2 of t4)
          e.push(s.child(n2));
    } else
      e.push(s);
  }), new Ae(e);
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
class on {
  constructor(t2, e, n, s, i, r, o) {
    this.key = t2, this.documentType = e, this.version = n, this.readTime = s, this.createTime = i, this.data = r, this.documentState = o;
  }
  static newInvalidDocument(t2) {
    return new on(
      t2,
      0,
      st.min(),
      st.min(),
      st.min(),
      sn.empty(),
      0
    );
  }
  static newFoundDocument(t2, e, n, s) {
    return new on(
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
    return new on(
      t2,
      2,
      e,
      st.min(),
      st.min(),
      sn.empty(),
      0
    );
  }
  static newUnknownDocument(t2, e) {
    return new on(
      t2,
      3,
      e,
      st.min(),
      st.min(),
      sn.empty(),
      2
    );
  }
  convertToFoundDocument(t2, e) {
    return !this.createTime.isEqual(st.min()) || 2 !== this.documentType && 0 !== this.documentType || (this.createTime = t2), this.version = t2, this.documentType = 1, this.data = e, this.documentState = 0, this;
  }
  convertToNoDocument(t2) {
    return this.version = t2, this.documentType = 2, this.data = sn.empty(), this.documentState = 0, this;
  }
  convertToUnknownDocument(t2) {
    return this.version = t2, this.documentType = 3, this.data = sn.empty(), this.documentState = 2, this;
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
    return t2 instanceof on && this.key.isEqual(t2.key) && this.version.isEqual(t2.version) && this.documentType === t2.documentType && this.documentState === t2.documentState && this.data.isEqual(t2.data);
  }
  mutableCopy() {
    return new on(this.key, this.documentType, this.version, this.readTime, this.createTime, this.data.clone(), this.documentState);
  }
  toString() {
    return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`;
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
class un {
  constructor(t2, e) {
    this.position = t2, this.inclusive = e;
  }
}
function cn(t2, e, n) {
  let s = 0;
  for (let i = 0; i < t2.position.length; i++) {
    const r = e[i], o = t2.position[i];
    if (r.field.isKeyField())
      s = ct.comparator(ct.fromName(o.referenceValue), n.key);
    else {
      s = qe(o, n.data.field(r.field));
    }
    if ("desc" === r.dir && (s *= -1), 0 !== s)
      break;
  }
  return s;
}
function an(t2, e) {
  if (null === t2)
    return null === e;
  if (null === e)
    return false;
  if (t2.inclusive !== e.inclusive || t2.position.length !== e.position.length)
    return false;
  for (let n = 0; n < t2.position.length; n++) {
    if (!Be(t2.position[n], e.position[n]))
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
class hn {
  constructor(t2, e = "asc") {
    this.field = t2, this.dir = e;
  }
}
function ln(t2, e) {
  return t2.dir === e.dir && t2.field.isEqual(e.field);
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
class fn {
}
class dn extends fn {
  constructor(t2, e, n) {
    super(), this.field = t2, this.op = e, this.value = n;
  }
  static create(t2, e, n) {
    return t2.isKeyField() ? "in" === e || "not-in" === e ? this.createKeyFieldInFilter(t2, e, n) : new An(t2, e, n) : "array-contains" === e ? new Pn(t2, n) : "in" === e ? new Vn(t2, n) : "not-in" === e ? new Sn(t2, n) : "array-contains-any" === e ? new Dn(t2, n) : new dn(t2, e, n);
  }
  static createKeyFieldInFilter(t2, e, n) {
    return "in" === e ? new Rn(t2, n) : new vn(t2, n);
  }
  matches(t2) {
    const e = t2.data.field(this.field);
    return "!=" === this.op ? null !== e && this.matchesComparison(qe(e, this.value)) : null !== e && Fe(this.value) === Fe(e) && this.matchesComparison(qe(e, this.value));
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
class wn extends fn {
  constructor(t2, e) {
    super(), this.filters = t2, this.op = e, this.ht = null;
  }
  static create(t2, e) {
    return new wn(t2, e);
  }
  matches(t2) {
    return _n(this) ? void 0 === this.filters.find((e) => !e.matches(t2)) : void 0 !== this.filters.find((e) => e.matches(t2));
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
function _n(t2) {
  return "and" === t2.op;
}
function gn(t2) {
  return yn(t2) && _n(t2);
}
function yn(t2) {
  for (const e of t2.filters)
    if (e instanceof wn)
      return false;
  return true;
}
function pn(t2) {
  if (t2 instanceof dn)
    return t2.field.canonicalString() + t2.op.toString() + Ke(t2.value);
  if (gn(t2))
    return t2.filters.map((t3) => pn(t3)).join(",");
  {
    const e = t2.filters.map((t3) => pn(t3)).join(",");
    return `${t2.op}(${e})`;
  }
}
function In(t2, e) {
  return t2 instanceof dn ? function(t3, e2) {
    return e2 instanceof dn && t3.op === e2.op && t3.field.isEqual(e2.field) && Be(t3.value, e2.value);
  }(t2, e) : t2 instanceof wn ? function(t3, e2) {
    if (e2 instanceof wn && t3.op === e2.op && t3.filters.length === e2.filters.length) {
      return t3.filters.reduce((t4, n, s) => t4 && In(n, e2.filters[s]), true);
    }
    return false;
  }(t2, e) : void O();
}
function En(t2) {
  return t2 instanceof dn ? function(t3) {
    return `${t3.field.canonicalString()} ${t3.op} ${Ke(t3.value)}`;
  }(t2) : t2 instanceof wn ? function(t3) {
    return t3.op.toString() + " {" + t3.getFilters().map(En).join(" ,") + "}";
  }(t2) : "Filter";
}
class An extends dn {
  constructor(t2, e, n) {
    super(t2, e, n), this.key = ct.fromName(n.referenceValue);
  }
  matches(t2) {
    const e = ct.comparator(t2.key, this.key);
    return this.matchesComparison(e);
  }
}
class Rn extends dn {
  constructor(t2, e) {
    super(t2, "in", e), this.keys = bn("in", e);
  }
  matches(t2) {
    return this.keys.some((e) => e.isEqual(t2.key));
  }
}
class vn extends dn {
  constructor(t2, e) {
    super(t2, "not-in", e), this.keys = bn("not-in", e);
  }
  matches(t2) {
    return !this.keys.some((e) => e.isEqual(t2.key));
  }
}
function bn(t2, e) {
  var n;
  return ((null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []).map((t3) => ct.fromName(t3.referenceValue));
}
class Pn extends dn {
  constructor(t2, e) {
    super(t2, "array-contains", e);
  }
  matches(t2) {
    const e = t2.data.field(this.field);
    return je(e) && Le(e.arrayValue, this.value);
  }
}
class Vn extends dn {
  constructor(t2, e) {
    super(t2, "in", e);
  }
  matches(t2) {
    const e = t2.data.field(this.field);
    return null !== e && Le(this.value.arrayValue, e);
  }
}
class Sn extends dn {
  constructor(t2, e) {
    super(t2, "not-in", e);
  }
  matches(t2) {
    if (Le(this.value.arrayValue, {
      nullValue: "NULL_VALUE"
    }))
      return false;
    const e = t2.data.field(this.field);
    return null !== e && !Le(this.value.arrayValue, e);
  }
}
class Dn extends dn {
  constructor(t2, e) {
    super(t2, "array-contains-any", e);
  }
  matches(t2) {
    const e = t2.data.field(this.field);
    return !(!je(e) || !e.arrayValue.values) && e.arrayValue.values.some((t3) => Le(this.value.arrayValue, t3));
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
class Cn {
  constructor(t2, e = null, n = [], s = [], i = null, r = null, o = null) {
    this.path = t2, this.collectionGroup = e, this.orderBy = n, this.filters = s, this.limit = i, this.startAt = r, this.endAt = o, this.ft = null;
  }
}
function xn(t2, e = null, n = [], s = [], i = null, r = null, o = null) {
  return new Cn(t2, e, n, s, i, r, o);
}
function Nn(t2) {
  const e = F(t2);
  if (null === e.ft) {
    let t3 = e.path.canonicalString();
    null !== e.collectionGroup && (t3 += "|cg:" + e.collectionGroup), t3 += "|f:", t3 += e.filters.map((t4) => pn(t4)).join(","), t3 += "|ob:", t3 += e.orderBy.map((t4) => function(t5) {
      return t5.field.canonicalString() + t5.dir;
    }(t4)).join(","), $t(e.limit) || (t3 += "|l:", t3 += e.limit), e.startAt && (t3 += "|lb:", t3 += e.startAt.inclusive ? "b:" : "a:", t3 += e.startAt.position.map((t4) => Ke(t4)).join(",")), e.endAt && (t3 += "|ub:", t3 += e.endAt.inclusive ? "a:" : "b:", t3 += e.endAt.position.map((t4) => Ke(t4)).join(",")), e.ft = t3;
  }
  return e.ft;
}
function kn(t2, e) {
  if (t2.limit !== e.limit)
    return false;
  if (t2.orderBy.length !== e.orderBy.length)
    return false;
  for (let n = 0; n < t2.orderBy.length; n++)
    if (!ln(t2.orderBy[n], e.orderBy[n]))
      return false;
  if (t2.filters.length !== e.filters.length)
    return false;
  for (let n = 0; n < t2.filters.length; n++)
    if (!In(t2.filters[n], e.filters[n]))
      return false;
  return t2.collectionGroup === e.collectionGroup && (!!t2.path.isEqual(e.path) && (!!an(t2.startAt, e.startAt) && an(t2.endAt, e.endAt)));
}
function On(t2) {
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
class Bn {
  constructor(t2, e = null, n = [], s = [], i = null, r = "F", o = null, u = null) {
    this.path = t2, this.collectionGroup = e, this.explicitOrderBy = n, this.filters = s, this.limit = i, this.limitType = r, this.startAt = o, this.endAt = u, this.dt = null, this.wt = null, this.startAt, this.endAt;
  }
}
function Ln(t2, e, n, s, i, r, o, u) {
  return new Bn(t2, e, n, s, i, r, o, u);
}
function qn(t2) {
  return new Bn(t2);
}
function Un(t2) {
  return 0 === t2.filters.length && null === t2.limit && null == t2.startAt && null == t2.endAt && (0 === t2.explicitOrderBy.length || 1 === t2.explicitOrderBy.length && t2.explicitOrderBy[0].field.isKeyField());
}
function Kn(t2) {
  return t2.explicitOrderBy.length > 0 ? t2.explicitOrderBy[0].field : null;
}
function Gn(t2) {
  for (const e of t2.filters) {
    const t3 = e.getFirstInequalityField();
    if (null !== t3)
      return t3;
  }
  return null;
}
function Qn(t2) {
  return null !== t2.collectionGroup;
}
function zn(t2) {
  const e = F(t2);
  if (null === e.dt) {
    e.dt = [];
    const t3 = Gn(e), n = Kn(e);
    if (null !== t3 && null === n)
      t3.isKeyField() || e.dt.push(new hn(t3)), e.dt.push(new hn(ut.keyField(), "asc"));
    else {
      let t4 = false;
      for (const n2 of e.explicitOrderBy)
        e.dt.push(n2), n2.field.isKeyField() && (t4 = true);
      if (!t4) {
        const t5 = e.explicitOrderBy.length > 0 ? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir : "asc";
        e.dt.push(new hn(ut.keyField(), t5));
      }
    }
  }
  return e.dt;
}
function jn(t2) {
  const e = F(t2);
  if (!e.wt)
    if ("F" === e.limitType)
      e.wt = xn(e.path, e.collectionGroup, zn(e), e.filters, e.limit, e.startAt, e.endAt);
    else {
      const t3 = [];
      for (const n2 of zn(e)) {
        const e2 = "desc" === n2.dir ? "asc" : "desc";
        t3.push(new hn(n2.field, e2));
      }
      const n = e.endAt ? new un(e.endAt.position, e.endAt.inclusive) : null, s = e.startAt ? new un(e.startAt.position, e.startAt.inclusive) : null;
      e.wt = xn(e.path, e.collectionGroup, t3, e.filters, e.limit, n, s);
    }
  return e.wt;
}
function Wn(t2, e) {
  e.getFirstInequalityField(), Gn(t2);
  const n = t2.filters.concat([e]);
  return new Bn(t2.path, t2.collectionGroup, t2.explicitOrderBy.slice(), n, t2.limit, t2.limitType, t2.startAt, t2.endAt);
}
function Hn(t2, e, n) {
  return new Bn(t2.path, t2.collectionGroup, t2.explicitOrderBy.slice(), t2.filters.slice(), e, n, t2.startAt, t2.endAt);
}
function Jn(t2, e) {
  return kn(jn(t2), jn(e)) && t2.limitType === e.limitType;
}
function Yn(t2) {
  return `${Nn(jn(t2))}|lt:${t2.limitType}`;
}
function Zn(t2) {
  return `Query(target=${function(t3) {
    let e = t3.path.canonicalString();
    return null !== t3.collectionGroup && (e += " collectionGroup=" + t3.collectionGroup), t3.filters.length > 0 && (e += `, filters: [${t3.filters.map((t4) => En(t4)).join(", ")}]`), $t(t3.limit) || (e += ", limit: " + t3.limit), t3.orderBy.length > 0 && (e += `, orderBy: [${t3.orderBy.map((t4) => function(t5) {
      return `${t5.field.canonicalString()} (${t5.dir})`;
    }(t4)).join(", ")}]`), t3.startAt && (e += ", startAt: ", e += t3.startAt.inclusive ? "b:" : "a:", e += t3.startAt.position.map((t4) => Ke(t4)).join(",")), t3.endAt && (e += ", endAt: ", e += t3.endAt.inclusive ? "a:" : "b:", e += t3.endAt.position.map((t4) => Ke(t4)).join(",")), `Target(${e})`;
  }(jn(t2))}; limitType=${t2.limitType})`;
}
function Xn(t2, e) {
  return e.isFoundDocument() && function(t3, e2) {
    const n = e2.key.path;
    return null !== t3.collectionGroup ? e2.key.hasCollectionId(t3.collectionGroup) && t3.path.isPrefixOf(n) : ct.isDocumentKey(t3.path) ? t3.path.isEqual(n) : t3.path.isImmediateParentOf(n);
  }(t2, e) && function(t3, e2) {
    for (const n of zn(t3))
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
      const s = cn(t4, e3, n);
      return t4.inclusive ? s <= 0 : s < 0;
    }(t3.startAt, zn(t3), e2))
      return false;
    if (t3.endAt && !function(t4, e3, n) {
      const s = cn(t4, e3, n);
      return t4.inclusive ? s >= 0 : s > 0;
    }(t3.endAt, zn(t3), e2))
      return false;
    return true;
  }(t2, e);
}
function ts(t2) {
  return t2.collectionGroup || (t2.path.length % 2 == 1 ? t2.path.lastSegment() : t2.path.get(t2.path.length - 2));
}
function es(t2) {
  return (e, n) => {
    let s = false;
    for (const i of zn(t2)) {
      const t3 = ns(i, e, n);
      if (0 !== t3)
        return t3;
      s = s || i.field.isKeyField();
    }
    return 0;
  };
}
function ns(t2, e, n) {
  const s = t2.field.isKeyField() ? ct.comparator(e.key, n.key) : function(t3, e2, n2) {
    const s2 = e2.data.field(t3), i = n2.data.field(t3);
    return null !== s2 && null !== i ? qe(s2, i) : O();
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
class ss {
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
    _e(this.inner, (e, n) => {
      for (const [e2, s] of n)
        t2(e2, s);
    });
  }
  isEmpty() {
    return me(this.inner);
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
const is = new ge(ct.comparator);
function rs() {
  return is;
}
const os = new ge(ct.comparator);
function us(...t2) {
  let e = os;
  for (const n of t2)
    e = e.insert(n.key, n);
  return e;
}
function cs(t2) {
  let e = os;
  return t2.forEach((t3, n) => e = e.insert(t3, n.overlayedDocument)), e;
}
function as() {
  return ls();
}
function hs() {
  return ls();
}
function ls() {
  return new ss((t2) => t2.toString(), (t2, e) => t2.isEqual(e));
}
const fs = new ge(ct.comparator);
const ds = new Ie(ct.comparator);
function ws(...t2) {
  let e = ds;
  for (const n of t2)
    e = e.add(n);
  return e;
}
const _s = new Ie(X);
function ms() {
  return _s;
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
function gs(t2, e) {
  if (t2.useProto3Json) {
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
    doubleValue: Mt(e) ? "-0" : e
  };
}
function ys(t2) {
  return {
    integerValue: "" + t2
  };
}
function ps(t2, e) {
  return Ft(e) ? ys(e) : gs(t2, e);
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
class Is {
  constructor() {
    this._ = void 0;
  }
}
function Ts(t2, e, n) {
  return t2 instanceof Rs ? function(t3, e2) {
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
  }(n, e) : t2 instanceof vs ? bs(t2, e) : t2 instanceof Ps ? Vs(t2, e) : function(t3, e2) {
    const n2 = As(t3, e2), s = Ds(n2) + Ds(t3._t);
    return ze(n2) && ze(t3._t) ? ys(s) : gs(t3.serializer, s);
  }(t2, e);
}
function Es(t2, e, n) {
  return t2 instanceof vs ? bs(t2, e) : t2 instanceof Ps ? Vs(t2, e) : n;
}
function As(t2, e) {
  return t2 instanceof Ss ? ze(n = e) || function(t3) {
    return !!t3 && "doubleValue" in t3;
  }(n) ? e : {
    integerValue: 0
  } : null;
  var n;
}
class Rs extends Is {
}
class vs extends Is {
  constructor(t2) {
    super(), this.elements = t2;
  }
}
function bs(t2, e) {
  const n = Cs(e);
  for (const e2 of t2.elements)
    n.some((t3) => Be(t3, e2)) || n.push(e2);
  return {
    arrayValue: {
      values: n
    }
  };
}
class Ps extends Is {
  constructor(t2) {
    super(), this.elements = t2;
  }
}
function Vs(t2, e) {
  let n = Cs(e);
  for (const e2 of t2.elements)
    n = n.filter((t3) => !Be(t3, e2));
  return {
    arrayValue: {
      values: n
    }
  };
}
class Ss extends Is {
  constructor(t2, e) {
    super(), this.serializer = t2, this._t = e;
  }
}
function Ds(t2) {
  return Se(t2.integerValue || t2.doubleValue);
}
function Cs(t2) {
  return je(t2) && t2.arrayValue.values ? t2.arrayValue.values.slice() : [];
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
class xs {
  constructor(t2, e) {
    this.field = t2, this.transform = e;
  }
}
function Ns(t2, e) {
  return t2.field.isEqual(e.field) && function(t3, e2) {
    return t3 instanceof vs && e2 instanceof vs || t3 instanceof Ps && e2 instanceof Ps ? tt(t3.elements, e2.elements, Be) : t3 instanceof Ss && e2 instanceof Ss ? Be(t3._t, e2._t) : t3 instanceof Rs && e2 instanceof Rs;
  }(t2.transform, e.transform);
}
class ks {
  constructor(t2, e) {
    this.version = t2, this.transformResults = e;
  }
}
class Os {
  constructor(t2, e) {
    this.updateTime = t2, this.exists = e;
  }
  static none() {
    return new Os();
  }
  static exists(t2) {
    return new Os(void 0, t2);
  }
  static updateTime(t2) {
    return new Os(t2);
  }
  get isNone() {
    return void 0 === this.updateTime && void 0 === this.exists;
  }
  isEqual(t2) {
    return this.exists === t2.exists && (this.updateTime ? !!t2.updateTime && this.updateTime.isEqual(t2.updateTime) : !t2.updateTime);
  }
}
function $s(t2, e) {
  return void 0 !== t2.updateTime ? e.isFoundDocument() && e.version.isEqual(t2.updateTime) : void 0 === t2.exists || t2.exists === e.isFoundDocument();
}
class Ms {
}
function Fs(t2, e) {
  if (!t2.hasLocalMutations || e && 0 === e.fields.length)
    return null;
  if (null === e)
    return t2.isNoDocument() ? new Ws(t2.key, Os.none()) : new Ks(t2.key, t2.data, Os.none());
  {
    const n = t2.data, s = sn.empty();
    let i = new Ie(ut.comparator);
    for (let t3 of e.fields)
      if (!i.has(t3)) {
        let e2 = n.field(t3);
        null === e2 && t3.length > 1 && (t3 = t3.popLast(), e2 = n.field(t3)), null === e2 ? s.delete(t3) : s.set(t3, e2), i = i.add(t3);
      }
    return new Gs(t2.key, s, new Ae(i.toArray()), Os.none());
  }
}
function Bs(t2, e, n) {
  t2 instanceof Ks ? function(t3, e2, n2) {
    const s = t3.value.clone(), i = zs(t3.fieldTransforms, e2, n2.transformResults);
    s.setAll(i), e2.convertToFoundDocument(n2.version, s).setHasCommittedMutations();
  }(t2, e, n) : t2 instanceof Gs ? function(t3, e2, n2) {
    if (!$s(t3.precondition, e2))
      return void e2.convertToUnknownDocument(n2.version);
    const s = zs(t3.fieldTransforms, e2, n2.transformResults), i = e2.data;
    i.setAll(Qs(t3)), i.setAll(s), e2.convertToFoundDocument(n2.version, i).setHasCommittedMutations();
  }(t2, e, n) : function(t3, e2, n2) {
    e2.convertToNoDocument(n2.version).setHasCommittedMutations();
  }(0, e, n);
}
function Ls(t2, e, n, s) {
  return t2 instanceof Ks ? function(t3, e2, n2, s2) {
    if (!$s(t3.precondition, e2))
      return n2;
    const i = t3.value.clone(), r = js(t3.fieldTransforms, s2, e2);
    return i.setAll(r), e2.convertToFoundDocument(e2.version, i).setHasLocalMutations(), null;
  }(t2, e, n, s) : t2 instanceof Gs ? function(t3, e2, n2, s2) {
    if (!$s(t3.precondition, e2))
      return n2;
    const i = js(t3.fieldTransforms, s2, e2), r = e2.data;
    if (r.setAll(Qs(t3)), r.setAll(i), e2.convertToFoundDocument(e2.version, r).setHasLocalMutations(), null === n2)
      return null;
    return n2.unionWith(t3.fieldMask.fields).unionWith(t3.fieldTransforms.map((t4) => t4.field));
  }(t2, e, n, s) : function(t3, e2, n2) {
    if ($s(t3.precondition, e2))
      return e2.convertToNoDocument(e2.version).setHasLocalMutations(), null;
    return n2;
  }(t2, e, n);
}
function qs(t2, e) {
  let n = null;
  for (const s of t2.fieldTransforms) {
    const t3 = e.data.field(s.field), i = As(s.transform, t3 || null);
    null != i && (null === n && (n = sn.empty()), n.set(s.field, i));
  }
  return n || null;
}
function Us(t2, e) {
  return t2.type === e.type && (!!t2.key.isEqual(e.key) && (!!t2.precondition.isEqual(e.precondition) && (!!function(t3, e2) {
    return void 0 === t3 && void 0 === e2 || !(!t3 || !e2) && tt(t3, e2, (t4, e3) => Ns(t4, e3));
  }(t2.fieldTransforms, e.fieldTransforms) && (0 === t2.type ? t2.value.isEqual(e.value) : 1 !== t2.type || t2.data.isEqual(e.data) && t2.fieldMask.isEqual(e.fieldMask)))));
}
class Ks extends Ms {
  constructor(t2, e, n, s = []) {
    super(), this.key = t2, this.value = e, this.precondition = n, this.fieldTransforms = s, this.type = 0;
  }
  getFieldMask() {
    return null;
  }
}
class Gs extends Ms {
  constructor(t2, e, n, s, i = []) {
    super(), this.key = t2, this.data = e, this.fieldMask = n, this.precondition = s, this.fieldTransforms = i, this.type = 1;
  }
  getFieldMask() {
    return this.fieldMask;
  }
}
function Qs(t2) {
  const e = /* @__PURE__ */ new Map();
  return t2.fieldMask.fields.forEach((n) => {
    if (!n.isEmpty()) {
      const s = t2.data.field(n);
      e.set(n, s);
    }
  }), e;
}
function zs(t2, e, n) {
  const s = /* @__PURE__ */ new Map();
  $(t2.length === n.length);
  for (let i = 0; i < n.length; i++) {
    const r = t2[i], o = r.transform, u = e.data.field(r.field);
    s.set(r.field, Es(o, u, n[i]));
  }
  return s;
}
function js(t2, e, n) {
  const s = /* @__PURE__ */ new Map();
  for (const i of t2) {
    const t3 = i.transform, r = n.data.field(i.field);
    s.set(i.field, Ts(t3, r, e));
  }
  return s;
}
class Ws extends Ms {
  constructor(t2, e) {
    super(), this.key = t2, this.precondition = e, this.type = 2, this.fieldTransforms = [];
  }
  getFieldMask() {
    return null;
  }
}
class Hs extends Ms {
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
class Js {
  constructor(t2, e, n, s) {
    this.batchId = t2, this.localWriteTime = e, this.baseMutations = n, this.mutations = s;
  }
  applyToRemoteDocument(t2, e) {
    const n = e.mutationResults;
    for (let e2 = 0; e2 < this.mutations.length; e2++) {
      const s = this.mutations[e2];
      if (s.key.isEqual(t2.key)) {
        Bs(s, t2, n[e2]);
      }
    }
  }
  applyToLocalView(t2, e) {
    for (const n of this.baseMutations)
      n.key.isEqual(t2.key) && (e = Ls(n, t2, e, this.localWriteTime));
    for (const n of this.mutations)
      n.key.isEqual(t2.key) && (e = Ls(n, t2, e, this.localWriteTime));
    return e;
  }
  applyToLocalDocumentSet(t2, e) {
    const n = hs();
    return this.mutations.forEach((s) => {
      const i = t2.get(s.key), r = i.overlayedDocument;
      let o = this.applyToLocalView(r, i.mutatedFields);
      o = e.has(s.key) ? null : o;
      const u = Fs(r, o);
      null !== u && n.set(s.key, u), r.isValidDocument() || r.convertToNoDocument(st.min());
    }), n;
  }
  keys() {
    return this.mutations.reduce((t2, e) => t2.add(e.key), ws());
  }
  isEqual(t2) {
    return this.batchId === t2.batchId && tt(this.mutations, t2.mutations, (t3, e) => Us(t3, e)) && tt(this.baseMutations, t2.baseMutations, (t3, e) => Us(t3, e));
  }
}
class Ys {
  constructor(t2, e, n, s) {
    this.batch = t2, this.commitVersion = e, this.mutationResults = n, this.docVersions = s;
  }
  static from(t2, e, n) {
    $(t2.mutations.length === n.length);
    let s = fs;
    const i = t2.mutations;
    for (let t3 = 0; t3 < i.length; t3++)
      s = s.insert(i[t3].key, n[t3].version);
    return new Ys(t2, e, n, s);
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
class Zs {
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
class ni {
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
var si, ii;
function ri(t2) {
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
function oi(t2) {
  if (void 0 === t2)
    return x("GRPC error has no .code"), B.UNKNOWN;
  switch (t2) {
    case si.OK:
      return B.OK;
    case si.CANCELLED:
      return B.CANCELLED;
    case si.UNKNOWN:
      return B.UNKNOWN;
    case si.DEADLINE_EXCEEDED:
      return B.DEADLINE_EXCEEDED;
    case si.RESOURCE_EXHAUSTED:
      return B.RESOURCE_EXHAUSTED;
    case si.INTERNAL:
      return B.INTERNAL;
    case si.UNAVAILABLE:
      return B.UNAVAILABLE;
    case si.UNAUTHENTICATED:
      return B.UNAUTHENTICATED;
    case si.INVALID_ARGUMENT:
      return B.INVALID_ARGUMENT;
    case si.NOT_FOUND:
      return B.NOT_FOUND;
    case si.ALREADY_EXISTS:
      return B.ALREADY_EXISTS;
    case si.PERMISSION_DENIED:
      return B.PERMISSION_DENIED;
    case si.FAILED_PRECONDITION:
      return B.FAILED_PRECONDITION;
    case si.ABORTED:
      return B.ABORTED;
    case si.OUT_OF_RANGE:
      return B.OUT_OF_RANGE;
    case si.UNIMPLEMENTED:
      return B.UNIMPLEMENTED;
    case si.DATA_LOSS:
      return B.DATA_LOSS;
    default:
      return O();
  }
}
(ii = si || (si = {}))[ii.OK = 0] = "OK", ii[ii.CANCELLED = 1] = "CANCELLED", ii[ii.UNKNOWN = 2] = "UNKNOWN", ii[ii.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", ii[ii.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", ii[ii.NOT_FOUND = 5] = "NOT_FOUND", ii[ii.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", ii[ii.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", ii[ii.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", ii[ii.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", ii[ii.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", ii[ii.ABORTED = 10] = "ABORTED", ii[ii.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", ii[ii.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", ii[ii.INTERNAL = 13] = "INTERNAL", ii[ii.UNAVAILABLE = 14] = "UNAVAILABLE", ii[ii.DATA_LOSS = 15] = "DATA_LOSS";
/**
 * @license
 * Copyright 2023 Google LLC
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
class ui {
  constructor() {
    this.onExistenceFilterMismatchCallbacks = /* @__PURE__ */ new Map();
  }
  static get instance() {
    return ci;
  }
  static getOrCreateInstance() {
    return null === ci && (ci = new ui()), ci;
  }
  onExistenceFilterMismatch(t2) {
    const e = Symbol();
    return this.onExistenceFilterMismatchCallbacks.set(e, t2), () => this.onExistenceFilterMismatchCallbacks.delete(e);
  }
  notifyOnExistenceFilterMismatch(t2) {
    this.onExistenceFilterMismatchCallbacks.forEach((e) => e(t2));
  }
}
let ci = null;
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
class ai {
  constructor(t2, e, n, s, i) {
    this.snapshotVersion = t2, this.targetChanges = e, this.targetMismatches = n, this.documentUpdates = s, this.resolvedLimboDocuments = i;
  }
  static createSynthesizedRemoteEventForCurrentChange(t2, e, n) {
    const s = /* @__PURE__ */ new Map();
    return s.set(t2, hi.createSynthesizedTargetChangeForCurrentChange(t2, e, n)), new ai(st.min(), s, ms(), rs(), ws());
  }
}
class hi {
  constructor(t2, e, n, s, i) {
    this.resumeToken = t2, this.current = e, this.addedDocuments = n, this.modifiedDocuments = s, this.removedDocuments = i;
  }
  static createSynthesizedTargetChangeForCurrentChange(t2, e, n) {
    return new hi(n, e, ws(), ws(), ws());
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
class li {
  constructor(t2, e, n, s) {
    this.It = t2, this.removedTargetIds = e, this.key = n, this.Tt = s;
  }
}
class fi {
  constructor(t2, e) {
    this.targetId = t2, this.Et = e;
  }
}
class di {
  constructor(t2, e, n = be.EMPTY_BYTE_STRING, s = null) {
    this.state = t2, this.targetIds = e, this.resumeToken = n, this.cause = s;
  }
}
class wi {
  constructor() {
    this.At = 0, this.Rt = gi(), this.vt = be.EMPTY_BYTE_STRING, this.bt = false, this.Pt = true;
  }
  get current() {
    return this.bt;
  }
  get resumeToken() {
    return this.vt;
  }
  get Vt() {
    return 0 !== this.At;
  }
  get St() {
    return this.Pt;
  }
  Dt(t2) {
    t2.approximateByteSize() > 0 && (this.Pt = true, this.vt = t2);
  }
  Ct() {
    let t2 = ws(), e = ws(), n = ws();
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
    }), new hi(this.vt, this.bt, t2, e, n);
  }
  xt() {
    this.Pt = false, this.Rt = gi();
  }
  Nt(t2, e) {
    this.Pt = true, this.Rt = this.Rt.insert(t2, e);
  }
  kt(t2) {
    this.Pt = true, this.Rt = this.Rt.remove(t2);
  }
  Ot() {
    this.At += 1;
  }
  $t() {
    this.At -= 1;
  }
  Mt() {
    this.Pt = true, this.bt = true;
  }
}
class _i {
  constructor(t2) {
    this.Ft = t2, this.Bt = /* @__PURE__ */ new Map(), this.Lt = rs(), this.qt = mi(), this.Ut = new Ie(X);
  }
  Kt(t2) {
    for (const e of t2.It)
      t2.Tt && t2.Tt.isFoundDocument() ? this.Gt(e, t2.Tt) : this.Qt(e, t2.key, t2.Tt);
    for (const e of t2.removedTargetIds)
      this.Qt(e, t2.key, t2.Tt);
  }
  zt(t2) {
    this.forEachTarget(t2, (e) => {
      const n = this.jt(e);
      switch (t2.state) {
        case 0:
          this.Wt(e) && n.Dt(t2.resumeToken);
          break;
        case 1:
          n.$t(), n.Vt || n.xt(), n.Dt(t2.resumeToken);
          break;
        case 2:
          n.$t(), n.Vt || this.removeTarget(e);
          break;
        case 3:
          this.Wt(e) && (n.Mt(), n.Dt(t2.resumeToken));
          break;
        case 4:
          this.Wt(e) && (this.Ht(e), n.Dt(t2.resumeToken));
          break;
        default:
          O();
      }
    });
  }
  forEachTarget(t2, e) {
    t2.targetIds.length > 0 ? t2.targetIds.forEach(e) : this.Bt.forEach((t3, n) => {
      this.Wt(n) && e(n);
    });
  }
  Jt(t2) {
    var e;
    const n = t2.targetId, s = t2.Et.count, i = this.Yt(n);
    if (i) {
      const r = i.target;
      if (On(r))
        if (0 === s) {
          const t3 = new ct(r.path);
          this.Qt(n, t3, on.newNoDocument(t3, st.min()));
        } else
          $(1 === s);
      else {
        const i2 = this.Zt(n);
        i2 !== s && (this.Ht(n), this.Ut = this.Ut.add(n), null === (e = ui.instance) || void 0 === e || e.notifyOnExistenceFilterMismatch({
          localCacheCount: i2,
          existenceFilterCount: t2.Et.count
        }));
      }
    }
  }
  Xt(t2) {
    const e = /* @__PURE__ */ new Map();
    this.Bt.forEach((n2, s2) => {
      const i = this.Yt(s2);
      if (i) {
        if (n2.current && On(i.target)) {
          const e2 = new ct(i.target.path);
          null !== this.Lt.get(e2) || this.te(s2, e2) || this.Qt(s2, e2, on.newNoDocument(e2, t2));
        }
        n2.St && (e.set(s2, n2.Ct()), n2.xt());
      }
    });
    let n = ws();
    this.qt.forEach((t3, e2) => {
      let s2 = true;
      e2.forEachWhile((t4) => {
        const e3 = this.Yt(t4);
        return !e3 || 2 === e3.purpose || (s2 = false, false);
      }), s2 && (n = n.add(t3));
    }), this.Lt.forEach((e2, n2) => n2.setReadTime(t2));
    const s = new ai(t2, e, this.Ut, this.Lt, n);
    return this.Lt = rs(), this.qt = mi(), this.Ut = new Ie(X), s;
  }
  Gt(t2, e) {
    if (!this.Wt(t2))
      return;
    const n = this.te(t2, e.key) ? 2 : 0;
    this.jt(t2).Nt(e.key, n), this.Lt = this.Lt.insert(e.key, e), this.qt = this.qt.insert(e.key, this.ee(e.key).add(t2));
  }
  Qt(t2, e, n) {
    if (!this.Wt(t2))
      return;
    const s = this.jt(t2);
    this.te(t2, e) ? s.Nt(e, 1) : s.kt(e), this.qt = this.qt.insert(e, this.ee(e).delete(t2)), n && (this.Lt = this.Lt.insert(e, n));
  }
  removeTarget(t2) {
    this.Bt.delete(t2);
  }
  Zt(t2) {
    const e = this.jt(t2).Ct();
    return this.Ft.getRemoteKeysForTarget(t2).size + e.addedDocuments.size - e.removedDocuments.size;
  }
  Ot(t2) {
    this.jt(t2).Ot();
  }
  jt(t2) {
    let e = this.Bt.get(t2);
    return e || (e = new wi(), this.Bt.set(t2, e)), e;
  }
  ee(t2) {
    let e = this.qt.get(t2);
    return e || (e = new Ie(X), this.qt = this.qt.insert(t2, e)), e;
  }
  Wt(t2) {
    const e = null !== this.Yt(t2);
    return e || C("WatchChangeAggregator", "Detected inactive target", t2), e;
  }
  Yt(t2) {
    const e = this.Bt.get(t2);
    return e && e.Vt ? null : this.Ft.ne(t2);
  }
  Ht(t2) {
    this.Bt.set(t2, new wi());
    this.Ft.getRemoteKeysForTarget(t2).forEach((e) => {
      this.Qt(t2, e, null);
    });
  }
  te(t2, e) {
    return this.Ft.getRemoteKeysForTarget(t2).has(e);
  }
}
function mi() {
  return new ge(ct.comparator);
}
function gi() {
  return new ge(ct.comparator);
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
const yi = (() => {
  const t2 = {
    asc: "ASCENDING",
    desc: "DESCENDING"
  };
  return t2;
})(), pi = (() => {
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
})(), Ii = (() => {
  const t2 = {
    and: "AND",
    or: "OR"
  };
  return t2;
})();
class Ti {
  constructor(t2, e) {
    this.databaseId = t2, this.useProto3Json = e;
  }
}
function Ei(t2, e) {
  if (t2.useProto3Json) {
    return `${new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + e.nanoseconds).slice(-9)}Z`;
  }
  return {
    seconds: "" + e.seconds,
    nanos: e.nanoseconds
  };
}
function Ai(t2, e) {
  return t2.useProto3Json ? e.toBase64() : e.toUint8Array();
}
function Ri(t2, e) {
  return Ei(t2, e.toTimestamp());
}
function vi(t2) {
  return $(!!t2), st.fromTimestamp(function(t3) {
    const e = Ve(t3);
    return new nt(e.seconds, e.nanos);
  }(t2));
}
function bi(t2, e) {
  return function(t3) {
    return new rt(["projects", t3.projectId, "databases", t3.database]);
  }(t2).child("documents").child(e).canonicalString();
}
function Pi(t2) {
  const e = rt.fromString(t2);
  return $(Xi(e)), e;
}
function Vi(t2, e) {
  return bi(t2.databaseId, e.path);
}
function Si(t2, e) {
  const n = Pi(e);
  if (n.get(1) !== t2.databaseId.projectId)
    throw new L(B.INVALID_ARGUMENT, "Tried to deserialize key from different project: " + n.get(1) + " vs " + t2.databaseId.projectId);
  if (n.get(3) !== t2.databaseId.database)
    throw new L(B.INVALID_ARGUMENT, "Tried to deserialize key from different database: " + n.get(3) + " vs " + t2.databaseId.database);
  return new ct(Ni(n));
}
function Di(t2, e) {
  return bi(t2.databaseId, e);
}
function Ci(t2) {
  const e = Pi(t2);
  return 4 === e.length ? rt.emptyPath() : Ni(e);
}
function xi(t2) {
  return new rt(["projects", t2.databaseId.projectId, "databases", t2.databaseId.database]).canonicalString();
}
function Ni(t2) {
  return $(t2.length > 4 && "documents" === t2.get(4)), t2.popFirst(5);
}
function ki(t2, e, n) {
  return {
    name: Vi(t2, e),
    fields: n.value.mapValue.fields
  };
}
function Mi(t2, e) {
  let n;
  if ("targetChange" in e) {
    e.targetChange;
    const s = function(t3) {
      return "NO_CHANGE" === t3 ? 0 : "ADD" === t3 ? 1 : "REMOVE" === t3 ? 2 : "CURRENT" === t3 ? 3 : "RESET" === t3 ? 4 : O();
    }(e.targetChange.targetChangeType || "NO_CHANGE"), i = e.targetChange.targetIds || [], r = function(t3, e2) {
      return t3.useProto3Json ? ($(void 0 === e2 || "string" == typeof e2), be.fromBase64String(e2 || "")) : ($(void 0 === e2 || e2 instanceof Uint8Array), be.fromUint8Array(e2 || new Uint8Array()));
    }(t2, e.targetChange.resumeToken), o = e.targetChange.cause, u = o && function(t3) {
      const e2 = void 0 === t3.code ? B.UNKNOWN : oi(t3.code);
      return new L(e2, t3.message || "");
    }(o);
    n = new di(s, i, r, u || null);
  } else if ("documentChange" in e) {
    e.documentChange;
    const s = e.documentChange;
    s.document, s.document.name, s.document.updateTime;
    const i = Si(t2, s.document.name), r = vi(s.document.updateTime), o = s.document.createTime ? vi(s.document.createTime) : st.min(), u = new sn({
      mapValue: {
        fields: s.document.fields
      }
    }), c = on.newFoundDocument(i, r, o, u), a = s.targetIds || [], h = s.removedTargetIds || [];
    n = new li(a, h, c.key, c);
  } else if ("documentDelete" in e) {
    e.documentDelete;
    const s = e.documentDelete;
    s.document;
    const i = Si(t2, s.document), r = s.readTime ? vi(s.readTime) : st.min(), o = on.newNoDocument(i, r), u = s.removedTargetIds || [];
    n = new li([], u, o.key, o);
  } else if ("documentRemove" in e) {
    e.documentRemove;
    const s = e.documentRemove;
    s.document;
    const i = Si(t2, s.document), r = s.removedTargetIds || [];
    n = new li([], r, i, null);
  } else {
    if (!("filter" in e))
      return O();
    {
      e.filter;
      const t3 = e.filter;
      t3.targetId;
      const s = t3.count || 0, i = new ni(s), r = t3.targetId;
      n = new fi(r, i);
    }
  }
  return n;
}
function Fi(t2, e) {
  let n;
  if (e instanceof Ks)
    n = {
      update: ki(t2, e.key, e.value)
    };
  else if (e instanceof Ws)
    n = {
      delete: Vi(t2, e.key)
    };
  else if (e instanceof Gs)
    n = {
      update: ki(t2, e.key, e.data),
      updateMask: Zi(e.fieldMask)
    };
  else {
    if (!(e instanceof Hs))
      return O();
    n = {
      verify: Vi(t2, e.key)
    };
  }
  return e.fieldTransforms.length > 0 && (n.updateTransforms = e.fieldTransforms.map((t3) => function(t4, e2) {
    const n2 = e2.transform;
    if (n2 instanceof Rs)
      return {
        fieldPath: e2.field.canonicalString(),
        setToServerValue: "REQUEST_TIME"
      };
    if (n2 instanceof vs)
      return {
        fieldPath: e2.field.canonicalString(),
        appendMissingElements: {
          values: n2.elements
        }
      };
    if (n2 instanceof Ps)
      return {
        fieldPath: e2.field.canonicalString(),
        removeAllFromArray: {
          values: n2.elements
        }
      };
    if (n2 instanceof Ss)
      return {
        fieldPath: e2.field.canonicalString(),
        increment: n2._t
      };
    throw O();
  }(0, t3))), e.precondition.isNone || (n.currentDocument = function(t3, e2) {
    return void 0 !== e2.updateTime ? {
      updateTime: Ri(t3, e2.updateTime)
    } : void 0 !== e2.exists ? {
      exists: e2.exists
    } : O();
  }(t2, e.precondition)), n;
}
function Li(t2, e) {
  return t2 && t2.length > 0 ? ($(void 0 !== e), t2.map((t3) => function(t4, e2) {
    let n = t4.updateTime ? vi(t4.updateTime) : vi(e2);
    return n.isEqual(st.min()) && (n = vi(e2)), new ks(n, t4.transformResults || []);
  }(t3, e))) : [];
}
function qi(t2, e) {
  return {
    documents: [Di(t2, e.path)]
  };
}
function Ui(t2, e) {
  const n = {
    structuredQuery: {}
  }, s = e.path;
  null !== e.collectionGroup ? (n.parent = Di(t2, s), n.structuredQuery.from = [{
    collectionId: e.collectionGroup,
    allDescendants: true
  }]) : (n.parent = Di(t2, s.popLast()), n.structuredQuery.from = [{
    collectionId: s.lastSegment()
  }]);
  const i = function(t3) {
    if (0 === t3.length)
      return;
    return Yi(wn.create(t3, "and"));
  }(e.filters);
  i && (n.structuredQuery.where = i);
  const r = function(t3) {
    if (0 === t3.length)
      return;
    return t3.map((t4) => function(t5) {
      return {
        field: Hi(t5.field),
        direction: zi(t5.dir)
      };
    }(t4));
  }(e.orderBy);
  r && (n.structuredQuery.orderBy = r);
  const o = function(t3, e2) {
    return t3.useProto3Json || $t(e2) ? e2 : {
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
function Ki(t2) {
  let e = Ci(t2.parent);
  const n = t2.structuredQuery, s = n.from ? n.from.length : 0;
  let i = null;
  if (s > 0) {
    $(1 === s);
    const t3 = n.from[0];
    t3.allDescendants ? i = t3.collectionId : e = e.child(t3.collectionId);
  }
  let r = [];
  n.where && (r = function(t3) {
    const e2 = Qi(t3);
    if (e2 instanceof wn && gn(e2))
      return e2.getFilters();
    return [e2];
  }(n.where));
  let o = [];
  n.orderBy && (o = n.orderBy.map((t3) => function(t4) {
    return new hn(
      Ji(t4.field),
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
    return e2 = "object" == typeof t3 ? t3.value : t3, $t(e2) ? null : e2;
  }(n.limit));
  let c = null;
  n.startAt && (c = function(t3) {
    const e2 = !!t3.before, n2 = t3.values || [];
    return new un(n2, e2);
  }(n.startAt));
  let a = null;
  return n.endAt && (a = function(t3) {
    const e2 = !t3.before, n2 = t3.values || [];
    return new un(n2, e2);
  }(n.endAt)), Ln(e, i, o, r, u, "F", c, a);
}
function Gi(t2, e) {
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
function Qi(t2) {
  return void 0 !== t2.unaryFilter ? function(t3) {
    switch (t3.unaryFilter.op) {
      case "IS_NAN":
        const e = Ji(t3.unaryFilter.field);
        return dn.create(e, "==", {
          doubleValue: NaN
        });
      case "IS_NULL":
        const n = Ji(t3.unaryFilter.field);
        return dn.create(n, "==", {
          nullValue: "NULL_VALUE"
        });
      case "IS_NOT_NAN":
        const s = Ji(t3.unaryFilter.field);
        return dn.create(s, "!=", {
          doubleValue: NaN
        });
      case "IS_NOT_NULL":
        const i = Ji(t3.unaryFilter.field);
        return dn.create(i, "!=", {
          nullValue: "NULL_VALUE"
        });
      default:
        return O();
    }
  }(t2) : void 0 !== t2.fieldFilter ? function(t3) {
    return dn.create(Ji(t3.fieldFilter.field), function(t4) {
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
    return wn.create(t3.compositeFilter.filters.map((t4) => Qi(t4)), function(t4) {
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
function zi(t2) {
  return yi[t2];
}
function ji(t2) {
  return pi[t2];
}
function Wi(t2) {
  return Ii[t2];
}
function Hi(t2) {
  return {
    fieldPath: t2.canonicalString()
  };
}
function Ji(t2) {
  return ut.fromServerFormat(t2.fieldPath);
}
function Yi(t2) {
  return t2 instanceof dn ? function(t3) {
    if ("==" === t3.op) {
      if (He(t3.value))
        return {
          unaryFilter: {
            field: Hi(t3.field),
            op: "IS_NAN"
          }
        };
      if (We(t3.value))
        return {
          unaryFilter: {
            field: Hi(t3.field),
            op: "IS_NULL"
          }
        };
    } else if ("!=" === t3.op) {
      if (He(t3.value))
        return {
          unaryFilter: {
            field: Hi(t3.field),
            op: "IS_NOT_NAN"
          }
        };
      if (We(t3.value))
        return {
          unaryFilter: {
            field: Hi(t3.field),
            op: "IS_NOT_NULL"
          }
        };
    }
    return {
      fieldFilter: {
        field: Hi(t3.field),
        op: ji(t3.op),
        value: t3.value
      }
    };
  }(t2) : t2 instanceof wn ? function(t3) {
    const e = t3.getFilters().map((t4) => Yi(t4));
    if (1 === e.length)
      return e[0];
    return {
      compositeFilter: {
        op: Wi(t3.op),
        filters: e
      }
    };
  }(t2) : O();
}
function Zi(t2) {
  const e = [];
  return t2.fields.forEach((t3) => e.push(t3.canonicalString())), {
    fieldPaths: e
  };
}
function Xi(t2) {
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
class tr {
  constructor(t2, e, n, s, i = st.min(), r = st.min(), o = be.EMPTY_BYTE_STRING) {
    this.target = t2, this.targetId = e, this.purpose = n, this.sequenceNumber = s, this.snapshotVersion = i, this.lastLimboFreeSnapshotVersion = r, this.resumeToken = o;
  }
  withSequenceNumber(t2) {
    return new tr(this.target, this.targetId, this.purpose, t2, this.snapshotVersion, this.lastLimboFreeSnapshotVersion, this.resumeToken);
  }
  withResumeToken(t2, e) {
    return new tr(this.target, this.targetId, this.purpose, this.sequenceNumber, e, this.lastLimboFreeSnapshotVersion, t2);
  }
  withLastLimboFreeSnapshotVersion(t2) {
    return new tr(this.target, this.targetId, this.purpose, this.sequenceNumber, this.snapshotVersion, t2, this.resumeToken);
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
class er {
  constructor(t2) {
    this.se = t2;
  }
}
function hr(t2) {
  const e = Ki({
    parent: t2.parent,
    structuredQuery: t2.structuredQuery
  });
  return "LAST" === t2.limitType ? Hn(e, e.limit, "L") : e;
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
class Br {
  constructor() {
    this.He = new Lr();
  }
  addToCollectionParentIndex(t2, e) {
    return this.He.add(e), At.resolve();
  }
  getCollectionParents(t2, e) {
    return At.resolve(this.He.getEntries(e));
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
class Lr {
  constructor() {
    this.index = {};
  }
  add(t2) {
    const e = t2.lastSegment(), n = t2.popLast(), s = this.index[e] || new Ie(rt.comparator), i = !s.has(n);
    return this.index[e] = s.add(n), i;
  }
  has(t2) {
    const e = t2.lastSegment(), n = t2.popLast(), s = this.index[e];
    return s && s.has(n);
  }
  getEntries(t2) {
    return (this.index[t2] || new Ie(rt.comparator)).toArray();
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
class so {
  constructor(t2) {
    this.Rn = t2;
  }
  next() {
    return this.Rn += 2, this.Rn;
  }
  static vn() {
    return new so(0);
  }
  static bn() {
    return new so(-1);
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
class _o {
  constructor() {
    this.changes = new ss((t2) => t2.toString(), (t2, e) => t2.isEqual(e)), this.changesApplied = false;
  }
  addEntry(t2) {
    this.assertNotApplied(), this.changes.set(t2.key, t2);
  }
  removeEntry(t2, e) {
    this.assertNotApplied(), this.changes.set(t2, on.newInvalidDocument(t2).setReadTime(e));
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
class Ro {
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
class vo {
  constructor(t2, e, n, s) {
    this.remoteDocumentCache = t2, this.mutationQueue = e, this.documentOverlayCache = n, this.indexManager = s;
  }
  getDocument(t2, e) {
    let n = null;
    return this.documentOverlayCache.getOverlay(t2, e).next((s) => (n = s, this.remoteDocumentCache.getEntry(t2, e))).next((t3) => (null !== n && Ls(n.mutation, t3, Ae.empty(), nt.now()), t3));
  }
  getDocuments(t2, e) {
    return this.remoteDocumentCache.getEntries(t2, e).next((e2) => this.getLocalViewOfDocuments(t2, e2, ws()).next(() => e2));
  }
  getLocalViewOfDocuments(t2, e, n = ws()) {
    const s = as();
    return this.populateOverlays(t2, s, e).next(() => this.computeViews(t2, e, s, n).next((t3) => {
      let e2 = us();
      return t3.forEach((t4, n2) => {
        e2 = e2.insert(t4, n2.overlayedDocument);
      }), e2;
    }));
  }
  getOverlayedDocuments(t2, e) {
    const n = as();
    return this.populateOverlays(t2, n, e).next(() => this.computeViews(t2, e, n, ws()));
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
    let i = rs();
    const r = ls(), o = ls();
    return e.forEach((t3, e2) => {
      const o2 = n.get(e2.key);
      s.has(e2.key) && (void 0 === o2 || o2.mutation instanceof Gs) ? i = i.insert(e2.key, e2) : void 0 !== o2 ? (r.set(e2.key, o2.mutation.getFieldMask()), Ls(o2.mutation, e2, o2.mutation.getFieldMask(), nt.now())) : r.set(e2.key, Ae.empty());
    }), this.recalculateAndSaveOverlays(t2, i).next((t3) => (t3.forEach((t4, e2) => r.set(t4, e2)), e.forEach((t4, e2) => {
      var n2;
      return o.set(t4, new Ro(e2, null !== (n2 = r.get(t4)) && void 0 !== n2 ? n2 : null));
    }), o));
  }
  recalculateAndSaveOverlays(t2, e) {
    const n = ls();
    let s = new ge((t3, e2) => t3 - e2), i = ws();
    return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t2, e).next((t3) => {
      for (const i2 of t3)
        i2.keys().forEach((t4) => {
          const r = e.get(t4);
          if (null === r)
            return;
          let o = n.get(t4) || Ae.empty();
          o = i2.applyToLocalView(r, o), n.set(t4, o);
          const u = (s.get(i2.batchId) || ws()).add(t4);
          s = s.insert(i2.batchId, u);
        });
    }).next(() => {
      const r = [], o = s.getReverseIterator();
      for (; o.hasNext(); ) {
        const s2 = o.getNext(), u = s2.key, c = s2.value, a = hs();
        c.forEach((t3) => {
          if (!i.has(t3)) {
            const s3 = Fs(e.get(t3), n.get(t3));
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
    }(e) ? this.getDocumentsMatchingDocumentQuery(t2, e.path) : Qn(e) ? this.getDocumentsMatchingCollectionGroupQuery(t2, e, n) : this.getDocumentsMatchingCollectionQuery(t2, e, n);
  }
  getNextDocuments(t2, e, n, s) {
    return this.remoteDocumentCache.getAllFromCollectionGroup(t2, e, n, s).next((i) => {
      const r = s - i.size > 0 ? this.documentOverlayCache.getOverlaysForCollectionGroup(t2, e, n.largestBatchId, s - i.size) : At.resolve(as());
      let o = -1, u = i;
      return r.next((e2) => At.forEach(e2, (e3, n2) => (o < n2.largestBatchId && (o = n2.largestBatchId), i.get(e3) ? At.resolve() : this.remoteDocumentCache.getEntry(t2, e3).next((t3) => {
        u = u.insert(e3, t3);
      }))).next(() => this.populateOverlays(t2, e2, i)).next(() => this.computeViews(t2, u, e2, ws())).next((t3) => ({
        batchId: o,
        changes: cs(t3)
      })));
    });
  }
  getDocumentsMatchingDocumentQuery(t2, e) {
    return this.getDocument(t2, new ct(e)).next((t3) => {
      let e2 = us();
      return t3.isFoundDocument() && (e2 = e2.insert(t3.key, t3)), e2;
    });
  }
  getDocumentsMatchingCollectionGroupQuery(t2, e, n) {
    const s = e.collectionGroup;
    let i = us();
    return this.indexManager.getCollectionParents(t2, s).next((r) => At.forEach(r, (r2) => {
      const o = function(t3, e2) {
        return new Bn(
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
        null === t3.get(s2) && (t3 = t3.insert(s2, on.newInvalidDocument(s2)));
      });
      let n2 = us();
      return t3.forEach((t4, i) => {
        const r = s.get(t4);
        void 0 !== r && Ls(r.mutation, i, Ae.empty(), nt.now()), Xn(e, i) && (n2 = n2.insert(t4, i));
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
class bo {
  constructor(t2) {
    this.serializer = t2, this.Zn = /* @__PURE__ */ new Map(), this.Xn = /* @__PURE__ */ new Map();
  }
  getBundleMetadata(t2, e) {
    return At.resolve(this.Zn.get(e));
  }
  saveBundleMetadata(t2, e) {
    var n;
    return this.Zn.set(e.id, {
      id: (n = e).id,
      version: n.version,
      createTime: vi(n.createTime)
    }), At.resolve();
  }
  getNamedQuery(t2, e) {
    return At.resolve(this.Xn.get(e));
  }
  saveNamedQuery(t2, e) {
    return this.Xn.set(e.name, function(t3) {
      return {
        name: t3.name,
        query: hr(t3.bundledQuery),
        readTime: vi(t3.readTime)
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
class Po {
  constructor() {
    this.overlays = new ge(ct.comparator), this.ts = /* @__PURE__ */ new Map();
  }
  getOverlay(t2, e) {
    return At.resolve(this.overlays.get(e));
  }
  getOverlays(t2, e) {
    const n = as();
    return At.forEach(e, (e2) => this.getOverlay(t2, e2).next((t3) => {
      null !== t3 && n.set(e2, t3);
    })).next(() => n);
  }
  saveOverlays(t2, e, n) {
    return n.forEach((n2, s) => {
      this.re(t2, e, s);
    }), At.resolve();
  }
  removeOverlaysForBatchId(t2, e, n) {
    const s = this.ts.get(n);
    return void 0 !== s && (s.forEach((t3) => this.overlays = this.overlays.remove(t3)), this.ts.delete(n)), At.resolve();
  }
  getOverlaysForCollection(t2, e, n) {
    const s = as(), i = e.length + 1, r = new ct(e.child("")), o = this.overlays.getIteratorFrom(r);
    for (; o.hasNext(); ) {
      const t3 = o.getNext().value, r2 = t3.getKey();
      if (!e.isPrefixOf(r2.path))
        break;
      r2.path.length === i && (t3.largestBatchId > n && s.set(t3.getKey(), t3));
    }
    return At.resolve(s);
  }
  getOverlaysForCollectionGroup(t2, e, n, s) {
    let i = new ge((t3, e2) => t3 - e2);
    const r = this.overlays.getIterator();
    for (; r.hasNext(); ) {
      const t3 = r.getNext().value;
      if (t3.getKey().getCollectionGroup() === e && t3.largestBatchId > n) {
        let e2 = i.get(t3.largestBatchId);
        null === e2 && (e2 = as(), i = i.insert(t3.largestBatchId, e2)), e2.set(t3.getKey(), t3);
      }
    }
    const o = as(), u = i.getIterator();
    for (; u.hasNext(); ) {
      if (u.getNext().value.forEach((t3, e2) => o.set(t3, e2)), o.size() >= s)
        break;
    }
    return At.resolve(o);
  }
  re(t2, e, n) {
    const s = this.overlays.get(n.key);
    if (null !== s) {
      const t3 = this.ts.get(s.largestBatchId).delete(n.key);
      this.ts.set(s.largestBatchId, t3);
    }
    this.overlays = this.overlays.insert(n.key, new Zs(e, n));
    let i = this.ts.get(e);
    void 0 === i && (i = ws(), this.ts.set(e, i)), this.ts.set(e, i.add(n.key));
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
  constructor() {
    this.es = new Ie(So.ns), this.ss = new Ie(So.rs);
  }
  isEmpty() {
    return this.es.isEmpty();
  }
  addReference(t2, e) {
    const n = new So(t2, e);
    this.es = this.es.add(n), this.ss = this.ss.add(n);
  }
  os(t2, e) {
    t2.forEach((t3) => this.addReference(t3, e));
  }
  removeReference(t2, e) {
    this.us(new So(t2, e));
  }
  cs(t2, e) {
    t2.forEach((t3) => this.removeReference(t3, e));
  }
  hs(t2) {
    const e = new ct(new rt([])), n = new So(e, t2), s = new So(e, t2 + 1), i = [];
    return this.ss.forEachInRange([n, s], (t3) => {
      this.us(t3), i.push(t3.key);
    }), i;
  }
  ls() {
    this.es.forEach((t2) => this.us(t2));
  }
  us(t2) {
    this.es = this.es.delete(t2), this.ss = this.ss.delete(t2);
  }
  fs(t2) {
    const e = new ct(new rt([])), n = new So(e, t2), s = new So(e, t2 + 1);
    let i = ws();
    return this.ss.forEachInRange([n, s], (t3) => {
      i = i.add(t3.key);
    }), i;
  }
  containsKey(t2) {
    const e = new So(t2, 0), n = this.es.firstAfterOrEqual(e);
    return null !== n && t2.isEqual(n.key);
  }
}
class So {
  constructor(t2, e) {
    this.key = t2, this.ds = e;
  }
  static ns(t2, e) {
    return ct.comparator(t2.key, e.key) || X(t2.ds, e.ds);
  }
  static rs(t2, e) {
    return X(t2.ds, e.ds) || ct.comparator(t2.key, e.key);
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
class Do {
  constructor(t2, e) {
    this.indexManager = t2, this.referenceDelegate = e, this.mutationQueue = [], this.ws = 1, this._s = new Ie(So.ns);
  }
  checkEmpty(t2) {
    return At.resolve(0 === this.mutationQueue.length);
  }
  addMutationBatch(t2, e, n, s) {
    const i = this.ws;
    this.ws++, this.mutationQueue.length > 0 && this.mutationQueue[this.mutationQueue.length - 1];
    const r = new Js(i, e, n, s);
    this.mutationQueue.push(r);
    for (const e2 of s)
      this._s = this._s.add(new So(e2.key, i)), this.indexManager.addToCollectionParentIndex(t2, e2.key.path.popLast());
    return At.resolve(r);
  }
  lookupMutationBatch(t2, e) {
    return At.resolve(this.gs(e));
  }
  getNextMutationBatchAfterBatchId(t2, e) {
    const n = e + 1, s = this.ys(n), i = s < 0 ? 0 : s;
    return At.resolve(this.mutationQueue.length > i ? this.mutationQueue[i] : null);
  }
  getHighestUnacknowledgedBatchId() {
    return At.resolve(0 === this.mutationQueue.length ? -1 : this.ws - 1);
  }
  getAllMutationBatches(t2) {
    return At.resolve(this.mutationQueue.slice());
  }
  getAllMutationBatchesAffectingDocumentKey(t2, e) {
    const n = new So(e, 0), s = new So(e, Number.POSITIVE_INFINITY), i = [];
    return this._s.forEachInRange([n, s], (t3) => {
      const e2 = this.gs(t3.ds);
      i.push(e2);
    }), At.resolve(i);
  }
  getAllMutationBatchesAffectingDocumentKeys(t2, e) {
    let n = new Ie(X);
    return e.forEach((t3) => {
      const e2 = new So(t3, 0), s = new So(t3, Number.POSITIVE_INFINITY);
      this._s.forEachInRange([e2, s], (t4) => {
        n = n.add(t4.ds);
      });
    }), At.resolve(this.ps(n));
  }
  getAllMutationBatchesAffectingQuery(t2, e) {
    const n = e.path, s = n.length + 1;
    let i = n;
    ct.isDocumentKey(i) || (i = i.child(""));
    const r = new So(new ct(i), 0);
    let o = new Ie(X);
    return this._s.forEachWhile((t3) => {
      const e2 = t3.key.path;
      return !!n.isPrefixOf(e2) && (e2.length === s && (o = o.add(t3.ds)), true);
    }, r), At.resolve(this.ps(o));
  }
  ps(t2) {
    const e = [];
    return t2.forEach((t3) => {
      const n = this.gs(t3);
      null !== n && e.push(n);
    }), e;
  }
  removeMutationBatch(t2, e) {
    $(0 === this.Is(e.batchId, "removed")), this.mutationQueue.shift();
    let n = this._s;
    return At.forEach(e.mutations, (s) => {
      const i = new So(s.key, e.batchId);
      return n = n.delete(i), this.referenceDelegate.markPotentiallyOrphaned(t2, s.key);
    }).next(() => {
      this._s = n;
    });
  }
  En(t2) {
  }
  containsKey(t2, e) {
    const n = new So(e, 0), s = this._s.firstAfterOrEqual(n);
    return At.resolve(e.isEqual(s && s.key));
  }
  performConsistencyCheck(t2) {
    return this.mutationQueue.length, At.resolve();
  }
  Is(t2, e) {
    return this.ys(t2);
  }
  ys(t2) {
    if (0 === this.mutationQueue.length)
      return 0;
    return t2 - this.mutationQueue[0].batchId;
  }
  gs(t2) {
    const e = this.ys(t2);
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
class Co {
  constructor(t2) {
    this.Ts = t2, this.docs = new ge(ct.comparator), this.size = 0;
  }
  setIndexManager(t2) {
    this.indexManager = t2;
  }
  addEntry(t2, e) {
    const n = e.key, s = this.docs.get(n), i = s ? s.size : 0, r = this.Ts(e);
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
    return At.resolve(n ? n.document.mutableCopy() : on.newInvalidDocument(e));
  }
  getEntries(t2, e) {
    let n = rs();
    return e.forEach((t3) => {
      const e2 = this.docs.get(t3);
      n = n.insert(t3, e2 ? e2.document.mutableCopy() : on.newInvalidDocument(t3));
    }), At.resolve(n);
  }
  getDocumentsMatchingQuery(t2, e, n, s) {
    let i = rs();
    const r = e.path, o = new ct(r.child("")), u = this.docs.getIteratorFrom(o);
    for (; u.hasNext(); ) {
      const { key: t3, value: { document: o2 } } = u.getNext();
      if (!r.isPrefixOf(t3.path))
        break;
      t3.path.length > r.length + 1 || (pt(gt(o2), n) <= 0 || (s.has(o2.key) || Xn(e, o2)) && (i = i.insert(o2.key, o2.mutableCopy())));
    }
    return At.resolve(i);
  }
  getAllFromCollectionGroup(t2, e, n, s) {
    O();
  }
  Es(t2, e) {
    return At.forEach(this.docs, (t3) => e(t3));
  }
  newChangeBuffer(t2) {
    return new xo(this);
  }
  getSize(t2) {
    return At.resolve(this.size);
  }
}
class xo extends _o {
  constructor(t2) {
    super(), this.Jn = t2;
  }
  applyChanges(t2) {
    const e = [];
    return this.changes.forEach((n, s) => {
      s.isValidDocument() ? e.push(this.Jn.addEntry(t2, s)) : this.Jn.removeEntry(n);
    }), At.waitFor(e);
  }
  getFromCache(t2, e) {
    return this.Jn.getEntry(t2, e);
  }
  getAllFromCache(t2, e) {
    return this.Jn.getEntries(t2, e);
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
class No {
  constructor(t2) {
    this.persistence = t2, this.As = new ss((t3) => Nn(t3), kn), this.lastRemoteSnapshotVersion = st.min(), this.highestTargetId = 0, this.Rs = 0, this.vs = new Vo(), this.targetCount = 0, this.bs = so.vn();
  }
  forEachTarget(t2, e) {
    return this.As.forEach((t3, n) => e(n)), At.resolve();
  }
  getLastRemoteSnapshotVersion(t2) {
    return At.resolve(this.lastRemoteSnapshotVersion);
  }
  getHighestSequenceNumber(t2) {
    return At.resolve(this.Rs);
  }
  allocateTargetId(t2) {
    return this.highestTargetId = this.bs.next(), At.resolve(this.highestTargetId);
  }
  setTargetsMetadata(t2, e, n) {
    return n && (this.lastRemoteSnapshotVersion = n), e > this.Rs && (this.Rs = e), At.resolve();
  }
  Sn(t2) {
    this.As.set(t2.target, t2);
    const e = t2.targetId;
    e > this.highestTargetId && (this.bs = new so(e), this.highestTargetId = e), t2.sequenceNumber > this.Rs && (this.Rs = t2.sequenceNumber);
  }
  addTargetData(t2, e) {
    return this.Sn(e), this.targetCount += 1, At.resolve();
  }
  updateTargetData(t2, e) {
    return this.Sn(e), At.resolve();
  }
  removeTargetData(t2, e) {
    return this.As.delete(e.target), this.vs.hs(e.targetId), this.targetCount -= 1, At.resolve();
  }
  removeTargets(t2, e, n) {
    let s = 0;
    const i = [];
    return this.As.forEach((r, o) => {
      o.sequenceNumber <= e && null === n.get(o.targetId) && (this.As.delete(r), i.push(this.removeMatchingKeysForTargetId(t2, o.targetId)), s++);
    }), At.waitFor(i).next(() => s);
  }
  getTargetCount(t2) {
    return At.resolve(this.targetCount);
  }
  getTargetData(t2, e) {
    const n = this.As.get(e) || null;
    return At.resolve(n);
  }
  addMatchingKeys(t2, e, n) {
    return this.vs.os(e, n), At.resolve();
  }
  removeMatchingKeys(t2, e, n) {
    this.vs.cs(e, n);
    const s = this.persistence.referenceDelegate, i = [];
    return s && e.forEach((e2) => {
      i.push(s.markPotentiallyOrphaned(t2, e2));
    }), At.waitFor(i);
  }
  removeMatchingKeysForTargetId(t2, e) {
    return this.vs.hs(e), At.resolve();
  }
  getMatchingKeysForTargetId(t2, e) {
    const n = this.vs.fs(e);
    return At.resolve(n);
  }
  containsKey(t2, e) {
    return At.resolve(this.vs.containsKey(e));
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
class ko {
  constructor(t2, e) {
    this.Ps = {}, this.overlays = {}, this.Vs = new Ot(0), this.Ss = false, this.Ss = true, this.referenceDelegate = t2(this), this.Ds = new No(this);
    this.indexManager = new Br(), this.remoteDocumentCache = function(t3) {
      return new Co(t3);
    }((t3) => this.referenceDelegate.Cs(t3)), this.serializer = new er(e), this.xs = new bo(this.serializer);
  }
  start() {
    return Promise.resolve();
  }
  shutdown() {
    return this.Ss = false, Promise.resolve();
  }
  get started() {
    return this.Ss;
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
    return e || (e = new Po(), this.overlays[t2.toKey()] = e), e;
  }
  getMutationQueue(t2, e) {
    let n = this.Ps[t2.toKey()];
    return n || (n = new Do(e, this.referenceDelegate), this.Ps[t2.toKey()] = n), n;
  }
  getTargetCache() {
    return this.Ds;
  }
  getRemoteDocumentCache() {
    return this.remoteDocumentCache;
  }
  getBundleCache() {
    return this.xs;
  }
  runTransaction(t2, e, n) {
    C("MemoryPersistence", "Starting transaction:", t2);
    const s = new Oo(this.Vs.next());
    return this.referenceDelegate.Ns(), n(s).next((t3) => this.referenceDelegate.ks(s).next(() => t3)).toPromise().then((t3) => (s.raiseOnCommittedEvent(), t3));
  }
  Os(t2, e) {
    return At.or(Object.values(this.Ps).map((n) => () => n.containsKey(t2, e)));
  }
}
class Oo extends Tt {
  constructor(t2) {
    super(), this.currentSequenceNumber = t2;
  }
}
class $o {
  constructor(t2) {
    this.persistence = t2, this.$s = new Vo(), this.Ms = null;
  }
  static Fs(t2) {
    return new $o(t2);
  }
  get Bs() {
    if (this.Ms)
      return this.Ms;
    throw O();
  }
  addReference(t2, e, n) {
    return this.$s.addReference(n, e), this.Bs.delete(n.toString()), At.resolve();
  }
  removeReference(t2, e, n) {
    return this.$s.removeReference(n, e), this.Bs.add(n.toString()), At.resolve();
  }
  markPotentiallyOrphaned(t2, e) {
    return this.Bs.add(e.toString()), At.resolve();
  }
  removeTarget(t2, e) {
    this.$s.hs(e.targetId).forEach((t3) => this.Bs.add(t3.toString()));
    const n = this.persistence.getTargetCache();
    return n.getMatchingKeysForTargetId(t2, e.targetId).next((t3) => {
      t3.forEach((t4) => this.Bs.add(t4.toString()));
    }).next(() => n.removeTargetData(t2, e));
  }
  Ns() {
    this.Ms = /* @__PURE__ */ new Set();
  }
  ks(t2) {
    const e = this.persistence.getRemoteDocumentCache().newChangeBuffer();
    return At.forEach(this.Bs, (n) => {
      const s = ct.fromPath(n);
      return this.Ls(t2, s).next((t3) => {
        t3 || e.removeEntry(s, st.min());
      });
    }).next(() => (this.Ms = null, e.apply(t2)));
  }
  updateLimboDocument(t2, e) {
    return this.Ls(t2, e).next((t3) => {
      t3 ? this.Bs.delete(e.toString()) : this.Bs.add(e.toString());
    });
  }
  Cs(t2) {
    return 0;
  }
  Ls(t2, e) {
    return At.or([() => At.resolve(this.$s.containsKey(e)), () => this.persistence.getTargetCache().containsKey(t2, e), () => this.persistence.Os(t2, e)]);
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
class Go {
  constructor(t2, e, n, s) {
    this.targetId = t2, this.fromCache = e, this.Vi = n, this.Si = s;
  }
  static Di(t2, e) {
    let n = ws(), s = ws();
    for (const t3 of e.docChanges)
      switch (t3.type) {
        case 0:
          n = n.add(t3.doc.key);
          break;
        case 1:
          s = s.add(t3.doc.key);
      }
    return new Go(t2, e.fromCache, n, s);
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
class Qo {
  constructor() {
    this.Ci = false;
  }
  initialize(t2, e) {
    this.xi = t2, this.indexManager = e, this.Ci = true;
  }
  getDocumentsMatchingQuery(t2, e, n, s) {
    return this.Ni(t2, e).next((i) => i || this.ki(t2, e, s, n)).next((n2) => n2 || this.Oi(t2, e));
  }
  Ni(t2, e) {
    if (Un(e))
      return At.resolve(null);
    let n = jn(e);
    return this.indexManager.getIndexType(t2, n).next((s) => 0 === s ? null : (null !== e.limit && 1 === s && (e = Hn(e, null, "F"), n = jn(e)), this.indexManager.getDocumentsMatchingTarget(t2, n).next((s2) => {
      const i = ws(...s2);
      return this.xi.getDocuments(t2, i).next((s3) => this.indexManager.getMinOffset(t2, n).next((n2) => {
        const r = this.$i(e, s3);
        return this.Mi(e, r, i, n2.readTime) ? this.Ni(t2, Hn(e, null, "F")) : this.Fi(t2, r, e, n2);
      }));
    })));
  }
  ki(t2, e, n, s) {
    return Un(e) || s.isEqual(st.min()) ? this.Oi(t2, e) : this.xi.getDocuments(t2, n).next((i) => {
      const r = this.$i(e, i);
      return this.Mi(e, r, n, s) ? this.Oi(t2, e) : (S() <= LogLevel.DEBUG && C("QueryEngine", "Re-using previous result from %s to execute query: %s", s.toString(), Zn(e)), this.Fi(t2, r, e, mt(s, -1)));
    });
  }
  $i(t2, e) {
    let n = new Ie(es(t2));
    return e.forEach((e2, s) => {
      Xn(t2, s) && (n = n.add(s));
    }), n;
  }
  Mi(t2, e, n, s) {
    if (null === t2.limit)
      return false;
    if (n.size !== e.size)
      return true;
    const i = "F" === t2.limitType ? e.last() : e.first();
    return !!i && (i.hasPendingWrites || i.version.compareTo(s) > 0);
  }
  Oi(t2, e) {
    return S() <= LogLevel.DEBUG && C("QueryEngine", "Using full collection scan to execute query:", Zn(e)), this.xi.getDocumentsMatchingQuery(t2, e, yt.min());
  }
  Fi(t2, e, n, s) {
    return this.xi.getDocumentsMatchingQuery(t2, n, s).next((t3) => (e.forEach((e2) => {
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
class zo {
  constructor(t2, e, n, s) {
    this.persistence = t2, this.Bi = e, this.serializer = s, this.Li = new ge(X), this.qi = new ss((t3) => Nn(t3), kn), this.Ui = /* @__PURE__ */ new Map(), this.Ki = t2.getRemoteDocumentCache(), this.Ds = t2.getTargetCache(), this.xs = t2.getBundleCache(), this.Gi(n);
  }
  Gi(t2) {
    this.documentOverlayCache = this.persistence.getDocumentOverlayCache(t2), this.indexManager = this.persistence.getIndexManager(t2), this.mutationQueue = this.persistence.getMutationQueue(t2, this.indexManager), this.localDocuments = new vo(this.Ki, this.mutationQueue, this.documentOverlayCache, this.indexManager), this.Ki.setIndexManager(this.indexManager), this.Bi.initialize(this.localDocuments, this.indexManager);
  }
  collectGarbage(t2) {
    return this.persistence.runTransaction("Collect garbage", "readwrite-primary", (e) => t2.collect(e, this.Li));
  }
}
function jo(t2, e, n, s) {
  return new zo(t2, e, n, s);
}
async function Wo(t2, e) {
  const n = F(t2);
  return await n.persistence.runTransaction("Handle user change", "readonly", (t3) => {
    let s;
    return n.mutationQueue.getAllMutationBatches(t3).next((i) => (s = i, n.Gi(e), n.mutationQueue.getAllMutationBatches(t3))).next((e2) => {
      const i = [], r = [];
      let o = ws();
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
        Qi: t4,
        removedBatchIds: i,
        addedBatchIds: r
      }));
    });
  });
}
function Ho(t2, e) {
  const n = F(t2);
  return n.persistence.runTransaction("Acknowledge batch", "readwrite-primary", (t3) => {
    const s = e.batch.keys(), i = n.Ki.newChangeBuffer({
      trackRemovals: true
    });
    return function(t4, e2, n2, s2) {
      const i2 = n2.batch, r = i2.keys();
      let o = At.resolve();
      return r.forEach((t5) => {
        o = o.next(() => s2.getEntry(e2, t5)).next((e3) => {
          const r2 = n2.docVersions.get(t5);
          $(null !== r2), e3.version.compareTo(r2) < 0 && (i2.applyToRemoteDocument(e3, n2), e3.isValidDocument() && (e3.setReadTime(n2.commitVersion), s2.addEntry(e3)));
        });
      }), o.next(() => t4.mutationQueue.removeMutationBatch(e2, i2));
    }(n, t3, e, i).next(() => i.apply(t3)).next(() => n.mutationQueue.performConsistencyCheck(t3)).next(() => n.documentOverlayCache.removeOverlaysForBatchId(t3, s, e.batch.batchId)).next(() => n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t3, function(t4) {
      let e2 = ws();
      for (let n2 = 0; n2 < t4.mutationResults.length; ++n2) {
        t4.mutationResults[n2].transformResults.length > 0 && (e2 = e2.add(t4.batch.mutations[n2].key));
      }
      return e2;
    }(e))).next(() => n.localDocuments.getDocuments(t3, s));
  });
}
function Jo(t2) {
  const e = F(t2);
  return e.persistence.runTransaction("Get last remote snapshot version", "readonly", (t3) => e.Ds.getLastRemoteSnapshotVersion(t3));
}
function Yo(t2, e) {
  const n = F(t2), s = e.snapshotVersion;
  let i = n.Li;
  return n.persistence.runTransaction("Apply remote event", "readwrite-primary", (t3) => {
    const r = n.Ki.newChangeBuffer({
      trackRemovals: true
    });
    i = n.Li;
    const o = [];
    e.targetChanges.forEach((r2, u2) => {
      const c2 = i.get(u2);
      if (!c2)
        return;
      o.push(n.Ds.removeMatchingKeys(t3, r2.removedDocuments, u2).next(() => n.Ds.addMatchingKeys(t3, r2.addedDocuments, u2)));
      let a = c2.withSequenceNumber(t3.currentSequenceNumber);
      e.targetMismatches.has(u2) ? a = a.withResumeToken(be.EMPTY_BYTE_STRING, st.min()).withLastLimboFreeSnapshotVersion(st.min()) : r2.resumeToken.approximateByteSize() > 0 && (a = a.withResumeToken(r2.resumeToken, s)), i = i.insert(u2, a), function(t4, e2, n2) {
        if (0 === t4.resumeToken.approximateByteSize())
          return true;
        if (e2.snapshotVersion.toMicroseconds() - t4.snapshotVersion.toMicroseconds() >= 3e8)
          return true;
        return n2.addedDocuments.size + n2.modifiedDocuments.size + n2.removedDocuments.size > 0;
      }(c2, a, r2) && o.push(n.Ds.updateTargetData(t3, a));
    });
    let u = rs(), c = ws();
    if (e.documentUpdates.forEach((s2) => {
      e.resolvedLimboDocuments.has(s2) && o.push(n.persistence.referenceDelegate.updateLimboDocument(t3, s2));
    }), o.push(Zo(t3, r, e.documentUpdates).next((t4) => {
      u = t4.zi, c = t4.ji;
    })), !s.isEqual(st.min())) {
      const e2 = n.Ds.getLastRemoteSnapshotVersion(t3).next((e3) => n.Ds.setTargetsMetadata(t3, t3.currentSequenceNumber, s));
      o.push(e2);
    }
    return At.waitFor(o).next(() => r.apply(t3)).next(() => n.localDocuments.getLocalViewOfDocuments(t3, u, c)).next(() => u);
  }).then((t3) => (n.Li = i, t3));
}
function Zo(t2, e, n) {
  let s = ws(), i = ws();
  return n.forEach((t3) => s = s.add(t3)), e.getEntries(t2, s).next((t3) => {
    let s2 = rs();
    return n.forEach((n2, r) => {
      const o = t3.get(n2);
      r.isFoundDocument() !== o.isFoundDocument() && (i = i.add(n2)), r.isNoDocument() && r.version.isEqual(st.min()) ? (e.removeEntry(n2, r.readTime), s2 = s2.insert(n2, r)) : !o.isValidDocument() || r.version.compareTo(o.version) > 0 || 0 === r.version.compareTo(o.version) && o.hasPendingWrites ? (e.addEntry(r), s2 = s2.insert(n2, r)) : C("LocalStore", "Ignoring outdated watch update for ", n2, ". Current version:", o.version, " Watch version:", r.version);
    }), {
      zi: s2,
      ji: i
    };
  });
}
function Xo(t2, e) {
  const n = F(t2);
  return n.persistence.runTransaction("Get next mutation batch", "readonly", (t3) => (void 0 === e && (e = -1), n.mutationQueue.getNextMutationBatchAfterBatchId(t3, e)));
}
function tu(t2, e) {
  const n = F(t2);
  return n.persistence.runTransaction("Allocate target", "readwrite", (t3) => {
    let s;
    return n.Ds.getTargetData(t3, e).next((i) => i ? (s = i, At.resolve(s)) : n.Ds.allocateTargetId(t3).next((i2) => (s = new tr(e, i2, 0, t3.currentSequenceNumber), n.Ds.addTargetData(t3, s).next(() => s))));
  }).then((t3) => {
    const s = n.Li.get(t3.targetId);
    return (null === s || t3.snapshotVersion.compareTo(s.snapshotVersion) > 0) && (n.Li = n.Li.insert(t3.targetId, t3), n.qi.set(e, t3.targetId)), t3;
  });
}
async function eu(t2, e, n) {
  const s = F(t2), i = s.Li.get(e), r = n ? "readwrite" : "readwrite-primary";
  try {
    n || await s.persistence.runTransaction("Release target", r, (t3) => s.persistence.referenceDelegate.removeTarget(t3, i));
  } catch (t3) {
    if (!Vt(t3))
      throw t3;
    C("LocalStore", `Failed to update sequence numbers for target ${e}: ${t3}`);
  }
  s.Li = s.Li.remove(e), s.qi.delete(i.target);
}
function nu(t2, e, n) {
  const s = F(t2);
  let i = st.min(), r = ws();
  return s.persistence.runTransaction("Execute query", "readonly", (t3) => function(t4, e2, n2) {
    const s2 = F(t4), i2 = s2.qi.get(n2);
    return void 0 !== i2 ? At.resolve(s2.Li.get(i2)) : s2.Ds.getTargetData(e2, n2);
  }(s, t3, jn(e)).next((e2) => {
    if (e2)
      return i = e2.lastLimboFreeSnapshotVersion, s.Ds.getMatchingKeysForTargetId(t3, e2.targetId).next((t4) => {
        r = t4;
      });
  }).next(() => s.Bi.getDocumentsMatchingQuery(t3, e, n ? i : st.min(), n ? r : ws())).next((t4) => (ru(s, ts(e), t4), {
    documents: t4,
    Wi: r
  })));
}
function ru(t2, e, n) {
  let s = t2.Ui.get(e) || st.min();
  n.forEach((t3, e2) => {
    e2.readTime.compareTo(s) > 0 && (s = e2.readTime);
  }), t2.Ui.set(e, s);
}
class _u {
  constructor() {
    this.activeTargetIds = ms();
  }
  tr(t2) {
    this.activeTargetIds = this.activeTargetIds.add(t2);
  }
  er(t2) {
    this.activeTargetIds = this.activeTargetIds.delete(t2);
  }
  Xi() {
    const t2 = {
      activeTargetIds: this.activeTargetIds.toArray(),
      updateTimeMs: Date.now()
    };
    return JSON.stringify(t2);
  }
}
class gu {
  constructor() {
    this.Br = new _u(), this.Lr = {}, this.onlineStateHandler = null, this.sequenceNumberHandler = null;
  }
  addPendingMutation(t2) {
  }
  updateMutationState(t2, e, n) {
  }
  addLocalQueryTarget(t2) {
    return this.Br.tr(t2), this.Lr[t2] || "not-current";
  }
  updateQueryState(t2, e, n) {
    this.Lr[t2] = e;
  }
  removeLocalQueryTarget(t2) {
    this.Br.er(t2);
  }
  isLocalQueryTarget(t2) {
    return this.Br.activeTargetIds.has(t2);
  }
  clearQueryState(t2) {
    delete this.Lr[t2];
  }
  getAllActiveQueryTargets() {
    return this.Br.activeTargetIds;
  }
  isActiveQueryTarget(t2) {
    return this.Br.activeTargetIds.has(t2);
  }
  start() {
    return this.Br = new _u(), Promise.resolve();
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
class yu {
  qr(t2) {
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
class pu {
  constructor() {
    this.Ur = () => this.Kr(), this.Gr = () => this.Qr(), this.zr = [], this.jr();
  }
  qr(t2) {
    this.zr.push(t2);
  }
  shutdown() {
    window.removeEventListener("online", this.Ur), window.removeEventListener("offline", this.Gr);
  }
  jr() {
    window.addEventListener("online", this.Ur), window.addEventListener("offline", this.Gr);
  }
  Kr() {
    C("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
    for (const t2 of this.zr)
      t2(0);
  }
  Qr() {
    C("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
    for (const t2 of this.zr)
      t2(1);
  }
  static D() {
    return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
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
let Iu = null;
function Tu() {
  return null === Iu ? Iu = 268435456 + Math.round(2147483648 * Math.random()) : Iu++, "0x" + Iu.toString(16);
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
const Eu = {
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
class Au {
  constructor(t2) {
    this.Wr = t2.Wr, this.Hr = t2.Hr;
  }
  Jr(t2) {
    this.Yr = t2;
  }
  Zr(t2) {
    this.Xr = t2;
  }
  onMessage(t2) {
    this.eo = t2;
  }
  close() {
    this.Hr();
  }
  send(t2) {
    this.Wr(t2);
  }
  no() {
    this.Yr();
  }
  so(t2) {
    this.Xr(t2);
  }
  io(t2) {
    this.eo(t2);
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
const Ru = "WebChannelConnection";
class vu extends class {
  constructor(t2) {
    this.databaseInfo = t2, this.databaseId = t2.databaseId;
    const e = t2.ssl ? "https" : "http";
    this.ro = e + "://" + t2.host, this.oo = "projects/" + this.databaseId.projectId + "/databases/" + this.databaseId.database + "/documents";
  }
  get uo() {
    return false;
  }
  co(t2, e, n, s, i) {
    const r = Tu(), o = this.ao(t2, e);
    C("RestConnection", `Sending RPC '${t2}' ${r}:`, o, n);
    const u = {};
    return this.ho(u, s, i), this.lo(t2, o, u, n).then((e2) => (C("RestConnection", `Received RPC '${t2}' ${r}: `, e2), e2), (e2) => {
      throw N("RestConnection", `RPC '${t2}' ${r} failed with error: `, e2, "url: ", o, "request:", n), e2;
    });
  }
  fo(t2, e, n, s, i, r) {
    return this.co(t2, e, n, s, i);
  }
  ho(t2, e, n) {
    t2["X-Goog-Api-Client"] = "gl-js/ fire/" + P, t2["Content-Type"] = "text/plain", this.databaseInfo.appId && (t2["X-Firebase-GMPID"] = this.databaseInfo.appId), e && e.headers.forEach((e2, n2) => t2[n2] = e2), n && n.headers.forEach((e2, n2) => t2[n2] = e2);
  }
  ao(t2, e) {
    const n = Eu[t2];
    return `${this.ro}/v1/${e}:${n}`;
  }
} {
  constructor(t2) {
    super(t2), this.forceLongPolling = t2.forceLongPolling, this.autoDetectLongPolling = t2.autoDetectLongPolling, this.useFetchStreams = t2.useFetchStreams;
  }
  lo(t2, e, n, s) {
    const i = Tu();
    return new Promise((r, o) => {
      const u = new XhrIo();
      u.setWithCredentials(true), u.listenOnce(EventType.COMPLETE, () => {
        try {
          switch (u.getLastErrorCode()) {
            case ErrorCode.NO_ERROR:
              const e2 = u.getResponseJson();
              C(Ru, `XHR for RPC '${t2}' ${i} received:`, JSON.stringify(e2)), r(e2);
              break;
            case ErrorCode.TIMEOUT:
              C(Ru, `RPC '${t2}' ${i} timed out`), o(new L(B.DEADLINE_EXCEEDED, "Request time out"));
              break;
            case ErrorCode.HTTP_ERROR:
              const n2 = u.getStatus();
              if (C(Ru, `RPC '${t2}' ${i} failed with status:`, n2, "response text:", u.getResponseText()), n2 > 0) {
                let t3 = u.getResponseJson();
                Array.isArray(t3) && (t3 = t3[0]);
                const e3 = null == t3 ? void 0 : t3.error;
                if (e3 && e3.status && e3.message) {
                  const t4 = function(t5) {
                    const e4 = t5.toLowerCase().replace(/_/g, "-");
                    return Object.values(B).indexOf(e4) >= 0 ? e4 : B.UNKNOWN;
                  }(e3.status);
                  o(new L(t4, e3.message));
                } else
                  o(new L(B.UNKNOWN, "Server responded with status " + u.getStatus()));
              } else
                o(new L(B.UNAVAILABLE, "Connection failed."));
              break;
            default:
              O();
          }
        } finally {
          C(Ru, `RPC '${t2}' ${i} completed.`);
        }
      });
      const c = JSON.stringify(s);
      C(Ru, `RPC '${t2}' ${i} sending request:`, s), u.send(e, "POST", c, n, 15);
    });
  }
  wo(t2, e, n) {
    const s = Tu(), i = [this.ro, "/", "google.firestore.v1.Firestore", "/", t2, "/channel"], r = createWebChannelTransport(), o = getStatEventTarget(), u = {
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
    this.useFetchStreams && (u.xmlHttpFactory = new FetchXmlHttpFactory({})), this.ho(u.initMessageHeaders, e, n), u.encodeInitMessageHeaders = true;
    const c = i.join("");
    C(Ru, `Creating RPC '${t2}' stream ${s}: ${c}`, u);
    const a = r.createWebChannel(c, u);
    let h = false, l2 = false;
    const f = new Au({
      Wr: (e2) => {
        l2 ? C(Ru, `Not sending because RPC '${t2}' stream ${s} is closed:`, e2) : (h || (C(Ru, `Opening RPC '${t2}' stream ${s} transport.`), a.open(), h = true), C(Ru, `RPC '${t2}' stream ${s} sending:`, e2), a.send(e2));
      },
      Hr: () => a.close()
    }), d = (t3, e2, n2) => {
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
    return d(a, WebChannel.EventType.OPEN, () => {
      l2 || C(Ru, `RPC '${t2}' stream ${s} transport opened.`);
    }), d(a, WebChannel.EventType.CLOSE, () => {
      l2 || (l2 = true, C(Ru, `RPC '${t2}' stream ${s} transport closed`), f.so());
    }), d(a, WebChannel.EventType.ERROR, (e2) => {
      l2 || (l2 = true, N(Ru, `RPC '${t2}' stream ${s} transport errored:`, e2), f.so(new L(B.UNAVAILABLE, "The operation could not be completed")));
    }), d(a, WebChannel.EventType.MESSAGE, (e2) => {
      var n2;
      if (!l2) {
        const i2 = e2.data[0];
        $(!!i2);
        const r2 = i2, o2 = r2.error || (null === (n2 = r2[0]) || void 0 === n2 ? void 0 : n2.error);
        if (o2) {
          C(Ru, `RPC '${t2}' stream ${s} received error:`, o2);
          const e3 = o2.status;
          let n3 = function(t3) {
            const e4 = si[t3];
            if (void 0 !== e4)
              return oi(e4);
          }(e3), i3 = o2.message;
          void 0 === n3 && (n3 = B.INTERNAL, i3 = "Unknown error status: " + e3 + " with message " + o2.message), l2 = true, f.so(new L(n3, i3)), a.close();
        } else
          C(Ru, `RPC '${t2}' stream ${s} received:`, i2), f.io(i2);
      }
    }), d(o, Event.STAT_EVENT, (e2) => {
      e2.stat === Stat.PROXY ? C(Ru, `RPC '${t2}' stream ${s} detected buffering proxy`) : e2.stat === Stat.NOPROXY && C(Ru, `RPC '${t2}' stream ${s} detected no buffering proxy`);
    }), setTimeout(() => {
      f.no();
    }, 0), f;
  }
}
function Pu() {
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
function Vu(t2) {
  return new Ti(t2, true);
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
class Su {
  constructor(t2, e, n = 1e3, s = 1.5, i = 6e4) {
    this.Ws = t2, this.timerId = e, this._o = n, this.mo = s, this.yo = i, this.po = 0, this.Io = null, this.To = Date.now(), this.reset();
  }
  reset() {
    this.po = 0;
  }
  Eo() {
    this.po = this.yo;
  }
  Ao(t2) {
    this.cancel();
    const e = Math.floor(this.po + this.Ro()), n = Math.max(0, Date.now() - this.To), s = Math.max(0, e - n);
    s > 0 && C("ExponentialBackoff", `Backing off for ${s} ms (base delay: ${this.po} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`), this.Io = this.Ws.enqueueAfterDelay(this.timerId, s, () => (this.To = Date.now(), t2())), this.po *= this.mo, this.po < this._o && (this.po = this._o), this.po > this.yo && (this.po = this.yo);
  }
  vo() {
    null !== this.Io && (this.Io.skipDelay(), this.Io = null);
  }
  cancel() {
    null !== this.Io && (this.Io.cancel(), this.Io = null);
  }
  Ro() {
    return (Math.random() - 0.5) * this.po;
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
class Du {
  constructor(t2, e, n, s, i, r, o, u) {
    this.Ws = t2, this.bo = n, this.Po = s, this.connection = i, this.authCredentialsProvider = r, this.appCheckCredentialsProvider = o, this.listener = u, this.state = 0, this.Vo = 0, this.So = null, this.Do = null, this.stream = null, this.Co = new Su(t2, e);
  }
  xo() {
    return 1 === this.state || 5 === this.state || this.No();
  }
  No() {
    return 2 === this.state || 3 === this.state;
  }
  start() {
    4 !== this.state ? this.auth() : this.ko();
  }
  async stop() {
    this.xo() && await this.close(0);
  }
  Oo() {
    this.state = 0, this.Co.reset();
  }
  $o() {
    this.No() && null === this.So && (this.So = this.Ws.enqueueAfterDelay(this.bo, 6e4, () => this.Mo()));
  }
  Fo(t2) {
    this.Bo(), this.stream.send(t2);
  }
  async Mo() {
    if (this.No())
      return this.close(0);
  }
  Bo() {
    this.So && (this.So.cancel(), this.So = null);
  }
  Lo() {
    this.Do && (this.Do.cancel(), this.Do = null);
  }
  async close(t2, e) {
    this.Bo(), this.Lo(), this.Co.cancel(), this.Vo++, 4 !== t2 ? this.Co.reset() : e && e.code === B.RESOURCE_EXHAUSTED ? (x(e.toString()), x("Using maximum backoff delay to prevent overloading the backend."), this.Co.Eo()) : e && e.code === B.UNAUTHENTICATED && 3 !== this.state && (this.authCredentialsProvider.invalidateToken(), this.appCheckCredentialsProvider.invalidateToken()), null !== this.stream && (this.qo(), this.stream.close(), this.stream = null), this.state = t2, await this.listener.Zr(e);
  }
  qo() {
  }
  auth() {
    this.state = 1;
    const t2 = this.Uo(this.Vo), e = this.Vo;
    Promise.all([this.authCredentialsProvider.getToken(), this.appCheckCredentialsProvider.getToken()]).then(([t3, n]) => {
      this.Vo === e && this.Ko(t3, n);
    }, (e2) => {
      t2(() => {
        const t3 = new L(B.UNKNOWN, "Fetching auth token failed: " + e2.message);
        return this.Go(t3);
      });
    });
  }
  Ko(t2, e) {
    const n = this.Uo(this.Vo);
    this.stream = this.Qo(t2, e), this.stream.Jr(() => {
      n(() => (this.state = 2, this.Do = this.Ws.enqueueAfterDelay(this.Po, 1e4, () => (this.No() && (this.state = 3), Promise.resolve())), this.listener.Jr()));
    }), this.stream.Zr((t3) => {
      n(() => this.Go(t3));
    }), this.stream.onMessage((t3) => {
      n(() => this.onMessage(t3));
    });
  }
  ko() {
    this.state = 5, this.Co.Ao(async () => {
      this.state = 0, this.start();
    });
  }
  Go(t2) {
    return C("PersistentStream", `close with error: ${t2}`), this.stream = null, this.close(4, t2);
  }
  Uo(t2) {
    return (e) => {
      this.Ws.enqueueAndForget(() => this.Vo === t2 ? e() : (C("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), Promise.resolve()));
    };
  }
}
class Cu extends Du {
  constructor(t2, e, n, s, i, r) {
    super(t2, "listen_stream_connection_backoff", "listen_stream_idle", "health_check_timeout", e, n, s, r), this.serializer = i;
  }
  Qo(t2, e) {
    return this.connection.wo("Listen", t2, e);
  }
  onMessage(t2) {
    this.Co.reset();
    const e = Mi(this.serializer, t2), n = function(t3) {
      if (!("targetChange" in t3))
        return st.min();
      const e2 = t3.targetChange;
      return e2.targetIds && e2.targetIds.length ? st.min() : e2.readTime ? vi(e2.readTime) : st.min();
    }(t2);
    return this.listener.zo(e, n);
  }
  jo(t2) {
    const e = {};
    e.database = xi(this.serializer), e.addTarget = function(t3, e2) {
      let n2;
      const s = e2.target;
      return n2 = On(s) ? {
        documents: qi(t3, s)
      } : {
        query: Ui(t3, s)
      }, n2.targetId = e2.targetId, e2.resumeToken.approximateByteSize() > 0 ? n2.resumeToken = Ai(t3, e2.resumeToken) : e2.snapshotVersion.compareTo(st.min()) > 0 && (n2.readTime = Ei(t3, e2.snapshotVersion.toTimestamp())), n2;
    }(this.serializer, t2);
    const n = Gi(this.serializer, t2);
    n && (e.labels = n), this.Fo(e);
  }
  Wo(t2) {
    const e = {};
    e.database = xi(this.serializer), e.removeTarget = t2, this.Fo(e);
  }
}
class xu extends Du {
  constructor(t2, e, n, s, i, r) {
    super(t2, "write_stream_connection_backoff", "write_stream_idle", "health_check_timeout", e, n, s, r), this.serializer = i, this.Ho = false;
  }
  get Jo() {
    return this.Ho;
  }
  start() {
    this.Ho = false, this.lastStreamToken = void 0, super.start();
  }
  qo() {
    this.Ho && this.Yo([]);
  }
  Qo(t2, e) {
    return this.connection.wo("Write", t2, e);
  }
  onMessage(t2) {
    if ($(!!t2.streamToken), this.lastStreamToken = t2.streamToken, this.Ho) {
      this.Co.reset();
      const e = Li(t2.writeResults, t2.commitTime), n = vi(t2.commitTime);
      return this.listener.Zo(n, e);
    }
    return $(!t2.writeResults || 0 === t2.writeResults.length), this.Ho = true, this.listener.Xo();
  }
  tu() {
    const t2 = {};
    t2.database = xi(this.serializer), this.Fo(t2);
  }
  Yo(t2) {
    const e = {
      streamToken: this.lastStreamToken,
      writes: t2.map((t3) => Fi(this.serializer, t3))
    };
    this.Fo(e);
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
class Nu extends class {
} {
  constructor(t2, e, n, s) {
    super(), this.authCredentials = t2, this.appCheckCredentials = e, this.connection = n, this.serializer = s, this.eu = false;
  }
  nu() {
    if (this.eu)
      throw new L(B.FAILED_PRECONDITION, "The client has already been terminated.");
  }
  co(t2, e, n) {
    return this.nu(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(([s, i]) => this.connection.co(t2, e, n, s, i)).catch((t3) => {
      throw "FirebaseError" === t3.name ? (t3.code === B.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), t3) : new L(B.UNKNOWN, t3.toString());
    });
  }
  fo(t2, e, n, s) {
    return this.nu(), Promise.all([this.authCredentials.getToken(), this.appCheckCredentials.getToken()]).then(([i, r]) => this.connection.fo(t2, e, n, i, r, s)).catch((t3) => {
      throw "FirebaseError" === t3.name ? (t3.code === B.UNAUTHENTICATED && (this.authCredentials.invalidateToken(), this.appCheckCredentials.invalidateToken()), t3) : new L(B.UNKNOWN, t3.toString());
    });
  }
  terminate() {
    this.eu = true;
  }
}
class Ou {
  constructor(t2, e) {
    this.asyncQueue = t2, this.onlineStateHandler = e, this.state = "Unknown", this.su = 0, this.iu = null, this.ru = true;
  }
  ou() {
    0 === this.su && (this.uu("Unknown"), this.iu = this.asyncQueue.enqueueAfterDelay("online_state_timeout", 1e4, () => (this.iu = null, this.cu("Backend didn't respond within 10 seconds."), this.uu("Offline"), Promise.resolve())));
  }
  au(t2) {
    "Online" === this.state ? this.uu("Unknown") : (this.su++, this.su >= 1 && (this.hu(), this.cu(`Connection failed 1 times. Most recent error: ${t2.toString()}`), this.uu("Offline")));
  }
  set(t2) {
    this.hu(), this.su = 0, "Online" === t2 && (this.ru = false), this.uu(t2);
  }
  uu(t2) {
    t2 !== this.state && (this.state = t2, this.onlineStateHandler(t2));
  }
  cu(t2) {
    const e = `Could not reach Cloud Firestore backend. ${t2}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
    this.ru ? (x(e), this.ru = false) : C("OnlineStateTracker", e);
  }
  hu() {
    null !== this.iu && (this.iu.cancel(), this.iu = null);
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
class $u {
  constructor(t2, e, n, s, i) {
    this.localStore = t2, this.datastore = e, this.asyncQueue = n, this.remoteSyncer = {}, this.lu = [], this.fu = /* @__PURE__ */ new Map(), this.du = /* @__PURE__ */ new Set(), this.wu = [], this._u = i, this._u.qr((t3) => {
      n.enqueueAndForget(async () => {
        Qu(this) && (C("RemoteStore", "Restarting streams for network reachability change."), await async function(t4) {
          const e2 = F(t4);
          e2.du.add(4), await Fu(e2), e2.mu.set("Unknown"), e2.du.delete(4), await Mu(e2);
        }(this));
      });
    }), this.mu = new Ou(n, s);
  }
}
async function Mu(t2) {
  if (Qu(t2))
    for (const e of t2.wu)
      await e(true);
}
async function Fu(t2) {
  for (const e of t2.wu)
    await e(false);
}
function Bu(t2, e) {
  const n = F(t2);
  n.fu.has(e.targetId) || (n.fu.set(e.targetId, e), Gu(n) ? Ku(n) : ac(n).No() && qu(n, e));
}
function Lu(t2, e) {
  const n = F(t2), s = ac(n);
  n.fu.delete(e), s.No() && Uu(n, e), 0 === n.fu.size && (s.No() ? s.$o() : Qu(n) && n.mu.set("Unknown"));
}
function qu(t2, e) {
  t2.gu.Ot(e.targetId), ac(t2).jo(e);
}
function Uu(t2, e) {
  t2.gu.Ot(e), ac(t2).Wo(e);
}
function Ku(t2) {
  t2.gu = new _i({
    getRemoteKeysForTarget: (e) => t2.remoteSyncer.getRemoteKeysForTarget(e),
    ne: (e) => t2.fu.get(e) || null
  }), ac(t2).start(), t2.mu.ou();
}
function Gu(t2) {
  return Qu(t2) && !ac(t2).xo() && t2.fu.size > 0;
}
function Qu(t2) {
  return 0 === F(t2).du.size;
}
function zu(t2) {
  t2.gu = void 0;
}
async function ju(t2) {
  t2.fu.forEach((e, n) => {
    qu(t2, e);
  });
}
async function Wu(t2, e) {
  zu(t2), Gu(t2) ? (t2.mu.au(e), Ku(t2)) : t2.mu.set("Unknown");
}
async function Hu(t2, e, n) {
  if (t2.mu.set("Online"), e instanceof di && 2 === e.state && e.cause)
    try {
      await async function(t3, e2) {
        const n2 = e2.cause;
        for (const s of e2.targetIds)
          t3.fu.has(s) && (await t3.remoteSyncer.rejectListen(s, n2), t3.fu.delete(s), t3.gu.removeTarget(s));
      }(t2, e);
    } catch (n2) {
      C("RemoteStore", "Failed to remove targets %s: %s ", e.targetIds.join(","), n2), await Ju(t2, n2);
    }
  else if (e instanceof li ? t2.gu.Kt(e) : e instanceof fi ? t2.gu.Jt(e) : t2.gu.zt(e), !n.isEqual(st.min()))
    try {
      const e2 = await Jo(t2.localStore);
      n.compareTo(e2) >= 0 && await function(t3, e3) {
        const n2 = t3.gu.Xt(e3);
        return n2.targetChanges.forEach((n3, s) => {
          if (n3.resumeToken.approximateByteSize() > 0) {
            const i = t3.fu.get(s);
            i && t3.fu.set(s, i.withResumeToken(n3.resumeToken, e3));
          }
        }), n2.targetMismatches.forEach((e4) => {
          const n3 = t3.fu.get(e4);
          if (!n3)
            return;
          t3.fu.set(e4, n3.withResumeToken(be.EMPTY_BYTE_STRING, n3.snapshotVersion)), Uu(t3, e4);
          const s = new tr(n3.target, e4, 1, n3.sequenceNumber);
          qu(t3, s);
        }), t3.remoteSyncer.applyRemoteEvent(n2);
      }(t2, n);
    } catch (e2) {
      C("RemoteStore", "Failed to raise snapshot:", e2), await Ju(t2, e2);
    }
}
async function Ju(t2, e, n) {
  if (!Vt(e))
    throw e;
  t2.du.add(1), await Fu(t2), t2.mu.set("Offline"), n || (n = () => Jo(t2.localStore)), t2.asyncQueue.enqueueRetryable(async () => {
    C("RemoteStore", "Retrying IndexedDB access"), await n(), t2.du.delete(1), await Mu(t2);
  });
}
function Yu(t2, e) {
  return e().catch((n) => Ju(t2, n, e));
}
async function Zu(t2) {
  const e = F(t2), n = hc(e);
  let s = e.lu.length > 0 ? e.lu[e.lu.length - 1].batchId : -1;
  for (; Xu(e); )
    try {
      const t3 = await Xo(e.localStore, s);
      if (null === t3) {
        0 === e.lu.length && n.$o();
        break;
      }
      s = t3.batchId, tc(e, t3);
    } catch (t3) {
      await Ju(e, t3);
    }
  ec(e) && nc(e);
}
function Xu(t2) {
  return Qu(t2) && t2.lu.length < 10;
}
function tc(t2, e) {
  t2.lu.push(e);
  const n = hc(t2);
  n.No() && n.Jo && n.Yo(e.mutations);
}
function ec(t2) {
  return Qu(t2) && !hc(t2).xo() && t2.lu.length > 0;
}
function nc(t2) {
  hc(t2).start();
}
async function sc(t2) {
  hc(t2).tu();
}
async function ic(t2) {
  const e = hc(t2);
  for (const n of t2.lu)
    e.Yo(n.mutations);
}
async function rc(t2, e, n) {
  const s = t2.lu.shift(), i = Ys.from(s, e, n);
  await Yu(t2, () => t2.remoteSyncer.applySuccessfulWrite(i)), await Zu(t2);
}
async function oc(t2, e) {
  e && hc(t2).Jo && await async function(t3, e2) {
    if (n = e2.code, ri(n) && n !== B.ABORTED) {
      const n2 = t3.lu.shift();
      hc(t3).Oo(), await Yu(t3, () => t3.remoteSyncer.rejectFailedWrite(n2.batchId, e2)), await Zu(t3);
    }
    var n;
  }(t2, e), ec(t2) && nc(t2);
}
async function uc(t2, e) {
  const n = F(t2);
  n.asyncQueue.verifyOperationInProgress(), C("RemoteStore", "RemoteStore received new credentials");
  const s = Qu(n);
  n.du.add(3), await Fu(n), s && n.mu.set("Unknown"), await n.remoteSyncer.handleCredentialChange(e), n.du.delete(3), await Mu(n);
}
async function cc(t2, e) {
  const n = F(t2);
  e ? (n.du.delete(2), await Mu(n)) : e || (n.du.add(2), await Fu(n), n.mu.set("Unknown"));
}
function ac(t2) {
  return t2.yu || (t2.yu = function(t3, e, n) {
    const s = F(t3);
    return s.nu(), new Cu(e, s.connection, s.authCredentials, s.appCheckCredentials, s.serializer, n);
  }(t2.datastore, t2.asyncQueue, {
    Jr: ju.bind(null, t2),
    Zr: Wu.bind(null, t2),
    zo: Hu.bind(null, t2)
  }), t2.wu.push(async (e) => {
    e ? (t2.yu.Oo(), Gu(t2) ? Ku(t2) : t2.mu.set("Unknown")) : (await t2.yu.stop(), zu(t2));
  })), t2.yu;
}
function hc(t2) {
  return t2.pu || (t2.pu = function(t3, e, n) {
    const s = F(t3);
    return s.nu(), new xu(e, s.connection, s.authCredentials, s.appCheckCredentials, s.serializer, n);
  }(t2.datastore, t2.asyncQueue, {
    Jr: sc.bind(null, t2),
    Zr: oc.bind(null, t2),
    Xo: ic.bind(null, t2),
    Zo: rc.bind(null, t2)
  }), t2.wu.push(async (e) => {
    e ? (t2.pu.Oo(), await Zu(t2)) : (await t2.pu.stop(), t2.lu.length > 0 && (C("RemoteStore", `Stopping write stream with ${t2.lu.length} pending writes`), t2.lu = []));
  })), t2.pu;
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
class lc {
  constructor(t2, e, n, s, i) {
    this.asyncQueue = t2, this.timerId = e, this.targetTimeMs = n, this.op = s, this.removalCallback = i, this.deferred = new q(), this.then = this.deferred.promise.then.bind(this.deferred.promise), this.deferred.promise.catch((t3) => {
    });
  }
  static createAndSchedule(t2, e, n, s, i) {
    const r = Date.now() + n, o = new lc(t2, e, r, s, i);
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
function fc(t2, e) {
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
class dc {
  constructor(t2) {
    this.comparator = t2 ? (e, n) => t2(e, n) || ct.comparator(e.key, n.key) : (t3, e) => ct.comparator(t3.key, e.key), this.keyedMap = us(), this.sortedSet = new ge(this.comparator);
  }
  static emptySet(t2) {
    return new dc(t2.comparator);
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
    if (!(t2 instanceof dc))
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
    const n = new dc();
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
class wc {
  constructor() {
    this.Iu = new ge(ct.comparator);
  }
  track(t2) {
    const e = t2.doc.key, n = this.Iu.get(e);
    n ? 0 !== t2.type && 3 === n.type ? this.Iu = this.Iu.insert(e, t2) : 3 === t2.type && 1 !== n.type ? this.Iu = this.Iu.insert(e, {
      type: n.type,
      doc: t2.doc
    }) : 2 === t2.type && 2 === n.type ? this.Iu = this.Iu.insert(e, {
      type: 2,
      doc: t2.doc
    }) : 2 === t2.type && 0 === n.type ? this.Iu = this.Iu.insert(e, {
      type: 0,
      doc: t2.doc
    }) : 1 === t2.type && 0 === n.type ? this.Iu = this.Iu.remove(e) : 1 === t2.type && 2 === n.type ? this.Iu = this.Iu.insert(e, {
      type: 1,
      doc: n.doc
    }) : 0 === t2.type && 1 === n.type ? this.Iu = this.Iu.insert(e, {
      type: 2,
      doc: t2.doc
    }) : O() : this.Iu = this.Iu.insert(e, t2);
  }
  Tu() {
    const t2 = [];
    return this.Iu.inorderTraversal((e, n) => {
      t2.push(n);
    }), t2;
  }
}
class _c {
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
    }), new _c(
      t2,
      e,
      dc.emptySet(e),
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
    if (!(this.fromCache === t2.fromCache && this.hasCachedResults === t2.hasCachedResults && this.syncStateChanged === t2.syncStateChanged && this.mutatedKeys.isEqual(t2.mutatedKeys) && Jn(this.query, t2.query) && this.docs.isEqual(t2.docs) && this.oldDocs.isEqual(t2.oldDocs)))
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
class mc {
  constructor() {
    this.Eu = void 0, this.listeners = [];
  }
}
class gc {
  constructor() {
    this.queries = new ss((t2) => Yn(t2), Jn), this.onlineState = "Unknown", this.Au = /* @__PURE__ */ new Set();
  }
}
async function yc(t2, e) {
  const n = F(t2), s = e.query;
  let i = false, r = n.queries.get(s);
  if (r || (i = true, r = new mc()), i)
    try {
      r.Eu = await n.onListen(s);
    } catch (t3) {
      const n2 = fc(t3, `Initialization of query '${Zn(e.query)}' failed`);
      return void e.onError(n2);
    }
  if (n.queries.set(s, r), r.listeners.push(e), e.Ru(n.onlineState), r.Eu) {
    e.vu(r.Eu) && Ec(n);
  }
}
async function pc(t2, e) {
  const n = F(t2), s = e.query;
  let i = false;
  const r = n.queries.get(s);
  if (r) {
    const t3 = r.listeners.indexOf(e);
    t3 >= 0 && (r.listeners.splice(t3, 1), i = 0 === r.listeners.length);
  }
  if (i)
    return n.queries.delete(s), n.onUnlisten(s);
}
function Ic(t2, e) {
  const n = F(t2);
  let s = false;
  for (const t3 of e) {
    const e2 = t3.query, i = n.queries.get(e2);
    if (i) {
      for (const e3 of i.listeners)
        e3.vu(t3) && (s = true);
      i.Eu = t3;
    }
  }
  s && Ec(n);
}
function Tc(t2, e, n) {
  const s = F(t2), i = s.queries.get(e);
  if (i)
    for (const t3 of i.listeners)
      t3.onError(n);
  s.queries.delete(e);
}
function Ec(t2) {
  t2.Au.forEach((t3) => {
    t3.next();
  });
}
class Ac {
  constructor(t2, e, n) {
    this.query = t2, this.bu = e, this.Pu = false, this.Vu = null, this.onlineState = "Unknown", this.options = n || {};
  }
  vu(t2) {
    if (!this.options.includeMetadataChanges) {
      const e2 = [];
      for (const n of t2.docChanges)
        3 !== n.type && e2.push(n);
      t2 = new _c(
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
    return this.Pu ? this.Su(t2) && (this.bu.next(t2), e = true) : this.Du(t2, this.onlineState) && (this.Cu(t2), e = true), this.Vu = t2, e;
  }
  onError(t2) {
    this.bu.error(t2);
  }
  Ru(t2) {
    this.onlineState = t2;
    let e = false;
    return this.Vu && !this.Pu && this.Du(this.Vu, t2) && (this.Cu(this.Vu), e = true), e;
  }
  Du(t2, e) {
    if (!t2.fromCache)
      return true;
    const n = "Offline" !== e;
    return (!this.options.xu || !n) && (!t2.docs.isEmpty() || t2.hasCachedResults || "Offline" === e);
  }
  Su(t2) {
    if (t2.docChanges.length > 0)
      return true;
    const e = this.Vu && this.Vu.hasPendingWrites !== t2.hasPendingWrites;
    return !(!t2.syncStateChanged && !e) && true === this.options.includeMetadataChanges;
  }
  Cu(t2) {
    t2 = _c.fromInitialDocuments(t2.query, t2.docs, t2.mutatedKeys, t2.fromCache, t2.hasCachedResults), this.Pu = true, this.bu.next(t2);
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
class Vc {
  constructor(t2) {
    this.key = t2;
  }
}
class Sc {
  constructor(t2) {
    this.key = t2;
  }
}
class Dc {
  constructor(t2, e) {
    this.query = t2, this.Lu = e, this.qu = null, this.hasCachedResults = false, this.current = false, this.Uu = ws(), this.mutatedKeys = ws(), this.Ku = es(t2), this.Gu = new dc(this.Ku);
  }
  get Qu() {
    return this.Lu;
  }
  zu(t2, e) {
    const n = e ? e.ju : new wc(), s = e ? e.Gu : this.Gu;
    let i = e ? e.mutatedKeys : this.mutatedKeys, r = s, o = false;
    const u = "F" === this.query.limitType && s.size === this.query.limit ? s.last() : null, c = "L" === this.query.limitType && s.size === this.query.limit ? s.first() : null;
    if (t2.inorderTraversal((t3, e2) => {
      const a = s.get(t3), h = Xn(this.query, e2) ? e2 : null, l2 = !!a && this.mutatedKeys.has(a.key), f = !!h && (h.hasLocalMutations || this.mutatedKeys.has(h.key) && h.hasCommittedMutations);
      let d = false;
      if (a && h) {
        a.data.isEqual(h.data) ? l2 !== f && (n.track({
          type: 3,
          doc: h
        }), d = true) : this.Wu(a, h) || (n.track({
          type: 2,
          doc: h
        }), d = true, (u && this.Ku(h, u) > 0 || c && this.Ku(h, c) < 0) && (o = true));
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
      Gu: r,
      ju: n,
      Mi: o,
      mutatedKeys: i
    };
  }
  Wu(t2, e) {
    return t2.hasLocalMutations && e.hasCommittedMutations && !e.hasLocalMutations;
  }
  applyChanges(t2, e, n) {
    const s = this.Gu;
    this.Gu = t2.Gu, this.mutatedKeys = t2.mutatedKeys;
    const i = t2.ju.Tu();
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
    }(t3.type, e2.type) || this.Ku(t3.doc, e2.doc)), this.Hu(n);
    const r = e ? this.Ju() : [], o = 0 === this.Uu.size && this.current ? 1 : 0, u = o !== this.qu;
    if (this.qu = o, 0 !== i.length || u) {
      return {
        snapshot: new _c(
          this.query,
          t2.Gu,
          s,
          i,
          t2.mutatedKeys,
          0 === o,
          u,
          false,
          !!n && n.resumeToken.approximateByteSize() > 0
        ),
        Yu: r
      };
    }
    return {
      Yu: r
    };
  }
  Ru(t2) {
    return this.current && "Offline" === t2 ? (this.current = false, this.applyChanges(
      {
        Gu: this.Gu,
        ju: new wc(),
        mutatedKeys: this.mutatedKeys,
        Mi: false
      },
      false
    )) : {
      Yu: []
    };
  }
  Zu(t2) {
    return !this.Lu.has(t2) && (!!this.Gu.has(t2) && !this.Gu.get(t2).hasLocalMutations);
  }
  Hu(t2) {
    t2 && (t2.addedDocuments.forEach((t3) => this.Lu = this.Lu.add(t3)), t2.modifiedDocuments.forEach((t3) => {
    }), t2.removedDocuments.forEach((t3) => this.Lu = this.Lu.delete(t3)), this.current = t2.current);
  }
  Ju() {
    if (!this.current)
      return [];
    const t2 = this.Uu;
    this.Uu = ws(), this.Gu.forEach((t3) => {
      this.Zu(t3.key) && (this.Uu = this.Uu.add(t3.key));
    });
    const e = [];
    return t2.forEach((t3) => {
      this.Uu.has(t3) || e.push(new Sc(t3));
    }), this.Uu.forEach((n) => {
      t2.has(n) || e.push(new Vc(n));
    }), e;
  }
  Xu(t2) {
    this.Lu = t2.Wi, this.Uu = ws();
    const e = this.zu(t2.documents);
    return this.applyChanges(e, true);
  }
  tc() {
    return _c.fromInitialDocuments(this.query, this.Gu, this.mutatedKeys, 0 === this.qu, this.hasCachedResults);
  }
}
class Cc {
  constructor(t2, e, n) {
    this.query = t2, this.targetId = e, this.view = n;
  }
}
class xc {
  constructor(t2) {
    this.key = t2, this.ec = false;
  }
}
class Nc {
  constructor(t2, e, n, s, i, r) {
    this.localStore = t2, this.remoteStore = e, this.eventManager = n, this.sharedClientState = s, this.currentUser = i, this.maxConcurrentLimboResolutions = r, this.nc = {}, this.sc = new ss((t3) => Yn(t3), Jn), this.ic = /* @__PURE__ */ new Map(), this.rc = /* @__PURE__ */ new Set(), this.oc = new ge(ct.comparator), this.uc = /* @__PURE__ */ new Map(), this.cc = new Vo(), this.ac = {}, this.hc = /* @__PURE__ */ new Map(), this.lc = so.bn(), this.onlineState = "Unknown", this.fc = void 0;
  }
  get isPrimaryClient() {
    return true === this.fc;
  }
}
async function kc(t2, e) {
  const n = aa(t2);
  let s, i;
  const r = n.sc.get(e);
  if (r)
    s = r.targetId, n.sharedClientState.addLocalQueryTarget(s), i = r.view.tc();
  else {
    const t3 = await tu(n.localStore, jn(e));
    n.isPrimaryClient && Bu(n.remoteStore, t3);
    const r2 = n.sharedClientState.addLocalQueryTarget(t3.targetId);
    s = t3.targetId, i = await Oc(n, e, s, "current" === r2, t3.resumeToken);
  }
  return i;
}
async function Oc(t2, e, n, s, i) {
  t2.dc = (e2, n2, s2) => async function(t3, e3, n3, s3) {
    let i2 = e3.view.zu(n3);
    i2.Mi && (i2 = await nu(
      t3.localStore,
      e3.query,
      false
    ).then(({ documents: t4 }) => e3.view.zu(t4, i2)));
    const r2 = s3 && s3.targetChanges.get(e3.targetId), o2 = e3.view.applyChanges(
      i2,
      t3.isPrimaryClient,
      r2
    );
    return Wc(t3, e3.targetId, o2.Yu), o2.snapshot;
  }(t2, e2, n2, s2);
  const r = await nu(
    t2.localStore,
    e,
    true
  ), o = new Dc(e, r.Wi), u = o.zu(r.documents), c = hi.createSynthesizedTargetChangeForCurrentChange(n, s && "Offline" !== t2.onlineState, i), a = o.applyChanges(
    u,
    t2.isPrimaryClient,
    c
  );
  Wc(t2, n, a.Yu);
  const h = new Cc(e, n, o);
  return t2.sc.set(e, h), t2.ic.has(n) ? t2.ic.get(n).push(e) : t2.ic.set(n, [e]), a.snapshot;
}
async function $c(t2, e) {
  const n = F(t2), s = n.sc.get(e), i = n.ic.get(s.targetId);
  if (i.length > 1)
    return n.ic.set(s.targetId, i.filter((t3) => !Jn(t3, e))), void n.sc.delete(e);
  if (n.isPrimaryClient) {
    n.sharedClientState.removeLocalQueryTarget(s.targetId);
    n.sharedClientState.isActiveQueryTarget(s.targetId) || await eu(
      n.localStore,
      s.targetId,
      false
    ).then(() => {
      n.sharedClientState.clearQueryState(s.targetId), Lu(n.remoteStore, s.targetId), zc(n, s.targetId);
    }).catch(Et);
  } else
    zc(n, s.targetId), await eu(
      n.localStore,
      s.targetId,
      true
    );
}
async function Mc(t2, e, n) {
  const s = ha(t2);
  try {
    const t3 = await function(t4, e2) {
      const n2 = F(t4), s2 = nt.now(), i = e2.reduce((t5, e3) => t5.add(e3.key), ws());
      let r, o;
      return n2.persistence.runTransaction("Locally write mutations", "readwrite", (t5) => {
        let u = rs(), c = ws();
        return n2.Ki.getEntries(t5, i).next((t6) => {
          u = t6, u.forEach((t7, e3) => {
            e3.isValidDocument() || (c = c.add(t7));
          });
        }).next(() => n2.localDocuments.getOverlayedDocuments(t5, u)).next((i2) => {
          r = i2;
          const o2 = [];
          for (const t6 of e2) {
            const e3 = qs(t6, r.get(t6.key).overlayedDocument);
            null != e3 && o2.push(new Gs(t6.key, e3, rn(e3.value.mapValue), Os.exists(true)));
          }
          return n2.mutationQueue.addMutationBatch(t5, s2, o2, e2);
        }).next((e3) => {
          o = e3;
          const s3 = e3.applyToLocalDocumentSet(r, c);
          return n2.documentOverlayCache.saveOverlays(t5, e3.batchId, s3);
        });
      }).then(() => ({
        batchId: o.batchId,
        changes: cs(r)
      }));
    }(s.localStore, e);
    s.sharedClientState.addPendingMutation(t3.batchId), function(t4, e2, n2) {
      let s2 = t4.ac[t4.currentUser.toKey()];
      s2 || (s2 = new ge(X));
      s2 = s2.insert(e2, n2), t4.ac[t4.currentUser.toKey()] = s2;
    }(s, t3.batchId, n), await Yc(s, t3.changes), await Zu(s.remoteStore);
  } catch (t3) {
    const e2 = fc(t3, "Failed to persist write");
    n.reject(e2);
  }
}
async function Fc(t2, e) {
  const n = F(t2);
  try {
    const t3 = await Yo(n.localStore, e);
    e.targetChanges.forEach((t4, e2) => {
      const s = n.uc.get(e2);
      s && ($(t4.addedDocuments.size + t4.modifiedDocuments.size + t4.removedDocuments.size <= 1), t4.addedDocuments.size > 0 ? s.ec = true : t4.modifiedDocuments.size > 0 ? $(s.ec) : t4.removedDocuments.size > 0 && ($(s.ec), s.ec = false));
    }), await Yc(n, t3, e);
  } catch (t3) {
    await Et(t3);
  }
}
function Bc(t2, e, n) {
  const s = F(t2);
  if (s.isPrimaryClient && 0 === n || !s.isPrimaryClient && 1 === n) {
    const t3 = [];
    s.sc.forEach((n2, s2) => {
      const i = s2.view.Ru(e);
      i.snapshot && t3.push(i.snapshot);
    }), function(t4, e2) {
      const n2 = F(t4);
      n2.onlineState = e2;
      let s2 = false;
      n2.queries.forEach((t5, n3) => {
        for (const t6 of n3.listeners)
          t6.Ru(e2) && (s2 = true);
      }), s2 && Ec(n2);
    }(s.eventManager, e), t3.length && s.nc.zo(t3), s.onlineState = e, s.isPrimaryClient && s.sharedClientState.setOnlineState(e);
  }
}
async function Lc(t2, e, n) {
  const s = F(t2);
  s.sharedClientState.updateQueryState(e, "rejected", n);
  const i = s.uc.get(e), r = i && i.key;
  if (r) {
    let t3 = new ge(ct.comparator);
    t3 = t3.insert(r, on.newNoDocument(r, st.min()));
    const n2 = ws().add(r), i2 = new ai(
      st.min(),
      /* @__PURE__ */ new Map(),
      new Ie(X),
      t3,
      n2
    );
    await Fc(s, i2), s.oc = s.oc.remove(r), s.uc.delete(e), Jc(s);
  } else
    await eu(
      s.localStore,
      e,
      false
    ).then(() => zc(s, e, n)).catch(Et);
}
async function qc(t2, e) {
  const n = F(t2), s = e.batch.batchId;
  try {
    const t3 = await Ho(n.localStore, e);
    Qc(n, s, null), Gc(n, s), n.sharedClientState.updateMutationState(s, "acknowledged"), await Yc(n, t3);
  } catch (t3) {
    await Et(t3);
  }
}
async function Uc(t2, e, n) {
  const s = F(t2);
  try {
    const t3 = await function(t4, e2) {
      const n2 = F(t4);
      return n2.persistence.runTransaction("Reject batch", "readwrite-primary", (t5) => {
        let s2;
        return n2.mutationQueue.lookupMutationBatch(t5, e2).next((e3) => ($(null !== e3), s2 = e3.keys(), n2.mutationQueue.removeMutationBatch(t5, e3))).next(() => n2.mutationQueue.performConsistencyCheck(t5)).next(() => n2.documentOverlayCache.removeOverlaysForBatchId(t5, s2, e2)).next(() => n2.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(t5, s2)).next(() => n2.localDocuments.getDocuments(t5, s2));
      });
    }(s.localStore, e);
    Qc(s, e, n), Gc(s, e), s.sharedClientState.updateMutationState(e, "rejected", n), await Yc(s, t3);
  } catch (n2) {
    await Et(n2);
  }
}
function Gc(t2, e) {
  (t2.hc.get(e) || []).forEach((t3) => {
    t3.resolve();
  }), t2.hc.delete(e);
}
function Qc(t2, e, n) {
  const s = F(t2);
  let i = s.ac[s.currentUser.toKey()];
  if (i) {
    const t3 = i.get(e);
    t3 && (n ? t3.reject(n) : t3.resolve(), i = i.remove(e)), s.ac[s.currentUser.toKey()] = i;
  }
}
function zc(t2, e, n = null) {
  t2.sharedClientState.removeLocalQueryTarget(e);
  for (const s of t2.ic.get(e))
    t2.sc.delete(s), n && t2.nc.wc(s, n);
  if (t2.ic.delete(e), t2.isPrimaryClient) {
    t2.cc.hs(e).forEach((e2) => {
      t2.cc.containsKey(e2) || jc(t2, e2);
    });
  }
}
function jc(t2, e) {
  t2.rc.delete(e.path.canonicalString());
  const n = t2.oc.get(e);
  null !== n && (Lu(t2.remoteStore, n), t2.oc = t2.oc.remove(e), t2.uc.delete(n), Jc(t2));
}
function Wc(t2, e, n) {
  for (const s of n)
    if (s instanceof Vc)
      t2.cc.addReference(s.key, e), Hc(t2, s);
    else if (s instanceof Sc) {
      C("SyncEngine", "Document no longer in limbo: " + s.key), t2.cc.removeReference(s.key, e);
      t2.cc.containsKey(s.key) || jc(t2, s.key);
    } else
      O();
}
function Hc(t2, e) {
  const n = e.key, s = n.path.canonicalString();
  t2.oc.get(n) || t2.rc.has(s) || (C("SyncEngine", "New document in limbo: " + n), t2.rc.add(s), Jc(t2));
}
function Jc(t2) {
  for (; t2.rc.size > 0 && t2.oc.size < t2.maxConcurrentLimboResolutions; ) {
    const e = t2.rc.values().next().value;
    t2.rc.delete(e);
    const n = new ct(rt.fromString(e)), s = t2.lc.next();
    t2.uc.set(s, new xc(n)), t2.oc = t2.oc.insert(n, s), Bu(t2.remoteStore, new tr(jn(qn(n.path)), s, 2, Ot.ct));
  }
}
async function Yc(t2, e, n) {
  const s = F(t2), i = [], r = [], o = [];
  s.sc.isEmpty() || (s.sc.forEach((t3, u) => {
    o.push(s.dc(u, e, n).then((t4) => {
      if ((t4 || n) && s.isPrimaryClient && s.sharedClientState.updateQueryState(u.targetId, (null == t4 ? void 0 : t4.fromCache) ? "not-current" : "current"), t4) {
        i.push(t4);
        const e2 = Go.Di(u.targetId, t4);
        r.push(e2);
      }
    }));
  }), await Promise.all(o), s.nc.zo(i), await async function(t3, e2) {
    const n2 = F(t3);
    try {
      await n2.persistence.runTransaction("notifyLocalViewChanges", "readwrite", (t4) => At.forEach(e2, (e3) => At.forEach(e3.Vi, (s2) => n2.persistence.referenceDelegate.addReference(t4, e3.targetId, s2)).next(() => At.forEach(e3.Si, (s2) => n2.persistence.referenceDelegate.removeReference(t4, e3.targetId, s2)))));
    } catch (t4) {
      if (!Vt(t4))
        throw t4;
      C("LocalStore", "Failed to update sequence numbers: " + t4);
    }
    for (const t4 of e2) {
      const e3 = t4.targetId;
      if (!t4.fromCache) {
        const t5 = n2.Li.get(e3), s2 = t5.snapshotVersion, i2 = t5.withLastLimboFreeSnapshotVersion(s2);
        n2.Li = n2.Li.insert(e3, i2);
      }
    }
  }(s.localStore, r));
}
async function Zc(t2, e) {
  const n = F(t2);
  if (!n.currentUser.isEqual(e)) {
    C("SyncEngine", "User change. New user:", e.toKey());
    const t3 = await Wo(n.localStore, e);
    n.currentUser = e, function(t4, e2) {
      t4.hc.forEach((t5) => {
        t5.forEach((t6) => {
          t6.reject(new L(B.CANCELLED, e2));
        });
      }), t4.hc.clear();
    }(n, "'waitForPendingWrites' promise is rejected due to a user change."), n.sharedClientState.handleUserChange(e, t3.removedBatchIds, t3.addedBatchIds), await Yc(n, t3.Qi);
  }
}
function Xc(t2, e) {
  const n = F(t2), s = n.uc.get(e);
  if (s && s.ec)
    return ws().add(s.key);
  {
    let t3 = ws();
    const s2 = n.ic.get(e);
    if (!s2)
      return t3;
    for (const e2 of s2) {
      const s3 = n.sc.get(e2);
      t3 = t3.unionWith(s3.view.Qu);
    }
    return t3;
  }
}
function aa(t2) {
  const e = F(t2);
  return e.remoteStore.remoteSyncer.applyRemoteEvent = Fc.bind(null, e), e.remoteStore.remoteSyncer.getRemoteKeysForTarget = Xc.bind(null, e), e.remoteStore.remoteSyncer.rejectListen = Lc.bind(null, e), e.nc.zo = Ic.bind(null, e.eventManager), e.nc.wc = Tc.bind(null, e.eventManager), e;
}
function ha(t2) {
  const e = F(t2);
  return e.remoteStore.remoteSyncer.applySuccessfulWrite = qc.bind(null, e), e.remoteStore.remoteSyncer.rejectFailedWrite = Uc.bind(null, e), e;
}
class fa {
  constructor() {
    this.synchronizeTabs = false;
  }
  async initialize(t2) {
    this.serializer = Vu(t2.databaseInfo.databaseId), this.sharedClientState = this.createSharedClientState(t2), this.persistence = this.createPersistence(t2), await this.persistence.start(), this.localStore = this.createLocalStore(t2), this.gcScheduler = this.createGarbageCollectionScheduler(t2, this.localStore), this.indexBackfillerScheduler = this.createIndexBackfillerScheduler(t2, this.localStore);
  }
  createGarbageCollectionScheduler(t2, e) {
    return null;
  }
  createIndexBackfillerScheduler(t2, e) {
    return null;
  }
  createLocalStore(t2) {
    return jo(this.persistence, new Qo(), t2.initialUser, this.serializer);
  }
  createPersistence(t2) {
    return new ko($o.Fs, this.serializer);
  }
  createSharedClientState(t2) {
    return new gu();
  }
  async terminate() {
    this.gcScheduler && this.gcScheduler.stop(), await this.sharedClientState.shutdown(), await this.persistence.shutdown();
  }
}
class _a {
  async initialize(t2, e) {
    this.localStore || (this.localStore = t2.localStore, this.sharedClientState = t2.sharedClientState, this.datastore = this.createDatastore(e), this.remoteStore = this.createRemoteStore(e), this.eventManager = this.createEventManager(e), this.syncEngine = this.createSyncEngine(
      e,
      !t2.synchronizeTabs
    ), this.sharedClientState.onlineStateHandler = (t3) => Bc(this.syncEngine, t3, 1), this.remoteStore.remoteSyncer.handleCredentialChange = Zc.bind(null, this.syncEngine), await cc(this.remoteStore, this.syncEngine.isPrimaryClient));
  }
  createEventManager(t2) {
    return new gc();
  }
  createDatastore(t2) {
    const e = Vu(t2.databaseInfo.databaseId), n = (s = t2.databaseInfo, new vu(s));
    var s;
    return function(t3, e2, n2, s2) {
      return new Nu(t3, e2, n2, s2);
    }(t2.authCredentials, t2.appCheckCredentials, n, e);
  }
  createRemoteStore(t2) {
    return e = this.localStore, n = this.datastore, s = t2.asyncQueue, i = (t3) => Bc(this.syncEngine, t3, 0), r = pu.D() ? new pu() : new yu(), new $u(e, n, s, i, r);
    var e, n, s, i, r;
  }
  createSyncEngine(t2, e) {
    return function(t3, e2, n, s, i, r, o) {
      const u = new Nc(t3, e2, n, s, i, r);
      return o && (u.fc = true), u;
    }(this.localStore, this.remoteStore, this.eventManager, this.sharedClientState, t2.initialUser, t2.maxConcurrentLimboResolutions, e);
  }
  terminate() {
    return async function(t2) {
      const e = F(t2);
      C("RemoteStore", "RemoteStore shutting down."), e.du.add(5), await Fu(e), e._u.shutdown(), e.mu.set("Unknown");
    }(this.remoteStore);
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
class ga {
  constructor(t2) {
    this.observer = t2, this.muted = false;
  }
  next(t2) {
    this.observer.next && this.gc(this.observer.next, t2);
  }
  error(t2) {
    this.observer.error ? this.gc(this.observer.error, t2) : x("Uncaught Error in snapshot listener:", t2.toString());
  }
  yc() {
    this.muted = true;
  }
  gc(t2, e) {
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
class Ta {
  constructor(t2, e, n, s) {
    this.authCredentials = t2, this.appCheckCredentials = e, this.asyncQueue = n, this.databaseInfo = s, this.user = b.UNAUTHENTICATED, this.clientId = Z.A(), this.authCredentialListener = () => Promise.resolve(), this.appCheckCredentialListener = () => Promise.resolve(), this.authCredentials.start(n, async (t3) => {
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
        this._onlineComponents && await this._onlineComponents.terminate(), this._offlineComponents && await this._offlineComponents.terminate(), this.authCredentials.shutdown(), this.appCheckCredentials.shutdown(), t2.resolve();
      } catch (e) {
        const n = fc(e, "Failed to shutdown persistence");
        t2.reject(n);
      }
    }), t2.promise;
  }
}
async function Ea(t2, e) {
  t2.asyncQueue.verifyOperationInProgress(), C("FirestoreClient", "Initializing OfflineComponentProvider");
  const n = await t2.getConfiguration();
  await e.initialize(n);
  let s = n.initialUser;
  t2.setCredentialChangeListener(async (t3) => {
    s.isEqual(t3) || (await Wo(e.localStore, t3), s = t3);
  }), e.persistence.setDatabaseDeletedListener(() => t2.terminate()), t2._offlineComponents = e;
}
async function Aa(t2, e) {
  t2.asyncQueue.verifyOperationInProgress();
  const n = await va(t2);
  C("FirestoreClient", "Initializing OnlineComponentProvider");
  const s = await t2.getConfiguration();
  await e.initialize(n, s), t2.setCredentialChangeListener((t3) => uc(e.remoteStore, t3)), t2.setAppCheckTokenChangeListener((t3, n2) => uc(e.remoteStore, n2)), t2._onlineComponents = e;
}
function Ra(t2) {
  return "FirebaseError" === t2.name ? t2.code === B.FAILED_PRECONDITION || t2.code === B.UNIMPLEMENTED : !("undefined" != typeof DOMException && t2 instanceof DOMException) || (22 === t2.code || 20 === t2.code || 11 === t2.code);
}
async function va(t2) {
  if (!t2._offlineComponents)
    if (t2._uninitializedComponentsProvider) {
      C("FirestoreClient", "Using user provided OfflineComponentProvider");
      try {
        await Ea(t2, t2._uninitializedComponentsProvider._offline);
      } catch (e) {
        const n = e;
        if (!Ra(n))
          throw n;
        N("Error using user provided cache. Falling back to memory cache: " + n), await Ea(t2, new fa());
      }
    } else
      C("FirestoreClient", "Using default OfflineComponentProvider"), await Ea(t2, new fa());
  return t2._offlineComponents;
}
async function ba(t2) {
  return t2._onlineComponents || (t2._uninitializedComponentsProvider ? (C("FirestoreClient", "Using user provided OnlineComponentProvider"), await Aa(t2, t2._uninitializedComponentsProvider._online)) : (C("FirestoreClient", "Using default OnlineComponentProvider"), await Aa(t2, new _a()))), t2._onlineComponents;
}
function Da(t2) {
  return ba(t2).then((t3) => t3.syncEngine);
}
async function xa(t2) {
  const e = await ba(t2), n = e.eventManager;
  return n.onListen = kc.bind(null, e.syncEngine), n.onUnlisten = $c.bind(null, e.syncEngine), n;
}
function Fa(t2, e, n = {}) {
  const s = new q();
  return t2.asyncQueue.enqueueAndForget(async () => function(t3, e2, n2, s2, i) {
    const r = new ga({
      next: (n3) => {
        e2.enqueueAndForget(() => pc(t3, o)), n3.fromCache && "server" === s2.source ? i.reject(new L(B.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : i.resolve(n3);
      },
      error: (t4) => i.reject(t4)
    }), o = new Ac(n2, r, {
      includeMetadataChanges: true,
      xu: true
    });
    return yc(t3, o);
  }(await xa(t2), t2.asyncQueue, e, n, s)), s.promise;
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
const Ka = /* @__PURE__ */ new Map();
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
function Ga(t2, e, n) {
  if (!n)
    throw new L(B.INVALID_ARGUMENT, `Function ${t2}() cannot be called with an empty ${e}.`);
}
function Qa(t2, e, n, s) {
  if (true === e && true === s)
    throw new L(B.INVALID_ARGUMENT, `${t2} and ${n} cannot be used together.`);
}
function za(t2) {
  if (!ct.isDocumentKey(t2))
    throw new L(B.INVALID_ARGUMENT, `Invalid document reference. Document references must have an even number of segments, but ${t2} has ${t2.length}.`);
}
function ja(t2) {
  if (ct.isDocumentKey(t2))
    throw new L(B.INVALID_ARGUMENT, `Invalid collection reference. Collection references must have an odd number of segments, but ${t2} has ${t2.length}.`);
}
function Wa(t2) {
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
function Ha(t2, e) {
  if ("_delegate" in t2 && (t2 = t2._delegate), !(t2 instanceof e)) {
    if (e.name === t2.constructor.name)
      throw new L(B.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
    {
      const n = Wa(t2);
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
class Ya {
  constructor(t2) {
    var e;
    if (void 0 === t2.host) {
      if (void 0 !== t2.ssl)
        throw new L(B.INVALID_ARGUMENT, "Can't provide ssl option if host option is not set");
      this.host = "firestore.googleapis.com", this.ssl = true;
    } else
      this.host = t2.host, this.ssl = null === (e = t2.ssl) || void 0 === e || e;
    if (this.credentials = t2.credentials, this.ignoreUndefinedProperties = !!t2.ignoreUndefinedProperties, this.cache = t2.localCache, void 0 === t2.cacheSizeBytes)
      this.cacheSizeBytes = 41943040;
    else {
      if (-1 !== t2.cacheSizeBytes && t2.cacheSizeBytes < 1048576)
        throw new L(B.INVALID_ARGUMENT, "cacheSizeBytes must be at least 1048576");
      this.cacheSizeBytes = t2.cacheSizeBytes;
    }
    this.experimentalForceLongPolling = !!t2.experimentalForceLongPolling, this.experimentalAutoDetectLongPolling = !!t2.experimentalAutoDetectLongPolling, this.useFetchStreams = !!t2.useFetchStreams, Qa("experimentalForceLongPolling", t2.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", t2.experimentalAutoDetectLongPolling);
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
class Za {
  constructor(t2, e, n, s) {
    this._authCredentials = t2, this._appCheckCredentials = e, this._databaseId = n, this._app = s, this.type = "firestore-lite", this._persistenceKey = "(lite)", this._settings = new Ya({}), this._settingsFrozen = false;
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
    this._settings = new Ya(t2), void 0 !== t2.credentials && (this._authCredentials = function(t3) {
      if (!t3)
        return new K();
      switch (t3.type) {
        case "firstParty":
          return new j(t3.sessionIndex || "0", t3.iamToken || null, t3.authTokenFactory || null);
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
      const e = Ka.get(t2);
      e && (C("ComponentProvider", "Removing Datastore"), Ka.delete(t2), e.terminate());
    }(this), Promise.resolve();
  }
}
function Xa(t2, e, n, s = {}) {
  var i;
  const r = (t2 = Ha(t2, Za))._getSettings();
  if ("firestore.googleapis.com" !== r.host && r.host !== e && N("Host has been set in both settings() and useEmulator(), emulator host will be used"), t2._setSettings(Object.assign(Object.assign({}, r), {
    host: `${e}:${n}`,
    ssl: false
  })), s.mockUserToken) {
    let e2, n2;
    if ("string" == typeof s.mockUserToken)
      e2 = s.mockUserToken, n2 = b.MOCK_USER;
    else {
      e2 = createMockUserToken(s.mockUserToken, null === (i = t2._app) || void 0 === i ? void 0 : i.options.projectId);
      const r2 = s.mockUserToken.sub || s.mockUserToken.user_id;
      if (!r2)
        throw new L(B.INVALID_ARGUMENT, "mockUserToken must contain 'sub' or 'user_id' field!");
      n2 = new b(r2);
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
class th {
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
    return new nh(this.firestore, this.converter, this._key.path.popLast());
  }
  withConverter(t2) {
    return new th(this.firestore, t2, this._key);
  }
}
class eh {
  constructor(t2, e, n) {
    this.converter = e, this._query = n, this.type = "query", this.firestore = t2;
  }
  withConverter(t2) {
    return new eh(this.firestore, t2, this._query);
  }
}
class nh extends eh {
  constructor(t2, e, n) {
    super(t2, e, qn(n)), this._path = n, this.type = "collection";
  }
  get id() {
    return this._query.path.lastSegment();
  }
  get path() {
    return this._query.path.canonicalString();
  }
  get parent() {
    const t2 = this._path.popLast();
    return t2.isEmpty() ? null : new th(
      this.firestore,
      null,
      new ct(t2)
    );
  }
  withConverter(t2) {
    return new nh(this.firestore, t2, this._path);
  }
}
function sh(t2, e, ...n) {
  if (t2 = getModularInstance(t2), Ga("collection", "path", e), t2 instanceof Za) {
    const s = rt.fromString(e, ...n);
    return ja(s), new nh(t2, null, s);
  }
  {
    if (!(t2 instanceof th || t2 instanceof nh))
      throw new L(B.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    const s = t2._path.child(rt.fromString(e, ...n));
    return ja(s), new nh(
      t2.firestore,
      null,
      s
    );
  }
}
function rh(t2, e, ...n) {
  if (t2 = getModularInstance(t2), 1 === arguments.length && (e = Z.A()), Ga("doc", "path", e), t2 instanceof Za) {
    const s = rt.fromString(e, ...n);
    return za(s), new th(
      t2,
      null,
      new ct(s)
    );
  }
  {
    if (!(t2 instanceof th || t2 instanceof nh))
      throw new L(B.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
    const s = t2._path.child(rt.fromString(e, ...n));
    return za(s), new th(t2.firestore, t2 instanceof nh ? t2.converter : null, new ct(s));
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
class ch {
  constructor() {
    this.Nc = Promise.resolve(), this.kc = [], this.Oc = false, this.$c = [], this.Mc = null, this.Fc = false, this.Bc = false, this.Lc = [], this.Co = new Su(this, "async_queue_retry"), this.qc = () => {
      const t3 = Pu();
      t3 && C("AsyncQueue", "Visibility state changed to " + t3.visibilityState), this.Co.vo();
    };
    const t2 = Pu();
    t2 && "function" == typeof t2.addEventListener && t2.addEventListener("visibilitychange", this.qc);
  }
  get isShuttingDown() {
    return this.Oc;
  }
  enqueueAndForget(t2) {
    this.enqueue(t2);
  }
  enqueueAndForgetEvenWhileRestricted(t2) {
    this.Uc(), this.Kc(t2);
  }
  enterRestrictedMode(t2) {
    if (!this.Oc) {
      this.Oc = true, this.Bc = t2 || false;
      const e = Pu();
      e && "function" == typeof e.removeEventListener && e.removeEventListener("visibilitychange", this.qc);
    }
  }
  enqueue(t2) {
    if (this.Uc(), this.Oc)
      return new Promise(() => {
      });
    const e = new q();
    return this.Kc(() => this.Oc && this.Bc ? Promise.resolve() : (t2().then(e.resolve, e.reject), e.promise)).then(() => e.promise);
  }
  enqueueRetryable(t2) {
    this.enqueueAndForget(() => (this.kc.push(t2), this.Gc()));
  }
  async Gc() {
    if (0 !== this.kc.length) {
      try {
        await this.kc[0](), this.kc.shift(), this.Co.reset();
      } catch (t2) {
        if (!Vt(t2))
          throw t2;
        C("AsyncQueue", "Operation failed with retryable error: " + t2);
      }
      this.kc.length > 0 && this.Co.Ao(() => this.Gc());
    }
  }
  Kc(t2) {
    const e = this.Nc.then(() => (this.Fc = true, t2().catch((t3) => {
      this.Mc = t3, this.Fc = false;
      const e2 = function(t4) {
        let e3 = t4.message || "";
        t4.stack && (e3 = t4.stack.includes(t4.message) ? t4.stack : t4.message + "\n" + t4.stack);
        return e3;
      }(t3);
      throw x("INTERNAL UNHANDLED ERROR: ", e2), t3;
    }).then((t3) => (this.Fc = false, t3))));
    return this.Nc = e, e;
  }
  enqueueAfterDelay(t2, e, n) {
    this.Uc(), this.Lc.indexOf(t2) > -1 && (e = 0);
    const s = lc.createAndSchedule(this, t2, e, n, (t3) => this.Qc(t3));
    return this.$c.push(s), s;
  }
  Uc() {
    this.Mc && O();
  }
  verifyOperationInProgress() {
  }
  async zc() {
    let t2;
    do {
      t2 = this.Nc, await t2;
    } while (t2 !== this.Nc);
  }
  jc(t2) {
    for (const e of this.$c)
      if (e.timerId === t2)
        return true;
    return false;
  }
  Wc(t2) {
    return this.zc().then(() => {
      this.$c.sort((t3, e) => t3.targetTimeMs - e.targetTimeMs);
      for (const e of this.$c)
        if (e.skipDelay(), "all" !== t2 && e.timerId === t2)
          break;
      return this.zc();
    });
  }
  Hc(t2) {
    this.Lc.push(t2);
  }
  Qc(t2) {
    const e = this.$c.indexOf(t2);
    this.$c.splice(e, 1);
  }
}
class fh extends Za {
  constructor(t2, e, n, s) {
    super(t2, e, n, s), this.type = "firestore", this._queue = new ch(), this._persistenceKey = (null == s ? void 0 : s.name) || "[DEFAULT]";
  }
  _terminate() {
    return this._firestoreClient || mh(this), this._firestoreClient.terminate();
  }
}
function wh(e, n) {
  const s = "object" == typeof e ? e : getApp(), i = "string" == typeof e ? e : n || "(default)", r = _getProvider(s, "firestore").getImmediate({
    identifier: i
  });
  if (!r._initialized) {
    const t2 = getDefaultEmulatorHostnameAndPort("firestore");
    t2 && Xa(r, ...t2);
  }
  return r;
}
function _h(t2) {
  return t2._firestoreClient || mh(t2), t2._firestoreClient.verifyNotTerminated(), t2._firestoreClient;
}
function mh(t2) {
  var e, n, s;
  const i = t2._freezeSettings(), r = function(t3, e2, n2, s2) {
    return new ke(t3, e2, n2, s2.host, s2.ssl, s2.experimentalForceLongPolling, s2.experimentalAutoDetectLongPolling, s2.useFetchStreams);
  }(t2._databaseId, (null === (e = t2._app) || void 0 === e ? void 0 : e.options.appId) || "", t2._persistenceKey, i);
  t2._firestoreClient = new Ta(t2._authCredentials, t2._appCheckCredentials, t2._queue, r), (null === (n = i.cache) || void 0 === n ? void 0 : n._offlineComponentProvider) && (null === (s = i.cache) || void 0 === s ? void 0 : s._onlineComponentProvider) && (t2._firestoreClient._uninitializedComponentsProvider = {
    _offlineKind: i.cache.kind,
    _offline: i.cache._offlineComponentProvider,
    _online: i.cache._onlineComponentProvider
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
class Dh {
  constructor(t2) {
    this._byteString = t2;
  }
  static fromBase64String(t2) {
    try {
      return new Dh(be.fromBase64String(t2));
    } catch (t3) {
      throw new L(B.INVALID_ARGUMENT, "Failed to construct data from Base64 string: " + t3);
    }
  }
  static fromUint8Array(t2) {
    return new Dh(be.fromUint8Array(t2));
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
class Ch {
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
class Nh {
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
class kh {
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
    return X(this._lat, t2._lat) || X(this._long, t2._long);
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
const Oh = /^__.*__$/;
class $h {
  constructor(t2, e, n) {
    this.data = t2, this.fieldMask = e, this.fieldTransforms = n;
  }
  toMutation(t2, e) {
    return null !== this.fieldMask ? new Gs(t2, this.data, this.fieldMask, e, this.fieldTransforms) : new Ks(t2, this.data, e, this.fieldTransforms);
  }
}
class Mh {
  constructor(t2, e, n) {
    this.data = t2, this.fieldMask = e, this.fieldTransforms = n;
  }
  toMutation(t2, e) {
    return new Gs(t2, this.data, this.fieldMask, e, this.fieldTransforms);
  }
}
function Fh(t2) {
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
class Bh {
  constructor(t2, e, n, s, i, r) {
    this.settings = t2, this.databaseId = e, this.serializer = n, this.ignoreUndefinedProperties = s, void 0 === i && this.Jc(), this.fieldTransforms = i || [], this.fieldMask = r || [];
  }
  get path() {
    return this.settings.path;
  }
  get Yc() {
    return this.settings.Yc;
  }
  Zc(t2) {
    return new Bh(Object.assign(Object.assign({}, this.settings), t2), this.databaseId, this.serializer, this.ignoreUndefinedProperties, this.fieldTransforms, this.fieldMask);
  }
  Xc(t2) {
    var e;
    const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t2), s = this.Zc({
      path: n,
      ta: false
    });
    return s.ea(t2), s;
  }
  na(t2) {
    var e;
    const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t2), s = this.Zc({
      path: n,
      ta: false
    });
    return s.Jc(), s;
  }
  sa(t2) {
    return this.Zc({
      path: void 0,
      ta: true
    });
  }
  ia(t2) {
    return rl(t2, this.settings.methodName, this.settings.ra || false, this.path, this.settings.oa);
  }
  contains(t2) {
    return void 0 !== this.fieldMask.find((e) => t2.isPrefixOf(e)) || void 0 !== this.fieldTransforms.find((e) => t2.isPrefixOf(e.field));
  }
  Jc() {
    if (this.path)
      for (let t2 = 0; t2 < this.path.length; t2++)
        this.ea(this.path.get(t2));
  }
  ea(t2) {
    if (0 === t2.length)
      throw this.ia("Document fields must not be empty");
    if (Fh(this.Yc) && Oh.test(t2))
      throw this.ia('Document fields cannot begin and end with "__"');
  }
}
class Lh {
  constructor(t2, e, n) {
    this.databaseId = t2, this.ignoreUndefinedProperties = e, this.serializer = n || Vu(t2);
  }
  ua(t2, e, n, s = false) {
    return new Bh({
      Yc: t2,
      methodName: e,
      oa: n,
      path: ut.emptyPath(),
      ta: false,
      ra: s
    }, this.databaseId, this.serializer, this.ignoreUndefinedProperties);
  }
}
function qh(t2) {
  const e = t2._freezeSettings(), n = Vu(t2._databaseId);
  return new Lh(t2._databaseId, !!e.ignoreUndefinedProperties, n);
}
function Uh(t2, e, n, s, i, r = {}) {
  const o = t2.ua(r.merge || r.mergeFields ? 2 : 0, e, n, i);
  el("Data must be an object, but it was:", o, s);
  const u = Xh(s, o);
  let c, a;
  if (r.merge)
    c = new Ae(o.fieldMask), a = o.fieldTransforms;
  else if (r.mergeFields) {
    const t3 = [];
    for (const s2 of r.mergeFields) {
      const i2 = nl(e, s2, n);
      if (!o.contains(i2))
        throw new L(B.INVALID_ARGUMENT, `Field '${i2}' is specified in your field mask but missing from your input data.`);
      ol(t3, i2) || t3.push(i2);
    }
    c = new Ae(t3), a = o.fieldTransforms.filter((t4) => c.covers(t4.field));
  } else
    c = null, a = o.fieldTransforms;
  return new $h(new sn(u), c, a);
}
class Kh extends Nh {
  _toFieldTransform(t2) {
    if (2 !== t2.Yc)
      throw 1 === t2.Yc ? t2.ia(`${this._methodName}() can only appear at the top level of your update data`) : t2.ia(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);
    return t2.fieldMask.push(t2.path), null;
  }
  isEqual(t2) {
    return t2 instanceof Kh;
  }
}
function Gh(t2, e, n) {
  return new Bh({
    Yc: 3,
    oa: e.settings.oa,
    methodName: t2._methodName,
    ta: n
  }, e.databaseId, e.serializer, e.ignoreUndefinedProperties);
}
class zh extends Nh {
  constructor(t2, e) {
    super(t2), this.ca = e;
  }
  _toFieldTransform(t2) {
    const e = Gh(
      this,
      t2,
      true
    ), n = this.ca.map((t3) => Zh(t3, e)), s = new vs(n);
    return new xs(t2.path, s);
  }
  isEqual(t2) {
    return this === t2;
  }
}
class jh extends Nh {
  constructor(t2, e) {
    super(t2), this.ca = e;
  }
  _toFieldTransform(t2) {
    const e = Gh(
      this,
      t2,
      true
    ), n = this.ca.map((t3) => Zh(t3, e)), s = new Ps(n);
    return new xs(t2.path, s);
  }
  isEqual(t2) {
    return this === t2;
  }
}
function Hh(t2, e, n, s) {
  const i = t2.ua(1, e, n);
  el("Data must be an object, but it was:", i, s);
  const r = [], o = sn.empty();
  _e(s, (t3, s2) => {
    const u2 = il(e, t3, n);
    s2 = getModularInstance(s2);
    const c = i.na(u2);
    if (s2 instanceof Kh)
      r.push(u2);
    else {
      const t4 = Zh(s2, c);
      null != t4 && (r.push(u2), o.set(u2, t4));
    }
  });
  const u = new Ae(r);
  return new Mh(o, u, i.fieldTransforms);
}
function Jh(t2, e, n, s, i, r) {
  const o = t2.ua(1, e, n), u = [nl(e, s, n)], c = [i];
  if (r.length % 2 != 0)
    throw new L(B.INVALID_ARGUMENT, `Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);
  for (let t3 = 0; t3 < r.length; t3 += 2)
    u.push(nl(e, r[t3])), c.push(r[t3 + 1]);
  const a = [], h = sn.empty();
  for (let t3 = u.length - 1; t3 >= 0; --t3)
    if (!ol(a, u[t3])) {
      const e2 = u[t3];
      let n2 = c[t3];
      n2 = getModularInstance(n2);
      const s2 = o.na(e2);
      if (n2 instanceof Kh)
        a.push(e2);
      else {
        const t4 = Zh(n2, s2);
        null != t4 && (a.push(e2), h.set(e2, t4));
      }
    }
  const l2 = new Ae(a);
  return new Mh(h, l2, o.fieldTransforms);
}
function Yh(t2, e, n, s = false) {
  return Zh(n, t2.ua(s ? 4 : 3, e));
}
function Zh(t2, e) {
  if (tl(
    t2 = getModularInstance(t2)
  ))
    return el("Unsupported field value:", e, t2), Xh(t2, e);
  if (t2 instanceof Nh)
    return function(t3, e2) {
      if (!Fh(e2.Yc))
        throw e2.ia(`${t3._methodName}() can only be used with update() and set()`);
      if (!e2.path)
        throw e2.ia(`${t3._methodName}() is not currently supported inside arrays`);
      const n = t3._toFieldTransform(e2);
      n && e2.fieldTransforms.push(n);
    }(t2, e), null;
  if (void 0 === t2 && e.ignoreUndefinedProperties)
    return null;
  if (e.path && e.fieldMask.push(e.path), t2 instanceof Array) {
    if (e.settings.ta && 4 !== e.Yc)
      throw e.ia("Nested arrays are not supported");
    return function(t3, e2) {
      const n = [];
      let s = 0;
      for (const i of t3) {
        let t4 = Zh(i, e2.sa(s));
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
      return ps(e2.serializer, t3);
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
        timestampValue: Ei(e2.serializer, n)
      };
    }
    if (t3 instanceof nt) {
      const n = new nt(t3.seconds, 1e3 * Math.floor(t3.nanoseconds / 1e3));
      return {
        timestampValue: Ei(e2.serializer, n)
      };
    }
    if (t3 instanceof kh)
      return {
        geoPointValue: {
          latitude: t3.latitude,
          longitude: t3.longitude
        }
      };
    if (t3 instanceof Dh)
      return {
        bytesValue: Ai(e2.serializer, t3._byteString)
      };
    if (t3 instanceof th) {
      const n = e2.databaseId, s = t3.firestore._databaseId;
      if (!s.isEqual(n))
        throw e2.ia(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`);
      return {
        referenceValue: bi(t3.firestore._databaseId || e2.databaseId, t3._key.path)
      };
    }
    throw e2.ia(`Unsupported field value: ${Wa(t3)}`);
  }(t2, e);
}
function Xh(t2, e) {
  const n = {};
  return me(t2) ? e.path && e.path.length > 0 && e.fieldMask.push(e.path) : _e(t2, (t3, s) => {
    const i = Zh(s, e.Xc(t3));
    null != i && (n[t3] = i);
  }), {
    mapValue: {
      fields: n
    }
  };
}
function tl(t2) {
  return !("object" != typeof t2 || null === t2 || t2 instanceof Array || t2 instanceof Date || t2 instanceof nt || t2 instanceof kh || t2 instanceof Dh || t2 instanceof th || t2 instanceof Nh);
}
function el(t2, e, n) {
  if (!tl(n) || !function(t3) {
    return "object" == typeof t3 && null !== t3 && (Object.getPrototypeOf(t3) === Object.prototype || null === Object.getPrototypeOf(t3));
  }(n)) {
    const s = Wa(n);
    throw "an object" === s ? e.ia(t2 + " a custom object") : e.ia(t2 + " " + s);
  }
}
function nl(t2, e, n) {
  if ((e = getModularInstance(e)) instanceof Ch)
    return e._internalPath;
  if ("string" == typeof e)
    return il(t2, e);
  throw rl(
    "Field path arguments must be of type string or ",
    t2,
    false,
    void 0,
    n
  );
}
const sl = new RegExp("[~\\*/\\[\\]]");
function il(t2, e, n) {
  if (e.search(sl) >= 0)
    throw rl(
      `Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,
      t2,
      false,
      void 0,
      n
    );
  try {
    return new Ch(...e.split("."))._internalPath;
  } catch (s) {
    throw rl(
      `Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
      t2,
      false,
      void 0,
      n
    );
  }
}
function rl(t2, e, n, s, i) {
  const r = s && !s.isEmpty(), o = void 0 !== i;
  let u = `Function ${e}() called with invalid data`;
  n && (u += " (via `toFirestore()`)"), u += ". ";
  let c = "";
  return (r || o) && (c += " (found", r && (c += ` in field ${s}`), o && (c += ` in document ${i}`), c += ")"), new L(B.INVALID_ARGUMENT, u + t2 + c);
}
function ol(t2, e) {
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
class ul {
  constructor(t2, e, n, s, i) {
    this._firestore = t2, this._userDataWriter = e, this._key = n, this._document = s, this._converter = i;
  }
  get id() {
    return this._key.path.lastSegment();
  }
  get ref() {
    return new th(this._firestore, this._converter, this._key);
  }
  exists() {
    return null !== this._document;
  }
  data() {
    if (this._document) {
      if (this._converter) {
        const t2 = new cl(
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
      const e = this._document.data.field(al("DocumentSnapshot.get", t2));
      if (null !== e)
        return this._userDataWriter.convertValue(e);
    }
  }
}
class cl extends ul {
  data() {
    return super.data();
  }
}
function al(t2, e) {
  return "string" == typeof e ? il(t2, e) : e instanceof Ch ? e._internalPath : e._delegate._internalPath;
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
function hl(t2) {
  if ("L" === t2.limitType && 0 === t2.explicitOrderBy.length)
    throw new L(B.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
}
class ll {
}
class fl extends ll {
}
function dl(t2, e, ...n) {
  let s = [];
  e instanceof ll && s.push(e), s = s.concat(n), function(t3) {
    const e2 = t3.filter((t4) => t4 instanceof ml).length, n2 = t3.filter((t4) => t4 instanceof wl).length;
    if (e2 > 1 || e2 > 0 && n2 > 0)
      throw new L(B.INVALID_ARGUMENT, "InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.");
  }(s);
  for (const e2 of s)
    t2 = e2._apply(t2);
  return t2;
}
class wl extends fl {
  constructor(t2, e, n) {
    super(), this._field = t2, this._op = e, this._value = n, this.type = "where";
  }
  static _create(t2, e, n) {
    return new wl(t2, e, n);
  }
  _apply(t2) {
    const e = this._parse(t2);
    return Nl(t2._query, e), new eh(t2.firestore, t2.converter, Wn(t2._query, e));
  }
  _parse(t2) {
    const e = qh(t2.firestore), n = function(t3, e2, n2, s, i, r, o) {
      let u;
      if (i.isKeyField()) {
        if ("array-contains" === r || "array-contains-any" === r)
          throw new L(B.INVALID_ARGUMENT, `Invalid Query. You can't perform '${r}' queries on documentId().`);
        if ("in" === r || "not-in" === r) {
          xl(o, r);
          const e3 = [];
          for (const n3 of o)
            e3.push(Cl(s, t3, n3));
          u = {
            arrayValue: {
              values: e3
            }
          };
        } else
          u = Cl(s, t3, o);
      } else
        "in" !== r && "not-in" !== r && "array-contains-any" !== r || xl(o, r), u = Yh(
          n2,
          e2,
          o,
          "in" === r || "not-in" === r
        );
      return dn.create(i, r, u);
    }(t2._query, "where", e, t2.firestore._databaseId, this._field, this._op, this._value);
    return n;
  }
}
class ml extends ll {
  constructor(t2, e) {
    super(), this.type = t2, this._queryConstraints = e;
  }
  static _create(t2, e) {
    return new ml(t2, e);
  }
  _parse(t2) {
    const e = this._queryConstraints.map((e2) => e2._parse(t2)).filter((t3) => t3.getFilters().length > 0);
    return 1 === e.length ? e[0] : wn.create(e, this._getOperator());
  }
  _apply(t2) {
    const e = this._parse(t2);
    return 0 === e.getFilters().length ? t2 : (function(t3, e2) {
      let n = t3;
      const s = e2.getFlattenedFilters();
      for (const t4 of s)
        Nl(n, t4), n = Wn(n, t4);
    }(t2._query, e), new eh(t2.firestore, t2.converter, Wn(t2._query, e)));
  }
  _getQueryConstraints() {
    return this._queryConstraints;
  }
  _getOperator() {
    return "and" === this.type ? "and" : "or";
  }
}
class pl extends fl {
  constructor(t2, e) {
    super(), this._field = t2, this._direction = e, this.type = "orderBy";
  }
  static _create(t2, e) {
    return new pl(t2, e);
  }
  _apply(t2) {
    const e = function(t3, e2, n) {
      if (null !== t3.startAt)
        throw new L(B.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
      if (null !== t3.endAt)
        throw new L(B.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
      const s = new hn(e2, n);
      return function(t4, e3) {
        if (null === Kn(t4)) {
          const n2 = Gn(t4);
          null !== n2 && kl(t4, n2, e3.field);
        }
      }(t3, s), s;
    }(t2._query, this._field, this._direction);
    return new eh(t2.firestore, t2.converter, function(t3, e2) {
      const n = t3.explicitOrderBy.concat([e2]);
      return new Bn(t3.path, t3.collectionGroup, n, t3.filters.slice(), t3.limit, t3.limitType, t3.startAt, t3.endAt);
    }(t2._query, e));
  }
}
function Il(t2, e = "asc") {
  const n = e, s = al("orderBy", t2);
  return pl._create(s, n);
}
function Cl(t2, e, n) {
  if ("string" == typeof (n = getModularInstance(n))) {
    if ("" === n)
      throw new L(B.INVALID_ARGUMENT, "Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");
    if (!Qn(e) && -1 !== n.indexOf("/"))
      throw new L(B.INVALID_ARGUMENT, `Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);
    const s = e.path.child(rt.fromString(n));
    if (!ct.isDocumentKey(s))
      throw new L(B.INVALID_ARGUMENT, `Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);
    return Qe(t2, new ct(s));
  }
  if (n instanceof th)
    return Qe(t2, n._key);
  throw new L(B.INVALID_ARGUMENT, `Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Wa(n)}.`);
}
function xl(t2, e) {
  if (!Array.isArray(t2) || 0 === t2.length)
    throw new L(B.INVALID_ARGUMENT, `Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);
}
function Nl(t2, e) {
  if (e.isInequality()) {
    const n2 = Gn(t2), s = e.field;
    if (null !== n2 && !n2.isEqual(s))
      throw new L(B.INVALID_ARGUMENT, `Invalid query. All where filters with an inequality (<, <=, !=, not-in, >, or >=) must be on the same field. But you have inequality filters on '${n2.toString()}' and '${s.toString()}'`);
    const i = Kn(t2);
    null !== i && kl(t2, s, i);
  }
  const n = function(t3, e2) {
    for (const n2 of t3)
      for (const t4 of n2.getFlattenedFilters())
        if (e2.indexOf(t4.op) >= 0)
          return t4.op;
    return null;
  }(t2.filters, function(t3) {
    switch (t3) {
      case "!=":
        return ["!=", "not-in"];
      case "array-contains-any":
      case "in":
        return ["not-in"];
      case "not-in":
        return ["array-contains-any", "in", "not-in", "!="];
      default:
        return [];
    }
  }(e.op));
  if (null !== n)
    throw n === e.op ? new L(B.INVALID_ARGUMENT, `Invalid query. You cannot use more than one '${e.op.toString()}' filter.`) : new L(B.INVALID_ARGUMENT, `Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`);
}
function kl(t2, e, n) {
  if (!n.isEqual(e))
    throw new L(B.INVALID_ARGUMENT, `Invalid query. You have a where filter with an inequality (<, <=, !=, not-in, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`);
}
class $l {
  convertValue(t2, e = "none") {
    switch (Fe(t2)) {
      case 0:
        return null;
      case 1:
        return t2.booleanValue;
      case 2:
        return Se(t2.integerValue || t2.doubleValue);
      case 3:
        return this.convertTimestamp(t2.timestampValue);
      case 4:
        return this.convertServerTimestamp(t2, e);
      case 5:
        return t2.stringValue;
      case 6:
        return this.convertBytes(De(t2.bytesValue));
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
    return _e(t2.fields, (t3, s) => {
      n[t3] = this.convertValue(s, e);
    }), n;
  }
  convertGeoPoint(t2) {
    return new kh(Se(t2.latitude), Se(t2.longitude));
  }
  convertArray(t2, e) {
    return (t2.values || []).map((t3) => this.convertValue(t3, e));
  }
  convertServerTimestamp(t2, e) {
    switch (e) {
      case "previous":
        const n = xe(t2);
        return null == n ? null : this.convertValue(n, e);
      case "estimate":
        return this.convertTimestamp(Ne(t2));
      default:
        return null;
    }
  }
  convertTimestamp(t2) {
    const e = Ve(t2);
    return new nt(e.seconds, e.nanos);
  }
  convertDocumentKey(t2, e) {
    const n = rt.fromString(t2);
    $(Xi(n));
    const s = new Oe(n.get(1), n.get(3)), i = new ct(n.popFirst(5));
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
function Ml(t2, e, n) {
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
class Gl {
  constructor(t2, e) {
    this.hasPendingWrites = t2, this.fromCache = e;
  }
  isEqual(t2) {
    return this.hasPendingWrites === t2.hasPendingWrites && this.fromCache === t2.fromCache;
  }
}
class Ql extends ul {
  constructor(t2, e, n, s, i, r) {
    super(t2, e, n, s, r), this._firestore = t2, this._firestoreImpl = t2, this.metadata = i;
  }
  exists() {
    return super.exists();
  }
  data(t2 = {}) {
    if (this._document) {
      if (this._converter) {
        const e = new zl(
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
      const n = this._document.data.field(al("DocumentSnapshot.get", t2));
      if (null !== n)
        return this._userDataWriter.convertValue(n, e.serverTimestamps);
    }
  }
}
class zl extends Ql {
  data(t2 = {}) {
    return super.data(t2);
  }
}
class jl {
  constructor(t2, e, n, s) {
    this._firestore = t2, this._userDataWriter = e, this._snapshot = s, this.metadata = new Gl(s.hasPendingWrites, s.fromCache), this.query = n;
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
      t2.call(e, new zl(this._firestore, this._userDataWriter, n.key, n, new Gl(this._snapshot.mutatedKeys.has(n.key), this._snapshot.fromCache), this.query.converter));
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
          const s = new zl(t3._firestore, t3._userDataWriter, n.doc.key, n.doc, new Gl(t3._snapshot.mutatedKeys.has(n.doc.key), t3._snapshot.fromCache), t3.query.converter);
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
          const s = new zl(t3._firestore, t3._userDataWriter, e3.doc.key, e3.doc, new Gl(t3._snapshot.mutatedKeys.has(e3.doc.key), t3._snapshot.fromCache), t3.query.converter);
          let i = -1, r = -1;
          return 0 !== e3.type && (i = n.indexOf(e3.doc.key), n = n.delete(e3.doc.key)), 1 !== e3.type && (n = n.add(e3.doc), r = n.indexOf(e3.doc.key)), {
            type: Wl(e3.type),
            doc: s,
            oldIndex: i,
            newIndex: r
          };
        });
      }
    }(this, e), this._cachedChangesIncludeMetadataChanges = e), this._cachedChanges;
  }
}
function Wl(t2) {
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
class Yl extends $l {
  constructor(t2) {
    super(), this.firestore = t2;
  }
  convertBytes(t2) {
    return new Dh(t2);
  }
  convertReference(t2) {
    const e = this.convertDocumentKey(t2, this.firestore._databaseId);
    return new th(this.firestore, null, e);
  }
}
function tf(t2) {
  t2 = Ha(t2, eh);
  const e = Ha(t2.firestore, fh), n = _h(e), s = new Yl(e);
  return hl(t2._query), Fa(n, t2._query).then((n2) => new jl(e, s, t2, n2));
}
function rf(t2, e, n, ...s) {
  t2 = Ha(t2, th);
  const i = Ha(t2.firestore, fh), r = qh(i);
  let o;
  o = "string" == typeof (e = getModularInstance(e)) || e instanceof Ch ? Jh(r, "updateDoc", t2._key, e, n, s) : Hh(r, "updateDoc", t2._key, e);
  return hf(i, [o.toMutation(t2._key, Os.exists(true))]);
}
function of(t2) {
  return hf(Ha(t2.firestore, fh), [new Ws(t2._key, Os.none())]);
}
function uf(t2, e) {
  const n = Ha(t2.firestore, fh), s = rh(t2), i = Ml(t2.converter, e);
  return hf(n, [Uh(qh(t2.firestore), "addDoc", s._key, i, null !== t2.converter, {}).toMutation(s._key, Os.exists(false))]).then(() => s);
}
function hf(t2, e) {
  return function(t3, e2) {
    const n = new q();
    return t3.asyncQueue.enqueueAndForget(async () => Mc(await Da(t3), e2, n)), n.promise;
  }(_h(t2), e);
}
function Sf(...t2) {
  return new zh("arrayUnion", t2);
}
function Df(...t2) {
  return new jh("arrayRemove", t2);
}
!function(t2, e = true) {
  !function(t3) {
    P = t3;
  }(SDK_VERSION), _registerComponent(new Component("firestore", (t3, { instanceIdentifier: n, options: s }) => {
    const i = t3.getProvider("app").getImmediate(), r = new fh(new Q(t3.getProvider("auth-internal")), new H(t3.getProvider("app-check-internal")), function(t4, e2) {
      if (!Object.prototype.hasOwnProperty.apply(t4.options, ["projectId"]))
        throw new L(B.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
      return new Oe(t4.options.projectId, e2);
    }(i, n), i);
    return s = Object.assign({
      useFetchStreams: e
    }, s), r._setSettings(s), r;
  }, "PUBLIC").setMultipleInstances(true)), registerVersion(v, "3.10.0", t2), registerVersion(v, "3.10.0", "esm2017");
}();
var name = "firebase";
var version = "9.19.1";
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
registerVersion(name, version, "app");
const firebaseConfig = {
  apiKey: "AIzaSyCWsLXT6I2uF7615ZJoHIKtFnAeA3Juxho",
  authDomain: "maes-bcdb0.firebaseapp.com",
  projectId: "maes-bcdb0",
  storageBucket: "maes-bcdb0.appspot.com",
  messagingSenderId: "407907133822",
  appId: "1:407907133822:web:ce6275a41adb22ac8d2b2f"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = wh(app);
async function criarCadastro(email, senha, displayName) {
  const autenticacao = getAuth(app);
  await createUserWithEmailAndPassword(email, senha);
  await updateProfile(autenticacao, {
    displayName
  });
}
const obterUsuaria = async () => {
  const autenticacao = getAuth();
  const usuaria = {
    uid: autenticacao.currentUser.uid,
    displayName: autenticacao.currentUser.displayName,
    email: autenticacao.currentUser.email,
    nomeUsuaria: autenticacao.currentUser.displayName
  };
  return usuaria;
};
function observador(callback) {
  onAuthStateChanged(auth, callback);
}
function loginComGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}
function fazerLogin(email, password) {
  const autenticacao = getAuth();
  return signInWithEmailAndPassword(autenticacao, email, password);
}
async function sair() {
  await signOut(auth);
}
async function criarPostagem(textoDaPostagem) {
  const autenticacao = getAuth();
  const postagem2 = {
    idUsuaria: autenticacao.currentUser.uid,
    nomeUsuaria: autenticacao.currentUser.displayName,
    texto: textoDaPostagem,
    likes: [],
    data: new Date().toLocaleString()
  };
  const docRef = await uf(sh(db, "postagens"), postagem2);
  postagem2.id = docRef.id;
  return postagem2;
}
async function buscarPostagens() {
  const ordenarData = dl(sh(db, "postagens"), Il("data", "desc"));
  const postagens = [];
  const colecaoPostagens = await tf(ordenarData);
  colecaoPostagens.forEach((post) => {
    const postagem2 = {
      id: post.id,
      data: post.data().data,
      idUsuaria: post.data().idUsuaria,
      nomeUsuaria: post.data().nomeUsuaria,
      texto: post.data().texto,
      likes: post.data().likes
    };
    postagens.push(postagem2);
  });
  return postagens;
}
const curtindoPostagem = async (idDoPost, uid) => rf(rh(db, "postagens", idDoPost), {
  likes: Sf(uid)
});
const descurtindoPostagem = async (idDoPost, uid) => rf(rh(db, "postagens", idDoPost), {
  likes: Df(uid)
});
function excluindoPostagem(idDoPost) {
  const postRef = rh(db, "postagens", idDoPost);
  of(postRef);
}
const editandoPostagem = (idDoPost, textoPostado) => {
  rf(rh(db, "postagens", idDoPost), {
    texto: textoPostado
  });
};
function maiorDe18(dataNascimento) {
  const dataAtual = new Date();
  const idadeAtual = dataNascimento.split("-");
  const anos = dataAtual.getFullYear() - idadeAtual[0];
  if (anos >= 18) {
    return true;
  }
  return false;
}
function exibeErros(erro) {
  switch (erro.code) {
    case "auth/email-already-exists":
      return "Esse email j\xE1 foi cadastrado anteriormente, basta fazer o login";
    case "auth/user-not-found":
      return "Este usu\xE1rio n\xE3o existe, crie um cadastro";
    case "auth/too-many-requests":
      return "Houve uma sobrecarga no sistema, tente novamente em alguns instantes";
    case "auth/internal-error":
      return "Houve um erro inesperado, tente novemente em alguns instantes";
    case "auth/cancelled-popup-request":
      return "Solicita\xE7\xE3o cancelada";
    case "auth/popup-closed-by-user":
      return "A janela pop-up para o login com Google foi fechada";
    case "auth/wrong-password":
      return "Senha incorreta";
    case "auth/network-request-failed":
      return "Houve um problema de conex\xE3o com a internet";
    case "auth/invalid-email":
      return "O email fornecido \xE9 inv\xE1lido, tente novamente";
    case "auth/missing-email":
      return "Digite um email para fazer login";
    case "auth/email-already-in-use":
      return "Este email j\xE1 est\xE1 sendo usado, fa\xE7a login ou cadastre outro email";
  }
  return exibeErros;
}
const imagemDesktop = "/assets/img-desktop.7b336e86.png";
const logoLogin = "/assets/logomeve.5805dd80.png";
const criarLogin = document.createElement("div");
criarLogin.classList.add("container-login");
const login = () => {
  const template = `
    <div class="header">
      <header>
        <p class="paragrafo-login"> Bem-vindas a "MEV"! <br> Junte-se a n\xF3s e fa\xE7a parte dessa comunidade onde m\xE3es podem relaxar, brindar \xE0 vida e celebrar a jornada da maternidade com uma ta\xE7a de vinho na m\xE3o. 
        </p>
        <p class="crie-conta"><a href="/#cadastro">Crie sua conta!</a></p>
        <img class="logo"src='${logoLogin}' alt="go do site com desenho de uma mancha de vinho em formato de copo e o nome m\xE3es e vinhos">
      </header>
    </div> 
            
     
    <div class='caixa-login'>
      <form class="form-login">
        <input id="login-email" type="email"  placeholder="E-mail" required/>
        <input id="login-senha" type="password" id="password" placeholder="Senha" required/>
        <input class="btn-entrar " type="submit" value="Entrar">
      </form>
      
      <section class="login-com">
        <p class="login-google">Login com</p>
        <button class="btn-google" type="button">
          <img src="./imagens/icone google.png" alt="icone google">
        </button>
      </section>
      <div class='img-desktop-login'> 
        <img src="${imagemDesktop}" class="img-desktop-login" alt="Ilustra\xE7\xE3o login"
      </div> 
    </div> 
      <footer class="footer">
        <p>Desenvolvido por <a href="https://github.com/VieiraAriane">Ariane Vieira</a>, 2023.</>
      </footer>
  `;
  criarLogin.innerHTML = template;
  const form = criarLogin.querySelector(".form-login");
  const loginEmail = criarLogin.querySelector("#login-email");
  const loginSenha = criarLogin.querySelector("#login-senha");
  const btnEntrar = criarLogin.querySelector(".btn-entrar");
  const btnGoogle = criarLogin.querySelector(".btn-google");
  btnEntrar.addEventListener("click", (e) => {
    e.preventDefault();
    if (loginEmail.value === "" || loginSenha.value === "") {
      form.reportValidity();
    } else {
      fazerLogin(loginEmail.value, loginSenha.value).then(() => {
        window.location.hash = "#postagem";
      }).catch((error) => {
        exibeErros(error);
      });
    }
  });
  btnGoogle.addEventListener("click", () => {
    loginComGoogle().then(() => {
      window.location.hash = "#postagem";
    }).catch((error) => {
      exibeErros(error);
      window.location.hash = "#";
      alert("n\xE3o foi possivel concluir o login");
    });
  });
  return criarLogin;
};
const cadastro = () => {
  const criaCadastro = document.createElement("div");
  criaCadastro.classList.add("container-cadastro");
  const template = `
  
   <div class="mensagem-cadastro">
     <h3>Bem-vinda \xE0 nossa \xE1rea de cadastro. Por favor, preencha as informa\xE7\xF5es abaixo</h3>
   </div>
  
    <div class="caixa-cadastro">
      <form class="form-cadastro">
        <label for="nome">Nome e Sobrenome</label>
        <input type="text" id="nome" required>

        <label for="data">Data de nascimento</label>
        <input type="date" name="" id="data" min="1920-01-01" max="2023-01-01" required>

        <label for="email">E-mail</label>
         <input type="email" name="" id="email" required>

         <label for="senha">Crie uma senha</label>
         <input type="password" name="" id="senha" required>

       
         <label for="filhos">N\xBA de filhas/os</label>
         <input type="tel" name="" id="filhos" required> <!-- tel pq aparece o teclado de n\xBA  -->
      
         <input class="btn-enviar" type="submit" value="Enviar">
      </form>
      <div class='img-desktop'> 
       <img src="${imagemDesktop}" class="img-desktop"alt="Ilustra\xE7\xE3o cadastro"
      </div> 
    </div>
  `;
  criaCadastro.innerHTML = template;
  const form = criaCadastro.querySelector(".form-cadastro");
  const nome = criaCadastro.querySelector("#nome");
  const dataNascimento = criaCadastro.querySelector("#data");
  const inputEmail = criaCadastro.querySelector("#email");
  const inputSenha = criaCadastro.querySelector("#senha");
  const filhx = criaCadastro.querySelector("#filhos");
  const btnEnviar = criaCadastro.querySelector(".btn-enviar");
  btnEnviar.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const senha = document.querySelector("#senha").value;
    const nomeUsuaria = document.querySelector("#nome").value;
    if (nome.value === "" || dataNascimento.value === "" || inputEmail === "" || inputSenha === "" || filhx.value === "") {
      form.reportValidity();
    } else if (inputSenha.value.length < 6) {
      alert("sua senha precisa ter mais de 6 dig\xEDtos");
    } else if (maiorDe18(dataNascimento.value) === false) {
      alert("Rede social destinada a maiores de 18 anos.");
    } else {
      criarCadastro(email, senha, nomeUsuaria).then(() => {
        alert("Parab\xE9ns, seu cadastro foi realizado com sucesso! Agora basta fazer o login");
        window.location.hash = "/#cadastro";
      }).catch((error) => {
        exibeErros(error);
      });
    }
  });
  return criaCadastro;
};
const logoPostagem = "/assets/mev-postagem.3daea4dd.png";
const postagem = async () => {
  const usuariaLogada = await obterUsuaria();
  const telaDaPostagem = document.createElement("div");
  telaDaPostagem.classList.add("container-postagem");
  console.log(usuariaLogada);
  const template = `
    <div class="botao">
      <img src="${logoPostagem}" class="mev-postagem"alt="Mulheres brindando">
      <button class="btn-sair">Sair</button>
    </div>
    <div class="postagem">
      <div class="mensagem-ola">
        <p class="paragrafo">${usuariaLogada.nomeUsuaria}, o que deseja compartilhar?</p>
      </div>
    </div>
      <div class="novo-post">
        <textarea name="novo-texto" id="novo-texto" cols="30%" rows="4%"></textarea>
        <button class="btn-postar">Postar</button>
      </div>
    <div class='postagens'></div>

    `;
  telaDaPostagem.innerHTML = template;
  const exibirPostagem = (post) => {
    const posts = telaDaPostagem.querySelector(".postagens");
    const containerPost = document.createElement("div");
    let somaLikes = post.likes.length;
    const templatePost = `
    <div class="postagem-amigas">
      <div class="postagem-data">
        <p class="perfil-usuaria">${post.nomeUsuaria}</p>
        <p class="data-postagem">${post.data}</p>
      </div>
      <div class="postagens-anteriores">
        <textarea class="texto-usuaria-postado" id="texto-usuaria-postado" style='resize:none' disabled>${post.texto}</textarea>
        <span class="icones-inferiores">
        <button class="btn-curtir">
        <img id="taca-vazia" src="./imagens/tacavazia.png">
        <img id="taca-cheia" src="./imagens/tacacheia.png">
        </button>
        <button class="btn-excluir">
        <i class="fa-solid fa-trash-can" id="btn-excluir-${post.id}" type="button" value="${post.id}"></i>
        </button>
        <button id="btn-editar">
        <i class="fa-sharp fa-solid fa-pen-to-square" id="btn-editar" class="btn-editar "type="button" ></i>
        </button>
        <p class="numero-curtidas">${somaLikes}</p>
        <button id="btn-salvar" class="esconde-btn" "> Salvar </button>
        </span>
        </div>
        </div>
      `;
    containerPost.innerHTML = templatePost;
    posts.appendChild(containerPost);
    const btnExcluir = containerPost.querySelector(`#btn-excluir-${post.id}`);
    if (post.idUsuaria !== usuariaLogada.uid) {
      btnExcluir.style.display = "none";
    }
    btnExcluir.addEventListener("click", () => {
      excluindoPostagem(post.id);
      containerPost.remove();
    });
    const btnEditar = containerPost.querySelector("#btn-editar");
    const textArea = containerPost.querySelector("#texto-usuaria-postado");
    const btnSalvar = containerPost.querySelector("#btn-salvar");
    if (post.idUsuaria !== usuariaLogada.uid) {
      btnEditar.style.display = "none";
    }
    btnEditar.addEventListener("click", () => {
      textArea.removeAttribute("disabled");
      btnSalvar.style.display = "inline-block";
      btnEditar.style.display = "none";
    });
    btnSalvar.addEventListener("click", () => {
      editandoPostagem(post.id, textArea.value);
      textArea.setAttribute("disabled", "disabled");
      btnSalvar.style.display = "none";
      btnEditar.style.display = "inline-block";
    });
    const tacaVazia = containerPost.querySelector("#taca-vazia");
    const tacaCheia = containerPost.querySelector("#taca-cheia");
    const likeNaTela = containerPost.querySelector(".numero-curtidas");
    const colecaoLikes = post.likes;
    const uid = usuariaLogada.uid;
    const curtiuPost = colecaoLikes.includes(uid);
    tacaCheia.style.display = "none";
    if (curtiuPost) {
      tacaVazia.style.display = "none";
      tacaCheia.style.display = "block";
    }
    tacaVazia.addEventListener("click", () => {
      tacaVazia.style.display = "none";
      tacaCheia.style.display = "block";
      somaLikes += 1;
      likeNaTela.innerHTML = somaLikes;
      curtindoPostagem(post.id, usuariaLogada);
      colecaoLikes.push(uid);
    });
    tacaCheia.addEventListener("click", () => {
      tacaCheia.style.display = "none";
      tacaVazia.style.display = "block";
      somaLikes -= 1;
      likeNaTela.innerHTML = somaLikes;
      descurtindoPostagem(post.id, usuariaLogada.uid);
    });
    const btnSair2 = telaDaPostagem.querySelector(".btn-sair");
    btnSair2.addEventListener("click", async () => {
      await sair();
      window.location.hash = "";
    });
  };
  const postagens = await buscarPostagens();
  postagens.forEach((postagemCriada) => exibirPostagem(postagemCriada));
  const funcaoPostar = async () => {
    const textoUsuaria = telaDaPostagem.querySelector("#novo-texto");
    const textoDaPostagem = textoUsuaria.value;
    const postagemCriada = await criarPostagem(textoDaPostagem);
    exibirPostagem(postagemCriada);
    textoUsuaria.value = "";
  };
  const btnPostar = telaDaPostagem.querySelector(".btn-postar");
  btnPostar.addEventListener("click", funcaoPostar);
  const btnSair = telaDaPostagem.querySelector(".btn-sair");
  btnSair.addEventListener("click", async () => {
    await sair();
    window.location.hash = "";
  });
  return telaDaPostagem;
};
const main = document.querySelector("#main");
const iniciaTela = async () => {
  main.innerHTML = "";
  switch (window.location.hash) {
    case "":
      main.appendChild(login());
      break;
    case "#cadastro":
      main.appendChild(cadastro());
      break;
    case "#postagem":
      main.appendChild(await postagem());
      break;
    default:
      main.appendChild(login());
      break;
  }
};
window.addEventListener("hashchange", async () => {
  await iniciaTela();
});
window.addEventListener("load", async () => {
  observador(async (user) => {
    if (user) {
      await iniciaTela();
    } else {
      window.location.hash = "#login";
    }
  });
});
