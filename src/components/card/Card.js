import React from "react";

const Card = ({
  image,
  make,
  model,
  trim_name,
  body_name,
  drivetrain,
  ext_color,
  int_color,
  mileage,
  price,
  predicted_price,
  transmission,
  year,
  isTrainDataset,
}) => {
  // const {id, make, body_name} = props

  return (
    <div className="bg-near-black dib br3 pa3 ma2 bw2 shadow-5" id={1}>
      <a href="google.com">
        <img
          src={`${image}`}
          alt=""
          className="grow"
          height={350}
          width={350}
        />
      </a>
      <div className="light-gray">
        <h3>{make}</h3>
        <h3>
          {model} {trim_name}
        </h3>
        <p>
          <strong> Type : </strong>
          {body_name}
        </p>
        <p>
          <strong> Mileage : </strong>
          {mileage}
        </p>
        <p>
          <strong> Year : </strong>
          {year}
        </p>
        <p>
          <strong> Transmission : </strong>
          {transmission}
        </p>
        <p>
          <strong> Drivetrain : </strong>
          {drivetrain}
        </p>
        <p>
          <strong> Exterior Color : </strong>
          {ext_color}
        </p>
        <p>
          <strong> Interior Color : </strong>
          {int_color}
        </p>
        <p>
          <strong> Price : </strong>
          {price}
        </p>
        {isTrainDataset && (
          <p>
            <strong> Predicted Price : </strong>
            {`${predicted_price}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default Card;
