import { Carousel } from "react-bootstrap";

export default function Gallary({ images }) {
  return (
    <Carousel fade className="gallary">
      {images.map((image) => (
        <Carousel.Item key={image.id}>
          <img src={image.image} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
