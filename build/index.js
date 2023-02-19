"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.srcFolder = exports.app = void 0;
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
exports.app = (0, express_1.default)();
var port = 3000;
exports.srcFolder = __dirname;
exports.app.use(express_1.default.static(exports.srcFolder));
exports.app.use('/', index_1.default);
exports.app.get('/', function (req, res) {
    return res.send('Welcom To Image Processing API');
});
exports.app.listen(port, function () {
    console.log("server started at localhost:".concat(port));
});
