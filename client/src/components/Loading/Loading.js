import React from 'react'
import LoadingSpin from "react-loading-spin";
import './Loading.css'

const Loading = () => {
    return (
        <div className={"ExampleOfUsage"}>
            <LoadingSpin
                duration="2s"
                width="15px"
                timingFunction="ease-in-out"
                direction="alternate"
                size="200px"
                primaryColor="var(--darkyellow)"
                secondaryColor="#333"
                numberOfRotationsInAnimation={2}
            />
        </div>
    )
}

export default Loading;
