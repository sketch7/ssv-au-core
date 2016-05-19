// Generated by typings
// Source: https://raw.githubusercontent.com/sketch7/ssv-core/0.6.5/dist/typings/collection.d.ts
declare module '~ssv-core/dist/typings/collection' {
export interface Selectable {
    /**
     * Gets or sets whether the item is selected or not.
     */
    isSelected: boolean;
}
export interface Dictionary<T> {
    [key: string]: T;
}
export class CollectionExtensions {
    /**
     * Unselect all collection items and select only the item specified.
     * @param {Selectable[]} collection collection to unselect.
     * @param {Selectable} selectItem item to select.
     */
    mutualExclusiveSelect(collection: Selectable[], selectItem: Selectable): void;
}
}
declare module 'ssv-core/dist/typings/collection' {
import alias = require('~ssv-core/dist/typings/collection');
export = alias;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/sketch7/ssv-core/0.6.5/dist/typings/conversion.d.ts
declare module '~ssv-core/dist/typings/conversion' {
export enum TimeUnits {
    Milliseconds = 0,
    Seconds = 1,
    Minutes = 2,
}
/**
 * Conversion utilities.
 * @class ConversionExtensions
 */
export class ConversionExtensions {
    MILLIS_PER_SECOND: number;
    SECONDS_PER_MINUTE: number;
    MILLIS_PER_MINUTE: number;
    /**
     * Converts from milliseconds to seconds e.g. 2500 (ms) => 2.5 (s)
     * @param {number} milliseconds value to convert e.g. 2500
     * @returns {number} time in seconds
     */
    fromMillisecondsToSeconds(milliseconds: number): number;
    /**
     * Converts from milliseconds to minutes e.g. 72000 (ms) => 1.2 (m)
     * @param {number} milliseconds value to convert e.g. 72000
     * @returns {number} time in minutes
     */
    fromMillisecondsToMinutes(milliseconds: number): number;
    /**
     * Converts from seconds to milliseconds e.g. 2.5 (s) => 2500 (ms)
     * @param {number} seconds value to convert e.g. 2.5
     * @returns {number} time in milliseconds
     */
    fromSecondsToMilliseconds(seconds: number): number;
    /**
     * Converts from seconds to minutes e.g. 120 (s) => 2 (m)
     * @param {number} seconds value to convert e.g. 120
     * @returns {number} time in minutes
     */
    fromSecondsToMinutes(seconds: number): number;
    /**
     * Converts from minutes to milliseconds e.g. 2 (m) => 120000 (m)
     * @param {number} seconds value to convert e.g. 2
     * @returns {number} time in milliseconds
     */
    fromMinutesToMilliseconds(minutes: number): number;
    /**
     * Converts from minutes to seconds e.g. 2 (m) => 120 (s)
     * @param {number} seconds value to convert e.g. 2
     * @returns {number} time in seconds
     */
    fromMinutesToSeconds(minutes: number): number;
    /**
     * Converts time from specified time unit to an other time unit.
     *
     * @param {number} value value to convert e.g. 2
     * @param {TimeUnits} fromUnit units to convert time from
     * @param {TimeUnits} toUnit units to convert time to
     * @returns {number} time in specified units
     */
    convertTime(value: number, fromUnit: TimeUnits, toUnit: TimeUnits): number;
    fromMillisecondsTo(value: number, toUnit: TimeUnits): number;
    fromSecondsTo(value: number, toUnit: TimeUnits): number;
    fromMinutesTo(value: number, toUnit: TimeUnits): number;
}
}
declare module 'ssv-core/dist/typings/conversion' {
import alias = require('~ssv-core/dist/typings/conversion');
export = alias;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/sketch7/ssv-core/0.6.5/dist/typings/enum.d.ts
declare module '~ssv-core/dist/typings/enum' {
export class EnumExtensions {
    /**
     * Gets all names of the enum as an array.
     * @param {any} e enum to get data of.
     * @returns enum definition names as a string array e.g. ["Elite", "Boss", "Normal", "RaidBoss"].
     */
    getNames(e: any): string[];
    /**
     * Gets all names of the enum as an array with values kebab'ed cased characters e.g. "raid-boss"
     * @param {any} e enum to get data of.
     * @returns enum definition names as a string array with kebab case e.g. ["elite", "boss", "normal", "raid-boss"].
     */
    getNamesKebab(e: any): string[];
    /**
     * Gets all values of the enum as an array.
     * @param {any} e enum to get data of.
     * @returns enum values as number array e.g. [1, 2, 3, 4]
     */
    getValues(e: any): number[];
}
}
declare module 'ssv-core/dist/typings/enum' {
import alias = require('~ssv-core/dist/typings/enum');
export = alias;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/sketch7/ssv-core/0.6.5/dist/typings/keycode.d.ts
declare module '~ssv-core/dist/typings/keycode' {
/**
 * Keyboard key codes.
 * @see http://www.javascripter.net/faq/keycodes.htm
 */
export const enum KeyCode {
    Backspace = 8,
    Tab = 9,
    Enter = 13,
    Shift = 16,
    Ctrl = 17,
    Alt = 18,
    Pause = 19,
    CapsLock = 20,
    Escape = 27,
    Space = 32,
    PageUp = 33,
    PageDown = 34,
    End = 35,
    Home = 36,
    LeftArrow = 37,
    UpArrow = 38,
    RightArrow = 39,
    DownArrow = 40,
    Insert = 45,
    Delete = 46,
    Key0 = 48,
    Key1 = 49,
    Key2 = 50,
    Key3 = 51,
    Key4 = 52,
    Key5 = 53,
    Key6 = 54,
    Key7 = 55,
    Key8 = 56,
    Key9 = 57,
    KeyA = 65,
    KeyB = 66,
    KeyC = 67,
    KeyD = 68,
    KeyE = 69,
    KeyF = 70,
    KeyG = 71,
    KeyH = 72,
    KeyI = 73,
    KeyJ = 74,
    KeyK = 75,
    KeyL = 76,
    KeyM = 77,
    KeyN = 78,
    KeyO = 79,
    KeyP = 80,
    KeyQ = 81,
    KeyR = 82,
    KeyS = 83,
    KeyT = 84,
    KeyU = 85,
    KeyV = 86,
    KeyW = 87,
    KeyX = 88,
    KeyY = 89,
    KeyZ = 90,
    LeftMeta = 91,
    RightMeta = 92,
    Select = 93,
    Numpad0 = 96,
    Numpad1 = 97,
    Numpad2 = 98,
    Numpad3 = 99,
    Numpad4 = 100,
    Numpad5 = 101,
    Numpad6 = 102,
    Numpad7 = 103,
    Numpad8 = 104,
    Numpad9 = 105,
    Multiply = 106,
    Add = 107,
    Subtract = 109,
    Decimal = 110,
    Divide = 111,
    F1 = 112,
    F2 = 113,
    F3 = 114,
    F4 = 115,
    F5 = 116,
    F6 = 117,
    F7 = 118,
    F8 = 119,
    F9 = 120,
    F10 = 121,
    F11 = 122,
    F12 = 123,
    NumLock = 144,
    ScrollLock = 145,
    Semicolon = 186,
    Equals = 187,
    Comma = 188,
    Dash = 189,
    Period = 190,
    ForwardSlash = 191,
    GraveAccent = 192,
    OpenBracket = 219,
    BackSlash = 220,
    CloseBracket = 221,
    SingleQuote = 222,
}
}
declare module 'ssv-core/dist/typings/keycode' {
import alias = require('~ssv-core/dist/typings/keycode');
export = alias;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/sketch7/ssv-core/0.6.5/dist/typings/math.d.ts
declare module '~ssv-core/dist/typings/math' {
/**
 * Mathematics utilities and helpers.
 *
 * @export
 * @class MathExtensions
 */
export class MathExtensions {
    /**
     * Rounds numeric value to a specified precision (default 2) e.g. 20.556 => 20.57.
     * @param value amount to round e.g. 20.556
     * @param precision decimal places to round to e.g. 2 (default: 2)
     * @returns {number} rounded number
     */
    round(value: string | number, precision?: number): number;
}
}
declare module 'ssv-core/dist/typings/math' {
import alias = require('~ssv-core/dist/typings/math');
export = alias;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/sketch7/ssv-core/0.6.5/dist/typings/string.d.ts
declare module '~ssv-core/dist/typings/string' {
import { Dictionary } from '~ssv-core/dist/typings/collection';
export class StringExtensions {
    /**
     * parseBool configuration to add/remove possible values.
     *
     * @type {Dictionary<boolean>}
     */
    parseBoolConfig: Dictionary<boolean>;
    /**
     * Interpolates the string with the data specified by using the prefix (:) default as token.
     * e.g. 'api/:lang/games' => 'api/en/games'
     * @param {string} value string template to interpolate
     * @param {*} data data object to replace tokens
     * @param {string} [interpolatePrefix=":"] interpolation token prefix
     * @returns interpolated string
     */
    interpolate(value: string, data: any, interpolatePrefix?: string): string;
    /**
     * Parses a value to boolean "humanized", which can also be configured in order to add additional values. e.g.
     * true => "true", "1", "yes", "y", "on"
     * false => "false", "0", "no", "n", "off"
     * @param {string} value string value to parse
     * @returns {boolean} true or false
     */
    parseBool(value: string): boolean;
    /**
     * Replaces all occurrences with a string with the specified value.
     *
     * @param {string} value value to search within
     * @param {string} search value to search for e.g. "//"
     * @param {string} replacement value to replace with e.g. "/"
     * @returns {string} Returns string with the replaced values
     */
    replaceAll(value: string, search: string, replacement: string): string;
}
}
declare module 'ssv-core/dist/typings/string' {
import alias = require('~ssv-core/dist/typings/string');
export = alias;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/sketch7/ssv-core/0.6.5/dist/typings/utils.d.ts
declare module '~ssv-core/dist/typings/utils' {
import { CollectionExtensions } from '~ssv-core/dist/typings/collection';
import { ConversionExtensions } from '~ssv-core/dist/typings/conversion';
import { MathExtensions } from '~ssv-core/dist/typings/math';
import { StringExtensions } from '~ssv-core/dist/typings/string';
import { EnumExtensions } from '~ssv-core/dist/typings/enum';
export class Utils {
    math: MathExtensions;
    conversion: ConversionExtensions;
    string: StringExtensions;
    collection: CollectionExtensions;
    enum: EnumExtensions;
}
export let utils: Utils;
export default utils;
}
declare module 'ssv-core/dist/typings/utils' {
import alias = require('~ssv-core/dist/typings/utils');
export = alias;
}

// Generated by typings
// Source: https://raw.githubusercontent.com/sketch7/ssv-core/0.6.5/dist/typings/index.d.ts
declare module '~ssv-core/dist/typings/index' {
export * from '~ssv-core/dist/typings/collection';
export * from '~ssv-core/dist/typings/conversion';
export * from '~ssv-core/dist/typings/enum';
export * from '~ssv-core/dist/typings/keycode';
export * from '~ssv-core/dist/typings/math';
export * from '~ssv-core/dist/typings/string';
export * from '~ssv-core/dist/typings/utils';
}
declare module 'ssv-core/dist/typings/index' {
import alias = require('~ssv-core/dist/typings/index');
export = alias;
}
declare module 'ssv-core' {
import alias = require('~ssv-core/dist/typings/index');
export = alias;
}
