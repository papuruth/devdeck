import { each, forEach, isEmpty, keys, reduce } from "lodash";

export const downloadFile = (url: string, filename: string) => {
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", filename);
    a.click();
};

export const applyShadowToQRImage = async (qrcodeImage: string, logo?: string): Promise<string> => {
    try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const imgQRCode = new Image();
        imgQRCode.src = qrcodeImage;
        imgQRCode.crossOrigin = "anonymous";

        const ratioMultiplier = 2;
        const margin = 10 * ratioMultiplier;
        const qrPadding = 10 * ratioMultiplier;
        const shadowBlur = 10 * ratioMultiplier;
        const shadowColor = "#00000033";
        const fillStyle = "#FFFFFFFF";
        const radius = 5 * ratioMultiplier;

        await imgQRCode.decode();
        const canvasWidth = imgQRCode.width + margin * 2 + qrPadding + shadowBlur;
        const canvasHeight = imgQRCode.height + margin * 2 + qrPadding + shadowBlur;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        if (!ctx) throw new Error("Failed to get canvas context");
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = shadowBlur;
        ctx.fillStyle = fillStyle;

        ctx.roundRect(margin, margin, imgQRCode.width + margin * 2, imgQRCode.height + margin * 2, radius);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.drawImage(imgQRCode, margin + qrPadding, margin + qrPadding, imgQRCode.width, imgQRCode.height);
        if (logo) {
            const logoImg = new Image();
            logoImg.src = logo;
            logoImg.crossOrigin = "anonymous";
            await logoImg.decode();
            const canvasCentreHorizontal = canvas.height / 2;
            const canvasCentreVertical = canvas.height / 2;
            const logoHeight = canvasCentreHorizontal * 0.4;
            const logoWidth = canvasCentreVertical * 0.4;
            const imageStartHorizontal = canvasCentreHorizontal - logoWidth / 2;
            const imageStartVertical = canvasCentreVertical - logoHeight / 2;
            ctx.drawImage(logoImg, imageStartHorizontal, imageStartVertical, logoWidth, logoHeight);
            return canvas.toDataURL();
        }
        return canvas.toDataURL();
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.log("error", message);
        return qrcodeImage;
    }
};

export const createActionTypes = (prefix = "", actionTypeList: string[] = []): Record<string, string> => {
    const actionTypesObject: Record<string, string> = {};

    each(actionTypeList, (item) => {
        actionTypesObject[item] = `${prefix}/${item}`;
    });

    return actionTypesObject;
};

export const getImageAspectRatio = (width: number, height: number) => {
    function gcdFunc(a: number, b: number): number {
        return b ? gcdFunc(b, a % b) : a;
    }
    const gcd = gcdFunc(width, height);

    return [width / gcd, height / gcd];
};

export const getDataUrl = async (file: File): Promise<string | null> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string | null);
        reader.onerror = reject;
        reader.onabort = reject;
        reader.readAsDataURL(file);
    });

export const addParamsToURL = (url: string, params: Record<string, unknown>) => {
    if (isEmpty(params)) {
        return url;
    }
    let tempUrl = url.trim();
    if (tempUrl.endsWith("/")) {
        tempUrl = tempUrl.slice(0, -1);
        tempUrl += "?";
    } else {
        tempUrl += "?";
    }
    forEach(keys(params), (k: string, index: number) => {
        if (index < keys(params).length - 1) {
            tempUrl += `${k}=${params[k]}&`;
        } else {
            tempUrl += `${k}=${params[k]}`;
        }
    });
    return tempUrl;
};

export const queriesToParamsObject = (query: string): Record<string, string> => {
    const queryString = query.substring(1);
    const splittedString = queryString.split("&");
    return reduce(
        splittedString,
        (acc, item) => {
            const [key, value] = item.split("=");
            acc[key] = value;
            return acc;
        },
        {} as Record<string, string>
    );
};

// Password Generator
function getCharAt(charArray: string[], index: number): string {
    return charArray[index % charArray.length];
}

function scrambleArray(chars: string[]): string[] {
    return chars.sort(() => Math.random() - 0.5);
}

function getAllowedChars(compositionRule: CompositionRule, AllowedUpperArray: string[], AllowedLowerArray: string[], AllowedNumberArray: string[], AllowedSymbolArray: string[]): string[] {
    let chars: string[] = [];
    if (!compositionRule.upperCase?.forbidden) chars = chars.concat(AllowedUpperArray);
    if (!compositionRule.lowerCase?.forbidden) chars = chars.concat(AllowedLowerArray);
    if (!compositionRule.numbers?.forbidden) chars = chars.concat(AllowedNumberArray);
    if (!compositionRule.symbols?.forbidden) chars = chars.concat(AllowedSymbolArray);
    return chars;
}

/**
 * @summary Password generator using window.crypto
 * @description The [assword generator will generate random password using the specified allowed list. The list contains whether to include uppercase, lowercase, numbers and symbols
 * @param {number} length - password's length
 * @param {object} compositionRule - Containe flag and min of uppercase, lowercase, numbers and symbols in generated password
 * @param {object} allowedList - Contains each rules allowed characters, numbers and symbols
 * @returns a generated password
 */
interface CompositionRule {
    upperCase?: { forbidden?: boolean; min?: number };
    lowerCase?: { forbidden?: boolean; min?: number };
    numbers?: { forbidden?: boolean; min?: number };
    symbols?: { forbidden?: boolean; min?: number };
}

interface AllowedList {
    Uppers: string;
    Lowers: string;
    Numbers: string;
    Symbols: string;
}

export const passwordGenerator = (length = 8, compositionRule: CompositionRule = {}, allowedList: AllowedList = { Uppers: "", Lowers: "", Numbers: "", Symbols: "" }): string => {
    const AllowedUpperArray = Array.from(allowedList.Uppers);
    const AllowedLowerArray = Array.from(allowedList.Lowers);
    const AllowedNumberArray = Array.from(allowedList.Numbers);
    const AllowedSymbolArray = Array.from(allowedList.Symbols);

    const { upperCase, lowerCase, numbers, symbols } = compositionRule;
    const indexes = crypto.getRandomValues(new Uint32Array(length));

    const chars: string[] = [];
    let i = 0;
    let lastIndex = i;
    // eslint-disable-next-line no-plusplus
    while ((i < (upperCase?.min || 0)) && !upperCase?.forbidden) chars.push(getCharAt(AllowedUpperArray, indexes[i++]));
    // eslint-disable-next-line no-plusplus
    while (i < lastIndex + (lowerCase?.min || 0) && !lowerCase?.forbidden) chars.push(getCharAt(AllowedLowerArray, indexes[i++]));
    lastIndex = i;
    // eslint-disable-next-line no-plusplus
    while (i < lastIndex + (numbers?.min || 0) && !numbers?.forbidden) chars.push(getCharAt(AllowedNumberArray, indexes[i++]));
    lastIndex = i;
    // eslint-disable-next-line no-plusplus
    while (i < lastIndex + (symbols?.min || 0) && !symbols?.forbidden) chars.push(getCharAt(AllowedSymbolArray, indexes[i++]));

    const allowedChars = getAllowedChars(compositionRule, AllowedUpperArray, AllowedLowerArray, AllowedNumberArray, AllowedSymbolArray);
    // eslint-disable-next-line no-plusplus
    while (i < length || 0) chars.push(getCharAt(allowedChars, indexes[i++]));
    return scrambleArray(chars).join("");
};

export function formatNumberToUnits(number: number, showFullUnits: boolean): string | number {
    // Thousands, millions, billions, trillions, quadrillions, etc..
    const units = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
    const fullUnits = [
        "",
        "Thousand",
        "Million",
        "Billion",
        "Trillion",
        "Quadrillion",
        "Quintillion",
        "Sextillion",
        "Septillion",
        "Octillion",
        "Nonillion",
        "Decillion"
    ];
    if (number >= 1e3) {
        // Divide to get Unit style numbers (1e3,1e6,1e9, etc)
        const unit = Math.floor((number.toFixed(0).length - 1) / 3) * 3;
        const num = (number / (10 ** unit)).toFixed(1).replace(/\.0+$/, "");

        const unitName = showFullUnits ? fullUnits[Math.floor(unit / 3) - 1] : units[Math.floor(unit / 3) - 1];
        // return num + unitName;
        return `${num} ${unitName}`;
    }
    // To fix issue like --> 0.1 + 0.2 --> 0.30000000000000004
    return Math.round(number * 1e12) / 1e12;
}

export const getRandomNumbers = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;

export function getFixedNumber(x: number): number | string {
    let num: number | string = x;
    if (Math.abs(num as number) < 1.0) {
        const e = parseInt((num as number).toString().split("e-")[1], 10);
        if (e) {
            num = (num as number) * (10 ** (e - 1));
            num = `0.${new Array(e).join("0")}${(num as number).toString().substring(2)}`;
        }
    } else {
        let e = parseInt((num as number).toString().split("+")[1], 10);
        if (e > 20) {
            e -= 20;
            num = (num as number) / (10 ** e);
            num = (num as number) + new Array(e + 1).join("0");
        }
    }
    return num;
}

export const isMac = /Mac|iPhone|iPod|iPad/i.test(navigator.userAgent);
