import { ClipLoader } from "react-spinners"
export const SpinnerCom = (props) => {
    // console.log(props);
    return (
        <>
            <center>

                <ClipLoader
                    color={props.color}
                    loading={props.loading}
                    size={50}
                />
            </center>
        </>
    )

}