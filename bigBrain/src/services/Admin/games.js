import { urls } from "../../constants/urls";
import { doPost } from "../apiRequests";
import { showToast } from "../toastServices";
 
export const oncreate = (gameNameObj)=> new Promise((resolve, reject) => {
    doPost(urls.create, gameNameObj).then((res) => {
      if (res.status === 200) {
        console.log("created");
        showToast(`Game ${gameNameObj?.name} created`, "success");
        resolve(res.json())
      } else {
        //console.log('Invalid request')
        showToast(`Game ${gameNameObj?.name} creation failed`, "error");
      }
    });
})
  