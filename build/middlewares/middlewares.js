"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagealreadyExistMiddleware = exports.imagenotExistMiddleware = exports.checkvalues = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var __1 = require("..");
var checkvalues = function (req, res, next) {
    var width = parseInt(req.query.width);
    var height = parseInt(req.query.height);
    if (Number.isNaN(width) || width < 0 || width == 0) {
        res.status(500).json({
            message: 'width value is 0 or negative value or not number',
        });
    }
    if (Number.isNaN(height) || height < 0 || height == 0) {
        res.status(500).json({
            message: 'height value is  0 or negative value or not number',
        });
    }
    next();
};
exports.checkvalues = checkvalues;
var imagenotExistMiddleware = function (req, res, next) {
    var name = req.query.name;
    var input = path_1.default.join(__1.srcFolder, "/images/original/".concat(name, ".jpg"));
    console.log(input);
    var exist = fs_1.default.existsSync(input);
    console.log(exist);
    if (!exist) {
        throw new Error('IMAGE NOT FOUND');
    }
    next();
};
exports.imagenotExistMiddleware = imagenotExistMiddleware;
var imagealreadyExistMiddleware = function (req, res, next) {
    var name = req.query.name;
    var width = req.query.name;
    var height = req.query.name;
    var file = path_1.default.join(__1.srcFolder, "/images/resized/".concat(name, "_").concat(width, "*").concat(height, ".jpg"));
    var exist = fs_1.default.existsSync(file);
    if (exist) {
        return res.status(200).sendFile(file);
    }
    next();
};
exports.imagealreadyExistMiddleware = imagealreadyExistMiddleware;
