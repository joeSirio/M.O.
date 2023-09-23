import { FrequencyType } from "../enums/FrequencyType.tsx";
import dbData from "./data";

export class APIService {
    static myInstance = null;

    data = [
        {
            id: 1,
            task: "Go for a walk",
            description: "for atleast 30 minutes",
            type: FrequencyType.Daily,
            target:1,
            amount:0,
            status: false,
            occurance: "0|1|2|3|4|5|6",
        },
        {
            id: 2,
            task: "Workout",
            description: "for 1 hour",
            type: FrequencyType.Daily,
            target:1,
            amount:0,
            status: false,
            occurance: "1|2|3|4",
        },
        {
            id: 3,
            task: "Leetcode",
            description: "for 1 hour",
            type: FrequencyType.Daily,
            target:1,
            amount:0,
            status: false,
            occurance: "1|2|3|4|5",
        }
    ]

    static getInstance(){
        return new APIService();
    }
    
    async GetData() {
        try{
            // let response = await fetch(url + '/data')
            console.log(this.data);
            return await this.data;
        }
        catch(error){
            console.error(error);
        }
    }

    async AddHabit(data) {
        try{
            data["id"] = this.data.length + 1;
            this.data.push(data);
            // await fetch(url + 'data',{
            //     method: 'POST',
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: JSON.stringify(data)
            // })
            // .then((response) => {
            //     if(response.status !== 200){
            //         throw new Error(response.statusText);
            //     }
            //     return response.json();
            // })
        }
        catch(error){
            console.error(error);
        }
    }

    async UpdateHabit(data) {
        // try{
        //     await fetch(url + '/data',{
        //         method: 'PUT',
        //         headers: {
        //             'Content-type': 'application/json'
        //         },
        //         body: JSON.stringify(data)
        //     })
        //     .then((response) => {
        //         if(response.status !== 200){
        //             throw new Error(response.statusText);
        //         }
        //         return response.json();
        //     })
        // }
        // catch(error){
        //     console.error(error);
        // }
    }

    async DeleteHabit(id){
        // try{
        //     await(fetch(url + `/data/${id}`,{
        //         method: 'DELETE'
        //     })
        //     .then((response) => {
        //         if(response.status !== 200){
        //             throw new Error(response.statusText);
        //         }
        //         return response.json();
        //     }))
        // }
        // catch(error){
        //     console.error(error);
        // }
    }
}

export default APIService