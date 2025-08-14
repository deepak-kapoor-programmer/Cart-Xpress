export default async function GetPostAPI(id) {
    const res = await fetch("https://dummyjson.com/products/${id}");
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