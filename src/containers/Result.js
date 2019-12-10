import React, { useEffect} from "react";
import Scroll from '../components/scroll/Scroll';
import { connect } from 'react-redux';
import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import { setResultData } from '../redux/actions';

const mapStateToProps = state => {
    const {result,isPending,error} = state.getResultData
    console.log("STATE RESULT DATA");
    console.log(state.getResultData);

    return {
        // ? what state do I want to have as my props
        // * This state is a bundle of a multiple reducers (rootReducers), so in order to call a specific reducers we have to travers through the tree
        result: result,
        isPending: isPending,
        error: error
      
    }
}

const mapDispatchToProps = dispatch => {
    // ? What action do I want to send to the reducers?
    return {
        onSetResultData: () => dispatch(setResultData())
    }
}

const Result = (props) => {

    const {result, isPending} = props;
    console.log("RESULT PROPS: ");
    console.log(result);
    

    // (async () => {
    //     try {
    //         const response = await fetch("http://localhost:5000/result");
    //         let json_data;
    //         console.log("TOYA");
    //         console.log(response.status);
    //         if (response.status === 200) {
    //             json_data = await response.json();
    //         }else{
    //             throw new Error("Not 200");
    //         }

    //         const data = await json_data;
    //         console.log(data);
    //         score = data.score;
    //         keterangan = data.keterangan;
    //         // return data
    //     } catch (error) {
    //         console.log(error);   
    //     }
    // })()
    
    // console.log("SEKOR: "+score);
    useEffect(() => {
        // // * IIFE
        // // ? what is this second param?

        // ! Warning if not passing the empty array to the second arguments
        // ! =========================================================================
        // ! React Hook useEffect contains a call to 'setRobotsData'. 
        // ! Without a list of dependencies, this can lead to an infinite chain of updates. 
        // ! To fix this, pass [] as a second argument to the useEffect 
        // ! Hook  react-hooks/exhaustive-deps
        props.onSetResultData()
        
    },[props.onSetResultData]);

    const {score, keterangan, kesimpulan} = result;


    return isPending ? <h1 style={{color: "white"}}> Loading </h1> : (
        <div className="tc">
            <Scroll>
                <ErrorBoundary>
                    <h1 style={{color: "white"}}>Results</h1>
                    <h3 style={{color: "white"}}>Score: {score} </h3>
                    <h3 style={{color: "white"}}>Keterangan: {keterangan} </h3>
                    <h3 style={{color: "white"}}>Kesimpulan: {kesimpulan} </h3>
                    <div style={{height: "800px"}}>
                        <div>
                            <img src="http://localhost:5000/plot/seaborn" alt="" height={500} width={500} />
                        </div>
                        <div>
                            <img src="http://localhost:5000/plot/plt" alt="" height={500} width={500}/>
                        </div>      
                    </div>    
                </ErrorBoundary>
            </Scroll>
        </div>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Result);