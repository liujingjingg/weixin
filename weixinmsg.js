const formatMsg = require('./fmtwxmsg');

function help() {
    //字符串形式返回帮助信息
    //还可以是以读取文件的形式来返回
    return `这是一个消息回复测试程序，会把消息原样返回，但是目前不支持视频类型的消息`;
}

function userMsg(wxmsg, retmsg) {
    /*
        检测是否为文本消息，如果是文本消息则先要检测是不是支持的关键词回复。
    */
    if (wxmsg.MsgType == 'text') {
        if (wxmsg.Content == 'help' || wxmsg.Content == '?' || wxmsg.Content == '？') {
            retmsg.msg = help();
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);
        } else if (wxmsg.Content == 'hello' || wxmsg.Content == '你好'){

            retmsg.msg = '你好，你可以输入一些关键字测试消息回复，输入help/?获取帮助';
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);

        } else if(wxmsg.Content=='who'){
            retmsg.msg = '开发者：刘静静 学号：2017012052 班级：八班';
            retmsg.msgtype = 'text';
            return formatMsg(retmsg);
        }
        else {
            retmsg.msg = wxmsg.Content;
            retmsg.msgtype = wxmsg.MsgType;
            return formatMsg(retmsg);
        }
    } else {
        switch(wxmsg.MsgType) {
            case 'image':
            case 'voice':
                retmsg.msg = wxmsg.MediaId;
                retmsg.msgtype = wxmsg.MsgType;
                break;
            default:
                //retmag.msgtype类型为空
                //格式化数据会返回default处的数据
                retmsg.msg = '不支持的类型';
        }

        return formatMsg(retmsg);
    }
}

exports.userMsg = userMsg;
exports.help = help;

exports.msgDispatch = function msgDispatch(wxmsg, retmsg) {
    return userMsg(wxmsg, retmsg);
};

