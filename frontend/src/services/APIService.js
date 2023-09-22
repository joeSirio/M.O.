export class APIService {
    static myInstance = null;

    static url = 'http://54.89.100.29:8000'

    static getInstance(){
        return new APIService();
    }
    
    async GetData() {
        try{
            let response = await fetch(url + '/data')
            return await response.json();
        }
        catch(error){
            console.error(error);
        }
    }

    async AddHabit(data) {
        try{
            await fetch(url + 'data',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
                if(response.status !== 200){
                    throw new Error(response.statusText);
                }
                return response.json();
            })
        }
        catch(error){
            console.error(error);
        }
    }

    async UpdateHabit(data) {
        try{
            await fetch(url + '/data',{
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then((response) => {
                if(response.status !== 200){
                    throw new Error(response.statusText);
                }
                return response.json();
            })
        }
        catch(error){
            console.error(error);
        }
    }

    async DeleteHabit(id){
        try{
            await(fetch(url + `/data/${id}`,{
                method: 'DELETE'
            })
            .then((response) => {
                if(response.status !== 200){
                    throw new Error(response.statusText);
                }
                return response.json();
            }))
        }
        catch(error){
            console.error(error);
        }
    }
}

export default APIService