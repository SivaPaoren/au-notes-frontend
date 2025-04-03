import React from "react";
import { Card, Button } from "react-bootstrap";

interface ProfileCardProps {
  name: string;
  email: string;
  role: string;
  bio: string;
  imageUrl: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  email,
  role,
  bio,
  imageUrl,
}) => {
  return (
    <Card style={{ width: "18rem" }} className="shadow-lg text-center">
      <Card.Img
        variant="top"
        src={imageUrl || "https://via.placeholder.com/150"}
        alt="Profile"
        className="rounded-circle mx-auto mt-3"
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{role}</Card.Subtitle>
        <Card.Text>{bio}</Card.Text>
        <Card.Text className="text-secondary small">{email}</Card.Text>
        <Button variant="primary" className="me-2">
          Message
        </Button>
        <Button variant="outline-secondary">Edit</Button>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
