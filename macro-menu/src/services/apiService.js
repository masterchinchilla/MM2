import httpService from "./httpService";
import config from "../config.json";
export async function callApi(action,recordType,srchParam,srchParamVal,payload){
    let backEndReqRootUrl= `${config.backEndHtmlRoot}${recordType}s/`;
    let backEndReqUrl;
    let backEndReqResponse;
    if(action==="get"){
        backEndReqUrl=`${backEndReqRootUrl}${srchParam}/${srchParamVal}`;
        backEndReqResponse = await httpService.get(backEndReqUrl); 
    }else{
        backEndReqRootUrl=`${config.backEndHtmlRoot}${action}/${recordType}s`;
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
                default:
                    backEndReqResponse = await httpService.put(backEndReqUrl);
            }
        }
    }
    return backEndReqResponse;
}