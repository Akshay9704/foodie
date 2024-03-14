import Card from "react-bootstrap/Card";
import Empty from "../assets/empty.jpg";

const Cards = ({ recipe }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={Empty} alt="empty"/>
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <p className="text-sm">{`Created By: ${recipe.createdBy}`}</p>
      </Card.Body>
    </Card>
  );
};

export default Cards;
