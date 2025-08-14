export default async function GetHomeAPI(skip) {

    const res = await fetch(`https://dummyjson.com/products?limit=10&skip=${skip}`);
    try {

        const result = await res.json();
        // console.log(result)
       
        return ({
            status: "succuss",
            data: result
        })
    }
    catch (error) {
        return ({
            status: "Fail",
            data: error
        });
    }
}