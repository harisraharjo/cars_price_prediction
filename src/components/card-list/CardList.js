import React from 'react';
import Card from "../card/Card";

const CardList = (props) => {
    const {robotsData, isTrainDataset} = props;
    // console.log(robotsData.length);
    const cardArray = robotsData.map((data,i) => {
        return <Card key={i} {...data} isTrainDataset={isTrainDataset} />;
    });
    
    return(
        <div style={{height: "500px"}}>
            {cardArray}
        </div>
    );
}

export default CardList;