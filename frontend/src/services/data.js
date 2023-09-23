import { FrequencyType } from "../enums/FrequencyType.tsx";



const dbData = () => {

    return([
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
    )
}

export default dbData;