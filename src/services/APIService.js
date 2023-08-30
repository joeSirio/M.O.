export class APIService {
    static myInstance = null;

    static getInstance(){
        return new APIService();
    }
    
    async GetData() {
        try{
            let response = await fetch('http://localhost:8000/data')
            return await response.json();
        }
        catch(error){
            console.error(error);
        }
    }

    async AddHabit(data) {
        try{
            await fetch('http://localhost:8000/data',{
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
            await fetch('http://localhost:8000/data',{
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
            await(fetch(`http://localhost:8000/data/${id}`,{
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