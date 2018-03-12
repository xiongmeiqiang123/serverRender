var webshot = require("webshot");
var page = require("../../page.generated.js");
var stats = require("../../stats.generated.json");
var path = require("path");
const type = 'lineChart'
let data = [
    {
        "8.1.25": "0.0012",
        index: "Watchdogasdfasdfasdfasdfasdfasdfasdfasdfassdfasdfasdfa",
        "8.2.1-attach": {
            show: { 报活人数: 245644, 出现次数: 126 },
            conf: {
                nextUrl:
                    "/mqsas/excp/dashboard/pkns.do?bigCategory=restart&category=Watchdog",
                hasDetail: "true"
            }
        },
        "8.1.25-attach": {
            show: { 报活人数: 63664, 出现次数: 79 },
            conf: {
                nextUrl:
                    "/mqsas/excp/dashboard/pkns.do?bigCategory=restart&category=Watchdog",
                hasDetail: "true"
            }
        },
        "8.2.1": "0.0005"
    },
    {
        "8.1.25": "0.0003",
        index: "JavaCrash",
        "8.2.1-attach": {
            show: { 报活人数: 245644, 出现次数: 56 },
            conf: {
                nextUrl:
                    "/mqsas/excp/dashboard/pkns.do?bigCategory=restart&category=SS-JE",
                hasDetail: "true"
            }
        },
        "8.1.25-attach": {
            show: { 报活人数: 63664, 出现次数: 16 },
            conf: {
                nextUrl:
                    "/mqsas/excp/dashboard/pkns.do?bigCategory=restart&category=SS-JE",
                hasDetail: "true"
            }
        },
        "8.2.1": "0.0002"
    },
    {
        "8.1.25": "0.0002",
        index: "NativeCrash",
        "8.2.1-attach": {
            show: { 报活人数: 245644, 出现次数: 45 },
            conf: {
                nextUrl:
                    "/mqsas/excp/dashboard/pkns.do?bigCategory=restart&category=SS-NE",
                hasDetail: "true"
            }
        },
        "8.1.25-attach": {
            show: { 报活人数: 63664, 出现次数: 10 },
            conf: {
                nextUrl:
                    "/mqsas/excp/dashboard/pkns.do?bigCategory=restart&category=SS-NE",
                hasDetail: "true"
            }
        },
        "8.2.1": "0.0002"
    }
];
let width = 2000,
    height = 800;

module.exports = function(req, res) {
    let params = req.body || {};

    if (type === "rankingChart") {
        width = 1200;
        height = data.length * 60 + 100;
    }
    if (type === "pie") {
        width = 1100;
        height = 850;
    }
    const options = {
        windowSize: {
            width: width,
            height: height
        },
        siteType: "html",
        defaultWhiteBackground: true
    };
    const str = page(req, stats.assetsByChunkName.main, {
        title: 'test',
        type,
        data,
        settings:  ["8.2.1", "8.1.25"]
    });
    res.send(str);
    // res.end(str);
};
