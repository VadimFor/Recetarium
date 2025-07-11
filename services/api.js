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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMovies = exports.TMDB_CONFIG = void 0;
require("dotenv/config");
var node_fetch_1 = require("node-fetch");
var apiKey = process.env.EXPO_PUBLIC_MOVIE_API_KEY;
exports.TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: apiKey,
    headers: {
        accept: 'application/json',
        Authorization: "Bearer ".concat(apiKey)
    }
};
var fetchMovies = function (_a) { return __awaiter(void 0, [_a], void 0, function (_b) {
    var endpoint, response, data;
    var query = _b.query;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                endpoint = query ?
                    "".concat(exports.TMDB_CONFIG.BASE_URL, "/search/movie?query=").concat(encodeURIComponent(query)) :
                    "".concat(exports.TMDB_CONFIG.BASE_URL, "/discover/movie?sort_by=popularity.desc");
                return [4 /*yield*/, (0, node_fetch_1.default)(endpoint, {
                        method: 'GET',
                        headers: exports.TMDB_CONFIG.headers,
                    })];
            case 1:
                response = _c.sent();
                if (!response.ok) {
                    //@ts-ignore
                    throw new Error('Failed to fetch movies', response.statusText);
                }
                return [4 /*yield*/, response.json()];
            case 2:
                data = _c.sent();
                //@ts-ignore
                return [2 /*return*/, data.results];
        }
    });
}); };
exports.fetchMovies = fetchMovies;
// Call the function in an async IIFE
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var movies, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, exports.fetchMovies)({ query: "" })];
            case 1:
                movies = _a.sent();
                console.log('Movies:', movies);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
