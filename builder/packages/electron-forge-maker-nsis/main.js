"use strict"

Object.defineProperty(exports, "__esModule", {
  value: true
})

const buildForge = require("electron-builder-lib").buildForge

exports.isSupportedOnCurrentPlatform = () => Promise.resolve(true)

exports.default = function (options) {
  return buildForge(options, {win: [`nsis:${options.targetArch}`]})
}