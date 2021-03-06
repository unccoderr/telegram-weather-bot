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
Object.defineProperty(exports, "__esModule", { value: true });
var TelegramBot = require("node-telegram-bot-api");
require('dotenv').config();
var Controllers_1 = require("./Controllers");
var bot = new TelegramBot(process.env.BOT_TOKEN, {
    polling: true,
});
var messageController = new Controllers_1.MessageController(bot, 'HTML');
var weatherController = new Controllers_1.WeatherController(process.env.WEATHER_TOKEN);
bot.onText(/\/start/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, messageController.sendStartMessage(ctx)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
bot.on('callback_query', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx.data;
                switch (_a) {
                    case 'start': return [3 /*break*/, 1];
                    case 'functions': return [3 /*break*/, 3];
                    case 'author': return [3 /*break*/, 5];
                    case 'delete': return [3 /*break*/, 7];
                }
                return [3 /*break*/, 9];
            case 1: return [4 /*yield*/, messageController.sendStartMessage(ctx.message)];
            case 2:
                _b.sent();
                return [3 /*break*/, 9];
            case 3: return [4 /*yield*/, messageController.sendFunctionalMessage(ctx.message)];
            case 4:
                _b.sent();
                return [3 /*break*/, 9];
            case 5: return [4 /*yield*/, messageController.sendAuthorMessage(ctx.message)];
            case 6:
                _b.sent();
                return [3 /*break*/, 9];
            case 7: return [4 /*yield*/, bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id.toString())
                    .catch(console.error)];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); });
bot.on('location', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var languageCode, weather;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                languageCode = ctx.from.language_code;
                weatherController.setLanguage(languageCode);
                return [4 /*yield*/, weatherController.getCurrentWeather(ctx.location.latitude, ctx.location.longitude)];
            case 1:
                weather = _a.sent();
                return [4 /*yield*/, messageController.sendWeatherMessage(ctx, weather)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=index.js.map