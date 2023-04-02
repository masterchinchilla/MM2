import httpService from "./httpService";
import config from "../config.json";
async function callApi(action,recordType,srchParam,srchParamVal,payload){
    let backEndReqRootUrl= `${config.backEndHtmlRoot}${recordType}/`;
    let backEndReqUrl;
    let backEndReqResponse;
    if(action==="get"){
        backEndReqUrl=`${backEndReqRootUrl}${srchParam}/${srchParamVal?srchParamVal:``}`;
        backEndReqResponse = await httpService.get(backEndReqUrl); 
    }else{
        backEndReqRootUrl=`${config.backEndHtmlRoot}${action}/${recordType}`;
        switch(action){
            case `getSimilar`:
                backEndReqUrl=`${backEndReqRootUrl}/${srchParam}/${srchParamVal?srchParamVal:``}`;
                backEndReqResponse = await httpService.get(backEndReqUrl);
                break;
            case `add`:
                backEndReqUrl=backEndReqRootUrl;
                backEndReqResponse = await httpService.post(backEndReqUrl,payload);
                break;
            default:
                backEndReqUrl=`${backEndReqRootUrl}/${srchParamVal}`;
                switch(action){
                    case"copy":
                        backEndReqResponse = await httpService.post(backEndReqUrl);
                        break;
                    case"delete":
                        backEndReqResponse = await httpService.delete(backEndReqUrl);
                        break;
                    case `pull`:
                        backEndReqResponse = await httpService.put(backEndReqUrl);
                        break;
                    default:
                        
                }
        }
    }
    return backEndReqResponse;
}
export default callApi;