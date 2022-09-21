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
        ".docx"
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
        ".java",
        ".php",
        ".py",
        ".pyw",
        "sh",
        ".bat",
        ".swift",
        ".vb",
        ".json",
        ".md",
        ".xml",
        ".js",
        ".mjs",
        ".css",
        ".html"
    ]},
    {format: "document", plain: true, style: "far fa-file-alt", formats:[
        ".txt",
        ".log",
        ".ini"
    ]},
    {format: "shortcut", plain: false, style: "far fa-share", formats:[
        ".lnk"
    ]},
    {format: "link", plain: false, style: "far fa-globe-americas", formats:[
        ".url"
    ]},
];

export default function(format) {
    const result = fileFormats.find(entry => entry.formats.includes(format.toLowerCase()));
    if (result) {
        return {format: result.format, plain: result.plain, style: result.style};
    }
}