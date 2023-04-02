import httpService from "./httpService";
import config from "../config.json";
async function callApi(action,recordType,srchParam,srchParamVal,payload,getType){
    let backEndReqRootUrl= `${config.backEndHtmlRoot}${recordType}/`;
    let backEndReqUrl;
    let backEndReqResponse;
    if(action==="get"){
        backEndReqUrl=`${backEndReqRootUrl}${srchParam}/${srchParamVal?srchParamVal:``}${getType?`/${getType}`:``}`;
        backEndReqResponse = await httpService.get(backEndReqUrl); 
    }else{
        backEndReqRootUrl=`${config.backEndHtmlRoot}${action}/${recordType}/`;
        if(action==="add"){
            backEndReqUrl=backEndReqRootUrl;
            backEndReqResponse = await httpService.post(backEndReqUrl,payload);
        }else{
            backEndReqUrl=`${backEndReqRootUrl}/${srchParamVal}`;
            switch(action){
                case"copy":
                    backEndReqResponse = await httpService.post(backEndReqUrl);
                    break;
                case"delete":
                    backEndReqResponse = await httpService.delete(backEndReqUrl);
                    break;
                case "put":
                    backEndReqResponse = await httpService.put(backEndReqUrl);
                    break;
                default:
                    backEndReqUrl=`${backEndReqRootUrl}${srchParam}/${srchParamVal}`;
                    backEndReqResponse = await httpService.get(backEndReqUrl);
            }
        }
    }
    return backEndReqResponse;
}
export default callApi;