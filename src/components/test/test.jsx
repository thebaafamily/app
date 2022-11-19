import React, {useEffect, useState} from "react";

function TestChild(props)
{
    useEffect(() => {
        console.log('TestChild.useEffect', props.name)
    }, [props])

    return (<>
        <div> Test Child {props.name}</div>
    </>)
}

function Test(props)
{
    const [name, setName] = useState('Apple')
    useEffect(() => {
                        console.log('Test.useEffect')
                        setName('Apple')
    })
    
    return(
            <>
                <div> Test </div>
                {/* {setName("Banana")} */}
                {/* <TestChild name={name}/> */}
            </>
          )
}

export {Test}
