var React = require("react");
var ReactDOMServer = require('react-dom/server');
var Application = require("../app/Application").default;


module.exports = function(req, scriptFilename, query={}) {
    // query = {
    // 	"settings": ["MIMAX2(oxygen)","RedmiNote4X(mido)","MI6(sagit)","MIX2(chiron)","MiNote3(jason)","Redmi4X(santoni)","MI5X(tiffany)","RedmiNote5A(ugg)"],
    // 	"title": "折线图",
    // 	"type": "rankingChart",
    // 	"data":[{"value":61842,"index":"/system/bin/sh"},{"value":11549,"index":"com.baidu.input_mi"},{"value":7627,"index":"com.android.systemui"},{"value":4492,"index":"com.xiaomi.shop"},{"value":4379,"index":"com.android.camera"},{"value":3078,"index":"/system/bin/cameraserver"},{"value":2794,"index":"com.xiaomi.smarthome"},{"value":2512,"index":"com.android.browser"},{"value":2503,"index":"/system/bin/mediaserver"},{"value":1759,"index":"/system/bin/audioserver"},{"value":1632,"index":"com.miui.securitycenter"},{"value":1555,"index":"/system/bin/netmgrd"},{"value":1398,"index":"com.xiaomi.router"},{"value":1376,"index":"com.miui.home"},{"value":1278,"index":"com.miui.guardprovider"},{"value":1272,"index":"/system/bin/rild"},{"value":1145,"index":"com.miui.cloudservice"},{"value":1099,"index":"com.miui.video"},{"value":1093,"index":"/system/bin/app_process"},{"value":1057,"index":"com.miui.gallery"}]
    //
    // }
    const settings = query.settings || [],
        data = query.data || [],
        title = query.title,
        type = query.type
    const pageStr = ReactDOMServer.renderToStaticMarkup(
        <html lang="en">
            <head>
                <meta charset="utf-8"/>
                <link rel="stylesheet" media="all" href="/assets/styles.css"/>
            </head>
            <body>
                <div id="content">
                    <Application settings={settings} data={data} title={title} type={type}></Application>
                </div>
            </body>
            <script src='/assets/bundle.js'></script>
        </html>
	);
	return `<!DOCTYPE html> ${pageStr}`;
}
