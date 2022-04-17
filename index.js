"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var forge = require("node-forge");
var fs = require("fs");
var util_1 = require("util");
var path = require("path");
var rsa = forge.pki.rsa;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
var setup = function (keyProps, genPropertis, callback) {
    if (keyProps === void 0) { keyProps = { bits: 2048 }; }
    if (genPropertis === void 0) { genPropertis = { androidFolder: "./Android", webFolder: "./Web" }; }
    return __awaiter(void 0, void 0, void 0, function () {
        var keyPair, publicPem, PrivatePem, publicPemAndroid, privatePemAndroid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    /**
                     * This function will setup the key generator process
                     * she will create the new keys one in format for the Android, and one for the
                     * Node Forge PKI
                    */
                    if (callback)
                        callback("Creating Key Pair for new rsa Keys", 10);
                    return [4 /*yield*/, sleep(1000)];
                case 1:
                    _a.sent();
                    keyPair = rsa.generateKeyPair({ bits: keyProps.bits });
                    if (callback)
                        callback("Creating Pem For Public Key", 60);
                    return [4 /*yield*/, sleep(1000)];
                case 2:
                    _a.sent();
                    publicPem = forge.pki.publicKeyToPem(keyPair.publicKey);
                    if (callback)
                        callback("Creating Pem For Private Key", 70);
                    return [4 /*yield*/, sleep(1000)];
                case 3:
                    _a.sent();
                    PrivatePem = forge.pki.privateKeyToPem(keyPair.privateKey);
                    if (callback)
                        callback("Creating android keys Format", 80);
                    return [4 /*yield*/, sleep(1000)];
                case 4:
                    _a.sent();
                    publicPemAndroid = publicPem.replace("-----BEGIN RSA PUBLIC KEY-----", "-----BEGIN PUBLIC KEY-----");
                    privatePemAndroid = PrivatePem.replace("-----BEGIN RSA PRIVATE KEY-----", "-----BEGIN PRIVATE KEY-----");
                    return [4 /*yield*/, sleep(1000)];
                case 5:
                    _a.sent();
                    if (callback)
                        callback("Saving Andorid Keys", 85);
                    return [4 /*yield*/, (0, util_1.promisify)(fs.exists)(genPropertis.androidFolder)];
                case 6:
                    if (!!(_a.sent())) return [3 /*break*/, 8];
                    return [4 /*yield*/, (0, util_1.promisify)(fs.mkdir)(genPropertis.androidFolder)];
                case 7:
                    _a.sent();
                    if (callback)
                        callback("Create Android Key Folder", 86);
                    _a.label = 8;
                case 8: return [4 /*yield*/, sleep(1000)];
                case 9:
                    _a.sent();
                    return [4 /*yield*/, (0, util_1.promisify)(fs.writeFile)(path.join(genPropertis.androidFolder, "public"), publicPemAndroid)];
                case 10:
                    _a.sent();
                    if (callback)
                        callback("Saved Public Android Key", 88);
                    return [4 /*yield*/, (0, util_1.promisify)(fs.writeFile)(path.join(genPropertis.androidFolder, "private"), privatePemAndroid)];
                case 11:
                    _a.sent();
                    if (callback)
                        callback("Saving Web Keys", 90);
                    return [4 /*yield*/, sleep(1000)];
                case 12:
                    _a.sent();
                    return [4 /*yield*/, (0, util_1.promisify)(fs.exists)(genPropertis.webFolder)];
                case 13:
                    if (!!(_a.sent())) return [3 /*break*/, 15];
                    return [4 /*yield*/, (0, util_1.promisify)(fs.mkdir)(genPropertis.webFolder)];
                case 14:
                    _a.sent();
                    if (callback)
                        callback("Create Web Key Folder", 92);
                    _a.label = 15;
                case 15: return [4 /*yield*/, (0, util_1.promisify)(fs.writeFile)(path.join(genPropertis.webFolder, "public"), publicPem)];
                case 16:
                    _a.sent();
                    if (callback)
                        callback("Saved Public Android Key", 93);
                    return [4 /*yield*/, sleep(1000)];
                case 17:
                    _a.sent();
                    return [4 /*yield*/, (0, util_1.promisify)(fs.writeFile)(path.join(genPropertis.webFolder, "private"), PrivatePem)];
                case 18:
                    _a.sent();
                    if (callback)
                        callback("Saved Private Android Key", 95);
                    return [4 /*yield*/, sleep(1000)];
                case 19:
                    _a.sent();
                    if (callback)
                        callback("Done All Thank For Using", 100);
                    return [2 /*return*/];
            }
        });
    });
};
var getConfig = function () {
    if (process.argv.length == 3) {
        return {
            androidFolder: process.argv[0],
            webFolder: process.argv[1],
            bits: Number(process.argv[2])
        };
    }
    return {
        androidFolder: undefined,
        webFolder: undefined,
        bits: undefined
    };
};
var config = getConfig();
setup({
    bits: config.bits ? config.bits : 2048
}, {
    androidFolder: config.androidFolder ? config.androidFolder : "./Android",
    webFolder: config.webFolder ? config.webFolder : "./Web"
}, function (status, n) {
    console.clear();
    console.log(status + "     " + n + "%");
});
