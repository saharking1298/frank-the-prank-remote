const fileFormats = [
    {format: "folder", plain: false, style: "far fa-folder", formats: [
        "folder",
        "back"
    ]},
    {format: "drive", plain: false, style: "far fa-hdd", formats: [
        "drive"
    ]},
    {format: "unknown", plain: false, style: "far fa-question", formats: [
        "unknown"
    ]},
    {format: "executable", plain: false, style: "far fa-cogs", formats:[
        ".exe"
    ]},
    {format: "audio", plain: false, style: "far fa-music", formats: [
        ".mp3",
        ".wav",
        ".ogg",
        ".m4a",
        ".opus",
        ".wma",
        ".flac",
        ".cda"
    ]},
    {format: "video", plain: false, style: "far fa-video", formats:[
        ".mp4",
        ".mov",
        ".wmv",
        ".avi",
        ".mkv",
        ".webm",
        ".flv",
        ".f4v",
        ".avchd",
        ".mpeg-2"
    ]},
    {format: "image", plain: false, style: "far fa-file-image", formats: [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".heic"
    ]},
    {format: "archive", plain: false, style: "far fa-file-archive", formats:[
        ".zip",
        ".7z",
        ".rar",
        ".tar",
        ".iso"
    ]},
    {format: "document", plain: false, style: "far fa-file-pdf", formats: [
        ".pdf"
    ]},
    {format: "document", plain: false, style: "far fa-file-pdf", formats: [
        ".pdf"
    ]},
    {format: "document", plain: false, style: "far fa-file-powerpoint", formats: [
        ".ppt",
        ".pptx"
    ]},
    {format: "document", plain: false, style: "far fa-file-word", formats:[
        ".doc",
        ".docx",
        ".rtf"
    ]},
    {format: "document", plain: false, style: "far fa-file-excel", formats:[
        ".xls",
        ".xlsx",
        ".xlsm"
    ]},
    {format: "document", plain: true, style: "far fa-file-code", formats:[
        ".c",
        ".cgi",
        ".pl",
        ".class",
        ".cpp",
        ".cs",
        ".h",
        ".hpp",
        ".java",
        ".php",
        ".py",
        ".pyw",
        ".sh",
        ".bat",
        ".swift",
        ".vb",
        ".json",
        ".md",
        ".xml",
        ".js",
        ".mjs",
        ".css",
        ".html",
        ".ejs"
    ]},
    {format: "document", plain: true, style: "far fa-file-alt", formats:[
        ".txt",
        ".log"
    ]},
    {format: "shortcut", plain: false, style: "far fa-share", formats:[
        ".lnk"
    ]},
    {format: "link", plain: false, style: "far fa-globe-americas", formats:[
        ".url"
    ]},
];

const sizeUnits = [
    {
        unit: 'Bytes',
        size: n => n / Math.pow(1000, 0),
        validator: n => n < Math.pow(1000, 1)
    },
    {
        unit: 'KB',
        size: n => n / Math.pow(1000, 1),
        validator: n => n < Math.pow(1000, 2)
    },
    {
        unit: 'MB',
        size: n => n / Math.pow(1000, 2),
        validator: n => n < Math.pow(1000, 3)
    },
    {
        unit: 'GB',
        size: n => n / Math.pow(1000, 3),
        validator: n => n < Math.pow(1000, 4)
    },
];

export function getFileFormat (format) {
    const result = fileFormats.find(entry => entry.formats.includes(format.toLowerCase()));
    if (result) {
        return {format: result.format, plain: result.plain, style: result.style};
    }
    else {
        return {format: 'file', plain: false, style: 'far fa-file'}; 
    }
}

export function getFileSize(bytes) {
    if (!isNaN(bytes)) {
        const unit = sizeUnits.find(entry => entry.validator(bytes));
        let size = unit.size(bytes);
        if (unit.unit !== 'Bytes' && size % 1 !== 0) {
            size = (Math.round(size * 100) / 100).toFixed(2);
        }
        return `${size} ${unit.unit}`;
    }
    else {
        return 'Unknown';
    }
}

export function getLastModified(seconds) {
    try {
        const date = new Date(seconds * 1000);
        return date.toLocaleString();
    }
    catch {
        return 'Unknown';
    }
}

export function getBaseName(path) {
    if (path.endsWith("\\")) {
        path = path.slice(0, -1);
    }
    if (path.endsWith(":") && path.length == 2) {
        return path + "\\";
    }
    path = path.split("\\");
    path = path[path.length - 1];
    return path;
}

export function getBaseDir(path) {
    if (path.endsWith("\\")) {
        path = path.slice(0, -1);
    }
    path = path.split("\\");
    path.pop();
    path = path.join("\\");
    if (path.endsWith(":")) {
        path += "\\";
    }
    return path;
}